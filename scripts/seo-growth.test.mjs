import test from 'node:test';
import assert from 'node:assert/strict';
import { createTouch, advanceAttribution, attributionEventParams, SESSION_TIMEOUT_MS } from '../src/seo/attribution-state.js';
import { mergeLeadAttribution } from '../src/server/lead-attribution.js';
import { normalizeArticleHtml } from '../src/seo/blog-html.js';
import { normalizeSitemapInventory } from '../src/seo/sitemap-inventory.js';
import { commercialPatch, buildAcquisitionReport } from '../src/server/acquisition-report.js';
import { isTrustedBookingMessage, canTrack } from '../src/utils/tracking-policy.js';
import { trackMappedEvent } from '../src/utils/analytics.js';
import { captureAttribution } from '../src/seo/attribution.js';
import { safeLocalStorage } from '../src/utils/browser-storage.js';

const now = Date.parse('2026-10-02T00:00:00Z');
const entry = createTouch({ href: 'https://www.devacia.com/services/wordpress-development?email=private@example.com', referrer: 'https://www.google.co.in/search?q=wordpress', now });
test('first and session landing survive internal navigation without exposing query strings', () => {
  const first = advanceAttribution({ touch: entry, now });
  const internal = advanceAttribution({ existing: first.attribution, session: first.session, now: now + 1000, touch: createTouch({ href: 'https://www.devacia.com/contact', now: now + 1000 }) });
  assert.equal(internal.attribution.firstTouch.landing_page, '/services/wordpress-development');
  assert.deepEqual(internal.attribution.latestTouch, entry);
  assert.equal(entry.source, 'google'); assert.equal(entry.medium, 'organic');
  assert.equal(entry.referrer, 'https://www.google.co.in');
  assert.ok(!JSON.stringify(internal).includes('private@example'));
});
test('new direct session does not inherit stale campaign fields; last non-direct stays separate', () => {
  const first = advanceAttribution({ touch: createTouch({ href: 'https://www.devacia.com/?utm_source=google&utm_medium=cpc&utm_campaign=old', now }), now });
  const later = now + SESSION_TIMEOUT_MS + 1;
  const next = advanceAttribution({ existing: first.attribution, session: first.session, touch: createTouch({ href: 'https://www.devacia.com/contact', now: later }), now: later });
  assert.equal(next.attribution.latestTouch.source, '(direct)');
  assert.equal(attributionEventParams(next.attribution).utm_campaign, '');
  assert.equal(next.attribution.lastNonDirectTouch.utm_campaign, 'old');
  assert.equal(next.attribution.firstTouch.utm_campaign, 'old');
});
test('a malformed stored session is replaced by a valid entrance', () => {
  const result = advanceAttribution({ session: { lastSeen: now }, touch: entry, now: now + 1 });
  assert.equal(result.attribution.latestTouch.landing_page, entry.landing_page);
});
test('explicit new campaign replaces the complete session touch and backend merge stays atomic', () => {
  const old = advanceAttribution({ touch: createTouch({ href: 'https://www.devacia.com/?utm_source=google&utm_medium=cpc&utm_campaign=old', now }), now });
  const fresh = advanceAttribution({ existing: old.attribution, session: old.session, touch: createTouch({ href: 'https://www.devacia.com/plans?utm_source=partner&utm_medium=referral', now: now + 1 }), now: now + 1 });
  const merged = mergeLeadAttribution(old.attribution, fresh.attribution);
  assert.equal(merged.latestTouch.utm_source, 'partner');
  assert.equal(merged.latestTouch.utm_campaign, undefined);
  assert.equal(merged.firstTouch.utm_campaign, 'old');
});
test('storage restrictions do not interrupt forms or attribution', () => {
  const previous = { window: globalThis.window, document: globalThis.document };
  globalThis.window = { devaciaTrackingConsent: 'granted', location: { href: 'https://www.devacia.com/contact', pathname: '/contact' }, get localStorage() { throw new Error('blocked'); }, get sessionStorage() { throw new Error('blocked'); } };
  globalThis.document = { referrer: '', cookie: '' };
  try {
    safeLocalStorage.setItem('draft', 'saved'); assert.equal(safeLocalStorage.getItem('draft'), 'saved');
    assert.equal(captureAttribution().firstTouch.landing_page, '/contact');
    safeLocalStorage.removeItem('draft'); assert.equal(safeLocalStorage.getItem('draft'), null);
    window.devaciaTrackingConsent = 'denied'; assert.deepEqual(captureAttribution(), {});
  } finally { globalThis.window = previous.window; globalThis.document = previous.document; }
});
test('only production public pages dispatch one GTM event; booking and form interest have distinct meanings', () => {
  const previous = { window: globalThis.window, document: globalThis.document, env: process.env.NODE_ENV, app: process.env.NEXT_PUBLIC_APP_ENV };
  const meta = []; const gtag = [];
  process.env.NODE_ENV = 'production'; delete process.env.NEXT_PUBLIC_APP_ENV;
  globalThis.document = { body: { dataset: { analyticsMode: 'gtm' } } };
  globalThis.window = { devaciaTrackingConsent: 'granted', location: { hostname: 'www.devacia.com', pathname: '/' }, dataLayer: [], gtag: (...a) => gtag.push(a), fbq: (...a) => meta.push(a) };
  try {
    trackMappedEvent('generate_lead', {}, { eventId: 'once' });
    assert.equal(window.dataLayer.length, 1); assert.equal(gtag.length, 0);
    trackMappedEvent('strategy_call_booked'); assert.equal(meta.at(-1)[1], 'Schedule');
    trackMappedEvent('form_start'); assert.equal(meta.at(-1)[0], 'trackCustom');
    window.location.hostname = 'localhost'; assert.equal(canTrack(), false);
    window.location.hostname = 'www.devacia.com'; window.location.pathname = '/admin/leads'; assert.equal(canTrack(), false);
    window.location.pathname = '/'; process.env.NEXT_PUBLIC_APP_ENV = 'staging'; assert.equal(canTrack(), false);
    delete process.env.NEXT_PUBLIC_APP_ENV; window.devaciaTrackingConsent = 'denied'; assert.equal(canTrack(), false);
  } finally {
    globalThis.window = previous.window; globalThis.document = previous.document;
    for (const [key, value] of [['NODE_ENV', previous.env], ['NEXT_PUBLIC_APP_ENV', previous.app]]) { if (value === undefined) delete process.env[key]; else process.env[key] = value; }
  }
});
test('a booking message must come from the embedded Calendly frame', () => {
  const source = {}; const frames = [{ src: 'https://calendly.com/devacia/call', contentWindow: source }];
  const event = { origin: 'https://calendly.com', source, data: { event: 'calendly.event_scheduled' } };
  assert.equal(isTrustedBookingMessage(event, frames), true);
  assert.equal(isTrustedBookingMessage({ ...event, source: {} }, frames), false);
  assert.equal(isTrustedBookingMessage({ ...event, origin: 'https://example.com' }, frames), false);
  assert.equal(isTrustedBookingMessage({ ...event, data: { event: 'calendly.profile_page_viewed' } }, frames), false);
});
test('CMS body headings are demoted while escaped code examples and image dimensions survive', () => {
  const html = normalizeArticleHtml('<h1 class="title">Title &amp; guide</h1><pre><code>&lt;h1&gt;example&lt;/h1&gt;</code></pre><img src="a.jpg" width="640" height="480">');
  assert.ok(html.includes('<h2 class="title">')); assert.ok(!html.includes('<h1'));
  assert.ok(html.includes('&lt;h1&gt;')); assert.ok(html.includes('width="640"')); assert.ok(html.includes('loading="lazy"'));
});
test('sitemap includes only published inventory and uses stored modification dates', () => {
  const result = normalizeSitemapInventory([{ slug: 'web' }, { slug: 'empty' }, { slug: 'hidden', isPublished: false }], [{ slug: 'one', category: 'web', status: 'published', updatedAt: '2026-09-01' }, { slug: 'draft', category: 'web', status: 'draft' }]);
  assert.deepEqual(result.categories, [{ slug: 'web' }]); assert.equal(result.posts.length, 1); assert.equal(result.posts[0].updatedAt, '2026-09-01T00:00:00.000Z'); assert.equal(result.posts[0].publishedAt, undefined);
});
test('commercial outcomes require explicit validated data and preserve timestamps when unchanged', () => {
  assert.throws(() => commercialPatch({ qualification: 'qualified' }), /reason/);
  assert.throws(() => commercialPatch({ deal_value: '3000', deal_currency: 'INR' }), /value/);
  assert.throws(() => commercialPatch({ deal_value: 3000 }), /currency/);
  const patch = commercialPatch({ qualification: 'qualified', qualification_reason: 'Agreed scope and budget', outcome: 'won', deal_value: 200000, deal_currency: 'INR' }, {}, new Date(now));
  assert.equal(+patch.won_at, now);
  assert.equal(commercialPatch({ outcome: 'won' }, patch).won_at, undefined);
  assert.equal(commercialPatch({ outcome: 'lost' }, patch).won_at, null);
});
test('cohort reporting excludes drafts, keeps unknown attribution and never turns closed into won', () => {
  const start = '2026-10-01'; const end = '2026-10-03'; const base = { created_at: '2026-10-02', status: 'completed', final_action: 'submit', services: ['wordpress'] };
  const report = buildAcquisitionReport([
    { ...base, attribution: { firstTouch: entry }, qualification: 'qualified', outcome: 'won', deal_value: 200000, deal_currency: 'INR' },
    { ...base, outcome: 'won', deal_value: 3000, deal_currency: 'USD' },
    { ...base, outcome: 'won' }, { ...base, status: 'closed', final_action: undefined },
    { ...base, status: 'draft', final_action: undefined }, { ...base, status: 'draft', final_action: undefined, qualification: 'unreviewed', outcome: 'open' }, { ...base, is_deleted: true },
  ], { start, end });
  assert.equal(report.totals.records, 4); assert.equal(report.totals.won, 3); assert.equal(report.totals.accepted, 3);
  assert.deepEqual(report.totals.wonValueByCurrency, { INR: 200000, USD: 3000 }); assert.equal(report.totals.wonValueUnknown, 1);
  assert.equal(report.channels.find(r => r.key === '(unknown) / (unknown)').records, 3);
  assert.equal(report.draftsExcluded, 2); assert.equal(report.totals.qualified, 1);
});

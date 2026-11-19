import test from 'node:test';
import assert from 'node:assert/strict';
import nextConfig from '../next.config.js';
import { canonicalIndustryPages, industryAliases, legacyIndustryPages } from '../src/seo/industryCatalog.js';
import { createTouch, advanceAttribution, attributionEventParams } from '../src/seo/attribution-state.js';
import { trackMappedEvent } from '../src/utils/analytics.js';
import { withBuyerGuide } from '../src/seo/buyerGuides.js';

test('industry hiring intents retain distinct scope, crawlable destinations and shared commercial terms', () => {
  for (const page of canonicalIndustryPages) {
    assert.equal(page.hero.primaryHref, '/onboarding');
    assert.ok(page.faqs.some(faq => faq.answer.includes('₹39,999')));
    assert.ok(page.faqs.some(faq => /ownership|source code/i.test(faq.answer)));
    assert.equal(new Set(page.related.map(link => link.path)).size, page.related.length);
    assert.ok(page.related.every(link => !industryAliases[link.path] && link.label && link.path !== page.path));
    assert.deepEqual(page.journey.map(step => step.desc), page.salesFlow.steps.map(step => step.desc));
    assert.ok(!page.stack.some(item => /sub-second|guarantee|lightning/i.test(item.why)));
    if (page.evidence.status === 'verified') assert.ok(['restaurants', 'wholesale'].includes(page.slug));
  }
});

test('legacy buyer guides cannot override rewritten service metadata', () => {
  const page = { metadata: { title: 'Current offer' }, content: { faqs: [] } };
  for (const key of ['wordpressDevelopment', 'ecommerce', 'performanceMarketing']) assert.equal(withBuyerGuide(page, key), page);
});

test('historical restaurant and ecommerce routes have direct permanent destinations', async () => {
  const redirects = await nextConfig.redirects();
  for (const [source, destination] of [
    ['/industries', '/services/website-development'],
    ['/industries/restaurants/booking-ordering-system', '/industries/restaurant-website-development'],
    ['/services/ecommerce', '/services/ecommerce-website-development'],
  ]) assert.ok(redirects.some(rule => rule.source === source && rule.destination === destination && rule.permanent));
});

test('industry aliases resolve directly to one canonical offer without redirect chains', async () => {
  const redirects = await nextConfig.redirects();
  const paths = new Set(canonicalIndustryPages.map(page => page.path));
  assert.equal(paths.size, 12);
  for (const [source, destination] of Object.entries(industryAliases)) {
    assert.ok(paths.has(destination));
    assert.ok(!paths.has(source));
    const matches = redirects.filter(redirect => redirect.source === source);
    assert.equal(matches.length, 1, `${source}: one redirect rule`);
    assert.equal(matches[0].destination, destination);
    assert.equal(matches[0].permanent, true);
    assert.ok(!redirects.some(redirect => redirect.source === destination), 'Canonical destination must not redirect again');
  }
  for (const page of legacyIndustryPages) assert.ok(!industryAliases[page.path], 'Do not publish duplicate legacy offers');
});

test('organic industry entry survives the journey to onboarding for every industry', () => {
  const now = Date.parse('2026-10-07T00:00:00Z');
  for (const page of canonicalIndustryPages) {
    const touch = createTouch({ href: `https://www.devacia.com${page.path}`, referrer: 'https://www.google.com/search?q=website', now });
    const entry = advanceAttribution({ touch, now });
    const next = advanceAttribution({ existing: entry.attribution, session: entry.session, touch: createTouch({ href: 'https://www.devacia.com/onboarding', now: now + 1000 }), now: now + 1000 });
    const params = attributionEventParams(next.attribution);
    assert.equal(params.landing_page, page.path);
    assert.equal(params.source, 'google');
    assert.equal(params.medium, 'organic');
    assert.equal(next.attribution.firstTouch.landing_page, page.path);
  }
});

test('industry interest and strategy CTA events respect consent and never become lead or meeting events', () => {
  const saved = { window: globalThis.window, document: globalThis.document, env: process.env.NODE_ENV, app: process.env.NEXT_PUBLIC_APP_ENV };
  process.env.NODE_ENV = 'production';
  delete process.env.NEXT_PUBLIC_APP_ENV;
  const meta = [];
  globalThis.document = { body: { dataset: { analyticsMode: 'gtm' } } };
  globalThis.window = { devaciaTrackingConsent: 'denied', location: { hostname: 'www.devacia.com', pathname: canonicalIndustryPages[0].path }, dataLayer: [], fbq: (...args) => meta.push(args) };
  try {
    trackMappedEvent('service_interest', { service_path: window.location.pathname });
    trackMappedEvent('book_strategy_call', { page_path: window.location.pathname });
    assert.equal(window.dataLayer.length, 0);
    assert.equal(meta.length, 0);
    window.devaciaTrackingConsent = 'granted';
    trackMappedEvent('service_interest', { service_path: window.location.pathname });
    trackMappedEvent('book_strategy_call', { page_path: window.location.pathname });
    assert.equal(window.dataLayer.length, 2);
    assert.ok(!window.dataLayer.some(event => ['generate_lead', 'strategy_call_booked'].includes(event.event)));
    assert.ok(meta.every(event => !['Lead', 'Schedule', 'Purchase'].includes(event[1])));
    assert.equal(meta.at(-1)[0], 'trackCustom', 'Strategy CTA is an interest event');
  } finally {
    globalThis.window = saved.window;
    globalThis.document = saved.document;
    for (const [key, value] of [['NODE_ENV', saved.env], ['NEXT_PUBLIC_APP_ENV', saved.app]]) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
  }
});

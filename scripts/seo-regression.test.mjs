import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { escapeJsonLd } from '../src/seo/jsonLd.js';
import { trackMappedEvent } from '../src/utils/analytics.js';

test('editorial JSON-LD cannot close a script tag and preserves data', () => {
  const data = { headline: '</script><script>alert(1)</script>', description: 'A < B & C' };
  const serialized = escapeJsonLd(JSON.stringify(data));
  assert.ok(!serialized.includes('<'));
  assert.deepEqual(JSON.parse(serialized), data);
});

test('production bots share exclusions while onboarding exposes noindex; staging blocks all', async () => {
  const source = (await fs.readFile(new URL('../app/robots.js', import.meta.url), 'utf8'))
    .replace("from '../src/seo/site'", `from '${new URL('../src/seo/site.js', import.meta.url).href}'`);
  const { default: robots } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
  const oldPublic = process.env.NEXT_PUBLIC_APP_ENV;
  const oldPrivate = process.env.APP_ENV;
  try {
    delete process.env.NEXT_PUBLIC_APP_ENV;
    delete process.env.APP_ENV;
    const production = robots();
    const generic = production.rules.find((rule) => rule.userAgent === '*');
    const search = production.rules.find((rule) => rule.userAgent.includes('Googlebot'));
    assert.deepEqual(search.disallow, generic.disallow);
    assert.ok(search.disallow.includes('/admin'));
    assert.ok(search.disallow.includes('/api/'));
    assert.ok(!search.disallow.includes('/onboarding'));
    assert.equal(production.sitemap, 'https://www.devacia.com/sitemap.xml');
    process.env.APP_ENV = 'staging';
    assert.deepEqual(robots().rules, [{ userAgent: '*', disallow: '/' }]);
  } finally {
    for (const [key, value] of [['NEXT_PUBLIC_APP_ENV', oldPublic], ['APP_ENV', oldPrivate]]) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
  }
});

test('interest and attempts are not Meta leads; successful submissions retain deduplication ID', () => {
  const calls = [];
  const oldEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = 'production';
  globalThis.window = { devaciaTrackingConsent: 'granted', location: { hostname: 'www.devacia.com', pathname: '/' }, dataLayer: [], fbq: (...args) => calls.push(args) };
  try {
    trackMappedEvent('book_strategy_call', { page_path: '/' });
    assert.equal(calls[0][0], 'trackCustom');
    assert.notEqual(calls[0][1], 'Lead');
    trackMappedEvent('form_submit_attempt', {}, { skipMeta: true });
    assert.equal(calls.length, 1);
    trackMappedEvent('generate_lead', { submission_stage: 'success' }, { eventId: 'test-submission' });
    assert.deepEqual(calls[1], ['track', 'Lead', { submission_stage: 'success' }, { eventID: 'test-submission' }]);
    assert.equal(window.dataLayer.at(-1).event_id, 'test-submission');
  } finally {
    delete globalThis.window;
    if (oldEnv === undefined) delete process.env.NODE_ENV; else process.env.NODE_ENV = oldEnv;
  }
});

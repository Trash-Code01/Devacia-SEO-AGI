import test from 'node:test';
import assert from 'node:assert/strict';
import {getInspectionUrls, selectDevaciaProperty} from '../src/seo/gsc-inventory.js';

test('GSC inspects the current sitemap, deduplicates URLs and rejects unexpected origins', () => {
  const wrap = values => `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${values.map(u => `<url><loc>${u}</loc></url>`).join('')}</urlset>`;
  const url = 'https://www.devacia.com/industries/cafe-website-development';
  assert.deepEqual(getInspectionUrls(wrap([url, url])), [url]);
  assert.throws(() => getInspectionUrls(wrap(['https://other.example/page'])));
  assert.throws(() => getInspectionUrls('<sitemapindex></sitemapindex>'));
  assert.throws(() => getInspectionUrls(wrap([])));
});

test('GSC never falls back to an unrelated property', () => {
  const unrelated = {siteUrl:'https://other.example/',permissionLevel:'siteOwner'};
  const domain = {siteUrl:'sc-domain:devacia.com',permissionLevel:'siteOwner'};
  const prefix = {siteUrl:'https://www.devacia.com/',permissionLevel:'siteOwner'};
  assert.throws(() => selectDevaciaProperty([unrelated]));
  assert.equal(selectDevaciaProperty([unrelated,domain,prefix]), prefix);
  assert.equal(selectDevaciaProperty([unrelated,domain]), domain);
});

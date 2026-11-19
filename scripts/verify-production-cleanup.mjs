import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { parseDocument } from 'htmlparser2';
import { canonicalIndustryPages } from '../src/seo/industryCatalog.js';

const origin = process.argv[2] || 'http://127.0.0.1:3106';
assert.ok(['localhost', '127.0.0.1', 'www.devacia.com'].includes(new URL(origin).hostname));
const output = process.argv[3] || 'docs/seo/evidence/production-cleanup-latest.json';
const removedResources = ['/resources', '/resources/website-project-brief', '/resources/website-maintenance-checklist', '/resources/b2b-rfq-workflow'];
const retired = new Set(['/industries', ...removedResources]);
const normalize = path => path.replace(/\/$/, '') || '/';
const walk = node => [node, ...(node.children || []).flatMap(walk)];
const get = path => fetch(origin + path, { redirect: 'manual', signal: AbortSignal.timeout(60000) });
const report = { checkedAt: new Date().toISOString(), origin, redirects: [], removed: [], pages: [], discovery: [] };

// Retirement must not redirect or delete the twelve independently published offers.
for (const path of ['/industries', '/industries/']) {
  let response = await get(path + '?utm_source=cleanup-check');
  assert.equal(response.status, 308, path);
  let destination = new URL(response.headers.get('location'), origin);
  if (destination.pathname === '/industries') {
    response = await get(destination.pathname + destination.search);
    assert.equal(response.status, 308);
    destination = new URL(response.headers.get('location'), origin);
  }
  assert.equal(destination.pathname, '/services/website-development');
  assert.equal(destination.searchParams.get('utm_source'), 'cleanup-check');
  report.redirects.push({ path, status: 308, destination: destination.pathname });
}

const privateDocuments = JSON.parse(await fs.readFile('private/documents/manifest.json', 'utf8'));
const absentPaths = [...removedResources, ...privateDocuments.map(doc => '/' + doc.id), '/dev', '/debug', '/test', '/preview', '/playground', '/sandbox', '/industries/devacia-qa-unknown-sector'];
for (const path of absentPaths) {
  const response = await get(path);
  assert.equal(response.status, 404, `${path}: must not publish a development or archived page`);
  report.removed.push({ path, status: response.status });
}

const sitemapResponse = await get('/sitemap.xml');
assert.equal(sitemapResponse.status, 200);
const xml = await sitemapResponse.text();
const paths = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => normalize(new URL(match[1]).pathname));
assert.ok(paths.length > 0);
assert.equal(paths.length, new Set(paths).size);
for (const path of paths) assert.ok(!retired.has(path), `${path}: excluded from sitemap`);
for (const page of canonicalIndustryPages) assert.ok(paths.includes(page.path), `${page.path}: retained in sitemap`);

function assertPublicTarget(value, route) {
  if (typeof value !== 'string' || !/^(?:\/|https?:\/\/)/.test(value)) return;
  const url = new URL(value, 'https://www.devacia.com');
  assert.ok(!['localhost', '127.0.0.1'].includes(url.hostname), `${route}: no local-only URL ${value}`);
  if (['devacia.com', 'www.devacia.com'].includes(url.hostname)) {
    assert.ok(!retired.has(normalize(url.pathname)), `${route}: retired link or schema target ${value}`);
  }
}
function checkSchema(value, route) {
  if (typeof value === 'string') assertPublicTarget(value, route);
  else if (Array.isArray(value)) value.forEach(child => checkSchema(child, route));
  else if (value && typeof value === 'object') Object.values(value).forEach(child => checkSchema(child, route));
}
let next = 0;
const pagePaths = [...new Set([...paths, '/onboarding', '/privacy-policy', '/terms', '/accessibility', '/faq'])];
await Promise.all(Array.from({ length: 3 }, async () => {
  while (next < pagePaths.length) {
    const path = pagePaths[next++];
    const response = await get(path);
    assert.equal(response.status, 200, `${path}: expected public page`);
    const html = await response.text();
    const nodes = walk(parseDocument(html));
    for (const node of nodes.filter(node => node.name === 'a' || node.name === 'link')) assertPublicTarget(node.attribs.href, path);
    for (const node of nodes.filter(node => node.name === 'script' && node.attribs.type === 'application/ld+json')) {
      checkSchema(JSON.parse((node.children || []).map(child => child.data || '').join('')), path);
    }
    assert.ok(!html.includes('Search industry website offers'), `${path}: temporary directory not rendered`);
    if (path === '/services/website-development') {
      assert.ok(nodes.some(node => node.attribs?.id === 'industries'), 'Industry section anchor exists');
      for (const page of canonicalIndustryPages) assert.ok(nodes.some(node => node.name === 'a' && node.attribs.href === page.path), `${page.path}: linked in initial HTML`);
    }
    report.pages.push({ path, status: 200, retiredReferences: 0 });
  }
}));
for (const path of ['/llms.txt', '/llms-full.txt']) {
  const response = await get(path);
  assert.equal(response.status, 200);
  const text = await response.text();
  assert.ok(!/https:\/\/www\.devacia\.com\/industries(?=[\s)\]"]|$)/.test(text), `${path}: directory excluded`);
  assert.ok(!text.includes('https://www.devacia.com/resources'), `${path}: retired resources excluded`);
  for (const page of canonicalIndustryPages) assert.ok(text.includes('https://www.devacia.com' + page.path));
  report.discovery.push({ path, status: 200, retiredReferences: 0 });
}
report.sitemapUrls = paths.length;
report.result = 'passed';
report.pages.sort((a, b) => a.path.localeCompare(b.path));
await fs.mkdir(path.dirname(output), { recursive: true });
await fs.writeFile(output, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ result: report.result, sitemapUrls: paths.length, pagesChecked: report.pages.length, absentPathsChecked: report.removed.length, redirectsChecked: report.redirects.length, discoveryFilesChecked: report.discovery.length, output }, null, 2));

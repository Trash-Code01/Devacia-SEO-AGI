import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { parseDocument } from 'htmlparser2';
import { serviceBuyerGuides, SEO_PAGE_UPDATES } from '../src/seo/buyerGuides.js';
import { websiteOffer, websitePages } from '../src/content/websiteOffer.js';
import { canonicalIndustryPages, industryAliases } from '../src/seo/industryCatalog.js';
import { currentServicePages } from '../src/seo/currentServicePages.js';

// Run after `npm run build`. An optional local origin also checks HTTP and sitemap.
const origin = process.argv[2];
if (origin) {
  const parsed = new URL(origin);
  assert.ok(['localhost', '127.0.0.1'].includes(parsed.hostname), 'Use a local preview origin');
}
const decode = (value) => value.replace(/&#(x[\da-f]+|\d+);|&(amp|quot|apos|lt|gt|nbsp);/gi, (match, number, name) => {
  if (number) return String.fromCodePoint(number.startsWith('x') ? parseInt(number.slice(1), 16) : Number(number));
  return { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ' }[name.toLowerCase()];
});
const textOnly = (html) => decode(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<!--.*?-->/gs, '')
  .replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const attr = (tag, key) => decode(tag.match(new RegExp(`\\b${key}="([^"]*)"`, 'i'))?.[1] || '');
const guides = Object.values(serviceBuyerGuides);
const checks = [];
const links = new Set();
const updates = SEO_PAGE_UPDATES;
const walk = (node) => [node, ...(node.children || []).flatMap(walk)];
const hiddenBeforeHydration = (node) => {
  for (let current = node; current; current = current.parent) {
    const attributes = current.attribs || {};
    if ('hidden' in attributes || /(?:^|;)\s*(?:opacity\s*:\s*0(?:[;\s]|$)|display\s*:\s*none|visibility\s*:\s*hidden)/i.test(attributes.style || '')) return true;
  }
  return false;
};
const supportingRoutes = ['/almina-study', '/obsidian-study', '/fitniya-study', '/eclat-study', '/nexus-study', '/yoglivya-study', '/contact'];
for (const route of [...new Set([...Object.keys(updates), ...supportingRoutes])]) {
  const html = await fs.readFile(`.next/server/app${route === '/' ? '/index' : route}.html`, 'utf8');
  const bodyText = textOnly(html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] || '');
  const title = textOnly(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '');
  const metaTags = html.match(/<meta\b[^>]*>/gi) || [];
  const description = attr(metaTags.find((tag) => attr(tag, 'name') === 'description') || '', 'content');
  const canonicalTags = (html.match(/<link\b[^>]*>/gi) || []).filter((tag) => attr(tag, 'rel') === 'canonical');
  assert.equal(canonicalTags.length, 1, `${route}: one canonical`);
  assert.equal(attr(canonicalTags[0], 'href').replace(/\/$/, ''), `https://www.devacia.com${route}`.replace(/\/$/, ''), `${route}: canonical destination`);
  assert.ok(title && description, `${route}: title and description`);
  assert.equal((html.match(/<h1\b/gi) || []).length, 1, `${route}: one server-rendered H1`);
  assert.equal((html.match(/<main\b/gi) || []).length, 1, `${route}: one main landmark`);
  assert.ok(!metaTags.some((tag) => attr(tag, 'name') === 'robots' && attr(tag, 'content').includes('noindex')), `${route}: indexable metadata`);
  const blocks = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((match) => JSON.parse(match[1]));
  const schemas = blocks.flatMap((block) => block['@graph'] || [block]);
  const faq = schemas.find((schema) => schema['@type'] === 'FAQPage');
  const needsFaq = !['/', ...supportingRoutes].includes(route);
  if (needsFaq) assert.ok(faq?.mainEntity?.length, `${route}: FAQ schema exists`);
  assert.equal(new Set((faq?.mainEntity || []).map((item) => item.name)).size, faq?.mainEntity?.length || 0, `${route}: unique FAQ questions`);
  for (const question of faq?.mainEntity || []) {
    assert.ok(bodyText.includes(question.name.replace(/\s+/g, ' ').trim()), `${route}: question in rendered HTML`);
    assert.ok(bodyText.includes(question.acceptedAnswer.text.replace(/\s+/g, ' ').trim()), `${route}: answer in rendered HTML`);
  }
  const headingNode = walk(parseDocument(html)).find(node => node.name === 'h1');
  assert.ok(!hiddenBeforeHydration(headingNode), `${route}: primary heading visible before hydration`);
  const currentService = currentServicePages.find(item => item.path === route);
  const guide = currentService ? null : guides.find((item) => item.path === route);
  const industryPage = canonicalIndustryPages.find((item) => item.path === route);
  const websitePage = Object.values(websitePages).find((item) => item.path === route);
  if (industryPage || websitePage) {
    const nodes = walk(parseDocument(html));
    const h1 = nodes.find(node => node.name === 'h1');
    assert.ok(!hiddenBeforeHydration(h1), `${route}: H1 and its ancestors visible before hydration`);
    const expectedMeta = industryPage?.meta || websitePage?.metadata;
    if (expectedMeta) {
      assert.ok(bodyText.includes(websiteOffer.indiaPrice), `${route}: shared starting price`);
      assert.ok(bodyText.includes(websiteOffer.scope), `${route}: shared scope boundary`);
      if (industryPage) {
        assert.ok(bodyText.includes(websiteOffer.terms), `${route}: visible payment terms`);
        assert.ok(!/[₹$]/.test(description), `${route}: price-free industry description`);
        for (const cost of industryPage.problem.costs) assert.ok(bodyText.includes(cost), `${route}: industry-specific operational cost`);
      }
    }
    if (expectedMeta) {
      assert.equal(title, expectedMeta.title, `${route}: intended offer title`);
      assert.equal(description, expectedMeta.description, `${route}: intended offer description`);
      for (const [name, expected] of [['og:title', title], ['og:description', description], ['og:url', `https://www.devacia.com${route}`], ['twitter:title', title], ['twitter:description', description]]) {
        assert.equal(attr(metaTags.find(tag => attr(tag, 'property') === name || attr(tag, 'name') === name) || '', 'content'), expected, `${route}: ${name}`);
      }
    }
    const expectedLinks = industryPage ? industryPage.related.map(link => ({ href: link.path })) : canonicalIndustryPages.map(page => ({ href: page.path }));
    for (const link of [...expectedLinks, { href: '/onboarding' }]) {
      const anchors = nodes.filter(node => node.name === 'a' && node.attribs?.href === link.href);
      assert.ok(anchors.some(node => !hiddenBeforeHydration(node)), `${route}: crawlable visible link to ${link.href}`);
      links.add(link.href);
    }
    for (const node of nodes.filter(node => node.name === 'a' && walk(node).filter(child => child.type === 'text').map(child => child.data).join(' ').includes('Book a Strategy Call'))) {
      assert.equal(node.attribs.href, '/onboarding', `${route}: strategy CTA destination`);
    }
    for (const node of nodes.filter(node => node.name === 'a')) {
      assert.ok(!industryAliases[node.attribs?.href], `${route}: internal industry links must use canonical URLs (${node.attribs?.href})`);
    }
    for (const node of nodes.filter(node => node.name === 'img' && node.attribs?.src?.startsWith('/'))) {
      const url = new URL(node.attribs.src, 'https://www.devacia.com');
      const imagePath = url.pathname === '/_next/image' ? url.searchParams.get('url') : url.pathname;
      if (imagePath?.startsWith('/')) await fs.access(path.join('public', decodeURIComponent(imagePath)));
      assert.ok('alt' in node.attribs, `${route}: image has alternative text attribute`);
    }
  }
  if (industryPage) {
    assert.ok(bodyText.includes(industryPage.hero.h1), `${route}: industry headline in initial HTML`);
    assert.ok(bodyText.includes(industryPage.hero.sub), `${route}: industry proposition in initial HTML`);
    assert.equal(faq.mainEntity.length, industryPage.faqs.length, `${route}: FAQ count matches visible offer`);
    assert.deepEqual(faq.mainEntity.map(item => [item.name, item.acceptedAnswer.text]), industryPage.faqs.map(item => [item.question, item.answer]), `${route}: industry FAQ content matches schema`);
    for (const module of industryPage.modules) {
      for (const content of [module.name, module.does, module.result]) assert.ok(bodyText.includes(content.replace(/\s+/g, ' ').trim()), `${route}: ${module.name} in initial HTML`);
    }
    const service = schemas.find(schema => schema['@type'] === 'Service');
    assert.equal(service?.url, `https://www.devacia.com${route}`, `${route}: service URL`);
    assert.equal(service?.description, description, `${route}: service description`);
    const breadcrumbs = schemas.find(schema => schema['@type'] === 'BreadcrumbList');
    assert.equal(breadcrumbs?.itemListElement.at(-1)?.item, `https://www.devacia.com${route}`, `${route}: breadcrumb destination`);
    assert.ok(html.includes(`href="${industryPage.evidence.workHref}"`), `${route}: project evidence link`);
    assert.ok(bodyText.includes(industryPage.evidence.text), `${route}: evidence accurately described`);
    for (const step of industryPage.salesFlow.steps) assert.ok(bodyText.includes(step.desc), `${route}: all workflow stages readable before interaction`);
    for (const item of industryPage.stack) {
      assert.ok(bodyText.includes(item.tech), `${route}: custom technology visible`);
      assert.ok(bodyText.includes(item.why), `${route}: technology purpose visible`);
    }
    for (const factor of industryPage.quoteFactors) assert.ok(bodyText.includes(factor), `${route}: specific quote scope visible`);
    for (const link of industryPage.related) assert.ok(bodyText.includes(link.label), `${route}: descriptive link label visible`);
  } else if (websitePage) {
    assert.equal(title, websitePage.metadata.title, `${route}: website offer title`);
    assert.equal(description, websitePage.metadata.description, `${route}: website offer description`);
    assert.ok(bodyText.includes(websitePage.title), `${route}: offer headline in initial HTML`);
    assert.ok(bodyText.includes(websiteOffer.indiaPrice), `${route}: agreed starting price`);
    if (websiteOffer.internationalPrice) assert.ok(bodyText.includes(websiteOffer.internationalPrice), `${route}: international starting price`);
    assert.ok(bodyText.includes(websiteOffer.scope), `${route}: scope boundary visible`);
    assert.equal(faq.mainEntity.length, websitePage.faqs.length, `${route}: no appended legacy FAQs`);
    assert.ok(html.includes('href="/onboarding"'), `${route}: booking route`);
    assert.ok(!/<h1\b[^>]*opacity:0/i.test(html), `${route}: visible H1 before hydration`);
    if (websitePage.industries) {
      for (const industry of websitePage.industries.filter(item => item.href)) {
        assert.ok(html.includes(`href="${industry.href}"`), `${route}: published industry link`);
        links.add(industry.href);
      }
    } else {
      assert.ok(html.includes('href="/services/website-development"'), `${route}: parent link`);
    }
  }
  if (currentService) {
    assert.equal(title, currentService.meta.title, `${route}: current service title wins over legacy guide`);
    assert.equal(description, currentService.meta.description, `${route}: current service description`);
    assert.deepEqual(faq.mainEntity.map(item => [item.name, item.acceptedAnswer.text]), currentService.faqs.map(item => [item.question, item.answer]), `${route}: current service FAQ parity`);
    const nodes = walk(parseDocument(html));
    for (const question of currentService.faqs) {
      const summaries = nodes.filter(node => node.name === 'summary');
      assert.ok(summaries.some(node => textOnly(node.children.map(child => child.data || (child.children || []).map(grandchild => grandchild.data || '').join(' ')).join(' ')).includes(question.question)), `${route}: native accessible FAQ disclosure`);
    }
    for (const node of nodes.filter(node => node.name === 'a' && walk(node).filter(child => child.type === 'text').map(child => child.data).join(' ').includes('Book a Strategy Call'))) assert.equal(node.attribs.href, '/onboarding', `${route}: strategy CTA destination`);
  }
  if (guide) {
    assert.equal(title, guide.metadata.title, `${route}: intended title`);
    assert.equal(description, guide.metadata.description, `${route}: intended description`);
    assert.ok(bodyText.includes(guide.title), `${route}: buyer guide in initial HTML`);
    for (const link of guide.links) {
      assert.ok(html.includes(`href="${link.href}"`), `${route}: guide link rendered`);
      links.add(link.href);
    }
  }
  if (origin) {
    const response = await fetch(`${origin}${route}`);
    assert.equal(response.status, 200, `${route}: HTTP 200`);
    assert.ok(!(response.headers.get('x-robots-tag') || '').includes('noindex'), `${route}: indexable HTTP header`);
  }
  if (route === '/') {
    assert.ok(bodyText.includes('Almina: custom ecommerce'), 'Homepage project evidence exists before hydration');
    assert.ok(!/<h1\b[^>]*opacity:0/i.test(html), 'Hero H1 must be visible before hydration');
    assert.ok(bodyText.includes('Devacia is a full-service web design, development') || bodyText.includes('WordPress websites, Shopify and ecommerce stores'), 'Hero description renders without a typing timer');
    assert.ok(html.includes('id="consent-default"'), 'Consent defaults exist before optional scripts');
    assert.ok(!/<script\b[^>]*src="https:\/\/(?:www\.googletagmanager|connect\.facebook)/i.test(html), 'No optional tracking script in initial HTML');
  }
  checks.push({ route, title, description, canonical: attr(canonicalTags[0], 'href'), h1Count: 1, mainCount: 1, h1Text: textOnly(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || ''), faqCount: faq?.mainEntity?.length || 0, schemaBlocks: blocks.length, guideInInitialHtml: Boolean(guide), ...(origin ? { status: 200 } : {}) });
}
assert.equal(new Set(checks.map((item) => item.title)).size, checks.length, 'Unique priority page titles');
assert.equal(new Set(checks.map((item) => item.description)).size, checks.length, 'Unique priority descriptions');
const manifest = JSON.parse(await fs.readFile('.next/server/app-paths-manifest.json', 'utf8'));
const prerenderManifest = JSON.parse(await fs.readFile('.next/prerender-manifest.json', 'utf8').catch(() => '{"routes":{}}'));
const routes = new Set([
  ...Object.keys(manifest).map((path) => path.replace(/\/\([^/]+\)/g, '').replace(/\/page$/, '') || '/'),
  ...Object.keys(prerenderManifest.routes || {}),
]);
for (const retired of ['/industries', '/resources', '/resources/website-project-brief', '/resources/website-maintenance-checklist', '/resources/b2b-rfq-workflow']) {
  assert.ok(!routes.has(retired), `${retired}: retired page must not return to the production build`);
}
for (const link of links) {
  assert.ok(routes.has(link), `${link}: link target in route manifest`);
  if (origin) assert.equal((await fetch(`${origin}${link}`)).status, 200, `${link}: link HTTP 200`);
}
let sitemapChecked = false;
let categoryRedirectChecked = false;
let industryRedirectsChecked = 0;
if (origin) {
  const response = await fetch(`${origin}/sitemap.xml`);
  assert.equal(response.status, 200);
  const sitemap = await response.text();
  assert.ok(!sitemap.includes('<loc>https://www.devacia.com/services/ecommerce</loc>'), 'Legacy ecommerce alias excluded from sitemap');
  const ecommerceRedirect = await fetch(`${origin}/services/ecommerce?utm_source=seo-check`, { redirect: 'manual' });
  assert.equal(ecommerceRedirect.status, 308, 'Ecommerce migration is permanent');
  const ecommerceDestination = new URL(ecommerceRedirect.headers.get('location'), origin);
  assert.equal(ecommerceDestination.pathname, '/services/ecommerce-website-development');
  assert.equal(ecommerceDestination.searchParams.get('utm_source'), 'seo-check');
  for (const [route, date] of Object.entries(updates)) {
    const expectedUrl = `https://www.devacia.com${route}`.replace(/\/$/, '');
    const entry = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].find((match) => match[1].match(/<loc>(.*?)<\/loc>/)?.[1].replace(/\/$/, '') === expectedUrl);
    assert.ok(entry?.[1].includes(`<lastmod>${date}`), `${route}: updated sitemap timestamp`);
  }
  const llms = await (await fetch(`${origin}/llms.txt`)).text();
  const llmsFull = await (await fetch(`${origin}/llms-full.txt`)).text();
  for (const page of canonicalIndustryPages) {
    assert.ok(llms.includes(`https://www.devacia.com${page.path}`), `${page.path}: discovery index`);
    assert.ok(llmsFull.includes(`https://www.devacia.com${page.path}`), `${page.path}: full discovery index`);
  }
  for (const [oldPath, canonicalPath] of Object.entries(industryAliases)) {
    assert.ok(!sitemap.includes(`<loc>https://www.devacia.com${oldPath}</loc>`), `${oldPath}: alias excluded from sitemap`);
    const moved = await fetch(`${origin}${oldPath}?utm_source=seo-qa`, { redirect: 'manual' });
    assert.equal(moved.status, 308, `${oldPath}: permanent industry redirect`);
    const destination = new URL(moved.headers.get('location'), origin);
    assert.equal(destination.pathname, canonicalPath, `${oldPath}: direct canonical destination`);
    assert.equal(destination.searchParams.get('utm_source'), 'seo-qa', `${oldPath}: campaign survives redirect`);
    industryRedirectsChecked++;
  }
  assert.equal((await fetch(`${origin}/industries/devacia-qa-unknown-sector`)).status, 404, 'Unknown industries remain 404');
  sitemapChecked = true;
  const oldArticle = '/blog/d2c-ecommerce-growth/shopify-vs-custom-website-d2c-india';
  const canonicalArticle = '/blog/web-development/shopify-vs-custom-website-d2c-india';
  const moved = await fetch(`${origin}${oldArticle}`, { redirect: 'manual' });
  assert.equal(moved.status, 308, 'Published article survives category reassignment');
  assert.equal(new URL(moved.headers.get('location'), origin).pathname, canonicalArticle);
  const article = await fetch(`${origin}${canonicalArticle}`);
  assert.equal(article.status, 200, 'Moved article destination is published');
  const articleHtml = await article.text();
  assert.equal((articleHtml.match(/<h1\b/gi) || []).length, 1, 'CMS article has one H1');
  assert.equal((articleHtml.match(/<main\b/gi) || []).length, 1, 'CMS article has one main');
  assert.ok(articleHtml.includes(`href="https://www.devacia.com${canonicalArticle}"`), 'CMS canonical points to current category');
  assert.equal((await fetch(`${origin}/blog/web-development/devacia-qa-nonexistent-article`)).status, 404, 'Unknown articles remain 404');
  categoryRedirectChecked = true;
}
if (origin) execFileSync(process.execPath, ['scripts/verify-production-cleanup.mjs', origin], { stdio: 'inherit' });
const archiveManifest = JSON.parse(await fs.readFile('private/documents/manifest.json', 'utf8'));
const tracePath = '.next/server/pages/api/admin/documents.js.nft.json';
const trace = JSON.parse(await fs.readFile(tracePath, 'utf8'));
const tracedFiles = new Set(trace.files.map(file => path.resolve(path.dirname(tracePath), file)));
for (const filename of ['manifest.json', ...archiveManifest.map(row => row.id)]) {
  assert.ok(tracedFiles.has(path.resolve('private/documents', filename)), 'Private archive must be included in the server function trace');
}
if (origin) {
  for (const { id } of archiveManifest) assert.equal((await fetch(`${origin}/${id}`, { redirect: 'manual' })).status, 404, 'Former public PDF URL returns 404');
  const response = await fetch(`${origin}/api/admin/documents`);
  assert.equal(response.status, 401, 'Archive API rejects anonymous access');
  assert.ok(response.headers.get('cache-control').includes('no-store'));
  const admin = await fetch(`${origin}/admin/document-archive`, { redirect: 'manual' });
  assert.equal(admin.status, 307); assert.ok(admin.headers.get('location').endsWith('/admin/login'));
}
const evidence = { checkedAt: new Date().toISOString(), scope: 'Local production build; not live rankings or performance metrics', pagesChecked: checks.length, guideLinksChecked: links.size, sitemapChecked, industryRedirectsChecked, categoryRedirectChecked, privateDocumentsTraced: archiveManifest.length, publicPdfUrlsChecked: origin ? archiveManifest.length : 0, anonymousArchiveBlocked: Boolean(origin), checks };
await fs.writeFile(process.env.SEO_EVIDENCE_PATH || 'docs/seo/evidence/implementation-verification-latest.json', `${JSON.stringify(evidence, null, 2)}\n`);
console.log(JSON.stringify({ pagesChecked: checks.length, guideLinksChecked: links.size, sitemapChecked, industryRedirectsChecked, categoryRedirectChecked, privateDocumentsTraced: archiveManifest.length, anonymousArchiveBlocked: Boolean(origin), result: 'passed' }));

// Read-only public crawl and Search Console evidence. Never prints credentials.
import fs from 'node:fs/promises';
import { google } from 'googleapis';

const out = 'docs/seo/evidence';
await fs.mkdir(out, { recursive: true });
const save = (name, data) => fs.writeFile(`${out}/${name}.json`, JSON.stringify(data, null, 2));
const origin = 'https://www.devacia.com';
const mode = process.argv[2] || 'crawl';
const safeError = (error) => ({ code: error.code || error.status || null, message: error.response?.data?.error?.message || error.response?.data?.error || error.message });

if (mode === 'gsc') {
  const report = { collectedAt: new Date().toISOString(), status: 'pending' };
  try {
    const config = JSON.parse(await fs.readFile('gsc-oauth.json', 'utf8'));
    const credentials = config.installed || config.web;
    const auth = new google.auth.OAuth2(credentials.client_id, credentials.client_secret, credentials.redirect_uris?.[0]);
    auth.setCredentials(JSON.parse(await fs.readFile('gsc-token.json', 'utf8')));
    const api = google.searchconsole({ version: 'v1', auth });
    const sites = (await api.sites.list({}, { timeout: 30000 })).data.siteEntry || [];
    const siteUrl = ['sc-domain:devacia.com', `${origin}/`].find((url) => sites.some((site) => site.siteUrl === url));
    if (!siteUrl) throw new Error('Data required: no matching Devacia property accessible.');
    report.property = siteUrl;
    report.windows = {};
    const day = (offset) => new Date(Date.now() - offset * 86400000).toISOString().slice(0, 10);
    for (const [label, start, end] of [['current28', 29, 2], ['previous28', 57, 30], ['current90', 91, 2]]) {
      const window = { startDate: day(start), endDate: day(end), searchType: 'web', dataState: 'final' };
      report.windows[label] = { ...window };
      for (const dimensions of [[], ['query'], ['page'], ['country'], ['device'], ['query', 'page']]) {
        const key = dimensions.join('_') || 'totals';
        const data = (await api.searchanalytics.query({ siteUrl, requestBody: { ...window, dimensions, rowLimit: 25000 } }, { timeout: 30000 })).data;
        report.windows[label][key] = data.rows || [];
      }
    }
    report.sitemaps = (await api.sitemaps.list({ siteUrl }, { timeout: 30000 })).data;
    report.inspections = [];
    for (const path of ['/', '/services/website-development', '/services/ecommerce', '/solutions/custom-booking-systems', '/industries/restaurants/booking-ordering-system', '/blog']) {
      try {
        const data = (await api.urlInspection.index.inspect({ requestBody: { siteUrl, inspectionUrl: `${origin}${path}` } }, { timeout: 30000 })).data;
        report.inspections.push({ path, result: data.inspectionResult });
      } catch (error) { report.inspections.push({ path, error: safeError(error) }); }
    }
    report.status = 'success';
  } catch (error) { report.status = 'unavailable'; report.error = safeError(error); }
  await save('search-console', report);
  console.log(JSON.stringify({ status: report.status, property: report.property, error: report.error, totals: report.windows?.current28?.totals }));
} else {
  const get = async (url) => {
    const start = Date.now();
    const response = await fetch(url, { signal: AbortSignal.timeout(30000), headers: { 'User-Agent': 'DevaciaSEOAudit/1.0' } });
    return { status: response.status, finalUrl: response.url, elapsedMs: Date.now() - start, headers: Object.fromEntries(['content-type', 'x-robots-tag', 'cache-control', 'location'].map((key) => [key, response.headers.get(key)])), body: await response.text() };
  };
  const report = { collectedAt: new Date().toISOString(), method: 'Public HTTP HTML, no JavaScript execution. Response elapsedMs is not Core Web Vitals.', pages: [], resources: [] };
  try {
    const sitemap = await get(`${origin}/sitemap.xml`);
    await fs.writeFile(`${out}/sitemap.xml`, sitemap.body);
    const robots = await get(`${origin}/robots.txt`);
    await fs.writeFile(`${out}/robots.txt`, robots.body);
    const urls = [...new Set([...sitemap.body.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]))];
    report.sitemapStatus = sitemap.status;
    report.sitemapUrls = urls.length;
    const attr = (tag, name) => tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, 'i'))?.[1] || '';
    const text = (value) => value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    for (let i = 0; i < urls.length; i += 4) {
      const batch = await Promise.all(urls.slice(i, i + 4).map(async (url) => {
        try {
          const page = await get(url);
          const html = page.body;
          const tags = [...html.matchAll(/<(?:meta|link)\b[^>]*>/gi)].map((m) => m[0]);
          const meta = (name) => attr(tags.find((tag) => attr(tag, 'name') === name || attr(tag, 'property') === name) || '', 'content');
          const links = [...html.matchAll(/<a\b[^>]*href=["']([^"']*)["'][^>]*>/gi)].map((m) => m[1]);
          const internalLinks = [...new Set(links.filter((href) => href && !href.startsWith('#')).map((href) => { try { const u = new URL(href, url); return u.origin === origin ? u.pathname : null; } catch { return null; } }).filter(Boolean))];
          const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
          const schema = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => { try { return JSON.parse(m[1]); } catch { return { parseError: true }; } });
          const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || '';
          return { url, status: page.status, finalUrl: page.finalUrl, elapsedMs: page.elapsedMs, headers: page.headers, bytes: Buffer.byteLength(html), title: text(html.match(/<title[^>]*>(.*?)<\/title>/i)?.[1] || ''), description: meta('description'), canonical: attr(tags.find((tag) => attr(tag, 'rel') === 'canonical') || '', 'href'), robots: meta('robots'), ogImage: meta('og:image'), h1: [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => text(m[1])), headings: [...main.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => ({ level: Number(m[1]), text: text(m[2]) })), mainWords: text(main.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')).split(' ').filter(Boolean).length, imageCount: images.length, missingAlt: images.filter((tag) => !/\balt=/.test(tag)).length, unsizedImages: images.filter((tag) => !/\bwidth=/.test(tag) || !/\bheight=/.test(tag)).length, internalLinks, schema };
        } catch (error) { return { url, error: safeError(error) }; }
      }));
      report.pages.push(...batch);
      console.log(`Crawled ${report.pages.length}/${urls.length}`);
    }
    const missing = [...new Set(report.pages.flatMap((p) => p.internalLinks || []))].filter((path) => !urls.some((u) => new URL(u).pathname === path));
    for (const url of [...missing.filter((p) => !p.startsWith('/api/')).map((p) => `${origin}${p}`), `${origin}/logo.png`, `${origin}/logo-clean.png`, `${origin}/og`, `${origin}/seo-audit-nonexistent-20260930`, 'http://devacia.com', 'https://devacia.com']) {
      try { const { body, ...resource } = await get(url); report.resources.push({ url, ...resource, title: body.match(/<title[^>]*>(.*?)<\/title>/i)?.[1] }); }
      catch (error) { report.resources.push({ url, error: safeError(error) }); }
    }
  } catch (error) { report.error = safeError(error); }
  await save('live-crawl', report);
  console.log(JSON.stringify({ pages: report.pages.length, sitemapUrls: report.sitemapUrls, failures: report.pages.filter((p) => p.status !== 200).map((p) => ({ url: p.url, status: p.status, error: p.error })), error: report.error }));
}

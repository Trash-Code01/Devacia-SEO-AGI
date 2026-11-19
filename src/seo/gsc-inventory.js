import '../../scripts/env-loader.js';

export function getGscOrigin() {
  return (process.env.GSC_SITE_URL || process.env.SEO_SITE_URL || 'https://www.devacia.com').replace(/\/+$/, '');
}

export const GSC_ORIGIN = getGscOrigin();

export function getInspectionUrls(xml, customOrigin) {
  if (!/<urlset(?:\s|>)/.test(xml)) throw new Error('Expected a URL sitemap, not a sitemap index or error page.');
  const urls = [...new Set([...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)]
    .map(match => match[1].replaceAll('&amp;', '&')))];
  if (!urls.length) throw new Error('The sitemap contains no URLs.');

  const expectedOrigin = (customOrigin || getGscOrigin()).toLowerCase();

  for (const value of urls) {
    const url = new URL(value);
    if (url.origin.toLowerCase() !== expectedOrigin && expectedOrigin !== '*') {
      // If URL belongs to the expected domain or subdomain, permit it
      const expectedHost = new URL(expectedOrigin).hostname.replace(/^www\./, '');
      if (!url.hostname.endsWith(expectedHost)) {
        throw new Error(`The sitemap contains a URL (${value}) outside expected origin (${expectedOrigin}).`);
      }
    }
    if (url.username || url.password || url.hash) {
      throw new Error(`The sitemap contains an invalid URL structure: ${value}`);
    }
  }
  return urls;
}

export function selectProperty(sites, customOrigin) {
  const origin = (customOrigin || getGscOrigin()).replace(/\/+$/, '');
  const domain = origin.replace(/^https?:\/\//, '').replace(/^www\./, '');
  
  const candidates = [
    `${origin}/`,
    origin,
    `sc-domain:${domain}`,
    `sc-domain:www.${domain}`,
    `https://${domain}/`,
    `https://www.${domain}/`
  ];

  const match = candidates
    .map(url => sites.find(site => site.siteUrl === url && site.permissionLevel !== 'siteUnverifiedUser'))
    .find(Boolean);

  if (match) return match;

  // Fallback: If user has a verified property in their Google Search Console, use the first verified property
  const anyVerified = sites.find(site => site.permissionLevel !== 'siteUnverifiedUser');
  if (anyVerified) {
    return anyVerified;
  }

  throw new Error(`No verified property found matching "${origin}" or any other verified property in this Search Console account.`);
}

export const selectDevaciaProperty = selectProperty;

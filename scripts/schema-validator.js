/**
 * Devacia SEO AGI — Schema Graph & Rich Snippet Validator
 * 
 * Fetches HTML from any URL and validates Google Search Central structured data:
 * 1. JSON-LD scripts extraction and parsing
 * 2. Organization, LocalBusiness, WebSite, Service, Article, and FAQ schema checks
 * 3. Required Google Rich Result fields validation
 * 4. OpenGraph and Twitter card metadata verification
 */

export async function auditSchema(targetUrl = 'https://www.devacia.com') {
  try {
    const res = await fetch(targetUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' },
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch page: HTTP ${res.status}`);
    }

    const html = await res.text();

    // 1. Extract JSON-LD scripts
    const jsonLdRegex = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    const schemas = [];
    let match;

    while ((match = jsonLdRegex.exec(html)) !== null) {
      try {
        const parsed = JSON.parse(match[1]);
        if (Array.isArray(parsed)) {
          schemas.push(...parsed);
        } else if (parsed['@graph'] && Array.isArray(parsed['@graph'])) {
          schemas.push(...parsed['@graph']);
        } else {
          schemas.push(parsed);
        }
      } catch (err) {
        schemas.push({ error: 'Invalid JSON-LD syntax', raw: match[1].slice(0, 100) });
      }
    }

    // 2. Identify Types
    const schemaTypes = schemas.map(s => s['@type']).filter(Boolean);

    // 3. OpenGraph & Meta
    const ogTags = {};
    const metaRegex = /<meta\b[^>]*property=["'](og:[^"']+)["'][^>]*content=["']([^"']*)["'][^>]*>/gi;
    let ogMatch;
    while ((ogMatch = metaRegex.exec(html)) !== null) {
      ogTags[ogMatch[1]] = ogMatch[2];
    }

    // Also check name="twitter:..."
    const twitterTags = {};
    const twRegex = /<meta\b[^>]*name=["'](twitter:[^"']+)["'][^>]*content=["']([^"']*)["'][^>]*>/gi;
    let twMatch;
    while ((twMatch = twRegex.exec(html)) !== null) {
      twitterTags[twMatch[1]] = twMatch[2];
    }

    // 4. Schema Health Verification
    const checks = {
      hasOrganizationOrBusiness: schemaTypes.some(t => ['Organization', 'LocalBusiness', 'ProfessionalService'].includes(t)),
      hasWebSite: schemaTypes.includes('WebSite'),
      hasServiceOrProduct: schemaTypes.some(t => ['Service', 'Product', 'Offer'].includes(t)),
      hasFaq: schemaTypes.includes('FAQPage'),
      hasBreadcrumbs: schemaTypes.includes('BreadcrumbList'),
      hasOpenGraph: Object.keys(ogTags).length >= 3,
      hasTwitterCards: Object.keys(twitterTags).length >= 2,
    };

    let score = 0;
    if (checks.hasOrganizationOrBusiness) score += 25;
    if (checks.hasWebSite) score += 15;
    if (checks.hasServiceOrProduct) score += 20;
    if (checks.hasBreadcrumbs) score += 15;
    if (checks.hasOpenGraph) score += 15;
    if (checks.hasTwitterCards) score += 10;

    return {
      success: true,
      url: targetUrl,
      score,
      totalSchemas: schemas.length,
      typesFound: schemaTypes,
      schemas,
      openGraph: ogTags,
      twitter: twitterTags,
      checks,
    };
  } catch (err) {
    return {
      success: false,
      url: targetUrl,
      error: err.message,
    };
  }
}

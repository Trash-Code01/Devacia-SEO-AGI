import fs from 'fs';
import path from 'path';
import http from 'http';
import url, { fileURLToPath } from 'url';
import { exec } from 'child_process';
import readline from 'readline';
import { google } from 'googleapis';
import './env-loader.js';

// ---------------------------------------------------------------------------
// Configuration & Credentials Paths
// ---------------------------------------------------------------------------
export const GKP_CONFIG_PATH = process.env.GKP_CONFIG_PATH || path.resolve(process.cwd(), 'gkp-config.json');
export const GKP_TOKEN_PATH  = process.env.GKP_TOKEN_PATH  || path.resolve(process.cwd(), 'gkp-token.json');
export const GKP_OAUTH_PATH  = process.env.GKP_OAUTH_PATH  || path.resolve(process.cwd(), 'gkp-oauth.json');
export const GOOGLE_OAUTH_PATH = process.env.GOOGLE_OAUTH_PATH || path.resolve(process.cwd(), 'google-oauth.json');
export const GA4_OAUTH_PATH  = process.env.GA4_OAUTH_PATH  || path.resolve(process.cwd(), 'ga4-oauth.json');
export const GSC_OAUTH_PATH  = process.env.GSC_OAUTH_PATH  || path.resolve(process.cwd(), 'gsc-oauth.json');
export const GBP_OAUTH_PATH  = process.env.GBP_OAUTH_PATH  || path.resolve(process.cwd(), 'gbp-oauth.json');
export const EXPORT_DIR      = path.resolve(process.cwd(), 'docs', 'seo-keywords');

function openBrowser(targetUrl) {
  try {
    const cmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start ""' : 'xdg-open';
    exec(`${cmd} "${targetUrl}"`);
  } catch {
    // Console output available
  }
}

// Google Ads API Scope
const SCOPES = ['https://www.googleapis.com/auth/adwords'];

// GeoTarget Constants (Google Ads API standard criterion IDs)
const GEO_TARGETS = {
  US: '2840',
  USA: '2840',
  IN: '2356',
  INDIA: '2356',
  UK: '2826',
  GB: '2826',
  CA: '2124',
  AU: '2036',
  DE: '2276',
  FR: '2250',
  GLOBAL: null,
};

// Language Constants (Google Ads API standard criterion IDs)
const LANGUAGE_TARGETS = {
  en: '1000',
  es: '1003',
  fr: '1002',
  de: '1001',
  hi: '1023',
};

// ---------------------------------------------------------------------------
// Configuration Helpers
// ---------------------------------------------------------------------------
function loadConfig() {
  let fileConfig = {};
  if (fs.existsSync(GKP_CONFIG_PATH)) {
    try {
      fileConfig = JSON.parse(fs.readFileSync(GKP_CONFIG_PATH, 'utf-8'));
    } catch {
      fileConfig = {};
    }
  }

  return {
    developerToken: process.env.GOOGLE_ADS_DEVELOPER_TOKEN || fileConfig.developerToken || '',
    customerId: (process.env.GOOGLE_ADS_CUSTOMER_ID || fileConfig.customerId || '').replace(/[^0-9]/g, ''),
    loginCustomerId: (process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID || fileConfig.loginCustomerId || '').replace(/[^0-9]/g, ''),
    defaultGeo: fileConfig.defaultGeo || 'US',
    defaultLanguage: fileConfig.defaultLanguage || 'en',
    currency: fileConfig.currency || 'USD',
  };
}

function saveConfig(updated) {
  const current = loadConfig();
  const merged = { ...current, ...updated };
  fs.writeFileSync(GKP_CONFIG_PATH, JSON.stringify(merged, null, 2), 'utf-8');
  return merged;
}

// ---------------------------------------------------------------------------
// OAuth Authentication Helpers
// ---------------------------------------------------------------------------
function getOAuth2Client() {
  let oauthPath = GKP_OAUTH_PATH;
  if (fs.existsSync(GKP_OAUTH_PATH)) {
    // Dedicated client found
  } else if (fs.existsSync(GOOGLE_OAUTH_PATH)) {
    oauthPath = GOOGLE_OAUTH_PATH;
  } else if (fs.existsSync(GA4_OAUTH_PATH)) {
    oauthPath = GA4_OAUTH_PATH;
  } else if (fs.existsSync(GSC_OAUTH_PATH)) {
    oauthPath = GSC_OAUTH_PATH;
  } else if (fs.existsSync(GBP_OAUTH_PATH)) {
    oauthPath = GBP_OAUTH_PATH;
  } else {
    throw new Error(
      `Google OAuth credentials file not found. Looked for:\n` +
      `  - ${GKP_OAUTH_PATH}\n` +
      `  - ${GOOGLE_OAUTH_PATH}\n` +
      `  - ${GA4_OAUTH_PATH}\n` +
      `  - ${GSC_OAUTH_PATH}\n` +
      `  - ${GBP_OAUTH_PATH}\n\n` +
      `Please save your Google Cloud Console OAuth 2.0 Client credentials to gkp-oauth.json or google-oauth.json.`
    );
  }

  const content = JSON.parse(fs.readFileSync(oauthPath, 'utf-8'));
  const creds = content.installed || content.web;
  if (!creds?.client_id || !creds?.client_secret) {
    throw new Error(`Invalid OAuth credentials format in ${oauthPath}. Missing client_id or client_secret.`);
  }

  return new google.auth.OAuth2(
    creds.client_id,
    creds.client_secret,
    'http://localhost:3333/oauth2callback'
  );
}

async function authenticate(forceNew = false) {
  const oAuth2Client = getOAuth2Client();

  if (!forceNew && fs.existsSync(GKP_TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(GKP_TOKEN_PATH, 'utf-8'));
    oAuth2Client.setCredentials(token);
    return oAuth2Client;
  }

  console.log('\n--- Google Ads Keyword Planner Authorization ---');
  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      try {
        if (req.url && req.url.startsWith('/oauth2callback')) {
          const query = new url.URL(req.url, 'http://localhost:3333').searchParams;
          const code = query.get('code');
          if (code) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
              <html>
                <body style="font-family:sans-serif;text-align:center;padding:50px;background:#0d1117;color:#58a6ff;">
                  <h1>Google Ads Authorization Successful!</h1>
                  <p style="color:#c9d1d9;">You can close this tab and return to your terminal.</p>
                </body>
              </html>
            `);
            server.close();

            const { tokens } = await oAuth2Client.getToken(code);
            oAuth2Client.setCredentials(tokens);
            fs.writeFileSync(GKP_TOKEN_PATH, JSON.stringify(tokens, null, 2));
            console.log('✓ Credentials successfully saved to gkp-token.json\n');
            resolve(oAuth2Client);
          } else {
            res.writeHead(400);
            res.end('Missing code');
            reject(new Error('Missing authorization code in redirect'));
          }
        }
      } catch (err) {
        reject(err);
      }
    });

    server.listen(3333, () => {
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: SCOPES,
      });

      console.log('Opening browser for Google Ads authorization...');
      console.log(`If it does not open automatically, visit:\n${authUrl}\n`);
      openBrowser(authUrl);
    });
  });
}

async function getValidAccessToken() {
  if (!fs.existsSync(GKP_TOKEN_PATH)) {
    return null;
  }
  const oAuth2Client = getOAuth2Client();
  const token = JSON.parse(fs.readFileSync(GKP_TOKEN_PATH, 'utf-8'));
  oAuth2Client.setCredentials(token);
  const tokenRes = await oAuth2Client.getAccessToken();
  return tokenRes.token;
}

// ---------------------------------------------------------------------------
// Google Ads API (Official Keyword Planner)
// ---------------------------------------------------------------------------
async function fetchGoogleAdsKeywordIdeas({ keywords = [], urlSeed = null, geo = 'US', language = 'en' }) {
  const config = loadConfig();
  if (!config.developerToken) {
    throw new Error('MISSING_DEVELOPER_TOKEN');
  }
  if (!config.customerId) {
    throw new Error('MISSING_CUSTOMER_ID');
  }

  const accessToken = await getValidAccessToken();
  if (!accessToken) {
    throw new Error('UNAUTHENTICATED');
  }

  const endpoint = `https://googleads.googleapis.com/v18/customers/${config.customerId}:generateKeywordIdeas`;
  const geoCode = (geo || config.defaultGeo).toUpperCase();
  const geoId = GEO_TARGETS[geoCode] || GEO_TARGETS.US;
  const langCode = (language || config.defaultLanguage).toLowerCase();
  const langId = LANGUAGE_TARGETS[langCode] || LANGUAGE_TARGETS.en;

  const requestBody = {
    customerId: config.customerId,
    language: `languageConstants/${langId}`,
    includeAdultKeywords: false,
    keywordPlanNetwork: 'GOOGLE_SEARCH',
  };

  if (geoId) {
    requestBody.geoTargetConstants = [`geoTargetConstants/${geoId}`];
  }

  if (keywords.length > 0 && urlSeed) {
    requestBody.keywordAndUrlSeed = {
      url: urlSeed,
      keywords: keywords.slice(0, 20),
    };
  } else if (keywords.length > 0) {
    requestBody.keywordSeed = {
      keywords: keywords.slice(0, 20),
    };
  } else if (urlSeed) {
    requestBody.urlSeed = {
      url: urlSeed,
    };
  } else {
    throw new Error('Either keywords or urlSeed must be provided.');
  }

  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'developer-token': config.developerToken,
    'Content-Type': 'application/json',
  };

  if (config.loginCustomerId) {
    headers['login-customer-id'] = config.loginCustomerId;
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(requestBody),
  });

  const responseData = await response.json();
  if (!response.ok) {
    const errorMsg = responseData?.error?.message || JSON.stringify(responseData);
    throw new Error(`Google Ads API Error (${response.status}): ${errorMsg}`);
  }

  const results = responseData.results || [];
  return results.map((item) => {
    const metrics = item.keywordIdeaMetrics || {};
    const avgMonthly = parseInt(metrics.avgMonthlySearches || '0', 10);
    const comp = metrics.competition || 'UNSPECIFIED';
    const compIndex = parseInt(metrics.competitionIndex || '0', 10);
    const lowBid = metrics.lowTopOfPageBidMicros ? (parseInt(metrics.lowTopOfPageBidMicros, 10) / 1000000).toFixed(2) : '0.00';
    const highBid = metrics.highTopOfPageBidMicros ? (parseInt(metrics.highTopOfPageBidMicros, 10) / 1000000).toFixed(2) : '0.00';

    return {
      keyword: item.text,
      searchVolume: avgMonthly,
      competition: comp,
      competitionIndex: compIndex,
      cpcLow: parseFloat(lowBid),
      cpcHigh: parseFloat(highBid),
      intent: classifyIntent(item.text),
      source: 'Google Ads Keyword Planner API',
    };
  });
}

// ---------------------------------------------------------------------------
// Google Suggest & Search Intelligence (Zero-Auth Instant Engine)
// ---------------------------------------------------------------------------
async function fetchGoogleSuggestions(query, geo = 'us', language = 'en') {
  try {
    const targetUrl = `https://suggestqueries.google.com/complete/search?client=chrome&q=${encodeURIComponent(query)}&hl=${encodeURIComponent(language)}&gl=${encodeURIComponent(geo.toLowerCase())}`;
    const res = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
      },
    });

    if (!res.ok) return [];
    const data = await res.json();
    const suggestions = Array.isArray(data[1]) ? data[1] : [];
    const relevances = data[4]?.['google:suggestrelevance'] || [];

    return suggestions.map((text, idx) => ({
      keyword: text,
      relevance: relevances[idx] || (1000 - idx * 25),
    }));
  } catch {
    return [];
  }
}

async function expandKeywordsWithGoogle(seed, { geo = 'us', language = 'en', includeAlphabet = true } = {}) {
  const cleanSeed = seed.trim();
  const queries = [
    cleanSeed,
    // Questions & Intent Modifiers
    `how to ${cleanSeed}`,
    `what is ${cleanSeed}`,
    `best ${cleanSeed}`,
    `top ${cleanSeed}`,
    `${cleanSeed} services`,
    `${cleanSeed} cost`,
    `${cleanSeed} pricing`,
    `${cleanSeed} agency`,
    `${cleanSeed} company`,
    `${cleanSeed} vs`,
    `${cleanSeed} near me`,
    `${cleanSeed} for small business`,
    `${cleanSeed} checklist`,
    `${cleanSeed} tools`,
  ];

  if (includeAlphabet) {
    const chars = 'abcdefghijklmnopqrstuvwxyz'.split('');
    chars.forEach((c) => {
      queries.push(`${cleanSeed} ${c}`);
    });
  }

  // Batch query to respect polite rate limiting
  const batchSize = 6;
  const rawMap = new Map();

  for (let i = 0; i < queries.length; i += batchSize) {
    const batch = queries.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map((q) => fetchGoogleSuggestions(q, geo, language))
    );

    batchResults.flat().forEach((item) => {
      const lower = item.keyword.trim().toLowerCase();
      if (!lower) return;
      if (!rawMap.has(lower) || rawMap.get(lower).relevance < item.relevance) {
        rawMap.set(lower, item);
      }
    });

    if (i + batchSize < queries.length) {
      await new Promise((r) => setTimeout(r, 60));
    }
  }

  const items = Array.from(rawMap.values());

  // Enrich with Intent and SEO Difficulty Tier Estimation
  return items.map((item) => {
    const intent = classifyIntent(item.keyword);
    const wordCount = item.keyword.split(/\s+/).length;
    
    // Heuristic difficulty based on word length and competitive intent keywords
    let difficultyTier = 'LOW';
    let difficultyScore = 20;

    if (wordCount <= 2) {
      difficultyTier = 'VERY_HIGH';
      difficultyScore = 85;
    } else if (wordCount === 3) {
      difficultyTier = 'MEDIUM';
      difficultyScore = 50;
    } else if (wordCount >= 5) {
      difficultyTier = 'VERY_LOW';
      difficultyScore = 15;
    }

    if (intent === 'Transactional' || intent === 'Commercial') {
      difficultyScore += 10;
    }

    // Estimated monthly volume bucket based on Google Suggest relevance rank
    let estimatedVolumeTier = '1K - 10K';
    if (item.relevance >= 1000) estimatedVolumeTier = '10K - 100K';
    else if (item.relevance >= 700) estimatedVolumeTier = '1K - 10K';
    else if (item.relevance >= 500) estimatedVolumeTier = '500 - 1K';
    else estimatedVolumeTier = '100 - 500';

    return {
      keyword: item.keyword,
      searchVolumeEstimated: estimatedVolumeTier,
      relevanceScore: item.relevance,
      intent,
      difficultyTier,
      difficultyScore: Math.min(100, Math.max(5, difficultyScore)),
      source: 'Google Live Suggest Intelligence',
    };
  });
}

// ---------------------------------------------------------------------------
// Intent Classification Heuristics (Devacia Authority Standards)
// ---------------------------------------------------------------------------
function classifyIntent(keyword) {
  const kw = ` ${keyword.toLowerCase()} `;

  const transactionalWords = [
    ' buy ', ' hire ', ' order ', ' service ', ' services ', ' agency ',
    ' company ', ' companies ', ' firm ', ' firms ', ' developer ', ' contractor ',
    ' cost ', ' pricing ', ' price ', ' quote ', ' rates ', ' rate ', ' packages ',
    ' near me ', ' consultation ', ' contract ', ' specialist '
  ];

  const commercialWords = [
    ' best ', ' top ', ' review ', ' reviews ', ' vs ', ' versus ',
    ' compare ', ' comparison ', ' alternative ', ' alternatives ', ' features ',
    ' worth it ', ' pros and cons ', ' rated ', ' benchmark '
  ];

  const informationalWords = [
    ' how ', ' what ', ' why ', ' when ', ' where ', ' can i ', ' can you ',
    ' tutorial ', ' guide ', ' tips ', ' steps ', ' meaning ', ' definition ',
    ' examples ', ' template ', ' checklist ', ' ideas ', ' roadmap ', ' learn '
  ];

  for (const word of transactionalWords) {
    if (kw.includes(word)) return 'Transactional';
  }
  for (const word of commercialWords) {
    if (kw.includes(word)) return 'Commercial';
  }
  for (const word of informationalWords) {
    if (kw.includes(word)) return 'Informational';
  }

  return 'Informational / Mixed';
}

// ---------------------------------------------------------------------------
// Topical Clustering & Pillar-Cluster Architecture
// ---------------------------------------------------------------------------
function clusterKeywords(keywordsList, seed) {
  const seedWords = seed.toLowerCase().split(/\s+/).filter((w) => w.length > 2);

  const clusters = {
    pillar: {
      name: `Core Pillar: ${seed}`,
      role: 'High-authority Comprehensive Hub Page',
      keywords: [],
    },
    transactional: {
      name: 'High-Conversion Commercial / Service Clusters',
      role: 'Money & Landing Pages (Lead Generation / Sales)',
      keywords: [],
    },
    comparisons: {
      name: 'Comparison & Decision Clusters (Vs / Alternatives / Best)',
      role: 'Bottom-of-Funnel Conversion Content',
      keywords: [],
    },
    guides: {
      name: 'How-To & Technical Execution Guides',
      role: 'Top-of-Funnel Topical Authority & Backlink Magnets',
      keywords: [],
    },
    costAndPricing: {
      name: 'Cost, Pricing & Value Calculations',
      role: 'High-Intent Friction-Reduction Content',
      keywords: [],
    },
    longTailFaq: {
      name: 'FAQ & Quick-Answer SERP Snippets',
      role: 'Featured Snippet Hijacking & People Also Ask Schema',
      keywords: [],
    },
  };

  keywordsList.forEach((item) => {
    const text = typeof item === 'string' ? item : item.keyword;
    const kwLower = text.toLowerCase();

    if (kwLower === seed.toLowerCase() || (kwLower.length < seed.length + 5 && seedWords.every((w) => kwLower.includes(w)))) {
      clusters.pillar.keywords.push(item);
    } else if (kwLower.includes('cost') || kwLower.includes('price') || kwLower.includes('pricing') || kwLower.includes('quote') || kwLower.includes('rates')) {
      clusters.costAndPricing.keywords.push(item);
    } else if (kwLower.includes(' vs ') || kwLower.includes('versus') || kwLower.includes('alternative') || kwLower.includes('best ') || kwLower.includes('top ')) {
      clusters.comparisons.keywords.push(item);
    } else if (kwLower.includes('how ') || kwLower.includes('what is') || kwLower.includes('why ') || kwLower.includes('guide') || kwLower.includes('tutorial')) {
      clusters.guides.keywords.push(item);
    } else if (kwLower.includes('service') || kwLower.includes('agency') || kwLower.includes('company') || kwLower.includes('hire') || kwLower.includes('near me')) {
      clusters.transactional.keywords.push(item);
    } else {
      clusters.longTailFaq.keywords.push(item);
    }
  });

  return clusters;
}

// ---------------------------------------------------------------------------
// Rank #1 Blueprint Architecture Generator
// ---------------------------------------------------------------------------
function generateRankBlueprint(targetKeyword, secondaryKeywords = []) {
  const cleanTarget = targetKeyword.trim();
  const slug = cleanTarget.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const intent = classifyIntent(cleanTarget);
  const currentYear = 2026;

  let pageType = 'Pillar Authority Guide';
  if (intent === 'Transactional') pageType = 'High-Converting Service / Solution Page';
  else if (intent === 'Commercial') pageType = 'Authoritative Comparison & Buyer Guide';

  const titleTag = `${cleanTarget.replace(/\b\w/g, (c) => c.toUpperCase())} (${currentYear} Guide & Blueprint) | Devacia`;
  const metaDescription = `Looking for the best ${cleanTarget}? Discover data-backed frameworks, exact step-by-step implementations, and proven architectures to scale results in ${currentYear}.`;

  const h1 = `${cleanTarget.replace(/\b\w/g, (c) => c.toUpperCase())}: The Definitive ${currentYear} Implementation Guide`;
  const headings = [
    { level: 'H1', title: h1 },
    { level: 'H2', title: `1. What is ${cleanTarget} & Why It Matters Now` },
    { level: 'H3', title: `Core Industry Benchmarks & ${currentYear} Shifts` },
    { level: 'H2', title: `2. Critical Challenges & High-Cost Bottlenecks to Avoid` },
    { level: 'H2', title: `3. Step-by-Step Architecture for ${cleanTarget}` },
    { level: 'H3', title: 'Phase 1: Diagnostic Assessment & Baseline Auditing' },
    { level: 'H3', title: 'Phase 2: Strategic Implementation & Engineering' },
    { level: 'H3', title: 'Phase 3: Automated Monitoring & Continuous Optimization' },
    { level: 'H2', title: `4. Cost, Pricing & ROI Forecast for ${cleanTarget}` },
    { level: 'H2', title: `5. Why Modern Teams Choose Devacia for ${cleanTarget}` },
    { level: 'H2', title: `6. Frequently Asked Questions (FAQ)` },
  ];

  const lsiTerms = [
    cleanTarget,
    ...secondaryKeywords.slice(0, 10).map((k) => (typeof k === 'string' ? k : k.keyword)),
    'performance audit',
    'enterprise scalability',
    'conversion rate optimization',
    'technical architecture',
    'implementation roadmap',
  ];

  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': intent === 'Transactional' ? 'ProfessionalService' : 'Article',
        '@id': `https://www.devacia.com/${slug}#primary`,
        name: titleTag,
        headline: titleTag,
        url: `https://www.devacia.com/${slug}`,
        description: metaDescription,
        publisher: {
          '@type': 'Organization',
          name: 'Devacia',
          url: 'https://www.devacia.com',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `https://www.devacia.com/${slug}#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: `What is the fastest way to get results with ${cleanTarget}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Achieving top-tier outcomes with ${cleanTarget} requires establishing clean technical baselines, eliminating structural bottlenecks, and deploying tested, production-grade frameworks.`,
            },
          },
          {
            '@type': 'Question',
            name: `How much does professional ${cleanTarget} typically cost in ${currentYear}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Pricing depends on scale, complexity, and custom system requirements. Devacia provides transparent, fixed-scope engineering sprints without open-ended retainer bloat.`,
            },
          },
        ],
      },
    ],
  };

  const markdownBlueprint = `# Rank #1 SEO Blueprint: ${cleanTarget}

**Target Query:** \`${cleanTarget}\`  
**Search Intent:** \`${intent}\`  
**Recommended Page Type:** \`${pageType}\`  
**Target URL Slug:** \`/${slug}\`  
**Word Count Target:** 2,200 - 3,500 words  
**Generated At:** ${new Date().toISOString().split('T')[0]}  

---

## 1. On-Page Metadata & CTR Optimization
- **Title Tag (< 60 chars):** \`${titleTag}\`
- **Meta Description (< 155 chars):** \`${metaDescription}\`
- **Canonical URL:** \`https://www.devacia.com/${slug}\`
- **Primary Keyword Density Target:** 1.2% - 1.8% naturally dispersed across intro, conclusion, and 2 subheadings.

---

## 2. Semantic Heading Hierarchy (H1 - H3)
${headings.map((h) => `${'  '.repeat(h.level === 'H1' ? 0 : h.level === 'H2' ? 1 : 2)}- **[${h.level}]** ${h.title}`).join('\n')}

---

## 3. High-Value LSI & Entity Keywords (Must Include in Body)
${Array.from(new Set(lsiTerms)).map((term) => `- [ ] \`${term}\``).join('\n')}

---

## 4. Internal Linking Architecture
- **Inbound Links:** Link to this page from top-level service directories and high-traffic blog posts with exact-match anchor text: \`${cleanTarget}\`.
- **Outbound Links:** Link downward to 3-5 specific cluster pages (e.g., related calculators, case studies, and buyer guides).
- **Core Conversion CTA:** Primary CTA button pointing to \`/onboarding\` ("Schedule an Engineering Discovery Sprint").

---

## 5. Schema.org JSON-LD Structured Data
\`\`\`json
${JSON.stringify(schemaJsonLd, null, 2)}
\`\`\`

---
*Created via Devacia Google Keyword Planner Engine.*
`;

  return {
    slug,
    titleTag,
    metaDescription,
    intent,
    pageType,
    headings,
    lsiTerms,
    markdownBlueprint,
  };
}

// ---------------------------------------------------------------------------
// CSV / Export Formatter
// ---------------------------------------------------------------------------
function exportToCsv(data, filename) {
  if (!fs.existsSync(EXPORT_DIR)) {
    fs.mkdirSync(EXPORT_DIR, { recursive: true });
  }

  const filePath = path.join(EXPORT_DIR, filename);
  if (!data || data.length === 0) {
    fs.writeFileSync(filePath, 'Keyword,Search Volume,Competition,Intent,Source\n');
    return filePath;
  }

  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers
      .map((fieldName) => {
        const val = row[fieldName] !== undefined ? `${row[fieldName]}` : '';
        return `"${val.replace(/"/g, '""')}"`;
      })
      .join(',')
  );

  const content = [headers.join(','), ...rows].join('\n');
  fs.writeFileSync(filePath, content, 'utf-8');
  return filePath;
}

// ---------------------------------------------------------------------------
// CLI Command Handlers
// ---------------------------------------------------------------------------
async function handleSetup() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const question = (q) => new Promise((resolve) => rl.question(q, resolve));

  console.log('\n==================================================');
  console.log('  Google Ads Keyword Planner Configuration Setup');
  console.log('==================================================');
  console.log('Note: If you do not have a developer token yet, you can still');
  console.log('use live Google Suggest intelligence for deep keyword research!\n');

  const current = loadConfig();

  const devToken = await question(`Developer Token [${current.developerToken || 'None'}]: `);
  const custId = await question(`Customer ID (10-digit, e.g. 123-456-7890) [${current.customerId || 'None'}]: `);
  const loginCustId = await question(`Manager / Login Customer ID (optional) [${current.loginCustomerId || 'None'}]: `);
  const defaultGeo = await question(`Default Geo (US, IN, UK, CA, AU) [${current.defaultGeo}]: `);

  const updated = saveConfig({
    developerToken: devToken.trim() || current.developerToken,
    customerId: custId.trim() || current.customerId,
    loginCustomerId: loginCustId.trim() || current.loginCustomerId,
    defaultGeo: defaultGeo.trim() || current.defaultGeo,
  });

  rl.close();
  console.log('\n✓ Configuration successfully saved to gkp-config.json:');
  console.log(JSON.stringify(updated, null, 2));
}

async function handleStatus() {
  console.log('\n==================================================');
  console.log('  Google Ads Keyword Planner — System Status');
  console.log('==================================================');

  const config = loadConfig();
  console.log(`Config file:       ${fs.existsSync(GKP_CONFIG_PATH) ? '✓ Found (gkp-config.json)' : '✗ Not created'}`);
  console.log(`Developer Token:   ${config.developerToken ? '✓ Configured' : '✗ Not set (Required for official Google Ads API)'}`);
  console.log(`Customer ID:       ${config.customerId ? `✓ Configured (${config.customerId})` : '✗ Not set'}`);
  console.log(`Default Geo:       ${config.defaultGeo}`);

  const hasDedicatedOAuth = fs.existsSync(GKP_OAUTH_PATH);
  const hasSharedOAuth = fs.existsSync(GA4_OAUTH_PATH) || fs.existsSync(GSC_OAUTH_PATH) || fs.existsSync(GBP_OAUTH_PATH);

  console.log(`OAuth Client:      ${hasDedicatedOAuth ? '✓ Dedicated (gkp-oauth.json)' : hasSharedOAuth ? '✓ Shared (ga4/gsc/gbp oauth available)' : '✗ Missing'}`);
  console.log(`OAuth Token:       ${fs.existsSync(GKP_TOKEN_PATH) ? '✓ Active (gkp-token.json)' : '✗ Not authenticated (Run: npm run kpi:auth)'}`);

  console.log('\nEngine Capabilities:');
  console.log('  • Official Google Ads API:  ' + (config.developerToken && config.customerId && fs.existsSync(GKP_TOKEN_PATH) ? 'READY' : 'Needs Token + Config'));
  console.log('  • Google Suggest Engine:   READY (Zero-auth instant keyword expansion & clustering)\n');
}

async function handleIdeas(args) {
  const seedKeywords = args.filter((a) => !a.startsWith('--'));
  const urlArg = args.find((a) => a.startsWith('--url='))?.replace('--url=', '');
  const geoArg = args.find((a) => a.startsWith('--geo='))?.replace('--geo=', '') || 'US';
  const fastMode = args.includes('--fast') || args.includes('--free');

  if (seedKeywords.length === 0 && !urlArg) {
    console.log('Usage: node scripts/gkp-cli.js ideas <keywords...> [--url=https://...] [--geo=US] [--fast]');
    process.exit(1);
  }

  console.log(`\nGathering Keyword Ideas for: [${seedKeywords.join(', ')}] (Geo: ${geoArg})...\n`);

  let results = [];
  const config = loadConfig();

  if (!fastMode && config.developerToken && config.customerId && fs.existsSync(GKP_TOKEN_PATH)) {
    try {
      console.log('Querying Official Google Ads Keyword Planner API...');
      results = await fetchGoogleAdsKeywordIdeas({
        keywords: seedKeywords,
        urlSeed: urlArg,
        geo: geoArg,
      });
    } catch (err) {
      console.warn(`[!] Google Ads API: ${err.message}. Falling back to Google Live Suggest Intelligence...\n`);
      results = [];
    }
  }

  if (results.length === 0) {
    console.log('Running Google Live Search Suggest & Intent Intelligence Engine...');
    const combined = [];
    for (const kw of seedKeywords) {
      const expanded = await expandKeywordsWithGoogle(kw, { geo: geoArg, includeAlphabet: false });
      combined.push(...expanded);
    }
    // Deduplicate
    const map = new Map();
    combined.forEach((i) => map.set(i.keyword, i));
    results = Array.from(map.values());
  }

  // Display top 30
  console.log('-----------------------------------------------------------------------------------------------------');
  console.log(
    'Keyword'.padEnd(45) +
    'Volume / Relevance'.padEnd(20) +
    'Competition / Diff'.padEnd(20) +
    'Intent'
  );
  console.log('-----------------------------------------------------------------------------------------------------');

  results.slice(0, 35).forEach((r) => {
    const kw = r.keyword.slice(0, 43).padEnd(45);
    const vol = (r.searchVolume !== undefined ? `${r.searchVolume}/mo` : `${r.searchVolumeEstimated} (${r.relevanceScore})`).padEnd(20);
    const comp = (r.competition !== undefined ? `${r.competition} (${r.competitionIndex})` : `${r.difficultyTier} (${r.difficultyScore})`).padEnd(20);
    const intent = r.intent || 'Unknown';
    console.log(`${kw}${vol}${comp}${intent}`);
  });

  console.log('-----------------------------------------------------------------------------------------------------');
  console.log(`Total Keyword Ideas Discovered: ${results.length}`);
  console.log('Tip: Run "node scripts/gkp-cli.js export <keyword>" to save all results to CSV/JSON.\n');
}

async function handleExpand(args) {
  const seed = args.filter((a) => !a.startsWith('--')).join(' ');
  const geoArg = args.find((a) => a.startsWith('--geo='))?.replace('--geo=', '') || 'US';

  if (!seed) {
    console.log('Usage: node scripts/gkp-cli.js expand "<seed keyword>" [--geo=US]');
    process.exit(1);
  }

  console.log(`\n🚀 Deep Expanding: "${seed}" across Alphabet Soup + Question Modifiers (Geo: ${geoArg})...\n`);
  const expanded = await expandKeywordsWithGoogle(seed, { geo: geoArg, includeAlphabet: true });

  console.log(`Discovered ${expanded.length} unique long-tail keywords straight from Google Search algorithms!\n`);

  const intentGroups = {
    Transactional: [],
    Commercial: [],
    Informational: [],
    'Informational / Mixed': [],
  };

  expanded.forEach((item) => {
    if (intentGroups[item.intent]) {
      intentGroups[item.intent].push(item);
    } else {
      intentGroups['Informational / Mixed'].push(item);
    }
  });

  Object.entries(intentGroups).forEach(([groupName, items]) => {
    if (items.length === 0) return;
    console.log(`\n=== ${groupName.toUpperCase()} INTENT (${items.length} keywords) ===`);
    items.slice(0, 10).forEach((it) => {
      console.log(`  • ${it.keyword.padEnd(50)} [Est. Vol: ${it.searchVolumeEstimated}, Diff: ${it.difficultyTier}]`);
    });
    if (items.length > 10) {
      console.log(`    ... and ${items.length - 10} more.`);
    }
  });

  console.log('\n');
}

async function handleCluster(args) {
  const seed = args.filter((a) => !a.startsWith('--')).join(' ');
  const geoArg = args.find((a) => a.startsWith('--geo='))?.replace('--geo=', '') || 'US';

  if (!seed) {
    console.log('Usage: node scripts/gkp-cli.js cluster "<seed topic>"');
    process.exit(1);
  }

  console.log(`\nSynthesizing Topic Cluster & Architecture for: "${seed}"...\n`);
  const expanded = await expandKeywordsWithGoogle(seed, { geo: geoArg, includeAlphabet: true });
  const clusters = clusterKeywords(expanded, seed);

  Object.values(clusters).forEach((group) => {
    console.log(`\n📂 ${group.name} (${group.keywords.length} keywords)`);
    console.log(`   Strategic Role: ${group.role}`);
    console.log('   --------------------------------------------------------------');
    group.keywords.slice(0, 6).forEach((k) => {
      const text = typeof k === 'string' ? k : k.keyword;
      console.log(`   • ${text}`);
    });
    if (group.keywords.length > 6) {
      console.log(`   ... and ${group.keywords.length - 6} additional long-tail targets.`);
    }
  });

  console.log('\n');
}

async function handleRankPlan(args) {
  const target = args.filter((a) => !a.startsWith('--')).join(' ');
  if (!target) {
    console.log('Usage: node scripts/gkp-cli.js rank-plan "<target keyword to rank #1>"');
    process.exit(1);
  }

  console.log(`\nGenerating Rank #1 Production Blueprint for: "${target}"...\n`);
  const expanded = await expandKeywordsWithGoogle(target, { includeAlphabet: false });
  const blueprint = generateRankBlueprint(target, expanded);

  if (!fs.existsSync(EXPORT_DIR)) {
    fs.mkdirSync(EXPORT_DIR, { recursive: true });
  }

  const outPath = path.join(EXPORT_DIR, `rank-plan-${blueprint.slug}.md`);
  fs.writeFileSync(outPath, blueprint.markdownBlueprint, 'utf-8');

  console.log('================================================================');
  console.log('  Rank #1 Blueprint Created Successfully!');
  console.log('================================================================');
  console.log(`Target Query:       ${target}`);
  console.log(`Target Page Type:   ${blueprint.pageType}`);
  console.log(`Title Tag:          ${blueprint.titleTag}`);
  console.log(`Target URL Slug:    /${blueprint.slug}`);
  console.log(`Saved Blueprint To: ${outPath}\n`);
}

async function handleExport(args) {
  const seed = args.filter((a) => !a.startsWith('--')).join(' ');
  const geoArg = args.find((a) => a.startsWith('--geo='))?.replace('--geo=', '') || 'US';

  if (!seed) {
    console.log('Usage: node scripts/gkp-cli.js export "<seed keyword>"');
    process.exit(1);
  }

  console.log(`\nExporting Full Keyword Research for: "${seed}"...`);
  const expanded = await expandKeywordsWithGoogle(seed, { geo: geoArg, includeAlphabet: true });
  const filename = `keywords-${seed.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.csv`;
  const filePath = exportToCsv(expanded, filename);

  console.log(`✓ Exported ${expanded.length} keywords with Intent & Difficulty to:`);
  console.log(`  ${filePath}\n`);
}

// ---------------------------------------------------------------------------
// Model Context Protocol (MCP) Server Implementation
// ---------------------------------------------------------------------------
function runMcpServer() {
  // Direct JSON-RPC 2.0 stdio server implementation adhering to MCP specifications.
  // Note: All diagnostic logs MUST go to process.stderr to keep stdout pure for JSON-RPC!
  process.stderr.write('Starting Google Keyword Planner MCP Server on stdio...\n');

  const toolsList = [
    {
      name: 'gkp_get_keyword_ideas',
      description: 'Get keyword ideas, search volume, CPC bids, competition index, and intent for seed keywords or URLs using Google Ads Keyword Planner and Google Search Intelligence.',
      inputSchema: {
        type: 'object',
        properties: {
          keywords: {
            type: 'array',
            items: { type: 'string' },
            description: 'List of seed keywords to research (e.g. ["web development", "seo services"]).',
          },
          url: {
            type: 'string',
            description: 'Optional website or competitor URL to extract keyword ideas from.',
          },
          geo: {
            type: 'string',
            description: 'Target country code (e.g. "US", "IN", "UK", "CA", "AU"). Default is "US".',
          },
          language: {
            type: 'string',
            description: 'Language code (e.g. "en", "es", "hi"). Default is "en".',
          },
          limit: {
            type: 'number',
            description: 'Maximum number of results to return (default: 30).',
          },
        },
        required: ['keywords'],
      },
    },
    {
      name: 'gkp_expand_keywords',
      description: 'Perform deep long-tail keyword expansion using Google Autocomplete / Suggest search algorithms with alphabet soup permutations and question modifiers.',
      inputSchema: {
        type: 'object',
        properties: {
          seed: {
            type: 'string',
            description: 'Root topic or seed keyword to expand (e.g. "custom software development").',
          },
          geo: {
            type: 'string',
            description: 'Target country code (default: "US").',
          },
          includeAlphabet: {
            type: 'boolean',
            description: 'Whether to run 26-letter a-z alphabet permutations for massive long-tail discovery (default: true).',
          },
        },
        required: ['seed'],
      },
    },
    {
      name: 'gkp_cluster_keywords',
      description: 'Group keywords into strategic Pillar and Cluster architectures (Pillars, Commercial, Comparison, How-To, Pricing, and FAQs) to maximize topical authority.',
      inputSchema: {
        type: 'object',
        properties: {
          seed: {
            type: 'string',
            description: 'Primary core topic or seed keyword.',
          },
          geo: {
            type: 'string',
            description: 'Target country code (default: "US").',
          },
        },
        required: ['seed'],
      },
    },
    {
      name: 'gkp_rank_blueprint',
      description: 'Generate a comprehensive, production-grade Rank #1 SEO blueprint with semantic heading hierarchy (H1-H3), CTR-optimized title tag, meta description, LSI keywords, and Schema.org JSON-LD.',
      inputSchema: {
        type: 'object',
        properties: {
          targetKeyword: {
            type: 'string',
            description: 'The primary keyword query you want to rank #1 on Google for.',
          },
          secondaryKeywords: {
            type: 'array',
            items: { type: 'string' },
            description: 'Optional supporting secondary keywords.',
          },
        },
        required: ['targetKeyword'],
      },
    },
    {
      name: 'gkp_status',
      description: 'Check Google Ads API connection status, Developer Token, Customer ID, and local OAuth credentials.',
      inputSchema: {
        type: 'object',
        properties: {},
      },
    },
  ];

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  const sendResponse = (id, result) => {
    const msg = JSON.stringify({ jsonrpc: '2.0', id, result });
    process.stdout.write(msg + '\n');
  };

  const sendError = (id, code, message) => {
    const msg = JSON.stringify({ jsonrpc: '2.0', id, error: { code, message } });
    process.stdout.write(msg + '\n');
  };

  rl.on('line', async (line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    let req;
    try {
      req = JSON.parse(trimmed);
    } catch {
      return;
    }

    const { id, method, params } = req;

    try {
      if (method === 'initialize') {
        sendResponse(id, {
          protocolVersion: '2024-11-05',
          capabilities: { tools: {} },
          serverInfo: {
            name: 'devacia-google-keyword-planner',
            version: '1.0.0',
          },
        });
      } else if (method === 'notifications/initialized') {
        // Notification, no reply needed
      } else if (method === 'ping') {
        sendResponse(id, {});
      } else if (method === 'tools/list') {
        sendResponse(id, { tools: toolsList });
      } else if (method === 'tools/call') {
        const { name, arguments: args = {} } = params || {};

        if (name === 'gkp_status') {
          const config = loadConfig();
          const hasDedicatedOAuth = fs.existsSync(GKP_OAUTH_PATH);
          const hasSharedOAuth = fs.existsSync(GA4_OAUTH_PATH) || fs.existsSync(GSC_OAUTH_PATH) || fs.existsSync(GBP_OAUTH_PATH);
          const hasToken = fs.existsSync(GKP_TOKEN_PATH);
          const statusText = JSON.stringify({
            configured: Boolean(config.developerToken && config.customerId),
            developerTokenSet: Boolean(config.developerToken),
            customerId: config.customerId || null,
            oauthAvailable: hasDedicatedOAuth || hasSharedOAuth,
            oauthAuthenticated: hasToken,
            suggestEngineReady: true,
          }, null, 2);

          sendResponse(id, {
            content: [{ type: 'text', text: statusText }],
            isError: false,
          });
        } else if (name === 'gkp_get_keyword_ideas') {
          const { keywords = [], url: urlSeed = null, geo = 'US', language = 'en', limit = 30 } = args;
          let results = [];
          const config = loadConfig();

          if (config.developerToken && config.customerId && fs.existsSync(GKP_TOKEN_PATH)) {
            try {
              results = await fetchGoogleAdsKeywordIdeas({ keywords, urlSeed, geo, language });
            } catch (err) {
              process.stderr.write(`Google Ads API query failed: ${err.message}. Falling back to Google Live Suggest...\n`);
            }
          }

          if (results.length === 0) {
            for (const kw of keywords) {
              const items = await expandKeywordsWithGoogle(kw, { geo, language, includeAlphabet: false });
              results.push(...items);
            }
          }

          const trimmedResults = results.slice(0, limit);
          sendResponse(id, {
            content: [{ type: 'text', text: JSON.stringify(trimmedResults, null, 2) }],
            isError: false,
          });
        } else if (name === 'gkp_expand_keywords') {
          const { seed, geo = 'US', includeAlphabet = true } = args;
          const expanded = await expandKeywordsWithGoogle(seed, { geo, includeAlphabet });
          sendResponse(id, {
            content: [{ type: 'text', text: JSON.stringify(expanded, null, 2) }],
            isError: false,
          });
        } else if (name === 'gkp_cluster_keywords') {
          const { seed, geo = 'US' } = args;
          const expanded = await expandKeywordsWithGoogle(seed, { geo, includeAlphabet: true });
          const clusters = clusterKeywords(expanded, seed);
          sendResponse(id, {
            content: [{ type: 'text', text: JSON.stringify(clusters, null, 2) }],
            isError: false,
          });
        } else if (name === 'gkp_rank_blueprint') {
          const { targetKeyword, secondaryKeywords = [] } = args;
          const blueprint = generateRankBlueprint(targetKeyword, secondaryKeywords);
          sendResponse(id, {
            content: [{ type: 'text', text: blueprint.markdownBlueprint }],
            isError: false,
          });
        } else {
          sendError(id, -32601, `Method or tool ${name} not found`);
        }
      } else {
        if (id !== undefined) {
          sendError(id, -32601, `Method ${method} not supported`);
        }
      }
    } catch (err) {
      if (id !== undefined) {
        sendError(id, -32603, err.message || 'Internal MCP server error');
      }
    }
  });

  process.stderr.write('Google Keyword Planner MCP Server is running and listening on stdio.\n');
}

// ---------------------------------------------------------------------------
// Help Menu
// ---------------------------------------------------------------------------
function printHelp() {
  console.log(`
================================================================================
  Google Keyword Planner (GKP) CLI & SEO Ranking Intelligence — Devacia
================================================================================

Usage:
  node scripts/gkp-cli.js <command> [options]
  npm run kpi:<command>

Commands:
  auth                          Authenticate with Google Ads API (1-click local OAuth)
  setup                         Interactive configuration for Developer Token, Customer ID & Defaults
  status                        Display current API connection, OAuth & token status
  ideas <keywords...>           Fetch Keyword Planner ideas with Search Volume, Competition & CPC
                                Options: [--url=https://...] [--geo=US|IN|UK] [--fast]
  expand "<keyword>"            Deep real-time Google Autocomplete expansion (Alphabet Soup + Questions)
                                Options: [--geo=US|IN|UK]
  cluster "<keyword>"           Analyze intent & group keywords into Pillar & Cluster architecture
  rank-plan "<target keyword>"  Generate production Rank #1 Blueprint (Metadata, H1-H3, Schema & LSI)
  export "<keyword>"            Export comprehensive keyword dataset to CSV in docs/seo-keywords/
  mcp                           Start the Model Context Protocol (MCP) stdio server for AI agents
  help, --help                  Show this help menu

Quick Examples:
  node scripts/gkp-cli.js status
  node scripts/gkp-cli.js setup
  node scripts/gkp-cli.js ideas "b2b web design" "custom software" --geo=US
  node scripts/gkp-cli.js expand "ai agent development" --geo=US
  node scripts/gkp-cli.js cluster "enterprise seo services"
  node scripts/gkp-cli.js rank-plan "b2b seo agency"
  node scripts/gkp-cli.js export "saas web development"
`);
}

// ---------------------------------------------------------------------------
// CLI Router
// ---------------------------------------------------------------------------
export {
  loadConfig,
  saveConfig,
  authenticate,
  getValidAccessToken,
  fetchGoogleAdsKeywordIdeas,
  expandKeywordsWithGoogle,
  clusterKeywords,
  generateRankBlueprint,
  exportToCsv,
  handleExport,
  runMcpServer,
};

// Check if running as CLI entrypoint
const isMain = process.argv[1] && (
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url) ||
  process.argv[1].endsWith('gkp-cli.js')
);

if (isMain) {
  const command = process.argv[2] || 'help';
  const rawArgs = process.argv.slice(3);

  if (command === 'help' || command === '--help' || command === '-h') {
    printHelp();
    process.exit(0);
  } else if (command === 'auth') {
    if (fs.existsSync(GKP_TOKEN_PATH)) fs.unlinkSync(GKP_TOKEN_PATH);
    authenticate(true)
      .then(() => {
        console.log('✓ Successfully authenticated with Google Ads API!');
        process.exit(0);
      })
      .catch((err) => {
        console.error(`Authentication error: ${err.message}`);
        process.exit(1);
      });
  } else if (command === 'setup') {
    handleSetup().catch((err) => {
      console.error(`Setup error: ${err.message}`);
      process.exit(1);
    });
  } else if (command === 'status') {
    handleStatus().catch((err) => {
      console.error(`Status error: ${err.message}`);
      process.exit(1);
    });
  } else if (command === 'ideas') {
    handleIdeas(rawArgs).catch((err) => {
      console.error(`Ideas error: ${err.message}`);
      process.exit(1);
    });
  } else if (command === 'expand') {
    handleExpand(rawArgs).catch((err) => {
      console.error(`Expand error: ${err.message}`);
      process.exit(1);
    });
  } else if (command === 'cluster') {
    handleCluster(rawArgs).catch((err) => {
      console.error(`Cluster error: ${err.message}`);
      process.exit(1);
    });
  } else if (command === 'rank-plan' || command === 'plan') {
    handleRankPlan(rawArgs).catch((err) => {
      console.error(`Rank plan error: ${err.message}`);
      process.exit(1);
    });
  } else if (command === 'export') {
    handleExport(rawArgs).catch((err) => {
      console.error(`Export error: ${err.message}`);
      process.exit(1);
    });
  } else if (command === 'mcp') {
    runMcpServer();
  } else {
    console.log(`Unknown command: ${command}`);
    printHelp();
    process.exit(1);
  }
}


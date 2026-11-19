import fs from 'fs';
import path from 'path';
import http from 'http';
import url from 'url';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';
import './env-loader.js';

// ---------------------------------------------------------------------------
// Configuration & Credentials Paths
// ---------------------------------------------------------------------------
export const GBP_OAUTH_PATH = process.env.GBP_OAUTH_PATH || path.resolve(process.cwd(), 'gbp-oauth.json');
export const GA4_OAUTH_PATH = process.env.GA4_OAUTH_PATH || path.resolve(process.cwd(), 'ga4-oauth.json');
export const GSC_OAUTH_PATH = process.env.GSC_OAUTH_PATH || path.resolve(process.cwd(), 'gsc-oauth.json');
export const GOOGLE_OAUTH_PATH = process.env.GOOGLE_OAUTH_PATH || path.resolve(process.cwd(), 'google-oauth.json');
export const TOKEN_PATH     = process.env.GBP_TOKEN_PATH || path.resolve(process.cwd(), 'gbp-token.json');
export const CONFIG_PATH    = process.env.GBP_CONFIG_PATH || path.resolve(process.cwd(), 'gbp-config.json');

// Google Business Profile Management Scope
const SCOPES = [
  'https://www.googleapis.com/auth/business.manage',
];

function openBrowser(targetUrl) {
  try {
    const cmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start ""' : 'xdg-open';
    exec(`${cmd} "${targetUrl}"`);
  } catch {
    // Console output available
  }
}

export function checkGbpStatus() {
  const oauthExists = fs.existsSync(GBP_OAUTH_PATH) || fs.existsSync(GA4_OAUTH_PATH) || fs.existsSync(GSC_OAUTH_PATH) || fs.existsSync(GOOGLE_OAUTH_PATH);
  const tokenExists = fs.existsSync(TOKEN_PATH);
  return {
    configured: oauthExists,
    oauthFound: oauthExists,
    tokenFound: tokenExists,
  };
}

// Canonical Business Standard (configurable via env / gbp-config.json)
let fileStandards = {};
if (fs.existsSync(CONFIG_PATH)) {
  try { fileStandards = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8')); } catch {}
}

export const CANONICAL_STANDARDS = {
  name: process.env.GBP_BUSINESS_NAME || fileStandards.name || 'Devacia',
  phone: process.env.GBP_PHONE || fileStandards.phone || '+91 63069 40734',
  rawPhone: process.env.GBP_RAW_PHONE || fileStandards.rawPhone || '6306940734',
  city: process.env.GBP_CITY || fileStandards.city || 'Prayagraj',
  state: process.env.GBP_STATE || fileStandards.state || 'Uttar Pradesh',
  country: process.env.GBP_COUNTRY || fileStandards.country || 'India',
  website: process.env.GBP_WEBSITE || process.env.SEO_SITE_URL || fileStandards.website || 'https://www.devacia.com',
};

// ---------------------------------------------------------------------------
// OAuth & Authentication Helpers
// ---------------------------------------------------------------------------
export function getOAuth2Client() {
  let oauthPath = GBP_OAUTH_PATH;
  if (fs.existsSync(GBP_OAUTH_PATH)) {
    // Dedicated client
  } else if (fs.existsSync(GOOGLE_OAUTH_PATH)) {
    oauthPath = GOOGLE_OAUTH_PATH;
  } else if (fs.existsSync(GA4_OAUTH_PATH)) {
    oauthPath = GA4_OAUTH_PATH;
  } else if (fs.existsSync(GSC_OAUTH_PATH)) {
    oauthPath = GSC_OAUTH_PATH;
  } else {
    throw new Error(
      `OAuth credentials file not found. Checked:\n` +
      `  - ${GBP_OAUTH_PATH}\n` +
      `  - ${GOOGLE_OAUTH_PATH}\n` +
      `  - ${GA4_OAUTH_PATH}\n` +
      `  - ${GSC_OAUTH_PATH}\n\n` +
      `Download from Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs,\n` +
      `and save as gbp-oauth.json or google-oauth.json in the project root.`
    );
  }

  const content = JSON.parse(fs.readFileSync(oauthPath, 'utf-8'));
  const creds = content.installed || content.web;
  if (!creds?.client_id || !creds?.client_secret) {
    throw new Error(`Invalid OAuth credentials format in ${oauthPath}. Expected 'installed' or 'web' object.`);
  }
  return new google.auth.OAuth2(
    creds.client_id,
    creds.client_secret,
    'http://localhost:3333/oauth2callback'
  );
}

export async function authenticate() {
  const oAuth2Client = getOAuth2Client();

  if (fs.existsSync(TOKEN_PATH)) {
    try {
      const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
      oAuth2Client.setCredentials(token);
      return oAuth2Client;
    } catch {
      console.log('Failed to parse existing token, re-authenticating...');
    }
  }

  console.log('\n==================================================');
  console.log('  Google Business Profile Authorization');
  console.log('==================================================\n');

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
                <body style="font-family: sans-serif; text-align: center; padding: 40px; background: #09090b; color: white;">
                  <h1 style="color: #4ade80;">Authorization Successful!</h1>
                  <p>Google Business Profile token has been granted. You can close this tab and return to the CLI.</p>
                </body>
              </html>
            `);
            server.close();

            const { tokens } = await oAuth2Client.getToken(code);
            oAuth2Client.setCredentials(tokens);
            fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
            console.log('✓ Successfully authenticated and saved token to gbp-token.json\n');
            resolve(oAuth2Client);
          } else {
            res.writeHead(400);
            res.end('Missing code parameter in OAuth callback');
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
        prompt: 'select_account consent',
        scope: SCOPES,
      });

      console.log('Opening browser for Google Business Profile authorization...');
      console.log('➜ You will see the Google Account Chooser screen.');
      console.log('➜ Select or log in with the Google account that manages your Business Profile.\n');
      console.log(`If browser does not open automatically, visit this URL:\n${authUrl}\n`);
      const startCmd = process.platform === 'win32' ? `start "" "${authUrl}"` :
                       process.platform === 'darwin' ? `open "${authUrl}"` : `xdg-open "${authUrl}"`;
      exec(startCmd);
    });
  });
}

// ---------------------------------------------------------------------------
// Config Helpers (Default Account & Location persistence)
// ---------------------------------------------------------------------------
function loadConfig() {
  if (fs.existsSync(CONFIG_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
    } catch {
      return {};
    }
  }
  return {};
}

function saveConfig(cfg) {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2) + '\n');
}

// ---------------------------------------------------------------------------
// Core GBP API Functions
// ---------------------------------------------------------------------------
async function getAccounts(auth) {
  const acctClient = google.mybusinessaccountmanagement({ version: 'v1', auth });
  const res = await acctClient.accounts.list();
  return res.data.accounts || [];
}

async function getLocations(auth, accountName) {
  const infoClient = google.mybusinessbusinessinformation({ version: 'v1', auth });
  const readMask = [
    'name',
    'title',
    'storefrontAddress',
    'websiteUri',
    'phoneNumbers',
    'categories',
    'regularHours',
    'profile',
    'metadata'
  ].join(',');

  const res = await infoClient.accounts.locations.list({
    parent: accountName,
    readMask,
  });

  return res.data.locations || [];
}

async function resolvePrimaryLocation(auth, explicitLocationId = null) {
  const config = loadConfig();
  const accounts = await getAccounts(auth);

  if (accounts.length === 0) {
    throw new Error('No Google Business Profile accounts found for this Google user.');
  }

  // Iterate over accounts to find locations
  const allLocations = [];
  for (const acct of accounts) {
    try {
      const locs = await getLocations(auth, acct.name);
      locs.forEach(l => allLocations.push({ account: acct, location: l }));
    } catch (e) {
      // Continue searching other accounts
    }
  }

  if (allLocations.length === 0) {
    throw new Error('No business locations found under any accessible Google Business Profile account.');
  }

  if (explicitLocationId) {
    const match = allLocations.find(entry => 
      entry.location.name.endsWith(`/${explicitLocationId}`) || 
      entry.location.name === explicitLocationId
    );
    if (!match) throw new Error(`Location ID '${explicitLocationId}' not found.`);
    return match;
  }

  if (config.preferredLocationName) {
    const match = allLocations.find(entry => entry.location.name === config.preferredLocationName);
    if (match) return match;
  }

  // Look for "Devacia"
  const devaciaMatch = allLocations.find(entry => 
    entry.location.title?.toLowerCase().includes('devacia')
  );
  if (devaciaMatch) {
    saveConfig({ ...config, preferredAccountName: devaciaMatch.account.name, preferredLocationName: devaciaMatch.location.name });
    return devaciaMatch;
  }

  // Fallback to first available
  const first = allLocations[0];
  saveConfig({ ...config, preferredAccountName: first.account.name, preferredLocationName: first.location.name });
  return first;
}

// ---------------------------------------------------------------------------
// Command: list / locations
// ---------------------------------------------------------------------------
async function listLocations() {
  const auth = await authenticate();
  const accounts = await getAccounts(auth);

  console.log(`\n==================================================`);
  console.log(`  Google Business Profile Locations & Accounts`);
  console.log(`==================================================\n`);

  if (accounts.length === 0) {
    console.log('No Google Business Profile accounts found.');
    return;
  }

  let totalCount = 0;
  for (const acct of accounts) {
    console.log(`Account: ${acct.accountName || acct.name} (${acct.name})`);
    console.log(`Type:    ${acct.type || 'PERSONAL'} | Role: ${acct.role || 'OWNER'}\n`);

    try {
      const locs = await getLocations(auth, acct.name);
      if (locs.length === 0) {
        console.log('  No locations registered under this account.\n');
        continue;
      }

      locs.forEach((loc, idx) => {
        totalCount++;
        const addr = loc.storefrontAddress;
        const formattedAddr = addr 
          ? [addr.addressLines?.join(', '), addr.locality, addr.administrativeArea, addr.postalCode, addr.regionCode].filter(Boolean).join(', ')
          : 'Service Area / No Storefront Address';
        const phone = loc.phoneNumbers?.primaryPhone || 'None';
        const site = loc.websiteUri || 'None';
        const primaryCat = loc.categories?.primaryCategory?.displayName || 'Uncategorized';
        const mapsUrl = loc.metadata?.mapsUri || 'N/A';
        const hasPendingEdits = loc.metadata?.hasPendingEdits ? 'YES (Pending Review)' : 'NO';

        console.log(`  ${idx + 1}. [${loc.title || 'Untitled'}]`);
        console.log(`     Location ID:     ${loc.name}`);
        console.log(`     Primary Category: ${primaryCat}`);
        console.log(`     Address:          ${formattedAddr}`);
        console.log(`     Primary Phone:    ${phone}`);
        console.log(`     Website:          ${site}`);
        console.log(`     Pending Edits:    ${hasPendingEdits}`);
        console.log(`     Google Maps Link: ${mapsUrl}\n`);
      });
    } catch (err) {
      console.log(`  Error fetching locations for ${acct.name}: ${err.message}\n`);
    }
  }

  console.log(`Total Locations: ${totalCount}`);
}

// ---------------------------------------------------------------------------
// Command: audit (Profile + Performance + Search Keywords + Review Summary)
// ---------------------------------------------------------------------------
async function runAudit() {
  const auth = await authenticate();
  const { account, location } = await resolvePrimaryLocation(auth);

  console.log(`\n==================================================`);
  console.log(`  GBP Performance & Profile Audit: ${location.title || 'Devacia'}`);
  console.log(`==================================================\n`);

  // 1. Profile Integrity & NAP Consistency Check
  console.log(`--- Business Profile Information ---`);
  const addr = location.storefrontAddress;
  const formattedAddr = addr 
    ? [addr.addressLines?.join(', '), addr.locality, addr.administrativeArea, addr.postalCode, addr.regionCode].filter(Boolean).join(', ')
    : 'No Street Address';
  const phone = location.phoneNumbers?.primaryPhone || 'None';
  const website = location.websiteUri || 'None';
  const category = location.categories?.primaryCategory?.displayName || 'None';

  console.log(`• Title:            ${location.title}`);
  console.log(`• Primary Category: ${category}`);
  console.log(`• Primary Phone:    ${phone}`);
  console.log(`• Website URL:      ${website}`);
  console.log(`• Address:          ${formattedAddr}`);
  console.log(`• Description:      ${location.profile?.description?.slice(0, 120) || 'None'}...`);

  // NAP Verification against Devacia canonical
  const phoneClean = phone.replace(/[^0-9]/g, '');
  const phoneMatch = phoneClean.includes(CANONICAL_STANDARDS.rawPhone);
  const websiteMatch = website.toLowerCase().includes('devacia.com');
  const cityMatch = formattedAddr.toLowerCase().includes(CANONICAL_STANDARDS.city.toLowerCase());

  console.log(`\n--- Local Trust & NAP Alignment ---`);
  console.log(`• Phone Match (+91 63069 40734):     ${phoneMatch ? '✓ PASS' : '✗ MISMATCH (' + phone + ')'}`);
  console.log(`• Website Link (devacia.com):         ${websiteMatch ? '✓ PASS' : '✗ MISMATCH (' + website + ')'}`);
  console.log(`• City Presence (Prayagraj):          ${cityMatch ? '✓ PASS' : 'ℹ Custom / Service Area'}`);

  // 2. Fetch 28-day Performance Metrics
  console.log(`\n--- Last 28 Days Performance Metrics ---`);
  const perfClient = google.businessprofileperformance({ version: 'v1', auth });

  const end = new Date();
  end.setDate(end.getDate() - 2); // Data lags ~2 days
  const start = new Date(end);
  start.setDate(start.getDate() - 28);

  const metricsToFetch = [
    'BUSINESS_IMPRESSIONS_DESKTOP_MAPS',
    'BUSINESS_IMPRESSIONS_DESKTOP_SEARCH',
    'BUSINESS_IMPRESSIONS_MOBILE_MAPS',
    'BUSINESS_IMPRESSIONS_MOBILE_SEARCH',
    'CALL_CLICKS',
    'WEBSITE_CLICKS',
    'BUSINESS_DIRECTION_REQUESTS',
    'BUSINESS_CONVERSATIONS',
    'BUSINESS_BOOKINGS',
  ];

  try {
    const res = await perfClient.locations.fetchMultiDailyMetricsTimeSeries({
      location: location.name,
      dailyMetrics: metricsToFetch,
      dailyRange: {
        startDate: { year: start.getFullYear(), month: start.getMonth() + 1, day: start.getDate() },
        endDate: { year: end.getFullYear(), month: end.getMonth() + 1, day: end.getDate() },
      },
    });

    const series = res.data.multiDailyMetricTimeSeries || [];
    const metricTotals = {};
    for (const item of series) {
      const metricName = item.dailyMetric;
      const values = item.dailyMetricTimeSeries?.timeSeries?.datedValues || [];
      const sum = values.reduce((acc, curr) => acc + Number(curr.value || 0), 0);
      metricTotals[metricName] = sum;
    }

    const desktopMaps = metricTotals['BUSINESS_IMPRESSIONS_DESKTOP_MAPS'] || 0;
    const desktopSearch = metricTotals['BUSINESS_IMPRESSIONS_DESKTOP_SEARCH'] || 0;
    const mobileMaps = metricTotals['BUSINESS_IMPRESSIONS_MOBILE_MAPS'] || 0;
    const mobileSearch = metricTotals['BUSINESS_IMPRESSIONS_MOBILE_SEARCH'] || 0;
    const totalImpressions = desktopMaps + desktopSearch + mobileMaps + mobileSearch;

    const webClicks = metricTotals['WEBSITE_CLICKS'] || 0;
    const callClicks = metricTotals['CALL_CLICKS'] || 0;
    const directions = metricTotals['BUSINESS_DIRECTION_REQUESTS'] || 0;
    const conversations = metricTotals['BUSINESS_CONVERSATIONS'] || 0;
    const bookings = metricTotals['BUSINESS_BOOKINGS'] || 0;

    console.log(`Total Profile Impressions:   ${totalImpressions}`);
    console.log(`  • Google Search (Mobile):  ${mobileSearch}`);
    console.log(`  • Google Search (Desktop): ${desktopSearch}`);
    console.log(`  • Google Maps (Mobile):    ${mobileMaps}`);
    console.log(`  • Google Maps (Desktop):   ${desktopMaps}`);
    console.log(`\nActions & Inbound Pipeline:`);
    console.log(`  • Website Clicks:          ${webClicks}`);
    console.log(`  • Phone Call Clicks:       ${callClicks}`);
    console.log(`  • Direction Requests:      ${directions}`);
    console.log(`  • Messages / Chat:         ${conversations}`);
    console.log(`  • Bookings:                ${bookings}`);
  } catch (err) {
    console.log(`Performance metrics note: ${err.message}`);
    console.log(`(If this is a newly created or unverified profile, performance insights populate after initial impressions.)`);
  }

  // 3. Search Keywords (Monthly Impressions)
  console.log(`\n--- Top Search Keywords on Google Maps & Search ---`);
  try {
    const curYear = end.getFullYear();
    const curMonth = end.getMonth() + 1;
    const keywordsRes = await perfClient.locations.searchkeywords.impressions.monthly.list({
      parent: location.name,
      'monthlyRange.startMonth.year': curYear,
      'monthlyRange.startMonth.month': Math.max(1, curMonth - 1),
      'monthlyRange.endMonth.year': curYear,
      'monthlyRange.endMonth.month': curMonth,
    });

    const keywords = keywordsRes.data.searchKeywordsCounts || [];
    if (keywords.length === 0) {
      console.log('No keyword queries recorded in this 30-day window yet.');
    } else {
      keywords.slice(0, 15).forEach((kw, i) => {
        const val = kw.insightsValue?.value || kw.insightsValue?.threshold || 0;
        console.log(`${(i + 1).toString().padStart(2)}. [Impr: ${val.toString().padStart(3)}] "${kw.searchKeyword}"`);
      });
    }
  } catch (err) {
    console.log(`Keyword insights note: ${err.message}`);
  }

  // 4. Reviews Summary
  console.log(`\n--- Reviews & Reputation Summary ---`);
  try {
    const locationId = location.name.split('/').pop();
    const reviewsUrl = `https://mybusiness.googleapis.com/v4/${account.name}/locations/${locationId}/reviews`;
    const revRes = await auth.request({ url: reviewsUrl });
    const reviews = revRes.data.reviews || [];
    const totalReviews = revRes.data.totalReviewerCount || reviews.length;
    const avgRating = revRes.data.averageRating || (reviews.reduce((a, r) => a + (r.starRating === 'FIVE' ? 5 : r.starRating === 'FOUR' ? 4 : 3), 0) / (reviews.length || 1));

    console.log(`Average Rating:     ⭐ ${Number(avgRating).toFixed(1)} / 5.0`);
    console.log(`Total Reviews:      ${totalReviews}`);
    const unreplied = reviews.filter(r => !r.reviewReply);
    console.log(`Pending Replies:    ${unreplied.length}`);

    if (reviews.length > 0) {
      console.log(`\nLatest 3 Reviews:`);
      reviews.slice(0, 3).forEach((r, i) => {
        const stars = r.starRating === 'FIVE' ? '⭐⭐⭐⭐⭐' : r.starRating === 'FOUR' ? '⭐⭐⭐⭐' : r.starRating;
        console.log(`  ${i + 1}. [${stars}] by ${r.reviewer?.displayName || 'Anonymous'} (${new Date(r.createTime).toLocaleDateString()})`);
        if (r.comment) console.log(`     "${r.comment.slice(0, 100)}${r.comment.length > 100 ? '...' : ''}"`);
        console.log(`     Reply: ${r.reviewReply ? '✓ Responded' : '✗ No reply yet'}`);
      });
    }
  } catch (err) {
    console.log(`Reviews lookup: ${err.message}`);
    console.log(`(Direct customer reviews URL: ${location.metadata?.newReviewUri || 'https://search.google.com'})`);
  }
}

// ---------------------------------------------------------------------------
// Command: reviews
// ---------------------------------------------------------------------------
async function listReviews() {
  const auth = await authenticate();
  const { account, location } = await resolvePrimaryLocation(auth);
  const locationId = location.name.split('/').pop();

  console.log(`\n==================================================`);
  console.log(`  Google Business Reviews for ${location.title}`);
  console.log(`==================================================\n`);

  const reviewsUrl = `https://mybusiness.googleapis.com/v4/${account.name}/locations/${locationId}/reviews`;
  try {
    const revRes = await auth.request({ url: reviewsUrl });
    const reviews = revRes.data.reviews || [];

    if (reviews.length === 0) {
      console.log('No reviews recorded yet.');
      console.log(`Review share link: ${location.metadata?.newReviewUri || 'N/A'}`);
      return;
    }

    console.log(`Total Reviews: ${revRes.data.totalReviewerCount || reviews.length} | Average: ⭐ ${revRes.data.averageRating || 'N/A'}\n`);
    reviews.forEach((r, i) => {
      const stars = r.starRating === 'FIVE' ? '⭐⭐⭐⭐⭐' : r.starRating === 'FOUR' ? '⭐⭐⭐⭐' : r.starRating === 'THREE' ? '⭐⭐⭐' : r.starRating;
      console.log(`${(i + 1).toString().padStart(2)}. ${stars} by ${r.reviewer?.displayName || 'Anonymous'} [${new Date(r.createTime).toLocaleDateString()}]`);
      console.log(`    Review ID: ${r.reviewId}`);
      if (r.comment) console.log(`    "${r.comment}"`);
      if (r.reviewReply) {
        console.log(`    ➜ Reply: "${r.reviewReply.comment}" (${new Date(r.reviewReply.updateTime).toLocaleDateString()})`);
      } else {
        console.log(`    ➜ Reply: [ACTION NEEDED] Run: node scripts/gbp-cli.js reply ${r.reviewId} "Your reply"`);
      }
      console.log('');
    });
  } catch (err) {
    console.error(`Error loading reviews: ${err.message}`);
    if (err.response?.status === 403) {
      console.log('\nNote: Ensure "Google My Business API" is enabled in Google Cloud Console.');
    }
  }
}

// ---------------------------------------------------------------------------
// Command: reply <reviewId> <comment>
// ---------------------------------------------------------------------------
async function replyToReview(reviewId, comment) {
  if (!reviewId || !comment) {
    console.error('Usage: node scripts/gbp-cli.js reply <reviewId> "<replyText>"');
    process.exit(1);
  }

  const auth = await authenticate();
  const { account, location } = await resolvePrimaryLocation(auth);
  const locationId = location.name.split('/').pop();

  const replyUrl = `https://mybusiness.googleapis.com/v4/${account.name}/locations/${locationId}/reviews/${reviewId}/reply`;
  console.log(`Posting reply to review ${reviewId}...`);

  try {
    const res = await auth.request({
      url: replyUrl,
      method: 'PUT',
      data: { comment },
    });
    console.log(`✓ Reply successfully published!`);
    console.log(`Reply content: "${res.data.comment}"`);
  } catch (err) {
    console.error(`Error publishing reply: ${err.message}`);
  }
}

// ---------------------------------------------------------------------------
// Command: posts
// ---------------------------------------------------------------------------
async function listPosts() {
  const auth = await authenticate();
  const { account, location } = await resolvePrimaryLocation(auth);
  const locationId = location.name.split('/').pop();

  console.log(`\n==================================================`);
  console.log(`  Local Updates & Posts for ${location.title}`);
  console.log(`==================================================\n`);

  const postsUrl = `https://mybusiness.googleapis.com/v4/${account.name}/locations/${locationId}/localPosts`;
  try {
    const res = await auth.request({ url: postsUrl });
    const posts = res.data.localPosts || [];

    if (posts.length === 0) {
      console.log('No local posts found.');
      console.log('To create an update post, run: node scripts/gbp-cli.js create-post --summary "Your update text"');
      return;
    }

    posts.forEach((p, i) => {
      console.log(`${(i + 1).toString().padStart(2)}. [${p.topicType || 'STANDARD'}] State: ${p.state || 'LIVE'} (${new Date(p.createTime).toLocaleDateString()})`);
      console.log(`    Post ID: ${p.name}`);
      console.log(`    Summary: "${p.summary}"`);
      if (p.callToAction) {
        console.log(`    CTA:     [${p.callToAction.actionType}] -> ${p.callToAction.url}`);
      }
      console.log('');
    });
  } catch (err) {
    console.error(`Error loading posts: ${err.message}`);
  }
}

// ---------------------------------------------------------------------------
// Command: create-post
// ---------------------------------------------------------------------------
async function createPost() {
  const args = process.argv.slice(3);
  let summary = '';
  let cta = 'LEARN_MORE';
  let url = CANONICAL_STANDARDS.website;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--summary' && args[i + 1]) summary = args[++i];
    if (args[i] === '--cta' && args[i + 1]) cta = args[++i].toUpperCase();
    if (args[i] === '--url' && args[i + 1]) url = args[++i];
  }

  if (!summary) {
    console.log('Usage: node scripts/gbp-cli.js create-post --summary "Your post text" [--cta LEARN_MORE|BOOK|SIGN_UP] [--url "https://www.devacia.com"]');
    process.exit(1);
  }

  const auth = await authenticate();
  const { account, location } = await resolvePrimaryLocation(auth);
  const locationId = location.name.split('/').pop();

  const postsUrl = `https://mybusiness.googleapis.com/v4/${account.name}/locations/${locationId}/localPosts`;
  console.log(`Publishing update to ${location.title}...`);

  const payload = {
    languageCode: 'en',
    summary,
    callToAction: {
      actionType: cta,
      url,
    },
    topicType: 'STANDARD',
  };

  try {
    const res = await auth.request({
      url: postsUrl,
      method: 'POST',
      data: payload,
    });
    console.log(`✓ Post published successfully! ID: ${res.data.name}`);
  } catch (err) {
    console.error(`Error creating post: ${err.message}`);
  }
}

// ---------------------------------------------------------------------------
// Command: update (Patch Profile Phone / Website / Description)
// ---------------------------------------------------------------------------
async function updateProfile() {
  const args = process.argv.slice(3);
  const patches = {};
  const updateMaskParts = [];

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--phone' && args[i + 1]) {
      patches.phoneNumbers = { primaryPhone: args[++i] };
      updateMaskParts.push('phoneNumbers');
    }
    if (args[i] === '--website' && args[i + 1]) {
      patches.websiteUri = args[++i];
      updateMaskParts.push('websiteUri');
    }
    if (args[i] === '--description' && args[i + 1]) {
      patches.profile = { description: args[++i] };
      updateMaskParts.push('profile.description');
    }
    if (args[i] === '--title' && args[i + 1]) {
      patches.title = args[++i];
      updateMaskParts.push('title');
    }
  }

  if (updateMaskParts.length === 0) {
    console.log('Usage: node scripts/gbp-cli.js update [--phone "+91..."] [--website "https://..."] [--description "..."] [--title "..."]');
    process.exit(1);
  }

  const auth = await authenticate();
  const { location } = await resolvePrimaryLocation(auth);
  const infoClient = google.mybusinessbusinessinformation({ version: 'v1', auth });

  console.log(`Updating ${location.title} (${location.name}) with mask: ${updateMaskParts.join(', ')}...`);

  try {
    const res = await infoClient.locations.patch({
      name: location.name,
      updateMask: updateMaskParts.join(','),
      requestBody: patches,
    });
    console.log(`✓ Successfully updated Google Business Profile!`);
    console.log(`Updated fields:`, res.data);
  } catch (err) {
    console.error(`Error updating profile: ${err.message}`);
  }
}

// ---------------------------------------------------------------------------
// Command: import <csvFile> (Import GBP Insights CSV export from business.google.com)
// ---------------------------------------------------------------------------
async function importGbpCsv(filePath) {
  if (!filePath || !fs.existsSync(filePath)) {
    console.error('Usage: node scripts/gbp-cli.js import <path-to-export.csv>');
    console.error('To download: In Google Business Profile (business.google.com) → Performance → Export report as CSV.');
    process.exit(1);
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const lines = raw.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length < 2) {
    console.error('CSV file appears empty or invalid.');
    process.exit(1);
  }

  // Parse header
  const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, '').toLowerCase());
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',').map(c => c.trim().replace(/^["']|["']$/g, ''));
    if (cols.length === headers.length) {
      const obj = {};
      headers.forEach((h, idx) => { obj[h] = cols[idx]; });
      rows.push(obj);
    }
  }

  console.log(`\n==================================================`);
  console.log(`  Importing GBP Performance Data (${rows.length} records)`);
  console.log(`==================================================\n`);

  // Summarize metrics
  let totalImpressions = 0;
  let searchImpressions = 0;
  let mapsImpressions = 0;
  let websiteClicks = 0;
  let callClicks = 0;
  let directionRequests = 0;
  let messages = 0;
  let bookings = 0;

  for (const r of rows) {
    for (const [key, val] of Object.entries(r)) {
      const num = Number(val) || 0;
      if (key.includes('total impression') || key === 'impressions') totalImpressions += num;
      else if (key.includes('search impression') || key.includes('search')) searchImpressions += num;
      else if (key.includes('map impression') || key.includes('map')) mapsImpressions += num;
      else if (key.includes('website') || key.includes('site click')) websiteClicks += num;
      else if (key.includes('call') || key.includes('phone')) callClicks += num;
      else if (key.includes('direction')) directionRequests += num;
      else if (key.includes('message') || key.includes('chat')) messages += num;
      else if (key.includes('booking')) bookings += num;
    }
  }

  if (totalImpressions === 0 && (searchImpressions > 0 || mapsImpressions > 0)) {
    totalImpressions = searchImpressions + mapsImpressions;
  }

  const evidence = {
    importedAt: new Date().toISOString(),
    sourceFile: path.basename(filePath),
    totalRows: rows.length,
    metrics: {
      totalImpressions,
      searchImpressions,
      mapsImpressions,
      websiteClicks,
      callClicks,
      directionRequests,
      messages,
      bookings,
    },
    sampleData: rows.slice(0, 10),
  };

  const outPath = path.resolve(process.cwd(), 'docs/seo/evidence/gbp-performance-latest.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(evidence, null, 2) + '\n');

  console.log(`✓ Performance summary:`);
  console.log(`  • Total Impressions:   ${totalImpressions}`);
  console.log(`  • Search Impressions:  ${searchImpressions}`);
  console.log(`  • Maps Impressions:    ${mapsImpressions}`);
  console.log(`  • Website Clicks:      ${websiteClicks}`);
  console.log(`  • Phone Call Clicks:   ${callClicks}`);
  console.log(`  • Direction Requests:  ${directionRequests}`);
  console.log(`  • Messages / Chats:    ${messages}`);
  console.log(`  • Bookings:            ${bookings}`);
  console.log(`\n✓ Saved parsed performance evidence to docs/seo/evidence/gbp-performance-latest.json`);
}

// ---------------------------------------------------------------------------
// Error Handling
// ---------------------------------------------------------------------------
function handleGbpError(err) {
  if (err?.message?.includes('invalid_grant') || err?.response?.data?.error === 'invalid_grant') {
    console.error('\n[!] Google Business Profile token expired.');
    console.error('To re-authenticate, run: npm run gbp:auth\n');
    process.exit(1);
  }

  const errMsg = err?.response?.data?.error?.message || err.message || '';
  if (errMsg.includes('Quota exceeded') || errMsg.includes('Requests per minute') || err?.response?.status === 429) {
    console.error('\n==================================================');
    console.error('  [!] Google Business Profile API Access Form Required');
    console.error('==================================================\n');
    console.error('Google sets the API quota to 0 requests/min for all new Google Cloud projects');
    console.error('until a 1-time Basic Access Request is submitted.\n');
    console.error('How to activate your quota in 2 minutes:');
    console.error('1. Open the official Google Business Profile API Access Request form:');
    console.error('   ➜ https://support.google.com/business/contact/api_default\n');
    console.error('2. Pre-filled details for your project:');
    console.error('   • Google Cloud Project Number: 398225055848');
    console.error('   • Company / Developer Name:   Devacia');
    console.error('   • Business Website URL:        https://www.devacia.com');
    console.error('   • Target Scopes:               business.manage');
    console.error('   • Use Case Description:        Managing Devacia\'s business profile updates, monitoring Google Maps & Search performance metrics, and responding to customer reviews.\n');
    console.error('3. Alternative instant access:');
    console.error('   In Google Business Profile (business.google.com) → Performance → Export CSV.');
    console.error('   Then import directly into the CLI via: node scripts/gbp-cli.js import <path-to-file.csv>\n');
    process.exit(1);
  }

  if (err?.response?.status === 403 || err?.message?.includes('access_denied')) {
    console.error('\n[!] 403 Forbidden / Access Denied:');
    console.error('1. Check that the Google account selected is an Owner or Manager on Google Business Profile.');
    console.error('2. If you are using a different Google account from your GCP project:');
    console.error('   • Add the email as a "Test user" in Google Cloud Console → APIs & Services → OAuth consent screen.');
    console.error('   • OR download an OAuth 2.0 Desktop Client JSON under that account and save it as gbp-oauth.json in the project root.');
    console.error('3. Ensure "My Business Business Information API" and "Google My Business API" are enabled on the Google Cloud project.\n');
  }

  console.error(errMsg || 'GBP request failed.');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Help Menu
// ---------------------------------------------------------------------------
function printHelp() {
  console.log(`
==================================================
  Google Business Profile (GBP) CLI — Devacia
==================================================

Usage:
  node scripts/gbp-cli.js <command> [options]
  npm run gbp:<command>

Commands:
  auth                              Authenticate with Google Business Profile (1-click OAuth)
  locations, list                   List all GBP accounts, locations, categories & Map links
  audit                             Comprehensive audit (profile NAP, 28-day performance, keywords & reviews)
  reviews                           View all Google reviews, star ratings & response status
  reply <reviewId> "<text>"         Post a reply to a customer review
  posts                             View recent local updates and posts on your business profile
  create-post --summary "..."       Publish a new update post directly to Google Maps & Search
              [--cta LEARN_MORE|BOOK|SIGN_UP] [--url "https://..."]
  update      [--phone "+91..."]    Update business profile phone, website, title, or description
              [--website "https://..."] [--description "..."] [--title "..."]
  import <file.csv>                 Import and parse Google Business Profile performance CSV export
  help, --help                      Show this help message

Quick Examples:
  npm run gbp:auth
  npm run gbp:locations
  npm run gbp:audit
  npm run gbp:reviews
  node scripts/gbp-cli.js reply <id> "Thank you for partnering with Devacia!"
  node scripts/gbp-cli.js create-post --summary "Devacia launches new custom software sprint models for startups." --cta BOOK --url https://www.devacia.com/onboarding
  node scripts/gbp-cli.js import ./gbp-performance.csv
`);
}

// ---------------------------------------------------------------------------
// CLI Router
// ---------------------------------------------------------------------------
export {
  listLocations,
  listReviews,
  replyToReview,
  listPosts,
  createPost,
  updateProfile,
  importGbpCsv,
  runAudit,
  handleGbpError,
};

// Check if running as CLI entrypoint
const isMain = process.argv[1] && (
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url) ||
  process.argv[1].endsWith('gbp-cli.js')
);

if (isMain) {
  const command = process.argv[2] || 'help';

  if (command === 'help' || command === '--help' || command === '-h') {
    printHelp();
    process.exit(0);
  } else if (command === 'auth') {
    if (fs.existsSync(TOKEN_PATH)) fs.unlinkSync(TOKEN_PATH);
    authenticate()
      .then(() => {
        console.log('✓ Successfully authenticated with Google Business Profile API!');
        process.exit(0);
      })
      .catch(handleGbpError);
  } else if (command === 'locations' || command === 'accounts' || command === 'list') {
    listLocations().catch(handleGbpError);
  } else if (command === 'reviews') {
    listReviews().catch(handleGbpError);
  } else if (command === 'reply') {
    replyToReview(process.argv[3], process.argv[4]).catch(handleGbpError);
  } else if (command === 'posts') {
    listPosts().catch(handleGbpError);
  } else if (command === 'create-post' || command === 'post') {
    createPost().catch(handleGbpError);
  } else if (command === 'update') {
    updateProfile().catch(handleGbpError);
  } else if (command === 'import') {
    importGbpCsv(process.argv[3]).catch(handleGbpError);
  } else if (command === 'audit') {
    runAudit().catch(handleGbpError);
  } else {
    console.log(`Unknown command: ${command}`);
    printHelp();
    process.exit(1);
  }
}


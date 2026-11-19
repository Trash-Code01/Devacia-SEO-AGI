import fs from 'fs';
import path from 'path';
import http from 'http';
import url from 'url';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';
import './env-loader.js';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
export const OAUTH_PATH = process.env.GA4_OAUTH_PATH || (
  fs.existsSync(path.resolve(process.cwd(), 'ga4-oauth.json'))
    ? path.resolve(process.cwd(), 'ga4-oauth.json')
    : fs.existsSync(path.resolve(process.cwd(), 'google-oauth.json'))
      ? path.resolve(process.cwd(), 'google-oauth.json')
      : path.resolve(process.cwd(), 'gsc-oauth.json')
);
export const TOKEN_PATH = process.env.GA4_TOKEN_PATH || path.resolve(process.cwd(), 'ga4-token.json');

export function getGa4PropertyId() {
  const propArg = process.argv.find(a => a.startsWith('--property='));
  if (propArg) return propArg.split('=')[1].trim();
  return process.env.GA4_PROPERTY_ID || '538121325';
}

export const GA4_PROPERTY_ID = getGa4PropertyId();

// GA4 Data API requires this read-only scope
const SCOPES = ['https://www.googleapis.com/auth/analytics.readonly'];

function openBrowser(targetUrl) {
  try {
    const cmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start ""' : 'xdg-open';
    exec(`${cmd} "${targetUrl}"`);
  } catch {
    // Console output available
  }
}

export function checkGa4Status() {
  const oauthExists = fs.existsSync(OAUTH_PATH) || fs.existsSync(path.resolve(process.cwd(), 'ga4-oauth.json')) || fs.existsSync(path.resolve(process.cwd(), 'google-oauth.json'));
  const tokenExists = fs.existsSync(TOKEN_PATH);
  return {
    configured: oauthExists,
    propertyId: getGa4PropertyId(),
    oauthFound: oauthExists,
    oauthPath: oauthExists ? OAUTH_PATH : null,
    tokenFound: tokenExists,
  };
}

// ---------------------------------------------------------------------------
// OAuth helpers
// ---------------------------------------------------------------------------
export function getOAuth2Client() {
  if (!fs.existsSync(OAUTH_PATH)) {
    throw new Error(
      `GA4 OAuth credentials not found at ${OAUTH_PATH}\n` +
      `Download from: Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs\n` +
      `Save as ga4-oauth.json or google-oauth.json in the project root.`
    );
  }
  const content = JSON.parse(fs.readFileSync(OAUTH_PATH, 'utf-8'));
  const creds = content.installed || content.web;
  return new google.auth.OAuth2(
    creds.client_id,
    creds.client_secret,
    'http://localhost:3333/oauth2callback'
  );
}

export async function authenticate() {
  const oAuth2Client = getOAuth2Client();

  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
    oAuth2Client.setCredentials(token);
    return oAuth2Client;
  }

  console.log('\n--- Google Analytics 4 Authorization ---');
  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      try {
        if (req.url && req.url.startsWith('/oauth2callback')) {
          const query = new url.URL(req.url, 'http://localhost:3333').searchParams;
          const code = query.get('code');
          if (code) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>Authorization Successful!</h1><p>You can close this tab and return to the terminal.</p>');
            server.close();

            const { tokens } = await oAuth2Client.getToken(code);
            oAuth2Client.setCredentials(tokens);
            fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
            console.log('Credentials saved to ga4-token.json\n');
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
      console.log('Opening browser for Google Analytics authorization...');
      console.log(`If it does not open automatically, visit:\n${authUrl}\n`);
      openBrowser(authUrl);
    });
  });
}

// ---------------------------------------------------------------------------
// Date helpers
// ---------------------------------------------------------------------------
export function getDateRange(days = 28) {
  const end   = new Date();
  end.setDate(end.getDate() - 2); // GA4 data lags ~2 days
  const start = new Date(end);
  start.setDate(start.getDate() - (days - 1));
  const fmt = (d) => d.toISOString().split('T')[0];
  return { startDate: fmt(start), endDate: fmt(end) };
}

// ---------------------------------------------------------------------------
// GA4 Data API wrapper
// ---------------------------------------------------------------------------
export async function runReport(analyticsdata, body, customPropertyId) {
  const propId = customPropertyId || getGa4PropertyId();
  const res = await analyticsdata.properties.runReport({
    property: `properties/${propId}`,
    requestBody: body,
  });
  return res.data;
}

export function extractRows(data) {
  if (!data.rows || data.rows.length === 0) return [];
  return data.rows.map((row) => {
    const dims = (row.dimensionValues || []).map((d) => d.value);
    const mets = (row.metricValues  || []).map((m) => m.value);
    return { dims, mets };
  });
}

// ---------------------------------------------------------------------------
// COMMAND: audit — full traffic + conversion funnel summary
// ---------------------------------------------------------------------------
export async function runAudit(customPropId) {
  const auth = await authenticate();
  const analyticsdata = google.analyticsdata({ version: 'v1beta', auth });
  const { startDate, endDate } = getDateRange(28);
  const activePropertyId = customPropId || getGa4PropertyId();

  console.log(`\n==================================================`);
  console.log(`  GA4 Audit (${startDate} to ${endDate})`);
  console.log(`  Property: properties/${activePropertyId}`);
  console.log(`==================================================\n`);

  // --- 1. Overall summary ---
  const summaryData = await runReport(analyticsdata, {
    dateRanges: [{ startDate, endDate }],
    metrics: [
      { name: 'sessions' },
      { name: 'activeUsers' },
      { name: 'newUsers' },
      { name: 'engagementRate' },
      { name: 'bounceRate' },
      { name: 'averageSessionDuration' },
      { name: 'screenPageViews' },
      { name: 'eventCount' },
      { name: 'keyEvents' },
    ],
  }, activePropertyId);

  const s = summaryData.rows?.[0]?.metricValues || [];
  console.log('--- Overall Summary (28 days) ---');
  console.log(`Sessions:              ${s[0]?.value ?? '—'}`);
  console.log(`Active Users:          ${s[1]?.value ?? '—'}`);
  console.log(`New Users:             ${s[2]?.value ?? '—'}`);
  console.log(`Engagement Rate:       ${s[3] ? (parseFloat(s[3].value) * 100).toFixed(1) + '%' : '—'}`);
  console.log(`Bounce Rate:           ${s[4] ? (parseFloat(s[4].value) * 100).toFixed(1) + '%' : '—'}`);
  console.log(`Avg Session Duration:  ${s[5] ? Math.round(parseFloat(s[5].value)) + 's' : '—'}`);
  console.log(`Page Views:            ${s[6]?.value ?? '—'}`);
  console.log(`Events:                ${s[7]?.value ?? '—'}`);
  console.log(`Key Events (total):    ${s[8]?.value ?? '—'}`);

  // --- 2. Channel breakdown ---
  const channelData = await runReport(analyticsdata, {
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: 'sessionDefaultChannelGroup' }],
    metrics: [
      { name: 'sessions' },
      { name: 'activeUsers' },
      { name: 'keyEvents' },
      { name: 'engagementRate' },
    ],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
  }, activePropertyId);

  console.log('\n--- Sessions by Channel ---');
  const channelRows = extractRows(channelData);
  channelRows.forEach((r, i) => {
    const engRate = (parseFloat(r.mets[3]) * 100).toFixed(1);
    console.log(
      `${(i + 1).toString().padStart(2)}. ${r.dims[0].padEnd(28)} ` +
      `Sessions: ${r.mets[0].padStart(5)}  Users: ${r.mets[1].padStart(5)}  ` +
      `Key Events: ${r.mets[2].padStart(4)}  Engagement: ${engRate}%`
    );
  });

  // --- 3. Top landing pages ---
  const landingData = await runReport(analyticsdata, {
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: 'landingPage' }],
    metrics: [
      { name: 'sessions' },
      { name: 'activeUsers' },
      { name: 'keyEvents' },
      { name: 'bounceRate' },
    ],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit: 15,
  }, activePropertyId);

  console.log('\n--- Top Landing Pages (by sessions) ---');
  const landingRows = extractRows(landingData);
  landingRows.forEach((r, i) => {
    const bounce = (parseFloat(r.mets[3]) * 100).toFixed(0);
    console.log(
      `${(i + 1).toString().padStart(2)}. ${r.dims[0].padEnd(55)} ` +
      `Sessions: ${r.mets[0].padStart(4)}  Key Events: ${r.mets[2].padStart(3)}  Bounce: ${bounce}%`
    );
  });

  // --- 4. Top countries ---
  const countryData = await runReport(analyticsdata, {
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: 'country' }],
    metrics: [{ name: 'sessions' }, { name: 'activeUsers' }, { name: 'keyEvents' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit: 10,
  }, activePropertyId);

  console.log('\n--- Top Countries ---');
  const countryRows = extractRows(countryData);
  countryRows.forEach((r, i) => {
    console.log(
      `${(i + 1).toString().padStart(2)}. ${r.dims[0].padEnd(25)} ` +
      `Sessions: ${r.mets[0].padStart(4)}  Users: ${r.mets[1].padStart(4)}  Key Events: ${r.mets[2].padStart(3)}`
    );
  });

  // --- 5. Device breakdown ---
  const deviceData = await runReport(analyticsdata, {
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: 'deviceCategory' }],
    metrics: [{ name: 'sessions' }, { name: 'engagementRate' }],
  }, activePropertyId);

  console.log('\n--- Devices ---');
  const deviceRows = extractRows(deviceData);
  deviceRows.forEach((r, i) => {
    const eng = (parseFloat(r.mets[1]) * 100).toFixed(1);
    console.log(`${(i + 1).toString().padStart(2)}. ${r.dims[0].padEnd(12)} Sessions: ${r.mets[0].padStart(4)}  Engagement: ${eng}%`);
  });

  return {
    propertyId: `properties/${activePropertyId}`,
    dateRange: { startDate, endDate },
    summary: {
      sessions: s[0]?.value,
      activeUsers: s[1]?.value,
      newUsers: s[2]?.value,
      engagementRate: s[3]?.value,
      bounceRate: s[4]?.value,
      averageSessionDuration: s[5]?.value,
      screenPageViews: s[6]?.value,
      eventCount: s[7]?.value,
      keyEvents: s[8]?.value,
    },
    channels: channelRows,
    landingPages: landingRows,
    countries: countryRows,
    devices: deviceRows,
  };
}

// ---------------------------------------------------------------------------
// COMMAND: events — key event + funnel breakdown
// ---------------------------------------------------------------------------
export async function runEvents(customPropId) {
  const auth = await authenticate();
  const analyticsdata = google.analyticsdata({ version: 'v1beta', auth });
  const { startDate, endDate } = getDateRange(28);
  const activePropertyId = customPropId || getGa4PropertyId();

  console.log(`\n==================================================`);
  console.log(`  GA4 Event & Funnel Report (${startDate} to ${endDate})`);
  console.log(`==================================================\n`);

  const eventData = await runReport(analyticsdata, {
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: 'eventName' }],
    metrics: [{ name: 'eventCount' }, { name: 'totalUsers' }],
    orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
    limit: 30,
  }, activePropertyId);

  const funnelEvents = new Set([
    'form_start', 'form_submit_attempt', 'generate_lead',
    'book_strategy_call', 'calendly_open', 'strategy_call_booked',
    'qualified_lead', 'qualify_lead', 'close_convert_lead',
    'whatsapp_click', 'phone_click', 'email_click',
    'service_interest', 'pricing_interest', 'case_study_view',
  ]);

  const rows = extractRows(eventData);
  const funnelRows = rows.filter((r) => funnelEvents.has(r.dims[0]));
  const otherRows  = rows.filter((r) => !funnelEvents.has(r.dims[0]));

  console.log('--- Conversion & Funnel Events ---');
  if (funnelRows.length === 0) {
    console.log('  No funnel events recorded in this period.');
  } else {
    funnelRows.forEach((r) => {
      const flag = ['generate_lead','strategy_call_booked','qualified_lead','qualify_lead','close_convert_lead'].includes(r.dims[0])
        ? ' ← KEY'
        : '';
      console.log(`  ${r.dims[0].padEnd(35)} Count: ${r.mets[0].padStart(5)}  Users: ${r.mets[1].padStart(5)}${flag}`);
    });
  }

  console.log('\n--- Other Events (diagnostic) ---');
  otherRows.forEach((r) => {
    console.log(`  ${r.dims[0].padEnd(35)} Count: ${r.mets[0].padStart(5)}  Users: ${r.mets[1].padStart(5)}`);
  });

  return { funnelRows, otherRows };
}

// ---------------------------------------------------------------------------
// COMMAND: organic — organic search sessions + landing pages only
// ---------------------------------------------------------------------------
export async function runOrganic(customPropId) {
  const auth = await authenticate();
  const analyticsdata = google.analyticsdata({ version: 'v1beta', auth });
  const { startDate, endDate } = getDateRange(28);
  const activePropertyId = customPropId || getGa4PropertyId();

  console.log(`\n==================================================`);
  console.log(`  GA4 Organic Search Report (${startDate} to ${endDate})`);
  console.log(`==================================================\n`);

  const organicData = await runReport(analyticsdata, {
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: 'landingPage' }, { name: 'sessionDefaultChannelGroup' }],
    metrics: [
      { name: 'sessions' },
      { name: 'activeUsers' },
      { name: 'keyEvents' },
      { name: 'bounceRate' },
    ],
    dimensionFilter: {
      filter: {
        fieldName: 'sessionDefaultChannelGroup',
        stringFilter: { matchType: 'EXACT', value: 'Organic Search' },
      },
    },
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit: 20,
  }, activePropertyId);

  const rows = extractRows(organicData);
  if (rows.length === 0) {
    console.log('No organic search sessions recorded. Verify GA4 stream and channel grouping.');
  } else {
    let totalSessions = 0, totalKeyEvents = 0;
    console.log('--- Organic Landing Pages ---');
    rows.forEach((r, i) => {
      const bounce = (parseFloat(r.mets[3]) * 100).toFixed(0);
      totalSessions   += parseInt(r.mets[0], 10);
      totalKeyEvents  += parseInt(r.mets[2], 10);
      console.log(
        `${(i + 1).toString().padStart(2)}. ${r.dims[0].padEnd(55)} ` +
        `Sessions: ${r.mets[0].padStart(4)}  Key Events: ${r.mets[2].padStart(3)}  Bounce: ${bounce}%`
      );
    });
    console.log(`\n   Total organic sessions (shown): ${totalSessions}  |  Total organic key events: ${totalKeyEvents}`);
  }

  return rows;
}

// ---------------------------------------------------------------------------
// COMMAND: save — save full audit as JSON evidence file
// ---------------------------------------------------------------------------
export async function saveEvidence(customPropId) {
  const auth = await authenticate();
  const analyticsdata = google.analyticsdata({ version: 'v1beta', auth });
  const { startDate, endDate } = getDateRange(28);
  const activePropertyId = customPropId || getGa4PropertyId();

  const outputFlag = process.argv.indexOf('--output');
  const outputPath = outputFlag >= 0
    ? process.argv[outputFlag + 1]
    : `docs/seo/evidence/ga4-report-${new Date().toISOString().split('T')[0]}.json`;

  if (outputFlag >= 0 && (!outputPath || outputPath.startsWith('--'))) {
    throw new Error('--output requires a JSON file path.');
  }

  console.log(`\nCollecting GA4 evidence (${startDate} to ${endDate})...`);

  const [summary, channels, landing, countries, devices, events] = await Promise.all([
    runReport(analyticsdata, {
      dateRanges: [{ startDate, endDate }],
      metrics: [
        { name: 'sessions' }, { name: 'activeUsers' }, { name: 'newUsers' },
        { name: 'engagementRate' }, { name: 'bounceRate' },
        { name: 'averageSessionDuration' }, { name: 'screenPageViews' },
        { name: 'eventCount' }, { name: 'keyEvents' },
      ],
    }, activePropertyId),
    runReport(analyticsdata, {
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'sessionDefaultChannelGroup' }],
      metrics: [{ name: 'sessions' }, { name: 'activeUsers' }, { name: 'keyEvents' }, { name: 'engagementRate' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    }, activePropertyId),
    runReport(analyticsdata, {
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'landingPage' }],
      metrics: [{ name: 'sessions' }, { name: 'activeUsers' }, { name: 'keyEvents' }, { name: 'bounceRate' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 25,
    }, activePropertyId),
    runReport(analyticsdata, {
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'country' }],
      metrics: [{ name: 'sessions' }, { name: 'activeUsers' }, { name: 'keyEvents' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 10,
    }, activePropertyId),
    runReport(analyticsdata, {
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'deviceCategory' }],
      metrics: [{ name: 'sessions' }, { name: 'engagementRate' }],
    }, activePropertyId),
    runReport(analyticsdata, {
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'eventCount' }, { name: 'totalUsers' }],
      orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
      limit: 30,
    }, activePropertyId),
  ]);

  const evidence = {
    collectedAt: new Date().toISOString(),
    propertyId: `properties/${activePropertyId}`,
    dateRange: { startDate, endDate },
    summary,
    channels,
    landingPages: landing,
    countries,
    devices,
    events,
  };

  fs.mkdirSync(path.dirname(path.resolve(outputPath)), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(evidence, null, 2) + '\n');
  console.log(`✓ Evidence saved to ${outputPath}`);
  return evidence;
}

export function handleGa4Error(err) {
  if (err?.message?.includes('invalid_grant') || err?.response?.data?.error === 'invalid_grant') {
    console.error('\n[!] GA4 OAuth token expired.');
    console.error('To re-authenticate, run: npm run ga4:auth\n');
    process.exit(1);
  }
  if (err?.message?.includes('PERMISSION_DENIED') || err?.response?.status === 403) {
    console.error('\n[!] Permission denied. Ensure the Google account has Viewer access to GA4 property', getGa4PropertyId());
    console.error('Check: Google Analytics → Admin → Property Access Management\n');
    process.exit(1);
  }
  console.error(err?.response?.data?.error?.message || err.message || 'GA4 request failed.');
  process.exit(1);
}

// Check if running as CLI entrypoint
const isMain = process.argv[1] && (
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url) ||
  process.argv[1].endsWith('ga4-cli.js')
);

if (isMain) {
  const command = process.argv[2] || 'audit';

  if (command === 'auth') {
    if (fs.existsSync(TOKEN_PATH)) fs.unlinkSync(TOKEN_PATH);
    authenticate()
      .then(() => { console.log('✓ Successfully authenticated with Google Analytics 4!'); process.exit(0); })
      .catch(handleGa4Error);
  } else if (command === 'events') {
    runEvents().catch(handleGa4Error);
  } else if (command === 'organic') {
    runOrganic().catch(handleGa4Error);
  } else if (command === 'save') {
    saveEvidence().catch(handleGa4Error);
  } else {
    runAudit().catch(handleGa4Error);
  }
}

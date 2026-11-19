import fs from 'fs';
import path from 'path';
import http from 'http';
import url from 'url';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';
import './env-loader.js';
import { GSC_ORIGIN, getGscOrigin, getInspectionUrls, selectProperty } from '../src/seo/gsc-inventory.js';

export const OAUTH_PATH = process.env.GSC_OAUTH_PATH || (
  fs.existsSync(path.resolve(process.cwd(), 'gsc-oauth.json'))
    ? path.resolve(process.cwd(), 'gsc-oauth.json')
    : path.resolve(process.cwd(), 'google-oauth.json')
);
export const TOKEN_PATH = process.env.GSC_TOKEN_PATH || path.resolve(process.cwd(), 'gsc-token.json');

const SCOPES = [
  'https://www.googleapis.com/auth/webmasters',
];

function openBrowser(targetUrl) {
  try {
    const cmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start ""' : 'xdg-open';
    exec(`${cmd} "${targetUrl}"`);
  } catch {
    // Console already shows the link
  }
}

export function checkGscStatus() {
  const oauthExists = fs.existsSync(OAUTH_PATH) || fs.existsSync(path.resolve(process.cwd(), 'gsc-oauth.json')) || fs.existsSync(path.resolve(process.cwd(), 'google-oauth.json'));
  const tokenExists = fs.existsSync(TOKEN_PATH);
  return {
    configured: oauthExists,
    oauthFound: oauthExists,
    oauthPath: oauthExists ? OAUTH_PATH : null,
    tokenFound: tokenExists,
    siteOrigin: getGscOrigin(),
  };
}

export function getOAuth2Client() {
  if (!fs.existsSync(OAUTH_PATH)) {
    throw new Error(
      `Search Console OAuth credentials not found. Checked:\n` +
      `  - ${OAUTH_PATH}\n` +
      `  - ${path.resolve(process.cwd(), 'gsc-oauth.json')}\n` +
      `  - ${path.resolve(process.cwd(), 'google-oauth.json')}\n\n` +
      `Download your OAuth 2.0 Client credentials from Google Cloud Console and save as gsc-oauth.json or google-oauth.json.`
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

export async function authenticate(requireWrite = false) {
  const oAuth2Client = getOAuth2Client();

  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
    const tokenScopes = (token.scope || '').split(' ');
    const hasWrite = tokenScopes.some((s) => s.endsWith('/auth/webmasters'));

    if (!requireWrite || hasWrite) {
      oAuth2Client.setCredentials(token);
      return oAuth2Client;
    }

    console.log('\n[!] Search Console write permission is required.');
    console.log('Opening browser for Google authorization with write scopes...\n');
  } else {
    console.log('\n--- Google Search Console Authorization ---');
  }

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
            console.log('Credentials saved to gsc-token.json\n');
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

      console.log('Opening browser for Google authorization...');
      console.log(`If it does not open automatically, visit:\n${authUrl}\n`);
      openBrowser(authUrl);
    });
  });
}

export async function getVerifiedSite(searchconsole) {
  const res = await searchconsole.sites.list();
  const sites = res.data.siteEntry || [];
  if (sites.length === 0) {
    throw new Error('No verified sites found for this Google account in Google Search Console.');
  }

  const match = selectProperty(sites);
  console.log(`Using GSC Property: ${match.siteUrl} (${match.permissionLevel})`);
  return match.siteUrl;
}

export async function runAudit() {
  const auth = await authenticate();
  const searchconsole = google.searchconsole({ version: 'v1', auth });
  const siteUrl = await getVerifiedSite(searchconsole);

  const today = new Date();
  const endDate = new Date(today.setDate(today.getDate() - 2)).toISOString().split('T')[0];
  const startDate = new Date(today.setDate(today.getDate() - 28)).toISOString().split('T')[0];

  console.log(`\n==================================================`);
  console.log(`  GSC Performance Audit (${startDate} to ${endDate})`);
  console.log(`  Property: ${siteUrl}`);
  console.log(`==================================================\n`);

  // Overall metrics
  const summaryRes = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate,
      endDate,
    },
  });

  const totals = summaryRes.data.rows?.[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  console.log(`Total Clicks:       ${totals.clicks}`);
  console.log(`Total Impressions:  ${totals.impressions}`);
  console.log(`Average CTR:        ${(totals.ctr * 100).toFixed(2)}%`);
  console.log(`Average Position:   ${totals.position.toFixed(1)}`);

  // Queries
  const queriesRes = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate,
      endDate,
      dimensions: ['query'],
      rowLimit: 15,
    },
  });

  console.log(`\n--- Top Search Queries ---`);
  const queryRows = queriesRes.data.rows || [];
  if (queryRows.length === 0) {
    console.log('No queries recorded in this period yet.');
  } else {
    queryRows.forEach((r, i) => {
      console.log(`${(i + 1).toString().padStart(2)}. [Pos: ${r.position.toFixed(1).padStart(4)}] [Impr: ${r.impressions.toString().padStart(4)}] [Clicks: ${r.clicks.toString().padStart(2)}] "${r.keys[0]}"`);
    });
  }

  // Pages
  const pagesRes = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate,
      endDate,
      dimensions: ['page'],
      rowLimit: 15,
    },
  });

  console.log(`\n--- Top Pages by Impressions ---`);
  const pageRows = pagesRes.data.rows || [];
  if (pageRows.length === 0) {
    console.log('No page impressions recorded in this period yet.');
  } else {
    pageRows.forEach((r, i) => {
      console.log(`${(i + 1).toString().padStart(2)}. [Pos: ${r.position.toFixed(1).padStart(4)}] [Impr: ${r.impressions.toString().padStart(4)}] [Clicks: ${r.clicks.toString().padStart(2)}] ${r.keys[0]}`);
    });
  }

  // Countries
  const countryRes = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate,
      endDate,
      dimensions: ['country'],
      rowLimit: 10,
    },
  });

  console.log(`\n--- Top Countries ---`);
  const countryRows = countryRes.data.rows || [];
  countryRows.forEach((r, i) => {
    console.log(`${(i + 1).toString().padStart(2)}. [Country: ${r.keys[0].toUpperCase()}] [Impr: ${r.impressions.toString().padStart(4)}] [Clicks: ${r.clicks.toString().padStart(2)}] [Pos: ${r.position.toFixed(1).padStart(4)}]`);
  });

  // Devices
  const deviceRes = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate,
      endDate,
      dimensions: ['device'],
    },
  });

  console.log(`\n--- Devices ---`);
  const deviceRows = deviceRes.data.rows || [];
  deviceRows.forEach((r, i) => {
    console.log(`${(i + 1).toString().padStart(2)}. [Device: ${r.keys[0].toUpperCase().padEnd(7)}] [Impr: ${r.impressions.toString().padStart(4)}] [Clicks: ${r.clicks.toString().padStart(2)}] [CTR: ${(r.ctr * 100).toFixed(2)}%]`);
  });

  return {
    siteUrl,
    startDate,
    endDate,
    totals,
    topQueries: queryRows,
    topPages: pageRows,
    topCountries: countryRows,
    devices: deviceRows,
  };
}

export async function inspectUrls(singleUrl) {
  const auth = await authenticate();
  const searchconsole = google.searchconsole({ version: 'v1', auth });
  const siteUrl = await getVerifiedSite(searchconsole);

  let urlsToInspect;
  const currentOrigin = getGscOrigin();

  if (singleUrl) {
    urlsToInspect = [singleUrl];
  } else {
    const response = await fetch(`${currentOrigin}/sitemap.xml`, { signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`Sitemap fetch failed: HTTP ${response.status}`);
    urlsToInspect = getInspectionUrls(await response.text(), currentOrigin);
  }

  const report = { checkedAt: new Date().toISOString(), property: siteUrl, mode: 'read-only', inspections: [] };
  const outputFlag = process.argv.indexOf('--output');
  const outputPath = outputFlag >= 0 ? process.argv[outputFlag + 1] : null;
  if (outputFlag >= 0 && (!outputPath || outputPath.startsWith('--'))) throw new Error('--output requires a JSON file path.');
  
  const save = () => {
    if (outputPath) {
      fs.mkdirSync(path.dirname(path.resolve(outputPath)), { recursive: true });
      fs.writeFileSync(outputPath, JSON.stringify(report, null, 2) + '\n');
    }
  };

  console.log(`\n==================================================`);
  console.log(`  Inspecting ${urlsToInspect.length} URLs`);
  console.log(`==================================================\n`);

  for (const pageUrl of urlsToInspect) {
    try {
      const res = await searchconsole.urlInspection.index.inspect({
        requestBody: {
          inspectionUrl: pageUrl,
          siteUrl,
        },
      }, { timeout: 30000, retry: false });

      const result = res.data.inspectionResult?.indexStatusResult || {};
      report.inspections.push({ url: pageUrl, ...res.data.inspectionResult });
      save();
      const verdict = result.verdict || 'UNKNOWN';
      const coverage = result.coverageState || 'UNKNOWN';
      const lastCrawl = result.lastCrawlTime ? new Date(result.lastCrawlTime).toLocaleDateString() : 'Never';
      const indexingState = result.indexingState || 'UNKNOWN';

      console.log(`• ${pageUrl}`);
      console.log(`  Verdict: ${verdict} | Coverage: ${coverage} | Crawled: ${lastCrawl} | Indexing: ${indexingState}\n`);
    } catch (err) {
      const status = err.response?.status || null;
      const message = err.response?.data?.error?.message || err.message || 'Inspection failed.';
      report.inspections.push({ url: pageUrl, error: { status, message } });
      save();
      console.log(`• ${pageUrl} -> ${message}\n`);
      process.exitCode = 1;
      if ([401, 403, 429].includes(status) || err.response?.data?.error === 'invalid_grant') break;
    }
  }

  return report;
}

export async function manageSitemaps() {
  const auth = await authenticate(true);
  const searchconsole = google.searchconsole({ version: 'v1', auth });
  const siteUrl = await getVerifiedSite(searchconsole);

  console.log(`\n==================================================`);
  console.log(`  Google Search Console Sitemap Management`);
  console.log(`==================================================\n`);

  try {
    const listRes = await searchconsole.sitemaps.list({ siteUrl });
    const sitemaps = listRes.data.sitemap || [];
    console.log(`Currently submitted sitemaps (${sitemaps.length}):`);
    if (sitemaps.length === 0) {
      console.log('  None recorded yet.');
    } else {
      sitemaps.forEach((sm, i) => {
        console.log(`  ${i + 1}. Path: ${sm.path}`);
        console.log(`     Last Downloaded: ${sm.lastDownloaded || 'Pending'}`);
        console.log(`     Last Submitted:  ${sm.lastSubmitted || 'N/A'}`);
        console.log(`     Errors:          ${sm.errors || 0}`);
        console.log(`     Warnings:        ${sm.warnings || 0}`);
        console.log(`     Submitted URLs:  ${sm.contents?.[0]?.submitted || 'N/A'}`);
        console.log(`     Legacy indexed counter: ${sm.contents?.[0]?.indexed ?? 'N/A'}\n`);
      });
    }
  } catch (err) {
    console.log(`Error listing sitemaps: ${err.message}`);
  }

  const sitemapUrl = `${getGscOrigin()}/sitemap.xml`;
  console.log(`\nSubmitting primary sitemap: ${sitemapUrl} ...`);
  try {
    await searchconsole.sitemaps.submit({
      siteUrl,
      feedpath: sitemapUrl,
    });
    console.log(`✓ Successfully submitted ${sitemapUrl} to Google Search Console!`);
  } catch (err) {
    console.log(`✗ Submission note: ${err.message}`);
    if (err.message.includes('insufficient authentication scopes') || err.status === 403) {
      console.log(`\n[Action Required for API submission] The token has webmasters.readonly scope.`);
      console.log(`Direct submission via GSC Web UI is available at:`);
      console.log(`https://search.google.com/search-console/sitemaps?resource_id=${encodeURIComponent(siteUrl)}`);
    }
  }
}

export async function requestIndex(singleUrl) {
  console.log('Ordinary website pages are not eligible for the Google Indexing API.');
  console.log('This command inspects coverage. After deployment, use Search Console URL Inspection to request a crawl manually.');
  return await inspectUrls(singleUrl);
}

export function handleGscError(err) {
  if (err?.message?.includes('invalid_grant') || err?.response?.data?.error === 'invalid_grant') {
    console.error('\n[!] GSC OAuth token expired (Google Cloud 7-day test token limit).');
    console.error('To re-authenticate, run: npm run gsc:auth');
    console.error('Tip: To prevent weekly expiration, switch the OAuth consent screen to "In Production" in Google Cloud Console.\n');
    process.exit(1);
  }
  console.error(err.response?.data?.error?.message || err.message || 'GSC request failed.');
  process.exit(1);
}

// Check if running as CLI entrypoint
const isMain = process.argv[1] && (
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url) ||
  process.argv[1].endsWith('gsc-cli.js')
);

if (isMain) {
  const command = process.argv[2] || 'audit';

  if (command === 'inspect') {
    inspectUrls(process.argv[3]?.startsWith('--') ? undefined : process.argv[3]).catch(handleGscError);
  } else if (command === 'sitemap' || command === 'sitemaps') {
    manageSitemaps().catch(handleGscError);
  } else if (command === 'request-index' || command === 'index') {
    requestIndex(process.argv[3]?.startsWith('--') ? undefined : process.argv[3]).catch(handleGscError);
  } else if (command === 'auth') {
    if (fs.existsSync(TOKEN_PATH)) {
      fs.unlinkSync(TOKEN_PATH);
    }
    authenticate()
      .then(() => {
        console.log('✓ Successfully authenticated with Google Search Console!');
        process.exit(0);
      })
      .catch(handleGscError);
  } else {
    runAudit().catch(handleGscError);
  }
}

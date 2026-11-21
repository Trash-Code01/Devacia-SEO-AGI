#!/usr/bin/env node

/**
 * Devacia SEO AGI — Embedded GUI Web Server & REST API
 * 
 * High-performance, zero-dependency local HTTP server providing:
 * 1. REST API endpoints for Keyword Research, SERP Title Studio, Query Harvester, and KD Checker
 * 2. Static file serving for the interactive Web Studio UI (gui/)
 * 3. Cross-platform auto-launching browser capability
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import url from 'url';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import './env-loader.js';

// Subsystem engines
import {
  expandKeywordsWithGoogle,
  clusterKeywords,
  generateRankBlueprint,
  loadConfig as loadGkpConfig
} from './gkp-cli.js';

import {
  generateTitleCandidates,
  generateMetaDescription,
  auditSnippet,
  harvestLiveQueriesWithIntent
} from './serp-architect.js';

import {
  checkKeywordDensity,
  checkContentKeywordDensity,
  rankTitlesByKD
} from '../src/seo/keyword-density-checker.js';

import {
  harvestLocalIntelligence
} from './local-geo-intelligence.js';

import { checkGscStatus } from './gsc-cli.js';
import { checkGa4Status } from './ga4-cli.js';
import { checkGbpStatus } from './gbp-cli.js';
import { auditGeo } from './geo-engine.js';
import { auditCWV } from './cwv-engine.js';
import { auditSchema } from './schema-validator.js';
import { calculateDomainRating, analyzeAnchorProfile } from './backlink-engine.js';
import { findCompetitorLinkGaps, generateOutreachPitch } from './backlink-builder.js';
import { runAutonomousSeoAgent } from './autonomous-seo-agent.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const GUI_DIR = path.resolve(ROOT_DIR, 'gui');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 5 * 1024 * 1024) { // 5MB limit
        reject(new Error('Request payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(new Error('Invalid JSON format'));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, data) {
  const payload = JSON.stringify(data);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(payload);
}

function sendError(res, statusCode, message) {
  sendJson(res, statusCode, { error: message, success: false });
}

function serveStaticFile(req, res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      res.end(content);
    }
  });
}

export function startGuiServer(options = {}) {
  const port = options.port || parseInt(process.env.GUI_PORT, 10) || 3333;
  const open = options.open !== false;

  const server = http.createServer(async (req, res) => {
    const parsedUrl = new url.URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = parsedUrl.pathname;

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      });
      res.end();
      return;
    }

    // -----------------------------------------------------------------------
    // REST API Routes
    // -----------------------------------------------------------------------
    try {
      // 1. Health & Subsystem Status
      if (pathname === '/api/status' && req.method === 'GET') {
        const gkpConf = loadGkpConfig();
        const gscStat = checkGscStatus();
        const ga4Stat = checkGa4Status();
        const gbpStat = checkGbpStatus();

        return sendJson(res, 200, {
          success: true,
          system: 'Devacia SEO AGI Studio',
          version: '1.0.0',
          siteUrl: process.env.SEO_SITE_URL || 'https://www.devacia.com',
          brand: process.env.GBP_BUSINESS_NAME || 'Devacia',
          subsystems: {
            keywordPlanner: {
              configured: Boolean(gkpConf.developerToken && gkpConf.customerId),
              suggestReady: true,
            },
            searchConsole: gscStat,
            analytics4: ga4Stat,
            businessProfile: gbpStat,
          },
        });
      }

      // 2. Keyword Expansion
      if (pathname === '/api/keywords/expand' && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const { seed, geo = 'US', includeAlphabet = true } = body;
        if (!seed) return sendError(res, 400, 'seed parameter is required');

        const keywords = await expandKeywordsWithGoogle(seed, { geo, includeAlphabet });
        return sendJson(res, 200, { success: true, count: keywords.length, keywords });
      }

      // 3. Keyword Clustering
      if (pathname === '/api/keywords/cluster' && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const { seed, geo = 'US' } = body;
        if (!seed) return sendError(res, 400, 'seed parameter is required');

        const keywords = await expandKeywordsWithGoogle(seed, { geo, includeAlphabet: true });
        const clusters = clusterKeywords(keywords, seed);
        return sendJson(res, 200, { success: true, seed, clusters });
      }

      // 4. Rank #1 Content Blueprint
      if (pathname === '/api/keywords/blueprint' && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const { targetKeyword, secondaryKeywords = [] } = body;
        if (!targetKeyword) return sendError(res, 400, 'targetKeyword is required');

        const blueprint = generateRankBlueprint(targetKeyword, secondaryKeywords);
        return sendJson(res, 200, { success: true, blueprint });
      }

      // 5. Title & Meta Generator
      if (pathname === '/api/titles/generate' && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const { topic, brand, audience, geo } = body;
        if (!topic) return sendError(res, 400, 'topic parameter is required');

        const candidates = generateTitleCandidates(topic, { brand, audience, geo });
        const metaDescriptions = generateMetaDescription(topic, { brand, audience });

        return sendJson(res, 200, {
          success: true,
          topic,
          candidates,
          metaDescriptions,
        });
      }

      // 6. Title / Snippet Pixel Audit
      if (pathname === '/api/titles/audit' && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const { title = '', description = '', targetKeyword = '' } = body;

        const audit = auditSnippet(title, description);
        const kd = checkKeywordDensity(title, targetKeyword);

        return sendJson(res, 200, {
          success: true,
          audit,
          kd,
        });
      }

      // 7. Live Query Harvester
      if (pathname === '/api/queries/harvest' && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const { seed, geo = 'us', includeAlphabet = true } = body;
        if (!seed) return sendError(res, 400, 'seed parameter is required');

        const results = await harvestLiveQueriesWithIntent(seed, { geo, includeAlphabet });
        return sendJson(res, 200, { success: true, results });
      }

      // 8. Local UULE Query Simulator
      if (pathname === '/api/queries/local' && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const { location, service } = body;
        if (!location || !service) return sendError(res, 400, 'location and service are required');

        const intel = await harvestLocalIntelligence(location, service);
        return sendJson(res, 200, { success: true, intel });
      }

      // 9. Keyword Density & Content Auditor
      if (pathname === '/api/kd/check' && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const { text = '', title = '', targetKeyword = '', isArticle = false } = body;

        if (isArticle || text.split(/\s+/).length > 25) {
          const contentResult = checkContentKeywordDensity(text, targetKeyword);
          return sendJson(res, 200, { success: true, mode: 'content', result: contentResult });
        } else {
          const evalText = title || text;
          const titleResult = checkKeywordDensity(evalText, targetKeyword);
          return sendJson(res, 200, { success: true, mode: 'title', result: titleResult });
        }
      }

      // 10. GEO & AI Search Engine Audit
      if (pathname === '/api/geo/audit' && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const { url = 'https://www.devacia.com' } = body;
        const geoResult = await auditGeo(url);
        return sendJson(res, 200, { success: true, result: geoResult });
      }

      // 11. Core Web Vitals & Speed Audit
      if (pathname === '/api/cwv/audit' && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const { url = 'https://www.devacia.com', strategy = 'mobile' } = body;
        const cwvResult = await auditCWV(url, strategy);
        return sendJson(res, 200, { success: true, result: cwvResult });
      }

      // 12. Schema Graph & Rich Snippet Validator
      if (pathname === '/api/schema/audit' && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const { url = 'https://www.devacia.com' } = body;
        const schemaResult = await auditSchema(url);
        return sendJson(res, 200, { success: true, result: schemaResult });
      }

      // 13. Domain Rating & Backlink Audit
      if (pathname === '/api/backlinks/audit' && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const { domain = 'devacia.com' } = body;
        const drData = await calculateDomainRating(domain);
        const anchors = (drData.knownBacklinks || []).map(b => b.anchor);
        const anchorProfile = analyzeAnchorProfile(anchors, domain.split('.')[0]);
        return sendJson(res, 200, { success: true, drData, anchorProfile });
      }

      // 14. Competitor Link Gaps & Opportunities
      if (pathname === '/api/backlinks/opportunities' && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const { domain = 'devacia.com', competitors = [] } = body;
        const gapData = findCompetitorLinkGaps(domain, competitors);
        const guestPitch = generateOutreachPitch('guest-post', { brandName: domain.includes('devacia') ? 'Devacia' : 'Yoglivya' });
        const footerCode = generateOutreachPitch('client-footer', { clientDomain: `https://${domain}` });
        return sendJson(res, 200, { success: true, ...gapData, samplePitches: { guestPost: guestPitch, clientFooter: footerCode } });
      }

      // 15. Master Autonomous Agent Test Run
      if (pathname === '/api/agent/run-test' && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const { domain = 'https://www.devacia.com' } = body;
        const agentResult = await runAutonomousSeoAgent(domain);
        return sendJson(res, 200, { success: true, result: agentResult });
      }

      // ---------------------------------------------------------------------
      // Static File Serving (Web UI)
      // ---------------------------------------------------------------------
      let cleanPath = pathname;
      if (cleanPath === '/' || cleanPath === '') {
        cleanPath = '/index.html';
      }

      const filePath = path.join(GUI_DIR, cleanPath);
      // Security check: ensure filePath is inside GUI_DIR
      if (!filePath.startsWith(GUI_DIR)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        return res.end('Access denied');
      }

      serveStaticFile(req, res, filePath);
    } catch (err) {
      console.error('API Error:', err);
      sendError(res, 500, err.message || 'Internal server error');
    }
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      if (!options.port && port < 3340) {
        port++;
        console.warn(`[Notice] Port in use, shifting to http://localhost:${port}...`);
        setTimeout(() => server.listen(port), 200);
      } else {
        console.error(`\n[Error] Port ${port} is already in use by another process.`);
      }
    } else {
      console.error('[Server Error]', err);
    }
  });

  server.listen(port, () => {
    const urlStr = `http://localhost:${port}`;
    console.log(`\n================================================================`);
    console.log(`  🦅 DEVACIA SEO AGI — INTERACTIVE WEB STUDIO`);
    console.log(`================================================================`);
    console.log(`  ➜ Local Studio:    ${urlStr}`);
    console.log(`  ➜ IPv4 Access:     http://127.0.0.1:${port}`);
    console.log(`  ➜ REST API:        ${urlStr}/api/status`);
    console.log(`  ➜ Mode:            Dual-Engine (CLI + Web GUI)`);
    console.log(`================================================================\n`);
    console.log(`Press Ctrl+C to stop the GUI server.\n`);

    if (open) {
      try {
        const startCmd = process.platform === 'win32' ? `start "" "${urlStr}"` :
                         process.platform === 'darwin' ? `open "${urlStr}"` : `xdg-open "${urlStr}"`;
        exec(startCmd);
      } catch {}
    }
  });

  return server;
}

// Auto-run if executed directly
if (process.argv[1] && (path.resolve(process.argv[1]) === fileURLToPath(import.meta.url) || process.argv[1].endsWith('gui-server.js'))) {
  const portArg = process.argv.find(a => a.startsWith('--port='));
  const port = portArg ? parseInt(portArg.split('=')[1], 10) : 3333;
  const noOpen = process.argv.includes('--no-open');
  startGuiServer({ port, open: !noOpen });
}

export default startGuiServer;

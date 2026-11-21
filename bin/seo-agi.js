#!/usr/bin/env node

/**
 * Devacia SEO AGI - Master Unified Command Line Interface
 * 
 * Orchestrates:
 * 1. Google Keyword Planner & SERP Architect Engine (gkp-cli.js)
 * 2. Google Search Console API Engine (gsc-cli.js)
 * 3. Google Analytics 4 Data Engine (ga4-cli.js)
 * 4. Google Business Profile Local SEO Engine (gbp-cli.js)
 * 5. Agentic SEO Skill Framework (89 analysis engines, GEO/AEO, Schema, E-E-A-T)
 * 6. Native Stdio Model Context Protocol (MCP) Server for Autonomous AI Agents
 */

import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import '../scripts/env-loader.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const SCRIPTS_DIR = path.resolve(ROOT_DIR, 'scripts');
const SKILL_SCRIPTS_DIR = fs.existsSync(path.resolve(ROOT_DIR, 'skills', 'seo', 'scripts'))
  ? path.resolve(ROOT_DIR, 'skills', 'seo', 'scripts')
  : path.resolve(ROOT_DIR, '.agent', 'skills', 'seo', 'scripts');

const ANSI = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
  blue: '\x1b[34m',
  dim: '\x1b[2m',
};

function banner() {
  console.log(`
${ANSI.cyan}${ANSI.bold}╔══════════════════════════════════════════════════════════════════════╗
║               DEVACIA SEO AGI — MASTER INTELLIGENCE ENGINE           ║
║       Autonomous Cross-Engine SEO Orchestrator & Strategic Brain    ║
╚══════════════════════════════════════════════════════════════════════╝${ANSI.reset}
`);
}

function help() {
  banner();
  console.log(`${ANSI.bold}USAGE:${ANSI.reset}
  node bin/seo-agi.js <subsystem> [command] [options]
  npm run seo-agi -- <subsystem> [command] [options]

${ANSI.bold}SUBSYSTEMS:${ANSI.reset}

  ${ANSI.green}status${ANSI.reset}
    Run a full diagnostic audit of all 5 SEO engines, OAuth tokens, and Python runtimes.

  ${ANSI.magenta}${ANSI.bold}brain${ANSI.reset}
    Run the Ultimate AGI Brain: multi-source LLM data analysis & automated task dispatch.

  ${ANSI.magenta}${ANSI.bold}dispatch${ANSI.reset} <agent> [args...]
    Dispatch mission to specialist expert: architect, geo, cro, authority, or sentinel.

  ${ANSI.cyan}${ANSI.bold}dr${ANSI.reset} [domain]
    Check live Domain Rating (DR), Domain Authority (DA), and backlink authority metrics.

  ${ANSI.cyan}${ANSI.bold}backlinks${ANSI.reset} [domain]
    Audit active backlinks, anchor text distribution, and over-optimization penalty risk.

  ${ANSI.cyan}${ANSI.bold}backlink-builder${ANSI.reset} [domain]
    Find competitor backlink gaps, Tier-1 DR 80+ directories, and generate outreach pitches.

  ${ANSI.magenta}${ANSI.bold}test-agent${ANSI.reset} [domain]
    Run the Big Autonomous SEO Agent Sentinel test across all 6 core vectors with full report.

  ${ANSI.cyan}${ANSI.bold}geo${ANSI.reset} [url]
    Run GEO & AI Search Engine Audit: Evaluates llms.txt, AI bots, Citation Readiness & Answer Blocks.

  ${ANSI.cyan}${ANSI.bold}cwv${ANSI.reset} [url]
    Run Core Web Vitals & Real-Time Performance Audit (TTFB, Assets, Compression, Speed).

  ${ANSI.cyan}${ANSI.bold}schema${ANSI.reset} [url]
    Audit and validate JSON-LD Structured Data, Knowledge Graph entities, and OpenGraph tags.

  ${ANSI.cyan}${ANSI.bold}local${ANSI.reset} <location> <service>
    Harvest real-time localized search behavior, UULE Google SERP, and zero-truncation schema.

  ${ANSI.cyan}${ANSI.bold}titles${ANSI.reset}
    Run the SERP Architect to audit zero-truncation (< 58ch) Title and Meta tags.

  ${ANSI.cyan}${ANSI.bold}title-gen${ANSI.reset} <topic> [--brand="Name"]
    Generate mathematically verified Title candidates with < 580px pixel width & meta descriptions.

  ${ANSI.cyan}${ANSI.bold}queries${ANSI.reset} <seed> [--geo=US]
    Harvest real-time Google search suggestions categorized by commercial, questions, and comparison intents.

  ${ANSI.cyan}${ANSI.bold}density${ANSI.reset} <keyword> <text/file>
    Audit content or meta title for exact keyword density, reading time, and NLP n-grams.

  ${ANSI.magenta}${ANSI.bold}gui${ANSI.reset} [--port=3333] [--no-open]
    Launch the interactive Devacia SEO AGI Web Studio (Dual CLI & GUI operation).

  ${ANSI.green}kpi${ANSI.reset}  <command>
    Google Keyword Planner & Ranking Intelligence Engine:
      • ${ANSI.yellow}ideas${ANSI.reset} <keywords...> [--geo=US]  Official Google Ads monthly volume & CPC
      • ${ANSI.yellow}expand${ANSI.reset} <seed> [--geo=US]       Instant 50-300+ long-tail keyword discovery (Zero-Auth)
      • ${ANSI.yellow}cluster${ANSI.reset} <seed>                 Topical clustering (Pillars, Money clusters, FAQs)
      • ${ANSI.yellow}plan${ANSI.reset} <topic>                   Generate Rank #1 Content Blueprint with Schema JSON-LD
      • ${ANSI.yellow}export${ANSI.reset} <seed>                 Export discovered keywords to CSV
      • ${ANSI.yellow}auth${ANSI.reset} / ${ANSI.yellow}setup${ANSI.reset} / ${ANSI.yellow}status${ANSI.reset}      Manage Google Ads API OAuth credentials

  ${ANSI.green}gsc${ANSI.reset}  <command>
    Google Search Console Engine:
      • ${ANSI.yellow}audit${ANSI.reset}                         Query live performance (Clicks, Impressions, CTR, Pos)
      • ${ANSI.yellow}inspect${ANSI.reset} <url>                 Live URL Inspection API (Index state & crawl issues)
      • ${ANSI.yellow}index${ANSI.reset} <url>                   Direct search engine indexing request
      • ${ANSI.yellow}auth${ANSI.reset}                          Authenticate Search Console OAuth

  ${ANSI.green}ga4${ANSI.reset}  <command>
    Google Analytics 4 Engine:
      • ${ANSI.yellow}audit${ANSI.reset}                         30-day traffic audit (Users, Sessions, Bounce Rate)
      • ${ANSI.yellow}events${ANSI.reset}                        Custom conversions & lead event performance
      • ${ANSI.yellow}organic${ANSI.reset}                       Organic search landing page breakdown
      • ${ANSI.yellow}save${ANSI.reset}                          Export analytics snapshot to JSON
      • ${ANSI.yellow}auth${ANSI.reset}                          Authenticate GA4 OAuth

  ${ANSI.green}gbp${ANSI.reset}  <command>
    Google Business Profile Local Engine:
      • ${ANSI.yellow}audit${ANSI.reset}                         Local search visibility & average ratings
      • ${ANSI.yellow}locations${ANSI.reset}                     List verified business profile locations
      • ${ANSI.yellow}reviews${ANSI.reset}                       Customer review audit & sentiment
      • ${ANSI.yellow}posts${ANSI.reset}                         Create or inspect local SEO posts

  ${ANSI.green}skill${ANSI.reset}  <script-name> [args...]
    Agentic SEO Python Skill Engine (89 specialist scripts):
      • ${ANSI.yellow}robots${ANSI.reset} <url>                  Robots.txt & AI Crawler Policy audit
      • ${ANSI.yellow}sitemap${ANSI.reset} <url>                 XML Sitemap validator & quality checker
      • ${ANSI.yellow}schema${ANSI.reset} <url>                  Schema.org JSON-LD extractor & validator
      • ${ANSI.yellow}technical${ANSI.reset} <url>               Crawl, index, CWV, security headers
      • ${ANSI.yellow}geo${ANSI.reset} <url>                     Generative Engine Optimization (AI Overviews)
      • ${ANSI.yellow}aeo${ANSI.reset} <url>                     Answer Engine Optimization (Featured Snippets)
      • ${ANSI.yellow}eeat${ANSI.reset} <url>                    E-E-A-T trust & author authority scoring
      • ${ANSI.yellow}links${ANSI.reset} <url>                   Internal & external link graph analysis

  ${ANSI.green}audit${ANSI.reset} <url>
    Run a full, multi-vector automated audit on a target URL or domain.

  ${ANSI.green}plan${ANSI.reset} <topic>
    Run end-to-end strategic planning: Keyword expansion -> Topical Clustering -> Rank Blueprint.

  ${ANSI.green}mcp${ANSI.reset}
    Start the Model Context Protocol (MCP) server for Antigravity, Claude, and Cursor.
`);
}

function runProcess(command, args, env = {}) {
  return new Promise((resolve, reject) => {
    const safeArgs = process.platform === 'win32'
      ? args.map(a => (typeof a === 'string' && a.includes(' ') && !a.startsWith('"') ? `"${a}"` : a))
      : args;

    const proc = spawn(command, safeArgs, {
      stdio: 'inherit',
      cwd: ROOT_DIR,
      env: { ...process.env, PYTHONIOENCODING: 'utf-8', PYTHONUTF8: '1', ...env },
      shell: process.platform === 'win32',
    });

    proc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Command exited with status code ${code}`));
    });

    proc.on('error', (err) => {
      reject(err);
    });
  });
}

async function statusCheck() {
  banner();
  console.log(`${ANSI.bold}=== SYSTEM & ENGINE READINESS AUDIT ===${ANSI.reset}\n`);

  // 1. Google Keyword Planner
  console.log(`${ANSI.cyan}[1/5] Google Keyword Planner Engine:${ANSI.reset}`);
  try {
    await runProcess('node', [path.join(SCRIPTS_DIR, 'gkp-cli.js'), 'status']);
  } catch (err) {
    console.log(`  ${ANSI.yellow}! GKP status check returned notice.${ANSI.reset}`);
  }

  const sharedOAuth = fs.existsSync(path.join(ROOT_DIR, 'google-oauth.json'));
  if (sharedOAuth) {
    console.log(`  ${ANSI.green}ℹ Unified Google OAuth Client detected (google-oauth.json)${ANSI.reset}`);
  }

  // 2. Google Search Console
  console.log(`\n${ANSI.cyan}[2/5] Google Search Console Engine:${ANSI.reset}`);
  const gscOAuth = fs.existsSync(path.join(ROOT_DIR, 'gsc-oauth.json')) || sharedOAuth;
  const gscToken = fs.existsSync(path.join(ROOT_DIR, 'gsc-token.json'));
  console.log(`  • OAuth Client: ${gscOAuth ? ANSI.green + '✓ Found' : ANSI.red + '✗ Missing (gsc-oauth.json / google-oauth.json)'} ${ANSI.reset}`);
  console.log(`  • Token Cache:  ${gscToken ? ANSI.green + '✓ Stored (gsc-token.json)' : ANSI.yellow + '✗ Pending Auth (npm run gsc:auth)'} ${ANSI.reset}`);

  // 3. Google Analytics 4
  console.log(`\n${ANSI.cyan}[3/5] Google Analytics 4 Engine:${ANSI.reset}`);
  const ga4OAuth = fs.existsSync(path.join(ROOT_DIR, 'ga4-oauth.json')) || sharedOAuth;
  const ga4Token = fs.existsSync(path.join(ROOT_DIR, 'ga4-token.json'));
  console.log(`  • OAuth Client: ${ga4OAuth ? ANSI.green + '✓ Found' : ANSI.red + '✗ Missing (ga4-oauth.json / google-oauth.json)'} ${ANSI.reset}`);
  console.log(`  • Token Cache:  ${ga4Token ? ANSI.green + '✓ Stored (ga4-token.json)' : ANSI.yellow + '✗ Pending Auth (npm run ga4:auth)'} ${ANSI.reset}`);

  // 4. Google Business Profile
  console.log(`\n${ANSI.cyan}[4/5] Google Business Profile Engine:${ANSI.reset}`);
  const gbpOAuth = fs.existsSync(path.join(ROOT_DIR, 'gbp-oauth.json')) || sharedOAuth;
  const gbpToken = fs.existsSync(path.join(ROOT_DIR, 'gbp-token.json'));
  console.log(`  • OAuth Client: ${gbpOAuth ? ANSI.green + '✓ Found' : ANSI.red + '✗ Missing (gbp-oauth.json / google-oauth.json)'} ${ANSI.reset}`);
  console.log(`  • Token Cache:  ${gbpToken ? ANSI.green + '✓ Stored (gbp-token.json)' : ANSI.yellow + '✗ Pending Auth (npm run gbp:auth)'} ${ANSI.reset}`);

  // 5. Agentic SEO Skill Engine
  console.log(`\n${ANSI.cyan}[5/5] Agentic SEO Skill Subsystem (89 Analysis Engines):${ANSI.reset}`);
  const skillExists = fs.existsSync(SKILL_SCRIPTS_DIR);
  if (skillExists) {
    const scripts = fs.readdirSync(SKILL_SCRIPTS_DIR).filter(f => f.endsWith('.py'));
    console.log(`  • Status:       ${ANSI.green}✓ INSTALLED & READY${ANSI.reset}`);
    console.log(`  • Py Engines:   ${ANSI.bold}${scripts.length} Python analysis engines available${ANSI.reset}`);
    console.log(`  • Location:     ${SKILL_SCRIPTS_DIR}`);
  } else {
    console.log(`  • Status:       ${ANSI.red}✗ Skill scripts not found in ${SKILL_SCRIPTS_DIR}${ANSI.reset}`);
  }

  console.log(`\n${ANSI.green}${ANSI.bold}Devacia SEO AGI is armed and operational.${ANSI.reset}\n`);
}

async function runSkillScript(scriptAlias, args) {
  const aliasMap = {
    robots: 'robots_checker.py',
    sitemap: 'sitemap_checker.py',
    schema: 'validate_schema.py',
    technical: 'crawl_audit.py',
    geo: 'answer_block_scanner.py',
    aeo: 'answer_block_scanner.py',
    eeat: 'eeat_signal_checker.py',
    links: 'link_profile.py',
    images: 'image_audit.py',
    security: 'security_headers.py',
    canonical: 'canonical_checker.py',
    article: 'article_seo.py',
  };

  const targetFile = aliasMap[scriptAlias] || (scriptAlias.endsWith('.py') ? scriptAlias : `${scriptAlias}.py`);
  const fullPath = path.join(SKILL_SCRIPTS_DIR, targetFile);

  if (!fs.existsSync(fullPath)) {
    console.error(`${ANSI.red}Error: Skill script '${targetFile}' not found in ${SKILL_SCRIPTS_DIR}.${ANSI.reset}`);
    process.exit(1);
  }

  console.log(`${ANSI.cyan}⚡ Running Agentic SEO engine: ${targetFile}...${ANSI.reset}`);
  await runProcess('python', [fullPath, ...args]);
}

async function fullAudit(url) {
  if (!url) {
    console.error(`${ANSI.red}Error: Please provide a URL to audit. Example: node bin/seo-agi.js audit https://www.devacia.com${ANSI.reset}`);
    process.exit(1);
  }

  banner();
  console.log(`${ANSI.bold}Starting Full Multi-Vector SEO AGI Audit for: ${ANSI.cyan}${url}${ANSI.reset}\n`);

  console.log(`${ANSI.bold}Step 1: Robots.txt & AI Crawler Policy${ANSI.reset}`);
  try {
    await runSkillScript('robots', [url]);
  } catch (e) {}

  console.log(`\n${ANSI.bold}Step 2: Security Headers & Transport Security${ANSI.reset}`);
  try {
    await runSkillScript('security', [url]);
  } catch (e) {}

  console.log(`\n${ANSI.bold}Step 3: Canonical & Indexability Verification${ANSI.reset}`);
  try {
    await runSkillScript('canonical', [url]);
  } catch (e) {}

  console.log(`\n${ANSI.bold}Step 4: Schema.org Structured Data${ANSI.reset}`);
  try {
    await runSkillScript('schema', [url]);
  } catch (e) {}

  console.log(`\n${ANSI.green}${ANSI.bold}✓ Multi-Vector Audit Complete.${ANSI.reset}\n`);
}

async function fullPlan(topic) {
  if (!topic) {
    console.error(`${ANSI.red}Error: Please provide a topic. Example: node bin/seo-agi.js plan "b2b web design"${ANSI.reset}`);
    process.exit(1);
  }

  banner();
  console.log(`${ANSI.bold}Executing End-to-End Strategic SEO AGI Blueprint for: ${ANSI.cyan}"${topic}"${ANSI.reset}\n`);

  console.log(`${ANSI.bold}[Phase 1/3] Deep Keyword Expansion (Alphabet Soup + Questions)...${ANSI.reset}`);
  await runProcess('node', [path.join(SCRIPTS_DIR, 'gkp-cli.js'), 'expand', topic]);

  console.log(`\n${ANSI.bold}[Phase 2/3] Topical Clustering (Pillars & Hub-and-Spoke Mapping)...${ANSI.reset}`);
  await runProcess('node', [path.join(SCRIPTS_DIR, 'gkp-cli.js'), 'cluster', topic]);

  console.log(`\n${ANSI.bold}[Phase 3/3] Generating Rank #1 Semantic Content Blueprint & Schema...${ANSI.reset}`);
  await runProcess('node', [path.join(SCRIPTS_DIR, 'gkp-cli.js'), 'rank-plan', topic]);

  console.log(`\n${ANSI.green}${ANSI.bold}✓ End-to-End Strategic Blueprint successfully created in docs/seo-keywords/!${ANSI.reset}\n`);
}

// ---------------------------------------------------------------------------
// Main CLI Router
// ---------------------------------------------------------------------------
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] ? args[0].toLowerCase() : 'help';
  const subArgs = args.slice(1);

  switch (command) {
    case 'status':
      await statusCheck();
      break;

    case 'kpi':
      await runProcess('node', [path.join(SCRIPTS_DIR, 'gkp-cli.js'), ...subArgs]);
      break;

    case 'gsc':
      await runProcess('node', [path.join(SCRIPTS_DIR, 'gsc-cli.js'), ...subArgs]);
      break;

    case 'ga4':
      await runProcess('node', [path.join(SCRIPTS_DIR, 'ga4-cli.js'), ...subArgs]);
      break;

    case 'gbp':
      await runProcess('node', [path.join(SCRIPTS_DIR, 'gbp-cli.js'), ...subArgs]);
      break;

    case 'skill':
      if (subArgs.length === 0) {
        console.error(`${ANSI.red}Error: Please specify a skill script. Examples: robots, sitemap, schema, eeat, geo, links${ANSI.reset}`);
        process.exit(1);
      }
      await runSkillScript(subArgs[0], subArgs.slice(1));
      break;

    case 'audit':
      await fullAudit(subArgs[0]);
      break;

    case 'plan':
      await fullPlan(subArgs.join(' '));
      break;

    case 'brain':
    case 'analyze':
      await runProcess('node', [path.join(SCRIPTS_DIR, 'agi-brain.js'), 'analyze']);
      break;

    case 'dispatch':
      await runProcess('node', [path.join(SCRIPTS_DIR, 'agi-brain.js'), 'dispatch', ...subArgs]);
      break;

    case 'geo':
    case 'aeo':
      {
        const { auditGeo } = await import('../scripts/geo-engine.js');
        const target = subArgs[0] || 'https://www.devacia.com';
        banner();
        console.log(`${ANSI.bold}Auditing Generative Engine Optimization (GEO) for: ${ANSI.cyan}${target}${ANSI.reset}\n`);
        const res = await auditGeo(target);
        console.log(`${ANSI.bold}=== GEO SCORES & AI READINESS ===${ANSI.reset}`);
        console.log(`Overall GEO Score:       ${res.scores.geoOverall >= 80 ? ANSI.green : ANSI.yellow}${res.scores.geoOverall}/100${ANSI.reset}`);
        console.log(`AI Crawler Access:       ${res.scores.aiCrawlerAccess}%`);
        console.log(`Citation Readiness:      ${res.scores.citationReadiness}%`);
        console.log(`LLMs.txt Compliance:     ${res.scores.llmsTxtCompliance}%`);
        console.log(`Answer Block Density:    ${res.scores.answerBlockDensity}% (${res.answerBlocks.total} blocks found)`);
        console.log(`Entity Recognition:      ${res.scores.entityStrength}% (${res.entities.length} entities tracked)\n`);
        
        console.log(`${ANSI.bold}=== AI BOT PERMISSION MATRIX ===${ANSI.reset}`);
        res.crawlers.forEach(c => console.log(`  • ${c.bot.padEnd(38)}: ${c.status === 'ALLOWED' ? ANSI.green : ANSI.red}${c.status}${ANSI.reset}`));
        
        if (res.recommendations.length > 0) {
          console.log(`\n${ANSI.bold}=== STRATEGIC GEO RECOMMENDATIONS ===${ANSI.reset}`);
          res.recommendations.forEach((r, i) => console.log(`  ${i + 1}. ${ANSI.yellow}${r}${ANSI.reset}`));
        }
        console.log('');
      }
      break;

    case 'cwv':
    case 'speed':
      {
        const { auditCWV } = await import('../scripts/cwv-engine.js');
        const target = subArgs[0] || 'https://www.devacia.com';
        banner();
        console.log(`${ANSI.bold}Auditing Core Web Vitals & Speed for: ${ANSI.cyan}${target}${ANSI.reset}\n`);
        const res = await auditCWV(target);
        if (res.success) {
          console.log(`${ANSI.bold}=== PERFORMANCE & CWV REPORT (${res.source}) ===${ANSI.reset}`);
          console.log(`Performance Score:      ${res.scores?.performance >= 80 ? ANSI.green : ANSI.yellow}${res.scores?.performance}/100${ANSI.reset}`);
          console.log(`SEO Technical Score:    ${ANSI.green}${res.scores?.seo}/100${ANSI.reset}`);
          if (res.metrics) {
            console.log(`TTFB (Time to First Byte): ${res.metrics.ttfb}`);
            console.log(`Total Response Time:       ${res.metrics.totalFetchTime}`);
            console.log(`HTML Payload:              ${res.metrics.htmlSize} (${res.metrics.compression.toUpperCase()} compressed)`);
            console.log(`Asset Breakdown:           ${res.metrics.scriptCount} scripts, ${res.metrics.stylesheetCount} styles, ${res.metrics.imageCount} images`);
          }
          if (res.opportunities?.length > 0) {
            console.log(`\n${ANSI.bold}=== CWV OPTIMIZATION OPPORTUNITIES ===${ANSI.reset}`);
            res.opportunities.forEach((o, i) => console.log(`  ${i + 1}. ${ANSI.yellow}${typeof o === 'string' ? o : o.title}${ANSI.reset}`));
          }
        } else {
          console.error(`${ANSI.red}CWV Audit Error: ${res.error}${ANSI.reset}`);
        }
        console.log('');
      }
      break;

    case 'schema':
      {
        const { auditSchema } = await import('../scripts/schema-validator.js');
        const target = subArgs[0] || 'https://www.devacia.com';
        banner();
        console.log(`${ANSI.bold}Auditing Schema Graph & Rich Results for: ${ANSI.cyan}${target}${ANSI.reset}\n`);
        const res = await auditSchema(target);
        if (res.success) {
          console.log(`${ANSI.bold}=== STRUCTURED DATA REPORT ===${ANSI.reset}`);
          console.log(`Schema Health Score:    ${res.score >= 80 ? ANSI.green : ANSI.yellow}${res.score}/100${ANSI.reset}`);
          console.log(`Total Schemas Injected: ${res.totalSchemas}`);
          console.log(`Schema Types Found:     ${res.typesFound.join(', ') || 'None'}`);
          console.log(`OpenGraph Meta Tags:    ${Object.keys(res.openGraph).length} detected`);
          console.log(`Twitter Card Tags:      ${Object.keys(res.twitter).length} detected\n`);
          console.log(`${ANSI.bold}Validation Checks:${ANSI.reset}`);
          console.log(`  • Organization / Business: ${res.checks.hasOrganizationOrBusiness ? ANSI.green + '✓ PASS' : ANSI.red + '✗ FAIL'}${ANSI.reset}`);
          console.log(`  • WebSite Schema:          ${res.checks.hasWebSite ? ANSI.green + '✓ PASS' : ANSI.red + '✗ FAIL'}${ANSI.reset}`);
          console.log(`  • BreadcrumbList:          ${res.checks.hasBreadcrumbs ? ANSI.green + '✓ PASS' : ANSI.red + '✗ FAIL'}${ANSI.reset}`);
          console.log(`  • OpenGraph Social Cards:  ${res.checks.hasOpenGraph ? ANSI.green + '✓ PASS' : ANSI.red + '✗ FAIL'}${ANSI.reset}`);
        } else {
          console.error(`${ANSI.red}Schema Audit Error: ${res.error}${ANSI.reset}`);
        }
        console.log('');
      }
      break;

    case 'dr':
    case 'authority':
      {
        const { calculateDomainRating } = await import('../scripts/backlink-engine.js');
        const target = subArgs[0] || 'devacia.com';
        banner();
        console.log(`${ANSI.bold}Checking Domain Rating & Authority for: ${ANSI.cyan}${target}${ANSI.reset}\n`);
        const res = await calculateDomainRating(target);
        console.log(`${ANSI.bold}=== DOMAIN RATING & AUTHORITY METRICS ===${ANSI.reset}`);
        console.log(`Domain Rating (Ahrefs DR):     ${ANSI.green}${res.metrics.dr}/100${ANSI.reset}`);
        console.log(`Domain Authority (Moz DA):      ${res.metrics.da}/100`);
        console.log(`Authority Score (Semrush AS):   ${res.metrics.authorityScore}/100`);
        console.log(`Trust Flow:                     ${res.metrics.trustFlow}/100`);
        console.log(`Total Backlinks:                ${res.metrics.estimatedBacklinks}`);
        console.log(`Referring Domains:              ${res.metrics.referringDomains}`);
        console.log(`Dofollow Link Ratio:            ${res.metrics.dofollowRatio}`);
        console.log(`Anchor Penalty Risk:            ${res.metrics.penaltyRisk === 'LOW' ? ANSI.green : ANSI.red}${res.metrics.penaltyRisk}${ANSI.reset}\n`);

        if (res.knownBacklinks?.length) {
          console.log(`${ANSI.bold}=== TOP REFERRING BACKLINKS ===${ANSI.reset}`);
          res.knownBacklinks.forEach(bl => {
            console.log(`  • [DR ${bl.dr}] ${bl.source} (${bl.type}) -> "${bl.anchor}"`);
          });
          console.log('');
        }

        if (res.recommendations?.length) {
          console.log(`${ANSI.bold}=== AUTHORITY GROWTH RECOMMENDATIONS ===${ANSI.reset}`);
          res.recommendations.forEach((r, i) => console.log(`  ${i + 1}. ${ANSI.yellow}${r}${ANSI.reset}`));
          console.log('');
        }
      }
      break;

    case 'backlinks':
      {
        const { calculateDomainRating, analyzeAnchorProfile } = await import('../scripts/backlink-engine.js');
        const target = subArgs[0] || 'devacia.com';
        banner();
        console.log(`${ANSI.bold}Auditing Backlink Profile & Anchors for: ${ANSI.cyan}${target}${ANSI.reset}\n`);
        const drData = await calculateDomainRating(target);
        const anchors = (drData.knownBacklinks || []).map(b => b.anchor);
        const profile = analyzeAnchorProfile(anchors, target.split('.')[0]);
        console.log(`${ANSI.bold}=== ANCHOR TEXT PROFILE AUDIT ===${ANSI.reset}`);
        console.log(`Total Anchors Analyzed:  ${profile.totalAnchors}`);
        console.log(`Branded Anchors:         ${profile.breakdown.branded}`);
        console.log(`Exact Match Anchors:     ${profile.breakdown.exactMatch}`);
        console.log(`Partial Match Anchors:   ${profile.breakdown.partialMatch}`);
        console.log(`Naked URL Anchors:       ${profile.breakdown.nakedUrl}`);
        console.log(`Generic Anchors:         ${profile.breakdown.generic}`);
        console.log(`\nGoogle Penalty Risk:     ${profile.penaltyRisk.includes('LOW') ? ANSI.green : ANSI.red}${profile.penaltyRisk}${ANSI.reset}`);
        console.log(`Guidance:                ${profile.advice}\n`);
      }
      break;

    case 'backlink-builder':
    case 'links':
      {
        const { findCompetitorLinkGaps, generateOutreachPitch } = await import('../scripts/backlink-builder.js');
        const target = subArgs[0] || 'devacia.com';
        banner();
        console.log(`${ANSI.bold}Executing Backlink Opportunity & Gap Engine for: ${ANSI.cyan}${target}${ANSI.reset}\n`);
        const gaps = findCompetitorLinkGaps(target);
        console.log(`${ANSI.bold}=== HIGH-AUTHORITY LINK GAP TARGETS ===${ANSI.reset}`);
        gaps.opportunities.forEach((o, i) => {
          console.log(`  ${i + 1}. [DR ${o.dr}] ${ANSI.cyan}${o.sourceDomain}${ANSI.reset} (${o.opportunityType})`);
          console.log(`     Action: ${o.action}`);
          console.log(`     Impact: ${ANSI.green}${o.estimatedImpact}${ANSI.reset}\n`);
        });

        console.log(`${ANSI.bold}=== TIER-1 DIRECTORY CITATIONS (DR 80+) ===${ANSI.reset}`);
        gaps.tier1Directories.forEach(d => {
          console.log(`  • [DR ${d.dr}] ${ANSI.bold}${d.name}${ANSI.reset} (${d.category}) -> ${d.submissionUrl}`);
        });

        console.log(`\n${ANSI.bold}=== SAMPLE OUTREACH PITCH ===${ANSI.reset}`);
        const pitch = generateOutreachPitch('guest-post', { brandName: target.includes('devacia') ? 'Devacia' : 'Yoglivya' });
        console.log(`Subject: ${ANSI.cyan}${pitch.subject}${ANSI.reset}\n`);
        console.log(pitch.body);
        console.log('');
      }
      break;

    case 'test-agent':
    case 'agent':
      {
        const { runAutonomousSeoAgent } = await import('../scripts/autonomous-seo-agent.js');
        const target = subArgs[0] || 'https://www.devacia.com';
        await runAutonomousSeoAgent(target);
      }
      break;

    case 'local':
      await runProcess('node', [path.join(SCRIPTS_DIR, 'local-geo-intelligence.js'), ...subArgs]);
      break;

    case 'architect':
    case 'titles':
      await runProcess('node', [path.join(SCRIPTS_DIR, 'serp-architect.js')]);
      break;

    case 'title-gen':
      await runProcess('node', [path.join(SCRIPTS_DIR, 'serp-architect.js'), 'generate', ...subArgs]);
      break;

    case 'queries':
      await runProcess('node', [path.join(SCRIPTS_DIR, 'serp-architect.js'), 'queries', ...subArgs]);
      break;

    case 'density':
    case 'kd':
      await runProcess('node', [path.join(ROOT_DIR, 'src', 'seo', 'keyword-density-checker.js'), ...subArgs]);
      break;

    case 'gui':
    case 'ui':
    case 'web':
      await runProcess('node', [path.join(SCRIPTS_DIR, 'gui-server.js'), ...subArgs]);
      break;

    case 'mcp':
      // Launch Master Devacia SEO AGI MCP Server (All tools exposed)
      await runProcess('node', [path.join(SCRIPTS_DIR, 'mcp-server.js')]);
      break;

    case 'setup':
    case 'wizard':
      await runProcess('node', [path.join(SCRIPTS_DIR, 'setup-wizard.js')]);
      break;

    case 'help':
    case '--help':
    case '-h':
    default:
      help();
      break;
  }
}

main().catch((err) => {
  console.error(`\n${ANSI.red}[Error] ${err.message}${ANSI.reset}`);
  process.exit(1);
});

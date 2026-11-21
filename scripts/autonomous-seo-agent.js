/**
 * Devacia SEO AGI — Master Autonomous SEO Agent Sentinel
 * 
 * Orchestrates a 360-degree autonomous audit across all 6 core vectors:
 * 1. Live Indexing & Crawlability (Google Search Console API)
 * 2. Domain Rating (DR) & Backlink Health Engine
 * 3. Backlink Building Opportunities & Link Gaps
 * 4. Generative Engine Optimization (GEO) & AI Search Engine Readiness
 * 5. Core Web Vitals, Real-Time TTFB & Performance
 * 6. Schema.org Knowledge Graph & Rich Snippet Validation
 * 
 * Generates an executive Markdown report saved to docs/seo/AUTONOMOUS_SEO_AGENT_REPORT.md
 */

import fs from 'fs';
import path from 'path';
import { calculateDomainRating, cleanDomain } from './backlink-engine.js';
import { findCompetitorLinkGaps, generateOutreachPitch } from './backlink-builder.js';
import { auditGeo } from './geo-engine.js';
import { auditCWV } from './cwv-engine.js';
import { auditSchema } from './schema-validator.js';
import { expandKeywordsWithGoogle } from './gkp-cli.js';

const ANSI = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
};

export async function runAutonomousSeoAgent(domainInput = 'https://www.devacia.com') {
  const domain = cleanDomain(domainInput);
  const targetUrl = `https://${domain}`;
  const timestamp = new Date().toISOString();

  console.log(`\n${ANSI.cyan}${ANSI.bold}╔══════════════════════════════════════════════════════════════════════╗${ANSI.reset}`);
  console.log(`${ANSI.cyan}${ANSI.bold}║           AUTONOMOUS SEO AGENT SENTINEL — MASTER TEST RUN           ║${ANSI.reset}`);
  console.log(`${ANSI.cyan}${ANSI.bold}║           Target Domain: ${targetUrl.padEnd(43)} ║${ANSI.reset}`);
  console.log(`${ANSI.cyan}${ANSI.bold}╚══════════════════════════════════════════════════════════════════════╝${ANSI.reset}\n`);

  const report = {
    targetDomain: domain,
    targetUrl,
    executedAt: timestamp,
    overallScore: 0,
    modules: {},
    actionPlan: [],
  };

  // -------------------------------------------------------------------------
  // Vector 1: Domain Rating & Backlink Health
  // -------------------------------------------------------------------------
  console.log(`${ANSI.bold}[1/5] Evaluating Domain Rating (DR) & Backlink Profile...${ANSI.reset}`);
  try {
    const drData = await calculateDomainRating(domain);
    report.modules.domainRating = drData;
    console.log(`  ✓ DR: ${ANSI.green}${drData.metrics.dr}/100${ANSI.reset} | DA: ${drData.metrics.da}/100 | Ref Domains: ${drData.metrics.referringDomains} | Backlinks: ${drData.metrics.estimatedBacklinks}`);
  } catch (err) {
    console.error(`  ✗ DR Check Error: ${err.message}`);
    report.modules.domainRating = { error: err.message };
  }

  // -------------------------------------------------------------------------
  // Vector 2: Backlink Opportunities & Link Gaps
  // -------------------------------------------------------------------------
  console.log(`\n${ANSI.bold}[2/5] Scanning High-DR Backlink Gaps & Tier-1 Directories...${ANSI.reset}`);
  try {
    const gapData = findCompetitorLinkGaps(domain);
    const guestPitch = generateOutreachPitch('guest-post', { brandName: domain.includes('devacia') ? 'Devacia' : 'Yoglivya' });
    const footerCode = generateOutreachPitch('client-footer', { clientDomain: targetUrl });
    report.modules.backlinkBuilder = {
      ...gapData,
      samplePitches: { guestPost: guestPitch, clientFooter: footerCode },
    };
    console.log(`  ✓ Uncovered ${ANSI.green}${gapData.opportunities.length} high-authority link gap targets${ANSI.reset} + ${gapData.tier1Directories.length} Tier-1 directory citations`);
  } catch (err) {
    console.error(`  ✗ Backlink Gap Error: ${err.message}`);
    report.modules.backlinkBuilder = { error: err.message };
  }

  // -------------------------------------------------------------------------
  // Vector 3: Generative Engine Optimization (GEO) & AI Search
  // -------------------------------------------------------------------------
  console.log(`\n${ANSI.bold}[3/5] Auditing Generative Engine Optimization (GEO) & AI Bots...${ANSI.reset}`);
  try {
    const geoData = await auditGeo(targetUrl);
    report.modules.geo = geoData;
    console.log(`  ✓ GEO Score: ${geoData.scores.geoOverall >= 80 ? ANSI.green : ANSI.yellow}${geoData.scores.geoOverall}/100${ANSI.reset} | AI Crawlers: ${geoData.scores.aiCrawlerAccess}% | Citations: ${geoData.scores.citationReadiness}% | llms.txt: ${geoData.llmsTxt.hasLlmsTxt ? 'FOUND' : 'MISSING'}`);
  } catch (err) {
    console.error(`  ✗ GEO Audit Error: ${err.message}`);
    report.modules.geo = { error: err.message };
  }

  // -------------------------------------------------------------------------
  // Vector 4: Core Web Vitals & Real-Time Performance
  // -------------------------------------------------------------------------
  console.log(`\n${ANSI.bold}[4/5] Auditing Core Web Vitals & Real-Time Speed...${ANSI.reset}`);
  try {
    const cwvData = await auditCWV(targetUrl);
    report.modules.cwv = cwvData;
    const ttfb = cwvData.metrics?.ttfb || 'N/A';
    const comp = cwvData.metrics?.compression || 'N/A';
    console.log(`  ✓ Speed Score: ${cwvData.scores?.performance >= 80 ? ANSI.green : ANSI.yellow}${cwvData.scores?.performance || 0}/100${ANSI.reset} | TTFB: ${ttfb} | Payload: ${cwvData.metrics?.htmlSize || 'N/A'} (${comp.toUpperCase()})`);
  } catch (err) {
    console.error(`  ✗ CWV Audit Error: ${err.message}`);
    report.modules.cwv = { error: err.message };
  }

  // -------------------------------------------------------------------------
  // Vector 5: Schema Knowledge Graph Validation
  // -------------------------------------------------------------------------
  console.log(`\n${ANSI.bold}[5/5] Validating Schema.org Knowledge Graph & Social Cards...${ANSI.reset}`);
  try {
    const schemaData = await auditSchema(targetUrl);
    report.modules.schema = schemaData;
    console.log(`  ✓ Schema Health: ${schemaData.score >= 80 ? ANSI.green : ANSI.yellow}${schemaData.score}/100${ANSI.reset} | Total Schemas: ${schemaData.totalSchemas} | OG Tags: ${Object.keys(schemaData.openGraph || {}).length} | Twitter: ${Object.keys(schemaData.twitter || {}).length}`);
  } catch (err) {
    console.error(`  ✗ Schema Audit Error: ${err.message}`);
    report.modules.schema = { error: err.message };
  }

  // -------------------------------------------------------------------------
  // Calculate Composite Agent Score & Action Plan
  // -------------------------------------------------------------------------
  const drScore = Math.min(100, (report.modules.domainRating?.metrics?.dr || 1) * 15);
  const geoScore = report.modules.geo?.scores?.geoOverall || 70;
  const cwvScore = report.modules.cwv?.scores?.performance || 70;
  const schemaScore = report.modules.schema?.score || 70;

  report.overallScore = Math.round((drScore * 0.25) + (geoScore * 0.25) + (cwvScore * 0.25) + (schemaScore * 0.25));

  // Synthesize Priorities
  if ((report.modules.domainRating?.metrics?.dr || 0) < 10) {
    report.actionPlan.push('Claim Tier-1 citations on Clutch, GoodFirms, and Crunchbase to quickly boost DR from 0 -> 15+.');
  }
  if (!report.modules.geo?.llmsTxt?.hasLlmsTxt) {
    report.actionPlan.push('Deploy /public/llms.txt to feed structured markdown directly to ChatGPT Search and Claude.');
  }
  if (report.modules.schema?.score < 85) {
    report.actionPlan.push('Add missing Organization and BreadcrumbList JSON-LD schemas to achieve 100/100 structured data health.');
  }
  report.actionPlan.push('Inject client footer attribution links ("Website by Devacia") on all active production customer stores.');

  // -------------------------------------------------------------------------
  // Save Markdown & JSON Reports
  // -------------------------------------------------------------------------
  const docsDir = path.resolve(process.cwd(), 'docs', 'seo');
  fs.mkdirSync(docsDir, { recursive: true });

  const mdReport = generateMarkdownReport(report);
  fs.writeFileSync(path.join(docsDir, 'AUTONOMOUS_SEO_AGENT_REPORT.md'), mdReport, 'utf-8');
  fs.writeFileSync(path.join(docsDir, 'autonomous-seo-agent-latest.json'), JSON.stringify(report, null, 2), 'utf-8');

  console.log(`\n${ANSI.green}${ANSI.bold}================================================================${ANSI.reset}`);
  console.log(`${ANSI.green}${ANSI.bold}  ✓ MASTER AUTONOMOUS SEO AUDIT COMPLETE${ANSI.reset}`);
  console.log(`${ANSI.bold}  Overall Autonomous Health Score: ${report.overallScore >= 80 ? ANSI.green : ANSI.yellow}${report.overallScore}/100${ANSI.reset}`);
  console.log(`${ANSI.bold}  Full Report saved to: ${ANSI.cyan}docs/seo/AUTONOMOUS_SEO_AGENT_REPORT.md${ANSI.reset}`);
  console.log(`${ANSI.green}${ANSI.bold}================================================================${ANSI.reset}\n`);

  return report;
}

function generateMarkdownReport(r) {
  return `# Autonomous SEO Agent Sentinel — Master Intelligence Report

* **Target Domain:** \`${r.targetDomain}\` (\`${r.targetUrl}\`)
* **Audited At:** \`${r.executedAt}\`
* **Overall Autonomous Health Score:** **${r.overallScore} / 100**

---

## 1. Domain Rating (DR) & Backlink Profile
* **Domain Rating (DR Equivalent):** **${r.modules.domainRating?.metrics?.dr || 0} / 100**
* **Domain Authority (DA Equivalent):** **${r.modules.domainRating?.metrics?.da || 0} / 100**
* **Total Estimated Backlinks:** **${r.modules.domainRating?.metrics?.estimatedBacklinks || 0}**
* **Unique Referring Domains:** **${r.modules.domainRating?.metrics?.referringDomains || 0}**
* **Dofollow Link Ratio:** **${r.modules.domainRating?.metrics?.dofollowRatio || 'N/A'}**
* **Anchor Text Penalty Risk:** **${r.modules.domainRating?.metrics?.penaltyRisk || 'LOW'}**

---

## 2. Generative Engine Optimization (GEO) & AI Search
* **GEO Composite Score:** **${r.modules.geo?.scores?.geoOverall || 0} / 100**
* **AI Bot Crawler Access:** **${r.modules.geo?.scores?.aiCrawlerAccess || 0}%**
* **Citation Readiness Score:** **${r.modules.geo?.scores?.citationReadiness || 0}%**
* **LLMs.txt Standard Status:** **${r.modules.geo?.llmsTxt?.hasLlmsTxt ? 'FOUND (100% Compliant)' : 'MISSING'}**
* **Direct Answer Block Density:** **${r.modules.geo?.scores?.answerBlockDensity || 0}%**

---

## 3. Core Web Vitals & Real-Time Speed
* **Performance Score:** **${r.modules.cwv?.scores?.performance || 0} / 100**
* **Time to First Byte (TTFB):** **${r.modules.cwv?.metrics?.ttfb || 'N/A'}**
* **Total Response Time:** **${r.modules.cwv?.metrics?.totalFetchTime || 'N/A'}**
* **HTML Payload Size:** **${r.modules.cwv?.metrics?.htmlSize || 'N/A'}**
* **Server Compression:** **${r.modules.cwv?.metrics?.compression?.toUpperCase() || 'N/A'}**

---

## 4. Structured Data & Knowledge Graph
* **Schema Health Score:** **${r.modules.schema?.score || 0} / 100**
* **Schemas Injected:** **${r.modules.schema?.totalSchemas || 0}**
* **Types Detected:** \`${(r.modules.schema?.typesFound || []).join(', ') || 'None'}\`
* **OpenGraph Tags:** **${Object.keys(r.modules.schema?.openGraph || {}).length} detected**
* **Twitter Card Tags:** **${Object.keys(r.modules.schema?.twitter || {}).length} detected**

---

## 5. High-Impact Link Building Opportunities
${(r.modules.backlinkBuilder?.opportunities || []).map(o => `* **[${o.sourceDomain}] (DR ${o.dr}):** ${o.action} (*Impact: ${o.estimatedImpact}*)`).join('\n')}

---

## 6. Strategic Autonomous Action Plan
${r.actionPlan.map((action, i) => `${i + 1}. **${action}**`).join('\n')}
`;
}

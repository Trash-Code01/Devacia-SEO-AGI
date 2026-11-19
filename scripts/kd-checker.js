#!/usr/bin/env node

/**
 * Devacia SEO AGI: Keyword Density & SERP Safety CLI
 * 
 * Usage:
 *   node scripts/kd-checker.js "Best Web Development Services for Businesses | Devacia" --target="web development services"
 *   node scripts/kd-checker.js --audit-service-1
 */

import { checkKeywordDensity, rankTitlesByKD } from '../src/seo/keyword-density-checker.js';

const args = process.argv.slice(2);

let title = '';
let target = 'web development services';
let auditService1 = false;

for (const arg of args) {
  if (arg.startsWith('--target=')) {
    target = arg.split('=')[1].replace(/["']/g, '');
  } else if (arg === '--audit-service-1') {
    auditService1 = true;
  } else if (!arg.startsWith('--')) {
    title = arg.replace(/^["']|["']$/g, '');
  }
}

if (auditService1 || (!title && args.length === 0)) {
  console.log('='.repeat(75));
  console.log('  DEVACIA SEO AGI: SERVICE #1 META TITLE KEYWORD DENSITY AUDIT');
  console.log('  Target Keyphrase: "web development services" (Pool: 100k-1M, Low Comp)');
  console.log('='.repeat(75) + '\n');

  const candidates = [
    'Best Web Development Services for Businesses | Devacia',
    'Hire Web Development Services for Businesses | Devacia',
    'Custom Web Development Services for Businesses | Devacia',
    'Top Web Development Services for Businesses | Devacia',
    'Web Development Services for Businesses | Devacia',
    'Best Web Development Services for Startups | Devacia',
    'Hire Web Development Services for Startups | Devacia',
    'Web Development Services & Growth Systems | Devacia',
    'Custom Website Development Services | Devacia' // current legacy
  ];

  const results = rankTitlesByKD(candidates, target, {
    volume: '100,000 - 1,000,000 /mo',
    competition: 'Low (Index: 12/100)'
  });

  results.forEach((r, idx) => {
    const s = r.serpMetrics;
    const t = r.targetAnalysis;
    console.log(`[#${idx + 1}] Quality Score: ${r.qualityScore}/100`);
    console.log(`    Title: "${r.title}"`);
    console.log(`    SERP Safety: Length: ${s.charLength}/58 ch | Pixels: ${s.pixelWidth}/580 px | Compliant: ${s.isSerpCompliant ? '✓ YES' : '✗ NO'}`);
    console.log(`    Keyword Density (KD): ${t.densityPercent}% (${t.occurrences} matches / ${r.nlpMetrics.totalWords} words) -> [${t.health}]`);
    console.log(`    Keyword Prominence: ${t.prominencePercent}% (Starts at character index ${t.firstCharacterIndex})`);
    console.log(`    Stopword Ratio: ${r.nlpMetrics.stopwordRatioPercent}% | Non-Stopwords: ${r.nlpMetrics.nonStopwordCount}`);
    console.log(`    Top Trigrams: ${r.nlpMetrics.topTrigrams.map(tg => `"${tg[0]}" (${tg[1]}x)`).join(', ')}`);
    console.log('-'.repeat(75));
  });

  process.exit(0);
}

if (!title) {
  console.error('Please provide a meta title to audit, or pass --audit-service-1');
  console.error('Example: node scripts/kd-checker.js "Best Web Development Services for Businesses | Devacia" --target="web development services"');
  process.exit(1);
}

const result = checkKeywordDensity(title, target, {
  volume: '100k - 1M',
  competition: 'Low'
});

console.log('\n' + '='.repeat(70));
console.log('  DEVACIA SEO AGI: KEYWORD DENSITY & SERP AUDIT RESULT');
console.log('='.repeat(70));
console.log(`Title: "${result.title}"`);
console.log(`Quality Score: ${result.qualityScore} / 100\n`);

console.log('1. SERP METRICS:');
console.log(`   - Character Length: ${result.serpMetrics.charLength} / 58 (${result.serpMetrics.isCharSafe ? '✓ Safe' : '✗ Truncates'})`);
console.log(`   - Pixel Width:      ${result.serpMetrics.pixelWidth} / 580 px (${result.serpMetrics.isPixelSafe ? '✓ Safe' : '✗ Truncates'})`);
console.log(`   - Zero-Truncation:  ${result.serpMetrics.isSerpCompliant ? '✓ Guaranteed' : '✗ Fails Google limits'}\n`);

if (result.targetAnalysis) {
  console.log('2. KEYWORD DENSITY & NLP METRICS:');
  console.log(`   - Target Keyphrase:     "${result.targetAnalysis.targetKeyword}"`);
  console.log(`   - Occurrences:          ${result.targetAnalysis.occurrences}`);
  console.log(`   - Exact KD%:            ${result.targetAnalysis.densityPercent}%`);
  console.log(`   - KD Status:            [${result.targetAnalysis.health}] - ${result.targetAnalysis.healthExplanation}`);
  console.log(`   - Keyword Prominence:   ${result.targetAnalysis.prominencePercent}% (Starts at char ${result.targetAnalysis.firstCharacterIndex})`);
  console.log(`   - Total Word Count:     ${result.nlpMetrics.totalWords}`);
  console.log(`   - Stopword Ratio:       ${result.nlpMetrics.stopwordRatioPercent}%\n`);
}

console.log('3. BRAND SILO AUDIT:');
console.log(`   - Brand Token Present:  ${result.brandSilo.hasBrand ? '✓ Yes' : '✗ Missing'}`);
console.log(`   - Delimiter & Suffix:   ${result.brandSilo.isBrandSiloCompliant ? '✓ Perfect (| Devacia / - Devacia)' : '✗ Non-standard'}`);
console.log('='.repeat(70) + '\n');

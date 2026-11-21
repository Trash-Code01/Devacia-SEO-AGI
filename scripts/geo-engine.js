import fs from 'fs';
import path from 'path';

/**
 * Devacia SEO AGI — GEO & AI Search Intelligence Engine
 * 
 * Evaluates website performance for Generative Engine Optimization (GEO):
 * 1. AI Crawler Accessibility (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.)
 * 2. llms.txt standard compliance (/llms.txt and /llms-full.txt)
 * 3. Answer Block & Citation Readiness (Quote density, definition blocks, tabular density)
 * 4. Named Entity Recognition & Knowledge Graph anchor strength
 * 5. Synthetic GEO Score (0 - 100)
 */

const AI_BOTS = [
  { name: 'GPTBot (OpenAI / ChatGPT)', ua: 'GPTBot' },
  { name: 'ChatGPT-User (Browsing Mode)', ua: 'ChatGPT-User' },
  { name: 'ClaudeBot (Anthropic Claude)', ua: 'ClaudeBot' },
  { name: 'PerplexityBot (Perplexity AI)', ua: 'PerplexityBot' },
  { name: 'Google-Extended (Gemini / Vertex)', ua: 'Google-Extended' },
  { name: 'Applebot-Extended (Apple Intelligence)', ua: 'Applebot-Extended' },
  { name: 'Bytespider (ByteDance AI)', ua: 'Bytespider' },
  { name: 'CCBot (Common Crawl / LLM Training)', ua: 'CCBot' },
  { name: 'Cohere-AI (Cohere Models)', ua: 'cohere-ai' },
  { name: 'Meta-ExternalAgent (Meta Llama)', ua: 'Meta-ExternalAgent' },
];

export async function auditGeo(targetUrl = 'https://www.devacia.com') {
  const parsed = new URL(targetUrl);
  const origin = parsed.origin;

  const results = {
    url: targetUrl,
    origin,
    checkedAt: new Date().toISOString(),
    scores: {
      geoOverall: 0,
      aiCrawlerAccess: 0,
      citationReadiness: 0,
      llmsTxtCompliance: 0,
      answerBlockDensity: 0,
      entityStrength: 0,
    },
    crawlers: [],
    llmsTxt: {
      hasLlmsTxt: false,
      hasLlmsFullTxt: false,
      charCount: 0,
      details: '',
    },
    answerBlocks: {
      total: 0,
      examples: [],
    },
    tablesAndLists: {
      tables: 0,
      unorderedLists: 0,
      orderedLists: 0,
    },
    entities: [],
    recommendations: [],
  };

  // 1. Fetch Robots.txt and check AI crawler rules
  try {
    const robotsRes = await fetch(`${origin}/robots.txt`, { signal: AbortSignal.timeout(10000) });
    if (robotsRes.ok) {
      const robotsTxt = await robotsRes.text();
      let allowedCount = 0;

      for (const bot of AI_BOTS) {
        const regex = new RegExp(`User-agent:\\s*${bot.ua}\\s*\\nDisallow:\\s*/$`, 'im');
        const isDisallowed = regex.test(robotsTxt);
        const status = isDisallowed ? 'BLOCKED' : 'ALLOWED';
        if (!isDisallowed) allowedCount++;

        results.crawlers.push({
          bot: bot.name,
          ua: bot.ua,
          status,
        });
      }

      results.scores.aiCrawlerAccess = Math.round((allowedCount / AI_BOTS.length) * 100);
    } else {
      results.scores.aiCrawlerAccess = 100;
      AI_BOTS.forEach(b => results.crawlers.push({ bot: b.name, ua: b.ua, status: 'ALLOWED (No robots.txt restriction)' }));
    }
  } catch (err) {
    results.scores.aiCrawlerAccess = 80;
    results.recommendations.push(`Robots.txt check warning: ${err.message}`);
  }

  // 2. Check /llms.txt standard compliance
  try {
    const llmsRes = await fetch(`${origin}/llms.txt`, { signal: AbortSignal.timeout(8000) });
    if (llmsRes.ok) {
      const llmsContent = await llmsRes.text();
      results.llmsTxt.hasLlmsTxt = true;
      results.llmsTxt.charCount = llmsContent.length;
      results.llmsTxt.details = 'Found valid /llms.txt file';
      results.scores.llmsTxtCompliance = 85;

      // Check /llms-full.txt
      const fullRes = await fetch(`${origin}/llms-full.txt`, { signal: AbortSignal.timeout(8000) });
      if (fullRes.ok) {
        results.llmsTxt.hasLlmsFullTxt = true;
        results.scores.llmsTxtCompliance = 100;
      }
    } else {
      results.llmsTxt.details = 'Missing /llms.txt. Highly recommended for AI answer engines (ChatGPT, Claude, Perplexity).';
      results.scores.llmsTxtCompliance = 0;
      results.recommendations.push('Create /public/llms.txt to provide clean markdown summaries directly to LLM crawlers.');
    }
  } catch (e) {
    results.scores.llmsTxtCompliance = 0;
  }

  // 3. Fetch Page Content & Scan for GEO Answer Blocks
  try {
    const pageRes = await fetch(targetUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Devacia-GEO-Agent/1.0)' },
      signal: AbortSignal.timeout(15000),
    });

    if (pageRes.ok) {
      const html = await pageRes.text();

      // Check Tables and Structured Lists (RAG models love structured Markdown/HTML)
      const tables = (html.match(/<table\b[^>]*>/gi) || []).length;
      const uls = (html.match(/<ul\b[^>]*>/gi) || []).length;
      const ols = (html.match(/<ol\b[^>]*>/gi) || []).length;
      results.tablesAndLists = { tables, unorderedLists: uls, orderedLists: ols };

      // Answer block patterns (e.g. <h2>What is X?</h2> followed by concise <p>)
      const answerRegex = /<(?:h2|h3)[^>]*>(.*?)<\/(?:h2|h3)>\s*<p[^>]*>(.*?)<\/p>/gis;
      let match;
      let answersFound = 0;

      while ((match = answerRegex.exec(html)) !== null && answersFound < 10) {
        const question = match[1].replace(/<[^>]+>/g, '').trim();
        const answer = match[2].replace(/<[^>]+>/g, '').trim();
        const wordCount = answer.split(/\s+/).length;

        // Ideal GEO answer block is 35 - 75 words
        if (wordCount >= 20 && wordCount <= 90) {
          answersFound++;
          results.answerBlocks.examples.push({
            heading: question,
            answer: answer.length > 180 ? answer.slice(0, 180) + '...' : answer,
            wordCount,
            geoQuality: wordCount >= 35 && wordCount <= 65 ? 'OPTIMAL' : 'GOOD',
          });
        }
      }

      results.answerBlocks.total = answersFound;
      results.scores.answerBlockDensity = Math.min(100, answersFound * 25);

      // Check Citation Readiness (Claims, stats, percentages, year stamps)
      const statsMatches = html.match(/(?:\d+(?:\.\d+)?%|\$\d+(?:,\d+)*(?:\.\d+)?|₹\d+(?:,\d+)*|\b\d{4}\b|\b\d+x\b)/g) || [];
      const statCount = statsMatches.length;
      results.scores.citationReadiness = Math.min(100, Math.round(statCount * 3.5));

      // Entity Recognition checks
      const entityKeywords = ['Devacia', 'Next.js', 'React', 'Shopify', 'WordPress', 'SEO', 'Delhi', 'Prayagraj', 'Bangalore', 'Mumbai', 'B2B', 'D2C'];
      const detectedEntities = [];
      for (const ent of entityKeywords) {
        const entRegex = new RegExp(`\\b${ent}\\b`, 'gi');
        const count = (html.match(entRegex) || []).length;
        if (count > 0) {
          detectedEntities.push({ entity: ent, occurrences: count });
        }
      }
      results.entities = detectedEntities;
      results.scores.entityStrength = Math.min(100, detectedEntities.length * 9);

      if (answersFound < 2) {
        results.recommendations.push('Add 2-3 concise Answer Blocks (40-60 words directly beneath H2 headers) for Perplexity and Google AI Overviews.');
      }
      if (tables === 0) {
        results.recommendations.push('Add structured HTML comparison tables (e.g., pricing, feature matrices) to improve LLM tabular ingestion.');
      }
    }
  } catch (err) {
    results.recommendations.push(`Page content fetch error: ${err.message}`);
  }

  // Calculate composite GEO score
  const weights = {
    aiCrawlerAccess: 0.25,
    citationReadiness: 0.20,
    llmsTxtCompliance: 0.20,
    answerBlockDensity: 0.20,
    entityStrength: 0.15,
  };

  results.scores.geoOverall = Math.round(
    results.scores.aiCrawlerAccess * weights.aiCrawlerAccess +
    results.scores.citationReadiness * weights.citationReadiness +
    results.scores.llmsTxtCompliance * weights.llmsTxtCompliance +
    results.scores.answerBlockDensity * weights.answerBlockDensity +
    results.scores.entityStrength * weights.entityStrength
  );

  return results;
}

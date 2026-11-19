/**
 * Devacia SEO AGI: Enterprise Keyword Density & NLP Prominence Engine
 * 
 * Deterministic, zero-guesswork keyword density (KD), n-gram frequency, 
 * prominence weighting, and Google SERP pixel simulation.
 */

import fs from 'fs';
import natural from 'natural';
import * as stopword from 'stopword';

// Arial 20px Pixel Width Lookup Table for Google SERP
const CHAR_WIDTHS = {
  ' ': 5.5, '!': 5.5, '"': 7.1, '#': 11.1, '$': 11.1, '%': 17.8, '&': 13.3, '\'': 3.9,
  '(': 6.7, ')': 6.7, '*': 7.8, '+': 11.7, ',': 5.5, '-': 6.7, '.': 5.5, '/': 5.5,
  '0': 11.1, '1': 11.1, '2': 11.1, '3': 11.1, '4': 11.1, '5': 11.1, '6': 11.1, '7': 11.1, '8': 11.1, '9': 11.1,
  ':': 5.5, ';': 5.5, '<': 11.7, '=': 11.7, '>': 11.7, '?': 11.1, '@': 20.3,
  'A': 13.3, 'B': 13.3, 'C': 14.4, 'D': 14.4, 'E': 13.3, 'F': 12.2, 'G': 15.5, 'H': 14.4, 'I': 5.5,
  'J': 10.0, 'K': 13.3, 'L': 11.1, 'M': 17.8, 'N': 14.4, 'O': 15.5, 'P': 13.3, 'Q': 15.5, 'R': 14.4,
  'S': 13.3, 'T': 12.2, 'U': 14.4, 'V': 13.3, 'W': 18.9, 'X': 13.3, 'Y': 13.3, 'Z': 12.2,
  'a': 11.1, 'b': 11.1, 'c': 10.0, 'd': 11.1, 'e': 11.1, 'f': 5.5, 'g': 11.1, 'h': 11.1, 'i': 4.4,
  'j': 4.4, 'k': 10.0, 'l': 4.4, 'm': 16.7, 'n': 11.1, 'o': 11.1, 'p': 11.1, 'q': 11.1, 'r': 6.7,
  's': 10.0, 't': 5.5, 'u': 11.1, 'v': 10.0, 'w': 14.4, 'x': 10.0, 'y': 10.0, 'z': 10.0,
  '|': 5.1
};

export function calculatePixelWidth(text) {
  let w = 0;
  for (const c of text) {
    w += CHAR_WIDTHS[c] || 10.0;
  }
  return Math.round(w);
}

/**
 * Tokenize string into clean words
 */
export function tokenizeWords(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Extract N-grams from tokens
 */
export function extractNGrams(tokens, n) {
  if (tokens.length < n) return [];
  const ngrams = [];
  for (let i = 0; i <= tokens.length - n; i++) {
    ngrams.push(tokens.slice(i, i + n).join(' '));
  }
  return ngrams;
}

/**
 * Deterministic Keyword Density & SERP Analyzer for a Meta Title or Snippet
 * 
 * @param {string} title - The meta title to audit
 * @param {string} targetKeyword - Primary target keyphrase (e.g. "web development services")
 * @param {Object} gkpData - Optional Google Keyword Planner telemetry (volume, competition)
 */
export function checkKeywordDensity(title, targetKeyword = '', gkpData = {}) {
  const charLength = title.length;
  const pixelWidth = calculatePixelWidth(title);

  // SERP Safety Checks
  const isCharSafe = charLength <= 58;
  const isPixelSafe = pixelWidth <= 580;
  const isSerpCompliant = isCharSafe && isPixelSafe;

  // Word tokenization
  const tokens = tokenizeWords(title);
  const totalWords = tokens.length;

  // Stopword filtration
  const nonStopwords = stopword.removeStopwords(tokens);
  const stopwordRatio = totalWords > 0 
    ? Number(((totalWords - nonStopwords.length) / totalWords * 100).toFixed(1))
    : 0;

  // N-gram frequency distribution
  const unigrams = {};
  const bigrams = {};
  const trigrams = {};

  tokens.forEach(w => { unigrams[w] = (unigrams[w] || 0) + 1; });
  extractNGrams(tokens, 2).forEach(bg => { bigrams[bg] = (bigrams[bg] || 0) + 1; });
  extractNGrams(tokens, 3).forEach(tg => { trigrams[tg] = (trigrams[tg] || 0) + 1; });

  // Target Keyword Specific Density
  let targetAnalysis = null;
  if (targetKeyword) {
    const cleanTarget = targetKeyword.toLowerCase().trim();
    const targetWords = tokenizeWords(cleanTarget);
    const targetWordCount = targetWords.length;

    // Check exact occurrences in raw title (case-insensitive)
    const escapedTarget = cleanTarget.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedTarget}\\b`, 'gi');
    const matches = (title.match(regex) || []).length;

    // Standard SEO Keyword Density Formula:
    // KD% = (Matches * WordsInKeyword / TotalWords) * 100
    const keywordDensityPct = totalWords > 0 
      ? Number(((matches * targetWordCount / totalWords) * 100).toFixed(1))
      : 0;

    // Keyword Prominence (how close to the front the keyword starts)
    const firstIndex = title.toLowerCase().indexOf(cleanTarget);
    let prominencePct = 0;
    if (firstIndex !== -1 && charLength > 0) {
      prominencePct = Number((((charLength - firstIndex) / charLength) * 100).toFixed(1));
    }

    // Health Rating
    let health = 'OPTIMAL';
    let healthExplanation = 'Keyword density is in the ideal ranking range (25% - 50%).';
    if (matches === 0) {
      health = 'MISSING';
      healthExplanation = 'Target keyword is not found in title.';
    } else if (keywordDensityPct < 20) {
      health = 'LOW_DENSITY';
      healthExplanation = 'Target keyword is diluted by excess extraneous terms.';
    } else if (matches > 1) {
      health = 'STUFFED';
      healthExplanation = 'Keyword appears multiple times (repetition risk).';
    } else if (keywordDensityPct > 85) {
      health = 'OVER_CONCENTRATED';
      healthExplanation = 'Excessive keyword density leaving no room for brand or modifiers.';
    }

    targetAnalysis = {
      targetKeyword: cleanTarget,
      targetWordCount,
      occurrences: matches,
      densityPercent: keywordDensityPct,
      prominencePercent: prominencePct,
      firstCharacterIndex: firstIndex,
      health,
      healthExplanation,
      gkpContext: {
        volumeRange: gkpData.volume || '100k - 1M',
        competition: gkpData.competition || 'Low',
        cpcRange: gkpData.cpc || '₹579.59 - ₹2,772.16'
      }
    };
  }

  // Brand Silo Verification
  const hasBrand = title.includes('Devacia');
  const hasDelimiter = title.includes('|') || title.includes('-');
  const isBrandSiloCompliant = hasBrand && hasDelimiter && (title.endsWith('| Devacia') || title.endsWith('- Devacia'));

  // Calculate Unified Quality Score (0 - 100)
  let qualityScore = 0;
  if (isSerpCompliant) qualityScore += 30;
  else if (charLength <= 60 && pixelWidth <= 600) qualityScore += 15;

  if (targetAnalysis) {
    if (targetAnalysis.health === 'OPTIMAL') qualityScore += 30;
    else if (targetAnalysis.health === 'LOW_DENSITY') qualityScore += 15;
    
    // Prominence score (up to 20 pts)
    qualityScore += Math.round((targetAnalysis.prominencePercent / 100) * 20);
  } else {
    qualityScore += 25;
  }

  if (isBrandSiloCompliant) qualityScore += 20;

  return {
    title,
    serpMetrics: {
      charLength,
      pixelWidth,
      charLimit: 58,
      pixelLimit: 580,
      isCharSafe,
      isPixelSafe,
      isSerpCompliant
    },
    nlpMetrics: {
      totalWords,
      nonStopwordCount: nonStopwords.length,
      stopwordRatioPercent: stopwordRatio,
      topUnigrams: Object.entries(unigrams).sort((a, b) => b[1] - a[1]).slice(0, 5),
      topBigrams: Object.entries(bigrams).sort((a, b) => b[1] - a[1]).slice(0, 5),
      topTrigrams: Object.entries(trigrams).sort((a, b) => b[1] - a[1]).slice(0, 3)
    },
    targetAnalysis,
    brandSilo: {
      hasBrand,
      isBrandSiloCompliant
    },
    qualityScore: Math.min(100, Math.max(0, qualityScore))
  };
}

/**
 * Batch evaluate and rank multiple titles against a target keyword
 */
export function rankTitlesByKD(titles, targetKeyword, gkpData = {}) {
  const evaluations = titles.map(t => checkKeywordDensity(t, targetKeyword, gkpData));
  evaluations.sort((a, b) => b.qualityScore - a.qualityScore || a.serpMetrics.charLength - b.serpMetrics.charLength);
  return evaluations;
}

/**
 * Audit full article/blog/content text for keyword density, prominence, and n-grams
 */
export function checkContentKeywordDensity(content, targetKeyword = '', options = {}) {
  const cleanContent = content || '';
  const tokens = tokenizeWords(cleanContent);
  const totalWords = tokens.length;
  const charLength = cleanContent.length;

  const readingTimeMinutes = Math.max(1, Math.ceil(totalWords / 200));
  const paragraphs = cleanContent.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
  const sentences = cleanContent.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

  // Stopword filtration
  const nonStopwords = stopword.removeStopwords(tokens);
  const stopwordRatio = totalWords > 0 
    ? Number(((totalWords - nonStopwords.length) / totalWords * 100).toFixed(1))
    : 0;

  // N-gram frequency distribution
  const unigrams = {};
  const bigrams = {};
  const trigrams = {};

  tokens.forEach(w => {
    if (!stopword.removeStopwords([w]).length) return; // skip bare stopwords for top unigrams
    unigrams[w] = (unigrams[w] || 0) + 1;
  });
  extractNGrams(tokens, 2).forEach(bg => {
    const parts = bg.split(' ');
    if (stopword.removeStopwords(parts).length > 0) {
      bigrams[bg] = (bigrams[bg] || 0) + 1;
    }
  });
  extractNGrams(tokens, 3).forEach(tg => {
    const parts = tg.split(' ');
    if (stopword.removeStopwords(parts).length > 0) {
      trigrams[tg] = (trigrams[tg] || 0) + 1;
    }
  });

  let targetAnalysis = null;
  let highlightedHtml = cleanContent;

  if (targetKeyword) {
    const cleanTarget = targetKeyword.toLowerCase().trim();
    const targetWords = tokenizeWords(cleanTarget);
    const targetWordCount = targetWords.length;

    const escapedTarget = cleanTarget.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedTarget}\\b`, 'gi');
    const matches = (cleanContent.match(regex) || []).length;

    // Density: (Matches * WordsInTarget / TotalWords) * 100
    const densityPercent = totalWords > 0 
      ? Number(((matches * targetWordCount / totalWords) * 100).toFixed(2))
      : 0;

    // Prominence: appears in first 100 words?
    const first100Words = tokens.slice(0, 100).join(' ');
    const appearsInIntro = first100Words.includes(cleanTarget);

    // Health rating for body content
    let health = 'OPTIMAL';
    let healthExplanation = 'Natural, balanced keyword density for organic Google rankings (1.0% - 2.5%).';

    if (matches === 0) {
      health = 'MISSING';
      healthExplanation = 'Target keyword is not found anywhere in the content.';
    } else if (densityPercent < 0.8) {
      health = 'UNDER_OPTIMIZED';
      healthExplanation = `Keyword density (${densityPercent}%) is low. Consider mentioning the target keyword naturally in subheadings and body copy.`;
    } else if (densityPercent > 3.5) {
      health = 'STUFFED';
      healthExplanation = `Warning: High keyword density (${densityPercent}%). High risk of Google spam/keyword stuffing algorithmic penalty.`;
    } else if (densityPercent > 2.5) {
      health = 'SLIGHTLY_HIGH';
      healthExplanation = `Keyword density (${densityPercent}%) is slightly high. Ensure phrasing sounds completely natural.`;
    }

    // Highlight occurrences for GUI rendering
    highlightedHtml = cleanContent.replace(regex, (match) => {
      return `<mark class="kw-occurrence">${match}</mark>`;
    });

    targetAnalysis = {
      targetKeyword: cleanTarget,
      targetWordCount,
      occurrences: matches,
      densityPercent,
      appearsInIntro,
      health,
      healthExplanation,
      recommendedDensityRange: '1.0% - 2.5%',
    };
  }

  return {
    contentStats: {
      totalWords,
      charLength,
      readingTimeMinutes,
      paragraphs,
      sentences,
      stopwordRatioPercent: stopwordRatio,
    },
    nlpDistribution: {
      topKeywords: Object.entries(unigrams).sort((a, b) => b[1] - a[1]).slice(0, 10),
      topPhrases2: Object.entries(bigrams).sort((a, b) => b[1] - a[1]).slice(0, 8),
      topPhrases3: Object.entries(trigrams).sort((a, b) => b[1] - a[1]).slice(0, 6),
    },
    targetAnalysis,
    highlightedHtml,
  };
}

// ---------------------------------------------------------------------------
// CLI Execution Handler
// ---------------------------------------------------------------------------
if (process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('keyword-density-checker.js')) {
  const args = process.argv.slice(2);
  let target = '';
  let input = '';

  const targetArg = args.find(a => a.startsWith('--target='));
  const textArg = args.find(a => a.startsWith('--text='));
  const fileArg = args.find(a => a.startsWith('--file='));

  if (targetArg) {
    target = targetArg.slice(9).replace(/^["']|["']$/g, '');
  }
  if (textArg) {
    input = textArg.slice(7).replace(/^["']|["']$/g, '');
  } else if (fileArg) {
    const filePath = fileArg.slice(7).replace(/^["']|["']$/g, '');
    if (fs.existsSync(filePath)) input = fs.readFileSync(filePath, 'utf8');
  }

  if (!target && args[0]) {
    target = args[0].replace(/^["']|["']$/g, '');
  }
  if (!input && args[1]) {
    if (fs.existsSync(args[1])) {
      input = fs.readFileSync(args[1], 'utf8');
    } else {
      input = args.slice(1).join(' ').replace(/^["']|["']$/g, '');
    }
  }

  if (!input) {
    console.log(`\n================================================================`);
    console.log(`  DEVACIA SEO AGI — KEYWORD DENSITY & NLP CONTENT AUDITOR`);
    console.log(`================================================================`);
    console.log(`\nUsage:`);
    console.log(`  node src/seo/keyword-density-checker.js "<target-keyword>" "<text-or-file>"`);
    console.log(`\nExample:`);
    console.log(`  node src/seo/keyword-density-checker.js "web development" "We offer top web development..."\n`);
    process.exit(0);
  }

  const isArticle = input.split(/\s+/).length > 25;
  console.log(`\n================================================================`);
  console.log(`  DEVACIA SEO AGI — KEYWORD DENSITY AUDIT`);
  console.log(`  Target Keyword: "${target}"`);
  console.log(`  Analysis Mode:  ${isArticle ? 'Long-Form Article' : 'Meta Title / Snippet'}`);
  console.log(`================================================================\n`);

  if (isArticle) {
    const res = checkContentKeywordDensity(input, target);
    const ta = res.targetAnalysis || {};
    const cs = res.contentStats || {};

    console.log(`Word Count:        ${cs.totalWords} words (~${cs.readingTimeMinutes} min reading time)`);
    console.log(`Occurrences:       ${ta.occurrences || 0} matches`);
    console.log(`Keyword Density:   ${ta.densityPercent || 0}%`);
    console.log(`Optimal Range:     ${ta.recommendedDensityRange}`);
    console.log(`Health Status:     [${ta.health}] ${ta.healthExplanation}\n`);

    console.log(`Top Multi-Word NLP Phrases:`);
    (res.nlpDistribution.topPhrases2 || []).slice(0, 5).forEach(([p, c]) => {
      console.log(`  • "${p}" (${c}×)`);
    });
  } else {
    const res = checkKeywordDensity(input, target);
    console.log(`Title Tested:      "${input}"`);
    console.log(`Character Length:  ${res.serpMetrics.charLength}/58 chars (${res.serpMetrics.isCharSafe ? '✓ Safe' : '✗ Truncation risk'})`);
    console.log(`Pixel Width:       ${res.serpMetrics.pixelWidth}/580 px (${res.serpMetrics.isPixelSafe ? '✓ Safe' : '✗ Truncation risk'})`);
    console.log(`Target Matches:    ${res.targetAnalysis.occurrences}`);
    console.log(`Density Ratio:     ${res.targetAnalysis.densityPercent}%`);
    console.log(`CTR Quality Score: ${res.qualityScore}/100\n`);
  }
}


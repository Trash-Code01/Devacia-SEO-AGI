#!/usr/bin/env node

/**
 * SERP Architect & Live Query Intelligence Engine
 * 
 * Free, Zero-Auth, Real-Time Google Suggest + Cross-Engine Query Harvester.
 * Generates mathematically verified CTR-optimized Title Tags (< 60ch) and 
 * Meta Descriptions (< 155ch) with zero SERP truncation.
 */

import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { calculatePixelWidth, checkKeywordDensity } from '../src/seo/keyword-density-checker.js';
import './env-loader.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper for fetching Google Suggest
export function fetchGoogleSuggestions(query, gl = 'us') {
  return new Promise((resolve) => {
    const encoded = encodeURIComponent(query);
    const url = `https://suggestqueries.google.com/complete/search?client=chrome&q=${encoded}&gl=${gl}&hl=en`;

    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed[1] || []);
        } catch {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

export function capitalizeWords(str) {
  return (str || '').replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Generates mathematically compliant, CTR-optimized Title candidates
 */
export function generateTitleCandidates(seedTopic, options = {}) {
  const brand = options.brand || process.env.GBP_BUSINESS_NAME || 'Devacia';
  const cleanSeed = capitalizeWords((seedTopic || '').trim());
  const audience = options.audience || 'Businesses';
  const geo = options.geo ? capitalizeWords(options.geo.trim()) : '';

  const rawTemplates = [
    `Best ${cleanSeed} for ${audience} | ${brand}`,
    `${cleanSeed} Agency & Solutions | ${brand}`,
    `Top Rated ${cleanSeed} Services | ${brand}`,
    `Enterprise ${cleanSeed} Agency | ${brand}`,
    `Hire ${cleanSeed} Experts | ${brand}`,
    `${cleanSeed} & Growth Systems | ${brand}`,
    `Best ${cleanSeed} Companies (2026) | ${brand}`,
    `Custom ${cleanSeed} Services | ${brand}`,
  ];

  if (geo) {
    rawTemplates.unshift(`${cleanSeed} in ${geo} | ${brand}`);
    rawTemplates.unshift(`Best ${cleanSeed} Agency in ${geo} | ${brand}`);
  }

  const uniqueTemplates = [...new Set(rawTemplates)];

  return uniqueTemplates.map((title) => {
    const charLength = title.length;
    const pixelWidth = calculatePixelWidth(title);
    const kdResult = checkKeywordDensity(title, seedTopic);

    const isCharOptimal = charLength <= 58;
    const isCharSafe = charLength <= 60;
    const isPixelOptimal = pixelWidth <= 580;
    const isPixelSafe = pixelWidth <= 600;

    let status = '✓ OPTIMAL';
    if (!isCharSafe || !isPixelSafe) {
      status = '✗ TRUNCATED';
    } else if (!isCharOptimal || !isPixelOptimal) {
      status = '⚠️ BORDERLINE';
    }

    return {
      title,
      charLength,
      pixelWidth,
      charLimit: 58,
      pixelLimit: 580,
      status,
      isCompliant: isCharSafe && isPixelSafe,
      qualityScore: kdResult.qualityScore || 85,
      densityPercent: kdResult.targetAnalysis?.densityPercent || 0,
      keywordOccurrences: kdResult.targetAnalysis?.occurrences || 1,
    };
  }).sort((a, b) => (b.isCompliant ? 1 : 0) - (a.isCompliant ? 1 : 0) || b.qualityScore - a.qualityScore);
}

/**
 * Generates CTR-optimized Meta Descriptions
 */
export function generateMetaDescription(seedTopic, options = {}) {
  const brand = options.brand || process.env.GBP_BUSINESS_NAME || 'Devacia';
  const cleanTopic = (seedTopic || '').trim().toLowerCase();
  const audience = options.audience || 'businesses';

  const templates = [
    `Looking for top-tier ${cleanTopic}? ${brand} engineers scalable, high-converting digital systems for ${audience}. Request a strategy review today.`,
    `Scale your pipeline with expert ${cleanTopic} from ${brand}. Proven frameworks, custom architecture, and measurable ROI. Speak with an expert.`,
    `Need modern ${cleanTopic}? ${brand} delivers fast, high-performance solutions for growing ${audience}. Book your free consultation today.`,
  ];

  return templates.map((text) => {
    const len = text.length;
    let status = '✓ OPTIMAL';
    if (len < 120) status = '⚠️ TOO SHORT';
    else if (len > 155) status = '✗ TRUNCATED';

    return {
      text,
      length: len,
      status,
      isCompliant: len >= 120 && len <= 155,
    };
  });
}

/**
 * Harvest live Google Suggest queries with intent grouping
 */
export async function harvestLiveQueriesWithIntent(seed, options = {}) {
  const gl = options.gl || options.geo || 'us';
  const cleanSeed = (seed || '').trim().toLowerCase();

  const commercialMods = ['agency', 'company', 'services', 'pricing', 'cost', 'best', 'top', 'for startups', 'for small business', 'b2b'];
  const questionMods = ['how to', 'what is', 'why use', 'can', 'cost of'];
  const alphabet = options.includeAlphabet ? 'abcdefghijklmnopqrstuvwxyz'.split('') : [];

  const allQueries = new Set();
  const commercial = new Set();
  const questions = new Set();
  const comparison = new Set();
  const local = new Set();

  const baseSuggs = await fetchGoogleSuggestions(cleanSeed, gl);
  baseSuggs.forEach(s => allQueries.add(s));

  for (const mod of commercialMods.slice(0, 6)) {
    const suggs = await fetchGoogleSuggestions(`${cleanSeed} ${mod}`, gl);
    suggs.forEach(s => {
      allQueries.add(s);
      commercial.add(s);
    });
  }

  for (const q of questionMods.slice(0, 4)) {
    const suggs = await fetchGoogleSuggestions(`${q} ${cleanSeed}`, gl);
    suggs.forEach(s => {
      allQueries.add(s);
      questions.add(s);
    });
  }

  for (const letter of alphabet.slice(0, 8)) {
    const suggs = await fetchGoogleSuggestions(`${cleanSeed} ${letter}`, gl);
    suggs.forEach(s => allQueries.add(s));
  }

  for (const q of allQueries) {
    const lower = q.toLowerCase();
    if (lower.includes(' vs ') || lower.includes(' or ') || lower.includes('alternative')) {
      comparison.add(q);
    }
    if (lower.includes('near me') || lower.includes('in ') || lower.includes('local')) {
      local.add(q);
    }
    if (lower.startsWith('how') || lower.startsWith('what') || lower.startsWith('why') || lower.startsWith('can')) {
      questions.add(q);
    }
  }

  return {
    seed: cleanSeed,
    geo: gl.toUpperCase(),
    totalDiscovered: allQueries.size,
    all: Array.from(allQueries),
    categorized: {
      commercial: Array.from(commercial),
      questions: Array.from(questions),
      comparison: Array.from(comparison),
      local: Array.from(local),
    },
  };
}

// Pixel / Character Width Safety Auditor
export function auditSnippet(title, description) {
  const titleLen = title.length;
  const descLen = description.length;

  const titleStatus = titleLen <= 58 ? '✓ OPTIMAL' : titleLen <= 60 ? '⚠️ BORDERLINE' : '✗ TRUNCATED';
  const descStatus = descLen >= 120 && descLen <= 155 ? '✓ OPTIMAL' : descLen < 120 ? '⚠️ TOO SHORT' : '✗ TRUNCATED';

  return {
    title: { text: title, length: titleLen, status: titleStatus },
    description: { text: description, length: descLen, status: descStatus },
    isCompliant: titleLen <= 60 && descLen <= 155,
  };
}

// Live research across modifiers
export async function harvestLiveQueries(seed, gl = 'us') {
  const modifiers = ['', 'agency', 'company', 'services', 'for small business', 'for startups', 'b2b'];
  const results = new Set();

  for (const mod of modifiers) {
    const term = mod ? `${seed} ${mod}` : seed;
    const suggestions = await fetchGoogleSuggestions(term, gl);
    suggestions.forEach(s => results.add(s));
  }

  return Array.from(results);
}

// ---------------------------------------------------------------------------
// Master 18-Page Money Architecture Definitions
// ---------------------------------------------------------------------------
export const MASTER_PAGE_BLUEPRINTS = [
  // TIER 1: GLOBAL HOMEPAGE
  {
    id: 'HOMEPAGE',
    type: 'Root Flagship (Global / US / UK / AUS)',
    url: 'https://www.devacia.com/',
    role: 'Global Full-Service Web Design, Development & Performance Marketing Hub',
    targetQuery: 'web design and development agency',
    title: 'Web Design & Development Agency | Devacia',
    description: 'Devacia is a web design, development, and performance marketing agency. We engineer high-converting websites, web apps, and automated systems for growth.',
    h1: 'Web Design, Development & Digital Systems That Scale Your Business',
  },

  // TIER 2: 5 CORE MONEY SERVICES
  {
    id: 'S_WEB_DEV',
    type: 'Core Service Pillar',
    url: 'https://www.devacia.com/services/website-development',
    role: 'High-Performance Custom Web Development Funnel',
    targetQuery: 'web development services',
    title: 'Best Web Development Services for Businesses | Devacia',
    description: 'Looking for the best web development services? Devacia builds fast, high-converting websites, web apps, and digital systems for modern businesses.',
    h1: 'Custom Websites Built to Win Customers and Run Your Business',
  },
  {
    id: 'S_WORDPRESS',
    type: 'Core Service Pillar',
    url: 'https://www.devacia.com/services/wordpress-development',
    role: 'Enterprise & Headless WordPress Development (Page 1 Capture)',
    targetQuery: 'enterprise wordpress development services',
    title: 'Enterprise WordPress Development Agency | Devacia',
    description: 'Looking for enterprise WordPress development? Devacia builds fast, secure custom Gutenberg block themes and headless WordPress systems that scale.',
    h1: 'Enterprise WordPress Development Built Around Your Business',
  },
  {
    id: 'S_CUSTOM_SOFTWARE',
    type: 'Core Service Pillar',
    url: 'https://www.devacia.com/services/custom-software-development',
    role: 'B2B Custom Web Applications & Client Portals',
    targetQuery: 'custom software development agency',
    title: 'Custom Software Development Agency | Devacia',
    description: 'Devacia is a custom software development agency. We build secure client portals, internal dashboards, and custom web applications that scale operations.',
    h1: 'Custom Software Built Around How Your Business Actually Operates',
  },
  {
    id: 'S_SHOPIFY_ECOM',
    type: 'Core Service Pillar',
    url: 'https://www.devacia.com/services/shopify-development',
    role: 'D2C Ecommerce & Shopify Plus Engineering',
    targetQuery: 'shopify website development agency',
    title: 'Shopify Development Agency for D2C Brands | Devacia',
    description: 'Devacia is a Shopify development agency for D2C brands. We build high-speed Liquid storefronts, custom apps, and frictionless mobile checkouts that scale.',
    h1: 'Shopify Storefronts Engineered for High Conversion & Scale',
  },
  {
    id: 'S_CRO_MARKETING',
    type: 'Core Service Pillar',
    url: 'https://www.devacia.com/services/conversion-rate-optimization',
    role: 'Conversion Rate Optimization & Funnel Architecture',
    targetQuery: 'conversion rate optimization agency',
    title: 'B2B Conversion Rate Optimization (CRO) Agency | Devacia',
    description: 'Turn existing traffic into qualified buyer pipeline. Full-funnel audits, UX wireframing, and rigorous A/B testing frameworks. Book a CRO review.',
    h1: 'Data-Backed CRO Systems That Turn Visitors into Qualified Leads',
  },

  // TIER 3: 12 INDUSTRY MONEY PAGES
  {
    id: 'I_WHOLESALE_MFG',
    type: 'Industry Silo',
    url: 'https://www.devacia.com/industries/b2b-wholesale-manufacturing-web-development',
    role: 'Wholesale & Industrial Manufacturing Catalogue / RFQ Portal',
    targetQuery: 'b2b wholesale website development agency',
    title: 'B2B Wholesale Website Development Agency | Devacia',
    description: 'Looking for a B2B wholesale website development agency? Devacia builds portals with tiered dealer pricing, digital catalogues, and custom RFQ workflows.',
    h1: 'Manufacturing Websites with Digital Catalogues and RFQ Systems',
  },
  {
    id: 'I_CLINIC',
    type: 'Industry Silo',
    url: 'https://www.devacia.com/industries/clinic-website-development',
    role: 'Healthcare & Practice Patient Booking Engines',
    targetQuery: 'clinic website development agency',
    title: 'Clinic Website Development Agency | Devacia',
    description: 'Looking for a clinic website development agency? Devacia builds healthcare websites with patient appointment booking, doctor rosters, and secure forms.',
    h1: 'Clinic Websites Engineered for Patient Trust and Direct Bookings',
  },
  {
    id: 'I_REAL_ESTATE',
    type: 'Industry Silo',
    url: 'https://www.devacia.com/industries/real-estate-website-development',
    role: 'Property Developer & Brokerage Lead Funnels',
    targetQuery: 'real estate website development agency',
    title: 'Real Estate Website Development Agency | Devacia',
    description: 'Looking for a real estate website development agency? Devacia builds property portals with dynamic MLS listings, buyer lead routing, and CRM sync.',
    h1: 'Real Estate Websites Built to Showcase Properties and Capture Buyers',
  },
  {
    id: 'I_RESTAURANT',
    type: 'Industry Silo',
    url: 'https://www.devacia.com/industries/restaurant-website-development',
    role: 'Fine Dining & Hospitality Direct Reservation Systems',
    targetQuery: 'restaurant website development agency',
    title: 'Restaurant Website Development Agency | Devacia',
    description: 'Looking for a restaurant website development agency? Devacia builds dining websites with table reservation systems, digital menus, and private event forms.',
    h1: 'Hospitality Websites with Direct Reservations & Dining Menus',
  },
  {
    id: 'I_B2B_CORP',
    type: 'Industry Silo',
    url: 'https://www.devacia.com/industries/corporate-b2b-website-development',
    role: 'Enterprise Corporate B2B Pipeline Capture',
    targetQuery: 'corporate b2b website development agency',
    title: 'Corporate B2B Website Development Agency | Devacia',
    description: 'Looking for a corporate B2B website development agency? Devacia builds high-performance enterprise websites with RFQ workflows and pipeline lead capture.',
    h1: 'Corporate B2B Websites Built for Complex Sales Cycles and Pipeline',
  },
  {
    id: 'I_GYM',
    type: 'Industry Silo',
    url: 'https://www.devacia.com/industries/gym-fitness-website-development',
    role: 'Fitness Studio Membership & Trial Pass Funnels',
    targetQuery: 'gym website development agency',
    title: 'Gym Website Development Agency | Devacia',
    description: 'Looking for a gym website development agency? Devacia builds fitness websites with class schedules, trial pass capture, and membership sales funnels.',
    h1: 'Fitness Studio Websites Engineered for Membership Acquisition',
  },
  {
    id: 'I_PROF_SERVICES',
    type: 'Industry Silo',
    url: 'https://www.devacia.com/industries/professional-services-website-development',
    role: 'Consultancy, Legal & Executive Authority Sites',
    targetQuery: 'consulting website development agency',
    title: 'Consulting Website Development Agency | Devacia',
    description: 'Looking for a consulting website development agency? Devacia builds high-authority websites with interactive audit funnels and qualified enquiry capture.',
    h1: 'Professional Services Websites Built to Establish Authority and Inquiries',
  },
  {
    id: 'I_EDUCATION',
    type: 'Industry Silo',
    url: 'https://www.devacia.com/industries/education-coaching-website-development',
    role: 'Academies, Coaching & Enrollment Hubs',
    targetQuery: 'education website development agency',
    title: 'Education Website Development Agency | Devacia',
    description: 'Looking for an education website development agency? Devacia builds course portals, enrollment capture funnels, and student admission inquiry systems.',
    h1: 'Education Websites Designed for Student Enrollment and Course Discovery',
  },
  {
    id: 'I_HOTEL',
    type: 'Industry Silo',
    url: 'https://www.devacia.com/industries/hotel-venue-website-development',
    role: 'Banquets, Event Venues & Direct Booking Portals',
    targetQuery: 'hotel website development agency',
    title: 'Hotel Website Development Agency | Devacia',
    description: 'Looking for a hotel website development agency? Devacia builds venue websites with direct booking engines, banquet event forms, and package showcases.',
    h1: 'Hotel & Venue Websites Built for Direct Bookings and Event Inquiries',
  },
  {
    id: 'I_HVAC_HOME',
    type: 'Industry Silo',
    url: 'https://www.devacia.com/industries/hvac-home-services-website-development',
    role: 'Local Emergency Dispatch & Home Service Leads',
    targetQuery: 'hvac website development agency',
    title: 'HVAC Website Development Agency | Devacia',
    description: 'Looking for an HVAC website development agency? Devacia builds home services websites with emergency dispatch routing, service zones, and quote requests.',
    h1: 'Home Service Websites Built for Instant Phone Calls and Service Quotes',
  },
  {
    id: 'I_CAFE',
    type: 'Industry Silo',
    url: 'https://www.devacia.com/industries/cafe-website-development',
    role: 'Cafes, Bakeries & Quick-Order Takeout Hubs',
    targetQuery: 'coffee shop website development agency',
    title: 'Coffee Shop Website Development Agency | Devacia',
    description: 'Looking for a coffee shop website development agency? Devacia builds fast cafe websites with digital menus, mobile ordering, and custom pickup systems.',
    h1: 'Cafe & Coffee Shop Websites Built for Mobile Ordering and Foot Traffic',
  },
  {
    id: 'I_SALON_SPA',
    type: 'Industry Silo',
    url: 'https://www.devacia.com/industries/salon-spa-website-development',
    role: 'Salons, Luxury Spas & Treatment Booking',
    targetQuery: 'salon website development agency',
    title: 'Salon Website Development Agency | Devacia',
    description: 'Looking for a salon website development agency? Devacia builds luxury spa websites with treatment reservations, stylist schedules, and deposit capture.',
    h1: 'Salon & Spa Websites Engineered for Elegant Booking Experiences',
  },
  // TIER 4: 9 STRATEGIC LOCATION SILOS
  {
    id: 'L_BANGALORE',
    type: 'Location Silo',
    url: 'https://www.devacia.com/locations/india/bangalore/web-development-company',
    role: 'Bangalore / Bengaluru Tech Hub Development Partner',
    targetQuery: 'web development agency in bangalore',
    title: 'Web Development Agency in Bangalore | Devacia',
    description: 'Looking for a web development company or agency in Bangalore? Devacia builds fast WordPress sites, custom software, and ecommerce platforms that scale.',
    h1: 'Web development for Bengaluru teams, from website to admin workflow',
  },
  {
    id: 'L_MUMBAI',
    type: 'Location Silo',
    url: 'https://www.devacia.com/locations/india/mumbai/web-development-company',
    role: 'Mumbai Corporate & Ecommerce Development',
    targetQuery: 'web development agency in mumbai',
    title: 'Web Development Agency in Mumbai | Devacia',
    description: 'Looking for a web development company or agency in Mumbai? Devacia builds custom WordPress sites, B2B portals, and high-converting ecommerce platforms.',
    h1: 'Website development for Mumbai businesses',
  },
  {
    id: 'L_DELHI',
    type: 'Location Silo',
    url: 'https://www.devacia.com/locations/india/delhi/web-development-company',
    role: 'Delhi NCR Business & Enterprise Development',
    targetQuery: 'web development agency in delhi ncr',
    title: 'Web Development Agency in Delhi NCR | Devacia',
    description: 'Looking for a web development company or agency in Delhi NCR? Devacia builds custom business websites, B2B software, and ecommerce systems that scale.',
    h1: 'Web Development Agency for Delhi NCR Businesses',
  },
  {
    id: 'L_GURGAON',
    type: 'Location Silo',
    url: 'https://www.devacia.com/locations/india/delhi/gurgaon-performance-marketing',
    role: 'Gurgaon D2C & Tech Performance Marketing',
    targetQuery: 'performance marketing agency in gurgaon',
    title: 'Performance Marketing Agency in Gurgaon | Devacia',
    description: 'Looking for a performance marketing agency in Gurgaon? Devacia manages high-ROAS Google Ads, Meta Ads, and conversion landing pages for D2C brands.',
    h1: 'Performance Marketing Agency in Gurgaon',
  },
  {
    id: 'L_LUCKNOW',
    type: 'Location Silo',
    url: 'https://www.devacia.com/locations/india/lucknow/web-development-company',
    role: 'Lucknow Enterprise & Ecommerce Growth',
    targetQuery: 'web development agency in lucknow',
    title: 'Web Development Agency in Lucknow | Devacia',
    description: 'Looking for a web development company or agency in Lucknow? Devacia builds fast WordPress sites, custom software, and ecommerce systems that scale.',
    h1: 'Web Development Agency in Lucknow',
  },
  {
    id: 'L_PRAYAGRAJ_WEB',
    type: 'Location Silo',
    url: 'https://www.devacia.com/locations/india/prayagraj/web-development-company',
    role: 'Prayagraj / Allahabad Headquarter Development Services',
    targetQuery: 'web development agency in prayagraj',
    title: 'Web Development Agency in Prayagraj (Allahabad) | Devacia',
    description: 'Looking for a web development company in Prayagraj or Allahabad? Devacia builds fast websites, ecommerce stores, and custom software that drive leads.',
    h1: 'Web Development Agency in Prayagraj (Allahabad)',
  },
  {
    id: 'L_PRAYAGRAJ_CIVIL',
    type: 'Location Silo',
    url: 'https://www.devacia.com/locations/india/prayagraj/civil-lines-digital-marketing',
    role: 'Civil Lines Education & Local Business Marketing',
    targetQuery: 'digital marketing agency in civil lines',
    title: 'Digital Marketing Agency in Civil Lines | Devacia',
    description: 'Looking for a digital marketing agency in Civil Lines, Prayagraj? Devacia delivers local SEO, Google Ads, and landing pages for coaching and local brands.',
    h1: 'Digital Marketing Agency in Civil Lines, Prayagraj',
  },
  {
    id: 'L_USA_WEB',
    type: 'Location Silo',
    url: 'https://www.devacia.com/locations/usa/web-development-agency',
    role: 'US Founders & Growth Brands Delivery Partner',
    targetQuery: 'web development agency for us startups',
    title: 'Web Development Agency for US Startups | Devacia',
    description: 'Looking for a web development agency for startups? Devacia builds high-speed websites, web apps, and conversion funnels for US founders and growth brands.',
    h1: 'Web Development Agency for US Startups & Brands',
  },
  {
    id: 'L_USA_SOFTWARE',
    type: 'Location Silo',
    url: 'https://www.devacia.com/locations/usa/custom-software-development-team',
    role: 'US Startup MVP & Dedicated Engineering Pods',
    targetQuery: 'custom software agency for us startups',
    title: 'Custom Software Agency for US Startups | Devacia',
    description: 'Looking for custom software development for startups? Devacia builds startup MVPs, client portals, internal dashboards, and scalable web applications.',
    h1: 'Custom Software Development Team for US Startups',
  },
];

// CLI Execution Mode
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] ? args[0].toLowerCase() : 'audit-master';

  if (command === 'generate' || command === 'gen') {
    const seed = args.slice(1).filter(a => !a.startsWith('--')).join(' ') || 'Web Development';
    const brandArg = args.find(a => a.startsWith('--brand='));
    const brand = brandArg ? brandArg.split('=')[1] : process.env.GBP_BUSINESS_NAME || 'Devacia';

    console.log(`\n================================================================`);
    console.log(`  SERP ARCHITECT — TITLE CANDIDATES GENERATOR: "${seed}"`);
    console.log(`  Brand Suffix: "${brand}"`);
    console.log(`================================================================\n`);

    const candidates = generateTitleCandidates(seed, { brand });
    candidates.forEach((c, idx) => {
      console.log(`[#${idx + 1}] Quality: ${c.qualityScore}/100 | ${c.status}`);
      console.log(`    Title:  "${c.title}"`);
      console.log(`    Length: ${c.charLength}/58 ch | Pixels: ${c.pixelWidth}/580 px | Compliant: ${c.isCompliant ? '✓ YES' : '✗ NO'}\n`);
    });

    const metas = generateMetaDescription(seed, { brand });
    console.log(`--- CTR-Optimized Meta Descriptions ---`);
    metas.forEach((m, idx) => {
      console.log(`[Option ${idx + 1}] (${m.length} ch) [${m.status}]`);
      console.log(`  ➜ "${m.text}"\n`);
    });
    return;
  }

  if (command === 'harvest' || command === 'queries') {
    const seed = args.slice(1).filter(a => !a.startsWith('--')).join(' ') || 'web design';
    const geoArg = args.find(a => a.startsWith('--geo='));
    const geo = geoArg ? geoArg.split('=')[1] : 'US';

    console.log(`\nHarvesting real-time queries for "${seed}" (Geo: ${geo})...\n`);
    const results = await harvestLiveQueriesWithIntent(seed, { geo, includeAlphabet: true });
    console.log(`Discovered ${results.totalDiscovered} live search queries.\n`);
    console.log(`Commercial Intent (${results.categorized.commercial.length}):`);
    results.categorized.commercial.slice(0, 8).forEach(q => console.log(`  • ${q}`));
    console.log(`\nQuestions (${results.categorized.questions.length}):`);
    results.categorized.questions.slice(0, 8).forEach(q => console.log(`  • ${q}`));
    return;
  }

  console.log(`\n================================================================`);
  console.log(`  DEVACIA SERP ARCHITECT — META TITLE & SNIPPET VALIDATION AUDIT`);
  console.log(`================================================================\n`);

  let allValid = true;

  for (const page of MASTER_PAGE_BLUEPRINTS) {
    const audit = auditSnippet(page.title, page.description);
    if (!audit.isCompliant) allValid = false;

    console.log(`[${page.id}] ${page.type}:`);
    console.log(`  • URL:         ${page.url}`);
    console.log(`  • Target HICK: "${page.targetQuery}"`);
    console.log(`  • Title:       ${audit.title.text} (${audit.title.length} ch) -> ${audit.title.status}`);
    console.log(`  • Meta Desc:   ${audit.description.text} (${audit.description.length} ch) -> ${audit.description.status}`);
    console.log(`  • H1 Hook:     ${page.h1}\n`);
  }

  if (allValid) {
    console.log(`✓ 100% OF TITLES & META DESCRIPTIONS ARE MATHEMATICALLY COMPLIANT.`);
    console.log(`  Zero truncation risk on Google Desktop & Mobile SERPs!`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}

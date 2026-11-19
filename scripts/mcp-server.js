#!/usr/bin/env node

/**
 * Devacia SEO AGI — Master Model Context Protocol (MCP) Server
 * 
 * Exposes ALL tools across the complete SEO AGI Engine to AI coding assistants:
 * - Antigravity
 * - Claude Code & Claude Desktop
 * - Cursor
 * - Windsurf
 * - VS Code & Continue
 * 
 * Protocol: MCP (Model Context Protocol) 2024-11-05 Stdio JSON-RPC 2.0
 */

import readline from 'readline';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import './env-loader.js';

// Import subsystem engines
import {
  loadConfig as loadGkpConfig,
  fetchGoogleAdsKeywordIdeas,
  expandKeywordsWithGoogle,
  clusterKeywords,
  generateRankBlueprint,
  GKP_OAUTH_PATH,
  GKP_TOKEN_PATH
} from './gkp-cli.js';

import {
  checkGscStatus,
  runAudit as runGscAudit,
  inspectUrls as runGscInspect,
  requestIndex as runGscIndex
} from './gsc-cli.js';

import {
  checkGa4Status,
  runAudit as runGa4Audit,
  runEvents as runGa4Events,
  runOrganic as runGa4Organic,
  getGa4PropertyId
} from './ga4-cli.js';

import {
  checkGbpStatus,
  listLocations as runGbpLocations,
  listReviews as runGbpReviews,
  runAudit as runGbpAudit
} from './gbp-cli.js';

import {
  harvestLocalIntelligence,
  generateUULE,
  harvestLocalSearchBehavior,
  generateLocalSnippetAndSchema
} from './local-geo-intelligence.js';

import {
  auditSnippet,
  harvestLiveQueries
} from './serp-architect.js';

import {
  checkKeywordDensity,
  rankTitlesByKD
} from '../src/seo/keyword-density-checker.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const SKILL_SCRIPTS_DIR = fs.existsSync(path.resolve(ROOT_DIR, 'skills', 'seo', 'scripts'))
  ? path.resolve(ROOT_DIR, 'skills', 'seo', 'scripts')
  : path.resolve(ROOT_DIR, '.agent', 'skills', 'seo', 'scripts');

// Helper to execute Python scripts cleanly and capture text output
function executePythonScript(scriptName, args = []) {
  return new Promise((resolve) => {
    const fullPath = path.join(SKILL_SCRIPTS_DIR, scriptName.endsWith('.py') ? scriptName : `${scriptName}.py`);
    if (!fs.existsSync(fullPath)) {
      return resolve({
        success: false,
        output: `Error: Python script '${scriptName}' not found in ${SKILL_SCRIPTS_DIR}`
      });
    }

    const proc = spawn('python', [fullPath, ...args], {
      cwd: ROOT_DIR,
      env: { ...process.env, PYTHONIOENCODING: 'utf-8', PYTHONUTF8: '1' },
      shell: process.platform === 'win32',
    });

    let stdout = '';
    let stderr = '';

    proc.stdout.on('data', (d) => { stdout += d.toString(); });
    proc.stderr.on('data', (d) => { stderr += d.toString(); });

    proc.on('close', (code) => {
      resolve({
        success: code === 0,
        output: stdout || stderr || `Exited with code ${code}`,
      });
    });

    proc.on('error', (err) => {
      resolve({
        success: false,
        output: `Failed to execute python: ${err.message}. Please ensure Python 3 is installed.`,
      });
    });
  });
}

// ---------------------------------------------------------------------------
// Tool Registry (All Tools)
// ---------------------------------------------------------------------------
const toolsList = [
  // 1. System Health
  {
    name: 'seo_agi_status',
    description: 'Run diagnostic health audit of all 5 SEO subsystems (GKP, GSC, GA4, GBP, Python 89-engine library) and credentials.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },

  // 2. Google Keyword Planner & Ranking
  {
    name: 'gkp_get_keyword_ideas',
    description: 'Get keyword ideas, monthly search volume, CPC bid estimates, competition index, and intent for seed keywords or URLs.',
    inputSchema: {
      type: 'object',
      properties: {
        keywords: {
          type: 'array',
          items: { type: 'string' },
          description: 'List of seed keywords to research (e.g. ["web development", "seo services"]).',
        },
        url: {
          type: 'string',
          description: 'Optional competitor or landing page URL to extract keyword ideas from.',
        },
        geo: {
          type: 'string',
          description: 'Target country code (e.g. "US", "IN", "UK", "CA", "AU"). Default is "US".',
        },
        language: {
          type: 'string',
          description: 'Language code (e.g. "en", "es", "hi"). Default is "en".',
        },
        limit: {
          type: 'number',
          description: 'Maximum number of results to return (default: 30).',
        },
      },
      required: ['keywords'],
    },
  },
  {
    name: 'gkp_expand_keywords',
    description: 'Perform deep long-tail keyword expansion using Google Autocomplete algorithms (Alphabet soup a-z permutations + Question modifiers) with zero authentication required.',
    inputSchema: {
      type: 'object',
      properties: {
        seed: {
          type: 'string',
          description: 'Root topic or seed keyword to expand (e.g. "ai agent development").',
        },
        geo: {
          type: 'string',
          description: 'Target country code (e.g. "US", "IN", "UK"). Default is "US".',
        },
        includeAlphabet: {
          type: 'boolean',
          description: 'Whether to run 26-letter a-z alphabet permutations (default: true).',
        },
      },
      required: ['seed'],
    },
  },
  {
    name: 'gkp_cluster_keywords',
    description: 'Group keywords into strategic Pillar and Cluster architectures (Pillars, Commercial, Comparison, How-To, Pricing, and FAQs) to maximize topical authority.',
    inputSchema: {
      type: 'object',
      properties: {
        seed: {
          type: 'string',
          description: 'Primary core topic or seed keyword.',
        },
        geo: {
          type: 'string',
          description: 'Target country code (default: "US").',
        },
      },
      required: ['seed'],
    },
  },
  {
    name: 'gkp_rank_blueprint',
    description: 'Generate a production-grade Rank #1 SEO blueprint with semantic heading hierarchy (H1-H3), CTR-optimized title tag, meta description, LSI keywords, and Schema.org JSON-LD.',
    inputSchema: {
      type: 'object',
      properties: {
        targetKeyword: {
          type: 'string',
          description: 'The primary keyword you want to rank #1 on Google for.',
        },
        secondaryKeywords: {
          type: 'array',
          items: { type: 'string' },
          description: 'Optional supporting secondary keywords.',
        },
      },
      required: ['targetKeyword'],
    },
  },

  // 3. Google Search Console
  {
    name: 'gsc_status',
    description: 'Check Google Search Console OAuth connection and token status.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'gsc_audit',
    description: 'Audit Google Search Console performance metrics (Clicks, Impressions, CTR, Average Position) and top queries/pages.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'gsc_inspect_url',
    description: 'Inspect live Google Search Console indexing state, crawl issues, and canonical URL via Google URL Inspection API.',
    inputSchema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          description: 'Specific URL to inspect. If omitted, inspects URLs from the sitemap.',
        },
      },
    },
  },
  {
    name: 'gsc_request_indexing',
    description: 'Inspect and request re-crawl verification for a specific URL.',
    inputSchema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          description: 'URL to inspect and request re-crawl for.',
        },
      },
      required: ['url'],
    },
  },

  // 4. Google Analytics 4
  {
    name: 'ga4_status',
    description: 'Check Google Analytics 4 (GA4) OAuth connection and Property ID status.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'ga4_traffic_audit',
    description: 'Run full 28-day Google Analytics 4 traffic audit (Sessions, Active Users, Engagement Rate, Bounce Rate, Channels, Landing Pages, Countries, Devices).',
    inputSchema: {
      type: 'object',
      properties: {
        propertyId: {
          type: 'string',
          description: 'Optional custom GA4 Property ID. Defaults to configured GA4_PROPERTY_ID.',
        },
      },
    },
  },
  {
    name: 'ga4_events',
    description: 'Audit GA4 key conversion events, lead attribution, and event counts.',
    inputSchema: {
      type: 'object',
      properties: {
        propertyId: {
          type: 'string',
          description: 'Optional custom GA4 Property ID.',
        },
      },
    },
  },
  {
    name: 'ga4_organic_landing_pages',
    description: 'Analyze organic search traffic performance and landing pages in GA4.',
    inputSchema: {
      type: 'object',
      properties: {
        propertyId: {
          type: 'string',
          description: 'Optional custom GA4 Property ID.',
        },
      },
    },
  },

  // 5. Google Business Profile (Local SEO)
  {
    name: 'gbp_status',
    description: 'Check Google Business Profile API connection status.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'gbp_audit',
    description: 'Comprehensive Local SEO audit (NAP consistency, 28-day local search visibility, ratings, and reviews).',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'gbp_locations',
    description: 'List verified Google Business Profile locations and details.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'gbp_reviews',
    description: 'List customer reviews, star ratings, and response status.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },

  // 6. Local Geo-Intelligence & UULE
  {
    name: 'local_geo_audit',
    description: 'Harvest localized Google Search queries using Google UULE canonical algorithm for any US state/city (CA, NY, TX, FL, SF, NYC, Austin, Miami) or Indian metro (Delhi, Bangalore, Mumbai). Generates zero-truncation snippets and Schema.org ProfessionalService JSON-LD.',
    inputSchema: {
      type: 'object',
      properties: {
        location: {
          type: 'string',
          description: 'City, state, or region (e.g. "california", "new york", "san francisco", "austin", "bangalore", "delhi").',
        },
        service: {
          type: 'string',
          description: 'Core service offering (e.g. "web design", "custom software development", "seo agency").',
        },
      },
      required: ['location', 'service'],
    },
  },

  // 7. SERP Architect & Zero-Truncation Auditor
  {
    name: 'serp_audit_snippet',
    description: 'Audits Title Tag (< 60ch) and Meta Description (< 155ch) for mathematical pixel width and zero-truncation compliance on Google Desktop and Mobile SERPs.',
    inputSchema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'Meta Title tag to evaluate.',
        },
        description: {
          type: 'string',
          description: 'Meta Description tag to evaluate.',
        },
      },
      required: ['title', 'description'],
    },
  },
  {
    name: 'serp_harvest_queries',
    description: 'Harvest real-time Google search queries across commercial modifiers (agency, company, services, for startups, b2b) with zero authentication.',
    inputSchema: {
      type: 'object',
      properties: {
        seed: {
          type: 'string',
          description: 'Seed topic or keyword.',
        },
        geo: {
          type: 'string',
          description: 'Country code (default: "us").',
        },
      },
      required: ['seed'],
    },
  },

  // 8. Keyword Density & Safety
  {
    name: 'kd_check',
    description: 'Audit keyword density, occurrence count, and ranking safety for titles and headings against target keyphrases.',
    inputSchema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'Title string to check.',
        },
        targetKeyword: {
          type: 'string',
          description: 'Target keyphrase.',
        },
      },
      required: ['title', 'targetKeyword'],
    },
  },

  // 9. Multi-Vector Audit & 89 Python Specialist Engines
  {
    name: 'seo_audit_url',
    description: 'Run an automated multi-vector SEO audit on any URL (Robots.txt, AI crawler access, security headers, canonical tag, and Schema.org structured data).',
    inputSchema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          description: 'URL to audit (e.g. "https://example.com").',
        },
      },
      required: ['url'],
    },
  },
  {
    name: 'seo_run_engine',
    description: 'Directly run any of the 89 specialist Python SEO analysis engines (e.g. robots_checker, validate_schema, eeat_signal_checker, sitemap_checker, answer_block_scanner [GEO/AEO], security_headers, canonical_checker, pagespeed, mobile_render_checker, internal_links, broken_links, image_audit).',
    inputSchema: {
      type: 'object',
      properties: {
        engine: {
          type: 'string',
          description: 'Name of the engine (e.g. "robots_checker", "validate_schema", "eeat_signal_checker", "answer_block_scanner", "security_headers", "canonical_checker", "sitemap_checker", "broken_links").',
        },
        args: {
          type: 'array',
          items: { type: 'string' },
          description: 'Arguments to pass to the engine (typically target URL: ["https://example.com"]).',
        },
      },
      required: ['engine', 'args'],
    },
  },

  // 10. AGI Brain & Multi-Agent Dispatch
  {
    name: 'brain_analyze',
    description: 'Run the Ultimate SEO AGI Brain: analyzes telemetry across GSC, GA4, GKP, GBP, and Local Geo-Intelligence to generate actionable executive recommendations.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'brain_dispatch',
    description: 'Dispatch an SEO mission to a specialist agent persona (sentinel, architect, geo, cro, authority) with verified acceptance criteria and CLI actions.',
    inputSchema: {
      type: 'object',
      properties: {
        agent: {
          type: 'string',
          enum: ['sentinel', 'architect', 'geo', 'cro', 'authority'],
          description: 'Specialist agent persona to dispatch.',
        },
        args: {
          type: 'array',
          items: { type: 'string' },
          description: 'Optional arguments or URL for the specialist mission.',
        },
      },
      required: ['agent'],
    },
  },
];

// ---------------------------------------------------------------------------
// Model Context Protocol (MCP) Server Implementation
// ---------------------------------------------------------------------------
export function runMcpServer() {
  process.stderr.write('=======================================================\n');
  process.stderr.write('  Devacia SEO AGI Master MCP Server Initializing...   \n');
  process.stderr.write(`  Registered Tools: ${toolsList.length}\n`);
  process.stderr.write('=======================================================\n');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  const sendResponse = (id, result) => {
    const msg = JSON.stringify({ jsonrpc: '2.0', id, result });
    process.stdout.write(msg + '\n');
  };

  const sendError = (id, code, message) => {
    const msg = JSON.stringify({ jsonrpc: '2.0', id, error: { code, message } });
    process.stdout.write(msg + '\n');
  };

  rl.on('line', async (line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    let req;
    try {
      req = JSON.parse(trimmed);
    } catch {
      return;
    }

    const { id, method, params } = req;

    try {
      if (method === 'initialize') {
        sendResponse(id, {
          protocolVersion: '2024-11-05',
          capabilities: { tools: {} },
          serverInfo: {
            name: 'devacia-seo-agi',
            version: '1.0.0',
          },
        });
      } else if (method === 'notifications/initialized') {
        // Notification, no reply needed
      } else if (method === 'ping') {
        sendResponse(id, {});
      } else if (method === 'tools/list') {
        sendResponse(id, { tools: toolsList });
      } else if (method === 'tools/call') {
        const { name, arguments: args = {} } = params || {};

        // -------------------------------------------------------------------
        // 1. Status & Diagnostics
        // -------------------------------------------------------------------
        if (name === 'seo_agi_status') {
          const gkpConf = loadGkpConfig();
          const gscStat = checkGscStatus();
          const ga4Stat = checkGa4Status();
          const gbpStat = checkGbpStatus();
          const skillEnginesCount = fs.existsSync(SKILL_SCRIPTS_DIR)
            ? fs.readdirSync(SKILL_SCRIPTS_DIR).filter(f => f.endsWith('.py')).length
            : 0;

          const report = {
            system: 'Devacia SEO AGI Master Engine',
            version: '1.0.0',
            googleKeywordPlanner: {
              configured: Boolean(gkpConf.developerToken && gkpConf.customerId),
              oauthAvailable: fs.existsSync(GKP_OAUTH_PATH) || gscStat.oauthFound,
              tokenAvailable: fs.existsSync(GKP_TOKEN_PATH),
              suggestAlgorithmReady: true,
            },
            googleSearchConsole: gscStat,
            googleAnalytics4: ga4Stat,
            googleBusinessProfile: gbpStat,
            agenticSkillEngines: {
              availableCount: skillEnginesCount,
              scriptsDir: SKILL_SCRIPTS_DIR,
            },
          };

          sendResponse(id, {
            content: [{ type: 'text', text: JSON.stringify(report, null, 2) }],
            isError: false,
          });
        }

        // -------------------------------------------------------------------
        // 2. Google Keyword Planner
        // -------------------------------------------------------------------
        else if (name === 'gkp_get_keyword_ideas') {
          const { keywords = [], url: urlSeed = null, geo = 'US', language = 'en', limit = 30 } = args;
          let results = [];
          const config = loadGkpConfig();

          if (config.developerToken && config.customerId && fs.existsSync(GKP_TOKEN_PATH)) {
            try {
              results = await fetchGoogleAdsKeywordIdeas({ keywords, urlSeed, geo, language });
            } catch (err) {
              process.stderr.write(`Google Ads API query note: ${err.message}. Using Live Suggest fallback...\n`);
            }
          }

          if (results.length === 0) {
            for (const kw of keywords) {
              const items = await expandKeywordsWithGoogle(kw, { geo, language, includeAlphabet: false });
              results.push(...items);
            }
          }

          sendResponse(id, {
            content: [{ type: 'text', text: JSON.stringify(results.slice(0, limit), null, 2) }],
            isError: false,
          });
        } else if (name === 'gkp_expand_keywords') {
          const { seed, geo = 'US', includeAlphabet = true } = args;
          const expanded = await expandKeywordsWithGoogle(seed, { geo, includeAlphabet });
          sendResponse(id, {
            content: [{ type: 'text', text: JSON.stringify(expanded, null, 2) }],
            isError: false,
          });
        } else if (name === 'gkp_cluster_keywords') {
          const { seed, geo = 'US' } = args;
          const expanded = await expandKeywordsWithGoogle(seed, { geo, includeAlphabet: true });
          const clusters = clusterKeywords(expanded, seed);
          sendResponse(id, {
            content: [{ type: 'text', text: JSON.stringify(clusters, null, 2) }],
            isError: false,
          });
        } else if (name === 'gkp_rank_blueprint') {
          const { targetKeyword, secondaryKeywords = [] } = args;
          const blueprint = generateRankBlueprint(targetKeyword, secondaryKeywords);
          sendResponse(id, {
            content: [{ type: 'text', text: blueprint.markdownBlueprint }],
            isError: false,
          });
        }

        // -------------------------------------------------------------------
        // 3. Google Search Console
        // -------------------------------------------------------------------
        else if (name === 'gsc_status') {
          const stat = checkGscStatus();
          sendResponse(id, {
            content: [{ type: 'text', text: JSON.stringify(stat, null, 2) }],
            isError: false,
          });
        } else if (name === 'gsc_audit') {
          try {
            const auditData = await runGscAudit();
            sendResponse(id, {
              content: [{ type: 'text', text: JSON.stringify(auditData, null, 2) }],
              isError: false,
            });
          } catch (err) {
            sendResponse(id, {
              content: [{ type: 'text', text: `GSC Audit failed: ${err.message}` }],
              isError: true,
            });
          }
        } else if (name === 'gsc_inspect_url') {
          try {
            const result = await runGscInspect(args.url);
            sendResponse(id, {
              content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
              isError: false,
            });
          } catch (err) {
            sendResponse(id, {
              content: [{ type: 'text', text: `GSC URL Inspection error: ${err.message}` }],
              isError: true,
            });
          }
        } else if (name === 'gsc_request_indexing') {
          try {
            const result = await runGscIndex(args.url);
            sendResponse(id, {
              content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
              isError: false,
            });
          } catch (err) {
            sendResponse(id, {
              content: [{ type: 'text', text: `GSC Index Request note: ${err.message}` }],
              isError: true,
            });
          }
        }

        // -------------------------------------------------------------------
        // 4. Google Analytics 4
        // -------------------------------------------------------------------
        else if (name === 'ga4_status') {
          const stat = checkGa4Status();
          sendResponse(id, {
            content: [{ type: 'text', text: JSON.stringify(stat, null, 2) }],
            isError: false,
          });
        } else if (name === 'ga4_traffic_audit') {
          try {
            const audit = await runGa4Audit(args.propertyId);
            sendResponse(id, {
              content: [{ type: 'text', text: JSON.stringify(audit, null, 2) }],
              isError: false,
            });
          } catch (err) {
            sendResponse(id, {
              content: [{ type: 'text', text: `GA4 Audit failed: ${err.message}` }],
              isError: true,
            });
          }
        } else if (name === 'ga4_events') {
          try {
            const events = await runGa4Events(args.propertyId);
            sendResponse(id, {
              content: [{ type: 'text', text: JSON.stringify(events, null, 2) }],
              isError: false,
            });
          } catch (err) {
            sendResponse(id, {
              content: [{ type: 'text', text: `GA4 Events query failed: ${err.message}` }],
              isError: true,
            });
          }
        } else if (name === 'ga4_organic_landing_pages') {
          try {
            const organic = await runGa4Organic(args.propertyId);
            sendResponse(id, {
              content: [{ type: 'text', text: JSON.stringify(organic, null, 2) }],
              isError: false,
            });
          } catch (err) {
            sendResponse(id, {
              content: [{ type: 'text', text: `GA4 Organic query failed: ${err.message}` }],
              isError: true,
            });
          }
        }

        // -------------------------------------------------------------------
        // 5. Google Business Profile
        // -------------------------------------------------------------------
        else if (name === 'gbp_status') {
          const stat = checkGbpStatus();
          sendResponse(id, {
            content: [{ type: 'text', text: JSON.stringify(stat, null, 2) }],
            isError: false,
          });
        } else if (name === 'gbp_audit') {
          try {
            await runGbpAudit();
            sendResponse(id, {
              content: [{ type: 'text', text: 'GBP Audit completed successfully. Telemetry logged.' }],
              isError: false,
            });
          } catch (err) {
            sendResponse(id, {
              content: [{ type: 'text', text: `GBP Audit error: ${err.message}` }],
              isError: true,
            });
          }
        } else if (name === 'gbp_locations') {
          try {
            await runGbpLocations();
            sendResponse(id, {
              content: [{ type: 'text', text: 'GBP Locations fetched.' }],
              isError: false,
            });
          } catch (err) {
            sendResponse(id, {
              content: [{ type: 'text', text: `GBP Locations error: ${err.message}` }],
              isError: true,
            });
          }
        } else if (name === 'gbp_reviews') {
          try {
            await runGbpReviews();
            sendResponse(id, {
              content: [{ type: 'text', text: 'GBP Reviews retrieved.' }],
              isError: false,
            });
          } catch (err) {
            sendResponse(id, {
              content: [{ type: 'text', text: `GBP Reviews error: ${err.message}` }],
              isError: true,
            });
          }
        }

        // -------------------------------------------------------------------
        // 6. Local Geo-Intelligence & UULE
        // -------------------------------------------------------------------
        else if (name === 'local_geo_audit') {
          try {
            const { location, service } = args;
            const intel = await harvestLocalIntelligence(location, service);
            sendResponse(id, {
              content: [{ type: 'text', text: JSON.stringify(intel, null, 2) }],
              isError: false,
            });
          } catch (err) {
            sendResponse(id, {
              content: [{ type: 'text', text: `Local Geo Intelligence error: ${err.message}` }],
              isError: true,
            });
          }
        }

        // -------------------------------------------------------------------
        // 7. SERP Architect & Zero-Truncation Auditor
        // -------------------------------------------------------------------
        else if (name === 'serp_audit_snippet') {
          const { title, description } = args;
          const audit = auditSnippet(title, description);
          sendResponse(id, {
            content: [{ type: 'text', text: JSON.stringify(audit, null, 2) }],
            isError: false,
          });
        } else if (name === 'serp_harvest_queries') {
          const { seed, geo = 'us' } = args;
          const queries = await harvestLiveQueries(seed, geo);
          sendResponse(id, {
            content: [{ type: 'text', text: JSON.stringify(queries, null, 2) }],
            isError: false,
          });
        }

        // -------------------------------------------------------------------
        // 8. Keyword Density & Safety
        // -------------------------------------------------------------------
        else if (name === 'kd_check') {
          const { title, targetKeyword } = args;
          const kd = checkKeywordDensity(title, targetKeyword);
          sendResponse(id, {
            content: [{ type: 'text', text: JSON.stringify(kd, null, 2) }],
            isError: false,
          });
        }

        // -------------------------------------------------------------------
        // 9. Multi-Vector Audit & 89 Python Specialist Engines
        // -------------------------------------------------------------------
        else if (name === 'seo_audit_url') {
          const { url: targetUrl } = args;
          const results = {};

          const checks = [
            { key: 'robots', script: 'robots_checker.py' },
            { key: 'securityHeaders', script: 'security_headers.py' },
            { key: 'canonical', script: 'canonical_checker.py' },
            { key: 'schema', script: 'validate_schema.py' },
          ];

          for (const c of checks) {
            const res = await executePythonScript(c.script, [targetUrl]);
            results[c.key] = res.output;
          }

          sendResponse(id, {
            content: [{ type: 'text', text: JSON.stringify(results, null, 2) }],
            isError: false,
          });
        } else if (name === 'seo_run_engine') {
          const { engine, args: engineArgs = [] } = args;
          const res = await executePythonScript(engine, engineArgs);
          sendResponse(id, {
            content: [{ type: 'text', text: res.output }],
            isError: !res.success,
          });
        }

        // -------------------------------------------------------------------
        // 10. AGI Brain
        // -------------------------------------------------------------------
        else if (name === 'brain_analyze') {
          const brainPath = path.join(ROOT_DIR, 'scripts', 'agi-brain.js');
          const proc = spawn('node', [brainPath, 'analyze'], {
            cwd: ROOT_DIR,
            shell: process.platform === 'win32',
          });

          let stdout = '';
          proc.stdout.on('data', d => { stdout += d.toString(); });
          proc.on('close', () => {
            sendResponse(id, {
              content: [{ type: 'text', text: stdout || 'Brain analysis completed.' }],
              isError: false,
            });
          });
        } else if (name === 'brain_dispatch') {
          const { agent, args: dispatchArgs = [] } = args;
          const brainPath = path.join(ROOT_DIR, 'scripts', 'agi-brain.js');
          const proc = spawn('node', [brainPath, 'dispatch', agent, ...dispatchArgs], {
            cwd: ROOT_DIR,
            shell: process.platform === 'win32',
          });

          let stdout = '';
          proc.stdout.on('data', d => { stdout += d.toString(); });
          proc.on('close', () => {
            sendResponse(id, {
              content: [{ type: 'text', text: stdout || `Mission dispatched to ${agent}.` }],
              isError: false,
            });
          });
        }

        // Unknown tool
        else {
          sendError(id, -32601, `Tool '${name}' not found.`);
        }
      } else {
        if (id !== undefined) {
          sendError(id, -32601, `Method '${method}' not supported.`);
        }
      }
    } catch (err) {
      if (id !== undefined) {
        sendError(id, -32603, err.message || 'Internal MCP server error');
      }
    }
  });

  process.stderr.write('Devacia SEO AGI Master MCP Server is listening on stdio.\n');
}

// Auto-run if executed directly
if (process.argv[1] && (path.resolve(process.argv[1]) === fileURLToPath(import.meta.url) || process.argv[1].endsWith('mcp-server.js'))) {
  runMcpServer();
}

export default runMcpServer;

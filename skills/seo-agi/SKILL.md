---
name: seo-agi
description: >-
  Autonomous Top-Tier SEO AGI Intelligence Suite. Orchestrates internal Google APIs (Google Keyword Planner, Search Console, GA4, GBP) with 89 deep audit & generative optimization engines (GEO/AEO, Schema, E-E-A-T, CWV).
---

# Devacia SEO AGI Master Skill

This skill transforms the agent into a top-tier SEO architect and growth strategist. It provides unified orchestration across 5 enterprise engines:
1. **Google Keyword Planner & Ranking Intelligence** (Volume, CPC, Intent, Clustering, Rank #1 Blueprints)
2. **Google Search Console** (Live crawl verification, indexing submission, impression & position analytics)
3. **Google Analytics 4** (Organic landing page performance, conversion funnels, event tracking)
4. **Google Business Profile** (Local search prominence, reviews, geographic rankings)
5. **Agentic SEO Analysis Subsystem** (89 specialized engines covering GEO/AEO, Schema.org, CWV, E-E-A-T, and backlinks)

---

## Unified Terminal Invocations

All capabilities can be run from the root directory using `node bin/seo-agi.js <command>`:

| Command | Capability | Output |
| :--- | :--- | :--- |
| `node bin/seo-agi.js status` | System & OAuth Diagnostic | Health audit across all 5 engines |
| `node bin/seo-agi.js plan "<topic>"` | End-to-End Blueprint | Discovers keywords, clusters topics, generates Rank #1 Markdown blueprint |
| `node bin/seo-agi.js audit <url>` | Multi-Vector Live Audit | Robots, security headers, canonicals, schema validation |
| `node bin/seo-agi.js kpi expand "<seed>"` | Zero-Auth Deep Expansion | 50-300+ long-tail keywords with intent and difficulty |
| `node bin/seo-agi.js kpi cluster "<seed>"` | Topical Clustering | Hub & spoke architecture, pillar pages, money service pages, FAQs |
| `node bin/seo-agi.js kpi export "<seed>"` | CSV Exporter | Clean CSV in `docs/seo-keywords/` |
| `node bin/seo-agi.js kpi ideas <seeds...>` | Google Ads Official Data | Exact search volume and CPC bid ranges (requires Ads token) |
| `node bin/seo-agi.js gsc audit` | GSC Verified Performance | Property clicks, impressions, CTR, average rankings |
| `node bin/seo-agi.js gsc inspect <url>` | URL Inspection | Crawl date, canonical status, mobile friendliness |
| `node bin/seo-agi.js gsc index <url>` | Instant Index Request | Submits URL directly to search engine queue |
| `node bin/seo-agi.js ga4 audit` | GA4 30-Day Snapshot | Total users, sessions, pageviews, bounce rate |
| `node bin/seo-agi.js ga4 organic` | Organic Search Breakdown | Top organic traffic landing pages |
| `node bin/seo-agi.js gbp audit` | GBP Local Performance | Local search impressions, reviews, ratings |
| `node bin/seo-agi.js skill <tool> <url>` | 89 Python Analysis Engines | `robots`, `sitemap`, `schema`, `technical`, `geo`, `aeo`, `eeat`, `links` |

---

## Autonomous Agent Decision Rubric

When tasked with auditing or growing a web property:
1. **Analyze Live Reality**: Run `gsc audit` and `ga4 organic` to evaluate historical traffic and real SERP positions.
2. **Diagnose Crawlability & Health**: Run `node bin/seo-agi.js audit <url>` and `skill robots <url>` to uncover crawl blocks or indexing blockers.
3. **Expand & Cluster Demand**: Run `node bin/seo-agi.js plan "<core topic>"` to capture the target market's full keyword taxonomy.
4. **Engineer Rank #1 Content**: Use the generated blueprint in `docs/seo-keywords/` containing JSON-LD schema, H1-H3 structure, and entity checklists.
5. **Request Indexing**: Once deployed, run `gsc index <url>` to trigger Googlebot crawl.

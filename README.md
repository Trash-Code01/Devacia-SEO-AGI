# 🦅 Devacia SEO AGI — Autonomous Intelligence Engine

> **Industrial-Grade Search Engine Optimization, Generative Engine Optimization (GEO), and Autonomous Enterprise Market Dominance System.**

Devacia SEO AGI unifies enterprise Google APIs (Search Console, Analytics 4, Business Profile, Keyword Planner) with an 89-engine automated analysis framework. It delivers both an **Autonomous Terminal CLI** and a **Native Model Context Protocol (MCP) Server** exporting 25 specialist SEO tools for Antigravity, Claude Code, Cursor, and Windsurf.

---

## ⚡ Architecture Overview

```
                      ┌────────────────────────────────────────┐
                      │          DEVACIA SEO AGI MASTER        │
                      │             (bin/seo-agi.js)           │
                      └───────────────────┬────────────────────┘
                                          │
    ┌──────────────────┬──────────────────┼──────────────────┬──────────────────┐
    ▼                  ▼                  ▼                  ▼                  ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────────────┐
│  Google Ads  │ │ Google Search│ │   Google     │ │ Google Biz   │ │ Agentic SEO Engine   │
│KeywordPlanner│ │   Console    │ │ Analytics 4  │ │   Profile    │ │ (89 Analysis Engines)│
├──────────────┤ ├──────────────┤ ├──────────────┤ ├──────────────┤ ├──────────────────────┤
│• Ads API v18 │ │• URL Inspect │ │• Traffic Hub │ │• Local SEO   │ │• Technical Audits    │
│• Suggest Alg │ │• Live Index  │ │• Conversions │ │• Reviews     │ │• Schema.org JSON-LD  │
│• Clustering  │ │• SERP Clicks │ │• Organic Hub │ │• Geo Promin. │ │• GEO & AEO Scanners  │
│• Rank #1 Plan│ │• Crawl Errors│ │• Attribution │ │• Map Posts   │ │• E-E-A-T Scoring     │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────────────┘
```

---

## 🚀 Installation & Quick Start

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/YOUR_USERNAME/devacia-seo-agi.git
cd devacia-seo-agi

# Install Node.js dependencies
npm install

# Install Python 89-engine dependencies
pip install -r requirements.txt
```

### 2. Configure for Your Domain & APIs

Run the interactive setup wizard:

```bash
npm run setup
```

Or copy the environment template:

```bash
cp .env.example .env
```

*(See [CONFIGURATION.md](./CONFIGURATION.md) for complete step-by-step Google Cloud OAuth instructions.)*

### 3. Verify Engine Health & Diagnostics

Check the connection and readiness of all 5 subsystems:

```bash
node bin/seo-agi.js status
# or
npm run start
```

### 4. Run an End-to-End Strategic SEO Blueprint

Automatically performs deep keyword expansion, topical clustering (Pillar & Clusters), and writes a production-ready Rank #1 Semantic Content Blueprint with Schema.org JSON-LD:

```bash
node bin/seo-agi.js plan "b2b web design agency"
```
*Outputs saved directly to `docs/seo-keywords/rank-plan-<slug>.md`!*

### 5. Run a Live Multi-Vector Audit

Audits robots.txt, AI crawler policies (GPTBot, ClaudeBot, Perplexity), security headers, canonicalization, and Schema markup on any URL:

```bash
node bin/seo-agi.js audit https://www.yourdomain.com
```

---

## 🛠️ Subsystem Commands

### 🎯 1. Google Keyword Planner & SERP Architect (`kpi`)
```bash
# Instant deep keyword expansion (Zero-Auth, 50-300+ long-tail terms)
node bin/seo-agi.js kpi expand "ai agents development" --geo=US

# Topical clustering (Pillars, Money service pages, Comparison, FAQs)
node bin/seo-agi.js kpi cluster "enterprise web application"

# Generate Rank #1 Blueprint (H1-H3 Semantic Heading, Schema.org, Entity Checklist)
node bin/seo-agi.js kpi plan "b2b web design agency"

# Export keyword dataset to clean CSV
node bin/seo-agi.js kpi export "saas development agency"

# Official Google Ads monthly volume & CPC bid ranges (Requires Ads token)
node bin/seo-agi.js kpi ideas "web design" "seo services" --geo=US
```

### 🔍 2. Google Search Console Engine (`gsc`)
```bash
# Audit property performance (Clicks, Impressions, CTR, Average Position)
node bin/seo-agi.js gsc audit

# Inspect real-time Google indexing state of a URL
node bin/seo-agi.js gsc inspect https://www.yourdomain.com/pricing

# Dispatch direct indexing request to Googlebot queue
node bin/seo-agi.js gsc index https://www.yourdomain.com/blog/ai-search-optimization
```

### 📊 3. Google Analytics 4 Engine (`ga4`)
```bash
# 28-day traffic audit (Users, Sessions, Pageviews, Bounce Rate)
node bin/seo-agi.js ga4 audit

# Audit key conversion events & lead attribution
node bin/seo-agi.js ga4 events

# Organic search breakdown by landing page
node bin/seo-agi.js ga4 organic
```

### 📍 4. Google Business Profile Local SEO (`gbp`)
```bash
# Local search visibility, rating, and review metrics
node bin/seo-agi.js gbp audit

# List verified business profile locations
node bin/seo-agi.js gbp locations

# Inspect customer reviews and sentiment
node bin/seo-agi.js gbp reviews
```

### 📍 5. Hyper-Local Geo-Intelligence & UULE (`local`)
```bash
# Harvest real-time localized query behavior standing in any US state/metro or Indian city
node bin/seo-agi.js local "California" "Custom Software"
node bin/seo-agi.js local "Austin, Texas" "Web Development"
node bin/seo-agi.js local "Delhi NCR" "B2B Web Design"
```

### 📐 6. SERP Architect & Zero-Truncation Titles (`titles`)
```bash
# Audit Title (< 60ch) & Meta (< 155ch) pixel math for zero desktop/mobile truncation
node bin/seo-agi.js titles
```

### ⚡ 7. Agentic SEO Python Analysis Subsystem (`skill`)
89 specialized diagnostic engines:
```bash
# Audit robots.txt and AI Crawler access (GPTBot, PerplexityBot, ClaudeBot)
node bin/seo-agi.js skill robots https://www.yourdomain.com

# XML Sitemap validation & broken index links
node bin/seo-agi.js skill sitemap https://www.yourdomain.com/sitemap.xml

# Schema.org structured data extraction and validation
node bin/seo-agi.js skill schema https://www.yourdomain.com

# Security headers, HSTS, and transport layer verification
node bin/seo-agi.js skill security https://www.yourdomain.com

# Generative Engine Optimization (GEO) & Answer Engine Optimization (AEO)
node bin/seo-agi.js skill geo https://www.yourdomain.com/blog/sample-post
```

---

## 🤖 Model Context Protocol (MCP) Server

Devacia SEO AGI provides a unified Model Context Protocol (MCP) stdio server exposing **25 tools** across all subsystems:

Start the server:
```bash
npm run mcp
# or
node scripts/mcp-server.js
```

### Agent Configuration Examples

#### Google Antigravity (`~/.gemini/config/mcp_config.json`)
```json
{
  "mcpServers": {
    "devacia-seo-agi": {
      "command": "node",
      "args": ["<PATH_TO_DEVACIA_SEO_AGI>/scripts/mcp-server.js"]
    }
  }
}
```

#### Cursor (`.cursor/mcp.json`)
```json
{
  "mcpServers": {
    "devacia-seo-agi": {
      "command": "node",
      "args": ["${workspaceFolder}/scripts/mcp-server.js"]
    }
  }
}
```

#### Claude Code / Claude Desktop (`~/.claude/mcp.json`)
```json
{
  "mcpServers": {
    "devacia-seo-agi": {
      "command": "node",
      "args": ["<PATH_TO_DEVACIA_SEO_AGI>/scripts/mcp-server.js"]
    }
  }
}
```

---

## 📦 Programmatic Node.js API

Devacia SEO AGI can be imported as an ES Module in any Node.js application:

```javascript
import { gkp, gsc, ga4, gbp, brain, localGeo, serpArchitect } from 'devacia-seo-agi';

// Long-tail keyword expansion with alphabet permutations
const keywords = await gkp.expandKeywordsWithGoogle('b2b web design', { geo: 'US' });

// Audit snippet title & meta pixel length
const snippetAudit = serpArchitect.auditSnippet(
  'Best Web Development Services | Devacia',
  'Custom software engineering, modern web applications, and generative AI search dominance.'
);

// Run local geo intelligence simulation
const localIntel = await localGeo.harvestLocalIntelligence('California', 'Web Design');
```

---

## 📁 Repository Directory Structure

```
Devacia-SEO-AGI/
├── bin/
│   └── seo-agi.js              # Unified Master Terminal CLI
├── scripts/
│   ├── mcp-server.js           # Unified Master MCP Server (25 Tools)
│   ├── setup-wizard.js         # Interactive CLI Setup Wizard
│   ├── env-loader.js           # Zero-dependency .env Loader
│   ├── gkp-cli.js              # Google Keyword Planner & SERP Engine
│   ├── gsc-cli.js              # Google Search Console Engine
│   ├── ga4-cli.js              # Google Analytics 4 Engine
│   ├── gbp-cli.js              # Google Business Profile Engine
│   ├── local-geo-intelligence.js # UULE Local Search Simulator
│   ├── serp-architect.js       # Zero-Truncation Title/Meta Engine
│   └── agi-brain.js            # Multi-Agent Specialist Dispatcher
├── skills/
│   └── seo/                    # Agentic SEO Framework (89 Python engines)
├── docs/
│   ├── GOOGLE_KEYWORD_PLANNER_GUIDE.md
│   └── seo-keywords/           # Discovered keyword CSVs & Rank Plans
├── .env.example                # Environment variables template
├── google-oauth.example.json   # Unified OAuth credentials template
├── CONFIGURATION.md            # Complete API & Assistant setup guide
├── index.js                    # Programmatic Node.js entrypoint
└── package.json
```

---

## 📄 License

MIT © [Devacia](https://www.devacia.com)

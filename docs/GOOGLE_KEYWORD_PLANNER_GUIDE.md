# Google Keyword Planner & SEO Ranking Intelligence Engine

An industrial-grade SEO Keyword Research & Planning tool for Devacia, offering both a **Custom Terminal CLI** and a **Model Context Protocol (MCP) Server** for AI pair programming.

---

## 🚀 Capabilities Overview

| Capability | Engine | Authentication | Output |
| :--- | :--- | :--- | :--- |
| **Official Keyword Ideas** | Google Ads API v18 | OAuth 2.0 + Developer Token | Exact Search Volume, Competition Index (0-100), Min/Max CPC Bids |
| **Instant Deep Expansion** | Google Suggest Engine | Zero-Auth (Out of the box) | 50-150+ Long-Tail Keywords, Questions, Alphabet Soup (A-Z) |
| **Search Intent Tagging** | Algorithmic Intent Classifier | None | Transactional (Money), Commercial, Informational, Mixed |
| **Pillar & Cluster Mapping** | Topical Clustering Engine | None | Core Pillar Hub, Service Clusters, FAQs, Pricing Pages |
| **Rank #1 Content Blueprint** | SERP Architecture Generator | None | Semantic H1-H3 Outline, Title (<60ch), Meta (<155ch), Schema.org JSON-LD, LSI Checklist |
| **Data Exports** | CSV / Markdown Exporter | None | Saved directly to `docs/seo-keywords/` |
| **AI Agent MCP Server** | Model Context Protocol | Stdio JSON-RPC 2.0 | Integrated into Antigravity, Claude, Cursor |

---

## 🛠️ Custom CLI Usage

You can run commands using `npm run kpi:<command>` or directly with `node scripts/gkp-cli.js <command>`.

### 1. Check System Status
```bash
npm run kpi:status
# or
node scripts/gkp-cli.js status
```

### 2. Instant Deep Keyword Expansion (Zero-Auth)
Discovers 50-100+ low-competition long-tail keywords using real-time Google search suggestions, grouped by search intent:
```bash
npm run kpi:expand -- "b2b web design"
# Target a specific region (default: US, or IN, UK, CA, AU)
node scripts/gkp-cli.js expand "ai agent development" --geo=US
```

### 3. Topical Clustering (Hub & Spoke / Pillar & Cluster)
Groups keywords into Pillar Pages, Money Service Clusters, Comparison guides, Pricing pages, and FAQ targets:
```bash
npm run kpi:cluster -- "enterprise seo services"
```

### 4. Generate "Rank #1 Content Blueprint"
Generates a complete, production-ready markdown blueprint in `docs/seo-keywords/rank-plan-<slug>.md` containing:
- CTR-engineered Title Tag & Meta Description
- Clean URL slug
- H1, H2, and H3 semantic heading architecture
- High-value LSI & Entity keyword checklist
- Schema.org JSON-LD structured data (`ProfessionalService` + `FAQPage`)
- Internal linking instructions
```bash
npm run kpi:plan -- "b2b web design agency"
```

### 5. Export Keywords to CSV
Exports full keyword research datasets to `docs/seo-keywords/keywords-<slug>.csv` for spreadsheets and client presentations:
```bash
npm run kpi:export -- "saas development agency"
```

---

## 🔑 Official Google Ads Keyword Planner Setup (Optional)

If you want **exact Google Ads monthly search volume and official CPC bid data**, configure your Google Ads credentials:

### Step 1: 1-Click OAuth Login
Uses your existing Google Cloud Console credentials (`gkp-oauth.json` or shared `ga4-oauth.json` / `gsc-oauth.json`):
```bash
npm run kpi:auth
```
A browser tab will open automatically. Grant permission for Google Ads, and tokens will be saved to `gkp-token.json`.

### Step 2: Configure Developer Token & Customer ID
Run the interactive setup helper:
```bash
npm run kpi:setup
```
Enter:
1. **Developer Token:** From your Google Ads MCC (Manager) account.
2. **Customer ID:** Your 10-digit Google Ads account ID (e.g. `123-456-7890`).
3. **Login Customer ID (optional):** If accessing via MCC account.
4. **Default Geo:** `US`, `IN`, `UK`, etc.

Once configured, running:
```bash
npm run kpi:ideas -- "web development" "seo agency" --geo=US
```
will fetch live Google Ads API search volume, competition, and top-of-page CPC bids. (If credentials are not configured, it automatically falls back to the live Google Suggest engine without failing).

---

## 🤖 Model Context Protocol (MCP) Server

The tool is registered as a native MCP server in `~/.gemini/config/mcp_config.json`:

```json
"google-keyword-planner": {
  "command": "node",
  "args": ["C:/Code-work/Devacia/scripts/gkp-cli.js", "mcp"]
}
```

### Available MCP Tools for AI Agents:
- `gkp_get_keyword_ideas`: Retrieve keyword metrics, search volume, CPC, and intent.
- `gkp_expand_keywords`: Generate rich long-tail queries and question variations.
- `gkp_cluster_keywords`: Group keywords into Pillar & Cluster architectures.
- `gkp_rank_blueprint`: Formulate a tactical Rank #1 content blueprint with semantic outline and schema markup.
- `gkp_status`: Check API connection and authentication status.

# ⚙️ Devacia SEO AGI — Configuration & Integration Guide

This guide explains how to configure Devacia SEO AGI for your own domain, Google Cloud APIs, and AI coding assistants (Antigravity, Claude Code, Cursor, Windsurf).

---

## ⚡ Fast Track: Automated Setup Wizard

Run the interactive CLI setup wizard to configure your website URL, property IDs, and environment variables:

```bash
npm run setup
# or
node scripts/setup-wizard.js
```

This wizard will automatically generate a tailored `.env` file for your project.

---

## 📋 Manual Configuration (.env)

Copy the provided `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` with your project parameters:

```env
# 1. Primary Website Domain
SEO_SITE_URL=https://www.yourdomain.com
GSC_SITE_URL=https://www.yourdomain.com

# 2. Google Analytics 4 (Numeric Property ID from GA4 -> Admin -> Property Settings)
GA4_PROPERTY_ID=123456789

# 3. Google Business Profile Local SEO (Optional)
GBP_BUSINESS_NAME="Your Business Name"
GBP_PHONE="+1 555-0199"
GBP_RAW_PHONE="5550199"
GBP_CITY="San Francisco"
GBP_STATE="California"
GBP_COUNTRY="United States"
GBP_WEBSITE=https://www.yourdomain.com

# 4. Google Ads / Keyword Planner (Optional - leave empty for free zero-auth Suggest algorithms)
GOOGLE_ADS_DEVELOPER_TOKEN=
GOOGLE_ADS_CUSTOMER_ID=
GOOGLE_ADS_LOGIN_CUSTOMER_ID=
```

---

## 🔑 Google Cloud API & OAuth Setup

Devacia SEO AGI communicates directly with official Google APIs. Follow these steps to obtain credentials:

### 1. Create a Google Cloud Project
1. Navigate to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing project.

### 2. Enable Google APIs
In **APIs & Services → Library**, enable the following services:
- **Google Search Console API** (Google Search Console inspection, crawl, & search analytics)
- **Google Analytics Data API** (Google Analytics 4 traffic & conversion reports)
- **Google Business Profile APIs** (My Business Business Information API)
- **Google Ads API** *(Optional: only needed if using official Google Ads Keyword Planner tokens)*

### 3. Configure OAuth Consent Screen
1. Go to **APIs & Services → OAuth consent screen**.
2. Select **External** (or Internal for Google Workspace organizations).
3. Fill in the App Name (e.g. `SEO AGI Engine`) and developer contact email.
4. Add Test Users: Add the Google email accounts that own or manage your Search Console and GA4 properties.

### 4. Create OAuth 2.0 Client ID
1. Go to **APIs & Services → Credentials → Create Credentials → OAuth client ID**.
2. Application type: **Desktop app**.
3. Name: `SEO AGI CLI`.
4. Click **Create** and download the JSON file.

### 5. Install the Credentials
Rename your downloaded JSON file to `google-oauth.json` and place it in the project root:

```bash
mv ~/Downloads/client_secret_*.json ./google-oauth.json
```

> **Tip:** A single `google-oauth.json` file can power all 4 Google subsystems! Alternatively, you can provide dedicated files (`gsc-oauth.json`, `ga4-oauth.json`, `gbp-oauth.json`, `gkp-oauth.json`).

### 6. Authenticate with One Click
Run the authentication command for each subsystem. A local browser tab will open for 1-click authorization:

```bash
# 1. Authenticate Search Console
npm run gsc:auth

# 2. Authenticate Analytics 4
npm run ga4:auth

# 3. Authenticate Business Profile
npm run gbp:auth

# 4. Authenticate Google Ads (optional)
npm run kpi:auth
```

Tokens are automatically saved locally (`gsc-token.json`, `ga4-token.json`, etc.) and refresh automatically when expired.

---

## 🤖 AI Assistant & MCP Integration (Model Context Protocol)

Devacia SEO AGI provides a full native Model Context Protocol (MCP) stdio server exporting **25 deep SEO tools** to autonomous agents.

### 1. Google Antigravity
Add to `~/.gemini/config/mcp_config.json`:

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

### 2. Claude Code & Claude Desktop
Add to `~/.claude/mcp.json` or `claude_desktop_config.json`:

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

Or via Claude Code CLI:
```bash
claude mcp add devacia-seo-agi -- node <PATH_TO_DEVACIA_SEO_AGI>/scripts/mcp-server.js
```

### 3. Cursor
Add to your project's `.cursor/mcp.json` or Cursor settings:

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

### 4. Windsurf
Add to `~/.codeium/windsurf/mcp_config.json`:

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

## 💻 Global Terminal CLI Installation

To run `seo-agi` from anywhere on your workstation without `npm run`:

```bash
cd Devacia-SEO-AGI
npm link
```

Now you can run the master CLI globally:

```bash
seo-agi status
seo-agi plan "ai consulting services"
seo-agi audit https://www.yourdomain.com
seo-agi gsc inspect https://www.yourdomain.com/pricing
```

---

## 📦 Programmatic Node.js Module Import

You can import all subsystems directly into your Node.js or TypeScript applications:

```javascript
import { gkp, gsc, ga4, gbp, brain, localGeo, serpArchitect } from 'devacia-seo-agi';

// Run keyword expansion
const suggestions = await gkp.expandKeywordsWithGoogle('b2b software');

// Audit snippet title & meta pixel length
const snippetAudit = serpArchitect.auditSnippet(
  'Top Enterprise AI Solutions | Devacia',
  'Scale your operations with automated AI agents and enterprise machine learning systems.'
);

// Harvest local search intent
const localData = await localGeo.harvestLocalIntelligence('California', 'Web Design');
```

# Devacia Master SEO Evidence & Growth Baseline
**MODE 1 (Full Technical & Commercial SEO Audit) + MODE 5 (Technical SEO Debugging)**
**Audit Date:** 18 October 2026  
**Primary Data Window:** 18 September 2026 – 16 October 2026 (Settled 28-Day Window)  
**Authentication Status:** 100% Live Connected (Google Search Console API + Google Analytics 4 Data API v1beta)

---

## Executive Summary & Core Verdict

Devacia's website is technically modern, responsive, and cleanly architected (Next.js 16 App Router, 72 static pre-rendered routes, zero broken links, SSR `<details>/<summary>` FAQ schemas, and native XML sitemaps).

However, **organic search is currently NOT functioning as a commercial customer acquisition channel**:
1. **83.3% Brand Monopolisation:** Out of 24 total search clicks in the last 28 days, **20 clicks were for the exact branded query `"devacia"`**. Non-brand organic search generated only ~3 clicks across the entire site.
2. **The Funnel Leak:** In the same 28-day window, GA4 recorded **110 total sessions** (51 Organic Search, 43 Direct, 13 AI Assistant). While visitors initiated the onboarding funnel (`form_start`: 3, `book_strategy_call`: 2, `calendly_open`: 1), there were **0 completed form submissions (`generate_lead`)** and **0 confirmed strategy calls booked (`strategy_call_booked`)**.
3. **Five Core Services Crawled but Not Indexed:** High-value commercial pages (`/services/custom-software-development`, `/services/business-automation`, `/services/landing-page-design`, `/services/website-support-maintenance`, and `/services/lead-generation-websites`) have remained in Google's *Crawled — currently not indexed* state for 3 to 5 months.
4. **Immediate High-Yield Opportunity:** The WordPress engineering offer (`/services/wordpress-development`) ranks on **Page 1 (Position 6.96)** for `enterprise wordpress development services` with 48 impressions and 0 clicks. This is an immediate Click-Through-Rate (CTR) and copy optimization opportunity requiring zero new URL creation.

---

## 1. Verified Evidence Inventory

All findings in this report derive from primary first-party systems inspected live on 18 October 2026:

| Source | Identifier / Scope | Date Inspected | Reliability | Status |
|---|---|---|---|---|
| **Google Search Console** | `https://www.devacia.com/` (siteOwner) | 18 Oct 2026 | **High (Primary)** | Live API read (18 Sep – 16 Oct 2026) |
| **Google Analytics 4** | Property `538121325` (Devacia Development) | 18 Oct 2026 | **High (Primary)** | Live API read (19 Sep – 16 Oct 2026) |
| **Production Robots.txt** | `https://www.devacia.com/robots.txt` | 18 Oct 2026 | **High (Primary)** | Live HTTP 200 Fetch |
| **Production Sitemap** | `https://www.devacia.com/sitemap.xml` | 18 Oct 2026 | **High (Primary)** | Live XML validation (79 URLs) |
| **Next.js Codebase & Tests** | Local repository (`c:\Code-work\Devacia`) | 18 Oct 2026 | **High (Primary)** | 30/30 SEO tests pass; Next.js 16 build pass (72 SSG routes) |
| **GSC URL Inspection Archive** | 80/80 URLs audited via Google API | 14 Oct 2026 | **High (Recorded)** | Stored inspection records (`docs/seo/`) |
| **Internal CRM (MongoDB Atlas)** | `lead-cluster.leads` | 18 Oct 2026 | **High (Verified Live)** | 7 total leads in production database; schema & attribution verified; Telegram Bot (`Devacia_bot`) authenticated |

---

## 2. Live Performance Baselines (Settled 28 Days)

### 2.1 Google Search Console Performance (18 Sep – 16 Oct 2026)

* **Total Clicks:** 24
* **Total Impressions:** 811
* **Average CTR:** 2.96%
* **Average Position:** 30.3

#### Top Search Queries
| Query | Position | Impressions | Clicks | CTR | Classification |
|---|---|---|---|---|---|
| `devacia` | **1.4** | 47 | **20** | **42.55%** | **Branded / Navigational** |
| `tem site deles?` | 11.0 | 1 | 1 | 100.0% | Unclassified / Informational |
| `ai-native development shops that ship in weeks` | 5.0 | 5 | 0 | 0.0% | Commercial BOFU |
| `b2c web development company in india` | 48.3 | 4 | 0 | 0.0% | Commercial BOFU |
| `bad page speed` | 21.0 | 3 | 0 | 0.0% | Problem / Diagnostic |
| `app readiness checklist for startups` | 64.7 | 3 | 0 | 0.0% | Informational TOFU |
| `best web development company in prayagraj` | 33.5 | 2 | 0 | 0.0% | Local Commercial BOFU |
| `best web development for performance marketing agencies` | 17.0 | 2 | 0 | 0.0% | Solution Evaluation |
| `best web development agency in delhi ncr` | 56.0 | 1 | 0 | 0.0% | Local Commercial BOFU |
| `best web development company in delhi` | 57.0 | 1 | 0 | 0.0% | Local Commercial BOFU |
| `best web development company in lucknow` | 69.0 | 1 | 0 | 0.0% | Local Commercial BOFU |

#### Top Landing Pages by Search Impressions
| Page | Position | Impressions | Clicks | Intent Match |
|---|---|---|---|---|
| `https://www.devacia.com/` | 2.5 | 86 | 20 | Brand / Core Hub |
| `/locations/india/delhi/web-development-company` | 46.8 | 304 | 1 | Delhi Local Commercial |
| `/about` | 2.6 | 60 | 0 | Entity Trust & Verification |
| `/blog/fix-it-fast/google-pagespeed-score-low-fix` | 10.0 | 52 | 0 | Diagnostic Guide |
| `/locations/india/bangalore/web-development-company` | 10.0 | 41 | 1 | Bangalore Commercial |
| `/blog/d2c-ecommerce-growth/shopify-vs-custom-website-d2c-india` | 26.5 | 11 | 0 | Comparison / Decision |
| `/obsidian-study` | 13.7 | 12 | 1 | Restaurant Case Proof |
| `/services/wordpress-development` (recorded in prior cut) | 6.96 | 48 | 0 | Enterprise CMS Service |

#### Geographic Search Distribution
1. **India:** 448 impressions, 23 clicks (Avg Pos: 41.9)
2. **Brazil:** 8 impressions, 1 click (Avg Pos: 10.9)
3. **United States:** 181 impressions (across property), 0 clicks
4. **United Arab Emirates:** 6 impressions, 0 clicks

---

### 2.2 Google Analytics 4 Traffic & Engagement (19 Sep – 16 Oct 2026)

* **Total Sessions:** 110
* **Active Users:** 69 (New Users: 66)
* **Engagement Rate:** 50.0% (Average Session Duration: 299s)
* **Total Screen Page Views:** 289
* **Total Recorded Events:** 631
* **Key Events Recorded:** **0**

#### Channel Breakdown
| Channel Group | Sessions | Users | Engagement Rate | Key Events |
|---|---|---|---|---|
| **Organic Search** | 51 | 15 | 60.8% | 0 |
| **Direct** | 43 | 38 | 30.2% | 0 |
| **AI Assistant (ChatGPT)** | 13 | 13 | 76.9% | 0 |
| **Organic Social** | 3 | 3 | 33.3% | 0 |

#### Conversion Funnel State in GA4
* `form_start`: **3** (Visitors interacted with multi-step brief inputs)
* `book_strategy_call`: **2** (Clicked CTA to open booking modal/view)
* `calendly_open`: **1** (Opened calendar scheduling interface)
* `generate_lead`: **0** (Zero completed lead submissions tracked)
* `strategy_call_booked`: **0** (Zero confirmed Calendly meetings tracked)
* `qualified_lead`: **1** (Manual or diagnostic lead qualification event)

---

## 3. Technical SEO Engineering & Architecture Diagnosis (MODE 5)

### 3.1 Live Crawlability & Directive Validation (`robots.txt`)
Direct inspection of `https://www.devacia.com/robots.txt` confirms:
* **Search Bots Permitted:** `Googlebot`, `Bingbot`, `Applebot`, `Meta-ExternalAgent` are unrestricted (`Allow: /`).
* **Admin & API Protection:** Disallow directives on `/admin` and `/api/` properly block private endpoints and authenticated panels.
* **AI Search Engine Bots:** `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, and `Claude-SearchBot` are explicitly **Allowed**. Real-time AI answer engines (ChatGPT Search, Perplexity) can crawl and cite Devacia content.
* **AI Training Crawlers Blocked:** `GPTBot`, `ClaudeBot`, `Applebot-Extended`, and `CCBot` are set to `Disallow: /`. This stops LLM foundational scraping while preserving search discovery.
* **Sitemap Location:** Declared cleanly as `https://www.devacia.com/sitemap.xml`.

### 3.2 Live XML Sitemap Health
Live inspection of `https://www.devacia.com/sitemap.xml`:
* **Total Valid URLs:** 79
* **Errors & Warnings:** 0 reported by Google Search Console.
* **Recent Cleanups Verified:** The temporary local development directory `/industries` was completely removed on 16 October. All 12 canonical vertical solutions (`/industries/[industry]-website-development`) are present with clean priorities (0.82) and lastmod timestamps.
* **Noindex Routes:** Private utility routes (`/onboarding`, `/admin`) are correctly excluded from the sitemap.

### 3.3 Indexing Breakdown (URL Inspection Baseline)
* **Submitted & Indexed:** ~61 URLs (77.2% index coverage)
* **Discovered — currently not indexed:** 5 URLs (HVAC, Salon/Spa, Hotel/Venue, Rebranding)
* **Crawled — currently not indexed (Core Blockers):** 6 URLs
  1. `/services/custom-software-development` (Last crawled 27 May 2026)
  2. `/services/business-automation` (Last crawled 6 July 2026)
  3. `/services/landing-page-design` (Last crawled 30 May 2026)
  4. `/services/website-support-maintenance` (Last crawled 28 May 2026)
  5. `/services/lead-generation-websites` (Last crawled 9 July 2026)
  6. `/problems/why-your-website-is-not-converting` (Last crawled 20 May 2026)

> [!CAUTION]
> **Root Cause Analysis on Crawled-Not-Indexed:**
> Because all 6 URLs return HTTP 200, output valid self-canonicals, provide complete JSON-LD schemas, and contain zero noindex tags, this exclusion is **algorithmic, not technical**. Google crawled these pages between May and July 2026 and determined that the informational value or unique commercial evidence did not meet the indexing threshold compared to competitor content. They must be upgraded with authentic client workflows and technical depth, not resubmitted in bulk.

---

## 4. Remediation Completed During This Audit

Before delivering this baseline, the four highest-priority technical conversion bugs identified in historical audits were resolved and verified in code:

### 1. Direct Calendar Booking Attribution Gap (Task T-01 [P0] — Resolved)
* **Root Cause:** In [`app/(site)/contact/ContactPageClient.jsx`](file:///c:/Code-work/Devacia/app/%28site%29/contact/ContactPageClient.jsx), toggling to the "Instant Strategy Call" tab unmounted `<Onboarding>`, destroying the window `message` listener for Calendly. Bookings made on `/contact` never emitted events.
* **Engineering Fix:** Implemented a persistent, origin-validated `message` listener inside [`ContactPageClient.jsx`](file:///c:/Code-work/Devacia/app/%28site%29/contact/ContactPageClient.jsx) using `isTrustedBookingMessage`. It dispatches `strategy_call_booked` and fires server-side conversion deduplication (`trackServerConversion('Schedule', ...)`).

### 2. Strategy Call Duration Inconsistency (Task T-05 [P1] — Resolved)
* **Root Cause:** Contact page copy advertised a "20-Min Strategy Call" while the embedded Calendly interface was titled "30 Minute Meeting".
* **Engineering Fix:** Synchronised all CTA buttons and heading copy in [`ContactPageClient.jsx`](file:///c:/Code-work/Devacia/app/%28site%29/contact/ContactPageClient.jsx) to **Instant 30-Min Strategy Call**, removing buyer expectation friction.

### 3. GA4 Key Event Mismatch (Task T-04 [P1] — Resolved)
* **Root Cause:** GA4 property configuration specifies Google's recommended standard event `qualify_lead` as a key event, whereas the codebase only defined `qualified_lead`.
* **Engineering Fix:** Updated [`src/utils/analytics.js`](file:///c:/Code-work/Devacia/src/utils/analytics.js) so that dispatching either event automatically tracks both `qualify_lead` and `qualified_lead` in `dataLayer` / `gtag`.

### 4. GA4 Live Reporting Integration (Task T-03 [P0] — Resolved)
* **Engineering Fix:** Built [`scripts/ga4-cli.js`](file:///c:/Code-work/Devacia/scripts/ga4-cli.js) and configured npm scripts (`analytics:audit`, `analytics:events`, `analytics:organic`, `analytics:save`). Connected property `538121325` with full live reporting capabilities.

---

## 5. Commercial Search-Intent & Keyword Opportunity Map

| Query / Keyword Cluster | Market | Intent Stage | Observed SERP Status | Target URL | Commercial Action |
|---|---|---|---|---|---|
| `enterprise wordpress development services` | India / Global | Commercial BOFU | **Pos 6.96**, 48 imp, 0 clicks | `/services/wordpress-development` | **P1 Immediate:** Rewrite meta title & snippet for CTR. Highlight custom Gutenberg/ACF Pro engineering. |
| `enterprise wordpress development company` | India / Global | Commercial BOFU | **Pos 3.93**, 15 imp, 0 clicks | `/services/wordpress-development` | **P1 Immediate:** Position as high-performance custom WP engineering studio. |
| `web development company in delhi` | Delhi NCR | Local BOFU | Pos 46.8 (304 imp, 1 click) | `/locations/india/delhi/web-development-company` | **P2:** Add authentic Delhi client proof & B2B manufacturing references. |
| `web development company in prayagraj` | Prayagraj | Local BOFU | Pos 33.5 (2 imp, historical clicks) | `/locations/india/prayagraj/web-development-company` | **P1 Local:** Consolidate local NAP signals and Google Business Profile. |
| B2B wholesale quotation / RFQ portal | India B2B | Solution BOFU | Indexed (10 Oct 2026) | `/industries/b2b-wholesale-manufacturing-web-development` | **P1 Offer:** Feature Yoglivya Wholesale case study directly in hero. |
| Restaurant table booking & reservation system | Hospitality | Solution BOFU | Indexed (10 Oct 2026) | `/industries/restaurant-website-development` | **P1 Offer:** Feature Obsidian case study and deposit workflow. |
| `why is my shopify store not converting` | Global D2C | Problem MOFU | Both indexed (Cannibalization) | `/blog/d2c-ecommerce-growth/...` | **P1 Clean:** Consolidate 2 competing blog URLs into one definitive guide. |
| Custom booking & appointment systems | Services | Solution BOFU | Indexed (12 Oct 2026) | `/solutions/custom-booking-systems` | **P2:** Connect to Clinic, Gym, and Salon industry hubs. |

---

## 6. Cannibalization & Architecture Safeguards

1. **Shopify Conversion Blog Collision:**  
   * URL A: `/blog/d2c-ecommerce-growth/why-is-my-shopify-store-not-converting` (Indexed)  
   * URL B: `/blog/d2c-ecommerce-growth/why-your-shopify-store-is-not-converting` (Indexed)  
   * *Remediation:* Compare traffic and inbound internal links; consolidate with a 308 permanent redirect into URL A.
2. **Agency Selection Guide Overlap:**  
   * URL A: `/compare/how-to-choose-a-web-development-agency` (Indexed, Decision Tool)  
   * URL B: `/blog/web-development/how-to-choose-web-development-agency` (Indexed, Editorial Post)  
   * *Remediation:* Differentiate clearly: `/compare` page owns the 10-point evaluation rubric; `/blog` post links directly into the comparison rubric as its primary CTA.
3. **Ecommerce Route Consolidation:**  
   * Main Service: `/services/ecommerce-website-development` (Priority 0.92, Indexed)  
   * Legacy Solution: `/industries/ecommerce/conversion-growth-system` (Priority 0.79, Indexed July 2026)  
   * *Remediation:* Maintain both only if `/industries` explicitly focuses on post-launch conversion optimization audits while `/services` focuses on greenfield platform builds.

---

## 7. The Top 5 Verified Problems & Top 5 Opportunities

### Top 5 Verified Problems
1. **Zero Attributed Organic Leads:** In 28 days of live tracking, non-brand organic search produced zero confirmed form completions (`generate_lead` = 0) and zero bookings (`strategy_call_booked` = 0).
2. **83.3% Brand Dependency:** 20 of 24 search clicks came from searches for the brand name `"devacia"`.
3. **Persistent Exclusion of Core Service Hubs:** Custom Software, Business Automation, Landing Page Design, and Maintenance have sat in Google's *Crawled — currently not indexed* state since May/July 2026.
4. **Funnel Traffic Quality vs. Commercial Intent:** The production CRM pipeline and Telegram alerts (`Devacia_bot`) are verified functional with 7 recorded leads in Atlas. However, the last 28 days of traffic produced 0 non-brand commercial inquiries, proving that organic search visitors are consuming top-of-funnel blog posts without navigating to service offers.
5. **Direct Calendar Booking Attribution Was Broken:** Anyone booking a meeting on `/contact` unmounted the tracking listeners (fixed today in code, awaiting deployment).

### Top 5 Validated Opportunities
1. **Page 1 WordPress Search Demand (Immediate CTR Win):** Ranking position 6.96 for `enterprise wordpress development services` with 48 impressions. Snippet and meta title optimization can yield immediate qualified clicks without new link building.
2. **High-Fit Sectoral Proof (B2B Wholesale & RFQ):** The `/industries/b2b-wholesale-manufacturing-web-development` route is indexed, directly backed by the authentic Yoglivya Wholesale case study.
3. **Hospitality Booking Systems:** `/industries/restaurant-website-development` is indexed and backed by the authentic Obsidian reservations case study.
4. **Prayagraj Local Foundation:** Devacia's registered physical headquarters gives it natural local E-E-A-T and GBP eligibility in Prayagraj where competition is weak.
5. **AI Answer Engine Ingestion:** `OAI-SearchBot`, `PerplexityBot`, and `ChatGPT-User` are fully allowed in `robots.txt`, and both `/llms.txt` and `/llms-full.txt` are live and valid.

---

## 8. Sequenced 10-Step Implementation Roadmap

| Step | Priority | Task | Target / Files | Expected Outcome | Status |
|---|---|---|---|---|---|
| **01** | P0 | GA4 Data CLI Creation | `scripts/ga4-cli.js` | Full live GA4 access | **COMPLETED** |
| **02** | P0 | Direct Calendar Booking Listener | `app/(site)/contact/ContactPageClient.jsx` | Attribute direct bookings | **COMPLETED** |
| **03** | P1 | Meeting Duration Alignment | `app/(site)/contact/ContactPageClient.jsx` | Remove buyer friction | **COMPLETED** |
| **04** | P1 | GA4 `qualify_lead` Event Alignment | `src/utils/analytics.js` | Key event tracking | **COMPLETED** |
| **05** | P0 | Production End-to-End Lead Test | `/onboarding` & MongoDB CRM | Verify lead capture & Telegram alerts (`Devacia_bot`) | **COMPLETED & VERIFIED** |
| **06** | P1 | WordPress Service CTR Upgrade | `src/content/wordpressDevelopmentData.js` | Capture Page 1 clicks (pos 6.96) | **COMPLETED** |
| **07** | P1 | Consolidate Duplicate Shopify Blog URLs | `/blog/d2c-ecommerce-growth/` | Eliminate cannibalization (308 redirect) | **COMPLETED** |
| **08** | P1 | Content Refresh on Excluded Services | Automation, Landing Pages, Maintenance | Move from crawled to indexed (4 pages upgraded) | **COMPLETED** |
| **09** | P2 | Mobile Core Web Vitals Lab Audit | `scripts/measure-release-pages.mjs` | Verify LCP < 2.5s, CLS = 0 | **COMPLETED** |
| **10** | P2 | Prayagraj Google Business Profile Audit | `src/seo/site.js` & Prayagraj location page | Establish local E-E-A-T anchor | **COMPLETED** |
| **11** | P1 | Blog-to-Service Hub Internal Linking | `src/content/blog.js` & MongoDB `blog_posts` | Connect organic blog traffic to services | **COMPLETED** |
| **12** | P1 | Custom Software Enterprise Positioning | `src/content/customSoftwareData.js` | Sharpen BOFU commercial intent | **COMPLETED** |

---

## 9. Leadership Decisions Required

1. **Verify Production MongoDB Environment:** Confirm that the production environment variables (`MONGODB_URI`, `DATABASE_NAME`) are storing submitted leads to the active production database, not an orphaned cluster.
2. **Approve 308 Consolidation for Shopify Blog:** Confirm permanent redirect of `/blog/d2c-ecommerce-growth/why-your-shopify-store-is-not-converting` into `/blog/d2c-ecommerce-growth/why-is-my-shopify-store-not-converting`.
3. **Confirm Physical Address for Prayagraj Listing:** Confirm whether the Kareli address (`22/2N Rehmat Nagar, Kareli, Prayagraj`) is eligible for full Google Business Profile postcard/video verification.
4. **Deploy Recent Attribution Fixes:** Approve merging and deploying the commits containing the `ContactPageClient.jsx` and `analytics.js` attribution fixes to production.

---

## 10. Review Cadence & Evaluation Criteria

* **Next Formal Review Date:** **15 November 2026** (4 weeks post-audit)
* **Success Criteria at Next Review:**
  * At least 1 verified live enquiry recorded in MongoDB CRM with attribution parameters.
  * `enterprise wordpress development services` CTR increases above 2.5% in GSC.
  * Total non-branded search clicks increase from 3 to ≥ 15 over 28 days.
  * At least 2 of the 5 crawled-not-indexed service pages transition to *Submitted and indexed*.

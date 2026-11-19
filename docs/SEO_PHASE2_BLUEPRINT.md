> Historical plan: superseded where inconsistent by [the 2 October implementation record](docs/seo/ALL_PHASES_IMPLEMENTATION_2026-10-02.md). Use Prayagraj as the confirmed base, keep published blog pages indexable, and distinguish accepted inquiries from clicks, starts and sales qualification. External execution remains subject to the dependencies in that record.

# Devacia Phase 2 SEO Blueprint

## Purpose
This document freezes the final SEO, AI-discovery, and inbound-conversion direction for Devacia before broader implementation work begins.

The goal is not "more pages." The goal is:

`Search intent -> landing page -> context expansion -> proof -> conversion`

This blueprint is the source of truth for:
- page architecture
- keyword clusters
- schema/entity strategy
- India vs US location strategy
- blog foundation strategy
- internal linking
- phase-by-phase implementation order

## Business Entity Snapshot
- Brand: `Devacia`
- Founded: `June 2025`
- Founder: `Laraib Asjad`
- Team size: `7-person`
- Primary phone: `6306940734`
- Primary public email: `hello@devacia.com`
- Other public emails:
  - `contact@devacia.com`
  - `support@devacia.com`
  - `laraib@devacia.com`
  - `growth@devacia.com`
  - `founder@devacia.com`
  - `partnerships@devacia.com`
  - `collabs@devacia.com`
  - `team@devacia.com`
  - `projects@devacia.com`
  - `billing@devacia.com`

### Office / Service Presence
- Prayagraj office: `22/2N Rehmat Nagar, Kareli`
- Delhi office: `T-656 Street Number 10, Gautampuri, New Delhi - 110053`
- Lucknow: operations and service-area presence; online-first, treated as service-area support unless a stronger office presentation is needed later

### Trust Signals
- Clutch: `https://clutch.co/profile/devacia`

## Final Brand Positioning
Devacia should own this category position:

`High-performance websites + custom business software + connected growth systems`

Primary commercial stack:
1. Website development
2. Custom software / semi-SaaS / business systems
3. Performance marketing as the connected growth layer

This must stay consistent across copy, schema, navigation, case studies, and internal links.

## Core Audiences
- Startups
- D2C brands
- Ecommerce businesses
- Growing SMEs
- Premium US remote clients

## Geography Strategy
### India
- Primary local-commercial cities:
  - Prayagraj
  - Delhi
- Supporting operational/service-area city:
  - Lucknow

### United States
- Position as remote delivery for premium clients
- Lead with ROI, execution, systems thinking, and async-friendly delivery

## What Devacia Can Actually Own
Based on the research pack and current market gaps, Devacia has the best chance to win by owning:
- one partner for `website + funnel + growth`
- WordPress vs Shopify vs custom decision support
- custom internal tools for SMEs
- lead management, booking, and operational systems
- local SEO in weaker-competition Indian cities
- proof-led pages for premium Delhi and US clients
- AI-readable answer pages built around direct buyer questions

## Target Site Architecture
### Core pages
- `/`
- `/about`
- `/contact`
- `/service`
- `/work`
- `/blog` (hidden / noindex until public launch)
- `/pricing/website-development-cost-india`
- `/compare/wordpress-vs-shopify-vs-custom`
- `/problems/why-your-website-is-not-converting`
- `/problems/how-to-increase-ecommerce-sales`

### Service cluster
- `/services/business-websites`
- `/services/ecommerce`
- `/services/custom-builds`
- `/services/rebranding`
- `/services/performance-marketing`

### Future target service slugs
These are the long-term target slugs to migrate toward after the current phase:
- `/services/website-development`
- `/services/wordpress-development`
- `/services/shopify-development`
- `/services/custom-web-development`
- `/services/custom-software-development`
- `/services/lead-management-systems`
- `/services/booking-systems`
- `/services/business-automation`
- `/services/startup-mvp-development`
- `/services/performance-marketing`

### Future-ready only
Do not fully launch yet:
- `/services/google-ads-management`
- `/services/meta-ads-management`

### Location cluster
- `/locations/india/prayagraj/web-development-company`
- `/locations/india/delhi/web-development-company`
- `/locations/india/lucknow/web-development-company`
- `/locations/usa/web-development-agency`
- `/locations/usa/custom-software-development-team`

### Case studies
- `/work/almina`
- `/work/fitniya`
- `/work/yoglivya`
- `/work/obsidian`
- `/work/nexus`
- `/work/rangloli-threads`

## Keyword Cluster Strategy
### Service intent
- `web development agency`
- `website development company`
- `wordpress development company`
- `shopify development agency`
- `custom web development company`
- `custom software development company`

### Commercial / money intent
- `hire web development agency`
- `best agency for startups`
- `ecommerce website development company`
- `performance marketing agency`
- `lead management system development company`
- `booking system development company`

### Problem intent
- `website not converting`
- `shopify store not converting`
- `why website is slow and losing sales`
- `need booking system for my business`
- `need custom software for my business`
- `how to increase ecommerce sales`

### Local intent
- `web development company in delhi`
- `website development company in lucknow`
- `web development company in prayagraj`
- `shopify developer lucknow`
- `digital agency delhi ncr`

### US premium intent
- `custom software development company usa`
- `startup mvp development company`
- `high performance website development`
- `performance marketing agency usa`

### Conversational / AI intent
- `who can build my website and run the funnel too`
- `which agency builds websites and internal tools`
- `i need someone to build my store and run ads`
- `best way to build an mvp quickly`

## Blog / Insights Foundation
### Current launch decision
- Keep `/blog` hidden with `noindex`
- Keep underlying structure live
- Launch only one category first when ready:
  - `web-development`

### Underlying route model
- `/blog`
- `/blog/[category]`
- `/blog/[category]/[slug]`

### Later categories
- `web-development`
- `d2c-ecommerce-growth`
- `performance-marketing`
- `tech-software`
- `startup-business-growth`

### Blog operating rules
- one clear search intent per post
- one related service link
- one related proof/case study link
- one CTA
- `BlogPosting` schema
- direct-answer introduction for AI-friendly retrieval

## Page System Rules
Every SEO page should follow:
1. intent-based headline
2. direct answer / value proposition
3. proof block early
4. deeper explanation
5. FAQs where useful
6. internal links
7. CTA

### Primary CTAs
- `Book Strategy Call`
- `Get Proposal`
- `Request Audit`

### Performance marketing CTA
- `Book a Free Ad Audit`

## Schema / Entity Strategy
### Global
- `Organization`
- `WebSite`
- founder `Person`

### Page-level
- Home: `Organization`, `WebSite`, `ProfessionalService`
- Services: `Service`, `FAQPage`, `BreadcrumbList`
- Locations: `ProfessionalService`
- Case studies: `Article` or `CreativeWork`
- Blog posts: `BlogPosting`
- Blog category pages: `CollectionPage`
- Comparison / problem / pricing pages: `FAQPage` when helpful

### Important rule
Only use `LocalBusiness` where there is real office/address proof and the page truly represents that office. Otherwise use `ProfessionalService` with `areaServed`.

## Internal Linking Rules
- service -> case study -> contact
- case study -> service -> related work -> contact
- location -> service -> proof -> contact
- problem page -> service -> case study
- comparison page -> service -> CTA
- blog post -> service -> case study -> CTA

## Conversion Rules
Each money page must answer:
- what do you do
- who is it for
- what proof supports it
- what happens next

Every key page should handle objections around:
- conversion effectiveness
- delivery timeline
- whether Devacia handles only design or end-to-end execution
- what happens after launch
- whether India and US clients are both supported

## What Not To Do Yet
- do not launch many blog categories at once
- do not fully push Google Ads and Meta Ads child pages yet
- do not publish weak or fabricated metrics
- do not overclaim office presence where proof is weak
- do not put display ads on the public site now

## Technical SEO Foundation Priorities
### Phase 2A
- shared site/entity config
- centralized schema helpers
- root metadata cleanup
- native `robots`
- native `sitemap`
- remove dependence on outdated static sitemap/robots files

### Phase 2B
- homepage metadata/schema cleanup
- service overview cleanup
- contact page metadata/schema
- about page metadata/schema

### Phase 2C
- case study route normalization
- pricing / comparison / problem pages
- location page rollout

### Phase 2D
- blog category launch
- first article cluster
- AI-answer content expansion

## Acceptance Criteria
The Phase 2 system is working when:
- core business/entity data is consistent across metadata and schema
- sitemap only lists indexable pages
- robots rules are explicit and clean
- service pages have page-level schema
- search engines and AI crawlers can clearly identify:
  - who Devacia is
  - what it sells
  - where it operates
  - what proof supports those services

## Reality Check
This foundation can make Devacia:
- much more crawlable
- much more AI-readable
- much more competitive for high-intent and local commercial searches

It does **not** guarantee:
- instant global rankings
- guaranteed inbound leads
- universal AI recommendation

What still drives global ranking beyond this blueprint:
- proof
- authority
- backlinks
- reviews
- brand mentions
- topical depth
- time

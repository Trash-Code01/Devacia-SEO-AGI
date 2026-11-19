# Local SEO implementation and verification

**Current record:** [All-phase implementation, 2 October 2026](ALL_PHASES_IMPLEMENTATION_2026-10-02.md), including resources, regional updates, attribution and CRM cohorts. The entries below describe earlier work.

**Latest implementation verified 2 October 2026. Not deployed or committed.** The India service-page changes below build on the technical work completed on 30 September. Existing edits to `scripts/gsc-cli.js` and existing public PDF files were preserved. No live lead forms, outreach, purchases, directory edits, CMS publication, or indexing notifications were submitted.

## India service-page implementation — 1–2 October 2026

Updated **11 existing destinations**: nine service pages, the Delhi NCR page, and the India website-cost guide. Existing URLs remain in place. No city-by-service page expansion was introduced.

| Destination | Implemented change |
|---|---|
| `/services/website-development` | India business website heading; corporate, agency and B2B use cases; content, enquiry and handover scope |
| `/services/wordpress-development` | India title and H1; conventional/headless tradeoffs, editing, ownership, licences, migration and support; removed unsupported speed, security and ranking guarantees |
| `/services/ecommerce` | India ecommerce positioning; Shopify/WooCommerce/custom comparison; B2B catalogue/RFQ, admin operations, recurring charges; Almina described as custom commerce |
| `/services/shopify-development` | India metadata; store setup, themes, apps, migration and ongoing management; relevant Bengaluru service-area link |
| `/services/custom-software-development` | India software/admin-panel heading; roles, B2B portals, RFQ workflows, integrations and a bounded first release |
| `/services/business-automation` | Enquiry routing, CRM integrations, booking/order exceptions, retries and ongoing costs |
| `/services/website-support-maintenance` | Maintenance/management intent, WordPress and ecommerce care, included edits, pricing factors and written response terms |
| `/services/rebranding` | India redesign intent, repair-versus-rebuild decisions, URL migration, redirects, launch checks and handover |
| `/services/performance-marketing` | India Google/Meta Ads heading, separate fee/media/creative costs, enquiries versus qualified leads and confirmed sales, clearer FAQs |
| `/locations/india/delhi/web-development-company` | Remote delivery from Prayagraj; useful website/store/B2B planning; NCR service coverage without a fictitious Delhi office; removed unsupported top-rated and instant-response claims |
| `/pricing/website-development-cost-india` | Scope comparison, recurring costs, current-package link and a clearly labelled ₹1–3 lakh planning envelope |

The cost guide's conflicting generic starting prices were replaced with scope factors and a link to current packages. Existing specialised WordPress/ecommerce starting estimates remain on their service pages, with scope and ongoing-cost qualifications. The ₹1–3 lakh band is a planning preference, not measured market pricing or a fixed offer.

`src/seo/buyerGuides.js` holds the nine service briefs. `ServiceBuyerGuide.jsx` renders these in initial HTML. Added FAQs feed both visible content and JSON-LD from the same data. Generic pages retain their existing service content, with clearer delivery headings and contextual links. This is not a promise of FAQ rich results.

The Delhi regional schema now describes a **Service** and its served areas, referring to the existing company entity. The sitemap uses explicit modification dates for these 11 pages while preserving the existing dates for other pages and blog records. The unused legacy marketing view was left unchanged; the active App Router marketing component contains the final heading/reporting edits.

### Verification of this batch

- Production build **passed**, generating 64 static pages. Windows sandbox worker restrictions required the approved build retry. Existing browser-data, middleware convention and edge-runtime warnings remain. The final subsequent edit removed an unused React import; focused lint passed afterward.
- Existing SEO regression suite: **3 passed**, covering escaped JSON-LD, crawler rules and lead-event dispatch/deduplication.
- `node scripts/verify-seo-pages.mjs http://127.0.0.1:3100`: **passed for all 11 pages**, checking unique titles/descriptions, correct canonicals, one H1 in initial HTML, indexable metadata/headers, parseable JSON-LD and visible FAQ/schema agreement. All nine buyer guides are present before hydration.
- **17 distinct guide-linked destinations** exist in the route manifest and return HTTP 200. The 11 updated sitemap dates were verified over local HTTP.
- Focused ESLint passed for the new guide data/component, rewritten Delhi content and active marketing client component. `git diff --check` passed. This does not assert repository-wide lint cleanliness.
- Browser checks at requested viewport **390×844** on WordPress, Delhi, ecommerce, marketing, custom software and pricing reported client/scroll width **384/384**, without document-level horizontal overflow. WordPress guide, Delhi hero and final marketing hero were visually inspected. The final marketing heading and reporting text were verified; the browser returned no captured console errors. Temporary viewport override reset afterward.
- Local preview: `http://127.0.0.1:3100/locations/india/delhi/web-development-company`. This is not the deployed site. [Machine-readable verification](evidence/implementation-verification-2026-10-01.json).

The verifier uses bounded HTML extraction plus JSON parsing, complemented by browser checks. It is not a complete accessibility audit, field-performance assessment, or Google indexing/ranking validation.

### Release and measurement

1. Review and reconcile the existing event changes with GTM/GA4 before production rollout, as detailed below. A successful enquiry is not automatically a qualified lead.
2. Deploy the reviewed application changes, then recheck production URLs, schema, canonicals, sitemap and successful enquiry delivery using controlled test data.
3. Annotate the release date and compare settled GSC windows for India, Delhi-related queries and service pages, together with CRM-qualified organic enquiries. Keep country and channel definitions consistent.

The recorded India baseline is **14 clicks / 459 impressions for 1–28 September 2026**, not a qualified-lead baseline. Search volumes remain unavailable in the supplied research; no figures or improvement claims were invented. The 10× lead objective remains an ambition to measure after deployment, not an expected or guaranteed result. See [research review](RESEARCH_REVIEW_2026-10-01.md).

## Technical foundation — completed 30 September 2026

## Changes made

| Change | Files | Result |
|---|---|---|
| Native server-rendered JSON-LD | `src/components/seo/JsonLd.jsx`, `src/seo/jsonLd.js`, 52 public `app/(site)/**/page.jsx` templates | Preserves schema content/IDs, moves JSON-LD out of after-hydration `next/script`, escapes `<` to prevent editorial strings closing script elements |
| Crawler rule consistency | `app/robots.js` | Named search bots and wildcard share `/admin` and `/api/` exclusions; onboarding can expose noindex; staging and training-bot rules retained |
| Working entity/icon image | `src/seo/schema.js`, `app/layout.jsx` | Uses existing `/logo-clean.png` instead of live-404 `/logo.png` |
| Pricing in initial HTML | `app/(site)/plans/PlansPageClient.jsx`, `src/components/Pricing-plan.jsx` | Removes SSR suppression; deterministic India initial render avoids server/browser market mismatch; existing post-hydration market detection remains |
| Semantic page heroes | `src/components/animations/Text-reveal.jsx`, `src/views/services/BusinessWebsite.jsx`, `src/views/yoglivyastudy.jsx` | Adds optional semantic tag; two heroes now H1, inner lines use valid span elements; unchanged visual styling |
| Admin metadata | `app/admin/[[...slug]]/page.jsx` | Explicit noindex/nofollow and clears inherited homepage canonical; authentication unchanged |
| Orphan links | Website-development and custom-booking page templates | Relevant incoming links for agency selection guide and clinic system |
| Accurate lead definitions | `src/views/Onboarding.jsx`, `src/utils/analytics.js` | Attempt event is `form_submit_attempt`; successful API completion is `generate_lead`; strategy-link click is custom Meta event, not Lead |

The JSON-LD conversion uses a small shared component; it does not add invented schema properties or guarantee rich results. Many changed route files contain only the import/tag substitution.

## Validation completed

- `npm run build`: **passed**, including 64 generated static pages and route generation. The first sandbox attempt compiled but failed when Windows blocked a worker (`spawn EPERM`); the approved retry succeeded. Warnings remain about old browser-support data, middleware/proxy convention and an existing edge-runtime route. No dependency upgrade was required.
- `node --test scripts/seo-regression.test.mjs`: **3 passed**. Tests exercise JSON-LD escape/round-trip behavior, named/wildcard/staging robots behavior, and click/attempt/success Meta dispatch with event-ID preservation. The sandbox worker failure was resolved by the approved retry.
- Focused ESLint on `JsonLd.jsx`, `jsonLd.js`, `app/robots.js`: **passed**. This is not a claim that the entire legacy repository is lint-clean.
- `git diff --check`: **passed**.
- Generated HTML: **59 files inspected, 109 native JSON-LD blocks parsed successfully**. Homepage, plans, website development and Yoglivya each have one H1 in initial HTML; pricing contains INR 55,000; booking contains the clinic link. [Machine-readable check](evidence/build-verification.json).
- Local production HTTP: homepage/plans/website-development/Yoglivya return 200 with JSON-LD. Onboarding has `noindex, nofollow`. Admin login has `noindex, nofollow` and no inherited canonical. [HTTP results](evidence/local-http-verification.json).
- Browser: at requested mobile-test viewport 390×844, updated pricing had readable content and no document-level horizontal overflow (reported layout width/scroll width both 384). Switching to Business Websites displayed Business Starter, Growth Website and Rebrand and Relaunch. Viewport override was reset afterward. No live form was submitted.
- Live production before changes: all 70 sitemap pages crawled successfully. This verifies the deployed baseline, **not deployment of this patch**. [Crawl](evidence/live-crawl.json), [robots](evidence/robots.txt), [sitemap](evidence/sitemap.xml).

## Release and analytics dependencies

Before production rollout of event changes, update/review GTM and GA4 configuration:

| Old behavior | New code behavior | Required reporting change |
|---|---|---|
| `generate_lead` on submission attempt | `form_submit_attempt`, `submission_stage=attempt` | Do not mark attempts as key events or optimize ads for them |
| `qualified_lead` after successful form completion | `generate_lead`, `submission_stage=success` | Retarget successful-submission tags/reporting; reserve qualification for actual CRM stage |
| `book_strategy_call` maps to Meta Lead | Custom `book_strategy_call` | Confirm ad/account rules do not count it as a true lead elsewhere |
| Success browser/server conversion pair | Shared event ID retained | Verify Meta deduplication with authorized test data |

The analytics container itself was not accessible/changed. Historical events cannot be reclassified accurately from code alone. Annotate the deployment date; old/new lead totals are not directly comparable until definitions are reconciled. Source attribution/session correctness, duplicate GA dispatch, consent/environment gates and booking-origin verification remain in the backlog. Do not turn the presence of event code into a claim that production conversions are verified.

After deployment: recheck canonical pages, robots, metadata, schema, pricing market selectors and links; run appropriate schema validation; verify a controlled test lead reaches the correct CRM with the correct events; re-inspect priority GSC URLs after crawl. Do not use the Indexing API for ordinary service/blog pages. Google limits that API to eligible job-posting and live-broadcast pages. [Official Indexing API scope](https://developers.google.com/search/apis/indexing-api/v3/using-api).

If a rollback is needed, revert only this patch's files/hunks. Do not reset the workspace or discard the user's pre-existing GSC changes or documents.

## Evidence and rerun commands

```text
node scripts/seo-evidence.mjs crawl
node scripts/seo-evidence.mjs gsc
node scripts/seo-crm-evidence.mjs
node --test scripts/seo-regression.test.mjs
npm run build
```

The audit scripts are read-only toward external systems. GSC uses existing credentials, restricts property selection to Devacia, and does not print credential data or open an authorization flow. It queries three periods with 25,000-row limits; this small account returned fewer rows, but much larger accounts would require pagination and attention to API aggregation limits. Search Console query privacy filtering still applies.

The public crawler is a bounded sitemap HTML audit, not a JavaScript renderer or full internet crawl. It uses regex extraction; confirm nuanced HTML findings with browser/DOM inspection. It records fetch elapsed time, which is **not** LCP or a Core Web Vitals score. It follows redirects, so final status does not reveal each intermediate status code. It verifies linked destinations absent from the sitemap, not every image or external link.

CRM export contains aggregate buckets only, no names/emails/phones. Its configured environment is unverified and returned no matching dated records; production lead/revenue metrics remain Data required. PageSpeed returned 429; no lab or field score was obtained. The local/browser check is not full device coverage or WCAG certification.

## Primary reference decisions

- [Google AI features](https://developers.google.com/search/docs/appearance/ai-features): foundational eligibility; no special guaranteed AI-ranking markup.
- [Google documentation updates](https://developers.google.com/search/updates): FAQ rich-result retirement and current llms.txt guidance.
- [Google robots interpretation](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec): specific groups and path matching.
- [Next.js JSON-LD](https://nextjs.org/docs/app/guides/json-ld): native script output with escaped editorial values.
- [Google review markup rules](https://developers.google.com/search/docs/appearance/structured-data/review-snippet): self-serving organization/local-business review restrictions.
- [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap): canonical inventory and trustworthy modification dates.
- [Web Vitals definitions](https://web.dev/articles/vitals): field performance thresholds, separate from this audit's fetch timings.
- [Devacia on Clutch](https://clutch.co/profile/devacia): public corroboration of a specific B2B quote/software engagement; no independently verified numeric uplift.

Full findings and action dependencies are in the [17-part growth system](SEO_GROWTH_SYSTEM_2026-09-30.md), with [44 keyword opportunities](KEYWORD_OPPORTUNITIES.md) and the [12-month content calendar](CONTENT_ROADMAP.md).
# Current execution record — 2 October 2026

The subsequent implementation across the growth phases is recorded in [ALL_PHASES_IMPLEMENTATION_2026-10-02.md](ALL_PHASES_IMPLEMENTATION_2026-10-02.md). It adds regional content, buyer resources, attribution safeguards, CRM qualification/cohort reporting and discovery fixes. The historical entries below remain as earlier evidence; external rollout and measurement requirements are listed in the current record.

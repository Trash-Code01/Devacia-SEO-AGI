# Devacia: updated-content and sub-URL SEO audit

Reviewed 7 October 2026 against the actual workspace, a fresh production build, local HTTP responses, selected production URLs and current provider pages. This review adds research and audit artifacts; it does not change the user's page designs, copy, route configuration, analytics accounts or production deployment.

## Executive finding

The twelve industry URLs are already implemented and work locally. Do not recreate them or invent new slugs from the supplied research. The material gap is publication plus several regressions introduced with the newly rewritten service pages. More keyword variations will not resolve those issues.

Semrush was explicitly attempted through its keyword, organic-research and project discovery tools. Each returned `no_api_units`: active subscription, insufficient API units, not retryable. No Semrush keyword volume, organic difficulty, rank, backlink or competitor metric was retrieved. [Semrush account access](https://www.semrush.com/mcp-access). This limitation is separate from the source-code, HTTP and public-source evidence below.

The [supplied research audit](RESEARCH_AUDIT_SUPPLIED_2026-10-07.md) is useful for its evidence boundaries. Its original reviewer lacked the local handover, keyword workbook and analytics evidence; those files are available here and were reconciled with the current implementation. Its reported Keyword Tool numbers are third-party observations from that document, not independently refreshed values in this review.

## Scope and verification

- Fresh production build succeeds: 78 generated build entries. This count includes non-commercial routes and is not a count of ranking pages.
- Inspected 72 static HTML page artifacts for metadata, canonicals, headings, links and JSON-LD/content parity.
- Checked 118 local URLs drawn from the build, internal page links, sitemap and industry aliases: 88 returned 200, 28 returned 308, one returned 307 and one returned 404.
- Checked 25 priority production endpoints: 10 returned 200 and 15 returned 404.
- All twelve canonical industry pages return 200 locally and 404 publicly. The industry directory and new ecommerce/redesign routes also return public 404s. They cannot currently acquire search visits at those public URLs.
- Existing SEO regression suite: 23 tests pass. The rendered-page verifier fails on the rewritten WordPress FAQ answers missing from initial HTML. Passing unit tests is not release readiness.
- Full URL/metadata register: [URL_REGISTER_2026-10-07.md](URL_REGISTER_2026-10-07.md). Industry research and candidate mapping: [INDUSTRY_INTENT_MAP_2026-10-07.md](INDUSTRY_INTENT_MAP_2026-10-07.md).

The first restricted build/test attempts hit Windows `spawn EPERM`; the permitted reruns completed. This was an execution-environment restriction, not a discovered application defect. No new visual, field Core Web Vitals or authenticated analytics QA was performed during this audit. A fresh production preview is available at `http://127.0.0.1:3102`.

## Findings ordered by business impact

### 1. The new offer URLs are not deployed

Evidence: all twelve industry pages, `/industries`, `/services/ecommerce-website-development` and `/services/website-redesign` return public 404s. Existing public service pages continue to serve the earlier deployment.

Action: complete the release fixes below, then deploy the reviewed version through the normal release process. Verify public HTTP status, canonical, robots, initial text and sitemap before measuring results. Record deployment and tracking-change dates separately. No deployment was performed here.

### 2. Ecommerce has competing URL signals

`/services/ecommerce` and `/services/ecommerce-website-development` both return 200 with identical titles/content. Both canonicalise to the latter, but both are in the sitemap. The old URL receives links from 65 indexable static build artifacts, including aliases/shared navigation; the intended new canonical receives a link from only one. These are source-document counts, not users or independent editorial endorsements.

Recommendation: if the new content file's declared canonical is the intended migration, permanently redirect `/services/ecommerce` to `/services/ecommerce-website-development`, update internal links and retain only the new canonical in the sitemap. If the established URL should remain, retain it consistently instead. Do not change the slug merely to add keywords. The current implementation already selects the new path; this report does not execute the migration.

Acceptance: one indexable destination, one-hop permanent old-to-new redirect, query parameters preserved, internal links point directly to the destination, and sitemap contains only that canonical. See [Google's canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

### 3. An old restaurant link is broken

`/solutions/custom-booking-systems` links to `/industries/restaurants/booking-ordering-system`, which returns local 404. The current alias registry contains `restaurant-growth-system` instead of that historical spelling.

Action: update that anchor directly to `/industries/restaurant-website-development` and add a permanent historical alias for the broken route, preserving incoming links. Retain the already working service-child restaurant and wholesale redirects.

### 4. Five rewritten services omit FAQ answers from initial HTML

Affected canonical pages and absent answer counts: WordPress 19, ecommerce 14, website redesign 17, performance marketing 14, custom software 16. The answers are emitted in JSON-LD but the client components mount them only after opening the accordion. This breaks the project's initial-HTML parity check. It does not by itself prove that Google can never render the answers.

Action: use native disclosure elements, as the GEO page already does, or keep answer content in the server-rendered DOM with accessible disclosure controls. Preserve the visual design. Existing FAQ buttons also need visible focus and expanded/control semantics.

Acceptance: every structured question/answer exists in rendered page content; disclosure works with keyboard and without JavaScript; one H1/main per page. Google retired FAQ rich results in 2026, so this is content/accessibility/consistency work, not a promise of FAQ enhancements. [Google documentation updates](https://developers.google.com/search/updates).

### 5. Strategy-call buttons have inconsistent destinations

The hero and closing CTA data for WordPress, ecommerce, website redesign and performance marketing say “Book a Strategy Call” but link to `/contact`. Industry/main offer CTAs use `/onboarding` as previously agreed. Custom software's differently labelled “Discuss Your Software Project” is a separate intent and should not be mechanically relabelled.

Action: align the eight labelled strategy-call data links with `/onboarding` and explain the project-details-first step. Keep contact methods available where useful. Verify interest remains an interest event; do not count a click as a submission or booked call.

### 6. Redesign and rebranding compete for the same promise

`/services/rebranding` has the title “Website Redesign & Migration Services in India”; `/services/website-redesign` also targets redesign and migration. Both return 200 and are in the local sitemap. Distinct titles alone do not establish distinct search intent.

Recommendation: let the new redesign page own website redesign/migration. Keep rebranding only if its actual offer is meaningfully about positioning, brand identity and messaging; then rewrite its title, introduction and internal anchors around that role and link to redesign for implementation. Otherwise consolidate via a relevant permanent redirect. Do not canonicalise distinct content simply to hide overlap. This strategic choice is not inferred from a new filename alone.

### 7. Current copy still overstates technical outcomes

Current local WordPress content promises sub-second results in platform/FAQ descriptions, including language implying builds cannot break after plugin updates. Its client component also makes a sub-second claim. Custom software states that database state machines guarantee consistency and has a “100% Immutable Timestamping” label. Redesign displays “100% URL Continuity.” Performance marketing displays “Target Intent Accuracy: 94.2%” in an interactive illustration.

Action: replace unsupported absolute performance/security/continuity claims with the actual engineering approach and acceptance measurements. Label example dashboards and numbers prominently as illustrative; review both switchable states, not just the default HTML. Preserve capabilities that can be scoped rather than categorically excluding them.

The audit does not establish that the superseded public “impossible to hack” copy remains in the new local WordPress page. It does establish the narrower current claims above. Framework selection is not evidence of field performance. [Google Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals).

### 8. Modification dates and the regression inventory lag the rewrites

Several rewritten services inherit October 1 or the site-wide timestamp. The new ecommerce/redesign routes are in the sitemap but absent from the old priority verification registry. The verifier still expects some superseded buyer-guide paragraphs.

Action: set modification dates from actual substantive edits, extend checks to the current content modules and both new canonical pages, and preserve checks for redirects, FAQs, metadata, consent and attribution. Do not simply remove the failing checks. `changefreq`, `priority` and meta-keyword lists are not substitutes for crawlable current content.

### 9. Existing case studies and plans need a separate rendering follow-up

The six project case-study H1s, contact H1 and plans H1 carry initial opacity hiding. Their text exists in source, but it is visually hidden before hydration. Plans additionally has seven FAQ question/answer parity discrepancies. These are existing broader-site findings, not evidence that the twelve current industry pages fail the same checks.

Action: review shared animation initial states and make essential headings visible before JavaScript. Reconcile the actual plans FAQs and schema. Three apparently unlinked static destinations—author, agency-selection guide and the US software page—need a broader dynamic-content link review before calling them truly orphaned.

## Valid work to preserve

All twelve local industry canonicals are self-referencing, have unique offer titles, one H1/main, matching FAQ content/schema and working hub links. The main offer and directory link to every industry. Most industry aliases already redirect directly; do not report their duplicate static build titles as separate live duplicate pages. `/engineering-insights` is a 307 redirect to `/blog`, so its minimal build artifact is not a missing-H1 content defect.

The GEO route's native FAQs pass source parity. Its new copy appropriately rejects guaranteed AI citations. Review wording that treats “citation readiness” as a measurable platform eligibility requirement: it is an agency description, not a verified ranking metric. Keep Google AI impressions, identifiable AI referrals and manually observed citations separate. [Google's AI optimisation guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

## Search-intent conclusions

Opened provider pages show that industry-specific procurement offers exist for gyms, clinics, HVAC, real estate, restaurants, wholesale, education, corporate sites and professional services. A café subscription alternative and hospitality integrator were also inspected. Salon evidence includes a full search extract; direct retrieval failed and is labelled accordingly. These observations establish competitor positioning, not search volumes, Google rank positions, quality or market share.

The research map contains 36 candidate clusters across all twelve industries, with exact source links and route ownership. Preserve the original keyword IDs for relevant wholesale/corporate clusters; new candidates have separate IDs and are not retroactively called existing research.

Practical differentiation: demonstrate what the team receives after an enquiry and how the customer completes the intended action. Competitors already list menus, calendars, forms and dashboards. Devacia needs an accurate delivered workflow, ownership/scope clarity and a useful next step to make the offer credible. Restaurants and wholesale remain proof-based priorities, not proven highest-volume industries.

Do not create new slugs for every candidate. Cost, ownership, integrations and workflow questions usually belong on the existing industry page. Comparison articles are justified only by a distinct buyer decision, credible evidence and a clear link to the service owner. Platform procurement stays with WordPress/Shopify pages; transactional commerce stays with ecommerce; quote-led product evaluation stays with wholesale; bespoke operations stay with custom software.

## Ready-to-implement sequence

1. Resolve the ecommerce migration consistently; fix the broken restaurant anchor and historical alias.
2. Restore initial-HTML FAQ answers and accessible disclosures; align strategy-call destinations.
3. Correct unsupported numerical/absolute claims and label illustrations; clarify redesign versus rebranding.
4. Update modification dates and rendered-page verification for current content modules.
5. Rebuild; rerun unit and rendered checks; repeat local URL crawl and a keyboard/mobile review of changed components.
6. Deploy the reviewed release when authorised; verify production and submit the canonical sitemap. Reconcile lead measurement before attributing growth to the release.
7. Use Semrush India metrics when API access is available to validate the candidate map; keep observed GSC queries, provider estimates and analyst hypotheses distinct.

No 20× forecast is substantiated by this audit. The deployment and measurement prerequisites are concrete; demand, conversion rates and sales outcomes still need observation.

## Reproducible evidence

- [Static route inventory](evidence/route-inventory-before-2026-10-07.json)
- [118 local HTTP checks](evidence/url-http-local-2026-10-07.json)
- [25 production checks](evidence/url-http-production-2026-10-07.json)
- [Industry research records](evidence/industry-intent-research-2026-10-07.json)
- Scripts: `scripts/audit-seo-route-inventory.mjs` and `scripts/audit-seo-http.mjs` (read-only audits; write reports only).

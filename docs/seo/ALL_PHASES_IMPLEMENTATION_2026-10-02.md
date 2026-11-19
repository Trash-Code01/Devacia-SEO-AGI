# Devacia: implementation across the SEO growth phases

Updated: 2 October 2026. This is the current execution record. Earlier phase blueprints are historical; this record, the October 1 research review and the September 30 growth system take precedence where they disagree.

## What is implemented in the repository

### Foundation and commercial pages

- Owner-directed removal on 2 October: removed AI-Native Development from desktop/mobile navigation, service links, the sitemap and GSC inspection inventory. Removed its service page and supporting content. Its former URL permanently redirects to the existing custom software development page. Other services, including AI SEO & GEO and Startup MVP Development, remain available.
- Native escaped JSON-LD, crawler exclusions, admin noindex/canonical separation and INR pricing in initial HTML from the first implementation.
- Buyer decision sections on nine existing service pages: business websites, WordPress, ecommerce, Shopify, custom software, automation, maintenance, redesign and performance marketing.
- Delhi NCR remains the first acquisition priority. Existing Mumbai and Bengaluru pages now have distinct scoping guidance, visible FAQs and Service schema. They accurately describe remote delivery from Prayagraj. No additional offices or local-language capabilities were invented.
- Mumbai focuses on catalogue, distributor/RFQ, migration and campaign requirements. Bengaluru focuses on marketing websites versus applications, admin permissions, MVP scope and technical handover. Pune, Chennai, Hyderabad and Kochi are mentioned as remote coverage; new duplicate city pages were not created.
- Direct internal links to the canonical custom software route replace known `/services/custom-builds` hops. The legacy redirect remains for external links.

### Useful content, proof and conversion paths

- Owner-directed removal on 2 October: removed the `/resources` hub, project brief builder, maintenance checklist and B2B RFQ guide. Removed their homepage, footer, service-page and regional-page links and sitemap entries. These local-only routes are no longer published; the existing contact and service pages remain the enquiry paths.
- Homepage project summaries and case links are present in initial HTML, without waiting for the animated showcase to enter the viewport.
- The public shell has a skip link and one main landmark. Nested public main elements and two supporting homepage H1s were corrected.
- Trusted CMS article body H1s become H2s at render time; escaped code examples remain intact. Rich-body, block and related-card images use lazy loading and asynchronous decoding. CMS block normalization now retains supplied positive intrinsic dimensions; no image dimensions or field Core Web Vitals results were invented.
- Removed the simulated public loading overlay and hero typing delay. The main heading, service description and CTAs render visibly in initial HTML. Decorative homepage WebGL is disabled on small screens and reduced-motion devices.
- Homepage market cards explicitly describe remote delivery from Prayagraj. Removed ambiguous regional-office labels, the homepage's hourly-price claim and the suggestion that a Maps search URL proves a verified listing.

### Attribution and conversion measurement

- First touch survives internal navigation. The current session entry is stored separately, with a 30-minute inactivity boundary and a new touch for an explicit changed campaign. Last non-direct touch is a separate field; campaign attributes from different visits are not mixed.
- Landing URLs omit arbitrary query strings and captured external referrers retain only their origin. Tracked link destinations omit query strings; mail and phone schemes omit contact values. UTM values must still be governed by a campaign naming convention that excludes personal data.
- Storage failures fall back to in-memory state, so privacy settings do not break enquiry forms.
- Client dispatch uses one owner: GTM dataLayer or direct GA, not both. Localhost, preview hosts, staging, admin routes and visitors without an explicit optional-measurement opt-in are excluded by application code. Vercel Analytics follows the same decision; the legacy admin Speed Insights mount was removed.
- `form_start`, CTA clicks and `form_submit_attempt` are diagnostics. `generate_lead` follows successful completion. A verified Calendly iframe message emits `strategy_call_booked`; Meta receives Schedule rather than a second Lead.
- Opening Calendly no longer marks a draft as a completed urgent booking. A scheduling signal still needs provider/CRM reconciliation before it represents an attended meeting or sale.
- A visitor preference panel now defaults all four Google consent signals to denied before optional scripts can load. Essential-only, optional opt-in and later withdrawal are available; the choice lasts up to 180 days. Withdrawal clears known measurement storage and reloads the page, with a visible save-work notice, to stop loaded listeners. Enquiry/account storage is preserved. Meta server forwarding also requires a current optional-consent cookie. This is an application implementation, not a claim of legal compliance or a certified CMP. GTM consent templates, custom tags and admin exclusions still require account-level verification.

### Sales quality and acquisition cohorts

- Authenticated lead details now support qualification with a reason, commercial outcome and optional deal value/currency. The API validates these fields and records transition timestamps. A `closed` or `hot` operational status is never automatically converted into a win.
- Both admin analytics surfaces use recorded CRM data. Removed fixed growth percentages, invented response time, weekday sample charts and the fabricated `lead count × 2500` revenue forecast.
- An authenticated acquisition report groups current outcomes by original lead creation cohort, first recorded source, landing page or first selected service. The last 28, 90, 180 or 365 calendar days are available; date boundaries are UTC and the end is exclusive.
- Drafts are excluded unless sales has explicitly reviewed a commercial outcome. Imported/historical completion and acquisition gaps are displayed as unknown. First selected service is a diagnostic grouping, not an allocation of revenue to every selected service.
- Won amounts remain separate by currency. Use contracted service value excluding taxes and pass-through ad spend. Unknown values remain unknown. These figures are not collected revenue, profit, GA4 attribution or an accounting reconciliation.
- No production lead records were reclassified or backfilled during development. No real lead submission or customer notification was sent for QA.

### Discovery and operations

- Sitemap reads a small published-CMS projection through a five-minute Next data cache. It no longer invokes CMS bootstrap writes. It uses stored post dates, not request time. A failed cold read errors rather than serving a misleading successful partial sitemap; failed refreshes are delegated to Next cache behavior. Production outage behavior still needs a controlled environment test.
- The GSC CLI no longer calls the Indexing API or requests its OAuth scope. `seo:index` now inspects coverage and explains manual URL Inspection. Sitemap submission remains a separate explicit command after release.
- Publication dates are updated only for substantive changes. Resource routes have October 2 timestamps.
- With the owner's explicit approval, 11 invoices, quotations and internship PDFs moved from `public/` to `private/documents/`, preserving all SHA-256 hashes. `/admin/document-archive` lists them; every API list/download requires an admin token or session. Responses are private/no-store and noindex. Admin JWT verification now fails closed without a configured secret and rejects expired, malformed or unsupported tokens. The release trace includes all 11 files and the private manifest. Public copies on the live site and earlier deployments remain a release dependency; see [private archive handover](PRIVATE_DOCUMENT_ARCHIVE.md).
- The September 2–29 GSC query/page overlap report returned only two branded queries. No harmful non-brand overlap was established at the five-impression threshold, so no article redirects were introduced. The saved [query evidence](evidence/query-overlap-2026-10-02.json) is limited by sparse/anonymized search data.
- Browser QA found a separate URL-preservation bug: the published `shopify-vs-custom-website-d2c-india` article moved from `d2c-ecommerce-growth` to `web-development`, but the lookup rejected its former category before the existing canonical redirect could run. Published articles now resolve by their globally unique slug and redirect category variants to their current canonical path. This preserves the same article; it does not merge competing articles or publish drafts.
- [Authority and research operations](AUTHORITY_RESEARCH_OPERATIONS.md) contains ready-to-use outreach drafts, evidence requirements, a benchmark collection method and the recurring review process. [Measurement handover](MEASUREMENT_HANDOVER.md) specifies container and CRM acceptance checks.

## Phase status and remaining dependencies

| Growth-system work | Local result | Remaining requirement |
|---|---|---|
| T01–T08 technical foundation, headings, schema, price rendering, event semantics | Implemented locally | Deploy, check production rendering and GTM mappings |
| T09 excluded ecommerce/restaurant pages | Commercial content and links improved where evidence exists | Re-inspect deployed URLs in GSC; investigate the actual exclusion, no guaranteed indexing |
| T10–T11 hierarchy and landmarks | Template cleanup, article-body normalization and category-move canonical handling | Expand browser coverage beyond the sampled public CMS article |
| T12–T13 performance/SSR | Visible hero/proof, no fake loading delay, mobile/reduced-motion WebGL gate, article media defaults | Measure production lab/field data; CrUX API is not configured; no claimed CWV pass |
| T14 article overlap | GSC query/page report reviewed; only branded overlap returned | Retain distinct articles; reassess commercial queries after more data, no speculative redirects |
| T15 sitemap | Cached read-only inventory and accurate stored dates | Production cache failure/recovery validation |
| T16 unsupported indexing submission | Removed | Supported URL Inspection after deployment |
| T17–T18 tracking/attribution | Explicit opt-in, withdrawal, Google consent defaults, server consent gate and regression cases | GA4/GTM access, container consent audit and DebugView reconciliation |
| T19 link hops | Known internal alias links corrected; stale article categories resolve to the published canonical URL | Production crawl after release |
| T20 public business PDFs | Owner-approved private archive, byte preservation, authenticated API/UI and private deployment trace | Deploy; verify production authorization and former public URLs; review prior deployment copies |
| K01, C02, A01, I01 buyer content/internal links | Nine service buyer guides implemented; standalone resources removed at owner request | Qualified-query review and page refinements with real search data |
| C01 B2B workflow and case | Workflow guide implemented | Client permission and delivery records for a factual case study |
| E01/E02 evidence/author contributions | Evidence process and conservative project summary links | Validate legacy numeric claims and obtain signed-off case evidence; see operations register |
| G01 identity | New regional claims reconciled with Prayagraj base | Verify owned profiles and update external records with owner access |
| G02 AI panel | Fixed prompts and observation protocol prepared | Run across named products/settings and record real observations |
| R01/R02 original research | Benchmark protocol and data contract prepared | Collect, check and release actual data; no invented benchmark |
| P01–P04 authority/distribution | Profile copy, review request and pitch drafts prepared | Account access, eligible client permission and explicit sending instructions |
| S01/X01 proof and enquiry usability | SSR project links, safe storage and booking event fixes | Moderated mobile enquiry sessions and deployment event reconciliation |
| M01 commercial cohort reporting | API/UI/validation implemented | Sales adoption, production population and finance reconciliation |
| C03 tools/comparisons | Brief tool + practical guides | Price calculator or study requires validated pricing data |
| C04 expansion and annual updates | Evidence gates and review cadence prepared | Months of outcomes, capacity and research; cannot be completed in a single release |

No code implementation can pre-complete six months of ranking movement, outreach relationships, new client evidence or revenue. These dependent activities are open, not reported as done.

## Current access and evidence limits

The connected GSC tool reports no GA4 properties because the account lacks the GA4 scope. The earlier keyword provider returned `no_api_units`; the supplied 200-keyword inventory still does not establish measured volume or organic difficulty. Neither paid credits nor an alternative invented volume estimate was used. Current baseline: the saved India GSC sample had 14 clicks and 459 impressions for September 1–28; it is not a lead baseline. The business's 15+ monthly enquiries were all-channel, not attributed organic leads.

Use the first validated 28-day organic qualification cohort as the comparison baseline. Evaluate a 10× ambition against qualified inquiries and commercial capacity, not against raw form clicks. It is an ambition, not a forecast or guarantee.

## Release and acceptance

Verified locally after the owner-directed resources removal on 2 October: production build completed with 64 generated pages; all 20 remaining SEO regression tests passed. The rendered-page verifier passed for 14 priority destinations, 17 guide-linked destinations and all 11 archived PDFs in the deployment trace. Local HTTP checks confirm all four removed resource URLs return 404, the homepage returns 200 without resource links, and the sitemap returns 200 without resource entries. See [removal evidence](evidence/resources-removal-2026-10-02.json) and [rendered-page evidence](evidence/implementation-verification-2026-10-02.json). Earlier browser and expanded HTTP checks in the pending-work handover predate this removal. The obsolete brief-builder test was removed with the feature. Authenticated archive regression tests use isolated synthetic tokens and preserve every PDF hash; no real customer logins, CRM mutations, notifications or advertising conversions were used for QA.

The existing Vercel project is linked locally, but the CLI reports signed out. No deployment was performed. GA4 is not yet authorized in GSC Wizard, and the supplied keyword inventory still lacks measured India volume/CPC. These account/evidence dependencies are open, not implementation successes.

1. Run `npm run seo:test`, `npm run build` and `npm run seo:verify -- http://127.0.0.1:3100` against the built local preview.
2. Review the actual diff and owner-dependent claims, then release through the site's normal deployment process, including the private archive assets described in its handover. Local build completion does not mean production changed.
3. Connect GA4/GTM ownership; perform the acceptance sequence in the measurement handover. Use controlled test records and prevent real customer notifications during QA.
4. Check production canonical URLs, robots, sitemap, internal links and form delivery. Submit the deployed sitemap separately and inspect the priority URLs once; give crawlers time to respond.
5. Compare rolling periods with annotations for the release and Google updates. Do not automatically attribute a change during a rollout to this patch.

## Current official guidance checked

Google's [September 2026 spam update](https://status.search.google.com/incidents/XhUDXP7A67iHCD2kmbVu) began September 24 and was described as global across languages, with up to two weeks for rollout. No completion notice was shown when checked October 2. This implementation emphasizes useful, distinct pages and verifiable claims, consistent with [Google's spam policies](https://developers.google.com/search/docs/essentials/spam-policies). There is no special markup that guarantees recovery or a 10× increase.

The [Indexing API documentation](https://developers.google.com/search/apis/indexing-api/v3/using-api) limits supported use to eligible job postings and livestream pages. [Google AI feature guidance](https://developers.google.com/search/docs/appearance/ai-features) continues to emphasize foundational search eligibility. Cache implementation follows the [Next.js unstable_cache reference](https://nextjs.org/docs/app/api-reference/functions/unstable_cache).

# Devacia: organic acquisition system

**Audit date:** 30 September 2026. **Planning period:** October 2026–September 2027. **Canonical site:** https://www.devacia.com. **Scope:** local Next.js code, all 70 live sitemap URLs, their internal links, selected browser checks, Search Console API, configured CRM aggregate, and public search/profile research. Changes are local, not deployed.

Read this with [keyword opportunities](KEYWORD_OPPORTUNITIES.md), [12-month editorial plan](CONTENT_ROADMAP.md), and [implementation and verification](IMPLEMENTATION.md). Raw observations are in [evidence](evidence/live-crawl.json); Search Console business data should remain internal.

## 1. Executive SEO diagnosis

**Devacia has a substantial SEO foundation but has not yet demonstrated repeatable non-branded organic acquisition.** It needs fewer unsupported expansion bets, better evidence on existing commercial pages, and trustworthy measurement. Another batch of city pages or generic blogs is not the first investment.

### Verified performance

Search type: Web; final data; property: `https://www.devacia.com/`. The accessible property is a URL prefix, not a verified domain-wide total. Dates are inclusive. [Source export](evidence/search-console.json).

| Metric | Aug 4–31 | Sep 1–28 | Interpretation |
|---|---:|---:|---|
| Clicks | 44 | 15 | Down 65.9%; only 29 fewer clicks, so avoid causal conclusions from percentages alone |
| Impressions | 841 | 687 | Down 18.3% |
| CTR | 5.23% | 2.18% | Down 3.05 percentage points; query/rank mix must be separated from snippet quality |
| Average position | 33.04 | 33.37 | Broadly stable aggregate; does not establish stability for each query |

July 1–September 28: **89 clicks, 1,969 impressions, 4.52% CTR, average position 29.37**.

In September, the exact brand query `devacia` supplied 10 clicks from 34 impressions, at average position 1.26. Reported query rows account for only 10 of the 15 total clicks and 419 of 687 impressions. **Do not label the other five clicks non-branded:** anonymized or omitted query data prevents that conclusion. Similarly, summing page or query-page rows is not a substitute for property totals.

India supplied 12 clicks/430 impressions; US 1/167. Desktop supplied 8/546; mobile 7/140; tablet 0/1. These samples cannot support a mobile-versus-desktop conversion claim.

The homepage received 10 clicks, Obsidian 2, About 1, Delhi 1, and performance marketing 1. The Delhi page received 309 page-level impressions at average position 44.88: its low CTR is principally a low-ranking opportunity, not proof of a bad meta description. Prayagraj page clicks fell from 9 to 0; the comparable query `web development company in prayagraj` moved from 10 to 3 impressions and roughly position 30.1 to 47.3 at property aggregation. Inspect demand, query mix, deployment history and indexing before calling this a penalty or attributing it to a specific change.

The strongest immediate query opportunity is **enterprise wordpress development services**: 25 impressions, average position 6.6, zero clicks, mapped to `/services/wordpress-development`. That is enough to justify a focused title/content/proof review, not enough to predict leads. Its 25 impressions occur in the current window and not the preceding query export; treat it as emerging observed demand.

### Verified technical and authority state

- All **70 sitemap URLs return 200**, have metadata and self-referencing canonicals, and have unique titles in this crawl. A deliberately nonexistent URL returns 404. HTTP/non-www homepage variants resolve to the canonical HTTPS www site.
- Six URL inspections: homepage, website development, booking systems and blog are indexed; **ecommerce service and restaurant booking system are discovered, currently not indexed**. This is a sample, not a site-wide indexing rate.
- GSC reports the sitemap fetched September 28, with 70 submitted URLs, zero warnings/errors. Its legacy `indexed: 0` field conflicts with positive URL inspections and must not be presented as zero indexed pages.
- Schema builders, direct-answer sections, service-to-proof links, a founder page and attribution scaffolding already exist. Native JSON-LD was absent from the pre-change HTTP HTML; browser inspection found four blocks on the homepage after JavaScript. This is a rendering dependency, not proof Google could not read the schema.
- Two pages had no incoming links from the 70 crawled HTML pages: the clinic system and agency selection guide. They were discoverable via sitemap; “orphan” here means within that HTML link graph, not across every rendered page or backlink.
- [Clutch](https://clutch.co/profile/devacia) publicly lists one review, rated 5.0, describing Yoglivya Wholesale's B2B catalog, quote management and automation project. This corroborates a useful B2B capability; it does not substantiate a numerical revenue uplift. LinkedIn company presence appears in search. A maps search URL is not evidence of a verified Google Business Profile.

### Inferences to validate

The strongest positioning is **commercial websites connected to operational workflows**. Prioritize B2B wholesale/quote systems and D2C ecommerce repair/builds; use booking businesses as a third cluster where real project evidence exists. Broad enterprise positioning, national city expansion and AI-service leadership require stronger proof. These priorities reflect visible capability, third-party evidence and search intent—not verified customer lifetime value.

### Data required

GA4 reports and GTM container configuration; production CRM identity and revenue data; won/lost deals by service; average contract margin; retained-service value; actual delivery capacity; GSC Pages export/manual actions/security reports; backlink export; field Core Web Vitals; consent configuration; Ads/CAPI event logs; verified business/profile ownership; client publication permissions and outcome baselines.

The configured `lead-cluster.leads` aggregate returned no non-deleted records with a BSON `created_at` date in July 1–September 28. Its environment is not independently verified as production and legacy/string dates may fall outside the filter. **This is not proof of zero leads or revenue.** PageSpeed API returned HTTP 429, so no performance score or field metrics are claimed. No GA4/Ads/backlink account was available through the connected tools.

## 2. Technical SEO audit

Priority codes: P0 = measurement/crawl correctness now; P1 = acquisition foundations this month; P2 = evidence-led expansion; P3 = later experiments. The action backlog supplies impact, effort, owner and timeline for each recommendation.

| ID | Issue and why it matters | Affected pages / exact implementation point | Fix and approach | Status / priority |
|---|---|---|---|---|
| T01 | Specific robots groups omit wildcard exclusions; rules do not inherit between groups | `app/robots.js`; `/admin`, `/api/` | Share the exclusion array across general and named search bots; leave `/onboarding` crawlable for its noindex to be read; preserve staging block-all | Implemented locally / P0 |
| T02 | JSON-LD waits for hydration | 52 public route templates under `app/(site)` | Replace `next/script` schema output with native script via `src/components/seo/JsonLd.jsx`; escape `<` in editorial values | Implemented locally / P1 |
| T03 | Organization/local schema and Apple icon point to a live 404 `/logo.png` | `src/seo/schema.js`, `app/layout.jsx` | Reference existing, live-200 `/logo-clean.png` | Implemented locally / P1 |
| T04 | `/plans` delivers no pricing or H1 in initial HTML | `app/(site)/plans/PlansPageClient.jsx`, `src/components/Pricing-plan.jsx` | Restore SSR; deterministic India initial render; resolve browser market after hydration | Implemented locally / P1 |
| T05 | Website-development and Yoglivya hero text is a div, not a heading | `src/components/animations/Text-reveal.jsx`, `src/views/services/BusinessWebsite.jsx`, `src/views/yoglivyastudy.jsx` | Optional semantic tag; opt these two heroes into H1; preserve visual classes | Implemented locally / P1 |
| T06 | Admin route inherits public metadata | `app/admin/[[...slug]]/page.jsx` | Explicit noindex/nofollow and clear inherited canonical; retain authentication | Implemented locally / P1 |
| T07 | Two HTML-graph orphans | Clinic system; agency selection guide | Contextual link from booking solution to clinic; from website-development to selection guide | Implemented locally / P1 |
| T08 | Lead event semantics inflate acquisition reporting | `src/views/Onboarding.jsx`, `src/utils/analytics.js` | Submission attempt becomes `form_submit_attempt`; only API-success generates `generate_lead`; booking-link click is a custom Meta event; CRM decides qualification | Code fixed; GTM/GA4 migration required / P0 |
| T09 | Core commercial pages are discovered but not indexed | Ecommerce service, restaurant booking system | Inspect rendered parity, strengthen actual evidence, add contextual proof-to-service links, improve intent distinction; re-inspect after deployment; sitemap/manual GSC request for eligible pages | Open / P1 |
| T10 | Secondary homepage headings use H1; six blog pages repeat H1 inside body | `src/components/animations/Sec-text.jsx`, `src/sections/home/ClientSuccessShowcase.jsx`; CMS rich HTML rendered by blog post page | Make supporting headings H2; enforce one editorial title when importing body content; review source records instead of blind HTML replacement | Open / P2 |
| T11 | Nested main landmarks | `src/next/PublicShell.jsx` wraps main; blog and `SeoLandingPage.jsx` render another | Set a single layout landmark and section-level template containers; test skip link/focus and all templates | Open / P2 |
| T12 | Images lack explicit HTML dimensions | 278 image occurrences over 70 HTML pages; one missing alt | Inventory aspect-ratio CSS before claiming CLS; use measured sizes/Next Image for content images, responsive `sizes`, descriptive alt, lazy-load below fold; do not lazy-load LCP | Open / P1 after measurement |
| T13 | Important homepage proof mounts only near scroll | `src/views/Home.jsx` `LazySection`, dynamically loaded visuals | SSR a compact case/proof summary and meaningful links; keep heavy decorative canvases deferred; measure LCP/INP/CLS before wider change | Open / P1 |
| T14 | Similar articles and service/problem pages can target the same intent | Two Shopify-not-converting posts; agency-selection, cost and platform comparison pairs | Compare query-page history, purpose, engagement, links; consolidate only if redundant; 301 retired canonical and update CMS links/sitemap | Open / P1 |
| T15 | Sitemap depends on live database and gives static pages a shared date | `app/sitemap.js`, `src/server/blog-store.js`, `src/seo/site.js` | Monitor availability; use per-page substantive modification dates or omit unknown dates; design caching/error handling before changing DB architecture | Open / P2 |
| T16 | Indexing CLI attempts unsupported notifications for agency pages | Existing modified `scripts/gsc-cli.js`, `seo:index` | Stop using generic Indexing API publication; ordinary pages use sitemap discovery/manual GSC URL requests. Preserve user's current script changes pending a separate patch | Open / P0 operational |
| T17 | Tracking can run on staging/dev; initial events may precede dataLayer; possible duplicate dispatch | `app/layout.jsx`, `SiteTracking.jsx`, `analytics.js` | Audit actual GTM tags, consent and environment gates; establish a single dispatch owner; queue events reliably and exclude internal/test traffic | Open / P0 |
| T18 | Latest attribution is rewritten on every page/event; storage writes can throw | `src/seo/attribution.js` | Separate session entrance from current page; preserve first touch, update last non-direct only on qualifying session; catch storage-denied exceptions; test campaign→internal→direct return | Open / P0 |
| T19 | Some internal links still use redirect alias | Live `/services/custom-builds` links; `next.config.js` correctly redirects | Update source links to `/services/custom-software-development`; keep redirect for old URLs | Open / P2 |
| T20 | Client proposals/invoices reside under public assets | `public/*Invoice*.pdf`, `public/*Quotation*.pdf`, draft PDFs | Inventory which documents are intentionally public; move private delivery behind authenticated/signed storage; noindex is not access control. Preserve documents and existing user changes | Open / High-priority owner review |

Positive checks: metadata factory supplies canonical/OG/Twitter; dynamic blog metadata uses post URLs; wrong category redirects to canonical; nonexistent posts use `notFound`; industry dynamic params are constrained to actual records; no obvious mass-generated city permutations; published status filters blog output; fonts use local loading and `display: swap`; APIs/admin routes separated; broken URL returns genuine 404. No pagination currently implemented on category lists: as volume grows, add crawlable numbered pages with their own canonicals rather than relying on client-only search.

**Coverage limits:** this is a comprehensive SEO-surface review, not a line-by-line security audit of all admin/backend code. HTML word counts are triage signals, not a minimum-word ranking rule. Source changes and live production may differ. API endpoints, authenticated screens, all external images, every browser interaction and full WCAG compliance were not exhaustively tested.

## 3. Keyword opportunity map and business intent

The [opportunity map](KEYWORD_OPPORTUNITIES.md) separates observed GSC queries from unmeasured hypotheses, provides all requested query fields, and assigns one canonical page per intent. Search volume, CPC and keyword difficulty are **Data required**. A “zero-volume candidate” means valuable specific language to validate; it does not claim a tool measured zero.

| Industry → ICP | Problem / buying trigger | Intent → service | Landing page | CTA → conversion event |
|---|---|---|---|---|
| Wholesale → founder/operations manager | Spreadsheet quotes, distributor inquiries lost, catalog too large for WhatsApp | Replace manual quote workflow → custom software + automation | Existing `/services/custom-software-development`; proposed wholesale quote system page | Map quote workflow → accepted brief → sales-qualified lead |
| D2C → founder/ecommerce manager | Traffic or ad costs rising, mobile checkout weak, migration pending | Diagnose/fix conversion → ecommerce + CRO | `/solutions/ecommerce-conversion-rescue` and `/services/ecommerce` with distinct scope | Request store diagnostic → brief → paid scope |
| Hospitality → restaurant owner/manager | Reservation clashes, phone-only bookings, manual follow-up | Booking system purchase → custom booking | `/industries/restaurants/booking-ordering-system` | Review reservation flow → confirmed meeting |
| Service businesses → owner/marketing lead | Website receives visits but no qualified inquiries | Lead website rebuild → website development | `/services/lead-generation-websites` | Request lead-path review → qualified brief |
| WordPress teams → marketing/operations lead | Maintenance debt, security concerns, content editing bottleneck | Agency evaluation → WordPress development/support | `/services/wordpress-development` | Discuss rebuild scope → qualified opportunity |
| Startup → technical/nontechnical founder | Validated demand, deadline, insufficient internal engineering | MVP delivery comparison → software/MVP | `/services/startup-mvp-development` | Scope MVP → discovery call → proposal |
| Clinics/gyms → operator | Scheduling/admin friction | Booking/lead system → website + automation | Existing healthcare/gym pages | Workflow consultation → brief; do not promise health outcomes |

Prioritize B2B and D2C until margin/close-rate data says otherwise. Qualify on business problem, decision authority, budget fit, timeline and ability to supply access/data. “Enterprise” search visibility is useful, but do not imply enterprise credentials from a ranking alone.

## 4. Entity and topical authority map

Retain the existing URLs. Create coherent clusters through purpose and links instead of moving working routes just to make folder names uniform.

```text
/  Devacia company and commercial overview
├─ /about ↔ /author/laraib-asjad ↔ verified external profiles
├─ /service  commercial navigation
│  ├─ /services/website-development  website acquisition pillar
│  │  ├─ wordpress-development / landing-page-design / lead-generation-websites
│  │  ├─ /problems/why-your-website-is-not-converting
│  │  ├─ /pricing/website-development-cost-india
│  │  ├─ /compare/how-to-choose-a-web-development-agency
│  │  └─ Fitniya proof + selected website articles + lead-path tool
│  ├─ /services/ecommerce  storefront pillar
│  │  ├─ shopify-development / conversion-rate-optimization
│  │  ├─ /solutions/ecommerce-conversion-rescue
│  │  ├─ /industries/ecommerce/conversion-growth-system
│  │  └─ Almina/Eclat proof + checkout/speed guides + D2C research
│  ├─ /services/custom-software-development  operational systems pillar
│  │  ├─ business-automation / startup-mvp-development
│  │  ├─ /solutions/custom-booking-systems
│  │  ├─ restaurant / clinic / gym workflow pages
│  │  ├─ proposed /solutions/b2b-wholesale-quote-system
│  │  └─ Yoglivya Wholesale proof + workflow cost calculator + quote study
│  ├─ /services/performance-marketing  demand + funnel pillar
│  │  └─ landing-page/CRO support + verified campaign experiments
│  └─ /services/generative-engine-optimization  search visibility pillar
│     └─ entity/crawl diagnostics + reproducible search experiments
├─ /case-study  evidence directory, related from every pillar
├─ /blog  editorial discovery, articles connect back to owning service
├─ proposed /research  methods, datasets and benchmark releases
├─ proposed /tools  assessments with service-specific recommendations
└─ /plans → /contact or /onboarding → CRM outcome
```

| Hub | Primary / supporting entities | Parent and support relationships | Anchor strategy | Schema / commercial CTA |
|---|---|---|---|---|
| Websites | Website development; CMS, lead capture, landing pages, accessibility | `/service` → website pillar ↔ problem/pricing/selection guide ↔ Fitniya | “lead-generation website”, “website project cost”, exact case name when relevant | Service, WebPage, BreadcrumbList; scope a rebuild |
| Ecommerce | Ecommerce development; Shopify, catalog, checkout, CRO | `/service` → ecommerce ↔ rescue ↔ industry workflow ↔ Almina/Eclat ↔ research | “diagnose checkout abandonment”, “custom storefront project” | Service, Article proof; request store diagnostic |
| Systems | Custom software; RFQ, CRM, booking, automation, MVP | Software pillar ↔ automation/booking ↔ wholesale/hospitality ↔ case/workflow study | “wholesale quote workflow”, “reservation system” | Service, Article, later Dataset; map workflow |
| Marketing | Performance marketing; measurement, lead quality, landing-page fit | Marketing pillar ↔ landing page/CRO ↔ campaign evidence | “landing-page conversion review” | Service + Article experiment; audit funnel |
| Search | SEO/GEO; crawlability, entity identity, evidence/citations | GEO pillar ↔ measured technical articles ↔ research; publish SEO service only if actually offered | “search visibility audit”, “research methodology” | Service + BlogPosting; diagnostic |

Build only the first three hubs deeply in the first quarter. Avoid launching a separate page for every synonym. No new location pages until distinct local work, market context and credible service-area evidence can support them.

### Semantic schema architecture

Current IDs should remain stable: `https://www.devacia.com/#organization`, `/#website`, `/#founder`; page IDs use canonical URL plus `#page`, service `#service`, article `#post`, breadcrumb `#breadcrumb`. Reference the same company/founder everywhere, rather than creating per-city organizations.

| Template | Types / relationships | Evidence condition |
|---|---|---|
| Home/about | Organization, WebSite; AboutPage about Organization; founder Person worksFor Organization | Canonical company facts and actual profiles; sameAs only verified identity equivalents |
| Founder | Person, ProfilePage or WebPage; authored works point back to founder ID | Real biography, named role, actual project contribution; no fictional credentials |
| Contact | ContactPage about Organization | Published contact details match company record |
| Service/solution/industry | Service provider Organization; mainEntityOfPage → WebPage; areaServed accurate | Service actually delivered; descriptions match visible content |
| HQ | LocalBusiness at real office, parentOrganization company | Verify address/eligibility; service-area pages do not imply branch offices |
| Blog | BlogPosting, author Person, publisher Organization, mainEntityOfPage canonical | Actual author and publication/modification dates, visible sources |
| Case study | Article, company publisher, actual author/reviewer, service subject | Identify paid client vs demonstration; permitted evidence only |
| Hubs | CollectionPage + ItemList + BreadcrumbList | Items and hierarchy visible/crawlable |
| FAQ sections | Optional FAQPage with page-specific ID | Actual visible answers; no Google FAQ rich-result KPI |
| Pricing | Offer/OfferCatalog attached to real services | Visible scope, currency, starting-price qualification and exclusions; avoid misleading fixed-price precision |
| Research | Dataset only when an actual reusable dataset is published; Article for report | Methodology, creator, coverage/date, license, distribution URL, limitations |
| Videos/images | VideoObject/ImageObject where appropriate | Real media URL, accurate thumbnail, dates and duration if known |
| Product | Only an actual product, not an agency service disguised as one | Product details and offers exist |
| Review/AggregateRating | Do not add self-serving agency star markup for search eligibility | Link actual third-party reviews; do not invent or aggregate incompatible ratings |

Example relationship for the proposed quote-system page (publish only alongside the actual page and matching visible service description):

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.devacia.com/solutions/b2b-wholesale-quote-system#service",
  "name": "B2B wholesale quote system development",
  "url": "https://www.devacia.com/solutions/b2b-wholesale-quote-system",
  "provider": {"@id": "https://www.devacia.com/#organization"},
  "mainEntityOfPage": {"@id": "https://www.devacia.com/solutions/b2b-wholesale-quote-system#page"},
  "serviceType": "Custom software development"
}
```

Google's [robots specification](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec) explains group selection. [Next.js JSON-LD guidance](https://nextjs.org/docs/app/guides/json-ld) supports native script output and escaping. Schema expresses meaning; it does not guarantee rankings or citations.

## 5. AEO strategy

Use each page's real buyer question as an H2 followed by a direct 40–80-word answer when appropriate, then evidence, caveats, examples and a next step. That length is an editorial convention, not a ranking formula. Keep primary answers in server HTML and visible to humans. Avoid repeating generic FAQs across every service.

| Important page / template | Question to answer | Extractable structure and evidence |
|---|---|---|
| Home/about | What does Devacia build, and for whom? | Concise company description, actual service areas, project links |
| Website service | When does a business need a custom website rather than a builder? | Fit/non-fit table, editing/integration/ownership tradeoffs |
| WordPress | What does an agency WordPress rebuild include? | Scope table: content model, migration, redirects, QA, support; real delivery example |
| Ecommerce/Shopify | Should we fix our current Shopify store or rebuild? | Diagnose-before-rebuild decision tree; measured store example |
| Ecommerce rescue | Why is my store getting traffic but no orders? | Stepwise funnel diagnostic; distinguish traffic quality from checkout friction |
| Custom software/automation | When should a business replace spreadsheets with custom software? | Workflow thresholds, integration map, recurring cost assumptions |
| Wholesale solution | Can retailers request a quote without paying online? | Catalog → quote → qualification → approval workflow, actual screenshots |
| Booking/industry pages | Can bookings include deposits, reminders and staff routing? | Capability matrix; exception/cancellation examples; identify platform limits |
| MVP/AI-native | What belongs in an MVP, and where should AI be avoided? | Scope boundary, human review, data access and failure-state examples |
| Performance marketing/CRO | Why do ads produce inquiries that never become customers? | Landing promise, lead qualification, follow-up, CRM stage checklist |
| GEO | Why might a business not appear in AI search answers? | Crawl/index eligibility, evidence availability and measured prompt results; no guaranteed placements |
| Pricing/plans | What changes website cost and ongoing ownership cost? | Line-item assumptions, platform fees, maintenance, inclusions and exclusions |
| Comparisons | Which platform or agency is suitable for this workflow? | Published evaluation criteria, tradeoffs, scenarios; avoid self-serving “best” lists |
| Cases/research | What changed, how was it measured, and what did not improve? | Before/after dates, denominator, method, confounders, source links |
| Founder/contact | Who will do the work and what happens after I inquire? | Named responsibility, real experience, process/timing, optional contact paths |

Google's [current updates](https://developers.google.com/search/updates) state that FAQ rich results stopped appearing in May 2026. Keep useful FAQs for buyers and semantic clarity; do not forecast FAQ stars/snippets. Featured snippets, PAA and assistant citations are outcomes to observe, not placements a content format guarantees.

## 6. GEO strategy

Make Devacia a clear entity with identifiable work and useful sources. Google says its AI features use foundational SEO eligibility and do not require special additional markup. Its guidance also says `llms.txt` is unnecessary for Google Search visibility. Maintain the existing files only as low-cost supplemental documentation, not a primary growth project. [Google AI features](https://developers.google.com/search/docs/appearance/ai-features).

1. Establish one fact record in `src/seo/site.js`: legal/trading name distinction if relevant, real HQ, service areas, founder, contact and official profiles. Reconcile site, Clutch and LinkedIn descriptions.
2. Turn Yoglivya Wholesale delivery into a documented workflow asset. The current Yoglivya page emphasizes brand/rebrand visuals; the external review describes operational software. Distinguish projects and dates rather than silently treating them as the same scope.
3. Publish reproducible research and project-specific technical explanations; include method, author, dates, screenshots, limitations and original figures. Make tables usable in HTML, with optional downloads.
4. Earn references in relevant publications/communities through those assets. Do not buy citations or create empty profiles.
5. Maintain a fixed test panel of 20 commercial/problem questions across relevant answer engines. Monthly, record exact prompt, locale, date, product/version where visible, whether web search was used, cited URL, competitor citations and answer accuracy. Repeat a subset to show variability. Separate citation from unsupported brand mention.

KPI: citation presence within that panel and qualified referrals where attributable. This is **not market-wide AI share of voice**. Server crawler hits, if available, show access rather than recommendation. Analytics and GSC cannot be assumed to isolate every AI Overview visit. Never claim a causal citation increase from adding schema alone.

## 7. Content roadmap

The [12-month plan](CONTENT_ROADMAP.md) separates commercial pages, industry pages, case studies, research, thought leadership, tools, comparisons and educational content. It is a sequence of briefs and updates, not a commitment to publish every cell. Assume one owner-editor, founder review and engineering support; confirm capacity before setting output targets.

Publication gate: differentiated intent; firsthand input; evidence source/permission; correct metadata/canonical; server-rendered content; relevant service and proof links; accessible media; explicit CTA; attribution QA. Update a page rather than add a URL when intent is already covered. Never fabricate project results to fill a calendar.

## 8. Original research plan

These are proposed studies, not completed research. Sample sizes are planning targets; run a pilot and revise based on feasibility. No benchmark percentage exists until collection and QA finish.

| Study / unique question | Difficulty and required data | Method / limits | Link / PR / lead / reuse potential |
|---|---|---|---|
| B2B quote journey benchmark: how easy is it to request a usable quote? | Medium; 60–100 public wholesale catalogs, 5–10 consenting operator interviews | Stratify by category/business size; score visible catalog, MOQ/context, RFQ path, mobile tasks; do not submit fake inquiries | High / Medium / High / High: workflow checklist, visuals, quote calculator |
| Independent restaurant booking audit | Medium; 75–100 public restaurant sites across defined markets | Record mobile booking steps, visible deposits/reminders policy, availability and failure states; no fake reservations; distinguish unavailable from absent | High / High locally / High / High: regional report, owner guide |
| D2C mobile storefront benchmark | High; 75 stores, repeat lab runs, public field metrics where available | Stratify platform/category; compare LCP/CLS/INP only with compatible measurement; lab TBT is not field INP; report medians/distributions, not one-run rankings | High / High / High / High: speed tool, technical teardown |
| Quote-to-response study | High; 20–30 consenting client/partner businesses with timestamped CRM events | Use real inquiries, de-identify, report business-hours rules and median/p90, control for lead source; no covert lead submissions | High / High / High / High: automation case, follow-up template |
| Scope-adjusted website ownership cost study | Medium; 20–30 consenting project owners/contracts plus documented public platform fees | Separate build/maintenance/platform/content/internal time, currencies and taxes; disclose sample selection; do not present agency quotes as market averages | High / Medium / High / High: calculator, pricing guide |
| Booking/automation experiment log | Medium; 3–5 consenting implementations with before/after task measurements | Record task time/error rates and time window; separate simultaneous changes; publish null/negative findings; no causal revenue claim without design support | Medium / Medium / High / High: case series, talks, reusable checklist |

Research protocol: define population and inclusion/exclusion rules before sampling; pre-register rubric and dates; have a second reviewer rescore 10–20%; record missing data; publish denominator for each metric; review client privacy/permissions; disclose commercial interest; release a suitably licensed anonymized dataset when possible. Only publish Dataset schema for that released dataset. A public website audit cannot establish conversion rate, analytics correctness, internal AI adoption, or revenue without owner data.

Pilot the quote journey first because it matches externally corroborated delivery. Use clear descriptive findings; avoid composite “digital maturity scores” unless weights and sensitivity are explained. Produce one report, 4–6 defensible figures, a methodology page, a sales diagnostic and targeted editorial pitches from each completed study.

## 9. E-E-A-T and author authority

Founder page already exists; expand it with Laraib's actual role in named builds, dated technical contributions, portfolio links and relevant public profiles. Add credentials only if verifiable. Connect Person → Article → Organization → Service → Case Study via visible links and stable IDs. Have the person who did the work review the technical narrative and label coauthors/reviewers accurately.

Maintain an evidence register: claim, page, source, date range, sample, owner, permission, caveat, review date. Audit “15+ projects”, performance guarantees, conversion claims, client logos and testimonials in source components against this register. Do not assert those claims are false because documentation was unavailable; do not repeat them as audited facts either.

Third-party validation priorities: detailed client reviews at real delivery milestones; client-authorized project acknowledgments; useful open-source examples where IP permits; developer/design community talks; expert contributions based on shipped work; interviews about the research process. Avoid generic certification collection as a substitute for proof.

**Negative case-study template:** hypothesis → dated intervention → observed outcome → original evidence → competing explanations → what was corrected → post-correction outcome → limitations and transferable lesson. A suitable first candidate is the agency's own SEO/tracking experiment: document the attempt/success event mistake and correction, then report subsequent measured results when available. Another candidate is a page that remained unindexed; do not invent why Google excluded it. Keep unsuccessful tests in the archive and preserve client anonymity where needed.

## 10. Backlink and digital PR plan

Build links to the asset that solves the editor's or reader's problem. Launch one substantive study before scaling outreach.

- **Linkable assets:** quote-flow benchmark, anonymized workflow diagram/template, D2C measurement methods, total-cost calculator, documented negative experiment.
- **Publications:** shortlist relevant B2B commerce/retail, hospitality, WordPress/Shopify and regional business editorial outlets after reviewing their current audience and contributor policy. Their willingness to publish is Data required; no placement promises.
- **Expert contributions:** answer a specific editorial question with original evidence and disclose commercial role. Author profile and report source links should be natural attribution.
- **Partnerships:** complementary ERP/CRM implementers, designers and business associations can co-host demonstrations or studies. Use actual relationships; no compulsory reciprocal-link network.
- **Community authority:** LinkedIn teardown posts for operators; helpful workflow answers in relevant business/WordPress/Shopify communities; Reddit only where self-promotion rules permit; technical findings on developer forums. Use anonymous/permissioned examples, disclose affiliation, answer fully without requiring a click. Treat Quora, Indie Hackers, HN, Slack and Discord as candidates conditional on audience fit—not a posting checklist.

### Unlinked mention reclamation workflow

Monthly searches: `"Devacia" -site:devacia.com`, `"Laraib Asjad" -site:devacia.com`, exact research title, distinctive published statistic, project title. Use reverse image search for owned original visuals, with license checks. Log source URL, mention context, whether already linked, destination, publication/contact, relevance and status. Current search verified profile presence but did **not** establish a list of reclaimable unlinked mentions.

Prioritize editorial relevance + page relevance + existing relationship + likelihood of helpful attribution; use domain metrics as secondary evidence only. Verify the mention refers to this Devacia, not a similar surname/brand. Request a correction/source attribution once; one contextual follow-up after 7–10 business days if appropriate. No mass scraping/contact spam, link purchases or review swaps.

Draft only: “Your article references our [specific study/project]. The underlying methodology and source are available at [canonical asset]. If useful to readers, would you add that source beside the reference? I can also clarify the sample or limitations.” No outreach messages have been sent.

## 11. Aggregator strategy and niche profiles

Search sampling returned relevant India agency category pages from [Clutch](https://clutch.co/web-developers/india), [DesignRush](https://www.designrush.com/agency/web-development-companies/in) and [GoodFirms](https://www.goodfirms.co/companies/web-development-agency/in). This demonstrates competing discovery surfaces, not their precise Google ranks in each buyer's location.

| Platform | Current evidence | Next move | Success test |
|---|---|---|---|
| Clutch | Devacia profile and one B2B software review verified | Update service focus/portfolio and pricing consistency; request eligible genuine reviews from completed clients; link relevant proof | Qualified referral briefs and opportunities, not profile impressions alone |
| LinkedIn | Company result found; founder URL in source | Consistent company facts; founder technical case notes; research distribution | Buyer conversations and branded demand, separated from paid promotion |
| GoodFirms | India category present; Devacia listing not verified by this audit | Verify existing ownership before creating anything; complete only if category fit and maintainable | Traceable qualified referral |
| DesignRush | India category present; Devacia membership not verified | Evaluate free/eligible profile after core proof; no paid plan without tracked economics | Incremental qualified pipeline versus cost |
| Google Business Profile/Bing/Apple | Source supports optional URLs; Maps search link is not ownership proof | Confirm real office eligibility and owner access; accurate NAP and service areas | Local calls/leads + correct identity |
| GitHub/design communities | Ownership/activity Data required | Publish meaningful permitted code/design work under real identity | Relevant references, expert credibility |
| G2/marketplaces | No evidence of a Devacia software product listing | Use only if a real offered product/service fits current platform eligibility | Buyer fit; otherwise skip |

Dual ownership: improve own high-intent landing pages and become credible on the directories buyers already use. Profile fields should match name, founder, domain, location, service focus, visual identity and social links. Avoid claiming offices in Mumbai/Delhi/Bangalore merely because a service-area page exists. One useful maintained profile is better than twenty empty ones. Start with existing Clutch + LinkedIn before adding others. Verify actual profile URLs before adding `sameAs`.

## 12. Social proof strategy

| Moment of uncertainty | Proof to place near decision | Evidence rule |
|---|---|---|
| Homepage hero CTA | One named project outcome/workflow plus case link; restrained third-party review reference | Work must be live/permissioned; no unsupported aggregate totals |
| Website/WordPress service CTA | Relevant CMS/build screenshot, scope delivered, client quote | Explain contribution and ongoing ownership |
| Ecommerce/rescue CTA | Before/after journey with dates and comparable analytics where available | If conversion data absent, show implemented behavior—not invented uplift |
| B2B software CTA | Yoglivya Wholesale quote/admin workflow + relevant Clutch review link | Distinguish project from brand/rebrand story; permission for internal screens |
| Industry booking CTA | Actual booking workflow, exception handling, staff handoff | Label demos explicitly if no client example |
| Case-study ending | Method, scope, timeframe, limitations, client reference | No “success” claims without denominator/baseline |
| Pricing/proposal | Deliverables, exclusions, revisions/support/ownership; corresponding project example | Explain starting price vs quotation; align countries/currencies |
| Contact/form | Named response owner, process, privacy reassurance and one concise relevant proof link | Do not bury form beneath large trust/navigation blocks |
| Booking confirmation | Concrete next step, meeting agenda, who attends | A scheduled call is separate from attended/qualified |

The observed mobile contact page places a long company-reference area before the brief form and offers both scoped quote and instant call paths. Test bringing the choice and next step higher while keeping concise proof nearby. Existing homepage proof is scroll-mounted, so place a small meaningful proof block in initial HTML. These are CRO hypotheses, not measured wins.

## 13. Internal linking architecture

Crawl evidence counts unique linking pages and includes navigation/footer links; it is not an internal PageRank calculation. Before the patch: clinic and selection guide had zero incoming HTML links; ecommerce rescue and booking solutions two each; ecommerce/gym/restaurant industry pages one each; lead-generation service two. Footer-linked city pages receive much broader sitewide exposure than these commercial systems.

Recommended edges (I01): website pillar → lead generation/selection/pricing → Fitniya; ecommerce pillar → rescue/industry → Almina/Eclat → ecommerce service; software pillar → automation/quote system → Yoglivya Wholesale → software service; booking solution → restaurant/clinic/gym → relevant booking proof → booking service. Research and tools each link to one or two owning services, and related services link back to useful evidence.

For every new commercial page require links from its parent, a related problem/education asset and a real proof/research asset where available. This is an editorial gate, not an arbitrary ranking quota. Use concise descriptive anchors that explain the destination. Retain useful cross-hub links; do not isolate silos artificially. Review broken links/redirect chains monthly and compare contextual inlinks separately from repeated chrome links.

**Programmatic SEO decision:** current finite industry data model is acceptable as a rendering system. Do not expand the Cartesian product of industry × problem × system × location into URLs. Add a page only with a distinct workflow, actual delivery capability, unique questions, relevant proof and a meaningful CTA. Reject location swaps and near-identical pages. Competitor comparison pages require fair, current evaluation with sourced facts; prioritize platform/workflow comparisons first.

## 14. Conversion optimization and measurement

Primary path: **organic landing → relevant proof → diagnostic/brief → confirmed consultation → qualified opportunity → scoped proposal → revenue**. A buyer who is ready should be able to inquire directly; do not force every visitor through every asset.

| Event / record | Definition and source of truth | Reporting role |
|---|---|---|
| Organic session | Analytics acquisition rules, valid session/entrance, internal traffic excluded | Denominator; not equal to GSC clicks |
| Service interest / CTA click | Actual interaction, page/service/CTA ID | Microconversion only |
| Form start | First meaningful input, once per form session | Friction diagnostic |
| `form_submit_attempt` | Validated submission attempted | Never a lead/key event |
| `generate_lead` | Completion API accepts submission | Lead event; deduplicate by lead/submission ID |
| `strategy_call_booked` | Verified scheduling event; reconcile provider webhook | Booking; do not sum as an additional unique lead |
| `qualified_lead` | Sales applies agreed fit criteria in CRM | Primary quality KPI; browser cannot infer qualification merely from submission |
| Meeting attended | CRM confirmed attendance | Sales conversation |
| Opportunity | Need, owner, scope and realistic commercial next step recorded | Pipeline count/value |
| Closed won | CRM/invoice reconciliation, currency and revenue definition | Revenue, reported by acquisition cohort |

Implementation already changed attempt/success semantics in code; migrate GTM triggers/GA4 key-event configuration and any reporting tied to the old `qualified_lead` browser event before rollout. Retain the Meta browser/server shared event ID for submission deduplication. Confirm actual GA4 behavior with Tag Assistant/DebugView and a controlled staging/test lead; no live customer-facing form was submitted in this audit. Booking postMessage origin and event verification should also be reviewed before treating browser messages as confirmed outcomes.

CRM fields: lead ID, created date, first landing page, first source/medium/campaign, last non-direct source, current page, service cluster, consented analytics identifier if available, qualification reason, meeting state, opportunity value/currency, expected close, closed value/date and attribution confidence. Keep personal contact details out of analytics event parameters. Audit URL/query/referrer fields for accidental personal information.

Revenue reporting: first-touch organic revenue and organic-assisted revenue are distinct views, never added together. Use CRM stage history and a defined attribution window; display unknown attribution explicitly. AI referrals are recognizable referrers/self-reports when available, not all visits from users who once saw an AI answer.

| Cadence | Monitor | Decision |
|---|---|---|
| Weekly | Availability/robots/sitemap, priority URL inspection sample, query-page changes, form error/success reconciliation, new qualified leads | Fix blockers and incorrect data first; annotate deployments |
| Monthly | Branded/non-branded reported queries plus unknown bucket, intent clusters, organic landing cohorts, leads/meetings/opportunities, relevant referring domains, mentions, fixed AI question panel | Refresh pages with buying demand and weak proof; compare rolling periods with sample sizes |
| Quarterly | Closed revenue/gross margin by acquisition cohort/service, win/loss reasons, content costs, cohort lag, research citations, field CWV | Reallocate budget to profitable services; retire redundant content after evidence review |

Leading metrics: indexed priority pages, non-brand commercial impressions, position distribution on a fixed query set, CTR conditional on rank/intent/device, useful referring domains, evidence citations and engagement. Lagging metrics: qualified leads, attended meetings, opportunities, closed revenue and contribution margin. Do not impose a traffic target without a sales-capacity/economic model.

Business model for planning: expected gross profit = qualified leads × opportunity rate × win rate × average contract contribution. All inputs are **Data required**. Proposed acceptance goals are operational: correct tracking, zero confirmed orphans among priority pages, all priority pages technically eligible, documented proof on each chosen hub. Numeric lead targets follow the first trustworthy baseline.

## 15. 30 / 60 / 90-day execution

### Days 1–30: repair and focus

Week 1: review/deploy tested technical patch; migrate analytics events; verify production environment; inspect the two excluded commercial pages; freeze unsupported Indexing API usage; collect client proof permissions. Owner: engineering + analytics + founder. Acceptance: native schema parses, price/heading content exists in HTML, success/failure events are distinct, no production regressions.

Week 2: reconcile first/session attribution and CRM outcomes; audit published metrics/logos; document real office and official profiles; publish revised WordPress scope/fit answers after expert review. Acceptance: one traceable test lead from entrance to CRM and an evidence register for critical claims.

Weeks 3–4: enhance ecommerce and software pillars; brief the B2B quote-system page using the real Yoglivya Wholesale work; distinguish duplicate article intents; connect contextual links. Capture initial business KPIs, review indexing after crawl rather than daily resubmission. Acceptance: three coherent primary service paths with proof and inquiry routes.

### Days 31–60: evidence and clusters

Publish the permissioned B2B case and one ecommerce case/update; add founder project contributions; improve restaurant/industry pages only with credible workflows; roll out AEO sections to primary pages; resolve confirmed article overlap with redirects if warranted. Start quote benchmark pilot and cost calculator specification. Acceptance: each chosen hub has commercial page, useful supporting answer, proof and attributable CTA. Exclude unsupported outcomes from publication.

### Days 61–90: research, distribution and conversion

Release the first research asset if quality gates pass; prepare tailored editorial/partner pitches; use permitted community formats; request genuine eligible client reviews; record fixed AI-panel baseline and first repeat. Test contact-path friction and lead qualification through moderated sessions before traffic-based A/B tests. Acceptance: reproducible report, documented citation/outreach log, correct CRM quality stages and first revenue-cohort review. No ranking or lead guarantee.

## 16. Six-to-twelve-month growth strategy

Months 4–6: strengthen the winning two or three hubs; publish a second differentiated case and benchmark; improve tools based on real usage; test a small number of relevant partnership channels. Add a new industry page only when proof, margin and workflow fit are established. Re-evaluate US acquisition after qualified demand, not just impressions.

Months 7–9: update original data with consistent methods, deepen implementation guides and distribute follow-up findings. Compare recurring maintenance/automation opportunities with one-off builds using contribution margin. Train editorial review around sources and claim precision so output can grow without generic filler.

Months 10–12: publish the annual benchmark update, identify which assets assist won deals, and consolidate underperforming duplicated content. Expand one successful niche at a time. Compounding comes from reusable research, stronger proof, better service pages and earned references feeding qualified demand—not simply an increasing URL count.

Decision gates: scale a cluster when delivery capability, relevant impressions, qualified inquiries and commercial economics align; refresh when search demand exists but buyer evidence is weak; consolidate when multiple pages satisfy the same intent; hold when evidence/capacity is missing. Organic revenue may lag inquiries by months; use cohorts and state uncertainty.

## 17. Prioritized action backlog

Effort: Low ≈ under one working day; Medium ≈ 2–5 days; High ≈ multiweek/dependent work. These are planning estimates. Founder validates staffing. Tasks within each grouped recommendation inherit its category, impact and horizon.

| ID / Task | Category | Impact | Effort | Owner | Dependency | KPI / acceptance | Timeline |
|---|---|---|---|---|---|---|---|
| T01 crawler group consistency | Technical | High | Low | Engineer | Review/deploy | Correct generated robots; onboarding noindex readable | Immediate |
| T08 event semantics + GTM migration | Analytics | Critical | Medium | Analytics + engineer | Container access | API success equals lead; click/attempt excluded | Immediate |
| T17 dispatch/consent/environment QA | Analytics | High | Medium | Analytics | GTM + consent ownership | One intended event; no internal/test pollution | Immediate |
| T18 session attribution and storage safety | Analytics | High | Medium | Engineer | CRM field contract | Entry attribution survives internal navigation | 30 Days |
| T16 stop unsupported Indexing API use | Technical | High | Low | SEO + engineer | Preserve current script edits | Ordinary URLs use supported discovery | Immediate |
| T02 native escaped JSON-LD rollout | Technical | High | Low | Engineer | Tested patch | Valid native schema in HTML | Immediate |
| T03 missing logo references | Entity SEO | Medium | Low | Engineer | Existing asset | Image URL 200 in schema/icons | Immediate |
| T04 pricing SSR + market hydration | Technical | High | Medium | Engineer | Tested patch | Pricing readable without JS; selectors work | Immediate |
| T05 page headings | Technical | Medium | Low | Engineer | Tested patch | Meaningful hero H1 | Immediate |
| T06 admin metadata | Technical | Medium | Low | Engineer | Auth remains | Noindex + no inherited canonical | Immediate |
| T07 connect two orphaned pages | Content | High | Low | Engineer/editor | Tested patch | Incoming relevant HTML link to both | Immediate |
| T09 ecommerce/restaurant index investigation | Technical | High | Medium | SEO + editor | GSC + proof | Eligible pages re-inspected; outcomes recorded | 30 Days |
| T20 public business document review | Technical | High | Medium | Founder + engineer | Confirm intended access | Private assets served appropriately | Immediate |
| K01 WordPress commercial query refresh | Content | High | Medium | Editor + founder | Delivery evidence | Query CTR/clicks and qualified briefs, with sample | 30 Days |
| E01 evidence register / claim audit | Entity SEO | High | Medium | Founder | Client records/permissions | All primary commercial claims sourced | 30 Days |
| C01 B2B quote-service page + real case | Content | High | High | Founder/editor/engineer | Yoglivya scope confirmation | Qualified workflow inquiries | 60 Days |
| C02 ecommerce pillar + rescue evidence | Content | High | Medium | Editor + delivery lead | Project evidence | Relevant impressions, inquiries, index state | 30 Days |
| T14 intent overlap review/consolidation | Content | High | Medium | SEO/editor | Query-page and content comparison | One primary destination per intent | 30 Days |
| I01 contextual hub links | Content | High | Medium | Editor/engineer | Hub/intent map | No priority orphan; relevant proof/service edges | 60 Days |
| T12/T13 measured media/SSR performance work | Technical | High | High | Engineer | Lighthouse/CrUX/RUM baseline | p75 LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 where enough field data | 60 Days |
| T10/T11 heading/landmark cleanup | Technical | Medium | Medium | Engineer/editor | Rendered template QA | Accessible hierarchy and one main | 30 Days |
| T15 sitemap dates/resilience | Technical | Medium | Medium | Engineer | CMS timestamp/cache design | Accurate dates, monitored availability | 60 Days |
| T19 remove internal redirect hops | Technical | Low | Low | Engineer | Canonical URL map | Direct internal links | 30 Days |
| A01 buyer-answer sections | AEO | High | Medium | Editor + expert | Page-specific questions/evidence | Useful visible answers with sources and CTA | 60 Days |
| G01 company/person identity reconciliation | GEO | High | Medium | Founder/editor | Verified profile ownership | Consistent canonical facts/IDs | 30 Days |
| G02 fixed AI citation panel | GEO | Medium | Medium | SEO | Fixed prompts/method | Reproducible observations, no inflated SOV | 90 Days |
| E02 author + negative-case evidence | Entity SEO | High | Medium | Founder | Real contributions/results | Evidence-linked author/case pages | 60 Days |
| R01 quote benchmark pilot/release | Digital PR | High | High | Research lead | Sample/rubric/QA | Reproducible source asset, relevant citations | 90 Days |
| R02 other research studies | Content | Medium | High | Research lead | Pilot economics and data permissions | Useful datasets and qualified assisted pipeline | 6 Months |
| P01 existing Clutch/LinkedIn profiles | Authority | High | Medium | Founder | Verified scope and client permission | Qualified referral opportunities | 60 Days |
| P02 mention reclamation/editorial outreach | Digital PR | Medium | Medium | Founder/PR | Actual mentions/research assets | Relevant earned citations | 90 Days |
| P03 selective community participation | Authority | Medium | Medium | Founder/delivery | Audience fit and community rules | Expert conversations and sourced references | 90 Days |
| P04 additional legitimate profiles | Authority | Medium | Medium | Founder | Category fit/ownership | Qualified referrals; maintained facts | 6 Months |
| S01 proof near primary CTAs | CRO | High | Medium | Designer/editor | Evidence register | Brief quality and user task completion | 60 Days |
| X01 simplify mobile inquiry path | CRO | High | Medium | Designer/engineer | Moderated tests + event QA | Completed tasks and valid submissions | 90 Days |
| M01 CRM revenue cohort reporting | Analytics | Critical | High | Sales/analytics | Production CRM + finance mapping | Qualified pipeline and closed revenue by cluster | 60 Days |
| C03 evidence-led tools/comparisons | Content | Medium | High | Engineer/editor | Study data and user tasks | Qualified assisted leads, repeated use | 6 Months |
| C04 expand proven niches/update benchmark | Content | High | High | Founder + team | Margin, outcomes, capacity | Organic contribution margin by cohort | 12 Months |

No outreach, profile creation, CMS publication, sitemap submission, deployment, paid purchase or ranking guarantee is implied by this backlog. The completed portion is the audit, saved evidence, strategy, local technical changes and verification described in the implementation record.

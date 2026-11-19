# Devacia industry SEO and conversion launch checklist

Reconciled 10 October 2026 against the rebuilt local candidate. Scope: main website-development offer, directory, twelve industries, six current service pages and shared SEO/measurement dependencies.

**Local implementation and QA passed. Production release and measurement sign-off remain open.** No deployment, push or commit was performed. Use the [current deployment handover](DEPLOYMENT_READINESS_2026-10-10.md) for the exact evidence, environment requirements, CMS cold-start condition and recovery procedure. This replaces the stale 9 October build/metadata failure status.

Build: 78 generated entries. SEO tests: 26/26. Admin regression tests: 6/6. Rendered SEO: 37 pages. Final HTTP crawl: 118 endpoints, no errors or sitemap conflicts. Browser: 697 checks, zero failures. Automated accessibility: no detected violations in the tested main landmarks on 20 routes.

Checked boxes below mean local implementation/review within the stated scope, not production verification, business certification or a ranking guarantee. The initial CMS crawl had 16 timeouts; the repeat passed. Keep the deployment-host cold-start check open. Detailed proof is linked in the handover.

Research: industry intent maps and Keyword Tool evidence were incorporated. Semrush API units remain unavailable; GSCWizard subscription expiry blocks connected account verification. Do not invent missing volumes, difficulty scores or growth estimates.

## 1. Shared corrections before launch

Owner: Engineering, with Content for offer decisions.

- [x] **Ecommerce URL:** resolve the existing two-URL conflict. Current content selects `/services/ecommerce-website-development`; if retained, permanently redirect `/services/ecommerce`, update internal links and include only the destination in the sitemap. Preserve useful query parameters and avoid chains.
- [x] **Restaurant broken link:** replace `/industries/restaurants/booking-ordering-system` on the custom-booking solution page with `/industries/restaurant-website-development`; retain a permanent redirect for the historical route.
- [x] **Service FAQs:** restore initial-HTML answers for WordPress, ecommerce, redesign, performance marketing and custom software. Use native disclosures or persistent DOM content with accessible controls; verify structured answers match the visible wording.
- [x] **CTA destinations:** correct the eight audited hero/closing “Book a Strategy Call” data links to `/onboarding`. Preserve differently labelled actions where their destination fits their purpose.
- [x] **Overlapping offers:** make redesign and rebranding genuinely different offers or consolidate them. Website migration/redesign should have one clear primary destination.
- [x] **Audited claims:** corrected the specifically identified speed, update-compatibility, data-consistency, URL-continuity and example-percentage claims.
- [x] **Full interactive-copy review:** check every simulator state and confirm illustrative labels and scope boundaries stay clear throughout. The browser suite exercised all initially available example controls across the commercial routes; illustrative states remain separate from confirmed business outcomes.
- [x] **Related proof/plan pages:** make essential headings visible before hydration and reconcile plans FAQ/schema discrepancies, especially where these pages support industry buyer decisions.
- [x] **SEO registry:** update substantive modification dates, metadata ownership and tests to reflect the current content modules. Ensure legacy buyer-guide metadata cannot override the new offer.

Acceptance: the final crawl has zero known broken commercial links, one consistent URL per migrated offer, usable FAQs in initial HTML, accurate claims and CTA destinations, and no old metadata override.

## 2. Acceptance checklist for EVERY industry page

Owners: Content + Engineering. Apply this checklist individually to each URL in section 3; a shared template passing does not approve every page's copy.

### Buyer intent and commercial content

- [x] State who buys this service and the specific website/system Devacia builds in the first screen.
- [x] Own one hiring intent plus natural related phrases. Cost, integrations and scope questions usually remain on this page; do not create a URL for every keyword variation.
- [x] Address an industry-specific problem, its operational cost and the desired business outcome without invented financial losses or conversion percentages.
- [x] Explain the actual customer-to-staff sequence: visitor action → information captured → destination/team → next action or confirmation.
- [x] Explain what is included, what is optional and what depends on third-party capabilities. Separate a request from a confirmed appointment, accepted order or paid transaction.
- [x] Explain custom development in plain language. Name only technologies Devacia can substantiate and explain their role: interface, server logic, data storage, editable content and integrations. Do not imply every build uses every technology or inherits the agency site's stack.
- [x] Include answers to the buyer's real objections: existing software, content editing, ownership, migration where relevant, delivery process, ongoing costs and support.
- [x] Use the current approved shared pricing source consistently. It currently states India from ₹39,999 and no fixed international figure; do not silently restore an older US price. Define exact scope, delivery dates, revisions, support duration and third-party costs in the proposal.
- [x] Retain GST exclusion and typical 50% upfront/50% delivery language, with proposal-specific terms.
- [x] Show authentic proof. Describe exactly what a project demonstrates; cross-industry work must be labelled as related capability, not presented as an industry client or result.
- [x] Use “Book a Strategy Call” → `/onboarding`, with a short explanation that project details come first. Keep secondary actions useful: view a relevant project, understand the workflow or read scope.
- [x] Remove generic paragraphs repeated across industries where a specific example could answer the buyer's question. No arbitrary word-count target.

### Search, links and entity clarity

- [x] Unique, accurate title and description; one descriptive H1 and logical headings. Review for truncation/readability without treating character counts as rigid ranking rules.
- [x] Canonical uses the production origin and the final route; no localhost, staging host, alias or tracking parameters.
- [x] Canonical route is indexable and returns 200; check meta robots, HTTP robots headers and robots.txt together. Keep staging/private routes out of the public index.
- [x] Main offer and `/industries` link directly to this canonical with descriptive anchor text. Breadcrumbs reflect the hierarchy.
- [x] Link back to the main offer and to genuinely relevant proof/services. Add related-industry links only when they help the buyer; avoid every page linking to every page mechanically.
- [x] Keep each industry page focused on hiring Devacia. A clinic development page should not compete for “clinic near me”; an HVAC agency page should not pretend Devacia repairs air conditioners.
- [x] Structured data describes Devacia as the service provider, not as a gym, clinic, hotel or restaurant. Use consistent business identity and IDs; no invented ratings, addresses or clients.
- [x] Any FAQ/breadcrumb/service data matches the page. Schema is descriptive; do not promise enhanced search presentation or rankings.
- [x] Include only final indexable URLs in the sitemap and use truthful modification dates.
- [x] Essential offer, scope, proof descriptions and FAQ answers are available in initial HTML; no important text hidden behind an animation that requires hydration.

### Visitor experience and measurement

- [x] Test at small mobile and desktop widths, keyboard-only, reduced motion and with JavaScript disabled for essential reading/navigation.
- [x] Check focus visibility, disclosure controls, labels, contrast, overflow, tap targets, loading/error/success states and image dimensions/alt text.
- [x] Inspect image loading and layout shifts. Use repeatable mobile performance tests for diagnostics; field performance needs post-launch data. Do not promise scores based on the framework.
- [x] Local attribution regression tests preserve the industry landing page through onboarding and respect consent; no lead fields were added. Production collection is a separate pending check in section 4.
- [x] Local tracking tests keep CTA interest, accepted form success and booked meetings distinct. Verify real production dispatch and CRM reconciliation in section 4.

## 3. Industry-specific content and workflow sign-off

Reviewed the industry offer modules, customer/staff journeys, scope answers, technology descriptions and proof labels. The source and rendered checks support the requirements below; these are scoped offers, not proof of twelve completed client systems. External business credentials and new client results are not independently certified by code tests.

### Gyms and fitness studios

URL: `/industries/gym-fitness-website-development`  
Primary intent: gym website development / fitness studio website design.

- [x] Explain membership options, classes, trainer information and the trial enquiry journey: visitor chooses interest/time → staff receives details → staff confirms a visit.
- [x] Separate acquisition website, integration with existing membership software and a custom member portal. State when recurring payments, attendance and renewals require additional scope.
- [x] Answer “Can we keep our current gym software?” and “Who follows up trial enquiries?” Use Fitniya only as related wellness work unless gym-specific delivery is independently evidenced.

### Cafés

URL: `/industries/cafe-website-development`  
Primary intent: café website development / coffee shop website design.

- [x] Explain editable menu, outlet information, pickup enquiries/preorders and catering requirements using a concrete customer-to-staff example.
- [x] Distinguish a WhatsApp/order request from inventory-aware checkout, payment and confirmed pickup slots; describe subscription-tool integration versus custom ordering where relevant.
- [x] Answer menu editing, sold-out items and outlet differences. Label Obsidian as restaurant work demonstrating related capability, not a café case study.

### Clinics and healthcare practices

URL: `/industries/clinic-website-development`  
Primary intent: clinic website development / doctor appointment website development.

- [x] Explain practitioner profiles, service information and appointment requests routed to reception, including how confirmation happens.
- [x] Separate marketing intake from patient records, clinical systems and live appointment inventory. Describe only agreed data collection; avoid unverified compliance certifications or medical outcome claims.
- [x] Answer practitioner schedules, appointment changes and existing scheduling integration. Label wellness work accurately; do not invent a clinic client.

### HVAC and home services

URL: `/industries/hvac-home-services-website-development`  
Primary intent: HVAC website design / AC service company website development.

- [x] Explain service areas, job/equipment details and urgency capture → dispatch/sales review → confirmed service appointment.
- [x] Distinguish lead routing from technician availability, dispatch software, maintenance contracts and emergency attendance; scope those capabilities separately.
- [x] Use Indian “AC service/maintenance” and international “HVAC” wording naturally. Demonstrate a labelled enquiry example if no direct client evidence exists; wholesale proof cannot establish HVAC delivery.

### Real estate

URL: `/industries/real-estate-website-development`  
Primary intent: real estate website development / property listing website design.

- [x] Distinguish developer project sites, broker listing sites and multi-seller property portals; explain which buyer each scope fits.
- [x] Show property-specific enquiry/site-visit routing, budget/location requirements and responsibility for listing updates. CRM, feeds, maps and portal access are agreed integrations, not automatic inclusions.
- [x] Answer outdated inventory and lead assignment concerns. Use accurate project facts and a labelled workflow example where direct property-sector proof is absent.

### Restaurants

URL: `/industries/restaurant-website-development`  
Primary intent: restaurant website development / restaurant reservation website.

- [x] Explain editable menus → date/time/party-size request → staff review → confirmation. Clearly distinguish requests from inventory-confirmed reservations.
- [x] Separate QR menu, reservation workflow and complete ordering/payment/delivery systems; explain optional deposits, outlet rules and integrations.
- [x] Use Obsidian's actual reservation experience and verified staff tools. No invented booking uplift, commission savings or operational guarantees.

### Wholesale and manufacturing

URL: `/industries/b2b-wholesale-manufacturing-web-development`  
Primary intent: B2B catalogue / wholesale / RFQ website development.

- [x] Show product specifications, quantities/MOQs and buyer requirements → structured RFQ → sales review → quote. An RFQ is not an accepted order.
- [x] Explain catalogue editing and separately scoped buyer accounts, negotiated pricing, repeat orders, payment terms, ERP/stock integration and uploads where offered.
- [x] Use Yoglivya Wholesale's actual catalogue and enquiry journey, not the retail case study. Keep retail checkout intent with the ecommerce service page.

### Agencies and professional services

URL: `/industries/professional-services-website-development`  
Primary intent: professional services / consultancy / agency website development.

- [x] Explain service specialisation, relevant work, team credibility and project-brief routing to a consultation.
- [x] Distinguish an agency purchasing its own website from white-label delivery for its clients; do not imply unagreed reseller terms or capacity.
- [x] Answer content ownership, confidentiality and editing responsibilities without unsupported blanket claims. Show only relevant proof, labelled accurately.

### Corporate B2B

URL: `/industries/corporate-b2b-website-development`  
Primary intent: corporate website development / B2B company website design.

- [x] Explain capabilities, business units, buyer roles and enquiry assignment; demonstrate how an organisation keeps content accurate.
- [x] Describe CMS roles/approvals, multilingual requirements and CRM integrations as agreed scope. Refer product-catalogue/RFQ needs to wholesale rather than duplicate that page.
- [x] Answer stakeholder review, migration, ownership and maintenance concerns. Distinguish corporate credibility from a transactional ecommerce system.

### Salons and spas

URL: `/industries/salon-spa-website-development`  
Primary intent: salon website development / spa booking website development.

- [x] Explain service menus, duration, stylist preference and appointment requests → staff/scheduling system → confirmation.
- [x] Separate preference from available capacity. Deposits, cancellation rules, memberships and third-party booking integration need defined scope.
- [x] Answer service-price updates and double-booking concerns without guaranteeing availability unless a verified scheduling system supports it. Label related hospitality proof correctly.

### Education and coaching

URL: `/industries/education-coaching-website-development`  
Primary intent: coaching institute / education website development.

- [x] Explain programmes, eligibility, batch information and approved fees → enquiry → admissions/counselling follow-up.
- [x] Separate a marketing/admissions site from an LMS, student portal, assessments or school-management system; state integration and editing responsibilities.
- [x] Answer course updates and branch/batch routing. Avoid invented admissions/placement results, student testimonials or education-client claims.

### Hotels and event venues

URL: `/industries/hotel-venue-website-development`  
Primary intent: hotel / banquet hall / venue website development.

- [x] Distinguish room discovery and booking-engine integration from event-date/guest-count enquiries for venues.
- [x] Separate enquiry forms from live room inventory, payment, cancellation and channel-management systems. Confirm provider compatibility before naming an integration as supported.
- [x] Answer staff handoff, availability updates and third-party fees. Obsidian is restaurant proof, not evidence of a hotel inventory/channel-manager build.

## 4. Measurement acceptance before evaluating growth

Owner: Measurement. Use [MEASUREMENT_HANDOVER.md](MEASUREMENT_HANDOVER.md) for the detailed event contract.

- [ ] Verify the production GA4 stream, GTM container and allowed hostnames. Exclude staging, internal QA and admin activity without weakening production guards.
- [ ] Trace one consented test journey from each industry landing page into the existing onboarding flow; test accepted submission, failure and retry on shared form components with isolated test notifications.
- [ ] Check accepted submissions against stored lead records; prevent duplicate event dispatch. A button click, WhatsApp click or form start is not a submitted lead.
- [ ] Test consent denial, acceptance and withdrawal; confirm no form text/contact details enter analytics event parameters.
- [ ] Verify the real booking signal separately from scheduler opening. Reconcile `qualified_lead` versus configured `qualify_lead` with the actual sales workflow before changing key events.
- [ ] Record lead qualification, opportunities, wins and contract value/currency in the agreed CRM process. Do not count both a form and its subsequent booking as two unique prospects.
- [ ] Save a pre-launch baseline and deployment date. Break reporting down by industry landing page, brand/non-brand queries, country and device where data permits.

Minimum outcome: we can tell which industry page initiated an accepted enquiry and whether sales judged it useful. Unknown attribution stays unknown.

## 5. Final local release gate

Owner: Engineering. Evidence from the 10 October production build is authoritative for this candidate; earlier runs are historical.

- [x] Production build passes: 78 generated entries; build ID `0ahbHdZAr_iMcaQGPLiFG`.
- [x] SEO tests pass: 26/26; existing admin-login regressions pass: 6/6.
- [x] Rendered SEO verification passes: 37 pages, 27 supporting links, 28 industry aliases, current-category article redirect and private-document checks.
- [x] Static inventory and HTTP crawl saved. Final crawl passes 118 endpoints; redirect-generated duplicates in static HTML are explained by verified HTTP redirects.
- [x] Mobile/desktop at 320/390/1440px, initial reading without JavaScript, keyboard disclosures, reduced motion, image loading and simulator controls checked: 697 browser assertions pass.
- [x] Mocked onboarding failure and successful retry verified without creating leads or notifications. Local CTA/attribution regressions pass.
- [x] Automated axe scan reports no detected A/AA violations in the tested main landmarks. Manual screenshot review and bounded mobile performance diagnostics recorded in the handover.
- [x] Source scope, environment requirements and recovery procedure documented. Pre-existing unrelated changes retained; no claim of a full security audit or review of every unrelated change.
- [ ] Freeze an immutable deployment revision, provision private runtime assets and repeat CMS cold-start checks in the deployment environment. See handover conditions.

## 6. Deployment-day checks

Owner: Release + Engineering + Measurement. These are pending until deployment is separately authorised.

- [ ] Deploy the reviewed revision and record time, revision and configuration changes.
- [ ] Check all twelve industry URLs, `/industries`, main offer and affected service routes publicly: correct status, content, canonical, robots directives and metadata.
- [ ] Check sitemap public origin, canonical-only URLs and modification dates; confirm assets load and redirects reach the correct destination in one hop.
- [ ] Verify real onboarding delivery and consent-aware event collection using identified test records; reconcile with the destination system.
- [x] Submit/check the canonical sitemap in Search Console and inspect priority URLs. On 10 October Google accepted and processed the 80-URL sitemap with no warnings/errors. All 80 URLs were inspected: 53 indexed, 20 discovered/not indexed, six crawled/not indexed and one unknown. See [the submission report](GSC_SUBMISSION_2026-10-10.md). Submission is not proof that all URLs are indexed.
- [ ] Confirm old URLs that changed now redirect correctly; investigate missing/incorrect content immediately. Roll back only when release health or lead delivery warrants it.

## 7. First 90 days: evidence-led improvements

These are review windows, not ranking or lead guarantees. Low sample sizes may require longer observation.

- [ ] **Days 1–7:** verify crawl access, indexing state, selected canonicals, public errors and real enquiry delivery. Diagnose access/content issues before rewriting keywords.
- [ ] **Weeks 2–4:** review query-to-page relevance. Separate agency-hiring searches from consumer searches and brand traffic; improve mismatched titles/introductions with actual query evidence.
- [ ] **Days 30–60:** examine industry-level clicks, accepted enquiries and sales qualification together. Improve offer clarity, proof or form friction according to the observed weak step.
- [ ] **Days 60–90:** review qualified opportunities and wins with the sales cycle in mind. Expand a content cluster only when there is a distinct buyer question and enough evidence to answer it well.
- [ ] When Semrush units are available, validate candidates using the correct country database and dated exports; keep provider estimates separate from GSC observations. Do not delay deployment solely for keyword volume.
- [ ] Prioritise new proof for industries without direct client work. Publish real workflow walkthroughs, scoped delivery lessons and substantiated case studies.
- [ ] Prepare relevant partnership/editorial outreach around useful evidence. Send outreach only when authorised; do not buy ranking links or fabricate mentions/reviews.
- [ ] For AI discovery, maintain clear services, verifiable business identity, accessible content and useful first-party evidence. Monitor identifiable referrals separately from Google AI reporting or manually observed citations.

Decision guide: impressions without relevant clicks → inspect intent/title; relevant visits without enquiries → inspect offer/proof/friction; enquiries without fit → inspect targeting and qualification; qualified leads without wins → inspect pricing, scope and follow-up. These are investigation prompts, not proof of causality.

## Evidence and references

- [Current audit](SUBURL_SEO_RESEARCH_2026-10-07.md), [URL register](URL_REGISTER_2026-10-07.md), [12-industry intent map](INDUSTRY_INTENT_MAP_2026-10-07.md).
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide): useful content, crawlable links and realistic evaluation periods; no automatic first-place formula.
- [Google canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls): align canonical signals and preferred destinations.
- [Google AI optimisation guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide): apply sound search foundations and helpful content rather than treating AI visibility as a guaranteed output of special files or markup.

Local sign-off: build `0ahbHdZAr_iMcaQGPLiFG`, checked 10 October 2026. Production sign-off: revision pending | measurement pending | CMS cold-start validation pending | release date pending | production evidence pending.


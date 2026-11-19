# Devacia industry search research and implementation — 7 October 2026

## Evidence used

- Supplied research audit: [archived copy](RESEARCH_AUDIT_SUPPLIED_2026-10-07.md).
- October 1 keyword/evidence workbook and CSV mapping: preserve K046 (corporate), K081/K086/K091 (wholesale), and K071 (white-label; separate from an agency's own website).
- [Earlier twelve-industry research](INDUSTRY_INTENT_MAP_2026-10-07.md) including inspected provider pages. Provider positioning establishes what they sell, not their rankings or results.
- Current application source, the local route audit and [measurement baseline](GROWTH_EXECUTION_2026-10-07.md).
- Keyword Tool: Free SEO Ideas: 24 requests, 24 successful; 572 returned worldwide rows and 504 returned India rows. These are rows, not unique keywords or measured demand. First 50 suggestions per seed at most; no claim of exhaustive pagination.

## Method and limits

Collected Google autocomplete suggestions in English, first worldwide for vocabulary and then India for the market prioritised in the supplied brief. Store the two populations separately. [Worldwide raw evidence](evidence/keyword-tool-industries-2026-10-07.json); [India raw evidence](evidence/keyword-tool-industries-india-2026-10-07.json).

The plugin provides cached metrics only for some guest rows. Collection date is known; cache vintage and estimation window are not provided. Missing metrics mean unknown, not zero. Advertising competition is not organic keyword difficulty. Google responses unexpectedly include a CPC field even though the tool documents it for Bing; that field is excluded from analysis. Top-of-page bids below are Google Ads estimates, not organic acquisition costs.

| India keyword | Provider monthly volume estimate | Top of Page Bid (USD) | Source seed |
| --- | ---: | --- | --- |
| gym website design | 320 | $0.07 - $0.55 | gym website design |
| clinic website design | 90 | $0.34 - $1.34 | clinic website development company |

Do not sum these broad, mixed-intent keywords into an agency traffic forecast. The remaining India rows have no returned volume. Worldwide volumes are retained only in raw evidence and are not relabelled Indian demand.

## Decisions implemented

| Page | Retained hiring intent | Buyer decision and link direction |
| --- | --- | --- |
| Gyms | Gym website design/developer; fitness studio websites | Trial acquisition versus member operations; booking and follow-up services |
| Cafés | Café/coffee shop website design | Menu and pickup requests versus full checkout; restaurant and ecommerce offers |
| Clinics | Clinic website development company; doctor/dental website design | Appointment intake versus clinical/practice systems; booking and care services |
| HVAC | HVAC website design services; air-conditioning website design | Coverage and job enquiries versus technician dispatch; lead generation and automation |
| Real estate | Real estate website development services | Developer site versus agent catalogue versus portal; software and migration services |
| Restaurants | Restaurant website development agency; design/cost | Menu versus reservations versus ordering; café and booking services |
| Wholesale | Wholesale website development; catalogue/RFQ development | Specification-led RFQ versus account-based ordering; ecommerce and corporate offers |
| Professional services | Professional services website design; agency websites | Own-business acquisition versus white-label fulfilment; corporate and lead-generation offers |
| Corporate B2B | Corporate/B2B website development company | Capability-led corporate site versus product catalogue; wholesale and redesign |
| Salons | Salon website design; salon booking website design | Appointment preferences versus staff availability; booking and maintenance |
| Education | Education website development company; coaching institute websites | Course/admissions site versus LMS; software and enquiry services |
| Hospitality | Hotel website development company; booking website development | Stay inventory versus event enquiries; booking and restaurant services |

All twelve retain their approved URLs. Titles/descriptions now reflect procurement language; cost and integration answers stay on the matching industry page. The shared UI renders descriptive link labels, previously stored but ignored, and every workflow step before interaction. Custom technology and quote factors were in the data but absent from the page; they now appear as readable scope information.

The general “B2B website development” seed is not assigned wholesale demand wholesale. Corporate owns capability-led corporate buying; wholesale owns catalogue/RFQ; ecommerce owns checkout-led builds. Cost, agency, services and development variants generally belong together, not on duplicate keyword pages.

## Rejected or deferred terms

Template, free download, source code, HTML/CSS project, Figma inspiration, designer salary and training-course queries are not primary acquisition targets. Clinic/navigation brands, hotel traveller booking, wholesale-product shopping and HVAC engineering-design queries do not indicate intent to hire Devacia.

Education suggestions skew toward institutions, life coaching and developer training; do not call those validated demand for admissions systems. Air-conditioning suggestions skew toward templates/engineering; preserve the actual contractor offer without asserting Indian demand from global HVAC volumes. Cafés have substantial inspiration/DIY ambiguity; keep the custom-build distinction explicit.

City terms were observed but no city×industry expansion is proposed. One relevant page with clear services is preferable to creating unsupported office or geographic claims. Further localized SERP validation can refine priorities after launch.

## Commercial priorities

Restaurant and wholesale remain first proof-led priorities because Obsidian and Yoglivya Wholesale demonstrate directly relevant client work. This is not a measured highest-volume or highest-close-rate ranking. Other pages use explicitly labelled related work; none acquires invented sector clients or outcome metrics.

Each industry now has a distinct scope-choice FAQ, an industry-specific cost answer, direct links to relevant services and a clear technology explanation. Existing CTA and consent-aware attribution remain in use. No backend fields, customer booking systems, booking parameters or paid plugin subscription were added.

## Growth evaluation

The new pages remain undeployed, so the current public 404s are expected. Existing analytics measure the previous live release. Record the release date before comparison.

The recorded 28-day baseline distinguishes 15 GSC clicks, 43 Organic Search sessions and 39 Google/organic sessions. A 20× target means respectively 300 clicks, 860 Organic Search sessions or 780 Google/organic sessions in a comparable window; these are separate target definitions, not forecasts or additive numbers. Qualified lead and revenue multiples require verified, nonzero outcome baselines.

Inspect indexing and intent first, then accepted enquiries, qualified opportunities and wins by landing-page cohort. Do not call a strategy CTA click a booked meeting. The GA4 qualification-event mismatch and production end-to-end measurement remain release-account checks, not something source changes alone establish.

## Validation record

See the final implementation handover for actual build, regression, rendered-page and browser results. This research document does not mark unperformed production checks complete.


# Devacia organic growth: evidence and execution

Reviewed 7 October 2026. This is an evidence-based operating plan, not a ranking or revenue guarantee. The latest industry release remains local; production checks earlier today returned 404 for `/industries` and the new gym route. No deployment, analytics configuration change or outreach was performed in this review.

## What the connected data says

GA4 is now readable through GSC Wizard and linked to `https://www.devacia.com/`: property `538121325`, display name `Devacia Development`. The name alone does not establish that this is a staging property. Verify its web stream, production hostname coverage and internal-traffic exclusions before treating it as a clean acquisition baseline; the available Wizard reporting dimensions do not expose hostname.

Equal periods: 7 September–4 October versus 10 August–6 September 2026, 28 days each.

| Metric | Previous | Current | Interpretation |
| --- | ---: | ---: | --- |
| GSC Web Search clicks, all countries | 24 | 15 | Down 37.5%; no demonstrated traffic uplift |
| GSC impressions | 814 | 825 | Up 1.4%; visibility has not translated into more clicks |
| GA4 all-channel sessions | 205 | 124 | Down 39.5% |
| GA4 Organic Search sessions | 50 | 43 | Down 14% |
| GA4 google / organic sessions | 50 | 39 | Keep separate from the broader channel grouping |
| Wizard-attributed ChatGPT sessions | 37 | 24 | Existing AI referrals; down 35.1% |
| Recorded GA4 key events | 0 | 0 | Measurement/qualification remains unresolved |

GSC reports in Pacific time; GA4 reports in Asia/Calcutta. Clicks and sessions are different measurements and must not be forced to match. The sample is small and the new local release cannot explain these historical results. Eleven of the fifteen reported GSC clicks are attributed to the exact brand query `devacia`; privacy-limited query rows prevent assigning the remaining four clicks to nonbrand demand with certainty.

The main website-development URL has 24 impressions and zero GSC clicks in this window. Its average position of 3.21 is not evidence that competitive service terms rank third: query mix and small samples can produce misleading averages.

### Conversion measurement: a specific open issue

The complete event breakdown contains twelve event names, including four `form_start` events, two `phone_click` events, one `book_strategy_call`, one `calendly_open` and one `qualified_lead`. It contains no `generate_lead` or `strategy_call_booked` event in this period.

Wizard lists configured key-event names `close_convert_lead`, `purchase` and `qualify_lead`. The recorded `qualified_lead` is a different name and is attributed to one google / organic session. Its actual trigger and sales qualification have not been verified. Do not simply rename or promote it and claim one qualified lead.

Google's [recommended lead events](https://support.google.com/analytics/answer/9267735) distinguish `generate_lead`, `qualify_lead` and `close_convert_lead`. The current local application already emits `generate_lead` after successful submission and a separate verified booking event; it does not implement a CRM-to-GA4 qualification import. Confirm the production GTM event mapping and actual CRM outcome before enabling qualification reporting. Keep browser interest events separate.

Acceptance: one successful submission produces one accepted-lead event and one matching CRM record; a failed submission produces none; opening the scheduler does not record a booking; sales qualification is a deliberate CRM decision. Test in an isolated environment with notifications mocked. Production reconciliation requires the correct account/container and appropriate test handling. No fabricated production leads were submitted here.

### Two observed opportunities

- Delhi web-development landing page: 391 impressions, one click, average position 47.12, versus 31 impressions previously. India query `web development company in Delhi` alone has 90 impressions and no clicks, average position 59.9. This validates exposure to the intended query family, not a near-term first-page forecast. Improve proof, relevance and authority rather than attributing poor CTR solely to the title.
- ChatGPT referrals: the landing-page report lists Éclat with 14 sessions and Almina with seven. These are priority paths for relevant service links and a clear project enquiry. Referrals do not reveal which prompt, recommendation or person produced the visit; internal testing is possible. Row totals are not additive to the overall 24-session total, so use the summary as the total.

Raw evidence: [GA4 and query reports](evidence/ga4-growth-baseline-2026-10-07.json), [GSC comparison and production checks](evidence/seo-confidence-2026-10-07.json).

## How the supplied research changes prioritisation

Revisited the supplied October 1 research report and Top 30 CSV, with the previously reconciled workbook audit. The inventory contains 200 candidates in 40 clusters. Twenty phrases were observed in published wording; 180 are proposed candidates. Neither group establishes search volume or organic difficulty. Use the buyer-problem research now, and validate demand as pages receive impressions.

| Priority | Research connection and evidence | Destination and next deliverable |
| --- | --- | --- |
| 1 | K041, Delhi development; current GSC query evidence | Improve the existing Delhi page with relevant verified work and clear remote delivery. No fictitious Delhi office. |
| 1 | K031, custom ecommerce; Almina project and observed AI referrals | Strengthen Almina → custom ecommerce → project enquiry, explaining delivered scope and current running-cost assumptions. Do not label Almina Shopify work. |
| 1 | Restaurant offer; Obsidian client proof and two organic case-study clicks | Restaurant page plus an Obsidian workflow explanation: request, staff review, confirmation; separately scope ordering. |
| 1 | K081/K086/K091, catalogue and RFQ; Yoglivya Wholesale client proof | Use `/industries/b2b-wholesale-manufacturing-web-development` as the commercial owner. Do not create the old proposed duplicate `/solutions/b2b-catalogue-rfq`. Explain product data, quantity, RFQ and sales follow-up. Demand remains a hypothesis. |
| 2 | K046, corporate website; newer twelve-industry offer collection | Main offer and corporate page own broad versus industry-specific intent. Support gyms, cafés, clinics, HVAC, real estate, salons, education, hospitality and professional services with distinct operational detail. |
| 2 | K141/K151, redesign and failed lead generation; K121 maintenance | Improve existing destinations with diagnostic criteria, scope boundaries and real evidence. Do not add overlapping city/service URLs. |
| Conditional | K001/K021, WordPress/Shopify; supplied research candidates | Retain platform pages, but require actual platform-specific proof before giving them the same investment as demonstrated custom work. |

All twelve industries stay in the offer collection. Concentrate the first evidence/content investment on a few routes; expand investment when actual queries or qualified enquiries justify it. Do not restore removed resources or the removed AI-native service from older roadmaps.

## Current Google guidance checked

| Official source | Current finding | Devacia action |
| --- | --- | --- |
| [AI optimisation guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), updated 10 July 2026 | Google connects AI visibility to its existing search systems and useful original content. It rejects special-file, artificial mention and compulsory content-chunking tactics. | Use real system walkthroughs, explicit tradeoffs and project evidence. Maintaining `llms.txt` is not a Google ranking deliverable. |
| [Generative AI content guidance](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content), updated 1 October 2026 | AI-assisted content needs accuracy, originality and added value; scaled low-value pages can violate spam policies. | Review every industry page for unique buyer decisions, working examples and truthful claims. Do not multiply twelve pages into hundreds of near-duplicate city pages. |
| [Search documentation changes](https://developers.google.com/search/updates) | FAQ rich results were retired in 2026. | Retain useful visible FAQs. Matching FAQ markup is a consistency check, not an expected Google enhancement or growth lever. |
| [Generative AI performance report](https://support.google.com/webmasters/answer/16984139?hl=en) | Dedicated reporting covers AI-feature impressions and can be absent when data is insufficient. | Add this separate impression report to the measurement backlog. Current Wizard tools do not expose it; no AI Overview/AI Mode impression figure was retrieved. Do not equate ChatGPT referrals with Google AI visibility. |
| [Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization) | Accurate organisation details help Google understand identity. | Preserve consistent organisation/founder IDs, verified profiles and truthful office information. Do not add unsupported credentials, locations or ratings. |

These Google-specific findings are not claims about every other answer engine's retrieval system.

## What a 10× target means

Use a six-month stretch target with 30/60/90-day decision points, starting from the verified production release. This is a planning horizon, not a predicted SEO timetable.

- Traffic target: 150 GSC Web Search clicks per comparable 28-day period versus 15 now. Track nonbrand commercial query exposure separately so brand searches do not disguise weak customer acquisition.
- GA4 reference: 430 Organic Search sessions versus 43 would also be 10×, but adopt this target only after property/hostname/traffic-quality validation. Do not treat it as equivalent to 150 GSC clicks.
- Qualified enquiry and revenue targets: establish a reconciled nonzero baseline first. A 10× multiple of zero recorded key events is not a meaningful sales target.

Commercial model: relevant sessions × accepted-enquiry rate × qualification rate × close rate × average contracted value. For illustration only, 3× relevant traffic × 2× enquiry rate × 1.5× qualification rate × 1.12× close rate = 10.08× expected won value if contract value stays constant. These are not measured rates or forecasts; the arithmetic shows why more traffic alone cannot establish 10× revenue. Track signed value and collected cash separately.

## Execution across the eight disciplines

| Discipline | Concrete work | Evidence of completion |
| --- | --- | --- |
| Technical SEO | Release the reviewed routes, validate public 200s/redirects/canonicals, crawlability, sitemap and mobile rendering; inspect Google-selected canonicals after discovery. | Dated production checks and index reports. Existing local build/tests do not substitute for these. |
| Content strategy | Assign one commercial owner per intent; improve priority offers with scope, fit, cost drivers, operational workflow and real proof. | Each page answers a different buyer decision and links to its relevant case and next action. |
| AEO | Answer real procurement questions directly: custom versus SaaS, request versus confirmation, ownership, integration limits, staff responsibilities. | Accurate visible answers reviewed by the delivery team; no arbitrary word-count or question quota. |
| GEO | Develop first-hand project walkthroughs and useful comparisons; strengthen existing AI-referred case-study journeys. | Referral quality, verified submissions and separately observed AI citations/impressions. No guaranteed citation claims. |
| Entity SEO | Audit company, founder, location and profile consistency; link evidence to the responsible business and author. | Only verified official profiles, one confirmed physical base, no fake client associations. |
| Conversion | Match the enquiry path to the industry and scope, preserve project-detail-first onboarding, explain price/ownership/next steps, resolve event mismatch. | Accepted enquiries and reviewed outcomes; clicks remain diagnostics. Low volume favours observed usability fixes over underpowered A/B tests. |
| Digital PR | Prepare two permission-cleared client workflow stories and one documented original operational study; research relevant industry publishers and genuine existing mentions. | Approved source material and relevant prospect list first. Outreach/review requests require separate sending authorisation; no purchased links or fabricated mentions. |
| Search analysis | Weekly settled GSC/GA4/CRM comparison by page, commercial intent, country, device and channel; annotate release and measurement changes. | Reproducible reports with denominators, limits and separate unknown attribution. |

### First 14 days after release

Engineering/analytics: validate publication and event delivery, map the production stream, reconcile one safe end-to-end test, inspect priority URLs and annotate the release. Sales: confirm enquiry qualification and contracted-value definitions. Content: verify the Obsidian and wholesale walkthrough facts and existing Éclat/Almina paths. Deliver two substantive proof improvements, not another batch of generic articles.

### Days 15–30

Improve the Delhi commercial page and the strongest proof-to-offer links. Use the existing price and platform-comparison pages to answer buyer objections without creating competing copies. Prepare permission-cleared PR material and an original study protocol; do not invent findings. Review indexing, actual query intent and enquiry quality by page.

### Days 31–60

Choose the next two industry investments from observed impressions and sales feedback. Add genuinely useful comparison/workflow material within the existing blog/offer structure. Diagnose zero-visibility pages: deployment/indexing first, then demand and differentiation. Revise titles when query intent and impressions support the decision; avoid celebrating a high average position from a few unrelated searches.

### Days 61–90

Compare qualified pipeline by acquisition cohort and page group. Expand offers showing both demand and customer fit. If impressions grow but enquiries do not, investigate relevance and the enquiry journey. If enquiries grow but qualification falls, tighten the offer and targeting. If qualified opportunities fail to close, review proposal, proof, response handling and commercial fit with sales. Reforecast the six-month target from the measured funnel.

## What is complete versus pending

Complete in this review: GA4 connection verified; equal-period traffic and event reports collected; supplied research revisited; current Google documentation checked; concrete measurement mismatch identified; priorities and target model documented. Existing onsite implementation/validation is recorded in [the industry handover](INDUSTRY_SEO_HANDOVER_2026-10-07.md).

Pending: production release, production analytics reconciliation and hostname audit, actual CRM-qualified baseline, richer approved project evidence, separate Google AI impression reporting, and authorised external authority work. No percentage likelihood of 10× growth can be calculated defensibly from this sample.

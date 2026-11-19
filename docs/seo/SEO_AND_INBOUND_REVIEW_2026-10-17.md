# Devacia SEO and inbound review — 17 October 2026

The update has not demonstrated the intended lead or revenue growth. The strongest verified constraint is very little new-buyer organic traffic. Technical publication has progressed, but enquiry measurement and delivery still need end-to-end acceptance. A 10× result is not established.

## Evidence and scope

- Fresh Search Console data was read directly with the project's local Google OAuth/CLI setup. GSC Wizard was unavailable because its subscription had expired; it supplied none of the fresh performance numbers below.
- The latest final daily row returned was **14 October**. A request through 15 October did not return a 15 October row; this was not treated as zero traffic.
- Reviewed the supplied executive marketing strategy, existing research/measurement handovers, production release records, live sitemap URLs, production contact UI, and enquiry/tracking implementation.
- This was an audit. No production code was changed, sitemap resubmitted, marketing message sent, lead created, or meeting booked.
- The 10 October release has only five days of returned post-release performance (10–14 October). The 16 October cleanup is later than the available performance data. The local homepage typography changes remain uncommitted and cannot be credited with production results.

## Search performance

Google Web Search, all countries/devices, property `https://www.devacia.com/`:

| Metric | 20 Aug–16 Sep | 17 Sep–14 Oct | Change |
| --- | ---: | ---: | ---: |
| Clicks | 16 | 22 | +6 / +37.5% |
| Impressions | 742 | 748 | +6 / +0.8% |
| CTR | 2.16% | 2.94% | +0.78 percentage points |
| Average position | 39.87 | 30.79 | Improved 9.08 positions; mixed query set |

The recent week, 8–14 October, had 7 clicks and 164 impressions versus 5 clicks and 242 impressions on 1–7 October. Clicks increased by two while impressions fell 32.2%. These small counts do not establish sustained acquisition growth.

**Brand dependence:** the exact query `devacia` accounts for **19 of 22 clicks (86.4%)** in the current 28-day period. Disclosed query rows account for 20 clicks in total; two property clicks are absent from query rows. Do not label all three remaining clicks as verified nonbrand buyers. The other disclosed click is for `tem site deles?`, whose commercial relevance is uncertain.

**After the industry release:** 10–14 October has 5 clicks and 118 impressions. All five clicks are attributed to the exact brand query `devacia` in the returned query report. No industry-page clicks were recorded.

**Geography/device:** India accounts for 20 clicks; Brazil for two. The US has 181 impressions and zero clicks. Mobile accounts for 10 clicks and desktop for 12. These are search clicks, not sessions, people, enquiries or revenue.

| Commercial destination / query | Current 28-day evidence | Decision |
| --- | --- | --- |
| `/services/website-development` | 23 impressions, 0 clicks | No demonstrated acquisition from the main offer yet; average position 3.04 is not a rank for a specific competitive keyword |
| `/services/wordpress-development` | 120 impressions, 0 clicks, average position 10.73 | First page to investigate for search-result relevance and proof |
| `enterprise wordpress development services` | 48 impressions, 0 clicks, average position 6.96; WordPress service page | A specific, observable opportunity; not a forecast |
| `enterprise wordpress development company` | 15 impressions, 0 clicks, average position 3.93; WordPress service page | Check country/device and intent before changing positioning |
| Delhi development page | 316 impressions, 1 click, average position 47.43 | Improve relevance and genuine proof/authority; a title change alone is unlikely to solve the ranking gap |
| `web development company in delhi` | 74 impressions, 0 clicks, average position 60.23 | Not currently a first-page acquisition channel |
| New 12-page industry offer set | 0 recorded clicks; only wholesale, cafe and gym have returned impression rows (2, 1 and 2 respectively) | Published coverage is not established buyer demand |

Source: [fresh CLI evidence](evidence/seo-review-gsc-2026-10-17.json). Page-level impressions and property totals have different aggregation rules; do not sum them as interchangeable totals. Missing rows mean no reported visibility, not proof that search demand does not exist.

## Indexing and live site

| Industry offer | Google's recorded state on 17 Oct |
| --- | --- |
| Gym / fitness | Submitted and indexed |
| Cafe | Submitted and indexed |
| Clinic | Submitted and indexed |
| HVAC / home services | URL is unknown to Google |
| Real estate | Submitted and indexed |
| Restaurant | Submitted and indexed |
| B2B wholesale / manufacturing | Submitted and indexed |
| Professional services | Submitted and indexed |
| Corporate B2B | Submitted and indexed |
| Salon / spa | Discovered — currently not indexed |
| Education / coaching | Submitted and indexed |
| Hotel / venue | Discovered — currently not indexed |

**Nine of twelve are indexed.** Cafe and education are gains relative to the saved 14 October snapshot, which had seven indexed. Google's inspection reports recorded indexing state, not the result of a fresh live Google crawl.

The canonical ecommerce, WordPress, website-development and performance-marketing service pages are indexed. Custom software remains **Crawled — currently not indexed**, with a recorded crawl on 27 May. Website development still reports 23 September as its latest crawl; this does not establish that Google has processed the 10 October rewrite.

The sitemap has 79 URLs. Google last downloaded it on 16 October and reports **zero errors and warnings**. The sitemap API's `indexed: 0` field is not used as an index-coverage count; individual URL Inspection results clearly show indexed pages.

All 79 sitemap URLs returned HTTP 200 after retrying three interrupted blog requests. The 12 new industry offers return 200, have one H1 and one main landmark, declare self-canonicals, permit indexing, appear in the sitemap and are linked from the main website-development page. The sitemap also retains a separate older ecommerce industry/solution URL; assess its distinct purpose before any consolidation.

The retired `/industries` directory redirects to website development as intended. `/onboarding` is intentionally noindex. Neither should be presented as an indexing defect or sent for manual indexing.

Source: [live crawl and rechecks](evidence/seo-review-live-2026-10-17.json), [cafe CLI retry](evidence/seo-review-cafe-2026-10-17.json). No new robots/canonical/HTTP blocker was found on the twelve offers. Their remaining exclusion reasons are not proven to be technical defects.

## Enquiry and booking findings

| Priority | Finding | What is established / what remains |
| --- | --- | --- |
| P0 | Direct booking path lacks application booking-success tracking | In `app/(site)/contact/ContactPageClient.jsx:239`, selecting the calendar unmounts `Onboarding`. The trusted Calendly message listener is inside `src/views/Onboarding.jsx:1091`, so it is absent on that direct-calendar path. No alternative booking webhook was found in the inspected app implementation. External GTM/provider integrations remain unverified. |
| P0 | Successful form-to-CRM-to-notification delivery has not been demonstrated | Production form fields render. A non-writing GET to `/api/leads?action=start` returned the expected 405 JSON, not a 500. This checks endpoint reachability, not a successful submission. No live fake enquiry or meeting was created. |
| P0 | Current GA4 funnel cannot be verified with present CLI authorization | The saved Google token grants Search Console access only. Fresh sessions, form starts, errors, accepted submissions and bookings require separate Analytics read authorization. The old GA4 snapshot is historical, not today's conversion performance. |
| P1 | Meeting duration is inconsistent | The contact page advertises an instant 20-minute call; the live Calendly embed displays “30 Minute Meeting” and “30 min.” Available October dates were visible after loading. This is a copy mismatch, not evidence the calendar is unavailable. |
| P1 | Notification and ownership do not meet the marketing plan's acceptance criteria | Lead completion stores `owner_id: null`. The inspected notification implementation sends Telegram and Firebase notifications, not enquiry acknowledgement emails. Delivery failures are caught/logged. Verify routing and ownership in production; lack of an email alone does not prove lack of a saved lead. |
| P1 | CTA destination differs by page | The homepage's strategy-call CTA goes to `/contact`; many service/industry CTAs go to `/onboarding`. Contact offers a direct-calendar option; onboarding starts with a three-step brief. Make the next step explicit and measure the paths separately. |

The configured MongoDB aggregate returned no matching enquiry records for 20 August–17 October. Its production identity could not be independently confirmed, so this is **not** treated as proof that production contains zero records. [Aggregate evidence](evidence/seo-review-crm-2026-10-17.json) contains no individual contact information.

The previous GA4 review also found an event naming discrepancy (`qualified_lead` recorded versus `qualify_lead` configured). Recheck its current state rather than assuming it is still unchanged. Successful form submission, calendar opening, confirmed booking and sales qualification must remain distinct. Google's [recommended lead events](https://support.google.com/analytics/answer/9267735) distinguish accepted enquiries from qualified and converted leads.

## Assessment of the marketing team's document

Keep its central direction: business-system offers, qualified enquiries, revenue attribution, genuine client proof and tightly scoped acquisition experiments. Its warnings about treating keyword candidates as research rather than verified demand are appropriate. So is its refusal to turn 10× into a guarantee.

Revise these parts before execution:

1. **Replace the blank-slate page plan with the existing URL inventory.** Twelve industry offers already exist. Do not wait until weeks 8–9 to publish their first versions or create competing new URLs for the same intent.
2. **Move lead-delivery and tracking acceptance to the immediate work queue.** The document schedules substantial website fixes in week 4. The direct-booking gap, destination clarity and controlled enquiry test should be addressed first.
3. **Prioritize by observed demand and proof.** WordPress has the clearest current service-query exposure. Delhi has more impressions but substantially lower positions. Wholesale and restaurants have relevant project proof; clinics and other industries need evidence-led validation, not automatic equal effort.
4. **Treat its budgets, international pilots and lead forecasts as proposals.** The available GSC evidence does not validate US/UK/Australian acquisition or their commercial economics. Its more-than-15 all-channel enquiry reference is not a measured organic baseline.
5. **Use one named owner and a weekly scorecard.** Deliverables should be verified submissions and qualified opportunities, alongside search metrics. Ten-times a zero or unknown lead baseline is not a useful numerical target.

## Immediate execution checklist

| Order | Work | Acceptance evidence |
| --- | --- | --- |
| 1 | Confirm production CRM identity and notification destination; read the fresh GA4 funnel through a separately authorized Analytics CLI connection | Same production hostname/stream/database verified; unknown counts remain unknown |
| 2 | Validate one controlled submission in isolated staging with notifications mocked; then reconcile an explicitly approved production QA submission | One accepted submission, one CRM record, source retained where consent permits, assigned owner and notification received; failed attempts record no success |
| 3 | Add trusted, consent-aware calendar-open and confirmed-booking tracking to the direct calendar branch; reconcile bookings to provider/CRM without counting clicks as leads | Known Calendly iframe origin/source verified; one event per confirmed booking; duplicate/forged messages do not count |
| 4 | Align meeting duration and CTA explanation; inspect the live mobile form and floating-button clearance | Advertised next step and actual next step agree; readable fields and unobstructed tap targets |
| 5 | Review WordPress search-result copy against actual query/country/device data, confirm relevant delivered work, improve proof and enquiry path | Dated page-specific change and query baseline; no unsupported enterprise experience claims |
| 6 | Strengthen existing Delhi and B2B/restaurant proof-to-offer journeys | Approved project scope and workflow examples with contextual links; no invented client results or office locations |
| 7 | Recheck the three excluded industry URLs and custom software after substantive work and recrawl | HTTP/canonical checks plus dated URL inspections; no bulk duplicate page creation or repeated sitemap submission as a growth tactic |
| 8 | Reconcile GSC, GA4 and CRM weekly using comparable settled windows | Brand/nonbrand clicks, commercial sessions, accepted enquiries, qualified leads, bookings and wins reported separately |

No 10× forecast is supported. As an **illustration only**, 10 qualified enquiries per month at a 3% session-to-enquiry rate and 50% qualification rate requires about 667 relevant sessions per month. Those rates have not been measured for Devacia; GSC clicks must not be substituted directly for GA4 sessions. Establish an absolute qualified-lead target and a trustworthy baseline before calculating a multiplier.

Google notes that changes can take hours to months and generally recommends allowing a few weeks to assess search effects. That is a reason to evaluate the release fairly, not a reason to postpone conversion fixes. [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide). Repeated crawl requests do not guarantee inclusion or rankings. [Google recrawl guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).

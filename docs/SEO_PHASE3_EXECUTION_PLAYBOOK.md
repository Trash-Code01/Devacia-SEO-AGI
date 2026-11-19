> Historical plan: superseded where inconsistent by [the 2 October implementation record](docs/seo/ALL_PHASES_IMPLEMENTATION_2026-10-02.md). Use Prayagraj as the confirmed base, keep published blog pages indexable, and distinguish accepted inquiries from clicks, starts and sales qualification. External execution remains subject to the dependencies in that record.

# Devacia Phase 3 SEO Execution Playbook

## Purpose
This document covers the post-implementation SEO execution phase for Devacia after the India-first SEO buildout.

As of July 8, 2026, the code implementation is in place. This phase is about:
- deployment QA
- Google Search Console submission order
- GA4 and lead-tracking validation
- India-first measurement
- the next content and landing-page roadmap

This is the operational playbook for the next 30 to 90 days.

## What Is Already Live In Code

### Canonical entity and local trust layer
- `/about`
- `/locations/india/prayagraj/web-development-company`
- `/locations/india/delhi/web-development-company`
- `/locations/india/lucknow/web-development-company`

### Service and commercial pages
- `/service`
- `/services/website-development`
- `/services/custom-software-development`
- `/services/ecommerce`
- `/services/performance-marketing`
- `/services/lead-generation-websites`
- `/services/conversion-rate-optimization`
- `/solutions/ecommerce-conversion-rescue`
- `/solutions/custom-booking-systems`

### Industry pages
- `/industries/ecommerce/conversion-growth-system`
- `/industries/gyms/membership-growth-system`
- `/industries/restaurants/booking-ordering-system`
- `/industries/healthcare/clinic-growth-system`

### Problem and comparison pages
- `/problems/website-is-broken-or-down`
- `/problems/website-is-slow-and-losing-sales`
- `/problems/why-your-website-is-not-converting`
- `/problems/how-to-increase-ecommerce-sales`
- `/pricing/website-development-cost-india`
- `/compare/how-to-choose-a-web-development-agency`
- `/compare/wordpress-vs-shopify-vs-custom`

### AI and discovery support
- dynamic `/llms.txt`
- dynamic `/llms-full.txt`
- dynamic sitemap output

### Measurement support
- attribution capture in the onboarding funnel
- lead attribution stored with lead lifecycle data
- CTA and lead events available for GTM / GA4

## Phase 3 Definition Of Done
SEO is not "done" when the code is merged. Phase 3 is done only when:
- the site is deployed
- sitemap is submitted
- priority URLs are inspected and requested in GSC
- GA4 events are validated live
- one test lead is stored with attribution
- citations and GBP consistency are checked
- 30 days of India performance monitoring are completed

## Launch Checklist

### Deployment QA
- Confirm production build passes.
- Confirm the live sitemap is available at `/sitemap.xml`.
- Confirm `/llms.txt` and `/llms-full.txt` resolve from the app routes, not static public files.
- Confirm `/about` is indexable and canonical.
- Confirm Prayagraj is the only page outputting `LocalBusiness`.
- Confirm Delhi and Lucknow remain `ProfessionalService` or service-area style pages only.
- Confirm each core SEO route has one primary H1.
- Confirm no accidental `noindex` appears on the money pages.

### Structured data QA
- Test these pages in Rich Results Test:
- `/about`
- `/locations/india/prayagraj/web-development-company`
- `/service`
- `/services/lead-generation-websites`
- `/services/conversion-rate-optimization`
- `/industries/healthcare/clinic-growth-system`
- one live blog post

### Conversion and tracking QA
- Validate `form_start` in GTM Preview and GA4 Realtime.
- Validate `book_strategy_call`.
- Validate `qualified_lead`.
- Validate `strategy_call_booked`.
- Validate `phone_click`.
- Validate `whatsapp_click`.
- Submit one real test lead and confirm `attribution.firstTouch`, `attribution.latestTouch`, `gaClientId`, and `market` are stored.

### Local authority QA
- Confirm NAP consistency for Prayagraj across:
- website
- Google Business Profile
- Clutch
- GoodFirms
- LinkedIn
- Facebook if active
- Bing Places if active
- Apple Business Connect if active
- Justdial
- Sulekha

## Exact GSC Submission Order

### Step 1: submit sitemap first
- `https://www.devacia.com/sitemap.xml`

### Step 2: inspect and request indexing in this order

#### Wave 1: entity and local trust
1. `https://www.devacia.com/about`
2. `https://www.devacia.com/locations/india/prayagraj/web-development-company`
3. `https://www.devacia.com/service`

#### Wave 2: primary money pages
4. `https://www.devacia.com/services/website-development`
5. `https://www.devacia.com/services/custom-software-development`
6. `https://www.devacia.com/services/ecommerce`
7. `https://www.devacia.com/services/performance-marketing`

#### Wave 3: newly created high-intent pages
8. `https://www.devacia.com/services/lead-generation-websites`
9. `https://www.devacia.com/services/conversion-rate-optimization`
10. `https://www.devacia.com/solutions/ecommerce-conversion-rescue`
11. `https://www.devacia.com/solutions/custom-booking-systems`
12. `https://www.devacia.com/industries/healthcare/clinic-growth-system`

#### Wave 4: existing industry and problem pages
13. `https://www.devacia.com/industries/ecommerce/conversion-growth-system`
14. `https://www.devacia.com/industries/gyms/membership-growth-system`
15. `https://www.devacia.com/industries/restaurants/booking-ordering-system`
16. `https://www.devacia.com/problems/why-your-website-is-not-converting`
17. `https://www.devacia.com/problems/how-to-increase-ecommerce-sales`
18. `https://www.devacia.com/pricing/website-development-cost-india`

### GSC notes
- Do not bulk-request every page at once.
- Submit in waves over 2 to 4 days.
- Prioritize changed or newly launched pages first.
- If homepage and older service pages are already indexed, focus manual requests on changed and new pages.
- Use the India country filter when reviewing impact.

## GA4 And GTM Post-Launch Checks

### Mark these as key events in GA4
- `qualified_lead`
- `strategy_call_booked`
- `whatsapp_click`
- `phone_click`
- `book_strategy_call`
- `form_start`

### Keep as diagnostic or secondary
- `generate_lead`
- `form_partial`
- `case_study_view`
- `service_interest`
- `pricing_interest`

### Weekly checks
- Confirm event volume is still coming through.
- Confirm attribution parameters are still attached.
- Confirm the top landing pages are recording organic entries.
- Confirm no GTM publish changed event names or removed parameters.

## 30-Day SEO Monitoring Board

### Primary KPIs
- India clicks from non-brand queries
- India impressions on service and location pages
- service-page CTR
- Prayagraj page clicks and impressions
- GBP calls, clicks, direction requests, and website visits
- organic attributed leads
- qualified leads by landing page

### Secondary KPIs
- indexed page count
- branded spelling consistency for `Devacia`
- case study assisted traffic
- blog assisted traffic
- WhatsApp clicks from organic landing pages

### Dashboard views to maintain
- GSC performance, country = India, query + page
- GSC page filter for money pages only
- GSC page filter for Prayagraj only
- GA4 organic landing pages
- GA4 event count for `qualified_lead`
- GBP weekly actions

### Review cadence
- Day 3: indexing and coverage check
- Day 7: impression and CTR check
- Day 14: early ranking movement and local impressions check
- Day 30: non-brand click, lead, and local-action review

## India-First Content Roadmap
This roadmap is intent-first, not volume-validated. It should be upgraded with:
- GSC India query export
- GBP insights export
- Keyword Planner export

Until then, prioritize pages by buyer intent and lead closeness.

### Sprint 1: direct lead intent
Build the next pages most likely to produce sales conversations.

- `/services/website-redesign`
- `/services/clinic-website-development`
- `/services/restaurant-website-development`
- `/services/gym-website-development`
- `/problems/website-not-getting-leads`
- `/compare/freelancer-vs-web-development-agency-india`

### Sprint 2: appointment and local-commercial systems
Build around industries where phone, booking, and trust drive conversion.

- `/industries/salons/appointment-growth-system`
- `/industries/education/admission-enquiry-system`
- `/industries/real-estate/lead-capture-system`
- `/industries/dental/appointment-growth-system`
- `/solutions/google-ads-landing-page-system`
- `/solutions/local-lead-capture-system`

### Sprint 3: proof, pricing, and decision-stage support
These pages help convert buyers who already know they need help.

- `/pricing/custom-software-development-cost-india`
- `/pricing/shopify-development-cost-india`
- `/compare/wordpress-vs-custom-for-service-business`
- `/compare/shopify-vs-custom-for-d2c-brand`
- `/problems/too-many-unqualified-leads-from-website`
- `/problems/google-ads-clicks-but-no-leads`

## Blog Backlog For India Organic Demand
Repurpose social themes and founder insight into full posts.

### Highest-priority blog topics
- why your website gets traffic but no leads
- signs your business website needs a redesign
- how clinics can get more appointments from Google
- why your Shopify store is getting visits but not sales
- website vs landing page: what Indian businesses actually need
- what makes a good lead-generation website in India
- how to improve Google Business Profile leads
- why fast websites convert better on mobile in India

### Blog rules
- one post = one search intent
- one strong service link
- one proof link
- one CTA
- clear author attribution
- source references where claims are factual

## Google Ads Approval And Readiness Checklist
Organic SEO and Google Ads are different systems, but the same trust layer helps both.

### Keep these clean before scaling ads
- clear About page
- clear Contact page
- visible phone and email
- privacy policy
- terms
- real business location signals
- consistent business name across profiles
- working forms and tracked conversions
- no misleading pricing or unsupported claims

### Best landing pages for ad readiness
- `/services/lead-generation-websites`
- `/services/conversion-rate-optimization`
- `/services/ecommerce`
- `/locations/india/prayagraj/web-development-company`

## Things Not To Do In The Next 30 Days
- Do not create new city office pages with fake addresses.
- Do not publish thin AI-written pages just to expand page count.
- Do not split the blog into a second indexed editorial system.
- Do not change event names again in this phase.
- Do not chase broad vanity keywords before the service and local pages stabilize.

## Missing Inputs That Upgrade This Playbook
These are still the most valuable missing datasets:
- GSC export for last 16 months, country = India
- GBP insights export
- Keyword Planner export

Once those are available, use them to:
- rewrite titles and meta descriptions by actual low-CTR pages
- expand page clusters around real queries instead of inferred queries
- prioritize cities, industries, and problem pages by demand
- separate branded versus non-brand lead performance more clearly

## Recommended Owner Sequence
1. Deploy the site.
2. Run the checklist above.
3. Submit the GSC wave list.
4. Validate GA4 and GTM.
5. Validate one test lead in Mongo.
6. Start Sprint 1 content production.
7. Review India GSC and GBP data after 7, 14, and 30 days.

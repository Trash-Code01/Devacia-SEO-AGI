# Industry SEO implementation — 7 October 2026

The main website-development page, industry directory and all twelve industry offers now form one crawlable offer collection. The existing page layouts, typography and colour choices are retained. This is a local implementation; it has not been deployed.

## Search intent and page ownership

Each page addresses the business owner hiring a developer for that industry. The pages target development services, not consumers searching for a nearby gym, restaurant or clinic. These are editorial intent targets, not claimed search-volume or ranking measurements.

| Page | Primary commercial intent | Distinct offer detail |
| --- | --- | --- |
| [Main offer](https://www.devacia.com/services/website-development) | Custom website development | Websites, CMS/admin tools, customer actions and connected operations |
| [Industry directory](https://www.devacia.com/industries) | Website development by industry | Discover and compare the twelve offers |
| [Gyms](https://www.devacia.com/industries/gym-fitness-website-development) | Gym website development | Trials, memberships, class schedules and renewal options |
| [Cafés](https://www.devacia.com/industries/cafe-website-development) | Café website development | Editable menus, pickup ordering and catering requests |
| [Clinics](https://www.devacia.com/industries/clinic-website-development) | Clinic website development | Practitioners, services and appointment requests |
| [HVAC](https://www.devacia.com/industries/hvac-home-services-website-development) | HVAC and home-service website development | Service areas, job requirements and technician follow-up |
| [Real estate](https://www.devacia.com/industries/real-estate-website-development) | Real estate website development | Listings, buyer requirements and viewing requests |
| [Restaurants](https://www.devacia.com/industries/restaurant-website-development) | Restaurant website development | Menus, reservations and separately scoped ordering |
| [Wholesale](https://www.devacia.com/industries/b2b-wholesale-manufacturing-web-development) | Wholesale and manufacturer website development | Product specifications, quantities and structured RFQs |
| [Professional services](https://www.devacia.com/industries/professional-services-website-development) | Agency and professional-services website development | Expertise, evidence and useful project briefs |
| [Corporate B2B](https://www.devacia.com/industries/corporate-b2b-website-development) | Corporate B2B website development | Solutions, technical requirements and sales routing |
| [Salons](https://www.devacia.com/industries/salon-spa-website-development) | Salon and spa website development | Services, staff preferences and appointments |
| [Education](https://www.devacia.com/industries/education-coaching-website-development) | Education and coaching website development | Programmes, eligibility, counselling and admissions |
| [Hospitality](https://www.devacia.com/industries/hotel-venue-website-development) | Hotel and venue website development | Rooms, event capacity, dates and booking enquiries |

The URLs above are the intended production URLs. Review them locally at `http://127.0.0.1:3101` using the same paths.

## Implemented

- Unique titles, descriptions, social metadata and self-referencing canonicals for all twelve industry offers.
- Industry-specific capability descriptions, business outcomes, customer-to-team steps and four specific FAQs per industry, plus two shared scope/ownership answers. Identical placeholder module text was replaced.
- One canonical industry URL per offer. Twenty-seven older URL variants redirect directly with HTTP 308 and preserve query parameters. Unknown industry URLs return 404.
- Main-page links to all twelve offers; directory links; relevant related-industry links; parent links; a site-wide directory link in the footer. Existing booking-solution and main-page links now use canonical destinations.
- Service and BreadcrumbList schema, FAQ schema matching the actual answers, and CollectionPage/ItemList schema for the directory. No fabricated ratings or performance statistics were added.
- Sitemap and discovery-file inventories use canonical URLs. Changed offer and directory dates are 7 October 2026. The main offer metadata remains independent of the old buyer-guide messaging.
- Core content renders in initial HTML. Entrance animations no longer hide the offer text before hydration. Native FAQ disclosures remain keyboard accessible; reduced-motion CSS disables the page animations, transforms and sticky card stacking.
- Responsive project images, visible keyboard focus, and tablet breakpoints that avoid overlapping navigation and an overflowing main-page introduction.
- Strategy-call CTAs, including navigation/footer and the mobile booking shortcut, lead to the existing onboarding flow. Visitors are told to share project details first.
- Existing consent-aware tracking now recognises industry pages as service interest. Original landing-page attribution survives navigation to onboarding. CTA interest is distinct from a submitted lead or booked meeting.
- Obsidian and Yoglivya Wholesale remain actual client-work evidence. Other industry references are labelled related work. Unsupported performance numbers were removed and interactive examples are labelled illustrative.

The implementation follows Google's guidance on [useful, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) and [crawlable internal links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable). Structured data is not presented as a promise of a rich result.

## Validation

- `npm run build`: production compilation and static generation pass.
- `npm run seo:test`: 23 regression tests pass, including redirects, industry attribution, consent and event meaning.
- Targeted ESLint checks: no errors; six React Refresh warnings relate to Next.js route metadata/function exports.
- `scripts/verify-seo-pages.mjs`: checks 27 priority pages and 32 linked routes, including all twelve industry offers, metadata uniqueness, initial HTML, FAQ/schema parity, heading/main counts, canonical links, local image assets, sitemap dates, 27 redirect variants and unknown-route 404s.
- Browser checks at 390 px: all twelve industry pages have one H1, one main and no horizontal page overflow or clipped H1/H2 headings. Desktop and tablet navigation were also reviewed.
- The main page was rechecked at 390, 806, 1024, 1280 and 1440 px after the tablet fix; none showed horizontal page overflow.
- Native FAQ Enter-key interaction and visible focus were verified. The strategy CTA was followed to the existing “Tell us about the project” intake without submitting a test lead.
- All five main-page project images loaded successfully after entering the proof section and using its filters. They use responsive image sources and lazy loading.
- Reduced-motion rules were inspected in source and rendered styles. OS-level reduced-motion emulation was not available in the browser control surface; no manual device preference was changed.

Machine-readable build/HTTP results: [industry-verification-2026-10-07.json](evidence/industry-verification-2026-10-07.json).

## Commercial terms retained

The current design uses India pricing from ₹39,999 and a custom international scope. It does not currently publish the earlier US$1,199 price. This SEO implementation preserves that current configuration and the starter cards' use of shared scope/inclusions. It does not change GST treatment, typical payment milestones, provider costs or proposal-specific delivery/support terms.

## After deployment

Deploy this reviewed build, then check the live canonical URLs and redirects and submit the sitemap through Search Console. Inspect indexing and actual search queries by landing page. Compare impressions, clicks, submitted enquiries and qualified outcomes rather than treating CTA clicks as leads. No live indexing, rankings, search-volume estimates, Core Web Vitals improvements or traffic gains have been verified in this local task.

The existing workspace contains unrelated changes. They were retained; no commit, push or production deployment was performed.

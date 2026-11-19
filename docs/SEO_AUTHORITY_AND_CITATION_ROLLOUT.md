> Historical plan: superseded where inconsistent by [the 2 October implementation record](docs/seo/ALL_PHASES_IMPLEMENTATION_2026-10-02.md). Use Prayagraj as the confirmed base, keep published blog pages indexable, and distinguish accepted inquiries from clicks, starts and sales qualification. External execution remains subject to the dependencies in that record.

# SEO Authority and Citation Rollout

This checklist supports the on-site SEO 3.0 implementation with the off-site actions needed for India-first local-commercial growth.

## Priority

1. Keep one canonical entity everywhere: `Devacia`
2. Keep one primary phone everywhere: `+91 63069 40734`
3. Keep one head-office location everywhere: Prayagraj, Uttar Pradesh, India
4. Keep `/about` as the canonical business-entity page
5. Keep the Prayagraj location page as the only full office/NAP page until another office is publicly verifiable

## Citation Cleanup

Normalize the exact same company details across:
- Google Business Profile
- Clutch
- GoodFirms
- LinkedIn company page
- Instagram bio and link-in-bio destination
- Facebook page if owned
- Bing Places if owned
- Apple Business Connect if owned
- Justdial
- Sulekha
- IndiaMART only if the listing can stay accurate and actively managed

For every listing:
- Use the same business name spelling: `Devacia`
- Use the same primary phone and contact email
- Use the same short company description theme: websites, custom software, and growth systems
- Use the same Prayagraj head-office reference
- Link back to `/about`, `/contact`, or the Prayagraj page based on the platform fit
- Remove duplicate or outdated listings

## Review Engine

Focus on review quality and consistency, not volume spikes.

Actions:
- Request reviews from satisfied clients after successful milestones
- Ask reviewers to mention the service type naturally when true: website development, ecommerce, custom software, lead generation, or growth systems
- Send reviewers to Google Business Profile first, then Clutch or GoodFirms when appropriate
- Reply to every public review with service and market language that stays natural
- Add fresh review screenshots or references into relevant sales and local pages when policy-safe

## External Link Acquisition

Do not chase random links. Prioritize relevance, local trust, and commercial adjacency.

Highest-value targets:
- Prayagraj and Uttar Pradesh startup communities
- Local chamber, startup, and business association pages
- SaaS partner directories if Devacia has real implementation relationships
- Ecommerce ecosystem pages and partner profiles
- Founder interviews on real business podcasts or startup blogs
- Guest contributions on Indian business-growth or web-performance publications
- Relevant portfolio and directory profiles that allow a real business description and canonical link

Preferred landing targets:
- `/about`
- `/locations/india/prayagraj/web-development-company`
- Core money pages
- High-signal industry pages
- Strong case studies

Avoid:
- Bulk directory spam
- PBNs
- Low-quality article farms
- Irrelevant foreign directories
- Exact-match anchor repetition

## AI and Entity Recognition

To improve recognition in AI-generated answers and entity systems:
- Keep brand facts identical across site, schema, citations, and social bios
- Keep company profiles public and easy to crawl
- Link to official profiles from `/about`, `/contact`, footer, and Prayagraj
- Keep blog posts authored and sourced
- Publish more proof-led pages that combine business problem, service, market, and result
- Maintain updated sitemap, canonical tags, and clean indexable URLs only
- Keep `llms.txt` and `llms-full.txt` aligned with live services, case studies, profiles, and blog content

## India-First Content and Lead Focus

Create content that matches commercial search intent in India:
- Location + service pages
- Problem-first service pages
- Industry + solution pages
- Comparison pages for high-intent buyers
- Fast-fix articles for broken websites, slow pages, weak conversions, or poor lead quality
- Case studies with clearer outcomes, stack details, and CTA paths

Every post or page should aim to include:
- One main intent
- One service link
- One proof link
- One clear CTA
- Source references when claims need evidence

## Launch Week QA

Before production rollout:
- Check canonical tags on `/about`, Prayagraj, all core services, and new industry pages
- Check one primary H1 per page
- Check `LocalBusiness` markup appears only on Prayagraj
- Check external profile links resolve correctly
- Check sitemap includes only canonical, indexable URLs
- Check GBP, Clutch, and GoodFirms URLs are live in environment variables where applicable
- Check lead attribution fields persist through the form flow and API
- Check GA4 and GTM events for `form_start`, `book_strategy_call`, `qualified_lead`, `strategy_call_booked`, `phone_click`, and `whatsapp_click`

## First 30 Days After Deploy

Watch these metrics weekly:
- Non-brand clicks from India
- CTR on service pages
- CTR on Prayagraj and other India location pages
- Google Business Profile calls, direction requests, and website clicks
- Organic leads with attribution stored in Mongo
- Brand spelling consistency across citations and mentions
- New referring domains that match the India-first growth strategy
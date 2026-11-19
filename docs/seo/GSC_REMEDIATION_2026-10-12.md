# GSC indexing remediation — 12 October 2026

## Verified findings

- Current URL Inspection snapshot: 61/80 indexed; 7/12 industry pages and 12/14 articles indexed. All 80 inspections succeeded.
- Live audit: 80 canonical sitemap URLs plus four screenshot URLs. All final responses were HTTP 200. Three legacy URLs returned permanent 308 redirects to the expected canonical pages.
- No noindex directive, wrong canonical or HTTP failure found on the 80 sitemap pages. All have server-rendered headings and content. This does not establish that Google will index them.
- Both failed validation examples (wholesale and professional services) were re-inspected and returned PASS / Submitted and indexed, with matching Google-selected canonicals.
- Screenshots show a failed September validation and an overview updated 9 October. That overview is not the same URL set or timestamp as the current 80-URL inspection snapshot.
- llms.txt is a machine-readable reference file outside the sitemap. Its non-indexing is not a failed commercial landing page. It remains accessible; no robots block or removal request was added.

## Completed changes

- Lead-generation offer: concrete qualification, CRM handoff, enquiry-versus-booking distinction, delivery acceptance checks, relevant project evidence and expanded FAQs shared with schema.
- Conversion problem guide: a six-step diagnostic workflow covering measurement, intent, form delivery, sales follow-up and evaluation.
- Internal links: MVP service to its checklist; performance-marketing and conversion pages to the bounce-rate article and lead-generation offer; booking service to salon/spa and hotel/venue offers; lead-generation page to HVAC and education.
- Performance-marketing category: useful introductory guidance and links to the appropriate diagnostic and service pages.
- Both excluded articles updated in the CMS with existing slugs, categories and original publication dates preserved. Bounce-rate article now uses the GA4 definition and sourced measurement guidance. MVP article replaces unsupported universal price/timeline rules with scope, acceptance and launch checks. Both have substantive body copy, unique metadata, FAQs, internal links and onboarding CTAs.
- Exact-revision checks and BSON backups protected the CMS updates. Backup: .tmp/article-correction-backup-1791806406986/records.json (ignored by Git).
- Sitemap modification dates updated only for changed code pages; CMS article dates flow from stored updates. The existing five-minute inventory cache initially served old dates, then refreshed successfully. No cache policy changed.
- GSC CLI now reads the current sitemap by default, rejects unrelated properties, supports JSON output, stops on quota/auth failures and requests write scope for explicit sitemap submission. Removed obsolete hardcoded URL inventory.

## Validation

- Production build passed: 78 generated entries.
- All 28 SEO regression tests passed.
- Existing rendered verifier passed: 41 pages, 27 guide links, 28 industry redirects, sitemap and category redirect checks.
- Focused verifier passed all eight changed routes: HTTP, one H1/main, self-canonical, indexable directives, initial HTML copy, contextual links and matching FAQ schema. Both article sitemap dates verified.
- Updated CLI inspected the lead-generation URL successfully and wrote structured evidence.

## Release

Committed and pushed 14 files to production main: efe0d7fc38404478cac269189152afdc5dd73d67. Unrelated workspace changes were excluded. Deployment and sitemap submission results are recorded below after completion.

## URLs still awaiting Google indexing

Statuses below are the pre-remediation inspection snapshot. Do not interpret the edits or sitemap submission as a new Google crawl. No ordinary-page bulk indexing API call was made.

| URL | Google coverage | Action / interpretation |
| --- | --- | --- |
| /industries | Discovered - currently not indexed | Live page passed technical checks; retain canonical URL and monitor. Previous crawl may precede the 10 October release. |
| /industries/cafe-website-development | URL is unknown to Google | Live page passed technical checks; retain canonical URL and monitor. Previous crawl may precede the 10 October release. |
| /industries/hvac-home-services-website-development | Discovered - currently not indexed | Live page passed technical checks; retain canonical URL and monitor. Previous crawl may precede the 10 October release. |
| /industries/salon-spa-website-development | Discovered - currently not indexed | Live page passed technical checks; retain canonical URL and monitor. Previous crawl may precede the 10 October release. |
| /industries/education-coaching-website-development | URL is unknown to Google | Live page passed technical checks; retain canonical URL and monitor. Previous crawl may precede the 10 October release. |
| /industries/hotel-venue-website-development | URL is unknown to Google | Live page passed technical checks; retain canonical URL and monitor. Previous crawl may precede the 10 October release. |
| /services/custom-software-development | Crawled - currently not indexed | Live page passed technical checks; retain canonical URL and monitor. Previous crawl may precede the 10 October release. |
| /services/business-automation | Crawled - currently not indexed | Live page passed technical checks; retain canonical URL and monitor. Previous crawl may precede the 10 October release. |
| /services/landing-page-design | Crawled - currently not indexed | Live page passed technical checks; retain canonical URL and monitor. Previous crawl may precede the 10 October release. |
| /services/website-support-maintenance | Crawled - currently not indexed | Live page passed technical checks; retain canonical URL and monitor. Previous crawl may precede the 10 October release. |
| /services/rebranding | Discovered - currently not indexed | Live page passed technical checks; retain canonical URL and monitor. Previous crawl may precede the 10 October release. |
| /services/lead-generation-websites | Crawled - currently not indexed | Content and/or supporting links improved; await Google recrawl. |
| /problems/website-is-broken-or-down | Crawled - currently not indexed | Live page passed technical checks; retain canonical URL and monitor. Previous crawl may precede the 10 October release. |
| /problems/why-your-website-is-not-converting | Crawled - currently not indexed | Content and/or supporting links improved; await Google recrawl. |
| /locations/india/prayagraj/civil-lines-digital-marketing | Discovered - currently not indexed | Live page passed technical checks; retain canonical URL and monitor. Previous crawl may precede the 10 October release. |
| /locations/india/delhi/gurgaon-performance-marketing | URL is unknown to Google | Live page passed technical checks; retain canonical URL and monitor. Previous crawl may precede the 10 October release. |
| /blog/performance-marketing | URL is unknown to Google | Content and/or supporting links improved; await Google recrawl. |
| /blog/fix-it-fast/startup-mvp-checklist | Discovered - currently not indexed | Content and/or supporting links improved; await Google recrawl. |
| /blog/performance-marketing/high-website-bounce-rate-fix | Discovered - currently not indexed | Content and/or supporting links improved; await Google recrawl. |

## Follow-through and limits

- GSC URL Inspection API reads Google’s stored index state. It does not run a live Google test or submit individual indexing requests.
- The public GSC API has no Start New Validation operation. The September validation failure cannot be cleared by a CLI command. Its two shown failed examples are now indexed.
- Do not redirect useful distinct offers merely to remove excluded URLs from a report. Existing historical aliases already redirect correctly and should stay outside the sitemap.
- Inspect the priority canonical pages after Google recrawls. Manual Request Indexing is available in the Search Console interface, subject to quota; it is not a guarantee.
- Indexing is not proof of traffic, qualified leads or revenue growth.

## Evidence and guidance

- [Current GSC snapshot](evidence/gsc-status-2026-10-12.json)
- [Live audit and additional screenshot URL inspections](evidence/gsc-remediation-live-2026-10-12.json)
- [Lead-generation CLI inspection](evidence/gsc-lead-generation-2026-10-12.json)
- [Google: URL Inspection API](https://developers.google.com/webmaster-tools/v1/urlInspection.index/inspect)
- [Google: requesting recrawls](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
- [Google Analytics: engagement and bounce rate](https://support.google.com/analytics/answer/12195621?hl=en)

## Completed production release

- Vercel reported success for commit efe0d7fc38404478cac269189152afdc5dd73d67.
- All eight updated public routes passed the focused verifier, including article sitemap modification dates.
- Google accepted the CLI sitemap submission. Recorded lastSubmitted: 2026-10-12T12:08:46.922Z; pending: false; errors: 0; warnings: 0; lastDownloaded: 2026-10-12T12:08:48.781Z.
- The sitemap contents indexed counter is not the URL Inspection indexed total. The latest complete URL Inspection baseline remains 61/80, pending a later Google recrawl.
- No individual indexing request or validation restart was performed; neither is provided by the URL Inspection API.

[Production verification and sitemap evidence](evidence/gsc-remediation-release-2026-10-12.json)

# Targeted SEO fixes — 14 October 2026

## Evidence and scope

The complete GSC check remains 61/80 indexed, with no indexed URLs gained or lost since 12 October. This release addresses evidence-backed content and usability issues; it does not claim to resolve Google’s pending indexing decisions.

## Fixes

- Civil Lines: removed rank-#1, instant-loading and predictable-admissions claims; explained course pages, local discovery, campaign scope, form delivery and counsellor handoff. The page now distinguishes enquiries, appointments and admissions.
- Civil Lines: aligned metadata and FAQ schema with visible content, clarified the existing Kareli head office and Civil Lines service area, linked the education offer and relevant services, and routed the strategy CTA through /onboarding.
- Industry directory: added a concise workflow-selection guide; clarified that offers are not twelve delivered client systems; added accessible names and selected-state semantics to filtering controls; retained all twelve canonical links in initial HTML.
- Both substantively updated pages receive 14 October sitemap modification dates. URLs and existing industry redirects remain unchanged.
- Extended rendered verification to cover the two changed pages, all twelve industry links, accessible search naming, onboarding CTA destinations and unsupported-claim removal.

## Traffic diagnosis

WordPress had the largest page-level impression decline: 82 to 2 between 28 September–4 October and 5–11 October. Daily data shows the sharp reduction starts on 5 October, before the 10 and 12 October releases. The URL remains indexed with a matching Google canonical; its recorded last crawl is 22 September. The data does not prove a technical cause or justify rewriting the offer again. Missing query rows can be affected by reporting limits; page and property aggregates are not interchangeable.

## Manual request queue

The browser connection failed before Search Console loaded. No Request Indexing actions or validation restarts were performed. The public URL Inspection API does not offer these controls. For the five priority canonical URLs below, use the existing inspection link, run a live test and request indexing once if eligible. Requests do not guarantee indexing; do not repeatedly submit unchanged URLs.

| URL | Current recorded coverage | Open inspection |
| --- | --- | --- |
| /industries | URL is unknown to Google | [Search Console](https://search.google.com/search-console/inspect?resource_id=https://www.devacia.com/&id=u10FN4f5nVG8cXg-MAqy9A&utm_medium=link&utm_source=api) |
| /locations/india/prayagraj/civil-lines-digital-marketing | URL is unknown to Google | [Search Console](https://search.google.com/search-console/inspect?resource_id=https://www.devacia.com/&id=qiZiOxcVnByN4rmk6V7EHg&utm_medium=link&utm_source=api) |
| /services/lead-generation-websites | Crawled - currently not indexed | [Search Console](https://search.google.com/search-console/inspect?resource_id=https://www.devacia.com/&id=ZIFp7i1flXv_2QkDq0h3yQ&utm_medium=link&utm_source=api) |
| /blog/fix-it-fast/startup-mvp-checklist | Discovered - currently not indexed | [Search Console](https://search.google.com/search-console/inspect?resource_id=https://www.devacia.com/&id=gbFYl1uPSE5CRdJQmIByNw&utm_medium=link&utm_source=api) |
| /blog/performance-marketing/high-website-bounce-rate-fix | Discovered - currently not indexed | [Search Console](https://search.google.com/search-console/inspect?resource_id=https://www.devacia.com/&id=Ci7oIQL_voRtimS-BhqYJA&utm_medium=link&utm_source=api) |

The remaining five industry offers are already discovered: cafes, HVAC/home services, salons/spas, education/coaching and hotels/venues. Keep their canonical URLs and the existing internal links; monitor a later crawl before making further content changes without evidence.

## Evidence

- [Page/query comparison](evidence/gsc-traffic-diagnosis-2026-10-14.json)
- [WordPress daily trend](evidence/gsc-wordpress-trend-2026-10-14.json)
- [Complete indexing snapshot](evidence/gsc-status-2026-10-14.json)
- [Google: diagnosing search traffic drops](https://developers.google.com/search/docs/monitor-debug/debugging-search-traffic-drops)
- [Google: crawlable internal links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)

Deployment, tests and sitemap acknowledgement will be recorded below after verification.

## Completed production release

- Commit: 7b5cfe3a028908588f6fa49901b9c41bc50f2abf; Vercel deployment reported success.
- Production build succeeded; all 28 SEO regression tests passed.
- Local rendered verification passed for 42 pages, 27 guide links, 28 industry redirects, the category redirect and sitemap checks.
- All 10 focused production routes passed canonical, initial HTML, heading, contextual-link and FAQ checks.
- The live sitemap contains 80 URLs; both updated pages have 14 October modification dates.
- Google accepted the CLI sitemap submission. Recorded lastSubmitted: 2026-10-14T10:31:12.823Z; pending: false; errors: 0; warnings: 0; lastDownloaded: 2026-10-14T10:31:14.634Z.
- Latest complete URL Inspection baseline remains 61/80 indexed. Sitemap acknowledgement does not confirm a new crawl or indexing.
- Manual indexing requests and validation restart were not performed because the browser connection failed. The five priority inspection links above remain the manual queue.
- The Git shell credential helper stalled. The existing credential manager worked directly, allowing the original verified commit to be pushed without changing authentication settings.

[Production verification and sitemap evidence](evidence/targeted-fix-live-2026-10-14.json)

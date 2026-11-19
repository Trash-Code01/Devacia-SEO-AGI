# Production cleanup — 16 October 2026

The owner identified `/industries` as a temporary local-development directory, not an approved public page. Earlier SEO work incorrectly treated it as a public hub. The individual industry landing pages remain approved public offers.

## Removed and repaired

- Deleted the `/industries` page and its directory component. The exact old URL permanently redirects to `/services/website-development`; the twelve child industry URLs remain live.
- Removed the directory from the sitemap, AI discovery documents, footer and the active SEO update inventory.
- Updated visible breadcrumbs and matching BreadcrumbList schema to use Website Development as the parent.
- Changed industry navigation to `/services/website-development#industries` and supplied the previously missing anchor on the existing twelve-link section. Main-page buttons use the same-page anchor.
- Removed the directory from active rendered-page verification expectations and CTA-interest route classification.
- Added `npm run seo:verify-cleanup -- <origin>` and included it in the existing rendered release verification. It checks every sitemap page plus legal/onboarding pages for retired links and schema, checks that all twelve offers remain discoverable, and tests removed resources, archived PDFs and common development URLs.

## Inventory decisions

| Paths | Production behavior |
| --- | --- |
| `/industries` | Retired directory; 308 to the approved website-development service |
| Twelve canonical `/industries/...-website-development` offers, including wholesale's existing descriptive URL | Retained; approved individual commercial pages |
| `/resources`, `/resources/website-project-brief`, `/resources/website-maintenance-checklist`, `/resources/b2b-rfq-workflow` | Previously owner-removed; must remain 404 |
| Eleven former public business-document PDF paths | Must remain 404; authenticated private archive remains available |
| `/dev`, `/debug`, `/test`, `/preview`, `/playground`, `/sandbox`, unknown industry slug | Must return 404 |
| Historical restaurant, wholesale, clinic and ecommerce aliases | Existing redirects to canonical pages; not extra public offers |
| Admin, onboarding and existing legal routes | Legitimate application/utility routes; not deleted as development pages |

The source inventory reviewed the Next app routes, Pages API routes, public files and earlier removal notes. No further confirmed development-only page was identified in that inventory. This does not label unapproved pages as approved merely because they render successfully; future removals should use the owner's identified URLs and the maintained route checks.

## Validation and release

- Local build passed (77 generated entries); all 28 SEO regression tests passed.
- Rendered verification passed for 41 priority pages, 27 guide links and 28 industry redirects.
- Cleanup check passed for all 79 sitemap URLs plus five legal/onboarding pages: 84 public pages, 22 absent development/archive URLs, two directory redirect variants and two AI discovery files.
- Commit: `3e65c370c0c886496050a80504e15f38b0ce5b89`, pushed to `main`.
- Production deployment and live checks are recorded below when complete.

## Correction to the manual indexing queue

Do not request indexing for `/industries`. The 14 October list included it in error. That snapshot's other 18 unindexed URLs were not removed by this cleanup. Historical JSON evidence remains unchanged; it records what was observed at that time.

## Evidence

- [Local cleanup verification](evidence/production-cleanup-local-2026-10-16.json)
- [Build route inventory](evidence/route-inventory-cleanup-2026-10-16.json)

The static route audit includes redirect stubs in its duplicate-title/empty-heading findings. Those entries require HTTP interpretation; they are not evidence that duplicate pages return 200 publicly.

## Completed production verification

- Vercel reported success for the commit above.
- Live cleanup verification passed: 84 public pages, 22 absent development/archive paths, 2 redirect variants, 2 AI discovery files.
- Both www and apex visits to the old directory lead to the main service page.
- Live sitemap contains 79 URLs and excludes the retired directory. All twelve individual offers remain included and linked from the main service page.
- GSC accepted the sitemap submission. Last submitted: 2026-10-16T07:05:55.337Z; last downloaded: 2026-10-16T07:05:58.221Z; pending: false; errors: 0; warnings: 0.
- Sitemap acknowledgement is not an immediate update of Google's index. No removal-tool request or individual indexing request was issued.

[Live cleanup evidence](evidence/production-cleanup-live-2026-10-16.json) · [Deployment and GSC evidence](evidence/production-cleanup-release-2026-10-16.json)

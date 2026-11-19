# Devacia deployment candidate — 10 October 2026

The local SEO implementation and browser checks have passed. This is a prepared deployment candidate, not a production deployment or a claim that tracking, indexing or growth has been verified live.

Preview: http://127.0.0.1:3104/services/website-development

## Verified candidate

- Production build: passed, 78 generated entries. Build ID: `0ahbHdZAr_iMcaQGPLiFG`.
- SEO regression suite: 26 passed, zero failed.
- Existing admin-login regression suite: 6 passed, zero failed.
- Rendered verification: 37 pages, 27 supporting links, 28 industry redirects, current-category article redirects, sitemap and private-document access checks passed.
- Final HTTP crawl: 118 endpoints; 87 successful responses, 30 permanent redirects and one expected temporary redirect; no errors or sitemap conflicts.
- Browser regression: 697 checks, zero failures. Chrome; 320px, 390px and 1440px widths; main offer, twelve industries and six current services. Includes keyboard disclosures, all initially available simulator toggles, reduced motion, images, initial reading without JavaScript and intercepted onboarding error/retry/success.
- Automated accessibility: no axe WCAG A/AA violations detected in the main landmark on those 19 commercial pages plus onboarding at 390px. This is bounded automated evidence, not full assistive-technology or cross-browser certification.
- Prices are absent from all twelve industry meta descriptions. On-page pricing and proposal-specific GST/payment/support terms remain visible. FAQ answers and structured data use the same source.

Evidence: [rendered checks](evidence/implementation-verification-latest.json), [HTTP crawl](evidence/url-http-release-2026-10-10.json), [browser checks](evidence/release-browser-2026-10-10.json), [accessibility](evidence/release-accessibility-2026-10-10.json), [static inventory](evidence/route-inventory-release-2026-10-10.json). Static inventory reads generated files before redirect handling; alias duplicates and empty redirect documents in that file are resolved by the HTTP and rendered redirect checks.

The [source manifest](evidence/release-source-manifest-2026-10-10.json) records hashes for 413 source/asset paths and the base Git commit, including deleted tracked paths. It excludes secrets and ignored private documents and does not replace an immutable release commit.

### Mobile diagnostics and visual review

Local Chrome, 390×844 viewport, requested 4× CPU slowdown and 1.6 Mbps/150ms network emulation, two cold-browser runs per page. Local-origin and image-cache behavior limit comparison with real mobile visitors. [Raw measurements](evidence/release-performance-2026-10-10.json).

| Page | LCP across two runs | Observed CLS |
| --- | --- | --- |
| Main website-development offer | 1.68–2.59 seconds | 0 |
| Restaurant industry offer | 1.50–1.82 seconds | 0 |
| GEO service | 1.33–1.75 seconds | 0 |

The main page exceeded 2.5 seconds in one run. Long-task blocking was 177–526ms across these samples; transferred resources were about 2.9MB per page. These measurements do not establish production Core Web Vitals or INP. Recheck from the deployed origin and use field data when available; monitor image/script payload and interaction responsiveness.

Viewed mobile hero screenshots for all three samples and normal desktop hero/final-section screenshots for the main and restaurant pages. Text and CTA/link layouts were readable in those samples. The extremely tall full-page capture had repeated raster content; normal viewport screenshots and the DOM confirmed one H1 and the intended final section. Use the `release-*-desktop-hero.png` / `release-*-desktop-final.png` and mobile images for visual evidence, rather than treating the tall capture as a faithful rendering.

## Completed corrections

1. Consolidated metadata ownership, descriptive canonical industry URLs, direct legacy redirects, discovery links, service/breadcrumb/FAQ data and sitemap entries.
2. Industry-specific operational costs, custom technology explanations, defined integration scope and clearly labelled real/related proof. Corrected duplicated corporate/education FAQ topics and unsupported performance claims.
3. Visible payment terms on every industry page; proposal controls dates, quantities, revisions, support, third-party costs and final scope.
4. Clarified illustrative simulator states and the difference between interest, requests, confirmed bookings and accepted orders. Disabled demonstration-only call/CRM actions.
5. Improved text contrast, keyboard focus, comparison-table/code scrolling, input labels and standalone onboarding heading. Retained the existing layouts, form fields and backend flow.
6. Added repeatable local browser, accessibility and mobile performance diagnostics. CTA interest remains separate from accepted enquiries and scheduled meetings.

## Conditions before production release

| Owner | Required check | Why it remains open |
| --- | --- | --- |
| Release / Engineering | Build the exact reviewed source in the deployment environment; record its immutable revision and configuration | This workspace contains substantial pre-existing uncommitted and untracked work. The existing Git HEAD alone does not identify this candidate. No commit, push or deployment was performed. |
| Engineering | Verify cold-start CMS/blog and sitemap responses from the deployment host | The first local crawl timed out on 16 CMS routes. Read-only database diagnostics succeeded and the repeat crawl passed. The transient failure has not been proven fixed by a code change. Retained [cold-crawl evidence](evidence/url-http-release-cold-2026-10-10.json). Do not hide a failed CMS behind seed content. |
| Release | Confirm production database, admin/auth and notification configuration | Local values do not prove hosting configuration. See environment checklist below. |
| Measurement | Verify GA4 stream, GTM container, consent and actual lead/booking delivery | Local tests intercept APIs and the scheduler. GSCWizard currently reports an expired subscription, so account verification was unavailable. Use direct GA4/GTM/GSC access or restore the connector; no purchase was made. |
| Release / Engineering | Provision the private document archive through the approved deployment mechanism | Private PDFs are intentionally outside public assets and ignored by Git. Local tracing passes; a clean Git deployment needs the private files supplied securely or an explicitly approved archive-storage change. Never restore them to public assets. |

### Environment checklist

- [ ] Hosting runs the intended production build, not a staging build. `APP_ENV` / `NEXT_PUBLIC_APP_ENV` must reflect the environment; keep preview/staging non-indexable. Production tracking also requires an allowed Devacia hostname and visitor consent.
- [ ] Verify `MONGO_URI`, allowed hosting network access and database permissions. Blog uses `MONGO_DB_NAME` / `MONGO_DB` or `lead-cluster`; the existing lead handler uses `lead-cluster`. Confirm this intentional target before release.
- [ ] Verify `JWT_SECRET`, `ADMIN_USERNAME` and `ADMIN_PASSWORD` in hosting without publishing values in logs, files or client bundles.
- [ ] Verify Telegram credentials and destination if Telegram is the agreed notification channel. Firebase push additionally needs `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL` and `FIREBASE_PRIVATE_KEY`; Firebase is optional and was not configured locally.
- [ ] Confirm the real GTM/GA4 destinations and tag triggers in their accounts. Existing public IDs/configuration alone do not establish successful event collection or account ownership.
- [ ] Retain private archive files and server templates in the deployed function bundle. Check anonymous archive requests remain rejected and old public document URLs remain 404.

No environment secrets, customer records or actual test enquiries were exported by this QA work. Database diagnostics inspected connectivity, blog counts and index names only. The existing CMS bootstrap behavior was not changed.

## Deployment and recovery procedure

1. Freeze the selected source revision, preserve unrelated workspace changes, and provision required private runtime assets and hosting variables. Rebuild in hosting; do not upload `.env` files or local credentials.
2. Use a non-indexable preview to check CMS cold starts, representative article/category routes, sitemap, all commercial routes and the agreed isolated lead-notification destination. A repeat CMS timeout or failed lead delivery blocks the production switch.
3. After separately authorised deployment, run the URL audit against `https://www.devacia.com`. Check all twelve industries, the main offer, directory and six service routes, alias query preservation, assets, sitemap, robots and canonicals.
4. Perform a clearly identified, consented test enquiry and verified test booking using agreed test destinations. Reconcile accepted API response, stored record, notification and analytics. Do not count CTA clicks or scheduler opens as leads/meetings. Resolve `qualified_lead` versus `qualify_lead` using the actual sales signal before changing key events.
5. Confirm sitemap access and priority URL inspection in Search Console. Record deployment time, indexing states and baseline; sitemap submission is not evidence of indexing.
6. If release health or lead delivery fails, restore the previous hosting deployment and its compatible configuration. Preserve the current workspace; do not use a destructive Git reset. This SEO preparation introduces no database migration. Investigate root cause before retrying.

## Measurement limits

There is no evidence yet that the undeployed changes increased traffic, qualified leads or revenue. Track industry landing-page cohorts, relevant search queries, accepted enquiries, sales qualification and wins after deployment. Semrush API units and the GSCWizard subscription were unavailable; research confidence is documented in the existing intent/research records. These limitations do not justify invented keyword metrics or a 20× forecast.

Build warnings: existing deprecated middleware convention and stale browser-support datasets remain maintenance items. Compilation and static generation completed successfully; no unrelated framework migration was performed.

# Pending-work implementation handover

Updated 2 October 2026. This release remains local; no production deployment, container publication, outreach, customer lead mutation or profile update has been performed.

Fresh inspection update: [three-day progress](THREE_DAY_PROGRESS_2026-10-02.md) records the current four-page GSC sample. Website development and Delhi are indexed; ecommerce and the restaurant booking page return “URL is unknown to Google.” These two indexing issues remain unresolved. Settled India traffic through September 29 is a pre-release baseline.

## Completed in this pass

- Eleven business PDFs moved unchanged out of the public directory after explicit owner approval. Added an authenticated admin archive, manifest allowlist, private download headers, strict admin role checks and deployment tracing. Removed the predictable JWT fallback and required valid token expiry. Private files stay out of Git; see [archive deployment instructions](PRIVATE_DOCUMENT_ARCHIVE.md).
- Added essential-only/optional measurement choices, 180-day preference persistence, consent defaults before tag loading, footer preference controls, safe withdrawal/reload and a server-side consent check before Meta forwarding. Admin and non-production tracking remain blocked. No legal/CMP certification is claimed.
- Replaced the remaining fabricated admin charts and revenue forecast with the real acquisition cohort report.
- Removed the public fake loading overlay and hero typing delay. Homepage copy and actions render immediately; small-screen and reduced-motion visitors avoid the decorative WebGL scene. Lazy article media retain valid CMS-provided dimensions.
- Clarified homepage remote service coverage and removed ambiguous regional-office and Maps-verification claims.
- Reviewed actual GSC query/page overlap. Only branded matches were returned for September 2–29 at the selected threshold; the evidence does not justify merging articles.
- Fixed published article lookup after category reassignment. The same article's former category URL redirects to its current canonical category. Unknown and unpublished slugs remain unavailable.

## Validation

- `npm run seo:test`: 21 passing cases. Includes document authorization, traversal rejection, unchanged PDF hashes, JWT expiry/signature checks, default-denied consent, persistence, withdrawal, server forwarding denial, attribution, event semantics, schema escaping and CRM outcome rules.
- Production build: 68 generated pages and the protected archive API. Build warnings concern existing browser-data freshness, middleware naming and an existing edge-runtime route.
- `npm run seo:verify -- http://127.0.0.1:3100`: checks 18 priority pages, 17 linked destinations, sitemap timestamps, visible server-rendered hero copy, private-file tracing, former PDF HTTP paths, anonymous archive access, and the moved article's canonical redirect. The JSON evidence is regenerated after the final build.
- Focused lint for the new consent/archive/auth/analytics components passed. A broader run also encountered seven pre-existing lint errors in the CMS page/store (unused definitions, React prop validation and JSX quote escaping), confirmed in the HEAD versions. No whole-repository lint pass is claimed. `git diff --check` passed.
- Browser privacy checks: fresh essential-only choice, footer reopen, optional opt-in, reload persistence and withdrawal all worked. Local preview contains no optional measurement scripts. The 390 × 844 homepage had one H1, one main landmark, no horizontal overflow and no WebGL canvas. This is local functional evidence, not a field Core Web Vitals result or production Tag Assistant audit.
- The sampled CMS article also had one H1, one main landmark and no mobile overflow. Its former category URL redirected to the current canonical URL in both browser and HTTP checks; an unknown article returned 404. The sample had no body images, so it does not establish visual coverage for every CMS image variant. See [browser evidence](evidence/pending-browser-verification-2026-10-02.json).

## Still dependent on account access or real-world evidence

| Dependency | Current evidence | Action when available |
|---|---|---|
| Vercel release | CLI reports logged out; existing `devacia` project is linked | Owner runs `vercel login`; verify target production environment and domain, deploy current release with private assets, then repeat production checks |
| GA4/GTM | GSC Wizard reports `connected: false` for Analytics; public GTM/measurement IDs are observed only | Connect GA4, confirm owned stream/container, verify consent/tag mappings and reconcile accepted leads in DebugView |
| Keyword volume/CPC | Supplied inventory contains hypotheses; previous provider has no API units | Obtain a real India keyword export or connect an eligible keyword provider; retain source, month, location and match type |
| Field performance | CrUX tool reports no configured API key | Connect the report and compare real mobile LCP/INP/CLS; no numerical improvement is asserted |
| Sitemap failure/recovery | Read-only cached inventory is implemented; normal preview responses pass | Controlled staging database-failure/recovery exercise without disrupting production |
| Search coverage | New code has not reached production | Deploy, submit the sitemap once and inspect priority commercial pages; indexing is not guaranteed |
| Historical PDF exposure | Local source and current release are private; older public copies may still exist | Review older deployments and indexed copies with owner access; do not rewrite history or delete deployments blindly |
| Cases and authority | Drafts and evidence requirements prepared | Client permission, verified delivery/outcome records, owned-profile access and explicit instructions for any messages |
| Existing CMS claims | The sampled comparison still contains unverified numeric recommendations and absolute maintenance/performance claims | Editorial revision using current primary product sources and approved commercial terms; no automatic article merger or fabricated data |
| Growth and expansion | No post-release cohort exists | Sales qualification, sustained observation, market capacity and actual outcomes before expansion claims |

The user approved admin-only access; that approval is already recorded and need not be requested again. Account sign-in is needed because deployment and Analytics are not connected, not because the code work requires another approval.

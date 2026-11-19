# Private document archive

Owner approval: restrict existing public invoices, quotations and internship PDFs to authenticated administrator access. Implemented locally on 2 October 2026.

## Access and preservation

- Eleven original PDFs now live in `private/documents/`, outside Next's `public/` tree. Each move was verified against the original SHA-256 hash; `manifest.json` retains the hashes and byte sizes.
- The admin sidebar links to `/admin/document-archive`. `/api/admin/documents` authenticates every list/download and also requires `role: admin`. It accepts only manifest-listed basenames, not arbitrary paths. Missing archive assets fail with 503; unauthorized requests fail before file access.
- Responses use `Cache-Control: private, no-store, max-age=0`, `Vary: Cookie, Authorization`, `X-Robots-Tag: noindex, noarchive` and attachment downloads.
- Admin tokens require an explicitly configured `JWT_SECRET`, HS256 signatures and a valid expiry. The former public fallback secret is rejected. Existing valid HS256 admin sessions with expiry remain compatible.

## Deployment and recovery

This is a fixed archive, not a document upload/storage service. PDFs and their manifest are deliberately ignored by Git to avoid adding private business documents to source history. Keep the local private directory backed up through the owner's normal private backup process.

The existing Vercel project must be deployed from a checkout containing this directory, using the normal authenticated CLI deployment flow. `.vercelignore` includes private archive assets while excluding environment files, OAuth credentials, temporary evidence and local metadata. `next.config.js` includes only this archive in the document API's file trace; `npm run seo:verify` checks every PDF and the manifest are present. A clean Git-only deployment needs these private assets securely provisioned first. Do not restore them into `public/` to fix a missing archive.

Before deployment, confirm `JWT_SECRET` is set in the target project's production environment without printing its value. The local environment is configured; the target environment has not been inspected while Vercel is signed out.

After release, verify all former root PDF paths return 404, an anonymous API request returns 401, a signed-in administrator can list/download, and downloads retain their original hashes. Do not use production user credentials or alter customer records for automated QA.

The local move does not revoke copies already downloaded, historical Git content, cached copies or PDFs on immutable older Vercel deployments. Once signed in, review old deployment exposure and search-engine removals separately. Do not delete unrelated deployments or rewrite Git history without an explicit scoped instruction.

## Verification

`npm run seo:test` checks anonymous/non-admin denial, malformed cookies, path traversal, method handling, expired/tampered tokens, all eleven PDF hashes, and absence of public source copies. `npm run seo:verify -- http://127.0.0.1:3100` additionally checks the built function trace, real HTTP 404/401 responses and the admin login redirect. The unit tests use a synthetic test secret; they never sign a token with the deployment secret.

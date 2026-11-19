# Devacia measurement handover

Prepared 2 October 2026; connection and reporting status updated 7 October. Application changes are local. GA4 is now connected through GSC Wizard to property `538121325` (Devacia Development), linked to the production site. GTM mappings, stream/hostname coverage and end-to-end production collection have not been verified. See [the current growth review](GROWTH_EXECUTION_2026-10-07.md) and [raw reports](evidence/ga4-growth-baseline-2026-10-07.json).

## Event contract

| Event | Trigger | Use |
|---|---|---|
| service_interest / pricing_interest / case_study_view | Relevant public route viewed | Diagnostic |
| book_strategy_call / whatsapp_click / phone_click / email_click | Actual CTA interaction | Diagnostic; not unique leads |
| form_start | Meaningful first interaction | Funnel entry |
| form_submit_attempt | Validated completion attempt | Failure comparison |
| generate_lead | Completion endpoint succeeds | Accepted form event; deduplicate event ID |
| calendly_open | Scheduling UI opened | Diagnostic |
| strategy_call_booked | Scheduled event from the actual Calendly iframe | Booking signal; reconcile to provider and CRM |
| qualified_lead | Sales qualification | Stored in CRM in this release; no browser inference or automatic GA4 offline import |

Do not sum form leads and bookings as unique people. The CRM acquisition report counts lead records; duplicate records across devices require a defined CRM merge policy. Browser event IDs deduplicate matching browser/server Meta events; they do not solve all cross-device identity.

## GTM/GA4 acceptance

- GA4 scope is now available and the linked property is readable. Verify the correct production stream, container and hostname exclusions; the property display name alone does not establish environment. The available Wizard report dimensions do not expose hostname.
- Resolve the observed event-name mismatch: one `qualified_lead` event was recorded on 7 September–4 October, while the configured key event is `qualify_lead`. Its real trigger and CRM outcome remain unverified. Do not promote it blindly. No `generate_lead` or `strategy_call_booked` event appeared in that period's complete event breakdown. Validate successful submission delivery and use Google's recommended `qualify_lead` / `close_convert_lead` only for actual sales decisions in a separately implemented CRM import. Existing CTA clicks remain diagnostic.
- Select a single GA sender. When GTM is configured, application events enter dataLayer once. Do not add a duplicate direct gtag dispatch or two GA4 event tags for the same custom event.
- Map only accepted success to the form key event. Remove key-event status from `form_start`, call clicks and attempts if the old configuration has it. Keep bookings and qualifications distinguishable.
- The application now initializes analytics_storage, ad_storage, ad_user_data and ad_personalization to denied before optional tags. Its visitor panel persists a 180-day choice, sends Google/Meta consent updates, clears known measurement storage on withdrawal and reloads to stop loaded listeners. Server Meta forwarding separately checks the current consent cookie. Review the container's consent templates and each custom tag; use GTM consent APIs in the container where appropriate. Confirm behavior in Tag Assistant/DebugView, including storage and withdrawal. This does not establish legal compliance or certify the existing GTM container.
- Exclude admin paths and staging/internal environments in tag triggers as well as application code. A container loaded on a public page can remain active after client-side navigation.
- Avoid forwarding raw URLs, form text, names, email or phone to GA4. Approve only the required event parameters. Define a UTM naming rule without personal data.
- Use an isolated staging/test setup with a test stream/container and mocked notifications for end-to-end validation. Production-host safeguards intentionally suppress normal local/staging measurement; do not weaken production guards just to make local DebugView populate.
- Test organic entrance → service → contact → form steps → accepted completion; paid campaign A → internal navigation; returning direct session; failed submission; blocked local storage; Calendly open without booking; real verified test booking; admin navigation; consent denial/update. Match API success, event IDs and the CRM record.
- Verify browser/server Meta deduplication, pixel destinations, account permissions and the currently supported Graph API version in the Ads account. The legacy CAPI integration is not claimed as fully audited by this SEO release.

The public script for container `GTM-WTG57DCL` contained measurement ID `G-W3WHGPGCBZ` when checked on October 2. This is an observed public configuration, not proof of account ownership, correct event mappings or successful collection. No replacement container was imported or published. Visitors who decline optional measurement remain unattributed in the CRM; do not extrapolate their source or compare the new tracked sample with an unqualified all-channel enquiry count.

## Qualification and value definitions

Qualified: sales has reviewed a real business need, relevant service fit, decision maker, plausible budget and timing; the reason records what is known and any remaining dependency. Not a fit requires a reason. Unreviewed is the default, not an assumed failure.

Opportunity: a scoped commercial next step exists. Won: a confirmed agreement, with optional contracted service value and currency. Lost: commercial outcome recorded by sales. Do not use an operational `closed` status as a substitute.

Amounts exclude taxes and pass-through ad spend. Retainers need a consistent contract-period definition, agreed with finance. Collected cash and gross margin remain separate accounting inputs. Unknown value is blank/null, not zero. A deliberate zero-value engagement may be recorded as zero.

The report uses current outcomes for a lead-creation cohort. It is not an immutable monthly stage-history report. Changing a record changes its historical acquisition cohort's current result. Multi-touch/assisted attribution and CRM-to-GA4 offline conversion uploads are not implemented.

## Weekly review record

Record period, deployment annotation, GSC last complete date, country/device filters, commercial impressions/clicks, accepted enquiries, qualified enquiries, open opportunities, wins and contracted value by currency. Attach raw export references. Keep unknown attribution and low sample size visible. Do not compare Google Ads competition with organic keyword difficulty.

## Release evidence to retain

Production URL checks, container version, consent test results, redacted DebugView screenshots, test event IDs, CRM reconciliation, GSC inspection state and date. Store no customer contact data in the public repository. Revoke or remove test records according to the agreed QA procedure.

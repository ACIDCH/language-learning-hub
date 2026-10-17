# Cloudflare Pages / Neon evaluation — Phase 00 implementation

This repository now has an **optional, review-only static preview** for Cloudflare Pages.
It does not activate billing, deploy to production, or migrate Supabase data.

## Runnable preview

- Execute `node design-prototypes/academic-clean/check-prototype.mjs`.
- Execute `node tools/build_pages_preview.mjs`: only index.html, app.js, styles.css and a noindex `_headers` are published.
- PR workflow builds and uploads the review bundle without cloud credentials.
- After *manually* creating a Cloudflare Pages Direct Upload project called
  `language-learning-hub-preview` and setting GitHub Actions secrets
  `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`, run the optional
  `Cloudflare Pages prototype preview` workflow manually. This deploys to
  the non-production `review` branch. No custom domain is required.
- Direct Upload and Git integration are different project types; choose
  deliberately. No eu.cc DNS records are configured by this change.

## Backend interface boundary

Keep the current Supabase project and private Google Drive YUNPAN records
unchanged. The future backend should implement `docs/api-contracts.md`
without binding the UI to Supabase- or Neon-specific SDK calls. Compare
Supabase Postgres/Auth versus Neon Postgres/Managed Better Auth on a *separate*
test environment before migrating real learning data.

Validation gate: (1) private Drive asset lookup is authorized; (2) progress
belongs to the signed-in user; (3) pronunciation audio is transient and not
persisted; (4) lesson import remains lawful; (5) database export/restore
works; (6) real-region latency and free quotas are measured.

Neon free project count is not the same as unlimited free resource usage.
Cloudflare Workers' free tier is well suited for small API requests, **not**
in-process speech recognition or audio model inference.

## Storage policy

- Public prototype: **zero** video or audio files.
- Private Google Drive: source PDFs and only necessary compressed instructional
  audio (Opus or MP3/AAC); no persistent user practice recordings or video archive.
- Postgres: lesson metadata and progress; do not store media blobs.
- Large media distribution/R2 and private Cloudflare Worker API are deferred
  until there is a demonstrated need.

## Acceptance

This work proves that a small static preview bundle can be built and checked.
It does **not** prove that Neon/Better Auth have been provisioned, that the
course engine is production-ready, or that a live Cloudflare deployment exists.

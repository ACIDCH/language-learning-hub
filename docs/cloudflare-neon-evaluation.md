# Cloudflare Git integration readiness — Phase 00

Status: GitHub PR only; no Cloudflare project has been created by this change. Production Supabase and Google Drive are untouched.

## 1. Pages (learning system front-end prototype)

Use **Cloudflare Pages → Connect to Git**, NOT Direct Upload, to avoid manual API tokens and Secrets. Authorize GitHub access to `ACIDCH/language-learning-hub` only.

After this PR is reviewed and merged into `main`, provision a Git-connected Pages project using:

| Setting | Value |
| --- | --- |
| Project name | `language-hub-preview` (subject to availability) |
| Repository | `ACIDCH/language-learning-hub` |
| Production branch | `main` |
| Framework preset | None |
| Root directory | repository root (leave blank) |
| Build command | `node tools/build_pages_preview.mjs` |
| Build output directory | `dist-preview` |
| Variables | None |
| Custom domain | None |

The build script publishes only `index.html`, `app.js`, `styles.css`, and an `_headers` noindex rule. This URL will be a **design prototype**, not the finished learner app.

Cloudflare automatically builds subsequent Git commits/PR previews. GitHub Actions performs validation only; there is no GitHub-hosted deployment token and no manual Pages upload.

## 2. Workers (lightweight API scaffold)

The independent Git-connected Worker lives in `cloudflare/learning-api/`. Configure **Workers & Pages → Create application → GitHub**, repository `ACIDCH/language-learning-hub`, root directory `cloudflare/learning-api`, Worker name `language-hub-api` (must match `wrangler.jsonc`), production branch `main`, deploy command `npx wrangler deploy` if requested.

The current Worker exposes only:
- `GET /health`: explicit scaffold health result;
- `GET /v1/status`: reports downstream modules as not connected;
- all other `/v1/*`: HTTP 501; no AI invocation or database mutation.

This Worker is safe to test but must **not** be advertised as a working learning API. Connect authentication, course read/write, quota controls and provider adapters after testing.

## 3. Preservation and future architecture

- Keep the existing Supabase `language-learning-hub` project and all Drive `YUNPAN` resources unchanged.
- Compare a dedicated Neon staging project to Supabase before considering any migration, with export/restore and authenticated test paths.
- Implement `docs/api-contracts.md` through a replaceable backend interface. Pages/static frontends must never contain API secrets or service-role keys.
- Learning system: text/PDF and necessary **ordinary-quality compressed audio** only. No stored videos or retained practice recordings.
- A free account or `workers.dev` URL is not a promise of unmetered usage. Large ASR/pronunciation model inference runs elsewhere and may have usage costs.
- Do not configure eu.cc or other custom domains yet.

## 4. Local / CI checks

```sh
node --check cloudflare/learning-api/src/index.mjs
node --test cloudflare/learning-api/test/*.test.mjs
node design-prototypes/academic-clean/check-prototype.mjs
node tools/build_pages_preview.mjs
```

The pull request CI checks all of the above and publishes a review artifact. Do not provision Pages with the `main` build command before the required files reach `main` via the reviewed PR.

## 5. Future acceptance

The following remain unverified until live deployment and tests: actual Cloudflare Git permissions, Pages deployment, Worker health request over HTTPS, authorized Supabase queries, user progress persistence, legitimate Drive asset loading, measured free quotas and network latency.

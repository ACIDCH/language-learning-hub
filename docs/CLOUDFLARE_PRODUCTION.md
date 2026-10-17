# Cloudflare production preparation (React + Worker + Supabase)

**Deployment status:** Source and automated tests are prepared in PR #12. No live Pages or Workers deployment is claimed. The public Pages build has **public original sample lessons** only. The private 108-manuscript Python/SQLite service remains local until the authorized Drive access adapter is complete.

## Architecture and current contract

| Layer | Source | Job |
| --- | --- | --- |
| Pages | `src/main.tsx`, `src/App.tsx` | Public lessons, 108-unit outline, reviewed sample text |
| Pages /cloud/ | `src/CloudWorkspace.tsx` | Existing Supabase Auth user, metadata/progress via Worker |
| Worker | `cloudflare/learning-api/src/index.mjs` | `GET /health`, `GET /v1/status`, `GET /v1/courses`, `GET/PUT /v1/progress/:id` |
| Supabase | Existing `language-learning-hub` project | RLS-protected progress, course and audio **metadata only** |
| Google Drive | Private YUNPAN | Original manuscripts, private assets, necessary compressed audio |
| Local-only Python | `server/app.py` | Import, detailed private course reading, audio and AI helpers, not deployed remotely |

## Pages: GitHub connection (do **only after integration is merged to main**)

The owner has already authorized GitHub repository `ACIDCH/language-learning-hub` in Cloudflare. Use the existing Pages wizard:

- Project name: `language-learning-hub` if still available.
- Production branch: `main`.
- Framework: **React (Vite)**.
- Build command: **`npm run build`**.
- Output directory: **`dist`**.
- Root directory: repository root (blank).
- Initial deployment works as a public-course front end without environment variables. The `/cloud/` route explicitly reports unavailable until API connectivity is configured.
- No custom domain, no eu.cc registration, no payment-dependent R2 service.

Cloudflare Pages Git integration installs dependencies, runs the build and deploys `dist` on push to `main`. Avoid the previous design-prototype command `node tools/build_pages_preview.mjs` for the formal React deployment.

## Worker: same repo, separate Git-connected Worker

From Cloudflare Workers & Pages, create a **Worker** and connect the same GitHub repository.

- Worker name: `language-hub-api` (must match Wrangler's `name`).
- Root directory: `cloudflare/learning-api`.
- Deploy command: `npx wrangler deploy`.
- Wrangler config: `cloudflare/learning-api/wrangler.jsonc`.
- **Runtime environment variables** (not GitHub secrets):
  - `SUPABASE_URL`: the public HTTPS project URL of `language-learning-hub`.
  - `SUPABASE_PUBLISHABLE_KEY`: project's **publishable** API key, never service-role.
  - `FRONTEND_ORIGIN`: the exact deployed Pages origin (no trailing slash), e.g. `https://language-learning-hub.pages.dev` **only if Cloudflare really assigns this hostname**.

Worker Git integration may grant Cloudflare's own deployment token automatically. Never paste a personal token into source or chat.

After successful deployment, inspect `https://<actual-worker-url>/health` and `/v1/status`. They must return truthful readiness. `/v1/courses` returns only catalog metadata. The Worker verifies an Authorization bearer token against Supabase before progress reads/writes; user_id is taken from the verified session; PostgreSQL RLS remains the final enforcement boundary. Unauthorized requests return 401.

## Connect Pages to Worker

Once the actual Worker URL is known, configure the following build-time Pages variables and redeploy:

- `VITE_SUPABASE_URL`: same public Supabase URL.
- `VITE_SUPABASE_PUBLISHABLE_KEY`: same **publishable** key.
- `VITE_WORKER_API_URL`: Worker origin, no trailing slash.

These `VITE_*` values are **public client configuration**; do not use privileged keys. Existing sign-in requires a previously created account. Email OTP signup/recovery from PR #9 remains unmerged until SMTP and multi-device testing pass.

### Verification before calling this finished

1. `npm ci && npm run build` and `node --test cloudflare/learning-api/test/*.test.mjs`.
2. Public home and all published sample text load on real browsers and phones; no private Drive file URL in generated HTML/JS.
3. `/cloud/` shows connection state honestly and can list 108 metadata records when configured.
4. Live existing-user login, change a test course's learning stage and note, save, reload, read back. Confirm the change belongs only to that user and restore test data.
5. Offline/failed API requests show an error, never a false “saved” state; preserve drafts on the client until confirmed.
6. Test Pages/Worker deployment after each update with two-network latency checks.
7. Private full-text course access, OCR, speech models, AI and cross-device end-to-end tests are **separate acceptance gates**. Do not claim these are remotely working until they pass.

## Resource limits and future scale

Cloudflare Workers Free is suitable for short CPU-bound request handling and network waits, not FFmpeg, Python OCR or neural speech scoring. Supabase remains the existing database/auth source; do not migrate to Neon without backup+RLS test. Never retain videos or routine raw practice recordings. Keep only small instructional MP3/Opus in private Drive. React routes/components and provider interfaces should be versioned, not forked per language.

# Cloudflare platform decision

The static academic-clean prototype documented in earlier commits remains available as a fallback/reference. **For the current React integration, use [CLOUDFLARE_PRODUCTION.md](./CLOUDFLARE_PRODUCTION.md)**. The production build is React (Vite), `npm run build` → `dist`, not `node tools/build_pages_preview.mjs`.

Keep the current Supabase database/Auth and Google Drive. Neon/Better Auth are future comparison candidates, not required dependencies for this integration. Do not move original manuscripts, save videos or retain raw learner microphone recordings.

Former Pages preview artifacts remain for historical QA only; no GitHub Actions deployment secret or Direct Upload is required.
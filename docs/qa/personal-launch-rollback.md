# Personal launch rollback

The personal launch candidate does not replace the formal-content release gate.

1. Record the deployed Git commit and the previous known-good deployment ID before promotion.
2. If the frontend fails, use Cloudflare Pages **Deployments → Roll back to this deployment** for the recorded previous build. Do not rewrite `main` or delete the failed deployment.
3. If the Worker fails, redeploy the previous known-good Git commit through the repository Worker workflow; do not invoke Wrangler directly or change Supabase credentials.
4. Do not roll back, truncate or overwrite Supabase learning tables as part of an application rollback. The browser's account-scoped local draft remains the recovery source until the API is healthy.
5. Re-run `npm run personal:probe`, the progress/CAS tests and a signed-in save/reload check before restoring the candidate.

The preview remains the current fixed access route until the owner authorizes a production switch. A preview URL is not represented as a stable production domain.

/**
 * Non-privileged client connection defaults for our own deployed app.
 * Supabase publishable keys are designed to be exposed to browsers and must
 * be protected by Auth + Postgres RLS. Never replace this with a secret key,
 * service_role key, OAuth refresh token, or server-side AI key.
 *
 * Cloudflare Pages VITE_* build variables may override these defaults.
 * This lets a freshly Git-connected Pages app work with no manual config.
 */
export const cloudPublicDefaults = Object.freeze({
  supabaseUrl: 'https://szukmwvyyvjajdjoltzy.supabase.co',
  supabasePublishableKey: 'sb_publishable_nsnR4ZifNlop7tKo8URCxg_0SGMDtXu',
  workerApiUrl: 'https://language-hub-api.xilu329.workers.dev'
});

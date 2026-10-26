import {handle} from '../../cloudflare/learning-api/src/index.mjs';
import {cloudPublicDefaults} from '../../src/cloudPublicDefaults.ts';

const REVIEW_ORIGIN='https://feat-v44-full-ui-curriculum.language-learning-hub.pages.dev';
const PERSONAL_ORIGIN='https://personal-release.language-learning-hub.pages.dev';
const ALLOWED_ORIGINS=new Set([REVIEW_ORIGIN,PERSONAL_ORIGIN]);

/**
 * Cloudflare Pages Functions review-only, same-origin API.
 * Reuses the existing Worker handlers and existing Supabase Auth/RLS.
 * No privileged database keys, external Worker hostname or AI secrets.
 */
export function onRequest({request,env={}}){
  const url=new URL(request.url);
  if(!ALLOWED_ORIGINS.has(url.origin)||!url.pathname.startsWith('/api/')){
    return new Response(JSON.stringify({error:'preview_route_only'}),{
      status:404,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}
    });
  }
  url.pathname=url.pathname.slice('/api'.length);
  const rewritten=new Request(url.toString(),request);
  return handle(rewritten,{
    SUPABASE_URL:env.SUPABASE_URL||cloudPublicDefaults.supabaseUrl,
    SUPABASE_PUBLISHABLE_KEY:env.SUPABASE_PUBLISHABLE_KEY||cloudPublicDefaults.supabasePublishableKey,
    FRONTEND_ORIGIN:url.origin
  });
}

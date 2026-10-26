/** The V4.4 review branch routes its API through same-origin Pages Functions. */
export const PREVIEW_PAGES_ORIGIN='https://feat-v44-full-ui-curriculum.language-learning-hub.pages.dev';
export const PERSONAL_PAGES_ORIGIN='https://personal-release.language-learning-hub.pages.dev';
export const PREVIEW_API_BASE='/api';
export function pickWorkerOrigin(pageUrl:string,fallback:string):string{
 try{if([PREVIEW_PAGES_ORIGIN,PERSONAL_PAGES_ORIGIN].includes(new URL(pageUrl).origin))return PREVIEW_API_BASE;}
 catch{/* Non-browser/invalid URLs use standard configured Worker. */}
 return fallback.trim().replace(/\/$/,'');
}

/** Cloud workspace accepts the reviewed same-origin Pages Functions route, not just an absolute Worker URL.
 * The Supabase client is created separately using public Auth/RLS credentials.
 */
export function isCloudWorkspaceConfigured(hasSupabaseClient:boolean,apiBase:string):boolean{
 return hasSupabaseClient && (apiBase===PREVIEW_API_BASE || /^https:\/\/[a-z0-9.-]+(?::\d+)?(?:\/.*)?$/i.test(apiBase));
}

/** Only the exact Cloudflare Pages PR alias uses the associated Worker preview. */
export const PREVIEW_PAGES_ORIGIN='https://feat-v44-full-ui-curriculum.language-learning-hub.pages.dev';
export const PREVIEW_WORKER_ORIGIN='https://feat-v44-full-ui-curriculum-one-shot-language-hub-api.xilu329.workers.dev';
export function pickWorkerOrigin(pageUrl:string,fallback:string):string{
 try{if(new URL(pageUrl).origin===PREVIEW_PAGES_ORIGIN)return PREVIEW_WORKER_ORIGIN;}
 catch{/* Unknown location uses the standard API config. */}
 return fallback.trim().replace(/\/$/,'');
}

/** The V4.4 review branch routes its API through same-origin Pages Functions. */
export const PREVIEW_PAGES_ORIGIN='https://feat-v44-full-ui-curriculum.language-learning-hub.pages.dev';
export const PREVIEW_API_BASE='/api';
export function pickWorkerOrigin(pageUrl:string,fallback:string):string{
 try{if(new URL(pageUrl).origin===PREVIEW_PAGES_ORIGIN)return PREVIEW_API_BASE;}
 catch{/* Non-browser/invalid URLs use standard configured Worker. */}
 return fallback.trim().replace(/\/$/,'');
}

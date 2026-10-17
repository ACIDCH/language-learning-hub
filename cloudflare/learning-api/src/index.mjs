/**
 * Minimal Cloudflare Worker contract for Language Learning Hub.
 * No secret keys, paid model traffic, Drive access or database writes.
 * Intended for Cloudflare Workers Builds (GitHub integration).
 */
const json = (body, status = 200, extra = {}) => new Response(JSON.stringify(body), {
  status,
  headers: {'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...extra}
});

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (request.method === 'GET' && url.pathname === '/health') {
      return json({ok: true, service: 'language-hub-api', stage: 'scaffold'});
    }
    if (request.method === 'GET' && url.pathname === '/v1/status') {
      return json({
        service: 'language-hub-api',
        version: 1,
        ready: false,
        modules: {catalog: 'not-connected', progress: 'not-connected', ai: 'not-connected'}
      });
    }
    if (url.pathname.startsWith('/v1/')) {
      return json({error: 'not_implemented', message: 'Backend contract only; no live service connected.'}, 501);
    }
    return json({error: 'not_found'}, 404);
  }
};

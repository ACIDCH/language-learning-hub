/**
 * Cloudflare Workers API adapter for a pre-existing Supabase Auth/Postgres project.
 *
 * - Catalog metadata is public but never contains manuscript text or Drive IDs.
 * - Progress uses the caller's Supabase JWT, verified against Supabase Auth.
 * - All SQL authorization remains subject to existing PostgreSQL RLS policies.
 * - No service-role key, AI credentials, or user recordings are processed here.
 */
const LIMIT = 20_000;
const COURSE_ID = /^[A-Za-z0-9][A-Za-z0-9_-]{0,99}$/;
const LANG = new Set(['en', 'fr']);

function output(body, status = 200, cors = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...cors}
  });
}
function allowOrigin(request, env) {
  const origin = request.headers.get('Origin');
  // Calls without an Origin (e.g. CLI health checks) need no CORS headers.
  if (!origin) return {};
  if (!env.FRONTEND_ORIGIN || origin !== env.FRONTEND_ORIGIN) return null;
  return {'Access-Control-Allow-Origin': origin, 'Vary': 'Origin',
    'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, content-type',
    'Access-Control-Max-Age': '600'};
}
function backend(env) {
  if (!env.SUPABASE_URL || !env.SUPABASE_PUBLISHABLE_KEY) return null;
  let url;
  try { url = new URL(env.SUPABASE_URL); } catch { return null; }
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) return null;
  return {origin: url.origin, key: env.SUPABASE_PUBLISHABLE_KEY};
}
async function upstream(fetchFn, url, init = {}) {
  const response = await fetchFn(url, {...init, signal: AbortSignal.timeout(12000)});
  if (!response.ok) return {ok:false, status:response.status};
  const data = await response.json();
  return {ok:true, data};
}
function tokenOf(request) {
  const value = request.headers.get('Authorization') || '';
  const match = /^Bearer ([A-Za-z0-9_.~-]+)$/.exec(value);
  return match ? match[1] : '';
}
async function resolveUser(token, config, fetchFn) {
  const response = await upstream(fetchFn, config.origin + '/auth/v1/user', {
    headers:{'apikey':config.key, 'Authorization':'Bearer '+token}
  });
  if (!response.ok || typeof response.data?.id !== 'string') return null;
  return response.data.id;
}
export async function handle(request, env = {}, fetchFn = fetch) {
  const url = new URL(request.url);
  const cors = allowOrigin(request, env);
  if (cors === null) return output({error:'origin_not_allowed'}, 403);
  const verb = request.method;
  if (verb === 'OPTIONS') return new Response(null, {status:204, headers:cors});
  if (verb === 'GET' && url.pathname === '/health') {
    return output({ok:true, service:'language-hub-api',stage:'integration'},200,cors);
  }
  if (verb === 'GET' && url.pathname === '/v1/status') {
    return output({service:'language-hub-api',version:1,
      ready:Boolean(backend(env)), modules:{catalog:backend(env)?'configured':'not-connected',
        progress:backend(env)?'configured':'not-connected',
        fullText:'owner-scoped-snapshot-adapter',ai:'not-connected'}},200,cors);
  }
  const config = backend(env);
  if (!config) return output({error:'backend_not_configured'},503,cors);
  try {
    if (verb === 'GET' && url.pathname === '/v1/courses') {
      const lang = url.searchParams.get('language');
      if (lang && !LANG.has(lang)) return output({error:'invalid_language'},400,cors);
      const params = new URLSearchParams({
        select:'id,language,level,track,title,unit,text_complete,audio_verified,publishable',
        order:'language.asc,level.asc,unit.asc',
        limit:'200'
      });
      if (lang) params.set('language','eq.'+lang);
      const result = await upstream(fetchFn,config.origin+'/rest/v1/course_catalog?'+params,{
        headers:{apikey:config.key,Accept:'application/json'}
      });
      if (!result.ok) return output({error:'catalog_unavailable'},502,cors);
      if (!Array.isArray(result.data)) return output({error:'bad_upstream_response'},502,cors);
      return output({courses:result.data},200,cors);
    }
    // Owner-only manuscripts are derivative personal snapshots; full-source
    // Google Drive originals stay private and are never exposed by URL.
    const lessonMatch = new RegExp('^/v1/private-courses/([^/]+)$').exec(url.pathname);
    if (lessonMatch && verb === 'GET') {
      let courseId;
      try { courseId = decodeURIComponent(lessonMatch[1]); }
      catch { return output({error:'invalid_course_id'},400,cors); }
      if (!COURSE_ID.test(courseId)) return output({error:'invalid_course_id'},400,cors);
      const token = tokenOf(request);
      if (!token) return output({error:'authentication_required'},401,cors);
      const uid = await resolveUser(token,config,fetchFn);
      if (!uid) return output({error:'invalid_session'},401,cors);
      const params = new URLSearchParams({
        select:'course_id,content_body,source_version,qa_status,updated_at',
        user_id:'eq.'+uid,
        course_id:'eq.'+courseId,
        limit:'1'
      });
      const row = await upstream(fetchFn, config.origin+'/rest/v1/private_lesson_content?'+params, {
        headers:{apikey:config.key,Authorization:'Bearer '+token,Accept:'application/json'}
      });
      if (!row.ok || !Array.isArray(row.data)) return output({error:'lesson_unavailable'},502,cors);
      if (!row.data.length) return output({error:'lesson_not_synced'},404,cors);
      return output({lesson:row.data[0]},200,cors);
    }
    // Authenticated metadata only. Indexed audio is not guaranteed to be
    // licensed, human-reviewed, remotely uploaded or playable.
    const audioMatch = new RegExp('^/v1/audio-index/([^/]+)
    if (audioMatch && verb === 'GET') {
      let courseId;
      try {courseId=decodeURIComponent(audioMatch[1]);}
      catch {return output({error:'invalid_course_id'},400,cors);}
      if (!COURSE_ID.test(courseId)) return output({error:'invalid_course_id'},400,cors);
      const token=tokenOf(request);
      if(!token)return output({error:'authentication_required'},401,cors);
      const uid=await resolveUser(token,config,fetchFn);
      if(!uid)return output({error:'invalid_session'},401,cors);
      const params=new URLSearchParams({
        select:'asset_id,filename,duration_seconds,source_kind,decoded,exact_text,listened,audio_verified',
        course_id:'eq.'+courseId,
        order:'asset_id.asc',
        limit:'100'
      });
      const result=await upstream(fetchFn,config.origin+'/rest/v1/course_audio_index?'+params,{
        headers:{apikey:config.key,Authorization:'Bearer '+token,Accept:'application/json'}
      });
      if(!result.ok||!Array.isArray(result.data))return output({error:'audio_index_unavailable'},502,cors);
      return output({assets:result.data,playback_ready:false},200,cors);
    }
).exec(url.pathname);
    if (audioMatch && verb === 'GET') {
      let courseId;
      try {courseId=decodeURIComponent(audioMatch[1]);}
      catch {return output({error:'invalid_course_id'},400,cors);}
      if (!COURSE_ID.test(courseId)) return output({error:'invalid_course_id'},400,cors);
      const token=tokenOf(request);
      if(!token)return output({error:'authentication_required'},401,cors);
      const uid=await resolveUser(token,config,fetchFn);
      if(!uid)return output({error:'invalid_session'},401,cors);
      const params=new URLSearchParams({
        select:'asset_id,filename,duration_seconds,source_kind,decoded,exact_text,listened,audio_verified',
        course_id:'eq.'+courseId,
        order:'asset_id.asc',
        limit:'100'
      });
      const result=await upstream(fetchFn,config.origin+'/rest/v1/course_audio_index?'+params,{
        headers:{apikey:config.key,Authorization:'Bearer '+token,Accept:'application/json'}
      });
      if(!result.ok||!Array.isArray(result.data))return output({error:'audio_index_unavailable'},502,cors);
      return output({assets:result.data,playback_ready:false},200,cors);
    }
    const match = /^\/v1\/progress\/([^/]+)$/.exec(url.pathname);
    if (match && (verb === 'GET' || verb === 'PUT')) {
      const courseId = decodeURIComponent(match[1]);
      if (!COURSE_ID.test(courseId)) return output({error:'invalid_course_id'},400,cors);
      const token = tokenOf(request);
      if (!token) return output({error:'authentication_required'},401,cors);
      const uid = await resolveUser(token, config, fetchFn);
      if (!uid) return output({error:'invalid_session'},401,cors);
      const headers = {apikey:config.key, Authorization:'Bearer '+token, Accept:'application/json'};
      if (verb === 'GET') {
        const params = new URLSearchParams({select:'course_id,state,updated_at',course_id:'eq.'+courseId,limit:'1'});
        const response = await upstream(fetchFn,config.origin+'/rest/v1/learning_progress?'+params,{headers});
        if (!response.ok || !Array.isArray(response.data)) return output({error:'progress_unavailable'},502,cors);
        return output({progress:response.data[0] || null},200,cors);
      }
      const size = Number(request.headers.get('content-length')) || 0;
      if (size > LIMIT) return output({error:'payload_too_large'},413,cors);
      const raw = await request.text();
      if (new TextEncoder().encode(raw).byteLength > LIMIT) return output({error:'payload_too_large'},413,cors);
      let json;
      try { json=JSON.parse(raw); } catch { return output({error:'invalid_json'},400,cors); }
      if (!json || typeof json!=='object' || Array.isArray(json) ||
          !json.state || typeof json.state!=='object' || Array.isArray(json.state)) {
        return output({error:'invalid_progress_payload'},400,cors);
      }
      const body = {user_id:uid,course_id:courseId,state:json.state,updated_at:new Date().toISOString()};
      const result = await upstream(fetchFn,
        config.origin+'/rest/v1/learning_progress?on_conflict=user_id%2Ccourse_id', {
          method:'POST',
          headers:{...headers,'Content-Type':'application/json',
            Prefer:'resolution=merge-duplicates,return=representation'},
          body:JSON.stringify(body)
        });
      if (!result.ok || !Array.isArray(result.data) || !result.data.length) {
        return output({error:'progress_write_failed'},502,cors);
      }
      return output({saved:true,progress:result.data[0]},200,cors);
    }
    if (url.pathname.startsWith('/v1/')) return output({error:'not_implemented'},501,cors);
    return output({error:'not_found'},404,cors);
  } catch {
    return output({error:'upstream_unavailable'},503,cors);
  }
}
export default {fetch(request, env) {return handle(request,env);}};

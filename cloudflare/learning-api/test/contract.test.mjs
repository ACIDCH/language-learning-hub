import test from 'node:test';
import assert from 'node:assert/strict';
import {handle} from '../src/index.mjs';

const origin = 'https://language-learning-hub.pages.dev';
const previewOrigin = 'https://feat-v44-full-ui-curriculum.language-learning-hub.pages.dev';
const cfg = {SUPABASE_URL:'https://db.example.supabase.co',
  SUPABASE_PUBLISHABLE_KEY:'public-key', FRONTEND_ORIGIN:origin,PREVIEW_FRONTEND_ORIGIN:previewOrigin};
const req = (path, options={}) => new Request('https://api.example.workers.dev'+path,options);
const respond = (value,status=200) => new Response(JSON.stringify(value),
  {status,headers:{'content-type':'application/json'}});
test('GET /health returns honest integration status and CORS is restricted',async()=>{
  const r=await handle(req('/health'));
  assert.equal(r.status,200);
  assert.equal((await r.json()).stage,'integration');
  const other=await handle(req('/health',{headers:{Origin:'https://evil.example'}}),cfg);
  assert.equal(other.status,403);
  const allowed=await handle(req('/health',{headers:{Origin:origin}}),cfg);
  assert.equal(allowed.headers.get('access-control-allow-origin'),origin);
  const preview=await handle(req('/v1/status',{headers:{Origin:previewOrigin}}),cfg);
  assert.equal(preview.status,200);
  assert.equal(preview.headers.get('access-control-allow-origin'),previewOrigin);
  const preflight=await handle(req('/v1/progress/fr-a1-u01',{method:'OPTIONS',headers:{Origin:previewOrigin,'Access-Control-Request-Method':'PUT'}}),cfg);
  assert.equal(preflight.status,204);
  assert.equal(preflight.headers.get('access-control-allow-origin'),previewOrigin);
  const spoof=await handle(req('/health',{headers:{Origin:previewOrigin+'.attacker.test'}}),cfg);
  assert.equal(spoof.status,403);
});
test('status explicitly reports what is and is not deployed',async()=>{
  const r=await handle(req('/v1/status'),cfg);
  const d=await r.json();
  assert.equal(d.ready,true);
  assert.equal(d.modules.ai,'manual-opt-in-with-learner-key');
  assert.equal(d.modules.fullText,'owner-scoped-snapshot-adapter');
  const notConfigured=await handle(req('/v1/status'));
  assert.equal((await notConfigured.json()).ready,false);
});
test('catalog queries only safe metadata with no manuscript or Drive locator',async()=>{
  const fetcher=async(url,opts)=>{
    assert.match(url,/\/rest\/v1\/course_catalog\?/);
    assert.ok(url.includes('language=eq.fr'));
    assert.ok(!url.includes('storage_locator'));
    assert.equal(opts.headers.apikey,'public-key');
    return respond([{id:'fr-a1-u01',language:'fr',title:'Bonjour'}]);
  };
  const r=await handle(req('/v1/courses?language=fr'),cfg,fetcher);
  assert.equal(r.status,200);
  assert.equal((await r.json()).courses.length,1);
  assert.equal((await handle(req('/v1/courses?language=xx'),cfg,fetcher)).status,400);
});
test('progress is forbidden without a verified Supabase bearer token',async()=>{
  let calls=0;const noNetwork=async()=>{calls++;throw Error('unexpected upstream')};
  assert.equal((await handle(req('/v1/progress/fr-a1-u01'),cfg,noNetwork)).status,401);
  assert.equal((await handle(req('/v1/progress/fr-a1-u01',{headers:{Authorization:'Basic xyz'}}),cfg,noNetwork)).status,401);
  assert.equal(calls,0);
});
test('a Supabase authenticated write uses server resolved user id and RLS token',async()=>{
  let writes=0;
  const fetcher=async(url,opts)=>{
    if(url.endsWith('/auth/v1/user')){
      assert.equal(opts.headers.Authorization,'Bearer abc.def.ghi');
      return respond({id:'supabase-user-123'});
    }
    assert.ok(url.includes('/rest/v1/learning_progress?on_conflict='));
    assert.equal(opts.headers.Authorization,'Bearer abc.def.ghi');
    const b=JSON.parse(opts.body);
    assert.equal(b.user_id,'supabase-user-123');
    assert.equal(b.course_id,'fr-a1-u01');
    assert.deepEqual(b.state,{stage:3});
    writes++;
    return respond([b]);
  };
  const request=req('/v1/progress/fr-a1-u01',{method:'PUT',
    headers:{Authorization:'Bearer abc.def.ghi','Content-Type':'application/json'},
    body:JSON.stringify({state:{stage:3},user_id:'attacker-id'})});
  const r=await handle(request,cfg,fetcher);
  assert.equal(r.status,200);
  assert.equal((await r.json()).saved,true);
  assert.equal(writes,1);
});
test('progress GET respects Supabase RLS and returns only matching course',async()=>{
  let num=0;
  const fetcher=async(url,opts)=>{
    num++;
    if(url.endsWith('/auth/v1/user')) return respond({id:'correct-user'});
    assert.ok(url.includes('course_id=eq.fr-a1-u01'));
    assert.equal(opts.headers.Authorization,'Bearer abc.def.ghi');
    return respond([{course_id:'fr-a1-u01',state:{stage:1}}]);
  };
  const r=await handle(req('/v1/progress/fr-a1-u01',{headers:{Authorization:'Bearer abc.def.ghi'}}),cfg,fetcher);
  assert.equal((await r.json()).progress.course_id,'fr-a1-u01');
  assert.equal(num,2);
});
test('oversize and invalid writes fail before database mutation',async()=>{
  let calls=0;
  const fetcher=async(url)=>{
    calls++;
    if(url.endsWith('/auth/v1/user')) return respond({id:'user'});
    throw Error('no write allowed');
  };
  const bad=await handle(req('/v1/progress/fr-a1-u01',{method:'PUT',headers:{Authorization:'Bearer token', 'Content-Type':'application/json'},body:'{"state":[]}' }),cfg,fetcher);
  assert.equal(bad.status,400);
  const giant=await handle(req('/v1/progress/fr-a1-u01',{method:'PUT',headers:{Authorization:'Bearer token'},body:JSON.stringify({state:{notes:'x'.repeat(21000)}})}),cfg,fetcher);
  assert.equal(giant.status,413);
  assert.equal(calls,2);
});
test('unfinished AI and content endpoints cannot pretend to succeed',async()=>{
  const r=await handle(req('/v1/ai/explain',{method:'POST'}),cfg);
  assert.equal(r.status,501);
  assert.equal((await r.json()).error,'not_implemented');
});

test('private content requires verified owner session and returns only safe fields',async()=>{
  let requests=0;
  const fetcher=async(url,opts)=>{
    requests++;
    if(url.endsWith('/auth/v1/user')) return respond({id:'owner-uid'});
    assert.ok(url.includes('/rest/v1/private_lesson_content?'));
    assert.ok(url.includes('user_id=eq.owner-uid'));
    assert.ok(url.includes('course_id=eq.fr-a1-u01'));
    assert.ok(!url.includes('source_drive_file_id'));
    assert.ok(!url.includes('content_sha256'));
    assert.equal(opts.headers.Authorization,'Bearer valid.jwt.token');
    return respond([{course_id:'fr-a1-u01',content_body:'# Bonjour',source_version:'v4-draft',qa_status:'draft'}]);
  };
  const anonymous=await handle(req('/v1/private-courses/fr-a1-u01'),cfg,fetcher);
  assert.equal(anonymous.status,401);
  assert.equal(requests,0);
  const good=await handle(req('/v1/private-courses/fr-a1-u01',{
    headers:{Authorization:'Bearer valid.jwt.token',Origin:origin}}),cfg,fetcher);
  assert.equal(good.status,200);
  const body=await good.json();
  assert.equal(body.lesson.content_body,'# Bonjour');
  assert.equal(body.lesson.qa_status,'draft');
  assert.equal(good.headers.get('cache-control'),'no-store');
  assert.equal(requests,2);
});
test('private content is not available when not imported and never calls Drive',async()=>{
  const fetcher=async(url)=>{
    if(url.endsWith('/auth/v1/user')) return respond({id:'owner-uid'});
    assert.ok(url.includes('/rest/v1/private_lesson_content?'));
    return respond([]);
  };
  const result=await handle(req('/v1/private-courses/fr-a1-u12',{
    headers:{Authorization:'Bearer valid.jwt.token'}}),cfg,fetcher);
  assert.equal(result.status,404);
  assert.equal((await result.json()).error,'lesson_not_synced');
});
test('private lesson endpoint rejects invalid paths and origin',async()=>{
  const noCalls=()=>{throw Error('unexpected fetch')};
  const path=await handle(req('/v1/private-courses/%2Fbad'),cfg,noCalls);
  assert.equal(path.status,400);
  const badOrigin=await handle(req('/v1/private-courses/fr-a1-u01',{
    headers:{Origin:'https://untrusted.example'}}),cfg,noCalls);
  assert.equal(badOrigin.status,403);
});


test('audio index is authenticated and returns metadata only, never fake playback links',async()=>{
  let calls=0;
  const fetcher=async(url,opts)=>{
    calls++;
    if(url.endsWith('/auth/v1/user'))return respond({id:'the-owner'});
    assert.ok(url.includes('/rest/v1/course_audio_index?'));
    assert.ok(url.includes('course_id=eq.fr-a1-u01'));
    assert.ok(!url.includes('source_drive_file_id'));
    assert.equal(opts.headers.Authorization,'Bearer valid.jwt.token');
    return respond([{asset_id:'fr-a1-u01-dialogue',filename:'fr-a1-u01-dialogue.mp3',
      duration_seconds:17,source_kind:'synthetic_practice',decoded:true,exact_text:true,
      listened:false,audio_verified:false}]);
  };
  const noAuth=await handle(req('/v1/audio-index/fr-a1-u01'),cfg,fetcher);
  assert.equal(noAuth.status,401);
  assert.equal(calls,0);
  const ok=await handle(req('/v1/audio-index/fr-a1-u01',{
    headers:{Authorization:'Bearer valid.jwt.token',Origin:origin}}),cfg,fetcher);
  assert.equal(ok.status,200);
  const body=await ok.json();
  assert.equal(body.assets.length,1);
  assert.equal(body.playback_ready,false);
  assert.equal(body.assets[0].audio_verified,false);
  assert.ok(!JSON.stringify(body).includes('drive.google.com'));
  assert.equal(ok.headers.get('cache-control'),'no-store');
});
test('unmapped audio returns an empty collection, not a playable asset',async()=>{
 const fetcher=async(url)=>{
  if(url.endsWith('/auth/v1/user'))return respond({id:'the-owner'});
  return respond([]);
 };
 const ok=await handle(req('/v1/audio-index/en-ielts-reading-u01',
   {headers:{Authorization:'Bearer valid.jwt.token'}}),cfg,fetcher);
 assert.deepEqual((await ok.json()).assets,[]);
});

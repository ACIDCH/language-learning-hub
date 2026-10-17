import test from 'node:test';
import assert from 'node:assert/strict';
import {handle} from '../src/index.mjs';

const origin = 'https://language-learning-hub.pages.dev';
const cfg = {SUPABASE_URL:'https://db.example.supabase.co',
  SUPABASE_PUBLISHABLE_KEY:'public-key', FRONTEND_ORIGIN:origin};
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
});
test('status explicitly reports what is and is not deployed',async()=>{
  const r=await handle(req('/v1/status'),cfg);
  const d=await r.json();
  assert.equal(d.ready,true);
  assert.equal(d.modules.ai,'not-connected');
  assert.equal(d.modules.fullText,'requires-authorized-Drive-adapter');
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

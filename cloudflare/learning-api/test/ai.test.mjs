import test from 'node:test';
import assert from 'node:assert/strict';
import {requestAi} from '../src/ai.mjs';
import {handle} from '../src/index.mjs';

const cfg={SUPABASE_URL:'https://db.example.supabase.co',
 SUPABASE_PUBLISHABLE_KEY:'public',FRONTEND_ORIGIN:'https://language-learning-hub.pages.dev'};
const respond=(obj,status=200)=>new Response(JSON.stringify(obj),{status,headers:{'content-type':'application/json'}});
const valid={provider:'deepseek',model:'deepseek-chat',mode:'explain',
 prompt:'Explain present tense',context:'FR-A1 U01: être'};
test('AI stays disabled unless an authenticated person explicitly POSTS',async()=>{
 const none=await handle(new Request('https://worker.test/v1/ai/assist',{method:'POST'}),cfg,
  ()=>{throw Error('Network must not be called')});
 assert.equal(none.status,401);
});
test('AI key is never echoed, upstream uses only a bounded request body',async()=>{
 let attempts=0;
 const fetcher=async(url,options)=>{
  attempts++;
  assert.equal(url,'https://api.deepseek.com/chat/completions');
  assert.equal(options.headers.Authorization,'Bearer test-ai-key');
  const body=JSON.parse(options.body);
  assert.ok(!options.body.includes('test-ai-key'));
  assert.ok(body.messages[0].content.includes('tutor'));
  assert.equal(body.max_tokens,850);
  assert.equal(options.redirect,'error');
  return respond({choices:[{message:{content:'Use je suis.'}}]});
 };
 const result=await requestAi(valid,'test-ai-key',fetcher);
 assert.equal(result.status,200);assert.equal(result.answer,'Use je suis.');
 assert.equal(attempts,1);assert.ok(!JSON.stringify(result).includes('test-ai-key'));
});
test('no key or bad provider cannot trigger upstream requests',async()=>{
 const never=()=>{throw Error('not called')};
 assert.equal((await requestAi(valid,'',never)).status,422);
 assert.equal((await requestAi({...valid,provider:'custom',endpoint:'http://127.0.0.1:8080/api'},'abc123',never)).status,400);
 assert.equal((await requestAi({...valid,provider:'custom',endpoint:'https://localhost/v1/chat/completions'},'abc123',never)).status,400);
 assert.equal((await requestAi({...valid,provider:'custom',endpoint:'https://169.254.169.254/chat'},'abc123',never)).status,400);
 assert.equal((await requestAi({...valid,prompt:'x'.repeat(6100)},'abc123',never)).status,400);
});
test('auth-gated Worker AI route verifies Supabase JWT but does not retain model key',async()=>{
 let calls=0;
 const fetcher=async(url,options)=>{
  calls++;
  if(url.endsWith('/auth/v1/user'))return respond({id:'valid-user-id'});
  assert.equal(url,'https://api.deepseek.com/chat/completions');
  assert.equal(options.headers.Authorization,'Bearer ephemeral-model-key');
  return respond({choices:[{message:{content:'Tutor result'}}]});
 };
 const req=new Request('https://worker.test/v1/ai/assist',{
  method:'POST',headers:{Authorization:'Bearer test.jwt.token','Content-Type':'application/json',
    'X-AI-Key':'ephemeral-model-key',Origin:cfg.FRONTEND_ORIGIN},
  body:JSON.stringify(valid)
 });
 const r=await handle(req,cfg,fetcher);
 assert.equal(r.status,200);
 assert.equal(r.headers.get('access-control-allow-origin'),cfg.FRONTEND_ORIGIN);
 const body=await r.json();
 assert.equal(body.answer,'Tutor result');
 assert.ok(!JSON.stringify(body).includes('ephemeral-model-key'));
 assert.equal(calls,2);
});
test('provider error suppresses body and secret details',async()=>{
 const result=await requestAi(valid,'model-secret',async()=>respond({error:{message:'key leaked model-secret'}},429));
 assert.equal(result.status,502);
 assert.ok(!JSON.stringify(result).includes('model-secret'));
});

test('OpenRouter key check validates metadata without running or charging a model request',async()=>{
 let calls=0;
 const fetcher=async(url,options)=>{
   calls++;
   if(url.endsWith('/auth/v1/user'))return respond({id:'owner-user'});
   assert.equal(url,'https://openrouter.ai/api/v1/key');
   assert.equal(options.method,'GET');
   assert.equal(options.headers.Authorization,'Bearer sk-or-fixture-only');
   assert.equal(options.redirect,'error');
   assert.equal(options.body,undefined);
   return respond({data:{is_free_tier:true,is_management_key:false,limit_remaining:0}});
 };
 const req=new Request('https://worker.test/v1/ai/openrouter-key-check',{
   method:'POST',headers:{Origin:cfg.FRONTEND_ORIGIN,
     Authorization:'Bearer valid.jwt.token','X-AI-Key':'sk-or-fixture-only'}
 });
 const response=await handle(req,cfg,fetcher);
 const body=await response.json();
 assert.equal(response.status,200);
 assert.deepEqual(body,{ok:true,provider:'openrouter',is_free_tier:true,limit_remaining:0});
 assert.equal(calls,2);
 assert.ok(!JSON.stringify(body).includes('sk-or-fixture-only'));
});
test('OpenRouter key check rejects missing, invalid and management keys with no inference',async()=>{
 const noNetwork=()=>{throw Error('not expected')};
 const anon=await handle(new Request('https://worker.test/v1/ai/openrouter-key-check',{method:'POST'}),cfg,noNetwork);
 assert.equal(anon.status,401);
 const mockAuth=async(url)=>{
   if(url.endsWith('/auth/v1/user'))return respond({id:'user'});
   return respond({error:'invalid_key'},401);
 };
 const invalid=await handle(new Request('https://worker.test/v1/ai/openrouter-key-check',{method:'POST',
   headers:{Authorization:'Bearer valid.jwt.token','X-AI-Key':'bad-key'}
 }),cfg,mockAuth);
 assert.equal(invalid.status,422);
 assert.equal((await invalid.json()).error,'openrouter_key_invalid');
 const management=await handle(new Request('https://worker.test/v1/ai/openrouter-key-check',{method:'POST',
   headers:{Authorization:'Bearer valid.jwt.token','X-AI-Key':'management-key'}
 }),cfg,async(url)=>{
   if(url.endsWith('/auth/v1/user'))return respond({id:'user'});
   return respond({data:{is_management_key:true,is_free_tier:false}});
 });
 assert.equal(management.status,422);
 assert.equal((await management.json()).error,'openrouter_management_key_not_for_inference');
});

test('OpenRouter failure diagnostics do not confuse 403, timeout and a bad API Key',async()=>{
 const go=async providerFetch=>{
  const req=new Request('https://worker.test/v1/ai/openrouter-key-check',{
   method:'POST',headers:{Authorization:'Bearer test.jwt.token','X-AI-Key':'sk-or-fixture'}
  });
  const result=await handle(req,cfg,async(url,init)=>{
   if(url.endsWith('/auth/v1/user'))return respond({id:'user'});
   return providerFetch(url,init);
  });
  return {status:result.status,body:await result.json()};
 };
 const blocked=await go(()=>respond({error:'Forbidden'},403));
 assert.equal(blocked.status,502);
 assert.deepEqual(blocked.body,{error:'openrouter_access_denied',provider_status:403});
 const timeout=await go(()=>{const e=new Error('never echo user secret');e.name='TimeoutError';throw e;});
 assert.deepEqual(timeout.body,{error:'openrouter_transport_failed',reason:'timeout'});
 const thrown=await go(()=>{throw new TypeError('some secret material');});
 assert.deepEqual(thrown.body,{error:'openrouter_transport_failed',reason:'transport'});
 assert.ok(!JSON.stringify(thrown.body).includes('secret'));
});
test('network probe calls only the OpenRouter model listing with no user Key',async()=>{
 let callCount=0;
 const req=new Request('https://worker.test/v1/ai/openrouter-connectivity',{
  method:'POST',headers:{Authorization:'Bearer test.jwt.token'}
 });
 const result=await handle(req,cfg,async(url,options)=>{
  callCount++;
  if(url.endsWith('/auth/v1/user'))return respond({id:'owner'});
  assert.equal(url,'https://openrouter.ai/api/v1/models');
  assert.equal(options.method,'GET');
  assert.equal(options.headers.Authorization,undefined);
  return respond({data:[{id:'openrouter/free'}]},200);
 });
 assert.equal(result.status,200);
 assert.deepEqual(await result.json(),{
  reachable:true,provider_status:200,provider_ok:true,content_type:'json'
 });
 assert.equal(callCount,2);
 const blocked=await handle(req,cfg,async(url)=>{
  if(url.endsWith('/auth/v1/user'))return respond({id:'owner'});
  return new Response('error code: 1010',{status:403,headers:{'content-type':'text/plain'}});
 });
 assert.deepEqual(await blocked.json(),{
  reachable:true,provider_status:403,provider_ok:false,content_type:'other'
 });
 const anon=await handle(new Request('https://worker.test/v1/ai/openrouter-connectivity',{method:'POST'}),cfg,
   ()=>{throw new Error('no network while anonymous');});
 assert.equal(anon.status,401);
});

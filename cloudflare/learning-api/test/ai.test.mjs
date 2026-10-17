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

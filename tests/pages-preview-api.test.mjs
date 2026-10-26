import test from 'node:test';
import assert from 'node:assert/strict';
import {onRequest} from '../functions/api/[[path]].js';

const PREVIEW='https://feat-v44-full-ui-curriculum.language-learning-hub.pages.dev';
const PERSONAL='https://personal-release.language-learning-hub.pages.dev';
const request=(url,options)=>new Request(url,options);
test('same-origin Pages API reuses Worker health and status without external workers.dev',async()=>{
 const health=await onRequest({request:request(PREVIEW+'/api/health'),env:{}});
 assert.equal(health.status,200);
 assert.equal((await health.json()).ok,true);
 const status=await onRequest({request:request(PREVIEW+'/api/v1/status'),env:{}});
 assert.equal(status.status,200);
 const data=await status.json();
 assert.equal(data.ready,true);
 assert.equal(data.modules.catalog,'configured');
 assert.equal(data.modules.ai,'manual-opt-in-with-learner-key');
 const personal=await onRequest({request:request(PERSONAL+'/api/health'),env:{}});
 assert.equal(personal.status,200);
 assert.equal((await personal.json()).ok,true);
});
test('same-origin API preserves authentication and blocks unexpected hostnames',async()=>{
 const unauthed=await onRequest({request:request(PREVIEW+'/api/v1/progress/fr-a1-u01')});
 assert.equal(unauthed.status,401);
 assert.equal((await unauthed.json()).error,'authentication_required');
 const prod=await onRequest({request:request('https://language-learning-hub.pages.dev/api/v1/status')});
 assert.equal(prod.status,404);
 const wrong=await onRequest({request:request(PREVIEW+'.untrusted.example/api/v1/status')});
 assert.equal(wrong.status,404);
});
test('same-origin PUT preflight uses exact allowed preview origin',async()=>{
 const response=await onRequest({request:request(PREVIEW+'/api/v1/progress/fr-a1-u01',{method:'OPTIONS',headers:{Origin:PREVIEW,'Access-Control-Request-Method':'PUT','Access-Control-Request-Headers':'authorization,content-type'}})});
 assert.equal(response.status,204);
 assert.equal(response.headers.get('Access-Control-Allow-Origin'),PREVIEW);
 const personal=await onRequest({request:request(PERSONAL+'/api/v1/progress/fr-a1-u01',{method:'OPTIONS',headers:{Origin:PERSONAL,'Access-Control-Request-Method':'PUT','Access-Control-Request-Headers':'authorization,content-type'}})});
 assert.equal(personal.status,204);
 assert.equal(personal.headers.get('Access-Control-Allow-Origin'),PERSONAL);
});

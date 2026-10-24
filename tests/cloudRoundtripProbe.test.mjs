import {test} from 'node:test';
import assert from 'node:assert/strict';
import {assessSnapshots,probe} from '../scripts/cloud-roundtrip-probe.mjs';
const marker='llh-pr50-test-marker';
test('requires separate main/foundation note and answer evidence',()=>{
 const result=assessSnapshots({state:{notes:marker,studyResponses:{writing:marker}}},{notes:marker,answers:{__learning:{studyResponses:{writing:marker}}}},marker);
 assert.deepEqual(Object.values(result),[true,true,true,true]);
 assert.equal(assessSnapshots({state:{notes:marker}},{notes:marker},marker).foundationAnswer,false);
});
test('authenticates before reading owner rows and never writes or outputs private notes/tokens',async()=>{
 const calls=[];const secret='local-secret-token';const id='00000000-0000-4000-8000-000000000001';
 const fetcher=async(url,options)=>{calls.push({url,options});return {ok:true,json:async()=>url.includes('/auth/')?{id}:url.includes('/rest/')?[{notes:marker,answers:{__learning:{studyResponses:{writing:marker}}}}]:{progress:{state:{notes:marker,studyResponses:{writing:marker}}}}};};
 const result=await probe({token:secret,marker,fetcher});
 assert.equal(result.passed,true);assert.equal(calls.length,3);
 assert.ok(calls[0].url.includes('/auth/'));
 assert.ok(calls[2].url.includes('user_id=eq.'+id));
 assert.ok(calls.every(c=>!c.options.method||c.options.method==='GET'));
 for(const privateValue of [secret,id,marker])assert.ok(!JSON.stringify(result).includes(privateValue));
});
test('failed authentication prevents further reads',async()=>{
 let calls=0;await assert.rejects(probe({token:'invalid',marker,fetcher:async()=>{calls++;return {ok:false,status:401};}}),/HTTP 401/);
 assert.equal(calls,1);
});

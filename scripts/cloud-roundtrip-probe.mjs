/** Read-only companion to the two-device UI checklist. Never writes user records. */
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {cloudPublicDefaults} from '../src/cloudPublicDefaults.ts';
export function assessSnapshots(main,foundation,marker){
 const contains=value=>typeof value==='string'&&value.includes(marker);
 return {
  mainNote:contains(main?.state?.notes),
  mainAnswer:Object.values(main?.state?.studyResponses||{}).some(contains),
  foundationNote:contains(foundation?.notes),
  foundationAnswer:Object.values(foundation?.answers?.__learning?.studyResponses||{}).some(contains),
 };
}
export async function probe({token,marker,fetcher=fetch}){
 if(!token||!marker||marker.length<12)throw Error('A local access token and a unique marker of at least 12 characters are required.');
 const headers={Authorization:'Bearer '+token,apikey:cloudPublicDefaults.supabasePublishableKey};
 const read=async url=>{const r=await fetcher(url,{headers,signal:AbortSignal.timeout(20000)});if(!r.ok)throw Error('Read-only verification failed: HTTP '+r.status);return r.json();};
 const user=await read(cloudPublicDefaults.supabaseUrl+'/auth/v1/user');
 if(!/^[a-f0-9-]{36}$/i.test(user.id||''))throw Error('Authenticated owner was not confirmed.');
 const [main,foundation]=await Promise.all([
  read(cloudPublicDefaults.workerApiUrl+'/v1/progress/en-ielts-reading-u01'),
  read(cloudPublicDefaults.supabaseUrl+'/rest/v1/foundation_progress?user_id=eq.'+encodeURIComponent(user.id)+'&lesson_id=eq.fr-fnd-24&select=answers,notes,updated_at'),
 ]);
 const checks=assessSnapshots(main.progress,foundation[0],marker);
 return {mode:'read_only_api_observation_not_browser_e2e',observedAt:new Date().toISOString(),
  ownerHash:createHash('sha256').update(user.id).digest('hex'),markerHash:createHash('sha256').update(marker).digest('hex'),
  checks,passed:Object.values(checks).every(Boolean),twoDeviceBrowserAcceptance:'manual_evidence_required'};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 probe({token:process.env.LLH_E2E_ACCESS_TOKEN,marker:process.env.LLH_E2E_MARKER})
  .then(result=>{console.log(JSON.stringify(result,null,2));if(!result.passed)process.exitCode=1;})
  .catch(error=>{console.error(error.message);process.exitCode=1;});
}

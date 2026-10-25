import {existsSync,readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {verifyReleaseSources} from './release-source-integrity.mjs';

const requiredAutomated=[
 'courseInventory','sourceIntegrity','progressCasConflict','offlineDraftRecovery',
 'accountIsolation','tokenRefreshDraftProtection','noVoiceTextFallback',
 'aiFailureIsolation','publicBundleSecretScan','workerAuthContract','pagesRouteRefresh'
];
const ttsPassed=x=>x?.englishPassed===true&&x?.frenchPassed===true&&
 x?.controlsPassed===true&&x?.truthfulDeviceTtsLabelPassed===true&&
 typeof x?.evidenceRef==='string'&&x.evidenceRef.length>8;
const restorePassed=x=>x?.saveRestorePassed===true&&x?.reloginPassed===true&&
 x?.distinctPhysicalDevices>=2&&typeof x?.evidenceRef==='string'&&x.evidenceRef.length>8;
const httpsUrl=value=>{try{return new URL(value).protocol==='https:';}catch{return false;}};

export function assessPersonalLaunch(matrix,evidence,{sourceIntegrity=true}={}){
 const courses=matrix?.courses??[];
 const specialties=courses.flatMap(course=>course.specialties??[]);
 const checks={
  authorized:evidence?.scope==='personal_production_release'&&typeof evidence?.authorizedBy==='string',
  inventory:matrix?.counts?.main===108&&matrix?.counts?.foundation===48&&courses.length===156&&
   new Set(courses.map(c=>c.id)).size===156&&specialties.length===327&&
   new Set(specialties.map(s=>s.id)).size===327&&matrix?.counts?.bilingualReception===156,
  sourceIntegrity,
  deviceTts:evidence?.audioDeliveryMode==='device_tts'&&ttsPassed(evidence?.ownerReports?.desktopTts),
  foundationRestore:restorePassed(evidence?.ownerReports?.foundationRestore),
  mainCourseRestore:restorePassed(evidence?.ownerReports?.mainCourseRestore),
  automated:requiredAutomated.every(key=>evidence?.automatedEvidence?.[key]===true),
  rls:evidence?.security?.allPublicTablesRlsEnabled===true,
  publicSecretsProtected:evidence?.security?.serviceRoleAbsentFromPublicBundle===true,
  leakedPasswordProtection:evidence?.security?.leakedPasswordProtectionEnabled===true,
  deploymentConfigured:httpsUrl(evidence?.frontendUrl)&&httpsUrl(evidence?.workerUrl)&&
   evidence?.deployment?.frontendReachable===true&&evidence?.deployment?.workerHealthy===true,
  rollbackDocumented:typeof evidence?.deployment?.rollbackRef==='string'&&
   existsSync(new URL('../'+evidence.deployment.rollbackRef,import.meta.url))
 };
 const blockers=[];
 if(!checks.authorized)blockers.push('Personal release scope or owner authorization is missing');
 if(!checks.inventory)blockers.push('156-course / 327-specialty inventory is inconsistent');
 if(!checks.sourceIntegrity)blockers.push('Course source SHA-256 integrity failed');
 if(!checks.deviceTts)blockers.push('Owner-reported Windows English/French device-TTS acceptance is incomplete');
 if(!checks.foundationRestore)blockers.push('Owner-reported foundation-course two-device restore is incomplete');
 if(!checks.mainCourseRestore)blockers.push('Main-course save, refresh and relogin restore has not been accepted on a real browser');
 if(!checks.automated)blockers.push('One or more data-loss, isolation, fallback or route checks are missing');
 if(!checks.rls)blockers.push('Supabase RLS coverage is not verified');
 if(!checks.publicSecretsProtected)blockers.push('Public bundle secret protection is not verified');
 if(!checks.leakedPasswordProtection)blockers.push('Supabase leaked-password protection is disabled');
 if(!checks.deploymentConfigured)blockers.push('Pages or Worker stable HTTPS evidence is incomplete');
 if(!checks.rollbackDocumented)blockers.push('Rollback procedure is missing');
 return {ready:blockers.length===0,status:blockers.length===0?'PERSONAL_LAUNCH_READY':'PERSONAL_LAUNCH_BLOCKED',
  formalContentStatus:'FORMAL_CONTENT_REVIEW_PENDING',checks,blockers};
}

export async function probePersonalLaunch(evidence,fetcher=fetch){
 const targets=[['frontend',evidence.frontendUrl],['worker',evidence.workerUrl.replace(/\/$/u,'')+'/health']];
 const results={};
 for(const [name,url] of targets){
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),10000);
  try{
   const response=await fetcher(url,{redirect:'follow',signal:controller.signal});
   const body=name==='worker'?await response.text():'';
   results[name]={ok:response.ok,status:response.status,url:response.url||url,
    ...(name==='worker'?{healthy:/"ok"\s*:\s*true/u.test(body)}:{})};
  }catch(error){results[name]={ok:false,error:error instanceof Error?error.message:String(error)};}
  finally{clearTimeout(timer);}
 }
 return results;
}

export function applyProbe(report,probe){
 const live=probe?.frontend?.ok===true&&probe?.worker?.ok===true&&probe?.worker?.healthy===true;
 report.checks.liveDeployment=live;
 if(!live){
  report.ready=false;report.status='PERSONAL_LAUNCH_BLOCKED';
  report.blockers.push('Live Pages or Worker health probe failed');
 }
 return report;
}

if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const matrix=JSON.parse(readFileSync(new URL('../docs/qa/curriculum-gap-matrix.json',import.meta.url),'utf8'));
 const evidence=JSON.parse(readFileSync(new URL('../config/release/personal-launch-evidence.json',import.meta.url),'utf8'));
 const integrity=verifyReleaseSources(matrix,path=>readFileSync(new URL('../'+path,import.meta.url)));
 const report=assessPersonalLaunch(matrix,evidence,{sourceIntegrity:integrity.ok});
 if(process.argv.includes('--probe')){
  report.probe=await probePersonalLaunch(evidence);
  applyProbe(report,report.probe);
 }
 if(process.argv.includes('--json'))process.stdout.write(JSON.stringify(report,null,2)+'\n');
 else{
  process.stdout.write('Personal launch: '+report.status+'\n');
  process.stdout.write('Formal content: '+report.formalContentStatus+'\n');
  for(const blocker of report.blockers)process.stdout.write(' - '+blocker+'\n');
  if(report.probe)process.stdout.write(JSON.stringify(report.probe,null,2)+'\n');
 }
 if(process.argv.includes('--require-ready')&&!report.ready)process.exitCode=1;
}

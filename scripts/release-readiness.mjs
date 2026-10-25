import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';

const hash=/^[a-f0-9]{64}$/u;
export const approved=(x)=>x?.status==='approved'&&x?.reviewerRole==='human'&&
 typeof x.reviewer==='string'&&x.reviewer.trim().length>=2&&
 typeof x.evidenceRef==='string'&&x.evidenceRef.trim().length>4&&
 /^\d{4}-\d\d-\d\d(?:T|$)/u.test(x.reviewedAt??'');
const unique=(items,key)=>new Map(items.filter(x=>x&&typeof x[key]==='string').map(x=>[x[key],x]));
const coherent=(items,key)=>items.length===unique(items,key).size;
export const evidenceMatches=(current,provided)=>
 current.length>0&&Array.isArray(provided)&&provided.length===current.length&&
 coherent(provided,'id')&&current.every(p=>{
  const record=provided.find(q=>q.id===p.id);
  return record&&hash.test(p.targetSha256)&&hash.test(p.chineseSha256)&&
   record.targetSha256===p.targetSha256&&record.chineseSha256===p.chineseSha256;
 });


export function validAlignedAudio(course,review){
 const paragraphs=course.evidence?.paragraphs??[];
 if(!approved(review)||!paragraphs.length||
  !Array.isArray(review.segments)||review.segments.length!==paragraphs.length||
  !coherent(review.segments,'id'))return false;
 return paragraphs.every(p=>{
  const segment=review.segments.find(s=>s.id===p.id);
  return segment&&segment.targetSha256===p.targetSha256&&
   typeof segment.assetRef==='string'&&segment.assetRef.trim().length>8&&
   typeof segment.rightsRef==='string'&&segment.rightsRef.trim().length>8&&
   Number.isFinite(segment.durationSeconds)&&segment.durationSeconds>0&&segment.humanListened===true;
 });
}

export function assessReleaseReadiness(matrix,signoffs){
 const audioMode=signoffs?.audioDeliveryMode==='device_tts'?'device_tts':'verified_natural';
 const courses=matrix?.courses??[];
 const ids=courses.map(c=>c.id);
 const specialties=courses.flatMap(c=>c.specialties??[]).map(s=>s.id);
 const quality={
  inventory:matrix?.counts?.main===108&&matrix?.counts?.foundation===48&&
   courses.length===156&&coherent(courses,'id')&&new Set(ids).size===156&&
   specialties.length===327&&new Set(specialties).size===327&&
   matrix?.counts?.bilingualReception===156,
  signedCourses:0,signedSpecialties:0,signedAudio:0,audioMode,ttsAccepted:false,deviceRestore:false,browserAcceptance:false
 };
 const humanCourses=signoffs?.courseReviews??[];
 const humanSpecialties=signoffs?.specialtyReviews??[];
 const humanAudio=signoffs?.audioReviews??[];
 if(!Array.isArray(humanCourses)||!Array.isArray(humanSpecialties)||!Array.isArray(humanAudio))throw Error('Review records must be arrays');
 const courseMap=unique(humanCourses,'courseId'),specialtyMap=unique(humanSpecialties,'id'),audioMap=unique(humanAudio,'courseId');
 if(coherent(humanCourses,'courseId')){
  quality.signedCourses=courses.filter(c=>{
   const review=courseMap.get(c.id);
   return approved(review)&&evidenceMatches(c.evidence?.paragraphs??[],review.paragraphs);
  }).length;
 }
 if(coherent(humanSpecialties,'id')){
  quality.signedSpecialties=specialties.filter(id=>approved(specialtyMap.get(id))).length;
 }
 if(coherent(humanAudio,'courseId')){
  quality.signedAudio=courses.filter(c=>validAlignedAudio(c,audioMap.get(c.id))).length;
 }
 const tts=signoffs?.ttsAcceptance;
 quality.ttsAccepted=audioMode==='device_tts'&&approved(tts)&&tts.passed===true&&
  tts.englishVoiceTested===true&&tts.frenchVoiceTested===true&&
  tts.desktopTested===true&&tts.mobileTested===true&&
  tts.fallbackTested===true&&tts.sourceAudioClaimsDisabled===true;
 const device=signoffs?.deviceRestore;
 quality.deviceRestore=approved(device)&&device.passed===true&&device.distinctDevices>=2&&device.reloginVerified===true;
 const browser=signoffs?.browserAcceptance;
 quality.browserAcceptance=approved(browser)&&browser.passed===true&&browser.desktop===true&&browser.mobile===true&&browser.mediaChecked===true;
 const blockers=[
  ...(!quality.inventory?['156 lessons / 327 specialties: source inventory or course mapping inconsistent']:[]),
  ...(quality.signedCourses!==156?['Independent human semantic and Chinese paragraph review: '+quality.signedCourses+'/156']:[]),
  ...(quality.signedSpecialties!==327?['Independent human grammar/vocabulary review: '+quality.signedSpecialties+'/327']:[]),
  ...(audioMode==='device_tts'?(!quality.ttsAccepted?['Device TTS-only audio acceptance: real English/French voices, mobile/desktop, no-voice fallback and truthful labelling unverified']:[]):
    (quality.signedAudio!==156?['Source-hash aligned, licensed and human-listened audio: '+quality.signedAudio+'/156']:[])),
  ...(!quality.deviceRestore?['Two-device saved-answer, refresh and relogin restore: unverified']:[]),
  ...(!quality.browserAcceptance?['Desktop/mobile browser interaction and actual media acceptance: unverified']:[])
 ];
 return {ready:blockers.length===0,phase:blockers.length===0?'production_ready':'preview_only',quality,blockers};
}

if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const matrix=JSON.parse(readFileSync(new URL('../docs/qa/curriculum-gap-matrix.json',import.meta.url),'utf8'));
 const signoffs=JSON.parse(readFileSync(new URL('../config/release/evidence.json',import.meta.url),'utf8'));
 const report=assessReleaseReadiness(matrix,signoffs);
 if(process.argv.includes('--json'))process.stdout.write(JSON.stringify(report,null,2)+'\n');
 else{
  process.stdout.write('Release readiness: '+(report.ready?'READY':'BLOCKED')+'\n');
  process.stdout.write('Valid human content reviews: '+report.quality.signedCourses+'/156, specialties '+report.quality.signedSpecialties+'/327, audio '+report.quality.signedAudio+'/156\n');
  for(const blocker of report.blockers)process.stdout.write(' - '+blocker+'\n');
 }
 if(process.argv.includes('--require-ready')&&!report.ready)process.exitCode=1;
}

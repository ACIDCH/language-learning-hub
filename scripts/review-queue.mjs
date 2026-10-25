import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';

/** Build a deterministic list of work that still needs real review evidence.
 * This queue is planning metadata, not a substitute for a human QA result.
 */
export function buildReviewQueue(matrix,evidence){
 const courses=Array.isArray(matrix?.courses)?matrix.courses:[];
 const cReviews=new Set((evidence?.courseReviews??[]).filter(x=>x?.status==='approved'&&x?.reviewerRole==='human').map(x=>x.courseId));
 const sReviews=new Set((evidence?.specialtyReviews??[]).filter(x=>x?.status==='approved'&&x?.reviewerRole==='human').map(x=>x.id));
 const aReviews=new Set((evidence?.audioReviews??[]).filter(x=>x?.status==='approved'&&x?.reviewerRole==='human').map(x=>x.courseId));
 const priorityScore={P0:0,P1:1,P2:2,'P2-followup':3,P3:4};
 const queue=[];
 for(const lesson of courses){
  const meta={courseId:lesson.id,language:lesson.language,level:lesson.level,priority:lesson.priority??'P2',paragraphs:lesson.evidence?.paragraphs?.length??0,sourcePaths:(lesson.sourceHashes??[]).map(x=>x.path)};
  if(!cReviews.has(lesson.id))queue.push({kind:'course_semantics',id:lesson.id,...meta,checks:['paragraph target and Chinese meaning','exercise evidence and explanations','teaching sequence and progression']});
  if(!aReviews.has(lesson.id))queue.push({kind:'audio_alignment',id:lesson.id,...meta,checks:['authorized recording provenance','source paragraph text hash','P1–P4 alignment and actual listening']});
  for(const specialty of lesson.specialties??[]){
   if(!sReviews.has(specialty.id))queue.push({kind:'specialty_semantics',id:specialty.id,...meta,topicType:specialty.type,checks:['grammar and CEFR prerequisite','examples and natural Chinese','practice answers and counterexamples']});
  }
 }
 queue.sort((a,b)=>(priorityScore[a.priority]??5)-(priorityScore[b.priority]??5)||a.courseId.localeCompare(b.courseId)||a.kind.localeCompare(b.kind)||a.id.localeCompare(b.id));
 const counts={course_semantics:queue.filter(x=>x.kind==='course_semantics').length,
  specialty_semantics:queue.filter(x=>x.kind==='specialty_semantics').length,
  audio_alignment:queue.filter(x=>x.kind==='audio_alignment').length,
  deviceAcceptance:!(evidence?.deviceRestore?.passed===true),
  browserAcceptance:!(evidence?.browserAcceptance?.passed===true)};
 return {schema:1,warning:'Queue presence/absence is planning-only; production readiness is evaluated separately by release-readiness.mjs, including signed evidence and source hashes.',counts,queue};
}

if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const matrix=JSON.parse(readFileSync(new URL('../docs/qa/curriculum-gap-matrix.json',import.meta.url),'utf8'));
 const evidence=JSON.parse(readFileSync(new URL('../config/release/evidence.json',import.meta.url),'utf8'));
 const result=buildReviewQueue(matrix,evidence);
 if(process.argv.includes('--json'))process.stdout.write(JSON.stringify(result,null,2)+'\n');
 else{
  process.stdout.write('Pending source review: '+result.counts.course_semantics+'/156; grammar/vocabulary topics '+result.counts.specialty_semantics+'/327; audio '+result.counts.audio_alignment+'/156.\n');
  for(const task of result.queue)process.stdout.write([task.kind,task.id,task.priority,task.language,task.sourcePaths.join(';')].join('\t')+'\n');
 }
}

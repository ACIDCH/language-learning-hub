import {expect,it} from 'vitest';
import {readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {assessReleaseReadiness} from '../scripts/release-readiness.mjs';
import {buildReviewQueue} from '../scripts/review-queue.mjs';
import {requiresProductionEvidence} from '../scripts/enforce-release-build.mjs';

const matrix=JSON.parse(readFileSync('docs/qa/curriculum-gap-matrix.json','utf8'));
const signoffs=JSON.parse(readFileSync('config/release/evidence.json','utf8'));
const approve={status:'approved',reviewerRole:'human',reviewer:'Course reviewer',reviewedAt:'2026-10-25T12:00:00+13:00',evidenceRef:'qa://manual-pass-001'};
const fullyReviewed=()=>{
 const courses=matrix.courses.map((course:any)=>({...approve,courseId:course.id,paragraphs:course.evidence.paragraphs.map((p:any)=>({...p}))}));
 const specialties=matrix.courses.flatMap((c:any)=>c.specialties).map((u:any)=>({...approve,id:u.id}));
 const audio=matrix.courses.map((c:any)=>({...approve,courseId:c.id,segments:c.evidence.paragraphs.map((p:any)=>({
  id:p.id,targetSha256:p.targetSha256,assetRef:'recordings/'+c.id+'/'+p.id+'.mp3',
  rightsRef:'qa://verified-source-rights',humanListened:true,durationSeconds:20
 }))}));
 return {schema:1,courseReviews:courses,specialtyReviews:specialties,audioReviews:audio,
  deviceRestore:{...approve,passed:true,distinctDevices:2,reloginVerified:true},
  browserAcceptance:{...approve,passed:true,desktop:true,mobile:true,mediaChecked:true}};
};

it('never treats a structurally complete course catalog as an approved production release',()=>{
 const readiness=assessReleaseReadiness(matrix,signoffs);
 expect(readiness.quality.inventory).toBe(true);
 expect(readiness.ready).toBe(false);
 expect(readiness.phase).toBe('preview_only');
 expect(readiness.quality.signedCourses).toBe(0);
 expect(readiness.quality.signedSpecialties).toBe(0);
 expect(readiness.quality.signedAudio).toBe(0);
 expect(readiness.blockers).toHaveLength(5);
});
it('requires matching original and Chinese paragraph hashes for all 156 human source reviews',()=>{
 const manifest=fullyReviewed();
 expect(assessReleaseReadiness(matrix,manifest).ready).toBe(true);
 manifest.courseReviews[0].paragraphs[0].chineseSha256='0'.repeat(64);
 const result=assessReleaseReadiness(matrix,manifest);
 expect(result.ready).toBe(false);
 expect(result.quality.signedCourses).toBe(155);
});
it('forbids audio approval with wrong speech text, absent rights, no listening or incomplete paragraph mapping',()=>{
 const manifest=fullyReviewed();
 manifest.audioReviews[0].segments[0].targetSha256='0'.repeat(64);
 expect(assessReleaseReadiness(matrix,manifest).quality.signedAudio).toBe(155);
 manifest.audioReviews[0].segments[0].targetSha256=matrix.courses[0].evidence.paragraphs[0].targetSha256;
 manifest.audioReviews[0].segments[0].humanListened=false;
 expect(assessReleaseReadiness(matrix,manifest).ready).toBe(false);
 manifest.audioReviews[0].segments[0].humanListened=true;
 manifest.audioReviews[0].segments[0].rightsRef='';
 expect(assessReleaseReadiness(matrix,manifest).ready).toBe(false);
});
it('needs separate two-device restoration, actual mobile/desktop media checks and no duplicate review records',()=>{
 const manifest=fullyReviewed();
 manifest.deviceRestore.distinctDevices=1;
 expect(assessReleaseReadiness(matrix,manifest).quality.deviceRestore).toBe(false);
 manifest.deviceRestore.distinctDevices=2;
 manifest.browserAcceptance.mediaChecked=false;
 expect(assessReleaseReadiness(matrix,manifest).quality.browserAcceptance).toBe(false);
 manifest.browserAcceptance.mediaChecked=true;
 manifest.specialtyReviews.push(manifest.specialtyReviews[0]);
 const result=assessReleaseReadiness(matrix,manifest);
 expect(result.ready).toBe(false);
 expect(result.quality.signedSpecialties).toBe(0);
});


it('exposes an actionable release:report and blocks release:check rather than silently publishing',()=>{
 const report=spawnSync(process.execPath,['scripts/release-readiness.mjs','--json'],{encoding:'utf8'});
 expect(report.status).toBe(0);
 const result=JSON.parse(report.stdout);
 expect(result.ready).toBe(false);
 expect(result.blockers).toContain('Independent human semantic and Chinese paragraph review: 0/156');
 const blocked=spawnSync(process.execPath,['scripts/release-readiness.mjs','--require-ready'],{encoding:'utf8'});
 expect(blocked.status).toBe(1);
 expect(blocked.stdout).toContain('Release readiness: BLOCKED');
});


it('guards Cloudflare main-branch builds while keeping pull-request preview builds testable',()=>{
 expect(requiresProductionEvidence({CF_PAGES_BRANCH:'feat/v44-full-ui-curriculum-one-shot'})).toBe(false);
 expect(requiresProductionEvidence({CF_PAGES_BRANCH:'main'})).toBe(true);
 expect(requiresProductionEvidence({LLH_DEPLOY_TARGET:'production'})).toBe(true);
 const prod=spawnSync(process.execPath,['scripts/enforce-release-build.mjs'],{
  encoding:'utf8',env:{...process.env,CF_PAGES_BRANCH:'main',LLH_DEPLOY_TARGET:''}
 });
 expect(prod.status).toBe(1);
 expect(prod.stdout).toContain('Release readiness: BLOCKED');
 expect(prod.stderr).toContain('Production build stopped');
 const preview=spawnSync(process.execPath,['scripts/enforce-release-build.mjs'],{
  encoding:'utf8',env:{...process.env,CF_PAGES_BRANCH:'feat/v44-full-ui-curriculum-one-shot',LLH_DEPLOY_TARGET:''}
 });
 expect(preview.status).toBe(0);
});


it('blocks Worker deployments even when invoked in the Cloudflare subdirectory without Pages branch variables',()=>{
 const worker=spawnSync(process.execPath,['../../scripts/deploy-worker.mjs'],{
  cwd:'cloudflare/learning-api',encoding:'utf8',
  env:{...process.env,CF_PAGES_BRANCH:'',LLH_DEPLOY_TARGET:''}
 });
 expect(worker.status).toBe(1);
 expect(worker.stdout).toContain('Release readiness: BLOCKED');
 expect(worker.stderr).toContain('Worker deployment BLOCKED');
 expect(worker.stderr).not.toContain('ENOENT');
 const read=spawnSync(process.execPath,['../../scripts/release-readiness.mjs','--json'],{
  cwd:'cloudflare/learning-api',encoding:'utf8'
 });
 expect(read.status).toBe(0);
 expect(JSON.parse(read.stdout).quality.inventory).toBe(true);
});


it('generates a concrete, source-linked review queue without pretending to approve a lesson or recording',()=>{
 const out=spawnSync(process.execPath,['scripts/review-queue.mjs','--json'],{encoding:'utf8'});
 expect(out.status).toBe(0);
 const queue=JSON.parse(out.stdout);
 expect(queue.counts).toMatchObject({course_semantics:156,specialty_semantics:327,audio_alignment:156,deviceAcceptance:true,browserAcceptance:true});
 expect(queue.queue).toHaveLength(639);
 expect(queue.queue.every((x:{id:string;courseId:string;checks:string[]})=>x.id&&x.courseId&&x.checks.length>=3)).toBe(true);
 const fr=queue.queue.find((x:{id:string;kind:string})=>x.id==='fr-a1-u06'&&x.kind==='course_semantics');
 expect(fr.paragraphs).toBeGreaterThanOrEqual(4);
 expect(fr.sourcePaths.length).toBeGreaterThan(0);
});


it('keeps invalid, stale and duplicate signoffs visible in the work queue',()=>{
 const complete=fullyReviewed();
 expect(buildReviewQueue(matrix,complete).queue).toHaveLength(0);
 complete.courseReviews[0].paragraphs[0].chineseSha256='0'.repeat(64);
 complete.audioReviews[0].segments[0].humanListened=false;
 complete.specialtyReviews[0].reviewer='';
 complete.deviceRestore.reloginVerified=false;
 complete.browserAcceptance.mediaChecked=false;
 const queue=buildReviewQueue(matrix,complete);
 expect(queue.counts).toMatchObject({
  course_semantics:1,specialty_semantics:1,audio_alignment:1,
  deviceAcceptance:true,browserAcceptance:true
 });
 expect(queue.queue).toHaveLength(3);
 expect(queue.queue.some(x=>x.kind==='course_semantics'&&x.id===matrix.courses[0].id)).toBe(true);
 complete.courseReviews[0].paragraphs[0].chineseSha256=matrix.courses[0].evidence.paragraphs[0].chineseSha256;
 complete.courseReviews.push(complete.courseReviews[0]);
 expect(buildReviewQueue(matrix,complete).counts.course_semantics).toBe(156);
});

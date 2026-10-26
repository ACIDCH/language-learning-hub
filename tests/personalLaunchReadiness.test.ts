import {expect,it} from 'vitest';
import {readFileSync} from 'node:fs';
import {applyProbe,assessPersonalLaunch,probePersonalLaunch} from '../scripts/personal-launch-readiness.mjs';

const matrix=JSON.parse(readFileSync('docs/qa/curriculum-gap-matrix.json','utf8'));
const evidence=JSON.parse(readFileSync('config/release/personal-launch-evidence.json','utf8'));

it('keeps the owner-only desktop launch independent from paid password checks, dual-device acceptance and formal review',()=>{
 const result=assessPersonalLaunch(matrix,evidence);
 expect(result.status).toBe('PERSONAL_LAUNCH_READY');
 expect(result.formalContentStatus).toBe('FORMAL_CONTENT_REVIEW_PENDING');
 expect(result.checks.inventory).toBe(true);
 expect(result.checks.deviceTts).toBe(true);
 expect(result.checks.foundationRestoreObserved).toBe(true);
 expect(result.checks.mainCourseRestoreObserved).toBe(false);
 expect(result.blockers).toHaveLength(0);
 expect(result.advisories.join(' ')).toContain('intentionally non-blocking');
});

it('still blocks missing core data-loss and isolation safeguards',()=>{
 const complete=structuredClone(evidence);
 expect(assessPersonalLaunch(matrix,complete).status).toBe('PERSONAL_LAUNCH_READY');
 complete.automatedEvidence.accountIsolation=false;
 expect(assessPersonalLaunch(matrix,complete).status).toBe('PERSONAL_LAUNCH_BLOCKED');
});

it('probes the configured frontend and Worker health without treating a plain 200 as Worker health',async()=>{
 const calls:string[]=[];
 const report=await probePersonalLaunch(evidence,async url=>{
  calls.push(String(url));
  return new Response(String(url).endsWith('/health')?'{"ok":true}':'<!doctype html>',{status:200});
 });
 expect(calls).toHaveLength(2);
 expect(report.frontend.ok).toBe(true);
 expect(report.worker).toMatchObject({ok:true,healthy:true});
 const complete=structuredClone(evidence);
 expect(applyProbe(assessPersonalLaunch(matrix,complete),report).ready).toBe(true);
 expect(applyProbe(assessPersonalLaunch(matrix,complete),{frontend:{ok:true},worker:{ok:true,healthy:false}}).ready).toBe(false);
});

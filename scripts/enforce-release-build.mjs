import {spawnSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';

/** Preview CI remains testable. Production Pages builds are never allowed to
 * skip the same human-reviewed source/audio checks as manual release attempts.
 */
export function requiresProductionEvidence(env=process.env){
 return env.CF_PAGES_BRANCH==='main'||env.LLH_DEPLOY_TARGET==='production';
}
export function requiresPersonalEvidence(env=process.env){
 return env.LLH_DEPLOY_TARGET==='personal';
}
export function enforceProductionBuild(env=process.env){
 const checker=requiresProductionEvidence(env)?'scripts/release-readiness.mjs':
  requiresPersonalEvidence(env)?'scripts/personal-launch-readiness.mjs':null;
 if(!checker)return 0;
 const check=spawnSync(process.execPath,[checker,'--require-ready'],{stdio:'inherit'});
 return typeof check.status==='number'?check.status:1;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const exit=enforceProductionBuild();
 if(exit!==0){
  process.stderr.write(process.env.LLH_DEPLOY_TARGET==='personal'?
   'Personal launch build stopped: functional, security or owner acceptance evidence is incomplete.\n':
   'Production build stopped: independent course, specialty, aligned audio and device acceptance evidence is incomplete.\n');
  process.exitCode=exit;
 }
}

import {spawnSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';

/** Preview CI remains testable. Production Pages builds are never allowed to
 * skip the same human-reviewed source/audio checks as manual release attempts.
 */
export function requiresProductionEvidence(env=process.env){
 return env.CF_PAGES_BRANCH==='main'||env.LLH_DEPLOY_TARGET==='production';
}
export function enforceProductionBuild(env=process.env){
 if(!requiresProductionEvidence(env))return 0;
 const check=spawnSync(process.execPath,['scripts/release-readiness.mjs','--require-ready'],{stdio:'inherit'});
 return typeof check.status==='number'?check.status:1;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const exit=enforceProductionBuild();
 if(exit!==0){
  process.stderr.write('Production build stopped: independent course, specialty, aligned audio and device acceptance evidence is incomplete.\n');
  process.exitCode=exit;
 }
}

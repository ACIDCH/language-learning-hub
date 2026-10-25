import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

/** Single supported production Worker deployment path.
 * Always run the human-evidence gate first, independent of Cloudflare's
 * current branch-name environment. Never execute Wrangler after a failure.
 */
const checkPath=fileURLToPath(new URL('./release-readiness.mjs',import.meta.url));
const projectWorkerDir=fileURLToPath(new URL('../cloudflare/learning-api/',import.meta.url));
const check=spawnSync(process.execPath,[checkPath,'--require-ready'],{stdio:'inherit'});
if(check.error||check.status!==0){
  process.stderr.write('Worker deployment BLOCKED: production evidence gate is not satisfied.\n');
  process.exitCode=1;
}else{
  const command=process.platform==='win32'?'npx.cmd':'npx';
  const deploy=spawnSync(command,['wrangler','deploy'],{cwd:projectWorkerDir,stdio:'inherit'});
  if(deploy.error)process.stderr.write('Wrangler unavailable: '+String(deploy.error.message)+'\n');
  process.exitCode=deploy.error?1:(deploy.status??1);
}

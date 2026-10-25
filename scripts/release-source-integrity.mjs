import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';

/** Check raw-byte fingerprints of actual manuscripts/assets against the
 * editorial ledger. Foundation sourceHashes are intentionally hashes of
 * individual unit JSON objects, not hashes of their containing TS modules;
 * the separate curriculum build/integrity suite checks those generated units.
 */
export function verifyReleaseSources(matrix,reader=readFileSync){
 let verified=0,derivedUnitHashes=0;
 const mismatches=[];
 for(const course of matrix?.courses??[]){
  for(const item of course.sourceHashes??[]){
   const path=item?.path;
   if(typeof path!=='string'||!/^[a-f0-9]{64}$/u.test(item.sha256||'')){
    mismatches.push({courseId:course.id,path:path??null,reason:'missing_source_fingerprint'});continue;
   }
   if(/^src\/foundation(?:English|French)(?:Bridge)?\.ts$/u.test(path)){
    derivedUnitHashes++;continue;
   }
   if(!/^(?:content\/lesson-drafts\/|public\/learning-assets\/)[a-zA-Z0-9_.\/-]+$/u.test(path)||
    path.split('/').includes('..')){
    mismatches.push({courseId:course.id,path,reason:'unexpected_source_path'});continue;
   }
   try{
    const actual=createHash('sha256').update(reader(path)).digest('hex');
    if(actual!==item.sha256)mismatches.push({courseId:course.id,path,reason:'source_hash_changed'});
    else verified++;
   }catch{
    mismatches.push({courseId:course.id,path,reason:'source_file_missing'});
   }
  }
 }
 return {ok:mismatches.length===0&&verified===108&&derivedUnitHashes===96,
  verifiedRawSources:verified,derivedFoundationUnitHashes:derivedUnitHashes,mismatches};
}

if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const matrix=JSON.parse(readFileSync(new URL('../docs/qa/curriculum-gap-matrix.json',import.meta.url),'utf8'));
 const result=verifyReleaseSources(matrix,path=>readFileSync(new URL('../'+path,import.meta.url)));
 if(process.argv.includes('--json'))process.stdout.write(JSON.stringify(result,null,2)+'\n');
 else process.stdout.write('Release source fingerprint check: '+(result.ok?'PASS':'BLOCKED')+
  ' | manuscripts/assets '+result.verifiedRawSources+'/108; unit-derived foundation hashes '+result.derivedFoundationUnitHashes+'/96\n'+
  result.mismatches.map(x=>x.courseId+' '+x.path+' '+x.reason).join('\n')+'\n');
 if(!result.ok)process.exitCode=1;
}

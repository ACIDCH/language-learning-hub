import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';

/** Check source fingerprints against actual repository files.
 * Foundation rows reference four shared TypeScript modules (24 courses each),
 * so verify those four file hashes rather than trusting 96 repeated references.
 * Semantic per-unit contents remain covered by curriculum tests, independently.
 */
export function verifyReleaseSources(matrix,reader=readFileSync){
 let verified=0,verifiedFoundationReferences=0;
 const mismatches=[];
 const cachedHashes=new Map();
 const foundationPaths=new Set();
 for(const course of matrix?.courses??[]){
  for(const item of course.sourceHashes??[]){
   const path=item?.path;
   if(typeof path!=='string'||!/^[a-f0-9]{64}$/u.test(item.sha256||'')){
    mismatches.push({courseId:course.id,path:path??null,reason:'missing_source_fingerprint'});continue;
   }
   const foundationFile=/^src\/foundation(?:English|French)(?:Bridge)?\.ts$/u.test(path);
   if(!foundationFile&&!/^(?:content\/lesson-drafts\/|public\/learning-assets\/)[a-zA-Z0-9_.\/-]+$/u.test(path)||
    path.split('/').includes('..')){
    mismatches.push({courseId:course.id,path,reason:'unexpected_source_path'});continue;
   }
   try{
    if(!cachedHashes.has(path))cachedHashes.set(path,createHash('sha256').update(reader(path)).digest('hex'));
    const actual=cachedHashes.get(path);
    if(actual!==item.sha256)mismatches.push({courseId:course.id,path,reason:'source_hash_changed'});
    else if(foundationFile){verifiedFoundationReferences++;foundationPaths.add(path);}
    else verified++;
   }catch{
    mismatches.push({courseId:course.id,path,reason:'source_file_missing'});
   }
  }
 }
 return {ok:mismatches.length===0&&verified===108&&verifiedFoundationReferences===96&&foundationPaths.size===4,
  verifiedRawSources:verified,verifiedFoundationSourceReferences:verifiedFoundationReferences,
  verifiedFoundationSourceFiles:foundationPaths.size,mismatches};
}

if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const matrix=JSON.parse(readFileSync(new URL('../docs/qa/curriculum-gap-matrix.json',import.meta.url),'utf8'));
 const result=verifyReleaseSources(matrix,path=>readFileSync(new URL('../'+path,import.meta.url)));
 if(process.argv.includes('--json'))process.stdout.write(JSON.stringify(result,null,2)+'\n');
 else process.stdout.write('Release source fingerprint check: '+(result.ok?'PASS':'BLOCKED')+
  ' | manuscripts/assets '+result.verifiedRawSources+'/108; foundation source references '+result.verifiedFoundationSourceReferences+'/96 (files '+result.verifiedFoundationSourceFiles+'/4)'\n'+
  result.mismatches.map(x=>x.courseId+' '+x.path+' '+x.reason).join('\n')+'\n');
 if(!result.ok)process.exitCode=1;
}

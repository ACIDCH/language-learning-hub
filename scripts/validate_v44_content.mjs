import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {FOUNDATION_UNITS,validateFoundationUnits} from '../src/foundationCurriculum.ts';
const read=p=>JSON.parse(readFileSync(p,'utf8'));
const hash=b=>createHash('sha256').update(b).digest('hex');
const units=read('config/curriculum/units.v2.json').units,main=read('content/v44-main-index.json');
const assets=read('public/learning-assets/manifest.json').assets;
assert.equal(units.length,108);assert.equal(main.length,108);assert.equal(FOUNDATION_UNITS.length,48);
assert.deepEqual(validateFoundationUnits(FOUNDATION_UNITS),[]);
const ids=new Set(),readings=new Set();let original=0,drafts=0,words=0;
for(const entry of main){
 assert(!ids.has(entry.id));ids.add(entry.id);
 const meta=units.find(u=>u.id===entry.id);assert(meta);assert.equal(meta.language,entry.language);assert.equal(meta.level,entry.level);
 assert.equal(entry.qa_status,'pending');assert.equal(entry.reviewed,false);assert.equal(entry.audio_status,'missing_audio');
 if(entry.public_sources.length){
  original++;
  for(const id of entry.public_sources){const a=assets.find(a=>a.id===id);assert(a);const b=readFileSync(a.path);assert.equal(hash(b),a.sha256);assert(b.length>2000);}
 }else{
  drafts++;const b=readFileSync(entry.draft_path),d=JSON.parse(b);assert.equal(hash(b),entry.sha256);assert.equal(d.id,entry.id);
  assert.equal(d.content_status,'original_draft');assert.equal(d.qa_status,'pending');assert.equal(d.audio_status,'missing_audio');
  for(const k of ['context','grammar','reading','pronunciation','production','source','common_mistake','listening_script'])assert(d[k]?.trim().length>8,`${d.id}: ${k}`);
  assert(d.grammar.length>=40,d.id+' lacks a concrete explanation');
  assert(d.vocabulary.length>=6);assert(d.vocabulary.every(v=>v.length===2&&v.every(x=>x.trim())));
  assert(d.examples.length>=4);assert(d.examples.every(e=>e.text.length>12&&e.note));
  assert(d.questions.length>=2);assert(d.questions.every(q=>q.prompt&&q.answer&&q.explanation));
  assert(!readings.has(d.reading),d.id+' duplicate reading');readings.add(d.reading);
  const n=d.reading.split(/\s+/).length;assert(n>=45,d.id+' insufficient reading');words+=n;
  if(/^fr-c/.test(d.id))assert(n>=105,d.id+' advanced discourse too short');
  assert(!/请后续补充|此处添加示例|TODO|Lorem ipsum/i.test(JSON.stringify(d)));
 }
}
const foundation=FOUNDATION_UNITS.map(u=>{
 assert(!ids.has(u.id));ids.add(u.id);assert(['en','fr'].includes(u.language));assert(u.level);
 return {id:u.id,kind:'foundation',language:u.language,level:u.level,content_status:'existing_original',qa_status:'pending',reviewed:false,text_complete:true,audio_status:'missing_audio',source:'src/foundation'+(u.language==='en'?'English':'French')+(Number(u.id.slice(-2))>12?'Bridge':'')+'.ts',sha256:hash(JSON.stringify(u))};
});
assert.equal(ids.size,156);
for(const a of assets)assert.equal(hash(readFileSync(a.path)),a.sha256,'public asset changed '+a.id);
// Baseline is the exact main revision from which the integration branch began.
const baselineRecord=read('content/v44-source-baseline.json'),baseline=baselineRecord.revision;
for(const [path,expected] of Object.entries(baselineRecord.normalized_lf_sha256)){
 assert.equal(hash(readFileSync(path,'utf8').replace(/\r\n/g,'\n')),expected,'baseline changed '+path);
}
const full=[...main,...foundation];
writeFileSync('content/v44-content-index.json',JSON.stringify(full,null,2)+'\n');
const report={baseline,units:156,main:108,foundation:48,existing_main_originals:original,new_main_drafts:drafts,existing_foundation:48,nonempty_learning_pages:156,text_complete:156,QA_approved:0,audio_verified:0,publishable:0,
 meaning:'These counts describe V4.4 bundled content only. Text completeness is structural, not human approval. Existing cloud/audio verification flags are neither overwritten nor invalidated.',
 public_assets_unchanged:assets.length,foundation_source_files_unchanged:4,unique_draft_readings:readings.size,draft_reading_words:words,private_manuscripts:'preferred at runtime after authentication; not copied or claimed to be tested here'};
writeFileSync('reports/v44-content-completeness.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report));

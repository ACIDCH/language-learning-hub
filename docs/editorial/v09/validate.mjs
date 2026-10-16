import {readFileSync} from 'node:fs';
import {strict as assert} from 'node:assert';
const read=(path)=>JSON.parse(readFileSync(new URL(path,import.meta.url),'utf8'));
const j=read('./manifest.json'),curriculum=read('../../../config/curriculum/units.v2.json');
assert.equal(j.schema_version,1);assert.equal(j.units.length,14);
const ids=new Set(curriculum.units.map(x=>x.id)),seen=new Set();
let fr=0,en=0;
for(const x of j.units){
  assert(ids.has(x.unit_id),'not in canonical catalog: '+x.unit_id);
  assert(!seen.has(x.unit_id),'duplicate ID '+x.unit_id);seen.add(x.unit_id);
  for(const key of ['six_stage_original_draft','independent_dialogue_and_reading','worked_answer_key'])assert.equal(x[key],true,x.unit_id+' '+key);
  for(const key of ['exact_audio_verified','text_complete','expert_QA_approved','publishable'])assert.equal(x[key],false,x.unit_id+' '+key);
  if(x.language==='fr'){assert.equal(x.level,'C1');assert.match(x.unit_id,/^fr-c1-u\d\d$/);fr++;}
  else{assert.equal(x.language,'en');assert.match(x.unit_id,/^en-ielts-/);en++;}
}
assert.equal(fr,8);assert.equal(en,6);
for(let i=1;i<=8;i++)assert(seen.has('fr-c1-u'+String(i).padStart(2,'0')));
for(const s of ['listening','reading','writing-task1','writing-task2','speaking','language-upgrade'])assert(seen.has('en-ielts-'+s+'-u05'));
for(const k of ['v09_new_unique','all_editorial_v06_v09_unique'])assert(Number.isInteger(j.summary[k]));
assert.equal(j.summary.v09_new_unique,14);
assert.equal(j.summary.all_editorial_v06_v09_unique,58);
const raw=JSON.stringify(j);
for(const prohibited of ['docs.google.com/document/d/','drive.google.com/drive/folders/','service_role'])assert(!raw.includes(prohibited));
console.log('V0.9 manifest validated: 8 French C1 + 6 IELTS U05, 14 unique IDs, strict QA flags and no Drive IDs.');

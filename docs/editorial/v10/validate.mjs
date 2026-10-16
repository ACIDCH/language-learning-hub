import {readFileSync} from 'node:fs';
import {strict as assert} from 'node:assert';
const read=p=>JSON.parse(readFileSync(new URL(p,import.meta.url),'utf8'));
const m=read('./manifest.json');
const c=read('../../../config/curriculum/units.v2.json');
const ids=new Set(c.units.map(x=>x.id)),seen=new Set();
assert.equal(m.schema_version,1);
assert.equal(m.units.length,14);
let fr=0,en=0;
for (const u of m.units){
  assert(ids.has(u.unit_id),'Unknown catalog ID '+u.unit_id);
  assert(!seen.has(u.unit_id),'Duplicate unit '+u.unit_id);seen.add(u.unit_id);
  for(const field of ['original_six_stage_text_draft','worked_answer_key','original_reading'])assert.equal(u[field],true);
  for(const field of ['text_complete','exact_audio_verified','expert_QA_approved','publishable'])assert.equal(u[field],false);
  if(u.language==='fr'){assert.equal(u.level,'C2');fr++;}
  else {assert.equal(u.language,'en');en++;}
}
assert.equal(fr,8);assert.equal(en,6);
for(let n=1;n<=8;n++)assert(seen.has('fr-c2-u'+String(n).padStart(2,'0')));
for(const skill of ['listening','reading','writing-task1','writing-task2','speaking','language-upgrade'])assert(seen.has('en-ielts-'+skill+'-u06'));
assert.equal(m.summary.v10_new_unique_ids,14);
assert.equal(m.summary.all_editorial_v06_through_v10_unique_ids,72);
const content=JSON.stringify(m);
for(const pattern of ['docs.google.com/document/d/','drive.google.com/drive/folders/','service_role'])assert(!content.includes(pattern));
console.log('Editorial V1.0: 14 valid unique unit IDs; all QA/media flags honest, no private Drive identifiers.');

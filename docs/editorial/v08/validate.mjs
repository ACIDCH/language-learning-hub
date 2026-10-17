import {readFileSync} from 'node:fs';
import {strict as assert} from 'node:assert';
const j=JSON.parse(readFileSync(new URL('./manifest.json',import.meta.url),'utf8'));
const c=JSON.parse(readFileSync(new URL('../../../config/curriculum/units.v2.json',import.meta.url),'utf8'));
const ids=new Set(c.units.filter(x=>x.language==='fr'&&x.level==='B2').map(x=>x.id));
assert.equal(j.schema_version,1);
assert.equal(j.units.length,10);
const seen=new Set();
for(const x of j.units) {
  assert(ids.has(x.id),'Unknown B2 ID '+x.id);
  assert(!seen.has(x.id),'Duplicate B2 ID '+x.id);seen.add(x.id);
  assert.equal(x.six_stage_original_manuscript,true);
  assert.equal(x.reading_and_answers,true);
  assert.equal(x.pronunciation_target_text,true);
  for(const f of ['exact_audio_verified','text_complete','expert_QA_approved','publishable'])assert.equal(x[f],false);
}
for(let n=1;n<=10;n++)assert(seen.has('fr-b2-u'+String(n).padStart(2,'0')));
assert.equal(j.summary.newly_deepened_ids,10);
assert.equal(j.summary.all_editorial_v06_to_v08_unique_ids,44);
const str=JSON.stringify(j);
for(const t of ['docs.google.com/document/d/','drive.google.com/drive/folders/','service_role'])assert(!str.includes(t));
console.log('French B2 V0.8: 10 accurate IDs, 60-question manuscript register, no false QA/media flags or private IDs.');

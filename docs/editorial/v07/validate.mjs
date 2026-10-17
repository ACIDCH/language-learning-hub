import {readFileSync} from 'node:fs';
import {strict as assert} from 'node:assert';
const load=(p)=>JSON.parse(readFileSync(new URL(p,import.meta.url),'utf8'));
const manifest=load('./manifest.json'), curriculum=load('../../../config/curriculum/units.v2.json');
assert.equal(manifest.schema_version,1);
assert.equal(manifest.units.length,16);
const known=new Set(curriculum.units.map(u=>u.id));
const seen=new Set();
let fr=0,en=0;
for(const x of manifest.units){
 assert(known.has(x.unit_id),'Unknown unit '+x.unit_id);
 assert(!seen.has(x.unit_id),'Duplicate '+x.unit_id);
 seen.add(x.unit_id);
 for(const field of ['six_stage_original_text','independent_reading','answer_key'])assert.equal(x[field],true);
 for(const field of ['exact_audio_verified','expert_QA_approved','text_complete','publishable'])assert.equal(x[field],false);
 if(x.language==='fr'){assert.match(x.unit_id,/^fr-b1-u\d\d$/);fr++;}
 else {assert.equal(x.language,'en');assert.match(x.unit_id,/^en-ielts-/);en++;}
}
assert.equal(fr,10);assert.equal(en,6);
const raw=readFileSync(new URL('./manifest.json',import.meta.url),'utf8');
for(const term of ['docs.google.com/document/d/','drive.google.com/drive/folders/','service_role'])assert(!raw.includes(term));
for(let n=1;n<=10;n++)assert(seen.has('fr-b1-u'+String(n).padStart(2,'0')));
for(const enid of ['listening-u04','reading-u04','writing-task1-u03','writing-task2-u03','speaking-u03','language-upgrade-u03'])assert(seen.has('en-ielts-'+enid));
assert.equal(manifest.summary.unique_v07_ids,16);
assert.equal(manifest.summary.exact_audio_verified,0);
assert.equal(manifest.summary.expert_QA_approved,0);
assert.equal(manifest.summary.publishable,0);
console.log('V0.7 metadata validated: 10 French B1 and 6 English IELTS unit IDs, truthful QA/audio status, no private Drive locators.');

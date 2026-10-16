import {readFileSync} from 'node:fs';
import {strict as assert} from 'node:assert';
const load=(p)=>JSON.parse(readFileSync(new URL(p,import.meta.url),'utf8'));
const manifest=load('./manifest.json'), curriculum=load('../../../config/curriculum/units.v2.json');
assert.equal(manifest.schema_version,1);
assert.equal(manifest.units.length,10);
const known=new Set(curriculum.units.filter(u=>u.language==='fr'&&u.level==='B1').map(u=>u.id));
const seen=new Set();
for(const x of manifest.units){
 assert(known.has(x.unit_id),'Unknown FR B1 unit: '+x.unit_id);
 assert(!seen.has(x.unit_id),'Duplicate: '+x.unit_id);
 seen.add(x.unit_id);
 for(const field of ['six_stage_original_text','independent_reading','answer_key'])assert.equal(x[field],true);
 for(const field of ['exact_audio_verified','expert_QA_approved','text_complete','publishable'])assert.equal(x[field],false);
}
const str=readFileSync(new URL('./manifest.json',import.meta.url),'utf8');
assert(!str.includes('docs.google.com/document/d/'));
assert(!str.includes('drive.google.com/drive/folders/'));
assert(!str.includes('service_role'));
for(let n=1;n<=10;n++)assert(seen.has('fr-b1-u'+String(n).padStart(2,'0')));
console.log('FR B1 V0.7 metadata valid: 10 complete ID mappings, explicit unverified QA/media, no private Drive locators.');

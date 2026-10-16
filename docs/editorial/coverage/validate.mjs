import {readFileSync} from 'node:fs';
import {strict as assert} from 'node:assert';
const load=p=>JSON.parse(readFileSync(new URL(p,import.meta.url),'utf8'));
const audit=load('./manifest.json'),cat=load('../../../config/curriculum/units.v2.json');
const deep=['v06','v07','v08','v09','v10','v11','v12'].flatMap(v=>{
 const j=load('../'+v+'/manifest.json');return (j.units||j.lessons).map(x=>x.unit_id||x.id);
});
assert.equal(cat.units.length,108);
assert.equal(deep.length,96);
assert.equal(new Set(deep).size,96,'Duplicate deep editorial ID');
assert.equal(audit.units.length,108);
assert.deepEqual(audit.units.map(x=>x.unit_id),cat.units.map(x=>x.id));
const counts={deepened_unverified:0,existing_A1_six_stage_original:0,english_v04_baseline_only:0};
for(const x of audit.units){
 assert(Object.hasOwn(counts,x.text_evidence_level),'Unknown tier '+x.text_evidence_level);
 counts[x.text_evidence_level]++;
 if(x.text_evidence_level==='deepened_unverified')assert(deep.includes(x.unit_id),'No source for '+x.unit_id);
 else if(x.text_evidence_level==='existing_A1_six_stage_original')assert(/^fr-a1-u\d\d$/.test(x.unit_id));
 else throw Error('V0.4-only tier should be empty after V1.2: '+x.unit_id);
 for(const field of ['text_complete','audio_verified','expert_QA_approved','publishable'])assert.equal(x[field],false);
}
assert.deepEqual(counts,{deepened_unverified:96,existing_A1_six_stage_original:12,english_v04_baseline_only:0});
assert.deepEqual(audit.summary.counts,counts);
assert.equal(audit.summary.manuscript_evidence_total,108);
const raw=JSON.stringify(audit);
for(const t of ['docs.google.com/document/d/','drive.google.com/drive/folders/','refresh_token','service_role'])assert(!raw.includes(t));
console.log('108 audited: 96 deep draft units, 12 existing French A1 original draft units, 0 English baseline-only; no false completion or private IDs.');

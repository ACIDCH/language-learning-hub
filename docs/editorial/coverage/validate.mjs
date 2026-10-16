import {readFileSync} from 'node:fs';
import {strict as assert} from 'node:assert';
const load=p=>JSON.parse(readFileSync(new URL(p,import.meta.url),'utf8'));
const audit=load('./manifest.json'),cat=load('../../../config/curriculum/units.v2.json');
const prior=['v06','v07','v08','v09','v10','v11'].flatMap(v=>{
 const j=load('../'+v+'/manifest.json');return (j.units||j.lessons).map(x=>x.unit_id||x.id);
});
assert.equal(cat.units.length,108);assert.equal(prior.length,84);
assert.equal(new Set(prior).size,84);
assert.equal(audit.units.length,108);
assert.deepEqual(audit.units.map(x=>x.unit_id),cat.units.map(x=>x.id));
const counts={deepened_unverified:0,existing_A1_six_stage_original:0,english_v04_baseline_only:0};
for(const u of audit.units){
 assert(Object.hasOwn(counts,u.text_evidence_level),'Unknown source tier '+u.text_evidence_level);
 counts[u.text_evidence_level]++;
 if(u.text_evidence_level==='deepened_unverified')assert(prior.includes(u.unit_id));
 else if(u.text_evidence_level==='existing_A1_six_stage_original')assert(/^fr-a1-u\d\d$/.test(u.unit_id));
 else assert(/^en-ielts-/.test(u.unit_id));
 for(const x of ['text_complete','audio_verified','expert_QA_approved','publishable'])assert.equal(u[x],false);
}
assert.deepEqual(counts,{deepened_unverified:84,existing_A1_six_stage_original:12,english_v04_baseline_only:12});
assert.equal(audit.summary.manuscript_evidence_total,108);
const raw=JSON.stringify(audit);
for(const bad of ['docs.google.com/document/d/','drive.google.com/drive/folders/','service_role','refresh_token'])assert(!raw.includes(bad));
console.log('108 unit IDs audited: 84 editorial, 12 French A1, 12 English V0.4; no false completion and no private locators.');

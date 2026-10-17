import {readFileSync} from 'node:fs';
import {strict as assert} from 'node:assert';
const load=p=>JSON.parse(readFileSync(new URL(p,import.meta.url),'utf8'));
const c=load('../../../config/curriculum/units.v2.json'),m=load('./manifest.json');
const prior=['v06','v07','v08','v09','v10'].flatMap(v=>{
const j=load('../'+v+'/manifest.json');return (j.lessons||j.units).map(x=>x.unit_id||x.id);
});
const now=m.units.map(x=>x.unit_id);
assert.equal(prior.length,72);assert.equal(new Set(prior).size,72);
assert.equal(now.length,12);assert.equal(new Set(now).size,12);
assert.equal(new Set([...prior,...now]).size,84);
const known=new Set(c.units.map(x=>x.id));
for(const x of m.units){
 assert(known.has(x.unit_id),'Unknown unit '+x.unit_id);
 assert.equal(x.six_stage_draft,true);
 assert.equal(x.original_receptive_text,true);
 assert.equal(x.worked_answer_key,true);
 assert.equal(x.model_output,true);
 for(const k of ['text_complete','exact_audio_verified','expert_QA_approved','publishable'])assert.equal(x[k],false);
}
for(const t of ['listening','reading','writing-task1','writing-task2','speaking','language-upgrade'])
 for(const n of ['07','08'])assert(now.includes('en-ielts-'+t+'-u'+n));
assert.equal(m.summary.english_u07_u08_answer_count,96);
assert.equal(m.summary.cumulative_editorial_unique,84);
const raw=JSON.stringify(m);
for(const term of ['docs.google.com/document/d/','drive.google.com/drive/folders/','service_role','refresh_token'])assert(!raw.includes(term));
console.log('V1.1: 12 new IDs, 84 unique across V0.6–V1.1, safe privacy + honest quality flags');

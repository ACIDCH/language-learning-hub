import {readFileSync} from 'node:fs';
import {strict as assert} from 'node:assert';
const load=p=>JSON.parse(readFileSync(new URL(p,import.meta.url),'utf8'));
const m=load('./manifest.json'),cat=load('../../../config/curriculum/units.v2.json');
const prior=['v06','v07','v08','v09','v10','v11'].flatMap(v=>{const j=load('../'+v+'/manifest.json');return(j.units||j.lessons).map(x=>x.unit_id||x.id)});
const now=m.units.map(x=>x.unit_id);
assert.equal(prior.length,84);
assert.equal(new Set(prior).size,84);
assert.equal(now.length,12);
assert.equal(new Set([...prior,...now]).size,96,'Unexpected duplicate ID');
const known=new Set(cat.units.map(x=>x.id));
for(const x of m.units){
 assert(known.has(x.unit_id),'Unregistered: '+x.unit_id);
 assert(x.unit_id.startsWith('en-ielts-'));
 assert.equal(x.six_stage_original_draft,true);
 assert.equal(x.unit_specific_script_or_data,true);
 assert.equal(x.worked_answers,8);
 assert.equal(x.original_example_output,true);
 for(const k of ['expert_QA_approved','exact_audio_verified','text_complete','publishable'])assert.equal(x[k],false);
}
for(const [t,nums] of [['listening',[1,2]],['reading',[1,2]],['writing-task1',[1,4]],['writing-task2',[1,4]],['speaking',[1,4]],['language-upgrade',[1,4]]])
 for(const n of nums)assert(now.includes('en-ielts-'+t+'-u'+String(n).padStart(2,'0')));
assert.equal(m.summary.cumulative_editorial_deepened,96);
assert.equal(m.summary.worked_questions_covered,96);
const raw=JSON.stringify(m);
for(const x of ['docs.google.com/document/d/','drive.google.com/drive/folders/','refresh_token','service_role'])assert(!raw.includes(x));
console.log('V1.2 passed: 12 new stable IELTS IDs, 96 unique total deep manuscripts, QA/media/publication flags false.');

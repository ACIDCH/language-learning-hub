import {readFileSync} from 'node:fs';
import {strict as assert} from 'node:assert';
const base=new URL('./',import.meta.url);
const parse=(name)=>JSON.parse(readFileSync(new URL(name,base),'utf8'));
const canonical=parse('../../config/curriculum/units.v2.json');
const known=new Map(canonical.units.map(u=>[u.id,u]));
assert.equal(known.size,108);
const versions=['v06','v07','v08','v09','v10'];
const all=new Map();
for(const version of versions){
  const m=parse(version+'/manifest.json');
  const lessons=m.units||m.lessons;
  assert(lessons?.length>0,version+' has no metadata');
  for(const u of lessons){
    const id=u.unit_id||u.id;
    assert(known.has(id),version+' includes unknown ID '+id);
    assert(!all.has(id),'Cross-version duplication: '+id+' in '+all.get(id)+' and '+version);
    all.set(id,version);
    for(const field of ['text_complete','publishable']){
      assert.equal(u[field],false,version+'/'+id+' has invalid '+field);
    }
    assert.equal(u.expert_QA_approved,false,version+'/'+id+' misreports expert QA');
    const audio=(u.exact_audio_verified ?? u.licensed_audio_mapped);
    assert.equal(audio,false,version+'/'+id+' misreports audio alignment');
  }
  const raw=JSON.stringify(m);
  for(const term of ['docs.google.com/document/d/','drive.google.com/drive/folders/','service_role'])assert(!raw.includes(term),'Private locator in '+version);
}
const counts={fr:0,en:0};
for(const id of all.keys()) counts[id.startsWith('fr-')?'fr':'en']++;
assert.deepEqual(counts,{fr:48,en:24});
assert.equal(all.size,72);
const uncovered=[...known.keys()].filter(id=>!all.has(id));
assert.equal(uncovered.length,36);
const missingFrench=uncovered.filter(id=>id.startsWith('fr-'));
assert.equal(missingFrench.length,12);
assert(missingFrench.every(id=>id.startsWith('fr-a1-')));
console.log(JSON.stringify({editorial_draft_ids:all.size,by_language:counts,not_deepened_in_this_pipeline:uncovered.length,remaining_french_A1:missingFrench.length,remaining_english:uncovered.length-12,important:'Text drafts are not completed or published courses'},null,2));

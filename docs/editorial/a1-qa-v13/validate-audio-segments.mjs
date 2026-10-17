import {readFileSync} from 'node:fs';
import {strict as assert} from 'node:assert';
const p=JSON.parse(readFileSync(new URL('./audio-segment-contract.json',import.meta.url),'utf8'));
const qa=JSON.parse(readFileSync(new URL('./manifest.json',import.meta.url),'utf8'));
const src=new Set(qa.units.map(x=>x.unit_id));
assert.equal(src.size,12);
assert.equal(p.segments.length,24);
const keys=new Set();
for(const x of p.segments){
 assert(src.has(x.unit_id),'Unknown lesson '+x.unit_id);
 assert(['dialogue','reading'].includes(x.segment));
 const key=x.unit_id+':'+x.segment;
 assert(!keys.has(key),'Duplicate '+key);keys.add(key);
 // Treat these as separate full-coverage requirements.
 const verified=x.licence_to_use_confirmed && x.transcript_exact_match_verified && x.decoded_audio_verified && x.human_listen_through_passed && typeof x.sha256==='string' && /^[0-9a-f]{64}$/i.test(x.sha256) && typeof x.duration_seconds==='number' && x.duration_seconds>0 && typeof x.asset_id==='string' && x.asset_id.length>0;
 if(x.playback_enabled)assert(verified,'Unsafe active player '+key);
 if(x.completion==='accepted')assert(verified,'Audio marked accepted without evidence: '+key);
 assert.equal(x.playback_enabled,false);
 assert.equal(x.completion,'pending');
}
for(const id of src)for(const segment of ['dialogue','reading'])assert(keys.has(id+':'+segment));
assert.equal(p.aggregate.required_segment_slots,24);
assert.equal(p.aggregate.fully_accepted_segments,0);
assert.equal(p.aggregate.lessons_with_complete_verified_audio,0);
const raw=JSON.stringify(p);
for(const forbidden of ['docs.google.com/document/d/','drive.google.com/drive/folders/','service_role','refresh_token'])assert(!raw.includes(forbidden));
console.log('A1 audio contract valid: 24 distinct dialogue/reading slots, no unaudited playable audio.');

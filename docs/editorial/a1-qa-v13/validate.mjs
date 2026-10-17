import {readFileSync} from 'node:fs';
import {strict as assert} from 'node:assert';
const load=p=>JSON.parse(readFileSync(new URL(p,import.meta.url),'utf8'));
const m=load('./manifest.json');
const c=load('../../../config/curriculum/units.v2.json');
const catalogIds=new Set(c.units.filter(x=>x.language==='fr'&&x.level==='A1').map(x=>x.id));
assert.equal(catalogIds.size,12);
assert.equal(m.units.length,12);
assert.equal(m.metrics.unique_units_audited,12);
assert.equal(m.metrics.source_six_stage_present,12);
assert.equal(m.metrics.existing_answer_key_present,12);
const seen=new Set(),issues=new Set(m.issues.map(x=>x.issue_id));
assert.equal(issues.size,m.issues.length);
for(const x of m.units){
 assert(catalogIds.has(x.unit_id),'Unknown A1 '+x.unit_id);
 assert(!seen.has(x.unit_id),'Duplicate A1 '+x.unit_id);seen.add(x.unit_id);
 for(const k of ['six_stage_structure_found','answer_key_present','original_source_preserved'])assert.equal(x[k],true);
 for(const k of ['exact_audio_verified','proposed_corrections_merged','qualified_QA_approved','text_complete','publishable'])assert.equal(x[k],false);
 assert.equal(x.exact_audio_asset_id,null);
 for(const issue of x.issue_ids)assert(issues.has(issue),'Broken issue reference '+issue);
}
for(const p of m.issues){
 assert(catalogIds.has(p.unit_id));
 assert.equal(p.status,'proposed_pending_owner_editorial_merge');
 assert(typeof p.old_text==='string'&&p.old_text.length>3);
 assert(typeof p.preferred_text==='string'&&p.preferred_text.length>3);
}
const a=m.source_asset_inventory;
assert.equal(a.francais_interactif_phonetics_archives,14);
assert.equal(a.francais_interactif_vocabulary_archives,14);
assert.equal(a.inspire_a1_archives,3);
assert.equal(a.zip_archives_metadata_observed,14+14+3);
for(const k of ['individual_track_sha256_verified','per_unit_transcript_aligned','per_unit_licence_review_approved','playback_verified'])assert.equal(a[k],false);
assert.equal(m.metrics.exact_audio_matches_verified_in_this_audit,0);
const raw=JSON.stringify(m);
for(const key of ['docs.google.com/document/d/','drive.google.com/drive/folders/','service_role','refresh_token'])assert(!raw.includes(key),'Public metadata leak '+key);
console.log('A1 V1.3 checked: 12 stage+answer sources, 7 editorial issues, 31 candidate archives, zero falsely verified matching audio.');

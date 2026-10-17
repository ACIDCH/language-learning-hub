import {readFileSync} from 'node:fs';
import {strict as assert} from 'node:assert';
const m=JSON.parse(readFileSync(new URL('./audio-sample-qc.json',import.meta.url),'utf8'));
assert.equal(m.audit.sample_archives,3);
assert.equal(m.audit.real_audio_candidates,12);
assert.equal(m.audit.real_audio_decoded,12);
assert.equal(m.audit.appledouble_fake_mp3_excluded,6);
assert.equal(m.audit.per_lesson_exact_matches,0);
assert.equal(m.archive_summaries.length,3);
assert.equal(m.tracks.length,12);
const ids=new Set(),archives=new Set(m.archive_summaries.map(x=>x.archive));
assert.equal(archives.size,3);
for(const a of m.archive_summaries){
 assert.match(a.sha256,/^[a-f\d]{64}$/);
 assert.equal(a.crc_ok,true);
}
for(const t of m.tracks){
 assert(archives.has(t.archive));
 const key=t.archive+':'+t.entry;assert(!ids.has(key));ids.add(key);
 assert(!t.entry.startsWith('__MACOSX/'));
 assert(!t.entry.split('/').at(-1).startsWith('._'));
 assert.match(t.sha256,/^[a-f\d]{64}$/);
 assert(t.duration_s>0&&t.duration_s<3600);
 assert.equal(t.sample_rate_hz,44100);
 assert.equal(t.decoded_audio_stream,true);
 assert.equal(t.exact_lesson_text_match_verified,false);
 assert.equal(t.redistribution_rights_verified,false);
}
const raw=JSON.stringify(m);
for(const x of ['docs.google.com/document/d/','drive.google.com/drive/folders/','service_role','refresh_token'])assert(!raw.includes(x));
console.log('A1 real ZIP sample: 12 decodable MP3s, 6 AppleDouble pseudo-media excluded, zero falsely matched course audio.');

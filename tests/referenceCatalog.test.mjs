import test from 'node:test';
import assert from 'node:assert/strict';
import {identifyReference,referenceCounts,REFERENCES} from '../src/referenceCatalog.ts';
import {readFileSync} from 'node:fs';
test('known FI and publisher assets are attributed rather than mis-labeled as original',()=>{
 assert.equal(identifyReference({asset_id:'pho_01.zip/pho_01/002.mp3',source_kind:'open_reference'}),'fi-phonetics');
 assert.equal(identifyReference({asset_id:'voc_04.zip/voc_04/004.mp3',source_kind:'open_reference'}),'fi-vocabulary');
 assert.equal(identifyReference({asset_id:'Inspire-A1-official-audio-part-01.zip/file.mp3',source_kind:'open_reference'}),'inspire-a1');
 assert.equal(identifyReference({asset_id:'fr-a1-u01-dialogue',source_kind:'synthetic_practice'}),'unclassified');
});
test('all 353 known external references can be grouped without guessing alignment',()=>{
 const groups=[
  ...Array.from({length:83},(_,i)=>({asset_id:'pho_01.zip/pho_01/'+i+'.mp3',source_kind:'open_reference'})),
  ...Array.from({length:104},(_,i)=>({asset_id:'voc_01.zip/voc_01/'+i+'.mp3',source_kind:'open_reference'})),
  ...Array.from({length:166},(_,i)=>({asset_id:'Inspire-A1-official-audio-part-01.zip/'+i+'.mp3',source_kind:'open_reference'}))
 ];
 const counts=referenceCounts(groups);
 assert.equal(counts['fi-phonetics'],83);assert.equal(counts['fi-vocabulary'],104);
 assert.equal(counts['inspire-a1'],166);
 assert.equal(Object.values(counts).reduce((a,b)=>a+b,0),353);
 assert.match(REFERENCES['inspire-a1'].rights,/商业/);
});
test('linked FI vocabulary samples are exactly 12, are metadata rather than private file IDs',()=>{
 const mapped=JSON.parse(readFileSync('config/assets/lesson-audio.json','utf8'));
 assert.equal(mapped.mappings.length,12);
 assert.ok(mapped.mappings.every(a=>a.lesson_id.startsWith('fr-a1-u')&&a.source_url.startsWith('https://media.la.utexas.edu')));
 assert.ok(mapped.mappings.every(a=>a.license==='CC-BY-3.0'));
});

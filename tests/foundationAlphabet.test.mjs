import test from 'node:test';
import assert from 'node:assert/strict';
import {ENGLISH_LETTERS,FRENCH_LETTERS,FRENCH_DIACRITICS,alphabetFor} from '../src/foundationAlphabet.ts';
import {FOUNDATION_UNITS} from '../src/foundationCurriculum.ts';
test('both alphabets have exactly the standard 26 A-Z letters in order',()=>{
 const symbols=Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
 for(const list of [ENGLISH_LETTERS,FRENCH_LETTERS]){
  assert.deepEqual(list.map(x=>x.letter),symbols);
  for(const row of list){
   assert.ok(row.ipa.startsWith('/')&&row.ipa.endsWith('/'),row.letter);
   assert.ok(row.name.trim()&&row.example.trim(),row.letter);
  }
 }
 assert.equal(alphabetFor('en'),ENGLISH_LETTERS);
 assert.equal(alphabetFor('fr'),FRENCH_LETTERS);
});
test('letter-name distinctions explicitly teach regional and French contrasts',()=>{
 assert.equal(ENGLISH_LETTERS[25].ipa,'/ziː/');
 assert.equal(FRENCH_LETTERS[4].ipa,'/ə/');
 assert.equal(FRENCH_LETTERS[16].ipa,'/ky/');
 assert.equal(FRENCH_LETTERS[20].ipa,'/y/');
 assert.equal(FRENCH_DIACRITICS.length,8);
 assert.ok(FRENCH_DIACRITICS.some(x=>x.symbol==='ç'&&x.example==='garçon'));
});
test('alphabet drills attach to the genuine first foundation units',()=>{
 const en=FOUNDATION_UNITS.find(x=>x.id==='en-fnd-01');
 const fr=FOUNDATION_UNITS.find(x=>x.id==='fr-fnd-01');
 assert.ok(en?.title.includes('字母'));
 assert.ok(fr?.title.includes('字母'));
});

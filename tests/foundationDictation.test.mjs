import test from 'node:test';
import assert from 'node:assert/strict';
import {dictationTokens,compareDictation} from '../src/foundationDictation.ts';
import {FOUNDATION_UNITS} from '../src/foundationCurriculum.ts';
test('all 24 units provide a writable original listening reference',()=>{
 assert.equal(FOUNDATION_UNITS.length,24);
 for(const u of FOUNDATION_UNITS){
  assert.ok(dictationTokens(u.listening,u.language).length>=4,u.id);
  const r=compareDictation(u.listening,u.listening,u.language);
  assert.equal(r.wordEdits,0,u.id);assert.equal(r.exact,true,u.id);
 }
});
test('French apostrophes, punctuation and case are normalized, accents are not erased',()=>{
 assert.deepEqual(dictationTokens('L’EAU, c’est bon !','fr'),["l'eau","c'est","bon"]);
 assert.equal(compareDictation("L'EAU c'est BON!","l’eau, c’est bon.",'fr').wordEdits,0);
 assert.equal(compareDictation('ou','où','fr').wordEdits,1);
});
test('word edit distance handles missing, extra and changed words',()=>{
 assert.deepEqual(compareDictation('I want tea','I want a cup of tea','en'),{
  referenceWords:6,writtenWords:3,wordEdits:3,exact:false});
 assert.equal(compareDictation('hello there','hello','en').wordEdits,1);
 assert.equal(compareDictation('one two','one too','en').wordEdits,1);
 assert.equal(compareDictation('','', 'en').exact,false);
});

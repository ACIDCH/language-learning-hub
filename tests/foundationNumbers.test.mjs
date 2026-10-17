import test from 'node:test';
import assert from 'node:assert/strict';
import {ENGLISH_CARDINALS,FRENCH_CARDINALS,foundationCardinals} from '../src/foundationNumbers.ts';
import {compareDictation} from '../src/foundationDictation.ts';
import {FOUNDATION_UNITS} from '../src/foundationCurriculum.ts';
test('English and French have exactly one canonical 0-30 entry for every number',()=>{
 for(const list of [ENGLISH_CARDINALS,FRENCH_CARDINALS]){
  assert.equal(list.length,31);
  assert.deepEqual(list.map(item=>item.value),Array.from({length:31},(_,i)=>i));
  assert.equal(new Set(list.map(x=>x.text)).size,31);
  assert.ok(list.every(x=>x.text.trim().length>0));
 }
 assert.equal(foundationCardinals('en'),ENGLISH_CARDINALS);
 assert.equal(foundationCardinals('fr'),FRENCH_CARDINALS);
});
test('irregular spelling and permitted French hyphen variants are preserved',()=>{
 assert.equal(ENGLISH_CARDINALS[13].text,'thirteen');
 assert.equal(ENGLISH_CARDINALS[30].text,'thirty');
 assert.equal(FRENCH_CARDINALS[21].text,'vingt et un');
 assert.equal(compareDictation('vingt-et-un',FRENCH_CARDINALS[21].text,'fr').wordEdits,0);
 assert.equal(compareDictation('twenty one',ENGLISH_CARDINALS[21].text,'en').wordEdits,0);
 assert.equal(compareDictation('dix-huit','dix-sept','fr').wordEdits,1);
});
test('number drills are tied to the existing target lesson topics',()=>{
 const en=FOUNDATION_UNITS.find(x=>x.id==='en-fnd-05');
 const fr=FOUNDATION_UNITS.find(x=>x.id==='fr-fnd-06');
 assert.ok(en?.title.includes('数字'));
 assert.ok(fr?.title.includes('数字'));
});

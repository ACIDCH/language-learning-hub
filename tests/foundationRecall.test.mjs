import test from 'node:test';
import assert from 'node:assert/strict';
import {cardsForLesson,recallSummary,moveToNext} from '../src/foundationRecall.ts';
import {FOUNDATION_UNITS} from '../src/foundationCurriculum.ts';
test('all 24 short foundation lessons have concrete reviewable vocabulary',()=>{
 assert.equal(FOUNDATION_UNITS.length,24);
 for(const u of FOUNDATION_UNITS){
  const cards=cardsForLesson(u.id,u.vocab);
  assert.ok(cards.length>=4);
  assert.equal(new Set(cards.map(x=>x.key)).size,cards.length);
  assert.ok(cards.every(c=>c.term.length>0&&c.meaning.length>0));
 }
});
test('ratings never equate self-rated recall with automatic proficiency score',()=>{
 const cards=cardsForLesson('en-fnd-01',[['letter','字母'],['spell','拼写']]);
 assert.equal(moveToNext(cards,{})?.term,'letter');
 assert.equal(recallSummary(cards,{[cards[0].key]:0}).retry,1);
 assert.equal(moveToNext(cards,{[cards[0].key]:0})?.term,'spell');
 assert.equal(recallSummary(cards,{[cards[0].key]:0,[cards[1].key]:2}).complete,true);
});

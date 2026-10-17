import test from 'node:test';import assert from 'node:assert/strict';
import {FOUNDATION_UNITS} from '../src/foundationCurriculum.ts';
import {makeVocabularyChecks} from '../src/foundationQuiz.ts';
test('all 24 English/French lessons get four genuinely answered vocabulary checks',()=>{
 assert.equal(FOUNDATION_UNITS.length,24);
 let count=0;
 for(const unit of FOUNDATION_UNITS){
  const quiz=makeVocabularyChecks(unit.vocab);
  assert.equal(quiz.length,4,unit.id);
  for(const question of quiz){
   assert.equal(question.choices.length,3,unit.id);
   assert.equal(new Set(question.choices).size,3,unit.id);
   const real=unit.vocab.find(([word])=>word===question.term)?.[1];
   assert.equal(question.choices[question.answer],real,unit.id);
  }
  count+=quiz.length;
 }
 assert.equal(count,96);
});
test('honest fallback when there are fewer than three distinct meanings',()=>{
 assert.equal(makeVocabularyChecks([['a','一个'],['b','一个'],['c','一个']]).length,0);
});

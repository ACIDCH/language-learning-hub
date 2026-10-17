import test from 'node:test';
import assert from 'node:assert/strict';
import {FOUNDATION_UNITS,foundationUnitsFor,validateFoundationUnits} from '../src/foundationCurriculum.ts';
test('48 distinct original and bridge lessons have six-stage teaching coverage',()=>{
 assert.equal(FOUNDATION_UNITS.length,48);
 assert.deepEqual(validateFoundationUnits(FOUNDATION_UNITS),[]);
 assert.equal(foundationUnitsFor('en').length,24);
 assert.equal(foundationUnitsFor('fr').length,24);
});
test('every multiple choice prompt has exactly one documented answer',()=>{
 for(const unit of FOUNDATION_UNITS){
  assert.equal(unit.questions.length,2,unit.id);
  for(const q of unit.questions){
   assert.equal(q.choices.length,3,unit.id);
   assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<=2,unit.id);
   assert.ok(q.choices[q.answer].trim(),unit.id);
   assert.ok(q.explanation.trim().length>=5,unit.id);
  }
 }
});
test('each unit has at least four original lexical examples, listening, reading, production and pronunciation guidance',()=>{
 for(const unit of FOUNDATION_UNITS){
  assert.ok(unit.vocab.length>=4,unit.id);
  assert.equal(unit.concepts.length,3,unit.id);
  assert.ok(unit.reading.length>=70,unit.id);
  assert.ok(unit.listening.length>=20,unit.id);
  assert.ok(unit.production.length>=20,unit.id);
  assert.ok(unit.pronunciation.length>=20,unit.id);
  assert.ok(unit.commonMistake.length>=15,unit.id);
 }
});
test("beginner lessons preserve learner's requested progression without inventing certification",()=>{
 const en=foundationUnitsFor('en');
 const fr=foundationUnitsFor('fr');
 assert.equal(en[0].id,'en-fnd-01');assert.equal(fr[0].id,'fr-fnd-01');
 assert.ok(en[0].title.includes('字母'));
 assert.ok(fr[0].title.includes('字母'));
 assert.ok(en[11].production.includes('70–100'));
 assert.ok(fr[11].production.includes('60–90'));
});
test('bad or duplicated IDs cannot silently pass the curriculum validator',()=>{
 const broken=[...FOUNDATION_UNITS,{...FOUNDATION_UNITS[0]}];
 assert.ok(validateFoundationUnits(broken).length>0);
});

test('all A2 bridge IDs 13–24 provide nonempty scenario and explained questions',()=>{
 for(const lang of ['en','fr'])for(let i=13;i<=24;i++){
   const id=lang+'-fnd-'+String(i).padStart(2,'0');
   const unit=FOUNDATION_UNITS.find(x=>x.id===id);
   assert.ok(unit,id);assert.ok(unit.reading.length>=100,id);
   assert.ok(unit.questions.every(q=>q.choices[q.answer].trim().length>0),id);
 }
});

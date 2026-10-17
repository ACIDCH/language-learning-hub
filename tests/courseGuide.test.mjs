import test from 'node:test';import assert from 'node:assert/strict';
import {getUnitGuide,countGuideCompleted,validateGuideCoverage} from '../src/courseGuide.ts';
test('all 108 V4 metadata objectives remain mapped with valid prerequisites',()=>{
 const status=validateGuideCoverage();
 assert.equal(status.courses,108);
 assert.deepEqual(status.errors,[]);
});
test('actual French starter and English IELTS units have useful skills and tasks',()=>{
 const french=getUnitGuide('fr-a1-u01');
 const english=getUnitGuide('en-ielts-reading-u01');
 assert.equal(french?.language,'fr');assert.equal(english?.language,'en');
 assert.ok((french?.grammar.length??0)>0);
 assert.ok((english?.performance_task.length??0)>20);
 assert.equal(getUnitGuide('en-fnd-01'),null);
});
test('review evidence does not change course QA, tracks only explicit self checks',()=>{
 assert.equal(countGuideCompleted({}),0);
 assert.equal(countGuideCompleted({grammar:true,vocabulary:true,production:false}),2);
 assert.equal(countGuideCompleted({grammar:true,vocabulary:true,production:true}),3);
});

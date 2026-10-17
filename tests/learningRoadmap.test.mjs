import test from 'node:test';import assert from 'node:assert/strict';
import {orderedCourses,planNext,LEARNING_LADDER} from '../src/learningRoadmap.ts';
const courses=[
 {id:'fr-b1-u01',language:'fr',level:'B1',track:null,title:'B1',unit:1},
 {id:'fr-a1-u02',language:'fr',level:'A1',track:null,title:'A1.2',unit:2},
 {id:'fr-a1-u01',language:'fr',level:'A1',track:null,title:'A1.1',unit:1},
 {id:'en-ielts-reading-u02',language:'en',level:'B1-B2',track:'reading',title:'Read 2',unit:2},
 {id:'en-ielts-reading-u01',language:'en',level:'B1-B2',track:'reading',title:'Read 1',unit:1},
 {id:'en-ielts-listening-u01',language:'en',level:'B1-B2',track:'listening',title:'Listen',unit:1}
];
test('French course order obeys CEFR then ascending unit',()=>{
 assert.deepEqual(orderedCourses(courses,'fr').map(c=>c.id),
 ['fr-a1-u01','fr-a1-u02','fr-b1-u01']);
});
test('English tracks remain separate and numerically ordered',()=>{
 assert.deepEqual(orderedCourses(courses,'en','reading').map(c=>c.id),
 ['en-ielts-reading-u01','en-ielts-reading-u02']);
});
test('next lesson selects first not actually marked completed',()=>{
 const ordered=orderedCourses(courses,'fr');
 const p=planNext(ordered,[
  {course_id:'fr-a1-u01',state:{completed:true}},
  {course_id:'fr-a1-u02',state:{notes:'unfinished'}},
  {course_id:'fr-b1-u01',state:{completed:false}}
 ]);
 assert.equal(p.completed,1);assert.equal(p.next?.id,'fr-a1-u02');assert.equal(p.total,3);
});
test('empty plan does not claim completions',()=>{
 assert.deepEqual(planNext([],[]),{next:null,completed:0,total:0});
 assert.equal(LEARNING_LADDER.length,6);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {summarizeProgress,findLastCourse} from '../src/learningProgress.ts';
const catalog=[
 {id:'fr-a1-u01',language:'fr',level:'A1',title:'Bonjour'},
 {id:'fr-a1-u02',language:'fr',level:'A1',title:'Introductions'},
 {id:'en-ielts-reading-u01',language:'en',level:'IELTS',title:'Reading'}];
test('overview counts saved and truly completed distinct catalog courses',()=>{
 const rows=[
  {course_id:'fr-a1-u01',state:{completed:true},updated_at:'2026-10-18T01:00:00Z'},
  {course_id:'fr-a1-u01',state:{completed:true},updated_at:'2026-10-17T01:00:00Z'},
  {course_id:'fr-a1-u02',state:{completed:false},updated_at:'2026-10-18T04:00:00Z'},
  {course_id:'en-ielts-reading-u01',state:{notes:'hello'},updated_at:'2026-10-18T03:00:00Z'},
  {course_id:'outside-unknown',state:{completed:true},updated_at:'2026-10-19T00:00:00Z'}
 ];
 const result=summarizeProgress(catalog,rows);
 assert.equal(result.saved,3);assert.equal(result.completed,1);
 assert.equal(result.frenchSaved,2);assert.equal(result.englishSaved,1);
 assert.equal(result.lastCourseId,'fr-a1-u02');
 assert.equal(findLastCourse(catalog,rows)?.title,'Introductions');
});
test('untrusted states, invalid timestamps and unknown course IDs are safely ignored',()=>{
 const r=summarizeProgress(catalog,[
  {course_id:'fr-a1-u01',state:null,updated_at:'invalid'},
  {course_id:'fr-a1-u02',state:'not-an-object',updated_at:'2026-10-18T00:00:00Z'},
  {course_id:'unknown',state:{completed:true},updated_at:'2026-10-18T05:00:00Z'}
 ]);
 assert.equal(r.saved,2);assert.equal(r.completed,0);
 assert.equal(r.lastCourseId,'fr-a1-u02');
});
test('empty accounts show no invented prior lesson',()=>{
 const r=summarizeProgress(catalog,[]);
 assert.deepEqual(r,{saved:0,completed:0,englishSaved:0,frenchSaved:0,
   lastCourseId:null,lastSavedAt:null});
});

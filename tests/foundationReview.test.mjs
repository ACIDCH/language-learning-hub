import test from 'node:test';
import assert from 'node:assert/strict';
import {buildFoundationReviewPlan} from '../src/foundationReview.ts';
import {FOUNDATION_UNITS} from '../src/foundationCurriculum.ts';
const now=new Date('2026-10-18T09:00:00Z');
const unit=FOUNDATION_UNITS[0];
const fullCorrect={};
for(let i=0;i<unit.questions.length;i++)fullCorrect[String(i)]=unit.questions[i].answer;
test('unused units remain unstarted and not due',()=>{
 const result=buildFoundationReviewPlan(FOUNDATION_UNITS,{},now);
 assert.equal(result.length,48);
 assert.equal(result.filter(r=>r.status==='unstarted').length,48);
});
test('incomplete attempt is due, not falsely marked reviewed',()=>{
 const rows=buildFoundationReviewPlan([unit],{[unit.id]:{
  lesson_id:unit.id,answers:{},notes:'',completed:false,updated_at:now.toISOString()
 }},now);
 assert.equal(rows[0].status,'due');
 assert.match(rows[0].reason,/待完成/);
});
test('finished lessons follow conservative time-based reminders',()=>{
 const record={lesson_id:unit.id,answers:fullCorrect,notes:'',completed:true,updated_at:'2026-10-17T09:00:00Z'};
 assert.equal(buildFoundationReviewPlan([unit],{[unit.id]:record},now)[0].status,'upcoming');
 record.updated_at='2026-10-14T09:00:00Z';
 assert.equal(buildFoundationReviewPlan([unit],{[unit.id]:record},now)[0].status,'due');
});
test('wrong attempts prompt review even when recently saved',()=>{
 const record={lesson_id:unit.id,answers:{'0':(unit.questions[0].answer+1)%3},notes:'',completed:true,updated_at:now.toISOString()};
 const row=buildFoundationReviewPlan([unit],{[unit.id]:record},now)[0];
 assert.equal(row.status,'due');assert.match(row.reason,/需要复习/);
});

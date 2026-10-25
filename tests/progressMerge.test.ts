import {expect,it} from 'vitest';
import {mergeProgressDraft} from '../src/progressMerge';
import {mergeLearningState} from '../src/useCourseProgress';

it('preserves independent remote answers, completed practice and local edits when reconciling two-device drafts',()=>{
 const cloud={
  stage:3,notes:'cloud note',answers:{'0':1,'1':2},
  studyResponses:{'lesson:summary':'cloud summary','lesson:q1':'correct'},
  practiceChecklist:{reading:true,speaking:false},
  opaqueExtension:{source:'unchanged'},mediaIds:['source-1','source-2']
 };
 const local={
  notes:'edited on local device',answers:{'1':3},
  studyResponses:{'lesson:q1':'revised locally'},
  practiceChecklist:{speaking:true},mediaIds:['local-only']
 };
 const merged=mergeProgressDraft(cloud,local);
 expect(merged).toEqual({
  stage:3,notes:'edited on local device',answers:{'0':1,'1':3},
  studyResponses:{'lesson:summary':'cloud summary','lesson:q1':'revised locally'},
  practiceChecklist:{reading:true,speaking:true},
  opaqueExtension:{source:'unchanged'},mediaIds:['local-only']
 });
 expect(cloud.answers['1']).toBe(2);
 expect(cloud.practiceChecklist.speaking).toBe(false);
 expect(local.studyResponses['lesson:q1']).toBe('revised locally');
});
it('the hook and old cloud workspace share the same non-destructive progress merge behavior',()=>{
 const existing={practiceChecklist:{read:true,listen:true},studyResponses:{a:'one',b:'two'},stage:1};
 const changes={practiceChecklist:{listen:false},studyResponses:{b:'updated'}};
 expect(mergeLearningState(existing,changes)).toEqual({
  practiceChecklist:{read:true,listen:false},
  studyResponses:{a:'one',b:'updated'},stage:1
 });
});
it('never coerces arrays or explicitly empty records into inferred progress',()=>{
 const existing={mediaIds:['earlier'],answers:{'0':3}};
 const result=mergeProgressDraft(existing,{mediaIds:[],answers:{}});
 expect(result.mediaIds).toEqual([]);
 expect(result.answers).toEqual({'0':3});
});

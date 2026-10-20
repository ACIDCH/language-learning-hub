import test from 'node:test';
import assert from 'node:assert/strict';
import {splitLessonStages} from '../src/lessonStages.ts';

const full='Introduction to the lesson\n\n① 情境与学习目标\nBonjour.\n② 语法\nêtre : je suis.\n③ 词汇\nBonjour = hello.\n④ 听读\nDialogue.\n⑤ 发音\nVowels.\n⑥ 表达\nWrite a paragraph.';
test('splits original manuscript into exactly six accessible stages',()=>{
 const v=splitLessonStages(full);
 assert.equal(v.structured,true);
 assert.equal(v.preamble,'Introduction to the lesson');
 assert.equal(v.stages.length,6);
 assert.equal(v.stages[1].heading,'语法');
 assert.equal(v.stages[1].body,'être : je suis.');
 assert.equal(v.stages[5].body,'Write a paragraph.');
});
test('accepts Windows CRLF manuscripts and original English headings',()=>{
 const v=splitLessonStages(full.replaceAll('\n','\r\n').replace('① 情境与学习目标','① CONTEXT / GOAL'));
 assert.equal(v.stages.length,6);assert.equal(v.stages[0].heading,'CONTEXT / GOAL');
});
test('never discards malformed material',()=>{
 const body='Unstructured but still important lesson content';
 const v=splitLessonStages(body);
 assert.equal(v.structured,false);
 assert.equal(v.stages[0].body,body);
});
test('rejects duplicate or out of order headings by falling back to full text',()=>{
 const text=full.replace('③ 词汇','② repeated');
 const v=splitLessonStages(text);
 assert.equal(v.structured,false);
 assert.equal(v.stages[0].body,text);
});

test('recognizes original Markdown numbered manuscript sections and skips archived phonetic section in navigation',async()=>{
 const {moveStudyStage,visibleStudyStage,STUDY_STAGES}=await import('../src/lessonStages.ts');
 const markdown=full.replaceAll('①','## ①').replaceAll('②','## ②')
 .replaceAll('③','## ③').replaceAll('④','## ④').replaceAll('⑤','## ⑤').replaceAll('⑥','## ⑥');
 const lesson=splitLessonStages(markdown);
 assert.equal(lesson.structured,true);
 assert.equal(lesson.stages.length,6);
 assert.deepEqual(STUDY_STAGES,[0,1,2,3,5]);
 assert.equal(moveStudyStage(3,1),5);
 assert.equal(moveStudyStage(5,-1),3);
 assert.equal(visibleStudyStage(4),5);
});

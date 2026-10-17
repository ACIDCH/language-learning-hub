import test from 'node:test';
import assert from 'node:assert/strict';
import {analyzeTranscript} from '../src/speechCompare.ts';
import {learnerCoaching,appendAttempt} from '../src/speechCoach.ts';
import {lessonPractice} from '../src/speechLesson.ts';

test('keeps ordinary feedback separate from professional speaking scores',()=>{
 const report=analyzeTranscript('Je voudrais un café','Je voudrais un thé');
 const feedback=learnerCoaching(report,'Je voudrais un café');
 assert.equal(feedback.readyForNext,false);
 assert.deepEqual(feedback.focusWords,['café']);
 assert.match(feedback.instruction,/识别差异/);
 const same=learnerCoaching(analyzeTranscript('Bonjour, Chloé','bonjour Chloe'),'Bonjour, Chloé');
 assert.equal(same.readyForNext,true);
 assert.match(same.instruction,/不代表口音/);
});
test('keeps at most five ephemeral attempts per exercise',()=>{
 let recent=[];for(let i=0;i<9;i++)recent=appendAttempt(recent,{id:i,target:'pain',heard:'pain',match:true});
 assert.deepEqual(recent.map(x=>x.id),[4,5,6,7,8]);
});
test('extracts current-course phrases, excluding Chinese instructions and links',()=>{
 const t='① 情境\n中文说明 Bonjour\nRéponse : oui\nÉmilie est là.\nJ’aime l’école.\nhttps://example.com';
 assert.deepEqual(lessonPractice(t,'sentence'),['Émilie est là.','J’aime l’école.']);
 assert.ok(lessonPractice(t,'word').includes('l’école'));
});
test('supports word, sentence and paragraph levels with bounded presets',()=>{
 const t='This is a sufficiently long paragraph for a short reading practice. Another sentence.';
 assert.equal(lessonPractice(t,'paragraph').length,1);
 assert.equal(lessonPractice(t,'sentence').length,2);
 assert.ok(lessonPractice(t,'word').length<=20);
});
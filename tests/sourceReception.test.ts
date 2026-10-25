import {expect,it} from 'vitest';
import {readFileSync} from 'node:fs';
import {RECEPTION_LESSONS} from '../src/receptionLessons';
it('retains Reading U02 original A–F paragraphs, units, answers and conditional recommendation',()=>{
 const source=readFileSync('public/learning-assets/en-ielts-reading-u02-v1.txt','utf8');
 const original=[...source.matchAll(/\*\*([A-F])\.\*\* ([^\r\n]+)/g)].map(m=>({id:m[1],target:m[2]}));
 const lesson=RECEPTION_LESSONS['en-ielts-reading-u02'];
 expect(lesson.paragraphs.map(({id,target})=>({id,target}))).toEqual(original);
 expect(lesson.questions[1].answer).toContain('Not Given');
 expect(lesson.questions[1].evidence).toEqual(['B']);
 expect(lesson.questions[2].answer).toContain('36 of 60');
 expect(lesson.questions[4].answer).toContain('desk closed at eight');
 expect(lesson.questions[5].answer).toContain('Not Given');
 expect(lesson.model.split(/\s+/).length).toBeGreaterThanOrEqual(130);
 expect(lesson.model.split(/\s+/).length).toBeLessThanOrEqual(170);
 expect(lesson.paragraphs[3].zh).toContain('并不能证明');
});
it('preserves Reading U01 main/addendum boundaries and all source sentences',()=>{
 const source=readFileSync('public/learning-assets/en-ielts-reading-u01.txt','utf8');
 const lesson=RECEPTION_LESSONS['en-ielts-reading-u01'];
 expect(lesson.paragraphs.map(p=>p.id)).toEqual(['MAIN','ADD1','ADD2','ADD3']);
 for(const p of lesson.paragraphs)expect(source.includes(p.target)).toBe(true);
 expect(lesson.questions[0].evidence).toEqual(['MAIN']);
 expect(lesson.questions[1].answer).toContain('difficulty');
 expect(lesson.paragraphs[2].zh).toContain('回应的机会');
 expect(lesson.paragraphs[3].zh).toContain('隐私和公平');
});
it('extends the tree lecture without replacing may with measured success',()=>{
 const lesson=RECEPTION_LESSONS['en-ielts-listening-u01'];
 expect(lesson.paragraphs[1].target).toContain('may help reduce heat');
 expect(lesson.paragraphs[2].target).toContain('water, space and the choice of species');
 expect(lesson.questions[3].answer).toContain('Survival rates');
 expect(lesson.model).toContain('does not give a measured temperature change');
 expect(lesson.paragraphs.map(p=>p.target).join(' ').split(/\s+/).length).toBeGreaterThan(350);
});


it('IELTS Listening U04–U06 preserves route scope, Friday-inclusive deadline and pending results',()=>{
 const route=RECEPTION_LESSONS['en-ielts-listening-u04'];
 expect(route.paragraphs[0].target).toContain('the entrance used by visitors today');
 expect(route.paragraphs[0].zh).toContain('这是今天供访客入园的入口');
 expect(route.paragraphs[0].zh).not.toContain('访客都从这里入园');
 expect(route.questions[0].evidence).toEqual(['P1']);

 const booking=RECEPTION_LESSONS['en-ielts-listening-u05'];
 expect(booking.paragraphs[2].target).toContain('by Friday');
 expect(booking.paragraphs[3].target).toContain('by Friday');
 for(const zh of [booking.paragraphs[2].zh,booking.paragraphs[3].zh,booking.modelZh]){
  expect(zh).toContain('最迟');
  expect(zh).toContain('周五');
  expect(zh).not.toContain('周五前');
 }
 expect(booking.questions[2].answer).toContain('deposit');
 expect(booking.questions[2].answer).toContain('not the total');

 const lab=RECEPTION_LESSONS['en-ielts-listening-u06'];
 expect(lab.paragraphs[3].target).toContain('not yet been measured');
 expect(lab.paragraphs[3].zh).toContain('不能');
 expect(lab.languageNotes.find(note=>note.target.includes('measurement method as well as the result'))?.zh).toContain('待测');
 expect(lab.languageNotes.map(note=>note.zh).join(' ')).not.toContain('两栏都必填');
 expect(lab.questions[3].evidence).toEqual(['P4']);
});


it('IELTS Task 1 keeps category shares distinct from loan counts and drying distinct from pressing',()=>{
 const shares=RECEPTION_LESSONS['en-ielts-writing-task1-u07'];
 expect(shares.paragraphs[2].target).toContain('The paper-borrowing share declined, while the digital-borrowing share increased');
 expect(shares.paragraphs[2].zh).toContain('纸本借阅占比下降，而数字借阅占比上升');
 expect(shares.paragraphs[3].target).toContain('an increase in a share is not automatically an increase in the number of loans');
 expect(shares.questions[3].answer).toContain('absolute borrowing totals');
 expect(shares.modelZh).toContain('无法确定实际借阅总量');

 const process=RECEPTION_LESSONS['en-ielts-writing-task1-u05'];
 expect(process.paragraphs[2].target).toContain('pressing removes water, whereas drying reduces the remaining moisture');
 expect(process.paragraphs[2].zh).toContain('压出水分并干燥');
 expect(process.paragraphs[2].zh).toContain('裁切再利用');
});


it('provides bilingual IELTS Reading U05–U08 questions and answers without losing evidence or English reading skills',()=>{
 for(const id of ['en-ielts-reading-u05','en-ielts-reading-u06','en-ielts-reading-u07','en-ielts-reading-u08']){
  const lesson=RECEPTION_LESSONS[id];
  expect(lesson.questions,id).toHaveLength(4);
  for(const [i,q] of lesson.questions.entries()){
   const promptParts=q.prompt.split(' / '),answerParts=q.answer.split(' / ');
   expect(promptParts.length,id+' question '+i).toBe(2);
   expect(answerParts.length,id+' answer '+i).toBe(2);
   expect(/[\p{Script=Han}]/u.test(promptParts[1]),id+' Chinese question '+i).toBe(true);
   expect(/[\p{Script=Han}]/u.test(answerParts[1]),id+' Chinese answer '+i).toBe(true);
   expect(q.evidence.length,id+' evidence '+i).toBeGreaterThan(0);
   expect(q.evidence.every(p=>lesson.paragraphs.some(x=>x.id===p)),id+' linked evidence '+i).toBe(true);
   expect(q.why.length,id+' evidence explanation '+i).toBeGreaterThan(30);
  }
 }
 expect(RECEPTION_LESSONS['en-ielts-reading-u06'].questions[1].answer).toContain('not proof of a sole cause');
 expect(RECEPTION_LESSONS['en-ielts-reading-u08'].questions[3].answer).toContain('aggregate gain');
});

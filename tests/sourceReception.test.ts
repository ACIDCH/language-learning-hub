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


it('keeps local-council scope and bus-connection evidence exact in IELTS Reading translations',()=>{
 const grant=RECEPTION_LESSONS['en-ielts-reading-u05'];
 expect(grant.paragraphs[0].target).toContain('An imaginary local council');
 expect(grant.paragraphs[0].zh).toContain('虚构地区的地方议会');
 expect(grant.paragraphs[0].zh).not.toContain('虚构城市的议会');
 const access=RECEPTION_LESSONS['en-ielts-reading-u08'];
 expect(access.paragraphs[2].target).toContain('evening connection involved an additional journey');
 expect(access.paragraphs[2].zh).toContain('晚间接驳还涉及额外一段行程');
 expect(access.paragraphs[2].zh).not.toContain('多走一段路');
 expect(access.questions[2].evidence).toEqual(['P3']);
 expect(access.questions[3].answer).toContain('aggregate gain');
});


it('preserves English answer anchors while supplying Chinese prompts and answers in Listening U04–U08',()=>{
 for(const id of ['en-ielts-listening-u04','en-ielts-listening-u05','en-ielts-listening-u06','en-ielts-listening-u07','en-ielts-listening-u08']){
  const lesson=RECEPTION_LESSONS[id];
  expect(lesson.questions,id).toHaveLength(4);
  for(const [i,q] of lesson.questions.entries()){
   const prompt=q.prompt.split(' / '),answer=q.answer.split(' / ');
   expect(prompt.length,id+' prompt '+i).toBe(2);
   expect(answer.length,id+' answer '+i).toBe(2);
   expect(/[\p{Script=Han}]/u.test(prompt[1]),id+' prompt Chinese '+i).toBe(true);
   expect(/[\p{Script=Han}]/u.test(answer[1]),id+' answer Chinese '+i).toBe(true);
   expect(q.evidence.length,id+' source evidence '+i).toBeGreaterThan(0);
   expect(q.evidence.every(e=>lesson.paragraphs.some(p=>p.id===e)),id+' paragraph links '+i).toBe(true);
  }
 }
 expect(RECEPTION_LESSONS['en-ielts-listening-u05'].questions[2].answer).toContain('by Friday');
 expect(RECEPTION_LESSONS['en-ielts-listening-u05'].questions[2].answer).toContain('最迟周五');
 expect(RECEPTION_LESSONS['en-ielts-listening-u06'].questions[0].answer).toContain('container');
 expect(RECEPTION_LESSONS['en-ielts-listening-u07'].questions[2].answer).toContain('no exact size');
 expect(RECEPTION_LESSONS['en-ielts-listening-u08'].questions[2].answer).toContain('depends on the material');
});


it('preserves IELTS heading choices and T/F/NG grading while showing Chinese equivalents in Reading U03–U04',()=>{
 for(const id of ['en-ielts-reading-u03','en-ielts-reading-u04']){
  const lesson=RECEPTION_LESSONS[id];
  expect(lesson.questions,id).toHaveLength(4);
  for(const [i,q] of lesson.questions.entries()){
   const promptBoundary=q.prompt.lastIndexOf(' / ');
   const questionEnglish=q.prompt.slice(0,promptBoundary),questionChinese=q.prompt.slice(promptBoundary+3);
   const answer=q.answer.split(' / ');
   expect(promptBoundary,id+' question separator '+i).toBeGreaterThan(0);
   expect(questionEnglish.length,id+' original question '+i).toBeGreaterThan(12);
   expect(answer.length,id+' answer '+i).toBe(2);
   expect(/[\p{Script=Han}]/u.test(questionChinese),id+' question translation '+i).toBe(true);
   expect(/[\p{Script=Han}]/u.test(answer[1]),id+' answer translation '+i).toBe(true);
   expect(q.evidence.every(p=>lesson.paragraphs.some(x=>x.id===p)),id+' grounded evidence '+i).toBe(true);
  }
 }
 const heading=RECEPTION_LESSONS['en-ielts-reading-u03'];
 expect(heading.questions.map(q=>q.answer.split(' / ')[0].slice(0,3))).toEqual(['i. ','ii.','iii','iv.']);
 const tfng=RECEPTION_LESSONS['en-ielts-reading-u04'];
 expect(tfng.questions.map(q=>q.answer.split(' / ')[0])).toEqual(['FALSE','TRUE','NOT GIVEN','NOT GIVEN']);
 expect(tfng.questions[2].answer.split(' / ')[1]).toContain('未提及');
});


it('keeps Listening U02–U03 source claims bounded while giving eight complete bilingual evidence answers',()=>{
 for(const id of ['en-ielts-listening-u02','en-ielts-listening-u03']){
  const lesson=RECEPTION_LESSONS[id];
  expect(lesson.questions,id).toHaveLength(4);
  for(const [i,q] of lesson.questions.entries()){
   const promptSeparator=q.prompt.lastIndexOf(' / ');
   const answerSeparator=q.answer.lastIndexOf(' / ');
   expect(promptSeparator,id+' prompt '+i).toBeGreaterThan(0);
   expect(answerSeparator,id+' answer '+i).toBeGreaterThan(0);
   const originalQuestion=q.prompt.slice(0,promptSeparator);
   const chineseQuestion=q.prompt.slice(promptSeparator+3);
   const originalAnswer=q.answer.slice(0,answerSeparator);
   const chineseAnswer=q.answer.slice(answerSeparator+3);
   expect(originalQuestion.length,id+' original question '+i).toBeGreaterThan(25);
   expect(originalAnswer.length,id+' original answer '+i).toBeGreaterThan(4);
   expect(/[\p{Script=Han}]/u.test(chineseQuestion),id+' Chinese prompt '+i).toBe(true);
   expect(/[\p{Script=Han}]/u.test(chineseAnswer),id+' Chinese answer '+i).toBe(true);
   expect(q.evidence.length,id+' evidence count '+i).toBeGreaterThan(0);
   expect(q.evidence.every(e=>lesson.paragraphs.some(p=>p.id===e)),id+' linked evidence '+i).toBe(true);
  }
 }
 const pilot=RECEPTION_LESSONS['en-ielts-listening-u02'];
 expect(pilot.questions[0].answer).toContain('rather than advocate a permanent service');
 expect(pilot.questions[2].answer.split(' / ')[0]).toBe('waiting times; alternative journeys; cancelled trips');
 expect(pilot.questions[3].answer.split(' / ')[0]).toBe('False');
 const workshop=RECEPTION_LESSONS['en-ielts-listening-u03'];
 expect(workshop.questions[0].answer.split(' / ')[0]).toBe('A slight fall (P1).');
 expect(workshop.questions[1].answer).toContain('only several individuals');
 expect(workshop.questions[2].answer).toContain('approval is pending');
 expect(workshop.questions[3].answer).toContain('no online attendance has yet been observed');
});


it('renders IELTS Writing Task 2 U01–U08 with 32 independently readable Chinese evidence question pairs',()=>{
 for(const n of ['01','02','03','04','05','06','07','08']){
  const id='en-ielts-writing-task2-u'+n,lesson=RECEPTION_LESSONS[id];
  expect(lesson,id).toBeDefined();
  expect(lesson.questions,id).toHaveLength(4);
  for(const [i,q] of lesson.questions.entries()){
   const p=q.prompt.lastIndexOf(' / '),a=q.answer.lastIndexOf(' / ');
   expect(p,id+' prompt '+i).toBeGreaterThan(0);
   expect(a,id+' answer '+i).toBeGreaterThan(0);
   const enQuestion=q.prompt.slice(0,p),zhQuestion=q.prompt.slice(p+3);
   const enAnswer=q.answer.slice(0,a),zhAnswer=q.answer.slice(a+3);
   expect(enQuestion.length,id+' English question '+i).toBeGreaterThan(20);
   expect(enAnswer.length,id+' English answer '+i).toBeGreaterThan(18);
   expect(/[\p{Script=Han}]/u.test(zhQuestion),id+' Chinese question '+i).toBe(true);
   expect(/[\p{Script=Han}]/u.test(zhAnswer),id+' Chinese answer '+i).toBe(true);
   expect(q.evidence.length,id+' evidence '+i).toBeGreaterThan(0);
   expect(q.evidence.every(e=>lesson.paragraphs.some(p=>p.id===e)),id+' paragraph anchors '+i).toBe(true);
   expect(q.why.length,id+' explanatory rationale '+i).toBeGreaterThan(35);
  }
 }
 expect(RECEPTION_LESSONS['en-ielts-writing-task2-u01'].questions[1].answer).toContain('outcomes require separate evidence');
 expect(RECEPTION_LESSONS['en-ielts-writing-task2-u03'].questions[2].answer).toContain('complements common tests');
 expect(RECEPTION_LESSONS['en-ielts-writing-task2-u05'].questions[2].answer).toContain('non-digital options');
 expect(RECEPTION_LESSONS['en-ielts-writing-task2-u07'].questions[0].answer).toContain('music tuition itself is free');
 expect(RECEPTION_LESSONS['en-ielts-writing-task2-u08'].questions[0].answer).toContain('universal');
});


it('keeps 32 IELTS Task 1 source-based numeric and diagram answers intact when adding Chinese counterparts',()=>{
 const units=Array.from({length:8},(_,i)=>'en-ielts-writing-task1-u'+String(i+1).padStart(2,'0'));
 for(const id of units){
  const lesson=RECEPTION_LESSONS[id];
  expect(lesson,id).toBeDefined();
  expect(lesson.questions,id).toHaveLength(4);
  for(const [i,q] of lesson.questions.entries()){
   const promptBoundary=q.prompt.lastIndexOf(' / '),answerBoundary=q.answer.lastIndexOf(' / ');
   expect(promptBoundary,id+' prompt '+i).toBeGreaterThan(0);
   expect(answerBoundary,id+' answer '+i).toBeGreaterThan(0);
   const question=q.prompt.slice(0,promptBoundary),questionZh=q.prompt.slice(promptBoundary+3);
   const answer=q.answer.slice(0,answerBoundary),answerZh=q.answer.slice(answerBoundary+3);
   expect(question.length,id+' original prompt '+i).toBeGreaterThan(15);
   expect(answer.length,id+' original answer '+i).toBeGreaterThan(15);
   expect(/[\p{Script=Han}]/u.test(questionZh),id+' Chinese prompt '+i).toBe(true);
   expect(/[\p{Script=Han}]/u.test(answerZh),id+' Chinese answer '+i).toBe(true);
   expect(q.evidence.length,id+' source evidence '+i).toBeGreaterThan(0);
   expect(q.evidence.every(e=>lesson.paragraphs.some(p=>p.id===e)),id+' linked evidence '+i).toBe(true);
  }
 }
 const one=RECEPTION_LESSONS['en-ielts-writing-task1-u01'];
 expect(one.questions[0].answer).toContain('76 thousand digital loans versus 70 thousand printed loans');
 expect(one.questions[3].answer).toContain('approximately 1.90 times');
 const three=RECEPTION_LESSONS['en-ielts-writing-task1-u03'];
 expect(three.questions[0].answer).toContain('25 percentage points');
 expect(three.questions[2].answer).toContain('provides no dates');
 const four=RECEPTION_LESSONS['en-ielts-writing-task1-u04'];
 expect(four.questions[2].answer).toContain('Approximately 33.3%');
 expect(four.questions[3].answer).toContain('total budget');
 const five=RECEPTION_LESSONS['en-ielts-writing-task1-u05'];
 expect(five.questions[2].answer).toContain('cut for reuse, not packed');
 const seven=RECEPTION_LESSONS['en-ielts-writing-task1-u07'];
 expect(seven.questions[3].answer).toContain('absolute borrowing totals');
 const eight=RECEPTION_LESSONS['en-ielts-writing-task1-u08'];
 expect(eight.questions[0].answer).toContain('50% increase relative to 20');
});

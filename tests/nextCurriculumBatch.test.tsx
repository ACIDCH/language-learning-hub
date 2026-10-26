import {FR_A2_KNOWLEDGE} from '../src/frA2KnowledgeSpecialties';
import {FR_A2_GRAMMAR,FR_A2_VOCABULARY} from '../src/frA2Knowledge';
import {it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {SPECIALTY_LESSONS,linkedSpecialties,specialtyQuality} from '../src/specialtyLibrary';
import {RECEPTION_LESSONS} from '../src/receptionLessons';
import index from '../content/v44-main-index.json';
import {draftText} from '../src/v44Courses';
import {learnerFacingText} from '../src/lessonPresentationText';

const cases=[
 ['en-ielts-listening-u07','en','fifty residents','six volunteers'],
 ['en-ielts-listening-u08','en','retrieval practice','spacing'],
 ['fr-a2-u03','fr','onze heures','Orléans'],
 ['fr-a2-u05','fr','depuis deux jours','la tête']
] as const;

it('keeps 156 course identities and new eight topics unique and correctly mapped',()=>{
 const ids=new Set(SPECIALTY_LESSONS.map(u=>u.id));
 expect(ids.size).toBe(SPECIALTY_LESSONS.length);
 expect(SPECIALTY_LESSONS).toHaveLength(327);
 expect(SPECIALTY_LESSONS.filter(u=>u.type==='grammar')).toHaveLength(164);
 expect(SPECIALTY_LESSONS.filter(u=>u.type==='vocabulary')).toHaveLength(163);
 for(const [course] of cases){
  expect(linkedSpecialties('grammar',course)).toHaveLength(1);
  expect(linkedSpecialties('vocabulary',course)).toHaveLength(1);
  expect(index.find(x=>x.id===course)).toBeDefined();
 }
});

it('each new grammar/vocabulary lesson is an actual four-chapter bilingual teaching unit',()=>{
 for(const [id] of cases){
  for(const u of [...linkedSpecialties('grammar',id),...linkedSpecialties('vocabulary',id)]){
   expect(u.sections,u.id).toHaveLength(4);
   expect(u.questions,u.id).toHaveLength(4);
   expect(u.sections[0].table?.rows,u.id).toHaveLength(4);
   expect(u.sections.every(s=>s.examples.length>=3&&s.examples.every(e=>e.target.length>(u.language==='fr'?12:20)&&e.zh.length>=4&&e.analysis.length>6)),u.id).toBe(true);
   expect(u.model.length,u.id).toBeGreaterThanOrEqual(7);
   expect(u.model.every(e=>e.target.length>=15&&e.zh.length>=4),u.id).toBe(true);
   expect(specialtyQuality(u),u.id).toBe(true);
  }
 }
});

it('four new source-specific reading stories have 16 nonempty aligned bilingual paragraphs with evidence and production',()=>{
 for(const [id,language] of cases){
  const u=RECEPTION_LESSONS[id];
  expect(u,id).toBeDefined();
  expect(u.language,id).toBe(language);
  expect(u.paragraphs.map(p=>p.id),id).toEqual(['P1','P2','P3','P4']);
  const threshold=language==='fr'?45:70;
  expect(u.paragraphs.every(p=>p.target.trim().split(/\s+/u).length>=threshold&&p.zh.length>=75),id).toBe(true);
  expect(u.questions,id).toHaveLength(4);
  expect(u.questions.every(q=>q.answer.length>10&&q.why.length>22&&q.evidence.length>0&&q.evidence.every(e=>['P1','P2','P3','P4'].includes(e))),id).toBe(true);
  expect(u.languageNotes.length,id).toBeGreaterThanOrEqual(4);
  expect(u.model.length,id).toBeGreaterThan(400);
  expect(u.modelZh.length,id).toBeGreaterThan(105);
  expect(index.find(x=>x.id===id)?.audio_status,id).toBe('missing_audio');
 }
});

it('rejects fact drift from the four immutable original drafts',()=>{
 for(const [id,,fact1,fact2] of cases){
  const source=JSON.parse(readFileSync('content/lesson-drafts/'+id+'.json','utf8'));
  const authored=RECEPTION_LESSONS[id].paragraphs.map(x=>x.target).join(' ');
  expect(source.listening_script).toBe(source.reading);
  expect(authored.toLowerCase(),id).toContain(fact1.toLowerCase());
  expect(authored.toLowerCase(),id).toContain(fact2.toLowerCase());
 }
 const discussion=RECEPTION_LESSONS['en-ielts-listening-u07'];
 expect(discussion.questions[2].answer).toContain('Six');
 expect(discussion.questions[2].answer).toContain('no exact size');
 const lecture=RECEPTION_LESSONS['en-ielts-listening-u08'];
 expect(lecture.questions[2].answer).toContain('depends');
 const train=RECEPTION_LESSONS['fr-a2-u03'];
 expect(train.questions[2].answer).toContain('demander un remboursement');
 const health=RECEPTION_LESSONS['fr-a2-u05'];
 expect(health.questions[2].answer).toContain('sans diagnostic');
 expect(health.paragraphs[1].target).toContain('Paul note l’heure du rendez-vous communiquée');
 expect(health.paragraphs[1].zh).toContain('保罗记下秘书告诉他的预约时间');
 expect(health.paragraphs[1].zh).toContain('读者仍不知道具体几点');
 expect(health.questions[2].answer).toContain('sans diagnostic ni heure exacte précisée');
});

it('bilingual passages do not claim real speech recordings or independent editorial clearance',()=>{
 for(const [id] of cases){
  const u=RECEPTION_LESSONS[id];
  expect(u.paragraphs.every(p=>p.zh.trim().length>0)).toBe(true);
  const raw=readFileSync('content/lesson-drafts/'+id+'.json','utf8');
  expect(JSON.parse(raw).qa_status).toBe('pending');
  expect(JSON.parse(raw).audio_status).toBe('missing_audio');
 }
});

it('does not expose original drafting boilerplate as student teaching content',()=>{
 const raw=JSON.parse(readFileSync('content/lesson-drafts/fr-a2-u03.json','utf8'));
 const original=draftText(raw);
 expect(original).toContain('原文例句：结合本课知识讲解，辨认表达的功能与适用条件。');
 const student=learnerFacingText(original);
 expect(student).not.toContain('原文例句：结合本课知识讲解，辨认表达的功能与适用条件。');
 expect(student).toContain('Nous devons partir à onze heures et changer de quai à Orléans.');
 expect(student).toContain('Notre billet reste valable pour ce nouveau trajet.');
});


it('student-facing Task2 U01 retains the real source exercise but strips existing-original authoring status and sample label',()=>{
 const source=readFileSync('public/learning-assets/en-ielts-writing-task2-u01.txt','utf8');
 const student=learnerFacingText(source);
 expect(source).toContain('原创完整样课 v0.1');
 expect(source).toContain('状态：供教学审核');
 expect(student).not.toContain('原创完整样课 v0.1');
 expect(student).not.toContain('状态：供教学审核');
 expect(student).not.toContain('音频状态：没有绑定具体合法媒体');
 expect(student).toContain('Some universities offer more courses online rather than in traditional classrooms.');
 expect(student).toContain('does not guarantee effective learning');
 expect(student).toContain('For students who live far from campus');
});


it('provides source-faithful French/Chinese comprehension prompts for A2 transport and appointments',()=>{
 for(const id of ['fr-a2-u03','fr-a2-u05']){
  const lesson=RECEPTION_LESSONS[id];
  expect(lesson.questions,id).toHaveLength(4);
  for(const [i,q] of lesson.questions.entries()){
   const prompt=q.prompt.split(' / '),answer=q.answer.split(' / ');
   expect(prompt.length,id+' prompt '+i).toBe(2);
   expect(answer.length,id+' answer '+i).toBe(2);
   expect(/[\p{Script=Han}]/u.test(prompt[1]),id+' translated question '+i).toBe(true);
   expect(/[\p{Script=Han}]/u.test(answer[1]),id+' translated answer '+i).toBe(true);
   expect(q.evidence.every(p=>lesson.paragraphs.some(x=>x.id===p)),id+' real paragraph evidence '+i).toBe(true);
  }
 }
 expect(RECEPTION_LESSONS['fr-a2-u03'].questions[2].answer).toContain('是否批准未获确认');
 expect(RECEPTION_LESSONS['fr-a2-u05'].questions[2].answer).toContain('课文也没写具体几点');
});


it('keeps French A2 examples faithful about clock times, being together and seeking an internship',()=>{
 const meeting=FR_A2_GRAMMAR['11'].flatMap(s=>s.examples).find(e=>e.target==='La réunion aura lieu mardi à dix-neuf heures.')!;
 expect(meeting).toBeDefined();
 expect(meeting.zh).toContain('周二晚上七点（19:00）');
 expect(meeting.zh).not.toContain('周二十九点');
 const neighbours=FR_A2_VOCABULARY['02'].flatMap(s=>s.examples).find(e=>e.target==='Je passais du temps avec les enfants du voisinage.')!;
 expect(neighbours).toBeDefined();
 expect(neighbours.zh).toContain('待在一起');
 expect(neighbours.zh).not.toContain('玩耍');
 const internship=FR_A2_VOCABULARY['10'].flatMap(s=>s.examples).find(e=>e.target==='Je cherche un stage dans une équipe internationale.')!;
 expect(internship).toBeDefined();
 expect(internship.zh).toContain('正在寻找');
 expect(internship.zh).toContain('加入国际团队实习');
 expect(internship.zh).not.toContain('我在国际团队寻找实习');
});


it('uses unit-specific original-source language notes instead of generic sample commentary across twelve A2 specialties',()=>{
 expect(FR_A2_KNOWLEDGE).toHaveLength(12);
 for(const u of FR_A2_KNOWLEDGE){
  expect(u.model,u.id).toHaveLength(2);
  expect(u.model[0].analysis,u.id).toContain('原稿事实与措辞');
  expect(u.model[1].analysis,u.id).toContain('项目原创后续情境');
  for(const [i,sample] of u.model.entries()){
   expect(sample.analysis,u.id+' '+i).toContain('对照语言点');
   expect(sample.analysis.length,u.id+' '+i).toBeGreaterThan(35);
   expect(sample.analysis,u.id).not.toContain('保留原稿信息与顺序的完整表达示范');
   expect(sample.analysis,u.id).not.toContain('练习词句功能与信息范围');
  }
 }
});

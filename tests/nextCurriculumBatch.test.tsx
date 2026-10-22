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
 expect(SPECIALTY_LESSONS).toHaveLength(117);
 expect(SPECIALTY_LESSONS.filter(u=>u.type==='grammar')).toHaveLength(61);
 expect(SPECIALTY_LESSONS.filter(u=>u.type==='vocabulary')).toHaveLength(56);
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

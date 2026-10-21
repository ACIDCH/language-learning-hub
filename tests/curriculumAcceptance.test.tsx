import {expect,it} from 'vitest';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
import {COURSES} from '../src/v44Courses';
import {FOUNDATION_UNITS} from '../src/foundationCurriculum';
import {SPECIALTY_LESSONS} from '../src/specialtyLibrary';
import {CHINESE_LESSON_NOTES} from '../src/bilingualTeachingNotes';
import {ENGLISH_ORIGINAL_BILINGUAL} from '../src/bilingualOriginalEnglish';
import index from '../content/v44-main-index.json';
import {RECEPTION_LESSONS} from '../src/receptionLessons';
import {TASK1_WORKSHOPS} from '../src/Task1WritingWorkshop';

it('maintains an ID-exact 108 + 48 gap matrix, never equating structure with approval',()=>{
 const rows=COURSES.map(c=>{
  const entry=index.find(x=>x.id===c.id);
  const body=entry?.draft_path?JSON.parse(readFileSync(entry.draft_path,'utf8')):FOUNDATION_UNITS.find(x=>x.id===c.id);
  const topics=SPECIALTY_LESSONS.filter(x=>x.unitLink===c.id);
  const bilingual=!!(CHINESE_LESSON_NOTES[c.id]||ENGLISH_ORIGINAL_BILINGUAL[c.id]);
  return {id:c.id,kind:c.kind,language:c.language,level:c.level,target:c.goal,
   stages:['情境','语法','词汇','听读','表达'],specialties:topics.map(x=>({id:x.id,type:x.type})),
   body:entry?.public_sources.length?'source_manuscript':body?'authored_body_quality_pending':'missing',
   readingWords:body?.reading?.trim().split(/\s+/u).length??null,
   reception:RECEPTION_LESSONS[c.id]?{source:'src/receptionLessons.ts',paragraphs:RECEPTION_LESSONS[c.id].paragraphs.length,
    words:RECEPTION_LESSONS[c.id].paragraphs.map(p=>p.target).join(' ').trim().split(/\s+/u).length,chinese:'all_paragraphs',questions:RECEPTION_LESSONS[c.id].questions.length,audio:'segmented_device_tts_only',editorial:'author_checked_not_independent_QA'}:null,
   visualWorkshop:TASK1_WORKSHOPS[c.id]||null,
   sources:entry?[...(entry.public_sources||[]),...(entry.draft_path?[entry.draft_path]:[])]:['src/foundationCurriculum.ts'],
   chinese:bilingual?'lesson_notes_present_coverage_requires_review':'partial_glosses_full_mapping_pending',
   audio:entry?.audio_status||'device_tts_only',exercises:body?.questions?.length??null,
   gaps:[...(!topics.some(x=>x.type==='grammar')?['full_grammar_specialty']:[]),...(!topics.some(x=>x.type==='vocabulary')?['full_vocabulary_specialty']:[]),
    ...(!bilingual?['complete_chinese_mapping']:[]),'natural_audio_alignment','independent_semantic_review'],
   priority:/B2|C1|C2|IELTS/.test(c.level)?'P2':'P2-followup',
   verification:{structure:'checked',semanticQA:'pending',audioVerified:false,publishable:false}};
 });
 expect(rows.filter(x=>x.kind==='main')).toHaveLength(108);
 expect(rows.filter(x=>x.kind==='foundation')).toHaveLength(48);
 expect(new Set(rows.map(x=>x.id)).size).toBe(156);
 expect(SPECIALTY_LESSONS.every(x=>rows.some(c=>c.id===x.unitLink))).toBe(true);
 mkdirSync('docs/qa',{recursive:true});
 writeFileSync('docs/qa/curriculum-gap-matrix.json',JSON.stringify({schema:1,baseline:'b7e98ac',counts:{main:108,foundation:48,specialties:SPECIALTY_LESSONS.length},courses:rows},null,2)+'\n');
});


it('keeps both new full bilingual reception lessons grounded in original course IDs and paragraph evidence',()=>{
 const coverage=[
  ['fr-a1-u06','fr',190],
  ['en-ielts-listening-u03','en',340]
 ] as const;
 for(const [id,language,minWords] of coverage){
  const lesson=RECEPTION_LESSONS[id];
  expect(lesson,id+' exists').toBeDefined();
  expect(lesson.language).toBe(language);
  expect(lesson.paragraphs).toHaveLength(4);
  const words=lesson.paragraphs.map(p=>p.target).join(' ').trim().split(/\s+/u).length;
  expect(words,id).toBeGreaterThanOrEqual(minWords);
  expect(lesson.paragraphs.every(p=>p.target.length>160&&p.zh.length>45),id).toBe(true);
  const paragraphIds=new Set(lesson.paragraphs.map(p=>p.id));
  expect(paragraphIds.size).toBe(4);
  expect(lesson.questions).toHaveLength(4);
  expect(lesson.questions.every(q=>q.evidence.length>=1&&q.evidence.every(e=>paragraphIds.has(e))),id).toBe(true);
  expect(lesson.questions.every(q=>q.answer.length>=12&&q.why.length>=28),id).toBe(true);
  expect(lesson.model.split(/\s+/u).length,id).toBeGreaterThanOrEqual(75);
  expect(lesson.modelZh.length,id).toBeGreaterThan(80);
  expect(lesson.languageNotes.length,id).toBeGreaterThanOrEqual(3);
  expect(lesson.references.every(x=>x.startsWith('https://'))).toBe(true);
  expect(COURSES.some(c=>c.id===id)).toBe(true);
  const row=index.find(x=>x.id===id);
  expect(row?.audio_status).toBe('missing_audio');
 }
 const listening=RECEPTION_LESSONS['en-ielts-listening-u03'];
 expect(listening.paragraphs[2].target).toContain('up to thirty');
 expect(listening.paragraphs[2].target).toContain('not yet been approved');
 expect(listening.questions[2].evidence).toContain('P3');
 const fr=RECEPTION_LESSONS['fr-a1-u06'];
 expect(fr.paragraphs[1].target).toContain('dix heures et demie');
 expect(fr.paragraphs[1].target).toContain('à midi');
 expect(fr.questions[0].evidence).toContain('P2');
});


it('new A1 weekend and market texts have evidence-backed bilingual stories, not isolated example lists',()=>{
 for(const [id,key,min] of [
  ['fr-a1-u07','quatre-vingt-dix',230],
  ['fr-a1-u08','trois euros le kilo',250]
 ] as const){
  const unit=RECEPTION_LESSONS[id];
  expect(unit,id).toBeDefined();
  expect(unit.language).toBe('fr');
  expect(unit.paragraphs).toHaveLength(4);
  expect(unit.paragraphs.every(p=>p.zh.length>90&&p.target.split(/\s+/u).length>=45)).toBe(true);
  expect(unit.paragraphs.map(p=>p.target).join(' ').split(/\s+/u).length).toBeGreaterThan(min);
  expect(unit.questions).toHaveLength(4);
  const ids=unit.paragraphs.map(p=>p.id);
  expect(unit.questions.every(q=>q.evidence.length>0&&q.evidence.every(x=>ids.includes(x)))).toBe(true);
  expect(unit.questions.every(q=>q.why.length>30)).toBe(true);
  expect(unit.model.trim().split(/\s+/u).length).toBeGreaterThan(75);
  expect(unit.modelZh.length).toBeGreaterThan(90);
  expect(unit.paragraphs.some(p=>p.target.includes(key))).toBe(true);
  expect(index.find(x=>x.id===id)?.audio_status).toBe('missing_audio');
 }
 const market=RECEPTION_LESSONS['fr-a1-u08'];
 expect(market.paragraphs[0].target).toContain('trois euros le kilo');
 expect(market.paragraphs[3].target).toContain('cinq euros');
 expect(market.questions[0].evidence).toEqual(['P1','P4']);
 const leisure=RECEPTION_LESSONS['fr-a1-u07'];
 expect(leisure.paragraphs[1].target.toLowerCase()).toContain('il pleut');
 expect(leisure.paragraphs[2].target).toContain('quinze heures');
});


it('supports A1 housing/future and full IELTS headings as actual four-paragraph bilingual evidence sources',()=>{
 for(const [id,lang,min] of [
  ['fr-a1-u10','fr',235],
  ['fr-a1-u11','fr',245],
  ['en-ielts-reading-u03','en',380]
 ] as const){
  const u=RECEPTION_LESSONS[id];
  expect(u,id).toBeDefined();
  expect(u.language).toBe(lang);
  expect(u.paragraphs).toHaveLength(4);
  expect(u.paragraphs.every(x=>x.target.length>210&&x.zh.length>90)).toBe(true);
  expect(u.paragraphs.map(x=>x.target).join(' ').split(/\s+/u).length).toBeGreaterThan(min);
  const keys=u.paragraphs.map(p=>p.id);
  expect(new Set(keys).size).toBe(4);
  expect(u.questions).toHaveLength(4);
  expect(u.questions.every(q=>q.evidence.length>0&&q.evidence.every(x=>keys.includes(x))&&q.why.length>35)).toBe(true);
  expect(u.model.split(/\s+/u).length).toBeGreaterThan(75);
  expect(u.modelZh.length).toBeGreaterThan(100);
  expect(u.references.every(x=>x.startsWith('https://'))).toBe(true);
  expect(index.find(x=>x.id===id)?.audio_status).toBe('missing_audio');
 }
 const home=RECEPTION_LESSONS['fr-a1-u10'];
 expect(home.questions[2].evidence).toContain('P3');
 expect(home.paragraphs[1].target).toContain('chacun range son assiette');
 const planning=RECEPTION_LESSONS['fr-a1-u11'];
 expect(planning.paragraphs[0].target).toContain('devant la gare à neuf heures');
 expect(planning.paragraphs[2].target).toContain('peut-être pleuvoir');
 expect(planning.questions[3].answer).toContain('pas encore répondu');
 const headings=RECEPTION_LESSONS['en-ielts-reading-u03'];
 expect(headings.paragraphs[0].target).toContain('Yet');
 expect(headings.questions.flatMap(x=>x.evidence)).toEqual(['P1','P2','P3','P4']);
 expect(headings.paragraphs[3].target).toContain('combine several methods');
 expect(headings.languageNotes[0].target).toContain('vi. The history');
 expect(headings.questions.map(x=>x.answer.slice(0,3))).toEqual(['i. ','ii.','iii','iv.']);
 expect(headings.task).toContain('v、vi');
});


it('keeps first A1 completed-past and IELTS TRUE/FALSE/NOT GIVEN reading evidence aligned',()=>{
 const selection=[
  ['fr-a1-u12','fr',200],
  ['en-ielts-reading-u04','en',350]
 ] as const;
 for(const [id,lang,min] of selection){
  const u=RECEPTION_LESSONS[id];
  expect(u,id).toBeDefined();
  expect(u.language).toBe(lang);
  expect(u.paragraphs).toHaveLength(4);
  expect(u.paragraphs.every(p=>p.target.length>220&&p.zh.length>85)).toBe(true);
  expect(u.paragraphs.map(p=>p.target).join(' ').trim().split(/\s+/u).length).toBeGreaterThan(min);
  const ids=u.paragraphs.map(x=>x.id);
  expect(new Set(ids).size).toBe(4);
  expect(u.questions).toHaveLength(4);
  expect(u.questions.every(q=>q.evidence.length>0&&q.evidence.every(x=>ids.includes(x))&&q.why.length>30)).toBe(true);
  expect(u.model.split(/\s+/u).length).toBeGreaterThan(80);
  expect(u.modelZh.length).toBeGreaterThan(100);
  expect(index.find(x=>x.id===id)?.audio_status).toBe('missing_audio');
 }
 const a=RECEPTION_LESSONS['fr-a1-u12'];
 expect(a.paragraphs[0].target).toContain('je suis allée');
 expect(a.paragraphs[1].target).toContain('À midi');
 expect(a.paragraphs[2].target.toLowerCase()).toContain('à cinq heures');
 expect(a.paragraphs[3].target).toContain('Aujourd’hui');
 const b=RECEPTION_LESSONS['en-ielts-reading-u04'];
 expect(b.questions.map(q=>q.answer)).toEqual(['FALSE','TRUE','NOT GIVEN','NOT GIVEN']);
 expect(b.questions[0].evidence).toContain('P2');
 expect(b.questions[2].evidence).toContain('P4');
 expect(b.paragraphs[3].target).toContain('an absence of funding information');
});

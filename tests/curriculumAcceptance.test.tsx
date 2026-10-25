import {MAIN_COURSE_GOALS} from '../src/mainCourseGoals';
import {createHash} from 'node:crypto';
import {mainOriginalChinese} from '../src/mainOriginalChinese';
import {FOUNDATION_CHINESE} from '../src/foundationChinese';
import {FOUNDATION_QUESTION_CHINESE} from '../src/foundationQuestionChinese';
import {FOUNDATION_OUTPUT_MODELS} from '../src/foundationOutputModels';
import {mainQuestionChinese} from '../src/mainQuestionChinese';
import {VISUAL_EXERCISES} from '../src/Task1VisualEvidence';
import {expect,it} from 'vitest';
import {splitLessonStages,STUDY_STAGES} from '../src/lessonStages';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
import {COURSES} from '../src/v44Courses';
import {FOUNDATION_UNITS} from '../src/foundationCurriculum';
import {SPECIALTY_LESSONS} from '../src/specialtyLibrary';
import {CHINESE_LESSON_NOTES} from '../src/bilingualTeachingNotes';
import {ENGLISH_ORIGINAL_BILINGUAL} from '../src/bilingualOriginalEnglish';
import index from '../content/v44-main-index.json';
import {RECEPTION_LESSONS} from '../src/receptionLessons';
import {FOUNDATION_RECEPTION} from '../src/foundationReception';
import {TASK1_WORKSHOPS} from '../src/Task1WritingWorkshop';

it('maintains an ID-exact 108 + 48 gap matrix, never equating structure with approval',()=>{
 const rows=COURSES.map(c=>{
  const entry=index.find(x=>x.id===c.id);
  const body=entry?.draft_path?JSON.parse(readFileSync(entry.draft_path,'utf8')):FOUNDATION_UNITS.find(x=>x.id===c.id);
  const topics=SPECIALTY_LESSONS.filter(x=>x.unitLink===c.id);
  const legacyNotes=!!(CHINESE_LESSON_NOTES[c.id]||ENGLISH_ORIGINAL_BILINGUAL[c.id]);
  const originalMapping=entry?.draft_path?{
   reading:!!mainOriginalChinese(c.id,body.reading),listening:!!mainOriginalChinese(c.id,body.listening_script),
   questions:mainQuestionChinese(body).filter(Boolean).length,totalQuestions:body.questions.length
  }:null;
  const foundationMapping=c.kind==='foundation'?!!(FOUNDATION_CHINESE[c.id]&&FOUNDATION_QUESTION_CHINESE[c.id]&&FOUNDATION_OUTPUT_MODELS[c.id]):false;
  const bilingual=foundationMapping||legacyNotes||!!(originalMapping?.reading&&originalMapping.listening&&originalMapping.questions===originalMapping.totalQuestions);
  const reception=RECEPTION_LESSONS[c.id]||FOUNDATION_RECEPTION[c.id];
  const sourcePaths=entry?.draft_path?[entry.draft_path]:entry?.public_sources.length?entry.public_sources.map(id=>'public/learning-assets/'+id+'.txt'):c.kind==='foundation'?['src/foundationEnglish.ts','src/foundationEnglishBridge.ts','src/foundationFrench.ts','src/foundationFrenchBridge.ts'].filter(path=>path.includes(c.language==='en'?'English':'French')):[];
  const sourceHashes=sourcePaths.map(path=>({path,sha256:createHash('sha256').update(readFileSync(path)).digest('hex')}));
  return {id:c.id,kind:c.kind,language:c.language,level:c.level,target:c.goal,
   sourceHashes,progress:{scope:'owner/course',courseId:c.id,store:c.kind==='foundation'?'foundation_progress.answers.__learning':'/v1/progress/'+c.id},
   evidence:reception?{paragraphs:reception.paragraphs.map(p=>({id:p.id,targetSha256:createHash('sha256').update(p.target).digest('hex'),chineseSha256:createHash('sha256').update(p.zh).digest('hex')})),questions:reception.questions.map((q,i)=>({index:i,paragraphIds:q.evidence})),modelChinesePresent:!!reception.modelZh,audioSegments:[],audioStatus:'no_verified_source_aligned_recording'}:null,
   stages:['情境','语法','词汇','听读','表达'],specialties:topics.map(x=>({id:x.id,type:x.type})),
   body:entry?.public_sources.length?'source_manuscript':body?'authored_body_quality_pending':'missing',
   readingWords:body?.reading?.trim().split(/\s+/u).length??null,
   reception:reception?{source:c.kind==='foundation'?'src/foundationReception.ts':'src/receptionLessons.ts',format:c.kind==='foundation'?'progressive_source_blocks':'continuous_passage',paragraphs:reception.paragraphs.length,
    words:reception.paragraphs.map(p=>p.target).join(' ').trim().split(/\s+/u).length,chinese:'all_paragraphs',questions:reception.questions.length,audio:'segmented_device_tts_only',editorial:'author_checked_not_independent_QA'}:null,
   visualWorkshop:TASK1_WORKSHOPS[c.id]||null,
   sources:entry?[...(entry.public_sources||[]),...(entry.draft_path?[entry.draft_path]:[])]:['src/foundationCurriculum.ts'],
   chinese:{originalMapping,foundationMapping,legacyNotes,coverage:bilingual?'source_blocks_questions_and_teaching_present_semantic_review_pending':'mapping_incomplete',sentenceLevelIndependentReview:false},
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
 writeFileSync('docs/qa/curriculum-gap-matrix.json',JSON.stringify({schema:2,baseline:'e98c6a2',counts:{main:rows.filter(x=>x.kind==='main').length,foundation:rows.filter(x=>x.kind==='foundation').length,specialties:SPECIALTY_LESSONS.length,sourceChineseMapped:rows.filter(x=>x.chinese.coverage==='source_blocks_questions_and_teaching_present_semantic_review_pending').length,grammarMapped:rows.filter(x=>x.specialties.some(s=>s.type==='grammar')).length,vocabularyMapped:rows.filter(x=>x.specialties.some(s=>s.type==='vocabulary')).length,bilingualReception:rows.filter(x=>x.reception).length,semanticQAApproved:rows.filter(x=>x.verification.semanticQA!=='pending').length,audioVerified:rows.filter(x=>x.verification.audioVerified).length,publishable:rows.filter(x=>x.verification.publishable).length},courses:rows},null,2)+'\n');
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


it('IELTS U05–U08 deliver four substantive bilingual reading segments, source evidence and correct uncertainty',()=>{
 const courses=['en-ielts-reading-u05','en-ielts-reading-u06','en-ielts-reading-u07','en-ielts-reading-u08'] as const;
 for(const course of courses){
  const u=RECEPTION_LESSONS[course];
  expect(u,course).toBeDefined();
  expect(u.language).toBe('en');
  expect(u.paragraphs).toHaveLength(4);
  expect(u.questions).toHaveLength(4);
  expect(u.paragraphs.every(p=>p.target.trim().split(/\s+/).length>85&&p.zh.length>130),course).toBe(true);
  expect(u.paragraphs.map(p=>p.target).join(' ').trim().split(/\s+/).length,course).toBeGreaterThan(390);
  expect(u.model.split(/\s+/).length,course).toBeGreaterThanOrEqual(105);
  expect(u.modelZh.length).toBeGreaterThan(165);
  const ids=new Set(u.paragraphs.map(p=>p.id));
  expect(ids.size).toBe(4);
  expect(u.questions.every(q=>q.evidence.length>0&&q.evidence.every(x=>ids.has(x))&&q.why.length>35)).toBe(true);
  expect(u.languageNotes.length).toBeGreaterThanOrEqual(4);
  expect(u.references.every(x=>x.startsWith('https://'))).toBe(true);
  expect(index.find(x=>x.id===course)?.audio_status).toBe('missing_audio');
 }
 const grant=RECEPTION_LESSONS['en-ielts-reading-u05'];
 expect(grant.paragraphs[0].target).toContain('this particular grant scheme');
 expect(grant.questions[0].answer).toContain('no measured reduction');
 const plant=RECEPTION_LESSONS['en-ielts-reading-u06'];
 expect(plant.paragraphs[1].target).toContain('tentative');
 expect(plant.questions[1].answer).toContain('not proof');
 const survey=RECEPTION_LESSONS['en-ielts-reading-u07'];
 expect(survey.questions.map(q=>q.answer.slice(0,9))).toEqual(['Section A','Section B','Section C','Yes, Sect']);
 const library=RECEPTION_LESSONS['en-ielts-reading-u08'];
 expect(library.paragraphs[0].target).toContain('aggregate result');
 expect(library.questions[3].answer).toContain('coexist');
});


it('A1 U05 and U09 have complete authentic-level daily and directions sequences without swapping facts',()=>{
 for(const [id,min] of [['fr-a1-u05',260],['fr-a1-u09',270]] as const){
  const lesson=RECEPTION_LESSONS[id];
  expect(lesson,id).toBeDefined();
  expect(lesson.language).toBe('fr');
  expect(lesson.paragraphs).toHaveLength(4);
  expect(lesson.paragraphs.every(p=>p.target.trim().split(/\s+/).length>=60&&p.zh.length>85),id).toBe(true);
  expect(lesson.paragraphs.map(p=>p.target).join(' ').trim().split(/\s+/).length).toBeGreaterThan(min);
  expect(lesson.questions).toHaveLength(4);
  const ids=lesson.paragraphs.map(p=>p.id);
  expect(lesson.questions.every(q=>q.evidence.length>0&&q.evidence.every(e=>ids.includes(e)))).toBe(true);
  expect(lesson.model.trim().split(/\s+/).length).toBeGreaterThan(60);
  expect(lesson.modelZh.length).toBeGreaterThan(90);
  expect(index.find(x=>x.id===id)?.audio_status).toBe('missing_audio');
 }
 const routines=RECEPTION_LESSONS['fr-a1-u05'];
 expect(routines.paragraphs[0].target).toContain('à neuf heures');
 expect(routines.paragraphs[1].target).toContain('À midi');
 expect(routines.questions[0].answer).toBe('À neuf heures.');
 const directions=RECEPTION_LESSONS['fr-a1-u09'];
 expect(directions.paragraphs[1].target).toContain('tournez à gauche');
 expect(directions.paragraphs[2].target).toContain('en face du musée');
 expect(directions.questions[1].answer).toBe('Au premier feu.');
});

it('keeps inline-heading source prose in all five original IELTS Reading U01 learner stages',()=>{
 const source=readFileSync('public/learning-assets/en-ielts-reading-u01.txt','utf8');
 const outline=splitLessonStages(source);
 expect(outline.structured).toBe(true);
 expect(outline.stages).toHaveLength(6);
 expect(outline.stages[0].body).toContain('你正在阅读一篇关于远程学习');
 expect(outline.stages[4].body).toContain('opportunities for feedback and collaboration');
 expect(outline.stages[1].body).toContain('Hedging');
 expect(outline.stages[2].body).toContain('asynchronous delivery');
 expect(outline.stages[3].body).toContain('Universities increasingly combine');
 expect(STUDY_STAGES).toEqual([0,1,2,3,5]);
});

it('keeps IELTS Listening U04–U06 evidence and bilingual listening distinct from official audio',()=>{
 for(const id of ['en-ielts-listening-u04','en-ielts-listening-u05','en-ielts-listening-u06']){
  const u=RECEPTION_LESSONS[id];
  expect(u,id).toBeDefined();
  expect(u.language).toBe('en');
  expect(u.paragraphs.map(p=>p.id)).toEqual(['P1','P2','P3','P4']);
  expect(u.paragraphs.every(p=>p.target.trim().split(/\s+/u).length>=80&&p.zh.length>=120),id).toBe(true);
  expect(u.paragraphs.map(p=>p.target).join(' ').trim().split(/\s+/u).length,id).toBeGreaterThan(350);
  expect(u.questions).toHaveLength(4);
  expect(u.questions.every(q=>(q.prompt.includes('ONE WORD')?q.answer==='container':q.answer.length>15)&&q.why.length>35&&q.evidence.length>0&&q.evidence.every(e=>['P1','P2','P3','P4'].includes(e))),id).toBe(true);
  expect(u.languageNotes.length,id).toBeGreaterThanOrEqual(4);
  expect(u.model.split(/\s+/u).length,id).toBeGreaterThanOrEqual(90);
  expect(u.modelZh.length,id).toBeGreaterThan(150);
  expect(index.find(x=>x.id===id)?.audio_status).toBe('missing_audio');
 }
 const map=RECEPTION_LESSONS['en-ielts-listening-u04'];
 expect(map.questions[1].answer).toContain('same side');
 expect(map.questions[2].answer).toContain('reception desk');
 const booking=RECEPTION_LESSONS['en-ielts-listening-u05'];
 expect(booking.questions[0].answer).toContain('60');
 expect(booking.questions[1].answer).toContain('14 May');
 expect(booking.questions[2].answer).toContain('£30');
 const lab=RECEPTION_LESSONS['en-ielts-listening-u06'];
 expect(lab.questions[0].answer).toBe('container');
 expect(lab.questions[1].answer).toContain('collection date');
 expect(lab.questions[3].answer).toContain('method');
});

it('French A1 U12 Chinese text preserves what was done, not invented intentions or past acquaintance',()=>{
 const lesson=RECEPTION_LESSONS['fr-a1-u12'];
 expect(lesson.paragraphs[0].target).toContain('Nous avons décidé de visiter');
 expect(lesson.paragraphs[0].zh).toContain('我们决定参观');
 expect(lesson.paragraphs[1].target).toContain('Il n’a pas pris beaucoup de photos');
 expect(lesson.paragraphs[1].zh).toContain('他没有拍很多照片');
 expect(lesson.paragraphs[1].zh).not.toContain('他不想拍');
 expect(lesson.paragraphs[2].target).toContain('Je ne connais pas cette personne');
 expect(lesson.paragraphs[2].zh).toContain('我不认识这个人');
 expect(lesson.paragraphs[2].zh).not.toContain('我以前不认识');
 expect(lesson.paragraphs.every(p=>!p.zh.includes('弟弟'))).toBe(true);
 expect(lesson.modelZh).not.toContain('弟弟');
 expect(lesson.paragraphs[0].zh).toContain('兄弟');
});


it('IELTS Task 1 U03 and U04 provide faithful four-paragraph bilingual readings and traceable comparison evidence',()=>{
 for(const id of ['en-ielts-writing-task1-u03','en-ielts-writing-task1-u04']){
  const lesson=RECEPTION_LESSONS[id];
  expect(lesson,id).toBeDefined();
  expect(lesson.language).toBe('en');
  expect(lesson.paragraphs.map(p=>p.id)).toEqual(['P1','P2','P3','P4']);
  expect(lesson.paragraphs.every(p=>p.target.length>=390&&p.zh.length>=150),id).toBe(true);
  expect(lesson.paragraphs.map(p=>p.target).join(' ').trim().split(/\s+/u).length,id).toBeGreaterThanOrEqual(300);
  expect(lesson.questions,id).toHaveLength(4);
  expect(lesson.questions.every(q=>q.why.length>=50&&q.evidence.length>=1&&q.evidence.every(p=>lesson.paragraphs.some(s=>s.id===p))),id).toBe(true);
  expect(lesson.languageNotes.length,id).toBeGreaterThanOrEqual(4);
  expect(lesson.model.trim().split(/\s+/u).length,id).toBeGreaterThanOrEqual(150);
  expect(lesson.modelZh.length,id).toBeGreaterThan(200);
  expect(index.find(x=>x.id===id)?.audio_status).toBe('missing_audio');
 }
 const commuting=RECEPTION_LESSONS['en-ielts-writing-task1-u03'];
 const source1=JSON.parse(readFileSync('content/lesson-drafts/en-ielts-writing-task1-u03.json','utf8'));
 expect(source1.context).toContain('40/25/35%');
 expect(source1.context).toContain('30/50/20%');
 expect(commuting.questions[0].answer).toContain('25 percentage points');
 expect(commuting.questions[2].answer).toContain('no dates');
 expect(commuting.questions[3].answer).toContain('not specified');
 expect(commuting.paragraphs[3].target).toContain('borrowing-channel chart');
 const budget=RECEPTION_LESSONS['en-ielts-writing-task1-u04'];
 const source2=JSON.parse(readFileSync('content/lesson-drafts/en-ielts-writing-task1-u04.json','utf8'));
 expect(source2.context).toContain('30/50/20%');
 expect(source2.context).toContain('40/45/15%');
 expect(budget.questions[1].answer).toContain('10 percentage points');
 expect(budget.questions[2].answer).toContain('33.3%');
 expect(budget.questions[3].answer).toContain('total budget');
 expect(budget.paragraphs[3].zh).toContain('实际');
});


it('Task 1 U01–U02 bilingual readings preserve original source, units, overview and paragraph evidence',()=>{
 for(const id of ['en-ielts-writing-task1-u01','en-ielts-writing-task1-u02']){
  const unit=RECEPTION_LESSONS[id];
  expect(unit,id).toBeDefined();
  expect(unit.language).toBe('en');
  expect(unit.paragraphs.map(x=>x.id)).toEqual(['P1','P2','P3','P4']);
  expect(unit.paragraphs.every(p=>p.target.length>=500&&p.zh.length>=175),id).toBe(true);
  expect(unit.paragraphs.map(x=>x.target).join(' ').split(/\s+/u).length,id).toBeGreaterThanOrEqual(400);
  expect(unit.questions,id).toHaveLength(4);
  expect(unit.questions.every(q=>q.why.length>=43&&q.evidence.length>0&&q.evidence.every(p=>unit.paragraphs.some(x=>x.id===p))),id).toBe(true);
  expect(unit.languageNotes,id).toHaveLength(4);
  expect(unit.model.trim().split(/\s+/u).length,id).toBeGreaterThanOrEqual(150);
  expect(unit.modelZh.length,id).toBeGreaterThan(200);
  expect(index.find(x=>x.id===id)?.audio_status).toBe('missing_audio');
 }
 const loan=RECEPTION_LESSONS['en-ielts-writing-task1-u01'];
 const source=readFileSync('public/learning-assets/en-ielts-writing-task1-u01.txt','utf8');
 expect(source).toContain('2023 | 76 | 70');
 expect(source).toContain('2024 | 91 | 62');
 expect(loan.questions[0].answer).toContain('2023');
 expect(loan.questions[1].answer).toContain('43 thousand');
 expect(loan.questions[2].answer).toContain('15 thousand');
 expect(loan.questions[3].answer).toContain('1.90');
 expect(loan.paragraphs[3].target).toContain('separate dataset');
 const trend=RECEPTION_LESSONS['en-ielts-writing-task1-u02'];
 const draft=JSON.parse(readFileSync('content/lesson-drafts/en-ielts-writing-task1-u02.json','utf8'));
 expect(draft.context).toContain('1200/900/1500/1800');
 expect(trend.questions[0].answer).toContain('fell');
 expect(trend.questions[1].answer).toContain('600');
 expect(trend.questions[2].answer).toContain('50%');
 expect(trend.questions[3].answer).toContain('no causal');
 expect(trend.paragraphs[0].zh).toContain('月访问量');
});


it('Task1 U05 and U06 source narratives, parallel Chinese and visual diagrams refer to the SAME exercises',()=>{
 for(const [course,words] of [['en-ielts-writing-task1-u05',518],['en-ielts-writing-task1-u06',523]] as const){
  const lesson=RECEPTION_LESSONS[course];
  expect(lesson,course).toBeDefined();
  expect(lesson.language).toBe('en');
  expect(lesson.paragraphs.map(p=>p.id)).toEqual(['P1','P2','P3','P4']);
  expect(lesson.paragraphs.map(p=>p.target).join(' ').trim().split(/\s+/u).length).toBe(words);
  expect(lesson.paragraphs.every(p=>p.target.length>=600&&p.zh.length>=180)).toBe(true);
  expect(lesson.questions).toHaveLength(4);
  expect(lesson.questions.every(q=>q.why.length>=40&&q.evidence.length>=1&&q.evidence.every(p=>lesson.paragraphs.some(t=>t.id===p)))).toBe(true);
  expect(lesson.languageNotes.length).toBeGreaterThanOrEqual(4);
  expect(lesson.model.trim().split(/\s+/u).length).toBeGreaterThanOrEqual(150);
  expect(lesson.modelZh.length).toBeGreaterThan(200);
  expect(index.find(x=>x.id===course)?.audio_status).toBe('missing_audio');
 }
 const process=VISUAL_EXERCISES['en-process-report-grammar'].items;
 const manuscript5=JSON.parse(readFileSync('content/lesson-drafts/en-ielts-writing-task1-u05.json','utf8'));
 expect(manuscript5.reading).toContain('cut for reuse');
 expect(process).toHaveLength(6);
 expect(process[5]).toContain('Cut for reuse');
 expect(process.some(step=>step.toLowerCase().includes('pack'))).toBe(false);
 const old=VISUAL_EXERCISES['en-map-change-lexicon'].sites;
 const manuscript6=JSON.parse(readFileSync('content/lesson-drafts/en-ielts-writing-task1-u06.json','utf8'));
 expect(manuscript6.reading).toContain('car park in the north was replaced by a garden');
 expect(old.north).toMatchObject({before:'Car park',after:'Garden'});
 expect(old.east).toMatchObject({before:'Library',after:'Library',change:'unchanged'});
 expect(old.west.before).toBe('Café');
 expect(old.centre.after).toContain('southern footpath');
 expect(RECEPTION_LESSONS['en-ielts-writing-task1-u06'].questions[0].answer).toContain('garden');
 expect(RECEPTION_LESSONS['en-ielts-writing-task1-u05'].questions[2].answer).toContain('not packed');
});


it('Task1 U07/U08 retain exact source shares and weekly units across 4 full bilingual lessons and answers',()=>{
 for(const [id,expectedWords] of [['en-ielts-writing-task1-u07',485],['en-ielts-writing-task1-u08',500]] as const){
  const lesson=RECEPTION_LESSONS[id];
  expect(lesson,id).toBeDefined();
  expect(lesson.language).toBe('en');
  expect(lesson.paragraphs.map(p=>p.id)).toEqual(['P1','P2','P3','P4']);
  expect(lesson.paragraphs.map(p=>p.target).join(' ').trim().split(/\s+/u).length,id).toBe(expectedWords);
  expect(lesson.paragraphs.every(p=>p.target.length>=620&&p.zh.length>=175),id).toBe(true);
  expect(lesson.questions,id).toHaveLength(4);
  expect(lesson.questions.every(q=>q.why.length>=40&&q.evidence.length>=1&&q.evidence.every(e=>lesson.paragraphs.some(p=>p.id===e))),id).toBe(true);
  expect(lesson.languageNotes.length,id).toBeGreaterThanOrEqual(4);
  expect(lesson.model.trim().split(/\s+/u).length,id).toBeGreaterThanOrEqual(150);
  expect(lesson.modelZh.length,id).toBeGreaterThan(200);
  expect(index.find(x=>x.id===id)?.audio_status).toBe('missing_audio');
 }
 const u7=RECEPTION_LESSONS['en-ielts-writing-task1-u07'];
 const source7=JSON.parse(readFileSync('content/lesson-drafts/en-ielts-writing-task1-u07.json','utf8'));
 expect(source7.context).toContain('10→30%');
 expect(source7.context).toContain('80→60%');
 expect(source7.context).toContain('10→10%');
 expect(u7.questions[0].answer).toContain('80%');
 expect(u7.questions[0].answer).toContain('30%');
 expect(u7.questions[1].answer).toContain('60%');
 expect(u7.questions[3].answer).toContain('No');
 expect(u7.paragraphs[2].zh).toContain('购买');
 const u8=RECEPTION_LESSONS['en-ielts-writing-task1-u08'];
 const source8=JSON.parse(readFileSync('content/lesson-drafts/en-ielts-writing-task1-u08.json','utf8'));
 expect(source8.context).toContain('范围与单位');
 expect(source8.reading).toContain('20, 30 and 40');
 expect(u8.questions[0].answer).toContain('50%');
 expect(u8.questions[1].answer).toContain('40');
 expect(u8.questions[2].answer).toContain('no evidence');
 expect(u8.paragraphs[0].zh).toContain('每周访问');
});


it('legacy Task 1 U05/U06 grammar/vocabulary sources do not reintroduce mismatched packing and study-site maps',()=>{
 const process=SPECIALTY_LESSONS.find(u=>u.id==='en-process-report-grammar')!;
 const recycling=SPECIALTY_LESSONS.find(u=>u.id==='en-task1-u05-recycling-process-lexicon')!;
 expect(process.sections[0].table?.rows).toHaveLength(6);
 expect(process.sections[0].table?.rows[5][1]).toContain('cut for reuse');
 expect(process.model.map(e=>e.target).join(' ')).not.toMatch(/sheets\s+are\s+packed|dried\s+and\s+packed|ends\s+with\s+packing|finally,\s+[^.]*packed/iu);
 expect(recycling.sections[0].table?.rows[5][0]).toContain('Cut');
 const map=SPECIALTY_LESSONS.find(u=>u.id==='en-map-change-lexicon')!;
 const geometry=map.sections[0].table!.rows;
 expect(geometry).toHaveLength(4);
 expect(geometry[0]).toContain('North');
 expect(geometry[0].join(' ')).toContain('Car park');
 expect(geometry[0].join(' ')).toContain('Garden');
 expect(geometry[1].join(' ')).toContain('Library retained unchanged');
 expect(geometry[2].join(' ')).toContain('Existing café extended');
 expect(geometry[3].join(' ')).toContain('New footpath along southern boundary');
 expect(map.model.map(x=>x.target).join(' ')).not.toContain('study rooms');
 expect(map.model.map(x=>x.target).join(' ')).not.toContain('central footpath');
});


it('Task2 U02–U05 provides four genuine bilingual argument lessons and 250+ word non-official model essays',()=>{
 const expected=[
  ['en-ielts-writing-task2-u02',492,'public spaces','hypothetical','庭院'],
  ['en-ielts-writing-task2-u03',477,'standardised tests','consistent','考试'],
  ['en-ielts-writing-task2-u04',519,'vocational','programme','专业'],
  ['en-ielts-writing-task2-u05',488,'online','non-digital','线上']
 ] as const;
 for(const [id,words,term,answerTerm,mandarin] of expected){
  const source=JSON.parse(readFileSync('content/lesson-drafts/'+id+'.json','utf8'));
  const lesson=RECEPTION_LESSONS[id];
  expect(lesson,id).toBeDefined();
  expect(lesson.language).toBe('en');
  expect(lesson.paragraphs.map(x=>x.id)).toEqual(['P1','P2','P3','P4']);
  expect(lesson.paragraphs.map(x=>x.target).join(' ').trim().split(/\s+/u).length,id).toBe(words);
  expect(lesson.paragraphs.every(x=>x.target.trim().split(/\s+/u).length>=110&&x.zh.length>=175),id).toBe(true);
  expect(lesson.questions.length,id).toBe(4);
  expect(lesson.questions.every(x=>x.answer.length>22&&x.why.length>=32&&x.evidence.length>=1&&x.evidence.every(e=>lesson.paragraphs.some(p=>p.id===e))),id).toBe(true);
  expect(lesson.languageNotes.length,id).toBe(4);
  expect(lesson.model.trim().split(/\s+/u).length,id).toBeGreaterThanOrEqual(250);
  expect(lesson.modelZh.length,id).toBeGreaterThan(500);
  expect(lesson.paragraphs.map(x=>x.target).join(' ').toLowerCase(),id).toContain(term);
  expect(lesson.questions.map(x=>x.answer).join(' '),id).toMatch(new RegExp(answerTerm,'i'));
  expect(lesson.paragraphs.map(x=>x.zh).join(' '),id).toContain(mandarin);
  expect(source.content_status).toBe('original_draft');
  expect(index.find(x=>x.id===id)?.audio_status).toBe('missing_audio');
  expect(lesson.references).toContain('content/lesson-drafts/'+id+'.json');
  expect(lesson.references.some(url=>url.startsWith('https://ielts.org/'))).toBe(true);
 }
 const u02=RECEPTION_LESSONS['en-ielts-writing-task2-u02'];
 expect(u02.questions[1].answer).toContain('hypothetical');
 expect(u02.questions[1].why).toContain('研究');
 const u03=RECEPTION_LESSONS['en-ielts-writing-task2-u03'];
 expect(u03.questions[2].answer).toContain('complements');
 const u04=RECEPTION_LESSONS['en-ielts-writing-task2-u04'];
 expect(u04.questions[2].answer).toContain('programme');
 const u05=RECEPTION_LESSONS['en-ielts-writing-task2-u05'];
 expect(u05.questions[2].answer).toContain('non-digital');
});


it('audits all authored paragraph-level Chinese links and preserves independent editorial/audio gates',()=>{
 const indexed=new Set(index.map(x=>x.id));
 const courses=new Set(COURSES.map(x=>x.id));
 let checked=0;
 for(const [courseId,lesson] of Object.entries(RECEPTION_LESSONS)){
  expect(courses.has(courseId),courseId+' unknown original course').toBe(true);
  expect(lesson.paragraphs.length,courseId+' incomplete paragraph mapping').toBeGreaterThanOrEqual(4);
  const paragraphIds=new Set(lesson.paragraphs.map(x=>x.id));
  expect(paragraphIds.size,courseId+' duplicate paragraph ids').toBe(lesson.paragraphs.length);
  for(const part of lesson.paragraphs){
   expect(part.id.trim().length,courseId+' blank paragraph id').toBeGreaterThanOrEqual(1);
   expect(part.target.trim().length,courseId+':'+part.id+' empty original').toBeGreaterThan(65);
   expect(part.zh.trim().length,courseId+':'+part.id+' incomplete Chinese counterpart').toBeGreaterThan(28);
   expect(part.zh.trim(),courseId+':'+part.id+' untranslated duplication').not.toBe(part.target.trim());
  }
  expect(lesson.questions.every(q=>q.evidence.length>0&&q.evidence.every(id=>paragraphIds.has(id))),courseId+' broken evidence ids').toBe(true);
  expect(lesson.questions.every(q=>q.answer.trim().length>0&&q.why.trim().length>=10),courseId+' empty answer explanation').toBe(true);
  expect(lesson.model.trim().length,courseId+' empty model').toBeGreaterThan(45);
  expect(lesson.modelZh.trim().length,courseId+' missing model Chinese').toBeGreaterThan(45);
  if(courseId.startsWith('en-ielts-writing-task2-')){
   expect(lesson.model.trim().split(/\s+/u).length,courseId+' under 250 Task2 words').toBeGreaterThanOrEqual(250);
  }
  if(indexed.has(courseId))expect(index.find(x=>x.id===courseId)?.audio_status,courseId+' audio remains unverified').toBe('missing_audio');
  checked++;
 }
 expect(checked).toBeGreaterThanOrEqual(42);
});


it('Task 2 U06–U08 full bilingual argument lessons follow original cause, reference and hedging evidence',()=>{
 const cases=[
  ['en-ielts-writing-task2-u06',508,'congestion','stagger','拥堵'],
  ['en-ielts-writing-task2-u07',501,'instrument hire','tuition','租赁费'],
  ['en-ielts-writing-task2-u08',503,'inevitably','face-to-face','友谊']
 ] as const;
 for(const [course,wordCount,sourceTerm,evidenceTerm,zhTerm] of cases){
  const draft=JSON.parse(readFileSync('content/lesson-drafts/'+course+'.json','utf8'));
  const lesson=RECEPTION_LESSONS[course];
  expect(lesson,course).toBeDefined();
  expect(lesson.language).toBe('en');
  expect(lesson.paragraphs.map(x=>x.id)).toEqual(['P1','P2','P3','P4']);
  expect(lesson.paragraphs.map(x=>x.target).join(' ').trim().split(/\s+/u).length,course).toBe(wordCount);
  expect(lesson.paragraphs.every(x=>x.target.trim().split(/\s+/u).length>=110&&x.zh.length>=185),course).toBe(true);
  expect(lesson.paragraphs.map(x=>x.target).join(' ').toLowerCase(),course).toContain(sourceTerm);
  expect(lesson.paragraphs.map(x=>x.target).join(' ').toLowerCase(),course).toContain(evidenceTerm);
  expect(lesson.paragraphs.map(x=>x.zh).join(' '),course).toContain(zhTerm);
  expect(lesson.questions,course).toHaveLength(4);
  expect(lesson.questions.every(q=>q.why.length>=40&&q.evidence.length>0&&q.evidence.every(e=>lesson.paragraphs.some(p=>p.id===e))),course).toBe(true);
  expect(lesson.languageNotes,course).toHaveLength(4);
  expect(lesson.model.trim().split(/\s+/u).length,course).toBeGreaterThanOrEqual(250);
  expect(lesson.modelZh.length,course).toBeGreaterThanOrEqual(500);
  expect(lesson.references).toContain('content/lesson-drafts/'+course+'.json');
  expect(draft.content_status).toBe('original_draft');
  expect(index.find(x=>x.id===course)?.audio_status).toBe('missing_audio');
 }
 const congestion=RECEPTION_LESSONS['en-ielts-writing-task2-u06'];
 expect(congestion.questions[1].answer).toContain('Schools and employers');
 expect(congestion.questions[2].answer).toContain('No.');
 const school=RECEPTION_LESSONS['en-ielts-writing-task2-u07'];
 expect(school.questions[0].answer).toContain('tuition');
 expect(school.questions[1].answer).toContain('not shortages');
 const social=RECEPTION_LESSONS['en-ielts-writing-task2-u08'];
 expect(social.questions[0].answer).toContain('universal');
 expect(social.questions[2].answer).toContain('No.');
});


it('Task2 U01 follows the actual pre-existing 9k-character original online-university source, not a substituted example',()=>{
 const course='en-ielts-writing-task2-u01';
 const source=readFileSync('public/learning-assets/en-ielts-writing-task2-u01.txt','utf8');
 expect(source).toContain('Some universities offer more courses online rather than in traditional classrooms.');
 expect(source).toContain('Discuss one important benefit and one potential drawback');
 expect(source).toContain('which matters more in your view');
 expect(source).toContain('does not guarantee effective learning');
 const lesson=RECEPTION_LESSONS[course];
 expect(lesson.language).toBe('en');
 expect(lesson.paragraphs.map(p=>p.id)).toEqual(['P1','P2','P3','P4']);
 expect(lesson.paragraphs.map(p=>p.target).join(' ').trim().split(/\s+/u)).toHaveLength(531);
 expect(lesson.paragraphs.every(p=>p.target.trim().split(/\s+/u).length>=120&&p.zh.length>=195)).toBe(true);
 expect(lesson.questions.length).toBe(4);
 expect(lesson.questions.every(q=>q.evidence.length>0&&q.evidence.every(id=>lesson.paragraphs.some(p=>p.id===id))&&q.why.length>=40)).toBe(true);
 expect(lesson.languageNotes.length).toBe(4);
 expect(lesson.model.trim().split(/\s+/u).length).toBeGreaterThanOrEqual(250);
 expect(lesson.modelZh.length).toBeGreaterThanOrEqual(500);
 expect(lesson.questions[0].answer).toContain('which effect matters more');
 expect(lesson.questions[1].answer).toContain('outcomes');
 expect(lesson.questions[3].answer).toContain('No.');
 expect(lesson.references).toContain('public/learning-assets/en-ielts-writing-task2-u01.txt');
 expect(index.find(x=>x.id===course)?.audio_status).toBe('missing_audio');
 expect(index.find(x=>x.id===course)?.content_status).toBe('existing_original');
});


it('binds Chinese prompts and answers to all 202 retained original draft questions',()=>{
 let count=0;
 for(const row of index.filter(x=>x.draft_path)){
  const draft=JSON.parse(readFileSync(row.draft_path!,'utf8'));
  const translated=mainQuestionChinese(draft);
  expect(translated).toHaveLength(draft.questions.length);
  translated.forEach((q,i)=>{
   expect(q,row.id+' question '+i).toBeDefined();
   expect(q!.prompt).toMatch(/[\u3400-\u9fff]/u);
   expect(q!.answer).toMatch(/[\u3400-\u9fff]/u);
   count++;
  });
  const changed={...draft,questions:draft.questions.map((q:any)=>({...q,prompt:'Changed '+q.prompt}))};
  expect(mainQuestionChinese(changed).every(q=>q===undefined)).toBe(true);
 }
 expect(count).toBe(202);
});


it('provides exact full-paragraph Chinese bindings for retained reading and listening, without translating changed sources',()=>{
 const drafts=index.filter(x=>x.draft_path).map(x=>JSON.parse(readFileSync(x.draft_path!,'utf8')));
 expect(drafts).toHaveLength(101);
 for(const d of drafts){
  for(const source of [d.reading,d.listening_script]){
   expect(mainOriginalChinese(d.id,source),d.id).toMatch(/[\u3400-\u9fff]/u);
   expect(mainOriginalChinese(d.id,source+' changed')).toBeUndefined();
  }
 }
 expect(mainOriginalChinese('fr-a1-u11',drafts.find(x=>x.id==='fr-a1-u11').reading)).not.toMatch(/姐姐|妹妹/);
 expect(mainOriginalChinese('en-ielts-writing-task1-u04',drafts.find(x=>x.id==='en-ielts-writing-task1-u04').reading)).toContain('十个百分点');
});


it('shows concrete Chinese learning goals without changing original manuscripts',()=>{
 const main=COURSES.filter(x=>x.kind==='main');
 expect(Object.keys(MAIN_COURSE_GOALS).sort()).toEqual(main.map(x=>x.id).sort());
 expect(new Set(main.map(x=>x.goal)).size).toBe(108);
 for(const course of COURSES)expect(course.goal,course.id).toMatch(/[\u3400-\u9fff]/u);
 expect(COURSES.find(x=>x.id==='en-ielts-writing-task1-u01')!.goal).toContain('150');
 expect(COURSES.find(x=>x.id==='en-ielts-writing-task2-u01')!.goal).toContain('250');
 expect(COURSES.find(x=>x.id==='fr-a1-u03')!.goal).toContain('不猜测');
});


it('French A2 U07 identifies source-level pour que subjunctive without conflating it with si-present future conditional',()=>{
 const source=JSON.parse(readFileSync('content/lesson-drafts/fr-a2-u07.json','utf8'));
 expect(source.reading).toContain('pour que nous puissions prévoir assez de places');
 expect(source.grammar).toContain('si + présent');
 const lesson=RECEPTION_LESSONS['fr-a2-u07'];
 expect(lesson.paragraphs[0].target).toContain('pour que nous puissions prévoir assez de places');
 const target=lesson.languageNotes.find(n=>n.target==='pour que nous puissions prévoir assez de places');
 expect(target).toBeDefined();
 expect(target?.zh).toContain('虚拟式现在时');
 expect(target?.zh).toContain('本课 A2 先识别');
 expect(target?.zh).toContain('B1');
 expect(lesson.languageNotes.some(n=>n.target.includes('Si le temps est beau'))).toBe(true);
});

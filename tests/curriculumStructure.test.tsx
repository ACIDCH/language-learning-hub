import React from 'react';
import {cleanup,fireEvent,render,screen} from '@testing-library/react';
import {afterEach,describe,it,expect,vi} from 'vitest';
import english from '../content/lesson-drafts/en-ielts-listening-u01.json';
import french from '../content/lesson-drafts/fr-a1-u04.json';
import {COURSES,foundationText,type LessonContent} from '../src/v44Courses';
import {FOUNDATION_UNITS} from '../src/foundationCurriculum';
import {lessonIpaSample,parseManuscript} from '../src/manuscriptPresentation';
import StructuredLesson from '../src/StructuredLesson';
import {linkedSpecialties} from '../src/specialtyLibrary';
import LessonReader from '../src/LessonReader';
import LessonBody from '../src/LessonBody';
import {CHINESE_LESSON_NOTES} from '../src/bilingualTeachingNotes';
import {ENGLISH_ORIGINAL_BILINGUAL} from '../src/bilingualOriginalEnglish';
import {outputGuide} from '../src/curriculumTeachingGuide';
import BilingualTeaching from '../src/BilingualTeaching';
import {curatedUnitForSource,FRENCH_ARTICLES,STUDY_SPACES} from '../src/curatedCurriculum';
import {learnerFacingText,learnerFacingLessonText,pronunciationPassages} from '../src/lessonPresentationText';
import type {LessonDraft} from '../src/v44Courses';

vi.mock('../src/IpaText',()=>({default:({text}:{text:string})=><div aria-label="参考国际音标与课程原文">{text}</div>,speakIpaText:()=>true}));
afterEach(()=>{cleanup();});
const course=COURSES.find(x=>x.id==='en-ielts-listening-u01')!;
const data:LessonContent={text:'Source text stays immutable.',sources:[],appendices:[],vocabulary:english.vocabulary,draft:english as LessonDraft};
describe('semantic curriculum without broken full-page IPA',()=>{
 it('exposes five teaching sections without a separate pronunciation stage',()=>{
  const onChangeStage=vi.fn();
  const {rerender}=render(<StructuredLesson content={data} course={course} stage={0} onChangeStage={onChangeStage} onOpenSpeech={vi.fn()} ttsRate={.85}/>);
  const tabs=screen.getByRole('navigation',{name:'本课教学环节'});
  expect(tabs.querySelectorAll('button')).toHaveLength(5);
  expect(screen.queryByRole('button',{name:/发音/})).toBeNull();
  expect(screen.getByText(english.context)).toBeTruthy();
  fireEvent.click(screen.getByRole('button',{name:/02语法/}));
  expect(onChangeStage).toHaveBeenCalledWith(1);
  rerender(<StructuredLesson content={data} course={course} stage={1} onChangeStage={onChangeStage} onOpenSpeech={vi.fn()} ttsRate={.85}/>);
  if(linkedSpecialties('grammar',course.id).length){
   expect(document.querySelector('.course-specialty-inline')).not.toBeNull();
   expect(document.querySelector('.course-specialty-pair')).not.toBeNull();
   expect(document.querySelector('.curriculum-concepts')).toBeNull();
  }else{
   expect(screen.getByText(english.common_mistake)).toBeTruthy();
   expect(screen.getAllByText(english.examples[0].text).length).toBeGreaterThanOrEqual(1);
  }
  expect(screen.queryByText(/原文例句：结合本课知识讲解/)).toBeNull();
 });
 it('reveals accurate sourced answer only after learner chooses to check',()=>{
  const {container}=render(<StructuredLesson content={data} course={course} stage={3}
   onChangeStage={vi.fn()} onOpenSpeech={vi.fn()} ttsRate={.85}/>);
  expect(container.querySelectorAll('.curriculum-question')).toHaveLength(english.questions.length);
  expect(screen.queryByText(english.questions[0].answer)).toBeNull();
  fireEvent.change(screen.getByLabelText('1. '+english.questions[0].prompt),{target:{value:'conditions needed for shade'}});
  fireEvent.click(screen.getAllByRole('button',{name:'核对参考答案'})[0]);
  expect(screen.getByText(english.questions[0].answer)).toBeTruthy();
  expect(screen.getByText(english.questions[0].explanation)).toBeTruthy();
 });
 it('renders a French starter course through the same structured teaching layer',()=>{
  const target=COURSES.find(x=>x.id==='fr-a1-u04')!;
  const frenchContent:LessonContent={text:'Retained',sources:[],appendices:[],vocabulary:french.vocabulary,draft:french as LessonDraft};
  render(<StructuredLesson content={frenchContent} course={target} stage={2} onChangeStage={vi.fn()} onOpenSpeech={vi.fn()} ttsRate={.85}/>);
  if(linkedSpecialties('vocabulary',target.id).length){
   expect(document.querySelector('.course-specialty-inline')).not.toBeNull();
   expect(document.querySelector('.curriculum-vocabulary')).toBeNull();
  }else{
   expect(screen.getAllByText('un bureau').length).toBeGreaterThan(0);
   expect(screen.getAllByText('书桌').length).toBeGreaterThan(0);
   expect(screen.getByRole('button',{name:'播放 un bureau'})).toBeTruthy();
  }
 });
 it('also supports all 48 typed foundation units without converting their exercises to prose',()=>{
  expect(FOUNDATION_UNITS.length).toBe(48);
  const u=FOUNDATION_UNITS.find(x=>x.language==='fr')!;
  const c=COURSES.find(x=>x.id===u.id)!;
  const content:LessonContent={text:foundationText(u),sources:[],appendices:[],vocabulary:u.vocab,foundation:u};
  const view=render(<StructuredLesson content={content} course={c} stage={1}
    onChangeStage={vi.fn()} onOpenSpeech={vi.fn()} ttsRate={.85}/>);
  expect(view.container.querySelectorAll('.curriculum-concepts li')).toHaveLength(3);
  expect(view.container.querySelectorAll('.curriculum-example')).toHaveLength(3);
 });
 it('provides source-grounded aligned Chinese teaching for seven original language units',()=>{
  const ids=['fr-a1-u01','fr-a1-u02','fr-a1-u03','en-ielts-reading-u01',
   'en-ielts-reading-u02','en-ielts-writing-task1-u01','en-ielts-writing-task2-u01'];
  for(const id of ids){
   const note=CHINESE_LESSON_NOTES[id]||ENGLISH_ORIGINAL_BILINGUAL[id];
   expect(note,id).toBeDefined();
   expect(note.grammar.length,id).toBeGreaterThanOrEqual(2);
   expect(note.dialogue.length,id).toBeGreaterThanOrEqual(3);
   expect(note.vocabulary.length,id).toBeGreaterThanOrEqual(5);
   expect(note.output.frame.length,id).toBeGreaterThanOrEqual(2);
   expect(note.reading.pairs.every(x=>!!x.zh.trim()),id).toBe(true);
  }
 });
 it('teaches source-linked Chinese grammar and example usage even before a lesson receives a bespoke translation',()=>{
  const source=COURSES.find(c=>c.id==='fr-a2-u01')!;
  expect(source.kind).toBe('main');
  const lesson={...data,draft:{...data.draft!,id:'fr-a2-u01',
    context:'周末旅行',grammar:'先辨认助动词。avoir 下通常不与主语配合。',
    common_mistake:'不要把助动词当作过去分词。',
    examples:[{text:'Elles ont réservé deux lits.',note:''}],
    vocabulary:[['réservé','预订过'],['deux lits','两张床']]}} as LessonContent;
  const {container}=render(<BilingualTeaching courseId='fr-a2-u01' stage={1} content={lesson}/>);
  expect(container.textContent).toContain('逐条理解语法规则');
  expect(container.textContent).toContain('Elles ont réservé deux lits.');
  expect(container.textContent).toContain('预订过');
  expect(container.textContent).toContain('不要把助动词当作过去分词');
 });
 it('teaches French un/une/des and il y a from the matching private grammar topic',()=>{
  const raw="② GRAMMAIRE\\nun/une/des 表示非特指；le/la/les 表示已知事物。il y a 表示存在。";
  const {container}=render(<BilingualTeaching courseId="fr-a1-u01"
    stage={1} privateSource sourceText={raw}/>);
  expect(container.textContent).toContain('不定冠词：un / une / des');
  expect(container.textContent).toContain('Il n');
  expect(container.textContent).toContain('这里没有笔');
 });
 it('does not paste unrelated public example translations over a different private manuscript',()=>{
  const {container}=render(<BilingualTeaching courseId="en-ielts-listening-u01"
    stage={1} content={data} privateSource sourceText="Private lesson about learning bicycles."/>);
  expect(container.querySelector('.bilingual-line')).toBeNull();
 });
 it('switches Chinese language examples with the selected private lecture topic',()=>{
  const {container}=render(<BilingualTeaching courseId="en-ielts-listening-u01"
    stage={3} privateSource sourceText="The lecture considers whether providing study spaces leads to better learning. Room occupancy can be observed."/>);
  expect(container.textContent).toContain('使用量');
  expect(container.textContent).not.toContain('树冠');
 });
 it('gives actionable Chinese output instructions rather than the generic draft boilerplate',()=>{
  const sample=outputGuide(course,data);
  expect(sample.task).toContain('复述');
  expect(sample.steps.length).toBeGreaterThanOrEqual(3);
  expect(sample.criteria.length).toBeGreaterThanOrEqual(3);
 });
 it('separates private manuscript headings, application, exemplar and check without dropping instructional text',()=>{
  const source='⑥ APPLIED OUTPUT, EXEMPLAR AND SELF-REVIEW\nFirst-pass: label opening, measurement and conclusion.\nSecond-pass: make a five-cell map.\nOriginal worked model:\nThe lecturer considers whether study spaces lead to better learning.\nCheck: correct speaker attribution and question type.';
  const chunks=parseManuscript(source);
  expect(chunks.map(x=>x.kind)).toEqual(['heading','task','task','example','paragraph','task']);
  expect(chunks.map(x=>x.text).join('\n')).toContain('five-cell map');
  expect(chunks.map(x=>x.text).join('\n')).toContain('correct speaker attribution');
 });
 it('removes stale V4 heading but retains the grammar teaching content beneath it',()=>{
  const text='un/une/des 表示非特指。\n【V4 校订与入门补充】\n冠词要连同名词记忆：une table, un livre.';
  const {container}=render(<LessonBody text={text}/>);
  expect(container.textContent).not.toContain('V4 校订与入门补充');
  expect(container.textContent).toContain('冠词要连同名词记忆');
  expect(container.textContent).toContain('un/une/des');
 });
 it('formats semantic headings and bold concepts in private teaching notes',()=>{
  const {container}=render(<LessonBody text={'## Concepts'+String.fromCharCode(10)+'**Stance and modality:** may and could have different evidence strength.'}/>);
  expect(container.querySelector('.lesson-content-section')?.textContent).toBe('Concepts');
  expect(container.querySelector('.lesson-content-group strong')?.textContent).toBe('Stance and modality:');
  expect(container.textContent).toContain('may and could');
 });
 it('keeps IPA bounded to a short excerpt and never phonemizes a 500-word manuscript all at once',()=>{
  const long='To begin with, we need to distinguish planting trees from maintaining them. '+'Extended essay paragraphs. '.repeat(100);
  const sample=lessonIpaSample(long);
  expect(sample.length).toBeLessThanOrEqual(185);
  expect(sample).toContain('To begin with');
  const {container}=render(<LessonReader text={long} language="en" courseId="en-ielts-listening-u01" stage={0} onChangeStage={vi.fn()}/>);
  expect(screen.queryByRole('checkbox',{name:'显示 IPA'})).toBeNull();
  expect(container.querySelector('.lesson-content-flow')?.textContent).toContain('Extended essay paragraphs');
 });
});


describe('source-matched textbooks: grammar accuracy, bilingual alignment and non-destructive private rendering',()=>{
 const frenchSource=[
  '① SITUATION\nVoici ma chambre.',
  '② GRAMMAIRE\nun/une/des signifie une première introduction. il y a montre une présence.',
  '③ VOCABULAIRE\nun livre, une table.',
  '④ LECTURE\nIl y a des livres sur la table.',
  '⑤ PRONONCIATION\nHistorical speech material remains stored.',
  '⑥ EXPRESSION\nPrésentez une chambre.'
 ].join('\n\n');
 const englishSource=[
  '① SCENARIO\nThe lecture considers whether providing study spaces leads to better learning.',
  '② GRAMMAR\nRoom occupancy can be observed. However, evidence must be qualified.',
  '③ VOCABULARY\nmeasurement, limitation, conclusion.',
  '④ LISTENING\nUsage figures do not measure academic achievement.',
  '⑤ PRONUNCIATION\nHistorical audio source content.',
  '⑥ OUTPUT\nFirst-pass: label opening, measurement and conclusion.'
 ].join('\n\n');
 it('matches only genuine topical private texts without repurposing public drafts',()=>{
  expect(curatedUnitForSource('fr-a1-u01',frenchSource,true)?.id).toBe('french-articles');
  expect(curatedUnitForSource('en-ielts-listening-u01',englishSource,true)?.id).toBe('study-spaces');
  expect(curatedUnitForSource('en-ielts-listening-u01',englishSource,false)).toBeNull();
  expect(curatedUnitForSource('fr-a1-u01','A dialogue on railway tickets.',true)).toBeNull();
  expect(curatedUnitForSource('en-ielts-listening-u01','Other private content.',true)).toBeNull();
 });
 it('provides complete nonempty Chinese sentence alignments and actual answer explanations',()=>{
  for(const unit of [FRENCH_ARTICLES,STUDY_SPACES]){
   const pairs=[...unit.scene,...unit.reading.pairs,...unit.output.model,
    ...unit.grammar.flatMap(x=>x.examples)];
   expect(pairs.length).toBeGreaterThan(18);
   expect(pairs.every(p=>p.target.trim().length>5&&p.zh.trim().length>5&&p.why.trim().length>0)).toBe(true);
   expect(unit.grammar.length).toBeGreaterThanOrEqual(4);
   expect(unit.vocabulary.length).toBeGreaterThanOrEqual(8);
   expect((unit.practice[1]||[]).every(p=>p.answer.length>0&&p.explanation.length>5)).toBe(true);
   expect(unit.output.model.length).toBeGreaterThanOrEqual(4);
  }
 });
 it('preserves French negative-article exceptions instead of teaching pas de universally',()=>{
  const examples=FRENCH_ARTICLES.grammar.flatMap(g=>g.examples.map(x=>x.target));
  expect(examples).toContain("Il n'y a pas de livre ici.");
  expect(examples).toContain("Ce n'est pas un livre.");
  expect(examples).toContain("Je n'aime pas les livres.");
  expect(examples).toContain("Il n'y a pas d'ordinateur.");
 });
 it('renders private French grammar as chaptered bilingual teaching with review controls',()=>{
  const {container}=render(<LessonReader text={frenchSource} courseId='fr-a1-u01' language='fr'
   privateSource stage={1} onChangeStage={vi.fn()}/>);
  expect(container.querySelectorAll('.lesson-stages button')).toHaveLength(5);
  expect(container.querySelector('.curated-lesson')).not.toBeNull();
  expect(container.textContent).toContain('不定冠词：un / une / des');
  expect(container.textContent).toContain('这不是一本书');
  expect(container.querySelector('.curated-source-details')).not.toBeNull();
  expect(container.querySelector('.curated-source-details')?.textContent).toContain('un/une/des');
  expect(container.querySelectorAll('.curated-question')).toHaveLength(FRENCH_ARTICLES.practice[1]!.length);
  expect(container.querySelector('.curated-answer')).toBeNull();
  fireEvent.click(screen.getAllByRole('button',{name:'核对答案与解析'})[0]);
  expect(container.querySelector('.curated-answer')?.textContent).toContain('chaise');
 });
 it('keeps a different private manuscript untouched instead of pasting unrelated curated chapters',()=>{
  const unrelated=frenchSource.replace('un/une/des signifie une première introduction. il y a montre une présence.','les trains se déplacent en France.');
  const {container}=render(<LessonReader text={unrelated} courseId='fr-a1-u01' language='fr'
   privateSource stage={1} onChangeStage={vi.fn()}/>);
  expect(container.querySelector('.curated-lesson')).toBeNull();
  expect(container.querySelector('.lesson-content-flow')?.textContent).toContain('les trains se déplacent');
 });
 it('teaches academic lecture evidence constraints and preserves source quotations',()=>{
  const {container}=render(<LessonReader text={englishSource} courseId='en-ielts-listening-u01' language='en'
   privateSource stage={3} onChangeStage={vi.fn()}/>);
  expect(container.querySelector('.curated-lesson')).not.toBeNull();
  expect(container.textContent).toContain('使用量');
  expect(container.textContent).toContain('研究问题');
  expect(container.textContent).toContain('学业成就');
  expect(container.querySelectorAll('.curated-sentence')).toHaveLength(STUDY_SPACES.reading.pairs.length);
  expect(container.querySelector('.curated-source-details')?.textContent).toContain('do not measure academic achievement');
 });
 it('keeps a meaningful bilingual drafting task in the final stage',()=>{
  const onSaveOutput=vi.fn();
  const {container}=render(<LessonReader text={englishSource} courseId='en-ielts-listening-u01' language='en'
   privateSource stage={5} onChangeStage={vi.fn()} onSaveOutput={onSaveOutput}/>);
  expect(container.textContent).toContain('80—120');
  expect(container.querySelectorAll('.curated-sentence')).toHaveLength(STUDY_SPACES.output.model.length);
  fireEvent.change(screen.getByLabelText('我的完整表达'),{target:{value:'The lecture raises a question about facilities.'}});
  expect(container.textContent).toContain('当前英文词数：7');
  fireEvent.click(screen.getByRole('button',{name:'加入本课学习笔记'}));
  expect(onSaveOutput).toHaveBeenCalledWith('The lecture raises a question about facilities.');
 });
});


describe('wide learner reader without editorial metadata in prose or IPA',()=>{
 const source=[
  'FR-A1-U01｜Saluer et se présenter：问候与自我介绍（原创完整样课 v0.1）',
  '状态：教学内容草稿已完整编写；等待原始音频逐条核对与授权绑定。',
  '① 情境\nA : Bonjour ! Je m\'appelle Camille. Et vous, comment vous appelez-vous ?',
  '② 语法\nJe suis étudiante. 这是法语的动词形式。',
  '③ 词汇\nbonjour 你好；enchantée 很高兴认识你。',
  '④ 听读\nJe m\'appelle Alex. Enchanté !',
  '⑤ 发音与跟读\nHistorical standalone pronunciation drill.',
  '⑥ 表达\nBonjour Madame, je m\'appelle Lina.',
  '课程权利与来源：\n上述对话、阅读、例句和讲解均为本项目原创示范。',
  'https://example.org/manual',
  '===== V0.2 ADDENDUM — U01 =====',
  '本补充包只追加在原课件后面，原版全部内容、示例和参考来源均保留。',
  'A. 语法练习\nJe suis professeur.'
 ].join('\n\n');
 it('keeps learnable examples but excludes version, licensing and source statements',()=>{
  const visible=learnerFacingText(source);
  expect(visible).toContain('Bonjour !');
  expect(visible).toContain('Je suis professeur.');
  expect(visible).not.toContain('原创完整样课 v0.1');
  expect(visible).not.toContain('状态：教学内容');
  expect(visible).not.toContain('版权');
  expect(visible).not.toContain('课程权利与来源');
  expect(visible).not.toContain('本补充包只追加');
  expect(visible).not.toContain('https://example.org/manual');
 });
 it('keeps the existing five-stage transition and removes archived pronunciation in the source projection',()=>{
  const text=learnerFacingLessonText(source);
  expect(text).toContain('Je suis étudiante.');
  expect(text).toContain('Je m\'appelle Alex.');
  expect(text).not.toContain('Historical standalone pronunciation drill.');
 });
 it('does not generate ruby IPA from the title, administrative prose or Chinese text',()=>{
  const chunks=pronunciationPassages(source);
  expect(chunks.length).toBeGreaterThan(0);
  expect(chunks[0]).toContain('Bonjour');
  expect(chunks.every(s=>s.length<=240)).toBe(true);
  expect(chunks.join(' ')).not.toContain('原创完整样课');
  expect(chunks.join(' ')).not.toContain('Historical standalone pronunciation drill.');
 });
 it('preserves standard course stage controls when rendered standalone without the shared toolbar',()=>{
  const {container}=render(<LessonReader text={source} courseId='fr-a1-u01' stage={0} onChangeStage={vi.fn()}/>);
  expect(container.querySelectorAll('.lesson-stages button')).toHaveLength(5);
 });
 it('can suppress duplicate stage navigation when the parent provides the sticky reader toolbar',()=>{
  const {container}=render(<LessonReader text={source} courseId='fr-a1-u01' stage={0}
   onChangeStage={vi.fn()} hideTabs/>);
  expect(container.querySelector('.lesson-stages')).toBeNull();
  expect(container.querySelector('.bilingual-teaching')).not.toBeNull();
 });
});


describe('fully mapped main-course grammar and vocabulary are directly teachable',()=>{
 it('renders a mapped French B1 grammar chapter without redirect or generic outline duplication',()=>{
  const c=COURSES.find(x=>x.id==='fr-b1-u01')!;
  const courseData={...data,draft:{...data.draft!,id:c.id}} as LessonContent;
  const {container}=render(<StructuredLesson content={courseData} course={c}
   stage={1} onChangeStage={vi.fn()} onOpenSpeech={vi.fn()} ttsRate={.85}/>);
  expect(container.querySelectorAll('.course-specialty-inline')).toHaveLength(1);
  expect(container.textContent).toContain('plus-que-parfait');
  expect(container.querySelectorAll('.course-specialty-chapters button')).toHaveLength(4);
  expect(container.querySelector('.curriculum-concepts')).toBeNull();
  expect(container.querySelector('.bilingual-teaching')).toBeNull();
  fireEvent.click(screen.getByRole('button',{name:/时间线：先前动作/}));
  expect(container.textContent).toContain('le cours avait déjà commencé');
  expect(container.querySelectorAll('.course-specialty-question')).toHaveLength(4);
  expect(container.querySelector('.course-specialty-production')).not.toBeNull();
  expect(container.querySelector('.course-specialty-answer')).toBeNull();
  fireEvent.click(screen.getAllByRole('button',{name:'核对答案与解析'})[0]);
  expect(container.querySelector('.course-specialty-answer')).not.toBeNull();
 });
 it('renders authored B2 lexical content inside its course and keeps the course stage navigation',()=>{
  const c=COURSES.find(x=>x.id==='en-ielts-writing-task1-u06')!;
  const courseData={...data,draft:{...data.draft!,id:c.id}} as LessonContent;
  const {container}=render(<StructuredLesson content={courseData} course={c}
   stage={2} onChangeStage={vi.fn()} onOpenSpeech={vi.fn()} ttsRate={.85}/>);
  expect(container.querySelectorAll('.course-specialty-topic')).toHaveLength(1);
  expect(container.querySelectorAll('.course-specialty-chapters button')).toHaveLength(4);
  expect(container.querySelectorAll('.course-specialty-table tbody tr')).toHaveLength(4);
  expect(container.querySelectorAll('.curriculum-vocabulary')).toHaveLength(0);
  expect(container.querySelectorAll('.curriculum-tabs button')).toHaveLength(5);
 });
 it('keeps ordinary source content on courses without an exact unit mapping',()=>{
  const c=COURSES.find(x=>x.id==='fr-b2-u08')!;
  expect(linkedSpecialties('grammar',c.id)).toHaveLength(0);
  const courseData={...data,draft:{...data.draft!,id:c.id}} as LessonContent;
  const {container}=render(<StructuredLesson content={courseData} course={c}
   stage={1} onChangeStage={vi.fn()} onOpenSpeech={vi.fn()} ttsRate={.85}/>);
  expect(container.querySelector('.course-specialty-inline')).toBeNull();
  expect(container.querySelector('.curriculum-concepts')).not.toBeNull();
 });
});


describe('mapped B2/C1 written outputs remain inside the exact source course',()=>{
 it('allows drafting and saving the DELF B2 answer without visiting a separate specialty page',()=>{
  const c=COURSES.find(x=>x.id==='fr-b2-u06')!;
  const courseData={...data,draft:{...data.draft!,id:c.id}} as LessonContent;
  const save=vi.fn();
  const {container}=render(<StructuredLesson content={courseData} course={c}
   stage={1} onChangeStage={vi.fn()} onOpenSpeech={vi.fn()} onSaveOutput={save} ttsRate={.85}/>);
  expect(container.querySelector('.course-specialty-inline')).not.toBeNull();
  expect(container.textContent).toContain('正式论证写作');
  const writing=screen.getByLabelText('我的完整表达');
  fireEvent.change(writing,{target:{value:'Madame la Directrice, je souhaite proposer une discussion.'}});
  fireEvent.click(screen.getByRole('button',{name:'加入本课笔记'}));
  expect(save).toHaveBeenCalledWith('Madame la Directrice, je souhaite proposer une discussion.');
  expect(container.querySelector('.course-specialty-model-paragraph')).not.toBeNull();
 });
 it('contains both invented synthesis documents in the mapped C1 vocabulary stage',()=>{
  const c=COURSES.find(x=>x.id==='fr-c1-u03')!;
  const courseData={...data,draft:{...data.draft!,id:c.id}} as LessonContent;
  const {container}=render(<StructuredLesson content={courseData} course={c}
   stage={2} onChangeStage={vi.fn()} onOpenSpeech={vi.fn()} ttsRate={.85}/>);
  expect(container.querySelector('.course-specialty-inline')).not.toBeNull();
  expect(container.textContent).toContain('Document A');
  expect(container.textContent).toContain('Document B');
  expect(container.textContent).toContain('虚构');
  expect(container.querySelectorAll('.course-specialty-question')).toHaveLength(4);
 });
});

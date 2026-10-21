import React from 'react';
import {cleanup,fireEvent,render,screen} from '@testing-library/react';
import {afterEach,describe,it,expect,vi} from 'vitest';
import english from '../content/lesson-drafts/en-ielts-listening-u01.json';
import french from '../content/lesson-drafts/fr-a1-u04.json';
import {COURSES,foundationText,type LessonContent} from '../src/v44Courses';
import {FOUNDATION_UNITS} from '../src/foundationCurriculum';
import {lessonIpaSample,parseManuscript} from '../src/manuscriptPresentation';
import StructuredLesson from '../src/StructuredLesson';
import LessonReader from '../src/LessonReader';
import {CHINESE_LESSON_NOTES} from '../src/bilingualTeachingNotes';
import {ENGLISH_ORIGINAL_BILINGUAL} from '../src/bilingualOriginalEnglish';
import {outputGuide} from '../src/curriculumTeachingGuide';
import BilingualTeaching from '../src/BilingualTeaching';
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
  expect(screen.getByText(english.common_mistake)).toBeTruthy();
  expect(screen.getAllByText(english.examples[0].text).length).toBeGreaterThanOrEqual(1);
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
  expect(screen.getAllByText('un bureau').length).toBeGreaterThan(0);
  expect(screen.getAllByText('书桌').length).toBeGreaterThan(0);
  expect(screen.getByRole('button',{name:'播放 un bureau'})).toBeTruthy();
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
 it('does not paste unrelated public example translations over a different private manuscript',()=>{
  const {container}=render(<BilingualTeaching courseId="en-ielts-listening-u01"
    stage={1} privateSource sourceText="Private lesson about learning bicycles."/>);
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

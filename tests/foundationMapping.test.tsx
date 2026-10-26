import {afterEach,expect,it} from 'vitest';
import {cleanup,fireEvent,render,screen} from '@testing-library/react';
import {FOUNDATION_UNITS} from '../src/foundationCurriculum';
import {FOUNDATION_CHINESE} from '../src/foundationChinese';
import {FOUNDATION_RECEPTION} from '../src/foundationReception';
import {FOUNDATION_OUTPUT_MODELS} from '../src/foundationOutputModels';
import {FOUNDATION_QUESTION_CHINESE} from '../src/foundationQuestionChinese';
import {FOUNDATION_SPECIALTIES} from '../src/foundationKnowledgeSpecialties';
import {SPECIALTY_LESSONS,linkedSpecialties,specialtyQuality} from '../src/specialtyLibrary';
import {orderedSpecialties,pairedSpecialties} from '../src/specialtyLearningPath';
import SpecialtyLibrary from '../src/SpecialtyLibraryView';
import StructuredLesson from '../src/StructuredLesson';
import {COURSES,foundationText} from '../src/v44Courses';
afterEach(cleanup);
it('connects all 48 foundations to source-preserving paired knowledge chapters and the main progression',()=>{
 expect(FOUNDATION_SPECIALTIES).toHaveLength(96);
 for(const u of FOUNDATION_UNITS){
  for(const kind of ['grammar','vocabulary'] as const){
   const topics=linkedSpecialties(kind,u.id);expect(topics,u.id).toHaveLength(1);
   const topic=topics[0];expect(specialtyQuality(topic),topic.id).toBe(true);
   expect(topic.output).toBe(u.production);expect(topic.model[0].target).toBe(u.reading);
   expect(topic.model[1].target).toBe(FOUNDATION_OUTPUT_MODELS[u.id].target);
   expect(topic.questions.map(q=>q.answer.split(' — ')[0])).toEqual(u.questions.map(q=>q.choices[q.answer]));
   expect(pairedSpecialties(topic,SPECIALTY_LESSONS).map(x=>x.unitLink)).toEqual([u.id]);
  }
  expect(linkedSpecialties('vocabulary',u.id)[0].sections[0].table?.rows).toEqual(u.vocab);
 }
 for(const language of ['fr','en']){
  const path=orderedSpecialties(SPECIALTY_LESSONS.filter(u=>u.language===language&&u.type==='grammar'));
  const foundations=path.filter(u=>u.unitLink.includes('-fnd-'));
  expect(foundations.map(u=>u.unitLink)).toEqual(FOUNDATION_UNITS.filter(u=>u.language===language).map(u=>u.id));
  expect(path[0].level).toBe('Pre-A1');
  expect(path.findIndex(u=>u.id===language+'-fnd-24-grammar')).toBeLessThan(path.findIndex(u=>u.level==='B1'||u.level==='B2'));
 }
});
it('exposes Pre-A1 through the existing specialty filter and returns to the foundation course',()=>{
 let destination='';
 const {container}=render(<SpecialtyLibrary params={new URLSearchParams({page:'specialties',type:'grammar',language:'fr'})} navigate={p=>{destination=p;}}/>);
 fireEvent.change(screen.getByLabelText('专题课程等级'),{target:{value:'Pre-A1'}});
 const buttons=container.querySelectorAll('.specialty-topic-list button');expect(buttons).toHaveLength(4);
 fireEvent.click(buttons[0]);expect(destination).toContain('fr-fnd-01-grammar');
});
it('maps every source question and all 288 choices, including ambiguous distractor explanations',()=>{
 expect(Object.keys(FOUNDATION_QUESTION_CHINESE).sort()).toEqual(FOUNDATION_UNITS.map(u=>u.id).sort());
 for(const u of FOUNDATION_UNITS){
  const translated=FOUNDATION_QUESTION_CHINESE[u.id];expect(translated).toHaveLength(u.questions.length);
  for(const q of translated){
   expect(q.prompt).toMatch(/[\u4e00-\u9fff]/u);expect(q.choices).toHaveLength(3);
   for(const c of q.choices)expect(c).toMatch(/[\u4e00-\u9fff]/u);
  }
 }
 expect(FOUNDATION_QUESTION_CHINESE['fr-fnd-08'][0].choices[0]).toContain('一磅');
 expect(FOUNDATION_QUESTION_CHINESE['en-fnd-06'][1].choices[0]).toContain('回声');
 expect(FOUNDATION_QUESTION_CHINESE['fr-fnd-14'][1].choices[0]).toContain('口语');
});
it('keeps original choices visible and hides translated option explanations until checking',()=>{
 const u=FOUNDATION_UNITS.find(x=>x.id==='fr-fnd-08')!;
 render(<StructuredLesson course={COURSES.find(x=>x.id===u.id)!} content={{text:foundationText(u),sources:[],vocabulary:u.vocab,foundation:u,appendices:[]}}
  stage={3} onChangeStage={()=>{}} onOpenSpeech={()=>{}} ttsRate={1}/>);
 const explanation=FOUNDATION_QUESTION_CHINESE[u.id][0].choices[0];
 expect(screen.queryByText(explanation)).toBeNull();expect(screen.getByText('une livre',{exact:true})).toBeTruthy();
 fireEvent.click(screen.getAllByText('核对参考答案')[0]);
 expect(screen.getByText(explanation)).toBeTruthy();
});
it('provides distinct foundation output responses and respects the eight word-range tasks',()=>{
 expect(Object.keys(FOUNDATION_OUTPUT_MODELS).sort()).toEqual(FOUNDATION_UNITS.map(u=>u.id).sort());
 expect(new Set(Object.values(FOUNDATION_OUTPUT_MODELS).map(m=>m.target)).size).toBe(48);
 for(const u of FOUNDATION_UNITS){
  const m=FOUNDATION_OUTPUT_MODELS[u.id];
  expect(m.target,u.id).not.toBe(u.reading);
  expect(m.zh,u.id).toMatch(/[\u4e00-\u9fff]/u);
  expect(m.check.length,u.id).toBeGreaterThan(25);
 }
 for(const [id,min,max] of [
  ['en-fnd-12',70,100],['en-fnd-15',70,90],['en-fnd-23',90,120],['en-fnd-24',100,130],
  ['fr-fnd-12',60,90],['fr-fnd-16',70,90],['fr-fnd-23',70,90],['fr-fnd-24',90,110],
 ] as const){
  const count=FOUNDATION_OUTPUT_MODELS[id].target.trim().split(/\s+/u).length;
  expect(count,id).toBeGreaterThanOrEqual(min);expect(count,id).toBeLessThanOrEqual(max);
 }
 expect(FOUNDATION_OUTPUT_MODELS['fr-fnd-20'].target).toContain('Treize euros');
 expect(FOUNDATION_OUTPUT_MODELS['fr-fnd-15'].zh).toContain('姐妹');
 expect(FOUNDATION_OUTPUT_MODELS['fr-fnd-15'].zh).not.toMatch(/姐姐|妹妹/u);
});
it.each(['en-fnd-24','fr-fnd-24'])('shows the complete independent output model for %s without replacing the learner response',id=>{
 const u=FOUNDATION_UNITS.find(x=>x.id===id)!;
 render(<StructuredLesson course={COURSES.find(x=>x.id===id)!} content={{text:foundationText(u),sources:[],vocabulary:u.vocab,foundation:u,appendices:[]}}
  stage={5} onChangeStage={()=>{}} onOpenSpeech={()=>{}} ttsRate={1}/>);
 const input=screen.getByLabelText('输入自己的完整答案');
 fireEvent.change(input,{target:{value:'我的独立回答'}});
 fireEvent.click(screen.getByText('查看本课完整表达示范与中文对照'));
 expect(screen.getByText(FOUNDATION_OUTPUT_MODELS[id].target,{exact:true,normalizer:s=>s})).toBeTruthy();
 expect(screen.getByText(FOUNDATION_OUTPUT_MODELS[id].zh,{exact:true,normalizer:s=>s})).toBeTruthy();
 expect((input as HTMLTextAreaElement).value).toBe('我的独立回答');
});
it('maps all 48 original foundation sources without replacing examples or passages',()=>{
 expect(Object.keys(FOUNDATION_CHINESE).sort()).toEqual(FOUNDATION_UNITS.map(x=>x.id).sort());
 for(const u of FOUNDATION_UNITS){
  const lesson=FOUNDATION_RECEPTION[u.id],zh=FOUNDATION_CHINESE[u.id];
  expect(lesson.paragraphs.map(p=>p.target),u.id).toEqual([u.examples[0],u.examples.slice(1).join('\n'),u.listening,u.reading]);
  expect(lesson.paragraphs.map(p=>p.zh),u.id).toEqual([zh.examples[0],zh.examples.slice(1).join('\n'),zh.listening,zh.reading]);
  expect(lesson.paragraphs.map(p=>p.id)).toEqual(['EX1','EX2','LISTEN','READ']);
  expect(lesson.questions.map(q=>q.evidence)).toEqual([['LISTEN'],['READ']]);
  expect(lesson.questions.map(q=>q.answer)).toEqual([zh.listening,zh.reading]);
  expect(lesson.model).toBe(u.reading);expect(lesson.modelZh).toBe(zh.reading);
  expect(lesson.paragraphs.every(p=>/[\u4e00-\u9fff]/u.test(p.zh))).toBe(true);
 }
});
it('preserves times, negations, locations and unspecified kinship in translations',()=>{
 for(const [id,field,fragment] of [
  ['en-fnd-15','reading','十一点'],['en-fnd-15','reading','三个展厅'],['en-fnd-19','reading','四十分钟'],
  ['en-fnd-20','reading','不必'],['en-fnd-21','listening','左手边'],['en-fnd-21','reading','咖啡馆对面'],
  ['fr-fnd-15','reading','八点'],['fr-fnd-15','reading','堂姐妹或表姐妹'],['fr-fnd-16','reading','二十分钟'],
  ['fr-fnd-22','reading','如果'],['fr-fnd-22','reading','星期五'],['fr-fnd-24','reading','堂表兄弟姐妹'],
 ] as const)expect(FOUNDATION_CHINESE[id][field]).toContain(fragment);
 expect(FOUNDATION_CHINESE['fr-fnd-17'].examples[2]).toBe('她明天不会来。');
});
it.each(['en-fnd-01','en-fnd-24','fr-fnd-01','fr-fnd-24'])('renders %s source blocks and retains original exercises',id=>{
 const u=FOUNDATION_UNITS.find(x=>x.id===id)!;
 render(<StructuredLesson course={COURSES.find(x=>x.id===id)!} content={{text:foundationText(u),sources:[],vocabulary:u.vocab,foundation:u,appendices:[]}}
  stage={3} onChangeStage={()=>{}} onOpenSpeech={()=>{}} ttsRate={.75}/>);
 expect(screen.getByLabelText('逐段双语听读')).toBeTruthy();
 expect(screen.getAllByText(FOUNDATION_CHINESE[id].reading).length).toBeGreaterThanOrEqual(1);
 expect(screen.getByLabelText('朗读速度').textContent).toContain('0.75×');
 const answer=screen.getByLabelText('不看中文，复述 LISTEN 中的信息，再核对人物、动作、否定和数字。');
 fireEvent.change(answer,{target:{value:'我的听读答案'}});
 expect((answer as HTMLTextAreaElement).value).toBe('我的听读答案');
 expect(screen.getByText('1. '+u.questions[0].prompt)).toBeTruthy();
});


it('adds a distinct context or contrast rather than repeating each source example verbatim',()=>{
 for(const topic of FOUNDATION_SPECIALTIES){
  for(const section of topic.sections)expect(new Set(section.examples.map(x=>x.target)).size,topic.id).toBe(section.examples.length);
  for(const q of topic.questions){const lines=q.question.split('\n');expect(lines[0],topic.id).not.toBe(lines[1]);}
 }
});

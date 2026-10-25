import React,{useState} from 'react';
import {readFileSync} from 'node:fs';
import {afterEach,expect,it,vi} from 'vitest';
import {act,cleanup,fireEvent,render,screen} from '@testing-library/react';
import LessonReader from '../src/LessonReader';
import {mergeLearningState,packFoundationState,unpackFoundationState,useCourseProgress} from '../src/useCourseProgress';
import SpecialtyLibrary from '../src/SpecialtyLibraryView';
import {COURSES} from '../src/v44Courses';
import {linkedSpecialties} from '../src/specialtyLibrary';
import {StudyResponseContext} from '../src/studyResponses';
import CourseSpecialtyStage from '../src/CourseSpecialtyStage';
import ReceptionStudy from '../src/ReceptionStudy';
import {RECEPTION_LESSONS} from '../src/receptionLessons';
import {parallelEvidence} from '../src/bilingualEvidence';
import {selectDeviceVoice} from '../src/ttsVoice';
import Task1WritingWorkshop,{TASK1_WORKSHOPS} from '../src/Task1WritingWorkshop';
import {BORROWING_CHART,CHART_MODEL} from '../src/task1ChartData';
import {numericEvidenceChecks,task1Evidence,wordCount} from '../src/Task1Feedback';
afterEach(()=>{cleanup();vi.unstubAllGlobals();});

it('merges opaque old state and answers while round-tripping foundation responses through existing JSONB',()=>{
 const old={answers:{'0':1},notes:'keep',legacy:{done:true},studyResponses:{'a':'old'}};
 const next=mergeLearningState(old,{answers:{'1':2},stage:3,studyResponses:{'b':'new'}});
 expect(next).toMatchObject({answers:{'0':1,'1':2},notes:'keep',legacy:{done:true},studyResponses:{a:'old',b:'new'}});
 expect(unpackFoundationState(packFoundationState(next))).toEqual({answers:next.answers,stage:3,studyResponses:next.studyResponses,practiceChecklist:{}});
 expect(unpackFoundationState({'0':2,__learning:null})).toEqual({answers:{'0':2},stage:0,studyResponses:{},practiceChecklist:{}});
});

it('restores specialty chapter, answer and writing after component destruction',()=>{
 let saved:Record<string,string>={};
 function Harness(){const [values,setValues]=useState(saved);return <StudyResponseContext.Provider value={{ready:true,values,change:p=>{saved={...saved,...p};setValues(saved);}}}><CourseSpecialtyStage courseId="fr-b2-u03" kind="grammar" rate={.85}/></StudyResponseContext.Provider>;}
 const page=render(<Harness/>);
 const chapter=screen.getAllByRole('navigation')[0].querySelectorAll('button')[1];fireEvent.click(chapter);
 const fields=page.container.querySelectorAll('textarea');expect(fields.length).toBeGreaterThan(1);
 fireEvent.change(fields[0],{target:{value:'Ma réponse conservée.'}});
 fireEvent.change(fields[fields.length-1],{target:{value:'Mon texte complet.'}});
 page.unmount();const restored=render(<Harness/>);
 expect(screen.getAllByRole('navigation')[0].querySelectorAll('button')[1].getAttribute('aria-pressed')).toBe('true');
 expect((restored.container.querySelector('textarea') as HTMLTextAreaElement).value).toBe('Ma réponse conservée.');
 expect(screen.getByDisplayValue('Mon texte complet.')).toBeTruthy();
});
it('shares actual saved responses between the independent specialty and its main course',()=>{
 localStorage.clear();
 const course=COURSES.find(c=>c.id==='fr-b2-u03')!;
 const unit=linkedSpecialties('grammar',course.id)[0];
 const page=render(<SpecialtyLibrary params={new URLSearchParams({page:'specialties',type:'grammar',language:'fr',topic:unit.id})} navigate={()=>{}}/>);
 fireEvent.change(page.container.querySelector('textarea')!,{target:{value:'Une réponse partagée.'}});
 page.unmount();
 function Main(){const p=useCourseProgress(course,null);return <StudyResponseContext.Provider value={{ready:p.ready,values:p.state.studyResponses||{},change:studyResponses=>p.change({studyResponses})}}><CourseSpecialtyStage courseId={course.id} kind="grammar" rate={.85}/></StudyResponseContext.Provider>;}
 render(<Main/>);expect(screen.getByDisplayValue('Une réponse partagée.')).toBeTruthy();
 localStorage.clear();
});

it('provides substantial aligned paragraphs, answer evidence and explicit uncertainty',()=>{
 for(const [id,u] of Object.entries(RECEPTION_LESSONS)){
  // Existing licensed project manuscripts retain their exact paragraphs, including short
  // conclusions. Their source equality is stronger than padding them to an authored-word quota.
  const sourcePath=({'en-ielts-reading-u01':'public/learning-assets/en-ielts-reading-u01.txt','en-ielts-reading-u02':'public/learning-assets/en-ielts-reading-u02-v1.txt'} as Record<string,string>)[id];
  if(sourcePath){
   const source=readFileSync(sourcePath,'utf8');
   for(const p of u.paragraphs){expect(source.includes(p.target),id+':'+p.id+' exact manuscript').toBe(true);expect(p.zh.length).toBeGreaterThan(45);}
   expect(u.paragraphs.length).toBeGreaterThanOrEqual(4);
  }else{
  expect(wordCount(u.paragraphs.map(p=>p.target).join(' ')),id).toBeGreaterThan(id.startsWith('fr-a1-')?190:id.startsWith('fr-a2-')?270:350);
  expect(u.paragraphs.every(p=>p.zh.length>90),id).toBe(true);
  }
  expect(u.questions.every(q=>q.evidence.length&&q.evidence.every(e=>u.paragraphs.some(p=>p.id===e))),id).toBe(true);
  expect(u.questions.every(q=>q.answer&&q.why),id).toBe(true);
 }
 expect(RECEPTION_LESSONS['fr-b2-u03'].paragraphs[2].target).toContain('si le projet était adopté');
 expect(RECEPTION_LESSONS['fr-c1-u07'].paragraphs[3].target).toContain("Si le bilan avait distingué");
 expect(RECEPTION_LESSONS['fr-c2-u03'].paragraphs[2].target).toContain('Du moins ai-je voulu le croire');
});

it('handles paragraph replay, pause/resume, rate changes, stale events, errors and unmount cancellation',()=>{
 const voices:any[]=[];const synth={speak:vi.fn((u:any)=>voices.push(u)),cancel:vi.fn(),pause:vi.fn(),resume:vi.fn()};
 vi.stubGlobal('speechSynthesis',synth);vi.stubGlobal('SpeechSynthesisUtterance',class {constructor(public text:string){}});
 const page=render(<ReceptionStudy courseId="fr-b2-u03" rate={.85}/>);
 fireEvent.click(screen.getByRole('button',{name:'朗读 P1'}));expect(voices[0].lang).toBe('fr-FR');
 fireEvent.click(screen.getByRole('button',{name:'暂停'}));expect(synth.pause).toHaveBeenCalled();
 fireEvent.click(screen.getByRole('button',{name:'继续'}));expect(synth.resume).toHaveBeenCalled();
 fireEvent.click(screen.getByRole('button',{name:'下一段'}));expect(voices[1].text).toBe(RECEPTION_LESSONS['fr-b2-u03'].paragraphs[1].target);
 fireEvent.change(screen.getByRole('combobox'),{target:{value:'1.15'}});
 fireEvent.click(screen.getByRole('button',{name:'播放 / 回听本段'}));expect(voices[2].rate).toBe(1.15);
 fireEvent.click(screen.getByRole('button',{name:'停止'}));voices[0].onend();expect(screen.getByRole('status').textContent).toBe('已停止');
 fireEvent.click(screen.getByRole('button',{name:'朗读 P1'}));
 act(()=>voices[3].onerror());expect(screen.getByRole('status').textContent).toContain('失败');
 page.unmount();expect(synth.cancel.mock.calls.length).toBeGreaterThan(4);
});

it('keeps private manuscripts while providing the same mapped listening and writing supplements',()=>{
 const {rerender}=render(<LessonReader courseId="fr-c1-u07" privateSource text="Private source remains intact." stage={3} onChangeStage={()=>{}}/>);
 fireEvent.click(screen.getByText('同课目标的公共补充练习'));
 expect(screen.getByRole('region',{name:'逐段双语听读'})).toBeTruthy();
 expect(screen.getByText(/不作为上方私人原稿的对应翻译或证据/)).toBeTruthy();
 expect(screen.getByText('Private source remains intact.')).toBeTruthy();
 rerender(<LessonReader courseId="en-ielts-writing-task1-u03" privateSource text="Private chart practice remains intact." stage={5} onChangeStage={()=>{}}/>);
 expect(screen.getByRole('region',{name:'完整图示写作练习'})).toBeTruthy();
 expect(screen.getByText('Private chart practice remains intact.')).toBeTruthy();
});

it('ends silent speech-engine startup instead of leaving an endless playing indicator',()=>{
 vi.useFakeTimers();
 vi.stubGlobal('speechSynthesis',{speak:vi.fn(),cancel:vi.fn()});
 vi.stubGlobal('SpeechSynthesisUtterance',class {constructor(public text:string){}});
 render(<ReceptionStudy courseId="fr-b2-u03" rate={.85}/>);
 fireEvent.click(screen.getByRole('button',{name:'朗读 P1'}));
 act(()=>vi.advanceTimersByTime(8000));
 expect(screen.getByRole('status').textContent).toContain('未能启动');
 vi.useRealTimers();
});

it('shows a readable fallback when the browser has no speech engine',()=>{
 vi.stubGlobal('speechSynthesis',undefined);
 render(<ReceptionStudy courseId="en-ielts-listening-u02" rate={.85}/>);
 fireEvent.click(screen.getByRole('button',{name:'朗读 P1'}));
 expect(screen.getByRole('status').textContent).toContain('不支持');
 expect(screen.getByText(RECEPTION_LESSONS['en-ielts-listening-u02'].paragraphs[0].zh)).toBeTruthy();
});

it('runs all three input → writing → source-check loops with a saved answer',()=>{
 for(const [id,visual] of Object.entries(TASK1_WORKSHOPS)){
  const {unmount}=render(<Task1WritingWorkshop courseId={id}/>);
  expect(screen.getAllByRole('img').length).toBeGreaterThan(0);
  fireEvent.change(screen.getByRole('textbox',{name:'我的 Task 1 全文'}),{target:{value:'The figure shows changes.'}});
  fireEvent.click(screen.getByRole('button',{name:'核对本次写作与源材料'}));
  expect(screen.getByRole('region',{name:'依据材料核对写作'}).textContent).toContain('还差 146 词');
  for(const evidence of task1Evidence(visual))expect(screen.getByText(evidence)).toBeTruthy();
  unmount();
 }
});
it('keeps chart/table/model numbers and comparison arithmetic consistent',()=>{
 expect(BORROWING_CHART.years).toEqual([2010,2015,2020]);
 for(let i=0;i<3;i++)expect(BORROWING_CHART.series.reduce((n,s)=>n+s.values[i],0)).toBe(100);
 expect(BORROWING_CHART.series[0].values[2]-BORROWING_CHART.series[0].values[0]).toBe(40);
 expect(wordCount(CHART_MODEL.map(p=>p.target).join(' '))).toBeGreaterThanOrEqual(150);
 const {container}=render(<Task1WritingWorkshop courseId="en-ielts-writing-task1-u03"/>);
 expect([...container.querySelectorAll('tbody tr')].map(r=>r.textContent)).toEqual(['20102080','20153565','20206040']);
});
it('flags unsupported numerical claims in the submitted writing without pretending to grade meaning',()=>{
 expect(numericEvidenceChecks('en-chart-comparison','Online borrowing reached 90% in 2012.')).toHaveLength(2);
 expect(numericEvidenceChecks('en-chart-comparison',CHART_MODEL.map(p=>p.target).join(' '))).toEqual([]);
 expect(numericEvidenceChecks('en-process-report-grammar','The pulp is heated to 90°C for 20 minutes.')).toHaveLength(2);
 expect(numericEvidenceChecks('en-map-change-lexicon','The library doubled in size in 2010.')[0]).toContain('2010');
});


it('resets reading position and cancels stale speech when switching from six paragraphs to four',()=>{
 const voices:any[]=[];
 const synth={speak:vi.fn((u:any)=>voices.push(u)),cancel:vi.fn(),pause:vi.fn(),resume:vi.fn()};
 vi.stubGlobal('speechSynthesis',synth);
 vi.stubGlobal('SpeechSynthesisUtterance',class {constructor(public text:string){}});
 const page=render(<ReceptionStudy courseId="en-ielts-reading-u02" rate={.85}/>);
 for(let i=0;i<5;i++)fireEvent.click(screen.getByRole('button',{name:'下一段'}));
 expect(voices[4].text).toBe(RECEPTION_LESSONS['en-ielts-reading-u02'].paragraphs[5].target);
 expect(screen.getByRole('button',{name:'下一段'}).hasAttribute('disabled')).toBe(true);
 page.rerender(<ReceptionStudy courseId="en-ielts-listening-u01" rate={.85}/>);
 expect(screen.getByRole('status').textContent).toBe('未播放');
 expect(page.container.querySelectorAll('article[aria-current="true"]')).toHaveLength(1);
 expect(page.container.querySelector('article[aria-current="true"] h4')?.textContent).toBe('P1');
 fireEvent.click(screen.getByRole('button',{name:'播放 / 回听本段'}));
 expect(voices[5].text).toBe(RECEPTION_LESSONS['en-ielts-listening-u01'].paragraphs[0].target);
 act(()=>{voices[4].onend();});
 expect(screen.getByRole('status').textContent).not.toContain('朗读结束');
 fireEvent.click(screen.getByRole('button',{name:'下一段'}));
 expect(voices[6].text).toBe(RECEPTION_LESSONS['en-ielts-listening-u01'].paragraphs[1].target);
 expect(synth.cancel.mock.calls.length).toBeGreaterThanOrEqual(7);
});


it('renders authored bilingual evidence as parallel accessible lines, not slash-delimited source/Chinese text',()=>{
 const original='TRUE / FALSE / NOT GIVEN — All libraries hosted evening sessions. / 判断正误：所有图书馆都举办晚间讨论。';
 expect(parallelEvidence(original)).toEqual({
  source:'TRUE / FALSE / NOT GIVEN — All libraries hosted evening sessions.',
  zh:'判断正误：所有图书馆都举办晚间讨论。'
 });
 expect(parallelEvidence('en face de / 对面')).toEqual({source:'en face de',zh:'对面'});
 expect(parallelEvidence('À neuf heures.')).toEqual({source:'À neuf heures.',zh:null});
 expect(parallelEvidence('只按中文提问，不伪造外文')).toEqual({source:'只按中文提问，不伪造外文',zh:null});
 expect(parallelEvidence('en / à')).toEqual({source:'en / à',zh:null});
 const id='en-ielts-writing-task1-u01';
 const page=render(<ReceptionStudy courseId={id} rate={.85}/>);
 const question=RECEPTION_LESSONS[id].questions[0];
 const originalQuestion=parallelEvidence(question.prompt),originalAnswer=parallelEvidence(question.answer);
 const item=page.container.querySelector('.curriculum-question')!;
 const label=item.querySelector('label')!;
 expect(label.querySelector('[lang="en"]')?.textContent).toBe(originalQuestion.source);
 expect(label.querySelector('[lang="zh-Hans"]')?.textContent).toBe(originalQuestion.zh);
 fireEvent.click(item.querySelector('summary')!);
 const answers=item.querySelector('.evidence-answers')!;
 expect(answers.querySelector('p[lang="en"]')?.textContent).toBe(originalAnswer.source);
 expect(answers.querySelector('p[lang="zh-Hans"]')?.textContent).toBe(originalAnswer.zh);
 expect(item.querySelector('textarea')?.getAttribute('id')).toBe(id+'-reception-0');
 expect(item.textContent).toContain('P');
 page.rerender(<ReceptionStudy courseId="fr-a1-u05" rate={.85}/>);
 const frQuestion=RECEPTION_LESSONS['fr-a1-u05'].questions[0];
 const frItem=page.container.querySelector('.curriculum-question')!;
 expect(frItem.querySelector('label [lang="fr"]')?.textContent).toBe(parallelEvidence(frQuestion.prompt).source);
 expect(frItem.querySelector('label [lang="zh-Hans"]')?.textContent).toBe(parallelEvidence(frQuestion.prompt).zh);
});


it('applies a restored cross-device speech-rate preference to an already-mounted course reader',()=>{
 const voices:any[]=[];
 vi.stubGlobal('speechSynthesis',{speak:vi.fn((x:any)=>voices.push(x)),cancel:vi.fn(),pause:vi.fn(),resume:vi.fn()});
 vi.stubGlobal('SpeechSynthesisUtterance',class {constructor(public text:string){}});
 const reader=render(<ReceptionStudy courseId="en-ielts-reading-u02" rate={.85}/>);
 expect((screen.getByRole('combobox',{name:'朗读速度'}) as HTMLSelectElement).value).toBe('0.85');
 reader.rerender(<ReceptionStudy courseId="en-ielts-reading-u02" rate={1.15}/>);
 expect((screen.getByRole('combobox',{name:'朗读速度'}) as HTMLSelectElement).value).toBe('1.15');
 fireEvent.click(screen.getByRole('button',{name:'播放 / 回听本段'}));
 expect(voices[0].rate).toBe(1.15);
});


it('prefers a matching French/English voice and stops known wrong-language speech',()=>{
 const fr={lang:'fr-FR',localService:true,name:'Test French'} as SpeechSynthesisVoice;
 const frCa={lang:'fr-CA',localService:false,name:'Test French Canada'} as SpeechSynthesisVoice;
 const en={lang:'en-GB',localService:true,name:'Test English'} as SpeechSynthesisVoice;
 expect(selectDeviceVoice([en,frCa,fr],'fr')).toBe(fr);
 expect(selectDeviceVoice([fr,en],'en')).toBe(en);
 expect(selectDeviceVoice([en],'fr')).toBeNull();
 expect(selectDeviceVoice([],'fr')).toBeNull();
 const utterances:any[]=[];
 vi.stubGlobal('speechSynthesis',{getVoices:()=>[en],speak:vi.fn(x=>utterances.push(x)),cancel:vi.fn(),pause:vi.fn(),resume:vi.fn()});
 vi.stubGlobal('SpeechSynthesisUtterance',class {voice:any=null;lang='';rate=1;constructor(public text:string){}});
 const page=render(<ReceptionStudy courseId="fr-a1-u05" rate={.85}/>);
 fireEvent.click(screen.getByRole('button',{name:'朗读 P1'}));
 expect(utterances).toHaveLength(0);
 expect(screen.getByRole('status').textContent).toContain('已停止朗读以避免错误发音');
 page.unmount();
 vi.stubGlobal('speechSynthesis',{getVoices:()=>[en,fr],speak:vi.fn(x=>utterances.push(x)),cancel:vi.fn(),pause:vi.fn(),resume:vi.fn()});
 const correct=render(<ReceptionStudy courseId="fr-a1-u05" rate={.85}/>);
 fireEvent.click(screen.getByRole('button',{name:'朗读 P1'}));
 expect(utterances).toHaveLength(1);
 expect(utterances[0].voice).toBe(fr);
 expect(utterances[0].lang).toBe('fr-FR');
 correct.unmount();
});

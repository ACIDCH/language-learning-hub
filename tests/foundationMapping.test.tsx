import {afterEach,expect,it} from 'vitest';
import {cleanup,fireEvent,render,screen} from '@testing-library/react';
import {FOUNDATION_UNITS} from '../src/foundationCurriculum';
import {FOUNDATION_CHINESE} from '../src/foundationChinese';
import {FOUNDATION_RECEPTION} from '../src/foundationReception';
import StructuredLesson from '../src/StructuredLesson';
import {COURSES,foundationText} from '../src/v44Courses';
afterEach(cleanup);
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

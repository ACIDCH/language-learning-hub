import React from 'react';
import {afterEach,describe,expect,it,vi} from 'vitest';
import {cleanup,fireEvent,render,screen} from '@testing-library/react';
import CourseCatalog from '../src/CourseCatalog';
import SpecialtyLibrary from '../src/SpecialtyLibrary';
import {SPECIALTY_LESSONS,linkedSpecialty,specialtyQuality,specialtyRoute} from '../src/specialtyLibrary';
import {routeCrumbs,readRoute} from '../src/v44Routes';
import {COURSES} from '../src/v44Courses';
vi.mock('../src/IpaText',()=>({speakIpaText:()=>true}));
afterEach(cleanup);

describe('independent bilingual grammar and vocabulary teaching',()=>{
 it('has real detailed chapters in both languages and both tracks instead of empty shells',()=>{
  const defects:string[]=[];
  expect(SPECIALTY_LESSONS.length).toBeGreaterThanOrEqual(14);
  expect(new Set(SPECIALTY_LESSONS.map(x=>x.id)).size).toBe(SPECIALTY_LESSONS.length);
  for(const lang of ['fr','en']){
   for(const type of ['grammar','vocabulary']){
    const selected=SPECIALTY_LESSONS.filter(x=>x.language===lang&&x.type===type);
    expect(selected.length,lang+' '+type).toBeGreaterThanOrEqual(3);
    for(const u of selected){
     const pairRows=u.sections.flatMap(s=>s.examples);
     const issues=[
      ['sections',u.sections.length>=3],['questions',u.questions.length>=2],
      ['model',u.model.length>=2],['pairs',pairRows.length>=6],
      ['sectionsDetailed',u.sections.every(s=>s.concept.length>=35&&s.caution.length>=12&&s.pattern.length>4&&s.examples.every(e=>e.zh.length>3&&e.target.length>8&&e.analysis.length>3))],
      ['questionExplanations',u.questions.every(q=>q.answer.length>0&&q.why.length>=12)]
     ].filter(x=>!x[1]).map(x=>x[0]);
     if(!specialtyQuality(u))defects.push(u.id+': '+issues.join(','));
     expect(u.sections.length).toBeGreaterThanOrEqual(3);
     expect(u.sections.flatMap(x=>x.examples).every(x=>x.zh.trim()&&x.target.trim()&&x.analysis.trim())).toBe(true);
     expect(COURSES.some(c=>c.id===u.unitLink),'Missing actual linked lesson '+u.unitLink).toBe(true);
     expect(u.referenceUrls.every(url=>/^https:\/\//.test(url))).toBe(true);
    }
   }
  }
  expect(defects,'Complete specialty editorial content checks').toEqual([]);
 });
 it('keeps the text independent from copyrighted third-party reading passages',()=>{
  for(const u of SPECIALTY_LESSONS){
   expect(u.sourceNote).toBeTruthy();
   expect(u.objective).toBeTruthy();
   expect(u.output).toBeTruthy();
   expect(u.model.length).toBeGreaterThanOrEqual(2);
  }
 });
 it('provides dedicated catalog entries for the independent tracks',()=>{
  const navigate=vi.fn();
  render(<CourseCatalog params={new URLSearchParams('language=fr')} navigate={navigate}/>);
  expect(screen.getByRole('link',{name:/语法专题/})).toBeTruthy();
  fireEvent.click(screen.getByRole('link',{name:/语法专题/}));
  expect(navigate).toHaveBeenCalledWith(specialtyRoute('grammar','fr'));
  expect(screen.getByRole('link',{name:/词汇专题/})).toBeTruthy();
 });
 it('shows a full learning chapter with explanations and hidden answers',()=>{
  const navigate=vi.fn();
  const params=new URLSearchParams('page=specialties&type=grammar&language=fr&topic=fr-etre');
  const {container}=render(<SpecialtyLibrary params={params} navigate={navigate}/>);
  expect(container.querySelectorAll('.specialty-chapter')).toHaveLength(4);
  expect(container.textContent).toContain('同龄同学');
  expect(container.textContent).toContain('Je suis étudiant');
  expect(screen.getAllByText('核对答案与解析').length).toBeGreaterThan(0);
  expect(container.querySelector('.specialty-answer')).toBeNull();
  fireEvent.click(screen.getAllByRole('button',{name:'核对答案与解析'})[0]);
  expect(container.querySelector('.specialty-answer')).not.toBeNull();
  fireEvent.click(screen.getByRole('button',{name:/回到关联课程/}));
  expect(navigate).toHaveBeenCalledWith(expect.stringContaining('fr-a1-u01'));
 });
 it('lets learners switch grammar and vocabulary while preserving language choice',()=>{
  const navigate=vi.fn();
  render(<SpecialtyLibrary params={new URLSearchParams('page=specialties&type=grammar&language=en')} navigate={navigate}/>);
  fireEvent.click(screen.getByRole('button',{name:/词汇专题 语块记忆/}));
  expect(navigate).toHaveBeenCalledWith(specialtyRoute('vocabulary','en'));
 });
 it('preserves source-related modules without mistaking catalog coverage for edited completeness',()=>{
  expect(linkedSpecialty('grammar','fr-a1-u04')?.id).toBe('fr-articles');
  expect(linkedSpecialty('vocabulary','en-ielts-listening-u01')?.id).toBe('en-lecture-terms');
  expect(linkedSpecialty('grammar','fr-b2-u08')).toBeUndefined();
 });
 it('builds breadcrumb to new standalone content without redirecting to old cloud panel',()=>{
  const route=readRoute('https://local.test/?page=specialties&type=vocabulary&language=fr&topic=fr-family');
  expect(routeCrumbs(route).map(x=>x.label)).toContain('词汇专题');
  expect(specialtyRoute('grammar','fr','fr-etre')).not.toContain('/cloud');
 });
});


describe('research-extended grammar and vocabulary paths',()=>{
 it('includes six complete new units, two languages and two skills',()=>{
  const ids=['fr-articles-partitive','fr-passe-compose','en-lecture-hedging',
   'en-academic-collocations','fr-campus-vocab','fr-food-vocab'];
  for(const id of ids){
   const unit=SPECIALTY_LESSONS.find(x=>x.id===id);
   expect(unit,id).toBeDefined();
   expect(specialtyQuality(unit!),id).toBe(true);
   expect(unit!.sections.length).toBeGreaterThanOrEqual(4);
   expect(unit!.questions.length).toBeGreaterThanOrEqual(3);
   expect(unit!.referenceUrls.length).toBeGreaterThan(0);
  }
  expect(SPECIALTY_LESSONS.length).toBeGreaterThanOrEqual(20);
 });
 it('avoids false absolutes about modality, French negatives and research causality',()=>{
  const academic=SPECIALTY_LESSONS.find(x=>x.id==='en-lecture-hedging')!;
  expect(academic.sections[0].caution).toContain('概率顺序');
  expect(academic.sections.flatMap(x=>x.examples).some(x=>x.target.includes('cannot establish'))).toBe(true);
  const french=SPECIALTY_LESSONS.find(x=>x.id==='fr-articles-partitive')!;
  expect(french.sections.flatMap(x=>x.examples).some(x=>x.target.includes("Ce n'est pas une pomme"))).toBe(true);
  expect(french.sections.flatMap(x=>x.examples).some(x=>x.target.includes("n'y a pas d'eau"))).toBe(true);
 });
 it('opens each authored research extension from grammar or vocabulary navigation',()=>{
  for(const id of ['en-lecture-hedging','fr-food-vocab']){
   const unit=SPECIALTY_LESSONS.find(x=>x.id===id)!;
   const navigate=vi.fn();
   const {container,unmount}=render(<SpecialtyLibrary params={
    new URLSearchParams('page=specialties&type='+unit.type+'&language='+unit.language+'&topic='+unit.id)
   } navigate={navigate}/>);
   expect(container.querySelectorAll('.specialty-chapter')).toHaveLength(unit.sections.length);
   expect(container.textContent).toContain(unit.title);
   expect(container.querySelectorAll('.specialty-question')).toHaveLength(unit.questions.length);
   unmount();
  }
 });
});

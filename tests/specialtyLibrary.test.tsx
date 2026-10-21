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
  expect(SPECIALTY_LESSONS.length).toBeGreaterThanOrEqual(14);
  expect(new Set(SPECIALTY_LESSONS.map(x=>x.id)).size).toBe(SPECIALTY_LESSONS.length);
  for(const lang of ['fr','en']){
   for(const type of ['grammar','vocabulary']){
    const selected=SPECIALTY_LESSONS.filter(x=>x.language===lang&&x.type===type);
    expect(selected.length,lang+' '+type).toBeGreaterThanOrEqual(3);
    for(const u of selected){
     expect(specialtyQuality(u),'Topic below content threshold: '+u.id).toBe(true);
     expect(u.sections.length).toBeGreaterThanOrEqual(3);
     expect(u.sections.flatMap(x=>x.examples).every(x=>x.zh.trim()&&x.target.trim()&&x.analysis.trim())).toBe(true);
     expect(COURSES.some(c=>c.id===u.unitLink),'Missing actual linked lesson '+u.unitLink).toBe(true);
     expect(u.referenceUrls.every(url=>/^https:\/\//.test(url))).toBe(true);
    }
   }
  }
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

import React from 'react';
import {afterEach,expect,it,vi} from 'vitest';
import {cleanup,fireEvent,render,screen,waitFor} from '@testing-library/react';
import CourseReader from '../src/CourseReader';
import {COURSES} from '../src/v44Courses';
import {DEFAULT_PREFERENCES} from '../src/v44Preferences';

afterEach(()=>{cleanup();localStorage.clear();});
it('keeps old course manuscripts, note drafts, and local selection state out of a newly selected course',async()=>{
 localStorage.clear();
 const a=COURSES.find(c=>c.id==='fr-fnd-23')!;
 const b=COURSES.find(c=>c.id==='fr-fnd-24')!;
 const props={session:null,preferences:DEFAULT_PREFERENCES,tab:'read',navigate:vi.fn()};
 const view=render(<CourseReader {...props} course={a}/>);
 await waitFor(()=>expect(screen.getByRole('heading',{name:a.title})).toBeTruthy());
 fireEvent.change(screen.getByRole('textbox',{name:'学习笔记'}),{target:{value:'私人课程 A 的笔记'}});
 expect(localStorage.getItem('llh-v44-draft:guest:'+a.id)).toContain('私人课程 A 的笔记');
 view.rerender(<CourseReader {...props} course={b}/>);
 expect(screen.queryByRole('heading',{name:a.title})).toBeNull();
 await waitFor(()=>expect(screen.getByRole('heading',{name:b.title})).toBeTruthy());
 expect((screen.getByRole('textbox',{name:'学习笔记'}) as HTMLTextAreaElement).value).toBe('');
 expect(localStorage.getItem('llh-v44-draft:guest:'+b.id)).toBeNull();
 view.rerender(<CourseReader {...props} course={a}/>);
 await waitFor(()=>expect(screen.getByRole('heading',{name:a.title})).toBeTruthy());
 await waitFor(()=>expect((screen.getByRole('textbox',{name:'学习笔记'}) as HTMLTextAreaElement).value).toBe('私人课程 A 的笔记'));
});

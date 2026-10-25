import React from 'react';
import {afterEach,expect,it,vi} from 'vitest';
import {cleanup,fireEvent,render,screen,waitFor} from '@testing-library/react';
import type {Session} from '@supabase/supabase-js';
import CourseReader from '../src/CourseReader';
import {COURSES} from '../src/v44Courses';
import {DEFAULT_PREFERENCES} from '../src/v44Preferences';

const mocked=vi.hoisted(()=>({read:vi.fn(),write:vi.fn()}));
vi.mock('../src/v44Connection',()=>({
 cloudRequest:vi.fn(),cloudClient:{from:()=>({
 select:()=>({eq:()=>({eq:()=>({maybeSingle:mocked.read})})}),
 upsert:mocked.write
 })}
}));
const uid='cloud-conflict-preview-test';
const session={user:{id:uid},access_token:'test-jwt'} as Session;
const course=COURSES.find(c=>c.id==='fr-fnd-24')!;
afterEach(()=>{cleanup();localStorage.clear();vi.clearAllMocks();});

it('requires an actual choice in the course UI before editing or saving a locally changed lesson',async()=>{
 const key='llh-v44-draft:'+uid+':'+course.id;
 localStorage.setItem(key,JSON.stringify({editedAt:'2026-10-18T08:00:00.000Z',state:{notes:'本机私人笔记',studyResponses:{'fr-fnd-24:writing':'旧设备草稿'}}}));
 mocked.read.mockResolvedValue({data:{
  answers:{__learning:{studyResponses:{'fr-fnd-24:writing':'新设备云端答案'}}},
  notes:'云端新笔记',completed:true,updated_at:'2026-10-24T08:00:00.000Z'
 },error:null});
 mocked.write.mockResolvedValue({error:null});
 render(<CourseReader course={course} session={session} preferences={DEFAULT_PREFERENCES} tab="read" navigate={vi.fn()}/>);
 await screen.findByRole('group',{name:'云端与本机未同步草稿冲突'});
 expect(screen.getByText(/云端记录比本机未同步草稿更新/)).toBeTruthy();
 expect((screen.getByRole('textbox',{name:'学习笔记'}) as HTMLTextAreaElement).value).toBe('本机私人笔记');
 expect((screen.getByRole('textbox',{name:'学习笔记'}) as HTMLTextAreaElement).disabled).toBe(true);
 expect(screen.getByRole('button',{name:'保存到 Supabase'}).hasAttribute('disabled')).toBe(true);
 expect(mocked.write).not.toHaveBeenCalled();
 fireEvent.click(screen.getByRole('button',{name:'使用云端进度'}));
 await waitFor(()=>expect((screen.getByRole('textbox',{name:'学习笔记'}) as HTMLTextAreaElement).value).toBe('云端新笔记'));
 expect(screen.queryByRole('group',{name:'云端与本机未同步草稿冲突'})).toBeNull();
 expect(localStorage.getItem(key)).toBeNull();
 expect(mocked.write).not.toHaveBeenCalled();
});

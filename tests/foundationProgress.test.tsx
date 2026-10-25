import {afterEach,beforeEach,expect,it,vi} from 'vitest';
import {act,cleanup,fireEvent,render,screen,waitFor} from '@testing-library/react';
import type {Session} from '@supabase/supabase-js';
import {COURSES,type Course} from '../src/v44Courses';
import {useCourseProgress,packFoundationState,validateFoundationState} from '../src/useCourseProgress';
const mocks=vi.hoisted(()=>({read:vi.fn(),write:vi.fn()}));
vi.mock('../src/v44Connection',()=>{
 const writeResult=(row:any)=>Promise.resolve(mocks.write(row)).then((value:any)=>value?.error?value:{data:value?.data??{updated_at:row.updated_at},error:null});
 const writeBuilder=(row:any)=>({
  eq:()=>writeBuilder(row),
  select:()=>({single:()=>writeResult(row),maybeSingle:()=>writeResult(row)})
 });
 return {cloudRequest:vi.fn(),cloudClient:{from:()=>({
  select:()=>({eq:()=>({eq:()=>({maybeSingle:mocks.read})})}),
  insert:writeBuilder,update:writeBuilder
 })}};
});
const session={user:{id:'test-foundation-owner'},access_token:'test-only'} as Session;
const foundation=COURSES.find(x=>x.id==='fr-fnd-24')!;
const longAnswer='这是完整练习，不应被旧的四千字节限制截断。'.repeat(120);
function Probe({course=foundation}:{course?:Course}){
 const p=useCourseProgress(course,session);
 return <><textarea aria-label="answer" disabled={!p.ready} value={p.state.studyResponses?.[course.id+':writing']||''}
  onChange={e=>p.change({studyResponses:{[course.id+':writing']:e.target.value}})}/>
  <button disabled={!p.ready||p.busy} onClick={()=>void p.save()}>save</button><button disabled={p.ready} onClick={p.retry}>retry</button>{p.conflict&&<><button onClick={()=>p.resolveConflict("cloud")}>cloud version</button><button onClick={()=>p.resolveConflict("local")}>local draft</button></>}<p>{p.status}</p></>;
}
beforeEach(()=>{localStorage.clear();mocks.read.mockReset().mockResolvedValue({data:null,error:null});mocks.write.mockReset().mockResolvedValue({error:null});});
afterEach(cleanup);
it('sends long UTF-8 foundation answers intact and restores their cloud envelope after remount',async()=>{
 const page=render(<Probe/>);await waitFor(()=>expect((screen.getByLabelText('answer') as HTMLTextAreaElement).disabled).toBe(false));
 fireEvent.change(screen.getByLabelText('answer'),{target:{value:longAnswer}});fireEvent.click(screen.getByText('save'));
 await screen.findByText('已保存到 Supabase。');
 const row=mocks.write.mock.calls[0][0];expect(row.answers.__learning.studyResponses['fr-fnd-24:writing']).toBe(longAnswer);
 expect(new TextEncoder().encode(JSON.stringify(row.answers)).length).toBeGreaterThan(4096);
 expect(localStorage.getItem('llh-v44-draft:test-foundation-owner:fr-fnd-24')).toBeNull();
 page.unmount();mocks.read.mockResolvedValueOnce({data:{...row,updated_at:new Date().toISOString()},error:null});render(<Probe/>);
 await waitFor(()=>expect((screen.getByLabelText('answer') as HTMLTextAreaElement).value).toBe(longAnswer));
});
it('keeps the complete local draft when the old live database capacity constraint rejects it',async()=>{
 mocks.write.mockResolvedValue({error:{message:'violates check constraint foundation_progress_answers_check',code:'23514'}});
 render(<Probe/>);await waitFor(()=>expect((screen.getByLabelText('answer') as HTMLTextAreaElement).disabled).toBe(false));
 fireEvent.change(screen.getByLabelText('answer'),{target:{value:longAnswer}});fireEvent.click(screen.getByText('save'));
 await screen.findByText(/请检查 PR #50 的容量迁移/);
 const saved=JSON.parse(localStorage.getItem('llh-v44-draft:test-foundation-owner:fr-fnd-24')!);
 expect(saved.state.studyResponses['fr-fnd-24:writing']).toBe(longAnswer);
});
it('does not let a pending save clear a new course draft or change its load status',async()=>{
 let resolveWrite!:(v:{error:null})=>void;
 mocks.write.mockImplementation(()=>new Promise(r=>{resolveWrite=r;}));
 const page=render(<Probe/>);await waitFor(()=>expect((screen.getByLabelText('answer') as HTMLTextAreaElement).disabled).toBe(false));
 fireEvent.change(screen.getByLabelText('answer'),{target:{value:'first course'}});fireEvent.click(screen.getByText('save'));
 let resolveRead!:(v:{data:null,error:null})=>void;
 mocks.read.mockImplementationOnce(()=>new Promise(r=>{resolveRead=r;}));
 page.rerender(<Probe course={COURSES.find(x=>x.id==='fr-fnd-23')!}/>);
 expect((screen.getByLabelText('answer') as HTMLTextAreaElement).disabled).toBe(true);
 await act(async()=>resolveWrite({error:null}));expect(screen.getByText('正在读取学习记录…')).toBeTruthy();
 await act(async()=>resolveRead({data:null,error:null}));
 fireEvent.change(screen.getByLabelText('answer'),{target:{value:'second course'}});
 expect(localStorage.getItem('llh-v44-draft:test-foundation-owner:fr-fnd-23')).toContain('second course');
 expect(screen.queryByText('已保存到 Supabase。')).toBeNull();
});
it('validates UTF-8 size and notes without truncating any stored response',()=>{
 const state={answers:{'0':2},stage:5,studyResponses:{writing:longAnswer}};
 expect(()=>validateFoundationState(state)).not.toThrow();expect(packFoundationState(state)['0']).toBe(2);
 expect(()=>validateFoundationState({studyResponses:{writing:'中'.repeat(66000)}})).toThrow('192 KiB');
 expect(()=>validateFoundationState({notes:'字'.repeat(5001)})).toThrow('5000');
 expect(state.studyResponses.writing).toBe(longAnswer);
});


it('recovers from a transient Supabase progress load error only after explicit retry, without blind writes',async()=>{
 mocks.read.mockRejectedValueOnce(new Error('temporary offline'));
 mocks.read.mockResolvedValue({data:null,error:null});
 render(<Probe/>);
 await screen.findByText(/云端读取失败，已禁止覆盖保存/);
 expect((screen.getByLabelText('answer') as HTMLTextAreaElement).disabled).toBe(true);
 expect((screen.getByText('save') as HTMLButtonElement).disabled).toBe(true);
 expect(mocks.write).not.toHaveBeenCalled();
 fireEvent.click(screen.getByText('retry'));
 await waitFor(()=>expect((screen.getByLabelText('answer') as HTMLTextAreaElement).disabled).toBe(false));
 fireEvent.change(screen.getByLabelText('answer'),{target:{value:'重连后才进行保存'}});
 fireEvent.click(screen.getByText('save'));
 await screen.findByText('已保存到 Supabase。');
 expect(mocks.read).toHaveBeenCalledTimes(2);
 expect(mocks.write).toHaveBeenCalledTimes(1);
 expect(mocks.write.mock.calls[0][0].answers.__learning.studyResponses['fr-fnd-24:writing']).toBe('重连后才进行保存');
});


it('does not silently discard an unsynced local answer when a different device saved a newer cloud version',async()=>{
 const key='llh-v44-draft:test-foundation-owner:fr-fnd-24';
 localStorage.setItem(key,JSON.stringify({editedAt:'2026-10-20T10:00:00.000Z',state:{
  notes:'local pending note',studyResponses:{'fr-fnd-24:writing':'本机未同步答案'}
 }}));
 mocks.read.mockResolvedValue({data:{
  answers:{__learning:{studyResponses:{'fr-fnd-24:writing':'云端的新答案'}}},
  notes:'cloud latest note',completed:true,updated_at:'2026-10-24T10:00:00.000Z'
 },error:null});
 render(<Probe/>);
 await screen.findByText(/云端记录比本机未同步草稿更新/);
 expect((screen.getByLabelText('answer') as HTMLTextAreaElement).value).toBe('本机未同步答案');
 expect((screen.getByLabelText('answer') as HTMLTextAreaElement).disabled).toBe(true);
 expect((screen.getByText('save') as HTMLButtonElement).disabled).toBe(true);
 expect(mocks.write).not.toHaveBeenCalled();
 fireEvent.click(screen.getByText('cloud version'));
 expect((screen.getByLabelText('answer') as HTMLTextAreaElement).value).toBe('云端的新答案');
 expect((screen.getByLabelText('answer') as HTMLTextAreaElement).disabled).toBe(false);
 expect(localStorage.getItem(key)).toBeNull();
 expect(mocks.write).not.toHaveBeenCalled();
});

it('permits an explicit choice to retain the local unsynced draft and merges unrelated cloud answers',async()=>{
 const key='llh-v44-draft:test-foundation-owner:fr-fnd-24';
 localStorage.setItem(key,JSON.stringify({editedAt:'2026-10-20T10:00:00.000Z',state:{
  notes:'local note',studyResponses:{'fr-fnd-24:writing':'本机继续编辑'}
 }}));
 mocks.read.mockResolvedValue({data:{
  answers:{'0':2,__learning:{studyResponses:{'fr-fnd-24:extra':'远端练习'}}},
  notes:'cloud note',completed:true,updated_at:'2026-10-24T10:00:00.000Z'
 },error:null});
 render(<Probe/>);
 await screen.findByText(/云端记录比本机未同步草稿更新/);
 fireEvent.click(screen.getByText('local draft'));
 expect((screen.getByLabelText('answer') as HTMLTextAreaElement).value).toBe('本机继续编辑');
 const draft=JSON.parse(localStorage.getItem(key)!);
 expect(draft.state.notes).toBe('local note');
 expect(draft.state.studyResponses['fr-fnd-24:extra']).toBe('远端练习');
 fireEvent.click(screen.getByText('save'));
 await screen.findByText('已保存到 Supabase。');
 expect(mocks.write.mock.calls[0][0].answers['0']).toBe(2);
 expect(mocks.write.mock.calls[0][0].answers.__learning.studyResponses['fr-fnd-24:writing']).toBe('本机继续编辑');
 expect(mocks.write.mock.calls[0][0].answers.__learning.studyResponses['fr-fnd-24:extra']).toBe('远端练习');
});


it('rejects an out-of-date foundation update after another device changed the row, then requires explicit reread',async()=>{
 const key='llh-v44-draft:test-foundation-owner:fr-fnd-24';
 const initial={answers:{__learning:{studyResponses:{'fr-fnd-24:writing':'earlier cloud text'}}},
  notes:'old',completed:false,updated_at:'2026-10-24T09:00:00.000Z'};
 const current={...initial,updated_at:'2026-10-25T09:00:00.000Z',
  notes:'another-device-updated',answers:{__learning:{studyResponses:{'fr-fnd-24:writing':'newer remote'}}}};
 mocks.read.mockResolvedValueOnce({data:initial,error:null}).mockResolvedValueOnce({data:current,error:null});
 mocks.write.mockResolvedValueOnce({data:null,error:null}); // zero rows: conditional UPDATE failed
 render(<Probe/>);
 await waitFor(()=>expect((screen.getByLabelText('answer') as HTMLTextAreaElement).disabled).toBe(false));
 fireEvent.change(screen.getByLabelText('answer'),{target:{value:'pending local text'}});
 fireEvent.click(screen.getByText('save'));
 await screen.findByText(/云端进度冲突/);
 expect((screen.getByLabelText('answer') as HTMLTextAreaElement).disabled).toBe(true);
 expect(localStorage.getItem(key)).toContain('pending local text');
 expect(mocks.write).toHaveBeenCalledTimes(1);
 fireEvent.click(screen.getByText('retry'));
 await screen.findByText(/云端记录比本机未同步草稿更新/);
 expect((screen.getByText('save') as HTMLButtonElement).disabled).toBe(true);
 fireEvent.click(screen.getByText('local draft'));
 fireEvent.click(screen.getByText('save'));
 await screen.findByText('已保存到 Supabase。');
 const payload=mocks.write.mock.calls[1][0];
 expect(payload.answers.__learning.studyResponses['fr-fnd-24:writing']).toBe('pending local text');
});

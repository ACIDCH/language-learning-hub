import React from 'react';
import {afterEach,expect,it,vi} from 'vitest';
import {cleanup,render,screen,waitFor} from '@testing-library/react';
import type {Session,SupabaseClient} from '@supabase/supabase-js';
import LearningOverview from '../src/LearningOverview';
const session={user:{id:'overview-owner-test'}} as Session;
const mainData=[{course_id:'en-ielts-reading-u01',state:{completed:true},updated_at:'2026-10-23T10:00:00.000Z'}];
const foundationData=[
 {lesson_id:'fr-fnd-24',completed:true,updated_at:'2026-10-25T10:00:00.000Z'},
 {lesson_id:'en-fnd-01',completed:false,updated_at:'2026-10-24T10:00:00.000Z'}
];
const main=[{id:'en-ielts-reading-u01',language:'en',level:'IELTS',title:'Reading I'}];
function mockClient(withFoundation=true){
 const from=vi.fn((table:string)=>({
  select:()=>({eq:()=>({order:()=>({limit:()=>Promise.resolve({
   data:table==='learning_progress'?mainData:withFoundation?foundationData:null,
   error:table==='foundation_progress'&&!withFoundation?{message:'permission denied'}:null
  })})})})
 }));
 return {from,client:{from} as unknown as SupabaseClient};
}
afterEach(()=>{cleanup();});
it('shows both progress tables, all 156 known lessons and a real route to the last foundation lesson',async()=>{
 const {client,from}=mockClient();
 render(<LearningOverview client={client} session={session} courses={main} savedVersion={0} onContinue={vi.fn()}/>);
 await waitFor(()=>expect(screen.getByText('已开始课程 / 49')).toBeTruthy());
 expect(screen.getByText('2',{exact:true})).toBeTruthy();
 expect(screen.getByText(/继续上次学习/).textContent).toContain('24');
 const link=screen.getByRole('link',{name:'继续学习'}) as HTMLAnchorElement;
 expect(link.getAttribute('href')).toBe('/?course=fr-fnd-24&tab=read');
 expect(from).toHaveBeenCalledWith('learning_progress');
 expect(from).toHaveBeenCalledWith('foundation_progress');
});
it('does not present incomplete counts as authoritative when foundation progress cannot be read',async()=>{
 const {client}=mockClient(false);
 render(<LearningOverview client={client} session={session} courses={main} savedVersion={0} onContinue={vi.fn()}/>);
 await screen.findByText(/无法完整读取学习概况：permission denied/);
 expect(screen.queryByRole('link',{name:'继续学习'})).toBeNull();
});

import React from 'react';
import {afterEach,describe,expect,it,vi} from 'vitest';
import {cleanup,fireEvent,render,screen,waitFor} from '@testing-library/react';
import type {SupabaseClient} from '@supabase/supabase-js';
import AccountAccess from '../src/AccountAccess';
afterEach(()=>{cleanup();vi.clearAllMocks();});
describe('existing-user only account entry',()=>{
 it('renders precisely one login form, no registration, resend, or password recovery actions',()=>{
  const signInWithPassword=vi.fn();
  const signUp=vi.fn(),resetPasswordForEmail=vi.fn(),resend=vi.fn();
  render(<AccountAccess client={{auth:{signInWithPassword,signUp,resetPasswordForEmail,resend}} as unknown as SupabaseClient} onNotify={vi.fn()}/>);
  expect(screen.getByRole('heading',{name:'学习账号登录'})).toBeTruthy();
  expect(screen.getByRole('button',{name:'登录'})).toBeTruthy();
  expect(screen.queryByText('注册')).toBeNull();
  expect(screen.queryByText('找回密码')).toBeNull();
  expect(screen.queryByText('发送重置密码邮件')).toBeNull();
  expect(signUp).not.toHaveBeenCalled();
  expect(resetPasswordForEmail).not.toHaveBeenCalled();
  expect(resend).not.toHaveBeenCalled();
 });
 it('authenticates existing user, does not use registration/recovery mail APIs',async()=>{
  const signInWithPassword=vi.fn().mockResolvedValue({error:null});
  const signUp=vi.fn(),resetPasswordForEmail=vi.fn();
  const notify=vi.fn();
  render(<AccountAccess client={{auth:{signInWithPassword,signUp,resetPasswordForEmail}} as unknown as SupabaseClient} onNotify={notify}/>);
  fireEvent.change(screen.getByLabelText('邮箱'),{target:{value:'existing@example.test'}});
  fireEvent.change(screen.getByLabelText('密码'),{target:{value:'valid-existing-password'}});
  fireEvent.click(screen.getByRole('button',{name:'登录'}));
  await waitFor(()=>expect(signInWithPassword).toHaveBeenCalledWith({email:'existing@example.test',password:'valid-existing-password'}));
  expect(notify).toHaveBeenCalledOnce();
  expect(signUp).not.toHaveBeenCalled();
  expect(resetPasswordForEmail).not.toHaveBeenCalled();
 });
 it('shows a login error without inviting signups or sending emails',async()=>{
  const signInWithPassword=vi.fn().mockResolvedValue({error:new Error('Invalid login credentials')});
  render(<AccountAccess client={{auth:{signInWithPassword}} as unknown as SupabaseClient} onNotify={vi.fn()}/>);
  fireEvent.change(screen.getByLabelText('邮箱'),{target:{value:'existing@example.test'}});
  fireEvent.change(screen.getByLabelText('密码'),{target:{value:'wrong-password'}});
  fireEvent.click(screen.getByRole('button',{name:'登录'}));
  expect((await screen.findByRole('alert')).textContent).toMatch(/Invalid login credentials/);
 });
});

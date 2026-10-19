import React from 'react';
import {afterEach,describe,expect,it,vi} from 'vitest';
import {cleanup,fireEvent,render,screen,waitFor} from '@testing-library/react';
import type {SupabaseClient} from '@supabase/supabase-js';
import AccountAccess from '../src/AccountAccess';
import {accountRedirect,authMailError,readAuthCallback,clearAuthCallbackUrl} from '../src/authMailFlow';
afterEach(()=>{cleanup();vi.clearAllMocks();});
function setup(auth:Record<string,unknown>,recoveryMode=false){
 return render(<AccountAccess client={{auth} as unknown as SupabaseClient}
  recoveryMode={recoveryMode} onRecoveryComplete={vi.fn()} onNotify={vi.fn()}/>);
}
describe('Supabase Auth real email delivery and callback contracts',()=>{
 it('uses same-origin reviewed account return link and handles expired redirects without leaking hashes',()=>{
  const redirect=accountRedirect('https://feat-v44-full-ui-curriculum.language-learning-hub.pages.dev');
  expect(redirect).toBe('https://feat-v44-full-ui-curriculum.language-learning-hub.pages.dev/?page=settings&section=account');
  const cb=readAuthCallback('https://example.com/?token_hash=secret-test&type=recovery');
  expect(cb).toMatchObject({tokenHash:'secret-test',type:'recovery'});
  expect(clearAuthCallbackUrl('https://example.com/?token_hash=secret-test&type=recovery&page=settings'))
   .toBe('/?page=settings');
  expect(readAuthCallback('https://example.com/#error=access_denied&error_code=otp_expired&error_description=OTP%20expired')?.error)
   .toMatch(/过期/);
 });
 it('explains unavailable default SMTP and rate limits',()=>{
  expect(authMailError({code:'email_address_not_authorized'})).toMatch(/SMTP/);
  expect(authMailError({message:'Email rate limit exceeded'})).toMatch(/频率/);
  expect(authMailError({code:'email_not_confirmed'})).toMatch(/尚未确认/);
 });
 it('signup never claims email was delivered from an accepted API request',async()=>{
  const signUp=vi.fn().mockResolvedValue({error:null,data:{session:null,user:{}}});
  setup({signUp});
  fireEvent.click(screen.getByRole('button',{name:'注册'}));
  fireEvent.change(screen.getByLabelText('注册邮箱'),{target:{value:'new@example.test'}});
  fireEvent.change(screen.getByLabelText('密码（至少八位）'),{target:{value:'a-very-long-password'}});
  fireEvent.change(screen.getByLabelText('确认密码'),{target:{value:'a-very-long-password'}});
  fireEvent.click(screen.getByRole('button',{name:'申请注册'}));
  await waitFor(()=>expect(signUp).toHaveBeenCalled());
  expect(screen.getByRole('status').textContent).toMatch(/不代表邮件已送达/);
 });
 it('marks recovery as verified before password update so the session does not hide the reset UI',async()=>{
  const verified=vi.fn(),resetPasswordForEmail=vi.fn().mockResolvedValue({error:null});
  const verifyOtp=vi.fn().mockResolvedValue({error:null,data:{session:{access_token:'token'}}});
  render(<AccountAccess client={{auth:{resetPasswordForEmail,verifyOtp}} as unknown as SupabaseClient}
    recoveryMode={false} onRecoveryVerified={verified} onRecoveryComplete={vi.fn()} onNotify={vi.fn()}/>);
  fireEvent.click(screen.getByRole('button',{name:'找回密码'}));
  fireEvent.change(screen.getByLabelText('账号邮箱'),{target:{value:'test@example.test'}});
  fireEvent.click(screen.getByRole('button',{name:'发送重置密码邮件'}));
  await waitFor(()=>expect(resetPasswordForEmail).toHaveBeenCalled());
  fireEvent.change(screen.getByLabelText(/六位恢复验证码/),{target:{value:'123456'}});
  fireEvent.click(screen.getByRole('button',{name:'验证身份并设置新密码'}));
  await waitFor(()=>expect(verified).toHaveBeenCalledOnce());
  expect(screen.getByRole('heading',{name:'设置新的账号密码'})).toBeTruthy();
 });
 it('supports password recovery OTP and only unlocks password editor with valid session',async()=>{
  const resetPasswordForEmail=vi.fn().mockResolvedValue({error:null});
  const verifyOtp=vi.fn().mockResolvedValue({error:null,data:{session:{access_token:'token'}}});
  const updateUser=vi.fn().mockResolvedValue({error:null});
  setup({resetPasswordForEmail,verifyOtp,updateUser});
  fireEvent.click(screen.getByRole('button',{name:'找回密码'}));
  fireEvent.change(screen.getByLabelText('账号邮箱'),{target:{value:'test@example.test'}});
  fireEvent.click(screen.getByRole('button',{name:'发送重置密码邮件'}));
  await waitFor(()=>expect(resetPasswordForEmail).toHaveBeenCalled());
  expect(screen.getByRole('status').textContent).toMatch(/不代表邮件已送达/);
  fireEvent.change(screen.getByLabelText(/六位恢复验证码/),{target:{value:'123456'}});
  fireEvent.click(screen.getByRole('button',{name:'验证身份并设置新密码'}));
  await waitFor(()=>expect(verifyOtp).toHaveBeenCalledWith({email:'test@example.test',token:'123456',type:'recovery'}));
  expect(screen.getByRole('heading',{name:'设置新的账号密码'})).toBeTruthy();
 });
});

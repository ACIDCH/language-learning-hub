import {useEffect,useState,type FormEvent} from 'react';
import PasswordInput from './PasswordInput';
import type {SupabaseClient} from '@supabase/supabase-js';
import {accountRedirect,authMailError} from './authMailFlow';

type Screen='login'|'signup'|'verify'|'forgot'|'recover-verify'|'reset';
export default function AccountAccess({client,recoveryMode,onRecoveryComplete,onNotify}:{
 client:SupabaseClient;recoveryMode:boolean;onRecoveryComplete:()=>void;
 onNotify:(message:string)=>void;
}){
 const [screen,setScreen]=useState<Screen>('login');
 const [email,setEmail]=useState('');
 const [password,setPassword]=useState('');
 const [again,setAgain]=useState('');
 const [token,setToken]=useState('');
 const [message,setMessage]=useState('');
 const [error,setError]=useState('');
 const [busy,setBusy]=useState(false);
 const [cooldown,setCooldown]=useState(0);
 useEffect(()=>{if(recoveryMode){setScreen('reset');setPassword('');setAgain('');}},[recoveryMode]);
 useEffect(()=>{
  if(cooldown===0)return;
  const timer=setTimeout(()=>setCooldown(n=>Math.max(0,n-1)),1000);
  return ()=>clearTimeout(timer);
 },[cooldown]);
 function navigate(next:Screen){setScreen(next);setMessage('');setError('');setPassword('');setAgain('');setToken('');}
 async function run(callback:()=>Promise<void>){
  if(busy)return;
  setBusy(true);setMessage('');setError('');
  try{await callback();}catch(e){setError(authMailError(e));}
  finally{setBusy(false);}
 }
 async function login(e:FormEvent){e.preventDefault();await run(async()=>{
   const {error}=await client.auth.signInWithPassword({email:email.trim(),password});
   if(error)throw error;
   setPassword('');onNotify('登录成功，正在加载云端学习进度。');
 });}
 async function signup(e:FormEvent){e.preventDefault();await run(async()=>{
   if(password.length<8)throw Error('密码长度必须至少八位。');
   if(password!==again)throw Error('两次密码不一致。');
   const result=await client.auth.signUp({email:email.trim(),password,options:{emailRedirectTo:accountRedirect(window.location.origin)}});
   if(result.error)throw result.error;
   setPassword('');setAgain('');
   if(result.data.session){
    setMessage('账号已创建并登录。项目当前可能未开启邮箱确认，请按你的 Supabase 设置核实。');
    return;
   }
   setScreen('verify');setCooldown(60);
   setMessage('Supabase 已接受注册请求，但这不代表邮件已送达。如已配置邮件模板，可输入六位验证码或点击最新确认链接；未收到请检查 SMTP、收件箱和垃圾邮件。');
 });}
 async function verify(e:FormEvent){e.preventDefault();await run(async()=>{
   if(!/^\d{6}$/.test(token))throw Error('请输入六位数字验证码。');
   const {error,data}=await client.auth.verifyOtp({email:email.trim(),token,type:'signup'});
   if(error)throw error;
   setToken('');
   setScreen('login');
   setMessage(data.session?'邮箱验证成功，正在登录。':'邮箱已验证，请使用密码登录。');
 });}
 async function resend(){if(cooldown>0)return;await run(async()=>{
   const {error}=await client.auth.resend({type:'signup',email:email.trim(),options:{emailRedirectTo:accountRedirect(window.location.origin)}});
   if(error)throw error;
   setCooldown(60);setMessage('Supabase 已接受重发请求，但不等于邮件送达。请以最新邮件为准。');
 });}
 async function requestRecovery(){const {error}=await client.auth.resetPasswordForEmail(email.trim(),{redirectTo:accountRedirect(window.location.origin)});
   if(error)throw error;
   setScreen('recover-verify');setCooldown(60);
   setMessage('密码找回请求已接受，但不代表邮件已送达。可点击邮件中的重置链接；如模板提供六位验证码，也可以直接输入。');
 }
 async function forgot(e:FormEvent){e.preventDefault();await run(requestRecovery);}
 async function resendRecovery(){if(cooldown>0)return;await run(requestRecovery);}
 async function verifyRecovery(e:FormEvent){e.preventDefault();await run(async()=>{
   if(!/^\\d{6}$/.test(token))throw Error('请输入邮件中的六位数字恢复验证码。');
   const {error,data}=await client.auth.verifyOtp({email:email.trim(),token,type:'recovery'});
   if(error)throw error;
   if(!data.session)throw Error('找回验证码已验证，但没有获得重置会话。请使用新的邮件链接重新验证。');
   setToken('');setScreen('reset');setMessage('身份验证通过，请设置新密码。');
 });}
 async function reset(e:FormEvent){e.preventDefault();await run(async()=>{
   if(password.length<8||password!==again)throw Error('请填写两次相同且不少于八位的新密码。');
   const {error}=await client.auth.updateUser({password});
   if(error)throw error;
   setPassword('');setAgain('');
   onRecoveryComplete();
   navigate('login');
   onNotify('密码已更新，请重新登录或继续当前账号。');
 });}
 return <section className="cloud-panel account-access" aria-label="学习系统账户">
  <h2>学习账号</h2>
  <p className="cloud-disclaimer">账户由现有 Supabase Auth 管理，不需要新的云平台或额外服务商账号。</p>
  {!recoveryMode&&<div className="account-actions">
   <button type="button" className={screen==='login'?'active':''} onClick={()=>navigate('login')}>登录</button>
   <button type="button" className={screen==='signup'||screen==='verify'?'active':''} onClick={()=>navigate('signup')}>注册</button>
   <button type="button" className={screen==='forgot'||screen==='recover-verify'?'active':''} onClick={()=>navigate('forgot')}>找回密码</button>
  </div>}
  {screen==='reset'?<form className="cloud-fields" onSubmit={reset}>
    <h3>设置新的账号密码</h3>
    <label>新密码<PasswordInput type="password" autoComplete="new-password" minLength={8} required value={password} onChange={e=>setPassword(e.target.value)}/></label>
    <label>重复新密码<PasswordInput type="password" autoComplete="new-password" minLength={8} required value={again} onChange={e=>setAgain(e.target.value)}/></label>
    <button type="submit" disabled={busy}>{busy?'处理中…':'保存新密码'}</button>
  </form>:screen==='login'?<form className="cloud-fields" onSubmit={login}>
    <label>邮箱<input required type="email" autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)}/></label>
    <label>密码<PasswordInput required type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)}/></label>
    <button type="submit" disabled={busy}>{busy?'正在登录…':'登录'}</button>
  </form>:screen==='signup'?<form className="cloud-fields" onSubmit={signup}>
    <label>注册邮箱<input required type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)}/></label>
    <label>密码（至少八位）<PasswordInput required minLength={8} type="password" autoComplete="new-password" value={password} onChange={e=>setPassword(e.target.value)}/></label>
    <label>确认密码<PasswordInput required minLength={8} type="password" autoComplete="new-password" value={again} onChange={e=>setAgain(e.target.value)}/></label>
    <button type="submit" disabled={busy}>{busy?'正在提交…':'申请注册'}</button>
    <p className="cloud-disclaimer">确认邮箱需要 Supabase 实际向该地址投递邮件。默认内置 SMTP 通常仅允许团队邮箱且限额很低；支持新用户须在 Supabase 配置自定义 SMTP。邮件链接的回调地址也必须加入 Auth URL allowlist。</p>
  </form>:screen==='verify'?<form className="cloud-fields" onSubmit={verify}>
    <p>验证注册邮箱：{email}</p>
    <label>六位邮箱验证码<input inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} required value={token} onChange={e=>setToken(e.target.value.replace(/\D/g,'').slice(0,6))}/></label>
    <button type="submit" disabled={busy||token.length!==6}>验证邮箱</button>
    <button type="button" disabled={busy||cooldown>0} onClick={()=>void resend()}>
      {cooldown?'重新发送（'+cooldown+'秒）':'请求重发验证码'}
    </button>
    <button type="button" onClick={()=>navigate('login')}>我已点击确认链接，返回登录</button>
  </form>:screen==='recover-verify'?<form className="cloud-fields" onSubmit={verifyRecovery}>
    <p>已请求向 {email} 发送恢复邮件。邮箱不存在时服务商可能不会揭示账户状态；请检查真正的收件箱。</p>
    <label>六位恢复验证码（仅适用于包含验证码的邮件模板）
     <input inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} required
      value={token} onChange={e=>setToken(e.target.value.replace(/\\D/g,'').slice(0,6))}/></label>
    <button type="submit" disabled={busy||token.length!==6}>验证身份并设置新密码</button>
    <button type="button" disabled={busy||cooldown>0} onClick={()=>void resendRecovery()}>
     {cooldown?'重新发送（'+cooldown+'秒）':'重新请求恢复邮件'}</button>
    <button type="button" onClick={()=>navigate('forgot')}>更换邮箱</button>
  </form>:<form className="cloud-fields" onSubmit={forgot}>
    <label>账号邮箱<input required type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)}/></label>
    <button type="submit" disabled={busy}>{busy?'正在请求…':'发送重置密码邮件'}</button>
    <p className="cloud-disclaimer">邮件仅在 Supabase 自定义 SMTP 配置正确且未超过限额时可可靠送出。请求接受并不等于收到邮件。</p>
  </form>}
  {error&&<p role="alert" className="account-error">{error}</p>}
  {message&&<p role="status" className="cloud-disclaimer">{message}</p>}
 </section>;
}

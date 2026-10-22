import {useState,type FormEvent} from 'react';
import PasswordInput from './PasswordInput';
import type {SupabaseClient} from '@supabase/supabase-js';

export default function AccountAccess({client,onNotify}:{
 client:SupabaseClient;
 onNotify:(message:string)=>void;
}){
 const [email,setEmail]=useState('');
 const [password,setPassword]=useState('');
 const [busy,setBusy]=useState(false);
 const [error,setError]=useState('');
 async function login(event:FormEvent){
  event.preventDefault();
  if(busy)return;
  setBusy(true);setError('');
  try{
   const result=await client.auth.signInWithPassword({email:email.trim(),password});
   if(result.error)throw result.error;
   setPassword('');
   onNotify('已登录，正在恢复课程进度与个人设置。');
  }catch(e){
   const message=e instanceof Error?e.message:'登录服务暂时不可用';
   setError(/email.not.confirmed/i.test(message)?'此账户的邮箱尚未确认，请联系账户管理员。':message);
  }finally{setBusy(false);}
 }
 return <section className="cloud-panel account-access" aria-label="学习系统账户">
  <h2>学习账号登录</h2>

  <form className="cloud-fields" onSubmit={login}>
   <label>邮箱<input required type="email" autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)}/></label>
   <label>密码<PasswordInput required type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)}/></label>
   <button type="submit" disabled={busy}>{busy?'正在登录…':'登录'}</button>
  </form>
  {error&&<p role="alert" className="account-error">{error}</p>}
 </section>;
}

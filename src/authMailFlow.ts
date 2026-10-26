/** Supabase handles actual delivery. These helpers validate callback state and make error reasons actionable. */
export function accountRedirect(origin:string):string{
 const url=new URL('/',origin);
 url.searchParams.set('page','settings');url.searchParams.set('section','account');
 return url.toString();
}
export function authMailError(error:unknown):string{
 const e=error as {code?:string;message?:string;status?:number};
 const raw=e?.message||'登录服务暂时不可用';
 const code=(e?.code||'').toLowerCase();
 if(code.includes('email_address_not_authorized')||/email address not authorized/i.test(raw))
  return 'Supabase 默认邮件服务拒绝向此地址发送：请在项目 Auth → SMTP 配置自定义邮件发送服务，再重试。';
 if(code.includes('over_email_send_rate_limit')||code.includes('email_rate_limit_exceeded')||
 /email rate limit|too many emails|rate limit exceeded/i.test(raw))
  return '邮件发送频率已达到 Supabase 限制。请等待后重试；使用自定义 SMTP 可调整邮件限额。';
 if(code.includes('otp_expired')||/otp.*expired|token.*expired|invalid.*otp/i.test(raw))
  return '验证码或邮件链接已过期/无效。请重新请求邮件并使用最新的一封。';
 if(code.includes('email_not_confirmed')||/email not confirmed/i.test(raw))
  return '邮箱尚未确认，请打开最新的验证邮件。未收到可尝试重发或检查 Supabase SMTP。';
 if(code.includes('redirect')||/redirect.*not.*allow|redirect url/i.test(raw))
  return '登录回调地址不在 Supabase Auth → URL Configuration 的允许列表，请添加当前 Pages 预览地址。';
 if(e?.status===429)return '请求过于频繁，请稍后重试；连续点击不会提高邮件送达率。';
 return raw;
}
export function readAuthCallback(url:string):{error?:string;tokenHash?:string;type?:'recovery'|'email'|'signup'}|null{
 const u=new URL(url);
 const q=u.searchParams,hash=new URLSearchParams(u.hash.replace(/^#/,''));
 const err=q.get('error_description')||hash.get('error_description')||q.get('error_code')||hash.get('error_code');
 if(err)return {error:authMailError({message:err})};
 const tokenHash=q.get('token_hash');
 const type=q.get('type');
 if(tokenHash&&['recovery','email','signup'].includes(type||''))return {tokenHash,type:type as 'recovery'|'email'|'signup'};
 return null;
}
export function clearAuthCallbackUrl(url:string):string{
 const u=new URL(url);
 for(const key of ['token_hash','type','error','error_code','error_description'])u.searchParams.delete(key);
 // Supabase session fragment is consumed by supabase-js; do not interfere with it.
 const h=new URLSearchParams(u.hash.replace(/^#/,''));
 if(h.has('error')||h.has('error_code')){
  for(const k of ['error','error_code','error_description'])h.delete(k);
  u.hash=h.toString()?'#'+h.toString():'';
 }
 return u.pathname+u.search+u.hash;
}

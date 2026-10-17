import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import './account.css';

type Screen = 'login' | 'register' | 'verify' | 'recover' | 'reset';

type Props = {
  client: SupabaseClient | null;
  signedInEmail: string;
  syncing: boolean;
  sync: () => Promise<void>;
  notify: (message: string) => void;
};

export function AccountPanel({ client, signedInEmail, syncing, sync, notify }: Props) {
  const [screen, setScreen] = useState<Screen>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [otp, setOtp] = useState('');
  const [busy, setBusy] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = window.setTimeout(() => setCooldown(seconds => Math.max(0, seconds - 1)), 1000);
    return () => window.clearTimeout(id);
  }, [cooldown]);

  useEffect(() => {
    if (!client) return;
    const { data } = client.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setError('');
        setMessage('邮箱重置链接已验证，请设置新密码。');
        setScreen('reset');
      }
    });
    return () => data.subscription.unsubscribe();
  }, [client]);

  function navigate(next: Screen) {
    setScreen(next);
    setError('');
    setMessage('');
    setPassword('');
    setConfirmation('');
    setOtp('');
  }

  async function perform(task: () => Promise<void>) {
    if (!client || busy) return;
    setBusy(true);
    setError('');
    setMessage('');
    try {
      await task();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : '操作失败，请重试。');
    } finally {
      setBusy(false);
    }
  }

  const address = email.trim();

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await perform(async () => {
      const result = await client!.auth.signInWithPassword({ email: address, password });
      if (result.error) throw result.error;
      setPassword('');
      setMessage('登录成功，可以同步学习记录。');
    });
  }

  async function register(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await perform(async () => {
      if (password.length < 8) throw new Error('密码至少需要 8 个字符。');
      if (password !== confirmation) throw new Error('两次输入的密码不一致。');
      const result = await client!.auth.signUp({ email: address, password });
      if (result.error) throw result.error;
      setPassword('');
      setConfirmation('');
      if (result.data.session) {
        // Never claim that an email OTP was sent if confirmation is disabled.
        await client!.auth.signOut();
        throw new Error('当前 Supabase 项目未要求邮箱确认。请先在 Authentication 中启用 Confirm email，再使用验证码注册。');
      }
      setScreen('verify');
      setCooldown(60);
      setMessage('注册请求已提交。请查看邮箱中的六位验证码；如果未收到，请检查邮件服务配置。');
    });
  }

  async function verify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await perform(async () => {
      if (!/^\d{6}$/.test(otp)) throw new Error('请输入六位数字验证码。');
      const result = await client!.auth.verifyOtp({ email: address, token: otp, type: 'email' });
      if (result.error) throw result.error;
      setOtp('');
      setScreen('login');
      if (result.data.session) {
        setMessage('邮箱验证成功，已自动登录。');
      } else {
        setMessage('邮箱已验证，请使用刚设置的密码登录。');
      }
    });
  }

  async function resend() {
    if (cooldown > 0) return;
    await perform(async () => {
      const result = await client!.auth.resend({ type: 'signup', email: address });
      if (result.error) throw result.error;
      setCooldown(60);
      setMessage('已请求重发，请检查收件箱及垃圾邮件。');
    });
  }

  async function recover(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await perform(async () => {
      const redirectTo = window.location.origin + import.meta.env.BASE_URL;
      const result = await client!.auth.resetPasswordForEmail(address, { redirectTo });
      if (result.error) throw result.error;
      setMessage('密码重置请求已提交。如果邮箱有对应账户，请查看重置邮件。');
    });
  }

  async function updatePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await perform(async () => {
      if (password.length < 8) throw new Error('密码至少需要 8 个字符。');
      if (password !== confirmation) throw new Error('两次输入的密码不一致。');
      const result = await client!.auth.updateUser({ password });
      if (result.error) throw result.error;
      setPassword('');
      setConfirmation('');
      setScreen('login');
      setMessage('密码已更新。');
    });
  }

  async function logout() {
    await perform(async () => {
      const result = await client!.auth.signOut();
      if (result.error) throw result.error;
      notify('已退出云端账户；本机学习记录未删除。');
    });
  }

  return <section className="ph-paper account-panel" aria-label="个人账户">
    <h2>Supabase 账户与进度同步</h2>
    {!client ? <p role="status">本机服务尚未配置 Supabase 连接。请先设置 SUPABASE_URL 和 SUPABASE_PUBLISHABLE_KEY。</p> : <>
      {screen === 'reset' ? <form className="account-form" onSubmit={updatePassword}>
        <h3>设置新密码</h3>
        <p>重置邮件已验证，请输入新密码。</p>
        <label>新密码<input type="password" minLength={8} autoComplete="new-password" required value={password} onChange={event => setPassword(event.target.value)} /></label>
        <label>确认新密码<input type="password" minLength={8} autoComplete="new-password" required value={confirmation} onChange={event => setConfirmation(event.target.value)} /></label>
        <button disabled={busy} type="submit">{busy ? '保存中…' : '更新密码'}</button>
      </form> : signedInEmail ? <>
        <p className="account-signed-in">已登录：<strong>{signedInEmail}</strong></p>
        <p>本机自动保存学习数据；云端同步需点击以下按钮。退出不会删除本机学习记录。</p>
        <div className="ph-row">
          <button disabled={syncing || busy} onClick={() => void sync()}>{syncing ? '同步中…' : '同步学习进度'}</button>
          <button disabled={busy} onClick={() => void logout()}>退出云端账户</button>
        </div>
      </> : <>
        <div className="account-tabs" role="group" aria-label="账户操作">
          <button type="button" aria-pressed={screen === 'login'} onClick={() => navigate('login')}>登录</button>
          <button type="button" aria-pressed={screen === 'register' || screen === 'verify'} onClick={() => navigate('register')}>注册</button>
        </div>
        {screen === 'login' && <form className="account-form" onSubmit={signIn}>
          <label>邮箱<input type="email" autoComplete="email" required value={email} onChange={event => setEmail(event.target.value)} /></label>
          <label>密码<input type="password" autoComplete="current-password" required value={password} onChange={event => setPassword(event.target.value)} /></label>
          <button disabled={busy} type="submit">{busy ? '正在登录…' : '登录'}</button>
          <button type="button" className="account-link" onClick={() => navigate('recover')}>忘记密码？</button>
        </form>}
        {screen === 'register' && <form className="account-form" onSubmit={register}>
          <p>使用邮箱和密码注册，再通过六位邮箱验证码确认。</p>
          <label>邮箱<input type="email" autoComplete="email" required value={email} onChange={event => setEmail(event.target.value)} /></label>
          <label>密码（至少八位）<input type="password" minLength={8} autoComplete="new-password" required value={password} onChange={event => setPassword(event.target.value)} /></label>
          <label>确认密码<input type="password" minLength={8} autoComplete="new-password" required value={confirmation} onChange={event => setConfirmation(event.target.value)} /></label>
          <button disabled={busy} type="submit">{busy ? '提交中…' : '注册并发送验证码'}</button>
        </form>}
        {screen === 'verify' && <form className="account-form" onSubmit={verify}>
          <p>验证码已请求发送至 <strong>{address}</strong>。请填写邮件中的六位数字。</p>
          <label>邮箱验证码<input inputMode="numeric" autoComplete="one-time-code" type="text" pattern="[0-9]{6}" maxLength={6} required value={otp} onChange={event => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))} /></label>
          <button disabled={busy || otp.length !== 6} type="submit">{busy ? '验证中…' : '验证邮箱并完成注册'}</button>
          <button type="button" className="account-link" disabled={busy || cooldown > 0} onClick={() => void resend()}>{cooldown ? '重新发送（' + cooldown + 's）' : '重新发送验证码'}</button>
          <button type="button" className="account-link" onClick={() => navigate('register')}>修改注册邮箱</button>
        </form>}
        {screen === 'recover' && <form className="account-form" onSubmit={recover}>
          <h3>找回密码</h3>
          <label>注册邮箱<input type="email" autoComplete="email" required value={email} onChange={event => setEmail(event.target.value)} /></label>
          <button disabled={busy} type="submit">{busy ? '请求中…' : '发送密码重置邮件'}</button>
          <button type="button" className="account-link" onClick={() => navigate('login')}>返回登录</button>
        </form>}
      </>}
      {error && <p className="account-error" role="alert">{error}</p>}
      {message && <p className="account-message" role="status">{message}</p>}
    </>}
  </section>;
}

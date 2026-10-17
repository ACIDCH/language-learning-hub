import { useEffect, useState, type FormEvent } from 'react';
import { createClient, type Session } from '@supabase/supabase-js';
import './cloud.css';

type Course = { id: string; language: string; level: string; track: string | null;
  title: string; unit: number; text_complete: boolean; audio_verified: boolean; publishable: boolean };
type State = { stage?: number; notes?: string; completed?: boolean; [key: string]: unknown };
type Progress = { course_id: string; state: State; updated_at: string };
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() || '';
const publicKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() || '';
const apiBase = (import.meta.env.VITE_WORKER_API_URL?.trim() || '').replace(/\/$/, '');
const configured = Boolean(supabaseUrl && publicKey && /^https:\/\//.test(apiBase));
const client = configured ? createClient(supabaseUrl, publicKey) : null;
const stages = ['情境', '语法', '词汇', '听读', '发音', '表达'];
const draftKey = (uid: string,courseId: string) => 'llh-cloud-draft-v1:' + uid + ':' + courseId;

async function worker<T>(path: string, token?: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(apiBase + path, {
    ...init,
    headers: {...(init.headers || {}), ...(token ? {Authorization: 'Bearer ' + token} : {})}
  });
  const value = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(value.error || '请求失败：' + response.status);
  return value as T;
}

export default function CloudWorkspace() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [catalog, setCatalog] = useState<Course[]>([]);
  const [selected, setSelected] = useState('');
  const [state, setState] = useState<State>({});
  const [status, setStatus] = useState('正在连接…');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!client) { setStatus('云端尚未配置：请先连接 Workers 与 Supabase。公开课程仍可正常学习。'); return; }
    let alive = true;
    const auth = client;
    void auth.auth.getSession().then(({data}) => {if (alive) setSession(data.session);});
    const {data:listener} = auth.auth.onAuthStateChange((_event,next) => setSession(next));
    void worker<{courses:Course[]}>('/v1/courses')
      .then(({courses}) => {if (alive) {setCatalog(courses); setSelected(courses[0]?.id || ''); setStatus('课程索引已加载。');}})
      .catch(e => {if (alive) setStatus('云端索引暂不可用：' + e.message);});
    return () => {alive = false; listener.subscription.unsubscribe();};
  }, []);

  useEffect(() => {
    if (!session || !selected) {setState({}); return;}
    let alive = true;
    setStatus('正在读取云端进度…');
    void worker<{progress:Progress|null}>('/v1/progress/' + encodeURIComponent(selected),session.access_token)
      .then(({progress}) => {
        if (!alive) return;
        let draft: {state:State; editedAt:string} | null = null;
        try {
          const cached = localStorage.getItem(draftKey(session.user.id,selected));
          if (cached) draft = JSON.parse(cached);
        } catch { /* Storage may be disabled or unavailable. */ }
        const useDraft = draft?.state && draft.editedAt &&
          (!progress || new Date(draft.editedAt).getTime() > new Date(progress.updated_at).getTime());
        setState(useDraft ? draft!.state : (progress?.state || {}));
        setStatus(useDraft ? '已恢复本机未同步草稿，点击保存后才会写入云端。' : '云端进度已读取。');
      })
      .catch(e => {if (alive) setStatus('读取失败：' + e.message);});
    return () => {alive=false;};
  },[session,selected]);

  function editState(patch: Partial<State>) {
    const next = {...state,...patch};
    setState(next);
    if (session && selected) {
      try {
        localStorage.setItem(draftKey(session.user.id, selected),
          JSON.stringify({state:next,editedAt:new Date().toISOString()}));
        setStatus('已保存在此浏览器的待同步草稿中。');
      } catch { setStatus('浏览器存储不可用，请及时同步并保留当前页面。'); }
    }
  }
  async function signIn(e: FormEvent) {
    e.preventDefault();
    if (!client) return;
    setBusy(true);
    try {
      const {error} = await client.auth.signInWithPassword({email,password});
      if (error) throw error;
      setPassword('');
      setStatus('登录成功。');
    } catch(e) {setStatus('登录失败：' + (e instanceof Error ? e.message : String(e)));}
    finally {setBusy(false);}
  }

  async function save() {
    if (!session || !selected || busy) return;
    setBusy(true);
    try {
      const result = await worker<{progress:Progress}>('/v1/progress/'+encodeURIComponent(selected),
        session.access_token,{
          method:'PUT',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({state})
        });
      setState(result.progress.state);
      try {localStorage.removeItem(draftKey(session.user.id,selected));} catch { /* no local cache */ }
      setStatus('学习进度已保存：' + new Date(result.progress.updated_at).toLocaleString());
    } catch(e) {setStatus('保存失败，请保留本页内容：' + (e instanceof Error ? e.message : String(e)));}
    finally {setBusy(false);}
  }
  return <main className="cloud-workspace">
    <header className="cloud-head">
      <div><p className="cloud-kicker">LANGUAGE HUB / CLOUD</p><h1>云端学习进度</h1>
        <p>与本机私人教材服务分离的跨设备进度模块。课程全文和个人音频暂不经此接口开放。</p></div>
      <a href="/" className="cloud-return">返回公开课程 →</a>
    </header>
    {!configured ? <section className="cloud-panel" role="status">
      <h2>尚未启用云端连接</h2>
      <p>前端仍可阅读公开课程。云端同步将在 Cloudflare Pages 的公开连接配置和 Worker 服务验证通过后开放。</p>
      <p>无需在浏览器中粘贴任何数据库管理密钥。</p>
    </section> : <>
      <p role="status" className="cloud-status">{status}</p>
      {!session ? <section className="cloud-panel"><h2>现有学习账号登录</h2>
        <p>目前仅支持已经创建的 Supabase 学习账号。邮箱验证码注册和找回密码将在独立验收后接入。</p>
        <form className="cloud-fields" onSubmit={signIn}>
          <label>邮箱<input required type="email" autoComplete="username" value={email}
            onChange={e=>setEmail(e.target.value)}/></label>
          <label>密码<input required type="password" autoComplete="current-password" value={password}
            onChange={e=>setPassword(e.target.value)}/></label>
          <button disabled={busy} type="submit">登录</button>
        </form>
      </section> : <section className="cloud-panel">
        <div className="cloud-flex"><h2>课程进度与笔记</h2>
          <button type="button" onClick={()=>{void client?.auth.signOut();setState({});}}>退出账户</button></div>
        <p className="cloud-account">已登录：{session.user.email}</p>
        <label className="cloud-select">课程
          <select value={selected} onChange={e=>setSelected(e.target.value)}>
            {catalog.map(course=><option key={course.id} value={course.id}>
              {course.language.toUpperCase()} · {course.level} · {course.title}
            </option>)}
          </select>
        </label>
        <p className="cloud-disclaimer">本模块保存学习进度，不将“已存在目录”误认为“教材已通过质量验收”。</p>
        <fieldset className="cloud-stages"><legend>当前学习环节</legend>
          {stages.map((label,i)=><label key={label}><input type="radio" checked={state.stage===i}
            onChange={()=>editState({stage:i})}/>{label}</label>)}
        </fieldset>
        <label className="cloud-notes">学习笔记
          <textarea rows={7} maxLength={10000} value={typeof state.notes==='string'?state.notes:''}
            onChange={e=>editState({notes:e.target.value})}/>
        </label>
        <label className="cloud-completed"><input type="checkbox" checked={state.completed===true}
          onChange={e=>editState({completed:e.target.checked})}/>已完成本次学习</label>
        <button type="button" disabled={busy || !selected} onClick={()=>void save()}>保存到 Supabase</button>
      </section>}
    </>}
  </main>;
}

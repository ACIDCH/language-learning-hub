import { useEffect, useState, type FormEvent } from 'react';
import { createClient, type Session } from '@supabase/supabase-js';
import './cloud.css';
import { cloudPublicDefaults } from './cloudPublicDefaults';
import BackupImporter from './BackupImporter';
import LessonReader from './LessonReader';
import AudioVault from './AudioVault';
import AITutor from './AITutor';
import SpeechPractice from './SpeechPractice';
import CourseAudit from './CourseAudit';
import LessonReview from './LessonReview';

type Course = { id: string; language: string; level: string; track: string | null;
  title: string; unit: number; text_complete: boolean; audio_verified: boolean; publishable: boolean };
type State = { stage?: number; notes?: string; completed?: boolean; [key: string]: unknown };
type Progress = { course_id: string; state: State; updated_at: string };
type PrivateLesson = { course_id: string; content_body: string; source_version: string; qa_status: string; updated_at: string };
type AudioAsset = { asset_id:string;filename:string;duration_seconds:number;source_kind:string;decoded:boolean;exact_text:boolean;listened:boolean;audio_verified:boolean };
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() || cloudPublicDefaults.supabaseUrl;
const publicKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() || cloudPublicDefaults.supabasePublishableKey;
const apiBase = (import.meta.env.VITE_WORKER_API_URL?.trim() || cloudPublicDefaults.workerApiUrl).replace(/\/$/, '');
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
  const [lesson, setLesson] = useState<PrivateLesson | null>(null);
  const [importNonce,setImportNonce] = useState(0);
  const [lessonStatus, setLessonStatus] = useState('登录后可读取私人课程正文。');
  const [audioAssets,setAudioAssets]=useState<AudioAsset[]>([]);
  const [audioStatus,setAudioStatus]=useState('等待课程选择。');
  const [courseQuery,setCourseQuery]=useState('');
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
      .catch(e => {
        if (!alive) return;
        try {
          const cached = localStorage.getItem(draftKey(session.user.id,selected));
          if (cached) {
            const draft = JSON.parse(cached) as {state?:State};
            if (draft?.state) {
              setState(draft.state);
              setStatus('远端读取失败，已保留本机未同步草稿：' + e.message);
              return;
            }
          }
        } catch { /* Local cache unavailable. */ }
        setStatus('读取失败：' + e.message);
      });
    return () => {alive=false;};
  },[session,selected]);

  useEffect(() => {
    if (!session || !selected) {
      setLesson(null);
      setLessonStatus('登录后可读取私人课程正文。');
      return;
    }
    let alive = true;
    setLesson(null);
    setLessonStatus('正在读取已同步的私人课程正文…');
    void worker<{lesson:PrivateLesson}>('/v1/private-courses/'+encodeURIComponent(selected),session.access_token)
      .then(({lesson}) => {
        if (!alive) return;
        setLesson(lesson);
        setLessonStatus(lesson.qa_status === 'approved'
          ? '已同步且通过审校的正文。'
          : 'V4 个人草稿 · 尚未完成教学与音频验收。');
      })
      .catch(e => {
        if (!alive) return;
        setLesson(null);
        setLessonStatus(e.message === 'lesson_not_synced'
          ? '这节课程的私人正文尚未同步到云端；课程目录仍可使用。'
          : '正文读取暂不可用：'+e.message);
      });
    return () => {alive=false;};
  }, [session, selected, importNonce]);

  useEffect(() => {
    if (!session || !selected) {setAudioAssets([]);setAudioStatus('登录后可查看索引');return;}
    let alive=true;
    setAudioAssets([]);
    setAudioStatus('正在读取音频索引…');
    void worker<{assets:AudioAsset[];playback_ready:boolean}>(
      '/v1/audio-index/'+encodeURIComponent(selected),session.access_token)
      .then(({assets})=>{
        if(!alive)return;
        setAudioAssets(assets);
        setAudioStatus(assets.length
          ? '这是元数据索引；还未验收实际音频文件与在线播放地址。'
          : '该课程尚未匹配可用音频文件。');
      })
      .catch(e=>{if(alive)setAudioStatus('音频索引暂不可用：'+e.message);});
    return ()=>{alive=false;};
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
        <p>跨设备学习进度与私人课程草稿阅读。Google Drive 保留原件，必要教学音频将分阶段接入。</p></div>
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
        <label className="cloud-select">按课程名或课程编号搜索
          <input type="search" value={courseQuery} placeholder="例如：A1、Listening、语法"
            onChange={e=>setCourseQuery(e.target.value)}/>
        </label>
        {courseQuery.trim() && <div className="cloud-course-results" role="group" aria-label="课程搜索结果">
          {catalog.filter(c=>(c.id+' '+c.title+' '+c.level).toLocaleLowerCase()
            .includes(courseQuery.trim().toLocaleLowerCase())).slice(0,12)
            .map(c=><button type="button" key={c.id} onClick={()=>{
              setSelected(c.id);setCourseQuery('');
            }}>{c.language.toUpperCase()} · {c.level} · {c.title}</button>)}
        </div>}
        <label className="cloud-select">课程
          <select value={selected} onChange={e=>setSelected(e.target.value)}>
            {catalog.map(course=><option key={course.id} value={course.id}>
              {course.language.toUpperCase()} · {course.level} · {course.title}
            </option>)}
          </select>
        </label>
        <p className="cloud-disclaimer">本模块保存学习进度，不将“已存在目录”误认为“教材已通过质量验收”。</p>
        <section className="cloud-reader" aria-label="私人课程正文">
          <h3>我的课程正文</h3>
          <p role="status" className="cloud-disclaimer">{lessonStatus}</p>
          {lesson && <>
            <p className="cloud-disclaimer">来源版本：{lesson.source_version} · 状态：{lesson.qa_status === 'approved' ? '已审核' : '草稿/待核验'}</p>
            <LessonReader text={lesson.content_body} courseId={lesson.course_id}
              stage={typeof state.stage==='number'?state.stage:0}
              onChangeStage={stage=>editState({stage})}/>
          </>}
        </section>
        {lesson&&<LessonReview key={lesson.course_id} client={client!} session={session}
          courseId={lesson.course_id} qaStatus={lesson.qa_status}
          onUpdated={()=>setImportNonce(n=>n+1)}/>}
        <AudioVault client={client!} session={session} courseId={selected}
          assets={audioAssets} status={audioStatus}/>
        <CourseAudit client={client!} session={session} onSelect={id=>setSelected(id)}/>
        <SpeechPractice key={selected} language={catalog.find(c=>c.id===selected)?.language||'fr'}/>
        <AITutor key={'ai-'+selected} session={session} apiBase={apiBase} courseId={selected}
          language={catalog.find(c=>c.id===selected)?.language||'fr'}
          lessonText={lesson?.content_body||''}/>
        <BackupImporter client={client!} session={session} knownIds={catalog.map(c=>c.id)}
          onImported={()=>setImportNonce(n=>n+1)}/>
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

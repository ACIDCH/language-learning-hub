import { useEffect, useRef, useState } from 'react';
import { type Session } from '@supabase/supabase-js';
import './cloud.css';
import {cloudClient,apiBase} from './v44Connection';
import {isCloudWorkspaceConfigured} from './previewWorker';
import BackupImporter from './BackupImporter';
import DriveLibrary from './DriveLibrary';
import LessonReader from './LessonReader';
import AudioVault from './AudioVault';
import AudioCoverage from './AudioCoverage';
import AITutor from './AITutor';
import SpeechPractice from './SpeechPractice';
import CourseAudit from './CourseAudit';
import LessonReview from './LessonReview';
import LearningOverview from './LearningOverview';
import AccountAccess from './AccountAccess';
import LearningPath from './LearningPath';
import ReferenceIndex from './ReferenceIndex';
import {ReferenceAudio} from './ReferenceAudio';
import FoundationStudio from './FoundationStudio';
import CourseGuide from './CourseGuide.tsx';
import StageCoverage from './StageCoverage';
import type {PracticeCheck} from './courseGuide';
import {mergeProgressDraft} from './progressMerge';

type Course = { id: string; language: string; level: string; track: string | null;
  title: string; unit: number; text_complete: boolean; audio_verified: boolean; publishable: boolean };
type State = { stage?: number; notes?: string; completed?: boolean; [key: string]: unknown };
type Progress = { course_id: string; state: State; updated_at: string };
type PrivateLesson = { course_id: string; content_body: string; source_version: string; qa_status: string; updated_at: string };
type AudioAsset = { asset_id:string;filename:string;duration_seconds:number;source_kind:string;decoded:boolean;exact_text:boolean;listened:boolean;audio_verified:boolean };
// Preview uses same-origin /api; an absolute HTTPS Worker is not required.
const configured = isCloudWorkspaceConfigured(Boolean(cloudClient),apiBase);
const client = configured ? cloudClient : null;
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

export default function CloudWorkspace({initialPanel='learn',initialCourse=''}:{initialPanel?:'learn'|'path'|'foundation'|'audio'|'speech'|'review'|'resources'|'ai';initialCourse?:string}) {
  const [session, setSession] = useState<Session | null>(null);
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
  const [activePanel,setActivePanel] = useState<'learn'|'path'|'foundation'|'audio'|'speech'|'review'|'resources'|'ai'>(initialPanel);
  const [overviewVersion,setOverviewVersion] = useState(0);
  const [progressReadyKey,setProgressReadyKey] = useState('');
  const [progressReadError,setProgressReadError] = useState(false);
  const [progressRetry,setProgressRetry] = useState(0);
  const selectedRef=useRef('');
  const activeUserRef=useRef(session?.user.id||'');
  activeUserRef.current=session?.user.id||'';
  const draftRevisions=useRef<Record<string,number>>({});
  const progressVersion=useRef<string|null>(null);
  const forceProgressConflict=useRef(false);
  const [progressConflict,setProgressConflict]=useState<{local:State;remote:State}|null>(null);
  const progressKey=session?session.user.id+':'+selected:'';
  const progressReady=Boolean(selected&&progressReadyKey===progressKey);
  const currentLesson=lesson?.course_id===selected?lesson:null;
  function chooseCourse(id:string){
    selectedRef.current=id;
    progressVersion.current=null;forceProgressConflict.current=false;setProgressConflict(null);
    setSelected(id);setState({});setProgressReadyKey('');
  }

  useEffect(() => {
    if (!client) { setStatus('云端尚未配置：请先连接 Workers 与 Supabase。公开课程仍可正常学习。'); return; }
    let alive = true;
    const auth = client;
    void auth.auth.getSession().then(({data}) => {if (alive) setSession(data.session);});
    const {data:listener} = auth.auth.onAuthStateChange((_event,next) => {setSession(next);});
    void worker<{courses:Course[]}>('/v1/courses')
      .then(({courses}) => {if (alive) {setCatalog(courses); chooseCourse(courses.some(c=>c.id===initialCourse)?initialCourse:courses[0]?.id || ''); setStatus('课程索引已加载。');}})
      .catch(e => {if (alive) setStatus('云端索引暂不可用：' + e.message);});
    return () => {alive = false; listener.subscription.unsubscribe();};
  }, []);

  useEffect(() => {
    if (!session || !selected) {setState({});setProgressReadyKey('');return;}
    let alive = true;
    setProgressReadyKey('');
    setProgressReadError(false);setProgressConflict(null);
    setState({});
    setStatus('正在读取云端进度…');
    void worker<{progress:Progress|null}>('/v1/progress/' + encodeURIComponent(selected),session.access_token)
      .then(({progress}) => {
        if (!alive) return;
        let draft: {state:State; editedAt:string} | null = null;
        try {
          const cached = localStorage.getItem(draftKey(session.user.id,selected));
          if (cached) draft = JSON.parse(cached);
        } catch { /* Storage may be disabled or unavailable. */ }
        progressVersion.current=progress?.updated_at||null;
        const useDraft = draft?.state && draft.editedAt &&
          (!progress || new Date(draft.editedAt).getTime() > new Date(progress.updated_at).getTime());
        if(draft?.state&&progress){
          setState(draft.state);setProgressConflict({local:draft.state,remote:progress.state});
          setStatus('云端与本机未同步草稿不同步；请选择版本，未确认前禁止保存。');
          return;
        }
        setState(useDraft ? mergeProgressDraft(progress?.state||{},draft!.state) : (progress?.state || {}));
        setProgressReadyKey(session.user.id+':'+selected);
        setStatus(useDraft ? '已恢复本机未同步草稿，点击保存后才会写入云端。' : '云端进度已读取。');
      })
      .catch(e => {
        if (!alive) return;
        setProgressReadError(true);
        try {
          const cached = localStorage.getItem(draftKey(session.user.id,selected));
          if (cached) {
            const draft = JSON.parse(cached) as {state?:State};
            if (draft?.state) {
              setState(draft.state);
              // A local draft is NOT proof that the remote state was loaded.
              // Block writes until the current remote version can be read.
              setStatus('云端读取失败，已保留本机草稿（只读）；为防止覆盖已有进度，暂不允许保存：' + e.message);
              return;
            }
          }
        } catch { /* Local cache unavailable. */ }
        setStatus('读取失败，已禁止覆盖保存：' + e.message);
      });
    return () => {alive=false;};
  },[session,selected,progressRetry]);

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
    if(!progressReady)return;
    const next = {...state,...patch};
    if(session&&selected){const id=draftKey(session.user.id,selected);draftRevisions.current[id]=(draftRevisions.current[id]||0)+1;}
    setState(next);
    if (session && selected) {
      try {
        localStorage.setItem(draftKey(session.user.id, selected),
          JSON.stringify({state:next,editedAt:new Date().toISOString()}));
        setStatus('已保存在此浏览器的待同步草稿中。');
      } catch { setStatus('浏览器存储不可用，请及时同步并保留当前页面。'); }
    }
  }
  function resolveProgressConflict(choice:'cloud'|'local'){
    if(!session||!selected||!progressConflict)return;
    const next=choice==='cloud'?progressConflict.remote:mergeProgressDraft(progressConflict.remote,progressConflict.local);
    setState(next);setProgressConflict(null);forceProgressConflict.current=false;
    if(choice==='cloud'){
      try{localStorage.removeItem(draftKey(session.user.id,selected));}catch{}
      setStatus('已选择云端进度；本机未同步草稿不再参与此次保存。');
    }else{
      const id=draftKey(session.user.id,selected);
      draftRevisions.current[id]=(draftRevisions.current[id]||0)+1;
      try{localStorage.setItem(id,JSON.stringify({state:next,editedAt:new Date().toISOString()}));}catch{}
      setStatus('已选择保留本机草稿；请核对后再同步。');
    }
    setProgressReadError(false);
    setProgressReadyKey(session.user.id+':'+selected);
  }
  async function save() {
    if (!session || !selected || busy || !progressReady) return;
    const courseId=selected;
    const userId=session.user.id;
    const saveState={...state};
    const draftId=draftKey(userId,courseId);
    const revisionAtSave=draftRevisions.current[draftId]||0;
    setBusy(true);
    try {
      const result = await worker<{progress:Progress}>('/v1/progress/'+encodeURIComponent(courseId),
        session.access_token,{
          method:'PUT',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({state:saveState,expectedUpdatedAt:progressVersion.current})
        });
      // Do not consume or erase a newer draft (or another account's UI state)
      // when a slow save completes after navigation or another local edit.
      const sameIdentity=selectedRef.current===courseId&&activeUserRef.current===userId;
      const sameRevision=(draftRevisions.current[draftId]||0)===revisionAtSave;
      if(sameIdentity){
        progressVersion.current=result.progress.updated_at;
        if(sameRevision){
          setState(result.progress.state);
          try{localStorage.removeItem(draftId);}catch{}
          setStatus('学习进度已保存：' + new Date(result.progress.updated_at).toLocaleString());
        }else{
          setStatus('上一版本已同步；此后本机修改仍待再次保存。');
        }
      }else if(sameRevision){
        try{localStorage.removeItem(draftId);}catch{}
      }
      setOverviewVersion(n=>n+1);
     } catch(e) {
      if(selectedRef.current===courseId&&activeUserRef.current===userId){
        const detail=e instanceof Error?e.message:String(e);
        if(detail==='progress_conflict'||detail==='progress_version_required'){
          forceProgressConflict.current=true;setProgressReadyKey('');setProgressReadError(true);
          setStatus('云端进度发生并发变更，本机草稿已保留；请重新读取并选择版本。');
        }else setStatus('保存失败，请保留本页内容：'+detail);
      }
    }
    finally {setBusy(false);}
  }
  return <main className="cloud-workspace">
    <header className="cloud-head">
      <div><p className="cloud-kicker">MY LEARNING</p><h1>学习工作区</h1></div>
      <a href="/" className="cloud-return">返回课程 →</a>
    </header>
    {!configured ? <section className="cloud-panel" role="status">
      <h2>尚未启用云端连接</h2><p>请检查云端连接。</p>
    </section> : <>
      {session&&status&&<p role="status" className="cloud-status">{status}</p>}
      {!session ? <AccountAccess client={client!} onNotify={setStatus}/> : <section className="cloud-panel">
        <div className="cloud-flex"><h2>课程进度与笔记</h2>
          <button type="button" onClick={()=>{void client?.auth.signOut();setState({});setProgressReadyKey('');}}>退出账户</button></div>
        <p className="cloud-account">已登录：{session.user.email}</p>
        <label className="cloud-select">按课程名或课程编号搜索
          <input type="search" value={courseQuery} placeholder="例如：A1、Listening、语法"
            onChange={e=>setCourseQuery(e.target.value)}/>
        </label>
        {courseQuery.trim() && <div className="cloud-course-results" role="group" aria-label="课程搜索结果">
          {catalog.filter(c=>(c.id+' '+c.title+' '+c.level).toLocaleLowerCase()
            .includes(courseQuery.trim().toLocaleLowerCase())).slice(0,12)
            .map(c=><button type="button" key={c.id} onClick={()=>{
              chooseCourse(c.id);setCourseQuery('');
            }}>{c.language.toUpperCase()} · {c.level} · {c.title}</button>)}
        </div>}
        <label className="cloud-select">课程
          <select value={selected} onChange={e=>chooseCourse(e.target.value)}>
            {catalog.map(course=><option key={course.id} value={course.id}>
              {course.language.toUpperCase()} · {course.level} · {course.title}
            </option>)}
          </select>
        </label>
        <nav className="cloud-panel-tabs" aria-label="学习系统模块">
          {([
            ['learn','课程学习'],['path','学习路径'],['foundation','零基础补充'],['audio','课程音频'],['speech','跟读练习'],
            ['review','质量审校'],['resources','资源管理'],['ai','AI 教师']
          ] as const).map(([id,label])=>
            <button type="button" key={id} onClick={()=>setActivePanel(id)}
              aria-current={activePanel===id?'page':undefined}
              className={activePanel===id?'panel-active':''}>{label}</button>)}
        </nav>
        {activePanel==='learn'&&<>
          <LearningOverview key={session.user.id} client={client!} session={session} courses={catalog}
            savedVersion={overviewVersion} onContinue={chooseCourse}/>
          <section className="cloud-reader" aria-label="本课学习进度与笔记">
            <h3>本课进度与笔记</h3>
            {!progressReady&&<p role="status" className="cloud-disclaimer">
              {progressReadError?'云端进度读取失败，当前保留的本机草稿为只读；为避免覆盖已有数据，编辑与保存已锁定。':'正在读取此课程的进度，期间编辑和保存暂时锁定。'}
            </p>}
            {progressConflict&&<div role="group" aria-label="云端与本机未同步草稿冲突">
              <button type="button" onClick={()=>resolveProgressConflict('cloud')}>使用云端进度</button>
              <button type="button" onClick={()=>resolveProgressConflict('local')}>保留本机草稿并核对后同步</button>
            </div>}
            {progressReadError&&!progressConflict&&<button type="button" onClick={()=>setProgressRetry(x=>x+1)}>重新读取本课云端进度</button>}
            <fieldset className="cloud-stages" disabled={!progressReady||busy}>
              <legend>当前学习环节</legend>
              {stages.map((label,i)=><label key={label}><input type="radio"
                checked={state.stage===i} onChange={()=>editState({stage:i})}/>{label}</label>)}
            </fieldset>
            <label className="cloud-notes">学习笔记
              <textarea rows={5} maxLength={10000} disabled={!progressReady||busy}
                value={typeof state.notes==='string'?state.notes:''}
                onChange={e=>editState({notes:e.target.value})}/>
            </label>
            <label className="cloud-completed">
              <input type="checkbox" disabled={!progressReady||busy}
                checked={state.completed===true}
                onChange={e=>editState({completed:e.target.checked})}/>已完成本次学习
            </label>
            <button type="button" disabled={busy||!progressReady}
              onClick={()=>void save()}>保存到 Supabase</button>
          </section>
          <section className="cloud-reader" aria-label="私人课程正文">
            <h3>我的课程正文</h3>
            <p role="status" className="cloud-disclaimer">{lessonStatus}</p>
            {currentLesson&&<>
              <CourseGuide courseId={selected} disabled={!progressReady||busy}
                check={(state.practiceChecklist&&typeof state.practiceChecklist==='object'&&
                  !Array.isArray(state.practiceChecklist)?state.practiceChecklist:{}) as PracticeCheck}
                onChange={practiceChecklist=>editState({practiceChecklist})}/>
              <LessonReader text={currentLesson.content_body} language={catalog.find(c=>c.id===selected)?.language||"fr"} courseId={currentLesson.course_id}
                stage={typeof state.stage==='number'?state.stage:0}
                onChangeStage={stage=>editState({stage})}/>
            </>}
          </section>
        </>}
        {activePanel==='path'&&<LearningPath client={client!} session={session}
          courses={catalog} onChoose={id=>{chooseCourse(id);setActivePanel('learn');}}/>}
        {activePanel==='foundation'&&<FoundationStudio client={client!} session={session}
          onOpenCourses={()=>setActivePanel('learn')}/>}
        {activePanel==='audio'&&<>
          <AudioCoverage client={client!} session={session} courseId={selected}/>
          <AudioVault client={client!} session={session}
            courseId={selected} assets={audioAssets} status={audioStatus}/>
          <DriveLibrary key={'drive-audio-'+selected} client={client!} session={session} courseId={selected} mode="audio"/>
          <ReferenceAudio lessonId={selected}/>
        </>}
        {activePanel==='speech'&&<>
          <SpeechPractice key={selected} lessonText={currentLesson?.content_body||''}
            language={catalog.find(c=>c.id===selected)?.language||'fr'} session={session}
            accessToken={session.access_token} variant="standalone"/><a href="/speech-lab#ipa-studio">全文 IPA 工具 →</a>
        </>}
        {activePanel==='review'&&<>
          <StageCoverage client={client!} session={session} onSelect={chooseCourse}/>
          <CourseAudit client={client!} session={session} refreshVersion={importNonce}
            onSelect={id=>chooseCourse(id)}/>
          {currentLesson&&<LessonReview key={currentLesson.course_id} client={client!}
            session={session} courseId={currentLesson.course_id}
            qaStatus={currentLesson.qa_status}
            onUpdated={()=>setImportNonce(n=>n+1)}/>}
        </>}
        {activePanel==='resources'&&<>
          <DriveLibrary key={'drive-resources-'+selected} client={client!} session={session} courseId={selected} mode="resources"/>
          <ReferenceIndex client={client!} session={session}/>
          <BackupImporter client={client!} session={session}
            knownIds={catalog.map(c=>c.id)} onImported={()=>setImportNonce(n=>n+1)}/>
        </>}
        {activePanel==='ai'&&<section className="cloud-reader">
          <h3>AI 教师</h3>
          <details>
            <summary>展开现有 AI 实验模块（手动启用）</summary>
            <AITutor key={'ai-'+selected} session={session} apiBase={apiBase}
              courseId={selected} language={catalog.find(c=>c.id===selected)?.language||'fr'}
              lessonText={currentLesson?.content_body||''}/>
          </details>
        </section>}
      </section>}
    </>}
  </main>;
}

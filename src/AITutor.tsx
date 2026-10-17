import {useState,type FormEvent} from 'react';
import type {Session} from '@supabase/supabase-js';

type Props={session:Session;apiBase:string;courseId:string;language:string;lessonText:string};
type Provider='deepseek'|'gemini'|'openrouter'|'openai'|'custom';
type Mode='explain'|'essay'|'dialogue'|'audit';
const MODE_OPTIONS=[{value:'explain',label:'课程讲解'},{value:'essay',label:'作文批改'},{value:'dialogue',label:'AI 对话'},{value:'audit',label:'课程逐课审校（草稿建议）'}] as const;
const DEFAULT_MODELS:Record<Provider,string>={
 deepseek:'deepseek-chat',gemini:'gemini-2.0-flash',
 openrouter:'openrouter/free',openai:'gpt-4.1-mini',custom:''
};
export default function AITutor({session,apiBase,courseId,language,lessonText}:Props){
 const [enabled,setEnabled]=useState(false);
 const [provider,setProvider]=useState<Provider>('deepseek');
 const [endpoint,setEndpoint]=useState('');
 const [model,setModel]=useState(DEFAULT_MODELS.deepseek);
 const [apiKey,setApiKey]=useState('');
 const [mode,setMode]=useState<Mode>('explain');
 const [prompt,setPrompt]=useState('');
 const [result,setResult]=useState('');
 const [status,setStatus]=useState('AI 默认关闭。只有你主动点击发送才会请求所选服务。');
 const [busy,setBusy]=useState(false);
 function changeProvider(next:Provider){
   setProvider(next);setModel(DEFAULT_MODELS[next]);setResult('');setStatus('已切换服务，未发出任何 AI 请求。');
 }
 async function submit(e:FormEvent){
   e.preventDefault();
   if(!enabled||busy)return;
   setBusy(true);setResult('');setStatus('正在调用所选模型…');
   try{
     const response=await fetch(apiBase+'/v1/ai/assist',{
       method:'POST',
       headers:{'Content-Type':'application/json','Authorization':'Bearer '+session.access_token,
        'X-AI-Key':apiKey},
       body:JSON.stringify({provider,endpoint,model,mode,
         context:'Course: '+courseId+'; Language: '+language+'\n'+lessonText.slice(0,8500),
         prompt})
     });
     const data=await response.json() as {answer?:string;error?:string};
     if(!response.ok||!data.answer)throw Error(data.error||'服务未返回回答');
     setResult(data.answer);
     setStatus('已取得模型回复。请自行核验课程解释、例句和评分建议。');
   }catch(err){setStatus('AI 请求失败：'+(err instanceof Error?err.message:String(err)));}
   finally{setBusy(false);}
 }
 return <section className="cloud-reader" aria-label="可选 AI 学习助手">
  <h3>AI 教师 · 自选模型</h3>
  <label className="cloud-toggle"><input type="checkbox" checked={enabled}
    onChange={e=>{setEnabled(e.target.checked);setResult('');}}/>
    手动启用 AI（可能消耗你所选服务商的额度）</label>
  <p className="cloud-disclaimer">默认不调用 AI；密钥仅保留在当前页面内存并随请求临时发送至 Worker，不会写入 GitHub、Supabase 或浏览器本地存储。自定义模型使用兼容 OpenAI Chat Completions 的 HTTPS 接口。服务商可能依据自己的政策处理请求内容。</p>
  {enabled&&<form onSubmit={submit} className="cloud-fields">
    <label>模型服务商
      <select value={provider} onChange={e=>changeProvider(e.target.value as Provider)}>
       <option value="deepseek">DeepSeek</option><option value="gemini">Google Gemini</option>
       <option value="openrouter">OpenRouter（可选免费模型）</option>
       <option value="openai">OpenAI</option><option value="custom">其他兼容模型</option>
      </select>
    </label>
    {provider==='custom'&&<label>自定义 HTTPS Chat Completions 地址
       <input type="url" required placeholder="https://api.example.com/v1/chat/completions"
         value={endpoint} onChange={e=>setEndpoint(e.target.value)}/>
    </label>}
    <label>模型 ID<input required value={model} onChange={e=>setModel(e.target.value)}
       placeholder="输入该服务商真实提供的模型 ID"/></label>
    <label>API Key（不保存）<input type="password" autoComplete="off" required
       value={apiKey} onChange={e=>setApiKey(e.target.value)}
       placeholder="只在本页粘贴，不要发到聊天"/></label>
    <label>教学模式<select value={mode} onChange={e=>setMode(e.target.value as Mode)}>
      {MODE_OPTIONS.map(x=><option key={x.value} value={x.value}>{x.label}</option>)}
    </select></label>
    <label>提问或待批改文本
      <textarea required rows={5} minLength={3} maxLength={6000}
        value={prompt} onChange={e=>setPrompt(e.target.value)}
        placeholder="例如：解释这节法语课程的主语代词；或粘贴一篇作文进行反馈"/>
    </label>
    <button disabled={busy||!apiKey||!prompt.trim()} type="submit">
      {busy?'正在生成反馈…':'主动调用一次 AI'}
    </button>
  </form>}
  <p role="status" className="cloud-disclaimer">{status}</p>
  {result&&<div className="cloud-ai-result" aria-label="AI 模型生成的教学反馈">
    <div className="cloud-disclaimer">AI 生成内容 · 非官方考试评分 · 不自动批准课程</div>
    <div className="lesson-paragraphs">{result}</div>
  </div>}
 </section>;
}

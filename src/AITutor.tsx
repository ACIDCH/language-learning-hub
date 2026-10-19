import {useEffect,useRef,useState,type FormEvent} from 'react';
import type {Session} from '@supabase/supabase-js';

import {useAISettings,type Provider} from './AISettings';
import PasswordInput from './PasswordInput';
type Props={session:Session|null;apiBase:string;courseId:string;language:string;lessonText:string;compact?:boolean;initialPrompt?:string};

type Mode='explain'|'essay'|'dialogue'|'audit';
const MODE_OPTIONS=[{value:'explain',label:'课程讲解'},{value:'essay',label:'作文批改'},{value:'dialogue',label:'AI 对话'},{value:'audit',label:'课程逐课审校（草稿建议）'}] as const;
export default function AITutor({session,apiBase,courseId,language,lessonText,compact=false,initialPrompt=''}:Props){
 const {config,update,getForProvider}=useAISettings();
 const {enabled,provider,endpoint,model,apiKey}=config;
 const setEnabled=(enabled:boolean)=>update({enabled});
 const setEndpoint=(endpoint:string)=>update({endpoint});
 const setModel=(model:string)=>update({model});
 const setApiKey=(apiKey:string)=>update({apiKey});
 const request=useRef<AbortController|null>(null);
 const [mode,setMode]=useState<Mode>('explain');
 const [prompt,setPrompt]=useState(initialPrompt);
 const [result,setResult]=useState('');
 const [comparison,setComparison]=useState<{provider:Provider;answer:string}[]>([]);
 const [status,setStatus]=useState('AI 默认关闭。只有你主动点击发送才会请求所选服务。');
 const [busy,setBusy]=useState(false);
 function changeProvider(next:Provider){
   update({provider:next});setResult('');setComparison([]);setStatus('已切换服务，未发出任何 AI 请求。');
 }
 useEffect(()=>{setResult('');setComparison([]);request.current?.abort();return ()=>request.current?.abort();},[enabled,provider,model,session?.user.id]);
 async function submit(e:FormEvent){
   e.preventDefault();
   if(!enabled||busy)return;
   if(!session){setStatus('请先登录现有账户后调用 AI。');return;}
   if(!apiKey.trim()||!model.trim()){setStatus('AI 未配置：请在总设置中填写模型和当前会话密钥。');return;}
   const controller=new AbortController();request.current=controller;
   setBusy(true);setResult('');setComparison([]);setStatus('正在调用所选模型…');
   try{
     const response=await fetch(apiBase+'/v1/ai/assist',{
       method:'POST',signal:controller.signal,
       headers:{'Content-Type':'application/json','Authorization':'Bearer '+session.access_token,
        'X-AI-Key':apiKey},
       body:JSON.stringify({provider,endpoint,model,mode,
         context:'Course: '+courseId+'; Language: '+language+'\n'+lessonText.slice(0,8500),
         prompt})
     });
     const data=await response.json() as {answer?:string;error?:string};
     if(!response.ok||!data.answer)throw Error(data.error||'服务未返回回答');
     if(controller.signal.aborted)return;
     setResult(data.answer);
     setStatus('已取得模型回复。请自行核验课程解释、例句和评分建议。');
   }catch(err){setStatus('AI 请求失败：'+(err instanceof Error?err.message:String(err)));}
   finally{setBusy(false);}
 }

 // This is a deliberate user-triggered comparison, never an automatic paid fallback.
 // Both provider keys remain separate; the same lesson excerpt is sent to each provider.
 async function compareProviders(providers:Provider[]){
   if(!enabled||busy)return;
   if(!session){setStatus('请先登录现有账户后使用双模型对照。');return;}
   if(prompt.trim().length<3){setStatus('请先填写至少三个字符的问题或待批改文本。');return;}
   const profiles=providers.map(p=>getForProvider(p));
   const missing=profiles.filter(p=>!p.apiKey.trim()||!p.model.trim());
   if(missing.length){
     setStatus('多模型对照需要分别配置所选服务的 API Key 和模型。请逐一填写，密钥只保留在本页内存中。');
     return;
   }
   const controller=new AbortController();request.current=controller;
   setBusy(true);setResult('');setComparison([]);
   setStatus('正在分别调用 '+providers.join(' / ')+'（共 '+providers.length+' 次 API 请求，可能分别计费）…');
   try{
     const results=await Promise.allSettled(profiles.map(async profile=>{
       const response=await fetch(apiBase+'/v1/ai/assist',{
         method:'POST',signal:controller.signal,
         headers:{'Content-Type':'application/json','Authorization':'Bearer '+session.access_token,
           'X-AI-Key':profile.apiKey},
         body:JSON.stringify({
           provider:profile.provider,model:profile.model,endpoint:profile.endpoint,
           mode,prompt,context:'Course: '+courseId+'; Language: '+language+'\n'+lessonText.slice(0,8500)
         })
       });
       const data=await response.json() as {answer?:string;error?:string};
       if(!response.ok||!data.answer)throw Error(data.error||'服务没有返回回答');
       return data.answer;
     }));
     if(controller.signal.aborted)return;
     const completed=results.flatMap((res,i)=>res.status==='fulfilled'
       ?[{provider:providers[i],answer:res.value}]:[]);
     setComparison(completed);
     setStatus(completed.length===providers.length
       ?'全部模型均已回复。下面是独立意见，未自动合并、未人工审校。'
       :'仅 '+completed.length+'/'+providers.length+' 家模型返回成功；请检查其他模型的 Key、配额或可用性。');
   }catch{
     if(!controller.signal.aborted)setStatus('双模型请求失败，请检查网络和 API 配置。');
   }finally{setBusy(false);}
 }
 return <section className="cloud-reader" aria-label="可选 AI 学习助手">
  <h3>{compact?'选词 AI 助学':'AI 教师 · 自选模型'}</h3>
  <label className="cloud-toggle"><input type="checkbox" checked={enabled}
    onChange={e=>{setEnabled(e.target.checked);setResult('');}}/>
    手动启用 AI（可能消耗你所选服务商的额度）</label>
  <p className="cloud-disclaimer">默认不调用 AI；密钥仅保留在当前页面内存并随请求临时发送至 Worker，不会写入 GitHub、Supabase 或浏览器本地存储。自定义模型使用兼容 OpenAI Chat Completions 的 HTTPS 接口。服务商可能依据自己的政策处理请求内容。</p>
  {enabled&&!apiKey&&<p role="status">AI 未配置：请到总设置输入当前会话密钥。未发送请求。</p>}
  {enabled&&!session&&<p>登录后才可使用现有 AI 接口。</p>}
  {enabled&&<form onSubmit={submit} className="cloud-fields">
    {!compact&&<>
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
    <label>API Key（不保存）<PasswordInput autoComplete="off" required
       value={apiKey} onChange={e=>setApiKey(e.target.value)}
       placeholder="只在本页粘贴，不要发到聊天"/></label>
    </>}
    <label>教学模式<select value={mode} onChange={e=>setMode(e.target.value as Mode)}>
      {MODE_OPTIONS.map(x=><option key={x.value} value={x.value}>{x.label}</option>)}
    </select></label>
    <label>提问或待批改文本
      <textarea required rows={5} minLength={3} maxLength={6000}
        value={prompt} onChange={e=>setPrompt(e.target.value)}
        placeholder="例如：解释这节法语课程的主语代词；或粘贴一篇作文进行反馈"/>
    </label>
    <button disabled={busy||!session||!apiKey||!prompt.trim()} type="submit">
      {busy?'正在生成反馈…':'主动调用一次 AI'}
    </button>
    {!compact&&<button type="button" disabled={busy||!session||!prompt.trim()}
      onClick={()=>void compareProviders(['deepseek','gemini'])}>
      双模型对照（主动调用两次 API）
    </button>}
    {!compact&&<button type="button" disabled={busy||!session||!prompt.trim()}
      onClick={()=>void compareProviders(['deepseek','gemini','openrouter'])}>
      三服务对照（主动调用三次 API）
    </button>}
  </form>}
  <p role="status" className="cloud-disclaimer">{status}</p>
  {comparison.length>0&&<div className="cloud-ai-result" aria-label="双模型独立教学意见">
    <p className="cloud-disclaimer">不同 AI 服务独立返回的建议 · 可能各自计费 · 不代表课程审校通过</p>
    {comparison.map(item=><section key={item.provider} className="cloud-reader">
      <h4>{item.provider==='gemini'?'Google Gemini':item.provider==='openrouter'?'OpenRouter':'DeepSeek'}</h4>
      <div className="lesson-paragraphs" style={{whiteSpace:'pre-wrap'}}>{item.answer}</div>
    </section>)}
  </div>}
  {result&&<div className="cloud-ai-result" aria-label="AI 模型生成的教学反馈">
    <div className="cloud-disclaimer">AI 生成内容 · 非官方考试评分 · 不自动批准课程</div>
    <div className="lesson-paragraphs">{result}</div>
  </div>}
 </section>;
}

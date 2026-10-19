import {useEffect,useRef,useState,type FormEvent} from 'react';
import type {Session} from '@supabase/supabase-js';

import {useAISettings,DEFAULT_MODELS,type Provider} from './AISettings';
import PasswordInput from './PasswordInput';
type Props={session:Session|null;apiBase:string;courseId:string;language:string;lessonText:string;compact?:boolean;initialPrompt?:string};

type Mode='explain'|'essay'|'dialogue'|'audit';
const MODE_OPTIONS=[{value:'explain',label:'课程讲解'},{value:'essay',label:'作文批改'},{value:'dialogue',label:'AI 对话'},{value:'audit',label:'课程逐课审校（草稿建议）'}] as const;
export default function AITutor({session,apiBase,courseId,language,lessonText,compact=false,initialPrompt=''}:Props){
 const {config,update}=useAISettings();
 const {enabled,provider,endpoint,model,apiKey}=config;
 const setEnabled=(enabled:boolean)=>update({enabled});
 const setEndpoint=(endpoint:string)=>update({endpoint});
 const setModel=(model:string)=>update({model});
 const setApiKey=(apiKey:string)=>{update({apiKey});setKeyStatus('');};
 const request=useRef<AbortController|null>(null);
 const [mode,setMode]=useState<Mode>('explain');
 const [prompt,setPrompt]=useState(initialPrompt);
 const [result,setResult]=useState('');
 const [status,setStatus]=useState('AI 默认关闭。只有你主动点击发送才会请求所选服务。');
 const [busy,setBusy]=useState(false);
 const [checkingKey,setCheckingKey]=useState(false);
 const [keyStatus,setKeyStatus]=useState('');
 const errors:Record<string,string>={
  authentication_required:'请先登录本站账户。',
  invalid_session:'登录会话已过期，请重新登录。',
  openrouter_key_required:'请先填写 OpenRouter API Key。',
  openrouter_key_invalid:'OpenRouter 拒绝了此密钥，请检查或重新生成。',
  openrouter_management_key_not_for_inference:'这是管理密钥，不能用于模型推理；请创建普通 API Key。',
  openrouter_rate_limited:'OpenRouter 暂时限流，请稍后再试。',
  openrouter_unreachable:'暂时无法联系 OpenRouter，请检查网络或稍后重试。',
  openrouter_key_check_failed:'OpenRouter 密钥检查暂不可用。',
  openrouter_invalid_response:'OpenRouter 返回了无法识别的结果。'
 };
 async function checkOpenRouterKey(){
  if(provider!=='openrouter'||!session||!apiKey.trim()||checkingKey)return;
  setCheckingKey(true);setKeyStatus('正在验证密钥；不会调用模型或消耗推理 Token…');
  try{
   const response=await fetch(apiBase+'/v1/ai/openrouter-key-check',{
    method:'POST',headers:{Authorization:'Bearer '+session.access_token,'X-AI-Key':apiKey}
   });
   const data=await response.json().catch(()=>({})) as {ok?:boolean;error?:string;is_free_tier?:boolean;limit_remaining?:number|null};
   if(!response.ok||!data.ok)throw Error(errors[data.error||'']||'验证失败（HTTP '+response.status+'）');
   setKeyStatus('OpenRouter API Key 验证成功'+(data.is_free_tier?' · 免费账户':'')+
    (typeof data.limit_remaining==='number'?' · Key 剩余消费上限 
  }catch(error){setKeyStatus('密钥验证未通过：'+(error instanceof Error?error.message:String(error)));}
  finally{setCheckingKey(false);}
 }
 function changeProvider(next:Provider){
   update({provider:next,model:DEFAULT_MODELS[next],apiKey:''});setResult('');setKeyStatus('');setStatus('已切换服务，未发出任何 AI 请求。');
 }
 useEffect(()=>{setResult('');setKeyStatus('');request.current?.abort();return ()=>request.current?.abort();},[enabled,provider,model,session?.user.id]);
 async function submit(e:FormEvent){
   e.preventDefault();
   if(!enabled||busy)return;
   if(!session){setStatus('请先登录现有账户后调用 AI。');return;}
   if(!apiKey.trim()||!model.trim()){setStatus('AI 未配置：请在总设置中填写模型和当前会话密钥。');return;}
   const controller=new AbortController();request.current=controller;
   setBusy(true);setResult('');setStatus('正在调用所选模型…');
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
 return <section className="cloud-reader" aria-label="可选 AI 学习助手">
  <h3>{compact?'选词 AI 助学':'AI 教师 · 自选模型'}</h3>
  <label className="cloud-toggle"><input type="checkbox" checked={enabled}
    onChange={e=>{setEnabled(e.target.checked);setResult('');}}/>
    手动启用 AI（可能消耗你所选服务商的额度）</label>
  <p className="cloud-disclaimer">默认不调用 AI；密钥仅保留在当前页面内存并随请求临时发送至 Worker，不会写入 GitHub、Supabase 或浏览器本地存储。自定义模型使用兼容 OpenAI Chat Completions 的 HTTPS 接口。服务商可能依据自己的政策处理请求内容。</p>
  {enabled&&!apiKey&&<p role="status">AI 未配置：请到总设置输入当前会话密钥。未发送请求。</p>}
  {!session&&<p>请先登录本站账户，才能验证 Key 或调用 AI。</p>}
  {(enabled||!compact)&&<form onSubmit={submit} className="cloud-fields">
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
    {provider==='openrouter'&&<div className="cloud-panel" aria-label="OpenRouter 连接设置">
      <p><a href="https://openrouter.ai/settings/keys" target="_blank" rel="noopener noreferrer">在 OpenRouter 账户中创建普通 API Key ↗</a></p>
      <p>默认模型 <code>openrouter/free</code> 使用免费路由；如更换付费模型，费用按你账户和实际模型计费。</p>
      <p>即使 AI 关闭也能验证密钥（不发起模型生成）。请粘贴新建时复制的完整 API Key；后台显示的名称和括号中的缩写不是密钥。Key 的 $0 限额不是账户余额，不能用于收费模型请求。</p>
      <button type="button" disabled={!session||!apiKey.trim()||checkingKey}
        onClick={()=>void checkOpenRouterKey()}>{checkingKey?'正在检查…':'验证 OpenRouter API Key（不调用模型）'}</button>
      <p role="status" className="cloud-disclaimer">{keyStatus}</p>
    </div>}
    </>}
    <label>教学模式<select value={mode} onChange={e=>setMode(e.target.value as Mode)}>
      {MODE_OPTIONS.map(x=><option key={x.value} value={x.value}>{x.label}</option>)}
    </select></label>
    <label>提问或待批改文本
      <textarea required rows={5} minLength={3} maxLength={6000}
        value={prompt} onChange={e=>setPrompt(e.target.value)}
        placeholder="例如：解释这节法语课程的主语代词；或粘贴一篇作文进行反馈"/>
    </label>
    <button disabled={!enabled||busy||!session||!apiKey||!prompt.trim()} type="submit">
      {busy?'正在生成反馈…':enabled?'主动调用一次 AI':'AI 关闭 · 如需生成请先启用'}
    </button>
  </form>}
  <p role="status" className="cloud-disclaimer">{status}</p>
  {result&&<div className="cloud-ai-result" aria-label="AI 模型生成的教学反馈">
    <div className="cloud-disclaimer">AI 生成内容 · 非官方考试评分 · 不自动批准课程</div>
    <div className="lesson-paragraphs">{result}</div>
  </div>}
 </section>;
}
+data.limit_remaining.toFixed(2):'')+
    '。Key 限额不是赠送余额；本次没有模型推理请求。');
  }catch(error){setKeyStatus('密钥验证未通过：'+(error instanceof Error?error.message:String(error)));}
  finally{setCheckingKey(false);}
 }
 function changeProvider(next:Provider){
   update({provider:next,model:DEFAULT_MODELS[next],apiKey:''});setResult('');setKeyStatus('');setStatus('已切换服务，未发出任何 AI 请求。');
 }
 useEffect(()=>{setResult('');setKeyStatus('');request.current?.abort();return ()=>request.current?.abort();},[enabled,provider,model,session?.user.id]);
 async function submit(e:FormEvent){
   e.preventDefault();
   if(!enabled||busy)return;
   if(!session){setStatus('请先登录现有账户后调用 AI。');return;}
   if(!apiKey.trim()||!model.trim()){setStatus('AI 未配置：请在总设置中填写模型和当前会话密钥。');return;}
   const controller=new AbortController();request.current=controller;
   setBusy(true);setResult('');setStatus('正在调用所选模型…');
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
 return <section className="cloud-reader" aria-label="可选 AI 学习助手">
  <h3>{compact?'选词 AI 助学':'AI 教师 · 自选模型'}</h3>
  <label className="cloud-toggle"><input type="checkbox" checked={enabled}
    onChange={e=>{setEnabled(e.target.checked);setResult('');}}/>
    手动启用 AI（可能消耗你所选服务商的额度）</label>
  <p className="cloud-disclaimer">默认不调用 AI；密钥仅保留在当前页面内存并随请求临时发送至 Worker，不会写入 GitHub、Supabase 或浏览器本地存储。自定义模型使用兼容 OpenAI Chat Completions 的 HTTPS 接口。服务商可能依据自己的政策处理请求内容。</p>
  {enabled&&!apiKey&&<p role="status">AI 未配置：请到总设置输入当前会话密钥。未发送请求。</p>}
  {!session&&<p>请先登录本站账户，才能验证 Key 或调用 AI。</p>}
  {(enabled||!compact)&&<form onSubmit={submit} className="cloud-fields">
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
    {provider==='openrouter'&&<div className="cloud-panel" aria-label="OpenRouter 连接设置">
      <p><a href="https://openrouter.ai/settings/keys" target="_blank" rel="noopener noreferrer">在 OpenRouter 账户中创建普通 API Key ↗</a></p>
      <p>默认模型 <code>openrouter/free</code> 使用免费路由；如更换付费模型，费用按你账户和实际模型计费。</p>
      <p>即使 AI 关闭也能验证密钥（不发起模型生成）。请粘贴新建时复制的完整 API Key；后台显示的名称和括号中的缩写不是密钥。Key 的 $0 限额不是账户余额，不能用于收费模型请求。</p>
      <button type="button" disabled={!session||!apiKey.trim()||checkingKey}
        onClick={()=>void checkOpenRouterKey()}>{checkingKey?'正在检查…':'验证 OpenRouter API Key（不调用模型）'}</button>
      <p role="status" className="cloud-disclaimer">{keyStatus}</p>
    </div>}
    </>}
    <label>教学模式<select value={mode} onChange={e=>setMode(e.target.value as Mode)}>
      {MODE_OPTIONS.map(x=><option key={x.value} value={x.value}>{x.label}</option>)}
    </select></label>
    <label>提问或待批改文本
      <textarea required rows={5} minLength={3} maxLength={6000}
        value={prompt} onChange={e=>setPrompt(e.target.value)}
        placeholder="例如：解释这节法语课程的主语代词；或粘贴一篇作文进行反馈"/>
    </label>
    <button disabled={!enabled||busy||!session||!apiKey||!prompt.trim()} type="submit">
      {busy?'正在生成反馈…':enabled?'主动调用一次 AI':'AI 关闭 · 如需生成请先启用'}
    </button>
  </form>}
  <p role="status" className="cloud-disclaimer">{status}</p>
  {result&&<div className="cloud-ai-result" aria-label="AI 模型生成的教学反馈">
    <div className="cloud-disclaimer">AI 生成内容 · 非官方考试评分 · 不自动批准课程</div>
    <div className="lesson-paragraphs">{result}</div>
  </div>}
 </section>;
}

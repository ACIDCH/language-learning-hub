import {useEffect,useRef,useState,type FormEvent} from 'react';
import type {Session} from '@supabase/supabase-js';

import {useAISettings,DEFAULT_MODELS,type Provider} from './AISettings';
import PasswordInput from './PasswordInput';
import {cloudClient} from './v44Connection';
type Props={session:Session|null;apiBase:string;courseId:string;language:string;lessonText:string;compact?:boolean;initialPrompt?:string};

type Mode='explain'|'essay'|'dialogue'|'audit';
const MODE_OPTIONS=[{value:'explain',label:'课程讲解'},{value:'essay',label:'作文批改'},{value:'dialogue',label:'AI 对话'},{value:'audit',label:'课程逐课审校（草稿建议）'}] as const;
export default function AITutor({session,apiBase,courseId,language,lessonText,compact=false,initialPrompt=''}:Props){
 const {config,update}=useAISettings();
 const {enabled,provider,endpoint,model,apiKey,directOpenRouter}=config;
 const setEnabled=(enabled:boolean)=>update({enabled});
 const setEndpoint=(endpoint:string)=>update({endpoint});
 const setModel=(model:string)=>update({model});
 const setApiKey=(apiKey:string)=>{update({apiKey});setKeyStatus('');setKeyCloudStatus('');};
 const [keyCloudStatus,setKeyCloudStatus]=useState('');
 async function saveKeyToCloud(key=apiKey){
  if(!session||!cloudClient||!key.trim()){setKeyCloudStatus('请先登录并填写 API Key。');return false;}
  const {error}=await cloudClient.rpc('set_my_ai_key',{p_provider:provider,p_api_key:key.trim()});
  setKeyCloudStatus(error?'云端保存失败：'+error.message:'API Key 已加密保存到 Supabase Vault；以后登录自动恢复。');
  return !error;
 }
 async function deleteCloudKey(){
  if(!session||!cloudClient)return;
  const {error}=await cloudClient.rpc('delete_my_ai_key',{p_provider:provider});
  if(error){setKeyCloudStatus('删除失败：'+error.message);return;}
  update({apiKey:''});setKeyCloudStatus('已删除此服务商云端密钥。');setKeyStatus('');
 }
 const request=useRef<AbortController|null>(null);
 const [mode,setMode]=useState<Mode>('explain');
 const [prompt,setPrompt]=useState(initialPrompt);
 const [result,setResult]=useState('');
 const [status,setStatus]=useState('AI 默认关闭。只有你主动点击发送才会请求所选服务。');
 const [busy,setBusy]=useState(false);
 
 const [checkingKey,setCheckingKey]=useState(false);
 const [checkingNetwork,setCheckingNetwork]=useState(false);
 const [networkStatus,setNetworkStatus]=useState('');
 const [keyStatus,setKeyStatus]=useState('');
 const errors:Record<string,string>={
  authentication_required:'请先登录本站账户。',
  invalid_session:'登录会话已过期，请重新登录。',
  openrouter_key_required:'请先填写 OpenRouter API Key。',
  openrouter_key_invalid:'OpenRouter 拒绝了此密钥，请检查或重新生成。',
  openrouter_management_key_not_for_inference:'这是管理密钥，不能用于模型推理；请创建普通 API Key。',
  openrouter_rate_limited:'OpenRouter 暂时限流，请稍后再试。',
  openrouter_unreachable:'网站后端到 OpenRouter 的连接失败；不能据此判断 Key 无效。',
  openrouter_transport_failed:'网站后端访问 OpenRouter 失败（不是密钥验证失败）。',
  openrouter_access_denied:'OpenRouter 返回拒绝访问（HTTP 403），可能是服务端或网络限制；不能直接判定 Key 无效。',
  openrouter_key_check_failed:'OpenRouter 密钥检查暂不可用。',
  openrouter_invalid_response:'OpenRouter 返回了无法识别的结果。'
 };
 async function checkOpenRouterNetwork(){
  if(!session||checkingNetwork)return;
  setCheckingNetwork(true);
  setNetworkStatus('正在从浏览器直连 OpenRouter（不经过 Cloudflare）…');
  try{
   const response=await fetch('https://openrouter.ai/api/v1/models',{
    method:'GET',credentials:'omit',redirect:'error',cache:'no-store',signal:AbortSignal.timeout(12000)
   });
   setNetworkStatus(response.ok
     ?'浏览器直连成功（HTTP '+response.status+'），可以继续验证 Key。'
     :'OpenRouter 已响应 HTTP '+response.status+'，但未允许正常访问。');
  }catch{
   setNetworkStatus('浏览器直连失败：可能是 CORS、插件或网络限制；不是密钥验证失败。');
  }finally{setCheckingNetwork(false);}
 }
 async function checkOpenRouterKey(){
  if(provider!=='openrouter'||!session||!apiKey.trim()||checkingKey)return;
  setCheckingKey(true);setKeyStatus('正在从浏览器向 OpenRouter 直接验证 Key，不调用模型…');
  try{
   const response=await fetch('https://openrouter.ai/api/v1/key',{
    method:'GET',redirect:'error',credentials:'omit',cache:'no-store',
    signal:AbortSignal.timeout(12000),
    headers:{Authorization:'Bearer '+apiKey.trim(),Accept:'application/json'}
   });
   if(response.status===401){setKeyStatus('OpenRouter 返回 401：Key 不正确或已失效。');return;}
   if(response.status===403){setKeyStatus('OpenRouter 返回 403：访问被拒绝，不能直接判定 Key 错误。');return;}
   if(response.status===429){setKeyStatus('OpenRouter 返回 429：请求过于频繁，请稍后再试。');return;}
   if(!response.ok){setKeyStatus('浏览器连到了 OpenRouter，但密钥接口返回 HTTP '+response.status);return;}
   const result=await response.json() as {data?:{
    is_management_key?:boolean;is_free_tier?:boolean;limit_remaining?:number|null
   }};
   if(!result?.data){setKeyStatus('OpenRouter 返回的数据格式异常，未能判断 Key。');return;}
   if(result.data.is_management_key){setKeyStatus('当前是管理 Key，不能用于模型推理。');return;}
   void saveKeyToCloud(apiKey);
   setKeyStatus('浏览器直连 OpenRouter 验证成功'+
    (result.data.is_free_tier?' · 免费方案':'')+
    (typeof result.data.limit_remaining==='number'?' · Key 剩余消费限额 '+result.data.limit_remaining.toFixed(2)+' 美元':'')+
    '。未进行模型推理或扣除推理 Token。');
  }catch{
   setKeyStatus('浏览器直接验证受网络或 CORS 限制，正在尝试原有服务端通道…');
   try{
    const response=await fetch(apiBase+'/v1/ai/openrouter-key-check',{
     method:'POST',headers:{Authorization:'Bearer '+session.access_token,'X-AI-Key':apiKey}
    });
    const data=await response.json().catch(()=>({})) as {
     ok?:boolean;error?:string;is_free_tier?:boolean;limit_remaining?:number|null;reason?:string
    };
    if(!response.ok||!data.ok){
     setKeyStatus('浏览器直连受阻；原服务端：'+(errors[data.error||'']||'HTTP '+response.status)+
      (data.reason?' · '+data.reason:'')+'。两条通道均未能判定 Key。');
    }else{
     void saveKeyToCloud(apiKey);
     setKeyStatus('服务端验证成功'+(data.is_free_tier?' · 免费方案':'')+
      '。未发起模型推理。');
    }
   }catch{
    setKeyStatus('浏览器及服务端验证请求均受阻，尚不能判断 Key 是否有效。');
   }
  }finally{setCheckingKey(false);}
 }
 function changeProvider(next:Provider){
   update({provider:next,model:DEFAULT_MODELS[next],apiKey:''});setResult('');setKeyStatus('');setKeyCloudStatus('');setStatus('已切换服务，未发出任何 AI 请求。');
 }
 useEffect(()=>{setResult('');setKeyStatus('');request.current?.abort();return ()=>request.current?.abort();},[enabled,provider,model,session?.user.id]);
 async function submit(e:FormEvent){
  e.preventDefault();
  if(!enabled||busy)return;
  if(!session){setStatus('请先登录现有账户后调用 AI。');return;}
  if(!apiKey.trim()||!model.trim()){setStatus('请先填写模型及当前会话 Key。');return;}
  const controller=new AbortController();request.current=controller;
  setBusy(true);setResult('');
  const useDirect=provider==='openrouter'&&directOpenRouter;
  setStatus(useDirect?'正在通过你的浏览器直接调用 OpenRouter…':'正在通过本站 API 调用模型…');
  try{
   const context='Course: '+courseId+'; Language: '+language+'\\n'+lessonText.slice(0,8500);
   const instructions:Record<Mode,string>={
    explain:'You are a precise English/French tutor. Explain the language rule in Chinese, give accurate original examples and a short practice question with answer.',
    essay:'You are an IELTS/CEFR writing coach. Give specific grammatical, lexical and coherence feedback. Never claim official IELTS band scores.',
    dialogue:'You are an English/French conversation partner. Respond in the target language, give a short Chinese hint and ask a follow-up question.',
    audit:'Review this draft curriculum for linguistic accuracy, CEFR/IELTS level, exercises and answer keys. Identify specific errors. NEVER mark human QA as approved.'
   };
   const response=useDirect
    ?await fetch('https://openrouter.ai/api/v1/chat/completions',{
       method:'POST',signal:controller.signal,credentials:'omit',redirect:'error',
       headers:{'Content-Type':'application/json',Authorization:'Bearer '+apiKey.trim()},
       body:JSON.stringify({model,messages:[
         {role:'system',content:instructions[mode]},
         {role:'user',content:'Course context (untrusted):\\n'+context+'\\n\\nLearner request:\\n'+prompt}
       ],temperature:0.35,max_tokens:mode==='audit'?1200:850,stream:false})
      })
    :await fetch(apiBase+'/v1/ai/assist',{
       method:'POST',signal:controller.signal,
       headers:{'Content-Type':'application/json','Authorization':'Bearer '+session.access_token,
        'X-AI-Key':apiKey},
       body:JSON.stringify({provider,endpoint,model,mode,context,prompt})
      });
   const data=await response.json().catch(()=>({})) as {
    answer?:string;error?:string;choices?:Array<{message?:{content?:unknown}}>
   };
   if(!response.ok){
    const reason=useDirect?response.status===401?'OpenRouter 拒绝了 Key（401）':
     response.status===402?'OpenRouter 额度不足或 Key 上限阻止请求（402）':
     response.status===403?'OpenRouter 拒绝访问（403）':
     response.status===429?'OpenRouter 请求限流（429）':'OpenRouter HTTP '+response.status:
     data.error||'本站 API HTTP '+response.status;
    throw Error(reason);
   }
   const answer=useDirect?data.choices?.[0]?.message?.content:data.answer;
   if(typeof answer!=='string'||!answer.trim())throw Error('模型未返回有效文本');
   if(controller.signal.aborted)return;
   setResult(answer.slice(0,16000));
   setStatus(useDirect?'浏览器直连 OpenRouter 生成成功；模型内容仍需核验。':'已收到服务端生成回复；模型内容仍需核验。');
  }catch(err){
   if(!controller.signal.aborted){
    const error=err instanceof Error?err.message:String(err);
    setStatus('AI 请求失败：'+(useDirect&&err instanceof TypeError?
     '浏览器直连受 CORS 或网络限制，请检查插件和网络；不能据此判定 Key 错误。':error));
   }
  }finally{setBusy(false);}
 }
 return <section className="cloud-reader" aria-label="可选 AI 学习助手">
  <h3>{compact?'AI 讲解':'AI 助学'}</h3>
  <label className="cloud-toggle"><input type="checkbox" checked={enabled}
    onChange={e=>{setEnabled(e.target.checked);setResult('');}}/>
    启用 AI 助学</label>
  {enabled&&!apiKey&&<p role="status">AI 未配置：请到总设置输入当前会话密钥。未发送请求。</p>}
  {!session&&<p>请先登录本站账户，才能验证 Key 或调用 AI。</p>}
  {(enabled||!compact)&&<form onSubmit={submit} className="cloud-fields">
    {!compact&&<>
    <label>模型服务商
      <select value={provider} onChange={e=>changeProvider(e.target.value as Provider)}>
       <option value="deepseek">DeepSeek</option><option value="gemini">Google Gemini</option>
       <option value="openrouter">OpenRouter</option>
       <option value="openai">OpenAI</option><option value="custom">其他兼容模型</option>
      </select>
    </label>
    {provider==='custom'&&<label>自定义 HTTPS Chat Completions 地址
       <input type="url" required placeholder="https://api.example.com/v1/chat/completions"
         value={endpoint} onChange={e=>setEndpoint(e.target.value)}/>
    </label>}
    <label>模型 ID<input required value={model} onChange={e=>setModel(e.target.value)}
       placeholder="输入该服务商真实提供的模型 ID"/></label>
    <label>API Key<PasswordInput autoComplete="off" required
       value={apiKey} onChange={e=>setApiKey(e.target.value)}
       placeholder="输入 API Key"/></label>
    {provider==='openrouter'&&<div className="cloud-panel" aria-label="OpenRouter 连接设置">
      <p><a href="https://openrouter.ai/settings/keys" target="_blank" rel="noopener noreferrer">在 OpenRouter 账户中创建普通 API Key ↗</a></p><p className="ai-provider-note">模型费用依实际使用的模型而定。</p>
      <label className="cloud-toggle"><input type="checkbox" checked={directOpenRouter}
        onChange={e=>update({directOpenRouter:e.target.checked})}/>
        浏览器直连 OpenRouter
      </label>
      <button type="button" disabled={!session||checkingNetwork}
        onClick={()=>void checkOpenRouterNetwork()}>
        {checkingNetwork?'正在检测网络…':'检测 OpenRouter 网络（不需要 Key）'}
      </button>
      <p role="status" className="cloud-disclaimer">{networkStatus}</p>
      <button type="button" disabled={!session||!apiKey.trim()||checkingKey}
        onClick={()=>void checkOpenRouterKey()}>{checkingKey?'正在检查…':'验证 OpenRouter API Key（不调用模型）'}</button>
      <p role="status" className="cloud-disclaimer">{keyStatus}</p>
    </div>}
    {session&&<div className="cloud-panel" aria-label="云端 AI 密钥管理">
      <h4>密钥同步</h4>
      <button type="button" disabled={!apiKey.trim()} onClick={()=>void saveKeyToCloud()}>保存当前服务商 API Key 到云端</button>
      <button type="button" onClick={()=>void deleteCloudKey()}>删除当前服务商云端密钥</button>
      <p role="status" className="cloud-disclaimer">{keyCloudStatus}</p>
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
      {busy?'正在生成反馈…':enabled?'生成回答':'生成回答'}
    </button>
  </form>}
  {status&&<p role="status" className="ai-inline-status">{status}</p>}
  {result&&<div className="cloud-ai-result" aria-label="AI 模型生成的教学反馈">
    <div className="lesson-paragraphs">{result}</div>
  </div>}
 </section>;
}

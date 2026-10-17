/** Standalone Cloudflare Workers AI speech route adapter.
 * Wire into the existing Worker router as POST /speech/transcribe.
 * Requires AI binding and Supabase Auth configuration.
 */
export interface SpeechEnvironment {
 AI:{run:(model:string,input:unknown)=>Promise<unknown>};
 SUPABASE_URL:string;
 SUPABASE_PUBLISHABLE_KEY:string;
 SPEECH_ALLOWED_ORIGIN:string;
}
export async function handleSpeechTranscribe(request:Request,env:SpeechEnvironment):Promise<Response>{
 const origin=request.headers.get('Origin');
 const headers:Record<string,string>={'Cache-Control':'no-store','Vary':'Origin'};
 if(origin===env.SPEECH_ALLOWED_ORIGIN)headers['Access-Control-Allow-Origin']=origin;
 const json=(body:unknown,status=200)=>new Response(JSON.stringify(body),{
  status,headers:{...headers,'Content-Type':'application/json'}});
 if(request.method==='OPTIONS')return new Response(null,{status:204,headers:{
  ...headers,'Access-Control-Allow-Methods':'POST, OPTIONS',
  'Access-Control-Allow-Headers':'Authorization, Content-Type'}});
 if(request.method!=='POST')return json({detail:'Method not allowed'},405);
 if(origin!==env.SPEECH_ALLOWED_ORIGIN)return json({detail:'Origin not allowed'},403);
 const token=request.headers.get('Authorization')||'';
 if(!token.startsWith('Bearer '))return json({detail:'Sign in first'},401);
 const who=await fetch(env.SUPABASE_URL.replace(/\\/$/,'')+'/auth/v1/user',{
  headers:{apikey:env.SUPABASE_PUBLISHABLE_KEY,Authorization:token}});
 if(!who.ok)return json({detail:'Invalid session'},401);
 const user=await who.json() as {id?:string};
 if(!user.id)return json({detail:'Invalid session'},401);
 const contentType=request.headers.get('Content-Type')||'';
 if(!contentType.startsWith('audio/'))return json({detail:'Audio content type required'},415);
 const raw=await request.arrayBuffer();
 if(raw.byteLength<8000||raw.byteLength>800000)return json({detail:'Audio length not supported'},413);
 try{
  const result=await env.AI.run('@cf/openai/whisper-large-v3-turbo',{audio:[...new Uint8Array(raw)]}) as {text?:string};
  if(typeof result.text!=='string'||!result.text.trim())return json({detail:'No transcript'},422);
  return json({transcript:result.text.trim(),canScore:false,mode:'transcript-only'});
 }catch{return json({detail:'Cloud transcription unavailable'},503);}
}

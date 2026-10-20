import {spawn} from 'node:child_process';
import {existsSync,mkdirSync,writeFileSync} from 'node:fs';
import {setTimeout as delay} from 'node:timers/promises';

const local='http://127.0.0.1:4173', port=9228;
const output='artifacts/visual-smoke';
mkdirSync(output,{recursive:true});
const binary=[process.env.CHROME_BIN,'/usr/bin/google-chrome','/usr/bin/google-chrome-stable','/usr/bin/chromium'].find(p=>p&&existsSync(p));
if(!binary)throw Error('Chrome unavailable on CI runner');
const chrome=spawn(binary,['--headless=new','--no-sandbox','--disable-gpu','--disable-dev-shm-usage',
 '--remote-allow-origins=*','--remote-debugging-port='+port,
 '--user-data-dir=/tmp/llh-visual-'+process.pid,'about:blank'],{stdio:'ignore'});
process.on('exit',()=>chrome.kill());
const wait=async(fn,description,timeout=25000)=>{
 const started=Date.now();
 while(Date.now()-started<timeout){
  try{const result=await fn();if(result)return result;}catch{}
  await delay(180);
 }
 throw Error('Timed out waiting for '+description);
};
const host='http://127.0.0.1:'+port;
const get=async(url)=>{const response=await fetch(url);if(!response.ok)throw Error('HTTP '+response.status);return response.json();};
let ws;let nextId=0;
const pending=new Map();const problems=[];let checked=0;
try{
 await wait(async()=>{try{return (await fetch(local)).ok;}catch{return false;}},'Vite preview');
 await wait(async()=>{try{return !!(await get(host+'/json/version')).Browser;}catch{return false;}},'Chrome CDP');
 const targets=await get(host+'/json/list');
 const page=targets.find(x=>x.type==='page');
 if(!page)throw Error('Missing Chrome page');
 ws=new WebSocket(page.webSocketDebuggerUrl);
 await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',reject,{once:true});});
 ws.addEventListener('message',e=>{
  const m=JSON.parse(e.data);if(!m.id||!pending.has(m.id))return;
  const item=pending.get(m.id);pending.delete(m.id);
  if(m.error)item.reject(Error(m.error.message));else item.resolve(m.result);
 });
 function call(method,params={}){
  return new Promise((resolve,reject)=>{
   const id=++nextId;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));
  });
 }
 async function js(expression){
  const response=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});
  if(response.exceptionDetails)throw Error(response.exceptionDetails.text);
  return response.result.value;
 }
 async function go(path,selector){
  await call('Page.navigate',{url:local+path});
  await wait(async()=>{
   const value=await js('({path:location.pathname+location.search,exists:!!document.querySelector('+JSON.stringify(selector)+')})');
   return value.path===path&&value.exists;
  },path+' '+selector);
  await delay(260);
 }
 await call('Page.enable');await call('Runtime.enable');
 const routes=[
  ['catalog','/','.catalog-toolbar'],
  ['lesson','/?course=fr-a1-u01&tab=read','.reader-layout'],
  ['speech','/speech-lab','.speaking-lab-columns'],
  ['ipa','/?page=ipa','.ipa-studio'],
  ['settings','/?page=settings&section=appearance','.settings-content'],
  ['account','/?page=settings&section=account','.settings-content'],
  ['cloud','/cloud?panel=resources','.cloud-workspace']
 ];
 const sizes=[['desktop',1440,900],['tablet',1024,768],['mobile',390,844]];
 for(const [size,width,height] of sizes){
  await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});
  await go('/','.catalog-toolbar');
  await js("localStorage.setItem('llh-v44-appearance-v1',JSON.stringify({layout:'standard',theme:'academic',fontSize:17,readerWidth:780,sidebar:true,serif:false,ttsRate:.85,ipa:false,language:'fr',speechApiUrl:''}))");
  for(const [name,path,selector] of routes){
   await go(path,selector);
   const value=await js('(function(){const e=document.querySelector('+JSON.stringify(selector)+
    ');return {overflow:Math.max(document.documentElement.scrollWidth,document.body.scrollWidth)-innerWidth,width:e.getBoundingClientRect().width};})()');
   if(value.overflow>5)problems.push(size+' '+name+' overflow='+value.overflow);
   if(value.width<175||value.width>width+5)problems.push(size+' '+name+' width='+value.width);
   const image=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
   writeFileSync(output+'/'+size+'-'+name+'.png',Buffer.from(image.data,'base64'));
   checked++;
   if(name==='lesson'){
    // Regression: a long IPA reference used to stretch the entire top toolbar,
    // leaving an enormous pale rectangle while the actual lesson disappeared below.
    await wait(()=>js("!!document.querySelector('.lesson-reader .lesson-paper .lesson-paragraphs')"),'lesson source body');
    const initial=await js("(function(){const bar=document.querySelector('.ipa-reader-controls').getBoundingClientRect();const lesson=document.querySelector('.lesson-paper').getBoundingClientRect();const text=document.querySelector('.lesson-paper .lesson-paragraphs').textContent;return {barHeight:bar.height,gap:lesson.top-bar.bottom,chars:text.trim().length};})()");
    if(initial.barHeight>90||initial.gap>260||initial.chars<20)problems.push(size+' lesson initial body hidden '+JSON.stringify(initial));
    const toggle=await js("(function(){const item=document.querySelector('.ipa-reader-controls .ipa-reference>summary');if(!item)return false;item.click();return true;})()");
    if(!toggle)problems.push(size+' missing IPA reference menu');
    else{
     const expanded=await js("(function(){const bar=document.querySelector('.ipa-reader-controls').getBoundingClientRect();const lesson=document.querySelector('.lesson-paper').getBoundingClientRect();const ref=document.querySelector('.ipa-reference').getBoundingClientRect();const style=getComputedStyle(document.querySelector('.ipa-reference'));return {barHeight:bar.height,gap:lesson.top-bar.bottom,refWidth:ref.width,referenceOpen:document.querySelector('.ipa-reference').open,position:style.position};})()");
     if(!expanded.referenceOpen||expanded.barHeight>90||expanded.gap>260||expanded.refWidth>width-12||expanded.position!=='absolute')
      problems.push(size+' IPA opens into lesson flow '+JSON.stringify(expanded));
     const ipaShot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
     writeFileSync(output+'/'+size+'-lesson-ipa-open.png',Buffer.from(ipaShot.data,'base64'));
     await js("document.querySelector('.ipa-reference>summary').click()");
    }
    await js("document.querySelector('.reader-head-actions button[aria-pressed]').click()");
    await wait(()=>js("!!document.querySelector('.reader-layout:not(.tools-hidden) .reader-tools')"),'right study tool');
    const layout=await js("(function(){const t=document.querySelector('.reader-tools').getBoundingClientRect();const a=document.querySelector('.reader-article').getBoundingClientRect();return {width:t.width,separate:Math.abs(t.left-a.left)>60};})()");
    if(width===1440&&(layout.width<300||layout.width>425||!layout.separate))problems.push('desktop sidebar geometry '+JSON.stringify(layout));
    if(width===390&&layout.separate)problems.push('mobile sidebar has not stacked');
    // Activate the real text-selection inspector rather than testing only its empty placeholder.
    const selectionMade=await js("(function(){const scope=document.querySelector('.reader-selection-scope .lesson-paper .lesson-paragraphs');if(!scope)return false;const walker=document.createTreeWalker(scope,NodeFilter.SHOW_TEXT);let n;while((n=walker.nextNode())){if(!n.textContent||n.textContent.trim().length<5)continue;const start=n.textContent.search(/[^\\s]/);const range=document.createRange();range.setStart(n,start);range.setEnd(n,Math.min(start+12,n.textContent.length));window.getSelection().removeAllRanges();window.getSelection().addRange(range);document.dispatchEvent(new Event('selectionchange'));return true;}return false;})()");
    if(!selectionMade)problems.push(size+' lesson cannot select any real paragraph');
    else{
     await wait(()=>js("!!document.querySelector('.reader-tools.selection-workbench .speaking-workbench')"),'selected-text pronunciation pane');
     const selected=await js("(function(){const el=document.querySelector('.reader-tools.selection-workbench');const r=el.getBoundingClientRect();return {width:r.width,position:getComputedStyle(el).position,overflow:document.documentElement.scrollWidth-innerWidth};})()");
     if(selected.overflow>5)problems.push(size+' selected-text overflow='+selected.overflow);
     if(width===1440&&selected.position!=='sticky')problems.push('desktop selected-text pane not sticky: '+selected.position);
     if(width===390&&selected.position!=='static')problems.push('mobile selected-text pane not stacked: '+selected.position);
     const shot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
     writeFileSync(output+'/'+size+'-selected-text.png',Buffer.from(shot.data,'base64'));
    }
    if(width===1440){
     await js("localStorage.setItem('llh-v44-appearance-v1',JSON.stringify({...JSON.parse(localStorage.getItem('llh-v44-appearance-v1')),layout:'immersive'}));location.reload()");
     await wait(()=>js("document.body.dataset.viewMode==='immersive'&&!!document.querySelector('.reader-layout')"),'immersive page');
     await js("document.querySelector('[aria-label=\"切换导航栏\"]').click()");
     await wait(()=>js("!!document.querySelector('.v44.nav-drawer-open .rail')"),'navigation drawer');
     const visible=await js("getComputedStyle(document.querySelector('.v44.nav-drawer-open .rail')).display!=='none'");
     if(!visible)problems.push('immersive navigation is hidden');
     const snap=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
     writeFileSync(output+'/desktop-immersive-nav.png',Buffer.from(snap.data,'base64'));
    }
   }
  }
 }
 // Readability contract: resizing the manuscript width control must visibly resize
 // the manuscript in immersive mode. Never test the preference value alone.
 await call('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
 const measured=[];
 for(const readingWidth of [560,1100]){
  await go('/','.catalog-toolbar');
  await js("localStorage.setItem('llh-v44-appearance-v1',JSON.stringify({...JSON.parse(localStorage.getItem('llh-v44-appearance-v1')),layout:'immersive',readerWidth:"+readingWidth+"}))");
  await go('/?course=fr-a1-u01&tab=read','.reader-layout');
  const geom=await js("(function(){const r=document.querySelector('.reader-selection-scope').getBoundingClientRect(),layout=document.querySelector('.reader-layout').getBoundingClientRect(),article=document.querySelector('.reader-article').getBoundingClientRect();return {textWidth:r.width,layoutWidth:layout.width,articleWidth:article.width,bodyOverflow:Math.max(document.documentElement.scrollWidth,document.body.scrollWidth)-innerWidth};})()");
  measured.push(geom);
  if(geom.bodyOverflow>5)problems.push('immersive width '+readingWidth+' overflow '+geom.bodyOverflow);
  if(geom.layoutWidth<1180)problems.push('immersive still max-width capped '+JSON.stringify(geom));
 }
 if(measured[1].textWidth-measured[0].textWidth<320)problems.push('reader width preference did not resize actual lesson: '+JSON.stringify(measured));
 console.log('Immersive adjustable reading width geometry:',JSON.stringify(measured));
 // Verify the two other supported themes on the real reading page.
 await call('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
 for(const theme of ['eye','night']){
  await go('/','.catalog-toolbar');
  await js("localStorage.setItem('llh-v44-appearance-v1',JSON.stringify({...JSON.parse(localStorage.getItem('llh-v44-appearance-v1')),theme:"+JSON.stringify(theme)+"}))");
  await go('/?course=fr-a1-u01&tab=read','.reader-layout');
  const contrast=await js("(function(){const styles=getComputedStyle(document.body);return {theme:document.body.dataset.theme,bg:styles.getPropertyValue('--bg'),text:styles.getPropertyValue('--text')};})()");
  if(contrast.theme!==theme||!contrast.bg||!contrast.text)problems.push('theme '+theme+' inactive');
  const shot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
  writeFileSync(output+'/desktop-'+theme+'-lesson.png',Buffer.from(shot.data,'base64'));
 }
 writeFileSync(output+'/results.json',JSON.stringify({checked,problems},null,2));
 console.log('Checked '+checked+' route/viewport combinations; issues: '+problems.length);
 for(const issue of problems)console.error(issue);
 if(problems.length)process.exitCode=1;
}catch(e){console.error(e);process.exitCode=1;
}finally{try{ws?.close();}catch{}chrome.kill('SIGTERM');}

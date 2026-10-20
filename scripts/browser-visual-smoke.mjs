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
  ['guidedEnglish','/?course=en-ielts-listening-u01&tab=read','.curriculum-stage'],
  ['guidedFrench','/?course=fr-a1-u04&tab=read','.curriculum-stage'],
  ['courseIpa','/?course=en-ielts-listening-u01&tab=ipa','.ipa-study-pane'],
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
   if(name==='guidedEnglish'||name==='guidedFrench'){
    const semantic=await js("(function(){const nav=document.querySelector('.curriculum-tabs'),stage=document.querySelector('.curriculum-stage');const tabs=[...nav.querySelectorAll('button')];return {tabs:tabs.length,top:stage.getBoundingClientRect().top-nav.getBoundingClientRect().bottom,height:stage.getBoundingClientRect().height,text:stage.innerText.slice(0,300)};})()");
    if(semantic.tabs!==5||semantic.top>80||semantic.height<100||!semantic.text.trim())problems.push(size+' '+name+' missing guided lesson '+JSON.stringify(semantic));
    await js("document.querySelectorAll('.curriculum-tabs button')[3]?.click()");
    await wait(()=>js("!!document.querySelector('.curriculum-reading')"),'guided listening and source reading');
    const reading=await js("(function(){const e=document.querySelector('.curriculum-reading');return {text:e.textContent.length,width:e.getBoundingClientRect().width,overflow:document.documentElement.scrollWidth-innerWidth};})()");
    if(reading.text<40||reading.width>width||reading.overflow>5)problems.push(size+' '+name+' reading '+JSON.stringify(reading));
    const study=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
    writeFileSync(output+'/'+size+'-'+name+'-reading.png',Buffer.from(study.data,'base64'));
   }
   if(name==='courseIpa'){
    const phonetic=await js("(function(){const t=document.querySelector('.ipa-text'),s=document.querySelector('.ipa-study-original');return {chunk:s.textContent.length,ipa:!!t,source:!!document.querySelector('.ipa-study-full')};})()");
    if(!phonetic.ipa||phonetic.chunk>240||!phonetic.source)problems.push(size+' course IPA content not chunked '+JSON.stringify(phonetic));
   }
   if(name==='catalog'&&width===390){
    const filter=await js("(function(){const el=document.querySelector('.catalog-filter'),r=el.getBoundingClientRect();return {height:r.height,overflowX:getComputedStyle(el).overflowX,scrollWidth:el.scrollWidth,clientWidth:el.clientWidth};})()");
    if(filter.height>90||filter.overflowX!=='auto'||filter.scrollWidth<=filter.clientWidth)
     problems.push('mobile catalog filters occupy too much vertical space '+JSON.stringify(filter));
   }
   if(name==='speech'&&width===390){
    const layout=await js("(function(){const library=document.querySelector('.speaking-lab-library').getBoundingClientRect();const player=document.querySelector('.speaking-workbench').getBoundingClientRect();const cards=document.querySelector('.speaking-lab-sentences');return {libraryHeight:library.height,playerTop:player.top,display:getComputedStyle(cards).display,scrollWidth:cards.scrollWidth,clientWidth:cards.clientWidth};})()");
    if(layout.playerTop>630||layout.libraryHeight>310||layout.display!=='flex'||layout.scrollWidth<=layout.clientWidth)
     problems.push('mobile speaking lesson picker pushes recorder too far down '+JSON.stringify(layout));
   }
   if(name==='cloud'&&width===1440){
    const auth=await js("(function(){const e=document.querySelector('.cloud-workspace>.account-access');if(!e)return null;return {width:e.getBoundingClientRect().width};})()");
    if(auth&&auth.width>560)problems.push('cloud guest login panel too wide '+JSON.stringify(auth));
   }
   if(name==='lesson'){
    // The original source reader now has five semantic stages, no course preface,
    // and no full-text phoneme checkbox that covers every English/French word.
    await wait(()=>js("!!document.querySelector('.lesson-paper .lesson-paragraphs')"),'lesson body');
    const initial=await js("(function(){const paper=document.querySelector('.lesson-paper').getBoundingClientRect(),nav=document.querySelector('.lesson-stages');const txt=document.querySelector('.lesson-paper .lesson-paragraphs').textContent;return {nav:nav?nav.querySelectorAll('button').length:0,top:paper.top,chars:txt.trim().length,intro:!!document.querySelector('.lesson-preamble'),ipa:!!document.querySelector('.ipa-reader-controls')};})()");
    if(initial.nav!==5||initial.chars<20||initial.intro||initial.ipa)
      problems.push(size+' course five-stage presentation invalid '+JSON.stringify(initial));
    const stageShot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
    writeFileSync(output+'/'+size+'-lesson-five-stages.png',Buffer.from(stageShot.data,'base64'));
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

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
   ['specialtyGrammar','/?page=specialties&type=grammar&language=fr&topic=fr-etre','.specialty-textbook'],
   ['specialtyVocabulary','/?page=specialties&type=vocabulary&language=en&topic=en-study-vocab','.specialty-textbook'],
   ['frenchVerbs','/?page=specialties&type=grammar&language=fr&topic=fr-er','.specialty-grammar-table'],
   ['frImparfait','/?page=specialties&type=grammar&language=fr&topic=fr-imparfait-a2','.specialty-grammar-table'],
   ['frFuture','/?page=specialties&type=grammar&language=fr&topic=fr-futur-proche-a1','.specialty-grammar-table'],
   ['frDaily','/?page=specialties&type=vocabulary&language=fr&topic=fr-routines-lexicon','.specialty-grammar-table'],
   ['enTask1','/?page=specialties&type=vocabulary&language=en&topic=en-task1-trend-lexicon','.specialty-grammar-table'],
   ['enRelative','/?page=specialties&type=grammar&language=en&topic=en-relative-clauses','.specialty-textbook'],
   ['frPossessive','/?page=specialties&type=grammar&language=fr&topic=fr-possessive-determiners-a1','.specialty-grammar-table'],
   ['frSimpleFuture','/?page=specialties&type=grammar&language=fr&topic=fr-futur-simple-a2','.specialty-grammar-table'],
   ['frComparison','/?page=specialties&type=grammar&language=fr&topic=fr-comparisons-a2','.specialty-grammar-table'],
   ['frShop','/?page=specialties&type=vocabulary&language=fr&topic=fr-shop-services-lexicon','.specialty-grammar-table'],
   ['enReported','/?page=specialties&type=grammar&language=en&topic=en-reported-speech-listening','.specialty-grammar-table'],
   ['enStance','/?page=specialties&type=vocabulary&language=en&topic=en-stance-lexicon-listening','.specialty-grammar-table'],
   ['frConditionalB1','/?page=specialties&type=grammar&language=fr&topic=fr-conditional-hypothesis-b1','.specialty-grammar-table'],
   ['frRelativesB1','/?page=specialties&type=grammar&language=fr&topic=fr-relative-pronouns-b1','.specialty-grammar-table'],
   ['frMoodB2','/?page=specialties&type=grammar&language=fr&topic=fr-mood-concession-b2','.specialty-grammar-table'],
   ['frLexiconC1','/?page=specialties&type=vocabulary&language=fr&topic=fr-precise-academic-lexicon-c1','.specialty-grammar-table'],
   ['enArgumentTask2','/?page=specialties&type=vocabulary&language=en&topic=en-task2-reason-evidence-vocab','.specialty-grammar-table'],
   ['frPluperfectB1','/?page=specialties&type=grammar&language=fr&topic=fr-pluperfect-narration-b1','.specialty-grammar-table'],
   ['frPastConditionalB2','/?page=specialties&type=grammar&language=fr&topic=fr-past-conditional-regret-b2','.specialty-grammar-table'],
   ['enTask1Process','/?page=specialties&type=grammar&language=en&topic=en-process-report-grammar','.specialty-grammar-table'],
   ['enTask1Map','/?page=specialties&type=vocabulary&language=en&topic=en-map-change-lexicon','.specialty-grammar-table'],
   ['frDELF','/?page=specialties&type=grammar&language=fr&topic=fr-b2-formal-argument-writing','.specialty-grammar-table'],
   ['frDALF','/?page=specialties&type=vocabulary&language=fr&topic=fr-c1-cross-source-synthesis','.specialty-grammar-table'],
   ['frB2News','/?page=specialties&type=grammar&language=fr&topic=fr-b2-reported-news-reading','.specialty-grammar-table'],
   ['frC1Media','/?page=specialties&type=vocabulary&language=fr&topic=fr-c1-media-stance-reading','.specialty-grammar-table'],
   ['frA1Leisure','/?page=specialties&type=grammar&language=fr&topic=fr-a1-leisure-verbs','.specialty-grammar-table'],
   ['frA1Clarification','/?page=specialties&type=vocabulary&language=fr&topic=fr-a1-clarification-lexicon','.specialty-grammar-table'],
   ['enListenScope','/?page=specialties&type=grammar&language=en&topic=en-listening-paraphrase-scope','.specialty-grammar-table'],
   ['enListenLexicon','/?page=specialties&type=vocabulary&language=en&topic=en-listening-note-lexicon','.specialty-grammar-table'],
   ['frLeisureVocab','/?page=specialties&type=vocabulary&language=fr&topic=fr-a1-leisure-choice-vocabulary','.specialty-grammar-table'],
   ['frMarketGrammar','/?page=specialties&type=grammar&language=fr&topic=fr-a1-market-quantities-grammar','.specialty-grammar-table'],
   ['frMarketVocabulary','/?page=specialties&type=vocabulary&language=fr&topic=fr-a1-market-service-vocabulary','.specialty-grammar-table'],
   ['enReadingScope','/?page=specialties&type=grammar&language=en&topic=en-reading-evidence-scope-u02','.specialty-grammar-table'],
   ['enReadingLexicon','/?page=specialties&type=vocabulary&language=en&topic=en-reading-research-evidence-lexicon-u02','.specialty-grammar-table'],
   ['frHomeLexicon','/?page=specialties&type=vocabulary&language=fr&topic=fr-a1-shared-home-lexicon','.specialty-grammar-table'],
   ['frFutureLexicon','/?page=specialties&type=vocabulary&language=fr&topic=fr-a1-near-future-planning-lexicon','.specialty-grammar-table'],
   ['enHeadingsLexicon','/?page=specialties&type=vocabulary&language=en&topic=en-ielts-heading-paragraph-function-lexicon','.specialty-grammar-table'],
   ['frPastGrammar','/?page=specialties&type=grammar&language=fr&topic=fr-a1-first-past-grammar','.specialty-grammar-table'],
   ['frPastVocab','/?page=specialties&type=vocabulary&language=fr&topic=fr-a1-yesterday-journey-lexicon','.specialty-grammar-table'],
   ['enReadingTFNG','/?page=specialties&type=grammar&language=en&topic=en-ielts-tfng-scope-grammar-u04','.specialty-grammar-table'],
   ['enReferenceGrammar','/?page=specialties&type=grammar&language=en&topic=en-reading-u05-reference-logic','.specialty-grammar-table'],
   ['enRetrofitVocab','/?page=specialties&type=vocabulary&language=en&topic=en-reading-u05-retrofit-lexicon','.specialty-grammar-table'],
   ['enHedgingGrammar','/?page=specialties&type=grammar&language=en&topic=en-reading-u06-hedging-inference','.specialty-grammar-table'],
   ['enScienceVocab','/?page=specialties&type=vocabulary&language=en&topic=en-reading-u06-science-caution-lexicon','.specialty-grammar-table'],
   ['enMatchingGrammar','/?page=specialties&type=grammar&language=en&topic=en-reading-u07-information-matching-logic','.specialty-grammar-table'],
   ['enSurveyVocab','/?page=specialties&type=vocabulary&language=en&topic=en-reading-u07-survey-method-lexicon','.specialty-grammar-table'],
   ['enSynthesisGrammar','/?page=specialties&type=grammar&language=en&topic=en-reading-u08-two-source-synthesis','.specialty-grammar-table'],
   ['enAccessVocab','/?page=specialties&type=vocabulary&language=en&topic=en-reading-u08-access-equity-lexicon','.specialty-grammar-table'],
   ['frCourseIntegrated','/?course=fr-b1-u01&tab=read','.curriculum-stage'],
   ['enCourseIntegrated','/?course=en-ielts-writing-task1-u06&tab=read','.curriculum-stage'],
   ['delfCourseIntegrated','/?course=fr-b2-u06&tab=read','.curriculum-stage'],
   ['dalfCourseIntegrated','/?course=fr-c1-u03&tab=read','.curriculum-stage'],
   ['b2NewsIntegrated','/?course=fr-b2-u03&tab=read','.curriculum-stage'],
   ['c1MediaIntegrated','/?course=fr-c1-u07&tab=read','.curriculum-stage'],
   ['a1QuestionsIntegrated','/?course=fr-a1-u06&tab=read','.curriculum-stage'],
   ['enListeningU03Integrated','/?course=en-ielts-listening-u03&tab=read','.curriculum-stage'],
   ['frA1LeisureIntegrated','/?course=fr-a1-u07&tab=read','.curriculum-stage'],
   ['frA1MarketIntegrated','/?course=fr-a1-u08&tab=read','.curriculum-stage'],
   ['enReadingU02Integrated','/?course=en-ielts-reading-u02&tab=read','.lesson-reader'],
   ['frHomeIntegrated','/?course=fr-a1-u10&tab=read','.curriculum-stage'],
   ['frFutureIntegrated','/?course=fr-a1-u11&tab=read','.curriculum-stage'],
   ['enHeadingsIntegrated','/?course=en-ielts-reading-u03&tab=read','.curriculum-stage'],
   ['frPastIntegrated','/?course=fr-a1-u12&tab=read','.curriculum-stage'],
   ['enReadingTFNGIntegrated','/?course=en-ielts-reading-u04&tab=read','.curriculum-stage'],
   ['enReadingu05Integrated','/?course=en-ielts-reading-u05&tab=read','.curriculum-stage'],
   ['enReadingu06Integrated','/?course=en-ielts-reading-u06&tab=read','.curriculum-stage'],
   ['enReadingu07Integrated','/?course=en-ielts-reading-u07&tab=read','.curriculum-stage'],
   ['enReadingu08Integrated','/?course=en-ielts-reading-u08&tab=read','.curriculum-stage'],
   ['frDailyIntegrated','/?course=fr-a1-u05&tab=read','.curriculum-stage'],
   ['frDirectionsIntegrated','/?course=fr-a1-u09&tab=read','.curriculum-stage'],
  ['speech','/speech-lab','.speaking-lab-columns'],
  ['ipa','/?page=ipa','.ipa-studio'],
  ['settings','/?page=settings&section=appearance','.settings-content'],
  ['account','/?page=settings&section=account','.settings-content'],
  ['cloud','/cloud?panel=resources','.cloud-workspace']
 ];
 const sizes=[['desktop',1440,900],['wide',1920,1000],['tablet',1024,768],['mobile',390,844]];
 for(const [size,width,height] of sizes){
  await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});
  await go('/','.catalog-toolbar');
  await js("localStorage.setItem('llh-v44-appearance-v1',JSON.stringify({layout:'standard',theme:'academic',fontSize:17,readerWidth:780,sidebar:true,serif:false,ttsRate:.85,ipa:false,language:'fr',speechApiUrl:''}))");
  for(const [name,path,selector] of routes){
   await go(path,selector);
   if(['frCourseIntegrated','enCourseIntegrated','delfCourseIntegrated','dalfCourseIntegrated','b2NewsIntegrated','c1MediaIntegrated','a1QuestionsIntegrated','enListeningU03Integrated','frA1LeisureIntegrated','frA1MarketIntegrated','enReadingU02Integrated','frHomeIntegrated','frFutureIntegrated','enHeadingsIntegrated','frPastIntegrated','enReadingTFNGIntegrated','enReadingu05Integrated','enReadingu06Integrated','enReadingu07Integrated','enReadingu08Integrated','frDailyIntegrated','frDirectionsIntegrated'].includes(name)){
    const index=(name==='enCourseIntegrated'||name==='dalfCourseIntegrated'||name==='c1MediaIntegrated'||name==='a1QuestionsIntegrated'||name==='frA1LeisureIntegrated'||name==='frHomeIntegrated'||name==='frFutureIntegrated'||name==='enHeadingsIntegrated')?2:1;
    await js("document.querySelectorAll('.course-study-switcher button')["+index+"]?.click()");
    await wait(()=>js("!!document.querySelector('.course-specialty-topic')"),name+' integrated source course stage');
    const intact=await js("(function(){const e=document.querySelector('.course-specialty-inline');return {chapters:e?.querySelectorAll('.course-specialty-chapters button').length||0,questions:e?.querySelectorAll('.course-specialty-question').length||0,overflow:Math.max(document.documentElement.scrollWidth,document.body.scrollWidth)-innerWidth}})()");
    if(intact.chapters<4||intact.questions<4||intact.overflow>5)
     problems.push(size+' '+name+' in-course learning incomplete '+JSON.stringify(intact));
   }
   if(['a1QuestionsIntegrated','enListeningU03Integrated','frA1LeisureIntegrated','frA1MarketIntegrated','frHomeIntegrated','frFutureIntegrated','enHeadingsIntegrated','frPastIntegrated','enReadingTFNGIntegrated','enReadingu05Integrated','enReadingu06Integrated','enReadingu07Integrated','enReadingu08Integrated','frDailyIntegrated','frDirectionsIntegrated'].includes(name)){
    await js("document.querySelectorAll('.course-study-switcher button')[3]?.click()");
    await wait(()=>js("document.querySelectorAll('.reception-study > article.reception-paragraph').length===4"),name+' four source-linked listening paragraphs');
    const evidence=await js("(function(){const p=[...document.querySelectorAll('.reception-study > article.reception-paragraph')];return {paragraphs:p.length,chinese:p.filter(x=>x.textContent.length>100).length,overflow:Math.max(document.documentElement.scrollWidth,document.body.scrollWidth)-innerWidth}})()");
    if(evidence.paragraphs!==4||evidence.chinese!==4||evidence.overflow>5)
     problems.push(size+' '+name+' bilingual reception unavailable '+JSON.stringify(evidence));
   }
   if(name==='enReadingU02Integrated'){
    await js("document.querySelectorAll('.course-study-switcher button')[2]?.click()");
    await wait(()=>js("!!document.querySelector('.course-specialty-topic')"),'original-source vocabulary directly integrated');
    const stats=await js("(function(){return {lessons:document.querySelectorAll('.course-specialty-topic').length,source:!!document.querySelector('.course-enrichment details'),questions:document.querySelectorAll('.course-specialty-question').length}})()");
    if(stats.lessons!==1||!stats.source||stats.questions<4)
      problems.push(size+' '+name+' existing-original vocabulary not integrated '+JSON.stringify(stats));
   }
   const value=await js('(function(){const e=document.querySelector('+JSON.stringify(selector)+
    ');return {overflow:Math.max(document.documentElement.scrollWidth,document.body.scrollWidth)-innerWidth,width:e.getBoundingClientRect().width};})()');
   if(value.overflow>5)problems.push(size+' '+name+' overflow='+value.overflow);
   if(value.width<175||value.width>width+5)problems.push(size+' '+name+' width='+value.width);
   const image=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
   writeFileSync(output+'/'+size+'-'+name+'.png',Buffer.from(image.data,'base64'));
   checked++;
   if(name==='guidedEnglish'||name==='guidedFrench'){
    const semantic=await js("(function(){const nav=document.querySelector('.course-study-switcher'),stage=document.querySelector('.curriculum-stage');const tabs=[...nav.querySelectorAll('button')];return {tabs:tabs.length,position:getComputedStyle(nav).position,top:stage.getBoundingClientRect().top-nav.getBoundingClientRect().bottom,height:stage.getBoundingClientRect().height,text:stage.innerText.slice(0,300)};})()");
    if(semantic.position!=='sticky'||semantic.tabs!==6||semantic.top>140||semantic.height<100||!semantic.text.trim())problems.push(size+' '+name+' missing guided lesson '+JSON.stringify(semantic));
    await js("document.querySelectorAll('.course-study-switcher button')[3]?.click()");
    await wait(()=>js("!!document.querySelector('.curriculum-reading')"),'guided listening and source reading');
    const reading=await js("(function(){const e=document.querySelector('.curriculum-reading');return {text:e.textContent.length,width:e.getBoundingClientRect().width,overflow:document.documentElement.scrollWidth-innerWidth};})()");
    if(reading.text<40||reading.width>width||reading.overflow>5)problems.push(size+' '+name+' reading '+JSON.stringify(reading));
    const study=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
    writeFileSync(output+'/'+size+'-'+name+'-reading.png',Buffer.from(study.data,'base64'));
   }
    if(['specialtyGrammar','specialtyVocabulary','frenchVerbs','frImparfait','frFuture','frDaily','enTask1','enRelative','frPossessive','frSimpleFuture','frComparison','frShop','enReported','enStance','frConditionalB1','frRelativesB1','frMoodB2','frLexiconC1','enArgumentTask2','frPluperfectB1','frPastConditionalB2','enTask1Process','enTask1Map','frDELF','frDALF','frB2News','frC1Media','frA1Leisure','frA1Clarification','enListenScope','enListenLexicon','frLeisureVocab','frMarketGrammar','frMarketVocabulary','enReadingScope','enReadingLexicon','frHomeLexicon','frFutureLexicon','enHeadingsLexicon','frPastGrammar','frPastVocab','enReadingTFNG','enReferenceGrammar','enRetrofitVocab','enHedgingGrammar','enScienceVocab','enMatchingGrammar','enSurveyVocab','enSynthesisGrammar','enAccessVocab'].includes(name)){
     const quality=await js("(function(){const unit=document.querySelector('.specialty-textbook');return {chapters:unit?.querySelectorAll('.specialty-chapter').length||0,chars:(unit?.innerText||'').length,back:!!unit?.querySelector('.specialty-course-link'),overflow:Math.max(document.documentElement.scrollWidth,document.body.scrollWidth)-innerWidth};})()");
     if(quality.chapters<3||quality.chars<600||!quality.back||quality.overflow>5)
      problems.push(size+' '+name+' empty or overflowing chapter: '+JSON.stringify(quality));
     const geom=await js("(function(){const rect=s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return {left:r.left,right:r.right,width:r.width,top:r.top};};return {page:rect('.page'),specialty:rect('.specialty-page'),article:rect('.specialty-textbook'),companion:rect('.specialty-companion'),side:rect('.specialty-side'),heading:rect('.specialty-heading-row'),tableRows:document.querySelectorAll('.specialty-grammar-table tbody tr').length};})()");
     if(!geom.heading)problems.push(size+' '+name+' missing compact heading');
     if(width>=1440){
      if(geom.specialty.width<geom.page.width-115)problems.push(size+' '+name+' unused page width '+JSON.stringify(geom));
      if(geom.article.width<width*.37)problems.push(size+' '+name+' narrow lesson '+JSON.stringify(geom));
      if(!geom.companion||geom.companion.width<210)problems.push(size+' '+name+' companion not alongside textbook '+JSON.stringify(geom));
     }
     if(name==='frenchVerbs'&&geom.tableRows!==6)
      problems.push(size+' French six-person table missing '+JSON.stringify(geom));
     if(['frImparfait','frFuture','frDaily'].includes(name)&&geom.tableRows!==6)
      problems.push(size+' French six-row table missing '+name+': '+JSON.stringify(geom));
     if(name==='enTask1'&&geom.tableRows!==8)
      problems.push(size+' Task1 should show trend pairs and 4-row synthetic chart data '+JSON.stringify(geom));
     if(['frPossessive','frSimpleFuture','frShop'].includes(name)&&geom.tableRows!==6)
      problems.push(size+' '+name+' six-row reference table expected '+JSON.stringify(geom));
     if(name==='frComparison'&&geom.tableRows!==3)
      problems.push(size+' '+name+' comparison table should have three comparison forms '+JSON.stringify(geom));
     if(name==='enReported'&&geom.tableRows!==4)
      problems.push(size+' '+name+' reported speech table should have four forms '+JSON.stringify(geom));
     if(name==='enStance'&&geom.tableRows!==5)
      problems.push(size+' '+name+' stance vocabulary table should have five categories '+JSON.stringify(geom));
     if(name==='frConditionalB1'&&geom.tableRows!==6)
      problems.push(size+' French B1 conditional conjugation has no six-row table '+JSON.stringify(geom));
     if(name==='frRelativesB1'&&geom.tableRows!==4)
      problems.push(size+' French B1 relative pronoun four-row table missing '+JSON.stringify(geom));
     if(name==='frMoodB2'&&geom.tableRows!==4)
      problems.push(size+' French B2 mood table missing '+JSON.stringify(geom));
     if(name==='frLexiconC1'&&geom.tableRows!==5)
      problems.push(size+' French C1 lexical function table missing '+JSON.stringify(geom));
     if(name==='enArgumentTask2'){
      const stats=await js("(function(){const model=document.querySelector('.specialty-production details');return {paragraph:(model?.textContent||'').length,paragraphs:model?.querySelectorAll('.specialty-essay-paragraph').length||0}})()");
      if(stats.paragraph<1200||stats.paragraphs!==5)
       problems.push(size+' IELTS Task 2 essay absent or truncated '+JSON.stringify(stats));
     }

     if(['frPluperfectB1','enTask1Map'].includes(name)&&geom.tableRows!==4)
      problems.push(size+' '+name+' four-row knowledge table missing '+JSON.stringify(geom));
     if(['frPastConditionalB2','enTask1Process'].includes(name)&&geom.tableRows!==6)
      problems.push(size+' '+name+' six-row reference table missing '+JSON.stringify(geom));
     if(name==='frDELF'&&geom.tableRows!==6)
      problems.push(size+' DELF structure and model table missing '+JSON.stringify(geom));
     if(name==='frDALF'&&geom.tableRows!==4)
      problems.push(size+' DALF input matrix missing '+JSON.stringify(geom));
     if(['frB2News','frC1Media','frA1Leisure','frA1Clarification','enListenScope','enListenLexicon','frLeisureVocab','frMarketGrammar','frMarketVocabulary','enReadingScope','enReadingLexicon','frHomeLexicon','frFutureLexicon','enHeadingsLexicon','frPastGrammar','frPastVocab','enReadingTFNG','enReferenceGrammar','enRetrofitVocab','enHedgingGrammar','enScienceVocab','enMatchingGrammar','enSurveyVocab','enSynthesisGrammar','enAccessVocab'].includes(name)&&geom.tableRows!==(name==='frPastGrammar'?8:4))
      problems.push(size+' '+name+' expected complete instructional table rows '+JSON.stringify({expected:name==='frPastGrammar'?8:4,...geom}));
     if(name==='enTask1Process'){
      const count=await js("document.querySelectorAll('.task1-flow-step').length");
      if(count!==6)problems.push(size+' flow diagram has '+count+' labelled stages, expected six');
     }
     if(name==='enTask1Map'){
      const count=await js("document.querySelectorAll('.task1-site-map').length");
      if(count!==2)problems.push(size+' original maps expected before and after, found '+count);
     }
     if(!await js("!!document.querySelector('.specialty-topic-group')"))
      problems.push(size+' '+name+' missing CEFR directory group');
     if(!await js("!!document.querySelector('.specialty-companion-jump')"))
      problems.push(size+' '+name+' missing chapter-rail links');
     if(!await js("!!document.querySelector('.specialty-learning-links')"))
      problems.push(size+' '+name+' missing prerequisite learning path');
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
    const initial=await js("(function(){const paper=document.querySelector('.lesson-paper').getBoundingClientRect(),nav=document.querySelector('.course-study-switcher');const txt=document.querySelector('.lesson-paper').innerText;return {nav:nav?nav.querySelectorAll('button').length:0,sticky:nav?getComputedStyle(nav).position:null,top:paper.top,chars:txt.trim().length,intro:!!document.querySelector('.lesson-preamble'),ipa:!!document.querySelector('.ipa-reader-controls'),metadata:txt.includes('原创完整样课 v0.1')||txt.includes('状态：教学内容草稿已完整编写')};})()");
    if(initial.nav!==6||initial.sticky!=='sticky'||initial.chars<20||initial.intro||initial.ipa||initial.metadata)
      problems.push(size+' course five-stage presentation invalid '+JSON.stringify(initial));
    const stageShot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
    writeFileSync(output+'/'+size+'-lesson-five-stages.png',Buffer.from(stageShot.data,'base64'));
    await js("document.querySelector('.reader-head-actions button[aria-pressed]').click()");
    if(!await js("!!document.querySelector('.reader-layout.tools-hidden')&&!document.querySelector('.reader-tools-empty')"))problems.push('empty tools still reserve a column');
    // Activate the real text-selection inspector rather than testing only its empty placeholder.
    const selectionMade=await js("(function(){const scope=document.querySelector('.reader-selection-scope .lesson-paper .bilingual-target')||document.querySelector('.reader-selection-scope .lesson-paper .lesson-paragraphs');if(!scope)return false;const walker=document.createTreeWalker(scope,NodeFilter.SHOW_TEXT);let n;while((n=walker.nextNode())){if(!n.textContent||n.textContent.trim().length<5)continue;const start=n.textContent.search(/[^\\s]/);const range=document.createRange();range.setStart(n,start);range.setEnd(n,Math.min(start+12,n.textContent.length));window.getSelection().removeAllRanges();window.getSelection().addRange(range);document.dispatchEvent(new Event('selectionchange'));return true;}return false;})()");
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
 const acceptance=[];
 const representatives=[['fr-a1-u01',1],['fr-a2-u03',1],['fr-b2-u03',3],['fr-c1-u07',3],['fr-c2-u03',3],['en-ielts-listening-u02',3],['en-ielts-writing-task1-u03',4],['en-ielts-writing-task2-u01',1]];
 for(const width of [390,768,1440,1920]){
  await call('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<600});
  for(const [id,stage] of representatives){
   await go('/','.catalog-toolbar');
   await js("localStorage.setItem('llh-v44-appearance-v1',JSON.stringify({theme:'academic',layout:'standard',readerWidth:780}))");
   await go('/?course='+id+'&tab=read','.course-study-switcher');
   await js('document.querySelectorAll(".course-study-switcher button")['+stage+'].click()');
   await wait(()=>js("!!document.querySelector('.curriculum-stage,.lesson-paper')"),'representative content');
   await wait(()=>js("(()=>{const nav=document.querySelector('.course-study-switcher'),active=nav?.querySelector('[aria-pressed=true]');if(!active)return false;const n=nav.getBoundingClientRect(),a=active.getBoundingClientRect();return a.left>=n.left-2&&a.right<=n.right+2;})()"),'active stage visible after navigation');
   const metric=await js("(()=>{const a=document.querySelector('.reader-article').getBoundingClientRect(),s=document.querySelector('.reader-selection-scope').getBoundingClientRect();return {article:a.width,content:s.width,unusedRatio:1-s.width/a.width,overflow:document.documentElement.scrollWidth-innerWidth,structured:!!document.querySelector('.curriculum-lesson'),columns:document.querySelector('.reception-parallel')?getComputedStyle(document.querySelector('.reception-parallel')).gridTemplateColumns:null};})()");
   acceptance.push({id,width,...metric});
   if(metric.overflow>5||metric.structured&&width>=1440&&metric.unusedRatio>.12)problems.push('usable width '+JSON.stringify({id,width,...metric}));
   const shot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
   writeFileSync(output+'/acceptance-'+width+'-'+id+'.png',Buffer.from(shot.data,'base64'));checked++;
  }
  for(const id of ['en-ielts-writing-task1-u03','en-ielts-writing-task1-u05','en-ielts-writing-task1-u06']){
   await go('/?course='+id+'&tab=read','.course-study-switcher');
   await js('document.querySelectorAll(".course-study-switcher button")[4].click()');
   await wait(()=>js("!!document.querySelector('.task1-workshop textarea')"),'Task 1 writing');
   await js("(()=>{const t=document.querySelector('.task1-workshop textarea');Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set.call(t,'The diagram provides evidence for this comparison.');t.dispatchEvent(new Event('input',{bubbles:true}));})()");
   await js("document.querySelector('.task1-workshop>button').click()");
   if(!await js("document.querySelector('.task1-feedback')?.textContent.includes('还差')"))problems.push(id+' lacks material-specific feedback');
   await call('Page.reload');
   await wait(()=>js("!!document.querySelector('.task1-workshop textarea')"),'saved stage after reload');
   await wait(()=>js("(()=>{const nav=document.querySelector('.course-study-switcher'),active=nav?.querySelector('[aria-pressed=true]');if(!active)return false;const n=nav.getBoundingClientRect(),a=active.getBoundingClientRect();return a.left>=n.left-2&&a.right<=n.right+2;})()"),'restored stage visible after reload');
   if(!await js("document.querySelector('.task1-workshop textarea').value==='The diagram provides evidence for this comparison.'"))problems.push(id+' lost writing after reload');
   checked++;
  }
  for(const layout of ['standard','immersive'])for(const theme of ['academic','night']){
   await go('/','.catalog-toolbar');
   await js("localStorage.setItem('llh-v44-appearance-v1',JSON.stringify({theme:"+JSON.stringify(theme)+",layout:"+JSON.stringify(layout)+",readerWidth:780}))");
   await go('/?course=fr-c1-u07&tab=read','.course-study-switcher');
   await js('document.querySelectorAll(".course-study-switcher button")[3].click()');
   const result=await js("({overflow:document.documentElement.scrollWidth-innerWidth,paragraphs:document.querySelectorAll('.reception-parallel').length,theme:document.body.dataset.theme,layout:document.body.dataset.viewMode})");
   if(result.overflow>5||result.paragraphs<5||result.theme!==theme||result.layout!==layout)problems.push('reception theme/layout '+JSON.stringify({width,theme,layout,...result}));
   const shot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});writeFileSync(output+'/reception-'+width+'-'+layout+'-'+theme+'.png',Buffer.from(shot.data,'base64'));checked++;
  }
 }
 writeFileSync(output+'/results.json',JSON.stringify({checked,acceptance,problems},null,2));
 console.log('Checked '+checked+' route/viewport combinations; issues: '+problems.length);
 for(const issue of problems)console.error(issue);
 if(problems.length)process.exitCode=1;
}catch(e){console.error(e);process.exitCode=1;
}finally{try{ws?.close();}catch{}chrome.kill('SIGTERM');}

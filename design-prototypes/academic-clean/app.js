"use strict";

/**
 * Standalone V3 UX prototype. Mock data only: no uploads, AI, Auth,
 * Supabase writes or Google Drive reads are performed in this file.
 * The full production reader must render ALL source blocks, not excerpts.
 */
const state = { page: "courses", language: "en", track: "writing-task2", level: "A1", unitId: "en-writing-01", query: "" };

const englishTracks = [
  { id: "listening", title: "Listening", count: 8 },
  { id: "reading", title: "Reading", count: 8 },
  { id: "writing-task1", title: "Writing Task 1", count: 8 },
  { id: "writing-task2", title: "Writing Task 2", count: 8 },
  { id: "speaking", title: "Speaking", count: 8 },
  { id: "language-upgrade", title: "Language Upgrade", count: 8 }
];
const frenchLevels = [
  { id: "A1", title: "A1 · 入门基础", count: 12 },
  { id: "A2", title: "A2 · 日常交流", count: 12 },
  { id: "B1", title: "B1 · 连贯表达", count: 10 },
  { id: "B2", title: "B2 · 观点论证", count: 10 },
  { id: "C1", title: "C1 · 高阶表达", count: 8 },
  { id: "C2", title: "C2 · 精准运用", count: 8 }
];
const steps = [
  { id: "context", label: "情境", mark: "01" },
  { id: "grammar", label: "语法", mark: "02" },
  { id: "vocab", label: "词汇", mark: "03" },
  { id: "reception", label: "听读", mark: "04" },
  { id: "pronunciation", label: "发音", mark: "05" },
  { id: "production", label: "表达", mark: "06" }
];
const units = [
  {
    id: "en-writing-01", language: "en", group: "writing-task2", number: "01",
    title: "Academic argument · Evidence and qualification", status: "review",
    objective: "Write a qualified argument without treating assumptions as demonstrated facts.",
    sections: {
      context: [
        "教学示例：大学计划扩大线上课程的比例。比较更便利的学习安排与面对面课堂的反馈、实验和讨论需求。",
        "目标：提出一个有条件、有理由的观点，并能在口语中解释判断依据。"
      ],
      grammar: [
        "Claim → reason → example → qualification. 不要使用绝对性推断来替代论证。",
        "Although online lectures offer flexibility, some practical courses still require regular face-to-face supervision.",
        "“may contribute to” 不等同于 “has been proven to cause”；谨慎区分相关与因果。"
      ],
      vocab: [
        "access to education；student engagement；a potential drawback；timely feedback；blended learning；support an argument。",
        "搭配比孤立单词更重要；例如 provide feedback、reduce barriers、evaluate outcomes。"
      ],
      reception: [
        "原创阅读片段：Recorded lectures may reduce scheduling barriers for some learners. However, convenience alone does not ensure that students receive the feedback needed to improve their work.",
        "问题：作者是否认为线上课程必然提高学习效果？答案：没有；原文用 may、some 与 however 限定推论。",
        "真实的第三方听力尚需逐课审核并绑定；此原型不显示假播放器。"
      ],
      pronunciation: [
        "练习句子重音：FLEXIBILITY versus EFFECTIVE FEEDBACK。清晰表达比刻意提高语速重要。",
        "词级评估引擎尚未上线，状态为“未评估”，不得推断实际音素错误或给出总分。"
      ],
      production: [
        "写作：给出一段含立场、理由、例证和限定条件的原创论证段落。",
        "口语：用约一分钟解释在哪些情境下线上学习可能更有效，并说明一个局限。",
        "核对：例子是否支持立场？是否误将可能性写成确定事实？本页不设考试成绩。"
      ]
    }
  },
  { id:"en-listen-01", language:"en",group:"listening",number:"01",title:"Lecture signposting and key claims",status:"outline",objective:"Identify claim, example, contrast and conclusion in an academic lecture." },
  { id:"en-read-01", language:"en",group:"reading",number:"01",title:"Reading for argument structure and evidence",status:"outline",objective:"Locate the author's thesis, evidence and hedging without relying on exact word matches." },
  { id:"en-task1-01", language:"en",group:"writing-task1",number:"01",title:"Describe trends and construct an accurate overview",status:"outline",objective:"Summarise significant chart trends while checking percentages and comparison logic." },
  { id:"en-speaking-01", language:"en",group:"speaking",number:"01",title:"Develop a reasoned extended response",status:"outline",objective:"Speak coherently with an opinion, explanation, example and appropriate qualification." },
  { id:"en-upgrade-01",language:"en",group:"language-upgrade",number:"01",title:"Hedging, academic collocation and precision",status:"outline",objective:"Use academic grammar and word combinations accurately, without unnecessary complexity." },
  {
    id: "fr-a1-01", language: "fr", group: "A1", number: "01",
    title: "Saluer et se présenter", status: "review",
    objective: "用基础法语礼貌问候、介绍身份并询问他人的姓名。",
    sections: {
      context: [
        "原创场景：你在法语课见到一位老师。",
        "A : Bonjour ! Je m'appelle Camille. Et vous ?",
        "B : Bonjour, je m'appelle Marc. Enchanté !",
        "正式场景优先使用 vous，熟悉同学之间可视语境使用 tu。"
      ],
      grammar: [
        "être 现在时：je suis；tu es；il/elle est；nous sommes；vous êtes；ils/elles sont。",
        "Je suis étudiante. 与 C'est une étudiante. 属于不同表达结构，不能机械视为同一冠词规则。",
        "s'appeler：je m'appelle；tu t'appelles；vous vous appelez。",
        "典型错误：Je est étudiant → Je suis étudiant."
      ],
      vocab: [
        "bonjour、bonsoir、salut、au revoir、enchanté(e)、prénom、nom、étudiant(e)、professeur。",
        "词组：Comment vous appelez-vous ? / Je m'appelle … / Et vous ?"
      ],
      reception: [
        "原创微型阅读：Bonjour, je m'appelle Léa. Je suis française. Mon ami Adam est canadien. Nous sommes étudiants.",
        "问题：哪一个动词形式与 nous 对应？答案：sommes。",
        "此演示仅展示原创课文。配套音频尚未完成授权与文件匹配。"
      ],
      pronunciation: [
        "tu /ty/ 与 tout /tu/ 的元音对比；初学时先听辨而不是用汉语谐音替代。",
        "法语句子重音通常按照节奏组组织；vous êtes 中可能存在 /z/ 联诵。",
        "尚无可信模型评估结果，因此所有词级反馈状态均为“未评估”。"
      ],
      production: [
        "口语：使用 Bonjour / Je m'appelle / Je suis … 表达自己的名字与身份。",
        "练习：Je ___ étudiante → suis；Vous ___ professeur ? → êtes。",
        "写作：五至七句原创法语自我介绍，不要求填写敏感个人资料。"
      ]
    }
  },
  { id: "fr-a1-02", language:"fr",group:"A1",number:"02",title:"Pays, langues et nationalités",status:"outline",objective:"Describe nationality and residence using habiter and national adjectives." },
  { id: "fr-a2-01", language:"fr",group:"A2",number:"01",title:"Récits au passé",status:"outline",objective:"Narrate past events and distinguish passé composé from imparfait." },
  { id: "fr-b1-01", language:"fr",group:"B1",number:"01",title:"Raconter avec précision",status:"outline",objective:"Tell a connected story with background and sequence." },
  { id: "fr-b2-01", language:"fr",group:"B2",number:"01",title:"Argumenter et nuancer",status:"outline",objective:"Develop a balanced opinion and respond to opposing views." },
  { id: "fr-c1-01", language:"fr",group:"C1",number:"01",title:"Précision lexicale",status:"outline",objective:"Choose vocabulary appropriate to audience and nuanced meanings." },
  { id: "fr-c2-01", language:"fr",group:"C2",number:"01",title:"Maîtrise des nuances",status:"outline",objective:"Interpret and produce fine lexical and pragmatic distinctions." }
];
const sourceItems = [
  { id:"ielts",lang:"en",title:"IELTS Academic — 官方样题与题型",owner:"IELTS Partners",url:"https://www.ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test",rights:"官网学习；不默认拥有复制题目或音频的权利。" },
  { id:"bc",lang:"en",title:"British Council — B2 Listening",owner:"British Council",url:"https://learnenglish.britishcouncil.org/free-resources/listening/b2",rights:"官网分级听力；真实音频逐课核实后链接。" },
  { id:"tex",lang:"fr",title:"Tex's French Grammar",owner:"UT Austin / COERLL",url:"https://coerll.utexas.edu/coerll/oer/texs-french-grammar/",rights:"开放语法课程；具体媒体另行核验许可。" },
  { id:"french",lang:"fr",title:"Français interactif",owner:"UT Austin / COERLL",url:"https://coerll.utexas.edu/coerll/oer/francais-interactif/",rights:"完整课程主项目 CC BY；个别第三方素材需核查。" }
];
const inboxUrl = "https://drive.google.com/drive/my-drive"; // public-safe entry; resolve private Inbox URL after user auth
const outlet = document.getElementById("page-outlet");
const nav = document.getElementById("track-nav");

function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, ch => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[ch]));
}
function sectionTitle(title,subtitle,kpi) {
  return `<div class="page-head"><div><p class="eyebrow">LANGUAGE HUB / ${escapeHTML(title)}</p><h1>${escapeHTML(title)}</h1><p class="page-subtitle">${escapeHTML(subtitle)}</p></div>${kpi||""}</div>`;
}
function trackSet() {
  return state.language==="en" ? englishTracks : state.language==="fr" ? frenchLevels : [];
}
function updateSide() {
  for (const b of document.querySelectorAll("[data-lang]")) {
    const on = b.dataset.lang===state.language;
    b.classList.toggle("active",on); b.setAttribute("aria-pressed",String(on));
  }
  document.getElementById("course-total").textContent = state.language==="en"?"48 单元":state.language==="fr"?"60 单元":"可扩展";
  nav.innerHTML = "";
  for (const t of trackSet()) {
    const b=document.createElement("button");b.type="button";
    b.className="track-item"+((state.language==="en"?state.track:state.level)===t.id?" active":"");
    b.dataset.track=t.id;
    const label=document.createElement("span");label.textContent=t.title;
    const count=document.createElement("small");count.textContent=String(t.count);
    b.append(label,count);nav.append(b);
    b.setAttribute("aria-pressed",String((state.language==="en"?state.track:state.level)===t.id));
  }
  document.querySelectorAll(".top-nav [data-page]").forEach(b=>{
    const on=b.dataset.page===state.page;b.classList.toggle("active",on);b.setAttribute("aria-current",on?"page":"false");
  });
}
function render() {
  updateSide();
  if(state.page==="courses")renderCourses();
  else if(state.page==="materials")renderMaterials();
  else if(state.page==="sources")renderSources();
  else renderArchitecture();
}
function activeUnits() {
  return units.filter(u=>u.language===state.language && u.group===(state.language==="en"?state.track:state.level) &&
  [u.title,u.objective].join(" ").toLowerCase().includes(state.query.toLowerCase()));
}
function renderCourses() {
  if(state.language==="other"){
    outlet.innerHTML=sectionTitle("其他语言","语言模块允许后续接入新的课程，不会强制套用英语/法语结构。")+
    `<div class="panel card-padding"><h2>语言课程尚未配置</h2><p class="page-subtitle">未来支持通过自有教材导入，例如西班牙语、日语或德语。请先在“我的资料”添加合法持有的原始教材。</p><button type="button" class="button" data-page="materials">打开个人教材导入</button></div>`;
    return;
  }
  const selectedGroup=trackSet().find(t=>t.id===(state.language==="en"?state.track:state.level));
  const kpi=`<div class="page-kpi"><div><strong>${state.language==="en"?48:60}</strong><span>规划单元</span></div><div><strong>6</strong><span>学习阶段</span></div></div>`;
  outlet.innerHTML=sectionTitle(state.language==="en"?"英语课程":"法语课程",
    state.language==="en"?"雅思学术听读、写作、口语与语言强化":"从 A1 入门逐步推进至 C2",kpi)+
    `<div class="search-bar"><label class="sr-only" for="course-search">搜索课程</label><input id="course-search" type="search" autocomplete="off" placeholder="搜索课程标题或学习目标" value="${escapeHTML(state.query)}"></div>`+
    `<div class="workspace"><section class="panel unit-panel" aria-label="课程单元"><div class="card-padding panel-head" style="margin:0;padding-bottom:8px"><h2>${escapeHTML(selectedGroup?.title||"单元")}</h2><small>交互样例</small></div><div id="unit-entries"></div></section><article class="panel reader" id="reader" aria-label="课件阅读区"></article></div>`+
    `<p class="footer-note">这是独立设计原型。正式课程需从获授权的学习数据接口读取完整正文，不能由设计样例代替。</p>`;
  updateCourseList();
}
function updateCourseList() {
  const list=activeUnits();
  if (!list.some(u=>u.id===state.unitId))state.unitId=list[0]?.id||"";
  const items=document.getElementById("unit-entries");
  if(!items)return;
  items.replaceChildren();
  if(!list.length) {
    const empty=document.createElement("div");empty.className="empty";
    empty.textContent="当前筛选下没有设计示例。";items.append(empty);
  }
  for(const item of list){
    const b=document.createElement("button");
    b.className="unit-entry"+(item.id===state.unitId?" active":"");b.type="button";b.dataset.unit=item.id;
    b.innerHTML=`<span class="unit-n">${escapeHTML(item.number)}</span><span class="unit-info"><strong>${escapeHTML(item.title)}</strong><small>${item.status==="review"?"完整阅读布局示范":"框架状态示范"}</small></span>`;
    items.append(b);
  }
  renderReader(list.find(u=>u.id===state.unitId));
}

function renderReader(u) {
  const reader=document.getElementById("reader");if(!reader)return;
  if(!u){reader.innerHTML='<div class="empty">请选择一个课程单元。</div>';return;}
  const isExample=u.status==="review" && Boolean(u.sections);
  const alert=isExample?
    '当前文字为用于展示版式的原创示例，不是从私人云盘加载的完整教材。生产版本必须完整显示所有章节、答案、原始页码与附件。':
    '该单元在本设计原型中仅有教学目标。正式页面必须区分目录、草稿与已核验完整课件，不能显示假正文。';
  reader.innerHTML=`<div class="reader-top"><span class="eyebrow">${u.language==="en"?"ACADEMIC ENGLISH":"FRANÇAIS"} / ${escapeHTML(u.group)}</span><span class="badge ${isExample?"":"warning"}">${isExample?"阅读布局示范":"仅有课程纲要"}</span></div><h2>${escapeHTML(u.title)}</h2><p class="page-subtitle">${escapeHTML(u.objective)}</p><div class="note">${escapeHTML(alert)}</div>`;
  if (!isExample) {
    reader.innerHTML+=`<section class="lesson-section"><h3>教学目标</h3><p>${escapeHTML(u.objective)}</p></section><div class="note warning">原始教材、练习、答案与音频都必须由内容导入流程核验后显示。这里不生成替代课文。</div>`;
    return;
  }
  reader.innerHTML+=`<nav class="segment-nav" aria-label="六段课程定位">${steps.map(s=>`<button type="button" data-jump="${s.id}">${s.mark} ${s.label}</button>`).join("")}</nav>`;
  for (const step of steps) {
    const section=document.createElement("section");section.className="lesson-section";section.id="demo-"+step.id;
    const h=document.createElement("h3");h.textContent=step.mark+" · "+step.label;section.append(h);
    for(const line of u.sections[step.id]||[]) {
      const p=document.createElement("p");p.textContent=line;section.append(p);
    }
    reader.append(section);
  }
  const note=document.createElement("div");note.className="note warning";
  note.textContent="配套录音、个人学习进度和真实发音纠错尚未接入此设计原型。无可播放媒体时不得显示播放器。";reader.append(note);
}
function renderMaterials() {
  outlet.innerHTML=sectionTitle("个人教材导入","从设备或专用 Google Drive 文件夹添加资料，原始教材与转换结果分开保存。")+
    `<div class="two-column">
      <section class="panel card-padding"><div class="panel-head"><h2>从设备选择文件</h2><span class="badge warning">演示模式</span></div>
       <div class="upload-target">
       <div class="upload-icon" aria-hidden="true">↑</div>
       <strong>教材、讲义、录音、字幕或压缩包</strong>
       <p>PDF / DOCX / EPUB / TXT / MP3 / M4A / WAV / SRT / VTT / ZIP</p>
       <input id="file-picker" type="file" multiple accept=".pdf,.docx,.epub,.txt,.md,.mp3,.m4a,.ogg,.wav,.srt,.vtt,.zip" hidden>
       <button id="choose-files" type="button" class="button">选择本地文件</button>
       <p class="upload-small">仅展示本地所选文件名；不会上传、保存或读取文件内容。</p>
       <div class="files-chosen" id="selected-files" aria-live="polite"></div>
       </div></section>
      <section class="panel card-padding"><div class="panel-head"><h2>Google Drive 上传目录</h2><span class="badge">已创建目录</span></div>
        <p class="page-subtitle">你可以直接把全套教材和音频放进 YUNPAN / Language-Learning-Hub / 03-Personal / 00-Inbox。实际导入需等待受权后台扫描。</p>
        <p><a class="button" href="${inboxUrl}" target="_blank" rel="noopener noreferrer">打开 Google Drive（手动进入 Inbox）↗</a></p>
        <div class="info-list" style="margin-top:25px">
          <div class="info-row"><strong>原始文件</strong><span>01-Originals</span></div>
          <div class="info-row"><strong>结构化课程</strong><span>02-Converted</span></div>
          <div class="info-row"><strong>提取与匹配报告</strong><span>03-Import-Reports</span></div>
          <div class="info-row"><strong>导入状态</strong><span>未连接后台 · 不会自动同步</span></div>
        </div></section></div>
      <section class="panel card-padding" style="margin-top:18px"><div class="panel-head"><h2>教材转换流程</h2><small>待 Codex 实现的实际后端步骤</small></div>
      <div class="steps-flow"><div class="flow-step"><b>01 上传</b>检查类型和容量</div>
      <div class="flow-step"><b>02 解析</b>正文、表格、练习与答案</div>
      <div class="flow-step"><b>03 匹配</b>章节、音频、字幕</div>
      <div class="flow-step"><b>04 审核</b>原件与转换稿对照</div>
      <div class="flow-step"><b>05 入库</b>用户批准后保存个人课程</div></div>
      <div class="note warning">重要：当前此步骤图没有触发任何导入操作。不能将选择文件、上传成功、转换完成或审核通过混为同一种状态。</div></section>
      <p class="footer-note">用户教材及录音不得自动上传至公开 GitHub；课程全文和原件必须留在获授权的私人存储中。</p>`;
  const input=document.getElementById("file-picker");
  document.getElementById("choose-files").addEventListener("click",()=>input.click());
  input.addEventListener("change",()=>{
    const container=document.getElementById("selected-files");container.replaceChildren();
    for(const file of input.files||[]) {
      const label=document.createElement("div");label.className="chosen-file";
      label.textContent=file.name+" · "+(file.size/1024/1024).toFixed(2)+" MB · 未上传";
      container.append(label);
    }
  });
}
function renderSources() {
  outlet.innerHTML=sectionTitle("教学资源库","正版课程、开放资源与官方音频入口。资源可访问不等于允许再次公开上传。")+
  `<div class="two-column" id="source-grid"></div><p class="footer-note">此处仅是 4 个正版/开放来源的 UI 样例。完整资源索引由正式课程数据库提供。</p>`;
  const grid=document.getElementById("source-grid");
  for(const s of sourceItems){
    const node=document.createElement("article");node.className="panel card-padding";
    node.innerHTML=`<div class="panel-head"><h2>${escapeHTML(s.title)}</h2><span class="badge">${s.lang==="en"?"英语":"法语"}</span></div><p class="report-label">${escapeHTML(s.owner)}</p><p class="page-subtitle">${escapeHTML(s.rights)}</p><p><a class="inline-link" href="${escapeHTML(s.url)}" target="_blank" rel="noopener noreferrer">访问官方来源 ↗</a></p>`;
    grid.append(node);
  }
}
function renderArchitecture() {
  outlet.innerHTML=sectionTitle("系统架构","独立 GitHub 前端、YUNPAN 私人文件库、Supabase 权限与索引、受控 AI/音频模块。")+
  `<div class="arch-grid">
    <section class="arch-box"><h3>GitHub / 前端</h3><p>公开 React/Vite 应用、课程导航、完整课件阅读器、审核后的公开资源快照。禁止提交私人教材与 API 密钥。</p></section>
    <section class="arch-box"><h3>Google Drive / 私人教材</h3><p>保存所有原始 PDF/音频、个人授权材料、完整转换课件和导入报告。个人资料默认不能对外发布。</p></section>
    <section class="arch-box"><h3>Supabase / 权限与索引</h3><p>身份认证、RLS、单元索引、导入任务、用户进度、授权媒体定位与 AI API 网关。</p></section>
  </div>
  <section class="panel card-padding" style="margin-top:18px">
    <div class="panel-head"><h2>课程打开逻辑</h2><small>合约设计；尚未接入</small></div>
    <div class="steps-flow">
      <div class="arch-step">课程 ID / 版本</div>
      <div class="arch-step">元数据 + 访问权限</div>
      <div class="arch-step">解析公开或私人资产</div>
      <div class="arch-step">展示全部正文和附录</div>
      <div class="arch-step">音频、学习进度与 AI 扩展</div>
    </div>
    <div class="note">AI 生成内容属于独立附加层，不能覆盖教师教材原文；发音结果必须基于实测，无法确认时显示未评估。</div>
  </section>
  <section class="panel card-padding" style="margin-top:18px">
    <div class="panel-head"><h2>查看技术规范</h2></div>
    <div class="resource-list">
      <p><a href="https://github.com/ACIDCH/language-learning-hub/blob/design/ux-architecture-v3/docs/design-v3/architecture-and-contracts.md" target="_blank" rel="noopener noreferrer">数据结构、后端边界及导入任务状态 ↗</a></p>
      <p><a href="https://github.com/ACIDCH/language-learning-hub/blob/design/ux-architecture-v3/docs/design-v3/pages-and-states.md" target="_blank" rel="noopener noreferrer">前端页面、课程阅读器与导入工作流 ↗</a></p>
    </div>
  </section>`;
}

document.addEventListener("click",e=>{
  const target=e.target.closest("button");
  if(!target)return;
  if(target.dataset.page){
    state.page=target.dataset.page;state.query="";
    location.hash=state.page;
    render();document.getElementById("main").focus();return;
  }
  if(target.dataset.lang){
    state.language=target.dataset.lang;state.page="courses";state.track="writing-task2";state.level="A1";
    state.unitId=state.language==="fr"?"fr-a1-01":"en-writing-01";
    state.query="";location.hash="courses";render();return;
  }
  if(target.dataset.track){
    if(state.language==="en")state.track=target.dataset.track;
    else state.level=target.dataset.track;
    state.query="";state.unitId="";state.page="courses";location.hash="courses";render();return;
  }
  if(target.dataset.unit){
    state.unitId=target.dataset.unit;renderCourses();return;
  }
  if(target.dataset.jump){
    const section=document.getElementById("demo-"+target.dataset.jump);
    if(section)section.scrollIntoView({behavior:"smooth",block:"start"});
  }
});
document.addEventListener("input",e=>{
  if(e.target.id==="course-search" && !e.isComposing){
    state.query=e.target.value;
    updateCourseList(); // keep search input mounted; preserve IME/cursor
  }
});
window.addEventListener("hashchange",()=>{
  const next=location.hash.slice(1);
  if(["courses","materials","sources","architecture"].includes(next) && next!==state.page){
    state.page=next;state.query="";render();
  }
});
const first=location.hash.slice(1);
if(["courses","materials","sources","architecture"].includes(first))state.page=first;
render();

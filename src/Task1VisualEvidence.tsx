import './task1VisualEvidence.css';

/** Original task-specific figures backed by the exact authored lesson data, never an official IELTS sample. */
export type VisualExerciseId='en-process-report-grammar'|'en-map-change-lexicon';
export const VISUAL_EXERCISES={
 'en-process-report-grammar':{
  kind:'process',title:'废纸制成纸张 · 六阶段原创流程',
  items:['Used paper collected','Paper sorted','Mixed with water','Pulp cleaned','Pressed into sheets','Dried and packed']
 },
 'en-map-change-lexicon':{
  kind:'map',title:'学习场地规划变化 · 原创前后地图',
  sites:{
   north:{before:'Library',after:'Library',change:'unchanged'},
   east:{before:'Garden',after:'Study rooms',change:'replaced'},
   west:{before:'Car park',after:'Car park (extended westwards)',change:'extended'},
   centre:{before:'Footpath',after:'Footpath',change:'unchanged'}
  }
 }
} as const;
export function hasTask1VisualEvidence(id:string):id is VisualExerciseId{
 return id==='en-process-report-grammar'||id==='en-map-change-lexicon';
}

function ProcessDiagram(){
 const steps=VISUAL_EXERCISES['en-process-report-grammar'].items;
 return <svg className="task1-process-diagram" viewBox="0 0 780 410" role="img"
  aria-label="原创流程图，六步顺序：收集废纸，分类，加水搅拌，清洁纸浆，压成纸张，干燥并包装">
  <defs><marker id="task1-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="currentColor"/></marker></defs>
  {steps.map((label,i)=>{
   const top=i<3;
   const x=top?20+i*260:20+(5-i)*260;
   const y=top?40:264;
   return <g key={label} className="task1-flow-step" data-stage={i+1}>
    <rect x={x} y={y} width="220" height="98" rx="14"/>
    <text x={x+16} y={y+30} className="task1-flow-number">Step {i+1}</text>
    <text x={x+16} y={y+61} className="task1-flow-label">{label}</text>
   </g>;
  })}
  <g className="task1-flow-arrows" fill="none" stroke="currentColor" strokeWidth="2.5" markerEnd="url(#task1-arrow)">
   <path d="M240 89 H275"/><path d="M500 89 H535"/>
   <path d="M650 138 V253"/><path d="M540 313 H502"/>
   <path d="M280 313 H242"/>
  </g>
 </svg>;
}
function SiteMap({after}:{after:boolean}){
 const data=VISUAL_EXERCISES['en-map-change-lexicon'].sites;
 return <svg viewBox="0 0 450 360" className="task1-site-map" role="img"
  aria-label={after?'新地图：北侧图书馆不变，东侧学习室取代花园，西侧停车场向西扩建，中央步道不变':'旧地图：北侧图书馆，东侧花园，西侧停车场，中央步道'}>
  <rect x="20" y="22" width="410" height="316" rx="10" className="task1-site-boundary"/>
  <text x="224" y="17" className="task1-map-north">N ↑</text>
  <rect x="156" y="45" width="140" height="75" rx="8" className="task1-site-building"/>
  <text x="226" y="87" className="task1-map-label" textAnchor="middle">{after?data.north.after:data.north.before}</text>
  <path d="M20 170 H430" className="task1-site-path"/>
  <text x="225" y="160" textAnchor="middle" className="task1-map-secondary">{after?data.centre.after:data.centre.before} · unchanged</text>
  <rect x={after?27:65} y="206" width={after?162:124} height="91" rx="8" className="task1-site-carpark"/>
  <text x={after?108:127} y="246" textAnchor="middle" className="task1-map-label">{data.west.before}</text>
  {after&&<text x="108" y="272" textAnchor="middle" className="task1-map-secondary">Extended west ←</text>}
  <rect x="269" y="206" width="132" height="91" rx="8" className={after?'task1-site-building':'task1-site-garden'}/>
  <text x="335" y="249" textAnchor="middle" className="task1-map-label">{after?data.east.after:data.east.before}</text>
 </svg>;
}
export default function Task1VisualEvidence({lessonId}:{lessonId:string}){
 if(!hasTask1VisualEvidence(lessonId))return null;
 const isProcess=lessonId==='en-process-report-grammar';
 return <section className="task1-evidence" aria-label="本课实际视觉练习材料">
  <h3>{VISUAL_EXERCISES[lessonId].title}</h3>
  <p className="task1-evidence-caption">以下是本课原创练习图，不是 IELTS 官方试卷。根据图中明确标注的信息完成写作，不补充未提供的时间、数量或原因。</p>
  {isProcess?<ProcessDiagram/>:
   <div className="task1-map-compare">
    <figure><SiteMap after={false}/><figcaption>原有布局 · Before</figcaption></figure>
    <figure><SiteMap after/><figcaption>规划后布局 · After</figcaption></figure>
   </div>}
  <p className="task1-evidence-source">正式 IELTS Academic Task 1 可参阅
   <a href="https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test" target="_blank" rel="noopener noreferrer">IELTS 官方视觉写作样题</a>。
  </p>
 </section>;
}

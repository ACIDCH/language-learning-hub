import './task1VisualEvidence.css';
import {BORROWING_CHART} from './task1ChartData';

/** Original task-specific figures backed by the exact authored lesson data, never an official IELTS sample. */
export type VisualExerciseId='en-process-report-grammar'|'en-map-change-lexicon'|'en-chart-comparison';
export const VISUAL_EXERCISES={
 'en-chart-comparison':{kind:'chart',title:'借阅渠道占比 · 原创统计图与数据表'},
 'en-process-report-grammar':{
  kind:'process',title:'废纸制成纸张 · 六阶段原创流程',
  items:['Used paper collected','Paper sorted','Mixed into pulp','Pulp cleaned & spread','Pressed, then dried','Cut for reuse']
 },
 'en-map-change-lexicon':{
  kind:'map',title:'公共广场规划变化 · 与 Task 1 U06 原稿一致的前后地图',
  sites:{
   north:{before:'Car park',after:'Garden',change:'replaced'},
   east:{before:'Library',after:'Library',change:'unchanged'},
   west:{before:'Café',after:'Café (extended westwards)',change:'extended'},
   centre:{before:'No southern footpath',after:'New southern footpath',change:'added along south'}
  }
 }
} as const;
export function hasTask1VisualEvidence(id:string):id is VisualExerciseId{
 return id==='en-process-report-grammar'||id==='en-map-change-lexicon'||id==='en-chart-comparison';
}

function BorrowingChart(){
 const d=BORROWING_CHART;
 return <><svg viewBox="0 0 760 420" role="img" aria-label="2010、2015、2020年线上与校内借阅百分比柱图，精确数值见下方表格">
  <text x="30" y="26" fill="currentColor">{d.title} (%)</text>
  {[0,20,40,60,80,100].map(n=><g key={n}><line x1="60" x2="730" y1={340-n*2.6} y2={340-n*2.6} stroke="currentColor" opacity=".15"/><text x="16" y={345-n*2.6} fill="currentColor">{n}</text></g>)}
  {d.years.map((year,i)=><g key={year}><text x={120+i*220} y="370" fill="currentColor">{year}</text>{d.series.map((s,j)=><g key={s.name}>
   <rect x={95+i*220+j*70} y={340-s.values[i]*2.6} width="54" height={s.values[i]*2.6} fill={j?'#66819c':'#2457cc'}/><text x={107+i*220+j*70} y={330-s.values[i]*2.6} fill="currentColor">{s.values[i]}%</text>
  </g>)}</g>)}
  <text x="60" y="408" fill="currentColor">Left: Online · Right: On campus</text>
 </svg><table><caption>题目数据（虚构教学数据）</caption><thead><tr><th>Year</th>{d.series.map(s=><th key={s.name}>{s.name} (%)</th>)}</tr></thead><tbody>{d.years.map((y,i)=><tr key={y}><th scope="row">{y}</th>{d.series.map(s=><td key={s.name}>{s.values[i]}</td>)}</tr>)}</tbody></table></>;
}

function ProcessDiagram(){
 const steps=VISUAL_EXERCISES['en-process-report-grammar'].items;
 return <svg className="task1-process-diagram" viewBox="0 0 780 410" role="img"
  aria-label="原创流程图，六步顺序：收集废纸，分类，加水制浆，去除杂质并铺展，压出水分并干燥，裁切后再利用">
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
  aria-label={after?'新地图：北侧停车场改为花园，东侧图书馆不变，西侧咖啡馆向西扩建，南侧新增步道':'旧地图：北侧停车场，东侧图书馆，西侧咖啡馆，南侧没有步道'}>
  <rect x="20" y="22" width="410" height="316" rx="10" className="task1-site-boundary"/>
  <text x="224" y="17" className="task1-map-north">N ↑</text>
  <rect x="156" y="45" width="140" height="75" rx="8" className={after?'task1-site-garden':'task1-site-carpark'}/>
  <text x="226" y="87" className="task1-map-label" textAnchor="middle">{after?data.north.after:data.north.before}</text>
  {after&&<path d="M20 320 H430" className="task1-site-path"/>}
  <text x="225" y="309" textAnchor="middle" className="task1-map-secondary">{after?data.centre.after:data.centre.before}</text>
  <rect x={after?27:65} y="206" width={after?162:124} height="91" rx="8" className="task1-site-carpark"/>
  <text x={after?108:127} y="246" textAnchor="middle" className="task1-map-label">{after?'Café (extended)':data.west.before}</text>
  {after&&<text x="108" y="272" textAnchor="middle" className="task1-map-secondary">Extended café west ←</text>}
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
  {lessonId==='en-chart-comparison'?<BorrowingChart/>:isProcess?<ProcessDiagram/>:
   <div className="task1-map-compare">
    <figure><SiteMap after={false}/><figcaption>原有布局 · Before</figcaption></figure>
    <figure><SiteMap after/><figcaption>规划后布局 · After</figcaption></figure>
   </div>}
  <p className="task1-evidence-source">正式 IELTS Academic Task 1 可参阅
   <a href="https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test" target="_blank" rel="noopener noreferrer">IELTS 官方视觉写作样题</a>。
  </p>
 </section>;
}

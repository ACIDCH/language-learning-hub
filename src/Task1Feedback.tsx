import {VISUAL_EXERCISES,type VisualExerciseId} from './Task1VisualEvidence';
import {BORROWING_CHART} from './task1ChartData';
export const wordCount=(text:string)=>text.trim()?text.trim().split(/\s+/u).length:0;
/** Only flags literal numeric claims for source checking; never infers semantic correctness. */
export function numericEvidenceChecks(id:VisualExerciseId,writing:string):string[]{
 const claims=[...new Set(writing.match(/\b\d+(?:\.\d+)?\s*(?:%|°[CF])?/gu)||[])];
 if(id==='en-chart-comparison'){
  const values=BORROWING_CHART.series.flatMap(s=>s.values);
  return claims.flatMap(claim=>{
   const n=Number.parseFloat(claim);
   if(claim.includes('%')&&!values.includes(n))return [`“${claim}”不是表中直接给出的百分比；若为计算结果，请核对分母并说明计算依据。`];
   if(/^\d{4}$/u.test(claim)&&!BORROWING_CHART.years.includes(n))return [`“${claim}”不在观测年份中；不要把插值或推测年份写成图示事实。`];
   return [];
  });
 }
 return claims.filter(claim=>id==='en-map-change-lexicon'||!/^([1-6])$/u.test(claim)).map(claim=>`请核对“${claim}”：本图没有给出年份、比例、温度或耗时；不要把外部知识写成图示数据。`);
}
export function task1Evidence(id:VisualExerciseId):string[]{
 if(id==='en-process-report-grammar')return ['顺序：'+VISUAL_EXERCISES[id].items.join(' → '),'共六阶段；图中没有耗时、温度、产量或机器型号，不应添加这些事实。','描述流程，采用一般现在时；被动语态突出纸张如何被处理，不是列出六个无衔接短句。'];
 if(id==='en-map-change-lexicon')return Object.entries(VISUAL_EXERCISES[id].sites).map(([position,s])=>`${position}：${s.before} → ${s.after}（${s.change}）`).concat('描述规划后的布局，不能写成已完成施工；图中没有建筑尺寸或年份。');
 const d=BORROWING_CHART;
 return [...d.years.map((y,i)=>`${y}：${d.series.map(s=>s.name+' '+s.values[i]+'%').join(' / ')}`),
  `线上占比增加 ${d.series[0].values[2]-d.series[0].values[0]} 个百分点；不是同等数值的相对百分比增幅。`,
  '2010、2015年校内占多数；2020年线上占多数。没有逐年数据，不能断言具体交叉年份。','占比变化不能证明借阅总量或变化原因；避免补造因果关系。'];
}
export default function Task1Feedback({lessonId,writing}:{lessonId:VisualExerciseId;writing:string}){
 const n=wordCount(writing);
 const checks=numericEvidenceChecks(lessonId,writing);
 return <section className="task1-feedback" aria-label="依据材料核对写作"><h4>按材料核对</h4>
  <p>{n} 词。{n<150?`完整 Task 1 至少150词，还差 ${150-n} 词。`:'已达到最低字数；字数合格不代表内容或语言正确。'}</p>
  <p>以下是逐项核对依据，不是自动语义批改或官方 Band。请将自己的句子与材料对照后修订。</p>
  {checks.length>0&&<div className="task1-numeric-checks"><strong>本次输入中需要核对的数字</strong><ul>{checks.map(c=><li key={c}>{c}</li>)}</ul></div>}
  <ol>{task1Evidence(lessonId).map(s=><li key={s}>{s}</li>)}</ol>
  <ul><li>任务完成：是否概括主要特征，并用材料中的具体细节支持？</li><li>连贯：是否按阶段、位置或年份分组，而非逐项罗列？</li><li>词汇：是否准确区分 change、replace、share、percentage points 等含义？</li><li>语法：时态、主谓一致和比较结构是否与图示对应？</li></ul>
 </section>;
}

import {useState} from 'react';
import Task1VisualEvidence from './Task1VisualEvidence';
import type {VisualExerciseId} from './Task1VisualEvidence';
import Task1Feedback from './Task1Feedback';
import {CHART_MODEL} from './task1ChartData';
import {SPECIALTY_LESSONS} from './specialtyLibrary';
import {useStudyResponses} from './studyResponses';
export const TASK1_WORKSHOPS:Record<string,VisualExerciseId>={
 'en-ielts-writing-task1-u03':'en-chart-comparison',
 'en-ielts-writing-task1-u05':'en-process-report-grammar',
 'en-ielts-writing-task1-u06':'en-map-change-lexicon'};
export default function Task1WritingWorkshop({courseId}:{courseId:string}){
 const saved=useStudyResponses(courseId+':task1');const [checked,setChecked]=useState(false);
 const id=TASK1_WORKSHOPS[courseId];if(!id)return null;
 const unit=SPECIALTY_LESSONS.find(s=>s.id===id);
 const model=id==='en-chart-comparison'?CHART_MODEL:unit?.model||[];
 return <section aria-label="完整图示写作练习" className="task1-workshop">
  <Task1VisualEvidence lessonId={id}/>
  <p>用至少150词概括主要特征，并进行适当比较。图表数据及场地均为本课虚构练习材料。</p>
  <label>我的 Task 1 全文<textarea rows={9} disabled={!saved.ready} value={saved.get('writing')} onChange={e=>{saved.set('writing',e.target.value);setChecked(false);}}/></label>
  <button type="button" disabled={!saved.get('writing').trim()} onClick={()=>setChecked(true)}>核对本次写作与源材料</button>
  {checked&&<Task1Feedback lessonId={id} writing={saved.get('writing')}/>}
  <details><summary>查看完整范文与中文</summary>{model.map((p,i)=><div className="reception-parallel" key={i}><p lang="en">{p.target}</p><p lang="zh-Hans">{p.zh}</p></div>)}</details>
 </section>;
}

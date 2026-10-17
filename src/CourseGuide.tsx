import {countGuideCompleted,getUnitGuide,GUIDE_ITEMS,type PracticeCheck} from './courseGuide';
export default function CourseGuide({courseId,check,onChange,disabled}:{
 courseId:string;check:PracticeCheck;onChange:(next:PracticeCheck)=>void;disabled:boolean;
}){
 const unit=getUnitGuide(courseId);
 if(!unit)return null;
 return <section className="course-study-guide" aria-label="当前主课程学习目标和复练记录">
  <div className="course-guide-head">
    <div><h3>本课学习目标与复练计划</h3>
      <p>{unit.language.toUpperCase()} · {unit.level} · {unit.title}</p></div>
    <span>{countGuideCompleted(check)}/3 已确认</span>
  </div>
  <p className="course-can-do">{unit.can_do}</p>
  <div className="course-guide-fields">
    <div><h4>语法／表达重点</h4><ul>{unit.grammar.map((x,i)=><li key={i}>{x}</li>)}</ul></div>
    <div><h4>核心词汇领域</h4><ul>{unit.vocabulary_domains.map((x,i)=><li key={i}>{x}</li>)}</ul></div>
  </div>
  <div className="course-guide-task">
    <strong>本课最终表达任务</strong>
    <p>{unit.performance_task}</p>
  </div>
  <p><strong>发音关注：</strong>{unit.pronunciation_focus}</p>
  <fieldset className="course-guide-checks" disabled={disabled}>
    <legend>学完正文后自行勾选，点击上方“保存到 Supabase”同步</legend>
    {GUIDE_ITEMS.map(item=><label key={item.key}>
      <input type="checkbox" checked={check[item.key]===true}
        onChange={e=>onChange({...check,[item.key]:e.target.checked})}/>
      {item.label}
    </label>)}
  </fieldset>
  <p className="cloud-disclaimer">
    这些目标来自原始课程设计大纲，仅作为学习导航，不代表实际正文、配套音频或语法内容已经专业审校。
    三项自评完成也不等于达到相应 CEFR/IELTS 等级。
  </p>
 </section>;
}

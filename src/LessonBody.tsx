/** Display-only grouping: never rewrites lesson text or changes its learning-stage ordering. */
export default function LessonBody({text}:{text:string}){
 const blocks=text.replace(/\r\n?/g,'\n').split(/\n[ \t]*\n+/).filter(piece=>piece.trim().length);
 return <div className="lesson-paragraphs lesson-content-flow">
  {blocks.map((block,i)=>{
   const cue=/^(?:目标|阅读|听力文本|练习|例句|常见错误|任务|参考答案|解析|表达任务|要点|语法|词汇|文化提示|示范对话)[：:]/u.test(block.trimStart());
   return <p className={cue?'lesson-content-group lesson-content-group--cue':'lesson-content-group'} key={i}>{block}</p>;
  })}
 </div>;
}

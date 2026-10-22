import type {Course,LessonContent} from './v44Courses';
/** Genre-specific instructional scaffolding rooted in each course's own context.
 * It does not create fictitious source translations or grading results. */
export type OutputGuide={task:string;steps:string[];criteria:string[]};
export function outputGuide(course:Course,content:LessonContent):OutputGuide{
 const d=content.draft,u=content.foundation;
 const context=d?.context||u?.goal||course.goal;
 const lexical=(d?.vocabulary||u?.vocab||[]).slice(0,3).map(([w,zh])=>w+'（'+zh+'）').join('、');
 const common=['完成后核对是否回答了题目','用本课词汇准确表达','检查至少一处词语或语法错误'];
 if(course.language==='fr'){
  const level=course.level||'A1';
  const high=/B[12]|C[12]/u.test(level);
  return {task:high?'围绕本课情境，用法语写一段约 100—150 词的连贯叙述或观点；体现时间、逻辑或条件关系。':
    '结合本课情境，用法语写 5—8 个相互衔接的句子，或模拟一段简短对话。',
   steps:['先用中文确认需要传达的主要信息：'+context,
    '从本课词汇中挑选至少三个：'+lexical,
    '用已学句型写出第一句，再逐句增加地点、时间或理由',
    '朗读自己的完整表达；需要练某句时直接选中原文并使用右侧工具'],
   criteria:[...common,'确认法语名词性数与冠词一致','检查句子顺序和连接方式']};
 }
 if(course.id.includes('listening'))return{
  task:'听读本课材料，完成一份结构笔记，然后用 80—120 词英语复述讲述者的主要观点。',
  steps:['第一遍找主旨和讲座结构：'+context,'第二遍记录两至三个关键事实及转折或限制','用自己的英文复述，不照抄整段原文','核对复述语气是否超出了原文证据'],
  criteria:[...common,'区别讲者观点与给出的示例','不要把 may/could 的可能性擅自改成必然']};
 if(course.id.includes('reading'))return{
  task:'阅读本课文本后，选择一个主旨判断，并写出两条有出处的原文证据和中文解释。',
  steps:['先快速阅读确定主题：'+context,'标出关键转折、因果或限定表达','写下主旨判断与相应原文句','解释为什么其他可能答案不够准确'],
  criteria:[...common,'依据整段含义而非重复关键词作答','证据必须来自本课阅读材料']};
 if(course.id.includes('writing-task1'))return{
  task:'依据本课材料写一段约 120—150 词的客观说明，包含总览、关键变化和必要细节。',
  steps:['先确定材料中总体趋势或过程：'+context,'总览中只表达整体特征','主体比较两到三个真正重要的数据点或步骤','逐一核对数字、单位、时态和比较关系'],
  criteria:[...common,'不要编造题目未提供的原因','区分数值终点和变化幅度']};
 if(course.id.includes('writing-task2'))return{
  task:'围绕本课主题写一段完整论证，至少包含观点、理由、具体例子与适用条件。',
  steps:['明确自己的主张：'+context,'写一句解释“为什么”或“如何产生这一影响”','加入清楚标记的具体或假设例子','用条件或例外限定结论，避免绝对化'],
  criteria:[...common,'理由不能只是换个说法重复观点','假设例子不能当作真实研究数据']};
 if(course.id.includes('speaking'))return{
  task:'就本课问题录制 45—75 秒英文回答，先明确观点，再给理由、例子和合理限定。',
  steps:['明确问题所在的情境：'+context,'先用一句话直接回答','给出一项具体理由及例子','尝试加入一个合理例外，选中原文后在右侧面板复练'],
  criteria:[...common,'不要只回答 it depends','句子之间有清楚的逻辑衔接']};
 return {task:'用本课知识编写一个自然连贯的短段落，并说明至少两处语法或词汇选择的理由。',
  steps:['结合情境确定要说什么：'+context,'选择三个本课词语：'+lexical,
   '将两个短句合并或改写为更准确的表达','解释为什么所选语法结构适用'],
  criteria:[...common,'复杂度不能代替意思准确','保持句子间逻辑关系']};
}
export function exampleVocabulary(example:string,vocabulary:string[][]):string[]{
 const lower=example.toLocaleLowerCase();
 return vocabulary.filter(([w])=>w&&lower.includes(w.toLocaleLowerCase())).slice(0,5)
  .map(([w,m])=>w+'：'+m);
}

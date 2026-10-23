import type {SpecialtyLesson,LearningSection} from './specialtyLibrary';
import {UPGRADE_RECEPTION} from './upgradeReception';
import {UPGRADE_ADDITIONS} from './upgradeReceptionAdditions';
import {UPGRADE_GRAMMAR_EXAMPLES} from './upgradeExamples';
import {UPGRADE_VOCABULARY} from './upgradeVocabulary';
const titles:Record<string,[string,string,string,string]>={
 '01':['从句关系与信息范围','限制性从句','非限定信息','从修饰到逻辑关系'],
 '02':['时态、时间框架与证据','过去动作','完成时与报告现在时','语法不替代证据'],
 '03':['词族位置与学术搭配','动词、名词与修饰语','搭配与可数性','问题与结论边界'],
 '04':['忠实改写与逻辑等值','人群范围','程度与因果','语态改变与意义核对'],
 '05':['限定语与可行动判断','同时变化的因素','暂定建议','具体不确定性'],
 '06':['名词化与信息组织','恢复执行者与动作','名词回指与衔接','压缩后的证据检查'],
 '07':['指代与主题推进','多个先行对象','具体名词回指','旧信息到新话题'],
 '08':['纠错规则与迁移','主语中心词','条件明确的修订规则','风格与事实分开'],
};
export const UPGRADE_SPECIALTIES:SpecialtyLesson[]=Object.keys(UPGRADE_ADDITIONS).flatMap(n=>{
 const id='en-ielts-language-upgrade-u'+n,lesson=UPGRADE_RECEPTION[id],a=UPGRADE_ADDITIONS[n];
 const sections:LearningSection[]=a.blocks.map(([,zh],i)=>({
  title:titles[n][i+1],concept:zh,pattern:lesson.languageNotes[i].target,
  examples:UPGRADE_GRAMMAR_EXAMPLES[n].slice(i*2,i*2+2).map(([target,zh,analysis])=>({target,zh,analysis})),
  caution:a.questions[i][3],
 }));
 return (['grammar','vocabulary'] as const).map(type=>({
  id:'en-upgrade-u'+n+'-'+type,type,language:'en',level:'B2',unitLink:id,
  title:'Language Upgrade '+n+' · '+titles[n][0]+(type==='grammar'?'：句法与修订':'：词义与搭配'),
  subtitle:lesson.genre,prerequisite:'能够识别完整英语句子的主语和谓语；先阅读本课 P1，再比较修改。',
  objective:lesson.task,sections:type==='grammar'?sections:UPGRADE_VOCABULARY[n],
  questions:lesson.questions.map(q=>({question:q.prompt,answer:q.answer,why:q.why})),
  output:lesson.task,
  model:lesson.paragraphs.slice(0,2).map((p,i)=>({target:p.target,zh:p.zh,analysis:i===0?'保留原稿的完整分析示范。':'解释原句的适用条件；迁移例句不能当作新研究结果。'})),
  sourceNote:'对应 content/lesson-drafts/'+id+'.json 的原文；分析与例句为项目原创教学补充，独立人审待完成。',referenceUrls:[],
 } satisfies SpecialtyLesson));
});

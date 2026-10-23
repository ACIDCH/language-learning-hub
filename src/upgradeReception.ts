import type {ReceptionLesson} from './receptionLessons';
import type {LessonDraft} from './v44Courses';
import {UPGRADE_ADDITIONS} from './upgradeReceptionAdditions';
const sources=import.meta.glob<LessonDraft>('../content/lesson-drafts/en-ielts-language-upgrade-*.json',{eager:true,import:'default'});
const first:Record<string,[string,string]>={
 '01':['首句是否说所有学生都早到？','没有，只限定早到的那一部分学生。'],
 '02':['In 2020 后为什么用 collected？','明确的过去时段定位了已经完成的动作。'],
 '03':['填空 The team conducted an ___ of the observations。','analysis；an 后需名词。'],
 '04':['指出错误改写中的两项失真。','部分受访者变成所有工作者；较低压力变成完全消除压力。'],
 '05':['原文提出哪种竞争解释？','参与者获得了更多完成时间。'],
 '06':['改写 The implementation of the change was carried out by staff。','Staff implemented the change. / 工作人员实施了改变。'],
 '07':['this change 指什么？','加入一条更安静的通道。'],
 '08':['改正 The number of visitors have increased。','The number of visitors has increased. / 访客数量增加了。'],
};
const notes:Record<string,[string,string][] >={
 '01':[['who arrived early','限制性从句确定早到的学生群体；不能无条件加逗号。'],['Although X, Y','虽然 X，仍 Y。让步关系与名词限定关系不同。'],['Because X, Y','因为 X，所以 Y。因果需要根据，不能仅靠改写增加。']],
 '02':[['In 2020, the team collected…','明确过去时间与一般过去时相配。'],['Since then, the team has expanded…','此后至今的发展与当前范围相连。'],['The report compares…','现在时说明本报告的内容或功能。']],
 '03':[['analyse / analysis / analytical','动词／名词／形容词，位置不同。'],['conduct research / carry out a study','开展研究／进行一项研究；一般 research 不可数，study 可以数。'],['raise a question ≠ settle a question','提出问题不等于解决问题，不能凭学术词汇扩大结果。']],
 '04':[['some respondents ≠ all workers','部分受访者不等于所有工作者。'],['lower stress ≠ no stress','压力较低不等于完全没有压力。'],['associated with ≠ caused by','相关不等于因果，改写必须保留关系力度。']],
 '05':[['suggests that… may…','提示……可能……。指出哪项推论不确定，而不是机械堆限定词。'],['favour provisionally','暂时倾向采用，允许后续证据改变判断。'],['could reflect either change','可能反映任一变化；这里 could 表可能而非过去能力。']],
 '06':[['The team revised the form.','团队修订了表格。主动版保留执行者与动作。'],['This revision reduced compulsory fields.','这次修订减少必填项。名词化回指已介绍的动作。'],['Changes happened.','发生了变化。虽然短，却丢失了原稿中的具体主体和对象。']],
 '07':[['after the planning team revised the proposal','规划团队修订提案之后；明示执行者去除 they 的歧义。'],['This change addressed one concern.','这项改变回应了一项顾虑，不是所有问题。'],['It did not resolve maintenance funding.','它没有解决养护资金问题；保留原文的效果范围。']],
 '08':[['The number of visitors has increased.','数量这一中心词为单数，使用 has。'],['A number of visitors have arrived.','若干访客已经到达。a number of 表若干，采用复数一致。'],['Required correction / optional style choice','必要纠错与可选风格建议分开；形式正确不验证事实。']],
};
export const UPGRADE_RECEPTION:Record<string,ReceptionLesson>=Object.fromEntries(Object.entries(UPGRADE_ADDITIONS).map(([n,a])=>{
 const id='en-ielts-language-upgrade-u'+n,d=sources['../content/lesson-drafts/'+id+'.json'];
 return [id,{title:d.title,language:'en',genre:'原稿语言分析与分步修订',
  paragraphs:[{id:'P1',target:d.reading,zh:a.zh},...a.blocks.map(([target,zh],i)=>({id:'P'+(i+2),target,zh}))],
  questions:[{prompt:d.questions[0].prompt+' / '+first[n][0],answer:d.questions[0].answer+' / '+first[n][1],evidence:['P1'],why:d.questions[0].explanation+' 先核对原句，再说明修改保留或改变了什么。'},...a.questions.map(([prompt,answer,evidence,why])=>({prompt,answer,evidence:[evidence],why}))],
  languageNotes:notes[n].map(([target,zh])=>({target,zh})),
  task:d.context+' 选择自己写的一句，记录原句、修订句、中文意思和修改理由。用另一主题造句，检查规则能否迁移。',
  model:d.reading,modelZh:a.zh,references:[],
 } satisfies ReceptionLesson];
}));

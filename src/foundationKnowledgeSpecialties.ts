import {FOUNDATION_UNITS} from './foundationCurriculum';
import {FOUNDATION_CHINESE} from './foundationChinese';
import {FOUNDATION_OUTPUT_MODELS} from './foundationOutputModels';
import {FOUNDATION_QUESTION_CHINESE} from './foundationQuestionChinese';
import {EN_FOUNDATION_KNOWLEDGE} from './foundationEnglishKnowledge';
import {FR_FOUNDATION_KNOWLEDGE} from './foundationFrenchKnowledge';
import type {LearningExample,SpecialtyLesson,SpecialtyLevel} from './specialtyLibrary';

/** Adapt existing manuscripts once; do not replace source IDs, questions or progression. */
export const FOUNDATION_SPECIALTIES:SpecialtyLesson[]=FOUNDATION_UNITS.flatMap(u=>{
 const index=Number(u.id.slice(-2))-1;
 const authored=(u.language==='en'?EN_FOUNDATION_KNOWLEDGE:FR_FOUNDATION_KNOWLEDGE)[index];
 const zh=FOUNDATION_CHINESE[u.id],out=FOUNDATION_OUTPUT_MODELS[u.id];
 const questions=FOUNDATION_QUESTION_CHINESE[u.id];
 const level:SpecialtyLevel=u.level==='Pre-A1'?'Pre-A1':u.level.includes('A2')?'A2':'A1';
 return (['grammar','vocabulary'] as const).map(type=>({
  id:u.id+'-'+type,type,language:u.language,level,unitLink:u.id,
  title:u.title+(type==='grammar'?'：结构与用法':'：词块与辨析'),
  subtitle:u.level+' 基础课程 · '+u.goal,objective:u.goal,
  prerequisite:index===0?'从本课开始；字母名称、拼写与词内实际发音分别练习。':`先学习 ${u.language}-fnd-${String(index).padStart(2,'0')}，再完成本课情境和原文听读。`,
  sections:authored.examples.map(([target,translation,analysis],i)=>{
   const source:LearningExample=u.examples[i].length>8?
    {target:u.examples[i],zh:zh.examples[i],analysis:u.concepts[i]}:
    {target:u.listening,zh:zh.listening,analysis:u.pronunciation};
   return {title:`${i+1}. ${type==='grammar'?['形式与含义','变式与条件','语境与易混点'][i]:['词义与词性','常用搭配','对比与应用'][i]}`,
    concept:type==='grammar'?u.concepts[i]+' '+analysis:authored.lexicon[i]+' '+analysis,
    pattern:type==='grammar'?u.examples[i]:u.vocab.slice(i===0?0:i+1,i===0?2:i+2).map(([w,t])=>w+'：'+t).join('；'),
    examples:[source,{target,zh:translation,analysis:type==='grammar'?analysis:authored.lexicon[i]}],
    caution:type==='grammar'?u.commonMistake:authored.lexicon[i],
    ...(type==='vocabulary'&&i===0?{table:{title:'保留本课全部原始词汇',columns:['原词','原释义'],rows:u.vocab,note:'下文结合词块和句子辨析；原词表未被替换。'}}:{}),
   };
  }),
  questions:u.questions.map((q,i)=>({question:q.prompt+(q.prompt===questions[i].prompt?'':'\n'+questions[i].prompt)+'\n'+q.choices.map((c,j)=>'ABC'[j]+'. '+c).join('\n'),
   answer:q.choices[q.answer]+' — '+questions[i].choices[q.answer],
   why:q.explanation+' '+questions[i].choices.map((c,j)=>'ABC'[j]+'：'+c).join('；')})),
  output:u.production,
  model:[{target:u.reading,zh:zh.reading,analysis:'原课短读文，用于先练复述；不是个人表达任务的完整答案。'},
   {target:out.target,zh:out.zh,analysis:out.check}],
  referenceUrls:[],sourceNote:'保留项目基础原稿 '+u.id+' 的规则、例句、词表、练习和短读文；补充原创双语对比例句与独立任务示范。尚未取得独立人工教学审校。',
 } satisfies SpecialtyLesson));
});

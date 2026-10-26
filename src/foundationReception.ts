import {FOUNDATION_UNITS} from './foundationCurriculum';
import {FOUNDATION_CHINESE} from './foundationChinese';
import type {ReceptionLesson} from './receptionLessons';

/** These are progressive source blocks, not four invented paragraphs or an IELTS essay.
 * Keep source text byte-for-byte: translation corrections cannot silently edit manuscripts. */
export const FOUNDATION_RECEPTION:Record<string,ReceptionLesson>=Object.fromEntries(FOUNDATION_UNITS.map(u=>{
 const zh=FOUNDATION_CHINESE[u.id];
 return [u.id,{
  title:u.title,language:u.language,genre:'基础渐进语料：例句 → 句型 → 听力 → 短读文',
  paragraphs:[
   {id:'EX1',target:u.examples[0],zh:zh.examples[0]},
   {id:'EX2',target:u.examples.slice(1).join('\n'),zh:zh.examples.slice(1).join('\n')},
   {id:'LISTEN',target:u.listening,zh:zh.listening},
   {id:'READ',target:u.reading,zh:zh.reading},
  ],
  languageNotes:u.examples.map((target,i)=>({target,zh:zh.examples[i]})),
  questions:[
   {prompt:'不看中文，复述 LISTEN 中的信息，再核对人物、动作、否定和数字。',answer:zh.listening,evidence:['LISTEN'],why:'参考答案保留这段听力的完整意思。先核对是否漏掉问句或否定，再核对具体信息；不能把 READ 中新增的细节移入听力答案。'},
   {prompt:'把 READ 的内容用中文完整说出来，再选一句用原语言重述。',answer:zh.reading,evidence:['READ'],why:'按短读文的顺序核对信息。例句与听力是同一主题的不同练习，不能因为出现相同词语，就把它们的人物、数量或时间当作读文事实。'},
  ],
  task:'先用原语言复述 READ，再完成本课表达页的个人任务。复述保留文中信息；个人表达可以换成自己的真实经历。',
  model:u.reading,modelZh:zh.reading,references:[],
 } satisfies ReceptionLesson];
}));

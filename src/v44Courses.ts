import metadata from '../config/curriculum/units.v2.json';
import index from '../content/v44-main-index.json';
import manifest from '../public/learning-assets/manifest.json';
import {FOUNDATION_UNITS} from './foundationCurriculum';
import type {FoundationUnit} from './foundationTypes';
export type Course={id:string;language:string;level:string;track:string;title:string;unit:number;kind:'main'|'foundation';status:'existing_original'|'original_draft';goal:string};
export type LessonDraft={id:string;title:string;goal:string;prerequisite:string|null;context:string;grammar:string;common_mistake:string;vocabulary:string[][];examples:{text:string;note:string}[];reading:string;listening_script:string;listening_label:string;questions:{prompt:string;answer:string;explanation:string}[];pronunciation:string;production:string;self_review:string;source:string};
export type LessonContent={text:string;sources:string[];vocabulary:string[][];draft?:LessonDraft;foundation?:FoundationUnit;appendices:{title:string;text:string}[]};
const loaders=import.meta.glob<{default:LessonDraft}>('../content/lesson-drafts/*.json');
export const COURSES:Course[]=[...metadata.units.map(u=>({id:u.id,language:u.language,level:u.level,track:u.track||u.level,title:u.title,unit:u.unit,kind:'main' as const,status:index.find(i=>i.id===u.id)!.content_status as Course['status'],goal:u.can_do})),
 ...FOUNDATION_UNITS.map((u,i)=>({id:u.id,language:u.language,level:u.level,track:Number(u.id.slice(-2))>12?'基础 A2 衔接':'零基础',title:u.title,unit:i%24+1,kind:'foundation' as const,status:'existing_original' as const,goal:u.goal}))];
export function draftText(d:LessonDraft){return [d.title,'原创草稿 · 待审校\n'+d.source,'目标：'+d.goal,'先修：'+(d.prerequisite||'本轨道起点'),
 '① 情境\n'+d.context,'② 语法\n'+d.grammar+'\n常见错误：'+d.common_mistake+'\n'+d.examples.map((e,i)=>`${i+1}. ${e.text}\n${e.note}`).join('\n'),
 '③ 词汇\n'+d.vocabulary.map(([w,m])=>w+' — '+m).join('\n'),'④ 听读\n阅读：\n'+d.reading+'\n\n'+d.listening_label+'\n'+d.listening_script+'\n\n'+d.questions.map((q,i)=>`${i+1}. ${q.prompt}\n参考答案：${q.answer}\n解析：${q.explanation}`).join('\n\n'),
 '⑤ 发音\n'+d.pronunciation,'⑥ 表达\n'+d.production+'\n'+d.self_review].join('\n\n');}
export function foundationText(u:FoundationUnit){return [u.title,'已有原创基础课程 · 教学审校待完成','目标：'+u.goal,
 '① 情境\n'+u.goal,'② 语法\n'+u.concepts.join('\n\n')+'\n\n例句：\n'+u.examples.join('\n')+'\n常见错误：'+u.commonMistake,
 '③ 词汇\n'+u.vocab.map(([w,m])=>w+' — '+m).join('\n'),'④ 听读\n听力文本（设备 TTS 可用，未匹配教材音频）：\n'+u.listening+'\n\n阅读：\n'+u.reading+'\n\n'+u.questions.map((q,i)=>`${i+1}. ${q.prompt}\n${q.choices.join(' / ')}\n参考答案：${q.choices[q.answer]}\n解析：${q.explanation}`).join('\n\n'),
 '⑤ 发音\n'+u.pronunciation,'⑥ 表达\n'+u.production].join('\n\n');}
async function assetText(id:string,signal?:AbortSignal){
 const a=manifest.assets.find(a=>a.id===id);if(!a)throw Error('缺少原稿索引 '+id);
 const r=await fetch('/'+a.path.replace(/^public\//,''),{signal});if(!r.ok)throw Error('原稿读取失败 '+r.status);
 const text=await r.text();return {title:a.title,text,source:a.path};
}
export async function loadCourse(course:Course,signal?:AbortSignal):Promise<LessonContent>{
 if(course.kind==='foundation'){const u=FOUNDATION_UNITS.find(u=>u.id===course.id)!;return {text:foundationText(u),sources:['src/foundation'+(u.language==='fr'?'French':'English')+(course.unit>12?'Bridge':'')+'.ts'],vocabulary:u.vocab,foundation:u,appendices:[]};}
 const row=index.find(i=>i.id===course.id)!;
 const appendices=await Promise.all(row.supplements.map(id=>assetText(id,signal)));
 if(row.public_sources.length){const originals=await Promise.all(row.public_sources.map(id=>assetText(id,signal)));return {text:originals[0].text,sources:originals.map(x=>x.source),vocabulary:[],appendices:[...originals.slice(1),...appendices]};}
 const draft=(await loaders['../content/lesson-drafts/'+course.id+'.json']()).default;
 return {text:draftText(draft),sources:[row.draft_path!],vocabulary:draft.vocabulary,draft,appendices};
}
export function courseRoute(c:Course,tab='read'){return '/?course='+encodeURIComponent(c.id)+'&tab='+tab;}
export function catalogRoute(language='',track=''){const p=new URLSearchParams();if(language)p.set('language',language);if(track)p.set('track',track);return '/'+(p.size?'?'+p:'');}
export const languageName=(language:string)=>({en:'英语',fr:'法语'}[language]||language.toUpperCase());

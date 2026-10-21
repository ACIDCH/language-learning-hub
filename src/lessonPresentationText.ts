import {splitLessonStages,STUDY_STAGES} from './lessonStages';

/** Learner-facing projection only. The raw manuscript, backups and source registry are unchanged. */
const ADMIN_LINE=[
 /^状态\s*[:：]\s*教学内容/u,
 /^课程权利与来源\s*[:：]?/u,
 /^课程资源\s*[:：]?\s*$/u,
 /^课程导入\s*$/u,
 /^【V\d+(?:\.\d+)?\s*校订与入门补充】/iu,
 /^原创草稿\s*[·•]/u,
 /^本补充包只追加在原课件后面/u,
 /^所有原始教材内容仍保留出处与版权分类/u,
 /^上述对话、阅读、例句和讲解均为本项目原创示范/u,
 /^=====.*(?:ADDENDUM|END\s+FR-|补充版本).*=====/iu,
 /^https?:\/\/\S+$/iu,
 /^FR-[A-Z0-9-]+\s*[｜|].*(?:完整样课|v\d+(?:\.\d+)?)/iu,
 /^配套听力\s*[:：].*(?:授权绑定|资源在核对)/u
];
function isAdministrativeLine(line:string):boolean{
 const clean=line.trim();
 return ADMIN_LINE.some(pattern=>pattern.test(clean))||
  (/^(?:原创完整样课|版权声明|审校状态)\s*[:：]/u.test(clean))||
  (/^(?:课程资源|课程权利与来源)\s*[:：]/u.test(clean));
}
/** Removes authoring/release metadata; never rewrites normal lesson sentences or exercises. */
export function learnerFacingText(text:string):string{
 const canonical=text.replace(/\r\n?/gu,'\n');
 const lines:string[]=[];
 let skippingSources=false;
 for(const sourceLine of canonical.split('\n')){
  const line=sourceLine.trim();
  if(/^课程权利与来源\s*[:：]?/u.test(line)){skippingSources=true;continue;}
  if(skippingSources){
   if(/^=====.*ADDENDUM/iu.test(line)||/^[①②③④⑤⑥]\s/u.test(line)){skippingSources=false;}
   else continue;
  }
  if(isAdministrativeLine(line))continue;
  lines.push(sourceLine);
 }
 return lines.join('\n').replace(/\n{3,}/gu,'\n\n').trim();
}
/** Public/private historical files contain 6 sections: omit archived speaking step in reading views. */
export function learnerFacingLessonText(text:string):string{
 const lesson=splitLessonStages(text);
 if(!lesson.structured)return learnerFacingText(text);
 return STUDY_STAGES.map(id=>{
  const section=lesson.stages[id];
  return section?.body?learnerFacingText(section.body):'';
 }).filter(Boolean).join('\n\n');
}
/** Short target-language utterances only. Never attempt to assign phonetics to Chinese editorial text. */
export function pronunciationPassages(text:string):string[]{
 const lines=learnerFacingLessonText(text).split(/\n+/gu);
 const passages:string[]=[];
 for(const source of lines){
  const line=source.trim()
   .replace(/^#{1,6}\s+/u,'')
   .replace(/^(?:\d{1,2}[.)、]\s*|[-•*]\s*)/u,'')
   .replace(/^([AB]\s*:\s*)/u,'');
  if(!line||/^(?:[①②③④⑤⑥]|https?:|课程|来源|状态|答案\s*[:：])/u.test(line))continue;
  // Prefer a whole foreign-language utterance when a bilingual source puts a translation after it.
  const candidate=line.split(/(?=[\u3400-\u9fff])/u)[0].trim()
   .replace(/^(?:原创对话|原创建模例句|阅读材料|参考答案)\s*[:：]\s*/u,'');
  const words=candidate.match(/[A-Za-zÀ-ÿ]+(?:['’\-][A-Za-zÀ-ÿ]+)*/gu)||[];
  if(words.length<3||candidate.length<15)continue;
  if(/[\u3400-\u9fff]/u.test(candidate))continue;
  if(/^(?:FR-A1|V0\.\d|A1\b|B1\b)/iu.test(candidate))continue;
  let remaining=candidate;
  while(remaining.length>240){
   const breakAt=Math.max(remaining.lastIndexOf(' ',240),0);
   const cut=breakAt>90?breakAt:240;
   passages.push(remaining.slice(0,cut).trim());
   remaining=remaining.slice(cut).trim();
  }
  if(remaining)passages.push(remaining);
 }
 return [...new Set(passages)];
}

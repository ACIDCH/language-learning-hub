import data from './mainOriginalChineseData.json';
import {RECEPTION_LESSONS} from './receptionLessons';
const rows=data as Record<string,{target:string;zh:string}>;
/** Full-paragraph translations only; never infer a sentence translation from its position. */
export function mainOriginalChinese(id:string,text:string):string|undefined{
 const authored=rows[id];
 if(authored?.target===text)return authored.zh;
 return RECEPTION_LESSONS[id]?.paragraphs.find(p=>p.target===text)?.zh;
}

import {describe,expect,it} from 'vitest';
import {readFileSync} from 'node:fs';
import {RECEPTION_LESSONS} from '../src/receptionLessons';

/** Manually compared original P1 meaning boundaries. Passing these regression
 * guards is not a substitute for independent educational review. */
const sourcePairs=[
 ['en-ielts-speaking-u01','a quiet library desk is not suitable','安静的图书馆座位就不合适'],
 ['en-ielts-speaking-u02','adjust the seasoning','调整调味'],
 ['en-ielts-speaking-u03','had left early','出门早'],
 ['en-ielts-speaking-u04','prepare a piece of clay','准备一块陶土'],
 ['en-ielts-speaking-u05','protected cycle lane','隔离自行车道'],
 ['en-ielts-speaking-u06','agreed response times','约定回复时限'],
 ['en-ielts-speaking-u07','transcript cannot establish','转写文本不能证明'],
 ['en-ielts-speaking-u08','staffing or budget constraints','人员或预算限制'],
 ['en-ielts-language-upgrade-u01','This restrictive clause','限制性从句'],
 ['en-ielts-language-upgrade-u02','thirty volunteers','三十名志愿者'],
 ['en-ielts-language-upgrade-u03','number of desks occupied','被占用的桌子'],
 ['en-ielts-language-upgrade-u04','Some respondents associated','一些受访者'],
 ['en-ielts-language-upgrade-u05','participants also received more time','参与者也获得了更多'],
 ['en-ielts-language-upgrade-u06','the team revised the form','团队修订了表格'],
 ['en-ielts-language-upgrade-u07','maintenance funding','养护资金'],
 ['en-ielts-language-upgrade-u08','verb should be has','动词应为 has']
] as const;
describe('IELTS Speaking and Language Upgrade source-to-Chinese coherence',()=>{
 it('protects 16 original English-P1 and Chinese-P1 semantic anchors',()=>{
  expect(new Set(sourcePairs.map(([id])=>id)).size).toBe(16);
  for(const [id,englishFact,chineseFact] of sourcePairs){
   const source=JSON.parse(readFileSync('content/lesson-drafts/'+id+'.json','utf8'));
   const unit=RECEPTION_LESSONS[id];
   expect(source.reading,id).toContain(englishFact);
   expect(unit,id).toBeDefined();
   expect(unit.paragraphs[0].id,id).toBe('P1');
   expect(unit.paragraphs[0].target,id).toBe(source.reading);
   expect(unit.paragraphs[0].zh,id).toContain(chineseFact);
   expect(unit.model,id).toBe(source.reading);
   expect(unit.modelZh,id).toBe(unit.paragraphs[0].zh);
   expect(unit.paragraphs.length,id).toBe(4);
   expect(unit.questions.some(q=>q.evidence.includes('P1')),id).toBe(true);
   expect(unit.questions.every(q=>q.evidence.every(p=>unit.paragraphs.some(x=>x.id===p))),id).toBe(true);
  }
 });
 it('does not turn speech transcription into a claim about prosody or pronounce a universal result',()=>{
  const u7=RECEPTION_LESSONS['en-ielts-speaking-u07'];
  expect(u7.paragraphs[0].target).toContain('transcript cannot establish whether the intended focus was audible');
  expect(u7.paragraphs[0].zh).toContain('转写文本不能证明预期焦点');
  const u8=RECEPTION_LESSONS['en-ielts-speaking-u08'];
  expect(u8.paragraphs[0].target).toContain('essential services should consider hours that match local needs');
  expect(u8.paragraphs[0].zh).toContain('基本服务应考虑与当地需求相符的开放时间');
  const l4=RECEPTION_LESSONS['en-ielts-language-upgrade-u04'];
  expect(l4.paragraphs[0].target).toContain('Some respondents');
  expect(l4.paragraphs[0].zh).toContain('部分受访者');
  expect(l4.paragraphs[0].zh).toContain('所有工作者');
 });
});

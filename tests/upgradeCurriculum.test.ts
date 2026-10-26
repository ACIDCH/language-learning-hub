import {expect,it} from 'vitest';
import {readFileSync} from 'node:fs';
import {UPGRADE_RECEPTION} from '../src/upgradeReception';
import {UPGRADE_SPECIALTIES} from '../src/upgradeSpecialties';
import {linkedSpecialties,specialtyQuality} from '../src/specialtyLibrary';
it('maps every upgrade source into bilingual reading and two authored knowledge tracks',()=>{
 expect(Object.keys(UPGRADE_RECEPTION).sort()).toEqual(Array.from({length:8},(_,i)=>'en-ielts-language-upgrade-u0'+(i+1)));
 expect(UPGRADE_SPECIALTIES).toHaveLength(16);
 for(const [id,u] of Object.entries(UPGRADE_RECEPTION)){
  const source=JSON.parse(readFileSync('content/lesson-drafts/'+id+'.json','utf8'));
  expect(u.paragraphs[0].target).toBe(source.reading);
  expect(u.model).toBe(source.reading);expect(u.modelZh).toBe(u.paragraphs[0].zh);
  expect(u.paragraphs.map(p=>p.id)).toEqual(['P1','P2','P3','P4']);
  expect(u.questions.map(q=>q.evidence)).toEqual([['P1'],['P2'],['P3'],['P4']]);
  for(const type of ['grammar','vocabulary'] as const){
   const topic=UPGRADE_SPECIALTIES.find(t=>t.unitLink===id&&t.type===type)!;
   expect(linkedSpecialties(type,id)).toContain(topic);
   expect(specialtyQuality(topic),topic.id).toBe(true);
   expect(topic.sections.flatMap(s=>s.examples)).toHaveLength(6);
  }
 }
});
it('keeps the pre-existing conditional topic explicitly marked as transfer',()=>{
 const old=linkedSpecialties('grammar','en-ielts-language-upgrade-u01').find(t=>t.id==='en-conditionals')!;
 expect(old.subtitle).toContain('跨情境迁移');
 expect(old.sections).toHaveLength(3);
});
it('preserves quantities, competing explanations and meaning boundaries across all eight units',()=>{
 const u=(n:string)=>UPGRADE_RECEPTION['en-ielts-language-upgrade-u'+n];
 expect(u('01').questions[3].answer).toContain('causal claim');
 expect(u('02').paragraphs[0].zh).toContain('三十名志愿者');
 expect(u('02').paragraphs[0].zh).toContain('一个工作周');
 expect(u('03').questions[3].answer).toContain('measurement question');
 expect(u('04').questions[2].answer).toContain('Lower stress becomes no stress');
 expect(u('05').questions[1].answer).toContain('Instructions and available time');
 expect(u('05').questions[3].answer).toContain('proposed check');
 expect(u('06').questions[3].answer).toContain('Not from');
 expect(u('07').questions[2].answer).toContain('Maintenance funding');
 expect(u('08').paragraphs[1].target).toContain('A number of visitors have arrived');
 expect(u('08').questions[3].answer).toContain('factual verification is separate');
});

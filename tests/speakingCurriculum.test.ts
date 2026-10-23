import {expect,it} from 'vitest';
import {readFileSync} from 'node:fs';
import {SPEAKING_RECEPTION} from '../src/speakingReception';
import {SPEAKING_SPECIALTIES} from '../src/speakingSpecialties';
import {linkedSpecialties,specialtyQuality} from '../src/specialtyLibrary';
it('keeps each speaking source, full model and both independently usable teaching tracks',()=>{
 expect(Object.keys(SPEAKING_RECEPTION).sort()).toEqual(Array.from({length:8},(_,i)=>'en-ielts-speaking-u0'+(i+1)));
 expect(SPEAKING_SPECIALTIES).toHaveLength(16);
 for(const [id,lesson] of Object.entries(SPEAKING_RECEPTION)){
  const source=JSON.parse(readFileSync('content/lesson-drafts/'+id+'.json','utf8'));
  expect(lesson.paragraphs[0].target).toBe(source.reading);
  expect(lesson.model).toBe(source.reading);
  expect(lesson.modelZh).toBe(lesson.paragraphs[0].zh);
  expect(lesson.questions.map(q=>q.evidence)).toEqual([['P1'],['P2'],['P3'],['P4']]);
  for(const type of ['grammar','vocabulary'] as const){
   const topics=linkedSpecialties(type,id);expect(topics).toHaveLength(1);
   expect(specialtyQuality(topics[0]),id+type).toBe(true);
   expect(topics[0].model[0].target).toBe(source.reading);
   expect(topics[0].sections.flatMap(x=>x.examples)).toHaveLength(6);
  }
 }
});
it('protects the original transport chronology and comparison dimensions',()=>{
 const narrative=SPEAKING_RECEPTION['en-ielts-speaking-u03'];
 expect(narrative.paragraphs[0].target).toContain('twenty minutes');
 expect(narrative.paragraphs[0].zh).toContain('二十分钟');
 expect(narrative.paragraphs[2].target).toContain('No. The passenger showed me a footpath');
 const comparison=SPEAKING_RECEPTION['en-ielts-speaking-u05'];
 expect(comparison.questions[0].answer).toContain('moved closer');
 expect(comparison.questions[1].answer).toContain('Predictability');
 expect(comparison.paragraphs[1].target).toContain('go beyond the experience');
});
it('does not turn pronunciation practice into a transcription score or erase correction scope',()=>{
 const speech=SPEAKING_RECEPTION['en-ielts-speaking-u07'];
 expect(speech.questions[3].answer).toContain('no invented phoneme score');
 expect(speech.paragraphs[3].zh).toContain('无法确定');
 const repair=SPEAKING_RECEPTION['en-ielts-speaking-u08'];
 expect(repair.questions[1].answer).toContain('essential services');
 expect(repair.questions[2].answer).toContain('No');
 expect(repair.paragraphs[2].zh).toContain('不是用一组考虑替代另一组');
});

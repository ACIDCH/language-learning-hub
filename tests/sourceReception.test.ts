import {expect,it} from 'vitest';
import {readFileSync} from 'node:fs';
import {RECEPTION_LESSONS} from '../src/receptionLessons';
it('retains Reading U02 original A–F paragraphs, units, answers and conditional recommendation',()=>{
 const source=readFileSync('public/learning-assets/en-ielts-reading-u02-v1.txt','utf8');
 const original=[...source.matchAll(/\*\*([A-F])\.\*\* ([^\r\n]+)/g)].map(m=>({id:m[1],target:m[2]}));
 const lesson=RECEPTION_LESSONS['en-ielts-reading-u02'];
 expect(lesson.paragraphs.map(({id,target})=>({id,target}))).toEqual(original);
 expect(lesson.questions[1].answer).toContain('Not Given');
 expect(lesson.questions[1].evidence).toEqual(['B']);
 expect(lesson.questions[2].answer).toContain('36 of 60');
 expect(lesson.questions[4].answer).toContain('desk closed at eight');
 expect(lesson.questions[5].answer).toContain('Not Given');
 expect(lesson.model.split(/\s+/).length).toBeGreaterThanOrEqual(130);
 expect(lesson.model.split(/\s+/).length).toBeLessThanOrEqual(170);
 expect(lesson.paragraphs[3].zh).toContain('并不能证明');
});
it('preserves Reading U01 main/addendum boundaries and all source sentences',()=>{
 const source=readFileSync('public/learning-assets/en-ielts-reading-u01.txt','utf8');
 const lesson=RECEPTION_LESSONS['en-ielts-reading-u01'];
 expect(lesson.paragraphs.map(p=>p.id)).toEqual(['MAIN','ADD1','ADD2','ADD3']);
 for(const p of lesson.paragraphs)expect(source.includes(p.target)).toBe(true);
 expect(lesson.questions[0].evidence).toEqual(['MAIN']);
 expect(lesson.questions[1].answer).toContain('difficulty');
 expect(lesson.paragraphs[2].zh).toContain('回应的机会');
 expect(lesson.paragraphs[3].zh).toContain('隐私和公平');
});
it('extends the tree lecture without replacing may with measured success',()=>{
 const lesson=RECEPTION_LESSONS['en-ielts-listening-u01'];
 expect(lesson.paragraphs[1].target).toContain('may help reduce heat');
 expect(lesson.paragraphs[2].target).toContain('water, space and the choice of species');
 expect(lesson.questions[3].answer).toContain('Survival rates');
 expect(lesson.model).toContain('does not give a measured temperature change');
 expect(lesson.paragraphs.map(p=>p.target).join(' ').split(/\s+/).length).toBeGreaterThan(350);
});

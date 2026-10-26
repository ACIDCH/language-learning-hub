import {it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {FR_B2_SOURCE_RECEPTION} from '../src/frB2SourceReception';
import {RECEPTION_LESSONS} from '../src/receptionLessons';
import {linkedSpecialties,specialtyQuality} from '../src/specialtyLibrary';
it('connects all B2 knowledge pairs and keeps the U03 transfer source explicit',()=>{
 for(let n=1;n<=10;n++) for(const type of ['grammar','vocabulary'] as const){
  const id='fr-b2-u'+String(n).padStart(2,'0'),units=linkedSpecialties(type,id);
  expect(units.length,id+type).toBeGreaterThanOrEqual(1);expect(units.every(specialtyQuality),id+type).toBe(true);
 }
 const u=linkedSpecialties('vocabulary','fr-b2-u03').find(x=>x.id==='fr-b2-u03-vocabulary')!;
 expect(u.sourceNote).toContain('独立迁移例');
 expect(u.model[0].target).toBe(RECEPTION_LESSONS['fr-b2-u03'].paragraphs[0].target);
 expect(u.sections[1].caution).toContain('不是 Valmont');
});
it('preserves nine exact B2 source readings and keeps existing U03 separate',()=>{
 expect(Object.keys(FR_B2_SOURCE_RECEPTION).sort()).toEqual(['01','02','04','05','06','07','08','09','10'].map(n=>'fr-b2-u'+n));
 for(const [id,r] of Object.entries(FR_B2_SOURCE_RECEPTION)){
  const d=JSON.parse(readFileSync('content/lesson-drafts/'+id+'.json','utf8'));
  expect(r.paragraphs[0].target).toBe(d.reading);expect(r.model).toBe(d.reading);expect(RECEPTION_LESSONS[id]).toBe(r);
 }
 expect(FR_B2_SOURCE_RECEPTION['fr-b2-u03']).toBeUndefined();
 expect(RECEPTION_LESSONS['fr-b2-u03'].paragraphs[2].target).toContain('si le projet était adopté');
});
it('keeps uncertainty, dates, measurements and source attribution intact',()=>{
 const text=(n:string)=>FR_B2_SOURCE_RECEPTION['fr-b2-u'+n].paragraphs.map(p=>p.target).join(' ');
 expect(text('01')).toContain('pas une autorisation générale');
 expect(text('02')).toContain('sans fréquence chiffrée');
 expect(text('04')).toContain('sans garantir');
 expect(text('05')).toContain('pas une campagne de mesures');
 expect(text('06')).toContain('18 novembre');expect(text('06')).toContain('d’ici vendredi'.replace('’',"'"));
 expect(text('07')).toContain('pas nécessairement des visiteurs différents');
 expect(text('08')).toContain('aucun tableau de scores');
 expect(text('09')).toContain('ne donne pas cette date');
 expect(text('10')).toContain('proposition du second document');
});

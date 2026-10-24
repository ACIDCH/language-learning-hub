import {it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {FR_B2_SOURCE_RECEPTION} from '../src/frB2SourceReception';
import {RECEPTION_LESSONS} from '../src/receptionLessons';
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

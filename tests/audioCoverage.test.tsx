import {describe,expect,it} from 'vitest';
import {audioCoverage} from '../src/AudioCoverage';

describe('honest audio coverage',()=>{
 const index=[
  {asset_id:'legacy-a',course_id:'fr-a1-u01',source_kind:'synthetic_practice',audio_verified:false,decoded:true},
  {asset_id:'legacy-b',course_id:'fr-a1-u01',source_kind:'synthetic_practice',audio_verified:false,decoded:true},
  {asset_id:'reference-1',course_id:null,source_kind:'open_reference',audio_verified:false,decoded:true},
  {asset_id:'reference-2',course_id:null,source_kind:'open_reference',audio_verified:false,decoded:true},
  {asset_id:'mapped-reference',course_id:'fr-a1-u02',source_kind:'open_reference',audio_verified:false,decoded:true}
 ];
 it('distinguishes uploaded old-version audio from still-unmapped open reference material',()=>{
  const result=audioCoverage(index,['legacy-a.mp3','mapped-reference.mp3'],'fr-a1-u01');
  expect(result.total).toBe(5);
  expect(result.privateUploads).toBe(1);
  expect(result.referenced).toBe(3);
  expect(result.unmapped).toBe(2);
  expect(result.unmappedReference).toBe(2);
  expect(result.selectedPractice).toBe(2);
  expect(result.selectedPracticeUploads).toBe(1);
  expect(result.verified).toBe(0);
 });
 it('never counts an unrelated uploaded reference as a matching old-version lesson audio',()=>{
  const result=audioCoverage(index,['mapped-reference.mp3'],'fr-a1-u02');
  expect(result.selectedAssets).toBe(1);
  expect(result.selectedUploads).toBe(1);
  expect(result.selectedPractice).toBe(0);
  expect(result.selectedPracticeUploads).toBe(0);
  expect(result.unmappedReference).toBe(2);
 });
 it('reports an empty index without claiming any audio exists',()=>{
  const result=audioCoverage([],[],'fr-a1-u01');
  expect(result.noDatabaseRows).toBe(true);
  expect(result.selectedPractice).toBe(0);
  expect(result.unmappedReference).toBe(0);
  expect(result.verified).toBe(0);
 });
});

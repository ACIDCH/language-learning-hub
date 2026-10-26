import {describe,expect,it} from 'vitest';
import {cleanup,fireEvent,render,screen} from '@testing-library/react';
import {audioCoverage} from '../src/AudioCoverage';
import {ReferenceAudio} from '../src/ReferenceAudio';

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


describe('course-specific reference audio controls',()=>{
 it('clears stale clip range, looping and errors when the selected course changes',()=>{
  const {container,rerender}=render(<ReferenceAudio lessonId="fr-a1-u01"/>);
  const media=container.querySelector('audio')!;
  media.currentTime=2;
  fireEvent.click(screen.getByRole('button',{name:'设定 A 点'}));
  media.currentTime=8;
  fireEvent.click(screen.getByRole('button',{name:'设定 B 点'}));
  const loop=screen.getByRole('button',{name:/片段循环/});
  expect(loop.hasAttribute('disabled')).toBe(false);
  fireEvent.click(loop);
  expect(loop.getAttribute('aria-pressed')).toBe('true');
  fireEvent.error(media);
  expect(screen.getByRole('alert')).toBeTruthy();

  rerender(<ReferenceAudio lessonId="fr-a1-u02"/>);
  expect(container.querySelector('audio')).not.toBe(media);
  const fresh=screen.getByRole('button',{name:/片段循环/});
  expect(fresh.getAttribute('aria-pressed')).toBe('false');
  expect(fresh.hasAttribute('disabled')).toBe(true);
  expect(screen.getByText(/A — 秒 · B — 秒/)).toBeTruthy();
  expect(screen.queryByRole('alert')).toBeNull();
  expect(container.querySelector('audio')?.getAttribute('src')).toContain('/020.mp3');
  cleanup();
 });
});


it('resets playback speed for each independent reference recording and retains rate after media metadata loads',()=>{
 const {container,rerender}=render(<ReferenceAudio lessonId="fr-a1-u01"/>);
 const old=container.querySelector('audio')!;
 const select=screen.getByRole('combobox',{name:'播放速度'}) as HTMLSelectElement;
 expect(select.value).toBe('1');
 fireEvent.change(select,{target:{value:'1.25'}});
 expect(select.value).toBe('1.25');
 expect(old.playbackRate).toBe(1.25);
 rerender(<ReferenceAudio lessonId="fr-a1-u02"/>);
 const newAudio=container.querySelector('audio')!;
 expect(newAudio).not.toBe(old);
 const currentSelect=screen.getByRole('combobox',{name:'播放速度'}) as HTMLSelectElement;
 expect(currentSelect.value).toBe('1');
 fireEvent.loadedMetadata(newAudio);
 expect(newAudio.playbackRate).toBe(1);
 cleanup();
});

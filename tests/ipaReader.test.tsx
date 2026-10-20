import {act,cleanup,fireEvent,render,screen,waitFor} from '@testing-library/react';
import {afterEach,describe,expect,it,vi} from 'vitest';
import IpaText from '../src/IpaText';
import IpaStudio from '../src/IpaStudio';
import LessonReader from '../src/LessonReader';
import SpeechPractice from '../src/SpeechPractice';
import {clearIpaCache,decodePuaIpa,normalizeIpaLocale,sliceIpaText,splitIpaRuns,toIpaLine} from '../src/ipaEngine';

const mockPhoneme=vi.fn((text:string,_options:{language:'en'|'fr'})=>({
 tokens:text==='bonjour'?['bɔ̃','ʒ','u','ʁ']:text==='read'?['ɹ','iː']:['ˈ','h','ɛ','l','oʊ']
}));
vi.mock('@piper-plus/g2p',()=>({
 G2P:{create:vi.fn(async()=>({phonemize:mockPhoneme}))}
}));
afterEach(()=>{cleanup();clearIpaCache();mockPhoneme.mockClear();});

describe('browser-native IPA engine and whole-text alignment',()=>{
 it('decodes French composite nasal IPA instead of showing unreadable PUA glyphs',()=>{
  expect(decodePuaIpa(['b','\uE058','ʒ','u','ʁ'])).toBe('bɔ̃ʒuʁ');
  expect(decodePuaIpa(['\uE01E','\uE056','\uE057','\uE063'])).toBe('yɛ̃ɑ̃œ̃');
  expect(decodePuaIpa(['\uE031'])).toContain('\uFFFD');
 });
 it('uses English and French locales, including New Zealand/GB support',()=>{
  expect(normalizeIpaLocale('en')).toBe('en-US');
  expect(normalizeIpaLocale('en-NZ')).toBe('en-GB');
  expect(normalizeIpaLocale('fr-CA')).toBe('fr-FR');
 });
 it('splits large lessons without dropping or changing any original characters',()=>{
  const raw="Hello, my name is Chloé. Bonjour !\n"+'This is a long word list. '.repeat(80);
  expect(sliceIpaText(raw).join('')).toBe(raw);
  expect(sliceIpaText(raw).every(x=>x.length<=240)).toBe(true);
 });
 it('preserves Chinese teaching notes and processes foreign words separately',async()=>{
  const raw='中文解释 Bonjour，发音';
  expect(splitIpaRuns(raw).map(x=>x.source).join('')).toBe(raw);
  const res=await toIpaLine(raw,'fr');
  expect(res.units.map(u=>u.source).join('')).toBe(raw);
  expect(res.units.some(u=>u.kind==='plain'&&u.source.includes('中文'))).toBe(true);
  expect(mockPhoneme).toHaveBeenCalledWith('Bonjour',{language:'fr'});
 });
 it('always binds generated IPA to the correct original token and falls back to plain on errors',async()=>{
  const first=await toIpaLine('bonjour','fr');
  expect(first.units).toEqual([{source:'bonjour',ipa:'bɔ̃ʒuʁ',kind:'mapped'}]);
  mockPhoneme.mockImplementationOnce((_text:string,_opts:{language:'en'|'fr'})=>{
   throw new Error('unknown word');
  });
  const bad=await toIpaLine('unknown','en');
  expect(bad.units).toEqual([{source:'unknown',ipa:'',kind:'plain'}]);
 });
 it('preserves accented French names and uses requested English regional voice',async()=>{
  await toIpaLine('Chloé','fr-FR');
  expect(mockPhoneme).toHaveBeenCalledWith('Chloé',{language:'fr'});
  await toIpaLine('read','en-GB');
  expect(mockPhoneme).toHaveBeenCalledWith('read',{language:'en'});
 });
});

describe('full-text learning UI',()=>{
 it('generates line-by-line IPA without losing original course words',async()=>{
  render(<IpaText text={'bonjour\n中文说明'} language="fr"/>);
  await waitFor(()=>expect(screen.getByText('bonjour')).toBeTruthy());
  const content=screen.getByLabelText('参考国际音标与课程原文');
  expect(content.textContent).toContain('bɔ̃ʒuʁ');
  expect(content.textContent).toContain('中文说明');
 });
 it('keeps the original manuscripts until IPA is requested and switches with stage',async()=>{
  render(<LessonReader text={'Bonjour, nous allons bien.'}
    courseId="fr-a1-u01" language="fr" stage={0} onChangeStage={()=>{}}/>);
  expect(screen.getByText('Bonjour, nous allons bien.')).toBeTruthy();
  fireEvent.click(screen.getByRole('checkbox',{name:/显示 IPA/}));
  await waitFor(()=>expect(screen.getByLabelText('参考国际音标与课程原文')).toBeTruthy());
  expect(screen.getByLabelText('参考国际音标与课程原文').textContent)
   .toContain('Bonjour, nous allons bien.');
 });
 it('keeps a long IPA phoneme reference independently dismissible from the lesson text',()=>{
  render(<LessonReader text="Bonjour, comment allez-vous ?\n\nJe m’appelle Marie."
   courseId="fr-a1-u01" language="fr" stage={0} onChangeStage={()=>{}}/>);
  const control=screen.getByLabelText('课程原文音标控制');
  const menu=screen.getByText('法语音标表');
  const details=menu.closest('details')!;
  expect(control.querySelector('.ipa-reference-dock')).not.toBeNull();
  expect(details.open).toBe(false);
  fireEvent.click(menu);
  expect(details.open).toBe(true);
  expect(screen.getByText('法语口元音')).toBeTruthy();
  expect(screen.getByRole('article',{name:'完整课程原文'}).textContent).toContain('Bonjour, comment allez-vous ?');
  fireEvent.pointerDown(document.body);
  expect(details.open).toBe(false);
  fireEvent.click(menu);
  expect(details.open).toBe(true);
  fireEvent.keyDown(document,{key:'Escape'});
  expect(details.open).toBe(false);
 });
 it('does not phonemize without explicit opt-in in ordinary shadowing mode',()=>{
  render(<SpeechPractice language="fr" initialTarget="bonjour"/>);
  expect(screen.getByRole('checkbox',{name:/实时显示 IPA/})).toBeTruthy();
  expect(screen.queryByLabelText('参考国际音标与课程原文')).toBeNull();
  expect(mockPhoneme).not.toHaveBeenCalled();
 });
 it('updates lesson IPA when target is edited',async()=>{
  render(<SpeechPractice language="fr" initialTarget="bonjour"/>);
  fireEvent.click(screen.getByRole('checkbox',{name:/实时显示 IPA/}));
  await waitFor(()=>expect(screen.getByLabelText('参考国际音标与课程原文')).toBeTruthy());
  fireEvent.change(screen.getByRole('textbox'),{target:{value:'Chloé'}});
  await waitFor(()=>expect(screen.getByLabelText('参考国际音标与课程原文').textContent).toContain('Chloé'));
 });
});

describe('no-login whole-document IPA lab',()=>{
 it('accepts arbitrary full text, switches language and reveals live IPA without a remote API',async()=>{
  render(<IpaStudio/>);
  const input=screen.getByRole('textbox',{name:'待注音的原文'}) as HTMLTextAreaElement;
  fireEvent.change(input,{target:{value:'bonjour'}});
  expect(input.value).toBe('bonjour');
  expect(screen.queryByLabelText('参考国际音标与课程原文')).toBeNull();
  fireEvent.click(screen.getByRole('button',{name:'显示全文 IPA 音标'}));
  await waitFor(()=>expect(screen.getByLabelText('参考国际音标与课程原文').textContent).toContain('bɔ̃ʒuʁ'));
  expect(screen.getByRole('button',{name:'隐藏 IPA 音标'})).toBeTruthy();
 });
});

import React from 'react';
import {afterEach,describe,expect,it,vi} from 'vitest';
import {cleanup,fireEvent,render,screen} from '@testing-library/react';
import SpeechLab from '../src/SpeechLab';
import SelectionInspector from '../src/SelectionInspector';
import {AISettingsProvider} from '../src/AISettings';
afterEach(()=>{cleanup();vi.clearAllMocks();});
describe('approved speaking workspace and existing reader selection panel',()=>{
 it('feeds a selected practice sentence into the shared controls and analysis',()=>{
  render(<AISettingsProvider><SpeechLab language="fr"/></AISettingsProvider>);
  expect(screen.getByRole('heading',{name:'跟读训练',level:1})).toBeTruthy();
  expect(screen.getByRole('region',{name:'练习句子列表'}).querySelectorAll('button').length).toBeGreaterThan(3);
  fireEvent.click(screen.getByRole('button',{name:/Je m’appelle Marie/}));
  expect((screen.getByRole('textbox',{name:'跟读目标文本'}) as HTMLTextAreaElement).value).toContain('Je m’appelle Marie');
  expect(screen.getByRole('button',{name:'🎙 开始跟读'})).toBeTruthy();
  expect(screen.getByRole('region',{name:'识别与发音分析结果'})).toBeTruthy();
  expect(screen.getByText('AI 辅助讲解')).toBeTruthy();
  expect(screen.queryByLabelText('跟读四步')).toBeNull();
 });
 it('keeps every action in a single existing selection tool aside',()=>{
  render(<AISettingsProvider><SelectionInspector
   selection={{text:'Bonjour',context:'Bonjour, comment allez-vous ?'}} language="fr"
   courseId="fr-a1-u01" vocabulary={[]} session={null} rate={.85}
   onClose={vi.fn()} onNote={vi.fn()} onFavorite={vi.fn()}/></AISettingsProvider>);
  const aside=screen.getByRole('complementary',{name:'选词工具'});
  expect(aside.querySelectorAll('aside')).toHaveLength(0);
  expect((aside.querySelector('textarea[aria-label="跟读目标文本"]') as HTMLTextAreaElement).value).toBe('Bonjour');
  expect(screen.getByRole('navigation',{name:'选词面板工具'})).toBeTruthy();
  expect(screen.getByRole('region',{name:'识别与发音分析结果'})).toBeTruthy();
  fireEvent.click(screen.getByRole('button',{name:'AI 讲解'}));
  expect(aside.textContent).toContain('AI 辅助讲解');
  expect(document.querySelectorAll('aside[aria-label="选词工具"]')).toHaveLength(1);
  fireEvent.click(screen.getByRole('button',{name:'跟读',exact:true}));
  expect(screen.getByRole('button',{name:'🎙 开始跟读'})).toBeTruthy();
 });
});

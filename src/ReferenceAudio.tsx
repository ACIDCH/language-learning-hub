import { useRef, useState } from 'react';
import data from '../config/assets/lesson-audio.json';
import './audio.css';

export function ReferenceAudio({ lessonId }: { lessonId: string }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [failed, setFailed] = useState(false);
  const [start, setStart] = useState<number | null>(null);
  const [end, setEnd] = useState<number | null>(null);
  const [loop, setLoop] = useState(false);
  const item = data.mappings.find(x => x.lesson_id === lessonId);
  if (!item) return null;
  const validLoop = start !== null && end !== null && end > start + 0.2;
  return <section className="reference-audio" aria-label="开放教材词汇参考音频">
    <h3>词汇参考音频 · {item.title}</h3>
    <p>Français interactif · 第 {item.official_chapter} 章 · {Math.round(item.duration_seconds)} 秒</p>
    <p>这段录音用于词汇听辨与跟读。完整情境配音、逐句时间对齐及语言审校尚未完成。</p>
    <audio ref={audio} controls preload="none" src={item.source_url}
      onError={() => setFailed(true)}
      onTimeUpdate={() => { if (loop && validLoop && audio.current && audio.current.currentTime >= end!) audio.current.currentTime = start!; }} />
    {failed && <p role="alert">音频暂不可用，请打开下方官方资源。课程正文仍可阅读。</p>}
    <div className="audio-controls">
      <label>播放速度 <select defaultValue="1" onChange={e => { if (audio.current) audio.current.playbackRate = Number(e.target.value); }}>
        <option value="0.75">0.75×</option><option value="1">1×</option><option value="1.25">1.25×</option>
      </select></label>
      <button onClick={() => { setStart(audio.current?.currentTime ?? 0); setLoop(false); }}>设定 A 点</button>
      <button onClick={() => { setEnd(audio.current?.currentTime ?? 0); setLoop(false); }}>设定 B 点</button>
      <button disabled={!validLoop} aria-pressed={loop} onClick={() => { if (!loop && audio.current && start !== null) audio.current.currentTime = start; setLoop(!loop); }}>片段循环 {loop ? '开启' : '关闭'}</button>
      <span aria-live="polite">A {start?.toFixed(1) ?? '—'} 秒 · B {end?.toFixed(1) ?? '—'} 秒</span>
    </div>
    <p><a href={item.transcript_url} target="_blank" rel="noopener noreferrer">官方词表与录音 ↗</a></p>
    <details><summary>查看完整配套词表</summary>
      <table><caption>原站词表；未作逐词时间对齐</caption><thead><tr>{item.transcript_columns.map((label,i)=><th key={i}>{label}</th>)}</tr></thead>
        <tbody>{item.transcript.map((row,i)=><tr key={i}><td lang="fr">{row[0]}</td><td>{row.slice(1).join(' · ')}</td></tr>)}</tbody>
      </table>
    </details>
    <small>{item.attribution} <a href={item.rights_url}>CC BY 3.0 · 来源许可</a></small>
  </section>;
}

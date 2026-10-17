import test from 'node:test';
import assert from 'node:assert/strict';
import {analyzeTranscript,practiceHint} from '../src/speechCompare.ts';

test('perfect transcription is 100% (not a pronunciation score)',()=>{
 const r=analyzeTranscript('Bonjour, comment allez-vous ?', 'Bonjour comment allez vous');
 assert.equal(r.similarity,100);
 assert.equal(r.matched,4);
 assert.equal(r.missing,0);
 assert.equal(r.substituted,0);
 assert.match(practiceHint(r),/重音/);
});
test('accents and apostrophe forms do not create fake spoken errors',()=>{
 const r=analyzeTranscript("Je m'appelle Chloé.", "Je m'appelle Chloe");
 assert.equal(r.similarity,100);
 assert.equal(r.matched,3);
});
test('wrong and missing words are visibly separate',()=>{
 const r=analyzeTranscript('je vais à la bibliothèque','je vais au bibliothèque');
 assert.equal(r.missing,1);
 assert.equal(r.substituted,1);
 assert.equal(r.expected.length,5);
 assert.ok(r.expected.some(x=>x.status==='missing'));
 assert.ok(r.expected.some(x=>x.status==='substitution'));
});
test('extra words lower similarity without falsely dropping target words',()=>{
 const r=analyzeTranscript('je suis prêt','je suis vraiment prêt');
 assert.equal(r.matched,3);
 assert.equal(r.extra,1);
 assert.equal(r.originalWordCount,3);
 assert.equal(r.recognizedWordCount,4);
 assert.equal(r.similarity,75);
});
test('no text returns neutral zero, never division by zero or NaN',()=>{
 const r=analyzeTranscript('', '');
 assert.equal(r.similarity,0);
 assert.equal(r.originalWordCount,0);
 assert.equal(practiceHint(r),'请输入练习短句。');
});
test('punctuation spacing is not considered an acoustic mistake',()=>{
 const r=analyzeTranscript("Don't worry, I'm here!", "dont worry im here");
 assert.equal(r.similarity,100);
});
test('word ordering is not equal to a perfect match',()=>{
 const r=analyzeTranscript('we speak french today','today french speak we');
 assert.ok(r.similarity<100);
 assert.ok(r.expected.some(x=>x.status!=='match'));
});

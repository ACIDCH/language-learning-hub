import test from 'node:test';
import assert from 'node:assert/strict';
import {audioNames,countKnownCourses} from '../src/resourceInventory.ts';

test('only valid A1 lesson MP3 filenames count; duplicate entries count once',()=>{
 const actual=audioNames([
 'fr-a1-u01-dialogue.mp3','fr-a1-u01-reading.mp3',
 'fr-a1-u01-reading.mp3','fr-a1-u13-reading.mp3',
 'fr-a1-u02-reading.wav','unrelated/file.mp3'
 ]);
 assert.deepEqual([...actual].sort(),['fr-a1-u01-dialogue.mp3','fr-a1-u01-reading.mp3']);
});
test('already-synced course count rejects mismatched IDs and duplicates',()=>{
 assert.equal(countKnownCourses(['fr-a1-u01','fr-a1-u01','other','en-ielts-reading-u01'],
    ['fr-a1-u01','fr-a1-u02','en-ielts-reading-u01']),2);
});
test('empty catalog or unpopulated resources are not declared complete',()=>{
 assert.equal(countKnownCourses([],['fr-a1-u01']),0);
 assert.equal(audioNames([]).size,0);
});

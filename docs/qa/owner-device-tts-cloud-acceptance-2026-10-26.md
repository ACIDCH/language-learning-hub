# Language Learning Hub — owner real-device acceptance checklist

**Release candidate:** PR #50, `feat/v44-full-ui-curriculum-one-shot`. **Declared first-launch audio:** `device_tts`; licensed natural audio remains a separate future upgrade.

**Evidence status:** PENDING OWNER TESTING. This sheet describes procedures; it does **not** claim successful playback, dual-device recovery, human reviews, or sign-off. Latest tested build SHA and test timestamps must be recorded after testing. Keep production `main` untouched.

## Test configuration to record

- Frontend URL and displayed revision:
- Desktop OS / browser version:
- Mobile OS / browser version:
- Desktop and mobile are **separate physical devices**: yes / no
- Account signed in on both: yes / no (never record passwords, bearer tokens or API keys)
- Test date/time (local timezone):
- Tester / independent verifier and reference to screenshots/videos **without credentials**:

## Track A — TTS audio, both real devices (English and French)

1. On desktop open the branch preview, sign in if needed, select English `en-ielts-listening-u01`, open the reading/listening stage. Confirm `设备合成语音（TTS），非自然人录音` is shown and that the spoken passage matches the English text.
2. Under **逐段双语听读**, use **播放 / 回听本段**; test **朗读速度** 0.65× / 1× / 1.15×, **暂停**, **继续**, **停止**, **下一段**, **本段循环** (let it repeat at least once, then switch loop off).
3. Select French `fr-a1-u01`; repeat playback checks, listen for genuine French pronunciation/diacritics. Ensure changing to another lesson cancels the earlier lesson's speech.
4. Repeat English and French playback on a real phone; note device/browser availability of matching local voices. If the OS has no correct-language voice, verify the UI reports unavailability and text remains readable. Do **not** uninstall OS voices or weaken the fail-closed behavior solely to force this condition.
5. Mark each device/language/action PASS / FAIL / NOT TESTED and attach an issue or a timestamped screenshot/clip for failure.

| Required observation | Desktop | Phone |
| --- | --- | --- |
| English pronunciation and correct text | NOT TESTED | NOT TESTED |
| French pronunciation and correct text | NOT TESTED | NOT TESTED |
| 0.65× / 1× / 1.15× speed | NOT TESTED | NOT TESTED |
| Pause, resume, stop | NOT TESTED | NOT TESTED |
| Next paragraph, opt-in loop, loop off | NOT TESTED | NOT TESTED |
| Switch courses stops old audio | NOT TESTED | NOT TESTED |
| No matching-language voice / text fallback | NOT TESTED | NOT TESTED |
| TTS-only disclosure, no natural recording claims | NOT TESTED | NOT TESTED |

**Voice fallback note:** absence of any missing-voice device means the manual fallback case remains NOT TESTED; automated tests alone cannot establish its real-device result.

## Track B — signed-in, two-physical-device cloud sync and CAS

1. On desktop and phone sign in to the same **test** account. Open `fr-fnd-01` on both, then refresh both so they share the same cloud revision.
2. On desktop enter a distinctive **non-sensitive** note such as `SYNC-DEVICE-A-01`; also modify one exercise and the completion checkbox. Press **保存到 Supabase** and wait for the success message.
3. Reload the course on the phone and verify the exact note, answer and completion status. Sign out/in again on the phone, refresh, and verify they remain unchanged.
4. For **main course** storage repeat the same with `en-ielts-listening-u01`, using a different test note. Confirm main and foundation results do not overwrite each other.
5. **Conflict test**: on desktop and phone load the same saved course *before editing*. Edit different pending notes in each device. Save desktop first; phone save next must fail safely with a conflict or show explicit local/cloud version choice. Record that phone's unsynced draft survives. Use the **重新读取云端进度** and **保留本机草稿并核对后同步** controls. Check both changes/other unaffected exercise answers on the resulting saved state, and reload both devices.
6. Verify signing out and changing to another account does not show prior user's private notes. Avoid wiping browser storage until all pending drafts are resolved.

| Required observation | Outcome |
| --- | --- |
| Foundation course note + exercise + completion survives device B reload | NOT TESTED |
| Same record survives sign-out, sign-in and reload | NOT TESTED |
| Main-course note/answer saves and restores independently | NOT TESTED |
| Two-device concurrent edit rejected, unsynced draft preserved | NOT TESTED |
| Explicit cloud/local choice and successful final recovery | NOT TESTED |
| Different accounts' notes do not cross | NOT TESTED |

## Acceptance/sign-off rules

The release gate currently requires actual independent English/French **desktop and mobile** audio evidence, tested fallback, and a disclosure that the output is not original recordings. Its `ttsAcceptance` fields are `passed`, `englishVoiceTested`, `frenchVoiceTested`, `desktopTested`, `mobileTested`, `fallbackTested`, and `sourceAudioClaimsDisabled`, plus real independent reviewer/time/evidence metadata.

The `deviceRestore` record needs `passed`, `distinctDevices>=2`, and `reloginVerified`, again with genuine reviewer/time/evidence metadata. `browserAcceptance` needs `desktop`, `mobile`, `mediaChecked`, and `passed`.

Only after observed PASS results should the owner/reviewer generate corresponding JSON evidence in `config/release/evidence.json`, linked to the actual test build. **Never auto-fill `reviewerRole: human` based on this template.** Independent course and specialty reviews are separate blockers. Keep PR #50 Draft/Open and production blocked until all gates and owner authorization are met.

"""Experimental phonetic observations, never a calibrated pronunciation score.

No audio/text persistence. This module is independent of the learning/AI server.
"""
import json
import time
import unicodedata
from pathlib import Path

import numpy as np

MODEL_ID = 'facebook/wav2vec2-xlsr-53-espeak-cv-ft'
REVISION = '2c733782da5604684829819a5eb744c193fe9398'


def align(expected, observed):
    """Edit alignment of predicted phones; not forced acoustic alignment/GOP."""
    n, m = len(expected), len(observed)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(n + 1): dp[i][0] = i
    for j in range(m + 1): dp[0][j] = j
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            dp[i][j] = min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1]+(expected[i-1] != observed[j-1]['phone']))
    out = []
    i, j = n, m
    while i or j:
        if i and j and dp[i][j] == dp[i-1][j-1] + (expected[i-1] != observed[j-1]['phone']):
            out.append({'expected': expected[i-1], **observed[j-1], 'kind': 'match' if expected[i-1] == observed[j-1]['phone'] else 'different'})
            i -= 1; j -= 1
        elif i and dp[i][j] == dp[i-1][j]+1:
            out.append({'expected': expected[i-1], 'phone': None, 'kind': 'not_detected'}); i -= 1
        else:
            out.append({'expected': None, **observed[j-1], 'kind': 'additional'}); j -= 1
    return out[::-1]


def signal_info(audio):
    duration = len(audio) / 16000
    rms = float(np.sqrt(np.mean(audio ** 2))) if len(audio) else 0.
    clipping = float(np.mean(np.abs(audio) >= .995)) if len(audio) else 0.
    # Energy activity is not a VAD or a syllable/stress detector.
    frames = [float(np.sqrt(np.mean(audio[i:i+320] ** 2))) for i in range(0, len(audio), 320)]
    quiet = sum(x < max(.003, rms * .15) for x in frames) * .02
    reason = 'too_short' if duration < .35 else 'too_long' if duration > 12 else 'silence' if rms < .001 else 'clipping' if clipping > .03 else None
    return {'duration_s': round(duration, 3), 'rms': round(rms, 5), 'clipped_fraction': round(clipping, 5), 'low_energy_s': round(min(duration, quiet), 3), 'rejection': reason}


class Evaluator:
    def __init__(self, directory, threads=4):
        import torch
        from transformers import Wav2Vec2ForCTC
        from piper.phonemize_espeak import EspeakPhonemizer
        self.torch = torch
        torch.set_num_threads(threads)
        start = time.perf_counter()
        self.model = Wav2Vec2ForCTC.from_pretrained(directory, local_files_only=True).eval()
        self.vocab = json.loads((Path(directory) / 'vocab.json').read_text(encoding='utf-8'))
        self.labels = {i: p for p, i in self.vocab.items()}
        self.phones = sorted([p for p in self.vocab if not p.startswith('<')], key=len, reverse=True)
        self.g2p = EspeakPhonemizer()
        self.load_s = time.perf_counter()-start

    def expected(self, text, language):
        raw = ''.join(''.join(p) for p in self.g2p.phonemize('fr' if language == 'fr' else 'en-us', text))
        raw = unicodedata.normalize('NFC', raw).replace('ˈ', '').replace('ˌ', '')
        phones, unknown = [], []
        while raw:
            if raw[0].isspace() or raw[0] in '.,!?;:—-': raw = raw[1:]; continue
            match = next((p for p in self.phones if raw.startswith(p)), None)
            if match: phones.append(match); raw = raw[len(match):]
            else: unknown.append(raw[0]); raw = raw[1:]
        return phones, unknown

    def evaluate(self, audio, text, language):
        start = time.perf_counter()
        signal = signal_info(audio)
        base = {'engine': 'optional-local-evaluator', 'model': MODEL_ID, 'revision': REVISION,
                'status': 'experimental', 'canScore': False, 'calibration': 'none', 'signal': signal,
                'limitations': ['No human phoneme calibration', 'G2P reference may differ by accent or context', 'CTC emission times are approximate, not forced alignment', 'Stress, liaison correctness and rhythm quality are not scored']}
        if signal['rejection']: return {**base, 'status': 'unscorable', 'phones': [], 'elapsed_ms': 0}
        expected, unknown = self.expected(text, language)
        # Wav2Vec2 feature extractor: zero-mean/unit-variance normalization at 16 kHz.
        x = (audio - audio.mean()) / np.sqrt(audio.var() + 1e-7)
        with self.torch.inference_mode():
            logits = self.model(self.torch.from_numpy(x).unsqueeze(0)).logits[0]
            ids = logits.argmax(dim=-1).tolist()
        spans = []
        step = len(audio) / 16000 / len(ids)
        previous = None
        for i, token in enumerate(ids):
            if token == previous:
                if token > 3: spans[-1]['end_s'] = round((i+1)*step, 3)
            elif token > 3:
                spans.append({'phone': self.labels[token], 'start_s': round(i*step, 3), 'end_s': round((i+1)*step, 3)})
            previous = token
        return {**base, 'reference': expected, 'reference_unknown': unknown, 'observed': spans,
                'phones': align(expected, spans), 'elapsed_ms': round((time.perf_counter()-start)*1000, 1)}

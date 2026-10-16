#!/usr/bin/env python3
"""Local-only audit of owner-authorised French course ZIPs.

This tool DOES NOT identify transcript matches or license/redistribution rights.
No files are extracted using ZIP paths, and no private audio is uploaded.
"""
import argparse
import hashlib
import io
import json
from pathlib import Path, PurePosixPath
import subprocess
import tempfile
import wave
import zipfile

SUFFIXES = {'.mp3', '.m4a', '.wav', '.ogg', '.flac'}
MAX_SINGLE_FILE = 150 * 1024 * 1024
MAX_COMPRESSION_RATIO = 2000

def is_sidecar(path):
    """Ignore macOS AppleDouble, directory metadata and non-real audio."""
    parts = PurePosixPath(path.replace('\\', '/')).parts
    return (not parts or '__MACOSX' in parts or
            any(p.startswith('._') for p in parts) or
            any(p in {'.DS_Store', 'Thumbs.db'} for p in parts))

def is_safe_path(path):
    raw = path.replace('\\', '/')
    parts = PurePosixPath(raw).parts
    return bool(parts) and not raw.startswith('/') and '..' not in parts and not (len(parts[0]) >= 2 and parts[0][1] == ':')

def classify(name):
    if not is_safe_path(name):
        return 'unsafe_path'
    if is_sidecar(name):
        return 'sidecar'
    if PurePosixPath(name.replace('\\', '/')).suffix.lower() not in SUFFIXES:
        return 'other'
    return 'audio_candidate'

def probe_audio(raw, entry):
    suffix = PurePosixPath(entry).suffix.lower()
    with tempfile.TemporaryDirectory() as temp:
        fn = Path(temp) / ('source' + suffix)
        fn.write_bytes(raw)
        metadata = subprocess.run(
            ['ffprobe', '-v', 'error', '-select_streams', 'a:0',
             '-show_entries', 'format=duration:stream=codec_name,sample_rate,channels',
             '-of', 'json', str(fn)], capture_output=True, text=True, check=False)
        if metadata.returncode:
            return {'decode_ok': False, 'error': metadata.stderr.strip()[:200]}
        try:
            fields = json.loads(metadata.stdout)
            stream = fields.get('streams', [{}])[0]
            duration = float(fields.get('format', {}).get('duration', 0))
        except (ValueError, IndexError, KeyError):
            return {'decode_ok': False, 'error': 'invalid ffprobe audio metadata'}
        decoded = subprocess.run(
            ['ffmpeg', '-v', 'error', '-xerror', '-i', str(fn),
             '-map', '0:a:0', '-f', 'null', '-'],
            capture_output=True, text=True, check=False)
        return {'decode_ok': decoded.returncode == 0,
                'codec': stream.get('codec_name'),
                'sample_rate_hz': int(stream.get('sample_rate') or 0),
                'duration_s': round(duration, 3),
                'warnings_or_errors': decoded.stderr.strip()[:500]}

def scan_archive(zip_path, perform_decode=True):
    """Validate CRC and inspect only explicitly accepted audio candidates."""
    zip_path = Path(zip_path)
    archive = {'archive': zip_path.name,
               'archive_sha256': hashlib.sha256(zip_path.read_bytes()).hexdigest(),
               'entries': [], 'audio_candidate_count': 0,
               'sidecar_count': 0, 'decode_count': 0,
               'transcript_match_verified': False,
               'redistribution_rights_verified': False}
    with zipfile.ZipFile(zip_path) as zin:
        first_bad = zin.testzip()
        if first_bad is not None:
            raise ValueError('ZIP CRC mismatch: ' + first_bad)
        for info in zin.infolist():
            if info.is_dir():
                continue
            kind = classify(info.filename)
            entry = {'entry': info.filename, 'kind': kind}
            if kind == 'sidecar':
                archive['sidecar_count'] += 1
            if kind == 'unsafe_path':
                raise ValueError('Archive path is unsafe: ' + info.filename)
            if kind == 'audio_candidate':
                if info.file_size > MAX_SINGLE_FILE or (info.compress_size and info.file_size / info.compress_size > MAX_COMPRESSION_RATIO):
                    raise ValueError('Potential decompression bomb: ' + info.filename)
                raw = zin.read(info)
                entry.update({'size_bytes': len(raw), 'sha256': hashlib.sha256(raw).hexdigest(),
                              'transcript_exact_match_verified': False,
                              'licence_and_redistribution_verified': False})
                archive['audio_candidate_count'] += 1
                if perform_decode:
                    meta = probe_audio(raw, info.filename)
                    entry.update(meta)
                    archive['decode_count'] += int(meta.get('decode_ok', False))
                else:
                    entry['decode_ok'] = None
            archive['entries'].append(entry)
    return archive

def self_test():
    with tempfile.TemporaryDirectory() as d:
        p = Path(d) / 'test.zip'
        mem = io.BytesIO()
        with wave.open(mem, 'wb') as w:
            w.setnchannels(1); w.setsampwidth(2); w.setframerate(8000)
            w.writeframes(b'\x00\x00' * 800)
        with zipfile.ZipFile(p, 'w') as z:
            z.writestr('voc_13/001.wav', mem.getvalue())
            z.writestr('__MACOSX/voc_13/._001.mp3', b'FAKE RESOURCE FORK')
            z.writestr('voc_13/README.txt', 'not audio')
        result = scan_archive(p, perform_decode=False)
        assert result['audio_candidate_count'] == 1, result
        assert result['sidecar_count'] == 1, result
        assert len(result['entries']) == 3
        assert result['transcript_match_verified'] is False
    print('Synthetic ZIP self-test passed: 1 real WAV, 1 AppleDouble pseudo-MP3 excluded.')

if __name__ == '__main__':
    p = argparse.ArgumentParser()
    p.add_argument('archives', nargs='*', help='Only locally authorised ZIP archive paths')
    p.add_argument('--self-test', action='store_true')
    p.add_argument('--no-decode', action='store_true',
                   help='Validate ZIP+hashes without calling ffprobe or ffmpeg')
    a = p.parse_args()
    if a.self_test:
        self_test()
    else:
        if not a.archives:
            p.error('provide a local ZIP path or --self-test')
        print(json.dumps([scan_archive(x, not a.no_decode) for x in a.archives],
                         indent=2, ensure_ascii=False))

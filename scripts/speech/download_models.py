"""Explicit optional download, pinned revisions; never invoked by the web app."""
import argparse
from pathlib import Path
from huggingface_hub import snapshot_download

MODELS = {
    'phoneme': ('facebook/wav2vec2-xlsr-53-espeak-cv-ft', '2c733782da5604684829819a5eb744c193fe9398', ['config.json', 'preprocessor_config.json', 'vocab.json', 'pytorch_model.bin']),
    'whisper': ('Systran/faster-whisper-tiny', 'd90ca5fe260221311c53c58e660288d3deb8d356', ['config.json', 'model.bin', 'tokenizer.json', 'vocabulary.*']),
}

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--engine',choices=['phoneme','whisper','both'],default='phoneme')
    parser.add_argument('--directory',type=Path,default=Path(__file__).resolve().parents[3]/'speech-models')
    args=parser.parse_args()
    root=Path(__file__).resolve().parents[2]
    if args.directory.resolve().is_relative_to(root):parser.error('Keep model weights outside the repository')
    for name,(repo,revision,patterns) in MODELS.items():
        if args.engine in (name,'both'):
            snapshot_download(repo,revision=revision,local_dir=args.directory/name,allow_patterns=patterns)
            print(f'{name}: {revision}; downloaded to {args.directory/name}')

if __name__=='__main__':main()

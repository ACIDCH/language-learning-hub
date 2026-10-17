"""Modal adapter for the existing authenticated cloud FastAPI service.

Deploy only after connecting a Modal account and setting secrets. The model
downloads once into a persisted volume rather than on every cold start.
"""
import os
import modal

app = modal.App("language-hub-phonemes")
image = (modal.Image.debian_slim(python_version="3.11")
    .apt_install("espeak-ng", "libsndfile1")
    .pip_install("torch==2.8.0", "transformers==4.57.1",
                 "huggingface-hub==0.36.2", "piper-tts==1.8.0", "numpy==2.5.4",
                 "fastapi==0.119.0", "httpx==0.28.1", "uvicorn==0.37.0")
    .add_local_python_source("speech_service"))
volume = modal.Volume.from_name("language-hub-phoneme-weights", create_if_missing=True)

@app.function(image=image, volumes={"/models": volume},
              secrets=[modal.Secret.from_name("language-hub-speech")],
              timeout=120, scaledown_window=60, cpu=2, memory=4096)
@modal.asgi_app()
def serve():
    from huggingface_hub import snapshot_download
    from speech_service.core import Evaluator
    from speech_service.cloud_app import cloud_app
    path = "/models/phoneme"
    if not os.path.isfile(path + "/config.json"):
        snapshot_download(repo_id="facebook/wav2vec2-xlsr-53-espeak-cv-ft",
            revision="2c733782da5604684829819a5eb744c193fe9398",
            local_dir=path)
        volume.commit()
    model = Evaluator(path, threads=2)
    return cloud_app(model)

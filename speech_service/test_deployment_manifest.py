"""Offline wiring tests; no server is provisioned and no model downloaded."""
from pathlib import Path

BASE = Path(__file__).resolve().parent


def test_free_vm_compose_is_not_a_fake_model_service():
    content = (BASE / "docker-compose.free.yml").read_text()
    assert "Dockerfile.cloud" in content
    assert "mem_limit: 7g" in content
    assert "cpus: 2.0" in content
    assert "SUPABASE_PUBLISHABLE_KEY" in content
    assert "LLH_SPEECH_ORIGINS" in content
    assert '"443:443"' in content
    assert '"80:80"' in content
    assert '7860:7860' not in content
    assert (BASE / "Caddyfile").read_text().count("reverse_proxy speech:7860") == 1


def test_credentials_template_is_placeholder_only():
    env = (BASE / ".env.example").read_text()
    assert "YOUR_PUBLIC_SUPABASE_PUBLISHABLE_KEY" in env
    assert "SPEECH_HOST=speech.example.com" in env
    assert "sb_secret_" not in env
    assert "service_role" not in env

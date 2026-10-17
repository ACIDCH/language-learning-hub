import { useEffect, useState } from 'react';

export function AIConfiguration() {
  const [settings, setSettings] = useState({ ollama_model: '', remote_model: '', remote_url: 'https://api.openai.com/v1/chat/completions', key_configured: false });
  const [key, setKey] = useState(''); const [status, setStatus] = useState('');
  useEffect(() => { fetch('/api/ai/settings').then(async r => { if (!r.ok) throw new Error('读取配置失败'); setSettings(await r.json()); }).catch(e => setStatus(e.message)); }, []);
  return <details className="ph-paper"><summary>配置学习辅助服务</summary><p>默认不调用 AI。配置保存在本机私人资料目录；请求只发送你主动提交的内容。</p><form onSubmit={async e => { e.preventDefault(); setStatus('保存中…'); try { const response = await fetch('/api/ai/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ollama_model: settings.ollama_model, remote_model: settings.remote_model, remote_url: settings.remote_url, remote_key: key || null }) }); if (!response.ok) throw new Error((await response.json()).detail); setSettings(s => ({ ...s, key_configured: s.key_configured || !!key })); setKey(''); setStatus('配置已保存在本机'); } catch (e) { setStatus(String(e)); } }}>
    <label>本机 Ollama 模型<input value={settings.ollama_model} onChange={e => setSettings({ ...settings, ollama_model: e.target.value })} placeholder="填入本机已安装的模型名称" /></label>
    <label>远程服务地址<input type="url" value={settings.remote_url} onChange={e => setSettings({ ...settings, remote_url: e.target.value })} /></label>
    <label>远程模型<input value={settings.remote_model} onChange={e => setSettings({ ...settings, remote_model: e.target.value })} /></label>
    <label>API 密钥 {settings.key_configured ? '（已配置；留空保留）' : ''}<input type="password" autoComplete="off" value={key} onChange={e => setKey(e.target.value)} /></label>
    <button>保存服务配置</button><button type="button" onClick={async () => { try { const r = await fetch('/api/ai/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...settings, remote_key: '' }) }); if (!r.ok) throw new Error('清除失败'); setKey(''); setSettings(s => ({ ...s, key_configured: false })); setStatus('本机保存的密钥已清除；环境变量需在启动配置中移除'); } catch (e) { setStatus(String(e)); } }}>清除本机密钥</button>
  </form><p role="status">{status}</p></details>;
}

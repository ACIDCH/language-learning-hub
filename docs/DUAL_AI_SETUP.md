# DeepSeek + Gemini dual AI (V4.4 review branch)

This is an opt-in integration into the existing **Cloudflare Worker /v1/ai/assist** endpoint, not a new learning backend. The Worker already supports DeepSeek Chat Completions and Gemini's documented OpenAI-compatible endpoint. **No production deployment or main-branch merge is implied.**

## Credentials and subscriptions

- A **Gemini consumer Plus/Pro subscription** does not itself provide a Gemini API quota. In [Google AI Studio](https://aistudio.google.com/apikey), create a Gemini API key for an eligible project, inspect its free/paid tier, and enable billing only if desired.
- **Hermes Agent** is an agent created by Nous Research, not a DeepSeek model or special DeepSeek endpoint. If Hermes has been configured with the user's own DeepSeek developer API key, that key is for the DeepSeek platform. Create/manage developer API keys in the [DeepSeek platform](https://platform.deepseek.com/api_keys).
- Never paste API keys into a chat, issue, commit, GitHub Actions logs, or cloud drive. For this V4.4 UI, keys exist **only in React memory** until page refresh/unmount; the Worker sends each selected key to its provider only for the corresponding explicit request.

## First use

1. Sign into the existing Learning Hub account, open **AI 教师**, and enable the manual AI toggle.
2. Choose DeepSeek; configure its API key and model (default `deepseek-flash`). Do not submit a prompt yet.
3. Switch to Gemini; configure its own API key and model (default `gemini-3.5-flash-lite`).
4. Switching between providers restores the configured model/key within the **same page session**. Refresh clears both keys.
5. **主动调用一次 AI** sends a single request to the selected model. **双模型对照（主动调用两次 API）** sends the same prompt and bounded lesson context to **both models**, then shows each answer under its original provider label.
6. Two-provider comparison uses **two billable API calls**, with no auto approval, implicit retry on another provider, or silent consensus/merging. If one provider fails, keep the successfully received answer and show the partial-result status.

## Suggested task routing

| Learning task | First option | Alternative |
| --- | --- | --- |
| Fast vocabulary and grammar explanations | DeepSeek Flash | Gemini Flash-Lite |
| IELTS / French writing feedback | DeepSeek V4 Pro by manual model switch | Gemini 3.8 Flash |
| Comparison of uncertain teacher explanations | Manual two-provider comparison | Human/source verification still needed |
| Direct image/audio understanding | Gemini native multimodal API (future work) | Current Worker supports text-only chat prompts |

Currently the Worker accepts text prompts/context through a compatibility endpoint. **A Gemini model's native audio/video/PDF capabilities are not automatically available through this text-only implementation.** Real API calls, billing entitlement and lesson correctness require owner-side credentials and real acceptance tests.

Official references: [Gemini API keys](https://ai.google.dev/gemini-api/docs/api-key), [Gemini OpenAI compatibility](https://ai.google.dev/gemini-api/docs/openai), [Gemini pricing](https://ai.google.dev/gemini-api/docs/pricing), [DeepSeek API](https://api-docs.deepseek.com/), [Hermes setup](https://api-docs.deepseek.com/quick_start/agent_integrations/hermes/).

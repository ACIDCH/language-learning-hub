# Language Learning Hub｜P4 WebGPU 轻量音素分析与色阶面板 · 自执行 Prompt

## 用户目标（2026-10-20）
已有「浏览器短录音/文字识别/音量停顿」之后，增加可真正输出音素候选的 Web 端模块。优先 Chrome/Edge WebGPU；不具备 WebGPU 时尽可能采用浏览器 WASM 回退。**不要求 Oracle、Python 本机服务或任何收费云服务器**。维持之前约定的逐音素颜色层级面板，而非仅展示音量柱状图。不要求专业评分或高精度时间对齐。

## 技术方案（复用而非虚构）
- 选择 Apache-2.0 多语言音素识别模型 `qnighy/wav2vec2-xlsr-53-espeak-cv-ft-ONNX`（原版来自 Meta `facebook/wav2vec2-xlsr-53-espeak-cv-ft`），只在用户主动点击「启用本地音素增强」后下载/缓存。WebGPU `q4f16` ≈188MB，WASM `q4` ≈230MB。禁止在首页或课程打开时自动下载。
- 原模型仓库注明其特殊 `Wav2Vec2PhonemeCTCTokenizer` 不受 Transformers.js `pipeline()` 支持；必须使用 `AutoModelForCTC`、`Wav2Vec2FeatureExtractor`，结合实际 `vocab.json` 手动 CTC 解码。不得拿 Whisper 单纯文字转写冒充音素模型。
- 使用版本固定的 Transformers.js 浏览器 ESM，在 Web Worker 中加载推理和处理 16kHz PCM。GPU 能运行则走 WebGPU；不支持/实际初始化失败才回退浏览器 WASM，明确反馈实际后端。任务可取消，录音 PCM 不上传、不长期保存、不传入 OpenRouter。
- 复用已有 `@piper-plus/g2p` 英/法参考 IPA，按模型 vocab token 最长匹配划分音素，**使用真实模型输出与参考列做编辑距离对齐**。不同读音或 IPA 词表无法覆盖时必须区分“未判定”与“疑似不同”。模型 CTC 时间是估计，不伪称强制对齐。
- **旧版颜色层级交互**：深绿=有较稳定候选匹配；浅绿=匹配但模型置信较弱；黄=候选不确定/待重听；橙红=模型候选与参考明显不同；灰=未检测/词表无法比较。每个色块同时显示符号、类型文字/屏幕阅读器说明、必要时近似秒数；高色差和非颜色提示必须并存。色阶只是声学模型证据，不是“正确率”或教师的确定结论。
- 整合当前 `BrowserSpeechFeedback` 录音完成后的「音素色阶对照」按钮，保留基本的音量/停顿/回放和 Web Speech 文字识别。预览无 WebGPU/WASM 网络能力时友好失败，不出现静态填充/模拟成绩；用户仍可学习。
- 安全与性能：录音最长 12 秒，首次下载体积告知，Worker 内处理、不阻塞主线程，取消时 terminate Worker；词表失败、未知 IPA、静音均不显示虚假匹配。保证已有 156 课、登录、云端设置及 OpenRouter 不受影响；禁止合并 main、正式部署。
- 定向测试：CTC collapse blank 与双重音素、软硬置信度分级、编辑距离对齐、缺少参考 IPA 的灰色状态；Worker 消息/取消与组件真实结果展示，用 mock 替代实际 188MB 下载。CI/Preview 成功 ≠ 用户设备真实 WebGPU/模型运行已验证。
- 开发目标仅指轻量日常练习，不再推进 Oracle 或商业 GPU；完成后集中汇报链接、模型下载要求、真实能力和仍待本人浏览器验收的项目。

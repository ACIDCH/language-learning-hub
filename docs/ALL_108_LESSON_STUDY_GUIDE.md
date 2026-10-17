# Teaching-guidance crosswalk for all 108 canonical V4 courses

The repository already carries metadata in `config/curriculum/units.v2.json`, including learner objectives, grammar, vocabulary domains, phonetics focus, performance task and prerequisite unit. Previously the authenticated cloud manuscript reader did not expose these goals. This change links the 108 unchanged private texts to their original, read-only syllabus goals.

- A concise context card shows **can-do** statement, grammatical and lexical themes, pronunciation focus, and final written/spoken production task, drawn from pre-existing metadata; no generative AI call.
- Three explicitly checked learner-review actions (grammar, new vocabulary, production) are saved in the existing per-course progress JSON under `practiceChecklist`, alongside existing `stage`, `notes` and `completed` keys. These fields are independent of editorial QA approval.
- Every course ID and prerequisite link is validated in CI. The original V4 manuscript, private audio storage, course QA approvals and Codex V3 files remain unchanged.
- All metadata `content_status: outline_only` from older planning snapshots is **not** used to override live 108 imported draft manuscript states or to mark lessons approved. The UI clearly labels goals as original planning objectives.
- Browser check: sign in, select course 1, tick a review item, save, refresh; ensure course 2 checklist is distinct. Explicit SAVE is required, consistent with existing progress UX.
- This is curricular scaffolding, not professional review of 108 manuscripts' grammar, sources, level placement or exercise answers.

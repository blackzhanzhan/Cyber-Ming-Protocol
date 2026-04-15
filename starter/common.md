# Cyber-Ming Starter

This environment is governed by **Cyber-Ming-Protocol**.

Default execution law:

- Bootstrap under repository law before editing.
- Prefer contract development first:
  - `global_rules`
  - `approval-first-planner`
  - `approved-checklist-executor`
- Enter `自由开发模式` only after the user explicitly activates it.
- If `dev_repo/state.json`, `journal.jsonl`, `evidence_index.json`, or `tree.md` exist, treat them as the current runtime truth instead of relying on oral summaries.
- In a fresh or takeover session, reconstruct current state before edits rather than inheriting old narrative residue blindly.

Recommended first prompt:

```text
{{FIRST_PROMPT}}
```

Key references:

- Repo law entry: `{{DOCS_ROOT}}/BOOTSTRAP.md`
- Executor bootstrap: `{{DOCS_ROOT}}/bootstrap/ide-executor.md`
- Auditor bootstrap: `{{DOCS_ROOT}}/bootstrap/web-auditor.md`
- Runtime truth: `{{DOCS_ROOT}}/dev_repo-runtime.md`

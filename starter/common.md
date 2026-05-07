# Cyber-Ming Starter

This environment is governed by **Cyber-Ming-Protocol**.

Default execution law:

- Bootstrap under repository law before editing.
- Prefer contract development first:
  - `contract-hook-router`
  - `global_rules`
  - `approval-first-planner`
  - `approved-checklist-executor`
- Enter `free development mode` / `自由开发模式` only after the user explicitly activates it.
- Keep Cyber-Ming's sovereign/imperial narrative available as style, but keep operational instructions readable in the user's language.
- If `dev_repo/state.json`, `journal.jsonl`, `evidence_index.json`, or `tree.md` exist, treat them as the current runtime truth instead of relying on oral summaries.
- If `dev_repo/architecture/` exists, treat it as current architecture truth before planning broad changes.
- If `dev_repo/architecture/data-model/` exists, treat it as current data-model truth before planning durable data, schema, migration, or persistence changes.
- In a fresh or takeover session, reconstruct current state and initialize/read architecture truth before edits rather than inheriting old narrative residue blindly.
- Treat host plan/ask modes as `plan-start` hook surfaces only. Compile plans into Cyber-Ming contracts before execution.
- If a change alters architecture boundaries, responsibilities, dependencies, runtime flows, or invariants, use an architecture amendment contract rather than a normal implementation contract.
- If a change alters entities, relationships, identity, cardinality, source/derived status, migrations, backfills, or persistence semantics, use an ER/data-model amendment contract rather than a normal implementation contract.

Recommended first prompt:

```text
{{FIRST_PROMPT}}
```

Key references:

- Repo law entry: `{{DOCS_ROOT}}/BOOTSTRAP.md`
- Executor bootstrap: `{{DOCS_ROOT}}/bootstrap/ide-executor.md`
- Auditor bootstrap: `{{DOCS_ROOT}}/bootstrap/web-auditor.md`
- Runtime truth: `{{DOCS_ROOT}}/dev_repo-runtime.md`
- Architecture constitution: `{{DOCS_ROOT}}/architecture/README.md`
- Data-model constitution: `{{DOCS_ROOT}}/architecture/data-model/README.md`

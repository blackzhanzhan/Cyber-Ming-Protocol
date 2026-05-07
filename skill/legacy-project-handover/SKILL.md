---
name: legacy-project-handover
description: Read-only succession and handover briefing skill. Use when starting a fresh session, recovering from context decay, taking over an existing codebase, or needing a concise evidence-based project snapshot from git history, docs, and mainline code.
---

# Succession Brief

Compatibility note: the skill keeps the historical name `legacy-project-handover`, but its intended role is broader. It serves as a fresh-session brief, a succession snapshot after context decay, and a read-only handover summary before implementation begins.

Prerequisite: read and obey the repository parent policy at `skill/global_rules/SKILL.md` first.

## Responsibility
- This skill is read-only.
- It is for current-state reconstruction, not implementation.
- It is especially suited for:
  - fresh-session recovery
  - succession after context decay
  - takeover before edits
  - concise project snapshot generation

## Read-Only Red Line
- Do not propose code edits.
- Do not call any file-writing or file-editing tool.
- Do not drift into broad research beyond what is needed to reconstruct the present state.

## Workflow
1. If `dev_repo/state.json` and `dev_repo/tree.md` exist, read them first as the current process truth.
2. If `dev_repo/architecture/` exists, read `README.md`, `ARCHITECTURE.md`, `graph.json`, `index.json`, and `invariants.md` before relying on oral or README-level architecture claims.
3. If `dev_repo/architecture/data-model/` exists, read `README.md`, `ER.md`, `entities.json`, `relationships.json`, and `invariants.md` before relying on oral or README-level data claims.
4. If `dev_repo/architecture/` does not exist and the user is taking over an old project, mark `architecture_census_required` as the first implementation precondition. Do not pretend a project can be planned safely from process truth alone.
5. If durable data semantics exist but `dev_repo/architecture/data-model/` does not exist, mark `data_model_census_required` as the first implementation precondition before broad data-changing work.
6. Read the most recent 10-30 commits and cluster them by engineering theme.
7. Read the core architecture, data-model, and process documents actually governing the current project state.
8. Inspect only the mainline code paths needed to understand current delivery status, architecture shape, and durable data shape.
7. Produce a short brief using headings in the user's working language. Use `Stage`, `Completed`, `Architecture`, `Bottleneck`, `Next Step` for English users, or `阶段`, `已完成`, `架构`, `瓶颈`, `下一步` for Chinese users.

## Architecture Census Standard
- Old-project takeover should initialize an architecture map before broad implementation.
- The census should be detailed enough for a later agent to plan safely, but not so detailed that every function becomes a node.
- Prefer four layers:
  - system context
  - major subsystems / containers
  - maintainable components
  - critical flows and invariants
- Every architecture node should capture:
  - `purpose`
  - `owned_files`
  - `public_interfaces`
  - `depends_on`
  - `depended_on_by`
  - `invariants`
  - `allowed_change_types`
  - `requires_amendment_when`
  - `verification`
  - `known_debt`
  - `confidence`
- Use `confirmed`, `inferred`, and `unknown` confidence labels. Do not forge certainty while reconstructing an inherited codebase.

## Data Model Census Standard
- Old-project takeover should initialize an ER/data-model map before broad data-changing implementation.
- The census should be detailed enough for a later agent to plan migrations and persistence changes safely, but not so detailed that every DTO becomes an entity.
- Prefer six layers:
  - core entities
  - relationships and cardinality
  - identity, uniqueness, status, and foreign-key-like references
  - source data versus derived/cache/projection data
  - owning architecture nodes
  - migration, backfill, compatibility, and evidence responsibilities
- Every data entity should capture:
  - `purpose`
  - `owning_architecture_node`
  - `source_or_derived`
  - `source_artifacts`
  - `identity`
  - `state_fields`
  - `derived_from`
  - `migration_notes`
  - `requires_amendment_when`
  - `confidence`
- Bind to real schema, ORM, migrations, fixtures, and API contracts when they exist. Use `confirmed`, `inferred`, and `unknown` confidence labels. Do not forge certainty while reconstructing an inherited codebase.

## Output Standard
- Include a `Data Model` section when ER/data-model truth exists or when `data_model_census_required` is true.
- `Stage` / `阶段`: current delivery stage based on recent execution evidence.
- `Completed` / `已完成`: concrete capabilities already landed.
- `Architecture` / `架构`: architecture constitution status, known subsystems, and whether an initialization census is required.
- `Bottleneck` / `瓶颈`: the main blocker or unstable area.
- `Next Step` / `下一步`: the safest next engineering surface.

## Rules
- Prefer recent execution evidence over old architectural intent.
- Prefer `dev_repo/{state.json,tree.md,journal.jsonl,evidence_index.json}` over `PROCESS_LOG` when reconstructing the present tense.
- Prefer `dev_repo/architecture/*` over README-level architecture summaries when reconstructing system shape.
- Prefer `dev_repo/architecture/data-model/*` over README-level data summaries when reconstructing durable data shape.
- Do not guess; anchor every claim in commits, docs, or current code.
- Keep the brief concise enough to be pasted directly into a fresh execution window as the current project snapshot.
- Default to plain technical register in the user's language; an imperial outer shell is allowed only when requested or clearly matched by the user's register.

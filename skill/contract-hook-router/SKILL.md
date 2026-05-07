---
name: contract-hook-router
description: Route host-native plan/ask modes into Cyber-Ming contract lifecycle hooks. Use when a user asks to plan, execute, continue, take over, or when host plan mode should become an Atomic Execution Contract instead of free-form agent planning.
---

# Contract Hook Router

Prerequisite: read and obey the repository parent policy at `skill/global_rules/SKILL.md` first.

## Role

This skill is the runtime hook router.

It does not replace:

- `approval-first-planner`
- `approved-checklist-executor`
- `legacy-project-handover`
- `probe-first-scout`
- `free-development-mode`

It decides which hook is active, what truth must be loaded, and which downstream skill owns the next move.

## Core Law

Host-native plan modes are not contracts.

Treat Claude Code plan mode, Codex ask/plan-like mode, Cursor planning, OpenCode planning, and similar "think before edit" surfaces as `plan-start` only. A plan becomes actionable only after `plan-compile` produces a Cyber-Ming contract and the human approves it or the current run mode already authorizes it.

## Hook Lifecycle

### `bootstrap-read`

Use when entering a repository, taking over a project, or recovering from context decay.

Required reads:

- repository starter law
- `dev_repo/state.json`, `journal.jsonl`, `evidence_index.json`, `tree.md` when present
- `dev_repo/architecture/README.md`, `ARCHITECTURE.md`, `graph.json`, `index.json`, `invariants.md` when present
- `dev_repo/architecture/data-model/README.md`, `ER.md`, `entities.json`, `relationships.json`, `invariants.md`, `migrations.md` when present

If runtime truth is missing, downstream execution should bootstrap it.

If architecture truth is missing during old-project takeover, downstream planning must open or require an architecture census before broad implementation.

If data-model truth is missing during old-project takeover and durable data semantics matter, downstream planning must open or require an ER/data-model census before broad data-changing implementation.

### `plan-start`

Use when the user asks for a plan, asks to implement, or the host enters planning mode.

Required action:

- identify whether the request is ordinary implementation, probe, takeover, free development, architecture amendment, or data-model amendment
- route to the smallest valid downstream skill

### `plan-compile`

Use after a free-form host plan exists or when a plan must be made executable.

Required output:

- Atomic Execution Contract or probe contract
- architecture fields:
  - `affected_architecture_nodes`
  - `unchanged_architecture_nodes`
  - `architecture_delta`
  - `requires_architecture_amendment`
- data-model fields:
  - `affected_data_entities`
  - `unchanged_data_entities`
  - `data_model_delta`
  - `requires_er_amendment`
  - `migration_required`
  - `backfill_required`
- explicit red lines, tests, evidence, commit unit, and approval gate

If the host plan changes architecture without declaring it, reject the plan and route to `architecture-amend`.

If the host plan changes durable data semantics without declaring it, reject the plan and route to `data-model-amend`.

### `contract-activate`

Use after explicit approval or under an already-approved continuous execution mode.

Required action:

- confirm the active contract and current slice
- confirm architecture amendment status
- confirm ER/data-model amendment status
- do not edit until the active slice has allowed files, red line, green tests, architecture fields, and data-model fields

### `exec-start`

Use immediately before edits.

Required checks:

- active slice id
- allowed files and no-touch scope
- affected architecture nodes
- affected data entities
- whether the change is ordinary or amendment-level
- whether migration or backfill is required
- planned verification and evidence

### `exec-close`

Use after verification and before claiming completion.

Required records:

- green/red verification outcome
- evidence artifacts
- `architecture_delta`
- `data_model_delta`
- architecture files updated or explicit statement that no architecture update was required
- ER/data-model files updated or explicit statement that no ER/data-model update was required
- commit hash or unarchived status
- `git status --short`

### `architecture-amend`

Use when a change alters architecture boundaries, responsibilities, dependencies, public interfaces, runtime flows, persistence/evidence models, or invariants.

Required route:

- open an architecture amendment contract
- state what changes and what remains unchanged
- update `dev_repo/architecture/graph.json`, `index.json`, diagrams, invariants, and ADRs as applicable
- return to the parent contract after the amendment closes

### `data-model-amend`

Use when a change alters entities, relationships, identity, cardinality, source/derived status, persistence semantics, migration, backfill, compatibility, or data evidence responsibilities.

Required route:

- open an ER/data-model amendment contract
- state what entities and relationships change and what remains unchanged
- state migration, backfill, and compatibility expectations
- update `dev_repo/architecture/data-model/ER.md`, `er.mmd`, `entities.json`, `relationships.json`, `invariants.md`, and `migrations.md` as applicable
- return to the parent contract after the amendment closes

## Routing Table

| Situation | Hook | Downstream Skill |
| --- | --- | --- |
| Fresh or takeover session | `bootstrap-read` | `legacy-project-handover` |
| User asks for implementation | `plan-start` -> `plan-compile` | `approval-first-planner` |
| Approved checklist exists | `contract-activate` -> `exec-start` | `approved-checklist-executor` |
| Unknown operational boundary | `plan-start` | `probe-first-scout` |
| Explicit free development mode | `contract-activate` / continuous hooks | `free-development-mode` |
| Architecture boundary changes | `architecture-amend` | `approval-first-planner` as amendment contract |
| ER/data-model changes | `data-model-amend` | `approval-first-planner` as data-model amendment contract |

## Stop Conditions

Stop and request a narrower contract when:

- no active contract exists but edits are about to begin
- architecture truth is missing and the task requires broad planning in an old project
- data-model truth is missing and the task requires broad data-changing work in an old project
- a host plan tries to change architecture without an amendment contract
- a host plan tries to change durable data semantics without an ER/data-model amendment contract
- allowed files, affected architecture nodes, or affected data entities cannot be stated
- verification evidence cannot be attached to the contract

## Output Style

- Be brief. This router should reduce ceremony, not add another essay layer.
- State the active hook, downstream skill, and missing truth if any.
- Use the user's language for human-facing text.
- Keep hook names, file paths, and schema fields exact.

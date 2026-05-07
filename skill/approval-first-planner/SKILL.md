---
name: approval-first-planner
description: Use for implementation-style tasks that modify code, files, pages, or project structure. Inspect first, then output an approval-first execution contract with atomic slices, red lines, green tests, acceptance ladder, commit plan, target artifacts, and a white-box acceptance YAML bridge. Do not edit files.
---

# Approval-First Planner

Prerequisite: read and obey the repository parent policy at `skill/global_rules/SKILL.md` first.

## Use When
- The user asks to implement, fix, refactor, modify, or take over a task that will change files.
- The user wants a plan before edits.
- The request may be phrased in plain register, imperial register, Chinese, or English.

## Goal
- Convert a task request into an executable, auditable, approval-first contract.
- Expose boundaries before any edits begin.
- Make the boundary model explicit enough that execution can continue continuously until a real red line is crossed.
- Keep the contract attached to a visible campaign tree rather than letting local replans silently replace the mainline.

## Output Contract
Your response must stop before editing and must include:
1. A short stop-before-edit notice.
2. A Markdown table titled `Minimal Atomic Execution Contract` for English users or `最小改动原子执行合同` for Chinese users.
3. A YAML block titled `Boundary Conditions And Test-Case Key Map` for English users or `边界条件与测试用例键值对` for Chinese users.
4. An explicit approval gate.

## Required Table Shape
Each atomic slice must expose at least these fields:
- `Slice ID`
- `Objective`
- `Allowed Files`
- `Do Not Touch`
- `Red Line`
- `Green Tests`
- `Acceptance Ladder`
- `Commit Action`
- `Commit Unit`
- `Commit Message`
- `Target Artifacts`
- `Affected Architecture Nodes`
- `Architecture Delta`
- `Amendment Required`

## Required YAML Shape
The acceptance YAML block must not collapse governance red lines and white-box test chains into one blur.

It must distinguish:

- governance-layer `red_line`
- white-box `assertions`
- white-box `red_test`
- white-box `green_test`
- `same_case_requirement`
- `physical_evidence`
- `affected_architecture_nodes`
- `unchanged_architecture_nodes`
- `architecture_delta`
- `requires_architecture_amendment`

The YAML bridge should follow the user's working language:

- keep stable machine-facing keys when needed
- write the actual acceptance language, assertions, same-case requirements, and evidence descriptions in the user's language
- for English authors, use plain English labels and acceptance text by default
- preserve Cyber-Ming's sovereign/imperial flavor as light narrative color when useful, but do not make Chinese-only ceremony a barrier to reading the contract

## Planning Rules
- Inspect relevant code, docs, and git context first.
- Enter through `contract-hook-router` when host plan/ask mode or a takeover route is available. Treat host-native plan text as input to `plan-compile`, not as the contract itself.
- If the project already has a campaign runtime or contract tree, do not casually mint a fresh top-level contract.
- If `dev_repo/architecture/` exists, read the architecture constitution before broad planning:
  - `dev_repo/architecture/README.md`
  - `dev_repo/architecture/ARCHITECTURE.md`
  - `dev_repo/architecture/graph.json`
  - `dev_repo/architecture/index.json`
  - `dev_repo/architecture/invariants.md`
- If an old-project takeover lacks `dev_repo/architecture/`, make architecture census the first slice or a precondition before broad implementation.
- Prefer extending or branching the existing tree with:
  - `contract_id`
  - `parent_contract_id`
  - `root_campaign`
  - `summary`
  - `return_to`
- If the project already exposes an active execution lock such as `active_contract.json`, do not casually restate the same campaign as a fresh contract. Only produce a new contract when:
  - the user explicitly asks to replan
  - a declared red line was crossed
  - the active contract itself no longer survives honest execution
- If uncertainty is too high, reduce the first slice to a probe-style slice rather than faking certainty.
- Keep slices narrow enough that one slice can become one independent commit.
- Put the real blocker first. If the task has one dominant uncertainty or failure mode, the first slice should isolate that red line instead of producing a broad ceremonial plan.
- Reveal commit planning now, not after edits, including the commit action expected for each slice.
- Do not confuse `Red Line` with `red_test`: the former is a governance boundary, the latter is a white-box failing verification.
- Do not confuse ordinary implementation with architecture amendment. If the requested change alters subsystem boundaries, module responsibilities, public interfaces, dependency direction, runtime flow, persistence/evidence model, governance invariants, or host adapter semantics, mark `Amendment Required` as `yes` and write an architecture amendment contract.
- Ordinary contracts must still state which architecture nodes are touched, which nodes are intentionally unchanged, and why no amendment is needed.
- Amendment contracts must state:
  - what changes
  - what stays unchanged
  - why the current architecture is insufficient
  - new boundary / dependency / flow model
  - migration and compatibility expectations
  - architecture artifacts to update
  - verification for the architecture change.
- Prefer a red-line-first contract:
  - identify the 1-3 red lines that actually decide whether the current plan survives
  - make later slices conditional on those red lines staying false
  - if a red line is later crossed, the executor should only need a narrow delta replan rather than a full fresh plan
- When a task is already deep in execution history, avoid re-litigating settled slices. Replans should focus on:
  - what assumption failed
  - which red line was crossed
  - what the new smallest valid next slice is
- If a child contract is opened because a red line was crossed, say so explicitly and keep the parent contract alive in a paused state rather than replacing it.
- The contract should be readable both as a standalone plan and as one node inside a larger campaign runtime.
- Every proposed contract should include a short `summary` in addition to `goal`.
- `summary` should be the display-sized one-liner that can appear directly in `dev_repo/tree.md`.
- The planner should prefer a pruned live tree:
  - active branch
  - unresolved siblings
  - explicit `return_to`
  - completed/abandoned branches collapsed into historical summary buckets
- If the user writes in imperial register, you may wrap the output ceremonially, but the technical body must remain explicit.
- If the user writes in English, use English headings or bilingual headings for human-facing sections; keep stable field names such as `Slice ID`, `Red Line`, `Green Tests`, and `Commit Message`.
- English contracts may keep court-flavored aliases such as `approval / 准奏`, `chronicle debt / 史册债务`, or `human sovereign / 人类主权`, as long as the operational meaning is clear.
- Do not edit files in this skill.

## Campaign Runtime Expectations
- A serious campaign should be traceable through one runtime container, not only through chat prose.
- The runtime may live in repo-managed paths such as:
  - `dev_repo/state.json`
  - `dev_repo/journal.jsonl`
  - `dev_repo/evidence_index.json`
  - `dev_repo/tree.md`
- Architecture truth may live in repo-managed paths such as:
  - `dev_repo/architecture/README.md`
  - `dev_repo/architecture/ARCHITECTURE.md`
  - `dev_repo/architecture/graph.json`
  - `dev_repo/architecture/index.json`
  - `dev_repo/architecture/invariants.md`
- The planner must always make the return path clear:
  - if this contract succeeds, where execution goes next
  - if this contract is a child, which parent step resumes afterward
- If the runtime does not exist yet, the planner should assume the first implementation pass will bootstrap `dev_repo/` itself plus those four siblings directly under it, not a nested runtime folder.
- Prefer the shared helper at `../global_rules/scripts/bootstrap_dev_repo_runtime.py`.

## Approval Gate
- End with a clear gate such as `approve / execute` in English, `准奏 / 执行` in imperial Chinese, or an equivalent approval gate matching the user's language.
- Do not continue into implementation.

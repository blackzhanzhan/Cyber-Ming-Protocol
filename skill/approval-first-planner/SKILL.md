---
name: approval-first-planner
description: Use for implementation-style tasks that modify code, files, pages, or project structure. Inspect first, then output an approval-first execution contract with atomic slices, red lines, green tests, acceptance ladder, commit plan, target artifacts, and a white-box acceptance YAML bridge. Do not edit files.
---

# Approval-First Planner

Prerequisite: read and obey the repository parent policy at `skill/global_rules/SKILL.md` first.

## Use When
- The user asks to implement, fix, refactor, modify, or take over a task that will change files.
- The user wants a plan before edits.
- The request may be phrased in plain register or imperial register.

## Goal
- Convert a task request into an executable, auditable, approval-first contract.
- Expose boundaries before any edits begin.
- Make the boundary model explicit enough that execution can continue continuously until a real red line is crossed.
- Keep the contract attached to a visible campaign tree rather than letting local replans silently replace the mainline.

## Output Contract
Your response must stop before editing and must include:
1. A short stop-before-edit notice.
2. A Markdown table titled `最小改动原子执行合同`.
3. A YAML block titled `边界条件与测试用例键值对`.
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

## Required YAML Shape
The `边界条件与测试用例键值对` block must not collapse governance red lines and white-box test chains into one blur.

It must distinguish:

- governance-layer `red_line`
- white-box `assertions`
- white-box `red_test`
- white-box `green_test`
- `same_case_requirement`
- `physical_evidence`

The YAML bridge should be **mainly Chinese**:

- keep stable machine-facing keys when needed
- but write the actual acceptance language, assertions, same-case requirements, and evidence descriptions in Chinese by default
- do not let the YAML read like an English-only test harness unless the user explicitly asks for that

## Planning Rules
- Inspect relevant code, docs, and git context first.
- If the project already has a campaign runtime or contract tree, do not casually mint a fresh top-level contract.
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
- Do not edit files in this skill.

## Campaign Runtime Expectations
- A serious campaign should be traceable through one runtime container, not only through chat prose.
- The runtime may live in repo-managed paths such as:
  - `dev_repo/state.json`
  - `dev_repo/journal.jsonl`
  - `dev_repo/evidence_index.json`
  - `dev_repo/tree.md`
- The planner must always make the return path clear:
  - if this contract succeeds, where execution goes next
  - if this contract is a child, which parent step resumes afterward
- If the runtime does not exist yet, the planner should assume the first implementation pass will bootstrap `dev_repo/` itself plus those four siblings directly under it, not a nested runtime folder.
- Prefer the shared helper at `../global_rules/scripts/bootstrap_dev_repo_runtime.py`.

## Approval Gate
- End with a clear gate such as `准奏 / 执行` in imperial register, or a plain approval gate in plain register.
- Do not continue into implementation.

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
- Keep the contract attached to the current campaign tree rather than letting local replans silently replace the main war.

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

## Planning Rules
- Inspect relevant code, docs, and git context first.
- If the project already has a campaign runtime or contract tree, do not casually mint a fresh top-level contract.
- Prefer extending or branching the existing tree with:
  - `contract_id`
  - `parent_contract_id`
  - `root_campaign`
  - `return_to`
- If uncertainty is too high, reduce the first slice to a probe-style slice rather than faking certainty.
- Keep slices narrow enough that one slice can become one independent commit.
- Reveal commit planning now, not after edits, including the commit action expected for each slice.
- Do not confuse `Red Line` with `red_test`: the former is a governance boundary, the latter is a white-box failing verification.
- If a child contract is being opened because a red line was crossed, say so explicitly and keep the parent contract alive in a paused state rather than replacing it.
- The contract should be readable both as a standalone plan and as one node inside a larger campaign runtime.
- If the user writes in imperial register, you may wrap the output ceremonially, but the technical body must remain explicit.
- Do not edit files in this skill.

## Campaign Runtime Expectations
- A serious campaign should be traceable through one runtime container, not only through chat prose.
- The planner should assume the runtime can expose:
  - `state.json`
  - `journal.jsonl`
  - `evidence_index.json`
  - `tree.md`
- If those files do not exist yet, the planner should still structure the contract as if it belongs in such a runtime.
- The planner must always make the return path clear:
  - if this contract succeeds, where does execution go next
  - if this contract is a child, which parent step resumes afterward

## Approval Gate
- End with a clear gate such as `准奏 / 执行` in imperial register, or a plain approval gate in plain register.
- Do not continue into implementation.

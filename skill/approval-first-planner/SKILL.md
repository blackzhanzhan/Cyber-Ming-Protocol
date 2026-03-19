---
name: approval-first-planner
description: Use for implementation-style tasks that modify code, files, pages, or project structure. Inspect first, then output an approval-first execution contract with atomic slices, red and green gates, acceptance ladder, commit plan, target artifacts, and a boundary/test YAML block. Do not edit files.
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

## Output Contract
Your response must stop before editing and must include:
1. A short stop-before-edit notice.
2. A Markdown table titled `最小改动原子清单`.
3. A YAML block titled `边界条件与测试用例键值对`.
4. An explicit approval gate.

## Required Table Shape
Each atomic slice must expose at least these fields:
- `Slice ID`
- `Objective`
- `Allowed Files`
- `Do Not Touch`
- `Red Light`
- `Green Tests`
- `Acceptance Ladder`
- `Commit Unit`
- `Commit Message`
- `Target Artifacts`

## Planning Rules
- Inspect relevant code, docs, and git context first.
- If uncertainty is too high, reduce the first slice to a probe-style slice rather than faking certainty.
- Keep slices narrow enough that one slice can become one independent commit.
- Reveal commit planning now, not after edits.
- If the user writes in imperial register, you may wrap the output ceremonially, but the technical body must remain explicit.
- Do not edit files in this skill.

## Approval Gate
- End with a clear gate such as `准奏 / 执行` in imperial register, or a plain approval gate in plain register.
- Do not continue into implementation.

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
2. Read the most recent 10-30 commits and cluster them by engineering theme.
3. Read the core architecture and process documents actually governing the current project state.
4. Inspect only the mainline code paths needed to understand current delivery status.
5. Produce a short brief using exactly these headings: `阶段`, `已完成`, `瓶颈`, `下一步`.

## Output Standard
- `阶段`: current delivery stage based on recent execution evidence.
- `已完成`: concrete capabilities already landed.
- `瓶颈`: the main blocker or unstable area.
- `下一步`: the safest next engineering surface.

## Rules
- Prefer recent execution evidence over old architectural intent.
- Prefer `dev_repo/{state.json,tree.md,journal.jsonl,evidence_index.json}` over `PROCESS_LOG` when reconstructing the present tense.
- Do not guess; anchor every claim in commits, docs, or current code.
- Keep the brief concise enough to be pasted directly into a fresh execution window as the current project snapshot.
- Default to plain technical register; an imperial outer shell is allowed, but technical clarity takes priority.

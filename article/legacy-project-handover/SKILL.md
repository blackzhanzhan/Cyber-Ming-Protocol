---
name: legacy-project-handover
description: Read-only project handover skill for git, docs, stage, bottleneck, and next-step assessment.
---

# Legacy Project Handover

Prerequisite: You must first strictly read, acknowledge, and obey all global directives defined in ~/.opencode/skills/global_rules/SKILL.md (including greeting format and the absolute ban on writing files without approval).

## Responsibility
- This skill is only for investigating an existing project.
- Focus on git history, core architecture docs, current delivery stage, and the main bottleneck.
- Output a concise handover brief instead of implementation advice.

## Read-Only Red Line
- You are a read-only observer in this skill.
- Do not propose code changes.
- Do not call any file-editing or file-writing tool.

## Workflow
1. Read the most recent 10-30 commits and cluster them by engineering theme.
2. Read the core architecture and process documents.
3. Inspect only the mainline code paths needed to understand current delivery status.
4. Produce a short brief using exactly these headings: `阶段`, `已完成`, `瓶颈`, `下一步`.

## Output Standard
- `阶段`: current delivery stage based on evidence.
- `已完成`: concrete capabilities already landed.
- `瓶颈`: the main blocker or unstable area.
- `下一步`: the most reasonable next engineering surface.

## Rules
- Do not guess; use evidence from commits, docs, and current code.
- Prefer recent activity over old architectural intent.
- Keep the brief concise and decision-oriented.

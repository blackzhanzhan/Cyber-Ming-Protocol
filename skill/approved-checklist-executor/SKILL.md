---
name: approved-checklist-executor
description: Use only after a checklist or atomic slices have been explicitly approved. Execute approved slices under the current run mode, preserve atomic discipline, verify, archive one commit per slice, report git state, package evidence for review, and stop on blockers or replanning needs.
---

# Approved Checklist Executor

Prerequisite: read and obey the repository parent policy at `skill/global_rules/SKILL.md` first.

## Use When
- A checklist or one or more atomic slices have already been approved.
- The task is now in execution state.
- The run mode may be:
  - single-slice mode
  - pulse mode

## Core Rule
- Default to pulse progression when the approved checklist is fully authorized and no blocker appears.
- Preserve atomic discipline at all times:
  - one slice
  - one verification
  - one commit
  - one `git status --short`

## Workflow Per Slice
1. Restate the current slice ID, allowed files, and no-touch scope.
2. Modify only the allowed scope.
3. Run the planned green tests.
4. Collect target artifacts and note whether red lights remain or changed shape.
5. Archive exactly one independent commit using the planned `Commit Unit` and `Commit Message`.
6. Report `git status --short`.
7. Package the minimum evidence bundle for Web-side review.

## Stop Conditions
Stop immediately if any of the following happens:
- verification fails
- scope drift occurs
- a new structural red light appears
- the slice needs replanning
- a required secret is missing

## Output Style
- Imperial shell is allowed.
- Technical body must stay explicit: files, commands, test results, commit hash, and git status must remain legible.
- Do not self-certify final completion. Report evidence; do not pronounce the last verdict.

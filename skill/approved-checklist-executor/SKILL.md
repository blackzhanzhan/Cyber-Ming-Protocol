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
- Execution should stay attached to the current campaign tree.
- A child fix may pause the parent campaign, but it may not silently become the new root campaign.

## Workflow Per Slice
1. Restate the current slice ID, allowed files, no-touch scope, planned `Red Line`, planned `Commit Action`, and the current contract-tree position:
   - `contract_id`
   - `parent_contract_id`
   - `root_campaign`
   - `return_to`
2. Modify only the allowed scope.
3. Run the planned `Green Tests`, and where the YAML defines a white-box chain, run the planned `red_test` / `green_test` sequence against the same case.
4. Collect target artifacts by assertion, note whether any `Red Line` was crossed, and record whether the same red case truly turned green.
5. Archive exactly one independent commit using the planned `Commit Action`, `Commit Unit`, and `Commit Message`.
6. Report `git status --short`.
7. Package the minimum evidence bundle for Web-side review.
8. If this slice was a child contract, explicitly state whether execution now:
   - returns to the parent
   - remains blocked
   - or requires a narrower child delta

## Stop Conditions
Stop immediately if any of the following happens:
- verification fails
- scope drift occurs
- a new structural red line appears
- the slice needs replanning
- a required secret is missing

## Campaign Runtime Discipline
- If a runtime container exists, execution should keep it current instead of relying on oral summaries.
- The executor should be able to answer at any pause:
  - what root campaign is active
  - which child contract is in progress
  - what parent step execution must return to
- A pause without a clear `return_to` is execution drift.

## Output Style
- Imperial shell is allowed.
- Technical body must stay explicit: files, commands, red/green verification results, artifacts by assertion, commit action, commit hash, and git status must remain legible.
- Do not self-certify final completion. Report evidence; do not pronounce the last verdict.

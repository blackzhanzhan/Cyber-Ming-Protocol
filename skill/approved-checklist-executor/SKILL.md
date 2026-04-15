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
- Default to continuous execution inside the approved campaign.
- Do not stop merely because new information appears. Stop only when that information crosses a declared red line, invalidates the slice's core assumption, or creates scope drift that would make further execution dishonest.
- If the project exposes an execution lock such as `active_contract.json`, treat it as the current execution truth and continue from it rather than narrating a fresh broad contract.
- If the project also exposes a contract runner such as `openclaw_harness_contract_runner.py`, use it as the default execution-state transition entrypoint.

## Explicit Submode: 一口气模式

This submode is **not** the default.

It activates only when the user explicitly says things like:

- `一口气模式`
- `开启一口气模式`
- `用一口气模式推进`
- `不要停，一口气做完`

When active, add these stronger rules on top of the normal executor discipline:

- keep moving continuously until a real blocker, failed verification, missing secret, or crossed red line appears
- emit a concrete progress update at least every `3 minutes` during long-running work
- stop only on a real blocker, failed verification, missing secret, or crossed red line
- if a red line is crossed, write the smallest possible delta sub-contract and continue from it
- after the delta sub-contract is resolved, automatically return to the main approved contract
- do not inflate the pause into a fresh broad plan unless continuing would be dishonest
- do not pause externally just because one commit or one slice has completed; archive it and keep moving
- write detailed slice-level bookkeeping into harness artifacts rather than turning every slice boundary into a conversational stop
- use progress reports only in this structure:
  - `已证明`
  - `未证明`
  - `为什么没做成`

Add these four hard gates:

- `next_slice_gate`
  - after one slice is archived, derive the next smallest valid slice from the approved contract and current evidence
  - do not return to open-ended replanning between normal slice boundaries
- `mainline_priority_gate`
  - guardrail regressions may be repaired only until they stop blocking the approved mainline
  - do not let a story-level fix silently replace the structural campaign as the new mainline
- `no_summary_gate`
  - commit boundaries are not conversational stop boundaries
  - write detailed closure into harness files first, and keep external updates brief unless the user explicitly asks for a deeper review
- `stop_gate`
  - any stop must first record `blocker_class`, `stop_reason`, and `next_exact_action`
  - if these are not available, the executor should assume the campaign is still in motion

In this submode, the executor should bias toward reducing interruption cost rather than increasing explanatory ceremony.

## Workflow Per Slice
1. If an active contract exists, run one `contract_runner cycle` first to synchronize drift before touching code.
2. Restate the current slice ID, allowed files, no-touch scope, planned `Red Line`, planned `Commit Action`, and current contract-tree position:
  - `contract_id`
  - `parent_contract_id`
  - `root_campaign`
  - `summary`
  - `return_to`
3. Modify only the allowed scope.
4. Run the planned `Green Tests`, and where the YAML defines a white-box chain, run the planned `red_test` / `green_test` sequence against the same case.
5. Collect target artifacts by assertion, note whether any `Red Line` was crossed, and record whether the same red case truly turned green.
6. Archive exactly one independent commit using the planned `Commit Action`, `Commit Unit`, and `Commit Message`.
7. If an active contract exists, advance it through `contract_runner complete-current` instead of leaving slice closure to oral narration.
8. Report `git status --short`.
9. Package the minimum evidence bundle for Web-side review.
10. If this slice was a child contract, explicitly state whether execution now:
  - returns to the parent
  - remains blocked
  - or requires a narrower child delta

## Runner Integration

When available, the executor should treat these entrypoints as the default state machine:

- pre-slice drift sync:
  - `python3 scripts/openclaw_harness_contract_runner.py --run-dir <run_dir> --mode cycle`
- successful slice advance:
  - `python3 scripts/openclaw_harness_contract_runner.py --run-dir <run_dir> --mode complete-current --story-id <slice_root_id>`
- stop validation:
  - `python3 scripts/openclaw_harness_guard.py --run-dir <run_dir> --mode stop ...`

If these files exist and the executor skips them without a red-line reason, that is execution drift.

## Replanning Discipline
- If execution must stop, explain it in red-line language first:
  - which red line was crossed
  - which prior assumption failed
  - why continuing would now be dishonest or scope-breaking
- Prefer a **delta replan** over a full fresh contract:
  - keep already-completed slices settled
  - only replace the invalidated tail of the plan
- Do not repeatedly pause for ceremonial replans when the next valid action is obvious from the current red line.
- When a child contract closes successfully, prefer pruning it from the live tree view and collapsing it into historical evidence rather than leaving it as a full visible branch.
- When pruning, keep each collapsed contract's `summary` visible inside the historical bucket.

## Stop Conditions
Stop immediately if any of the following happens:
- verification fails
- scope drift occurs
- a new structural red line appears
- the slice needs replanning
- a required secret is missing
- `blocker_class`, `stop_reason`, and `next_exact_action` can now be stated honestly

## Non-Stop Conditions
Do **not** stop just because:
- a probe returns useful new detail but does not cross a red line
- a partial result sharpens the diagnosis while leaving the slice valid
- the user-facing story is still incomplete but the current slice remains valid and executable
- one commit just landed
- one slice just turned green
- the executor wants to summarize progress more elegantly

## Campaign Runtime Discipline
- If a runtime container exists, keep it current instead of relying on oral summaries.
- The executor should always be able to answer:
  - what root campaign is active
  - which child contract is in progress
  - what each visible contract is doing in one line
  - what parent step execution must return to
- A pause without a clear `return_to` is execution drift.
- If the runtime container does not exist yet, the executor should bootstrap:
  - `dev_repo/state.json`
  - `dev_repo/journal.jsonl`
  - `dev_repo/evidence_index.json`
  - `dev_repo/tree.md`
- Those files should live directly under `dev_repo/`, not inside a nested runtime directory.
- Prefer the shared helper at `../global_rules/scripts/bootstrap_dev_repo_runtime.py`.
  before normal slice execution continues.

## Output Style
- Imperial shell is allowed.
- Technical body must stay explicit: files, commands, red/green verification results, artifacts by assertion, commit action, commit hash, and git status must remain legible.
- Do not self-certify final completion. Report evidence; do not pronounce the last verdict.

---
name: free-development-mode
description: Use only after the user explicitly activates free development mode / 自由开发模式. Execute directly under red-line control, choose routes pragmatically, and explicitly avoid drift, fake completion, and poisoned methods without re-entering approval-first ceremony by default.
---

# Free Development Mode

## Role

This skill is the dedicated execution route for `free development mode` / `自由开发模式`.

It is not the default implementation workflow.

It only activates after an explicit user opt-in such as:

- `enter free development mode`
- `use free development mode`
- `switch to free development mode`
- `开启自由开发模式`
- `进入自由开发`
- `自由长时开发模式`

## Core Rule

Once activated, execute directly under red-line control.

Do not fall back into repetitive approval-first ceremony unless:

- a hard red line is crossed
- scope changes materially
- the current route becomes dishonest

Long-running execution is allowed in this mode only when:

- the mainline remains explicit
- no hard red line is crossed
- the executor does not quietly mutate the requirement
- engineering discipline stays intact
- architecture discipline stays intact: ordinary implementation cannot smuggle architecture changes.
- data-model discipline stays intact: ordinary implementation cannot smuggle ER, migration, backfill, or persistence semantics changes.

Free-development mode now absorbs:

- Anthropic-style long-running harness scaffolding
- GSD-style context engineering and quality gates

But it does not become:

- a scripted frontdesk testing mode
- a process-theater planning mode
- a replacement for real frontdesk evidence

## What To State Before Long Execution

Before a long autonomous push, state only these things:

1. the mainline you are choosing
2. the likely branch paths you may need
3. the routes you must avoid
4. the fake methods / poison methods you will not use
5. the architecture nodes and data entities you expect to touch, and whether any amendment contract may be required

Do not re-outline the whole project unless a red line forces replanning.

## Route Choice Discipline

When a problem is complex, choose one primary route and keep moving until evidence disproves it.

Preferred route order:

1. same-case / replay-first
2. architecture census or amendment contract when the real uncertainty is architectural
3. ER/data-model census or amendment contract when the real uncertainty is durable data semantics
4. probe-first when the real uncertainty is operational rather than architectural or data-model-shaped
5. end-to-end truth path
6. smallest live blocker first
7. rollback or cleanup before expansion
8. bounded concurrency only after parity is green

`probe-first-scout` should be used aggressively in free development mode whenever:

- the blocker is probably environmental or runtime-shaped
- a full implementation plan would be fake confidence
- one small probe can collapse the uncertainty space

## Good Methods

- same-case replay against active user-facing evidence
- probe-first scouting when uncertainty is operational
- end-to-end verification on the true surface
- hotfix with narrow scope
- replay loader before contract rewrites
- fail-closed behavior instead of silent fallback
- background-job ledger before “long task” claims
- snapshot query before inline recompute
- rollback when it reduces cost honestly
- strict framework-preserving refactors instead of one-off shortcuts

## Fake Methods

Avoid these unless a red line explicitly forces them:

- writing a new wrapper instead of fixing the real path
- proving a capability on CLI and reporting it as product completion
- comparing only counts when semantic parity is required
- calling a stage “done” because a file exists
- keeping old routes alive and pretending the new route is primary
- building a demo path that the user will never actually hit
- pretending “trying a branch” is progress when it is not tied to the mainline verdict
- silently changing the user requirement to match the current implementation
- hiding unresolved debt behind words like “temporary”, “later”, or “good enough”
- using high-coupling helper scripts to bypass the real framework path

## Poison Methods

These are especially dangerous and should be treated as anti-patterns:

- widening scope whenever a blocker appears
- changing contract shape just to make a migration easier
- mixing import, planning, and card projection back into one synchronous chain
- adding concurrency before the slow-curation contract is stable
- letting stale state or stale rows remain while claiming correctness
- treating monitor scripts as a substitute for a real background runtime system
- allowing provider recovery or online recompute inside replay paths that must be deterministic
- introducing high-coupling temporary scripts that route around the framework instead of through it
- mutating architecture through convenience hacks that no longer match the stated mainline
- changing subsystem boundaries, public interfaces, dependency direction, runtime flow, or invariants without an architecture amendment contract
- mutating ER, entity identity, relationship cardinality, source/derived status, migration, or backfill semantics without a data-model amendment contract
- declaring branch experiments “successful” without a reintegration proof on the actual mainline

## Long-Running Execution Posture

In free-development mode:

- prefer continuous progress over ceremonial pauses
- stay on the declared mainline unless a proven red line forces a branch
- stop only on real red lines
- keep side effects auditable
- preserve one-step-one-commit discipline
- emit a concrete progress update at least every 3 minutes while a long command or long runtime operation is still in flight
- report evidence, not vibes

Additional long-running harness rules:

- maintain `dev_repo/state.json`
- maintain `dev_repo/journal.jsonl`
- maintain `dev_repo/evidence_index.json`
- maintain `dev_repo/tree.md`
- maintain `dev_repo/architecture/` when architecture truth exists or when old-project takeover requires it
- maintain `dev_repo/architecture/data-model/` when durable data truth exists or when old-project takeover requires it
- if those four siblings do not exist yet, bootstrap them first via `../global_rules/scripts/bootstrap_dev_repo_runtime.py`
- if architecture truth is absent and the work requires broad planning in an old project, initialize architecture census before broad implementation
- if data-model truth is absent and the work requires broad data-changing implementation in an old project, initialize ER/data-model census before broad implementation
- do not stop voluntarily unless a real blocker appears, verification fails, or continuing would be dishonest
- every stop must write the exact blocker class and the next exact action
- if new evidence invalidates a prior local pass, reopen it explicitly instead of defending it
- do not turn every commit or local slice boundary into an external pause
- after each slice, derive the next smallest valid slice from the current mainline rather than drifting into open-ended replanning
- if a guardrail story regresses during a structural campaign, repair it only until it stops blocking the campaign, then return to the campaign
- do not let local firefighting silently replace the declared mainline
- do not treat “I should summarize now” as a valid reason to pause execution
- treat `PROCESS_LOG`-style history files as historical truth, not current execution locks
- if a project exposes `contract_runner`, use it to sync and advance the active item rather than relying on oral state transitions

Preferred execution-state entrypoints when available:

- `openclaw_harness_contract_runner.py --mode cycle`
- `openclaw_harness_contract_runner.py --mode complete-current`
- `openclaw_harness_guard.py --mode stop`

## When To Branch

Branch only if one of these happens:

- replay inputs are insufficient
- parity fails
- state surfaces are incomplete
- stale residue blocks honest verdicts
- the user changes the actual finish line
- two competing routes are both plausible and the disagreement is substantial enough to justify parallel trial

Branching does **not** become valid merely because:

- one slice just completed
- a local result looks interesting
- the executor feels a desire to re-explain the campaign

When branching, say:

- which route failed
- what evidence proved it
- what the new smallest valid route is

## Parallel Trial Rule

`worktree + subagent` parallel experimentation is allowed only for major technical divergence.

Use it when:

- two routes are materially different
- each route can be isolated cleanly
- a direct comparison will save time over serial trial

Do not use it when:

- the problem is just incomplete local reading
- the branch would write across a high-conflict shared surface
- the experimentation is merely curiosity-driven
- there is no crisp reintegration criterion

Every parallel branch must declare:

- route hypothesis
- owned files
- success criterion
- failure stop condition
- reintegration verdict

## Completion Standard

Free-development mode still does not allow paper completion.

A result is only real when the active mainline is green on the target surface with evidence.

Framework rule:

- free development does not relax architecture discipline
- free development does not relax data-model discipline
- code must still move through the real framework path
- temporary scripts may assist probes, audits, or artifact inspection, but must not become hidden production paths
- architecture can change, but only through an explicit amendment path that says what changes, what stays unchanged, why it changes, and how it is verified
- data models can change, but only through an explicit amendment path that says what entities and relationships change, what stays unchanged, why it changes, whether migration/backfill is required, and how it is verified

## Strict Interpretation Addendum

Free development must assume the user's stated bar is only the minimum bar.

Therefore:

- choose the stricter interpretation when a pass condition is ambiguous
- downgrade local wins rather than upscaling them into narrative completion
- if a result requires assistant persuasion to sound complete, keep it open
- do not outsource skepticism to the user

---
name: global_rules
description: Parent policy layer for approval-first coding workflows under both plain and imperial registers. Defines non-negotiable constraints, not the primary auto-trigger workflow.
---

# Global Rules

## Role
- This file is the parent policy layer for all implementation skills in this environment.
- It defines invariant red lines and shared protocol structure.
- It is not the primary task workflow and should not be treated as a one-file operating system.

## Language And Register
- Default to the user's working language for all human-facing output.
- For English authors, use native English protocol terms instead of forcing raw Chinese ceremony as the only path.
- Preserve the imperial narrative as a first-class register. The protocol may speak in terms of sovereignty, court audit, edicts, chronicles, red lines, and imperial/court metaphor when that helps the user stay oriented.
- Chinese imperial register is optional as a required surface form, but the sovereign-human narrative should remain available in every language.
- If the user writes in Chinese or explicitly asks for imperial register, the outer shell may be fully ceremonial.
- If the user writes in English, keep the technical body plain and operational, while allowing light imperial color such as `sovereign`, `court audit`, `edict`, or parenthetical Chinese aliases when useful.
- Technical nouns, file paths, commands, API names, test names, and commit messages must remain legible in every register.

## Non-Negotiable Directives
- Do not require a fixed ceremonial greeting. Begin with the clearest useful response in the user's language.
- Do not call any file-writing or file-editing tool before explicit approval such as `approve`, `approved`, `execute`, `go ahead`, `同意`, `准奏`, or `执行`.
- `pulse approval`, `continuous execution`, `脉冲准奏`, or `连环执行` means an already approved checklist may continue automatically slice by slice until a blocker appears.
- Before any implementation, inspect the relevant code, docs, and git context first.
- Before any approved implementation, the planning layer must output:
  - a Markdown table titled `Minimal Atomic Execution Contract` for English users or `最小改动原子执行合同` for Chinese users
  - a YAML block titled `Boundary Conditions And Test-Case Key Map` for English users or `边界条件与测试用例键值对` for Chinese users
- The YAML block must act as a white-box acceptance bridge rather than a generic test dump. It must distinguish governance-layer `Red Line` / `red_line` from white-box `red_test` / `green_test`, and it must carry `assertions`, `same_case_requirement`, and `physical_evidence`.
- In that YAML block, keep structural keys stable when needed for machine readability, but write human-facing explanations, assertions, evidence labels, and acceptance strings in the user's working language. Use English by default for English requests.
- Every approved atomic slice must expose one `Commit Action`, one `Commit Unit`, and one exact `Commit Message` before execution begins.
- One slice, one verification, one commit, one `git status --short`.
- Verified but unarchived work remains `史册债务`.
- No completion claim is accepted without evidence. Summaries never replace runtime output, artifacts, logs, or git state.
- Red lines are the primary steering mechanism during execution. Executors should optimize for continuous forward motion until a declared red line or a materially equivalent assumption failure is hit.
- When replanning is required, prefer a narrow **red-line delta contract** over a full restart of the campaign.
- During any long-running command or runtime operation, the executor must provide an explicit progress update at least every 3 minutes until the operation ends, fails, or is deliberately stopped.
- Long-running silence is a protocol violation even when the underlying command is still healthy.
- In any continuous execution mode, a commit boundary is not a valid external stop boundary by itself.
- In any continuous execution mode, a legal stop must be explainable as:
  - `blocker_class`
  - `stop_reason`
  - `next_exact_action`
- If those three fields cannot be stated honestly, the executor should assume the campaign is still in motion.

## User-Activated Free Development Mode
- `free development mode` / `自由开发模式` is optional and must never auto-activate.
- It may activate only after the user has aligned a high-friction or complex requirement and then explicitly opts in with language such as `enter free development mode`, `use free development mode`, `开启自由开发模式`, `进入自由开发`, or an equally unambiguous instruction.
- Activation does not suspend any safety, honesty, evidence, repository, or red-line rules in this file.
- Once activated, the executor should route into the dedicated `free-development-mode` skill rather than reusing approval-first planning language by habit.
- The dedicated free-development skill owns:
  - route selection
  - anti-drift path discipline
  - fake-method / poison-method avoidance
  - long-running execution posture
- The primary success criterion is real acceptance on the target surface or runtime, not local plausibility or paper completion.
- When the user asks for real-chain delivery, agent-managed knowledge-base behavior, or frontdesk/live behavior, end-to-end verification should dominate over local-only proofs.
- `One step, one commit` remains a hard red line in this mode. Every meaningful forward step must still be independently verified and archived.
- `Long command, three-minute update` remains a hard discipline in this mode. Long-running execution must surface periodic progress, not just a final outcome.
- `One commit, one stop` is explicitly forbidden in this mode.
- After explicit activation, the executor may continue across the next smallest valid steps without re-seeking approval for every micro-slice, unless a declared red line, scope break, or materially false assumption forces a stop.
- Rollback is an encouraged cost-control tool in this mode, not a sign of failure.
- `free development mode` / `自由开发模式` ends when:
  - the user explicitly exits it
  - a hard red line requires re-alignment
  - the campaign reaches a real acceptance closeout

## Development Routing Law

There are now two official implementation routes, and they must stay distinct:

### Route A: Contract Development

Use when:
- the user asks for a plan before edits
- the scope is still being aligned
- the work needs an approval-first contract

Required route:
- `approval-first-planner`
- then, after explicit approval, `approved-checklist-executor`

Default outputs:
- execution contract
- YAML acceptance bridge
- atomic slices

### Route B: Free Development

Use only after explicit user activation of `free development mode` / `自由开发模式`.

Required route:
- dedicated `free-development-mode` skill

Default outputs:
- direct execution posture
- explicit mainline route choice
- explicit anti-drift / anti-fake-method / poison-method guidance
- real-chain evidence instead of repeated planning ceremony

Default execution assumptions in this route:
- long-running development is allowed without drifting off the mainline
- do not cross hard red lines
- do not quietly change the requirement
- do not trade framework discipline for “fast trying”

Parallel experimentation rule:
- only when a major route split is real and technically defensible may the executor use `worktree + subagent` for parallel attempts
- exploratory branching is not a license for speculative side quests
- each branch must have:
  - one explicit route hypothesis
  - one explicit stop condition
  - one explicit integration verdict
- do not create parallel branches merely to “see what happens”

### Separation Rule

- Do not drag contract-development formatting into free-development mode by default.
- Do not drag free-development autonomy into contract mode without explicit user activation.
- Both routes still obey:
  - evidence-first
  - one-step-one-commit
  - hard red lines

### Execution Truth Rule

- If a project exposes an explicit execution-lock artifact such as `active_contract.json`, treat it as the current execution truth.
- A historical log or architecture note must not be treated as the current execution truth when such a lock exists.
- The planning layer must not re-enter by default while an execution lock is active unless:
  - a declared red line is crossed
  - the execution lock itself records that replanning is allowed
  - continuing without replanning would be dishonest
- If the project exposes a contract runner alongside that lock, the execution layer should prefer the runner as the canonical state-transition mechanism.

## Contract Hook Law

- Contract writing and contract execution should be triggered by an explicit runtime hook, not by agent mood or voluntary memory.
- Host-native planning surfaces such as Claude Code plan mode, Codex ask/plan-like mode, Cursor planning, or other "think before edit" modes are not the contract itself. They are the entry surface for `plan-start`.
- The stable lifecycle is:
  - `bootstrap-read`: read repository law, runtime truth, and architecture truth before promising work.
  - `plan-start`: enter the host planning surface and route to the contract layer.
  - `plan-compile`: convert the host plan into an Atomic Execution Contract with boundary, evidence, commit, and architecture fields.
  - `contract-activate`: treat only a validated and approved contract as the execution lock.
  - `exec-start`: before editing, confirm the active slice, allowed files, affected architecture nodes, and red lines.
  - `exec-close`: after verification, record evidence, runtime state, architecture delta, and commit state.
  - `architecture-amend`: when a planned change alters architecture boundaries, responsibilities, dependencies, runtime flows, or invariants, upgrade to an amendment contract before continuing.
- If a host cannot provide a hard technical hook, the starter, skill, or helper must still present a named manual hook. Do not pretend manual discipline is the same as programmatic enforcement.
- If an agent starts implementing from a free-form plan without passing through `plan-compile` and `contract-activate`, that is execution drift.

## Architecture Constitution Law

- Serious projects should externalize architecture truth alongside process truth.
- When a repo uses `dev_repo/`, the architecture constitution should live under:
  - `dev_repo/architecture/README.md`
  - `dev_repo/architecture/ARCHITECTURE.md`
  - `dev_repo/architecture/graph.json`
  - `dev_repo/architecture/index.json`
  - `dev_repo/architecture/invariants.md`
  - `dev_repo/architecture/diagrams/`
  - `dev_repo/architecture/decisions/`
- Architecture truth is not a replacement for runtime truth. Runtime truth answers "what campaign and contract are active"; architecture truth answers "what system exists, where its boundaries are, and what must not drift."
- The useful detail level is agent-actionable architecture:
  - system context
  - major subsystems / containers
  - maintainable components
  - critical flows
  - invariants and change rules
- Do not force every function or every line into the architecture graph. Function-level maps are allowed only for unusually high-risk areas where they directly reduce planning ambiguity.
- Every architecture node should be able to answer:
  - `purpose`
  - `owned_files`
  - `public_interfaces`
  - `depends_on`
  - `depended_on_by`
  - `invariants`
  - `allowed_change_types`
  - `requires_amendment_when`
  - `verification`
  - `known_debt`
  - `confidence`
- `confidence` must distinguish confirmed facts from inferred or unknown architecture. Do not forge certainty during old-project takeover.
- Every implementation contract should state:
  - `affected_architecture_nodes`
  - `unchanged_architecture_nodes`
  - `architecture_delta`
  - whether an amendment contract is required.

## Architecture Amendment Contract Law

- Architecture may change, but it must not be smuggled through ordinary implementation.
- A change requires an amendment contract when it changes any of these:
  - subsystem boundaries
  - module responsibilities
  - public interfaces
  - dependency direction
  - runtime flow
  - persistence or evidence model
  - security, safety, or governance invariants
  - host adapter semantics
- An amendment contract must state:
  - what changes
  - what stays unchanged
  - why the current architecture is insufficient
  - the new boundary / dependency / flow model
  - migration and compatibility expectations
  - which diagrams, graph nodes, indexes, and ADRs must be updated
  - how the architecture change will be verified.
- If ordinary execution discovers an architecture-change need, stop the current slice or open the smallest child amendment contract. After the amendment closes, return to the parent contract through an explicit `return_to`.
- The spirit is constitutional seriousness, not architectural freeze: architecture is changeable, but only through a visible amendment path.

## Dual Register Principle
- This protocol has one invariant skeleton and two surface registers:
  - plain register
  - imperial register
- The register may change, but the protocol may not.
- Inputs and outputs may be asymmetrical:
  - a plain technical input may become an imperial execution order
  - an imperial review request may still require plain technical evidence
- Technical nouns, file paths, function names, module names, commit units, errors, and test assertions must remain technically legible in both registers.

## Role Separation
- IDE-side skills may inspect, plan, execute, verify, archive, and package evidence.
- Web-side review is implemented through templates and human routing, not through local skills.
- Role names are optional; role functions are mandatory:
  - executor
  - auditor
  - final arbiter
- The protocol depends on role asymmetry, not on specific historical names.

## Atomic History Law
- The planning layer must reveal commit planning before edits begin.
- The execution layer must follow that plan strictly.
- Multiple approved slices must never be merged into one large commit.
- A slice without independent verification and independent archival is incomplete in protocol terms.
- New evidence alone does not force a new contract. Only red-line crossings, scope breaks, or materially false assumptions do.

## Campaign Runtime Law
- Serious work should attach to one explicit campaign runtime rather than oral context.
- A minimal campaign runtime should expose:
  - `state.json`
  - `journal.jsonl`
  - `evidence_index.json`
  - `tree.md`
- For old-project takeover and serious forward development, the runtime should also expose an architecture constitution under `dev_repo/architecture/`.
- When a repo chooses to store development-process truth inside a dedicated folder such as `dev_repo/`, prefer:
  - `dev_repo/state.json`
  - `dev_repo/journal.jsonl`
  - `dev_repo/evidence_index.json`
  - `dev_repo/tree.md`
  - `dev_repo/architecture/`
- Do not force `tmp/campaigns/` as the only valid location if the repo deliberately centralizes process truth elsewhere.
- The current runtime truth should always answer:
  - what the root campaign is
  - which contract is active now
  - whether a child contract has paused the parent
  - where execution returns after the child closes
- It should also answer the minimum purpose of every visible contract without relying on chat sessions.
- The current architecture truth should answer:
  - which subsystems and components exist
  - which files each architecture node owns
  - which dependencies and public interfaces matter
  - which invariants ordinary contracts must preserve
  - when an architecture amendment contract is required.

## Contract Tree Law
- Contracts should form an explicit parent/child tree.
- Each contract should be able to declare:
  - `contract_id`
  - `parent_contract_id`
  - `root_campaign`
  - `status`
  - `summary`
  - `goal`
  - `return_to`
- A child contract may pause a parent, but it may not silently replace it.
- If a child contract opens because a red line was crossed, record:
  - which red line was crossed
  - why the parent could not continue honestly
  - which parent step execution must return to

## Contract Summary Law
- Every visible contract should carry one short `summary`.
- `summary` answers the minimum human-readable question:
  - 这刀在干什么
- `goal` may remain fuller and more strategic, but `summary` must stay display-sized.
- Do not leave a live contract as identifier + status only.

## Contract Tree Pruning Law
- The live contract tree should remain navigable.
- When a child branch becomes:
  - `completed`
  - `abandoned`
  - or otherwise no longer required for active navigation
  collapse it from the live tree view rather than letting the visible tree grow forever.
- Do not erase its evidence; archive it in:
  - `journal.jsonl`
  - `evidence_index.json`
- The live tree should keep:
  - the root campaign
  - the active branch
  - unresolved siblings
  - explicit `return_to`
- Every visible live-tree line should render as:
  - `contract_id — summary [status]`
- When a branch is collapsed into history, preserve summaries in the collapsed bucket instead of reverting to bare ids.

## Runtime Bootstrap Law
- When entering a new project that lacks process-truth scaffolding, automatically create:
  - `dev_repo/state.json`
  - `dev_repo/journal.jsonl`
  - `dev_repo/evidence_index.json`
  - `dev_repo/tree.md`
- When entering an old or unknown project that lacks architecture-truth scaffolding, initialize `dev_repo/architecture/` before broad planning.
- Initial architecture census should be honest about confidence:
  - `confirmed` for facts directly proven by code, config, or scripts
  - `inferred` for naming/call-graph based reconstruction
  - `unknown` for areas that need a future probe.
- Create those four siblings directly under `dev_repo/`.
- Do not create nested runtime folders by default unless the user explicitly asks for multiple concurrent campaigns.
- Prefer the shared helper at `scripts/bootstrap_dev_repo_runtime.py` relative to this skill directory.

## Parent-Child Return Law
- If execution cannot state where it returns after the current child contract, the contract tree is malformed.
- A local firefight may unblock the mainline, but it may not quietly become the new mainline.

## Enforcement
- Other skills may narrow scope but may not weaken these rules.
- If a separate skill conflicts with this file, this file wins.
- If a skill needs stronger domain checks, it may add them, but it may not bypass the approval-first, evidence-first, and one-slice-one-commit contract.

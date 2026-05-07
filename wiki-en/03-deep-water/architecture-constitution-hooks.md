# Architecture Constitution And Contract Hooks

## Table Of Contents
- [What This Page Solves](#what-this-page-solves)
- [Shortest Definition](#shortest-definition)
- [Why Strong Hooks Are Needed](#why-strong-hooks-are-needed)
- [What The Architecture Constitution Is](#what-the-architecture-constitution-is)
- [Initializing Architecture During Old-Project Takeover](#initializing-architecture-during-old-project-takeover)
- [How Detailed The Architecture Map Should Be](#how-detailed-the-architecture-map-should-be)
- [Ordinary Contracts And Amendment Contracts](#ordinary-contracts-and-amendment-contracts)
- [Minimum Runtime Rules](#minimum-runtime-rules)
- [One-Line Conclusion](#one-line-conclusion)
- [Related Pages](#related-pages)

## What This Page Solves

This page answers a runtime-layer question:

**How do we make contracts trigger reliably instead of relying on agent memory, while making architecture constrain both planning and execution?**

Atomic contracts solve the first-order problem: review the plan before execution. But once a system gets deeper, two new drifts appear:

- an agent enters a host planning surface such as Claude Code, Codex, or Cursor, but produces only a free-form plan instead of a contract
- a contract looks valid, but never references the real architecture, so execution casually changes module boundaries, dependency direction, or runtime flow

The first problem needs contract hooks. The second problem needs an architecture constitution.

They belong together: **hooks make plans enter the contract system; the architecture constitution keeps contracts attached to system shape.**

## Shortest Definition

The shortest definition is:

> Host plan mode is only `plan-start`, not the contract itself.  
> Architecture may change, but only through an amendment contract.

That means:

- Claude Code / Codex / Cursor / OpenCode planning is the entrance into the contract system
- after that entrance, `plan-compile` must turn the plan into a Cyber-Ming Atomic Execution Contract
- execution requires `contract-activate`
- the active slice must declare which architecture nodes it touches
- architecture changes must route through `architecture-amend`

## Why Strong Hooks Are Needed

If the system only says "please write a contract first," it slowly returns to agent voluntarism.

Agent voluntarism fails because:

- a fresh window may not remember the rule
- a host plan mode may not output contract fields
- the executor may treat "I wrote a plan" as "the contract exists"
- complex work may smuggle architecture changes into ordinary implementation detail

So the runtime needs a named lifecycle:

```text
bootstrap-read
  -> plan-start
  -> plan-compile
  -> contract-activate
  -> exec-start
  -> exec-close
```

If architecture changes are involved, the lifecycle also needs:

```text
architecture-amend
```

This does not add ceremony for its own sake. It turns steps that used to live in agent memory into stable trigger points.

## What The Architecture Constitution Is

The architecture constitution is not just another `ARCHITECTURE.md`.

An ordinary architecture document often answers "what roughly exists." The architecture constitution also answers:

- which subsystems exist
- which files belong to which architecture nodes
- how those nodes depend on each other
- which public interfaces should not change casually
- which invariants ordinary contracts must preserve
- when an architecture amendment contract is required

Recommended location:

```text
dev_repo/architecture/
├── README.md
├── ARCHITECTURE.md
├── graph.json
├── index.json
├── invariants.md
├── diagrams/
└── decisions/
```

`graph.json` and `index.json` are machine-readable maps for agents. `ARCHITECTURE.md` and `invariants.md` are the explanatory layer for both humans and agents. `decisions/` stores architecture decisions.

## Initializing Architecture During Old-Project Takeover

When taking over an old project, runtime truth alone is not enough.

`dev_repo/state.json` and `tree.md` tell a fresh window what campaign is active. But that fresh window also needs to know what the territory looks like.

Old-project takeover should add one step:

```text
architecture census
```

Minimum census order:

1. Read entry files: README, package files, startup scripts, config, routes, and main commands
2. Identify subsystems: CLI, server, frontend, data layer, jobs, tests, and so on
3. Build file ownership: which files belong to which architecture nodes
4. Find critical flows: install flow, request flow, build flow, contract flow, evidence flow
5. Write invariants: which boundaries ordinary contracts must preserve
6. Mark confidence: `confirmed`, `inferred`, `unknown`

Honesty matters most.

The first architecture map for an old project may be incomplete, but it must not pretend to be omniscient. `unknown` is an entrance for future scouting, not a failure.

## How Detailed The Architecture Map Should Be

The useful standard is:

**Detailed enough for an agent to plan changes, judge boundaries, and maintain the system after completion; not so detailed that every function becomes a node.**

Use four layers:

1. System context
2. Major subsystems / containers
3. Maintainable components
4. Critical flows and invariants

Every architecture node should capture:

```yaml
node_id:
purpose:
owned_files:
public_interfaces:
depends_on:
depended_on_by:
invariants:
allowed_change_types:
requires_amendment_when:
verification:
known_debt:
confidence:
```

A plain file list is too shallow. A full AST/function-level map is usually too heavy. Module responsibility, dependency boundaries, critical flows, and invariants are the grain that best reduces cognitive debt.

## Ordinary Contracts And Amendment Contracts

An ordinary contract works under the existing architecture constitution.

It should declare:

- `affected_architecture_nodes`
- `unchanged_architecture_nodes`
- `architecture_delta`
- `requires_architecture_amendment`

When `requires_architecture_amendment: false`, the contract should still explain why no amendment is needed.

An amendment contract changes architecture.

It must declare:

- what changes
- what stays unchanged
- why the current architecture is insufficient
- the new boundary, dependency, and runtime-flow model
- which diagrams, indexes, ADRs, and invariants must be updated
- how the architecture change will be verified

This gives architecture change constitutional seriousness.

It is not that the old law can never change. It is that architecture may change only through a visible amendment path, not by being smuggled through ordinary implementation.

## Minimum Runtime Rules

### First, Starters Must Name The Hook

Host entries should say:

- plan / ask mode is only `plan-start`
- free-form plans must compile into contracts
- execution requires an active contract
- architecture changes use `architecture-amend`

### Second, Planners Must Read Architecture

Contract writing should read at least:

- `dev_repo/architecture/README.md`
- `dev_repo/architecture/ARCHITECTURE.md`
- `dev_repo/architecture/graph.json`
- `dev_repo/architecture/index.json`
- `dev_repo/architecture/invariants.md`

### Third, Executors Must Write Delta

Completion needs more than passing tests. It must state:

- which architecture nodes were touched
- whether architecture changed
- if it changed, which architecture files were updated
- if it did not change, why the work remained inside ordinary contract bounds

### Fourth, Old-Project Takeover Must Initialize The Map

An old project without an architecture map should not go straight into broad planning.

Initialize `dev_repo/architecture/` first. Even a first pass that separates `confirmed`, `inferred`, and `unknown` is safer than letting a fresh agent plan from impressions.

## One-Line Conclusion

Contract hooks answer how plans reliably become contracts. The architecture constitution answers how contracts remain anchored in system shape.

Together, they move Cyber-Ming from prompt discipline into runtime engineering governance.

## Related Pages

- [Campaign Runtime Guide](../../dev_repo/README.md)
- [Why a Child Contract Must Not Silently Replace the Parent Contract](parent-contracts.md)
- [Free Development Mode](free-development-mode.md)
- [Cyber Cognitive Debt](cognitive-debt.md)

# ADR-0001: Store Architecture Constitution Beside Runtime Truth

Status: accepted

## Context

Cyber-Ming already stores process truth in `dev_repo`: current campaign state, journal, evidence index, and contract tree. That reduces context decay, but it does not fully reduce architecture-level cognitive debt. A later agent can know what happened without knowing which subsystems exist, which files belong to them, or when a change silently crosses an architecture boundary.

## Decision

Store architecture truth under `dev_repo/architecture/` as a sibling to process truth.

The architecture constitution contains:

- human-readable overview
- machine-readable graph
- file and entrypoint index
- invariants
- diagrams
- ADRs

Every implementation contract should declare affected architecture nodes and architecture delta. Architecture changes require an amendment contract.

## Consequences

- Old-project takeover can initialize architecture truth instead of relying on oral summaries.
- Planning agents can use the architecture graph to choose safer slices.
- Completion can include architecture delta evidence.
- Architecture updates become visible and reviewable instead of being smuggled through ordinary implementation.

## Non-Goals

- Do not model every function by default.
- Do not freeze architecture permanently.
- Do not replace runtime truth, tests, commits, or evidence.

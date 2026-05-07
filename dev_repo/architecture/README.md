# Architecture Constitution

This directory stores architecture truth for the current repository.

Runtime truth answers which campaign and contract are active. Architecture truth answers what the system is, where its boundaries are, which files belong to which nodes, and when a normal implementation contract must become an architecture amendment contract.

Data-model truth is a constitutional layer inside architecture truth. It answers which durable entities and relationships exist, which facts are source versus derived, and when a normal implementation contract must become an ER/data-model amendment contract.

## Detail Standard

Use agent-actionable architecture:

1. System context
2. Major subsystems / containers
3. Maintainable components
4. Critical flows and invariants

Do not model every function by default. Function-level maps are reserved for unusually risky areas where they directly reduce planning ambiguity.

## Files

- `ARCHITECTURE.md`: human-readable architecture map.
- `graph.json`: machine-readable architecture graph.
- `index.json`: file and subsystem index for agent planning.
- `invariants.md`: architecture rules ordinary contracts must preserve.
- `diagrams/`: Mermaid diagrams for context, components, and critical flows.
- `decisions/`: architecture decision records.
- `data-model/`: ER diagram, entity catalogue, relationship catalogue, data invariants, and migration expectations.

## Confidence Labels

- `confirmed`: proven directly by code, config, scripts, or runtime evidence.
- `inferred`: reconstructed from naming, file layout, imports, or commit history.
- `unknown`: needs a future probe or human confirmation.

Do not forge certainty during old-project takeover. Unknowns are useful evidence, not failure.

## Amendment Rule

Open an architecture amendment contract when a change alters:

- subsystem boundaries
- module responsibilities
- public interfaces
- dependency direction
- runtime flow
- persistence or evidence model
- security, safety, or governance invariants
- host adapter semantics

An amendment must state what changes, what stays unchanged, why the current architecture is insufficient, how the new architecture works, and how it will be verified.

## Data Model Rule

Open a data-model amendment contract when a change alters:

- entity existence, identity, ownership, or source/derived classification
- relationship cardinality, reference direction, or deletion semantics
- primary key, foreign-key-like reference, uniqueness, status, enum, or state-machine meaning
- persistence semantics exposed through API, ORM, schema, migration, or runtime truth
- migration, backfill, compatibility, or evidence responsibilities

Data-model amendments should update `data-model/ER.md`, `data-model/er.mmd`, `data-model/entities.json`, `data-model/relationships.json`, and the relevant invariants or migration notes.

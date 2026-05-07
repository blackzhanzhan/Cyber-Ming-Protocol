# Entity Relationship Model

Status: initial data-model constitution scaffold

Confidence: confirmed for repository runtime files and architecture files that exist in this repo; unknown for adopters that have not bootstrapped `dev_repo`.

## Scope

Cyber-Ming-Protocol does not currently expose an application database schema in this repository. Its durable data model is the protocol runtime itself:

- campaign state
- contract tree
- evidence index
- journal entries
- architecture constitution
- data-model constitution
- installed manifest records in adopter projects

These entities are file-backed protocol facts rather than relational database tables. The ER model still matters because agents need stable identity, ownership, source/derived boundaries, and amendment triggers.

## Core Entities

### Campaign

Purpose: root unit of serious work.

Identity: `campaign_id`.

Source of truth: `dev_repo/state.json`.

Owns or references:

- root contract
- active contract
- visible contract map

### Contract

Purpose: approved execution boundary for planning, implementation, verification, evidence, and commit unit.

Identity: `contract_id`.

Source of truth: `dev_repo/state.json` when active; historical records in `dev_repo/journal.jsonl`.

Owns or references:

- parent contract
- root campaign
- return target
- summary and goal
- architecture delta
- data-model delta

### Evidence Item

Purpose: durable proof attached to a contract, assertion, verification command, artifact, or commit.

Identity: implementation-specific evidence key or generated journal reference.

Source of truth: `dev_repo/evidence_index.json` and `dev_repo/journal.jsonl`.

### Journal Entry

Purpose: append-only runtime chronicle of contract events, evidence, collapsed branches, and execution notes.

Identity: timestamp plus event id when present.

Source of truth: `dev_repo/journal.jsonl`.

### Architecture Node

Purpose: agent-actionable subsystem, component, flow, or invariant boundary.

Identity: `node_id`.

Source of truth: `dev_repo/architecture/graph.json` and `dev_repo/architecture/index.json`.

### Data Entity

Purpose: agent-actionable persistent business or protocol fact tracked by the ER/data-model constitution.

Identity: `entity_id`.

Source of truth: `dev_repo/architecture/data-model/entities.json`.

### Data Relationship

Purpose: cardinality, reference, and deletion semantics between data entities.

Identity: `relationship_id`.

Source of truth: `dev_repo/architecture/data-model/relationships.json`.

### Installed Manifest

Purpose: record of installed Cyber-Ming assets in a host or project environment.

Identity: manifest path plus install root.

Source of truth: generated manifest in the adopter workspace.

Confidence: inferred from installer architecture; exact adopter paths are project-specific.

## Relationship Summary

- One Campaign may contain many Contracts.
- One Contract may have zero or one parent Contract.
- One Contract may produce many Evidence Items.
- One Contract may produce many Journal Entries.
- One Contract may affect many Architecture Nodes.
- One Contract may affect many Data Entities.
- One Architecture Node may own many Data Entities.
- One Data Relationship links exactly two Data Entities.
- One Installed Manifest records many installed protocol assets.

## Source Versus Derived Rules

- `dev_repo/state.json` is current runtime source truth.
- `dev_repo/journal.jsonl` is append-only historical source truth.
- `dev_repo/evidence_index.json` is evidence source truth.
- `dev_repo/tree.md` is a navigational projection of contract state.
- `dev_repo/architecture/graph.json` and `index.json` are architecture source truth.
- `dev_repo/architecture/data-model/entities.json` and `relationships.json` are data-model source truth.
- `site/dist/**` is generated publication output, not source truth.

When source and derived artifacts disagree, contracts must repair the source first, then regenerate or update projections.

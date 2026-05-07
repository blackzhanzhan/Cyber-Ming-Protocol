# Data Model Constitution

This directory stores data-model truth for the current repository.

Architecture truth answers system boundaries and responsibilities. Data-model truth answers which durable facts exist, how they relate, where identity and state live, and when a normal implementation contract must become an ER/data-model amendment contract.

## Detail Standard

Use agent-actionable data modeling:

1. Core entities and their owning architecture nodes
2. Identity, status, uniqueness, and foreign-key-like references
3. Relationships with cardinality and deletion semantics
4. Source data versus derived, cached, projected, or generated data
5. Migration, backfill, compatibility, and evidence responsibilities

Do not model every temporary variable, view-model, or local helper object. Add lower-level schema detail only when it directly reduces planning ambiguity or migration risk.

## Files

- `ER.md`: human-readable entity relationship map.
- `er.mmd`: Mermaid ER diagram.
- `entities.json`: machine-readable entity catalogue.
- `relationships.json`: machine-readable relationship catalogue.
- `invariants.md`: data-model rules ordinary contracts must preserve.
- `migrations.md`: migration, backfill, and compatibility expectations.

## Confidence Labels

- `confirmed`: proven directly by code, config, schemas, migrations, fixtures, or runtime files.
- `inferred`: reconstructed from naming, file layout, documentation, or observed usage.
- `unknown`: needs a future probe or human confirmation.

Do not invent confirmed database facts during old-project takeover. If a repository lacks schema or migration files, initialize unknowns honestly and bind future work to amendment rules.

## Amendment Rule

Open a data-model amendment contract when a change alters:

- entity existence or ownership
- relationship cardinality or deletion semantics
- primary identity, foreign-key-like reference, or uniqueness rule
- status field, enum meaning, or state-machine semantics
- source data versus derived/cache/projection status
- persistence semantics exposed through API, ORM, schema, migration, or runtime truth
- migration, backfill, compatibility, or evidence responsibilities

An amendment must state what changes, what stays unchanged, why the current model is insufficient, how existing data remains compatible, and how the ER/data-model artifacts will be verified.

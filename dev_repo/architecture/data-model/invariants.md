# Data Model Invariants

These invariants are ordinary-contract red lines. If a change needs to alter one, open a data-model amendment contract first.

## Identity Invariants

- `campaign_id`, `contract_id`, `node_id`, `entity_id`, and `relationship_id` are durable identities within their own scopes.
- Contract parent/child relationships must preserve an explicit `return_to` path.
- Evidence must remain traceable to an assertion, artifact, verification command, or commit context.

## Source Truth Invariants

- `dev_repo/state.json` is current runtime source truth.
- `dev_repo/journal.jsonl` is historical append-only source truth.
- `dev_repo/evidence_index.json` is evidence source truth.
- `dev_repo/tree.md` is a navigational projection and must not outrank source runtime files.
- `dev_repo/architecture/graph.json` and `index.json` are architecture source truth.
- `dev_repo/architecture/data-model/entities.json` and `relationships.json` are data-model source truth.
- Generated site output is derived publication output and must not become source truth for doctrine or data semantics.

## ER Amendment Invariants

- Adding, deleting, renaming, or re-owning a data entity requires a data-model amendment contract.
- Changing relationship cardinality, reference direction, deletion semantics, or compatibility expectations requires a data-model amendment contract.
- Changing primary identity, foreign-key-like references, uniqueness, status fields, or enum/state-machine meaning requires a data-model amendment contract.
- Reclassifying data from source to derived/cache/projection, or the reverse, requires a data-model amendment contract.
- Adding migration, backfill, or compatibility logic requires the contract to state `migration_required` and `backfill_required`.

## Old-Project Takeover Invariants

- If real schema, ORM, migrations, fixtures, or API contracts exist, the ER model must bind to them.
- If they do not exist or cannot be proven, use `unknown` or `inferred`; do not invent `confirmed` entities.
- Inferred relationships must name their evidence source.

## Contract Field Invariants

Every implementation contract that can touch durable data semantics should state:

- `affected_data_entities`
- `unchanged_data_entities`
- `data_model_delta`
- `requires_er_amendment`
- `migration_required`
- `backfill_required`

If all fields are intentionally empty, the contract should say why no durable data semantics are affected.

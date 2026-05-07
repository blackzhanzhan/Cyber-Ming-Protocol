# Migration And Backfill Policy

Cyber-Ming-Protocol currently stores its own runtime truth in repository files rather than a database. Migration discipline still applies because agents can otherwise corrupt historical runtime, architecture, or evidence semantics.

## When Migration Is Required

A contract must declare `migration_required: true` when it changes:

- durable identity fields
- relationship cardinality or reference fields
- source versus derived/cache/projection classification
- status or enum/state-machine meaning
- file format for runtime, evidence, architecture, or data-model truth
- installer manifest schema
- compatibility expectations for existing adopter workspaces

## When Backfill Is Required

A contract must declare `backfill_required: true` when existing data must be rewritten, enriched, regenerated, or re-indexed for the new model to be true.

Examples:

- populating a new required contract field in historical runtime files
- regenerating `tree.md` projections after source schema changes
- updating existing architecture or ER graph entries after an entity rename
- converting installed manifest records to a new schema

## Compatibility Expectations

- Prefer additive schema changes over destructive rewrites.
- If a required field is introduced, state how older files are detected and upgraded.
- If old files remain valid, document the compatibility rule.
- If old files become invalid, provide a migration path and a verification command.
- Preserve journal and evidence traceability whenever possible.

## Verification Expectations

Data-model migrations should be verified with the narrowest command that proves:

- JSON or structured data still parses.
- Required entities and relationships exist.
- Source and derived artifacts agree.
- Historical runtime or adopter data remains readable or has a documented conversion path.

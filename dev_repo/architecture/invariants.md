# Architecture Invariants

These invariants are ordinary-contract red lines. If a change needs to alter one, open an architecture amendment contract first.

## Governance Invariants

- Repository law outranks chat residue, memory residue, and free-form agent plans.
- Host-native plan mode is only a hook surface; it is not execution authority.
- Atomic Execution Contracts remain the authority for implementation boundaries, verification, evidence, and commit units.
- Free development mode must be explicitly activated by the user.
- Completion is evidence-based and cannot be self-certified by execution summary alone.

## Runtime Invariants

- `dev_repo` runtime truth must remain separate from historical prose.
- Process truth and architecture truth are siblings:
  - process truth: `state.json`, `journal.jsonl`, `evidence_index.json`, `tree.md`
  - architecture truth: `dev_repo/architecture/**`
- Runtime bootstrap must not overwrite existing truth files.
- Old-project takeover must not fake architecture certainty. Use `confirmed`, `inferred`, and `unknown`.

## Architecture Invariants

- Architecture changes require amendment contracts when they alter boundaries, responsibilities, public interfaces, dependency direction, runtime flow, persistence/evidence models, or host adapter semantics.
- Ordinary implementation contracts must declare affected architecture nodes and architecture delta.
- Architecture diagrams and machine-readable graph/index files must not contradict each other.
- The architecture graph should stay agent-actionable: subsystem, component, critical flow, and invariant level by default.

## Installer Invariants

- Project installs should be possible even when a host binary is not present.
- Managed starter blocks should be upserted rather than duplicated.
- Installed manifests must record install root, skills directory, starter target, docs bundle, and installed skills.

## Site Invariants

- The static site build uses `site/content-manifest.json` as the route source of truth.
- Site images must come from approved comic assets or approved generated site assets.
- `npm run site:check` must validate manifest coverage, build output, local links, and image policy.

# Cyber-Ming-Protocol Architecture

Status: initial architecture constitution scaffold

Confidence: inferred from repository layout, package scripts, installer code, skill files, and site scripts.

## System Context

Cyber-Ming-Protocol is a governance protocol and tooling bundle for deep-water AI coding. It provides:

- protocol documentation and teaching wiki
- IDE-side skills for contract planning, execution, takeover, scouting, and free development
- starter files for host environments
- a CLI installer that copies skills, starters, and docs into supported hosts
- static site generation for a bilingual teaching wiki
- Web audit templates for independent plan and completion review
- `dev_repo` runtime and architecture truth for serious work

## Major Subsystems

### `protocol-docs`

Purpose: store the human-readable governance methodology.

Owned files:

- `README.md`
- `BOOTSTRAP.md`
- `bootstrap/**`
- `wiki/**`
- `wiki-en/**`
- `article/**`
- `web-audit-templates/**`

### `skill-policy-layer`

Purpose: provide host-readable execution rules and reusable workflows.

Owned files:

- `skill/*/SKILL.md`
- `skill/global_rules/scripts/**`

### `contract-hook-runtime`

Purpose: route host planning and execution surfaces into explicit Cyber-Ming contract hooks.

Owned files:

- `skill/contract-hook-router/SKILL.md`
- `starter/common.md`
- `starter/cursor-starter.mdc`
- `BOOTSTRAP.md`
- `bootstrap/ide-executor.md`

### `cli-installer`

Purpose: install Cyber-Ming starters, skills, docs, and project helper files into supported hosts.

Owned files:

- `bin/cyber-ming.js`
- `installer/lib/**`
- `starter/project-helper.js`
- `package.json`

### `static-teaching-site`

Purpose: generate and publish the bilingual illustrated teaching wiki.

Owned files:

- `site/**`
- `assets/site/generated/**`
- `assets/visual-protocol/**`
- `.github/workflows/pages.yml`
- `.github/workflows/sync-gitee.yml`

### `dev-runtime-truth`

Purpose: store campaign, contract, evidence, journal, tree, and architecture truth inside the repo.

Owned files:

- `dev_repo/state.json`
- `dev_repo/journal.jsonl`
- `dev_repo/evidence_index.json`
- `dev_repo/tree.md`
- `dev_repo/README.md`
- `dev_repo/architecture/**`

## Critical Flows

### Contract Hook Flow

```text
host plan/ask mode
  -> contract-hook-router plan-start
  -> approval-first-planner plan-compile
  -> human approval / active contract
  -> approved-checklist-executor exec-start
  -> verification and evidence
  -> exec-close with architecture_delta
```

### Architecture Amendment Flow

```text
ordinary contract detects architecture change
  -> architecture-amend hook
  -> amendment contract states what changes and what stays unchanged
  -> graph/index/invariants/ADR update
  -> verification
  -> return_to parent contract
```

### Installer Flow

```text
bin/cyber-ming.js
  -> installer/lib/cli.js
  -> installer/lib/adapters.js selects host and scope
  -> installer/lib/install.js copies docs, skills, starter, helper
  -> manifest records installed runtime
```

### Static Site Flow

```text
site/content-manifest.json
  -> validate-content-manifest.mjs
  -> build-static-wiki.mjs
  -> site/dist
  -> validate-dist.mjs
  -> GitHub Pages / Gitee pages branch
```

## Architecture Change Policy

Normal implementation contracts may edit content, fix bugs, add narrow tests, or update docs within existing subsystem boundaries.

Architecture amendment contracts are required when changing subsystem ownership, host adapter semantics, contract lifecycle, architecture graph schema, runtime truth shape, publication flow, or installer install semantics.

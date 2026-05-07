---
name: probe-first-scout
description: Use when the real uncertainty is operational and a full implementation plan would be fake confidence. Design and run the smallest probe that can surface the real red light, define the expected green light, and package the result for the planning layer.
---

# Probe-First Scout

Prerequisite: read and obey the repository parent policy at `skill/global_rules/SKILL.md` first.

## Use When
- The task touches an unknown external system, unclear runtime boundary, suspicious integration seam, or hidden environment constraint.
- A full implementation plan would be premature because the first question is still “what is the real failure?”
- You need the smallest possible probe before planning the main campaign.

## Goal
- Surface the real red light with minimum blast radius.
- Define the green light that would justify larger implementation planning.
- Hand the result to the planning layer instead of pretending certainty.

## Output Contract
Your response must include:
1. a short stop-before-main-implementation notice
2. a minimal probe plan
3. expected red light and expected green light
4. explicit no-touch scope
5. target artifacts or logs to bring back
6. architecture uncertainty or affected architecture nodes, if any
7. data-model uncertainty or affected data entities, if any
8. an approval gate before writing probe code

## Planning Rules
- Prefer the smallest probe that can answer the operational uncertainty.
- Do not let the probe mutate into the real implementation.
- Keep the probe isolated from mainline behavior and broad refactors.
- If the repo has no `dev_repo/` runtime yet, make runtime bootstrap an explicit precondition or first micro-slice instead of silently probing without process truth.
- If the repo has no `dev_repo/architecture/` and the uncertainty is architectural rather than operational, make architecture census the first precondition instead of pretending a small runtime probe can solve it.
- If durable data semantics are unknown and the probe may affect persistence, schemas, migrations, runtime state, or API data contracts, make ER/data-model census the first precondition instead of pretending a small runtime probe can solve it.
- If the probe may change architecture boundaries, public interfaces, dependency direction, runtime flow, or invariants, it is not a probe-only task; route to an architecture amendment contract.
- If the probe may change entities, relationships, cardinality, identity, source/derived classification, migration, or backfill semantics, it is not a probe-only task; route to a data-model amendment contract.
- A probe may mark architecture nodes as `unknown`, but it must not silently rewrite `graph.json`, `index.json`, or `invariants.md` unless the approved probe explicitly owns those files.
- A probe may mark data entities or relationships as `unknown`, but it must not silently rewrite `entities.json`, `relationships.json`, `ER.md`, or `invariants.md` unless the approved probe explicitly owns those files.
- If the user writes imperially, the outer shell may be ceremonial, but the probe plan must remain technically explicit.
- If the user writes in English, use plain English operational language and avoid Chinese-only ritual terms.

## Probe Deliverables
- red-light expectation
- green-light expectation
- exact command or minimal script boundary
- affected or uncertain architecture nodes
- architecture facts to mark `confirmed`, `inferred`, or `unknown`
- affected or uncertain data entities and relationships
- data-model facts to mark `confirmed`, `inferred`, or `unknown`
- evidence to capture
- replanning trigger after probe returns

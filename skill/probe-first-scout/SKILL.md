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
6. an approval gate before writing probe code

## Planning Rules
- Prefer the smallest probe that can answer the operational uncertainty.
- Do not let the probe mutate into the real implementation.
- Keep the probe isolated from mainline behavior and broad refactors.
- If the repo has no `dev_repo/` runtime yet, make runtime bootstrap an explicit precondition or first micro-slice instead of silently probing without process truth.
- If the user writes imperially, the outer shell may be ceremonial, but the probe plan must remain technically explicit.

## Probe Deliverables
- red-light expectation
- green-light expectation
- exact command or minimal script boundary
- evidence to capture
- replanning trigger after probe returns

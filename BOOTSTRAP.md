# Bootstrap

If you received only this repository link, start here. This file is the role gate, not the full protocol.

## What This Is

This repository lets an IDE executor and a Web auditor self-bootstrap into Cyber-Ming without first reading everything.

Bootstrap is not case intake. Role entry comes first; case review comes after bootstrap succeeds.
Repository law must outrank current-session residue, historical dialogue residue, platform memory, account memory, personalization, and user-profile carryover.

## Modes: Recommended / Universal / Deep Onboarding

- Recommended repo-link mode: give the repository link plus this file and one role file. Use this when the host can read GitHub or repo URLs, use `webfetch`, or read the repository in a browser.
- In recommended mode, treat the GitHub repository link as a remote law source first. Do not `git clone` by default.
- Universal no-fetch mode: if the host cannot read repo URLs, paste this file and the role file directly. Do not let the agent pretend it already read the repo.
- Deep onboarding: this mainly applies to the IDE executor. If the host supports project-level skill directories, the executor may try the core three from the current project directory: `global_rules`, `approval-first-planner`, and `approved-checklist-executor`.
- No host-neutral one-click installation is assumed here. If project-level skills are unsupported, fall back to the manual protocol instead of blocking the task.
- The Web auditor still works from the protocol docs and `web-audit-templates/`; it does not require local execution-skill installation.

## If You Are The IDE Executor

Read [`bootstrap/ide-executor.md`](bootstrap/ide-executor.md).

## If You Are The Web Auditor

Read [`bootstrap/web-auditor.md`](bootstrap/web-auditor.md).

If the Web host still leaks prior memory or personalization into bootstrap, temporarily disable user-memory / personalization / dialogue-history-learning style settings and start a fresh conversation before retrying.

## When Bootstrap Succeeds

Bootstrap is successful only when both roles can state:

- who executes, who audits, who arbitrates
- the executor will not edit first; it will first provide the atomic checklist and boundaries
- the auditor will review plans and evidence, not implement
- completion requires Web-side review of plan and result, not executor self-certification

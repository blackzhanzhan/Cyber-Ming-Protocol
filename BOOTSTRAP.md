# Bootstrap

If you received only this repository link, start here. This file is the role gate, not the full protocol.

## What This Is

This repository lets an IDE executor and a Web auditor self-bootstrap into Cyber-Ming without first reading everything.

## Modes: Shallow Trial / Deep Onboarding

- Shallow trial: give the repository link plus this file and one role file. No installation required.
- Deep onboarding: by default this only applies to the IDE executor. If the host supports project or local skill directories, the executor may additionally use `skill/` for more stable execution.
- The Web auditor still works from the protocol docs and `web-audit-templates/`; it does not require execution-skill installation.

## If You Are The IDE Executor

Read [`bootstrap/ide-executor.md`](bootstrap/ide-executor.md).

## If You Are The Web Auditor

Read [`bootstrap/web-auditor.md`](bootstrap/web-auditor.md).

## When Bootstrap Succeeds

Bootstrap is successful only when both roles can state:

- who executes, who audits, who arbitrates
- the executor will not edit first; it will first provide the atomic checklist and boundaries
- the auditor will review plans and evidence, not implement
- completion requires Web-side review of plan and result, not executor self-certification

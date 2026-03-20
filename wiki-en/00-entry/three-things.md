# Protocol, Skill, and Web Audit Templates: The Three Things

## Table of Contents
- [What This Page Solves](#what-this-page-solves)
- [Shortest Definition First](#shortest-definition-first)
- [Asset Overview](#asset-overview)
- [Layer 1: What Is Protocol](#layer-1-what-is-protocol)
- [Layer 2: What Is Skill](#layer-2-what-is-skill)
- [Layer 3: What Are Web Audit Templates](#layer-3-what-are-web-audit-templates)
- [Why Web Templates Must Separate from Skill](#why-web-templates-must-separate-from-skill)
- [Three Common Misunderstandings](#three-common-misunderstandings)
- [Recommended Next Steps](#recommended-next-steps)

## What This Page Solves

Many people第一次看到 this project confuse three things into one:

- Take protocol as a package of installable prompts
- Take Skill as the protocol itself
- Take Web audit templates as local capabilities that need installation

All three misunderstandings lead the entry logic astray.

## Shortest Definition First

Cyber-Ming-Protocol is a **protocol-first** project.

- **Protocol** defines the governance skeleton
- **Skill** stabilizes high-frequency actions on IDE side
- **Web audit templates** stabilize audit questions on Web side

All three serve the same protocol, but not the same objects.

The most稳妥对外 narrative is: `Protocol / Skill / Docs` are three main落地 forms, `web-audit-templates/` is separate Web audit collaboration asset.

This page focuses on "protocol, Skill, templates" because Docs/Teaching偏 explanation side, doesn't directly承担 executor or auditor's action角色.

## Asset Overview

| Object | What It Is | Where | Main Function | Required | Easily Mistaken For |
|--------|------------|-------|---------------|----------|---------------------|
| Protocol | A set of human-AI governance rules | `README.md`, `wiki/` | Defines what should come first, what counts as completion, who's responsible | Yes, must understand | A package of prompts or aesthetic narrative |
| Skill | IDE-side stable trigger skeleton | `skill/` | Helps you more stably trigger planning, execution, probing, renewal | No, can install later | Protocol itself, automatic裁决器 |
| Docs/Teaching | Project explanation and teaching | `README.md`, `wiki/` | Helps you understand protocol, cases, boundaries, and how to start | Yes, must read to sufficient understanding | Just附属宣传 pages |
| Web Audit Templates | Web-side audit collaboration templates | `web-audit-templates/` | Helps you more stably do plan audit, completion audit, renewal judgment | No, optional | Local Skill, automatic executor |

## Layer 1: What Is Protocol

Protocol is the truly irreplaceable part of this project.

It defines a governance structure, such as:

- Review first, then execute
- Submit atomic checklist first, then allow动手
- Executor doesn't self-certify completion
- Completion depends on logs, artifacts, run results, commits as evidence
- When window decays, renew, don't drag in old context

These things hold even without Skill.

## Layer 2: What Is Skill

Skill's role is not替 you invent protocol, but帮 you more stably守 protocol on IDE side.

For example, current repo's skills固化 some high-frequency actions:

- `approval-first-planner`: First produce可审批 atomic checklist and boundaries
- `approved-checklist-executor`: Strictly execute, verify,归档 by approved pieces
- `probe-first-scout`: Don't pretend understand全局, run minimum probe first
- `legacy-project-handover`: Give只读快照 when taking over or renewing

But they don't change one thing:

**Skill can't替 you define truth.**

It can only让你 more stably approach protocol-required action rhythm, can't凭空变出 "already has evidence".

## Layer 3: What Are Web Audit Templates

Web audit templates are not local Skill, nor IDE-side triggers.

They just帮 you more stably扮演 auditor on Web side:

- Audit if plan is够 atomic
- Audit if completion真的成立
- Audit if current window has decayed, needs renewal

They do "how to ask, how to check, how to judge" skeleton, not "how to execute" skeleton.

## Why Web Templates Must Separate from Skill

Because these two sides承担 different roles:

- IDE-side skill corresponds to execution, planning, probing, takeover
- Web-side template corresponds to plan audit, completion audit, renewal judgment

If you put them all in `skill/`, readers easily误以为:

- Web audit is also a local installable
- Executor and auditor are just same type tools with different prompts

## Three Common Misunderstandings

### Misunderstanding 1: Install Skill, Protocol Auto-生效

Wrong: Installing Skill makes protocol自动 work
Right: Protocol works through your understanding and practice, Skill just makes it more stable

### Misunderstanding 2: Without Skill, Can't Use Cyber-Ming

Wrong: Must install Skill before可以用
Right: Can practice protocol fully by hand, Skill is optional enhancement

### Misunderstanding 3: Web Audit Templates Are Also Skills to Install

Wrong: Web templates are part of Skill package
Right: Web templates are Web-side协作 assets, not IDE-side installs

## Recommended Next Steps

- If you want to mentally run through in 30 seconds: [30-Second Demo](30-second-demo.md)
- If you want to directly onboard: [Bootstrap](bootstrap.md)
- If you want to understand when to install Skill: [Skill Guide](skill-guide.md)
- If you want to understand how it differs from workflow/spec: [Comparison](comparison.md)

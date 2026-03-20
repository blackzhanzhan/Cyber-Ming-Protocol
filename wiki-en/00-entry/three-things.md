# Protocol, Skill, and Web Audit Templates: The Three Things

## Table of Contents
- [What This Page Solves](#what-this-page-solves)
- [Shortest Definition First](#shortest-definition-first)
- [Asset Overview](#asset-overview)
- [Layer 1: What Is the Protocol](#layer-1-what-is-the-protocol)
- [Layer 2: What Is Skill](#layer-2-what-is-skill)
- [Layer 3: What Are Web Audit Templates](#layer-3-what-are-web-audit-templates)
- [Why Web Audit Templates Must Stay Separate from Skill](#why-web-audit-templates-must-stay-separate-from-skill)
- [Three Common Misreadings](#three-common-misreadings)
- [Recommended Next Steps](#recommended-next-steps)

## What This Page Solves

When many people first see this project, they collapse three different things into one:

- They treat the protocol as a package of installable prompts
- They treat Skill as the protocol itself
- They treat Web audit templates as local capabilities that also need installation

All three misunderstandings send the entry logic in the wrong direction.

## Shortest Definition First

Cyber-Ming-Protocol is a **protocol-first** project.

- **Protocol** defines the governance skeleton
- **Skill** stabilizes high-frequency actions on the IDE side
- **Web audit templates** stabilize audit questions on the Web side

All three serve the same protocol, but they are not the same kind of thing.

The safest public description is: `Protocol / Skill / Docs` are the project's three main delivery forms, while `web-audit-templates/` is a separate collaboration asset for the Web side.

This page focuses on protocol, Skill, and templates because Docs / Teaching sit more on the explanatory side. They do not directly carry the executor or auditor role.

## Asset Overview

| Object | What It Is | Where It Lives | Main Function | Required | Often Mistaken For |
|--------|------------|----------------|---------------|----------|--------------------|
| Protocol | A set of human-AI governance rules | `README.md`, `wiki/` | Defines what must happen first, what counts as completion, and who is responsible for what | Yes, you must understand it | A prompt pack or a stylistic narrative |
| Skill | A stable trigger skeleton on the IDE side | `skill/` | Helps you trigger planning, execution, probing, and renewal more reliably | No, you can install it later | The protocol itself or an automatic judge |
| Docs / Teaching | The explanatory and teaching layer of the project | `README.md`, `wiki/` | Helps you understand the protocol, cases, boundaries, and how to get started | Yes, you need enough of it to understand the system | Disposable supporting pages |
| Web Audit Templates | Audit collaboration templates for the Web side | `web-audit-templates/` | Helps you do plan audit, completion audit, and renewal judgment more reliably | No, optional | A local Skill or an automatic executor |

## Layer 1: What Is the Protocol

The protocol is the truly irreplaceable part of this project.

It defines a governance structure such as:

- Review first, then execute
- Submit an atomic checklist first, then allow work to begin
- The executor does not self-certify completion
- Completion must be established by logs, artifacts, run results, and commits as evidence
- When a window decays, you use renewal instead of dragging the old context forward

All of that still holds even if you never install Skill.

## Layer 2: What Is Skill

Skill does not invent the protocol for you. Its role is to help you hold the protocol more reliably on the IDE side.

For example, the skills in this repo solidify several high-frequency actions:

- `approval-first-planner`: Produce an atomic checklist and boundaries for approval first
- `approved-checklist-executor`: Execute, verify, and archive strictly by approved slices
- `probe-first-scout`: Do not pretend to understand the whole system; run the smallest probe first
- `legacy-project-handover`: Provide a read-only snapshot for takeover or renewal

But they do not change one thing:

**Skill cannot define truth for you.**

It can only help you get closer to the action rhythm required by the protocol. It cannot make evidence appear by itself.

## Layer 3: What Are Web Audit Templates

Web audit templates are not local Skill, and they are not IDE-side triggers.

They simply help you play the auditor role more reliably on the Web side:

- Audit whether the plan is atomic enough
- Audit whether completion is real
- Audit whether the current window has decayed and needs renewal

They provide the scaffold for how to ask, how to inspect, and how to judge, not for how to execute.

## Why Web Audit Templates Must Stay Separate from Skill

Because the two sides hold different roles:

- IDE-side Skill maps to execution, planning, probing, and takeover
- Web-side templates map to plan audit, completion audit, and renewal judgment

If you put everything into `skill/`, readers will easily misunderstand three things:

- That Web audit is also a local installable
- That executor and auditor are just the same kind of tool with different prompts
- That audit can be completed conveniently inside the same window

That would weaken the most important layer of the protocol: **role separation and sovereignty in human hands**.

## Three Common Misreadings

### Misreading 1: Installing Skill Makes the Protocol Work Automatically

Wrong. Installing Skill only makes the right actions easier to trigger. It does not mean you already satisfy the protocol's evidence standard.

### Misreading 2: Without Skill, You Cannot Use Cyber-Ming

Wrong. This protocol is first of all a governance method that can be executed by hand. You can absolutely run the loop manually first and decide about Skill later.

### Misreading 3: Web Audit Templates Are Also Skills You Install Locally

Wrong. Web templates help the auditor question, verify, and judge. They are not IDE-side local skills.

## Recommended Next Steps

- If you want to mentally run one round in 30 seconds, continue with [30-Second Demo](30-second-demo.md)
- If you want to bootstrap roles directly, continue with [Bootstrap](bootstrap.md)
- If you want to decide when Skill should be installed, continue with [Skill Guide](skill-guide.md)
- If you want to compare it with workflow and spec-driven approaches, continue with [Comparison](comparison.md)

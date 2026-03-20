# Skill Onboarding Guide

## Table of Contents
- [What This Page Solves](#what-this-page-solves)
- [Conclusion First: When to Install](#conclusion-first-when-to-install)
- [What's in Current Repo](#whats-in-current-repo)
- [Minimal Onboarding Sequence: How to Install](#minimal-onboarding-sequence-how-to-install)
- [Minimal Usage Sequence](#minimal-usage-sequence)
- [A Simple判断 Method](#a-simple-判断-method)
- [Most Common Pitfalls](#most-common-pitfalls)
- [Next Steps](#next-steps)

## What This Page Solves

This page solves two problems:

- **When to install**: Should you install Skill now?
- **How to install**: If yes, what sequence?

Core principle: **Understand protocol first, then decide how much to install.**

## Conclusion First: When to Install

### Cases适合 Don't Install Skill First

- You're still understanding protocol, haven't确认 will长期 adopt
- You just want to先 read ideas, reports and boundaries
- You want to先 use your existing IDE/Web组合 manual run一遍
- Current task很小、很轻、很短, not worth引入 complete governance skeleton

### Cases适合 Start Installing Skill

- You've understood approval-first, atomic checklist, evidence closure three things
- You发现 yourself经常漏 steps,漏 boundaries,漏 evidence
- You want to stabilize planner/executor/probe/succession actions
- You经常在 AI coding里遇到 pseudo-completion, lazy patches, context decay

### Cases暂不建议 Full Install

- Your host environment对 skill trigger support还不 stable
- You haven't想好 IDE executor and Web auditor怎么分工
- You目前 only need minimal loop, don't need complete skill panel

### A Simple判断 Method

If your recent main pain points are:

- **Not sure worth learning**: Don't install first
- **Know what to do, but always forget say全**: Can start installing
- **Environment still乱, role division not set**: Don't full install first
- **Already在 complex projects里 repeatedly踩 pseudo-completion and decayed context**:尽快 install core Skill

## What's in Current Repo

### `skill/`

This放的是 repo-side IDE skills:

- `global_rules`: Global rules, define不可违反 red lines
- `approval-first-planner`: Submit plan first, not allowed start directly
- `approved-checklist-executor`: Execute by approved checklist, verify,归档
- `probe-first-scout`: When不确定, probe first, don't pretend懂
- `legacy-project-handover`: New window takeover, context renewal,只读 snapshot

### `web-audit-templates/`

This放的是 Web-side audit templates:

- `plan_audit_template.md`: Audit plan
- `completion_audit_template.md`: Audit completion
- `succession_judge_template.md`: Judge renewal

These three templates are **not local Skill**, don't belong to IDE-side installation process.

## Minimal Onboarding Sequence: How to Install

### Shallow Trial vs Deep接入

- **Shallow trial**: Only give repo link and role files, no installation required, no clone
- **Deep接入**: If host supports skill directory,才 enter installation steps

Shallow trial don't clone by default. First treat GitHub repo link as remote law source to read; only when you明确 require skill installation or local repo operations,才 enter clone steps.

### Step 1: Install Core Three First

- `global_rules`
- `approval-first-planner`
- `approved-checklist-executor`

These three solve most core problems: plan first, execute later,归档 by piece.

### Step 2:补 Extensions As Needed

- `probe-first-scout`: When facing real不确定, not假 complexity
- `legacy-project-handover`: New window takeover, context renewal, or只读 handover

### Why Not "One-click Install" Here

Because currently different IDE/agent hosts have different skill loading methods. This repo provides publicly distributable skill definitions, not bound to single host installation scripts.

## Minimal Usage Sequence

Even with Skill接入, most稳妥 minimal sequence still is:

1. First let planner produce atomic checklist and boundaries
2. Let human review and decide whether approve
3. After approval, let executor execute by piece, verify,归档
4. Use Web templates as needed for plan audit, completion audit, renewal judgment

## If Your Environment Doesn't Support Skill

Then don't let installation问题 block you.

You can still fully practice protocol: manually require planner-style output, manually require executor-style execution and evidence return, manually use Web templates organize auditor questions.

**Protocol优先于 installation.**

## Most Common Pitfalls

### Pitfall 1: Install Skill Then Want to Skip Understanding

This usually只会把 misuse become more stable.

### Pitfall 2: Install Skill Then Want to Skip Approval

Wrong. Skill强化的是 action skeleton, not for bypassing human approval and evidence thresholds.

### Pitfall 3: Put Web Templates Into Local Skill Process

Wrong. Web templates belong to Web-side协作 assets, don't belong to IDE executor's local installation.

### Pitfall 4: Take Skill as One-click External挂

Skill is just enhancer. What真正 determines success is: whether approval first, execute by piece, evidence closure, maintain human居中裁决.

## Next Steps

- If you still judging protocol/Skill/template relationships, go back to [Three Things](three-things.md)
- If you want to mentally run through in 30 seconds first, see [30-Second Demo](30-second-demo.md)

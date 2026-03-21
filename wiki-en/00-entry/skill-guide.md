# Skill Onboarding Guide

## Table of Contents
- [What This Page Solves](#what-this-page-solves)
- [Conclusion First: When to Install](#conclusion-first-when-to-install)
- [What's in Current Repo](#whats-in-current-repo)
- [Minimal Onboarding Sequence: How to Install](#minimal-onboarding-sequence-how-to-install)
- [Minimal Usage Sequence](#minimal-usage-sequence)
- [A Simple Judge Method](#a-simple-judge-method)
- [Most Common Pitfalls](#most-common-pitfalls)
- [Next Steps](#next-steps)

## What This Page Solves

This page solves two problems:

- **When to install**: Should you install Skill now?
- **How to install**: If yes, what sequence?

Core principle: **Understand protocol first, then decide how much to install.**

## Conclusion First: When to Install

### Cases Suitable to NOT Install Skill First

- You're still understanding the protocol, haven't confirmed will long-term adopt
- You just want to first read ideas, reports, and boundaries
- You want to first use your existing IDE/Web combination to manually run once
- Current task is very small, very simple—not worth the complete governance skeleton

### Cases Suitable to Start Installing Skill

- You've understood approval-first, Atomic Execution Contract, evidence closure—these three things
- You yourself miss steps, miss boundaries, miss evidence
- You want to stabilize planner/executor/probe/succession actions
- Your AI coding tends toward pseudo-completion, lazy patches, context decay

### Cases Not to Full Install

- Your host environment doesn't have stable skill trigger support
- You haven't set up IDE executor and Web auditor
- You only need minimal loop, don't need complete skill panel

### A Simple Judge Method

If your recent main pain points are:

- **Not sure it's worth learning**: Don't install first
- **Know what to do, but always forget to say**: Can start installing
- **Environment is unstable, role division not set**: Don't full install first
- **Already dealing with complex projects with repeated pseudo-completion and decayed context**: Install core Skills

## What's in Current Repo

### `skill/`

These are repo-side IDE skills:

- `global_rules`: Global rules, define red lines
- `approval-first-planner`: Submit plan first, not allowed to start directly
- `approved-checklist-executor`: Execute by approved checklist, verify, archive
- `probe-first-scout`: When uncertain, probe first—don't pretend to understand
- `legacy-project-handover`: New window takeover, context renewal—read-only snapshot

### `web-audit-templates/`

These are Web-side audit templates:

- `plan_audit_template.md`: Audit plan
- `completion_audit_template.md`: Audit completion
- `succession_judge_template.md`: Judge renewal

These three templates are **not local Skill**—they don't belong to IDE-side installation process.

## Minimal Onboarding Sequence: How to Install

### Shallow Trial vs Deep Entry

- **Shallow trial**: Only give repo link and role files—no installation required, no clone
- **Deep entry**: If host supports skill directory, enter installation steps

Shallow trial: don't clone by default. First treat the GitHub repo link as a remote law source to read; only when you require skill installation or local repo operations, enter clone steps.

### Step 1: Install Core Three First

- `global_rules`
- `approval-first-planner`
- `approved-checklist-executor`

These three solve most core problems: plan first, execute later, by piece.

### Step 2: Add Extensions As Needed

- `probe-first-scout`: When facing real uncertainty—not fake complexity
- `legacy-project-handover`: New window takeover, context renewal, or read-only handover

### Why Not "One-click Install" Here

Because currently different IDE/agent hosts have different skill loading methods. This repo provides publicly distributable skill definitions—not bound to single host installation scripts.

## Minimal Usage Sequence

Even with Skill connected, the most stable minimal sequence still is:

1. First let the planner produce the Atomic Execution Contract and boundaries
2. Let human review and decide whether to approve
3. After approval, let executor execute by piece, verify, archive
4. Use Web templates as needed for plan audit, completion audit, renewal judgment

## If Your Environment Doesn't Support Skill

Then don't let installation block you.

You can still fully practice the protocol: manually require planner-style output, manually require executor-style execution and evidence return, manually use Web templates to organize auditor questions.

**Protocol comes first—installation comes second.**

## Most Common Pitfalls

### Pitfall 1: Install Skill Then Want to Skip Understanding

This usually will only make misuse become more stable.

### Pitfall 2: Install Skill Then Want to Skip Approval

Wrong. Skill's role is action skeleton—not for bypassing human approval and evidence thresholds.

### Pitfall 3: Put Web Templates Into Local Skill Process

Wrong. Web templates belong to Web-side assets—don't belong to IDE executor's local installation.

### Pitfall 4: Take Skill as One-click External

Skill is just an enhancer. What really determines success is: whether approval first, execute by piece, evidence closure, maintain human sovereignty.

## Next Steps

- If this is your first run, start with [First-Time Guide](prompt-pack.md)
- If you're still judging protocol/Skill/template relationships, go back to [Three Things](three-things.md)
- If you want to mentally run through in 30 seconds first, see [30-Second Demo](30-second-demo.md)

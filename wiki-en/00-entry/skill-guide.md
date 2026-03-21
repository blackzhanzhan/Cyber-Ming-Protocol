# Skill Guide (IDE-side Sub-guide for the Minimal Stable Loop)

## Table of Contents
- [What This Page Solves](#what-this-page-solves)
- [Conclusion First: When to Install](#conclusion-first-when-to-install)
- [What's in Current Repo](#whats-in-current-repo)
- [Minimal Onboarding Sequence: How to Install](#minimal-onboarding-sequence-how-to-install)
- [Minimal Usage Sequence](#minimal-usage-sequence)
- [A Simple Rule of Thumb](#a-simple-rule-of-thumb)
- [Most Common Pitfalls](#most-common-pitfalls)
- [Next Steps](#next-steps)

## What This Page Solves

The shortest Skill setup path from this page has already been folded into the [Minimal Stable Loop Guide](stable-loop-guide.md).

If you only want to get Layer 2 established, stay on that page first. Come here only when you want to slow down and look at the IDE-side half separately.

It answers two questions, both on the IDE side:

- **When to install**: Should you install Skill now?
- **How to install**: If so, in what sequence?

Core principle: **Run the protocol first, then decide how to stabilize the IDE side.**

This page is not the total guide to the minimal stable loop.

The minimal stable loop requires both:

- IDE-side Skill
- Web-side fixed prompt / app container

For the full definition, start with [Minimal Stable Loop Guide](stable-loop-guide.md).

## Conclusion First: When to Install

### When Not to Install Skill Yet

- You are still learning the protocol and have not decided whether to adopt it long term
- You only want to read the ideas, reports, and boundaries first
- You want to run one manual loop with your current IDE/Web setup first
- The current task is very small and does not justify the full governance skeleton

### When It Makes Sense to Install Skill

- You already understand approval-first, the Atomic Execution Contract, and evidence closure
- You keep missing steps, boundaries, or evidence
- You want planner / executor / probe / succession behavior to become more stable
- Your AI-coding work repeatedly runs into pseudo-completion, lazy patching, or context decay

### When Not to Install the Full Set

- Your host environment still does not trigger Skills reliably
- You have not yet settled the split between the IDE executor and the Web auditor
- You only need the minimal loop, not the full skill panel

### A Simple Rule of Thumb

If your recent main pain points are:

- **Not sure it is worth learning yet**: do not install Skill yet
- **You know what to do but keep forgetting to say or enforce it**: start with the core Skills
- **The environment is unstable and the role split is not settled**: do not install the full set yet
- **You are already in complex deep-water work with repeated pseudo-completion and context decay**: install the core Skills soon

## What's in Current Repo

### `skill/`

These are the repo-side IDE Skills:

- `global_rules`: defines the non-negotiable red lines
- `approval-first-planner`: requires a plan before execution begins
- `approved-checklist-executor`: executes approved slices, verifies them, and archives them
- `probe-first-scout`: probes first when uncertainty is real instead of pretending to understand
- `legacy-project-handover`: handles new-window takeover and read-only succession snapshots

### `web-audit-templates/`

These are Web-side audit templates:

- `plan_audit_template.md`: audits plans
- `completion_audit_template.md`: audits completion
- `succession_judge_template.md`: judges renewal and succession

These templates are **not local Skills**. They are not part of the IDE-side installation flow.

## Minimal Onboarding Sequence: How to Install

### Shallow Trial vs Deep Entry

- **Shallow trial**: pass the repo link and role files only; no installation and no clone
- **Deep entry**: move into IDE-side setup only if the host supports local repo operations and project-level skill loading

In a shallow trial, do not clone by default. Treat the GitHub repo link as a remote law source first. Only after you decide to enter the minimal stable loop should the executor clone the repo and load project-level Skill.

### Step 0: Clone the Repo Before Skill Setup

If you want the minimal stable loop, the executor needs at least:

- the repository available locally, or the ability to clone it
- the ability to read the core three under `skill/`
- a host mechanism that can load those Skills at project scope

The minimum move is simple: **clone the repo first, then load Skill.**

### Copy-Ready Prompt for the Executor Setup

```text
You are now entering IDE-side stable-loop setup.

If your host supports local repo operations and project-level Skill:
1. If the repo is not already local, clone https://github.com/blackzhanzhan/Cyber-Ming-Protocol.git
2. Read `skill/global_rules/SKILL.md`, `skill/approval-first-planner/SKILL.md`, and `skill/approved-checklist-executor/SKILL.md`
3. Load them through whatever project-level skill mechanism your current host actually supports
4. Report only: whether this is supported, how you loaded them, and which files are acting as live law

If your host does not support project-level Skill, explicitly say: “The IDE side of the stable loop is not established yet.” Do not pretend installation succeeded.
```

### Step 1: Load the Core Three First

- `global_rules`
- `approval-first-planner`
- `approved-checklist-executor`

These three cover the core loop: plan first, execute only after approval, and archive work slice by slice.

### Step 2: Add Extensions As Needed

- `probe-first-scout`: When facing real uncertainty—not fake complexity
- `legacy-project-handover`: New window takeover, context renewal, or read-only handover

### Why Not "One-click Install" Here

Because IDE and agent hosts still load Skills in different ways. This repo ships publicly distributable Skill definitions, not a one-host-only installer.

## Minimal Usage Sequence

Even with Skill loaded, the IDE-side minimum sequence is still:

1. First let the planner produce the Atomic Execution Contract and boundaries
2. Let the human review it and decide whether to approve
3. After approval, let the executor execute slice by slice, verify, and archive
4. But remember: the stable loop still requires the Web-side fixed prompt as the other half

## If Your Environment Doesn't Support Skill

Then don't let installation block you.

You can still fully practice the protocol: manually require planner-style output, manually require executor-style execution and evidence return, and manually use the Web templates to structure the auditor's review.

**Protocol comes first—installation comes second.**

## Most Common Pitfalls

### Pitfall 1: Install Skill Then Want to Skip Understanding

This usually will only make misuse become more stable.

### Pitfall 2: Install Skill and Then Try to Skip Approval

Wrong. Skill provides an action skeleton. It is not a bypass for human approval or evidence thresholds.

### Pitfall 3: Put Web Templates into the Local Skill Process

Wrong. Web templates are Web-side assets. They are not part of the IDE executor's local installation.

### Pitfall 4: Treat Skill as a One-click Add-on

Skill is only an enhancer. What determines success is whether you still keep approval first, execute slice by slice, close the loop with evidence, and preserve human sovereignty.

## Next Steps

- If you want to return to the Layer 2 parent page, go to [Minimal Stable Loop Guide](stable-loop-guide.md)
- If you have not yet completed Layer 1, start with [Minimal Loop Guide](prompt-pack.md)
- If you want the Web-side half, go to [Web Auditor App Guide](web-auditor-app-guide.md)
- If you're still judging protocol/Skill/template relationships, go back to [Three Things](three-things.md)

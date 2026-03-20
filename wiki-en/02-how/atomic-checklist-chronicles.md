# Core Ritual 1: Atomic Task Checklist and Chronicles

## Table of Contents
- [What This Page Solves](#what-this-page-solves)
- [Why It's the First Extended Skill](#why-its-the-first-extended-skill)
- [Atomic Checklist: Not Human-Written Plan, But Executor Submits First](#atomic-checklist-not-human-written-plan-but-executor-submits-first)
- [Simplest Way to Start](#simplest-way-to-start)
- [Howdetailed Should aqualified Checklist Be](#how-detailed-should-a-qualified-checklist-be)
- [Hypothetical: What Happens Without Atomic Checklist](#hypothetical-what-happens-without-atomic-checklist)
- [Another Hypothetical: What Changes With Atomic Checklist](#another-hypothetical-what-changes-with-atomic-checklist)
- [Chronicles Are Notattached, But History After Checklistlanded](#chronicles-are-not-attached-but-history-after-checklist-landed)
- [Checklist and Chronicles: Notserial, But Asynclinkage](#checklist-and-chronicles-not-serial-but-async-linkage)
- [Interrupt Immediately When "History" Tendency Appears](#interrupt-immediately-when-history--tendency-appears)
- [Pulse Atomic Checklist: Why It's More Flexible Than Blueprint](#pulse-atomic-checklist-why-its-more-flexible-than-blueprint)
- [How It Differs from Spec / Workflow](#how-it-differs-from-spec--workflow)
- [What Density Counts as Real Chronicles](#what-density-counts-as-real-chronicles)
- [What Form Counts as Real Chronicles](#what-form-counts-as-real-chronicles)
- [What Chronicles Actuallyremember](#what-chronicles-actually-remember)
- [Why Italleviate Part 1 Pain Points](#why-it-alleviate-part-1-pain-points)
- [How It Serves Cognitive Debt Repayment](#how-it-serves-cognitive-debt-repayment)
- [Four Common Drifts](#four-common-drifts)
- [One-line Summary](#one-line-summary)
- [Corresponding Implementation](#corresponding-implementation)
- [Related Pages](#related-pages)

## What This Page Solves

The minimal loop tells you how to run the first round, but "review plan first, review execution second, verify evidence last" is not enough. Because as long as the plan is still too, the executor can still、missing、 in a vague steps, then a summaryyou.

More importantly: **Without atomic checklist and chronicles, the systemvery realheavyhandle, technical debt will become increasingly safely.** Today you might push through, tomorrow when you want to、heavy、reconnect old window, you'll history has, no one cansaytochange.

So, after minimal loop, the first extended skill you must is:

- Have the executor submit **atomic task checklist** first
- Then write each clear state into **chronicles**

This page answers: why this is not plan, but the first real bone in the entire protocol; why it canalleviate technical distortion, governance distortion and cognitive debt; why it can futureheavyhandle; and why without this step, later white-box reconciliation, renewal, takeover and debt repayment will quickly.

## Why It's the First Extended Skill

From "Minimal Loop: One-Audit and Multi-Audit Versions", the most natural question is:

**Howdetailed should the plan be, before it's worth reviewing?**

If the plan only stays at thisgranularity:

- "Upgrade the chain"
- "addadd document generation"
- "Finally fix the write-in"

Then it looks like a plan, but still leaves too much black-box space for the executor. Youvery know:

- Ittofirstchange
- Which step counts asrealreal done
- Which step canminimal rollback if
- Which step has hard dependency on next step

To truly understand this step, best first accept two realities alreadyestablish in "01-Why":

- AI coding changed developer position, humansstartbear、、reconnect
- The most place of black-box multi-Agent is technical distortion and governance distortion happen together

Atomic task checklist and chronicles are the first layercorrect to these two realities. They're not to more, but tolet executor ""of.

## Atomic Checklist: Not Human-Written Plan, But Executor Submits First

This mustnail: atomic task checklist is notlet human first spendsmall todo, norletyoufirst spec. The realdois——**First require IDE executor to submit adetailed checklist, then let human and Web auditor itisqualified.**

This differs from many plan/spec patterns:

- Ordinary plans often just tell AI "do"
- Atomic checklist requires executor firstsubmit "specificchange、、"

So it's not better plan, but a harder-to construction drawing. What yourealreal do is not write checklist, butone sentence short instruction executortofirstsubmit construction drawingof.

If this is your first time, don'tunderstand it too heavy. Justremember one very simple principle:

**Don't let executor give you vague module plans, itdetailedto function modification, test point establishment, artifactcheck granularity.**

## Simplest Way to Start

You canstraightreconnect say to IDE:

```text
I want to do this: <your requirement>

Don'tchange code directly first.
Give me an atomic checklist asdetailed as possible.
Try todetailedto: which function to modify, what test point to add, what result counts as passing.
```

If you want to be more direct, add:

```text
Don't give me vague plans.
Try to break down by function modification, test point establishment, artifactcheck.
```

These two sentences are enough to first round. You don't need tofirst writecomplete checklist, nor need tothen all technical details. The purpose of atomic checklist islet executor firstexpose how itdo.

## Howdetailed Should aqualified Checklist Be

Aqualified atomic checklist shoulddetailedto:

1. **Function level**: Which function to modify, not just "improve module"
2. **Test point level**: What test to add or modify, not just "ensure quality"
3. **Artifact level**: What file or output to produce, not just "complete task"
4. **Dependency level**: Which step depends on which, not just "do A then B"

Example of:

- "Fix the authentication issue"
- "Improve error handling"

Example ofdetailed:

- "Modify `auth.validateToken()` to check expiration"
- "Add test case for expired token in `auth.test.js`"
- "Update error response format in `api.response.json`"

The difference is: with checklist, executor can inblack box; withdetailed checklist, each step must be.

## Hypothetical: What Happens Without Atomic Checklist

Without atomic checklist, common scenario:

1. You give requirement
2. Executor says "understood, will implement"
3. Executor works in black box
4. Executor reports "done, tests passed"
5. You believe it

Problem: You never knew:
- What exactly waschange
- In what order
- What couldback if
- Whether itreal ran chain

Result: When something goes wrong, you have nohandle to diagnose.

## Another Hypothetical: What Changes With Atomic Checklist

With atomic checklist:

1. You give requirement
2. Executor submits detailed checklist
3. You or Web review checklist
4. Executor executes step by step
5. Each step leaves chronicle
6. You verify based on chronicles

Benefit: You always know:
- What was supposed to happen
- What actually happened
- Where discrepancy is

Result: When something goes wrong, you have clearhandle to diagnose and fix.

## Chronicles Are Notattached, But History After Checklistlanded

Chronicles are not just "nice to have"attached. They are the history that forms after checklistlanded.

Without chronicles:
- Checklist is just a plan, not a record
- You can'tback what happened
- You can't what was done

With chronicles:
- Checklist becomes executable plan
- Each step leaves verifiable record
- You canback and at any time

## Checklist and Chronicles: Notserial, But Asynclinkage

Checklist and chronicles are notserial (first write checklist, then execute, then write chronicles).

They arelinkage:
- Checklist is written before execution
- Chronicles are written during execution
- Both feed into each other

This allows:
- Plan can be revised based on execution reality
- Execution can be guided by plan
- History is always up to date

## Interrupt Immediately When "History" Tendency Appears

"History" means executor tries tochange history after the fact.

Signs:
- Executor says "let me update the chronicles to reflect what actually happened"
- Executor wants tochange past entries to match current state
- Executor downplays earlier failures in chronicles

When you see this: interrupt immediately.

Chronicles must be real-time, not after the fact. If executor wants tochange history, it means something was.

## Pulse Atomic Checklist: Why It's More Flexible Than Blueprint

Traditional blueprint: write everything upfront, then execute rigidly.

Pulse atomic checklist:
- Write checklist for current pulse only
- Execute and verify
- Write next checklist based on results
- Repeat

Advantage:
- More flexible to changing requirements
- Less wasted planning for uncertain future
- Each pulse is independently

## How It Differs from Spec / Workflow

| Aspect | Spec/Workflow | Atomic Checklist |
|--------|---------------|------------------|
| Who writes | Human writes spec | Executor submits checklist |
| When written | Before execution | Before each pulse |
| Granularity | Often coarse | Must bedetailed |
| Flexibility | Fixed plan | Adaptable |
| Verification | Often post-hoc | Real-time with chronicles |

Key difference: Spec/workflowlet humando planning; atomic checklistlet executordo planning, humando review.

## What Density Counts as Real Chronicles

Too:
- "Fixed bug"
- "Updated code"

Toodetailed:
- "Changed line 42 from 'x' to 'y'"
- "Pressed save button at 14:32"

Just right:
- "Modified `auth.validateToken()` to check expiration, verified with test case"
- "Updated error response format, confirmed with API call"

Rule: Chronicle should what waschange and how it was, not every keystroke.

## What Form Counts as Real Chronicles

Good forms:
- Git commit messages (one commit per step)
- Test run logs
- Screenshot of working feature
- API response samples

Bad forms:
- Summary paragraph at end
- "Everything works" without evidence
- Old artifacts passed off as new

Rule: Chronicles should be, not just executor's word.

## What Chronicles Actuallyremember

Chroniclesremember:
- What was supposed to happen (from checklist)
- What actually happened (from execution)
- What verification was done
- What discrepancies exist

This creates: auditable history that can beback at any point.

## Why Italleviate Part 1 Pain Points

From "01-Why", three pain points:

1. **Technical distortion**: Chronicles make it harder to technical problems
2. **Governance distortion**: Checklists give auditorspecific things to
3. **Cognitive debt**: Chronicles provideback history for understanding

## How It Serves Cognitive Debt Repayment

When understandingnot system:
- Chronicles provide historical record
- Checklist shows what was planned
- Comparison shows what deviated

This helps: bring understanding back to.

## Four Common Drifts

### Drift 1: Write Checklist as Module

Wrong: "Improve authentication module"
Right: "Modify `auth.validateToken()`, add test for expired token"

### Drift 2: Write as

Wrong: "Ensure quality"
Right: "All tests pass, API returns correct error format"

### Drift 3:detailed Checklist Commit

Wrong: One commit for entire checklist
Right: One commit per checklist item

### Drift 4:understand Chronicles aswant

Wrong: "Must have 10 commits"
Right: "Each clear state should have a commit"

## One-line Summary

**Atomic checklist executorexpose plan, chroniclesback history, together they make pseudo-completion harder and debt repayment possible.**

## Corresponding Implementation

### Manual Practice

- Require executor to submit atomic checklist before starting
- Review checklist fordetailed and completeness
- Require chronicles for each step
- Verify based on chronicles, not summary

### Corresponding Skill

- `approval-first-planner`: Helps generatequalified checklists
- `approved-checklist-executor`: Helps maintain chronicle discipline

### Corresponding Web Templates

- `plan_audit_template.md`: For reviewing checklist
- `completion_audit_template.md`: For verifying based on chronicles

## Related Pages

- [Minimal Loop](minimal-loop.md)
- [White-box Reconciliation](white-box-reconciliation.md)
- [Scout Mechanism](scout-mechanism.md)
- [Dual-track Audit](../03-deep-water/dual-track-audit.md)

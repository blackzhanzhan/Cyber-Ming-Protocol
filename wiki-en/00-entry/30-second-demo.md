# 30-Second Minimal Demo

## Table of Contents
- [What This Page Solves](#what-this-page-solves)
- [Demo Task 1: Fix a Small Bug](#demo-task-1-fix-a-small-bug)
- [Demo Task 2: Change UI Copy](#demo-task-2-change-ui-copy)
- [Three Ways Overview](#three-ways-overview)
- [Way 1: No Skill, Manual Run](#way-1-no-skill-manual-run)
- [Way 2: With Skill, More Stable But Notreplace Evidence](#way-2-with-skill-more-stable-but-not-replace-evidence)
- [Way 3: Web Auditorfixed in Loop](#way-3-web-auditor-fixed-in-loop)
- [Three Sentences You Shouldimmediately Answer](#three-sentences-you-should-immediately-answer)
- [Next Steps](#next-steps)

## What This Page Solves

Many people still lack the last step: **How do I mentally run throughone round quickly?**

This page uses two small tasks, 30 seconds to demo three ways:

- No Skill, manual run
- With Skill, more stable run
- How Web auditorfixed in the loop

## Demo Task 1: Fix a Small Bug

> Fix a small bug where the settings page doesn't show successhint after save.

Why this? Because it's small enough, won'tdrag into bigheavy; but real enough, can see how plan, execution, verification connect.

## Demo Task 2: Change UI Copy

> Make the danger operationsay copy clearer on settings page, and change delete button style to moreof warning state.

Why this? Because it's not bug fix, but common UI/copy, can cover lighter task scenarios.

## Three Ways Overview

| Way | What You Do First | What It Best Shows | What It's Not Showing |
|-----|-------------------|-------------------|----------------------|
| No Skill | Have IDE submit atomic checklist | Protocol can be practiced manually | Can't use without Skill |
| With Skill | Use skill to stabilize planner/executor rhythm | Skill is enhancer | Skill auto-produces completion fact |
| Web Audit Fixed in Loop | Give plan to Web first, then decide execute | Audit flow not lost | Web becomes second executor |

## Way 1: No Skill, Manual Run

### Step 1: Have Executor Submit Plan, Don't Start Directly

For task 1, you canstraightreconnect say to IDE:

```text
I want to fix a small bug where settings page doesn't show successhint after save.

Don'tchange code directly first.
Give me an atomic checklist asdetailed as possible, tell mechange, how to verify.
```

For task 2:

```text
I want to make the danger operationsay copy clearer on settings page, and change delete button style to moreof warning state.

Don'tchange directly first.
Tell meyouchange, how to verify, what page result counts as passing.
```

If it can break down to reasonable granularity, that's enough to continue.

### Step 2: Copy Checklist to Web for Review, Then Decide Execute

When plan looks decent, don't immediately let it start, but copy this checklist as-is to Web, add:

```text
This is executor's plan. This executor might me.
Pleasefirstlook at: are theremissing steps, is ittoo smooth, what evidence should I look atfinally.
```

If Web approves, let executor start; if Web says there are gaps, copy itsfeedback back to executor, let it revise plan and continue this loop.

### Step 3: After Done, Results and Evidence Back to Web for Verification

After done, don't justone sentence "already fixed", but these:

- Current run test results or regression check results
- Screenshots, logs, or page results proving problemrealof solved
- Commits corresponding to this change

What you're practicing here is actually Cyber-Ming's minimal skeleton: review first, execute second, verify by evidence last. At this point, you haven't installed Skill, but you're already using the protocol.

## Way 2: With Skill, More Stable But Notreplace Evidence

Same task in environment with Skillreconnect, the change is not task magically, but high-frequency actionsmorestable.

### Planner Easier to Submit Right Things

Like `approval-first-planner` skill, easier to first task into atomic pieces, boundaries, redlight/greenlight, verification ladder. At this point you less need to manually repeat long prompt.

### Executor Easier to Maintain Rhythm

Like `approved-checklist-executor` skill, easier to maintain actions: follow approved pieces, verify first after done, after verify.

### But Most Important Thing Didn't Change

No matter how stably Skill triggers, youfinally still can't justlook at formatted report.

You still need tolook at:

- Current run tests or check output
- Evidence problem really solved
- Commits corresponding to this state

In other words, Skill makes actions more stable, but notreplace evidence.

## Way 3: Web Auditorfixed in Loop

This is not optional enhancement, but key to this protocol not losing audit flow even on small tasks.

### What Web Looks at First

Firstlook at executor's atomic checklist, and tell it: this executor might me. This way Web won't executor's narrative, but first:

- Are theremissing steps
- Are difficultiestoo vague
- What evidence shouldfinally be looked at

### What to Do When Web Doesn't Pass

If Web says plan has gaps, don't skip it, don'tmentally run fix, but copyfeedback as-is back to executor, let it revise plan, then continue next round plan review.

Thisrealreal reduces is human energy: you don't need toheavynew designprocess, just physical router, copy plan andfeedbackbackback.

### What to Do After Web Passes

Web approves, executor checklist execute, verify, commit.

Execution complete, youwant copy these materials back to Web:

- This round's test results, screenshots, logs
- Corresponding commits
- Your most risk points

For plan audit,first `web-audit-templates/plan_audit_template.md`; for completion audit,first `web-audit-templates/completion_audit_template.md`.

### What Web Doesn't Do

What it really shouldn't do:

- Don'tforyoucontinue write code
- Don'tfor executor expand requirements
- Don'trely on summarystraightreconnect approve

Its job is independent review, not second executor.

## Three Sentences You Shouldimmediately Answer

1. **No Skill, can also runone round Cyber-Ming.**
2. **With Skill, makes actions more stable, but notreplace evidence.**
3. **No matter how small the task, atomic checklistfirst Web review; not passthenback executor revise plan, pass execute commit, results and evidencewantback Web verify.**

## Next Steps

- If you haven't whether to install Skill, continuelook at [Skill Guide](skill-guide.md)
- If you want to this demochange to more formal minimal loop, go back to [Minimal Loop](../02-how/minimal-loop.md)

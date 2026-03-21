# 30-Second Minimal Demo

## Table of Contents
- [What This Page Solves](#what-this-page-solves)
- [Demo Task 1: Fix a Small Bug](#demo-task-1-fix-a-small-bug)
- [Demo Task 2: Revise Some UI Copy](#demo-task-2-revise-some-ui-copy)
- [Three Ways at a Glance](#three-ways-at-a-glance)
- [Way 1: No Skill, Run It Manually](#way-1-no-skill-run-it-manually)
- [Way 2: With Skill, More Stable but Not a Substitute for Evidence](#way-2-with-skill-more-stable-but-not-a-substitute-for-evidence)
- [Way 3: Keep the Web Auditor in the Loop](#way-3-keep-the-web-auditor-in-the-loop)
- [Three Things You Should Be Able to Answer Immediately](#three-things-you-should-be-able-to-answer-immediately)
- [Next Steps](#next-steps)

## What This Page Solves

Many people are only missing the final step: **How do I quickly run one round in my head?**

This page uses two small tasks to demonstrate three ways in 30 seconds:

- Run it manually without Skill
- Run it more steadily with Skill
- Keep the Web auditor inside the loop

## Demo Task 1: Fix a Small Bug

> Fix a small bug where the settings page does not show a success message after saving.

Why this task? Because it is small enough that it will not turn into a large refactor, but real enough to show how planning, execution, and verification connect.

## Demo Task 2: Revise Some UI Copy

> Make the warning copy for dangerous operations on the settings page clearer, and change the delete button to a more obvious warning state.

Why this task? Because it is not a bug fix. It is a common UI and copy adjustment, so it covers lighter-weight task scenarios.

## Three Ways at a Glance

| Way | What You Do First | What It Best Shows | What It Does Not Show |
|-----|-------------------|--------------------|-----------------------|
| No Skill | Have the IDE submit an Atomic Execution Contract | The protocol can be practiced manually | You cannot use it without Skill |
| With Skill | Use Skill to stabilize the planner and executor rhythm | Skill is an enhancer | Skill automatically establishes completion facts |
| Web Auditor in the Loop | Give the plan to Web first, then decide whether to execute | The audit flow does not get lost | The Web side becomes a second executor |

## Way 1: No Skill, Run It Manually

### Step 1: Make the Executor Submit a Plan Before It Starts

For Task 1, you can say this directly to the IDE:

```text
I want to fix a small bug where the settings page does not show a success message after saving.

Do not change code yet.
First give me an Atomic Execution Contract with as much detail as possible. Tell me what you plan to change and how you will verify it.
```

For Task 2:

```text
I want to make the warning copy for dangerous operations on the settings page clearer, and change the delete button to a more obvious warning state.

Do not change anything yet.
First tell me which places you plan to change, how you will verify them, and what page result counts as passing.
```

If it can break the work into a reasonable level of detail, that is already enough to continue.

### Step 2: Copy the Checklist to Web for Review Before Deciding Whether to Execute

Once the plan looks solid, do not let the executor start right away. Copy the checklist to Web exactly as it is, then add this:

```text
This is the executor's plan. This executor may deceive me.
Please check first: are any steps missing, is the plan making things sound too easy, and what evidence should I insist on at the end?
```

If the Web auditor approves it, let the executor start. If the Web auditor says the plan has gaps, copy that feedback back to the executor, have it revise the plan, and continue the loop.

### Step 3: After Execution, Send Results and Evidence Back to Web for Verification

When the executor says it is done, do not accept a single sentence like "already fixed." Ask for these things instead:

- Current test results or regression checks
- Screenshots, logs, or page output that prove the problem is really solved
- The commits corresponding to this change

What you are practicing here is already Cyber-Ming's minimal loop: approve first, execute second, verify by evidence last. Up to this point you have not installed Skill at all, but you are already using the protocol.

## Way 2: With Skill, More Stable but Not a Substitute for Evidence

Put the same task into an environment where Skill is already connected and the change is not that the task magically finishes by itself. The change is that high-frequency actions become much more stable.

### The Planner Is More Likely to Submit the Right Things First

Skills like `approval-first-planner` make it much easier to compress a task into atomic slices, boundaries, red lights, green lights, and an acceptance ladder. That means you no longer have to repeat the same long prompt by hand every time.

### The Executor Is More Likely to Hold the Right Rhythm

Skills like `approved-checklist-executor` make it easier to maintain the rhythm of the protocol: work only on approved slices, verify first, and archive only after verification.

### But the Most Important Thing Has Not Changed

No matter how stable the Skill trigger is, you still cannot rely on a nicely formatted report by itself.

You still need to look at:

- Current test output or check output
- Evidence that the problem is truly solved
- The commits that correspond to this state transition

In other words, Skill makes the actions more stable, but it does not replace evidence.

## Way 3: Keep the Web Auditor in the Loop

This is not an optional upgrade. It is what keeps the audit flow from disappearing even on small tasks.

### What the Web Auditor Looks at First

The Web auditor looks at the executor's Atomic Execution Contract first, and you explicitly tell it: "This executor may deceive me." That keeps the Web side from following the executor's optimistic story. It checks first for:

- Missing steps
- Difficulty that has been smoothed over too much
- What evidence really has to be reviewed at the end

### What to Do When the Web Auditor Does Not Pass the Plan

If the Web auditor says the plan has gaps, do not skip that result and do not silently fix the plan in your head. Copy the audit feedback back to the executor exactly as it is, have it revise the plan, and continue into the next round of plan review.

What this really saves is human energy. You do not have to redesign the whole process every time. You only have to keep acting as the physical router, moving plans and audit feedback back and forth.

### What to Do After the Web Auditor Passes the Plan

Only after the Web auditor approves the plan does the executor execute, verify, and commit according to the checklist.

After execution is complete, you still need to send these materials back to the Web auditor:

- The test results, screenshots, and logs from this round
- The corresponding commits
- The risk points you personally distrust the most

For plan review, start with `web-audit-templates/plan_audit_template.md`. For completion review, start with `web-audit-templates/completion_audit_template.md`.

### What the Web Auditor Does Not Do

The important thing is what it should not do:

- It does not keep writing code for you
- It does not casually expand the requirements on behalf of the executor
- It does not approve work based only on a summary

Its job is independent review, not becoming a second executor.

## Three Things You Should Be Able to Answer Immediately

1. **You can run a round of Cyber-Ming even without Skill.**
2. **Skill makes the actions more stable, but it does not replace evidence.**
3. **No matter how small the task is, the Atomic Execution Contract goes to the Web auditor first. If it does not pass, route it back to the executor for revision. Only after it passes do you execute and commit, and then the results and evidence go back to the Web auditor for verification.**

## Next Steps

- If you have not decided whether to install Skill, continue with [Skill Guide](skill-guide.md)
- If you want to turn this demo into a more formal minimal loop, go back to [Minimal Loop](../02-how/minimal-loop.md)

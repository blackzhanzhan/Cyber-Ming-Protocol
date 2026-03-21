# 30-Second Minimal Demo

## Table of Contents
- [What This Page Solves](#what-this-page-solves)
- [Demo Task 1: Fix a Small Bug](#demo-task-1-fix-a-small-bug)
- [Demo Task 2: Revise Some UI Copy](#demo-task-2-revise-some-ui-copy)
- [One Minimal Loop at a Glance](#one-minimal-loop-at-a-glance)
- [Step 1: Make the Executor Submit the Atomic Execution Contract](#step-1-make-the-executor-submit-the-atomic-execution-contract)
- [Step 2: Send the Plan to Web Review First](#step-2-send-the-plan-to-web-review-first)
- [Step 3: Return with Evidence and Verify Again](#step-3-return-with-evidence-and-verify-again)
- [Three Things You Should Be Able to Answer Immediately](#three-things-you-should-be-able-to-answer-immediately)
- [Next Steps](#next-steps)

## What This Page Solves

Many people are only missing the final step: **How do I quickly run one minimal loop in my head?**

This page is a support page for the Minimal Loop Guide. It does not cover Skill setup or Web app hardening. It uses two small tasks to show, in 30 seconds, how Layer 1 runs.

## Demo Task 1: Fix a Small Bug

> Fix a small bug where the settings page does not show a success message after saving.

Why this task? Because it is small enough that it will not turn into a large refactor, but real enough to show how planning, execution, and verification connect.

## Demo Task 2: Revise Some UI Copy

> Make the warning copy for dangerous operations on the settings page clearer, and change the delete button to a more obvious warning state.

Why this task? Because it is not a bug fix. It is a common UI and copy adjustment, so it covers lighter-weight task scenarios.

## One Minimal Loop at a Glance

| Step | What You Do First | What Layer 1 Is Really Teaching |
|------|-------------------|----------------------------------|
| 1 | Make the executor submit the Atomic Execution Contract first | The first move is never coding; it is planning and boundaries |
| 2 | Route the plan to the Web auditor before granting execution | The Web side returns judgment; the human grants execution |
| 3 | Collect evidence after execution and route it back for verification | Completion stands on evidence, not on the executor's self-report |

## Step 1: Make the Executor Submit the Atomic Execution Contract

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

## Step 2: Send the Plan to Web Review First

This is not a Layer 2 upgrade. It is already part of the Layer 1 minimal loop.

Once the plan looks solid, do not let the executor start right away. Copy the Atomic Execution Contract to Web exactly as it is, then add this:

```text
This is the executor's plan. This executor may deceive me.
Please check first: are any steps missing, is the plan making things sound too easy, and what evidence should I insist on at the end?
```

If the Web auditor approves it, let the executor start. If the Web auditor says the plan has gaps, copy that feedback back to the executor, have it revise the plan, and continue the loop.

## Step 3: Return with Evidence and Verify Again

When execution is done, do not accept a closing sentence like "already fixed."

Ask for these things instead:

- the current test or check output
- screenshots, logs, or page results that prove the issue is truly solved
- the commits corresponding to this state transition

Then route those materials back to the Web side and ask whether the completion fact really stands.

Once you have gone through these three steps, you have already run Layer 1 for real: approve first, execute second, verify by evidence last.

## Three Things You Should Be Able to Answer Immediately

1. **You can run one minimal loop by hand before installing Skill.**
2. **The minimal loop starts with an Atomic Execution Contract, not with implementation.**
3. **Completion is established by results, evidence, and Web verification, not by the executor's self-report.**

## Next Steps

- If you want to return to the Layer 1 parent page, go back to [Minimal Loop Guide](prompt-pack.md)
- If you have already completed Layer 1 and want to enter Layer 2, continue with [Minimal Stable Loop Guide](stable-loop-guide.md)
- If you want the expanded methodology after this demo, go to [Minimal Loop](../02-how/minimal-loop.md)

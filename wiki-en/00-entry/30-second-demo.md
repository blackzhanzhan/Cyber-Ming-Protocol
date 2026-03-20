# 30-Second Minimal Demo

## Table of Contents
- [What This Page Solves](#what-this-page-solves)
- [Demo Task 1: Fix a Small Bug](#demo-task-1-fix-a-small-bug)
- [Demo Task 2: Change UI Copy](#demo-task-2-change-ui-copy)
- [Three Ways Overview](#three-ways-overview)
- [Way 1: No Skill, Manual Run](#way-1-no-skill-manual-run)
- [Way 2: With Skill, More Stable But Not替代 Evidence](#way-2-with-skill-more-stable-but-not-替代-evidence)
- [Way 3: Web Auditor固定 in Loop](#way-3-web-auditor-固定-in-loop)
- [Three Sentences You Should立刻 Answer](#three-sentences-you-should-立刻-answer)
- [Next Steps](#next-steps)

## What This Page Solves

Many people still lack the last step: **How do I mentally run through一轮 quickly?**

This page uses two small tasks, 30 seconds to demo three ways:

- No Skill, manual run
- With Skill, more stable run
- How Web auditor固定 in the loop

## Demo Task 1: Fix a Small Bug

> Fix a small bug where the settings page doesn't show success提示 after save.

Why this? Because it's small enough, won't拖成 big重构; but real enough, can see how plan, execution, verification connect.

## Demo Task 2: Change UI Copy

> Make the danger operation说明 copy clearer on settings page, and change delete button style to more明显的 warning state.

Why this? Because it's not bug fix, but common UI/copy微调, can cover lighter task scenarios.

## Three Ways Overview

| Way | What You Do First | What It Best Shows | What It's Not Showing |
|-----|-------------------|-------------------|----------------------|
| No Skill | Have IDE submit atomic checklist | Protocol can be practiced manually | Can't use without Skill |
| With Skill | Use skill to stabilize planner/executor rhythm | Skill is enhancer | Skill auto-produces completion fact |
| Web Audit Fixed in Loop | Give plan to Web first, then decide execute | Audit flow not lost | Web becomes second executor |

## Way 1: No Skill, Manual Run

### Step 1: Have Executor Submit Plan, Don't Start Directly

For task 1, you can直接 say to IDE:

```text
I want to fix a small bug where settings page doesn't show success提示 after save.

Don't改 code directly first.
Give me an atomic checklist as细 as possible, tell me准备改哪一层, how to verify.
```

For task 2:

```text
I want to make the danger operation说明 copy clearer on settings page, and change delete button style to more明显的 warning state.

Don't改 directly first.
Tell me你准备改哪几处, how to verify, what page result counts as passing.
```

If it can break down to reasonable granularity, that's enough to continue.

### Step 2: Copy Checklist to Web for Review, Then Decide Execute

When plan looks decent, don't immediately let it start, but copy this checklist as-is to Web, add:

```text
This is executor's plan. This executor might骗 me.
Please先看: are there漏 steps, is it说得太顺, what evidence should I look at最后.
```

If Web approves, let executor start; if Web says there are gaps, copy its审核意见 back to executor, let it revise plan and continue this loop.

### Step 3: After Done, Results and Evidence Back to Web for Verification

After done, don't just收一句 "already fixed", but收 these:

- Current run test results or regression check results
- Screenshots, logs, or page results proving problem真的 solved
- Commits corresponding to this change

What you're practicing here is actually Cyber-Ming's minimal skeleton: review first, execute second, verify by evidence last. At this point, you haven't installed任何 Skill, but you're already using the protocol.

## Way 2: With Skill, More Stable But Not替代 Evidence

Same task in environment with Skill接入, the change is not task magically完成, but high-frequency actions更容易稳定出现.

### Planner Easier to Submit Right Things

Like `approval-first-planner`这类 skill, easier to first压 task into atomic pieces, boundaries, red灯/green灯, verification ladder. At this point you less need to manually repeat整段 long prompt每次.

### Executor Easier to Maintain Rhythm

Like `approved-checklist-executor`这类 skill, easier to maintain后续 actions: follow approved pieces, verify first after done,归档 after verify.

### But Most Important Thing完全 Didn't Change

No matter how stably Skill triggers, you最后 still can't just看 formatted漂亮 report.

You still need to看:

- Current run tests or check output
- Evidence problem really solved
- Commits corresponding to this state跃迁

In other words, Skill makes actions more stable, but not替代 evidence.

## Way 3: Web Auditor固定 in Loop

This is not optional enhancement, but key to this protocol not losing audit flow even on small tasks.

### What Web Looks at First

First看 executor's atomic checklist, and明确 tell it: this executor might骗 me. This way Web won't顺 executor's乐观 narrative, but first查:

- Are there漏 steps
- Are difficulties说得太粗
- What evidence should最后 be looked at

### What to Do When Web Doesn't Pass

If Web says plan has gaps, don't skip it, don't自己脑补 fix, but copy审核意见 as-is back to executor, let it revise plan, then continue next round plan review.

This真正 reduces is human energy损耗: you don't每次 need to重新 design整套流程, just持续扮演 physical router, copy plan and审核意见来回回灌.

### What to Do After Web Passes

Web approves后, executor才按 checklist execute, verify, commit.

Execution complete后, you还要 copy these materials back to Web:

- This round's test results, screenshots, logs
- Corresponding commits
- Your most怀疑 risk points

For plan audit,优先参考 `web-audit-templates/plan_audit_template.md`; for completion audit,优先参考 `web-audit-templates/completion_audit_template.md`.

### What Web Doesn't Do

What it really shouldn't do:

- Don't替你继续 write code
- Don't替 executor顺便 expand requirements
- Don't靠 summary直接 approve

Its job is independent review, not second executor.

## Three Sentences You Should立刻 Answer

1. **No Skill, can also run一轮 Cyber-Ming.**
2. **With Skill, makes actions more stable, but not替代 evidence.**
3. **No matter how small the task, atomic checklist先送 Web review; not pass就回灌 executor revise plan, pass后 execute commit, results and evidence还要再回 Web verify.**

## Next Steps

- If you haven't确定 whether to install Skill, continue看 [Skill Guide](skill-guide.md)
- If you want to把 this demo换成 more formal minimal loop, go back to [Minimal Loop](../02-how/minimal-loop.md)

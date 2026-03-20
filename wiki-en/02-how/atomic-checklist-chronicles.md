# Core Ritual 1: Atomic Task Checklist and Chronicles

## Table of Contents
- [What This Page Solves](#what-this-page-solves)
- [Why It's the First Extended Skill](#why-its-the-first-extended-skill)
- [Atomic Checklist: Not Human-Written Plan, But Executor Submits First](#atomic-checklist-not-human-written-plan-but-executor-submits-first)
- [Simplest Way to Start](#simplest-way-to-start)
- [How细 Should a合格 Checklist Be](#how-细-should-a-合格-checklist-be)
- [Hypothetical: What Happens Without Atomic Checklist](#hypothetical-what-happens-without-atomic-checklist)
- [Another Hypothetical: What Changes With Atomic Checklist](#another-hypothetical-what-changes-with-atomic-checklist)
- [Chronicles Are Not附属, But History After Checklist落地](#chronicles-are-not-附属-but-history-after-checklist-落地)
- [Checklist and Chronicles: Not串行, But Async联动](#checklist-and-chronicles-not-串行-but-async-联动)
- [Interrupt Immediately When "History修" Tendency Appears](#interrupt-immediately-when-history-修-tendency-appears)
- [Pulse Atomic Checklist: Why It's More Flexible Than Blueprint](#pulse-atomic-checklist-why-its-more-flexible-than-blueprint)
- [How It Differs from Spec / Workflow](#how-it-differs-from-spec--workflow)
- [What Density Counts as Real Chronicles](#what-density-counts-as-real-chronicles)
- [What Form Counts as Real Chronicles](#what-form-counts-as-real-chronicles)
- [What Chronicles Actually记住](#what-chronicles-actually-记住)
- [Why It缓解 Part 1 Pain Points](#why-it-缓解-part-1-pain-points)
- [How It Serves Cognitive Debt Repayment](#how-it-serves-cognitive-debt-repayment)
- [Four Common Drifts](#four-common-drifts)
- [One-line Summary](#one-line-summary)
- [Corresponding Implementation](#corresponding-implementation)
- [Related Pages](#related-pages)

## What This Page Solves

The minimal loop tells you how to run the first round, but "review plan first, review execution second, verify evidence last" is not enough. Because as long as the plan is still too粗, the executor can still偷懒、漏步、跳步 in a一堆 vague steps, then用 a漂亮 summary带你过去.

More importantly: **Without atomic checklist and chronicles, the system很难留 real重构抓手, technical debt will become increasingly难以 safely偿还.** Today you might勉强 push功能 through, tomorrow when you want to还债、重构、接手 old window, you'll发现 history has糊成一片, no one can说清到底哪一步改坏了什么.

So, after minimal loop, the first extended skill you must掌握 is:

- Have the executor submit **atomic task checklist** first
- Then write each clear state跃迁 into **chronicles**

This page answers: why this is not普通 plan技巧, but the first real bone in the entire protocol; why it can缓解 technical distortion, governance distortion and cognitive debt; why it can提前为 future重构保抓手; and why without this step, later white-box reconciliation, renewal, takeover and debt repayment will quickly失去依托.

## Why It's the First Extended Skill

From "Minimal Loop: One-Audit and Multi-Audit Versions"往前走一步, the most natural question is:

**How细 should the plan be, before it's worth reviewing?**

If the plan only stays at this粒度:

- "Upgrade the解析 chain"
- "补一补 document generation"
- "Finally fix the图谱 write-in"

Then it looks like a plan, but实际上 still leaves too much black-box space for the executor. You很难 know:

- It到底准备先改哪个函数
- Which step counts as真正 done
- Which step can最小 rollback if失败
- Which step has hard dependency on next step

To truly understand this step, best first accept two realities already立住 in "01-Why":

- AI coding changed developer position, humans开始承担委派、路由、审计与接手职责
- The most危险 place of black-box multi-Agent is technical distortion and governance distortion happen together

Atomic task checklist and chronicles are the first layer应对 to these two realities. They're not to显得 more严谨, but to让 executor失去 "在粗计划里摸黑施工"的空间.

## Atomic Checklist: Not Human-Written Plan, But Executor Submits First

This must钉死: atomic task checklist is not让 human first spend半小时手写 todo, nor让你自己先写一份漂亮 spec. The real做法是——**First require IDE executor to submit a足够细 checklist, then let human and Web auditor裁决 it是否合格.**

This differs from many plan/spec patterns:

- Ordinary plans often just tell AI "大概分几步做完"
- Atomic checklist requires executor first交代 "每一步具体改什么、怎么验、错了怎么退"

So it's not风格 better plan, but a harder-to糊弄 construction drawing. What you真正 do is not亲手 write checklist, but用一句 short instruction把 executor逼到必须先交 construction drawing的位置.

If this is your first time, don't理解 it too heavy. Just记住 one very simple principle:

**Don't let executor give you vague module plans,逼 it细到 function modification, test point establishment, artifact检查 granularity.**

## Simplest Way to Start

You can直接 say to IDE:

```text
I want to do this: <your requirement>

Don't改 code directly first.
Give me an atomic checklist as细 as possible.
Try to细到: which function to modify, what test point to add, what result counts as passing.
```

If you want to be more direct, add:

```text
Don't give me vague plans.
Try to break down by function modification, test point establishment, artifact检查.
```

These two sentences are enough to启动 first round. You don't need to自己先 write完整 checklist, nor need to上手就知道 all technical details. The purpose of atomic checklist is恰恰让 executor first暴露 how it准备做.

## How细 Should a合格 Checklist Be

A合格 atomic checklist至少 should细到:

1. **Function level**: Which function to modify, not just "improve某 module"
2. **Test point level**: What test to add or modify, not just "ensure quality"
3. **Artifact level**: What file or output to produce, not just "complete task"
4. **Dependency level**: Which step depends on which, not just "do A then B"

Example of太粗:

- "Fix the authentication issue"
- "Improve error handling"

Example of够细:

- "Modify `auth.validateToken()` to check expiration"
- "Add test case for expired token in `auth.test.js`"
- "Update error response format in `api.response.json`"

The difference is: with太粗 checklist, executor can偷懒 in黑箱; with够细 checklist, each step must be可验证.

## Hypothetical: What Happens Without Atomic Checklist

Without atomic checklist, common scenario:

1. You give requirement
2. Executor says "understood, will implement"
3. Executor works in black box
4. Executor reports "done, tests passed"
5. You believe it

Problem: You never knew:
- What exactly was改
- In what order
- What could回滚 if失败
- Whether it真实 ran整条 chain

Result: When something goes wrong, you have no抓手 to diagnose.

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

Result: When something goes wrong, you have clear抓手 to diagnose and fix.

## Chronicles Are Not附属, But History After Checklist落地

Chronicles are not just "nice to have"附属物. They are the history that forms after checklist落地.

Without chronicles:
- Checklist is just a plan, not a record
- You can't回溯 what happened
- You can't证明 what was done

With chronicles:
- Checklist becomes executable plan
- Each step leaves verifiable record
- You can回溯 and证明 at any time

## Checklist and Chronicles: Not串行, But Async联动

Checklist and chronicles are not串行关系 (first write checklist, then execute, then write chronicles).

They are异步联动:
- Checklist is written before execution
- Chronicles are written during execution
- Both feed into each other

This allows:
- Plan can be revised based on execution reality
- Execution can be guided by plan
- History is always up to date

## Interrupt Immediately When "History修" Tendency Appears

"History修" means executor tries to修改 history after the fact.

Signs:
- Executor says "let me update the chronicles to reflect what actually happened"
- Executor wants to改 past entries to match current state
- Executor downplays earlier failures in chronicles

When you see this: interrupt immediately.

Chronicles must be写 real-time, not修 after the fact. If executor wants to改 history, it means something was隐瞒.

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
- Each pulse is independently可验证

## How It Differs from Spec / Workflow

| Aspect | Spec/Workflow | Atomic Checklist |
|--------|---------------|------------------|
| Who writes | Human writes spec | Executor submits checklist |
| When written | Before execution | Before each pulse |
| Granularity | Often coarse | Must be细 |
| Flexibility | Fixed plan | Adaptable |
| Verification | Often post-hoc | Real-time with chronicles |

Key difference: Spec/workflow让 human做 planning; atomic checklist让 executor做 planning, human做 review.

## What Density Counts as Real Chronicles

Too粗:
- "Fixed bug"
- "Updated code"

Too细:
- "Changed line 42 from 'x' to 'y'"
- "Pressed save button at 14:32"

Just right:
- "Modified `auth.validateToken()` to check expiration, verified with test case"
- "Updated error response format, confirmed with API call"

Rule: Chronicle should记录 what was改 and how it was验, not every keystroke.

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

Rule: Chronicles should be可独立验证, not just executor's word.

## What Chronicles Actually记住

Chronicles记住:
- What was supposed to happen (from checklist)
- What actually happened (from execution)
- What verification was done
- What discrepancies exist

This creates: auditable history that can be回溯 at any point.

## Why It缓解 Part 1 Pain Points

From "01-Why", three pain points:

1. **Technical distortion**: Chronicles make it harder to掩盖 technical problems
2. **Governance distortion**: Checklists give auditor具体 things to审查
3. **Cognitive debt**: Chronicles provide可回溯 history for understanding

## How It Serves Cognitive Debt Repayment

When understanding跟不上 system:
- Chronicles provide historical record
- Checklist shows what was planned
- Comparison shows what deviated

This helps: bring understanding back to可控范围.

## Four Common Drifts

### Drift 1: Write Checklist as Module口号

Wrong: "Improve authentication module"
Right: "Modify `auth.validateToken()`, add test for expired token"

### Drift 2: Write验收标准 as空话

Wrong: "Ensure quality"
Right: "All tests pass, API returns correct error format"

### Drift 3:细 Checklist落成粗 Commit

Wrong: One commit for entire checklist
Right: One commit per checklist item

### Drift 4:理解 Chronicles as机械次数要求

Wrong: "Must have 10 commits"
Right: "Each clear state跃迁 should have a commit"

## One-line Summary

**Atomic checklist逼 executor暴露 plan, chronicles留可回溯 history, together they make pseudo-completion harder and debt repayment possible.**

## Corresponding Implementation

### Manual Practice

- Require executor to submit atomic checklist before starting
- Review checklist for细度 and completeness
- Require chronicles for each step
- Verify based on chronicles, not summary

### Corresponding Skill

- `approval-first-planner`: Helps generate合格 checklists
- `approved-checklist-executor`: Helps maintain chronicle discipline

### Corresponding Web Templates

- `plan_audit_template.md`: For reviewing checklist
- `completion_audit_template.md`: For verifying based on chronicles

## Related Pages

- [Minimal Loop](minimal-loop.md)
- [White-box Reconciliation](white-box-reconciliation.md)
- [Scout Mechanism](scout-mechanism.md)
- [Dual-track Audit](../03-deep-water/dual-track-audit.md)

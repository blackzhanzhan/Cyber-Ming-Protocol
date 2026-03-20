# Bootstrap: Let Executor and Auditor Self-Enter

## Table of Contents
- [What This Page Solves](#what-this-page-solves)
- [Shortest Operation Method](#shortest-operation-method)
- [What to Give Executor](#what-to-give-executor)
- [What to Give Auditor](#what-to-give-auditor)
- [How They Should Respond First Round](#how-they-should-respond-first-round)
- [What Counts as Successful Entry](#what-counts-as-successful-entry)
- [How to Identify Pseudo-Bootstrap](#how-to-identify-pseudo-bootstrap)
- [Next Steps](#next-steps)

## What This Page Solves

If you already understand this protocol, the next最省力 way to try is often not重新 explain all rules to two agents yourself, but直接 give them the repo and role files, let them self-bootstrap entry.

But this shallow trial entry is更适合 those who have read core ideas and have直觉 understanding of basic流程. If you don't have this认知 yet,先回 `wiki/Home.md` or `00` entry layer first, then授位会更稳.

Also remember one limitation: due to model capability差异, especially without installing project skills, this one-click授位 can't guarantee agent will strictly守住 role boundaries. Some models first admit "will submit checklist before开工", but when given requirements still直接 write code.

So you don't have to fully adopt manual做法, but you must understand manual流程. Because this is your basis for judging when to interrupt, why to interrupt, when to exercise interrupt and裁决 rights.

This page answers:

- Repo link should分别 give to who
- Executor and auditor each first read what
- They first round should how respond
- What situation counts as真正 entering protocol

## Shortest Operation Method

1. Give current repo link to both IDE executor and Web auditor
2. Give executor: [`../../BOOTSTRAP.md`](../../BOOTSTRAP.md) + [`../../bootstrap/ide-executor.md`](../../bootstrap/ide-executor.md)
3. Give auditor: [`../../BOOTSTRAP.md`](../../BOOTSTRAP.md) + [`../../bootstrap/web-auditor.md`](../../bootstrap/web-auditor.md)
4. For shallow trial, don't clone by default, let executor read repo as remote law source first; if host supports URL reading, `webfetch`, or browser repo reading,优先这样做
5. First round don't send case materials, just看 their各自的 entry confirmation
6. Second round then send this round's case materials
7. Third round才 start formal case review and execution cycle

## What to Give Executor

- Current repo link
- [`../../BOOTSTRAP.md`](../../BOOTSTRAP.md)
- [`../../bootstrap/ide-executor.md`](../../bootstrap/ide-executor.md)

If you're just shallow trial, these three are enough.

Unless you明确 require skill installation or local repo operations, don't let executor主动 `git clone`.

## What to Give Auditor

- Current repo link
- [`../../BOOTSTRAP.md`](../../BOOTSTRAP.md)
- [`../../bootstrap/web-auditor.md`](../../bootstrap/web-auditor.md)

If you希望 it faster enter audit state, can also补给 it corresponding template in `web-audit-templates/`, but role files themselves are enough for first round entry.

## How They Should Respond First Round

### Executor First Round

Must至少 clear four things:

- It knows it's executor
- It won't改 files first
- It will submit atomic checklist and boundaries first
- It knows plan must先送 Web review, then enter execution

### Auditor First Round

Must至少 clear four things:

- It knows it's auditor
- It only reviews plan and evidence, doesn't代替 execution
- It will check pseudo-completion,漏 steps,假 evidence, and偷换 objectives
- It will first说明 what input package it needs
- It won't in this round directly评论 current session's specific patches, numbers, test conclusions, or old cases

## What Counts as Successful Entry

Only when all these conditions hold, counts as真正 successful bootstrap:

- Executor can说清 who executes, who audits, who裁决
- Auditor can also说清 same set of role division
- Executor's first step is submit checklist, not direct execution
- Auditor's first step is review plan or evidence, not顺手接管 implementation
- Both know: completion can't靠 executor self-report, but靠 evidence and Web verification

Interrupt is not failure, but normal power action in this protocol. The more you understand manual流程, the more you know when to让 executor停下,退回, resubmit plan, instead of waiting it all the way滑到 pseudo-completion then收拾.

## How to Identify Pseudo-Bootstrap

If Web auditor in first round directly appears这些东西, don't take it as already successful entry:

- Directly引用 current session's patch方案, test numbers, module names, old conclusions
- Directly表现出 it "knows who you are" or remembers your other conversations, old projects, history cases
- Directly批红 or approve某个 specific plan
- Directly开始评论 "this step should how修" instead of first确认 role and routing

This situation isn't "understood very快", but more likely old session残影 or platform memory first接管了 output. You should take it as **pseudo-bootstrap**,重新清场 then授位 again.

If only靠 prompt清场效果 still不好, then first go to host settings temporarily close user memory / personalization / history learning之类 options, then new conversation retry.

## Next Steps

- If you want to start directly, go back to repo root,按 [`../../BOOTSTRAP.md`](../../BOOTSTRAP.md) 授位
- If you still want to understand "shallow trial" vs "deep接入" difference, read [Skill Guide](skill-guide.md)

# Scout Mechanism: Test the Path First, Then Deploy the Army

## Table of Contents
- [What This Page Solves](#what-this-page-solves)
- [Why Scout Is Necessary Ritual, Not Debugging Trick](#why-scout-is-necessary-ritual-not-debugging-trick)
- [What Is Scout](#what-is-scout)
- [Why Real Errors Are Intelligence, Not Shame](#why-real-errors-are-intelligence-not-shame)
- [How It Relates to Red灯 Green灯 in White-box Reconciliation](#how-it-relates-to-red-灯-green-灯-in-white-box-reconciliation)
- [A Simple Scenario: Why New Sync Chain Shouldn't Push Directly](#a-simple-scenario-why-new-sync-chain-shouldn-t-push-directly)
- [Why Scout缓解 Part 1 Pain Points](#why-scout-缓解-part-1-pain-points)
- [Simplest Way to Start](#simplest-way-to-start)
- [When to Switch from Scout to Army推进](#when-to-switch-from-scout-to-army-推进)
- [Four Common Drifts](#four-common-drifts)
- [One-line Summary](#one-line-summary)
- [Related Pages](#related-pages)

## What This Page Solves

The previous three pages have立住 three bones of "02":

- Minimal loop: review plan first, review execution second, verify evidence last
- Atomic checklist & chronicles:钉细 plan and history
- White-box reconciliation:钉住 what counts as completion fact

But this is not enough.

Because in real engineering, many tasks are not适合 push全面 from the start. Especially when遇到:

- External APIs
- New authentication methods
- New file formats
- New routes
- New database writes
- New cloud vendor interfaces

The most危险 place in these scenarios is not "feature not done yet", but: **The system根本不知道 chain works or not, already started deploying army.**

What's truly可怕 in deep water is never main front can't beat enemy, but main front hasn't seen enemy yet, already started消耗 itself on wrong premises. Auth not通, format不明, write not实, main logic却 already铺开; when real world finally strikes back, system才发现 what it前面 pushed wasn't advantage, but a long string of expansion built on illusion.

Scout mechanism solves exactly this problem.

In one sentence:

**First use minimum cost to test chain, test permissions, test returns, test evidence; when real world confirms this path works, then let main army advance.**

## Why Scout Is Necessary Ritual, Not Debugging Trick

Many people第一次 hearing "test path first, then deploy army",容易理解 it as普通 debugging habit,好像就是 "write a small script试试看". This理解太浅.

In Cyber-Ming-Protocol, scout is not small trick, but tactical ritual. It真正防 three deep-water high-frequency accidents:

- Main阵 not确认 can通, executor already started大面积改 code
- External system actually早就卡死, but executor continues内部模拟推进
- Error already enough说明问题,却被当成 "shameful failure" instead of "frontline intelligence"

So scout mechanism的本质 is not "more cautious", but:

**Don't use main front to替 unknown world试错.**

This sentence要读重一点. Scout is not conservatism, not procrastination, not engineering洁癖; what it真正拒绝 is: let main front替 unknown交学费, let army in还没摸清敌情时先把自己耗空.

This is also why it必须接 after white-box reconciliation. White-box reconciliation tells system: summary can't代替 evidence; scout mechanism further says: in many tasks, the first most valuable evidence根本不是 green灯, but first real red灯 and first real external return.

## What Is Scout

Scout's simplest definition is:

**Don't touch main阵, only use minimum action to verify whether real world allows continuing推进.**

It usually has several characteristics:

- Action很小
- Goal很窄
- Only verify one chain
- Only chase one key true/false
- Once get real feedback, immediately report, don't顺势 expand main logic

So scout is not "first make 30% version of feature", nor "first secretly do most再说". Real scout is closer to this kind of action:

- First send minimum request, see if auth passes
- First run minimum input, see if parsing can get valid return
- First write极小 import action, see if database write真的发生
- First scan real artifact, see if path, permissions, format have卡死

Goal is not immediately succeed, but尽快 get real intelligence. Scout越小, intelligence越 clean; intelligence越 clean, main front越不容易在 wrong premise上越走越远.

## Why Real Errors Are Intelligence, Not Shame

This is the most important判断 to单独钉死 in scout mechanism:

**Real errors are not shame, but intelligence.**

Executor most容易犯的一种病 is treating error as "暂时别给主人看" failure, so本能地倾向于:

- First解释一下
- First绕过去
- First模拟一个看起来合理的结果
- Wait "差不多能跑了" then report good news

This is exactly one of black-box流派 most危险惯性. Because一旦这样做, system will失去 first-hand底层 intelligence.

## How It Relates to Red灯 Green灯 in White-box Reconciliation

White-box reconciliation says: ask for red灯 before green灯.

Scout mechanism takes this further:

In many tasks, the first red灯 is not from internal tests, but from external reality.

- Auth error from external API
- Format rejection from external system
- Permission denied from cloud service

These external red灯 are even more valuable than internal red灯, because they prove: the path doesn't work at all.

## A Simple Scenario: Why New Sync Chain Shouldn't Push Directly

Scenario: You need to sync data to a new external service.

Without scout:
1. Executor builds entire sync logic
2. Runs locally with mock data
3. Reports "works great"
4. Deploys to production
5. Real API rejects everything
6. All work wasted

With scout:
1. Executor sends one test request to real API
2. Gets auth error immediately
3. Reports "auth doesn't work"
4. You fix auth first
5. Then build sync logic
6. Works on first try

Difference: Scout caught the real problem before wasting effort on wrong path.

## Why Scout缓解 Part 1 Pain Points

From "01-Why":

1. **Technical distortion**: Scout exposes real problems early, before they're掩盖 by simulated success
2. **Governance distortion**: Scout gives auditor concrete intelligence about what works and what doesn't
3. **Cognitive debt**: Scout provides real-world anchors for understanding, not just internal assumptions

## Simplest Way to Start

Before starting any task with external dependencies:

```text
Before you build anything,先 send one real request to the external system.
Show me what comes back.
```

If it fails:
```text
Good, now we know the real problem. Fix that first.
```

If it succeeds:
```text
Good, now we know the path works. Proceed with main logic.
```

## When to Switch from Scout to Army推进

Switch when:

- Scout has confirmed chain works
- Real external system returns expected results
- No fundamental blockers remain

Don't switch when:

- Scout only worked with mock data
- External system hasn't been tested yet
- There are still unknowns about permissions, formats, etc.

## Four Common Drifts

### Drift 1: Scout Becomes Army

Wrong: Scout grows into full feature implementation
Right: Scout stays small, just验证 one thing

### Drift 2: Has Error, But Won't Report

Wrong: Hide errors because they're "embarrassing"
Right: Report errors immediately as intelligence

### Drift 3: One Probe验证 Five Things

Wrong: Try to test everything in one scout
Right: Test one thing at a time, get clean signal

### Drift 4:无限试探 After Scout Succeeds

Wrong: Keep scouting even after path confirmed
Right: Switch to army推进 once path confirmed

## One-line Summary

**Scout mechanism: use minimum cost to test the path in real world first, don't let main army在 wrong premise上消耗 itself.**

## Related Pages

- [Minimal Loop](minimal-loop.md)
- [Atomic Checklist & Chronicles](atomic-checklist-chronicles.md)
- [White-box Reconciliation](white-box-reconciliation.md)
- [Dual-track Audit](../03-deep-water/dual-track-audit.md)

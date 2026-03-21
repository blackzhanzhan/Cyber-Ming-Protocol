# Web Auditor App Guide

[Chinese](../../wiki/00-开始这里与落地形态/Web审计端固定提示词与专有应用指南.md) | **English**

## What This Page Solves

This page covers only the Web side of the stable loop:

- how to fix the auditor law into a system prompt
- how to place that prompt inside a Gem, GPT, or other dedicated app container
- why this is not a substitute for Skill, but rather the Web half of the stable loop

## Fix One Boundary First

Fixing only the Web side is not enough to establish the minimal stable loop.

The minimal stable loop requires both:

- IDE-side Skill
- Web-side fixed prompt / app container

This page only solves the second half.

For the full definition, see [Minimal Stable Loop Guide](stable-loop-guide.md).

## What Counts as a Fixed Web Prompt

It does not mean you type a long custom prompt by hand every round.

It means the audit law is already fixed before the current case begins.

The carrier can be:

- Gemini Gem
- GPTs / Custom GPT
- any Web app that supports a persistent system prompt
- any platform-native custom app container

The container matters less than whether the role boundary, audit duty, input-package standard, and pseudo-completion law are fixed.

## Minimum Law to Fix into the Web Auditor App

### Fixed System Prompt

```text
You are the Web auditor for Cyber-Ming-Protocol.

You have only three duties: audit plans, audit evidence, and return judgment.
You are not the executor and you are not the final arbiter.

Hard rules:
1. You audit plans and evidence only. You do not write code, draft patches, or make architecture decisions for the executor.
2. You focus on pseudo-completion, omitted steps, fake evidence, goal substitution, coarse granularity, and inferred results being passed off as real execution.
3. You must judge from the input bundle first, not from the executor's summary tone.
4. Even if you think work may proceed or be accepted, you only return audit judgment. The human still grants execution and makes the final ruling.
5. When the input is an Atomic Execution Contract, focus on atomicity, boundaries, Red Line, Green Tests, the white-box YAML bridge, and Commit Action / Commit Unit / Commit Message.
6. When the input is a completion packet, focus on whether the same red case truly turned green, whether the assertions are backed by physical evidence, and whether current-run evidence has been swapped with stale or simulated output.
7. Your default output may contain only: pass / do not pass or release / do not release, the main risks, missing inputs, and narrowing advice.
8. Do not pretend to know the case from platform memory, old chats, or personalization. The current input package outranks all residue.

If the input is insufficient, say what is missing before you say anything else.
```

## The Runtime Prompt Can Stay Short

Once the dedicated app exists, each round should become lighter.

### Plan Audit

```text
This round now enters plan review.
Below is the Atomic Execution Contract and the Part Two YAML. Audit the structure and boundaries only. Do not implement.
```

### Completion Audit

```text
This round now enters completion review.
Below is the evidence packet. Check only: did the same red case turn green, do the assertions stand on physical evidence, and is pseudo-completion present.
```

## When a Gem / GPT / Custom App Is Worth Creating

It is usually worth doing when:

- you have already run at least one loop by hand
- you accept this audit law as something you want to keep using
- you no longer want to paste the whole long audit law every round
- you want the Web-side auditor to keep a more stable role and input-bundle standard

## Why Releases Must Also Ship the Web Prompt

If the stable loop is a real working mode, then a release is not just a Skill update.

It must also ship:

- the Web auditor system prompt
- the Web app / Gem / GPT prompt version that carries it

Otherwise you end up with:

- a new IDE-side law
- an old Web-side audit prompt

and the protocol will look unstable when the real issue is only that the two ends are running different versions.

## Next Steps

- If you still have not completed your first run, go back to [First-Time Guide](prompt-pack.md)
- If the IDE side is not set up yet, continue with [Skill Guide](skill-guide.md)
- If you want the full dual-end definition, return to [Minimal Stable Loop Guide](stable-loop-guide.md)

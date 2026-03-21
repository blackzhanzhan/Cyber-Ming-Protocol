# Comparison with Workflow, Spec-Driven, and Agent Team

## What This Page Solves

This page also belongs to Layer 3: **Relation and Adoption**.

If [Three Things](three-things.md) helps you separate what this repo actually ships, this page answers the next question:

- what this shares with mainstream approaches
- where it diverges from them
- how to adopt this protocol when you are already using workflow, spec-driven, or agent team patterns

Many people seeing Cyber-Ming-Protocol ask: What's the relationship with workflow, spec-driven, and agent team that I already know? Is it just a different skin? Or completely different?

This page explains once: **Not completely unrelated, not completely identical.**

They share one judgment: deep-water tasks need governance.
They diverge on one point: human sovereignty cannot be outsourced.

## What They Share

| Method | Shared Judgment |
|--------|-----------------|
| Workflow | Deep-water tasks can't rely on improvisation—they need repeatable process |
| Spec-Driven | Deep-water tasks need plan first—can't start directly |
| Agent Team | Deep-water tasks need division of labor—can't rely on single agent |

Cyber-Ming-Protocol fully acknowledges these judgments. It doesn't oppose process, doesn't oppose plan, doesn't oppose division.

## Where They Diverge

| Method | How It Does | How Cyber-Ming Does | Divergence Point |
|--------|-------------|---------------------|------------------|
| Workflow | Freeze process into templates, execute by steps | Review plan each time before starting; process is flexible; audit decides whether to approve | Workflow seeks stability; Cyber-Ming seeks governability |
| Spec-Driven | Take spec as truth; writing spec counts as completing planning | Do not treat the spec as the primary governance object; require the executor to submit an auditable, rollbackable, evidence-bearing Atomic Execution Contract before work begins | Spec-Driven treats the spec as the main planning object; Cyber-Ming treats the Atomic Execution Contract as the main planning object |
| Agent Team | Multiple agents in same environment, share codebase and context, auto-collaborate | Executor and auditor separate; Web auditor can't see code—is narrow-context clean-room audit | Agent Team seeks automated collaboration; Cyber-Ming seeks independent audit |

## The Key Cut: Human Sovereignty Cannot Be Outsourced

Workflow, spec-driven, and agent team all have one shared tendency: **Let people retreat behind process or system, let automation take over more decisions.**

Cyber-Ming's position is opposite: **Human must route in the middle.**

- Executor can't self-certify completion
- Auditor can't take over execution
- The two can't communicate privately
- Human is the only cross-system physical router

This is not because of distrust in AI, but because in deep water, once execution, audit, and judgment squeeze back into the same track, pseudo-completion, black-box distortion, and context decay will all come back.

## Why Cyber-Ming Is Not Spec-Driven but Contract-Driven

This now needs to be said explicitly.

Many people first read Cyber-Ming as a stricter, more audited variant of spec-driven development. That is no longer precise enough.

In this protocol, the primary governance object is not the spec. It is the:

**Atomic Execution Contract**

This is different from a traditional spec not because it is merely “more detailed,” but because it carries a different load:

- It does not only clarify the goal
- It also fixes the current slice's boundaries, acceptance conditions, rollback point, evidence shape, and commit unit
- It does not try to freeze the whole future blueprint up front
- It works as a pulse-sized legal unit that can be chained into long-cycle governance

So if you want the external positioning stated cleanly, the more accurate sentence is not “Cyber-Ming is another spec-driven method.” It is:

**Cyber-Ming is a contract-driven method for deep-water AI coding governance.**

It absorbs what is valuable in spec-driven development—plan first, boundary first, auditable object first. But it refuses to freeze the whole future into one heavyweight spec. Instead, it uses the Atomic Execution Contract to govern each real slice of forward motion.

### Why This Fits Deep Water Better Than Heavy Specs

Heavy specs often suffer from a three-way imbalance:

- when you push for stronger constraint, they get heavier
- when you push for more flexibility, they get looser
- when you use them for long cycles, people start maintaining the blueprint instead of the product

The Atomic Execution Contract tries to rebalance those forces:

- lighter than a heavy spec, because it only compresses the current slice
- harder than an ordinary plan, because it carries boundaries, acceptance, red/green gates, and evidence hooks
- more auditable than either, because both the auditor and the human can reconcile it line by line
- more suitable for long-cycle development, because multiple contracts can be chained pulse by pulse instead of relying on one giant frozen blueprint

There is also a practical advantage that gets missed easily: **its output skeleton is more stable.**

Heavy specs tend to grow thick and uneven. Ordinary plans tend to improvise a new shape every round. Atomic Execution Contracts use a more stable field skeleton with higher repetition, so they are usually easier to drive into a stable output form and often carry a small cost advantage as well.

That is why Cyber-Ming is not simply “specs, but more detailed.” It changes the planning object itself from spec to contract.

## Why Web Auditor Can't See Code

This is the most visible difference between Cyber-Ming and agent team.

In agent team, all agents share codebase, collaborate together. The good side is information is sufficient; the bad side is context mutual contamination—audit is easily taken away by executor's narrative.

Cyber-Ming's Web auditor is a **narrow-context clean-room position**:
- Can't see the complete codebase
- Only looks at the human-packaged minimum evidence package
- Relies on independent judgment, not contaminated by executor's context

This limits audit information volume, but trades for independence. When executor says "already done," auditor doesn't look at its context—only looks at physical evidence.

Details: [Dual-track Isolation Audit](../03-deep-water/dual-track-audit.md)

## Why Not Completely Unrelated

Because they're all solving the same problem: **After AI coding enters deep water, how to maintain governability.**

Workflow's process thinking, spec-driven's plan-first, agent team's division of labor are all nutrients for Cyber-Ming. It doesn't reject these—it adds one cut on top: **Human sovereignty.**

## Why Not Completely Identical

Because they by default give sovereignty to system, while Cyber-Ming keeps sovereignty in human hands.

- Workflow lets process decide
- Spec lets specification decide
- Agent team lets collaboration mechanism decide
- Cyber-Ming lets human decide

Process, specification, and collaboration mechanism are all tools—not the decider.

## Related Pages

- [Three Things](three-things.md): separate the comparison objects first, then return here to map against mainstream approaches
- [Minimal Loop Guide](prompt-pack.md): return to the Layer 1 parent page
- [Minimal Stable Loop Guide](stable-loop-guide.md): if you have already completed Layer 1, continue into Layer 2
- [CS vs Management](../01-why/cs-vs-management.md): Developer position has changed
- [Dual Distortion](../01-why/dual-distortion.md): Technical and governance distortion always appear together
- [Methodology Coordinates](../01-why/methodology-coordinates.md): Where this protocol stands in public world (more detailed comparison)
- [Dual-track Audit](../03-deep-water/dual-track-audit.md): Why executor and auditor must separate

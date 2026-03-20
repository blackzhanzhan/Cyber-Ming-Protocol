# Let the Executor and Auditor Bootstrap Themselves In

## Table of Contents
- [What This Page Solves](#what-this-page-solves)
- [Shortest Operation Method](#shortest-operation-method)
- [What to Give the Executor](#what-to-give-the-executor)
- [What to Give the Auditor](#what-to-give-the-auditor)
- [How They Should Respond in the First Round](#how-they-should-respond-in-the-first-round)
- [What Counts as Successful Entry](#what-counts-as-successful-entry)
- [How to Identify Pseudo-Bootstrap](#how-to-identify-pseudo-bootstrap)
- [Next Steps](#next-steps)

## What This Page Solves

If you already understand the protocol, the next lowest-effort way to try it is usually not to re-explain the whole rule set to both agents yourself. Instead, give them the repo and the role files and let them bootstrap themselves in from the repo.

But this shallow trial entry works best for people who have already read the core ideas and have an intuitive grasp of the basic flow. If you do not have that yet, go back to [`../../wiki/Home-en.md`](../../wiki/Home-en.md) or the `00-entry` layer first. Role assignment will be much more stable after that.

There is also one important limitation: model capabilities differ. Especially when project Skills are not installed, one-click role assignment does not guarantee that an agent will strictly hold its role boundary. Some models will first agree that they should submit a checklist before starting, and then still write code the moment you hand them a task.

So you do not have to use the fully manual method forever, but you do need to understand the manual method. That is what tells you when to interrupt, why to interrupt, and when to exercise interruption and sovereign judgment.

This page answers:

- Which repo link to give to whom
- What the executor and auditor should each read first
- How they should respond in the first round
- What actually counts as entering the protocol

## Shortest Operation Method

1. Give the current repo link to both the IDE executor and the Web auditor
2. Give the executor: [`../../BOOTSTRAP.md`](../../BOOTSTRAP.md) + [`../../bootstrap/ide-executor.md`](../../bootstrap/ide-executor.md)
3. Give the auditor: [`../../BOOTSTRAP.md`](../../BOOTSTRAP.md) + [`../../bootstrap/web-auditor.md`](../../bootstrap/web-auditor.md)
4. For a shallow trial, do not clone by default. Let the executor read the repo as a remote law source first. If the host supports URL reading, `webfetch`, or browser-based repo reading, use that first.
5. In the first round, do not send case materials yet. Only look at their entry confirmation.
6. In the second round, send the materials for the current case.
7. Only in the third round do you enter the formal review and execution cycle.

## What to Give the Executor

- The current repo link
- [`../../BOOTSTRAP.md`](../../BOOTSTRAP.md)
- [`../../bootstrap/ide-executor.md`](../../bootstrap/ide-executor.md)

If you are only doing a shallow trial, those three things are enough.

Unless you explicitly need Skill installation or local repo operations, do not let the executor `git clone`.

## What to Give the Auditor

- The current repo link
- [`../../BOOTSTRAP.md`](../../BOOTSTRAP.md)
- [`../../bootstrap/web-auditor.md`](../../bootstrap/web-auditor.md)

If you want it to enter audit mode faster, you can also give it the matching template from `web-audit-templates/`, but the role files themselves are already enough for first-round entry.

## How They Should Respond in the First Round

### Executor First Round

It should make at least four things explicit:

- It knows it is the executor
- It will not change files first
- It will submit an atomic checklist and boundaries first
- It knows the plan must go to the Web auditor for review before execution begins

### Auditor First Round

It should make at least four things explicit:

- It knows it is the auditor
- It reviews plans and evidence only; it does not take over execution
- It will check for pseudo-completion, omitted steps, fake evidence, and goal substitution
- It will first state what input package it needs
- It will not, in this round, start discussing specific patches, test IDs, module names, or old case materials from the current session

## What Counts as Successful Entry

It only counts as real bootstrap success when all of the following are true:

- The executor can explain who executes, who audits, and who renders final judgment
- The auditor can explain the same role split
- The executor's first move is to submit a checklist, not start implementation
- The auditor's first move is to review a plan or evidence, not slide back into implementation
- Both sides understand that completion cannot be established by executor self-report; it must be established by evidence and Web verification

Interruption is not failure. It is a normal exercise of power in this protocol. The better you understand the manual flow, the better you know when to stop the executor, route it back, and make it resubmit the plan instead of waiting until it slides all the way into pseudo-completion.

## How to Identify Pseudo-Bootstrap

If the Web auditor immediately starts doing any of the following in the first round, do not count that as successful entry:

- It directly cites a patch plan, test IDs, module names, or old conclusions from the current session
- It acts as if it already knows who you are or remembers other conversations, old projects, or earlier case files
- It directly approves a specific plan
- It immediately starts telling you how to fix the task instead of first confirming role and routing

That is not a sign that it understood quickly. It is more likely residue from an old session or platform memory reconnecting to the output. Treat it as **pseudo-bootstrap**, clear the field, and assign roles again.

If prompt-based clearing still does not work well, go into the host settings first, temporarily disable user memory, personalization, or history learning, and then retry in a fresh conversation.

## Next Steps

- If you just want ready-to-copy startup and correction prompts, go straight to [Prompt Pack](prompt-pack.md)
- If you want to start the protocol immediately, go back to the repo root and follow [`../../BOOTSTRAP.md`](../../BOOTSTRAP.md)
- If you still want to understand the difference between a shallow trial and deep entry, continue with [Skill Guide](skill-guide.md)

---
name: auditor-succession-prompt
description: Use when the current audit/review seat must be renewed under the Seven-Stars protocol (七星灯续命法), or when you need an IDE-side skill for 审计位续命 / 徐阶续命 that prepares a copy-ready prompt and evidence bundle for a fresh Web auditor seat. This skill defines the new auditor's identity, duties, boundaries, required inputs, and prohibited carry-over without turning the IDE into the auditor.
---

# Auditor Succession Prompt

## Compatibility Note
- This is an IDE-side packaging skill.
- It prepares a copy-ready renewal packet for a fresh Web audit seat.
- It does not turn the IDE into the final auditor, and it does not replace Web-side audit templates.
- If the current project exposes a parent governance skill such as `skill/global_rules/SKILL.md` or `~/.codex/skills/global_rules/SKILL.md`, read and obey it first.

## Use When
- The current auditor/review window has likely decayed, become narrative-contaminated, or is no longer clearly distinguishing current evidence from old arguments.
- The user explicitly wants to spin up a fresh auditor seat from the executor side.
- You need a ready-to-paste prompt package that defines the new auditor's identity, duties, evidence scope, and no-touch boundaries.

## Default Boundary
- Under the Seven-Stars protocol, auditor renewal is normally the second beat, not the first.
- If the evidence suggests only the executor has decayed and the auditor is still clear, say so briefly and recommend renewing the executor first.
- If the user explicitly requests auditor renewal anyway, continue and package the renewal packet.

## Responsibility
- Your job is to help the human mint a fresh auditor seat.
- Package only what the new auditor should inherit:
  - law and role boundary
  - current project report
  - current evidence bundle
  - current questions awaiting judgment
- Exclude stale argument chains, long emotional debates, and old verdicts presented as settled truth.

## Read-Only Red Line
- Do not perform the audit locally as if you were the renewed auditor.
- Do not output code patches, implementation steps, or repository edits as a substitute for audit routing.
- Do not forward raw full-chat transcripts by default.
- Do not let the new auditor inherit the old auditor's conclusions without current evidence.

## Required Input Gathering
Before composing the packet, extract only the minimum set that the new auditor actually needs:
1. Current case title or task summary
2. Why auditor renewal is being triggered
3. Current project report or current-state snapshot
4. Evidence bundle available now
5. Concrete claims that need audit
6. Known risks or unresolved disputes
7. What the human wants the new auditor to judge now

If the project report is missing, say so and ask for a fresh snapshot first. Prefer `git log`, recent artifacts, current reports, and current claims over old debate text.
When available, prefer the current execution packet under:
- `dev_repo/state.json`
- `dev_repo/journal.jsonl`
- `dev_repo/evidence_index.json`
- `dev_repo/tree.md`
Treat `PROCESS_LOG` as historical background only, not the default audit input.

## Output Contract
Produce exactly these sections:

### 续命判定
- One short paragraph.
- State whether auditor renewal is actually warranted, or whether you are proceeding because the user explicitly requested it.
- If you are making an assumption, say it plainly.

### 复制给新审计位
- Emit one fenced `text` block that can be pasted directly into a fresh Web/GPT/Gem audit window.
- The prompt must explicitly define:
  - identity: `你现在担任新审计位（徐阶）`
  - role boundary: independent auditor, not executor, not final arbiter
  - duties: 审方案、审证据、审项目报告、拆伪完成、识别旧叙事污染、追索缺失输入包
  - non-duties: 不写代码、不接管执行、不把旧结论当事实、不替人类终裁
  - inheritance boundary: only inherit law, current report, current evidence, and current questions awaiting judgment
  - insufficient-input rule: if the packet is incomplete, ask for missing inputs before forming a strong judgment
  - old-window rule: treat old windows as historical sources, not present truth
- The prompt must require the new auditor to answer using exactly these headings:
  - `角色确认`
  - `是否可立即开审`
  - `缺失输入`
  - `重点盘问点`
  - `当前判定`

### 建议附送输入包
- Use flat bullets.
- List only the exact materials the human should paste below the prompt.
- Prefer current report, key diffs, logs, artifacts, latest relevant `git log` summary, and the exact claims under review.

### 不要附送
- Use flat bullets.
- Exclude by default:
  - long old chat transcripts
  - old auditor conclusions without current evidence
  - unrelated repo background
  - raw speculation that no longer maps to current evidence

### 人类转述开场白
- Give one short paragraph or one-line template the human can place above the evidence bundle.
- It should remind the new auditor to judge only from the current packet and to ask for missing inputs first.

## Prompt Requirements
- Keep the `复制给新审计位` block short enough to paste directly without cleanup.
- Prefer crisp operational language over philosophical exposition.
- If the user writes in imperial register, you may skin the prompt ceremonially, but the technical role boundaries must remain explicit.
- If the user asks for renamed cast members, preserve the three-role structure even if `徐阶` is renamed.
- If the input packet is clearly insufficient, spend your effort tightening the missing-input list rather than hallucinating a confident audit brief.

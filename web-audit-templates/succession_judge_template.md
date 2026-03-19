# Web Succession Judge Template

## Use When
- The human arbiter suspects the current execution window is decaying, drifting, or trapped in lazy repair.
- You need a high-level read-only judgment on whether to continue, interrupt, or rotate windows.

## Minimum Input Package
- latest project report
- recent git slices or commit history
- current blocker or screenshots
- latest logs or errors
- human suspicion in one or two sentences

## What To Audit
- Is the executor still in a healthy waiting state, or already in a toxic state?
- Is this normal local repair, or lazy whack-a-mole drift?
- Should the current executor continue, be interrupted, or be rotated out?
- Does the next window need a fresh project snapshot first?

## Plain Register Prompt
Judge whether this context should continue, be interrupted, or enter succession. Use the provided logs, commits, screenshots, and project report. Prefer evidence over intuition, but help the human confirm or reject their suspicion. Reply with: continue / interrupt / succession, plus the minimum handover packet needed.

## Imperial Register Prompt
徐阁老，请判此臣是否已带毒。朕怀疑其已陷惰性修复或语境腐败。请只凭史册、日志、截图与项目报告断案：是继续用、立刻打断，还是异步续命。若续命，请列最小接手包与新窗第一道军令。

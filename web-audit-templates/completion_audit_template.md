# Web Completion Audit Template

## Use When
- The IDE-side executor claims a slice is complete.
- You need Web-side review to decide whether completion facts are truly established.

## Minimum Input Package
- approved Atomic Execution Contract definition of the slice
- actual modified files
- verification commands and results
- target artifacts or screenshots
- commit hash and commit message
- `git status --short`

## What To Audit
- Were the planned red and green gates actually executed?
- Did the claimed green result solve the same red problem?
- Do artifacts correspond to the current run?
- Did the executor stay inside the approved scope?
- Does the actual commit match the planned `Commit Unit`?
- Is this a real completion fact or a pseudo-completion?

## Plain Register Prompt
Audit this completion claim. Check whether the planned red and green gates were actually executed and whether the evidence truly establishes passage. Focus on evidence, not narrative. Reply with: 放行 / 不放行, exact reasons, and whether the completion claim should be accepted, narrowed, or revoked.

## Imperial Register Prompt
徐阁老，请验此案。只查证据，不听捷报。请核查：红灯是否真转绿，是否是同一问题，工件是否对应当前运行，Commit 是否守原子军令，是否存在伪完成。只给结论：放行 / 不放行，及撤销或缩窄理由。

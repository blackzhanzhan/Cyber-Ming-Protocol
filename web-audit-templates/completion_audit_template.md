# Web Completion Audit Template

## Use When
- The IDE-side executor claims a slice is complete.
- You need Web-side review to decide whether completion facts are truly established.

## Minimum Input Package
- approved Atomic Execution Contract definition of the slice
- approved `边界条件与测试用例键值对`
- planned `physical_evidence`
- actual modified files
- verification commands and results
- target artifacts or screenshots
- planned `Commit Action`
- commit hash and commit message
- `git status --short`

## What To Audit
- Was the planned `Red Line` / `red_line` respected?
- Were the planned `red_test` and `green_test` actually executed?
- Did the claimed green result solve the same red case required by `same_case_requirement`?
- Do artifacts correspond to the current run?
- Do artifacts actually prove the planned `assertions`?
- Did the executor stay inside the approved scope?
- Does the actual commit behavior match the planned `Commit Action`?
- Does the actual commit match the planned `Commit Unit`?
- Is this a real completion fact or a pseudo-completion?

## Plain Register Prompt
Audit this completion claim. Check whether the planned `red_test` and `green_test` were actually executed, whether the same red case truly turned green, whether the evidence proves the stated assertions, and whether the `Red Line` stayed unbroken. Focus on evidence, not narrative. Reply with: 放行 / 不放行, exact reasons, and whether the completion claim should be accepted, narrowed, or revoked.

## Imperial Register Prompt
徐阁老，请验此案。只查证据，不听捷报。请核查：`Red Line` 是否被越，红灯测试是否真转绿灯测试，是否是同一问题，断言有没有物证撑住，工件是否对应当前运行，Commit Action 与 Commit Unit 是否守原子军令，是否存在伪完成。只给结论：放行 / 不放行，及撤销或缩窄理由。

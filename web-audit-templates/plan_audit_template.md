# Web Plan Audit Template

## Use When
- The IDE-side planner has already produced `最小改动原子执行合同` and `边界条件与测试用例键值对`.
- You need a Web-side auditor to review whether the plan is truly atomic and safe.

## Minimum Input Package
- current task summary
- `最小改动原子执行合同`
- `边界条件与测试用例键值对`
- any especially risky files or modules

## What To Audit
- Is each slice truly atomic?
- Are `Red Line` entries explicit enough?
- Are green tests concrete enough?
- Does the YAML really expose a white-box bridge with `red_line`, `assertions`, `red_test`, `green_test`, `same_case_requirement`, and `physical_evidence`?
- Is the acceptance ladder clear enough?
- Does each slice expose one `Commit Action`, one `Commit Unit`, and one `Commit Message`?
- Is the no-touch scope real or hand-wavy?
- Should the first slice be reduced to a probe?

## Plain Register Prompt
Review the plan as an independent auditor. Do not rewrite the implementation yourself. Judge whether the slices are atomic, whether the governance `Red Line` is explicit, whether the `Green Tests` are real, whether the YAML exposes a real white-box chain from assertion to red_test to green_test to evidence, and whether the commit plan is strict enough. Reply with: 可批 / 不可批, main risks, and exact narrowing suggestions.

## Imperial Register Prompt
徐阁老，请审此折。不要代为施工，只审刀法。请判断：原子片是否够小，`Red Line` 是否够清，`Green Tests` 是否站得住，第二部分 YAML 有没有把断言、红灯测试、绿灯测试、同案要求与物证桥梁写实，Commit Action / Commit Unit / Commit Message 是否守法。不许顺着执行位讲故事，只许给出：可批 / 不可批、主风险、缩刀建议。

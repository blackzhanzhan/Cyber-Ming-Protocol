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
- Are red lights explicit enough?
- Are green tests concrete enough?
- Is the acceptance ladder clear enough?
- Does each slice expose one `Commit Action`, one `Commit Unit`, and one `Commit Message`?
- Is the no-touch scope real or hand-wavy?
- Should the first slice be reduced to a probe?

## Plain Register Prompt
Review the plan as an independent auditor. Do not rewrite the implementation yourself. Judge whether the slices are atomic, whether the red and green gates are real, whether the acceptance ladder is specific, and whether the commit plan is strict enough. Reply with: 可批 / 不可批, main risks, and exact narrowing suggestions.

## Imperial Register Prompt
徐阁老，请审此折。不要代为施工，只审刀法。请判断：原子片是否够小，红绿灯是否够清，验收阶梯是否站得住，Commit Action / Commit Unit / Commit Message 是否守法。不许顺着执行位讲故事，只许给出：可批 / 不可批、主风险、缩刀建议。

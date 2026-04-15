# Campaign Runtime 待办清单

这份清单只记录后续可以继续升级的开发框架项。

带 `[x]` 的是本轮 release 已经落地的部分。

## 第一层：文书与法统

- [x] 给 `legacy-project-handover` 增加 “当前 campaign runtime 快照” 读取规则
- [ ] 给 `probe-first-scout` 增加 “probe 是否展开子合同” 的判断标准
- [x] 在协议文书中增加一页：
  - “父合同为什么不能被子合同静默替代”
- [x] 在入口文书里明确：
  - serious work 的当前真相优先落在 `dev_repo/`，而不是只留在对话里

## 第二层：运行时结构

- [ ] 定义统一的 `state.json` 字段规范
- [ ] 定义统一的 `journal.jsonl` 事件词汇
- [ ] 定义统一的 `evidence_index.json` 最小字段
- [ ] 定义 `tree.md` 的推荐模板与 collapsed history 渲染规则

## 第三层：skill 升级

- [x] 让 `approval-first-planner` 默认输出：
  - `contract_id`
  - `parent_contract_id`
  - `root_campaign`
  - `summary`
  - `return_to`
- [x] 让 `approved-checklist-executor` 默认要求：
  - slice 完成后写明是否返回父合同
- [x] 让 `auditor-succession-prompt` 在续命包里优先附带当前 `dev_repo` execution packet（含 `tree.md`）
- [x] 增加 `free-development-mode`，并把它接入 `global_rules` 的官方第二路线

## 第四层：自动化

- [x] 提供一个最小脚本生成 campaign runtime 目录骨架
- [ ] 提供一个脚本在 slice 完成后自动更新 `state.json`
- [ ] 提供一个脚本从 `state.json` 渲染 `tree.md`
- [ ] 提供一个 runner / guard 层入口，把合同树状态迁移从口头叙述继续往脚本状态机推进

## 第五层：治理补丁

- [ ] 定义“什么时候必须开子合同，什么时候只是普通 replanning”
- [ ] 定义“父合同 abandoned 的合法条件”
- [ ] 定义“root campaign 被替换时的人类告警格式”
- [ ] 定义“合同开发模式”和“自由开发模式”之间的切换告警格式

## 第六层：示例与教学

- [ ] 补一份“主合同 -> 子合同 -> 返回父合同”的最小样例
- [ ] 补一份“错误示例：子合同悄悄篡位”的反例
- [ ] 补一份给新手看的超短版说明
- [ ] 补一份“探马 -> 自由开发模式 -> 返回主线”的最小样例

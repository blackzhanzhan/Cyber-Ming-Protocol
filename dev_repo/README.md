# Campaign Runtime 说明

这份文档只回答一个问题：

**当合同越来越多、子合同不断展开、执行窗口还可能轮转时，如何防止执行着执行着回不去主线。**

从这一版开始，一个关键边界被钉死了：

> 合同可以在对话里被讨论，但 serious work 的当前真相，不应继续只活在对话里。
> 对应 skill 会在需要时自动 bootstrap `dev_repo/`，把运行时真相落到仓库工件里。

它不是新的“总流程模板”，而是给现有协议补一层：

- 当前主战役是什么
- 现在在哪个合同上
- 这个合同是不是父合同下临时展开的子合同
- 子合同做完后回哪里
- 当前主线有没有被局部 firefight 静默篡位

## 为什么要有这一层

只靠聊天记录，会出现三个问题：

1. 主合同和子合同的层级关系会蒸发
2. 执行位可能在局部修补中悄悄换了主线
3. 审计位和人类越来越看不清“当前正在打哪场仗”

所以需要一个统一的 **campaign runtime**。

## 它怎么出现

现在默认不是让人手工先建一个 `dev_repo/` 目录再开始说理。

更稳的做法是：

- 当对应 skill 发现 repo 还没有 process-truth scaffold 时，自动创建 `dev_repo/`
- 当前默认 helper 是 `skill/global_rules/scripts/bootstrap_dev_repo_runtime.py`
- 所以 `dev_repo/` 不是附属说明书，而是 serious work 的运行时真相层
- Skill 负责把这个容器立起来，但当前真相仍然必须靠合同树、日志、工件索引和运行证据来成立

## 最小结构

建议每个主战役有一个运行时目录，例如：

```text
dev_repo/
├── state.json
├── journal.jsonl
├── evidence_index.json
└── tree.md
```

### `state.json`

机器真相层。至少要把 campaign 级字段和 contract 级字段分开。

Campaign 根字段建议至少记录：

- `campaign_id`
- `root_goal`
- `root_contract_id`
- `active_contract_id`
- `status`
- `contracts`

每个合同对象至少要能回答：

- `contract_id`
- `parent_contract_id`
- `root_campaign`
- `status`
- `summary`
- `goal`
- `return_to`

### `journal.jsonl`

事件流。只记这些：

- 开主合同
- 过红线
- 开子合同
- 解决子合同
- 返回父合同
- 完成 slice
- 进入 / 退出 `自由开发模式`（如适用）

### `evidence_index.json`

证据索引，不负责解释，只负责定位：

- 哪个合同产生了哪些工件
- 工件在哪
- 哪些是关键证据

### `tree.md`

给人看的大图，不写复杂验收标准，只写：

- 当前主战役
- 当前激活合同
- 子合同为什么展开
- 解决后回哪里
- 当前 live tree 里哪些合同仍然未解

推荐每条 live tree 行都保持在这种可扫读格式：

- `contract_id — summary [status]`

## 父子合同关系

任何子合同都必须显式记录：

- `contract_id`
- `parent_contract_id`
- `root_campaign`
- `summary`
- `why_opened`
- `red_line_crossed`
- `return_to`

并遵守一个硬规则：

> 子合同可以暂停父合同，但不能悄悄取代父合同。

嵌套合同机制不是为了把计划写得更花，而是为了让系统随时能回答四个问题：

- 当前主线是什么
- 当前子线为什么展开
- 父合同是不是被暂停了
- 这刀做完之后回哪里

## 最小状态词汇

推荐只用这些状态：

- `active`
- `paused_for_child`
- `completed`
- `blocked`
- `abandoned`

这样一个技术小白也能快速读懂：

- 现在主合同是不是被打断了
- 子合同是否只是临时插入
- 这场战役到底有没有真正换主线

## 为什么它对项目进展和认知债务有帮助

`dev_repo/` 一旦立住，项目进展就不再只能靠口头回忆来重建。

它最直接带来的帮助有三层：

- 看进展时，不用先翻整段对话，只要先看 `state.json` 和 `tree.md` 就知道当前主线、当前激活合同与 `return_to`
- 续命或接手时，新窗口不必先继承旧叙事，而可以先读 runtime snapshot，再读 Git 起居注和证据
- 认知债务偿还时，不再只是追问“做到了哪”，还可以追问“当前卡在哪个合同、这个合同为什么开、做完回哪里”

也就是说，它把“项目现状快照”从体面总结，往可审工件推进了一步。

## 和自由开发模式的关系

`自由开发模式` 不是取消 runtime，而是更依赖 runtime。

因为一旦进入长时、连续、带不确定业务的开发，最容易发生的就是：

- 主线被局部 firefight 静默替代
- 分支越来越多，但没人说得清现在回哪里
- 进展看起来很多，认知债务却在一起上涨

所以即使进入 `自由开发模式`，也仍然要保住：

- `dev_repo/state.json`
- `dev_repo/journal.jsonl`
- `dev_repo/evidence_index.json`
- `dev_repo/tree.md`

如果一条长时开发路线已经说不清当前主线、当前子线和 `return_to`，那它就已经不是自由开发，而是执行漂移。

## 和现有文件的关系

- `PROCESS_LOG`
  - 记历史
- `campaign runtime`
  - 记当前真相
- 对话
  - 负责讨论、解释与路由，但不应继续独占当前真相

二者不要再混用。

## 最低落地要求

哪怕暂时还没把自动更新都做完，也至少要做到：

1. 对应 skill 能自动 bootstrap `dev_repo/` 四件套
2. 有 `state.json`
3. 有 `tree.md`
4. 每次开子合同时写出：
   - 为什么开
   - 回哪
5. 续命和接手时，优先读 `dev_repo` 当前快照，再回看 Git 起居注与证据

做到这些，合同树、项目进展和当前真相就不容易再一起蒸发。

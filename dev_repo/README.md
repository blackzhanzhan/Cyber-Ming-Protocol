# Campaign Runtime 说明

这份文档只回答一个问题：

**当合同越来越多、子合同不断展开时，如何防止执行着执行着回不去主线。**

它不是新的“总流程模板”，而是给现有协议补一层：

- 当前主战役是什么
- 现在在哪个合同上
- 这个合同是不是父合同下临时展开的子合同
- 子合同做完后回哪里

## 为什么要有这一层

只靠聊天记录，会出现三个问题：

1. 主合同和子合同的层级关系会蒸发
2. 执行位可能在局部修补中悄悄换了主线
3. 审计位和人类越来越看不清“当前正在打哪场仗”

所以需要一个统一的 **campaign runtime**。

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

机器真相层。至少记录：

- `campaign_id`
- `root_goal`
- `active_contract_id`
- `contracts`
- `parent_contract_id`
- `root_campaign`
- `status`
- `return_to`

### `journal.jsonl`

事件流。只记这些：

- 开主合同
- 过红线
- 开子合同
- 解决子合同
- 返回父合同
- 完成 slice

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

## 父子合同关系

任何子合同都必须显式记录：

- `contract_id`
- `parent_contract_id`
- `root_campaign`
- `why_opened`
- `red_line_crossed`
- `return_to`

并遵守一个硬规则：

> 子合同可以暂停父合同，但不能悄悄取代父合同。

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

## 和现有文件的关系

- `PROCESS_LOG`
  - 记历史
- `campaign runtime`
  - 记当前真相

二者不要再混用。

## 最低落地要求

哪怕暂时不做自动化，也至少要做到：

1. 有 `state.json`
2. 有 `tree.md`
3. 每次开子合同时写出：
   - 为什么开
   - 回哪

做到这三点，合同树就不会轻易蒸发。

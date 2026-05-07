# 架构宪法与合同Hook：让架构约束计划与执行

## 目录
- [这页解决什么问题](#这页解决什么问题)
- [最短定义](#最短定义)
- [为什么需要强 Hook](#为什么需要强-hook)
- [架构宪法是什么](#架构宪法是什么)
- [旧项目接手时如何初始化架构图](#旧项目接手时如何初始化架构图)
- [架构图详细到什么程度](#架构图详细到什么程度)
- [普通合同与修宪合同](#普通合同与修宪合同)
- [最小落地规则](#最小落地规则)
- [一句话压轴](#一句话压轴)
- [相关页面](#相关页面)

## 这页解决什么问题

这页回答一个运行层问题：

**怎样让合同不是靠 agent 自觉触发，而是被宿主计划模式、运行时文件和架构宪法共同钉住。**

原子合同解决了“先审方案再执行”的问题，但系统继续变深以后，还会出现两类新漂移：

- agent 明明进入了 Claude Code、Codex、Cursor 之类宿主的 plan / ask 模式，却只输出一段普通计划，没有变成合同
- 合同看起来合格，却没有引用真实架构，执行时顺手改变了模块边界、依赖方向或运行流

第一类问题需要合同 Hook。第二类问题需要架构宪法。

两者必须合在一起：**Hook 让计划稳定进入合同，架构宪法让合同不脱离系统结构。**

## 最短定义

最短可以压成两句话：

> 宿主 plan 模式只是 `plan-start`，不是合同本身。  
> 架构可以变，但必须走修宪合同，不能从普通施工合同里偷渡。

也就是说：

- Claude Code / Codex / Cursor / OpenCode 的计划阶段，是合同制度的入口
- 入口之后必须经过 `plan-compile`，把计划编译成 Cyber-Ming 原子合同
- 执行前必须经过 `contract-activate`
- 执行时必须声明触及哪些架构节点
- 改架构时必须升级为 `architecture-amend`

## 为什么需要强 Hook

如果只靠 prompt 说“请先写合同”，系统会慢慢回到 agent 自觉。

agent 自觉的问题在于：

- 新窗口不一定记得
- 宿主 plan 模式不一定输出合同字段
- 执行位可能把“计划已经写了”误当成“合同已经成立”
- 复杂任务里，架构变化会被包进普通实现细节

所以运行层需要一个命名清楚的生命周期：

```text
bootstrap-read
  -> plan-start
  -> plan-compile
  -> contract-activate
  -> exec-start
  -> exec-close
```

如果涉及架构变更，还必须进入：

```text
architecture-amend
```

这不是把流程变重，而是把原本靠 agent 记忆的动作外置成稳定触发点。

## 架构宪法是什么

架构宪法不是普通 `ARCHITECTURE.md`。

普通架构说明常常只回答“系统大概是什么”。架构宪法还要回答：

- 哪些子系统存在
- 哪些文件归属哪些架构节点
- 节点之间如何依赖
- 哪些公共接口不能随手改
- 哪些不变量普通合同必须守住
- 什么情况下必须打开修宪合同

推荐放在：

```text
dev_repo/architecture/
├── README.md
├── ARCHITECTURE.md
├── graph.json
├── index.json
├── invariants.md
├── diagrams/
└── decisions/
```

其中 `graph.json` 和 `index.json` 是给 agent 看的机器可读地图；`ARCHITECTURE.md` 和 `invariants.md` 是给人类和 agent 一起看的解释层；`decisions/` 保存架构决定。

## 旧项目接手时如何初始化架构图

接手旧项目时，只读 runtime truth 还不够。

`dev_repo/state.json` 和 `tree.md` 能告诉新窗口“现在打哪场仗”；但新窗口还需要知道“这片疆域长什么样”。

所以旧项目接手应增加一个动作：

```text
architecture census
```

最小普查顺序：

1. 读入口文件：README、package、启动脚本、配置、路由、主要命令
2. 识别子系统：CLI、服务端、前端、数据层、任务系统、测试系统等
3. 建文件归属索引：哪些文件属于哪个架构节点
4. 找关键流：安装流、请求流、构建流、合同流、证据流
5. 写不变量：哪些边界普通合同不能破
6. 标注置信度：`confirmed`、`inferred`、`unknown`

这里最重要的是诚实。

旧项目第一轮架构图可以不完整，但不能装作全知。`unknown` 是后续探马的入口，不是失败。

## 架构图详细到什么程度

合适标准是：

**详细到 agent 能据此规划改动、判断边界、完工后维护；但不要详细到每个函数都进图。**

推荐四层：

1. 系统上下文
2. 主要子系统 / 容器
3. 可维护组件
4. 关键运行流与不变量

每个架构节点至少记录：

```yaml
node_id:
purpose:
owned_files:
public_interfaces:
depends_on:
depended_on_by:
invariants:
allowed_change_types:
requires_amendment_when:
verification:
known_debt:
confidence:
```

普通文件清单太浅；AST / 函数级全图又太重。模块职责、依赖边界、关键流程和不变量，才是最能降低认知债务的粒度。

## 普通合同与修宪合同

普通合同是在现有架构宪法下施工。

它应该声明：

- `affected_architecture_nodes`
- `unchanged_architecture_nodes`
- `architecture_delta`
- `requires_architecture_amendment`

当 `requires_architecture_amendment: false` 时，也要说明为什么没有修宪需求。

修宪合同则用于改变架构。

它必须声明：

- 哪部分变
- 哪部分不变
- 为什么现有架构不足
- 新边界、新依赖、新运行流是什么
- 哪些图、索引、ADR、不变量要同步更新
- 怎么验证这次变化不是架构漂移

这就是“更改架构要有更改宪法的严肃感”。

不是祖宗之法不可变，而是：**能变，但不能偷变。**

## 最小落地规则

### 第一，starter 必须写 Hook

宿主入口要明确：

- plan / ask 模式只是 `plan-start`
- 自由计划必须编译成合同
- 没有激活合同就不能执行
- 改架构必须走 `architecture-amend`

### 第二，planner 必须读架构

合同撰写时至少要读：

- `dev_repo/architecture/README.md`
- `dev_repo/architecture/ARCHITECTURE.md`
- `dev_repo/architecture/graph.json`
- `dev_repo/architecture/index.json`
- `dev_repo/architecture/invariants.md`

### 第三，executor 必须写 delta

完工时不能只说测试通过，还要说明：

- 实际触及了哪些架构节点
- 架构是否变化
- 如果变化，哪些架构文件同步更新
- 如果没变化，为什么仍在普通合同范围内

### 第四，接手旧项目必须先补架构图

没有架构图的旧项目，不要直接进入大范围规划。

先初始化 `dev_repo/architecture/`，哪怕第一版只区分 `confirmed`、`inferred`、`unknown`，也比让新 agent 靠印象规划更稳。

## 一句话压轴

合同 Hook 解决“计划如何稳定变成合同”；架构宪法解决“合同如何不脱离系统结构”。

二者合在一起，Cyber-Ming 才从提示词纪律，进入真正的运行层工程治理。

## 相关页面

- [Campaign Runtime 说明](../../dev_repo/README.md)
- [父合同为什么不能被子合同静默替代](父合同为什么不能被子合同静默替代.md)
- [自由开发模式：在不确定业务中继续可控推进](自由开发模式：在不确定业务中继续可控推进.md)
- [赛博认知债务：剪刀差、察觉信号与可信偿还](赛博认知债务：剪刀差、察觉信号与可信偿还.md)

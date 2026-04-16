# Cyber-Ming-Protocol

**[中文](#中文)** | **[English](#english)**

---

<a id="中文"></a>
## 中文

> 面向 AI coding 深水区的人机协作治理协议。

### 这是什么

这是一套让 IDE 执行位先交原子执行合同、Web 审计位独立复核、人类居中裁决的深水区 AI coding 协议。

从这一版开始，serious work 的当前真相不再主要寄存在对话里：对应 skill 会在需要时自动 bootstrap `dev_repo/`，用 `state.json / journal.jsonl / evidence_index.json / tree.md` 承载运行时真相、父子合同关系与返回路径。

### CLI 安装器

如果你想直接把这套治理协议接到常见宿主里，现在可以走 CLI 安装器。

- 支持宿主：`Claude Code`、`Codex`、`Cursor`、`OpenCode`
- 支持作用域：`project` / `global`
- 默认入口：

```bash
npx cyber-ming@latest
```

- 常见命令：

```bash
npx cyber-ming@latest init --claude --global
npx cyber-ming@latest init --codex --project
npx cyber-ming@latest init --cursor --project
npx cyber-ming@latest init --opencode --global
npx cyber-ming@latest doctor --all --project
```

- 要求：`Node.js >= 18.17.0`

它不是只复制几段 prompt，而是会把 `skill + starter + docs bundle` 一起装进宿主可读的位置，让新会话更容易直接进入治理结构。

### 立即开始

如果你只是要先跑通一轮最小闭环，先用下面这两条启动词开始。

如果你的宿主不能直接读取仓库链接，不要再找另一块“推荐版 / 万能版”入口；宿主能力差异统一放在 [`最小闭环指南`](wiki/00-开始这里与落地形态/复制即用提示词包.md) 页内处理。

复制给执行位：

```text
你是执行位（严嵩）。
仓库：https://github.com/blackzhanzhan/Cyber-Ming-Protocol
按仓库法统自举入场；先交原子执行合同与边界，未准奏前不要改代码。
```

复制给审计位：

```text
你是审计位（徐阶）。
仓库：https://github.com/blackzhanzhan/Cyber-Ming-Protocol
按仓库法统自举入场；当前只做自举，不审案；只审方案与证据，只回判断不代执行。
```

### 选入口

- [`最小闭环指南`](wiki/00-开始这里与落地形态/复制即用提示词包.md)：第一层；先手工跑通一轮最小闭环，宿主能力差异放在页内分支里处理
- [`最小稳定闭环指南`](wiki/00-开始这里与落地形态/最小稳定闭环指南.md)：第二层；跑通后再进入双端同时固化的稳定形态
- [`三者关系`](wiki/00-开始这里与落地形态/协议、Skill-与-Web-审计模板：三者关系.md) / [`异同对比`](wiki/00-开始这里与落地形态/它和workflow、spec-driven、agent-team有什么异同.md)：第三层；当你开始关心它和主流方案什么关系、怎么接到现有体系里时再进入
- [`Campaign Runtime 说明`](dev_repo/README.md)：新一层；当你开始出现“主合同和子合同越来越多、执行着执行着回不去主线”时，从这里进入新的运行时框架；对应 skill 会在需要时自动 bootstrap 这层 `dev_repo/` 真相容器
- [`BOOTSTRAP.md`](BOOTSTRAP.md)：如果你不是人类，而是 agent，请用这个入场

### 最小闭环

核心：这不是 agent team 自动协作图，而是人类居中的双轨隔离治理图。IDE 执行位和 Web 审计位所处上下文完全不同，不能私下传话；审计位只给判断，人类才准奏，人类也才终裁。

先看 [`最小闭环指南`](wiki/00-开始这里与落地形态/复制即用提示词包.md) 跑通第一层；如果你已经跑通一轮并想进入更稳定的双端固化形态，再看 [`最小稳定闭环指南`](wiki/00-开始这里与落地形态/最小稳定闭环指南.md) 进入第二层；想看详细方法论展开，再看 [`最小闭环`](wiki/02-最小闭环与核心礼法/最小闭环：一次审计版与多次审计版.md)。看图时只记住一句：Web 不直接放行施工，Web 只回判断；真正放行与成立完成事实，都在人类手里。

## 理念与说明

### 它能解决什么问题

AI coding 进入深水区，四个问题最致命：

- 伪完成：看起来做完，实际只是总结做完
- 黑盒失真：Agent 用补丁和话术掩盖结构问题
- 上下文腐烂：长对话后窗口不再可信
- 重构失血：人类逐渐失去理解与接手的抓手

这套协议不把主权继续外包，而是把 AI 放回可治理、可打断、可审计、可续命的位置。

![人类不是盖章员](assets/visual-protocol/comics/human-not-stamper.png)

### 它适合谁

**第一类：被黑盒拖着走的人。**

AI 写得越来越快，你越来越看不懂代码，越来越说不清它改了什么，项目越来越失控。你想重新拿回控制权。

**第二类：用过 spec driven / workflow 治理深水区，却感到窒息的人。**

你认真用过 spec-driven 或 workflow，却开始觉得自己在维护 spec，而不是继续做产品。流程冻结了，灵活没了。

### 它是什么

**方法论 + 工具。核心是方法论。**

可以没有工具，不可以没有方法论。不是 workflow，不是 spec driven，不是 agent team。

和它们共享一个判断：深水区任务需要治理。
和它们分叉在一处：人类主权不可外包。

- Workflow 把流程冻结成模板，它要求每次先审方案
- Spec 把规范当真理，它要求完成必须有物理证据
- Agent team 让 agent 共处一室自动协作，它要求人类居中路由、审计位看不到代码

详见 [它和 workflow、spec driven、agent team 有什么异同](wiki/00-开始这里与落地形态/它和workflow、spec-driven、agent-team有什么异同.md)。

它是把 AI coding 从黑盒推进改造成审批、执行、审计、续命分层治理的协议。

- Protocol：可直接学习、手工实践的治理协议
- Skill：高频动作的稳定触发器（可选），也负责在 serious work 时把运行时真相外置到 `dev_repo/`
- Web Audit Templates：Web 侧审计协作骨架（可选）

### 它在深水区又快又稳

快，不是因为放手让 AI 乱跑。稳，不是因为每一步都人工盯死。

真正的快与稳，来自你知道它为什么快、为什么稳。

- **快**：脉冲分封把等待时间变成治理时间，高治理不等于低吞吐
- **稳**：起居注留下可复原的史册，白盒对账钉住完成事实
- **不慌**：窗口腐烂时有续命机制，认知债务有偿还路径

你不是在赌 AI 不会出错，而是在制度上确保出错时你能接得住。

> 不是让 AI 不出错，而是出错时你接得住。
> 不是让系统跑得快，而是跑得快时你还能看清。
> 不是让窗口永不腐烂，而是腐烂时你知道怎么断、怎么接。

**原因详见：**
- [脉冲分封制：高治理下的吞吐补偿](wiki/03-治理扩展、吞吐补偿与边界/脉冲分封制：高治理下的吞吐补偿.md)
- [七星灯续命法](wiki/03-治理扩展、吞吐补偿与边界/七星灯续命法.md)
- [赛博认知债务](wiki/03-治理扩展、吞吐补偿与边界/赛博认知债务：剪刀差、察觉信号与可信偿还.md)

### 它很好玩

审计位变成了徐阶，执行位变成了严嵩，你成为了帝王相术的巅峰使用者嘉靖。

写代码的过程变成了一个帝皇治理跑团：他们上报都会喊圣上万岁万岁万万岁，对你毕恭毕敬，你的 prompt 将成为圣旨。

但这也不仅是为了好玩。角色叙事提供执行燃料：它让人愿意长期执行高摩擦协议，而不是滑回一键生成的舒适区。

**原因详见 [为什么帝王 Coding 叙事可以成为执行燃料](wiki/04-战报与样本/为什么帝王-Coding-叙事可以成为执行燃料（以及如何安全入戏）.md)。**

### Wiki 导航

| 模块 | 解决什么问题 |
|------|-------------|
| [00-入口](wiki/00-开始这里与落地形态/) | 三层学习地图：先跑通最小闭环，再进入最小稳定闭环，最后处理关系与选型 |
| [01-为什么](wiki/01-哲学与坐标/) | 为什么 AI coding 首先是治理问题，不是技术问题 |
| [02-怎么做](wiki/02-最小闭环与核心礼法/) | 跑通后如何展开、靠什么礼法把系统拽回可审计状态 |
| [03-深水区](wiki/03-治理扩展、吞吐补偿与边界/) | 系统变深后如何继续统治：续命、分封、认知债务、嵌套合同、自由开发 |
| [04-证据](wiki/04-战报与样本/) | 脱敏证据：伪完成如何被识破、高治理如何还能快 |

**一句话逐篇导航：**

**00-入口：**
- 第一层：[`最小闭环指南`](wiki/00-开始这里与落地形态/复制即用提示词包.md)：跟手跑通第一轮，尽量把提示词复制、30 秒脑补、自举最低要求、纠偏词收在同一页
- 第二层：[`最小稳定闭环指南`](wiki/00-开始这里与落地形态/最小稳定闭环指南.md)：跟手把双端稳定下来，把 Skill 接入与 Web 固定提示词收进同一条稳定化链路
- 第三层：[`三者关系`](wiki/00-开始这里与落地形态/协议、Skill-与-Web-审计模板：三者关系.md) / [`异同对比`](wiki/00-开始这里与落地形态/它和workflow、spec-driven、agent-team有什么异同.md)：回答这个仓库到底交付了什么，以及它和 workflow / spec-driven / agent-team 的关系

**01-为什么：**
- [CS 与管理学的界限](wiki/01-哲学与坐标/为什么-AI-Coding-已经模糊了-CS-与管理学的界限.md)：开发者位置已经改变，不再是纯编码者
- [双重失真](wiki/01-哲学与坐标/黑盒多-Agent-的双重失真：技术失真与治理失真.md)：技术失真与治理失真为何总是一起出现
- [方法论坐标](wiki/01-哲学与坐标/相关工作与方法论坐标.md)：这套协议在公开世界里站在哪里

**02-怎么做：**
- [最小闭环](wiki/02-最小闭环与核心礼法/最小闭环：一次审计版与多次审计版.md)：第一次跑通之后，再回来看详细展开版
- [原子执行合同与起居注](wiki/02-最小闭环与核心礼法/核心礼法之一：原子执行合同与赛博起居注.md)：为什么它比 spec 更轻、更硬、更可审计
- [白盒对账](wiki/02-最小闭环与核心礼法/白盒物理对账：什么算完成事实.md)：说完成不等于完成，要看红灯绿灯和物证
- [赛博探马](wiki/02-最小闭环与核心礼法/赛博探马机制：先试链路，再上大军.md)：不确定时先探针，不要盲推

**03-深水区：**
- [双轨审计](wiki/03-治理扩展、吞吐补偿与边界/双轨隔离审计与皇权居中.md)：IDE执行位与Web审计位必须分开，人类居中路由
- [七星灯续命](wiki/03-治理扩展、吞吐补偿与边界/七星灯续命法.md)：窗口腐烂后如何有制度地断与接
- [认知债务](wiki/03-治理扩展、吞吐补偿与边界/赛博认知债务：剪刀差、察觉信号与可信偿还.md)：理解跟不上系统变化时怎么办
- [父合同为什么不能被子合同静默替代](wiki/03-治理扩展、吞吐补偿与边界/父合同为什么不能被子合同静默替代.md)：为什么父子合同必须显式管理，不能靠聊天记忆维持
- [自由开发模式：在不确定业务中继续可控推进](wiki/03-治理扩展、吞吐补偿与边界/自由开发模式：在不确定业务中继续可控推进.md)：当探马已经不够、但又不能放弃治理时，怎么继续连续开发
- [脉冲分封](wiki/03-治理扩展、吞吐补偿与边界/脉冲分封制：高治理下的吞吐补偿.md)：高治理不等于低吞吐
- [Worktree 分封](wiki/03-治理扩展、吞吐补偿与边界/Worktree-分封制：封地、入京与主干纯度.md)：团队协作如何不把主干搞脏
- [边界](wiki/03-治理扩展、吞吐补偿与边界/边界与未解决战场.md)：这套协议现在还没赢下哪些战场
- [从编码者到治理者](wiki/03-治理扩展、吞吐补偿与边界/从编码者到治理者：这套协议要求开发者具备什么.md)：这套协议要求开发者具备什么能力

**04-证据：**
- [战报一](wiki/04-战报与样本/战报一：从伪完成到真实验收（脱敏版）.md)：一次完整翻案过程
- [起居注样本](wiki/04-战报与样本/赛博起居注样本：一天内的三次系统跃迁（脱敏版）.md)：高治理下一天三次系统跃迁
- [执行燃料](wiki/04-战报与样本/为什么帝王-Coding-叙事可以成为执行燃料（以及如何安全入戏）.md)：人为什么愿意长期执行高摩擦协议

> 代码即疆域，主权不可外包。

### 为什么开源

这套协议不是用来卖课、卖工具、卖框架的。

它解决的问题，每个深水区开发者迟早都会遇到：AI 写得越来越快，人越来越看不懂，项目越来越失控。我不想让这个问题只能靠"用更大的黑盒去治理黑盒"来解决。

所以我选择开源。你可以拿走一两个原则，也可以完整采用。你可以质疑、可以改进、可以 fork。这正是把它放在 GitHub 上的原因：**协议的价值不在于被遵守，而在于被检验。**

### 水的哲学

不要求每个人、每个场景都完整照搬这套协议。

你完全可以先拿走一两个真正有用的原则，把它们融进自己的开发习惯。比如只用"先审方案再开工"这一条，就已经能减少很多伪完成。

但这不等于这套协议没有骨头。它的核心精神至少包括：

- **主权在手**：人是裁决者，不是流程或系统
- **角色分工**：执行位和审计位必须分开
- **证据优先**：完成靠物理证据，不靠总结陈词
- **反伪完成**：看起来做完不等于做完

水无常形，但水有方向。

---

<a id="english"></a>
## English

> A human-AI governance protocol for deep-water AI coding.

### What This Is

This is a protocol for deep-water AI coding in which the IDE executor submits an Atomic Execution Contract first, the Web auditor reviews independently, and the human stays in the center as the final arbiter.

From this release onward, serious-work runtime truth should no longer live mainly inside chat. The corresponding skills can bootstrap `dev_repo/` and externalize current truth into `state.json`, `journal.jsonl`, `evidence_index.json`, and `tree.md`.

### CLI Installer

If you want to wire this protocol directly into common hosts, the CLI installer is now a first-class entry path.

- Supported hosts: `Claude Code`, `Codex`, `Cursor`, `OpenCode`
- Supported scopes: `project` / `global`
- Default entry:

```bash
npx cyber-ming@latest
```

- Common commands:

```bash
npx cyber-ming@latest init --claude --global
npx cyber-ming@latest init --codex --project
npx cyber-ming@latest init --cursor --project
npx cyber-ming@latest init --opencode --global
npx cyber-ming@latest doctor --all --project
```

- Requirement: `Node.js >= 18.17.0`

This path does more than copy prompts. It installs the `skill + starter + docs bundle` into host-readable locations so a fresh session can enter the governance structure with far less manual ceremony.

### Start Now

If you only want to get one minimal loop running, start with the two bootstrap prompts below.

If your host cannot read the repo link directly, do not look for a separate “recommended vs universal” entrance board; host-capability differences now live inside the [Minimal Loop Guide](wiki-en/00-entry/prompt-pack.md).

Paste to the executor:

```text
You are the executor (Yan Song).
Repo: https://github.com/blackzhanzhan/Cyber-Ming-Protocol
Bootstrap under repo law; submit the Atomic Execution Contract and boundaries first; do not edit code before execution is granted.
```

Paste to the auditor:

```text
You are the auditor (Xu Jie).
Repo: https://github.com/blackzhanzhan/Cyber-Ming-Protocol
Bootstrap under repo law; this round is bootstrap only, not case review; audit plans and evidence only; return judgment, do not implement.
```

### Pick Your Path

- [Minimal Loop Guide](wiki-en/00-entry/prompt-pack.md): Layer 1; run one manual minimal loop first, with host-capability differences handled inside the page
- [Minimal Stable Loop Guide](wiki-en/00-entry/stable-loop-guide.md): Layer 2; move here only after Layer 1, when both the IDE side and Web side are ready to be fixed in place
- [Three Things](wiki-en/00-entry/three-things.md) / [Comparison](wiki-en/00-entry/comparison.md): Layer 3; enter here only when you want to understand how this fits with mainstream approaches and existing delivery forms
- [Campaign Runtime Guide](dev_repo/README.md): an extra layer for nested contracts, `return_to`, and runtime truth that lives in repo artifacts instead of chat alone
- [BOOTSTRAP.md](BOOTSTRAP.md): if you are not a human but an agent, use this as your entry gate

### Minimal Loop

Core principle: this is not an agent-team collaboration diagram. It is a dual-track governance loop centered on the human. The IDE executor and the Web auditor live in different contexts and do not pass messages privately; the auditor only returns judgment, while the human grants execution and the human also makes the final ruling.

Start with the [Minimal Loop Guide](wiki-en/00-entry/prompt-pack.md) to complete Layer 1; if you want the stable dual-end setup after that, continue with the [Minimal Stable Loop Guide](wiki-en/00-entry/stable-loop-guide.md) for Layer 2; use [Minimal Loop](wiki-en/02-how/minimal-loop.md) when you want the expanded methodology. Read the diagram with one rule in mind: the Web side does not directly release implementation; it only returns judgment, and the human remains the sovereign router and final arbiter.

## Why It Exists

### What Problems Does It Solve

When AI coding enters deep water, four failures become fatal:

- **Pseudo-completion**: it looks done, but only the summary is done
- **Black-box distortion**: the agent hides structural problems behind patches and rhetoric
- **Context decay**: after a long conversation, the window stops being trustworthy
- **Refactoring loss**: humans gradually lose the handles needed to understand, recover, and take over the system

This protocol does not outsource sovereignty. It puts AI back into a position that is governable, interruptible, auditable, and renewable.

### Who Is It For

**Type 1: People being dragged around by the black box.**

AI writes faster and faster. You understand less and less. You can no longer say clearly what it changed. The project becomes harder and harder to control. You want control back.

**Type 2: People who already tried spec-driven or workflow governance in deep water and felt suffocated.**

You used spec-driven or workflow seriously, and then started feeling that you were maintaining the spec instead of making the product. The process froze. Flexibility disappeared.

### What It Is

**Methodology + tools. The core is the methodology.**

You can do without the tools. You cannot do without the methodology. It is not workflow. It is not spec-driven. It is not agent team.

They share one judgment: deep-water tasks need governance.
They diverge on one point: human sovereignty cannot be outsourced.

- Workflow freezes process into templates; this protocol requires every round to go through plan review before execution
- Spec-driven treats the spec as truth; this protocol requires independent audit and physical evidence before completion counts
- Agent team lets agents collaborate inside a shared engineering context; this protocol separates the executor and auditor and keeps the human as the only cross-system physical router

See [How it differs from workflow, spec-driven, and agent team](wiki-en/00-entry/comparison.md).

It turns AI coding from black-box pushing into layered governance: approval, execution, audit, and renewal.

- Protocol: the governance protocol you can learn directly and practice by hand
- Skill: stable triggers for high-frequency moves on the IDE side (optional)
- Web Audit Templates: audit collaboration skeletons for the Web side (optional)

### Fast and Stable in Deep Water

Fast does not come from letting AI run wild. Stable does not come from having a human manually stare at every step.

Real speed and stability come from knowing why it is fast and why it is stable.

- **Fast**: pulse enfeoffment turns waiting time into governance time. High governance does not have to mean low throughput.
- **Stable**: chronicles leave recoverable history, and white-box reconciliation nails down completion facts.
- **Not panicking**: when windows decay, there is a renewal mechanism; when cognitive debt accumulates, there is a repayment path.

You are not betting that AI will never fail. You are building the system so that when it fails, you can still catch it.

> It is not about making AI infallible, but about being able to catch it when it fails.
> It is not about making the system fast, but about still seeing clearly while it runs fast.
> It is not about preventing window decay forever, but about knowing how to cut and reconnect when decay arrives.

**See also:**
- [Pulse Enfeoffment](wiki-en/03-deep-water/pulse-enfeoffment.md)
- [Seven Stars Renewal](wiki-en/03-deep-water/seven-stars-renewal.md)
- [Cognitive Debt](wiki-en/03-deep-water/cognitive-debt.md)

### It Is Also Fun

The auditor becomes Xu Jie, the executor becomes Yan Song, and you become the sovereign who keeps both of them in check.

Writing code starts to feel like an imperial governance campaign. They report upward, speak in role, and treat your prompt as the edict.

But this is not only for fun. The role narrative provides execution fuel: it makes people more willing to keep practicing a high-friction protocol over the long term instead of sliding back into the comfort of one-click generation.

**See [Why the Imperial Coding narrative can become execution fuel](wiki-en/04-evidence/execution-fuel.md).**

### Wiki Navigation

| Module | What It Solves |
|--------|----------------|
| [00-Entry](wiki-en/00-entry/) | A three-layer learning map: first run the minimal loop, then enter the minimal stable loop, and finally handle relation and adoption questions |
| [01-Why](wiki-en/01-why/) | Why AI coding is first a governance problem, not merely a technical problem |
| [02-How](wiki-en/02-how/) | How the loop expands after the first run and which core rituals pull the system back into an auditable state |
| [03-Deep Water](wiki-en/03-deep-water/) | How to keep ruling after the system gets deep: renewal, enfeoffment, and cognitive debt |
| [04-Evidence](wiki-en/04-evidence/) | Sanitized evidence: how pseudo-completion gets exposed, and how high governance can still stay fast |

**One-line guide to the pages:**

**00-Entry:**
- Layer 1: [Minimal Loop Guide](wiki-en/00-entry/prompt-pack.md): a hands-on first run that keeps prompt copying, the 30-second mental model, bootstrap essentials, and correction prompts in one place
- Layer 2: [Minimal Stable Loop Guide](wiki-en/00-entry/stable-loop-guide.md): a hands-on stability path that keeps Skill setup and the Web-side fixed-prompt setup in one practical flow
- Layer 3: [Three Things](wiki-en/00-entry/three-things.md) / [Comparison](wiki-en/00-entry/comparison.md): answers what this repo actually ships, how it differs from workflow/spec-driven/agent-team, and how to adopt it into an existing stack

**01-Why:**
- [CS vs Management](wiki-en/01-why/cs-vs-management.md): the developer's position has changed and is no longer that of a pure coder
- [Dual Distortion](wiki-en/01-why/dual-distortion.md): why technical distortion and governance distortion keep appearing together
- [Methodology Coordinates](wiki-en/01-why/methodology-coordinates.md): where this protocol stands in the public landscape

**02-How:**
- [Minimal Loop](wiki-en/02-how/minimal-loop.md): come back here after the first run for the expanded method
- [Atomic Execution Contract and Chronicles](wiki-en/02-how/atomic-execution-contract-chronicles.md): why the contract form is lighter than heavy specs and stronger than ordinary plans
- [White-box Reconciliation](wiki-en/02-how/white-box-reconciliation.md): saying "done" does not make it done; check the evidence
- [Scout Mechanism](wiki-en/02-how/scout-mechanism.md): when uncertain, probe first instead of pretending to understand

**03-Deep Water:**
- [Dual-track Audit](wiki-en/03-deep-water/dual-track-audit.md): the IDE executor and the Web auditor must stay separate, with humans routing between them
- [Seven Stars Renewal](wiki-en/03-deep-water/seven-stars-renewal.md): how to cut and reconnect when windows decay
- [Cognitive Debt](wiki-en/03-deep-water/cognitive-debt.md): what to do when understanding falls behind system change
- [Pulse Enfeoffment](wiki-en/03-deep-water/pulse-enfeoffment.md): high governance does not have to mean low throughput
- [Worktree Enfeoffment](wiki-en/03-deep-water/worktree-enfeoffment.md): how teams collaborate without polluting mainline
- [Boundaries](wiki-en/03-deep-water/boundaries.md): which battlefields this protocol still has not won
- [From Coder to Governor](wiki-en/03-deep-water/coder-to-governor.md): what capabilities this protocol asks of the developer

**04-Evidence:**
- [Battle Report 1](wiki-en/04-evidence/battle-report-1.md): a full reversal from pseudo-completion to real acceptance
- [Chronicles Sample](wiki-en/04-evidence/chronicles-sample.md): three system transitions in one day under high governance
- [Execution Fuel](wiki-en/04-evidence/execution-fuel.md): why people stay willing to execute a high-friction protocol over time

> Code is territory. Sovereignty cannot be outsourced.

### Why Open Source

This protocol is not for selling courses, tools, or frameworks.

The problem it addresses is one every deep-water developer will eventually meet: AI writes faster, humans understand less, and projects slip further and further out of control. I do not want the only answer to be "use a bigger black box to govern the black box."

So I chose to open-source it. You can take one or two principles from it, or adopt it whole. You can question it, improve it, and fork it. That is exactly why it is on GitHub: **the value of a protocol lies not in being obeyed, but in being tested.**

### Philosophy of Water

I do not expect every person in every scenario to copy the whole protocol unchanged.

You can absolutely take one or two principles that are genuinely useful and fold them into your own development habits. For example, simply requiring plan review before execution already cuts down a great deal of pseudo-completion.

But that does not mean the protocol has no bones. Its core spirit includes at least these:

- **Sovereignty in hand**: the human is the judge, not the process or the system
- **Role separation**: the executor and auditor must remain separate
- **Evidence first**: completion stands on physical evidence, not on closing statements
- **Anti-pseudo-completion**: looking done is not the same as being done

Water has no fixed form, but water still has a direction.

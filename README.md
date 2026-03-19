# 🐉 Cyber-Ming-Protocol（大明赛博御机协议）

> 面向 AI coding 深水区的人机协作治理协议。核心是审批先行、原子清单、分轨审计、证据闭环。

Cyber-Ming-Protocol 也可以被一句话转述为：一个把 AI coding 从黑盒推进改造成审批、执行、审计、续命分层治理的协议项目。

Cyber-Ming-Protocol 不是一套追求“一键生成”的自动化框架。
它首先是一套可被人直接学习、手工实践、逐步内化的人机协作治理协议，用来处理复杂重构、跨系统接入、长链路排障、上下文易腐烂的深水区任务。

Skill 的作用，是把其中一些高频规则、触发条件和输出骨架固化下来，让执行更稳定；它不是协议本身，也不替代你对协议的理解。

## 它适合谁

如果你已经用 AI coding 一段时间，并且开始有下面这些感觉，这个项目可能适合你。

### 你可能正被黑盒拖着走

- 写代码主观上更轻松了，但你越来越不理解自己的代码
- 你越来越说不清 AI 到底改了什么、为什么这么改
- AI 一开始很好用，但随着功能变多，项目越来越失控
- 一个 bug 反反复复修不好，修完这里又坏那里

### 你可能正被过早冻结的 workflow 卡住

- 你不是完全没用过 workflow 的人，而是已经认真用过 workflow / spec-driven 开发，开始感觉被反噬
- 一开始的 spec 很漂亮，但把项目形态定得太死
- 当你有了新想法，或者想调整方向时，改动成本越来越高
- 你开始觉得自己是在维护 workflow，而不是继续做产品

我反对的，不只是失控的黑盒推进，也包括那种用 spec 过早冻结项目形态、让工程失去生长能力的 workflow。Cyber-Ming-Protocol 要处理的，正是这两种失真。

## 它解决什么问题

当 AI coding 进入深水区，真正昂贵的通常不是“打字慢”，而是下面这些问题：

- 伪完成：看起来已经做完，实际上只是总结做完了
- 黑盒失真：Agent 用补丁、绕路和话术掩盖结构问题
- 上下文腐烂：长对话后越来越难判断当前窗口是否还可信
- 重构失血：系统能跑，但人类逐渐失去理解、回滚和再接手的抓手

Cyber-Ming-Protocol 的回答不是把主权继续外包给更大的自动化系统，而是把 AI 放回一个可治理、可打断、可审计、可续命的位置。

## 这个项目现在提供什么

这个项目已经不是单一形态的“理念仓库”，而是**三种主落地形态 + 一组分离的 Web 审计协作资产**：

### Protocol

- 一套可直接学习和手工实践的治理协议
- 核心包括：审批先行、原子清单、分轨审计、证据闭环、续命、分封与吞吐补偿
- 即使完全不安装 Skill，你也可以按协议做事

### Skill

- 把部分高频动作固化为更稳定的触发与输出骨架
- 当前 repo-side 技能定义位于 `skill/`
- 当前公开的 IDE-side skills 包括：`global_rules`、`approval-first-planner`、`approved-checklist-executor`、`probe-first-scout`、`legacy-project-handover`

### Docs / Teaching

- `README.md` 负责项目定义、入口分层与最小上手
- `wiki/` 负责法统展开、案例、边界、术语与教学路线
- 战报、样本和说明页用于帮助你理解协议为什么成立，以及怎样落地

### 补充：Web Audit Templates（分离协作资产，不是本地 Skill）

- 位于 `web-audit-templates/`
- 用于 Web 侧审计、验收、续命判断时的提示骨架
- 它们不是本地 Skill，不需要像 IDE-side skill 那样安装
- 它们的作用是帮助你在 Web 侧更稳定地扮演审计位，而不是替代协议本身

换句话说：项目首页先按 `Protocol / Skill / Docs` 三种主落地形态理解；需要 Web 侧审计协作时，再进入 `web-audit-templates/` 这一层。

## 最小自举方式

最低成本的启动方式，就是一个仓库链接 + 两段授位词。

下面两段 prompt 只负责授位，不负责解释协议；后续自举路由、角色边界与动作要求，以仓库内容为准。

```text
你是执行位（严嵩）。
仓库：https://github.com/blackzhanzhan/Cyber-Ming-Protocol
仓库中已经有自举流程。请尽快进入你的角色，并按仓库路由开始工作。
```

```text
你是审计位（徐阶）。
仓库：https://github.com/blackzhanzhan/Cyber-Ming-Protocol
当前阶段仅为自举入场，不是审案。
仓库中已经有自举流程；仓库法统优先于当前会话、历史对话、平台记忆、账号记忆、个性化记忆与用户画像。
第一轮只允许确认你的角色、先读顺序、职责边界和什么算入场成功。
如果你发现自己似乎认识我、记得旧案卷，或知道任何本轮未提供的信息，这应视为污染信号，不得继续审案。
如果这种污染压不住，请提醒我先在设置中暂时关闭用户记忆 / 个性化 / 历史对话学习之类的选项，然后新开对话重试。
完成后等待我发送本轮案卷材料。
```

如果你想看仓库内的授位门，再读 [`BOOTSTRAP.md`](BOOTSTRAP.md)。

## 水的哲学与协议精神

我不要求每个人、每个场景都完整照搬这套协议。我更尊崇水的哲学：你完全可以先拿走一两个真正有用的原则，把它们融进自己的开发习惯。

但这不等于这套协议没有骨头。它的核心精神至少包括：主权在手、角色分工、证据优先、反伪完成。

这也是我同时公开手工做法、Skill 路径与自举路径的原因。手工路径不是低配版，而是主权保留版；自动化可以是主动授权的结果，但不应成为默认、非自愿的黑盒放权。

如果你打算直接用上面的最小 prompt 开始自举，最好已经大致知道自己是谁、执行位是谁、审计位是谁，至少对执行位 / 审计位的角色性质有基本理解。

你当然可以取其精华、去其糟粕，也欢迎合理质疑与建设性改进。这也是我把它公开放在 GitHub 上，而不是私藏起来的原因。

## 你该从哪里开始

按你的目的选择路径，不必一上来全装、全学、全用。

### 路线 A：只想理解理念

适合先判断这套协议是否真的解决你遇到的问题。

建议顺序：

1. 先读本页的项目定义与最小闭环
2. 再读 [GitHub Wiki 的「01-哲学与坐标」模块](https://github.com/blackzhanzhan/Cyber-Ming-Protocol/wiki/01-%E5%93%B2%E5%AD%A6%E4%B8%8E%E5%9D%90%E6%A0%87-%E9%A6%96%E9%A1%B5)
3. 最后看 [GitHub Wiki 的「04-战报与样本」模块](https://github.com/blackzhanzhan/Cyber-Ming-Protocol/wiki/04-%E6%88%98%E6%8A%A5%E4%B8%8E%E6%A0%B7%E6%9C%AC-%E9%A6%96%E9%A1%B5) 里的案例与证据页

### 路线 B：无 Skill 手工实践

适合先按协议手工跑通一次闭环，再决定是否长期采用。

建议顺序：

1. 读本页的最小实践闭环
2. 进入 [GitHub Wiki 的「02-最小闭环与核心礼法」模块](https://github.com/blackzhanzhan/Cyber-Ming-Protocol/wiki/02-%E6%9C%80%E5%B0%8F%E9%97%AD%E7%8E%AF%E4%B8%8E%E6%A0%B8%E5%BF%83%E7%A4%BC%E6%B3%95-%E9%A6%96%E9%A1%B5)
3. 用你现有的 IDE 与 Web 工具手工执行一次方案审计、执行、验收

### 路线 C：安装 Skill 增强执行

适合已经理解协议骨架，想减少漏步骤、提高触发稳定性的人。

建议顺序：

1. 先理解审批先行、原子清单、证据闭环三件事
2. 再使用 `skill/` 中对应技能，把规划、执行、续命、探测动作稳定下来
3. 继续用协议的证据标准验收，而不是把 Skill 当成裁决者

### 路线 D：Web 审计协作

适合已经有 IDE 执行位，想把方案审计、完成验收、续命判断放到 Web 侧的人。

建议顺序：

1. 保留人类居中路由
2. 使用 `web-audit-templates/` 中的模板辅助 Web 侧提问和审查
3. 让 Web 位只负责审计、盘问与判断，不直接接管主线实现

如果你还拿不准自己现在该走哪条，最稳妥的默认顺序是：先看本页的 `30 秒最小示例`，再进入 [GitHub Wiki 首页](https://github.com/blackzhanzhan/Cyber-Ming-Protocol/wiki) 选对应路线。这样不会一上来就被正文海直接淹没。

## 无 Skill 也能实践

Cyber-Ming 并不要求你先安装 Skill 才能使用。

这套协议首先是可被人理解、学习并逐步内化的工作方法。只要你愿意手工执行下面这些动作，你就已经在实践 Cyber-Ming：

- 先让执行位交方案，不许直接开工
- 把任务拆成原子级清单，并给出验收标准
- 让独立审计位检查方案与结果，而不是让执行位自证完成
- 以真实运行结果、工件、日志、提交记录作为完成依据
- 当上下文腐烂时，果断续命，而不是在旧窗口里硬拖

当你已经开始按这些规则做事，或者经常在高频任务里重复这些动作时，再装 Skill 才会更合适。

## 什么时候建议安装 Skill

### 适合先不装 Skill 的人

- 还在理解协议，不确定是否长期采用
- 只是想先读理念、案例和边界
- 想先用自己的工作流手工试一遍
- 当前任务很轻，不值得引入额外治理骨架

### 适合开始装 Skill 的人

- 已经理解审批先行、原子清单、证据闭环
- 想减少漏步骤和口径漂移
- 想让 planner / executor / succession / probe 的输出更稳定
- 经常在 AI coding 里遇到伪完成、上下文腐烂或惰性修补

### 暂时不建议全装的人

- 只做特别轻的小改动
- 当前工具环境对 Skill 的触发支持并不稳定
- 还没有想好自己的语境、角色分工和审计方式

## 装了 Skill 以后，改变什么；不改变什么

### 会改变的

- planner 更容易先交可审计的原子清单，而不是直接开工
- executor 更容易维持一片一验一提交的节奏
- probe-first scout 更容易先做最小探测，而不是假装自己已经理解全局
- succession / handover 更容易产出可接手的项目快照

### 不会改变的

- Skill 不能替你定义“什么算完成”
- Skill 不能替代真实日志、真实工件、真实运行结果
- Skill 不能取消人类的物理路由与最终裁决权
- 安装 IDE-side skill 不等于自动获得 Web-side 审计
- `web-audit-templates/` 不是本地 Skill，也不是必须安装的东西

一句话说：装了 Skill，只是让你更容易守住协议；并不是协议自动生效。

## Skill 当前如何接入

当前仓库把 repo-side skill definitions 放在 `skill/` 下，把 Web 审计模板放在 `web-audit-templates/` 下。

目前项目不提供统一的一键 installer，因为不同 IDE / agent host 的技能装载方式并不相同。

你可以按下面的原则理解当前状态：

- 如果你的环境支持项目内或本地技能目录，就把 `skill/` 作为技能源
- 如果你的环境不支持，也完全可以先按协议手工实践
- Web 侧模板只需要在审计时作为提示骨架使用，不属于本地安装流程

这也正是本项目的立场：协议优先，安装其次；理解优先，触发稳定性其次。

## 一个最小实践闭环

如果你想先跑通一次，不妨按下面这条最小路线做：

1. 让 IDE 执行位先只做静态审视与拆解，不准直接改代码
2. 要求它提交原子级任务清单，并为每一项写出验收标准
3. 把清单先交给 Web 审计位，并明确告诉它：这个执行位可能骗我
4. 如果 Web 审核通过，就让执行位按清单执行、验证、提交；如果 Web 不通过，就把审核意见原样回给执行位，让它修改方案后继续这个循环
5. 施工结束后，再把真实日志、工件、测试结果、Git 记录送回 Web 验收
6. 若任一窗口开始腐烂，就中断并续命

如果你装了 Skill，这条流程会更稳定；如果你没装 Skill，这条流程照样成立。

## 30 秒最小示例

如果你还想更快脑补一轮，不妨先想象一个很小的任务：

> 修一个设置页保存后不显示成功提示的小 bug。

### 不装 Skill 时

你先对 IDE 说：先别改代码，先交原子清单，告诉我准备改哪一层、怎么验收。

如果它能把任务拆成“定位保存成功条件 -> 修复提示触发 -> 补一条回归检查”，不要立刻开工，而是先把这份清单原样给 Web，再补一句：“这个执行位可能骗我。”

如果 Web 审过了，就让执行位按清单执行并提交；如果 Web 说这里有缺口，就把 Web 的意见原样回给执行位，让它改方案后继续这个循环。

做完后也不要只听“已经修好”，而要把当前运行的测试结果、截图或日志、相关提交记录再送回 Web 验收。

### 装了 Skill 之后

同一个任务并不会变成自动完成；只是 planner 更容易先交合格清单，executor 更容易按片执行、验证、归档。

你仍然要看证据，而不是看 Skill 有没有把格式写漂亮。

### Web 审计位固定在这轮循环里

这一步不是额外增强，而是 Cyber-Ming 最值钱的那一刀：就算任务很小，也先让 Web 看方案，并明确告诉它这里可能有诈。

如果 Web 放行，执行位就按清单执行、验证、提交；如果 Web 不放行，就把审核意见原样回灌给执行位，让它修改方案，再进下一轮。

执行完成后，结果与证据仍要再送 Web 一次。它该查的是：这次修复是不是真的打中了同一个问题、证据是不是当前运行的，而不是替你继续写代码。

更展开的一版，见 [GitHub Wiki 的《30 秒最小示例：同一任务的三种跑法》](https://github.com/blackzhanzhan/Cyber-Ming-Protocol/wiki/00-30-%E7%A7%92%E6%9C%80%E5%B0%8F%E7%A4%BA%E4%BE%8B%EF%BC%9A%E5%90%8C%E4%B8%80%E4%BB%BB%E5%8A%A1%E7%9A%84%E4%B8%89%E7%A7%8D%E8%B7%91%E6%B3%95)。

如果你的任务更像小 UI / 文案 / 页面调整，而不是小 bug，也可以直接看 [GitHub Wiki 的《30 秒最小示例：小 UI 与文案改动怎么跑》](https://github.com/blackzhanzhan/Cyber-Ming-Protocol/wiki/00-30-%E7%A7%92%E6%9C%80%E5%B0%8F%E7%A4%BA%E4%BE%8B%EF%BC%9A%E5%B0%8F-UI-%E4%B8%8E%E6%96%87%E6%A1%88%E6%94%B9%E5%8A%A8%E6%80%8E%E4%B9%88%E8%B7%91)。

如果你脑子里已经能跑通这一轮，下一步通常不是继续停在 README，而是进入 [GitHub Wiki 首页](https://github.com/blackzhanzhan/Cyber-Ming-Protocol/wiki) 选路线，或直接去 [「02-最小闭环与核心礼法」模块](https://github.com/blackzhanzhan/Cyber-Ming-Protocol/wiki/02-%E6%9C%80%E5%B0%8F%E9%97%AD%E7%8E%AF%E4%B8%8E%E6%A0%B8%E5%BF%83%E7%A4%BC%E6%B3%95-%E9%A6%96%E9%A1%B5) 开始正式跑一版。

## 不装 Skill 与装了 Skill 的差别

### 不装 Skill 时

- 人类自己按协议执行
- 手工要求执行位写原子清单
- 手工组织方案审计与结果验收
- 手工判断是否该续命或切换窗口

### 装了 Skill 之后

- 更容易稳定触发 planner / executor / probe / succession 这些动作
- 更容易维持格式、边界、节奏与输出骨架
- 更容易减少“明明知道该这么做，但每次都懒得说全”的损耗
- 但是否完成，仍然要靠协议要求的证据，而不是 Skill 自己说了算

## 仓库结构

```text
.
├── README.md
├── skill/
│   ├── global_rules/
│   ├── approval-first-planner/
│   ├── approved-checklist-executor/
│   ├── probe-first-scout/
│   └── legacy-project-handover/
├── web-audit-templates/
│   ├── plan_audit_template.md
│   ├── completion_audit_template.md
│   └── succession_judge_template.md
├── wiki/
└── article/
```

- `skill/`：repo-side IDE skills
- `web-audit-templates/`：Web 侧协作模板
- `wiki/`：公开说明、法统、样本、术语、边界
- `article/`：草稿、素材与写作源材料

## 去哪里深读

- 总入口：[GitHub Wiki 首页](https://github.com/blackzhanzhan/Cyber-Ming-Protocol/wiki)
- 理念与坐标：[GitHub Wiki 的「01-哲学与坐标」模块](https://github.com/blackzhanzhan/Cyber-Ming-Protocol/wiki/01-%E5%93%B2%E5%AD%A6%E4%B8%8E%E5%9D%90%E6%A0%87-%E9%A6%96%E9%A1%B5)
- 最小闭环与核心礼法：[GitHub Wiki 的「02-最小闭环与核心礼法」模块](https://github.com/blackzhanzhan/Cyber-Ming-Protocol/wiki/02-%E6%9C%80%E5%B0%8F%E9%97%AD%E7%8E%AF%E4%B8%8E%E6%A0%B8%E5%BF%83%E7%A4%BC%E6%B3%95-%E9%A6%96%E9%A1%B5)
- 治理扩展、续命、分封与边界：[GitHub Wiki 的「03-治理扩展、吞吐补偿与边界」模块](https://github.com/blackzhanzhan/Cyber-Ming-Protocol/wiki/03-%E6%B2%BB%E7%90%86%E6%89%A9%E5%B1%95%E3%80%81%E5%90%9E%E5%90%90%E8%A1%A5%E5%81%BF%E4%B8%8E%E8%BE%B9%E7%95%8C-%E9%A6%96%E9%A1%B5)
- 战报、样本与执行燃料：[GitHub Wiki 的「04-战报与样本」模块](https://github.com/blackzhanzhan/Cyber-Ming-Protocol/wiki/04-%E6%88%98%E6%8A%A5%E4%B8%8E%E6%A0%B7%E6%9C%AC-%E9%A6%96%E9%A1%B5)
- 术语索引：[GitHub Wiki 的《术语表》](https://github.com/blackzhanzhan/Cyber-Ming-Protocol/wiki/%E6%9C%AF%E8%AF%AD%E8%A1%A8)

## 常见澄清

### Skill 是不是协议本体？

不是。
协议是第一层，Skill 是强化器、加速器、稳定触发器。你可以先学协议，再决定是否安装 Skill。

### Web 审计模板是不是也要安装？

不是。
`web-audit-templates/` 是 Web 侧协作模板，不是本地 Skill。它们用于辅助审计，不属于 IDE-side 的安装物。

### 我一定要用“帝王 coding”这层叙事吗？

不一定。
这层叙事的作用是执行燃料，不是唯一皮肤。真正不可替代的是角色分离、证据闭环、主权居中这些协议骨架。

### 这套协议依赖固定模型组合吗？

不依赖。
它是治理层，不是某个模型厂商的专属 prompt。不同人可以用不同 IDE、不同 Web 模型、不同角色皮肤，但底层结构应保持一致。

## 结语

浅水区的问题，正在被 AI 与脚手架快速消解。
Cyber-Ming-Protocol 要接管的，不是这些已经很便宜的战场，而是那些一旦失控，代价就远高于表面效率收益的深水区任务。

> 代码即疆域，主权不可外包。
> 在深水区，真正的效率从来不是“放手不管”，而是“始终能管”。

# OnlineTool.me 新计算器页面标准

本规范适用于以后新增或大幅重构的所有计算器。目标不是只让页面“能计算”，而是同时满足搜索需求、计算可信度和顺畅的用户体验。

## 一、上线前必须明确的输入信息

开发前先记录以下内容；缺少关键内容时不要直接编写页面：

- 工具名称和 URL slug。工具页继续使用根路径，不把分类写入 URL。
- 一个 Primary Keyword，以及真正相关的 Secondary Keywords。
- 用户搜索这个关键词时最想完成的任务。
- 目标用户、输入参数、输出结果和计量单位。
- 公式、计算规则、舍入方式和至少三个可人工核对的示例。
- 空值、零、负数、最大值、超范围值等边界条件。
- 固定常量、可调整参数，以及哪些参数应放入 Advanced Settings。
- 数据来源、适用年份或版本、更新时间和更新责任人。
- 所属顶级分类，例如 `calculators`、`sports` 或 `converters`；计算器还应注明 `education`、`games`、`engineering`、`everyday` 或 `finance` 子分类。

如果计算依赖每年变化的分数线、税率、官方费率、考试结构或游戏版本，必须先确认当前数据。没有可靠数据时，应明确标记为 `demo` / `planning estimate`，不得暗示结果是 current、official 或 guaranteed。

## 二、SEO 标准

### 1. URL 与搜索意图

- 工具页使用简短的小写 kebab-case 根路径，例如 `/grade-calculator/`；不使用 `/education/grade-calculator/` 等分类目录。
- URL 应包含 Primary Keyword，发布后尽量不要修改。
- 一个页面只承接一个主要搜索意图；不要把几个无关计算器硬塞进同一页面。
- 在开发前检查搜索结果页，确认用户需要的是计算器、查询器、转换器还是说明文章。

### 2. Markdown Frontmatter

每个工具必须在 `src/content/tools/{slug}.md` 提供以下字段：

```yaml
---
seoTitle: "Primary Keyword - Main Benefit | OnlineTool.me"
title: "Human-readable Calculator Name"
description: "120–160 character meta description with the primary keyword, a concrete benefit, and an action verb."
intro: "A short, unique explanation shown under the H1. Do not reuse the meta description verbatim."
keywords: "primary keyword, closely related secondary keyword"
category: "calculators"
subcategory: "education"
icon: "Calculator"
featured: false
features:
  - "Concrete capability"
useCases:
  - title: "Real user scenario"
    description: "How the calculator helps in that scenario."
calculationDetails:
  formula: "Result = input × factor"
  steps:
    - "Explain the calculation in plain English."
  rounding: "Round the displayed result to two decimal places."
  sources:
    - name: "Authoritative source title"
      url: "https://example.com/source"
      publisher: "Source organization"
      accessedDate: "YYYY-MM-DD"
  version: "Applicable edition, season, or data version"
  applicableDate: "Applicable period when relevant"
  lastVerified: "YYYY-MM-DD"
  updateResponsibility: "OnlineTool.me"
  resultLabel: "Exact calculation"
  assumptions:
    - "A meaningful default assumption."
  example:
    inputs: "The complete example inputs."
    calculation: "The arithmetic or lookup steps."
    result: "The verified expected result."
limitations:
  - "A meaningful assumption, exclusion, or boundary."
relatedTools:
  - "relevant-tool-slug"
howToUse:
  - step: 1
    title: "Enter the Required Values"
    description: "Explain the input and unit."
  - step: 2
    title: "Review the Live Result"
    description: "The result updates automatically as inputs change."
faq:
  - question: "A genuine long-tail user question?"
    answer: "A direct, accurate answer."
---
```

`keywords` 用于编辑和选题管理，不应为了该字段在正文中机械重复关键词。

### 3. Title、Description、H1 与 Intro

- `seoTitle` 和页面 `title` 必须分离。
- `seoTitle` 尽量不超过 60 个英文字符，Primary Keyword 靠前，每页唯一。
- `description` 控制在 120–160 个英文字符，包含 Primary Keyword、实际功能和自然的行动词。
- `title` 用作唯一 H1，应自然、清晰，不强行添加 `Free Online` 等重复修饰词。
- `intro` 是页面可见副标题，使用“输入什么，得到什么”的自然句式；不要机械加入箭头等分隔符，也不能复制 Meta Description。
- Primary Keyword 应自然出现在 SEO Title、H1、Description、首段和至少一个相关 H2 中，但不得追求机械密度。

### 4. 页面内容

页面顺序保持为：

1. 面包屑、H1 和 Intro。
2. 可直接使用的计算器。
3. 数据状态或来源摘要（适用时）。
4. `How to Use {Calculator}`，作为工具之后的第一个正文区块。
5. Features。
6. Use Cases。
7. Limits and Important Notes，包括计算方法、公式、来源、版本、假设、舍入规则和已验证示例。
8. Related Tools。
9. FAQ。

工具页不再设置固定的 `What Is` 区块。必要的定义或概念区别应精简后放入 Intro、How to Use、Limits 或 FAQ，不能为了补充篇幅恢复通用介绍段落。

内容长度服从主题复杂度，不为了达到词数填充空话。正文必须覆盖：

- 用户需要输入什么、能够得到什么。
- 输入和输出分别代表什么。
- 公式或核心规则。
- 一个可人工复算的完整示例。
- 假设、边界、排除项和可能造成差异的规则。
- 数据年份、版本和非官方声明（如适用）。
- 用户真正会搜索的 FAQ，而不是改写标题凑数量。

### 5. 内链、Canonical 和结构化数据

- Canonical 必须是 `https://onlinetool.me/{slug}/`，不使用 `www`，并与实际页面一致。
- 添加 2–4 个真正相关的工具内链，锚文本使用工具名称或具体用途，禁止 `click here`。
- 工具必须进入统一注册表或 `src/pages/[slug].astro` 的组件映射，并进入正确分类；重要工具再进入首页推荐。
- 页面应输出 `WebApplication`、`BreadcrumbList`，存在 FAQ 时输出 `FAQPage` JSON-LD。
- 结构化数据必须与可见页面内容一致，不能声明页面没有提供的功能。
- 默认 OG Image 可以共用；只有重点页面或确有分享价值时才制作专属图片，不以“全站必须一页一图”为上线阻塞条件。

## 三、用户体验标准

### 1. 即时反馈

- 纯数学计算应在输入完整后自动计算，不设置无意义的 `Calculate` 按钮。
- 输入框、下拉框、高级参数变化后，结果必须立即更新。
- `Add Course`、`Add Item`、`Save Score`、`Generate`、`Upload`、`Start Timer` 等会创建、保存、随机生成或启动过程的按钮应保留。
- 不使用浏览器 `prompt()` 或 `alert()` 完成主要输入流程；使用页面内字段、对话框或明确的内联提示。

判断方法：如果用户只是修改一个数值来比较情景，通常应该实时更新；如果操作会新增记录、产生随机结果、消耗文件或启动流程，则按钮通常有意义。

### 2. 结果区域与状态

结果区域从页面打开时就必须可见，并预留稳定高度，避免点击或输入后页面突然跳动。

至少处理四种状态：

1. **Initial / Incomplete**：中性占位文字，例如 `Your result will appear here`，不能一打开就报错。
2. **Valid**：突出主要结果，同时展示必要的单位、组成明细、采用的参数和舍入方式。
3. **Invalid**：只有在用户已经输入但数值无效时显示具体错误，说明哪个范围或规则不满足。
4. **Exceptional**：对不可达目标、除数为零、超过正常范围或结果不具现实可行性的情况给出解释。

结果变化应通过 `aria-live="polite"` 被辅助技术感知。不要只依赖颜色表达成功、警告或差异。

### 3. 输入设计

- 每个字段都有永久可见的 label，不能只依赖 placeholder。
- label 中明确单位，例如 `%`、`days`、`credits`、`points`、`USD`。
- 数字输入设置合理的 `min`、`max`、`step` 和 `inputmode`。
- 未填写与数值 `0` 必须被程序区分；零在公式允许时应正常计算。
- 固定总分、固定权重等不可编辑参数使用纯文本或明确的只读样式。
- 非核心可调参数放入 Advanced Settings，并在主界面展示当前采用的值或摘要。
- 允许动态增加的行必须支持删除；删到最后一行时保留或重新创建一个空行。
- 不悄悄修正用户输入。发生归一化、截断或取整时，应在结果旁说明。

### 4. 结果表达与信任

- 首先展示用户最关心的主结果，再展示计算明细。
- 说明结果使用的公式、权重、cutoff、单位和必要假设；完整来源与版本信息统一收纳在 `Limits and Important Notes`。
- 显示合理的小数位，避免伪精确；文案示例和程序必须采用相同的舍入规则。
- 外部变化数据必须显示适用年份或版本，并提供权威来源链接。
- 不能把用户输入但实际未参与计算的字段伪装成有效参数。
- 若工具只是演示，应在输入区和结果区附近直接说明，不能只藏在长文末尾。

### 5. 移动端、可访问性与视觉稳定

- 从 320px 宽度开始检查，表格应可横向滚动或改为卡片布局。
- 触控按钮有足够尺寸和间距；输入焦点状态清晰。
- 所有按钮设置正确的 `type="button"`，图标按钮带 `aria-label`。
- Tab 键可以按视觉顺序完成输入和操作。
- 深色模式下的文字、边框、警告和禁用状态必须可读。
- 结果出现、错误出现和高级面板展开时，不应造成大幅布局跳动。

## 四、计算准确性与代码质量

- 先写出公式和测试数据，再编写 UI。
- 至少验证：一个正常案例、一个最小边界、一个无效案例；复杂公式还要验证公开示例。
- 不允许只凭印象编写会变化的考试规则、金融费率、税率或游戏数据。
- 相同系列的计算器优先共用组件和配置，例如 AP 系列，避免复制后规则漂移。
- 事件初始化应防止重复绑定；页面 JavaScript 保持最小化，不为简单计算器引入大型依赖。
- 页面正文必须静态或服务端直出，不能依赖客户端 JavaScript 才出现 SEO 主要内容。
- 不重复加载 Analytics，不加入没有实际使用的依赖。
- 对用户生成的文本使用安全 DOM API 或转义，禁止直接把未处理输入插入 `innerHTML`。

## 五、新计算器实施流程

1. **需求与关键词**：确认 Primary Keyword、Secondary Keywords、搜索意图和竞品功能。
2. **计算规格**：使用 `CalculatorSpecification` 记录模板类型、输入、输出、公式、单位、常量、舍入、验证、数据版本、来源和边界案例。
3. **内容文件**：创建完整 Markdown frontmatter，先写真实、独特、可验证的文案。
4. **交互组件**：在 `src/components/tools/` 创建组件，默认实现实时反馈和固定结果区。
5. **页面接入**：在 `src/data/toolRegistry.ts` 注册组件、模板类型和适当的 application category；页面不得重新维护第二份 slug 映射。
6. **站内发现**：加入正确的 calculator subcategory、相关工具内链，并按重要性决定是否进入首页。
7. **技术验证**：运行 `npm run build`，不得有类型错误、缺失页面或重复 slug。
8. **浏览器验收**：实际打开页面，分别验证桌面和移动宽度、初始状态、正常输入、动态修改、无效输入和边界输入。
9. **SEO 验收**：检查最终 HTML 中的 Title、Description、Canonical、H1、正文、JSON-LD 和内链，而不只检查源文件。
10. **上线记录**：记录数据来源、测试值、适用版本以及将来何时需要复查。

## 六、Definition of Done

只有以下项目全部满足，计算器才算完成：

### SEO

- [ ] URL 简短、稳定并包含 Primary Keyword。
- [ ] `seoTitle`、H1、Meta Description 和 Intro 各司其职且内容唯一。
- [ ] Primary Keyword 使用自然，没有堆砌。
- [ ] How to Use、公式、示例、Features、Use Cases、Limitations 和 FAQ 内容完整，没有通用的 What Is 填充段落。
- [ ] 至少两个相关且描述明确的站内链接。
- [ ] Canonical、OG、WebApplication、Breadcrumb 和 FAQ 数据正确。
- [ ] 最终 HTML 可以直接抓取主要正文。

### 用户体验

- [ ] 纯计算无需点击按钮即可更新。
- [ ] 结果区初始可见并保持稳定高度。
- [ ] 未完成输入不会误报错误，无效输入会给出具体提示。
- [ ] 固定参数与可编辑参数在视觉上没有混淆。
- [ ] 公式、单位、权重、cutoff 或关键假设在结果附近可见。
- [ ] 移动端、键盘操作、深色模式和辅助技术状态正常。
- [ ] 不使用 `prompt()` / `alert()` 承担主要流程。

### 准确性与工程质量

- [ ] 正常、边界、无效案例均已人工核对。
- [ ] 时间敏感数据包含来源、年份或版本，不冒充官方实时结果。
- [ ] Markdown 文案、UI 标签、示例与实际算法一致。
- [ ] 工具已加入集中注册表，且注册表完整性测试通过。
- [ ] `npm run build` 成功。
- [ ] 至少完成一次真实浏览器交互验收，并记录测试输入和预期输出。
- [ ] 没有无用依赖、重复脚本或明显控制台错误。

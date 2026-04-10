# 项目接手说明（给迁移到 WSL2 后的 Codex）

## 0. 先读这份说明

这个项目已经不是最初的 demo 了，而是一个正在持续手工精修的前端桌面工作台。

你的任务不是“重新设计一套系统”，而是：

1. 在现有代码基础上继续开发。
2. 保持当前架构不推倒重来。
3. 继续做“左侧统一表单 + 右侧固定模板预览”的页面。
4. 后续工作以**逐页对齐标准模板**、**逐页修正字段映射**为主。

这份文档的目标是让你在 WSL2 中 clone 项目后，能快速知道这个项目在干什么、哪些地方已经做了、哪些地方不要乱改。

---

## 1. 迁移到 WSL2 的建议

### 结论

使用 `git clone` 把项目迁移到 WSL2 中继续开发，这个方案是**可行且推荐的**。

原因：

- 这个项目主体是 React + Vite + Ant Design，源码开发对平台基本无关。
- 在 WSL2 里，Codex 读文件、批量检索、分析代码的效率通常会比 Windows 控制台环境更好。
- 用 `git clone` 而不是跨文件系统直接复制，可以避免编码、权限、换行、隐藏文件、node_modules 污染等问题。

### 但有一个重要例外

项目已经接入了 **Tauri**。

如果你的目标是**继续改前端源码**，WSL2 没问题。  
如果你的目标是**打包 Windows `.exe` 安装包**，建议仍然在 **Windows 宿主机** 上执行：

```bash
npm run tauri:build
```

原因：

- WSL2 默认是 Linux 环境。
- Tauri 在 WSL2 中更自然地构建 Linux 目标，而不是 Windows 安装包。
- 当前项目已经在 Windows 上验证过可以产出 `.exe`，所以“源码在 WSL2 开发，最终 Windows 宿主机打包”是最稳妥的流程。

### 推荐工作流

1. 在 WSL2 中 `git clone` 项目
2. 在 WSL2 中继续：
   - 读代码
   - 改 React / CSS / schema / 模板
   - 跑 `npm run dev`
   - 跑 `npm run lint`
   - 跑 `npm run build`
3. 需要 Windows 安装包时：
   - 把改动提交到 git
   - 回到 Windows clone
   - 拉取最新代码
   - 执行 `npm run tauri:build`

---

## 2. 项目是什么

这是一个 **计算机学院党建材料教程**。

当前交互模式固定为：

- 左侧：一个统一的大表单
- 右侧：多个固定的 A4 模板预览

它不是富文本编辑器，不是 Word 解析器，也不是动态模板设计器。

右侧的模板都是**人工用 JSX + HTML + CSS 重构出来的固定页面**，目的是尽量贴近真实纸质模板。

---

## 3. 当前核心产品形态

### 左侧

- 左侧是一个由 `formSchema` 驱动的统一表单
- 所有字段都来自同一个 schema
- 字段很多，已经不是 demo 数量
- 支持搜索
- 支持分组折叠
- 支持字段级校验
- 支持 list 类型字段
- 点击右侧字段后，左侧可联动定位

### 右侧

- 右侧是固定 A4 页面预览
- 多模板切换
- 支持缩放
- 每个模板都是手写 JSX 结构
- 模板中的动态值通过统一的字段锚点组件绑定

### 顶部

- 模板切换：现在用 Ant Design `Select`
- 缩放：现在用滑条
- 校验按钮
- 重置按钮
- 辅助说明按钮

### 当前主题

- 已经从偏蓝色改成偏红色
- 不要再把主题改回蓝色系

---

## 4. 技术栈

- React
- Vite
- Ant Design
- Zustand
- Tauri（已接入）

代码使用 JavaScript，不是 TypeScript。

---

## 5. 目录结构

```text
src/
  main.jsx
  App.jsx
  styles.css
  components/
    form/
      SchemaForm.jsx
      FormFieldRenderer.jsx
    preview/
      TemplatePreview.jsx
      TemplateToolbar.jsx
    shared/
      A4Page.jsx
      FieldAnchorText.jsx
  data/
    formSchema.js
    fieldValidators.js
    templates.js
  store/
    useFormStore.js
  templates/
    TalkTable.jsx
    ActivistTable.jsx
    ProbationaryTable.jsx
    WishTable.jsx

src-tauri/
  tauri.conf.json
  Cargo.toml
  src/
    main.rs
    lib.rs
```

---

## 6. 重要文件分别负责什么

### `src/data/formSchema.js`

这是左侧表单的**唯一真实来源**。

注意：

- 现在是**单表单 schema**
- 不是“每个模板一个 schema”
- `fields` 是按 group 分组的对象结构，不是旧版扁平数组
- 不要再改回“每个模板独立 schema”

普通字段结构大致是：

```js
{
  id,
  label,
  fieldType,
  defaultValue,
  placeholder,
  description,
}
```

已支持字段类型：

- `input`
- `textarea`
- `select`
- `radio`
- `list`

补充说明：

- `select` 和 `radio` 的 `options` 是字符串数组，不是 `{ label, value }`
- 少量字段可能带：
  - `validation`
  - `errorMessage`
- `rules` 是跨字段校验
- `validation` 是字段自身校验

### `src/data/fieldValidators.js`

这里放共用校验函数。

已支持示例：

- 中文年月日格式
- 中文年月格式
- 手机号
- 邮箱
- 身份证号

### `src/store/useFormStore.js`

这里是 Zustand 状态中心，负责：

- `formSchema`
- `formData`
- `activeTemplateId`
- `selectedFieldId`
- `selectedFieldSource`
- `validationErrors`
- `zoom`

### `src/data/templates.js`

这里放模板元数据：

- 模板 id
- 模板名称
- 页数
- 字段注册表

注意：

- 它不是字段真值来源
- 字段真值仍然是 `formSchema.js`
- `templates.js` 中的 field id 注册主要用于模板匹配、导航提示
- 这里**可能还残留少量旧字段 id**，不要盲信，必要时按模板 JSX 和 `formSchema.js` 重新核对

### `src/components/shared/FieldAnchorText.jsx`

右侧模板里所有动态字段都应该尽量用这个组件。

它负责：

- 显示值
- 标记 `data-field-id`
- 点击后联动左侧表单
- 高亮选中态

### `src/templates/*.jsx`

这里是 4 个固定模板文件。

它们不是“页面路由页”，而是“固定文档页集合”。

---

## 7. 当前模板列表

### 1. `TalkTable.jsx`

对应：**入党申请人登记暨谈话表**

### 2. `ActivistTable.jsx`

对应：**入党培养考察记录册**

### 3. `ProbationaryTable.jsx`

对应：**预备党员培养考察记录册**

### 4. `WishTable.jsx`

对应：**入党志愿书**

---

## 8. 模板开发原则

### 总原则

当前项目不是在做“动态模板系统”，而是在做：

> 固定模板的高还原度前端重构

因此请坚持：

- 优先还原纸质表格结构
- 优先还原位置、边框、行高、签字区、竖排标题
- 不要为了“组件化好看”而把页面抽象得看不懂

### 布局原则

模板主体布局以：

- `table`
- `flex`

为主。

不要轻易把这些模板整体改成：

- Ant Design `Row/Col`
- 大面积 CSS Grid 页面骨架

原因：

- 这些页面本质上是固定纸质表格
- `table` 更容易控制线框、跨行、跨列、签字线和固定版心

### 字段绑定原则

右侧模板取值时，必须用 `formSchema` 的真实字段 id。

例如：

```jsx
<FieldAnchorText fieldId="basic.姓名" value={formData['basic.姓名']} />
```

不要写：

```jsx
formData.name
formData.basic.name
```

因为当前 `formData` 的 key 就是 `field.id` 原字符串。

### 手写区原则

有一些位置虽然模板里看起来像字段，但实际上业务上要求手写，不要绑定表单字段。

典型例子：

- 书记签字
- 党支部书记签字
- 政审人签名
- 党委（盖章）

这些地方如果已有明确要求是手写，就保持纯下划线，不绑定 `FieldAnchorText`。

---

## 9. 当前已经完成到什么程度

### `TalkTable.jsx`

已经逐页收过，至少前 3 页已经做过针对性修正：

- 第 1 页封面
- 第 2 页登记表
- 第 3 页谈话记录

字段映射已按 `formSchema` 重做过，不再是最初 demo 的旧字段名。

### `ActivistTable.jsx`

这是当前最近集中修改最多的模板。

已经完成的重要事项：

1. 页顺序已经改成真实页顺序。
2. 页面函数名已经按真实页号重命名。
3. 第 1 页封面已调整并接字段。
4. 第 2 页填写说明已改成静态说明页。
5. 第 3 页基本情况表已经重做，并接了真实字段。
6. 第 5 页、第 7 页季度页已做字段接入与布局修正。
7. 第 6 页、第 8 页支部意见页已接字段，并保留书记签字为手写。
8. 第 9 页群众意见页已接日期字段。
9. 第 10 页支委会（党员大会）意见已纠正到 `candidate.*` 字段。
10. 第 11 页副书记/党委备案页已接日期字段。
11. 第 12 页教育培训与政审页已经重构成单表格，不是 table 套 table。
12. 第 13 页公示/审查/预审页已接字段，并做了备注编号区域。

注意：

- `ActivistTable.jsx` 当前是项目里最需要继续逐页精修的模板
- 改这个文件时不要乱动页顺序
- 如果改页码命名，要保持函数名与实际页号一致

### `ProbationaryTable.jsx`

已经有基础结构和一轮映射，但后续大概率还需要逐页对齐。

### `WishTable.jsx`

已经有基础结构和一轮映射，但后续也大概率还要逐页细修。

---

## 10. 现在的主要开发任务类型

这个项目后续最常见的任务，不是“新建功能”，而是以下三类：

### A. 逐页视觉对齐

用户会提供：

1. 标准模板截图
2. 当前前端实现截图

你要做的是：

- 调整对应模板页的版式
- 尽量让前端页面贴近标准模板

### B. 逐页字段对应

用户会指出某一页需要对字段。

你要做的是：

- 以 `src/data/formSchema.js` 为唯一真值
- 把模板中每个动态字段对应到真实 `field.id`
- 不确定就按语义理解
- 实在无法判断时再问用户

### C. 热区修正

这个项目里用户经常要求：

- 点击区域铺满 `td`
- 但要保留 padding
- 不能只包住左上角一小块文字

所以当你处理表格中的字段热区时，优先考虑：

- `td { position: relative; }`
- 字段锚点绝对定位填满内容区
- `inset` 控制 padding

---

## 11. WSL2 中接手时，建议优先检查这些文件

如果你是一个新接手的 Codex，请按这个顺序建立上下文：

1. `README.md`
2. `src/data/formSchema.js`
3. `src/data/templates.js`
4. `src/store/useFormStore.js`
5. `src/components/shared/FieldAnchorText.jsx`
6. `src/components/preview/TemplatePreview.jsx`
7. `src/templates/TalkTable.jsx`
8. `src/templates/ActivistTable.jsx`
9. `src/templates/ProbationaryTable.jsx`
10. `src/templates/WishTable.jsx`
11. `src/styles.css`

这样最快。

---

## 12. 开发时的硬约束

### 1. 所有文本文件按 UTF-8 处理

之前在 Windows 控制台读取中文时出现过乱码。  
后续务必按 UTF-8 读取和写入。

### 2. 不要重新设计 schema 结构

当前 schema 结构已经是用户认可的版本。

不要再改回：

- 多模板 schema
- 每个字段单独 `group`
- 自动推断型 schema 生成器

### 3. 不要把模板重新抽象成复杂引擎

模板目前就是手写页面。  
不要再试图把它变成“通用表格配置系统”。

### 4. 视觉调整优先少量精修

用户会逐页给图。  
你的工作是**小步精修**，不是一次性重做整本模板。

### 5. 手写区域不要过度绑定

用户多次明确要求某些签字/盖章位置保持手写。

---

## 13. 当前运行命令

### 前端开发

```bash
npm install
npm run dev
```

### 代码检查

```bash
npm run lint
```

### 前端构建

```bash
npm run build
```

### Tauri 开发

```bash
npm run tauri:dev
```

### Tauri 打包

```bash
npm run tauri:build
```

当前已经验证过：

- `npm run lint` 可通过
- `npm run build` 可通过
- `npm run tauri:build` 在 Windows 环境可成功产出 `.exe` 安装包

---

## 14. Tauri 当前状态

项目已经接入 Tauri。

关键配置文件：

- `src-tauri/tauri.conf.json`
- `src-tauri/Cargo.toml`

当前打包目标：

- Windows NSIS 安装包

Windows 下已经验证可以生成：

- 裸 exe
- NSIS 安装器 exe

再次强调：

- **WSL2 适合继续开发源码**
- **Windows 宿主机更适合最终打包 Windows 安装包**

---

## 15. 如果你接下来要继续做事，优先遵循这个节奏

### 当用户给你某一页标准模板图时

1. 先确认是哪个模板、哪一页
2. 只改对应模板文件和必要样式
3. 优先修视觉版式
4. 再核对字段映射
5. 最后跑：
   - `npm run lint`
   - `npm run build`

### 当用户说“某页字段不对”时

1. 以 `formSchema.js` 为准
2. 重新对应 `fieldId`
3. 不要盲信 `templates.js` 里的 field registry
4. 不要猜旧 demo 字段名

### 当用户说“可点击区域太小”时

优先检查：

- 字段组件是不是只包住文字
- `td` 是否缺少 `position: relative`
- 热区是否只横向铺满但没有纵向铺满
- 是否缺少 padding inset

---

## 16. 一句话总结

这是一个：

> 用 React + Ant Design + Zustand + Tauri 实现的、面向党建材料的“单大表单 + 多固定 A4 模板预览”工作台。

后续开发重点不是新功能堆砌，而是：

> 按用户给的真实模板截图，逐页精修 JSX/CSS，并把模板字段准确对应到 `formSchema.js`。

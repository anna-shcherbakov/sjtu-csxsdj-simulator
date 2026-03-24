请为我生成一个可以直接运行的 React + Vite + Ant Design 单页 demo 项目，使用 JavaScript，不要 TypeScript。

项目目标：
- 做一个单页面应用。
- 左侧是根据 schema 动态渲染的表单。
- 右侧是 A4 纸风格的文档预览区，支持多页显示、页与页之间有间隔、支持缩放。
- 模板不是动态上传的，而是固定的 HTML 模板，并且这些模板是人工从 Word 重构出来的。
- demo 只需要做 2 个固定模板进行切换。
- 表单字段以 input、textarea 为主，render 大部分为空。
- 字段总量未来会到 200+，但 demo 里只需要 12~20 个字段，并且按 group 分组展示。
- 几乎没有复杂联动，不需要做复杂表达式引擎。
- 需要有基本校验按钮，支持 required 校验。
- 点击右侧模板中的绑定值时，左侧对应表单项要高亮并自动滚动到可见区域。
- 点击左侧表单项时，右侧所有对应引用位置高亮。
- 整体 UI 用 Ant Design 组件实现，风格简洁、工程化，不要花哨。

请按下面要求生成代码：

一、技术要求
1. 使用 React + Vite + Ant Design。
2. 代码按模块拆分，不要把所有代码堆到一个文件里。
3. 使用函数组件和 hooks。
4. 用 Zustand 管理共享状态：
   - formSchema
   - formData
   - activeTemplateId
   - selectedFieldId
   - validationErrors
   - zoom
5. 不要引入复杂富文本编辑器，不要引入后端，不要做文件上传。
6. 不要做真正的 Word 解析，只做固定 HTML 模板预览。

二、请生成的目录结构
希望至少包含这些文件：

src/
  main.jsx
  App.jsx
  styles.css
  data/
    formSchema.js
    templates.js
  store/
    useFormStore.js
  components/
    SchemaForm.jsx
    FormFieldRenderer.jsx
    TemplatePreview.jsx
    TemplateToolbar.jsx
    A4Page.jsx
    FieldAnchorText.jsx

三、schema 数据结构要求
请定义一个 demo schema，格式类似：

{
  fields: [
    {
      id: 'customerName',
      label: '客户名称',
      fieldType: 'input',
      defaultValue: '',
      group: '基础信息',
      placeholder: '请输入客户名称'
    }
  ],
  rules: [
    {
      field: 'customerName',
      type: 'required',
      message: '客户名称必填'
    }
  ]
}

要求：
- demo 字段 12~20 个
- 至少分成 3 个 group，比如：
  - 基础信息
  - 申请信息
  - 备注信息
- 字段类型主要是 input 和 textarea，可少量带 select
- render 字段可以留空或不提供

四、表单要求
1. 左侧表单使用 Ant Design Form 风格来呈现，但数据源以 schema 驱动。
2. 支持按 group 分区展示，建议用 Collapse。
3. 每个字段都要有唯一 DOM 标记，便于滚动定位。
4. 提供“校验”按钮：
   - 只做 required 校验
   - 校验失败时在左侧显示错误
5. 提供“重置”按钮，恢复默认值。
6. 左侧顶部有字段搜索框，可以按 label 过滤字段。

五、右侧模板预览要求
1. 右侧是固定文档预览区，背景灰色。
2. 预览区中每页是 A4 风格白纸：
   - 有阴影
   - 页面之间有明显间距
   - 支持缩放，缩放比例至少有 75%、100%、125%、150%
3. 提供模板切换：
   - 模板 A：申请表
   - 模板 B：说明页
4. 每个模板都拆成固定 HTML 结构，不要动态拼接整段 HTML 字符串。
5. 每个模板至少 2 页，模拟 Word 文档分页效果。
6. 右侧只是预览，不是富文本编辑器。

六、字段绑定要求
1. 模板中的绑定值必须使用统一组件封装，例如 FieldAnchorText。
2. FieldAnchorText 接收：
   - fieldId
   - value
   - className
3. 渲染时输出类似：
   <span data-field-id="customerName">xxx</span>
4. 点击右侧这个 span 时：
   - 更新 selectedFieldId
   - 左侧对应字段高亮
   - 左侧自动滚动到该字段
5. 点击左侧字段容器时：
   - 更新 selectedFieldId
   - 右侧所有同 fieldId 的绑定值高亮

七、模板内容要求
请做两个固定模板：

模板 A：申请表
- 展示客户名称、联系人、联系电话、申请编号、申请日期、申请事项、详细说明、备注等
- 用表格/grid 风格布局，模拟填表式 Word 模板

模板 B：说明页
- 展示客户名称、公司地址、证件号码、经办人、摘要说明、补充备注等
- 也做成 A4 文档风格
- 至少两页

八、交互要求
1. 页面整体左右布局：
   - 左侧表单区固定宽度，比如 420px
   - 右侧文档预览区自适应
2. 顶部工具栏包含：
   - 模板切换
   - 缩放切换
   - 校验按钮
   - 重置按钮
3. 当 selectedFieldId 变化时：
   - 左侧字段项高亮
   - 右侧所有绑定点高亮
4. 代码里写清楚注释，让后续方便扩展到 200+ 字段和 4~5 个模板。

九、样式要求
1. 使用 CSS 文件，不要 CSS-in-JS。
2. 风格偏企业后台。
3. A4 页面尽量模拟真实纸张效果：
   - 白底
   - 阴影
   - 固定宽高比例
   - 页间距
4. 高亮态要清楚但不要刺眼。

十、输出要求
1. 直接输出完整项目代码。
2. 每个文件分别给出代码。
3. 保证复制后可以直接 npm install && npm run dev 启动。
4. 最后补充一段“项目说明”，说明：
   - 如何运行
   - 目录结构
   - 如何扩展字段
   - 如何新增模板
   - 如何接入更复杂校验

补充要求：
- 不要只做静态展示，必须有真实的双向数据流。
- 表单初始值需要从 schema.defaultValue 自动生成。
- 模板中的字段值要实时跟随表单输入变化。
- 代码要避免过度封装，但也不要写成 demo 垃圾代码。
- 优先保证结构清晰、命名清晰、方便后续扩展。
- 对于 A4 预览，不要追求打印级精确分页，只需固定页面容器模拟 Word 文档视觉效果。
- 模板布局请优先使用 CSS Grid 和 table 风格区域。
- 只做 required 校验，不要加入复杂规则引擎。
- 不要生成后端代码、测试代码、Docker 文件。
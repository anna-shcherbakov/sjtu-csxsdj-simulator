// 只读参考文件，不给运行时代码引用。
// 目的：把 formSchema 里所有“涉及时间”的字段静态列出来，方便后续写 rules 时直接查。

export const formSchemaTimeFieldsReference = {
  fields: {
    '基本信息表格': [
      {
        id: 'basic.出生日期',
        label: '出生日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'basic.出生年月',
        label: '出生年月',
        format: 'yyyy年m月',
        validator: 'validateChineseYearMonthInput',
        note: null,
      },
      {
        id: 'basic.入团年月',
        label: '入团年月',
        format: 'yyyy年m月',
        validator: 'validateChineseYearMonthInput',
        note: null,
      }
    ],
    '入党申请书提交': [
      {
        id: 'submit.入党申请书落款日期',
        label: '入党申请书落款日期',
        format: 'yyyy-mm-dd',
        validator: 'validateDateInput',
        note: '字段文案更像 yyyy年m月d日，但当前 validation 是 validateDateInput',
      }
    ],
    '谈话表格': [
      {
        id: 'talk.申请人谈话日期',
        label: '申请人谈话日期',
        format: 'yyyy-mm-dd',
        validator: 'validateDateInput',
        note: '字段文案更像 yyyy年m月d日，但当前 validation 是 validateDateInput',
      }
    ],
    '确定积极分子表格': [
      {
        id: 'acknowledge.团推优日期',
        label: '团推优日期',
        format: 'yyyy-mm-dd',
        validator: 'validateDateInput',
        note: '字段文案更像 yyyy年m月d日，但当前 validation 是 validateDateInput',
      },
      {
        id: 'acknowledge.确定积极分子日期',
        label: '确定积极分子日期',
        format: 'yyyy-mm-dd',
        validator: 'validateDateInput',
        note: '字段文案更像 yyyy年m月d日，但当前 validation 是 validateDateInput',
      },
      {
        id: 'activist.入党联系人1入党时间（预备时间）',
        label: '入党联系人1入党时间（预备时间）',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'activist.入党联系人1转正时间',
        label: '入党联系人1转正时间',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'activist.入党联系人2入党时间（预备时间）',
        label: '入党联系人2入党时间（预备时间）',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'activist.入党联系人2转正时间',
        label: '入党联系人2转正时间',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'activist.积极分子党委备案日期',
        label: '积极分子党委备案日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      }
    ],
    '积极分子培养过程第一季度': [
      {
        id: 'season1_1.电子版（一）落款日期',
        label: '电子版（一）落款日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'season1_1.电子版（一）所在季度起始月份',
        label: '电子版（一）所在季度起始月份',
        format: 'yyyy年m月',
        validator: 'validateChineseYearMonthInput',
        note: null,
      },
      {
        id: 'season1_1.电子版（一）所在季度截止月份',
        label: '电子版（一）所在季度截止月份',
        format: 'yyyy年m月',
        validator: 'validateChineseYearMonthInput',
        note: null,
      },
      {
        id: 'season1_1.联系人意见（一）落款日期',
        label: '联系人意见（一）落款日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      }
    ],
    '积极分子培养过程第二季度': [
      {
        id: 'season1_2.电子版（二）落款日期',
        label: '电子版（二）落款日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'season1_2.电子版（二）所在季度起始月份',
        label: '电子版（二）所在季度起始月份',
        format: 'yyyy年m月',
        validator: 'validateChineseYearMonthInput',
        note: null,
      },
      {
        id: 'season1_2.电子版（二）所在季度截止月份',
        label: '电子版（二）所在季度截止月份',
        format: 'yyyy年m月',
        validator: 'validateChineseYearMonthInput',
        note: null,
      },
      {
        id: 'season1_2.联系人意见（二）落款日期',
        label: '联系人意见（二）落款日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      }
    ],
    '积极分子培养过程半年': [
      {
        id: 'season1_half.党支部意见（半年）落款日期',
        label: '党支部意见（半年）落款日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      }
    ],
    '积极分子培养过程第三季度': [
      {
        id: 'season1_3.电子版（三）落款日期',
        label: '电子版（三）落款日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'season1_3.电子版（三）所在季度起始月份',
        label: '电子版（三）所在季度起始月份',
        format: 'yyyy年m月',
        validator: 'validateChineseYearMonthInput',
        note: null,
      },
      {
        id: 'season1_3.电子版（三）所在季度截止月份',
        label: '电子版（三）所在季度截止月份',
        format: 'yyyy年m月',
        validator: 'validateChineseYearMonthInput',
        note: null,
      },
      {
        id: 'season1_3.联系人意见（三）落款日期',
        label: '联系人意见（三）落款日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      }
    ],
    '积极分子培养过程第四季度': [
      {
        id: 'season1_4.电子版（四）落款日期',
        label: '电子版（四）落款日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'season1_4.电子版（四）所在季度起始月份',
        label: '电子版（四）所在季度起始月份',
        format: 'yyyy年m月',
        validator: 'validateChineseYearMonthInput',
        note: null,
      },
      {
        id: 'season1_4.电子版（四）所在季度截止月份',
        label: '电子版（四）所在季度截止月份',
        format: 'yyyy年m月',
        validator: 'validateChineseYearMonthInput',
        note: null,
      },
      {
        id: 'season1_4.联系人意见（四）落款日期',
        label: '联系人意见（四）落款日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      }
    ],
    '积极分子培养过程一年': [
      {
        id: 'season1_annual.党支部意见（一年）落款日期',
        label: '党支部意见（一年）落款日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      }
    ],
    '积极分子培养过程第五季度': [
      {
        id: 'season1_5.电子版（五）落款日期',
        label: '电子版（五）落款日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'season1_5.电子版（五）所在季度起始月份',
        label: '电子版（五）所在季度起始月份',
        format: 'yyyy年m月',
        validator: 'validateChineseYearMonthInput',
        note: null,
      },
      {
        id: 'season1_5.电子版（五）所在季度截止月份',
        label: '电子版（五）所在季度截止月份',
        format: 'yyyy年m月',
        validator: 'validateChineseYearMonthInput',
        note: null,
      },
      {
        id: 'season1_5.联系人意见（五）落款日期',
        label: '联系人意见（五）落款日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      }
    ],
    '积极分子培养过程第六季度': [
      {
        id: 'season1_6.电子版（六）落款日期',
        label: '电子版（六）落款日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'season1_6.电子版（六）所在季度起始月份',
        label: '电子版（六）所在季度起始月份',
        format: 'yyyy年m月',
        validator: 'validateChineseYearMonthInput',
        note: null,
      },
      {
        id: 'season1_6.电子版（六）所在季度截止月份',
        label: '电子版（六）所在季度截止月份',
        format: 'yyyy年m月',
        validator: 'validateChineseYearMonthInput',
        note: null,
      },
      {
        id: 'season1_6.联系人意见（六）落款日期',
        label: '联系人意见（六）落款日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      }
    ],
    '积极分子培养过程一年半': [
      {
        id: 'season1_annual_and_half.党支部意见（一年半）落款日期',
        label: '党支部意见（一年半）落款日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      }
    ],
    '积极分子培养过程第七季度': [
      {
        id: 'season1_7.电子版（七）落款日期',
        label: '电子版（七）落款日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'season1_7.电子版（七）所在季度起始月份',
        label: '电子版（七）所在季度起始月份',
        format: 'yyyy年m月',
        validator: 'validateChineseYearMonthInput',
        note: null,
      },
      {
        id: 'season1_7.电子版（七）所在季度截止月份',
        label: '电子版（七）所在季度截止月份',
        format: 'yyyy年m月',
        validator: 'validateChineseYearMonthInput',
        note: null,
      },
      {
        id: 'season1_7.联系人意见（七）落款日期',
        label: '联系人意见（七）落款日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      }
    ],
    '积极分子培养过程第八季度': [
      {
        id: 'season1_8.电子版（八）落款日期',
        label: '电子版（八）落款日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'season1_8.电子版（八）所在季度起始月份',
        label: '电子版（八）所在季度起始月份',
        format: 'yyyy年m月',
        validator: 'validateChineseYearMonthInput',
        note: null,
      },
      {
        id: 'season1_8.电子版（八）所在季度截止月份',
        label: '电子版（八）所在季度截止月份',
        format: 'yyyy年m月',
        validator: 'validateChineseYearMonthInput',
        note: null,
      },
      {
        id: 'season1_8.联系人意见（八）落款日期',
        label: '联系人意见（八）落款日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      }
    ],
    '积极分子培养过程两年': [
      {
        id: 'season1_two_year.党支部意见（两年）落款日期',
        label: '党支部意见（两年）落款日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      }
    ],
    '确定发展对象表格': [
      {
        id: 'candidate.发展对象群众座谈会日期',
        label: '发展对象群众座谈会日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'candidate.支委会日期',
        label: '支委会日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'candidate.学工副书记（负责人）意见日期',
        label: '学工副书记（负责人）意见日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'candidate.党委备案日期（确定发展对象日期）',
        label: '党委备案日期（确定发展对象日期）',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'candidate.教育培训情况-结业日期',
        label: '教育培训情况-结业日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'candidate.政治审查报告日期',
        label: '政治审查报告日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'candidate.发展对象公示起始日期',
        label: '发展对象公示起始日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'candidate.发展对象公示结束日期',
        label: '发展对象公示结束日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'candidate.党支部审查意见日期',
        label: '党支部审查意见日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'candidate.党委预审意见日期',
        label: '党委预审意见日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      }
    ],
    '预备党员接收表格': [
      {
        id: 'wish.本人经历[].开始年月',
        label: '自何年何月',
        format: 'yyyy年m月',
        validator: null,
        note: 'list 列，父字段 wish.本人经历；未挂 validation',
      },
      {
        id: 'wish.本人经历[].结束年月',
        label: '至何年何月',
        format: 'yyyy年m月',
        validator: null,
        note: 'list 列，父字段 wish.本人经历；未挂 validation',
      },
      {
        id: 'wish.配偶出生年月',
        label: '配偶出生年月',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: '字段文案更像 yyyy年m月，但当前 validation 是 validateChineseDateInput',
      },
      {
        id: 'wish.配偶参加工作时间',
        label: '配偶参加工作时间',
        format: 'unknown',
        validator: null,
        note: '未挂 validation',
      },
      {
        id: 'wish.家庭其他成员[].出生年月',
        label: '出生年月',
        format: 'yyyy年m月',
        validator: null,
        note: 'list 列，父字段 wish.家庭其他成员；未挂 validation',
      },
      {
        id: 'wish.本人签名时间（按拿到志愿书的时间即可）',
        label: '本人签名时间（按拿到志愿书的时间即可）',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'wish.入党介绍人意见落款日期',
        label: '入党介绍人意见落款日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'wish.支部大会通过预备的日期',
        label: '支部大会通过预备的日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'wish.预备党员考察期截止日期',
        label: '预备党员考察期截止日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'wish.党委审批日期',
        label: '党委审批日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      }
    ],
    '预备党员培养过程': [
      {
        id: 'probationary.入党宣誓日期',
        label: '入党宣誓日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      }
    ],
    '预备党员培养过程第一季度': [
      {
        id: 'season2_1.电子版（一）落款日期',
        label: '电子版（一）落款日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'season2_1.电子版（一）所在季度起始月份',
        label: '电子版（一）所在季度起始月份',
        format: 'yyyy年m月',
        validator: 'validateChineseYearMonthInput',
        note: null,
      },
      {
        id: 'season2_1.电子版（一）所在季度截止月份',
        label: '电子版（一）所在季度截止月份',
        format: 'yyyy年m月',
        validator: 'validateChineseYearMonthInput',
        note: null,
      },
      {
        id: 'season2_1.考察人意见（一）落款日期',
        label: '考察人意见（一）落款日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      }
    ],
    '预备党员培养过程第二季度': [
      {
        id: 'season2_2.电子版（二）落款日期',
        label: '电子版（二）落款日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'season2_2.电子版（二）所在季度起始月份',
        label: '电子版（二）所在季度起始月份',
        format: 'yyyy年m月',
        validator: 'validateChineseYearMonthInput',
        note: null,
      },
      {
        id: 'season2_2.电子版（二）所在季度截止月份',
        label: '电子版（二）所在季度截止月份',
        format: 'yyyy年m月',
        validator: 'validateChineseYearMonthInput',
        note: null,
      },
      {
        id: 'season2_2.考察人意见（二）落款日期',
        label: '考察人意见（二）落款日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      }
    ],
    '预备党员培养过程半年': [
      {
        id: 'season2_half.党支部意见（半年）落款日期',
        label: '党支部意见（半年）落款日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      }
    ],
    '预备党员培养过程第三季度': [
      {
        id: 'season2_3.电子版（三）落款日期',
        label: '电子版（三）落款日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'season2_3.电子版（三）所在季度起始月份',
        label: '电子版（三）所在季度起始月份',
        format: 'yyyy年m月',
        validator: 'validateChineseYearMonthInput',
        note: null,
      },
      {
        id: 'season2_3.电子版（三）所在季度截止月份',
        label: '电子版（三）所在季度截止月份',
        format: 'yyyy年m月',
        validator: 'validateChineseYearMonthInput',
        note: null,
      },
      {
        id: 'season2_3.考察人意见（三）落款日期',
        label: '考察人意见（三）落款日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      }
    ],
    '预备党员培养过程第四季度': [
      {
        id: 'season2_4.电子版（四）落款日期',
        label: '电子版（四）落款日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'season2_4.电子版（四）所在季度起始月份',
        label: '电子版（四）所在季度起始月份',
        format: 'yyyy年m月',
        validator: 'validateChineseYearMonthInput',
        note: null,
      },
      {
        id: 'season2_4.电子版（四）所在季度截止月份',
        label: '电子版（四）所在季度截止月份',
        format: 'yyyy年m月',
        validator: 'validateChineseYearMonthInput',
        note: null,
      },
      {
        id: 'season2_4.考察人意见（四）落款日期',
        label: '考察人意见（四）落款日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      }
    ],
    '预备党员转正': [
      {
        id: 'formal.转正申请书日期',
        label: '转正申请书日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'formal.群众座谈会日期',
        label: '群众座谈会日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'formal.预备党员转正公示起始日期',
        label: '预备党员转正公示起始日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'formal.预备党员转正公示结束日期',
        label: '预备党员转正公示结束日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'formal.预备党员转正前党支部审查意见落款日期',
        label: '预备党员转正前党支部审查意见落款日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'formal.支部大会通过预备党员能否转为正式党员的决议落款日期',
        label: '支部大会通过预备党员能否转为正式党员的决议落款日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      },
      {
        id: 'formal.基层党委审批意见落款日期',
        label: '基层党委审批意见落款日期',
        format: 'yyyy年m月d日',
        validator: 'validateChineseDateInput',
        note: null,
      }
    ]
  },
  summary: {
    total: 93,
    bySection: {
      '基本信息表格': 3,
      '入党申请书提交': 1,
      '谈话表格': 1,
      '确定积极分子表格': 7,
      '积极分子培养过程第一季度': 4,
      '积极分子培养过程第二季度': 4,
      '积极分子培养过程半年': 1,
      '积极分子培养过程第三季度': 4,
      '积极分子培养过程第四季度': 4,
      '积极分子培养过程一年': 1,
      '积极分子培养过程第五季度': 4,
      '积极分子培养过程第六季度': 4,
      '积极分子培养过程一年半': 1,
      '积极分子培养过程第七季度': 4,
      '积极分子培养过程第八季度': 4,
      '积极分子培养过程两年': 1,
      '确定发展对象表格': 10,
      '预备党员接收表格': 10,
      '预备党员培养过程': 1,
      '预备党员培养过程第一季度': 4,
      '预备党员培养过程第二季度': 4,
      '预备党员培养过程半年': 1,
      '预备党员培养过程第三季度': 4,
      '预备党员培养过程第四季度': 4,
      '预备党员转正': 7
    },
  },
}

export const formSchemaTimeFieldsReferenceSummary = formSchemaTimeFieldsReference.summary

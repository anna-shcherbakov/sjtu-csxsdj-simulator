import { compareDateValues, ensureParsedDateValue, isAtLeastAgeOnDate } from './dateRuleUtils'

const ISO_DATE_VALIDATOR = 'validateDateInput'
const CHINESE_DATE_VALIDATOR = 'validateChineseDateInput'
const FIELD_IDS = {
  birthDate: 'basic.出生日期',
  applicationDate: 'submit.入党申请书落款日期',
  talkDate: 'talk.申请人谈话日期',
  recommendDate: 'acknowledge.团推优日期',
  positiveSelectionDate: 'acknowledge.确定积极分子日期',
  activistArchiveDate: 'activist.积极分子党委备案日期',
  liaison1ProbationaryDate: 'activist.入党联系人1入党时间（预备时间）',
  liaison1FormalDate: 'activist.入党联系人1转正时间',
  liaison2ProbationaryDate: 'activist.入党联系人2入党时间（预备时间）',
  liaison2FormalDate: 'activist.入党联系人2转正时间',
}

const ACTIVIST_QUARTERS = [
  {
    index: 1,
    label: '第一季度',
    electronicDateField: 'season1_1.电子版（一）落款日期',
    startMonthField: 'season1_1.电子版（一）所在季度起始月份',
    endMonthField: 'season1_1.电子版（一）所在季度截止月份',
    opinionDateField: 'season1_1.联系人意见（一）落款日期',
  },
  {
    index: 2,
    label: '第二季度',
    electronicDateField: 'season1_2.电子版（二）落款日期',
    startMonthField: 'season1_2.电子版（二）所在季度起始月份',
    endMonthField: 'season1_2.电子版（二）所在季度截止月份',
    opinionDateField: 'season1_2.联系人意见（二）落款日期',
  },
  {
    index: 3,
    label: '第三季度',
    electronicDateField: 'season1_3.电子版（三）落款日期',
    startMonthField: 'season1_3.电子版（三）所在季度起始月份',
    endMonthField: 'season1_3.电子版（三）所在季度截止月份',
    opinionDateField: 'season1_3.联系人意见（三）落款日期',
  },
  {
    index: 4,
    label: '第四季度',
    electronicDateField: 'season1_4.电子版（四）落款日期',
    startMonthField: 'season1_4.电子版（四）所在季度起始月份',
    endMonthField: 'season1_4.电子版（四）所在季度截止月份',
    opinionDateField: 'season1_4.联系人意见（四）落款日期',
  },
  {
    index: 5,
    label: '第五季度',
    electronicDateField: 'season1_5.电子版（五）落款日期',
    startMonthField: 'season1_5.电子版（五）所在季度起始月份',
    endMonthField: 'season1_5.电子版（五）所在季度截止月份',
    opinionDateField: 'season1_5.联系人意见（五）落款日期',
  },
  {
    index: 6,
    label: '第六季度',
    electronicDateField: 'season1_6.电子版（六）落款日期',
    startMonthField: 'season1_6.电子版（六）所在季度起始月份',
    endMonthField: 'season1_6.电子版（六）所在季度截止月份',
    opinionDateField: 'season1_6.联系人意见（六）落款日期',
  },
  {
    index: 7,
    label: '第七季度',
    electronicDateField: 'season1_7.电子版（七）落款日期',
    startMonthField: 'season1_7.电子版（七）所在季度起始月份',
    endMonthField: 'season1_7.电子版（七）所在季度截止月份',
    opinionDateField: 'season1_7.联系人意见（七）落款日期',
  },
  {
    index: 8,
    label: '第八季度',
    electronicDateField: 'season1_8.电子版（八）落款日期',
    startMonthField: 'season1_8.电子版（八）所在季度起始月份',
    endMonthField: 'season1_8.电子版（八）所在季度截止月份',
    opinionDateField: 'season1_8.联系人意见（八）落款日期',
  },
]

const BRANCH_OPINION_RULES = [
  {
    field: 'season1_half.党支部意见（半年）落款日期',
    previousOpinionField: 'season1_2.联系人意见（二）落款日期',
    label: '党支部意见（半年）落款日期',
    previousLabel: '联系人意见（二）落款日期',
  },
  {
    field: 'season1_annual.党支部意见（一年）落款日期',
    previousOpinionField: 'season1_4.联系人意见（四）落款日期',
    label: '党支部意见（一年）落款日期',
    previousLabel: '联系人意见（四）落款日期',
  },
  {
    field: 'season1_annual_and_half.党支部意见（一年半）落款日期',
    previousOpinionField: 'season1_6.联系人意见（六）落款日期',
    label: '党支部意见（一年半）落款日期',
    previousLabel: '联系人意见（六）落款日期',
  },
  {
    field: 'season1_two_year.党支部意见（两年）落款日期',
    previousOpinionField: 'season1_8.联系人意见（八）落款日期',
    label: '党支部意见（两年）落款日期',
    previousLabel: '联系人意见（八）落款日期',
  },
]

const isEmptyValue = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === 'string' && value.trim() === '')

const buildUTCDate = (year, month, day) =>
  new Date(Date.UTC(year, month - 1, day))

const getDaysInMonth = (year, month) =>
  buildUTCDate(year, month + 1, 0).getUTCDate()

const resolveDayParts = (value, validatorName) => {
  const parsed = ensureParsedDateValue(value, { validatorName })

  if (!parsed || parsed.precision !== 'day') {
    return null
  }

  return {
    year: parsed.year,
    month: parsed.month,
    day: parsed.day,
  }
}

const addCalendarMonthsToDayParts = (parts, months) => {
  const monthIndex = parts.year * 12 + (parts.month - 1) + months
  const year = Math.floor(monthIndex / 12)
  const month = ((monthIndex % 12) + 12) % 12 + 1
  const day = Math.min(parts.day, getDaysInMonth(year, month))

  return { year, month, day }
}

const toChineseDateText = ({ year, month, day }) => `${year}年${month}月${day}日`
const toChineseYearMonthText = ({ year, month }) => `${year}年${month}月`

const isSameDate = (left, right, options = {}) =>
  compareDateValues(left, right, options) === 0

const isSameOrAfter = (left, right, options = {}) => {
  const result = compareDateValues(left, right, options)

  return result === 0 || result === 1
}

const isStrictlyAfter = (left, right, options = {}) =>
  compareDateValues(left, right, options) === 1

const isWithinQuarterRange = (value, startText, endText, validatorName) => {
  const startResult = compareDateValues(value, startText, {
    leftValidatorName: validatorName,
    rightFormat: 'chineseDate',
  })
  const endResult = compareDateValues(value, endText, {
    leftValidatorName: validatorName,
    rightFormat: 'chineseDate',
  })

  if (startResult === null || endResult === null) {
    return null
  }

  return (startResult === 0 || startResult === 1) && endResult === -1
}

const getQuarterWindow = (formData, quarterIndex) => {
  const determineDateParts = resolveDayParts(formData[FIELD_IDS.positiveSelectionDate], ISO_DATE_VALIDATOR)

  if (!determineDateParts) {
    return null
  }

  const startOffset = 1 + (quarterIndex - 1) * 3
  const endOffset = 4 + (quarterIndex - 1) * 3
  const start = addCalendarMonthsToDayParts(determineDateParts, startOffset)
  const end = addCalendarMonthsToDayParts(determineDateParts, endOffset)

  return {
    startDateText: toChineseDateText(start),
    endDateText: toChineseDateText(end),
    startMonthText: toChineseYearMonthText(start),
    endMonthText: toChineseYearMonthText(end),
  }
}

const createCustomRule = (field, message, validate) => ({
  type: 'custom',
  field,
  message,
  validate,
})

const createQuarterRules = ({
  electronicDateField,
  endMonthField,
  index,
  label,
  opinionDateField,
  startMonthField,
}) => [
  createCustomRule(
    startMonthField,
    `${label}所在季度起始月份不正确`,
    (formData) => {
      const value = formData[startMonthField]

      if (isEmptyValue(value)) {
        return true
      }

      const quarterWindow = getQuarterWindow(formData, index)

      if (!quarterWindow) {
        return true
      }

      return String(value).trim() === quarterWindow.startMonthText
        ? true
        : `${label}所在季度起始月份应为 ${quarterWindow.startMonthText}`
    },
  ),
  createCustomRule(
    endMonthField,
    `${label}所在季度截止月份不正确`,
    (formData) => {
      const value = formData[endMonthField]

      if (isEmptyValue(value)) {
        return true
      }

      const quarterWindow = getQuarterWindow(formData, index)

      if (!quarterWindow) {
        return true
      }

      return String(value).trim() === quarterWindow.endMonthText
        ? true
        : `${label}所在季度截止月份应为 ${quarterWindow.endMonthText}`
    },
  ),
  createCustomRule(
    electronicDateField,
    `${label}电子版落款日期应在对应考察季度内`,
    (formData) => {
      const value = formData[electronicDateField]

      if (isEmptyValue(value)) {
        return true
      }

      const quarterWindow = getQuarterWindow(formData, index)

      if (!quarterWindow) {
        return true
      }

      const isValid = isWithinQuarterRange(
        value,
        quarterWindow.startDateText,
        quarterWindow.endDateText,
        CHINESE_DATE_VALIDATOR,
      )

      if (isValid === null) {
        return true
      }

      return isValid
        ? true
        : `${label}电子版落款日期应在 ${quarterWindow.startDateText} 至 ${quarterWindow.endDateText} 之间`
    },
  ),
  createCustomRule(
    opinionDateField,
    `${label}联系人意见落款日期应在对应考察季度内且晚于电子版落款日期`,
    (formData) => {
      const opinionDate = formData[opinionDateField]
      const electronicDate = formData[electronicDateField]

      if (isEmptyValue(opinionDate)) {
        return true
      }

      const quarterWindow = getQuarterWindow(formData, index)

      if (!quarterWindow) {
        return true
      }

      const isInQuarter = isWithinQuarterRange(
        opinionDate,
        quarterWindow.startDateText,
        quarterWindow.endDateText,
        CHINESE_DATE_VALIDATOR,
      )

      if (isInQuarter === null) {
        return true
      }

      if (!isInQuarter) {
        return `${label}联系人意见落款日期应在 ${quarterWindow.startDateText} 至 ${quarterWindow.endDateText} 之间`
      }

      if (isEmptyValue(electronicDate)) {
        return true
      }

      const isAfterElectronicDate = isStrictlyAfter(opinionDate, electronicDate, {
        leftValidatorName: CHINESE_DATE_VALIDATOR,
        rightValidatorName: CHINESE_DATE_VALIDATOR,
      })

      return isAfterElectronicDate === true
        ? true
        : `${label}联系人意见落款日期应晚于电子版落款日期`
    },
  ),
]

const firstPhaseRules = [
  createCustomRule(
    FIELD_IDS.applicationDate,
    '入党申请书落款日期应满足申请入党时年满18周岁',
    (formData) => {
      const birthDate = formData[FIELD_IDS.birthDate]
      const applicationDate = formData[FIELD_IDS.applicationDate]

      if (isEmptyValue(birthDate) || isEmptyValue(applicationDate)) {
        return true
      }

      const isValid = isAtLeastAgeOnDate(birthDate, applicationDate, 18, {
        startValidatorName: CHINESE_DATE_VALIDATOR,
        endValidatorName: ISO_DATE_VALIDATOR,
      })

      return isValid === true ? true : '入党申请书落款日期应满足申请入党时年满18周岁'
    },
  ),
  createCustomRule(
    FIELD_IDS.talkDate,
    '申请人谈话日期应在入党申请书落款日期后一个月内',
    (formData) => {
      const applicationDate = formData[FIELD_IDS.applicationDate]
      const talkDate = formData[FIELD_IDS.talkDate]

      if (isEmptyValue(applicationDate) || isEmptyValue(talkDate)) {
        return true
      }

      const applicationParts = resolveDayParts(applicationDate, ISO_DATE_VALIDATOR)

      if (!applicationParts) {
        return true
      }

      const latestTalkDateText = toChineseDateText(addCalendarMonthsToDayParts(applicationParts, 1))
      const isAfterApplicationDate = isSameOrAfter(talkDate, applicationDate, {
        leftValidatorName: ISO_DATE_VALIDATOR,
        rightValidatorName: ISO_DATE_VALIDATOR,
      })
      const isBeforeDeadline = compareDateValues(talkDate, latestTalkDateText, {
        leftValidatorName: ISO_DATE_VALIDATOR,
        rightFormat: 'chineseDate',
      })

      if (isBeforeDeadline === null) {
        return true
      }

      return isAfterApplicationDate && (isBeforeDeadline === -1 || isBeforeDeadline === 0)
        ? true
        : `申请人谈话日期应在入党申请书落款日期至 ${latestTalkDateText} 之间`
    },
  ),
  createCustomRule(
    FIELD_IDS.recommendDate,
    '团推优日期应至少在入党申请书落款日期一个月后',
    (formData) => {
      const applicationDate = formData[FIELD_IDS.applicationDate]
      const recommendDate = formData[FIELD_IDS.recommendDate]

      if (isEmptyValue(applicationDate) || isEmptyValue(recommendDate)) {
        return true
      }

      const applicationParts = resolveDayParts(applicationDate, ISO_DATE_VALIDATOR)

      if (!applicationParts) {
        return true
      }

      const earliestRecommendDateText = toChineseDateText(addCalendarMonthsToDayParts(applicationParts, 1))
      const isValid = compareDateValues(recommendDate, earliestRecommendDateText, {
        leftValidatorName: ISO_DATE_VALIDATOR,
        rightFormat: 'chineseDate',
      })

      if (isValid === null) {
        return true
      }

      return isValid === 0 || isValid === 1
        ? true
        : `团推优日期应不早于 ${earliestRecommendDateText}`
    },
  ),
  createCustomRule(
    FIELD_IDS.positiveSelectionDate,
    '确定积极分子日期应晚于团推优日期',
    (formData) => {
      const recommendDate = formData[FIELD_IDS.recommendDate]
      const positiveSelectionDate = formData[FIELD_IDS.positiveSelectionDate]

      if (isEmptyValue(recommendDate) || isEmptyValue(positiveSelectionDate)) {
        return true
      }

      const isValid = isStrictlyAfter(positiveSelectionDate, recommendDate, {
        leftValidatorName: ISO_DATE_VALIDATOR,
        rightValidatorName: ISO_DATE_VALIDATOR,
      })

      return isValid === true ? true : '确定积极分子日期应晚于团推优日期'
    },
  ),
  createCustomRule(
    FIELD_IDS.liaison1FormalDate,
    '入党联系人1转正时间应与其入党时间（预备时间）刚好间隔一年',
    (formData) => {
      const startDate = formData[FIELD_IDS.liaison1ProbationaryDate]
      const endDate = formData[FIELD_IDS.liaison1FormalDate]

      if (isEmptyValue(startDate) || isEmptyValue(endDate)) {
        return true
      }

      const startParts = resolveDayParts(startDate, CHINESE_DATE_VALIDATOR)
      const endParts = resolveDayParts(endDate, CHINESE_DATE_VALIDATOR)

      if (!startParts || !endParts) {
        return true
      }

      return (
        endParts.year === startParts.year + 1 &&
        endParts.month === startParts.month &&
        endParts.day === startParts.day
      )
        ? true
        : '入党联系人1转正时间应与其入党时间（预备时间）刚好间隔一年'
    },
  ),
  // 规则 6 按规则 5 的对称关系解释为：联系人 2 的预备时间与联系人 2 的转正时间刚好间隔一年。
  createCustomRule(
    FIELD_IDS.liaison2FormalDate,
    '入党联系人2转正时间应与其入党时间（预备时间）刚好间隔一年',
    (formData) => {
      const startDate = formData[FIELD_IDS.liaison2ProbationaryDate]
      const endDate = formData[FIELD_IDS.liaison2FormalDate]

      if (isEmptyValue(startDate) || isEmptyValue(endDate)) {
        return true
      }

      const startParts = resolveDayParts(startDate, CHINESE_DATE_VALIDATOR)
      const endParts = resolveDayParts(endDate, CHINESE_DATE_VALIDATOR)

      if (!startParts || !endParts) {
        return true
      }

      return (
        endParts.year === startParts.year + 1 &&
        endParts.month === startParts.month &&
        endParts.day === startParts.day
      )
        ? true
        : '入党联系人2转正时间应与其入党时间（预备时间）刚好间隔一年'
    },
  ),
  createCustomRule(
    FIELD_IDS.activistArchiveDate,
    '积极分子党委备案日期应与确定积极分子日期一致',
    (formData) => {
      const positiveSelectionDate = formData[FIELD_IDS.positiveSelectionDate]
      const activistArchiveDate = formData[FIELD_IDS.activistArchiveDate]

      if (isEmptyValue(positiveSelectionDate) || isEmptyValue(activistArchiveDate)) {
        return true
      }

      const isValid = isSameDate(activistArchiveDate, positiveSelectionDate, {
        leftValidatorName: CHINESE_DATE_VALIDATOR,
        rightValidatorName: ISO_DATE_VALIDATOR,
      })

      return isValid === true ? true : '积极分子党委备案日期应与确定积极分子日期一致'
    },
  ),
  ...ACTIVIST_QUARTERS.flatMap(createQuarterRules),
  ...BRANCH_OPINION_RULES.map(({ field, label, previousLabel, previousOpinionField }) =>
    createCustomRule(
      field,
      `${label}应晚于${previousLabel}`,
      (formData) => {
        const value = formData[field]
        const previousOpinionDate = formData[previousOpinionField]

        if (isEmptyValue(value) || isEmptyValue(previousOpinionDate)) {
          return true
        }

        const isValid = isStrictlyAfter(value, previousOpinionDate, {
          leftValidatorName: CHINESE_DATE_VALIDATOR,
          rightValidatorName: CHINESE_DATE_VALIDATOR,
        })

        return isValid === true ? true : `${label}应晚于${previousLabel}`
      },
    ),
  ),
]

export const FIRST_PHASE_RULES = firstPhaseRules

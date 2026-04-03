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
  candidateConsultationDate: 'candidate.发展对象群众座谈会日期',
  candidateCommitteeDate: 'candidate.支委会日期',
  candidateViceSecretaryDate: 'candidate.学工副书记（负责人）意见日期',
  candidateArchiveDate: 'candidate.党委备案日期（确定发展对象日期）',
  candidateTrainingCompletionDate: 'candidate.教育培训情况-结业日期',
  candidatePoliticalReviewDate: 'candidate.政治审查报告日期',
  candidatePublicNoticeStartDate: 'candidate.发展对象公示起始日期',
  candidatePublicNoticeEndDate: 'candidate.发展对象公示结束日期',
  candidateBranchReviewDate: 'candidate.党支部审查意见日期',
  candidatePreReviewDate: 'candidate.党委预审意见日期',
  wishSignatureDate: 'wish.本人签名时间（按拿到志愿书的时间即可）',
  wishIntroducerOpinionDate: 'wish.入党介绍人意见落款日期',
  wishProbationaryApprovalDate: 'wish.支部大会通过预备的日期',
  wishProbationaryEndDate: 'wish.预备党员考察期截止日期',
  wishCommitteeApprovalDate: 'wish.党委审批日期',
  formalApplicationDate: 'formal.转正申请书日期',
  formalConsultationDate: 'formal.群众座谈会日期',
  formalPublicNoticeStartDate: 'formal.预备党员转正公示起始日期',
  formalPublicNoticeEndDate: 'formal.预备党员转正公示结束日期',
  formalBranchReviewDate: 'formal.预备党员转正前党支部审查意见落款日期',
  formalResolutionDate: 'formal.支部大会通过预备党员能否转为正式党员的决议落款日期',
  formalCommitteeApprovalDate: 'formal.基层党委审批意见落款日期',
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

const CANDIDATE_PREVIOUS_BRANCH_OPINION_OPTIONS = [
  {
    field: 'season1_two_year.党支部意见（两年）落款日期',
    label: '党支部意见（两年）落款日期',
  },
  {
    field: 'season1_annual_and_half.党支部意见（一年半）落款日期',
    label: '党支部意见（一年半）落款日期',
  },
  {
    field: 'season1_annual.党支部意见（一年）落款日期',
    label: '党支部意见（一年）落款日期',
  },
  {
    field: 'season1_half.党支部意见（半年）落款日期',
    label: '党支部意见（半年）落款日期',
  },
]

const PROBATIONARY_QUARTERS = [
  {
    index: 1,
    label: '第一季度',
    electronicDateField: 'season2_1.电子版（一）落款日期',
    startMonthField: 'season2_1.电子版（一）所在季度起始月份',
    endMonthField: 'season2_1.电子版（一）所在季度截止月份',
    opinionDateField: 'season2_1.考察人意见（一）落款日期',
  },
  {
    index: 2,
    label: '第二季度',
    electronicDateField: 'season2_2.电子版（二）落款日期',
    startMonthField: 'season2_2.电子版（二）所在季度起始月份',
    endMonthField: 'season2_2.电子版（二）所在季度截止月份',
    opinionDateField: 'season2_2.考察人意见（二）落款日期',
  },
  {
    index: 3,
    label: '第三季度',
    electronicDateField: 'season2_3.电子版（三）落款日期',
    startMonthField: 'season2_3.电子版（三）所在季度起始月份',
    endMonthField: 'season2_3.电子版（三）所在季度截止月份',
    opinionDateField: 'season2_3.考察人意见（三）落款日期',
  },
  {
    index: 4,
    label: '第四季度',
    electronicDateField: 'season2_4.电子版（四）落款日期',
    startMonthField: 'season2_4.电子版（四）所在季度起始月份',
    endMonthField: 'season2_4.电子版（四）所在季度截止月份',
    opinionDateField: 'season2_4.考察人意见（四）落款日期',
  },
]

const isEmptyValue = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === 'string' && value.trim() === '')

const buildUTCDate = (year, month, day) =>
  new Date(Date.UTC(year, month - 1, day))

const getUTCDateParts = (date) => ({
  year: date.getUTCFullYear(),
  month: date.getUTCMonth() + 1,
  day: date.getUTCDate(),
})

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

const addCalendarDaysToDayParts = (parts, days) => {
  const date = buildUTCDate(parts.year, parts.month, parts.day)
  date.setUTCDate(date.getUTCDate() + days)

  return getUTCDateParts(date)
}

const addCalendarYearsToDayParts = (parts, years) =>
  addCalendarMonthsToDayParts(parts, years * 12)

const toChineseDateText = ({ year, month, day }) => `${year}年${month}月${day}日`
const toChineseYearMonthText = ({ year, month }) => `${year}年${month}月`

const countBusinessDaysInclusive = (startValue, endValue, validatorName) => {
  const startParsed = ensureParsedDateValue(startValue, { validatorName })
  const endParsed = ensureParsedDateValue(endValue, { validatorName })

  if (!startParsed || !endParsed) {
    return null
  }

  if (endParsed.startTimestamp < startParsed.startTimestamp) {
    return -1
  }

  let count = 0
  const cursor = buildUTCDate(startParsed.year, startParsed.month, startParsed.day)
  const endDate = buildUTCDate(endParsed.year, endParsed.month, endParsed.day)

  while (cursor.getTime() <= endDate.getTime()) {
    const weekDay = cursor.getUTCDay()

    if (weekDay >= 1 && weekDay <= 5) {
      count += 1
    }

    cursor.setUTCDate(cursor.getUTCDate() + 1)
  }

  return count
}

const getLatestCandidatePreviousBranchOpinion = (formData) =>
  CANDIDATE_PREVIOUS_BRANCH_OPINION_OPTIONS.find(({ field }) => !isEmptyValue(formData[field])) ??
  null

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

  return getQuarterWindowFromAnchor(determineDateParts, quarterIndex)
}

const getQuarterWindowFromAnchor = (anchorParts, quarterIndex) => {
  const startOffset = 1 + (quarterIndex - 1) * 3
  const endOffset = 4 + (quarterIndex - 1) * 3
  const start = addCalendarMonthsToDayParts(anchorParts, startOffset)
  const end = addCalendarMonthsToDayParts(anchorParts, endOffset)

  return {
    startDateText: toChineseDateText(start),
    endDateText: toChineseDateText(end),
    startMonthText: toChineseYearMonthText(start),
    endMonthText: toChineseYearMonthText(end),
  }
}

const getProbationaryQuarterWindow = (formData, quarterIndex) => {
  const probationaryDateParts = resolveDayParts(
    formData[FIELD_IDS.wishProbationaryApprovalDate],
    CHINESE_DATE_VALIDATOR,
  )

  if (!probationaryDateParts) {
    return null
  }

  return getQuarterWindowFromAnchor(probationaryDateParts, quarterIndex)
}

const createCustomRule = (field, message, validate) => ({
  type: 'custom',
  field,
  message,
  validate,
})

const createSameOrAfterRule = ({
  earlierField,
  earlierLabel,
  laterField,
  laterLabel,
}) =>
  createCustomRule(
    laterField,
    `${laterLabel}应晚于或等于${earlierLabel}`,
    (formData) => {
      const earlierValue = formData[earlierField]
      const laterValue = formData[laterField]

      if (isEmptyValue(earlierValue) || isEmptyValue(laterValue)) {
        return true
      }

      const isValid = isSameOrAfter(laterValue, earlierValue, {
        leftValidatorName: CHINESE_DATE_VALIDATOR,
        rightValidatorName: CHINESE_DATE_VALIDATOR,
      })

      return isValid === true ? true : `${laterLabel}应晚于或等于${earlierLabel}`
    },
  )

const createStrictlyAfterRule = ({
  earlierField,
  earlierLabel,
  laterField,
  laterLabel,
}) =>
  createCustomRule(
    laterField,
    `${laterLabel}应晚于${earlierLabel}`,
    (formData) => {
      const earlierValue = formData[earlierField]
      const laterValue = formData[laterField]

      if (isEmptyValue(earlierValue) || isEmptyValue(laterValue)) {
        return true
      }

      const isValid = isStrictlyAfter(laterValue, earlierValue, {
        leftValidatorName: CHINESE_DATE_VALIDATOR,
        rightValidatorName: CHINESE_DATE_VALIDATOR,
      })

      return isValid === true ? true : `${laterLabel}应晚于${earlierLabel}`
    },
  )

const createQuarterRules = ({
  electronicDateField,
  endMonthField,
  getQuarterWindowForFormData = getQuarterWindow,
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

      const quarterWindow = getQuarterWindowForFormData(formData, index)

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

      const quarterWindow = getQuarterWindowForFormData(formData, index)

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

      const quarterWindow = getQuarterWindowForFormData(formData, index)

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

      const quarterWindow = getQuarterWindowForFormData(formData, index)

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
  createCustomRule(
    FIELD_IDS.candidateConsultationDate,
    '发展对象群众座谈会日期应晚于积极分子培养过程最后一个半年对应的党支部意见落款日期',
    (formData) => {
      const candidateConsultationDate = formData[FIELD_IDS.candidateConsultationDate]

      if (isEmptyValue(candidateConsultationDate)) {
        return true
      }

      const latestOpinion = getLatestCandidatePreviousBranchOpinion(formData)

      if (!latestOpinion) {
        return true
      }

      const latestOpinionValue = formData[latestOpinion.field]
      const isValid = isStrictlyAfter(candidateConsultationDate, latestOpinionValue, {
        leftValidatorName: CHINESE_DATE_VALIDATOR,
        rightValidatorName: CHINESE_DATE_VALIDATOR,
      })

      return isValid === true
        ? true
        : `发展对象群众座谈会日期应晚于${latestOpinion.label}`
    },
  ),
  createSameOrAfterRule({
    earlierField: FIELD_IDS.candidateConsultationDate,
    earlierLabel: '发展对象群众座谈会日期',
    laterField: FIELD_IDS.candidateCommitteeDate,
    laterLabel: '支委会日期',
  }),
  createSameOrAfterRule({
    earlierField: FIELD_IDS.candidateCommitteeDate,
    earlierLabel: '支委会日期',
    laterField: FIELD_IDS.candidateViceSecretaryDate,
    laterLabel: '学工副书记（负责人）意见日期',
  }),
  createSameOrAfterRule({
    earlierField: FIELD_IDS.candidateViceSecretaryDate,
    earlierLabel: '学工副书记（负责人）意见日期',
    laterField: FIELD_IDS.candidateArchiveDate,
    laterLabel: '党委备案日期（确定发展对象日期）',
  }),
  createSameOrAfterRule({
    earlierField: FIELD_IDS.candidateArchiveDate,
    earlierLabel: '党委备案日期（确定发展对象日期）',
    laterField: FIELD_IDS.candidateTrainingCompletionDate,
    laterLabel: '教育培训情况-结业日期',
  }),
  createSameOrAfterRule({
    earlierField: FIELD_IDS.candidateArchiveDate,
    earlierLabel: '党委备案日期（确定发展对象日期）',
    laterField: FIELD_IDS.candidatePoliticalReviewDate,
    laterLabel: '政治审查报告日期',
  }),
  createSameOrAfterRule({
    earlierField: FIELD_IDS.candidatePoliticalReviewDate,
    earlierLabel: '政治审查报告日期',
    laterField: FIELD_IDS.candidatePublicNoticeStartDate,
    laterLabel: '发展对象公示起始日期',
  }),
  createCustomRule(
    FIELD_IDS.candidatePublicNoticeEndDate,
    '发展对象公示起始日期至结束日期应至少覆盖5个工作日',
    (formData) => {
      const startDate = formData[FIELD_IDS.candidatePublicNoticeStartDate]
      const endDate = formData[FIELD_IDS.candidatePublicNoticeEndDate]

      if (isEmptyValue(startDate) || isEmptyValue(endDate)) {
        return true
      }

      const businessDays = countBusinessDaysInclusive(
        startDate,
        endDate,
        CHINESE_DATE_VALIDATOR,
      )

      if (businessDays === null) {
        return true
      }

      return businessDays >= 5
        ? true
        : '发展对象公示起始日期至结束日期应至少覆盖5个工作日（周一至周五）'
    },
  ),
  createSameOrAfterRule({
    earlierField: FIELD_IDS.candidatePublicNoticeEndDate,
    earlierLabel: '发展对象公示结束日期',
    laterField: FIELD_IDS.candidateBranchReviewDate,
    laterLabel: '党支部审查意见日期',
  }),
  createSameOrAfterRule({
    earlierField: FIELD_IDS.candidateBranchReviewDate,
    earlierLabel: '党支部审查意见日期',
    laterField: FIELD_IDS.candidatePreReviewDate,
    laterLabel: '党委预审意见日期',
  }),
  createSameOrAfterRule({
    earlierField: FIELD_IDS.candidatePreReviewDate,
    earlierLabel: '党委预审意见日期',
    laterField: FIELD_IDS.wishSignatureDate,
    laterLabel: '本人签名时间（按拿到志愿书的时间即可）',
  }),
  createSameOrAfterRule({
    earlierField: FIELD_IDS.wishSignatureDate,
    earlierLabel: '本人签名时间（按拿到志愿书的时间即可）',
    laterField: FIELD_IDS.wishIntroducerOpinionDate,
    laterLabel: '入党介绍人意见落款日期',
  }),
  createSameOrAfterRule({
    earlierField: FIELD_IDS.wishIntroducerOpinionDate,
    earlierLabel: '入党介绍人意见落款日期',
    laterField: FIELD_IDS.wishProbationaryApprovalDate,
    laterLabel: '支部大会通过预备的日期',
  }),
  createCustomRule(
    FIELD_IDS.wishProbationaryEndDate,
    '预备党员考察期截止日期应为支部大会通过预备的日期满一年前一日',
    (formData) => {
      const approvalDate = formData[FIELD_IDS.wishProbationaryApprovalDate]
      const endDate = formData[FIELD_IDS.wishProbationaryEndDate]

      if (isEmptyValue(approvalDate) || isEmptyValue(endDate)) {
        return true
      }

      const approvalParts = resolveDayParts(approvalDate, CHINESE_DATE_VALIDATOR)

      if (!approvalParts) {
        return true
      }

      const expectedEndDate = toChineseDateText(
        addCalendarDaysToDayParts(addCalendarYearsToDayParts(approvalParts, 1), -1),
      )
      const isValid = isSameDate(endDate, expectedEndDate, {
        leftValidatorName: CHINESE_DATE_VALIDATOR,
        rightFormat: 'chineseDate',
      })

      return isValid === true
        ? true
        : `预备党员考察期截止日期应为 ${expectedEndDate}`
    },
  ),
  createSameOrAfterRule({
    earlierField: FIELD_IDS.wishProbationaryApprovalDate,
    earlierLabel: '支部大会通过预备的日期',
    laterField: FIELD_IDS.wishCommitteeApprovalDate,
    laterLabel: '党委审批日期',
  }),
  ...PROBATIONARY_QUARTERS.flatMap((quarter) =>
    createQuarterRules({
      ...quarter,
      getQuarterWindowForFormData: getProbationaryQuarterWindow,
    }),
  ),
  createCustomRule(
    FIELD_IDS.formalApplicationDate,
    '转正申请书日期应严格落在预备党员考察期截止日期前一周内',
    (formData) => {
      const deadlineDate = formData[FIELD_IDS.wishProbationaryEndDate]
      const applicationDate = formData[FIELD_IDS.formalApplicationDate]

      if (isEmptyValue(deadlineDate) || isEmptyValue(applicationDate)) {
        return true
      }

      const deadlineParts = resolveDayParts(deadlineDate, CHINESE_DATE_VALIDATOR)

      if (!deadlineParts) {
        return true
      }

      const lowerBoundText = toChineseDateText(addCalendarDaysToDayParts(deadlineParts, -7))
      const lowerComparison = compareDateValues(applicationDate, lowerBoundText, {
        leftValidatorName: CHINESE_DATE_VALIDATOR,
        rightFormat: 'chineseDate',
      })
      const upperComparison = compareDateValues(applicationDate, deadlineDate, {
        leftValidatorName: CHINESE_DATE_VALIDATOR,
        rightValidatorName: CHINESE_DATE_VALIDATOR,
      })

      if (lowerComparison === null || upperComparison === null) {
        return true
      }

      return lowerComparison === 1 && upperComparison === -1
        ? true
        : `转正申请书日期应严格落在 ${lowerBoundText} 与 ${deadlineDate} 之间`
    },
  ),
  createStrictlyAfterRule({
    earlierField: FIELD_IDS.formalApplicationDate,
    earlierLabel: '转正申请书日期',
    laterField: FIELD_IDS.formalConsultationDate,
    laterLabel: '群众座谈会日期',
  }),
  createStrictlyAfterRule({
    earlierField: FIELD_IDS.formalApplicationDate,
    earlierLabel: '转正申请书日期',
    laterField: FIELD_IDS.formalPublicNoticeStartDate,
    laterLabel: '预备党员转正公示起始日期',
  }),
  createCustomRule(
    FIELD_IDS.formalPublicNoticeEndDate,
    '预备党员转正公示起始日期至结束日期应至少覆盖5个工作日',
    (formData) => {
      const startDate = formData[FIELD_IDS.formalPublicNoticeStartDate]
      const endDate = formData[FIELD_IDS.formalPublicNoticeEndDate]

      if (isEmptyValue(startDate) || isEmptyValue(endDate)) {
        return true
      }

      const businessDays = countBusinessDaysInclusive(
        startDate,
        endDate,
        CHINESE_DATE_VALIDATOR,
      )

      if (businessDays === null) {
        return true
      }

      return businessDays >= 5
        ? true
        : '预备党员转正公示起始日期至结束日期应至少覆盖5个工作日（周一至周五）'
    },
  ),
  createSameOrAfterRule({
    earlierField: FIELD_IDS.formalPublicNoticeEndDate,
    earlierLabel: '预备党员转正公示结束日期',
    laterField: FIELD_IDS.formalBranchReviewDate,
    laterLabel: '预备党员转正前党支部审查意见落款日期',
  }),
  createSameOrAfterRule({
    earlierField: FIELD_IDS.formalBranchReviewDate,
    earlierLabel: '预备党员转正前党支部审查意见落款日期',
    laterField: FIELD_IDS.formalResolutionDate,
    laterLabel: '支部大会通过预备党员能否转为正式党员的决议落款日期',
  }),
  createSameOrAfterRule({
    earlierField: FIELD_IDS.formalResolutionDate,
    earlierLabel: '支部大会通过预备党员能否转为正式党员的决议落款日期',
    laterField: FIELD_IDS.formalCommitteeApprovalDate,
    laterLabel: '基层党委审批意见落款日期',
  }),
]

export const FIRST_PHASE_RULES = firstPhaseRules

export const DATE_INPUT_FORMATS = {
  ISO_DATE: 'date',
  CHINESE_DATE: 'chineseDate',
  CHINESE_YEAR_MONTH: 'chineseYearMonth',
  UNKNOWN_TIME: 'unknownTime',
}

export const DATE_FORMAT_LABELS = {
  [DATE_INPUT_FORMATS.ISO_DATE]: 'yyyy-mm-dd',
  [DATE_INPUT_FORMATS.CHINESE_DATE]: 'yyyy年m月d日',
  [DATE_INPUT_FORMATS.CHINESE_YEAR_MONTH]: 'yyyy年m月',
  [DATE_INPUT_FORMATS.UNKNOWN_TIME]: 'unknown',
}

export const DATE_FORMAT_EXAMPLES = {
  [DATE_INPUT_FORMATS.ISO_DATE]: '1999-04-16',
  [DATE_INPUT_FORMATS.CHINESE_DATE]: '1999年4月16日',
  [DATE_INPUT_FORMATS.CHINESE_YEAR_MONTH]: '1999年4月',
  [DATE_INPUT_FORMATS.UNKNOWN_TIME]: '',
}

export const DATE_VALIDATOR_FORMATS = {
  validateDateInput: DATE_INPUT_FORMATS.ISO_DATE,
  validateChineseDateInput: DATE_INPUT_FORMATS.CHINESE_DATE,
  validateChineseYearMonthInput: DATE_INPUT_FORMATS.CHINESE_YEAR_MONTH,
}

const DATE_VALUE_MARKER = Symbol('date-rule-utils.parsed-date-value')
const DAY_IN_MS = 24 * 60 * 60 * 1000

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

const isValidDateParts = (year, month, day) => {
  const date = buildUTCDate(year, month, day)

  if (Number.isNaN(date.getTime())) {
    return false
  }

  const parts = getUTCDateParts(date)

  return (
    parts.year === year &&
    parts.month === month &&
    parts.day === day
  )
}

const getDaysInMonth = (year, month) =>
  buildUTCDate(year, month + 1, 0).getUTCDate()

const buildParsedDateValue = ({
  format,
  precision,
  rawText,
  year,
  month,
  day = null,
}) => {
  const startDay = precision === 'month' ? 1 : day
  const endDay = precision === 'month' ? getDaysInMonth(year, month) : day
  const startDate = buildUTCDate(year, month, startDay)
  const endDate = buildUTCDate(year, month, endDay)

  return {
    [DATE_VALUE_MARKER]: true,
    format,
    precision,
    rawText,
    normalizedText:
      precision === 'month'
        ? `${year}年${month}月`
        : format === DATE_INPUT_FORMATS.ISO_DATE
          ? `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          : `${year}年${month}月${day}日`,
    year,
    month,
    day: precision === 'month' ? null : day,
    startTimestamp: startDate.getTime(),
    endTimestamp: endDate.getTime(),
    startDate,
    endDate,
  }
}

export const isParsedDateValue = (value) =>
  Boolean(value?.[DATE_VALUE_MARKER])

export const parseIsoDateInput = (value) => {
  if (isEmptyValue(value)) {
    return null
  }

  const normalized = String(value).trim().replaceAll('/', '-').replaceAll('.', '-')

  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    return null
  }

  const [year, month, day] = normalized.split('-').map(Number)

  if (!isValidDateParts(year, month, day)) {
    return null
  }

  return buildParsedDateValue({
    format: DATE_INPUT_FORMATS.ISO_DATE,
    precision: 'day',
    rawText: String(value).trim(),
    year,
    month,
    day,
  })
}

export const parseChineseDateInput = (value) => {
  if (isEmptyValue(value)) {
    return null
  }

  const normalized = String(value).trim()
  const match = normalized.match(/^(\d{4})年(\d{1,2})月(\d{1,2})日$/)

  if (!match) {
    return null
  }

  const [, yearText, monthText, dayText] = match
  const year = Number(yearText)
  const month = Number(monthText)
  const day = Number(dayText)

  if (!isValidDateParts(year, month, day)) {
    return null
  }

  return buildParsedDateValue({
    format: DATE_INPUT_FORMATS.CHINESE_DATE,
    precision: 'day',
    rawText: normalized,
    year,
    month,
    day,
  })
}

export const parseChineseYearMonthInput = (value) => {
  if (isEmptyValue(value)) {
    return null
  }

  const normalized = String(value).trim()
  const match = normalized.match(/^(\d{4})年(\d{1,2})月$/)

  if (!match) {
    return null
  }

  const [, yearText, monthText] = match
  const year = Number(yearText)
  const month = Number(monthText)

  if (!isValidDateParts(year, month, 1)) {
    return null
  }

  return buildParsedDateValue({
    format: DATE_INPUT_FORMATS.CHINESE_YEAR_MONTH,
    precision: 'month',
    rawText: normalized,
    year,
    month,
  })
}

export const parseDateInputByFormat = (value, format) => {
  switch (format) {
    case DATE_INPUT_FORMATS.ISO_DATE:
      return parseIsoDateInput(value)
    case DATE_INPUT_FORMATS.CHINESE_DATE:
      return parseChineseDateInput(value)
    case DATE_INPUT_FORMATS.CHINESE_YEAR_MONTH:
      return parseChineseYearMonthInput(value)
    default:
      return null
  }
}

export const parseDateInputByValidator = (value, validatorName) =>
  parseDateInputByFormat(value, DATE_VALIDATOR_FORMATS[validatorName])

export const parseDateInput = (value) =>
  parseIsoDateInput(value) ??
  parseChineseDateInput(value) ??
  parseChineseYearMonthInput(value)

export const ensureParsedDateValue = (
  value,
  { format = null, validatorName = null } = {},
) => {
  if (isParsedDateValue(value)) {
    return value
  }

  if (validatorName) {
    return parseDateInputByValidator(value, validatorName)
  }

  if (format) {
    return parseDateInputByFormat(value, format)
  }

  return parseDateInput(value)
}

export const resolveComparableTimestamp = (
  value,
  {
    edge = 'start',
    format = null,
    validatorName = null,
  } = {},
) => {
  const parsed = ensureParsedDateValue(value, { format, validatorName })

  if (!parsed) {
    return null
  }

  return edge === 'end' ? parsed.endTimestamp : parsed.startTimestamp
}

const resolveComparableDate = (
  value,
  {
    edge = 'start',
    format = null,
    validatorName = null,
  } = {},
) => {
  const parsed = ensureParsedDateValue(value, { format, validatorName })

  if (!parsed) {
    return null
  }

  return edge === 'end' ? parsed.endDate : parsed.startDate
}

export const compareDateValues = (
  left,
  right,
  {
    leftEdge = 'start',
    rightEdge = 'start',
    leftFormat = null,
    rightFormat = null,
    leftValidatorName = null,
    rightValidatorName = null,
  } = {},
) => {
  const leftTimestamp = resolveComparableTimestamp(left, {
    edge: leftEdge,
    format: leftFormat,
    validatorName: leftValidatorName,
  })
  const rightTimestamp = resolveComparableTimestamp(right, {
    edge: rightEdge,
    format: rightFormat,
    validatorName: rightValidatorName,
  })

  if (leftTimestamp === null || rightTimestamp === null) {
    return null
  }

  if (leftTimestamp < rightTimestamp) {
    return -1
  }

  if (leftTimestamp > rightTimestamp) {
    return 1
  }

  return 0
}

export const isDateValueBefore = (left, right, options = {}) =>
  compareDateValues(left, right, options) === -1

export const isDateValueSameOrBefore = (left, right, options = {}) => {
  const result = compareDateValues(left, right, options)

  return result === 0 || result === -1
}

export const isDateValueAfter = (left, right, options = {}) =>
  compareDateValues(left, right, options) === 1

export const isDateValueSameOrAfter = (left, right, options = {}) => {
  const result = compareDateValues(left, right, options)

  return result === 0 || result === 1
}

export const diffDateValuesInDays = (
  start,
  end,
  {
    startEdge = 'start',
    endEdge = 'start',
    startFormat = null,
    endFormat = null,
    startValidatorName = null,
    endValidatorName = null,
  } = {},
) => {
  const startTimestamp = resolveComparableTimestamp(start, {
    edge: startEdge,
    format: startFormat,
    validatorName: startValidatorName,
  })
  const endTimestamp = resolveComparableTimestamp(end, {
    edge: endEdge,
    format: endFormat,
    validatorName: endValidatorName,
  })

  if (startTimestamp === null || endTimestamp === null) {
    return null
  }

  return Math.floor((endTimestamp - startTimestamp) / DAY_IN_MS)
}

export const getFullYearsBetween = (
  start,
  end,
  {
    startEdge = 'start',
    endEdge = 'start',
    startFormat = null,
    endFormat = null,
    startValidatorName = null,
    endValidatorName = null,
  } = {},
) => {
  const startDate = resolveComparableDate(start, {
    edge: startEdge,
    format: startFormat,
    validatorName: startValidatorName,
  })
  const endDate = resolveComparableDate(end, {
    edge: endEdge,
    format: endFormat,
    validatorName: endValidatorName,
  })

  if (!startDate || !endDate) {
    return null
  }

  const startParts = getUTCDateParts(startDate)
  const endParts = getUTCDateParts(endDate)
  let years = endParts.year - startParts.year

  if (
    endParts.month < startParts.month ||
    (endParts.month === startParts.month && endParts.day < startParts.day)
  ) {
    years -= 1
  }

  return years
}

export const isAtLeastAgeOnDate = (
  birthDateValue,
  targetDateValue,
  age,
  options = {},
) => {
  const fullYears = getFullYearsBetween(birthDateValue, targetDateValue, options)

  return fullYears !== null && fullYears >= age
}

export const isAtLeastDaysBetween = (
  start,
  end,
  days,
  options = {},
) => {
  const diffDays = diffDateValuesInDays(start, end, options)

  return diffDays !== null && diffDays >= days
}

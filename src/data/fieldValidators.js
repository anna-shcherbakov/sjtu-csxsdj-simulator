const isEmptyValue = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === 'string' && value.trim() === '')

export const allowEmpty = (validator) => (value, formData, field) => {
  if (isEmptyValue(value)) {
    return true
  }

  return validator(value, formData, field)
}

export const createRegexValidator =
  (pattern) =>
  (value) =>
    pattern.test(String(value ?? '').trim())

const isValidDateParts = (year, month, day) => {
  const date = new Date(year, month - 1, day)

  if (Number.isNaN(date.getTime())) {
    return false
  }

  return (
    date.getFullYear() === year &&
    date.getMonth() + 1 === month &&
    date.getDate() === day
  )
}

export const validateDateInput = allowEmpty((value) => {
  const normalized = String(value).trim().replaceAll('/', '-').replaceAll('.', '-')

  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    return false
  }

  const [year, month, day] = normalized.split('-').map(Number)

  return isValidDateParts(year, month, day)
})

export const validateChineseDateInput = allowEmpty((value) => {
  const normalized = String(value).trim()
  const match = normalized.match(/^(\d{4})年(\d{1,2})月(\d{1,2})日$/)

  if (!match) {
    return false
  }

  const [, yearText, monthText, dayText] = match
  const year = Number(yearText)
  const month = Number(monthText)
  const day = Number(dayText)

  return isValidDateParts(year, month, day)
})

export const validateChineseYearMonthInput = allowEmpty((value) => {
  const normalized = String(value).trim()
  const match = normalized.match(/^(\d{4})年(\d{1,2})月$/)

  if (!match) {
    return false
  }

  const [, yearText, monthText] = match
  const year = Number(yearText)
  const month = Number(monthText)

  return isValidDateParts(year, month, 1)
})

export const validatePhoneNumberInput = allowEmpty((value) =>
  /^1\d{10}$/.test(String(value).trim()),
)

export const validateEmailInput = allowEmpty((value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim()),
)

export const validateIdCardNumberInput = allowEmpty((value) =>
  /^\d{18}$/.test(String(value).trim()),
)

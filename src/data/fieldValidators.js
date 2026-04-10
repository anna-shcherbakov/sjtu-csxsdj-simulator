import {
  parseChineseDateInput,
  parseChineseYearMonthInput,
} from './dateRuleUtils'

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

export const validateChineseDateInput = allowEmpty((value) =>
  parseChineseDateInput(value) !== null,
)

export const validateChineseYearMonthInput = allowEmpty((value) =>
  parseChineseYearMonthInput(value) !== null,
)

export const validatePhoneNumberInput = allowEmpty((value) =>
  /^1\d{10}$/.test(String(value).trim()),
)

export const validateEmailInput = allowEmpty((value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim()),
)

export const validateIdCardNumberInput = allowEmpty((value) =>
  /^\d{18}$/.test(String(value).trim()),
)

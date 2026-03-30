import { create } from 'zustand'
import {
  buildInitialFormData,
  buildInitialListRow,
  findFormFieldById,
  flattenFormFields,
  formSchema,
} from '../data/formSchema'
import { DEFAULT_TEMPLATE_ID, DEFAULT_ZOOM } from '../data/templates'

const removeFieldError = (errors, fieldId) => {
  if (!errors[fieldId]) {
    return errors
  }

  const nextErrors = { ...errors }
  delete nextErrors[fieldId]
  return nextErrors
}

const assignFieldError = (errors, fieldId, message) => {
  if (!fieldId || !message) {
    return errors
  }

  return {
    ...errors,
    [fieldId]: message,
  }
}

const getFieldValidationError = (schema, formData, fieldId) => {
  const field = findFormFieldById(schema, fieldId)

  if (!field) {
    return null
  }

  return validateField(field, formData)
}

const validateRules = (schema, formData) => {
  if (!schema.rules?.length) {
    return []
  }

  const failures = []
  const assignRuleError = (fieldId, message) => {
    if (!fieldId || !message) {
      return
    }

    failures.push({
      fieldId,
      message,
    })
  }

  schema.rules.forEach((rule) => {
    if (rule.type === 'required') {
      const value = formData[rule.field]
      const isEmpty =
        value === undefined ||
        value === null ||
        (typeof value === 'string' ? value.trim() === '' : value === '')

      if (isEmpty) {
        assignRuleError(rule.field, rule.message)
      }

      return
    }

    if (typeof rule.validate !== 'function') {
      return
    }

    const result = rule.validate(formData, rule, schema)

    if (result === true || result === undefined || result === null) {
      return
    }

    if (typeof result === 'string') {
      assignRuleError(rule.field, result || rule.message)
      return
    }

    if (result === false) {
      assignRuleError(rule.field, rule.message)
      return
    }

    if (typeof result === 'object') {
      Object.entries(result).forEach(([fieldId, message]) => {
        assignRuleError(fieldId, message || rule.message)
      })
    }
  })

  return failures
}

const getDefaultValidationErrorMessage = (field) =>
  field.errorMessage || `${field.label}格式不正确`

const validateField = (field, formData) => {
  if (typeof field.validation !== 'function') {
    return null
  }

  const result = field.validation(formData[field.id], formData, field)

  if (result === true || result === undefined || result === null) {
    return null
  }

  if (typeof result === 'string') {
    return result || getDefaultValidationErrorMessage(field)
  }

  if (result === false) {
    return getDefaultValidationErrorMessage(field)
  }

  return null
}

const validateFields = (schema, formData) =>
  flattenFormFields(schema).reduce((errors, field) => {
    const error = validateField(field, formData)
    if (error) {
      errors[field.id] = error
    }

    return errors
  }, {})

const initialFormData = buildInitialFormData(formSchema)

const useFormStore = create((set, get) => ({
  formSchema,
  formData: initialFormData,
  activeTemplateId: DEFAULT_TEMPLATE_ID,
  selectedFieldId: null,
  selectedFieldSource: null,
  selectedFieldToken: 0,
  validationErrors: {},
  zoom: DEFAULT_ZOOM,

  setFieldValue: (fieldId, value) =>
    set((state) => {
      const nextFormData = {
        ...state.formData,
        [fieldId]: value,
      }

      return {
        formData: nextFormData,
        selectedFieldId: fieldId,
        selectedFieldSource: 'form',
        validationErrors: removeFieldError(state.validationErrors, fieldId),
      }
    }),

  validateFieldValue: (fieldId) =>
    set((state) => {
      const error = getFieldValidationError(state.formSchema, state.formData, fieldId)
      const nextErrors = error
        ? assignFieldError(
            removeFieldError(state.validationErrors, fieldId),
            fieldId,
            error,
          )
        : removeFieldError(state.validationErrors, fieldId)

      return {
        validationErrors: nextErrors,
      }
    }),

  setListFieldValue: (fieldId, rowIndex, columnId, value) =>
    set((state) => {
      const currentRows = Array.isArray(state.formData[fieldId])
        ? state.formData[fieldId]
        : []
      const nextRows = currentRows.map((row, index) =>
        index === rowIndex ? { ...row, [columnId]: value } : row,
      )

        return {
          formData: {
            ...state.formData,
            [fieldId]: nextRows,
          },
          selectedFieldId: fieldId,
          selectedFieldSource: 'form',
          validationErrors: removeFieldError(state.validationErrors, fieldId),
        }
      }),

  appendListRow: (fieldId) =>
    set((state) => {
      const field = findFormFieldById(get().formSchema, fieldId)
      if (!field || field.fieldType !== 'list') {
        return {}
      }

      const currentRows = Array.isArray(state.formData[fieldId])
        ? state.formData[fieldId]
        : []

      return {
        formData: {
          ...state.formData,
          [fieldId]: [...currentRows, buildInitialListRow(field)],
        },
        selectedFieldId: fieldId,
        selectedFieldSource: 'form',
        validationErrors: removeFieldError(state.validationErrors, fieldId),
      }
    }),

  removeListRow: (fieldId, rowIndex) =>
    set((state) => {
      const currentRows = Array.isArray(state.formData[fieldId])
        ? state.formData[fieldId]
        : []

      return {
        formData: {
          ...state.formData,
          [fieldId]: currentRows.filter((_, index) => index !== rowIndex),
        },
        selectedFieldId: fieldId,
        selectedFieldSource: 'form',
        validationErrors: removeFieldError(state.validationErrors, fieldId),
      }
    }),

  setActiveTemplateId: (templateId) => set({ activeTemplateId: templateId }),

  setSelectedFieldId: (fieldId, source = 'system', options = {}) =>
    set((state) => ({
      selectedFieldId: fieldId,
      selectedFieldSource: source,
      selectedFieldToken: options.announce === false
        ? state.selectedFieldToken
        : state.selectedFieldToken + 1,
    })),

  setZoom: (zoom) => set({ zoom }),

  validateForm: () => {
    const fieldErrors = validateFields(get().formSchema, get().formData)
    set({ validationErrors: fieldErrors })

    if (Object.keys(fieldErrors).length > 0) {
      return {
        isValid: false,
        failedStage: 'validation',
        validationErrors: fieldErrors,
        ruleFailures: [],
      }
    }

    const ruleFailures = validateRules(get().formSchema, get().formData)

    return {
      isValid: ruleFailures.length === 0,
      failedStage: ruleFailures.length > 0 ? 'rules' : null,
      validationErrors: fieldErrors,
      ruleFailures,
    }
  },

  resetForm: () =>
    set(() => ({
      formData: buildInitialFormData(get().formSchema),
      validationErrors: {},
      selectedFieldId: null,
      selectedFieldSource: null,
    })),
}))

export default useFormStore

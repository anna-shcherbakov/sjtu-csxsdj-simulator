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

const validateRules = (schema, formData) => {
  if (!schema.rules?.length) {
    return {}
  }

  const errors = {}

  schema.rules.forEach((rule) => {
    if (rule.type !== 'required') {
      return
    }

    const value = formData[rule.field]
    const isEmpty =
      value === undefined ||
      value === null ||
      (typeof value === 'string' ? value.trim() === '' : value === '')

    if (isEmpty) {
      errors[rule.field] = rule.message
    }
  })

  return errors
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
    set((state) => ({
      formData: {
        ...state.formData,
        [fieldId]: value,
      },
      selectedFieldId: fieldId,
      selectedFieldSource: 'form',
      validationErrors: removeFieldError(state.validationErrors, fieldId),
    })),

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
    const ruleErrors = validateRules(get().formSchema, get().formData)
    const errors = {
      ...fieldErrors,
      ...ruleErrors,
    }
    set({ validationErrors: errors })

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
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

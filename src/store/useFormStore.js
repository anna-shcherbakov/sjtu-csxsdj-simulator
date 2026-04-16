import { create } from 'zustand'
import {
  buildInitialFormData,
  buildInitialListRow,
  findFormFieldById,
  flattenFormFields,
  formSchema,
} from '../data/formSchema'
import { isConditionallyOptionalFieldInactive } from '../data/formSchemaRules.js'
import {
  DEFAULT_TEMPLATE_ID,
  DEFAULT_ZOOM,
  getTemplateFieldIds,
} from '../data/templates'

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

const isEmptyValue = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === 'string' ? value.trim() === '' : value === '')

const isEmptyListRow = (row) => {
  if (!row || typeof row !== 'object') {
    return true
  }

  return Object.values(row).every((cellValue) => isEmptyValue(cellValue))
}

const isMissingFieldValue = (field, value) => {
  if (field?.fieldType === 'list') {
    if (!Array.isArray(value) || value.length === 0) {
      return true
    }

    return value.every((row) => isEmptyListRow(row))
  }

  return isEmptyValue(value)
}

const isRuleOptionalGroupEmpty = (rule, formData) => {
  return isConditionallyOptionalFieldInactive(rule.field, formData)
}

const getRuleDependentFieldIds = (rule, formData, schema) => {
  if (typeof rule.getDependentFields === 'function') {
    return rule.getDependentFields(formData, rule, schema) ?? []
  }

  return Array.isArray(rule.dependentFields) ? rule.dependentFields : []
}

const getRuleDependencyErrorMessage = (schema, rule, missingFieldIds, formData) => {
  if (typeof rule.getMissingDependencyMessage === 'function') {
    return rule.getMissingDependencyMessage(missingFieldIds, schema, rule, formData)
  }

  const targetLabel = findFormFieldById(schema, rule.field)?.label ?? rule.field
  const missingLabels = [...new Set(missingFieldIds)]
    .map((fieldId) => findFormFieldById(schema, fieldId)?.label ?? fieldId)
    .join('、')

  return `校验“${targetLabel}”前请先填写：${missingLabels}`
}

const getSuppressedMissingFieldIds = (
  schema,
  formData,
  fieldIds,
) => {
  const targetFieldIds = new Set(fieldIds)
  return new Set(
    [...targetFieldIds].filter((fieldId) =>
      isConditionallyOptionalFieldInactive(fieldId, formData),
    ),
  )
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
    if (isRuleOptionalGroupEmpty(rule, formData)) {
      return
    }

    if (rule.type === 'required') {
      const value = formData[rule.field]
      const isEmpty = isEmptyValue(value)

      if (isEmpty) {
        assignRuleError(rule.field, rule.message)
      }

      return
    }

    if (typeof rule.validate !== 'function') {
      return
    }

    const dependentFieldIds = getRuleDependentFieldIds(rule, formData, schema)
    const missingFieldIds = dependentFieldIds.filter((fieldId) =>
      isEmptyValue(formData[fieldId]),
    )

    if (missingFieldIds.length > 0) {
      assignRuleError(
        rule.field,
        getRuleDependencyErrorMessage(schema, rule, missingFieldIds, formData),
      )
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
  if (isConditionallyOptionalFieldInactive(field.id, formData)) {
    return null
  }

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

const validateFieldsByFieldIds = (schema, formData, fieldIds) =>
  [...new Set(fieldIds)].reduce((errors, fieldId) => {
    const field = findFormFieldById(schema, fieldId)

    if (!field) {
      return errors
    }

    const error = validateField(field, formData)

    if (error) {
      errors[field.id] = error
    }

    return errors
  }, {})

const getMissingFieldFailures = (schema, formData, fieldIds) => {
  const suppressedFieldIds = getSuppressedMissingFieldIds(
    schema,
    formData,
    fieldIds,
  )

  return [...new Set(fieldIds)].reduce((failures, fieldId) => {
    if (suppressedFieldIds.has(fieldId)) {
      return failures
    }

    const field = findFormFieldById(schema, fieldId)

    if (!field || !isMissingFieldValue(field, formData[field.id])) {
      return failures
    }

    return [
      ...failures,
      {
        fieldId: field.id,
        message:
          field.fieldType === 'list'
            ? `请至少填写一条“${field.label}”`
            : `请填写“${field.label}”`,
      },
    ]
  }, [])
}

const dedupeRuleFailures = (failures) => {
  const seen = new Set()

  return failures.filter((failure) => {
    const key = `${failure.fieldId}::${failure.message}`

    if (seen.has(key)) {
      return false
    }

    seen.add(key)
    return true
  })
}

const validateRulesForFieldIds = (schema, formData, fieldIds) => {
  if (!schema.rules?.length) {
    return []
  }

  const allowedFieldIds = new Set(fieldIds)
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
    const dependentFieldIds = getRuleDependentFieldIds(rule, formData, schema)
    const referencedFieldIds = [
      ...new Set([rule.field, ...dependentFieldIds].filter(Boolean)),
    ]

    if (
      referencedFieldIds.length === 0 ||
      !referencedFieldIds.every((fieldId) => allowedFieldIds.has(fieldId))
    ) {
      return
    }

    if (isRuleOptionalGroupEmpty(rule, formData)) {
      return
    }

    if (rule.type === 'required') {
      const value = formData[rule.field]
      const isEmpty = isEmptyValue(value)

      if (isEmpty) {
        assignRuleError(rule.field, rule.message)
      }

      return
    }

    if (typeof rule.validate !== 'function') {
      return
    }

    const missingFieldIds = dependentFieldIds.filter((fieldId) =>
      isEmptyValue(formData[fieldId]),
    )

    if (missingFieldIds.length > 0) {
      assignRuleError(
        rule.field,
        getRuleDependencyErrorMessage(schema, rule, missingFieldIds, formData),
      )
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

const cloneFormData = (formData) =>
  Object.fromEntries(
    Object.entries(formData).map(([fieldId, value]) => [
      fieldId,
      Array.isArray(value)
        ? value.map((row) => ({ ...row }))
        : value && typeof value === 'object'
          ? { ...value }
          : value,
    ]),
  )

const createImportedProfileId = () =>
  globalThis.crypto?.randomUUID?.() ??
  `imported-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

const getImportedProfileBranchName = (formData) =>
  formData['basic.当前管理支部名'] ||
  formData['talk.入党谈话时所属党支部'] ||
  formData['candidate.确定发展对象时支部名称'] ||
  formData['probationary.预备党员时所在党支部'] ||
  ''

const buildImportedProfileMeta = (formData, source = {}) => ({
  name: formData['basic.姓名'] || '未命名人员',
  studentId: formData['basic.学号'] || '',
  status: formData['basic.当前发展状态'] || '',
  branchName: getImportedProfileBranchName(formData),
  sheetName: source.sheetName ?? '',
  rowStart: source.rowStart ?? null,
  rowEnd: source.rowEnd ?? null,
  blockIndex: source.blockIndex ?? null,
})

const initialFormData = buildInitialFormData(formSchema)

const useFormStore = create((set, get) => ({
  formSchema,
  formData: initialFormData,
  importedProfiles: [],
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

  appendImportedProfiles: (records) =>
    set((state) => ({
      importedProfiles: [
        ...state.importedProfiles,
        ...records.map((record) => {
          const nextFormData = cloneFormData(record.formData ?? initialFormData)

          return {
            id: createImportedProfileId(),
            formData: nextFormData,
            source: { ...(record.source ?? {}) },
            meta: buildImportedProfileMeta(nextFormData, record.source),
          }
        }),
      ],
    })),

  removeImportedProfile: (profileId) =>
    set((state) => ({
      importedProfiles: state.importedProfiles.filter(
        (profile) => profile.id !== profileId,
      ),
    })),

  clearImportedProfiles: () => set({ importedProfiles: [] }),

  loadImportedProfileToForm: (profileId) => {
    const profile = get().importedProfiles.find((item) => item.id === profileId)

    if (!profile) {
      return null
    }

    const nextFormData = cloneFormData(profile.formData)

    set({
      formData: nextFormData,
      validationErrors: {},
      selectedFieldId: null,
      selectedFieldSource: null,
    })

    return profile
  },

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

  validateCurrentTemplate: () => {
    const { activeTemplateId, formData, formSchema } = get()
    const templateFieldIds = getTemplateFieldIds(activeTemplateId).filter((fieldId) =>
      Boolean(findFormFieldById(formSchema, fieldId)),
    )
    const fieldErrors = validateFieldsByFieldIds(
      formSchema,
      formData,
      templateFieldIds,
    )

    set({ validationErrors: fieldErrors })

    if (Object.keys(fieldErrors).length > 0) {
      return {
        isValid: false,
        failedStage: 'validation',
        validationErrors: fieldErrors,
        ruleFailures: [],
      }
    }

    const missingFieldFailures = getMissingFieldFailures(
      formSchema,
      formData,
      templateFieldIds,
    )
    const ruleFailures = validateRulesForFieldIds(
      formSchema,
      formData,
      templateFieldIds,
    )
    const mergedRuleFailures = dedupeRuleFailures([
      ...missingFieldFailures,
      ...ruleFailures,
    ])

    return {
      isValid: mergedRuleFailures.length === 0,
      failedStage: mergedRuleFailures.length > 0 ? 'rules' : null,
      validationErrors: fieldErrors,
      ruleFailures: mergedRuleFailures,
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

import { memo } from 'react'
import {
  AppstoreOutlined,
  DeleteOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'
import { Button, Form, Input, Popover, Radio, Select, Tag, Tooltip } from 'antd'
import clsx from 'clsx'
import { getTemplateReferenceStatuses } from '../../data/templates'
import useFormStore from '../../store/useFormStore'
import styles from './FormFieldRenderer.module.css'

const { TextArea } = Input

const TEMPLATE_REFERENCE_TAG_VARIANTS = {
  'party-applicant-document':
    styles['template-reference-tag--party-applicant-document'],
  'party-training-inspection-book':
    styles['template-reference-tag--party-training-inspection-book'],
  'party-training-inspection-book-v2':
    styles['template-reference-tag--party-training-inspection-book-v2'],
  'party-application-wish-book':
    styles['template-reference-tag--party-application-wish-book'],
}

const normalizeOptions = (options = []) =>
  options.map((option) =>
    typeof option === 'string' ? { label: option, value: option } : option,
  )

function FieldHelpLabel({ label, description }) {
  const stopHelpEvent = (event) => {
    event.stopPropagation()
  }

  return (
    <span className={styles['schema-field-label']}>
      <span>{label}</span>
      <Tooltip title={description || '暂无填写说明'}>
        <QuestionCircleOutlined
          className={styles['schema-field-label__icon']}
          onClick={stopHelpEvent}
          onMouseDown={stopHelpEvent}
        />
      </Tooltip>
    </span>
  )
}

function TemplateReferenceHelp({ fieldId }) {
  if (!fieldId) {
    return null
  }

  const templateStatuses = getTemplateReferenceStatuses(fieldId).filter(
    (template) => template.referenced,
  )

  const stopHelpEvent = (event) => {
    event.stopPropagation()
  }

  return (
    <Popover
      content={
        <div className={styles['template-reference-popover']}>
          <div className={styles['template-reference-popover__title']}>
            已引用此字段的模板
          </div>
          <div className={styles['template-reference-popover__tags']}>
            {templateStatuses.length ? (
              templateStatuses.map((template) => (
                <Tag
                  bordered={false}
                  className={clsx(
                    styles['template-reference-tag'],
                    TEMPLATE_REFERENCE_TAG_VARIANTS[template.id],
                  )}
                  key={template.id}
                >
                  {template.displayLabel}
                </Tag>
              ))
            ) : (
              <span className={styles['template-reference-popover__empty']}>
                当前没有模板引用此字段
              </span>
            )}
          </div>
        </div>
      }
      trigger="hover"
    >
      <span
        className={styles['schema-field-label__icon-button']}
        onClick={stopHelpEvent}
        onMouseDown={stopHelpEvent}
      >
        <AppstoreOutlined className={styles['schema-field-label__icon']} />
      </span>
    </Popover>
  )
}

function FieldLabelWithHelp({ description, fieldId, label }) {
  return (
    <span className={styles['schema-field-label']}>
      <span>{label}</span>
      <Tooltip title={description || '暂无填写说明'}>
        <span
          className={styles['schema-field-label__icon-button']}
          onClick={(event) => event.stopPropagation()}
          onMouseDown={(event) => event.stopPropagation()}
        >
          <QuestionCircleOutlined className={styles['schema-field-label__icon']} />
        </span>
      </Tooltip>
      <TemplateReferenceHelp fieldId={fieldId} />
    </span>
  )
}

function renderScalarControl({ field, onChange, onComplete, onFocus, value }) {
  const fieldType = field.fieldType ?? 'input'

  if (fieldType === 'textarea') {
    return (
      <TextArea
        autoSize={{ minRows: 4, maxRows: 10 }}
        className={styles['schema-form__textarea']}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onComplete}
        onFocus={onFocus}
        placeholder={field.placeholder}
        value={value}
      />
    )
  }

  if (fieldType === 'select') {
    return (
      <Select
        allowClear
        className={styles['schema-form__select']}
        onChange={(nextValue) => {
          onChange(nextValue ?? '')
          onComplete?.()
        }}
        onFocus={onFocus}
        options={normalizeOptions(field.options)}
        placeholder={field.placeholder}
        value={value || undefined}
      />
    )
  }

  if (fieldType === 'radio') {
    return (
      <Radio.Group
        className={styles['schema-form__radio-group']}
        onChange={(event) => {
          onChange(event.target.value ?? '')
          onComplete?.()
        }}
        onFocus={onFocus}
        options={normalizeOptions(field.options)}
        value={value || undefined}
      />
    )
  }

  return (
    <Input
      className={styles['schema-form__input']}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onComplete}
      onFocus={onFocus}
      placeholder={field.placeholder}
      value={value}
    />
  )
}

function FormFieldRenderer({ field, domId }) {
  const value = useFormStore((state) =>
    field.fieldType === 'list'
      ? state.formData[field.id] ?? []
      : state.formData[field.id] ?? '',
  )
  const error = useFormStore((state) => state.validationErrors[field.id])
  const isSelected = useFormStore(
    (state) => state.selectedFieldId === field.id,
  )
  const setFieldValue = useFormStore((state) => state.setFieldValue)
  const validateFieldValue = useFormStore((state) => state.validateFieldValue)
  const setListFieldValue = useFormStore((state) => state.setListFieldValue)
  const appendListRow = useFormStore((state) => state.appendListRow)
  const removeListRow = useFormStore((state) => state.removeListRow)
  const setSelectedFieldId = useFormStore((state) => state.setSelectedFieldId)

  const handleSelectField = () => {
    setSelectedFieldId(field.id, 'form')
  }

  const handleAddListRow = (event) => {
    event.stopPropagation()
    appendListRow(field.id)
  }

  const renderListField = () => {
    const rows = Array.isArray(value) ? value : []

    return (
      <div className={styles['list-field']}>
        <div className={styles['list-field__toolbar']}>
          <Button
            icon={<PlusOutlined />}
            onClick={handleAddListRow}
            size="small"
            type="dashed"
          >
            新增一行
          </Button>
        </div>

        <div className={styles['list-field__table-wrap']}>
          <table className={styles['list-field__table']}>
            <thead>
              <tr>
                {field.columns.map((column) => (
                  <th key={column.id}>
                    <FieldHelpLabel
                      description={column.description}
                      label={column.label}
                    />
                  </th>
                ))}
                <th className={styles['list-field__actions']}>操作</th>
              </tr>
            </thead>
            <tbody>
              {rows.length ? (
                rows.map((row, rowIndex) => (
                  <tr key={`${field.id}-${rowIndex}`}>
                    {field.columns.map((column) => (
                      <td key={column.id}>
                        {renderScalarControl({
                          field: column,
                          onChange: (nextValue) =>
                            setListFieldValue(
                              field.id,
                              rowIndex,
                              column.id,
                              nextValue,
                            ),
                          onComplete: undefined,
                          onFocus: handleSelectField,
                          value: row?.[column.id] ?? '',
                        })}
                      </td>
                    ))}
                    <td className={styles['list-field__actions']}>
                      <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={(event) => {
                          event.stopPropagation()
                          removeListRow(field.id, rowIndex)
                        }}
                        size="small"
                        type="text"
                      >
                        删除
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className={styles['list-field__empty-cell']}
                    colSpan={field.columns.length + 1}
                  >
                    <div className={styles['list-field__empty']}>
                      暂无数据，点击“新增一行”开始填写。
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const control =
    field.fieldType === 'list'
      ? renderListField()
      : renderScalarControl({
          field,
          onChange: (nextValue) => setFieldValue(field.id, nextValue),
          onComplete: () => validateFieldValue(field.id),
          onFocus: handleSelectField,
          value,
        })

  return (
    <div
      className={clsx(styles['form-field-card'], {
        [styles['has-error']]: Boolean(error),
        [styles['is-selected']]: isSelected,
      })}
      data-field-id={field.id}
      id={domId}
      onClick={handleSelectField}
    >
      <Form.Item
        className={styles['schema-form__item']}
        help={error || null}
        label={
          <FieldLabelWithHelp
            description={field.description}
            fieldId={field.id}
            label={field.label}
          />
        }
        validateStatus={error ? 'error' : undefined}
      >
        {control}
      </Form.Item>
    </div>
  )
}

export default memo(FormFieldRenderer)

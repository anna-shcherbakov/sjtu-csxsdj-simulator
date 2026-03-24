import {
  DeleteOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'
import { Button, Form, Input, Radio, Select, Tooltip } from 'antd'
import clsx from 'clsx'
import useFormStore from '../store/useFormStore'

const { TextArea } = Input

const normalizeOptions = (options = []) =>
  options.map((option) =>
    typeof option === 'string' ? { label: option, value: option } : option,
  )

function FieldHelpLabel({ label, description }) {
  return (
    <span className="schema-field-label">
      <span>{label}</span>
      <Tooltip title={description || '暂无填写说明'}>
        <QuestionCircleOutlined
          className="schema-field-label__icon"
          onClick={(event) => event.stopPropagation()}
        />
      </Tooltip>
    </span>
  )
}

function renderScalarControl({ field, onChange, onFocus, value }) {
  const fieldType = field.fieldType ?? 'input'

  if (fieldType === 'textarea') {
    return (
      <TextArea
        autoSize={{ minRows: 3, maxRows: 7 }}
        onChange={(event) => onChange(event.target.value)}
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
        onChange={(nextValue) => onChange(nextValue ?? '')}
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
        className="schema-form__radio-group"
        onChange={(event) => onChange(event.target.value ?? '')}
        onFocus={onFocus}
        options={normalizeOptions(field.options)}
        value={value || undefined}
      />
    )
  }

  return (
    <Input
      onChange={(event) => onChange(event.target.value)}
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
  const selectedFieldId = useFormStore((state) => state.selectedFieldId)
  const setFieldValue = useFormStore((state) => state.setFieldValue)
  const setListFieldValue = useFormStore((state) => state.setListFieldValue)
  const appendListRow = useFormStore((state) => state.appendListRow)
  const removeListRow = useFormStore((state) => state.removeListRow)
  const setSelectedFieldId = useFormStore((state) => state.setSelectedFieldId)

  const isSelected = selectedFieldId === field.id

  const handleSelectField = () => {
    setSelectedFieldId(field.id)
  }

  const handleAddListRow = (event) => {
    event.stopPropagation()
    appendListRow(field.id)
  }

  const renderListField = () => {
    const rows = Array.isArray(value) ? value : []

    return (
      <div className="list-field">
        <div className="list-field__toolbar">
          <Button
            icon={<PlusOutlined />}
            onClick={handleAddListRow}
            size="small"
            type="dashed"
          >
            新增一行
          </Button>
        </div>

        <div className="list-field__table-wrap">
          <table className="list-field__table">
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
                <th className="list-field__actions">操作</th>
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
                          onFocus: handleSelectField,
                          value: row?.[column.id] ?? '',
                        })}
                      </td>
                    ))}
                    <td className="list-field__actions">
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
                    className="list-field__empty-cell"
                    colSpan={field.columns.length + 1}
                  >
                    <div className="list-field__empty">
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
          onFocus: handleSelectField,
          value,
        })

  return (
    <div
      className={clsx('form-field-card', {
        'has-error': Boolean(error),
        'is-selected': isSelected,
      })}
      data-field-id={field.id}
      id={domId}
      onClick={handleSelectField}
    >
      <div className="form-field-card__meta">
        <span className="form-field-card__code">{field.id}</span>
      </div>
      <Form.Item
        className="schema-form__item"
        help={error || null}
        label={
          <FieldHelpLabel
            description={field.description}
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

export default FormFieldRenderer

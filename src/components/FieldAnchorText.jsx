import clsx from 'clsx'
import useFormStore from '../store/useFormStore'

const isValueEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === 'string' ? value.trim() === '' : value === '')

function FieldAnchorText({ fieldId, value, className }) {
  const selectedFieldId = useFormStore((state) => state.selectedFieldId)
  const setSelectedFieldId = useFormStore((state) => state.setSelectedFieldId)
  const empty = isValueEmpty(value)
  const displayValue = empty ? '\u00A0' : String(value)

  const handleSelect = (event) => {
    event.stopPropagation()
    setSelectedFieldId(fieldId)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setSelectedFieldId(fieldId)
    }
  }

  return (
    <span
      aria-label={`定位字段 ${fieldId}`}
      className={clsx('field-anchor-text', className, {
        'field-anchor-text--empty': empty,
        'field-anchor-text--selected': selectedFieldId === fieldId,
      })}
      data-field-id={fieldId}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      title="点击后定位到左侧表单"
    >
      {displayValue}
    </span>
  )
}

export default FieldAnchorText

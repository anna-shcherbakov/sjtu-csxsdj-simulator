import { memo } from 'react'
import clsx from 'clsx'
import useFormStore from '../../store/useFormStore'
import styles from './FieldAnchorText.module.css'

const isValueEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === 'string' ? value.trim() === '' : value === '')

function FieldAnchorText({
  fieldId,
  value,
  className,
  emptyClassName,
  selectedClassName,
}) {
  const isSelected = useFormStore((state) => state.selectedFieldId === fieldId)
  const setSelectedFieldId = useFormStore((state) => state.setSelectedFieldId)
  const empty = isValueEmpty(value)
  const displayValue = empty ? '\u00A0' : String(value)

  const handleSelect = (event) => {
    event.stopPropagation()
    setSelectedFieldId(fieldId, 'preview')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setSelectedFieldId(fieldId, 'preview')
    }
  }

  return (
    <span
      aria-label={`定位字段 ${fieldId}`}
      className={clsx(
        styles['field-anchor-text'],
        className,
        empty && styles['field-anchor-text--empty'],
        empty && emptyClassName,
        isSelected && styles['field-anchor-text--selected'],
        isSelected && selectedClassName,
      )}
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

export default memo(FieldAnchorText)

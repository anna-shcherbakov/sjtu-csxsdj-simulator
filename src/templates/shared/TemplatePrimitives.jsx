import clsx from 'clsx'
import FieldAnchorText from '../../components/shared/FieldAnchorText'

export function TemplateField({
  baseClassName,
  className,
  emptyClassName,
  selectedClassName,
  ...props
}) {
  return (
    <FieldAnchorText
      {...props}
      className={clsx(baseClassName, className)}
      emptyClassName={emptyClassName}
      selectedClassName={selectedClassName}
    />
  )
}

export function TemplateLineField({
  anchorClassName,
  baseClassName,
  className,
  emptyClassName,
  fieldId,
  selectedClassName,
  value,
}) {
  return (
    <span className={className}>
      <TemplateField
        baseClassName={baseClassName}
        className={anchorClassName}
        emptyClassName={emptyClassName}
        fieldId={fieldId}
        selectedClassName={selectedClassName}
        value={value}
      />
    </span>
  )
}

export function VerticalText({ className, text }) {
  return (
    <div className={className}>
      {Array.from(text).map((char, index) => (
        <span key={`${char}-${index}`}>{char === ' ' ? '\u00A0' : char}</span>
      ))}
    </div>
  )
}

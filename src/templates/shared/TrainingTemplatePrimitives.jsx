import A4Page from '../../components/shared/A4Page'
import {
  TemplateField,
  TemplateLineField,
  VerticalText,
} from './TemplatePrimitives'

export function TrainingField({ c, className, ...props }) {
  return (
    <TemplateField
      {...props}
      baseClassName={c('training-field-anchor')}
      className={className}
      emptyClassName={c('training-field-anchor--empty')}
      selectedClassName={c('training-field-anchor--selected')}
    />
  )
}

export function TrainingLineField({ c, className, fieldId, value }) {
  return (
    <TemplateLineField
      anchorClassName={c('training-field-anchor--line')}
      baseClassName={c('training-field-anchor')}
      className={className}
      emptyClassName={c('training-field-anchor--empty')}
      fieldId={fieldId}
      selectedClassName={c('training-field-anchor--selected')}
      value={value}
    />
  )
}

export function TrainingCoverPage({
  c,
  fields,
  imprint,
  title,
  variant,
  zoom,
}) {
  return (
    <A4Page
      className={c('training-template-page')}
      contentClassName={c('training-cover-page', `training-cover-page--${variant}`)}
      zoom={zoom}
    >
      <h2
        className={c(
          'training-cover-page__title',
          `training-cover-page__title--${variant}`,
        )}
      >
        {title}
      </h2>

      <div
        className={c(
          'training-cover-page__info',
          `training-cover-page__info--${variant}`,
        )}
      >
        {fields.map((field) => (
          <div
            className={c('training-cover-line', `training-cover-line--${variant}`)}
            key={field.label}
          >
            <div
              className={c(
                'training-cover-line__label',
                `training-cover-line__label--${variant}`,
                field.compact && 'training-cover-line__label--compact',
              )}
            >
              {field.label}
            </div>
            {field.fixedText ? (
              <div
                className={c(
                  'training-cover-line__content',
                  'training-cover-line__content--fixed',
                  `training-cover-line__content--${variant}`,
                )}
              >
                {field.fixedText}
              </div>
            ) : (
              <TrainingLineField
                c={c}
                className={c(
                  'training-cover-line__content',
                  `training-cover-line__content--${variant}`,
                )}
                fieldId={field.fieldId}
                value={field.value}
              />
            )}
          </div>
        ))}
      </div>

      <div
        className={c(
          'training-cover-page__imprint',
          `training-cover-page__imprint--${variant}`,
        )}
      >
        {imprint}
      </div>
    </A4Page>
  )
}

export function TrainingInstructionsPage({
  c,
  footer,
  sections,
  titleStyle,
  variant,
  zoom,
}) {
  return (
    <A4Page
      className={c('training-template-page')}
      contentClassName={c(
        'training-instructions-page',
        `training-instructions-page--${variant}`,
      )}
      zoom={zoom}
    >
      <h2
        className={c(
          'training-page-title',
          `training-page-title--${variant}-instructions`,
        )}
        style={titleStyle}
      >
        填写说明
      </h2>

      <div
        className={c(
          'training-instruction-sections',
          `training-instruction-sections--${variant}`,
        )}
      >
        {sections.map((section) => (
          <div
            className={c(
              'training-instruction-section',
              `training-instruction-section--${variant}`,
            )}
            key={section.marker}
          >
            <div
              className={c(
                'training-instruction-section__marker',
                `training-instruction-section__marker--${variant}`,
              )}
            >
              {section.marker}
            </div>
            <div
              className={c(
                'training-instruction-section__content',
                `training-instruction-section__content--${variant}`,
              )}
            >
              {section.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        className={c(
          'training-instructions-footer',
          `training-instructions-footer--${variant}`,
        )}
      >
        {footer}
      </div>
    </A4Page>
  )
}

export function TrainingVerticalFramePage({
  c,
  children,
  columnWidth,
  title,
  zoom,
}) {
  return (
    <A4Page
      className={c('training-template-page')}
      contentClassName={c('training-opinion-page')}
      zoom={zoom}
    >
      <table className={c('training-large-opinion-table')}>
        {columnWidth ? (
          <colgroup>
            <col style={{ width: columnWidth }} />
            <col />
          </colgroup>
        ) : null}
        <tbody>
          <tr>
            <td className={c('training-vertical-cell')}>
              <VerticalText
                className={c(
                  'training-vertical-text',
                  'training-vertical-text--long',
                )}
                text={title}
              />
            </td>
            <td className={c('training-opinion-cell')}>{children}</td>
          </tr>
        </tbody>
      </table>
    </A4Page>
  )
}

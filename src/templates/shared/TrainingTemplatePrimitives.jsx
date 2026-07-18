import A4Page from "../../components/shared/A4Page";
import {
  TemplateField,
  TemplateLineField,
  VerticalText,
} from "./TemplatePrimitives";

export function TrainingField({ c, className, ...props }) {
  return (
    <TemplateField
      {...props}
      baseClassName={c("training-field-anchor")}
      className={className}
      emptyClassName={c("training-field-anchor--empty")}
      selectedClassName={c("training-field-anchor--selected")}
    />
  );
}

export function TrainingLineField({ c, className, fieldId, value }) {
  return (
    <TemplateLineField
      anchorClassName={c("training-field-anchor--line")}
      baseClassName={c("training-field-anchor")}
      className={className}
      emptyClassName={c("training-field-anchor--empty")}
      fieldId={fieldId}
      selectedClassName={c("training-field-anchor--selected")}
      value={value}
    />
  );
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
      className={c("training-template-page")}
      contentClassName={c(
        "training-cover-page",
        `training-cover-page--${variant}`,
      )}
      zoom={zoom}
    >
      <h2
        className={c(
          "training-cover-page__title",
          `training-cover-page__title--${variant}`,
        )}
      >
        {title}
      </h2>

      <div
        className={c(
          "training-cover-page__info",
          `training-cover-page__info--${variant}`,
        )}
      >
        {fields.map((field) => (
          <div
            className={c(
              "training-cover-line",
              `training-cover-line--${variant}`,
            )}
            key={field.label}
          >
            <div
              className={c(
                "training-cover-line__label",
                `training-cover-line__label--${variant}`,
                field.compact && "training-cover-line__label--compact",
              )}
            >
              {field.label}
            </div>
            {field.fixedText ? (
              <div
                className={c(
                  "training-cover-line__content",
                  "training-cover-line__content--fixed",
                  `training-cover-line__content--${variant}`,
                )}
              >
                {field.fixedText}
              </div>
            ) : (
              <TrainingLineField
                c={c}
                className={c(
                  "training-cover-line__content",
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
          "training-cover-page__imprint",
          `training-cover-page__imprint--${variant}`,
        )}
      >
        {imprint}
      </div>
    </A4Page>
  );
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
      className={c("training-template-page")}
      contentClassName={c(
        "training-instructions-page",
        `training-instructions-page--${variant}`,
      )}
      zoom={zoom}
    >
      <h2
        className={c(
          "training-page-title",
          `training-page-title--${variant}-instructions`,
        )}
        style={titleStyle}
      >
        填写说明
      </h2>

      <div
        className={c(
          "training-instruction-sections",
          `training-instruction-sections--${variant}`,
        )}
      >
        {sections.map((section) => (
          <div
            className={c(
              "training-instruction-section",
              `training-instruction-section--${variant}`,
            )}
            key={section.marker}
          >
            <div
              className={c(
                "training-instruction-section__marker",
                `training-instruction-section__marker--${variant}`,
              )}
            >
              {section.marker}
            </div>
            <div
              className={c(
                "training-instruction-section__content",
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
          "training-instructions-footer",
          `training-instructions-footer--${variant}`,
        )}
      >
        {footer}
      </div>
    </A4Page>
  );
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
      className={c("training-template-page")}
      contentClassName={c("training-opinion-page")}
      zoom={zoom}
    >
      <table className={c("training-large-opinion-table")}>
        {columnWidth ? (
          <colgroup>
            <col style={{ width: columnWidth }} />
            <col />
          </colgroup>
        ) : null}
        <tbody>
          <tr>
            <td className={c("training-vertical-cell")}>
              <VerticalText
                className={c(
                  "training-vertical-text",
                  "training-vertical-text--long",
                )}
                text={title}
              />
            </td>
            <td className={c("training-opinion-cell")}>{children}</td>
          </tr>
        </tbody>
      </table>
    </A4Page>
  );
}

export function TrainingOpinionSignoff({
  c,
  dateFieldId,
  dateValue,
  signatureLabel,
  stackSignature = false,
}) {
  if (stackSignature) {
    return (
      <div
        className={c(
          "training-opinion-signoff",
          "training-opinion-signoff--probationary-stacked",
        )}
      >
        <div
          className={c(
            "training-opinion-signoff__row",
            "training-opinion-signoff__row--probationary-stacked",
          )}
        >
          <span>{signatureLabel}</span>
          <span
            className={c(
              "training-signature-placeholder",
              "training-signature-placeholder--wide",
            )}
          />
        </div>
        <div
          className={c(
            "training-opinion-signoff__row",
            "training-opinion-signoff__row--probationary-stacked",
          )}
        >
          <span>日期：</span>
          <TrainingLineField
            c={c}
            className={c(
              "training-signature-line",
              "training-signature-line--date",
            )}
            fieldId={dateFieldId}
            value={dateValue}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={c(
        "training-inline-signature",
        "training-inline-signature--right",
      )}
    >
      <span>{signatureLabel}</span>
      <span
        className={c(
          "training-signature-placeholder",
          "training-signature-placeholder--wide",
        )}
      />
      <span>日期：</span>
      <TrainingLineField
        c={c}
        className={c(
          "training-signature-line",
          "training-signature-line--date",
        )}
        fieldId={dateFieldId}
        value={dateValue}
      />
    </div>
  );
}

export function TrainingOpinionPage({
  blank = false,
  c,
  columnWidth,
  dateFieldId,
  dateValue,
  formData,
  layoutVariant = "probationary",
  opinionFieldId,
  opinionValue,
  showSignatureLine = true,
  signatureFieldId,
  signatureLabel,
  stackDateBelow = false,
  stackSignature = false,
  title,
  zoom,
}) {
  const resolvedDateValue = dateValue ?? formData?.[dateFieldId];
  const resolvedOpinionValue = opinionValue ?? formData?.[opinionFieldId];
  const resolvedSignatureValue = formData?.[signatureFieldId];

  if (layoutVariant === "activist") {
    return (
      <TrainingVerticalFramePage
        c={c}
        columnWidth={columnWidth}
        title={title}
        zoom={zoom}
      >
        <div className={c("training-opinion-layout")}>
          <TrainingField
            c={c}
            className={c(
              "training-field-anchor--block",
              "training-field-anchor--opinion",
            )}
            fieldId={opinionFieldId}
            value={resolvedOpinionValue}
          />

          <div
            className={c(
              "training-inline-signature",
              "training-inline-signature--right",
            )}
          >
            <span>{signatureLabel}</span>
            {showSignatureLine ? (
              signatureFieldId ? (
                <TrainingLineField
                  c={c}
                  className={c(
                    "training-signature-line",
                    "training-signature-line--medium",
                  )}
                  fieldId={signatureFieldId}
                  value={resolvedSignatureValue}
                />
              ) : (
                <span
                  className={c(
                    "training-signature-placeholder",
                    "training-signature-placeholder--wide",
                  )}
                />
              )
            ) : null}
            {stackDateBelow ? (
              <span className={c("training-inline-signature__break")} />
            ) : null}
            <span>日期：</span>
            <TrainingLineField
              c={c}
              className={c(
                "training-signature-line",
                "training-signature-line--date",
              )}
              fieldId={dateFieldId}
              value={resolvedDateValue}
            />
          </div>
        </div>
      </TrainingVerticalFramePage>
    );
  }

  return (
    <TrainingVerticalFramePage c={c} title={title} zoom={zoom}>
      <div className={c("training-opinion-layout")}>
        {blank ? (
          <div className={c("training-empty-body")} />
        ) : (
          <TrainingField
            c={c}
            className={c(
              "training-field-anchor--block",
              "training-field-anchor--opinion",
            )}
            fieldId={opinionFieldId}
            value={resolvedOpinionValue}
          />
        )}

        <TrainingOpinionSignoff
          c={c}
          dateFieldId={dateFieldId}
          dateValue={resolvedDateValue}
          signatureLabel={signatureLabel}
          stackSignature={stackSignature}
        />
      </div>
    </TrainingVerticalFramePage>
  );
}

export function TrainingQuarterSection({ c, formData, quarter, variant }) {
  const title =
    variant === "probationary" ? (
      <>
        <span>
          {quarter.label}（《{quarter.reportLabel}》所在季度起始月份
        </span>
        <TrainingField
          c={c}
          className={c("training-field-anchor--probationary-inline-plain")}
          fieldId={quarter.startMonthFieldId}
          value={formData[quarter.startMonthFieldId]}
        />
        <span>至《{quarter.reportLabel}》所在季度截止月份</span>
        <TrainingField
          c={c}
          className={c("training-field-anchor--probationary-inline-plain")}
          fieldId={quarter.endMonthFieldId}
          value={formData[quarter.endMonthFieldId]}
        />
        <span>）</span>
      </>
    ) : (
      <>
        <span>
          {quarter.label}（{quarter.reportLabel} 所在季度起始月份
        </span>
        <TrainingField
          c={c}
          className={c("training-field-anchor--inline-plain")}
          fieldId={quarter.startMonthFieldId}
          value={formData[quarter.startMonthFieldId]}
        />
        <span>至{quarter.reportLabel} 所在季度截止月份</span>
        <TrainingField
          c={c}
          className={c("training-field-anchor--inline-plain")}
          fieldId={quarter.endMonthFieldId}
          value={formData[quarter.endMonthFieldId]}
        />
        <span>）</span>
      </>
    );

  const body = (
    <div
      className={c(
        "training-quarter-opinion-layout",
        `training-quarter-opinion-layout--${variant}`,
      )}
    >
      <div
        className={c(
          "training-quarter-opinion-body",
          `training-quarter-opinion-body--${variant}`,
        )}
      >
        <TrainingField
          c={c}
          className={c(
            "training-field-anchor--block",
            "training-field-anchor--quarter-body",
            `training-field-anchor--quarter-body--${variant}`,
          )}
          fieldId={quarter.opinionFieldId}
          value={formData[quarter.opinionFieldId]}
        />
      </div>
      <div
        className={c(
          "training-quarter-evaluation",
          `training-quarter-evaluation--${variant}`,
        )}
      >
        {variant === "probationary"
          ? "本季度思想汇报综合评价： 本季度思想汇报已审核，合格"
          : "本季度思想汇报综合评价：本季度思想汇报已评价，合格。"}
      </div>
      <div
        className={c(
          "training-quarter-footer",
          `training-quarter-footer--${variant}`,
        )}
      >
        <div
          className={c(
            "training-quarter-signoff",
            `training-quarter-signoff--${variant}`,
          )}
        >
          <div
            className={c(
              "training-quarter-signoff__row",
              `training-quarter-signoff__row--${variant}`,
            )}
          >
            <span className={c("training-quarter-signoff__label")}>
              {variant === "probationary" ? "考察人签名：" : "联系人签字："}
            </span>
            <span
              className={c(
                "training-signature-placeholder",
                variant === "probationary" &&
                  "training-signature-placeholder--probationary-quarter",
              )}
            />
          </div>
          <div
            className={c(
              "training-quarter-signoff__row",
              `training-quarter-signoff__row--${variant}`,
            )}
          >
            <span className={c("training-quarter-signoff__label")}>日期：</span>
            <TrainingLineField
              c={c}
              className={c(
                "training-signature-line",
                "training-signature-line--date",
                variant === "probationary" &&
                  "training-signature-line--probationary-quarter",
              )}
              fieldId={quarter.dateFieldId}
              value={formData[quarter.dateFieldId]}
            />
          </div>
        </div>
      </div>
    </div>
  );

  if (variant === "probationary") {
    return (
      <section
        className={c(
          "training-quarter-section",
          "training-quarter-section--probationary",
        )}
      >
        <div
          className={c(
            "training-quarter-title-cell",
            "training-quarter-title-cell--probationary",
          )}
        >
          <div
            className={c(
              "training-quarter-title",
              "training-quarter-title--probationary",
            )}
          >
            {title}
          </div>
        </div>
        <div
          className={c(
            "training-quarter-opinion-cell",
            "training-quarter-opinion-cell--probationary",
          )}
        >
          {body}
        </div>
      </section>
    );
  }

  return (
    <>
      <tr>
        <td className={c("training-quarter-title-cell")}>
          <div className={c("training-quarter-title")}>{title}</div>
        </td>
      </tr>
      <tr>
        <td className={c("training-quarter-opinion-cell")}>{body}</td>
      </tr>
    </>
  );
}

export function TrainingQuarterPage({
  c,
  formData,
  pageTitle,
  quarters,
  variant,
  verticalTitle,
  zoom,
}) {
  if (variant === "activist") {
    return (
      <A4Page
        className={c("training-template-page")}
        contentClassName={c(
          "training-quarter-page",
          "training-quarter-page--activist",
        )}
        zoom={zoom}
      >
        <table
          style={{ margin: "96px 4px" }}
          className={c(
            "training-quarter-table",
            "training-quarter-table--activist",
          )}
        >
          <tbody>
            <tr>
              <td className={c("training-vertical-cell")} rowSpan={4}>
                <VerticalText
                  className={c("training-vertical-text")}
                  text={verticalTitle}
                />
              </td>
              <td className={c("training-quarter-block-cell")}>
                <table className={c("training-quarter-inner-table")}>
                  <tbody>
                    {quarters.map((quarter) => (
                      <TrainingQuarterSection
                        c={c}
                        formData={formData}
                        key={quarter.id}
                        quarter={quarter}
                        variant={variant}
                      />
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </A4Page>
    );
  }

  return (
    <A4Page
      className={c("training-template-page")}
      contentClassName={c(
        "training-quarter-page",
        "training-quarter-page--probationary",
        pageTitle
          ? "training-quarter-page--probationary-titled"
          : "training-quarter-page--probationary-untitled",
      )}
      zoom={zoom}
    >
      {pageTitle ? (
        <h2
          className={c(
            "training-page-title",
            "training-page-title--compact",
            "training-page-title--probationary-quarter",
          )}
        >
          {pageTitle}
        </h2>
      ) : null}
      <table
        className={c(
          "training-large-opinion-table",
          "training-quarter-record-table",
          "training-quarter-record-table--probationary",
        )}
      >
        <tbody>
          <tr>
            <td
              className={c(
                "training-vertical-cell",
                "training-vertical-cell--probationary-quarter",
              )}
            >
              <VerticalText
                className={c(
                  "training-vertical-text",
                  "training-vertical-text--long",
                  "training-vertical-text--probationary-quarter",
                )}
                text={verticalTitle}
              />
            </td>
            <td className={c("training-quarter-record-table__body")}>
              <div
                className={c(
                  "training-quarter-record-page",
                  "training-quarter-record-page--probationary",
                )}
              >
                <div
                  className={c(
                    "training-quarter-sections",
                    "training-quarter-sections--probationary",
                  )}
                >
                  {quarters.map((quarter) => (
                    <TrainingQuarterSection
                      c={c}
                      formData={formData}
                      key={quarter.id}
                      quarter={quarter}
                      variant={variant}
                    />
                  ))}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </A4Page>
  );
}

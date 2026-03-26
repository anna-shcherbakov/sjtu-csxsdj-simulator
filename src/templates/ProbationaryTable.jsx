import clsx from 'clsx'
import A4Page from '../components/shared/A4Page'
import FieldAnchorText from '../components/shared/FieldAnchorText'
import styles from './ProbationaryTable.module.css'
import sharedStyles from './templates.module.css'

const c = (...names) =>
  clsx(names.map((name) => styles[name] ?? sharedStyles[name]).filter(Boolean))

const INSTRUCTION_SECTIONS = [
  {
    marker: '一、',
    lines: [
      '发展对象经上级党委审批同意为预备党员后，开始填',
      '写此记录册。',
    ],
  },
  {
    marker: '二、',
    lines: [
      '填写须用黑色或蓝黑色墨水的钢笔或水笔。字迹清晰',
      '，内容真实。表内栏目没有内容填写的，应注明“无',
      '”。个别栏目填写不下时，可另加附页。表内所有需',
      '要填写的“日期”均需精确到日。',
    ],
  },
  {
    marker: '三、',
    lines: [
      '本登记表一般由入党介绍人保管。教育考察程序结束',
      '、履行完转正手续后，此册须交党组织归入本人档案',
      '。若预备党员调动单位时，本登记表应归入本人人事',
      '档案或转给新单位党组织。',
    ],
  },
]

const FIELD_IDS = {
  personName: 'basic.姓名',
  organizationOrClass: 'basic.班级',
  probationaryPartyBranch: 'probationary.预备党员时所在党支部',
  gender: 'basic.性别',
  birthYearMonth: 'basic.出生年月',
  nativePlace: 'basic.籍贯',
  educationLevel: 'probationary.文化程度',
  currentPosition: 'probationary.预备党员现任职务',
  partyApplicationDate: 'submit.入党申请书落款日期',
  activistDate: 'acknowledge.确定积极分子日期',
  developmentTargetDate: 'candidate.党委备案日期（确定发展对象日期）',
  branchMeetingApproveProbationaryDate: 'wish.支部大会通过预备的日期',
  probationaryInspectionEndDate: 'wish.预备党员考察期截止日期',
  inspector1Name: 'probationary.入党考察人1',
  inspector1Position: 'probationary.入党考察人1职务',
  inspector1FormalMember: 'probationary.入党考察人1是否正式党员',
  inspector2Name: 'probationary.入党考察人2',
  inspector2Position: 'probationary.入党考察人2职务',
  inspector2FormalMember: 'probationary.入党考察人2是否正式党员',
  committeeApprovalDate: 'wish.党委审批日期',
  oathDate: 'probationary.入党宣誓日期',
  oathLocation: 'probationary.入党宣誓地点',
  admissionStrengthsWeaknesses: 'probationary.入党时主要优缺点',
  basicInfoRemark: 'probationary.备注',
  quarter1StartMonth: 'season2_1.电子版（一）所在季度起始月份',
  quarter1EndMonth: 'season2_1.电子版（一）所在季度截止月份',
  inspectorOpinionQ1: 'season2_1.考察人意见（一）',
  inspectorOpinionQ1Date: 'season2_1.考察人意见（一）落款日期',
  quarter2StartMonth: 'season2_2.电子版（二）所在季度起始月份',
  quarter2EndMonth: 'season2_2.电子版（二）所在季度截止月份',
  inspectorOpinionQ2: 'season2_2.考察人意见（二）',
  inspectorOpinionQ2Date: 'season2_2.考察人意见（二）落款日期',
  branchOpinionHalfYear: 'season2_half.党支部意见（半年）',
  branchOpinionHalfYearDate: 'season2_half.党支部意见（半年）落款日期',
  quarter3StartMonth: 'season2_3.电子版（三）所在季度起始月份',
  quarter3EndMonth: 'season2_3.电子版（三）所在季度截止月份',
  inspectorOpinionQ3: 'season2_3.考察人意见（三）',
  inspectorOpinionQ3Date: 'season2_3.考察人意见（三）落款日期',
  quarter4StartMonth: 'season2_4.电子版（四）所在季度起始月份',
  quarter4EndMonth: 'season2_4.电子版（四）所在季度截止月份',
  inspectorOpinionQ4: 'season2_4.考察人意见（四）',
  inspectorOpinionQ4Date: 'season2_4.考察人意见（四）落款日期',
  publicConsultationDate: 'formal.群众座谈会日期',
  publicNoticeStartDate: 'formal.预备党员转正公示起始日期',
  publicNoticeEndDate: 'formal.预备党员转正公示结束日期',
  conversionResolutionDate: 'formal.支部大会通过预备党员能否转为正式党员的决议落款日期',
  preConversionBranchReviewOpinion: 'formal.预备党员转正前党支部审查意见（预备党员考察册结束）',
  preConversionBranchReviewOpinionDate: 'formal.预备党员转正前党支部审查意见落款日期',
}

const getFieldValue = (formData, fieldId) => formData[fieldId]

function VerticalText({ className, text }) {
  return (
    <div className={className}>
      {Array.from(text).map((char, index) => (
        <span key={`${char}-${index}`}>{char === ' ' ? '\u00A0' : char}</span>
      ))}
    </div>
  )
}

function InlineField({ fieldId, value, className }) {
  return (
    <FieldAnchorText
      className={clsx(c('training-field-anchor'), className)}
      emptyClassName={c('training-field-anchor--empty')}
      fieldId={fieldId}
      selectedClassName={c('training-field-anchor--selected')}
      value={value}
    />
  )
}

function LineField({ fieldId, value, className }) {
  return (
    <span className={className}>
      <InlineField
        className={c('training-field-anchor--line')}
        fieldId={fieldId}
        value={value}
      />
    </span>
  )
}

function TableCellField({ fieldId, value, className }) {
  return (
    <InlineField
      className={c('training-field-anchor--probationary-cell', className)}
      fieldId={fieldId}
      value={value}
    />
  )
}

function QuarterSection({
  dateFieldId,
  dateValue,
  endMonthFieldId,
  endMonthValue,
  opinionFieldId,
  opinionValue,
  quarterLabel,
  reportLabel,
  startMonthFieldId,
  startMonthValue,
}) {
  return (
    <section className={c('training-quarter-section', 'training-quarter-section--probationary')}>
      <div className={c('training-quarter-title-cell', 'training-quarter-title-cell--probationary')}>
        <div className={c('training-quarter-title', 'training-quarter-title--probationary')}>
          <span>{quarterLabel}（《{reportLabel}》所在季度起始月份</span>
          <InlineField
            className={c('training-field-anchor--probationary-inline-plain')}
            fieldId={startMonthFieldId}
            value={startMonthValue}
          />
          <span>至《{reportLabel}》所在季度截止月份</span>
          <InlineField
            className={c('training-field-anchor--probationary-inline-plain')}
            fieldId={endMonthFieldId}
            value={endMonthValue}
          />
          <span>）</span>
        </div>
      </div>
      <div className={c('training-quarter-opinion-cell', 'training-quarter-opinion-cell--probationary')}>
        <div className={c('training-quarter-opinion-layout', 'training-quarter-opinion-layout--probationary')}>
          <div className={c('training-quarter-opinion-body', 'training-quarter-opinion-body--probationary')}>
            <InlineField
              className={c('training-field-anchor--block', 'training-field-anchor--quarter-body', 'training-field-anchor--quarter-body--probationary')}
              fieldId={opinionFieldId}
              value={opinionValue}
            />
          </div>
          <div className={c('training-quarter-evaluation', 'training-quarter-evaluation--probationary')}>
            本季度思想汇报综合评价： 本季度思想汇报已审核，合格
          </div>
          <div className={c('training-quarter-footer', 'training-quarter-footer--probationary')}>
            <div className={c('training-quarter-signoff', 'training-quarter-signoff--probationary')}>
              <div className={c('training-quarter-signoff__row', 'training-quarter-signoff__row--probationary')}>
                <span className={c('training-quarter-signoff__label')}>考察人签名：</span>
                <span className={c('training-signature-placeholder', 'training-signature-placeholder--probationary-quarter')} />
              </div>
              <div className={c('training-quarter-signoff__row', 'training-quarter-signoff__row--probationary')}>
                <span className={c('training-quarter-signoff__label')}>日期：</span>
                <LineField
                  className={c('training-signature-line', 'training-signature-line--date', 'training-signature-line--probationary-quarter')}
                  fieldId={dateFieldId}
                  value={dateValue}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function VerticalFramePage({ children, title, zoom }) {
  return (
    <A4Page
      className={c('training-template-page')}
      contentClassName={c('training-opinion-page')}
      zoom={zoom}
    >
      <table className={c('training-large-opinion-table')}>
        <tbody>
          <tr>
            <td className={c('training-vertical-cell')}>
              <VerticalText
                className={c('training-vertical-text', 'training-vertical-text--long')}
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

function OpinionPage({
  dateFieldId,
  dateValue,
  opinionFieldId,
  opinionValue,
  signatureLabel,
  stackSignature = false,
  title,
  zoom,
}) {
  return (
    <VerticalFramePage title={title} zoom={zoom}>
      <div className={c('training-opinion-layout')}>
        <InlineField
          className={c('training-field-anchor--block', 'training-field-anchor--opinion')}
          fieldId={opinionFieldId}
          value={opinionValue}
        />

        {stackSignature ? (
          <div className={c('training-opinion-signoff', 'training-opinion-signoff--probationary-stacked')}>
            <div className={c('training-opinion-signoff__row', 'training-opinion-signoff__row--probationary-stacked')}>
              <span>{signatureLabel}</span>
              <span className={c('training-signature-placeholder', 'training-signature-placeholder--wide')} />
            </div>
            <div className={c('training-opinion-signoff__row', 'training-opinion-signoff__row--probationary-stacked')}>
              <span>日期：</span>
              <LineField
                className={c('training-signature-line', 'training-signature-line--date')}
                fieldId={dateFieldId}
                value={dateValue}
              />
            </div>
          </div>
        ) : (
          <div className={c('training-inline-signature', 'training-inline-signature--right')}>
            <span>{signatureLabel}</span>
            <span className={c('training-signature-placeholder', 'training-signature-placeholder--wide')} />
            <span>日期：</span>
            <LineField
              className={c('training-signature-line', 'training-signature-line--date')}
              fieldId={dateFieldId}
              value={dateValue}
            />
          </div>
        )}
      </div>
    </VerticalFramePage>
  )
}

function BlankOpinionPage({
  dateFieldId,
  dateValue,
  signatureLabel,
  stackSignature = false,
  title,
  zoom,
}) {
  return (
    <VerticalFramePage title={title} zoom={zoom}>
      <div className={c('training-opinion-layout')}>
        <div className={c('training-empty-body')} />

        {stackSignature ? (
          <div className={c('training-opinion-signoff', 'training-opinion-signoff--probationary-stacked')}>
            <div className={c('training-opinion-signoff__row', 'training-opinion-signoff__row--probationary-stacked')}>
              <span>{signatureLabel}</span>
              <span className={c('training-signature-placeholder', 'training-signature-placeholder--wide')} />
            </div>
            <div className={c('training-opinion-signoff__row', 'training-opinion-signoff__row--probationary-stacked')}>
              <span>日期：</span>
              <LineField
                className={c('training-signature-line', 'training-signature-line--date')}
                fieldId={dateFieldId}
                value={dateValue}
              />
            </div>
          </div>
        ) : (
          <div className={c('training-inline-signature', 'training-inline-signature--right')}>
            <span>{signatureLabel}</span>
            <span className={c('training-signature-placeholder', 'training-signature-placeholder--wide')} />
            <span>日期：</span>
            <LineField
              className={c('training-signature-line', 'training-signature-line--date')}
              fieldId={dateFieldId}
              value={dateValue}
            />
          </div>
        )}
      </div>
    </VerticalFramePage>
  )
}

function EducationRecordPage({
  formData,
  pageTitle,
  quarterA,
  quarterB,
  zoom,
}) {
  return (
    <A4Page
      className={c('training-template-page')}
      contentClassName={c('training-quarter-page', 'training-quarter-page--probationary')}
      zoom={zoom}
    >
        {pageTitle ? (
                  <h2 className={c('training-page-title', 'training-page-title--compact', 'training-page-title--probationary-quarter')}>
                    {pageTitle}
                  </h2>
                ) : null}
      <table className={c('training-large-opinion-table', 'training-quarter-record-table', 'training-quarter-record-table--probationary')}>
        <tbody>
          <tr>
            <td className={c('training-vertical-cell', 'training-vertical-cell--probationary-quarter')}>
              <VerticalText
                className={c('training-vertical-text', 'training-vertical-text--long', 'training-vertical-text--probationary-quarter')}
                text="预备党员考察情况"
              />
            </td>
            <td className={c('training-quarter-record-table__body')}>
              <div className={c('training-quarter-record-page', 'training-quarter-record-page--probationary')}>
                <div className={c('training-quarter-sections', 'training-quarter-sections--probationary')}>
                  <QuarterSection
                    dateFieldId={quarterA.dateFieldId}
                    dateValue={formData[quarterA.dateFieldId]}
                    endMonthFieldId={quarterA.endMonthFieldId}
                    endMonthValue={formData[quarterA.endMonthFieldId]}
                    opinionFieldId={quarterA.opinionFieldId}
                    opinionValue={formData[quarterA.opinionFieldId]}
                    quarterLabel={quarterA.label}
                    reportLabel={quarterA.reportLabel}
                    startMonthFieldId={quarterA.startMonthFieldId}
                    startMonthValue={formData[quarterA.startMonthFieldId]}
                  />
                  <QuarterSection
                    dateFieldId={quarterB.dateFieldId}
                    dateValue={formData[quarterB.dateFieldId]}
                    endMonthFieldId={quarterB.endMonthFieldId}
                    endMonthValue={formData[quarterB.endMonthFieldId]}
                    opinionFieldId={quarterB.opinionFieldId}
                    opinionValue={formData[quarterB.opinionFieldId]}
                    quarterLabel={quarterB.label}
                    reportLabel={quarterB.reportLabel}
                    startMonthFieldId={quarterB.startMonthFieldId}
                    startMonthValue={formData[quarterB.startMonthFieldId]}
                  />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </A4Page>
  )
}

function Page1Cover({ formData, zoom }) {
  return (
    <A4Page
      className={c('training-template-page')}
      contentClassName={c('training-cover-page', 'training-cover-page--probationary')}
      zoom={zoom}
    >
      <h2 className={c('training-cover-page__title', 'training-cover-page__title--probationary')}>
        预备党员培养考察记录册
      </h2>

      <div className={c('training-cover-page__info', 'training-cover-page__info--probationary')}>
        <div className={c('training-cover-line', 'training-cover-line--probationary')}>
          <div className={c('training-cover-line__label', 'training-cover-line__label--probationary')}>
            姓 名
          </div>
          <LineField
            className={c('training-cover-line__content', 'training-cover-line__content--probationary')}
            fieldId={FIELD_IDS.personName}
            value={getFieldValue(formData, FIELD_IDS.personName)}
          />
        </div>
        <div className={c('training-cover-line', 'training-cover-line--probationary')}>
          <div className={c('training-cover-line__label', 'training-cover-line__label--probationary')}>
            所 在 单 位
          </div>
          <LineField
            className={c('training-cover-line__content', 'training-cover-line__content--probationary')}
            fieldId={FIELD_IDS.organizationOrClass}
            value={getFieldValue(formData, FIELD_IDS.organizationOrClass)}
          />
        </div>
        <div className={c('training-cover-line', 'training-cover-line--probationary')}>
          <div
            className={c(
              'training-cover-line__label',
              'training-cover-line__label--probationary',
              'training-cover-line__label--compact',
            )}
          >
            党委(党工委)
          </div>
          <div
            className={c(
              'training-cover-line__content',
              'training-cover-line__content--probationary',
              'training-cover-line__content--fixed',
            )}
          >
            计算机学院党委
          </div>
        </div>
        <div className={c('training-cover-line', 'training-cover-line--probationary')}>
          <div className={c('training-cover-line__label', 'training-cover-line__label--probationary')}>
            所 在 党 支 部
          </div>
          <LineField
            className={c('training-cover-line__content', 'training-cover-line__content--probationary')}
            fieldId={FIELD_IDS.probationaryPartyBranch}
            value={getFieldValue(formData, FIELD_IDS.probationaryPartyBranch)}
          />
        </div>
      </div>

      <div className={c('training-cover-page__imprint', 'training-cover-page__imprint--probationary')}>
        中共上海交通大学委员会组织部制
      </div>
    </A4Page>
  )
}

function Page2Instructions({ zoom }) {
  return (
    <A4Page
      className={c('training-template-page')}
      contentClassName={c('training-instructions-page', 'training-instructions-page--probationary')}
      zoom={zoom}
    >
      <h2 className={c('training-page-title', 'training-page-title--probationary-instructions')}>
        填写说明
      </h2>

      <div className={c('training-instruction-sections', 'training-instruction-sections--probationary')}>
        {INSTRUCTION_SECTIONS.map((section) => (
          <div key={section.marker} className={c('training-instruction-section', 'training-instruction-section--probationary')}>
            <div className={c('training-instruction-section__marker', 'training-instruction-section__marker--probationary')}>
              {section.marker}
            </div>
            <div className={c('training-instruction-section__content', 'training-instruction-section__content--probationary')}>
              {section.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={c('training-instructions-footer', 'training-instructions-footer--probationary')}>
        ☆注： 是否审核《入党培养考察记录册》或同类材料 ☑是□否
      </div>
    </A4Page>
  )
}

function Page3BasicInfo({ formData, zoom }) {
  return (
    <A4Page
      className={c('training-template-page')}
      contentClassName={c('training-basic-page', 'training-basic-page--probationary')}
      zoom={zoom}
    >
      <h2 className={c('training-page-title', 'training-page-title--probationary-basic')}>
        预备党员基本情况
      </h2>

      <table className={c('training-basic-table', 'training-basic-table--probationary')}>
        <colgroup>
          <col className={c('training-basic-table__col--probationary-1')} />
          <col className={c('training-basic-table__col--probationary-2')} />
          <col className={c('training-basic-table__col--probationary-3')} />
          <col className={c('training-basic-table__col--probationary-4')} />
          <col className={c('training-basic-table__col--probationary-5')} />
          <col className={c('training-basic-table__col--probationary-6')} />
        </colgroup>
        <tbody>
          <tr className={c('training-basic-table__row--probationary-short')}>
            <td className={c('training-basic-table__label')}>姓名</td>
            <td className={c('training-basic-table__value', 'training-basic-table__value--probationary-center')}>
              <TableCellField
                fieldId={FIELD_IDS.personName}
                value={getFieldValue(formData, FIELD_IDS.personName)}
              />
            </td>
            <td className={c('training-basic-table__label')}>性别</td>
            <td className={c('training-basic-table__value', 'training-basic-table__value--probationary-center')}>
              <TableCellField
                fieldId={FIELD_IDS.gender}
                value={getFieldValue(formData, FIELD_IDS.gender)}
              />
            </td>
            <td className={c('training-basic-table__label')}>出生年月</td>
            <td className={c('training-basic-table__value', 'training-basic-table__value--probationary-center')}>
              <TableCellField
                fieldId={FIELD_IDS.birthYearMonth}
                value={getFieldValue(formData, FIELD_IDS.birthYearMonth)}
              />
            </td>
          </tr>
          <tr className={c('training-basic-table__row--probationary-short')}>
            <td className={c('training-basic-table__label')}>籍贯</td>
            <td className={c('training-basic-table__value', 'training-basic-table__value--probationary-center')}>
              <TableCellField
                fieldId={FIELD_IDS.nativePlace}
                value={getFieldValue(formData, FIELD_IDS.nativePlace)}
              />
            </td>
            <td className={c('training-basic-table__label')}>文化程度</td>
            <td className={c('training-basic-table__value', 'training-basic-table__value--probationary-center')}>
              <TableCellField
                fieldId={FIELD_IDS.educationLevel}
                value={getFieldValue(formData, FIELD_IDS.educationLevel)}
              />
            </td>
            <td className={c('training-basic-table__label')}>职务</td>
            <td className={c('training-basic-table__value', 'training-basic-table__value--probationary-center')}>
              <TableCellField
                fieldId={FIELD_IDS.currentPosition}
                value={getFieldValue(formData, FIELD_IDS.currentPosition)}
              />
            </td>
          </tr>
          <tr className={c('training-basic-table__row--probationary-medium')}>
            <td className={c('training-basic-table__label')}>申请入党日期</td>
            <td className={c('training-basic-table__value', 'training-basic-table__value--probationary-center')} colSpan={2}>
              <TableCellField
                fieldId={FIELD_IDS.partyApplicationDate}
                value={getFieldValue(formData, FIELD_IDS.partyApplicationDate)}
              />
            </td>
            <td className={c('training-basic-table__label')}>确定为入党积极分子日期</td>
            <td className={c('training-basic-table__value', 'training-basic-table__value--probationary-center')} colSpan={2}>
              <TableCellField
                fieldId={FIELD_IDS.activistDate}
                value={getFieldValue(formData, FIELD_IDS.activistDate)}
              />
            </td>
          </tr>
          <tr className={c('training-basic-table__row--probationary-medium')}>
            <td className={c('training-basic-table__label')}>确定为发展对象日期</td>
            <td className={c('training-basic-table__value', 'training-basic-table__value--probationary-center')} colSpan={2}>
              <TableCellField
                fieldId={FIELD_IDS.developmentTargetDate}
                value={getFieldValue(formData, FIELD_IDS.developmentTargetDate)}
              />
            </td>
            <td className={c('training-basic-table__label')}>召开支部大会日期</td>
            <td className={c('training-basic-table__value', 'training-basic-table__value--probationary-center')} colSpan={2}>
              <TableCellField
                fieldId={FIELD_IDS.branchMeetingApproveProbationaryDate}
                value={getFieldValue(formData, FIELD_IDS.branchMeetingApproveProbationaryDate)}
              />
            </td>
          </tr>
          <tr className={c('training-basic-table__row--probationary-period')}>
            <td className={c('training-basic-table__label')}>预备期起止日期</td>
            <td className={c('training-basic-table__value', 'training-basic-table__value--probationary-period')} colSpan={2}>
              <div className={c('training-basic-table__period-stack')}>
                <div className={c('training-basic-table__period-line')}>
                  <InlineField
                    className={c('training-field-anchor--probationary-inline')}
                    fieldId={FIELD_IDS.branchMeetingApproveProbationaryDate}
                    value={getFieldValue(formData, FIELD_IDS.branchMeetingApproveProbationaryDate)}
                  />
                  <span>起</span>
                </div>
                <div className={c('training-basic-table__period-line')}>
                  <InlineField
                    className={c('training-field-anchor--probationary-inline')}
                    fieldId={FIELD_IDS.probationaryInspectionEndDate}
                    value={getFieldValue(formData, FIELD_IDS.probationaryInspectionEndDate)}
                  />
                  <span>止</span>
                </div>
              </div>
            </td>
            <td className={c('training-basic-table__label')}>延长预备期起止日期</td>
            <td className={c('training-basic-table__value', 'training-basic-table__value--probationary-period')} colSpan={2}>
              <div className={c('training-basic-table__period-stack', 'training-basic-table__period-stack--empty')}>
                <div className={c('training-basic-table__period-line', 'training-basic-table__period-line--empty')}>
                  <span>起</span>
                </div>
                <div className={c('training-basic-table__period-line', 'training-basic-table__period-line--empty')}>
                  <span>止</span>
                </div>
              </div>
            </td>
          </tr>
          <tr className={c('training-basic-table__row--probationary-contacts-title')}>
            <td className={c('training-basic-table__subheader', 'training-basic-table__subheader--probationary-section')} colSpan={6}>
              考察人
            </td>
          </tr>
          <tr className={c('training-basic-table__row--probationary-subheader')}>
            <td className={c('training-basic-table__subheader')} colSpan={2}>
              姓名
            </td>
            <td className={c('training-basic-table__subheader')} colSpan={2}>
              所在支部
            </td>
            <td className={c('training-basic-table__subheader')}>职务</td>
            <td className={c('training-basic-table__subheader')}>是否正式党员</td>
          </tr>
          <tr className={c('training-basic-table__row--probationary-contact')}>
            <td className={c('training-basic-table__value', 'training-basic-table__value--probationary-center')} colSpan={2}>
              <TableCellField
                fieldId={FIELD_IDS.inspector1Name}
                value={getFieldValue(formData, FIELD_IDS.inspector1Name)}
              />
            </td>
            <td className={c('training-basic-table__value', 'training-basic-table__value--probationary-center')} colSpan={2}>
              <TableCellField
                fieldId={FIELD_IDS.probationaryPartyBranch}
                value={getFieldValue(formData, FIELD_IDS.probationaryPartyBranch)}
              />
            </td>
            <td className={c('training-basic-table__value', 'training-basic-table__value--probationary-center')}>
              <TableCellField
                fieldId={FIELD_IDS.inspector1Position}
                value={getFieldValue(formData, FIELD_IDS.inspector1Position)}
              />
            </td>
            <td className={c('training-basic-table__value', 'training-basic-table__value--probationary-center')}>
              <TableCellField
                fieldId={FIELD_IDS.inspector1FormalMember}
                value={getFieldValue(formData, FIELD_IDS.inspector1FormalMember)}
              />
            </td>
          </tr>
          <tr className={c('training-basic-table__row--probationary-contact')}>
            <td className={c('training-basic-table__value', 'training-basic-table__value--probationary-center')} colSpan={2}>
              <TableCellField
                fieldId={FIELD_IDS.inspector2Name}
                value={getFieldValue(formData, FIELD_IDS.inspector2Name)}
              />
            </td>
            <td className={c('training-basic-table__value', 'training-basic-table__value--probationary-center')} colSpan={2}>
              <TableCellField
                fieldId={FIELD_IDS.probationaryPartyBranch}
                value={getFieldValue(formData, FIELD_IDS.probationaryPartyBranch)}
              />
            </td>
            <td className={c('training-basic-table__value', 'training-basic-table__value--probationary-center')}>
              <TableCellField
                fieldId={FIELD_IDS.inspector2Position}
                value={getFieldValue(formData, FIELD_IDS.inspector2Position)}
              />
            </td>
            <td className={c('training-basic-table__value', 'training-basic-table__value--probationary-center')}>
              <TableCellField
                fieldId={FIELD_IDS.inspector2FormalMember}
                value={getFieldValue(formData, FIELD_IDS.inspector2FormalMember)}
              />
            </td>
          </tr>
          <tr className={c('training-basic-table__row--probationary-record')}>
            <td className={c('training-basic-table__section-label', 'training-basic-table__section-label--probationary')}>
              编入党
              <br />
              支部或
              <br />
              党小组
            </td>
            <td className={c('training-basic-table__value', 'training-basic-table__value--probationary-paragraph')} colSpan={2}>
              于
              <InlineField
                fieldId={FIELD_IDS.committeeApprovalDate}
                value={getFieldValue(formData, FIELD_IDS.committeeApprovalDate)}
              />
              编入
              <InlineField
                fieldId={FIELD_IDS.probationaryPartyBranch}
                value={getFieldValue(formData, FIELD_IDS.probationaryPartyBranch)}
              />
              。
            </td>
            <td className={c('training-basic-table__section-label', 'training-basic-table__section-label--probationary')}>
              宣誓
              <br />
              记录
            </td>
            <td className={c('training-basic-table__value', 'training-basic-table__value--probationary-paragraph')} colSpan={2}>
              于
              <InlineField
                fieldId={FIELD_IDS.oathDate}
                value={getFieldValue(formData, FIELD_IDS.oathDate)}
              />
              在
              <InlineField
                fieldId={FIELD_IDS.oathLocation}
                value={getFieldValue(formData, FIELD_IDS.oathLocation)}
              />
              宣誓。
            </td>
          </tr>
          <tr className={c('training-basic-table__row--probationary-strengths')}>
            <td className={c('training-basic-table__section-label', 'training-basic-table__section-label--probationary')}>
              入党时
              <br />
              主要
              <br />
              优缺点
            </td>
            <td
              className={c(
                'training-basic-table__value',
                'training-basic-table__value--tall',
                'training-basic-table__value--probationary-textarea',
              )}
              colSpan={5}
            >
              <InlineField
                className={c(
                  'training-field-anchor--block',
                  'training-field-anchor--opinion',
                  'training-field-anchor--probationary-textarea',
                )}
                fieldId={FIELD_IDS.admissionStrengthsWeaknesses}
                value={getFieldValue(formData, FIELD_IDS.admissionStrengthsWeaknesses)}
              />
            </td>
          </tr>
          <tr className={c('training-basic-table__row--probationary-note')}>
            <td className={c('training-basic-table__label')}>备注</td>
            <td className={c('training-basic-table__value', 'training-basic-table__value--probationary-note')} colSpan={5}>
              <InlineField
                className={c(
                  'training-field-anchor--block',
                  'training-field-anchor--note',
                  'training-field-anchor--probationary-note',
                )}
                fieldId={FIELD_IDS.basicInfoRemark}
                value={getFieldValue(formData, FIELD_IDS.basicInfoRemark)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </A4Page>
  )
}

function Page4EducationRecord({ formData, zoom }) {
  return (
    <EducationRecordPage
      formData={formData}
      pageTitle="教育考察记录"
      quarterA={{
        label: '第一季度',
        reportLabel: '电子版（一）',
        startMonthFieldId: FIELD_IDS.quarter1StartMonth,
        endMonthFieldId: FIELD_IDS.quarter1EndMonth,
        opinionFieldId: FIELD_IDS.inspectorOpinionQ1,
        dateFieldId: FIELD_IDS.inspectorOpinionQ1Date,
      }}
      quarterB={{
        label: '第二季度',
        reportLabel: '电子版（二）',
        startMonthFieldId: FIELD_IDS.quarter2StartMonth,
        endMonthFieldId: FIELD_IDS.quarter2EndMonth,
        opinionFieldId: FIELD_IDS.inspectorOpinionQ2,
        dateFieldId: FIELD_IDS.inspectorOpinionQ2Date,
      }}
      zoom={zoom}
    />
  )
}

function Page5BranchHalfYearOpinion({ formData, zoom }) {
  return (
    <OpinionPage
      dateFieldId={FIELD_IDS.branchOpinionHalfYearDate}
      dateValue={getFieldValue(formData, FIELD_IDS.branchOpinionHalfYearDate)}
      opinionFieldId={FIELD_IDS.branchOpinionHalfYear}
      opinionValue={getFieldValue(formData, FIELD_IDS.branchOpinionHalfYear)}
      signatureLabel="党支部书记："
      stackSignature
      title="党支部考察意见（半年）"
      zoom={zoom}
    />
  )
}

function Page6EducationRecordContinuation({ formData, zoom }) {
  return (
    <EducationRecordPage
      formData={formData}
      quarterA={{
        label: '第三季度',
        reportLabel: '电子版（三）',
        startMonthFieldId: FIELD_IDS.quarter3StartMonth,
        endMonthFieldId: FIELD_IDS.quarter3EndMonth,
        opinionFieldId: FIELD_IDS.inspectorOpinionQ3,
        dateFieldId: FIELD_IDS.inspectorOpinionQ3Date,
      }}
      quarterB={{
        label: '第四季度',
        reportLabel: '电子版（四）',
        startMonthFieldId: FIELD_IDS.quarter4StartMonth,
        endMonthFieldId: FIELD_IDS.quarter4EndMonth,
        opinionFieldId: FIELD_IDS.inspectorOpinionQ4,
        dateFieldId: FIELD_IDS.inspectorOpinionQ4Date,
      }}
      zoom={zoom}
    />
  )
}

function Page7PublicConsultation({ formData, zoom }) {
  return (
    <BlankOpinionPage
      dateFieldId={FIELD_IDS.publicConsultationDate}
      dateValue={getFieldValue(formData, FIELD_IDS.publicConsultationDate)}
      signatureLabel="党支部书记签名："
      stackSignature
      title="预备党员转正前征求党员和群众意见"
      zoom={zoom}
    />
  )
}

function Page8PublicNotice({ formData, zoom }) {
  return (
    <VerticalFramePage title="预备党员转正前公示情况" zoom={zoom}>
      <div className={c('training-opinion-layout', 'training-opinion-layout--notice', 'training-opinion-layout--probationary-notice')}>
        <p
          className={c(
            'training-fixed-paragraph',
            'training-fixed-paragraph--plain',
            'training-public-notice-paragraph',
            'training-public-notice-paragraph--probationary',
          )}
        >
          <InlineField
            className={c('training-field-anchor--inline-plain')}
            fieldId={FIELD_IDS.personName}
            value={getFieldValue(formData, FIELD_IDS.personName)}
          />
          同志的转正公示时间为
          <InlineField
            className={c('training-field-anchor--inline-plain')}
            fieldId={FIELD_IDS.publicNoticeStartDate}
            value={getFieldValue(formData, FIELD_IDS.publicNoticeStartDate)}
          />
          至
          <InlineField
            className={c('training-field-anchor--inline-plain')}
            fieldId={FIELD_IDS.publicNoticeEndDate}
            value={getFieldValue(formData, FIELD_IDS.publicNoticeEndDate)}
          />
          ，拟转正时间为
          <InlineField
            className={c('training-field-anchor--inline-plain')}
            fieldId={FIELD_IDS.conversionResolutionDate}
            value={getFieldValue(formData, FIELD_IDS.conversionResolutionDate)}
          />
          ，公示范围及方式为电信群楼张贴，无来访（电、函）无邮件反馈情况。
        </p>
        <div className={c('training-public-notice-spacer', 'training-public-notice-spacer--probationary')} />
      </div>
    </VerticalFramePage>
  )
}

function Page9PreConversionBranchReview({ formData, zoom }) {
  return (
    <OpinionPage
      dateFieldId={FIELD_IDS.preConversionBranchReviewOpinionDate}
      dateValue={getFieldValue(formData, FIELD_IDS.preConversionBranchReviewOpinionDate)}
      opinionFieldId={FIELD_IDS.preConversionBranchReviewOpinion}
      opinionValue={getFieldValue(formData, FIELD_IDS.preConversionBranchReviewOpinion)}
      signatureLabel="党支部书记签名："
      stackSignature
      title="预备党员转正前党支部审查意见（一年）"
      zoom={zoom}
    />
  )
}

function ProbationaryTable({ formData, zoom }) {
  return (
    <>
      <Page1Cover formData={formData} zoom={zoom} />
      <Page2Instructions zoom={zoom} />
      <Page3BasicInfo formData={formData} zoom={zoom} />
      <Page4EducationRecord formData={formData} zoom={zoom} />
      <Page5BranchHalfYearOpinion formData={formData} zoom={zoom} />
      <Page6EducationRecordContinuation formData={formData} zoom={zoom} />
      <Page7PublicConsultation formData={formData} zoom={zoom} />
      <Page8PublicNotice formData={formData} zoom={zoom} />
      <Page9PreConversionBranchReview formData={formData} zoom={zoom} />
    </>
  )
}

export default ProbationaryTable

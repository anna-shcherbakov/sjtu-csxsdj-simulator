import A4Page from './A4Page'
import FieldAnchorText from './FieldAnchorText'

const INSTRUCTION_ITEMS = [
  '本册用于记录预备党员在考察期间的重要情况，请按自然页码顺序填写，不得随意增删页。',
  '凡模板中未设置占位字段的区域，均视为固定文本或后续手写内容，本系统不做结构化录入。',
  '所有日期、意见和考察人信息应与纸质档案保持一致，填写完成后请按组织流程提交审核。',
]

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
      className={['training-field-anchor', className].filter(Boolean).join(' ')}
      fieldId={fieldId}
      value={value}
    />
  )
}

function LineField({ fieldId, value, className }) {
  return (
    <span className={className}>
      <InlineField
        className="training-field-anchor--line"
        fieldId={fieldId}
        value={value}
      />
    </span>
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
  startMonthFieldId,
  startMonthValue,
}) {
  return (
    <>
      <tr>
        <td className="training-quarter-title-cell">
          {quarterLabel}（自
          <InlineField
            className="training-field-anchor--inline-mini"
            fieldId={startMonthFieldId}
            value={startMonthValue}
          />
          月至
          <InlineField
            className="training-field-anchor--inline-mini"
            fieldId={endMonthFieldId}
            value={endMonthValue}
          />
          月）
        </td>
      </tr>
      <tr>
        <td className="training-quarter-opinion-cell">
          <InlineField
            className="training-field-anchor--block training-field-anchor--opinion"
            fieldId={opinionFieldId}
            value={opinionValue}
          />
        </td>
      </tr>
      <tr>
        <td className="training-quarter-footer-cell">
          <div className="training-quarter-footer">
            <div className="training-quarter-evaluation">
              本季度思想汇报综合评价：本季度思想汇报已审核，合格
            </div>
            <div className="training-inline-signature">
              <span>考察人签名：</span>
              <span className="training-signature-placeholder" />
              <span>日期：</span>
              <LineField
                className="training-signature-line training-signature-line--date"
                fieldId={dateFieldId}
                value={dateValue}
              />
            </div>
          </div>
        </td>
      </tr>
    </>
  )
}

function VerticalFramePage({ children, title, zoom }) {
  return (
    <A4Page
      className="training-template-page"
      contentClassName="training-opinion-page"
      zoom={zoom}
    >
      <table className="training-large-opinion-table">
        <tbody>
          <tr>
            <td className="training-vertical-cell">
              <VerticalText
                className="training-vertical-text training-vertical-text--long"
                text={title}
              />
            </td>
            <td className="training-opinion-cell">{children}</td>
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
  title,
  zoom,
}) {
  return (
    <VerticalFramePage title={title} zoom={zoom}>
      <div className="training-opinion-layout">
        <InlineField
          className="training-field-anchor--block training-field-anchor--opinion"
          fieldId={opinionFieldId}
          value={opinionValue}
        />

        <div className="training-inline-signature training-inline-signature--right">
          <span>{signatureLabel}</span>
          <span className="training-signature-placeholder training-signature-placeholder--wide" />
          <span>日期：</span>
          <LineField
            className="training-signature-line training-signature-line--date"
            fieldId={dateFieldId}
            value={dateValue}
          />
        </div>
      </div>
    </VerticalFramePage>
  )
}

function BlankOpinionPage({ dateFieldId, dateValue, signatureLabel, title, zoom }) {
  return (
    <VerticalFramePage title={title} zoom={zoom}>
      <div className="training-opinion-layout">
        <div className="training-empty-body" />

        <div className="training-inline-signature training-inline-signature--right">
          <span>{signatureLabel}</span>
          <span className="training-signature-placeholder training-signature-placeholder--wide" />
          <span>日期：</span>
          <LineField
            className="training-signature-line training-signature-line--date"
            fieldId={dateFieldId}
            value={dateValue}
          />
        </div>
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
      className="training-template-page"
      contentClassName="training-quarter-page"
      zoom={zoom}
    >
      <table className="training-large-opinion-table training-quarter-record-table">
        <tbody>
          <tr>
            <td className="training-vertical-cell">
              <VerticalText
                className="training-vertical-text training-vertical-text--long"
                text="预备党员考察情况"
              />
            </td>
            <td className="training-quarter-record-table__body">
              <div className="training-quarter-record-page">
                {pageTitle ? (
                  <h2 className="training-page-title training-page-title--compact">
                    {pageTitle}
                  </h2>
                ) : null}

                <table className="training-quarter-inner-table">
                  <tbody>
                    <QuarterSection
                      dateFieldId={quarterA.dateFieldId}
                      dateValue={formData[quarterA.dateFieldId]}
                      endMonthFieldId={quarterA.endMonthFieldId}
                      endMonthValue={formData[quarterA.endMonthFieldId]}
                      opinionFieldId={quarterA.opinionFieldId}
                      opinionValue={formData[quarterA.opinionFieldId]}
                      quarterLabel={quarterA.label}
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
                      startMonthFieldId={quarterB.startMonthFieldId}
                      startMonthValue={formData[quarterB.startMonthFieldId]}
                    />
                  </tbody>
                </table>
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
      className="training-template-page"
      contentClassName="training-cover-page"
      zoom={zoom}
    >
      <h2 className="training-cover-page__title">预备党员培养考察记录册</h2>

      <div className="training-cover-page__info">
        <div className="training-cover-line">
          <div className="training-cover-line__label">姓 名</div>
          <LineField
            className="training-cover-line__content"
            fieldId="personName"
            value={formData.personName}
          />
        </div>
        <div className="training-cover-line">
          <div className="training-cover-line__label">所 在 单 位</div>
          <LineField
            className="training-cover-line__content"
            fieldId="organizationOrClass"
            value={formData.organizationOrClass}
          />
        </div>
        <div className="training-cover-line">
          <div className="training-cover-line__label">党委(党工委)</div>
          <div className="training-cover-line__content training-cover-line__content--fixed">
            计算机学院党委
          </div>
        </div>
        <div className="training-cover-line">
          <div className="training-cover-line__label">所 在 党 支 部</div>
          <LineField
            className="training-cover-line__content"
            fieldId="probationaryPartyBranch"
            value={formData.probationaryPartyBranch}
          />
        </div>
      </div>

      <div className="training-cover-page__imprint">中共上海交通大学委员会组织部制</div>
    </A4Page>
  )
}

function Page2Instructions({ zoom }) {
  return (
    <A4Page
      className="training-template-page"
      contentClassName="training-instructions-page"
      zoom={zoom}
    >
      <h2 className="training-page-title">填写说明</h2>

      <ol className="training-instruction-list">
        {INSTRUCTION_ITEMS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>

      <div className="training-instructions-footer">
        ☆注：是否审核《入党培养考察记录册》或同类材料 ☑是□否
      </div>
    </A4Page>
  )
}

function Page3BasicInfo({ formData, zoom }) {
  return (
    <A4Page
      className="training-template-page"
      contentClassName="training-basic-page"
      zoom={zoom}
    >
      <h2 className="training-page-title">预备党员基本情况</h2>

      <table className="training-basic-table training-basic-table--probationary">
        <tbody>
          <tr>
            <td className="training-basic-table__label">姓名</td>
            <td className="training-basic-table__value">
              <InlineField fieldId="personName" value={formData.personName} />
            </td>
            <td className="training-basic-table__label">性别</td>
            <td className="training-basic-table__value">
              <InlineField fieldId="gender" value={formData.gender} />
            </td>
            <td className="training-basic-table__label">出生年月</td>
            <td className="training-basic-table__value">
              <InlineField
                fieldId="birthYearMonth"
                value={formData.birthYearMonth}
              />
            </td>
          </tr>
          <tr>
            <td className="training-basic-table__label">籍贯</td>
            <td className="training-basic-table__value">
              <InlineField fieldId="nativePlace" value={formData.nativePlace} />
            </td>
            <td className="training-basic-table__label">文化程度</td>
            <td className="training-basic-table__value">
              <InlineField
                fieldId="educationLevel"
                value={formData.educationLevel}
              />
            </td>
            <td className="training-basic-table__label">职务</td>
            <td className="training-basic-table__value">
              <InlineField
                fieldId="currentPosition"
                value={formData.currentPosition}
              />
            </td>
          </tr>
          <tr>
            <td className="training-basic-table__label">入党申请书落款日期</td>
            <td className="training-basic-table__value">
              <InlineField
                fieldId="partyApplicationDate"
                value={formData.partyApplicationDate}
              />
            </td>
            <td className="training-basic-table__label">确定为入党积极分子日期</td>
            <td className="training-basic-table__value">
              <InlineField fieldId="activistDate" value={formData.activistDate} />
            </td>
            <td className="training-basic-table__label">确定为发展对象日期</td>
            <td className="training-basic-table__value">
              <InlineField
                fieldId="developmentTargetDate"
                value={formData.developmentTargetDate}
              />
            </td>
          </tr>
          <tr>
            <td className="training-basic-table__label">召开支部大会日期</td>
            <td className="training-basic-table__value">
              <InlineField
                fieldId="branchMeetingApproveProbationaryDate"
                value={formData.branchMeetingApproveProbationaryDate}
              />
            </td>
            <td className="training-basic-table__label">支部大会通过预备日期</td>
            <td className="training-basic-table__value">
              <InlineField
                fieldId="branchMeetingApproveProbationaryDate"
                value={formData.branchMeetingApproveProbationaryDate}
              />
            </td>
            <td className="training-basic-table__label">预备期起止日期</td>
            <td className="training-basic-table__value">
              <span className="training-basic-table__inline-text">
                起
                <InlineField
                  fieldId="branchMeetingApproveProbationaryDate"
                  value={formData.branchMeetingApproveProbationaryDate}
                />
                止
                <InlineField
                  fieldId="probationaryInspectionEndDate"
                  value={formData.probationaryInspectionEndDate}
                />
              </span>
            </td>
          </tr>
          <tr>
            <td className="training-basic-table__label">延长预备期起止日期</td>
            <td className="training-basic-table__value training-basic-table__blank" colSpan={5}>
              <span className="training-basic-table__inline-text">起      止</span>
            </td>
          </tr>
          <tr>
            <td className="training-basic-table__subheader">考察人</td>
            <td className="training-basic-table__subheader">姓名</td>
            <td className="training-basic-table__subheader">所在党支部</td>
            <td className="training-basic-table__subheader">职务</td>
            <td className="training-basic-table__subheader" colSpan={2}>
              是否正式党员
            </td>
          </tr>
          <tr>
            <td className="training-basic-table__label">考察人 1</td>
            <td className="training-basic-table__value">
              <InlineField
                fieldId="inspector1Name"
                value={formData.inspector1Name}
              />
            </td>
            <td className="training-basic-table__value">
              <InlineField
                fieldId="probationaryPartyBranch"
                value={formData.probationaryPartyBranch}
              />
            </td>
            <td className="training-basic-table__value">
              <InlineField
                fieldId="inspector1Position"
                value={formData.inspector1Position}
              />
            </td>
            <td className="training-basic-table__value training-basic-table__value--center" colSpan={2}>
              是
            </td>
          </tr>
          <tr>
            <td className="training-basic-table__label">考察人 2</td>
            <td className="training-basic-table__value">
              <InlineField
                fieldId="inspector2Name"
                value={formData.inspector2Name}
              />
            </td>
            <td className="training-basic-table__value">
              <InlineField
                fieldId="probationaryPartyBranch"
                value={formData.probationaryPartyBranch}
              />
            </td>
            <td className="training-basic-table__value">
              <InlineField
                fieldId="inspector2Position"
                value={formData.inspector2Position}
              />
            </td>
            <td className="training-basic-table__value training-basic-table__value--center" colSpan={2}>
              是
            </td>
          </tr>
          <tr>
            <td className="training-basic-table__section-label">编入党支部或党小组</td>
            <td className="training-basic-table__value training-basic-table__paragraph-cell" colSpan={5}>
              于
              <InlineField
                fieldId="committeeApprovalDate"
                value={formData.committeeApprovalDate}
              />
              经党委审批后，编入
              <InlineField
                fieldId="probationaryPartyBranch"
                value={formData.probationaryPartyBranch}
              />
              参加组织生活。
            </td>
          </tr>
          <tr>
            <td className="training-basic-table__section-label">宣誓记录</td>
            <td className="training-basic-table__value training-basic-table__paragraph-cell" colSpan={5}>
              于
              <InlineField fieldId="oathDate" value={formData.oathDate} />
              在
              <InlineField
                fieldId="oathLocation"
                value={formData.oathLocation}
              />
              进行入党宣誓。
            </td>
          </tr>
          <tr>
            <td className="training-basic-table__section-label">入党时主要优缺点</td>
            <td
              className="training-basic-table__value training-basic-table__value--tall"
              colSpan={5}
            >
              <InlineField
                className="training-field-anchor--block training-field-anchor--opinion"
                fieldId="admissionStrengthsWeaknesses"
                value={formData.admissionStrengthsWeaknesses}
              />
            </td>
          </tr>
          <tr>
            <td className="training-basic-table__label">备注</td>
            <td className="training-basic-table__value" colSpan={5}>
              <InlineField
                className="training-field-anchor--block training-field-anchor--note"
                fieldId="basicInfoRemark"
                value={formData.basicInfoRemark}
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
        startMonthFieldId: 'quarter1StartMonth',
        endMonthFieldId: 'quarter1EndMonth',
        opinionFieldId: 'inspectorOpinionQ1',
        dateFieldId: 'inspectorOpinionQ1Date',
      }}
      quarterB={{
        label: '第二季度',
        startMonthFieldId: 'quarter2StartMonth',
        endMonthFieldId: 'quarter2EndMonth',
        opinionFieldId: 'inspectorOpinionQ2',
        dateFieldId: 'inspectorOpinionQ2Date',
      }}
      zoom={zoom}
    />
  )
}

function Page5BranchHalfYearOpinion({ formData, zoom }) {
  return (
    <OpinionPage
      dateFieldId="branchOpinionHalfYearDate"
      dateValue={formData.branchOpinionHalfYearDate}
      opinionFieldId="branchOpinionHalfYear"
      opinionValue={formData.branchOpinionHalfYear}
      signatureLabel="党支部书记："
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
        startMonthFieldId: 'quarter3StartMonth',
        endMonthFieldId: 'quarter3EndMonth',
        opinionFieldId: 'inspectorOpinionQ3',
        dateFieldId: 'inspectorOpinionQ3Date',
      }}
      quarterB={{
        label: '第四季度',
        startMonthFieldId: 'quarter4StartMonth',
        endMonthFieldId: 'quarter4EndMonth',
        opinionFieldId: 'inspectorOpinionQ4',
        dateFieldId: 'inspectorOpinionQ4Date',
      }}
      zoom={zoom}
    />
  )
}

function Page7PublicConsultation({ formData, zoom }) {
  return (
    <BlankOpinionPage
      dateFieldId="publicConsultationDate"
      dateValue={formData.publicConsultationDate}
      signatureLabel="党支部书记签名："
      title="预备党员转正前征求党员和群众意见"
      zoom={zoom}
    />
  )
}

function Page8PublicNotice({ formData, zoom }) {
  return (
    <VerticalFramePage title="预备党员转正前公示情况" zoom={zoom}>
      <div className="training-opinion-layout training-opinion-layout--notice">
        <p className="training-fixed-paragraph training-fixed-paragraph--plain training-public-notice-paragraph">
          <InlineField fieldId="personName" value={formData.personName} />
          同志拟于
          <InlineField
            fieldId="publicNoticeStartDate"
            value={formData.publicNoticeStartDate}
          />
          至
          <InlineField
            fieldId="publicNoticeEndDate"
            value={formData.publicNoticeEndDate}
          />
          进行预备党员转正前公示。经支部大会于
          <InlineField
            fieldId="conversionResolutionDate"
            value={formData.conversionResolutionDate}
          />
          通过其按期转为正式党员的决议。公示范围及方式为电信群楼张贴，无来访（电、函）无邮件反馈情况。
        </p>
        <div className="training-public-notice-spacer" />
      </div>
    </VerticalFramePage>
  )
}

function Page9PreConversionBranchReview({ formData, zoom }) {
  return (
    <OpinionPage
      dateFieldId="preConversionBranchReviewOpinionDate"
      dateValue={formData.preConversionBranchReviewOpinionDate}
      opinionFieldId="preConversionBranchReviewOpinion"
      opinionValue={formData.preConversionBranchReviewOpinion}
      signatureLabel="党支部书记签名："
      title="预备党员转正前党支部审查意见（一年）"
      zoom={zoom}
    />
  )
}

function PartyTrainingInspectionBookTemplate3({ formData, zoom }) {
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

export default PartyTrainingInspectionBookTemplate3

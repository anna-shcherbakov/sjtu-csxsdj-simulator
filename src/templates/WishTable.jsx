import A4Page from '../components/shared/A4Page'
import FieldAnchorText from '../components/shared/FieldAnchorText'

const RESUME_ROW_COUNT = 6
const FAMILY_ROW_COUNT = 6

const INSTRUCTION_PARAGRAPHS = [
  '填写《入党志愿书》必须严肃认真，字迹工整清楚，内容真实准确，不得涂改、挖补或随意增删项目。',
  '志愿书中无占位符的位置，均视为固定印制文字或手写补充区域，本系统仅对明确字段位置做结构化绑定。',
  '有关决议、审批和日期应与线下组织材料保持一致，提交前请逐项复核后再归档。',
]

const OATH_TEXT =
  '我志愿加入中国共产党，拥护党的纲领，遵守党的章程，履行党员义务，执行党的决定，严守党的纪律，保守党的秘密，对党忠诚，积极工作，为共产主义奋斗终身，随时准备为党和人民牺牲一切，永不叛党。'

const COVER_LINES = [
  { label: '申请人姓名', fieldId: 'applicantName' },
]

function InlineField({ fieldId, value, className }) {
  return (
    <FieldAnchorText
      className={['wish-field-anchor', className].filter(Boolean).join(' ')}
      fieldId={fieldId}
      value={value}
    />
  )
}

function LineField({ fieldId, value, className }) {
  return (
    <span className={className}>
      <InlineField
        className="wish-field-anchor--line"
        fieldId={fieldId}
        value={value}
      />
    </span>
  )
}

function BlockField({ fieldId, value, className }) {
  return (
    <InlineField
      className={['wish-field-anchor--block', className].filter(Boolean).join(' ')}
      fieldId={fieldId}
      value={value}
    />
  )
}

function VerticalText({ text }) {
  return (
    <div className="wish-vertical-text">
      {Array.from(text).map((char, index) => (
        <span key={`${char}-${index}`}>{char === ' ' ? '\u00A0' : char}</span>
      ))}
    </div>
  )
}

function PageTitle({ children }) {
  return <h2 className="wish-page-title">{children}</h2>
}

function SignatureLine({ dateFieldId, dateValue, signatureLabel }) {
  return (
    <div className="wish-signature-row">
      <span>{signatureLabel}</span>
      <span className="wish-signature-placeholder" />
      <span>日期：</span>
      <LineField
        className="wish-signature-line wish-signature-line--date"
        fieldId={dateFieldId}
        value={dateValue}
      />
    </div>
  )
}

function StaticSignatureRow({ signatureLabel, showDate = false }) {
  return (
    <div className="wish-signature-row">
      <span>{signatureLabel}</span>
      <span className="wish-signature-placeholder" />
      {showDate ? (
        <>
          <span>日期：</span>
          <span className="wish-signature-line wish-signature-line--date" />
        </>
      ) : null}
    </div>
  )
}

function SectionCard({
  bodyClassName,
  children,
  dateFieldId,
  dateValue,
  signatureLabel,
  title,
}) {
  return (
    <section className="wish-section-card">
      <div className="wish-section-card__title">{title}</div>
      <div className={['wish-section-card__body', bodyClassName].filter(Boolean).join(' ')}>
        {children}
      </div>
      {dateFieldId ? (
        <SignatureLine
          dateFieldId={dateFieldId}
          dateValue={dateValue}
          signatureLabel={signatureLabel}
        />
      ) : (
        <StaticSignatureRow signatureLabel={signatureLabel} />
      )}
    </section>
  )
}

function CoverPage({ formData, zoom }) {
  return (
    <A4Page
      className="wish-template-page"
      contentClassName="wish-cover-page"
      zoom={zoom}
    >
      <div className="wish-cover-page__emblem" aria-hidden="true">
        <span>★</span>
      </div>

      <div className="wish-cover-page__title-block">
        <div className="wish-cover-page__title-small">中国共产党</div>
        <div className="wish-cover-page__title-large">入党志愿书</div>
      </div>

      <div className="wish-cover-page__lines">
        {COVER_LINES.map((item) => (
          <div className="wish-cover-line" key={item.fieldId}>
            <div className="wish-cover-line__label">{item.label}</div>
            <LineField
              className="wish-cover-line__value"
              fieldId={item.fieldId}
              value={formData[item.fieldId]}
            />
          </div>
        ))}
      </div>

      <div className="wish-cover-page__footer">中共中央组织部印制</div>
    </A4Page>
  )
}

function InstructionsPage({ zoom }) {
  return (
    <A4Page
      className="wish-template-page"
      contentClassName="wish-simple-page"
      zoom={zoom}
    >
      <PageTitle>填写说明</PageTitle>

      <div className="wish-paragraph-stack">
        {INSTRUCTION_PARAGRAPHS.map((item) => (
          <p className="wish-paragraph" key={item}>
            {item}
          </p>
        ))}
      </div>

      <div className="wish-page-note">
        注：本页为固定说明页，审核《入党志愿书》或同类材料时请一并核对。
      </div>
    </A4Page>
  )
}

function OathPage({ zoom }) {
  return (
    <A4Page
      className="wish-template-page"
      contentClassName="wish-oath-page"
      zoom={zoom}
    >
      <PageTitle>入党誓词</PageTitle>
      <div className="wish-oath-page__body">
        <p className="wish-oath-page__text">{OATH_TEXT}</p>
      </div>
    </A4Page>
  )
}

function BasicInfoAndWishPage({ formData, zoom }) {
  return (
    <A4Page
      className="wish-template-page"
      contentClassName="wish-table-page"
      zoom={zoom}
    >
      <PageTitle>基本信息及入党志愿</PageTitle>

      <table className="wish-basic-table">
        <tbody>
          <tr>
            <td className="wish-table__label">姓名</td>
            <td className="wish-table__value">
              <InlineField fieldId="applicantName" value={formData.applicantName} />
            </td>
            <td className="wish-table__label">性别</td>
            <td className="wish-table__value">
              <InlineField fieldId="gender" value={formData.gender} />
            </td>
            <td className="wish-table__label">民族</td>
            <td className="wish-table__value">
              <InlineField fieldId="ethnicity" value={formData.ethnicity} />
            </td>
          </tr>
          <tr>
            <td className="wish-table__label">出生日期</td>
            <td className="wish-table__value">
              <InlineField fieldId="birthDate" value={formData.birthDate} />
            </td>
            <td className="wish-table__label">籍贯</td>
            <td className="wish-table__value">
              <InlineField fieldId="nativePlace" value={formData.nativePlace} />
            </td>
            <td className="wish-table__label">文化程度</td>
            <td className="wish-table__value">
              <InlineField fieldId="education" value={formData.education} />
            </td>
          </tr>
          <tr>
            <td className="wish-table__label">学位</td>
            <td className="wish-table__value">
              <InlineField fieldId="degree" value={formData.degree} />
            </td>
            <td className="wish-table__label">现所在单位</td>
            <td className="wish-table__value" colSpan={3}>
              <InlineField fieldId="currentUnit" value={formData.currentUnit} />
            </td>
          </tr>
          <tr>
            <td className="wish-table__label">现任职务</td>
            <td className="wish-table__value" colSpan={3}>
              <InlineField fieldId="position" value={formData.position} />
            </td>
            <td className="wish-table__label">身份证号</td>
            <td className="wish-table__value">
              <InlineField fieldId="idNumber" value={formData.idNumber} />
            </td>
          </tr>
        </tbody>
      </table>

      <section className="wish-large-section">
        <div className="wish-large-section__title">入党志愿</div>
        <BlockField
          className="wish-field-anchor--essay"
          fieldId="partyApplicationContent"
          value={formData.partyApplicationContent}
        />
      </section>
    </A4Page>
  )
}

function ResumePage({ formData, zoom }) {
  const rows = Array.from({ length: RESUME_ROW_COUNT }, (_, index) => index + 1)

  return (
    <A4Page
      className="wish-template-page"
      contentClassName="wish-table-page"
      zoom={zoom}
    >
      <PageTitle>本人经历</PageTitle>

      <div className="wish-resume-spacer" />

      <table className="wish-grid-table">
        <thead>
          <tr>
            <th>起始日期</th>
            <th>结束日期</th>
            <th>在何地、何部门</th>
            <th>任何职务</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row}>
              <td>
                <InlineField
                  fieldId={`resumeStartDateList${row}`}
                  value={formData[`resumeStartDateList${row}`]}
                />
              </td>
              <td>
                <InlineField
                  fieldId={`resumeEndDateList${row}`}
                  value={formData[`resumeEndDateList${row}`]}
                />
              </td>
              <td>
                <InlineField
                  fieldId={`resumeOrganizationList${row}`}
                  value={formData[`resumeOrganizationList${row}`]}
                />
              </td>
              <td>
                <InlineField
                  fieldId={`resumePositionList${row}`}
                  value={formData[`resumePositionList${row}`]}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </A4Page>
  )
}

function PoliticalReviewPage({ formData, zoom }) {
  return (
    <A4Page
      className="wish-template-page"
      contentClassName="wish-table-page"
      zoom={zoom}
    >
      <PageTitle>政治审查及现实表现</PageTitle>

      <div className="wish-section-stack">
        <section className="wish-large-section wish-large-section--compact">
          <div className="wish-large-section__title">政治审查结论</div>
          <BlockField
            className="wish-field-anchor--essay wish-field-anchor--section"
            fieldId="politicalReviewConclusion"
            value={formData.politicalReviewConclusion}
          />
        </section>

        <section className="wish-large-section wish-large-section--compact">
          <div className="wish-large-section__title">奖惩情况</div>
          <BlockField
            className="wish-field-anchor--essay wish-field-anchor--section"
            fieldId="rewardPunishmentInfo"
            value={formData.rewardPunishmentInfo}
          />
        </section>

        <section className="wish-large-section wish-large-section--compact">
          <div className="wish-large-section__title">主要现实表现</div>
          <BlockField
            className="wish-field-anchor--essay wish-field-anchor--section"
            fieldId="majorPerformance"
            value={formData.majorPerformance}
          />
        </section>
      </div>
    </A4Page>
  )
}

function FamilyPage({ formData, zoom }) {
  const rows = Array.from({ length: FAMILY_ROW_COUNT }, (_, index) => index + 1)

  return (
    <A4Page
      className="wish-template-page"
      contentClassName="wish-table-page"
      zoom={zoom}
    >
      <PageTitle>家庭主要成员及主要社会关系</PageTitle>

      <table className="wish-grid-table">
        <thead>
          <tr>
            <th>姓名</th>
            <th>称谓/关系</th>
            <th>政治面貌</th>
            <th>工作单位及职务</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row}>
              <td>
                <InlineField
                  fieldId={`familyMemberNameList${row}`}
                  value={formData[`familyMemberNameList${row}`]}
                />
              </td>
              <td>
                <InlineField
                  fieldId={`familyMemberRelationList${row}`}
                  value={formData[`familyMemberRelationList${row}`]}
                />
              </td>
              <td>
                <InlineField
                  fieldId={`familyMemberPoliticalStatusList${row}`}
                  value={formData[`familyMemberPoliticalStatusList${row}`]}
                />
              </td>
              <td>
                <InlineField
                  fieldId={`familyMemberWorkUnitList${row}`}
                  value={formData[`familyMemberWorkUnitList${row}`]}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="wish-family-spacer" />
    </A4Page>
  )
}

function VerticalIssuePage({ formData, zoom }) {
  return (
    <A4Page
      className="wish-template-page"
      contentClassName="wish-vertical-page"
      zoom={zoom}
    >
      <table className="wish-vertical-page__table">
        <tbody>
          <tr>
            <td className="wish-vertical-page__rail">
              <VerticalText text="需要向党组织说明的问题" />
            </td>
            <td className="wish-vertical-page__body">
              <BlockField
                className="wish-field-anchor--essay wish-field-anchor--issue"
                fieldId="selfStatementIssues"
                value={formData.selfStatementIssues}
              />

              <div className="wish-signature-row wish-signature-row--bottom">
                <span>本人签名：</span>
                <span className="wish-signature-placeholder" />
                <span>日期：</span>
                <span className="wish-signature-line wish-signature-line--date" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </A4Page>
  )
}

function IntroducerOpinionsPage({ formData, zoom }) {
  return (
    <A4Page
      className="wish-template-page"
      contentClassName="wish-simple-page"
      zoom={zoom}
    >
      <PageTitle>入党介绍人意见</PageTitle>

      <div className="wish-section-stack">
        <SectionCard
          dateFieldId="introducer1Date"
          dateValue={formData.introducer1Date}
          signatureLabel="介绍人签名："
          title="介绍人一意见"
        >
          <BlockField
            className="wish-field-anchor--essay wish-field-anchor--section"
            fieldId="introducer1Opinion"
            value={formData.introducer1Opinion}
          />
        </SectionCard>

        <SectionCard
          dateFieldId="introducer2Date"
          dateValue={formData.introducer2Date}
          signatureLabel="介绍人签名："
          title="介绍人二意见"
        >
          <BlockField
            className="wish-field-anchor--essay wish-field-anchor--section"
            fieldId="introducer2Opinion"
            value={formData.introducer2Opinion}
          />
        </SectionCard>
      </div>
    </A4Page>
  )
}

function TwoDecisionPage({
  bottomDateFieldId,
  bottomDateValue,
  bottomFieldId,
  bottomTitle,
  formData,
  topDateFieldId,
  topDateValue,
  topFieldId,
  topTitle,
  zoom,
}) {
  return (
    <A4Page
      className="wish-template-page"
      contentClassName="wish-simple-page"
      zoom={zoom}
    >
      <div className="wish-section-stack">
        <SectionCard
          dateFieldId={topDateFieldId}
          dateValue={topDateValue}
          signatureLabel="签章："
          title={topTitle}
        >
          <BlockField
            className="wish-field-anchor--essay wish-field-anchor--section"
            fieldId={topFieldId}
            value={formData[topFieldId]}
          />
        </SectionCard>

        <SectionCard
          dateFieldId={bottomDateFieldId}
          dateValue={bottomDateValue}
          signatureLabel="签章："
          title={bottomTitle}
        >
          <BlockField
            className="wish-field-anchor--essay wish-field-anchor--section"
            fieldId={bottomFieldId}
            value={formData[bottomFieldId]}
          />
        </SectionCard>
      </div>
    </A4Page>
  )
}

function ConversionApprovalPage({ formData, remarkFieldId, title, zoom }) {
  return (
    <A4Page
      className="wish-template-page"
      contentClassName="wish-simple-page"
      zoom={zoom}
    >
      <PageTitle>{title}</PageTitle>

      <div className="wish-section-stack wish-section-stack--dense">
        <SectionCard
          dateFieldId="conversionResolutionDate"
          dateValue={formData.conversionResolutionDate}
          signatureLabel="签章："
          title="转正相关决议"
        >
          <BlockField
            className="wish-field-anchor--essay wish-field-anchor--section"
            fieldId="conversionResolution"
            value={formData.conversionResolution}
          />
        </SectionCard>

        <div className="wish-approval-grid">
          <SectionCard
            dateFieldId="generalBranchDate"
            dateValue={formData.generalBranchDate}
            signatureLabel="签章："
            title="总支审查意见"
          >
            <BlockField
              className="wish-field-anchor--essay wish-field-anchor--approval"
              fieldId="generalBranchOpinion"
              value={formData.generalBranchOpinion}
            />
          </SectionCard>

          <SectionCard
            dateFieldId="committeeApprovalDate"
            dateValue={formData.committeeApprovalDate}
            signatureLabel="签章："
            title="基层党委审批意见"
          >
            <BlockField
              className="wish-field-anchor--essay wish-field-anchor--approval"
              fieldId="committeeApprovalOpinion"
              value={formData.committeeApprovalOpinion}
            />
          </SectionCard>
        </div>

        {remarkFieldId ? (
          <section className="wish-large-section wish-large-section--remark">
            <div className="wish-large-section__title">备注</div>
            <BlockField
              className="wish-field-anchor--essay wish-field-anchor--remark"
              fieldId={remarkFieldId}
              value={formData[remarkFieldId]}
            />
          </section>
        ) : null}
      </div>
    </A4Page>
  )
}

function BackCoverPage({ zoom }) {
  return (
    <A4Page
      className="wish-template-page"
      contentClassName="wish-back-cover"
      zoom={zoom}
    >
      <div className="wish-back-cover__center">
        <div className="wish-back-cover__title">中共中央组织部</div>
        <div className="wish-back-cover__year">二〇二六年制</div>
        <p className="wish-back-cover__note">
          本册为固定印制材料，供党组织填写、审批和归档使用。
        </p>
        <p className="wish-back-cover__note">
          印刷说明页为固定文字，不纳入结构化字段录入范围。
        </p>
      </div>
    </A4Page>
  )
}

function WishTable({ formData, zoom }) {
  return (
    <>
      <CoverPage formData={formData} zoom={zoom} />
      <InstructionsPage zoom={zoom} />
      <OathPage zoom={zoom} />
      <BasicInfoAndWishPage formData={formData} zoom={zoom} />
      <ResumePage formData={formData} zoom={zoom} />
      <PoliticalReviewPage formData={formData} zoom={zoom} />
      <FamilyPage formData={formData} zoom={zoom} />
      <VerticalIssuePage formData={formData} zoom={zoom} />
      <IntroducerOpinionsPage formData={formData} zoom={zoom} />
      <TwoDecisionPage
        bottomDateFieldId="upperOrgDate"
        bottomDateValue={formData.upperOrgDate}
        bottomFieldId="upperOrgOpinion"
        bottomTitle="上级党组织意见"
        formData={formData}
        topDateFieldId="branchResolutionDate"
        topDateValue={formData.branchResolutionDate}
        topFieldId="branchResolution"
        topTitle="支部大会接收预备党员决议"
        zoom={zoom}
      />
      <TwoDecisionPage
        bottomDateFieldId="committeeApprovalDate"
        bottomDateValue={formData.committeeApprovalDate}
        bottomFieldId="committeeApprovalOpinion"
        bottomTitle="基层党委审批意见"
        formData={formData}
        topDateFieldId="generalBranchDate"
        topDateValue={formData.generalBranchDate}
        topFieldId="generalBranchOpinion"
        topTitle="总支审查意见"
        zoom={zoom}
      />
      <ConversionApprovalPage
        formData={formData}
        title="转正相关审批（一次）"
        zoom={zoom}
      />
      <ConversionApprovalPage
        formData={formData}
        remarkFieldId="remark"
        title="转正相关审批（再次/延长）"
        zoom={zoom}
      />
      <BackCoverPage zoom={zoom} />
    </>
  )
}

export default WishTable

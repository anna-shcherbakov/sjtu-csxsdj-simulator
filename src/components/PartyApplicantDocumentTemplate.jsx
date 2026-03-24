import A4Page from './A4Page'
import FieldAnchorText from './FieldAnchorText'

const REGISTRATION_REVIEW_ITEMS = [
  '本人是否明确表示入党意愿',
  '介绍本人现况、家庭情况及成长经历',
  '介绍本人学习、工作和志愿服务等社会公益活动情况',
  '介绍本人主要优缺点、所获荣誉和奖励情况',
  '能结合自身成长经历，阐明对党的路线、方针、政策和宗旨的认识，对入党问题的看法或思想演变、成熟的过程',
  '学习党的历史，了解近年来发生的历次重大政治事件，且有正确的认识和表现',
  '有否摘抄他人入党申请书或网上范例的情况',
  '入党申请书是否由本人亲笔签名、落款时间完整',
  '递交申请书时间是否年满 18 周岁',
]

function VerticalText({ text, className }) {
  return (
    <div className={className}>
      {Array.from(text).map((char, index) => (
        <span key={`${char}-${index}`}>{char === ' ' ? '\u00A0' : char}</span>
      ))}
    </div>
  )
}

function LineField({ fieldId, value, className }) {
  return (
    <span className={className}>
      <FieldAnchorText
        className="party-field-anchor party-field-anchor--line"
        fieldId={fieldId}
        value={value}
      />
    </span>
  )
}

function Page1Cover({ formData, zoom }) {
  return (
    <A4Page className="party-template-page" contentClassName="party-cover-page" zoom={zoom}>
      <h2 className="party-cover-page__title">入党申请人登记暨谈话表</h2>

      <div className="party-cover-page__info">
        <div className="party-cover-line">
          <div className="party-cover-line__label">姓名</div>
          <div className="party-cover-line__content">
            <LineField
              className="party-line-fill"
              fieldId="name"
              value={formData.name}
            />
          </div>
        </div>

        <div className="party-cover-line">
          <div className="party-cover-line__label">所在单位</div>
          <div className="party-cover-line__content">
            <LineField
              className="party-line-fill"
              fieldId="partyBranchAtInterview"
              value={formData.partyBranchAtInterview}
            />
          </div>
        </div>
      </div>

      <div className="party-cover-page__imprint">中共上海交通大学委员会组织部制</div>
    </A4Page>
  )
}

function Page2Registration({ formData, zoom }) {
  return (
    <A4Page
      className="party-template-page"
      contentClassName="party-registration-page"
      zoom={zoom}
    >
      <h2 className="party-page-title">入党申请人登记表</h2>

      <table className="party-registration-table party-registration-table--basic">
        <colgroup>
          <col className="party-col-label" />
          <col className="party-col-value" />
          <col className="party-col-label" />
          <col className="party-col-value" />
          <col className="party-col-label" />
          <col className="party-col-value" />
          <col className="party-col-label" />
          <col className="party-col-value party-col-value--wide" />
        </colgroup>
        <tbody>
          <tr>
            <td className="party-table-label">姓名</td>
            <td className="party-table-value">
              <FieldAnchorText
                className="party-field-anchor"
                fieldId="name"
                value={formData.name}
              />
            </td>
            <td className="party-table-label">性别</td>
            <td className="party-table-value">
              <FieldAnchorText
                className="party-field-anchor"
                fieldId="gender"
                value={formData.gender}
              />
            </td>
            <td className="party-table-label">民族</td>
            <td className="party-table-value">
              <FieldAnchorText
                className="party-field-anchor"
                fieldId="ethnicity"
                value={formData.ethnicity}
              />
            </td>
            <td className="party-table-label">籍贯</td>
            <td className="party-table-value">
              <FieldAnchorText
                className="party-field-anchor"
                fieldId="nativePlace"
                value={formData.nativePlace}
              />
            </td>
          </tr>
          <tr>
            <td className="party-table-label party-table-label--stacked">
              <span>所属单位</span>
              <span>（部门）</span>
            </td>
            <td className="party-table-value">
              <FieldAnchorText
                className="party-field-anchor"
                fieldId="className"
                value={formData.className}
              />
            </td>
            <td className="party-table-label party-table-label--stacked">
              <span>学号</span>
              <span>（工号）</span>
            </td>
            <td className="party-table-value">
              <FieldAnchorText
                className="party-field-anchor"
                fieldId="studentId"
                value={formData.studentId}
              />
            </td>
            <td className="party-table-label">入团年月</td>
            <td className="party-table-value">
              <FieldAnchorText
                className="party-field-anchor"
                fieldId="leagueJoinDate"
                value={formData.leagueJoinDate}
              />
            </td>
            <td className="party-table-label">曾任职务</td>
            <td className="party-table-value">
              <FieldAnchorText
                className="party-field-anchor"
                fieldId="formerPosition"
                value={formData.formerPosition}
              />
            </td>
          </tr>
          <tr>
            <td className="party-table-label party-table-label--wide">
              递交入党申请书时间
            </td>
            <td className="party-table-value" colSpan={3}>
              <FieldAnchorText
                className="party-field-anchor"
                fieldId="applicationDate"
                value={formData.applicationDate}
              />
            </td>
            <td className="party-table-label">身份证号</td>
            <td className="party-table-value" colSpan={3}>
              <FieldAnchorText
                className="party-field-anchor"
                fieldId="idNumber"
                value={formData.idNumber}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <table className="party-registration-table party-registration-table--review">
        <colgroup>
          <col className="party-review-col-title" />
          <col />
          <col className="party-review-col-result" />
          <col className="party-review-col-result" />
        </colgroup>
        <tbody>
          {REGISTRATION_REVIEW_ITEMS.map((item, index) => (
            <tr key={item}>
              {index === 0 ? (
                <td
                  className="party-review-vertical-cell"
                  rowSpan={REGISTRATION_REVIEW_ITEMS.length}
                >
                  <VerticalText
                    className="party-vertical-text party-vertical-text--review"
                    text="对入党申请书的审核"
                  />
                </td>
              ) : null}
              <td className="party-review-text">{`${index + 1}. ${item}`}</td>
              <td className="party-review-judge">是</td>
              <td className="party-review-judge">否</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="party-registration-page__signature">
        <div className="party-signature-group party-signature-group--wide">
          <span className="party-signature-group__label">审核人党内职务：</span>
          <LineField
            className="party-signature-group__line"
            fieldId="reviewerPartyPosition"
            value={formData.reviewerPartyPosition}
          />
        </div>
        <div className="party-signature-group party-signature-group--medium">
          <span className="party-signature-group__label">签名：</span>
          <LineField
            className="party-signature-group__line"
            fieldId="reviewerSignature"
            value={formData.reviewerSignature}
          />
        </div>
        <div className="party-signature-group party-signature-group--date">
          <span className="party-signature-group__label">日期：</span>
          <LineField
            className="party-signature-group__line"
            fieldId="reviewerDate"
            value={formData.reviewerDate}
          />
        </div>
      </div>
    </A4Page>
  )
}

function Page3InterviewRecord({ formData, zoom }) {
  return (
    <A4Page
      className="party-template-page"
      contentClassName="party-interview-page"
      zoom={zoom}
    >
      <table className="party-interview-table">
        <tbody>
          <tr>
            <td className="party-interview-vertical-cell">
              <VerticalText
                className="party-vertical-text party-vertical-text--interview"
                text="谈话记录（收到入党申请书后一个月完成）"
              />
            </td>
            <td className="party-interview-main-cell">
              <div className="party-interview-main">
                <div className="party-interview-record-box">
                  <FieldAnchorText
                    className="party-field-anchor party-field-anchor--record"
                    fieldId="interviewRecord"
                    value={formData.interviewRecord}
                  />
                </div>

                <div className="party-interview-footer">
                  <div className="party-signature-group party-signature-group--wide">
                    <span className="party-signature-group__label">
                      谈话人党内职务：
                    </span>
                    <LineField
                      className="party-signature-group__line"
                      fieldId="interviewerPartyPosition"
                      value={formData.interviewerPartyPosition}
                    />
                  </div>
                  <div className="party-signature-group party-signature-group--medium">
                    <span className="party-signature-group__label">签 名：</span>
                    <LineField
                      className="party-signature-group__line"
                      fieldId="interviewerSignature"
                      value={formData.interviewerSignature}
                    />
                  </div>
                  <div className="party-signature-group party-signature-group--date">
                    <span className="party-signature-group__label">日期：</span>
                    <LineField
                      className="party-signature-group__line"
                      fieldId="interviewDate"
                      value={formData.interviewDate}
                    />
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <table className="party-remark-table">
        <tbody>
          <tr>
            <td className="party-remark-table__label">备注</td>
            <td className="party-remark-table__blank" />
          </tr>
        </tbody>
      </table>
    </A4Page>
  )
}

function Page4Blank({ zoom }) {
  return (
    <A4Page
      className="party-template-page"
      contentClassName="party-blank-page"
      padded={false}
      zoom={zoom}
    />
  )
}

function PartyApplicantDocumentTemplate({ formData, zoom }) {
  return (
    <>
      <Page1Cover formData={formData} zoom={zoom} />
      <Page2Registration formData={formData} zoom={zoom} />
      <Page3InterviewRecord formData={formData} zoom={zoom} />
      <Page4Blank zoom={zoom} />
    </>
  )
}

export default PartyApplicantDocumentTemplate

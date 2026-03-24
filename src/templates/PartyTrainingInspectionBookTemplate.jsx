import A4Page from '../components/shared/A4Page'
import FieldAnchorText from '../components/shared/FieldAnchorText'

const INSTRUCTION_ITEMS = [
  '本册用于记录发展对象在培养考察期间的重要情况，请按自然页码顺序填写，不得随意增删页。',
  '凡模板中未设置占位字段的区域，均视为固定文本或后续手写内容，本系统不做结构化录入。',
  '所有日期、意见和培养联系人信息应与纸质档案保持一致，填写完成后请按组织流程提交审核。',
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
          {quarterLabel}（
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
          <div className="training-inline-signature">
            <span>培养联系人签名：</span>
            <span className="training-signature-placeholder" />
            <span>日期：</span>
            <LineField
              className="training-signature-line training-signature-line--date"
              fieldId={dateFieldId}
              value={dateValue}
            />
          </div>
        </td>
      </tr>
    </>
  )
}

function BranchOpinionPage({ dateFieldId, dateValue, opinionFieldId, opinionValue, title, zoom }) {
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
            <td className="training-opinion-cell">
              <div className="training-opinion-layout">
                <InlineField
                  className="training-field-anchor--block training-field-anchor--opinion"
                  fieldId={opinionFieldId}
                  value={opinionValue}
                />

                <div className="training-inline-signature training-inline-signature--right">
                  <span>党支部书记签字：</span>
                  <span className="training-signature-placeholder training-signature-placeholder--wide" />
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
      <h2 className="training-cover-page__title">入党培养考察记录册</h2>

      <div className="training-cover-page__info">
        <div className="training-cover-line">
          <div className="training-cover-line__label">姓 名</div>
          <LineField
            className="training-cover-line__content"
            fieldId="name"
            value={formData.name}
          />
        </div>
        <div className="training-cover-line">
          <div className="training-cover-line__label">所 在 单 位</div>
          <LineField
            className="training-cover-line__content"
            fieldId="className"
            value={formData.className}
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
            fieldId="branchAtPositiveSelection"
            value={formData.branchAtPositiveSelection}
          />
        </div>
      </div>

      <div className="training-cover-page__imprint">中共上海交通大学委员会组织部制</div>
    </A4Page>
  )
}

function Page2BranchCommitteeOpinion({ formData, zoom }) {
  return (
    <BranchOpinionPage
      dateFieldId="branchCommitteeDate"
      dateValue={formData.branchCommitteeDate}
      opinionFieldId="branchCommitteeOpinion"
      opinionValue={formData.branchCommitteeOpinion}
      title="支委会（党员大会）意见"
      zoom={zoom}
    />
  )
}

function Page3DeputySecretaryAndCommitteeRecord({ formData, zoom }) {
  return (
    <A4Page
      className="training-template-page"
      contentClassName="training-split-page"
      zoom={zoom}
    >
      <table className="training-split-table">
        <tbody>
          <tr>
            <td className="training-vertical-cell">
              <VerticalText
                className="training-vertical-text training-vertical-text--long"
                text="学工副书记（负责人）意见"
              />
            </td>
            <td className="training-split-cell">
              <div className="training-split-section">
                <p className="training-fixed-paragraph">
                  该同志在思想上要求上进，积极向党组织靠拢；学习认真负责，刻苦钻研；生活中团结同学，乐于助人。同意其为发展对象，并报学院党委备案。
                </p>

                <div className="training-inline-signature training-inline-signature--right">
                  <span>签名：</span>
                  <span className="training-signature-placeholder training-signature-placeholder--wide" />
                  <span>日期：</span>
                  <LineField
                    className="training-signature-line training-signature-line--date"
                    fieldId="deputySecretaryOpinionDate"
                    value={formData.deputySecretaryOpinionDate}
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="training-vertical-cell">
              <VerticalText
                className="training-vertical-text training-vertical-text--long"
                text="党委备案意见"
              />
            </td>
            <td className="training-split-cell">
              <div className="training-split-section">
                <p className="training-fixed-paragraph">同意备案为发展对象。</p>

                <div className="training-stamp-row">
                  <span>党委盖章：</span>
                  <span className="training-signature-placeholder training-signature-placeholder--stamp" />
                  <span>书记签名：</span>
                  <span className="training-signature-placeholder training-signature-placeholder--wide" />
                  <span>日期（确定发展对象日期）：</span>
                  <LineField
                    className="training-signature-line training-signature-line--date"
                    fieldId="committeeRecordDate"
                    value={formData.committeeRecordDate}
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

function Page4TrainingAndPoliticalReview({ formData, zoom }) {
  return (
    <A4Page
      className="training-template-page"
      contentClassName="training-section-page"
      zoom={zoom}
    >
      <table className="training-section-table">
        <tbody>
          <tr>
            <td className="training-section-title-cell">教育培训情况</td>
            <td className="training-section-body-cell">
              <table className="training-inner-grid-table">
                <thead>
                  <tr>
                    <th>培训班名称</th>
                    <th>结业时间</th>
                    <th>培训情况</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <InlineField fieldId="trainingClassName" value={formData.trainingClassName} />
                    </td>
                    <td>
                      <InlineField
                        fieldId="trainingGraduationDate"
                        value={formData.trainingGraduationDate}
                      />
                    </td>
                    <td>
                      <InlineField fieldId="trainingStatus" value={formData.trainingStatus} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td className="training-vertical-cell">
              <VerticalText
                className="training-vertical-text training-vertical-text--long"
                text="政治审查报告"
              />
            </td>
            <td className="training-section-body-cell training-section-body-cell--tall">
              <div className="training-review-sheet">
                <table className="training-fixed-review-table">
                  <tbody>
                    <tr>
                      <td>审查项目</td>
                      <td>本人历史情况</td>
                      <td>家庭主要成员情况</td>
                      <td>主要社会关系情况</td>
                    </tr>
                    <tr>
                      <td>审查结论</td>
                      <td>情况清楚</td>
                      <td>情况清楚</td>
                      <td>情况清楚</td>
                    </tr>
                  </tbody>
                </table>

                <p className="training-fixed-paragraph training-fixed-paragraph--review">
                  经政治审查，未发现影响其作为发展对象的政治问题。审查材料齐全，情况反映清楚，审查结论明确。
                </p>

                <div className="training-inline-signature training-inline-signature--right">
                  <span>政审人签名：</span>
                  <span className="training-signature-placeholder training-signature-placeholder--wide" />
                  <span>日期：</span>
                  <LineField
                    className="training-signature-line training-signature-line--date"
                    fieldId="politicalReviewReportDate"
                    value={formData.politicalReviewReportDate}
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

function Page5PublicityAndBranchReview({ formData, zoom }) {
  return (
    <A4Page
      className="training-template-page"
      contentClassName="training-section-page"
      zoom={zoom}
    >
      <table className="training-section-table">
        <tbody>
          <tr>
            <td className="training-vertical-cell">
              <VerticalText className="training-vertical-text" text="公示情况" />
            </td>
            <td className="training-section-body-cell training-section-body-cell--compact">
              <p className="training-fixed-paragraph training-fixed-paragraph--plain">
                经研究，已于
                <InlineField
                  className="training-field-anchor--inline-mini"
                  fieldId="publicityStartDate"
                  value={formData.publicityStartDate}
                />
                至
                <InlineField
                  className="training-field-anchor--inline-mini"
                  fieldId="publicityEndDate"
                  value={formData.publicityEndDate}
                />
                在规定范围内进行公示，公示期间未收到影响发展的实质性异议。
              </p>
            </td>
          </tr>
          <tr>
            <td className="training-vertical-cell">
              <VerticalText className="training-vertical-text" text="党支部审查意见" />
            </td>
            <td className="training-section-body-cell">
              <div className="training-section-with-footer">
                <InlineField
                  className="training-field-anchor--block training-field-anchor--opinion"
                  fieldId="branchReviewOpinion"
                  value={formData.branchReviewOpinion}
                />

                <div className="training-stamp-row">
                  <span>党支部：</span>
                  <LineField
                    className="training-signature-line training-signature-line--medium"
                    fieldId="targetBranchName"
                    value={formData.targetBranchName}
                  />
                  <span>书记签名：</span>
                  <span className="training-signature-placeholder training-signature-placeholder--wide" />
                  <span>日期：</span>
                  <LineField
                    className="training-signature-line training-signature-line--date"
                    fieldId="branchReviewOpinionDate"
                    value={formData.branchReviewOpinionDate}
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="training-vertical-cell">
              <VerticalText className="training-vertical-text" text="党委预审意见" />
            </td>
            <td className="training-section-body-cell">
              <div className="training-section-with-footer">
                <p className="training-fixed-paragraph">
                  该生思想积极向上，学习认真努力，群众基础好，政审合格。同意发展并下发《入党志愿书》由党支部指导填写。
                </p>

                <div className="training-stamp-row">
                  <span>党委（盖章）：</span>
                  <span className="training-signature-placeholder training-signature-placeholder--stamp" />
                  <span>书记签名：</span>
                  <span className="training-signature-placeholder training-signature-placeholder--wide" />
                  <span>日期：</span>
                  <LineField
                    className="training-signature-line training-signature-line--date"
                    fieldId="preReviewOpinionDate"
                    value={formData.preReviewOpinionDate}
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="training-section-title-cell training-section-title-cell--small">
              备注
            </td>
            <td className="training-section-body-cell training-section-body-cell--compact">
              <p className="training-fixed-paragraph training-fixed-paragraph--plain">
                《入党志愿书》编号：
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </A4Page>
  )
}

function Page6Blank({ zoom }) {
  return (
    <A4Page
      className="training-template-page"
      contentClassName="training-blank-page"
      padded={false}
      zoom={zoom}
    />
  )
}

function Page7Instructions({ zoom }) {
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
        ☆注：是否审核《入党申请人登记暨谈话表》或同类材料 ☑是□否
      </div>
    </A4Page>
  )
}

function Page8BasicInfo({ formData, zoom }) {
  return (
    <A4Page
      className="training-template-page"
      contentClassName="training-basic-page"
      zoom={zoom}
    >
      <h2 className="training-page-title">入党培养考察对象基本情况</h2>

      <table className="training-basic-table">
        <tbody>
          <tr>
            <td className="training-basic-table__label">姓名</td>
            <td className="training-basic-table__value">
              <InlineField fieldId="name" value={formData.name} />
            </td>
            <td className="training-basic-table__label">性别</td>
            <td className="training-basic-table__value">
              <InlineField fieldId="gender" value={formData.gender} />
            </td>
            <td className="training-basic-table__label">出生年月</td>
            <td className="training-basic-table__value">
              <InlineField fieldId="birthDate" value={formData.birthDate} />
            </td>
          </tr>
          <tr>
            <td className="training-basic-table__label">身份证号</td>
            <td className="training-basic-table__value" colSpan={5}>
              <InlineField fieldId="idNumber" value={formData.idNumber} />
            </td>
          </tr>
          <tr>
            <td className="training-basic-table__label">联系电话</td>
            <td className="training-basic-table__value">
              <InlineField fieldId="phone" value={formData.phone} />
            </td>
            <td className="training-basic-table__label">学号</td>
            <td className="training-basic-table__value">
              <InlineField fieldId="studentId" value={formData.studentId} />
            </td>
            <td className="training-basic-table__label">现任职务</td>
            <td className="training-basic-table__value">
              <InlineField fieldId="currentPosition" value={formData.currentPosition} />
            </td>
          </tr>
          <tr>
            <td className="training-basic-table__label">所在学院</td>
            <td className="training-basic-table__value">计算机学院</td>
            <td className="training-basic-table__label">申请入党时间</td>
            <td className="training-basic-table__value" colSpan={3}>
              <InlineField fieldId="applicationDate" value={formData.applicationDate} />
            </td>
          </tr>
          <tr>
            <td className="training-basic-table__label">推荐为入党积极分子方式</td>
            <td className="training-basic-table__value" colSpan={5}>
              团组织推优、党员推荐、群团组织推荐等方式形成综合意见。
            </td>
          </tr>
          <tr>
            <td className="training-basic-table__section-label">
              支委会（党员大会）对确定入党积极分子的意见
            </td>
            <td className="training-basic-table__value training-basic-table__value--tall" colSpan={5}>
              <InlineField
                className="training-field-anchor--block training-field-anchor--opinion"
                fieldId="positiveMotiveConfirmOpinion"
                value={formData.positiveMotiveConfirmOpinion}
              />
            </td>
          </tr>
          <tr>
            <td className="training-basic-table__label">党支部</td>
            <td className="training-basic-table__value" colSpan={3}>
              <InlineField
                fieldId="positiveMotiveBranchName"
                value={formData.positiveMotiveBranchName}
              />
            </td>
            <td className="training-basic-table__label">日期</td>
            <td className="training-basic-table__value">
              <InlineField
                fieldId="positiveMotiveConfirmDate"
                value={formData.positiveMotiveConfirmDate}
              />
            </td>
          </tr>
          <tr>
            <td className="training-basic-table__subheader" colSpan={6}>
              培养联系人信息
            </td>
          </tr>
          <tr>
            <td className="training-basic-table__label">联系人 1 姓名</td>
            <td className="training-basic-table__value">
              <InlineField fieldId="liaison1Name" value={formData.liaison1Name} />
            </td>
            <td className="training-basic-table__label">入党时间</td>
            <td className="training-basic-table__value">
              <InlineField fieldId="liaison1JoinDate" value={formData.liaison1JoinDate} />
            </td>
            <td className="training-basic-table__label">转正时间</td>
            <td className="training-basic-table__value">
              <InlineField
                fieldId="liaison1CorrectionDate"
                value={formData.liaison1CorrectionDate}
              />
            </td>
          </tr>
          <tr>
            <td className="training-basic-table__label">联系人 1 党内职务</td>
            <td className="training-basic-table__value" colSpan={5}>
              <InlineField
                fieldId="liaison1PartyPosition"
                value={formData.liaison1PartyPosition}
              />
            </td>
          </tr>
          <tr>
            <td className="training-basic-table__label">联系人 2 姓名</td>
            <td className="training-basic-table__value">
              <InlineField fieldId="liaison2Name" value={formData.liaison2Name} />
            </td>
            <td className="training-basic-table__label">入党时间</td>
            <td className="training-basic-table__value">
              <InlineField fieldId="liaison2JoinDate" value={formData.liaison2JoinDate} />
            </td>
            <td className="training-basic-table__label">转正时间</td>
            <td className="training-basic-table__value">
              <InlineField
                fieldId="liaison2CorrectionDate"
                value={formData.liaison2CorrectionDate}
              />
            </td>
          </tr>
          <tr>
            <td className="training-basic-table__label">联系人 2 党内职务</td>
            <td className="training-basic-table__value" colSpan={5}>
              <InlineField
                fieldId="liaison2PartyPosition"
                value={formData.liaison2PartyPosition}
              />
            </td>
          </tr>
          <tr>
            <td className="training-basic-table__section-label">党委备案意见</td>
            <td className="training-basic-table__value" colSpan={5}>
              <div className="training-basic-table__record">
                <p className="training-fixed-paragraph training-fixed-paragraph--plain">
                  同意党支部将该同志确定为入党积极分子。
                </p>
                <div className="training-inline-signature training-inline-signature--right">
                  <span>日期：</span>
                  <LineField
                    className="training-signature-line training-signature-line--date"
                    fieldId="committeeRecordDatePositive"
                    value={formData.committeeRecordDatePositive}
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="training-basic-table__label">备注</td>
            <td className="training-basic-table__value" colSpan={5}>
              <InlineField
                className="training-field-anchor--block training-field-anchor--note"
                fieldId="note"
                value={formData.note}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </A4Page>
  )
}

function Page9Blank({ zoom }) {
  return (
    <A4Page
      className="training-template-page"
      contentClassName="training-blank-page"
      padded={false}
      zoom={zoom}
    />
  )
}

function Page10Quarter12({ formData, zoom }) {
  return (
    <A4Page
      className="training-template-page"
      contentClassName="training-quarter-page"
      zoom={zoom}
    >
      <table className="training-quarter-table">
        <tbody>
          <tr>
            <td className="training-vertical-cell" rowSpan={6}>
              <VerticalText className="training-vertical-text" text="培 养 考 察 情 况" />
            </td>
            <td className="training-quarter-block-cell">
              <table className="training-quarter-inner-table">
                <tbody>
                  <QuarterSection
                    dateFieldId="liaisonOpinion1Date"
                    dateValue={formData.liaisonOpinion1Date}
                    endMonthFieldId="quarter1EndMonth"
                    endMonthValue={formData.quarter1EndMonth}
                    opinionFieldId="liaisonOpinion1"
                    opinionValue={formData.liaisonOpinion1}
                    quarterLabel="第一季度"
                    startMonthFieldId="quarter1StartMonth"
                    startMonthValue={formData.quarter1StartMonth}
                  />
                  <QuarterSection
                    dateFieldId="liaisonOpinion2Date"
                    dateValue={formData.liaisonOpinion2Date}
                    endMonthFieldId="quarter2EndMonth"
                    endMonthValue={formData.quarter2EndMonth}
                    opinionFieldId="liaisonOpinion2"
                    opinionValue={formData.liaisonOpinion2}
                    quarterLabel="第二季度"
                    startMonthFieldId="quarter2StartMonth"
                    startMonthValue={formData.quarter2StartMonth}
                  />
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </A4Page>
  )
}

function Page11HalfYearOpinion({ formData, zoom }) {
  return (
    <BranchOpinionPage
      dateFieldId="branchHalfYearOpinionDate"
      dateValue={formData.branchHalfYearOpinionDate}
      opinionFieldId="branchHalfYearOpinion"
      opinionValue={formData.branchHalfYearOpinion}
      title="党支部考察意见（半年）"
      zoom={zoom}
    />
  )
}

function Page12Quarter34({ formData, zoom }) {
  return (
    <A4Page
      className="training-template-page"
      contentClassName="training-quarter-page"
      zoom={zoom}
    >
      <table className="training-quarter-table">
        <tbody>
          <tr>
            <td className="training-vertical-cell" rowSpan={6}>
              <VerticalText className="training-vertical-text" text="培 养 考 察 情 况" />
            </td>
            <td className="training-quarter-block-cell">
              <table className="training-quarter-inner-table">
                <tbody>
                  <QuarterSection
                    dateFieldId="liaisonOpinion3Date"
                    dateValue={formData.liaisonOpinion3Date}
                    endMonthFieldId="quarter3EndMonth"
                    endMonthValue={formData.quarter3EndMonth}
                    opinionFieldId="liaisonOpinion3"
                    opinionValue={formData.liaisonOpinion3}
                    quarterLabel="第三季度"
                    startMonthFieldId="quarter3StartMonth"
                    startMonthValue={formData.quarter3StartMonth}
                  />
                  <QuarterSection
                    dateFieldId="liaisonOpinion4Date"
                    dateValue={formData.liaisonOpinion4Date}
                    endMonthFieldId="quarter4EndMonth"
                    endMonthValue={formData.quarter4EndMonth}
                    opinionFieldId="liaisonOpinion4"
                    opinionValue={formData.liaisonOpinion4}
                    quarterLabel="第四季度"
                    startMonthFieldId="quarter4StartMonth"
                    startMonthValue={formData.quarter4StartMonth}
                  />
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </A4Page>
  )
}

function Page13OneYearOpinion({ formData, zoom }) {
  return (
    <BranchOpinionPage
      dateFieldId="branchOneYearOpinionDate"
      dateValue={formData.branchOneYearOpinionDate}
      opinionFieldId="branchOneYearOpinion"
      opinionValue={formData.branchOneYearOpinion}
      title="党支部考察意见（一年）"
      zoom={zoom}
    />
  )
}

function Page14MassOpinion({ formData, zoom }) {
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
              <VerticalText className="training-vertical-text training-vertical-text--long" text="党员和群众意见" />
            </td>
            <td className="training-opinion-cell">
              <div className="training-opinion-layout">
                <div className="training-empty-body" />

                <div className="training-inline-signature training-inline-signature--right">
                  <span>日期：</span>
                  <LineField
                    className="training-signature-line training-signature-line--date"
                    fieldId="massOpinionMeetingDate"
                    value={formData.massOpinionMeetingDate}
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

function PartyTrainingInspectionBookTemplate({ formData, zoom }) {
  return (
    <>
      <Page1Cover formData={formData} zoom={zoom} />
      <Page2BranchCommitteeOpinion formData={formData} zoom={zoom} />
      <Page3DeputySecretaryAndCommitteeRecord formData={formData} zoom={zoom} />
      <Page4TrainingAndPoliticalReview formData={formData} zoom={zoom} />
      <Page5PublicityAndBranchReview formData={formData} zoom={zoom} />
      <Page6Blank zoom={zoom} />
      <Page7Instructions zoom={zoom} />
      <Page8BasicInfo formData={formData} zoom={zoom} />
      <Page9Blank zoom={zoom} />
      <Page10Quarter12 formData={formData} zoom={zoom} />
      <Page11HalfYearOpinion formData={formData} zoom={zoom} />
      <Page12Quarter34 formData={formData} zoom={zoom} />
      <Page13OneYearOpinion formData={formData} zoom={zoom} />
      <Page14MassOpinion formData={formData} zoom={zoom} />
    </>
  )
}

export default PartyTrainingInspectionBookTemplate

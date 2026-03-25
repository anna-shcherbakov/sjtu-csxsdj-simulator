import A4Page from '../components/shared/A4Page'
import FieldAnchorText from '../components/shared/FieldAnchorText'

const ACTIVIST_INSTRUCTION_SECTIONS = [
  {
    marker: '一、',
    lines: [
      '入党申请人经支部委员会或支部大会确定为入党积极',
      '分子后，即填写此记录册。',
    ],
  },
  {
    marker: '二、',
    lines: [
      '填写须用黑色或蓝黑色墨水的钢笔或水笔。字迹清晰，',
      '内容真实。表内栏目没有内容填写的，应注明“无”。',
      '个别栏目填写不下时，可另加附页。表内所有需要填写',
      '的“日期”均需精确到日。',
    ],
  },
  {
    marker: '三、',
    lines: [
      '本登记表一般由培养联系人保管。培养教育考察程序结',
      '束被吸收为预备党员后，此册须交党组织归入本人档案。',
      '若培养考察对象调动单位时，本登记表应归入本人人事',
      '档案或转给新单位党组织。',
    ],
  },
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
  reportLabel,
  startMonthFieldId,
  startMonthValue,
}) {
  return (
    <>
      <tr>
        <td className="training-quarter-title-cell">
          <div className="training-quarter-title">
            <span>{quarterLabel}（{reportLabel} 所在季度起始月份</span>
            <InlineField
              className="training-field-anchor--inline-plain"
              fieldId={startMonthFieldId}
              value={startMonthValue}
            />
            <span>至{reportLabel} 所在季度截止月份</span>
            <InlineField
              className="training-field-anchor--inline-plain"
              fieldId={endMonthFieldId}
              value={endMonthValue}
            />
            <span>）</span>
          </div>
        </td>
      </tr>
      <tr>
        <td className="training-quarter-opinion-cell">
          <div className="training-quarter-opinion-layout">
            <div className="training-quarter-opinion-body">
              <InlineField
                className="training-field-anchor--block training-field-anchor--quarter-body"
                fieldId={opinionFieldId}
                value={opinionValue}
              />
            </div>
            <div className="training-quarter-evaluation">
                本季度思想汇报综合评价：本季度思想汇报已评价，合格。
            </div>
            <div className="training-quarter-footer">
              
              <div className="training-quarter-signoff">
                <div className="training-quarter-signoff__row">
                  <span className="training-quarter-signoff__label">联系人签字：</span>
                  <span className="training-signature-placeholder" />
                </div>
                <div className="training-quarter-signoff__row">
                  <span className="training-quarter-signoff__label">日期：</span>
                  <LineField
                    className="training-signature-line training-signature-line--date"
                    fieldId={dateFieldId}
                    value={dateValue}
                  />
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  )
}

function BranchOpinionPage({
  dateFieldId,
  dateValue,
  opinionFieldId,
  opinionValue,
  signatureFieldId,
  signatureValue,
  showSignatureLine = true,
  stackDateBelow = false,
  title,
  zoom,
}) {
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
                  {showSignatureLine ? (
                    signatureFieldId ? (
                      <LineField
                        className="training-signature-line training-signature-line--medium"
                        fieldId={signatureFieldId}
                        value={signatureValue}
                      />
                    ) : (
                      <span className="training-signature-placeholder training-signature-placeholder--wide" />
                    )
                  ) : null}
                  {stackDateBelow ? <span className="training-inline-signature__break" /> : null}
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
      contentClassName="training-cover-page training-cover-page--activist"
      zoom={zoom}
    >
      <h2 className="training-cover-page__title training-cover-page__title--activist">
        入党培养考察记录册
      </h2>

      <div className="training-cover-page__info training-cover-page__info--activist">
        <div className="training-cover-line">
          <div className="training-cover-line__label training-cover-line__label--activist">
            姓名
          </div>
          <LineField
            className="training-cover-line__content training-cover-line__content--activist"
            fieldId="basic.姓名"
            value={formData['basic.姓名']}
          />
        </div>
        <div className="training-cover-line">
          <div className="training-cover-line__label training-cover-line__label--activist">
            所在单位
          </div>
          <LineField
            className="training-cover-line__content training-cover-line__content--activist"
            fieldId="basic.班级"
            value={formData['basic.班级']}
          />
        </div>
        <div className="training-cover-line">
          <div className="training-cover-line__label training-cover-line__label--activist training-cover-line__label--compact">
            党委(党工委)
          </div>
          <div className="training-cover-line__content training-cover-line__content--fixed training-cover-line__content--activist">
            计算机学院党委
          </div>
        </div>
        <div className="training-cover-line">
          <div className="training-cover-line__label training-cover-line__label--activist training-cover-line__label--compact">
            所在党支部
          </div>
          <LineField
            className="training-cover-line__content training-cover-line__content--activist"
            fieldId="activist.确定积极分子时所在党支部"
            value={formData['activist.确定积极分子时所在党支部']}
          />
        </div>
      </div>

      <div className="training-cover-page__imprint training-cover-page__imprint--activist">
        中共上海交通大学委员会组织部制
      </div>
    </A4Page>
  )
}

function Page2Instructions({ zoom }) {
  return (
    <A4Page
      className="training-template-page"
      contentClassName="training-instructions-page training-instructions-page--activist"
      zoom={zoom}
    >
      <h2 style={{fontSize: 32}} className="training-page-title training-page-title--activist-instructions">
        填写说明
      </h2>

      <div className="training-instruction-sections training-instruction-sections--activist">
        {ACTIVIST_INSTRUCTION_SECTIONS.map((section) => (
          <div key={section.marker} className="training-instruction-section">
            <div className="training-instruction-section__marker">{section.marker}</div>
            <div className="training-instruction-section__content">
              {section.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="training-instructions-footer training-instructions-footer--activist">
        ☆注：是否审核《入党申请人登记暨谈话表》或同类材料 □是□否
      </div>
    </A4Page>
  )
}

function Page3BasicInfo({ formData, zoom }) {
  return (
    <A4Page
      className="training-template-page"
      contentClassName="training-basic-page training-basic-page--activist"
      zoom={zoom}
    >
      <h2 style={{marginTop: 24}} className="training-page-title training-page-title--activist-basic">
        入党培养考察对象基本情况
      </h2>

      <table className="training-basic-table training-basic-table--activist">
        <colgroup>
          <col className="training-basic-table__col training-basic-table__col--label" />
          <col className="training-basic-table__col training-basic-table__col--value" />
          <col className="training-basic-table__col training-basic-table__col--label" />
          <col className="training-basic-table__col training-basic-table__col--value" />
          <col className="training-basic-table__col training-basic-table__col--label" />
          <col className="training-basic-table__col training-basic-table__col--value" />
        </colgroup>
        <tbody>
          <tr>
            <td className="training-basic-table__label">姓名</td>
            <td className="training-basic-table__value">
              <InlineField
                className="training-field-anchor--cell-fill"
                fieldId="basic.姓名"
                value={formData['basic.姓名']}
              />
            </td>
            <td className="training-basic-table__label">性别</td>
            <td className="training-basic-table__value">
              <InlineField
                className="training-field-anchor--cell-fill"
                fieldId="basic.性别"
                value={formData['basic.性别']}
              />
            </td>
            <td className="training-basic-table__label">出生年月</td>
            <td className="training-basic-table__value">
              <InlineField
                className="training-field-anchor--cell-fill"
                fieldId="basic.出生年月"
                value={formData['basic.出生年月']}
              />
            </td>
          </tr>
          <tr>
            <td className="training-basic-table__label training-basic-table__label--wide">
              身份证号码
            </td>
            <td className="training-basic-table__value" colSpan={2}>
              <InlineField
                className="training-field-anchor--cell-fill"
                fieldId="basic.身份证号"
                value={formData['basic.身份证号']}
              />
            </td>
            <td className="training-basic-table__label">手机号</td>
            <td className="training-basic-table__value" colSpan={2}>
              <InlineField
                className="training-field-anchor--cell-fill"
                fieldId="basic.电话"
                value={formData['basic.电话']}
              />
            </td>
          </tr>
          <tr>
            <td className="training-basic-table__label">所在学院</td>
            <td className="training-basic-table__value training-basic-table__value--center">
              计算机学院
            </td>
            <td className="training-basic-table__label">学号</td>
            <td className="training-basic-table__value">
              <InlineField
                className="training-field-anchor--cell-fill"
                fieldId="basic.学号"
                value={formData['basic.学号']}
              />
            </td>
            <td className="training-basic-table__label">现任职务</td>
            <td className="training-basic-table__value">
              <InlineField
                className="training-field-anchor--cell-fill"
                fieldId="acknowledge.现任职务"
                value={formData['acknowledge.现任职务']}
              />
            </td>
          </tr>
          <tr>
            <td className="training-basic-table__label training-basic-table__label--wide">
              申请入党时间
            </td>
            <td className="training-basic-table__value" colSpan={2}>
              <InlineField
                className="training-field-anchor--cell-fill"
                fieldId="submit.入党申请书落款日期"
                value={formData['submit.入党申请书落款日期']}
              />
            </td>
            <td className="training-basic-table__label">入团时间</td>
            <td className="training-basic-table__value" colSpan={2}>
              <InlineField
                className="training-field-anchor--cell-fill"
                fieldId="basic.入团年月"
                value={formData['basic.入团年月']}
              />
            </td>
          </tr>
          <tr>
            <td className="training-basic-table__section-label">
              推荐为入党积极分子方式
            </td>
            <td
              className="training-basic-table__value training-basic-table__value--center"
              colSpan={5}
            >
              团组织“推优”(√) 党员群众推荐( )
            </td>
          </tr>
          <tr>
            <td className="training-basic-table__section-label training-basic-table__section-label--tall">
              支委会（党员大会）对确定入党积极分子的意见
            </td>
            <td
              className="training-basic-table__value training-basic-table__value--tall"
              style={{paddingBottom: 8, height: 240}}
              colSpan={5}
            >
              <div style={{height:'100%'}} className="training-basic-table__record training-basic-table__record--activist">
                <InlineField
                  className="training-field-anchor--block training-field-anchor--opinion"
                  fieldId="acknowledge.支委会(党员大会)对确定入党积极分子的意见"
                  value={
                    formData['acknowledge.支委会(党员大会)对确定入党积极分子的意见']
                  }
                />
                <div className="training-stamp-row training-stamp-row--activist-basic">
                  <span>党支部名称：</span>
                  <LineField
                    className="training-signature-line training-signature-line--medium"
                    fieldId="activist.确定积极分子时所在党支部"
                    value={formData['activist.确定积极分子时所在党支部']}
                  />
                  <span>书记签名：</span>
                  <span className="training-signature-placeholder training-signature-placeholder--wide" />
                  <span>日期：</span>
                  <LineField
                    className="training-signature-line training-signature-line--date"
                    fieldId="acknowledge.确定积极分子日期"
                    value={formData['acknowledge.确定积极分子日期']}
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td
              className="training-basic-table__section-label training-basic-table__section-label--contacts"
              rowSpan={3}
            >
              培养联系人信息
            </td>
            <td className="training-basic-table__subheader">姓名</td>
            <td className="training-basic-table__subheader" colSpan={2}>
              入党时间/转正时间
            </td>
            <td className="training-basic-table__subheader" colSpan={2}>
              党内职务
            </td>
          </tr>
          <tr>
            <td className="training-basic-table__value training-basic-table__value--center">
              <InlineField
                className="training-field-anchor--cell-fill"
                fieldId="activist.入党联系人1"
                value={formData['activist.入党联系人1']}
              />
            </td>
            <td className="training-basic-table__value" colSpan={2}>
              <div className="training-basic-table__contact-dates">
                <InlineField
                  fieldId="activist.入党联系人1入党时间（预备时间）"
                  value={formData['activist.入党联系人1入党时间（预备时间）']}
                />
                <span>/</span>
                <InlineField
                  fieldId="activist.入党联系人1转正时间"
                  value={formData['activist.入党联系人1转正时间']}
                />
              </div>
            </td>
            <td className="training-basic-table__value" colSpan={2}>
              <InlineField
                className="training-field-anchor--cell-fill"
                fieldId="activist.入党联系人1党内职务"
                value={formData['activist.入党联系人1党内职务']}
              />
            </td>
          </tr>
          <tr>
            <td className="training-basic-table__value training-basic-table__value--center">
              <InlineField
                className="training-field-anchor--cell-fill"
                fieldId="activist.入党联系人2"
                value={formData['activist.入党联系人2']}
              />
            </td>
            <td className="training-basic-table__value" colSpan={2}>
              <div className="training-basic-table__contact-dates">
                <InlineField
                  fieldId="activist.入党联系人2入党时间（预备时间）"
                  value={formData['activist.入党联系人2入党时间（预备时间）']}
                />
                <span>/</span>
                <InlineField
                  fieldId="activist.入党联系人2转正时间"
                  value={formData['activist.入党联系人2转正时间']}
                />
              </div>
            </td>
            <td className="training-basic-table__value" colSpan={2}>
              <InlineField
                className="training-field-anchor--cell-fill"
                fieldId="activist.入党联系人2党内职务"
                value={formData['activist.入党联系人2党内职务']}
              />
            </td>
          </tr>
          <tr>
            <td className="training-basic-table__section-label">党委备案意见</td>
            <td className="training-basic-table__value" colSpan={5}>
              <div style={{padding: 8, height: 240}} className="training-basic-table__record training-basic-table__record--activist">
                <p style={{textAlign: 'left'}} className="training-fixed-paragraph training-fixed-paragraph--plain">
                  同意党支部将该同志确定为入党积极分子。
                </p>
                <div style={{height: 200}}></div>
                <div className="training-stamp-block training-stamp-block--activist-basic">
                  <div className="training-stamp-row training-stamp-row--activist-basic">
                    <span>党委（盖章）</span>
                    <span className="training-signature-placeholder training-signature-placeholder--stamp" />
                    <span>书记签名：</span>
                    <span className="training-signature-placeholder training-signature-placeholder--wide" />
                  </div>
                  <div style={{paddingLeft: 340}} className="training-stamp-row training-stamp-row--activist-basic-date">
                    <span>日期：</span>
                    <LineField
                      className="training-signature-line training-signature-line--date"
                      fieldId="activist.积极分子党委备案日期"
                      value={formData['activist.积极分子党委备案日期']}
                    />
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td style={{height: 64}} className="training-basic-table__label">备注</td>
            <td className="training-basic-table__value" colSpan={5}>
              <InlineField
                className="training-field-anchor--block training-field-anchor--note"
                fieldId="activist.备注"
                value={formData['activist.备注']}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </A4Page>
  )
}

function Page4Blank({ zoom }) {
  return (
    <A4Page
      className="training-template-page"
      contentClassName="training-blank-page"
      padded={false}
      zoom={zoom}
    />
  )
}

function Page5Quarter12({ formData, zoom }) {
  return (
    <A4Page
      className="training-template-page"
      contentClassName="training-quarter-page training-quarter-page--activist"
      zoom={zoom}
    >
      <table style={{margin: '96px 4px'}} className="training-quarter-table training-quarter-table--activist">
        <tbody>
          <tr>
            <td className="training-vertical-cell" rowSpan={4}>
              <VerticalText className="training-vertical-text" text="培养考察情况" />
            </td>
            <td className="training-quarter-block-cell">
              <table className="training-quarter-inner-table">
                <tbody>
                  <QuarterSection
                    dateFieldId="season1_1.联系人意见（一）落款日期"
                    dateValue={formData['season1_1.联系人意见（一）落款日期']}
                    endMonthFieldId="season1_1.电子版（一）所在季度截止月份"
                    endMonthValue={formData['season1_1.电子版（一）所在季度截止月份']}
                    opinionFieldId="season1_1.联系人意见（一）"
                    opinionValue={formData['season1_1.联系人意见（一）']}
                    quarterLabel="第一季度"
                    reportLabel="电子版（一）"
                    startMonthFieldId="season1_1.电子版（一）所在季度起始月份"
                    startMonthValue={formData['season1_1.电子版（一）所在季度起始月份']}
                  />
                  <QuarterSection
                    dateFieldId="season1_2.联系人意见（二）落款日期"
                    dateValue={formData['season1_2.联系人意见（二）落款日期']}
                    endMonthFieldId="season1_2.电子版（二）所在季度截止月份"
                    endMonthValue={formData['season1_2.电子版（二）所在季度截止月份']}
                    opinionFieldId="season1_2.联系人意见（二）"
                    opinionValue={formData['season1_2.联系人意见（二）']}
                    quarterLabel="第二季度"
                    reportLabel="电子版（二）"
                    startMonthFieldId="season1_2.电子版（二）所在季度起始月份"
                    startMonthValue={formData['season1_2.电子版（二）所在季度起始月份']}
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

function Page6HalfYearOpinion({ formData, zoom }) {
  return (
    <BranchOpinionPage
      dateFieldId="season1_half.党支部意见（半年）落款日期"
      dateValue={formData['season1_half.党支部意见（半年）落款日期']}
      opinionFieldId="season1_half.党支部意见（半年）"
      opinionValue={formData['season1_half.党支部意见（半年）']}
      stackDateBelow
      title="党支部考察意见（半年）"
      zoom={zoom}
    />
  )
}

function Page7Quarter34({ formData, zoom }) {
  return (
    <A4Page
      className="training-template-page"
      contentClassName="training-quarter-page training-quarter-page--activist"
      zoom={zoom}
    >
      <table style={{margin: '96px 4px'}} className="training-quarter-table training-quarter-table--activist">
        <tbody>
          <tr>
            <td className="training-vertical-cell" rowSpan={4}>
              <VerticalText className="training-vertical-text" text="培养考察情况" />
            </td>
            <td className="training-quarter-block-cell">
              <table className="training-quarter-inner-table">
                <tbody>
                  <QuarterSection
                    dateFieldId="season1_3.联系人意见（三）落款日期"
                    dateValue={formData['season1_3.联系人意见（三）落款日期']}
                    endMonthFieldId="season1_3.电子版（三）所在季度截止月份"
                    endMonthValue={formData['season1_3.电子版（三）所在季度截止月份']}
                    opinionFieldId="season1_3.联系人意见（三）"
                    opinionValue={formData['season1_3.联系人意见（三）']}
                    quarterLabel="第三季度"
                    reportLabel="电子版（三）"
                    startMonthFieldId="season1_3.电子版（三）所在季度起始月份"
                    startMonthValue={formData['season1_3.电子版（三）所在季度起始月份']}
                  />
                  <QuarterSection
                    dateFieldId="season1_4.联系人意见（四）落款日期"
                    dateValue={formData['season1_4.联系人意见（四）落款日期']}
                    endMonthFieldId="season1_4.电子版（四）所在季度截止月份"
                    endMonthValue={formData['season1_4.电子版（四）所在季度截止月份']}
                    opinionFieldId="season1_4.联系人意见（四）"
                    opinionValue={formData['season1_4.联系人意见（四）']}
                    quarterLabel="第四季度"
                    reportLabel="电子版（四）"
                    startMonthFieldId="season1_4.电子版（四）所在季度起始月份"
                    startMonthValue={formData['season1_4.电子版（四）所在季度起始月份']}
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

function Page8OneYearOpinion({ formData, zoom }) {
  return (
    <BranchOpinionPage
      dateFieldId="season1_annual.党支部意见（一年）落款日期"
      dateValue={formData['season1_annual.党支部意见（一年）落款日期']}
      opinionFieldId="season1_annual.党支部意见（一年）"
      opinionValue={formData['season1_annual.党支部意见（一年）']}
      stackDateBelow
      title="党支部考察意见（一年）"
      zoom={zoom}
    />
  )
}

function Page9MassOpinion({ formData, zoom }) {
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
              <div className="training-opinion-layout training-opinion-layout--mass">
                <div className="training-empty-body" />

                <div className="training-mass-signoff">
                  <div className="training-inline-signature training-inline-signature--right training-inline-signature--mass">
                    <span>党支部书记签字：</span>
                    <span className="training-signature-placeholder training-signature-placeholder--wide" />
                  </div>
                  <div className="training-inline-signature training-inline-signature--right training-inline-signature--mass">
                    <span>日期：</span>
                    <LineField
                      className="training-signature-line training-signature-line--date"
                      fieldId="candidate.发展对象群众座谈会日期"
                      value={formData['candidate.发展对象群众座谈会日期']}
                    />
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </A4Page>
  )
}

function Page10BranchCommitteeOpinion({ formData, zoom }) {
  return (
    <BranchOpinionPage
      dateFieldId="candidate.支委会日期"
      dateValue={formData['candidate.支委会日期']}
      opinionFieldId="candidate.支委会（党员大会意见）"
      opinionValue={formData['candidate.支委会（党员大会意见）']}
      stackDateBelow
      title="支委会（党员大会）意见"
      zoom={zoom}
    />
  )
}

function Page11DeputySecretaryAndCommitteeRecord({ formData, zoom }) {
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
              <div className="training-split-section training-split-section--deputy">
                <p className="training-fixed-paragraph training-fixed-paragraph--plain">
                  该同志在思想上要求上进，积极向党组织靠拢；学习认真负责，刻苦钻研；生活中团结同学，乐于助人。同意其为发展对象，并报学院党委备案。
                </p>

                <div className="training-split-signoff training-split-signoff--deputy">
                  <div className="training-inline-signature training-inline-signature--right training-inline-signature--split">
                    <span>签名:</span>
                    <span className="training-signature-placeholder training-signature-placeholder--wide" />
                  </div>
                  <div className="training-inline-signature training-inline-signature--right training-inline-signature--split">
                    <span>日期:</span>
                    <LineField
                      className="training-signature-line training-signature-line--date"
                      fieldId="candidate.学工副书记（负责人）意见日期"
                      value={formData['candidate.学工副书记（负责人）意见日期']}
                    />
                  </div>
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
              <div className="training-split-section training-split-section--record">
                <p className="training-fixed-paragraph training-fixed-paragraph--plain">同意备案为发展对象。</p>

                <div className="training-split-record-signoff">
                  <div className="training-split-record-signoff__top">
                    <div className="training-inline-signature training-inline-signature--split">
                      <span>党委盖章:</span>
                      <span className="training-stamp-placeholder" />
                    </div>
                    <div className="training-inline-signature training-inline-signature--split">
                      <span>书记签名:</span>
                      <span className="training-signature-placeholder training-signature-placeholder--wide" />
                    </div>
                  </div>
                  <div className="training-inline-signature training-inline-signature--split training-inline-signature--record-date">
                    <span>日期:</span>
                    <LineField
                      className="training-signature-line training-signature-line--date"
                      fieldId="candidate.党委备案日期（确定发展对象日期）"
                      value={formData['candidate.党委备案日期（确定发展对象日期）']}
                    />
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </A4Page>
  )
}

function Page12TrainingAndPoliticalReview({ formData, zoom }) {
  return (
    <A4Page
      className="training-template-page"
      contentClassName="training-section-page training-section-page--activist-review"
      zoom={zoom}
    >
      <table style={{marginTop: 96}} className="training-section-table training-activist-review-table">
        <colgroup>
          <col style={{ width: '118px' }} />
          <col style={{ width: '62px' }} />
          <col style={{ width: '72px' }} />
          <col style={{ width: '72px' }} />
          <col style={{ width: '72px' }} />
          <col style={{ width: '72px' }} />
          <col style={{ width: '72px' }} />
          <col style={{ width: '72px' }} />
        </colgroup>
        <tbody>
          <tr>
            <td className="training-activist-review-table__title" rowSpan={3}>教育培训情况</td>
            <td className="training-activist-review-table__head" colSpan={2}>培训班名称</td>
            <td className="training-activist-review-table__head" colSpan={2}>结业时间</td>
            <td className="training-activist-review-table__head" colSpan={3}>培训情况</td>
          </tr>
          <tr>
            <td className="training-activist-review-table__value" colSpan={2}>
              <InlineField
                className="training-field-anchor--block training-field-anchor--review-cell"
                fieldId="candidate.教育培训情况-培训班名称"
                value={formData['candidate.教育培训情况-培训班名称']}
              />
            </td>
            <td className="training-activist-review-table__value" colSpan={2}>
              <InlineField
                className="training-field-anchor--block training-field-anchor--review-cell"
                fieldId="candidate.教育培训情况-结业日期"
                value={formData['candidate.教育培训情况-结业日期']}
              />
            </td>
            <td className="training-activist-review-table__value" colSpan={3}>
              <InlineField
                className="training-field-anchor--block training-field-anchor--review-cell"
                fieldId="candidate.培训情况"
                value={formData['candidate.培训情况']}
              />
            </td>
          </tr>
          <tr>
            <td className="training-activist-review-table__value" colSpan={2}>
                <div style={{minHeight: 24}}></div>
            </td>
            <td className="training-activist-review-table__value" colSpan={2}>
            </td>
            <td className="training-activist-review-table__value" colSpan={3}>
            </td>
          </tr>
          <tr>
            <td className="training-vertical-cell training-vertical-cell--activist-report" rowSpan={4}>
              <VerticalText
                className="training-vertical-text training-vertical-text--long"
                text="政治审查报告"
              />
            </td>
            <td className="training-vertical-cell training-vertical-cell--method" rowSpan={3}>
              <VerticalText className="training-vertical-text training-vertical-text--method" text="政治审查方式" />
            </td>
            <td className="training-activist-review-table__head training-activist-review-table__head--light" colSpan={3}>对本人的政审形式</td>
            <td className="training-activist-review-table__head training-activist-review-table__head--light" colSpan={3}>对直系亲属和主要社会关系的政审形式</td>
          </tr>
          <tr>
            <td className="training-activist-review-table__method-label">同本人谈话</td>
            <td className="training-activist-review-table__method-label">查阅个人档案</td>
            <td className="training-activist-review-table__method-label">其他方式</td>
            <td className="training-activist-review-table__method-label">查阅个人档案</td>
            <td className="training-activist-review-table__method-label">函调或外调</td>
            <td className="training-activist-review-table__method-label">其他方式</td>
          </tr>
          <tr>
            <td className="training-activist-review-table__check">√</td>
            <td className="training-activist-review-table__check">√</td>
            <td className="training-activist-review-table__check" />
            <td className="training-activist-review-table__check" />
            <td className="training-activist-review-table__check">√</td>
            <td className="training-activist-review-table__check" />
          </tr>
          <tr>
            <td className="training-activist-review-table__body" colSpan={7}>
              <div className="training-political-body">
                <div className="training-political-copy">
                  <p className="training-fixed-paragraph training-fixed-paragraph--plain training-fixed-paragraph--political">
                    通过同本人谈话、查询个人档案对政审对象进行政治审查。经审查，该同志在校学习期间，认真学习党的基本知识，思想积极，要求进步。该同志政治历史清楚，在重大政治斗争中，未发现问题。
                  </p>
                  <p className="training-fixed-paragraph training-fixed-paragraph--plain training-fixed-paragraph--political">
                    经与 □班主任 □导师 □思政教师沟通，同意该生入党。通过函调或外调，对政审对象直系亲属和主要社会关系进行政治审查。经审查，该同志直系亲属历史问题情况如下：
                  </p>
                  <p className="training-political-copy__line">□无政历问题</p>
                  <p className="training-political-copy__line">□有需要向组织汇报的政历问题：（如有，请陈述）</p>
                  <p className="training-political-copy__line">综上，该同志综合政审情况： □合格  □其他（如有，请陈述）</p>
                </div>

                <div className="training-political-body__spacer" />

                <div className="training-political-signoff">
                  <div className="training-inline-signature training-inline-signature--right training-inline-signature--political">
                    <span>政审人签名：</span>
                    <span className="training-signature-placeholder training-signature-placeholder--wide" />
                  </div>
                  <div className="training-inline-signature training-inline-signature--right training-inline-signature--political">
                    <span>日期：</span>
                    <LineField
                      className="training-signature-line training-signature-line--date"
                      fieldId="candidate.政治审查报告日期"
                      value={formData['candidate.政治审查报告日期']}
                    />
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </A4Page>
  )
}

function Page13PublicityAndBranchReview({ formData, zoom }) {
  return (
    <A4Page
      className="training-template-page"
      contentClassName="training-section-page training-section-page--activist-notice"
      zoom={zoom}
    >
      <table className="training-section-table training-section-table--activist-notice">
        <tbody>
          <tr>
            <td className="training-vertical-cell">
              <VerticalText className="training-vertical-text" text="公示情况" />
            </td>
            <td className="training-section-body-cell training-section-body-cell--notice">
              <div className="training-opinion-layout training-opinion-layout--notice">
                <p className="training-fixed-paragraph training-fixed-paragraph--plain training-public-notice-paragraph">
                  <InlineField
                    className="training-field-anchor--inline-plain"
                    fieldId="basic.姓名"
                    value={formData['basic.姓名']}
                  />
                  同志的发展公示时间为
                  <InlineField
                    className="training-field-anchor--inline-plain"
                    fieldId="candidate.发展对象公示起始日期"
                    value={formData['candidate.发展对象公示起始日期']}
                  />
                  至
                  <InlineField
                    className="training-field-anchor--inline-plain"
                    fieldId="candidate.发展对象公示结束日期"
                    value={formData['candidate.发展对象公示结束日期']}
                  />
                  ，公示范围及方式为电信群楼张贴，来访（电/函）及邮件反馈情况如下：
                </p>
                <p className="training-public-notice-option">□无反馈</p>
                <p className="training-public-notice-option">□有反馈（根据实际情况记录）：</p>
              </div>
            </td>
          </tr>
          <tr>
            <td className="training-vertical-cell">
              <VerticalText className="training-vertical-text" text="党支部审查意见" />
            </td>
            <td className="training-section-body-cell">
              <div className="training-section-with-footer training-section-with-footer--branch-review">
                <InlineField
                  className="training-field-anchor--block training-field-anchor--opinion"
                  fieldId="candidate.党支部审查意见"
                  value={formData['candidate.党支部审查意见']}
                />

                <div className="training-section-signoff training-section-signoff--branch-review">
                  <div className="training-section-signoff__row">
                    <span>党支部：</span>
                    <LineField
                      className="training-signature-line training-signature-line--medium"
                      fieldId="candidate.确定发展对象时支部名称"
                      value={formData['candidate.确定发展对象时支部名称']}
                    />
                    <span>书记签名：</span>
                    <span className="training-signature-placeholder training-signature-placeholder--wide" />
                  </div>
                  <div className="training-section-signoff__row training-section-signoff__row--date">
                    <span>日期：</span>
                    <LineField
                      className="training-signature-line training-signature-line--date"
                      fieldId="candidate.党支部审查意见日期"
                      value={formData['candidate.党支部审查意见日期']}
                    />
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="training-vertical-cell">
              <VerticalText className="training-vertical-text" text="党委预审意见" />
            </td>
            <td className="training-section-body-cell">
              <div className="training-section-with-footer training-section-with-footer--pre-review">
                <p className="training-fixed-paragraph training-fixed-paragraph--plain">
                  该生思想积极向上，学习认真努力，群众基础好，政审合格。同意发展并下发《入党志愿书》由党支部指导填写。
                </p>

                <div className="training-section-signoff training-section-signoff--pre-review">
                  <div className="training-section-signoff__row">
                    <span>党委（盖章）：</span>
                    <span className="training-signature-placeholder training-signature-placeholder--stamp" />
                    <span>书记签名：</span>
                    <span className="training-signature-placeholder training-signature-placeholder--wide" />
                  </div>
                  <div className="training-section-signoff__row training-section-signoff__row--date">
                    <span>日期：</span>
                    <LineField
                      className="training-signature-line training-signature-line--date"
                      fieldId="candidate.党委预审意见日期"
                      value={formData['candidate.党委预审意见日期']}
                    />
                  </div>
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
                <InlineField
                  className="training-field-anchor--inline-plain"
                  fieldId="wish.志愿书编号"
                  value={formData['wish.志愿书编号']}
                />
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </A4Page>
  )
}

function Page14Blank({ zoom }) {
  return (
    <A4Page
      className="training-template-page"
      contentClassName="training-blank-page"
      padded={false}
      zoom={zoom}
    />
  )
}

function ActivistTable({ formData, zoom }) {
  return (
    <>
      <Page1Cover formData={formData} zoom={zoom} />
      <Page2Instructions zoom={zoom} />
      <Page3BasicInfo formData={formData} zoom={zoom} />
      <Page4Blank zoom={zoom} />
      <Page5Quarter12 formData={formData} zoom={zoom} />
      <Page6HalfYearOpinion formData={formData} zoom={zoom} />
      <Page7Quarter34 formData={formData} zoom={zoom} />
      <Page8OneYearOpinion formData={formData} zoom={zoom} />
      <Page9MassOpinion formData={formData} zoom={zoom} />
      <Page10BranchCommitteeOpinion formData={formData} zoom={zoom} />
      <Page11DeputySecretaryAndCommitteeRecord formData={formData} zoom={zoom} />
      <Page12TrainingAndPoliticalReview formData={formData} zoom={zoom} />
      <Page13PublicityAndBranchReview formData={formData} zoom={zoom} />
      <Page14Blank zoom={zoom} />
    </>
  )
}

export default ActivistTable

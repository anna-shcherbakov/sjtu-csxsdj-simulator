import clsx from 'clsx'
import A4Page from '../components/shared/A4Page'
import {
  TemplateField,
  TemplateLineField,
  VerticalText,
} from './shared/TemplatePrimitives'
import styles from './TalkTable.module.css'

const c = (...names) => clsx(names.map((name) => styles[name]).filter(Boolean))

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

const NEGATIVE_REVIEW_ITEM = '有否摘抄他人入党申请书或网上范例的情况'

function PartyField({ className, ...props }) {
  return (
    <TemplateField
      {...props}
      baseClassName={c('party-field-anchor')}
      className={className}
      emptyClassName={c('party-field-anchor--empty')}
      selectedClassName={c('party-field-anchor--selected')}
    />
  )
}

function LineField({ fieldId, value, className }) {
  return (
    <TemplateLineField
      anchorClassName={c('party-field-anchor--line')}
      baseClassName={c('party-field-anchor')}
      className={className}
      emptyClassName={c('party-field-anchor--empty')}
      fieldId={fieldId}
      selectedClassName={c('party-field-anchor--selected')}
      value={value}
    />
  )
}

function HandwritingLine({ className }) {
  return <span className={className} aria-hidden="true" />
}

function ReviewJudgeCell({ checked, label }) {
  return (
    <td className={c('party-review-judge')}>
      <span className={c('party-review-judge__label')}>{label}</span>
      {checked ? <span className={c('party-review-judge__mark')}>√</span> : null}
    </td>
  )
}

function Page1Cover({ formData, zoom }) {
  return (
    <A4Page className={c('party-template-page')} contentClassName={c('party-cover-page')} zoom={zoom}>
      <h2 className={c('party-cover-page__title')}>入党申请人登记暨谈话表</h2>

      <div className={c('party-cover-page__info')}>
        <div className={c('party-cover-line')}>
          <div className={c('party-cover-line__label', 'party-cover-line__label--name')}>
            <span>姓</span>
            <span>名</span>
          </div>
          <div className={c('party-cover-line__content')}>
            <LineField
              className={c('party-line-fill')}
              fieldId="basic.姓名"
              value={formData['basic.姓名']}
            />
          </div>
        </div>

        <div className={c('party-cover-line')}>
          <div className={c('party-cover-line__label')}>所在单位</div>
          <div className={c('party-cover-line__content')}>
            <LineField
              className={c('party-line-fill')}
              fieldId="talk.入党谈话时所属党支部"
              value={formData['talk.入党谈话时所属党支部']}
            />
          </div>
        </div>
      </div>

      <div className={c('party-cover-page__imprint')}>中共上海交通大学委员会组织部制</div>
    </A4Page>
  )
}

function Page2Registration({ formData, zoom }) {
  return (
    <A4Page
      className={c('party-template-page')}
      contentClassName={c('party-registration-page')}
      zoom={zoom}
    >
      <h2 className={c('party-page-title')}>入党申请人登记表</h2>

      <table className={c('party-registration-table', 'party-registration-table--basic')}>
        <colgroup>
          <col className={c('party-col-label')} />
          <col className={c('party-col-value')} />
          <col className={c('party-col-label')} />
          <col className={c('party-col-value')} />
          <col className={c('party-col-label')} />
          <col className={c('party-col-value')} />
          <col className={c('party-col-label')} />
          <col className={c('party-col-value', 'party-col-value--wide')} />
        </colgroup>
        <tbody>
          <tr>
            <td className={c('party-table-label')}>姓名</td>
            <td className={c('party-table-value')}>
              <PartyField
                className={c('party-field-anchor')}
                fieldId="basic.姓名"
                value={formData['basic.姓名']}
              />
            </td>
            <td className={c('party-table-label')}>性别</td>
            <td className={c('party-table-value')}>
              <PartyField
                className={c('party-field-anchor')}
                fieldId="basic.性别"
                value={formData['basic.性别']}
              />
            </td>
            <td className={c('party-table-label')}>民族</td>
            <td className={c('party-table-value')}>
              <PartyField
                className={c('party-field-anchor')}
                fieldId="basic.民族"
                value={formData['basic.民族']}
              />
            </td>
            <td className={c('party-table-label')}>籍贯</td>
            <td className={c('party-table-value')}>
              <PartyField
                className={c('party-field-anchor')}
                fieldId="basic.籍贯"
                value={formData['basic.籍贯']}
              />
            </td>
          </tr>
          <tr>
            <td className={c('party-table-label', 'party-table-label--stacked')}>
              <span>所属单位</span>
              <span>（部门）</span>
            </td>
            <td className={c('party-table-value')}>
              <PartyField
                className={c('party-field-anchor')}
                fieldId="basic.班级"
                value={formData['basic.班级']}
              />
            </td>
            <td className={c('party-table-label', 'party-table-label--stacked')}>
              <span>学号</span>
              <span>（工号）</span>
            </td>
            <td className={c('party-table-value')}>
              <PartyField
                className={c('party-field-anchor')}
                fieldId="basic.学号"
                value={formData['basic.学号']}
              />
            </td>
            <td className={c('party-table-label')}>入团年月</td>
            <td className={c('party-table-value')}>
              <PartyField
                className={c('party-field-anchor')}
                fieldId="basic.入团年月"
                value={formData['basic.入团年月']}
              />
            </td>
            <td className={c('party-table-label')}>曾任职务</td>
            <td className={c('party-table-value')}>
              <PartyField
                className={c('party-field-anchor')}
                fieldId="talk.曾任职务"
                value={formData['talk.曾任职务']}
              />
            </td>
          </tr>
          <tr>
            <td className={c('party-table-label', 'party-table-label--wide')}>
              递交入党申请书时间
            </td>
            <td className={c('party-table-value')} colSpan={3}>
              <PartyField
                className={c('party-field-anchor')}
                fieldId="submit.入党申请书落款日期"
                value={formData['submit.入党申请书落款日期']}
              />
            </td>
            <td className={c('party-table-label')}>身份证号</td>
            <td className={c('party-table-value')} colSpan={3}>
              <PartyField
                className={c('party-field-anchor')}
                fieldId="basic.身份证号"
                value={formData['basic.身份证号']}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <table className={c('party-registration-table', 'party-registration-table--review')}>
        <colgroup>
          <col className={c('party-review-col-title')} />
          <col />
          <col className={c('party-review-col-result')} />
          <col className={c('party-review-col-result')} />
        </colgroup>
        <tbody>
          {REGISTRATION_REVIEW_ITEMS.map((item, index) => (
            <tr key={item}>
              {index === 0 ? (
                <td
                  className={c('party-review-vertical-cell')}
                  rowSpan={REGISTRATION_REVIEW_ITEMS.length}
                >
                  <VerticalText
                    className={c('party-vertical-text', 'party-vertical-text--review')}
                    text="对入党申请书的审核"
                  />
                </td>
              ) : null}
              <td className={c('party-review-text')}>{`${index + 1}. ${item}`}</td>
              <ReviewJudgeCell
                checked={item !== NEGATIVE_REVIEW_ITEM}
                label="是"
              />
              <ReviewJudgeCell
                checked={item === NEGATIVE_REVIEW_ITEM}
                label="否"
              />
            </tr>
          ))}
        </tbody>
      </table>

      <div className={c('party-registration-page__signature')}>
        <div className={c('party-signature-group', 'party-signature-group--wide')}>
          <span className={c('party-signature-group__label')}>审核人党内职务：</span>
          <HandwritingLine className={c('party-signature-group__line')} />
        </div>
        <div className={c('party-signature-group', 'party-signature-group--medium')}>
          <span className={c('party-signature-group__label')}>签名：</span>
          <HandwritingLine className={c('party-signature-group__line')} />
        </div>
        <div className={c('party-signature-group', 'party-signature-group--date')}>
          <span className={c('party-signature-group__label')}>日期：</span>
          <HandwritingLine className={c('party-signature-group__line')} />
        </div>
      </div>
    </A4Page>
  )
}

function Page3InterviewRecord({ formData, zoom }) {
  return (
    <A4Page
      className={c('party-template-page')}
      contentClassName={c('party-interview-page')}
      zoom={zoom}
    >
      <table className={c('party-interview-table')}>
        <tbody>
          <tr className={c('party-interview-table__main-row')}>
            <td className={c('party-interview-vertical-cell')}>
              <VerticalText
                className={c('party-vertical-text', 'party-vertical-text--interview')}
                text="谈话记录（收到入党申请书后一个月完成）"
              />
            </td>
            <td className={c('party-interview-main-cell')}>
              <div className={c('party-interview-main')}>
                <div className={c('party-interview-record-box')}>
                  <PartyField
                    className={c('party-field-anchor', 'party-field-anchor--record')}
                    fieldId="talk.谈话记录（收到入党申请书后一个月完成）"
                    value={formData['talk.谈话记录（收到入党申请书后一个月完成）']}
                  />
                </div>

                <div className={c('party-interview-footer')}>
                  <div className={c('party-interview-footer__row')}>
                    <div className={c('party-signature-group', 'party-signature-group--wide', 'party-signature-group--interview-duty')}>
                      <span className={c('party-signature-group__label')}>
                        谈话人党内职务：
                      </span>
                      <HandwritingLine className={c('party-signature-group__line')} />
                    </div>
                    <div className={c('party-signature-group', 'party-signature-group--medium', 'party-signature-group--interview-signature')}>
                      <span className={c('party-signature-group__label')}>签 名：</span>
                      <HandwritingLine className={c('party-signature-group__line')} />
                    </div>
                  </div>
                  <div className={c('party-interview-footer__row', 'party-interview-footer__row--date')}>
                    <div className={c('party-signature-group', 'party-signature-group--date', 'party-signature-group--interview-date')}>
                      <span className={c('party-signature-group__label')}>日期：</span>
                      <LineField
                        className={c('party-signature-group__line')}
                        fieldId="talk.申请人谈话日期"
                        value={formData['talk.申请人谈话日期']}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr className={c('party-interview-table__remark-row')}>
            <td className={c('party-remark-table__label', 'party-interview-vertical-cell')}>
              <VerticalText className={c('party-vertical-text', 'party-vertical-text--remark')} text="备注" />
            </td>
            <td className={c('party-remark-table__blank')} />
          </tr>
        </tbody>
      </table>
    </A4Page>
  )
}

function Page4Blank({ zoom }) {
  return (
    <A4Page
      className={c('party-template-page')}
      contentClassName={c('party-blank-page')}
      padded={false}
      zoom={zoom}
    />
  )
}

function TalkTable({ formData, zoom }) {
  return (
    <>
      <Page1Cover formData={formData} zoom={zoom} />
      <Page2Registration formData={formData} zoom={zoom} />
      <Page3InterviewRecord formData={formData} zoom={zoom} />
      <Page4Blank zoom={zoom} />
    </>
  )
}

export default TalkTable

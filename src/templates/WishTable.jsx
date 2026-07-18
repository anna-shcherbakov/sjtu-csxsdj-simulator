import clsx from 'clsx'
import A4Page from '../components/shared/A4Page'
import {
  TemplateField,
  VerticalText as BaseVerticalText,
} from './shared/TemplatePrimitives'
import styles from './WishTable.module.css'

const c = (...names) => clsx(names.map((name) => styles[name]).filter(Boolean))

const FIELD_IDS = {
  name: 'basic.姓名',
  gender: 'basic.性别',
  ethnicity: 'basic.民族',
  birthYearMonth: 'basic.出生年月',
  nativePlace: 'basic.籍贯',
  birthPlace: 'basic.出生地',
  idNumber: 'basic.身份证号',
  leagueJoinYearMonth: 'basic.入团年月',
  education: 'wish.学历',
  degree: 'wish.学位或职称',
  unitPosition: 'wish.单位、职务或职业',
  residence: 'wish.现居住地',
  specialty: 'wish.有何专长',
  wishContent: 'wish.志愿书电子版内容',
  resume: 'wish.本人经历',
  leagueSchool: 'wish.加入共青团时所在学校',
  rewardInfo: 'wish.何时何地何原因受过何种奖励',
  spouseFlag: 'wish.是否有配偶',
  spouseName: 'wish.配偶姓名',
  spouseEthnicity: 'wish.配偶民族',
  spouseBirthYearMonth: 'wish.配偶出生年月',
  spouseNativePlace: 'wish.配偶籍贯',
  spouseEducation: 'wish.配偶学历',
  spouseWorkStart: 'wish.配偶参加工作时间',
  spousePoliticalStatus: 'wish.配偶政治面貌',
  spouseUnitPosition: 'wish.配偶单位、职务或职业',
  familyMembers: 'wish.家庭其他成员',
  introducerOpinion1: 'wish.入党介绍人1意见',
  introducerOpinion2: 'wish.入党介绍人2意见',
  introducerDate: 'wish.入党介绍人意见落款日期',
  branchResolution: 'wish.支部大会通过接收申请人为预备党员的决议',
  branchResolutionDate: 'wish.支部大会通过预备的日期',
  committeeApprovalDate: 'wish.党委审批日期',
  formalResolution:
    'formal.支部大会通过预备党员能否转为正式党员的决议（回到入党志愿书）',
  formalResolutionDate: 'formal.支部大会通过预备党员能否转为正式党员的决议落款日期',
  formalCommitteeDate: 'formal.基层党委审批意见落款日期',
}

const INSTRUCTION_PARAGRAPHS = [
  '一、申请人填写入党志愿书要严肃、认真、忠实。填写前，党支部负责人或入党介绍人应将表内项目向申请人解释清楚。',
  '二、填写入党志愿书应使用钢笔、签字笔或毛笔，并使用黑色或蓝黑色墨水。字迹要清晰、工整。表内的年、月、日一律用公历和阿拉伯数字。表内栏目没有内容填写时，应注明“无”。个别栏目填写不下时，可加附页。',
  '三、在上级党组织批准预备党员转为正式党员后，应及时将入党志愿书存入本人档案，没有档案的，由基层党委保存。',
]

const OATH_LINES = [
  '我志愿加入中国共产党，拥护党的纲领，',
  '遵守党的章程，履行党员义务，执行党的决',
  '定，严守党的纪律，保守党的秘密，对党忠',
  '诚，积极工作，为共产主义奋斗终身，随时',
  '准备为党和人民牺牲一切，永不叛党。',
]

const getValue = (formData, fieldId) => formData[fieldId]

const getListRows = (formData, fieldId) =>
  Array.isArray(formData[fieldId]) ? formData[fieldId] : []

const hasSpouse = (formData) => getValue(formData, FIELD_IDS.spouseFlag) === '有'

function TemplatePage({ children, contentClassName = '', zoom }) {
  return (
    <A4Page
      className={c('wish-template-page')}
      contentClassName={clsx(c('wish-page'), contentClassName)}
      padded={false}
      zoom={zoom}
    >
      {children}
    </A4Page>
  )
}

function InlineField({ className, fieldId, value }) {
  return (
    <TemplateField
      baseClassName={c('wish-field-anchor')}
      className={className}
      emptyClassName={c('wish-field-anchor--empty')}
      fieldId={fieldId}
      selectedClassName={c('wish-field-anchor--selected')}
      value={value}
    />
  )
}

function LineField({ className, fieldId, value }) {
  return (
    <span className={clsx(c('wish-line-field'), className)}>
      <InlineField
        className={c('wish-field-anchor--line')}
        fieldId={fieldId}
        value={value}
      />
    </span>
  )
}

function BlockField({ className, fieldId, value }) {
  return (
    <InlineField
      className={clsx(c('wish-field-anchor--block'), className)}
      fieldId={fieldId}
      value={value}
    />
  )
}

function InlinePlainField({ className, fieldId, value }) {
  return (
    <InlineField
      className={clsx(c('wish-field-anchor--inline-plain'), className)}
      fieldId={fieldId}
      value={value}
    />
  )
}

function BlankLine({ className }) {
  return <span className={clsx(c('wish-blank-line'), className)} />
}

function VerticalText({ className, text }) {
  return (
    <BaseVerticalText
      className={clsx(c('wish-vertical-text'), className)}
      text={text}
    />
  )
}

function SectionBox({ bodyClassName, children, className, footer, title }) {
  return (
    <section className={clsx(c('wish-section-box'), className)}>
      <div className={c('wish-section-box__title')}>{title}</div>
      <div className={clsx(c('wish-section-box__body'), bodyClassName)}>{children}</div>
      {footer ? <div className={c('wish-section-box__footer')}>{footer}</div> : null}
    </section>
  )
}

function ListRowField({ className, fieldId, value }) {
  return (
    <BlockField
      className={clsx(c('wish-field-anchor--list-row-cell'), className)}
      fieldId={fieldId}
      value={value}
    />
  )
}

function DateRow({ dateFieldId = null, dateValue = '' }) {
  return (
    <div className={c('wish-box-signoff__date-row')}>
      <span>日期：</span>
      {dateFieldId ? (
        <LineField
          className={c('wish-date-line')}
          fieldId={dateFieldId}
          value={dateValue}
        />
      ) : (
        <BlankLine className={c('wish-date-line')} />
      )}
    </div>
  )
}

function OrganizationFooter({
  dateFieldId = null,
  dateValue = '',
  organizationLabel,
  signatureLabel,
  stamp = false,
}) {
  return (
    <div className={c('wish-box-signoff')}>
      <div className={c('wish-box-signoff__row', 'wish-box-signoff__row--spread')}>
        <div className={c('wish-box-signoff__item')}>
          <span>{organizationLabel}</span>
          {stamp ? (
            <span className={c('wish-stamp-gap')} />
          ) : (
            <BlankLine className={c('wish-name-line')} />
          )}
        </div>
        <div className={c('wish-box-signoff__item')}>
          <span>{signatureLabel}</span>
          <BlankLine className={c('wish-sign-line')} />
        </div>
      </div>
      <DateRow dateFieldId={dateFieldId} dateValue={dateValue} />
    </div>
  )
}

function BranchFooter(props) {
  return (
    <OrganizationFooter
      {...props}
      organizationLabel="支部名称："
      signatureLabel="支部书记签名或盖章"
    />
  )
}

function ConversationFooter() {
  return (
    <div className={c('wish-box-signoff')}>
      <div className={c('wish-box-signoff__row')}>
        <span>谈话人单位、职务或职业</span>
        <BlankLine className={c('wish-name-line', 'wish-name-line--long')} />
      </div>
      <div className={c('wish-box-signoff__row', 'wish-box-signoff__row--spread')}>
        <div className={c('wish-box-signoff__item')}>
          <span>签名或盖章</span>
          <BlankLine className={c('wish-sign-line', 'wish-sign-line--medium')} />
        </div>
        <div className={c('wish-box-signoff__date-row')}>
          <span>年</span>
          <span>月</span>
          <span>日</span>
        </div>
      </div>
    </div>
  )
}

function GeneralBranchFooter({ dateFieldId = null, dateValue = '' }) {
  return (
    <OrganizationFooter
      dateFieldId={dateFieldId}
      dateValue={dateValue}
      organizationLabel="总支部名称"
      signatureLabel="总支部书记签名或盖章"
    />
  )
}

function CommitteeFooter({ dateFieldId = null, dateValue = '' }) {
  return (
    <OrganizationFooter
      dateFieldId={dateFieldId}
      dateValue={dateValue}
      organizationLabel="基层党委盖章"
      signatureLabel="党委书记签名或盖章"
      stamp
    />
  )
}

function CoverPage({ formData, zoom }) {
  return (
    <TemplatePage contentClassName={c('wish-cover-page')} zoom={zoom}>
      <div className={c('wish-cover-page__emblem-wrap')}>
        <img alt="" aria-hidden="true" className={c('wish-cover-page__emblem')} src={`${import.meta.env.BASE_URL}danghui.jpg`} />
      </div>

      <div className={c('wish-cover-page__title-small')}>中 国 共 产 党</div>
      <div className={c('wish-cover-page__title-large')}>入 党 志 愿 书</div>

      <div className={c('wish-cover-page__name-row')}>
        <span className={c('wish-cover-page__name-label')}>申请人姓名</span>
        <LineField
          className={c('wish-cover-page__name-line')}
          fieldId={FIELD_IDS.name}
          value={getValue(formData, FIELD_IDS.name)}
        />
      </div>

      <div className={c('wish-cover-page__footer')}>中共中央组织部印制</div>
    </TemplatePage>
  )
}

function InstructionsPage({ zoom }) {
  return (
    <TemplatePage contentClassName={c('wish-text-page')} zoom={zoom}>
      <h2 className={c('wish-spaced-title')}>说 明</h2>

      <div className={c('wish-text-stack')}>
        {INSTRUCTION_PARAGRAPHS.map((paragraph) => (
          <p className={c('wish-text-paragraph')} key={paragraph}>
            {paragraph}
          </p>
        ))}
      </div>
    </TemplatePage>
  )
}

function OathPage({ zoom }) {
  return (
    <TemplatePage contentClassName={c('wish-oath-page')} zoom={zoom}>
      <h2 className={c('wish-spaced-title')}>誓 词</h2>
      <div className={c('wish-oath-page__body')}>
        {OATH_LINES.map((line) => (
          <p className={c('wish-oath-page__line')} key={line}>
            {line}
          </p>
        ))}
      </div>
    </TemplatePage>
  )
}

function BasicInfoAndWishPage({ formData, zoom }) {
  return (
    <TemplatePage contentClassName={c('wish-form-page')} zoom={zoom}>
      <table className={c('wish-basic-info-table')}>
        <colgroup>
          <col className={c('wish-basic-info-table__label-col')} />
          <col className={c('wish-basic-info-table__value-col')} />
          <col className={c('wish-basic-info-table__label-col')} />
          <col className={c('wish-basic-info-table__value-col')} />
          <col className={c('wish-basic-info-table__label-col')} />
          <col className={c('wish-basic-info-table__value-col')} />
          <col className={c('wish-basic-info-table__photo-col')} />
        </colgroup>
        <tbody>
          <tr>
            <td className={c('wish-table__label')}>姓 名</td>
            <td className={c('wish-table__value')}>
              <InlineField fieldId={FIELD_IDS.name} value={getValue(formData, FIELD_IDS.name)} />
            </td>
            <td className={c('wish-table__label')}>性 别</td>
            <td className={c('wish-table__value')}>
              <InlineField
                fieldId={FIELD_IDS.gender}
                value={getValue(formData, FIELD_IDS.gender)}
              />
            </td>
            <td className={c('wish-table__label')}>民 族</td>
            <td className={c('wish-table__value')}>
              <InlineField
                fieldId={FIELD_IDS.ethnicity}
                value={getValue(formData, FIELD_IDS.ethnicity)}
              />
            </td>
            <td className={c('wish-photo-cell')} rowSpan={4}>
              <div className={c('wish-photo-cell__content')}>正面免冠照片（2寸）</div>
            </td>
          </tr>
          <tr>
            <td className={c('wish-table__label')}>籍 贯</td>
            <td className={c('wish-table__value')}>
              <InlineField
                fieldId={FIELD_IDS.nativePlace}
                value={getValue(formData, FIELD_IDS.nativePlace)}
              />
            </td>
            <td className={c('wish-table__label')}>出生年月</td>
            <td className={c('wish-table__value')}>
              <InlineField
                fieldId={FIELD_IDS.birthYearMonth}
                value={getValue(formData, FIELD_IDS.birthYearMonth)}
              />
            </td>
            <td className={c('wish-table__label')}>出生地</td>
            <td className={c('wish-table__value')}>
              <InlineField
                fieldId={FIELD_IDS.birthPlace}
                value={getValue(formData, FIELD_IDS.birthPlace)}
              />
            </td>
          </tr>
          <tr>
            <td className={c('wish-table__label')}>学 历</td>
            <td className={c('wish-table__value')}>
              <InlineField
                fieldId={FIELD_IDS.education}
                value={getValue(formData, FIELD_IDS.education)}
              />
            </td>
            <td className={c('wish-table__label')} colSpan={2}>
              学位或职称
            </td>
            <td className={c('wish-table__value')} colSpan={2}>
              <InlineField fieldId={FIELD_IDS.degree} value={getValue(formData, FIELD_IDS.degree)} />
            </td>
          </tr>
          <tr>
            <td className={c('wish-table__label')} colSpan={2}>
              单位、职务或职业
            </td>
            <td className={c('wish-table__value')} colSpan={4}>
              <InlineField
                fieldId={FIELD_IDS.unitPosition}
                value={getValue(formData, FIELD_IDS.unitPosition)}
              />
            </td>
          </tr>
          <tr>
            <td className={c('wish-table__label')} colSpan={2}>
              现居住地
            </td>
            <td className={c('wish-table__value')} colSpan={5}>
              <InlineField
                fieldId={FIELD_IDS.residence}
                value={getValue(formData, FIELD_IDS.residence)}
              />
            </td>
          </tr>
          <tr>
            <td className={c('wish-table__label')} colSpan={2}>
              居民身份证号码
            </td>
            <td className={c('wish-table__value')} colSpan={5}>
              <InlineField
                fieldId={FIELD_IDS.idNumber}
                value={getValue(formData, FIELD_IDS.idNumber)}
              />
            </td>
          </tr>
          <tr>
            <td className={c('wish-table__label')} colSpan={2}>
              有 何 专 长
            </td>
            <td className={c('wish-table__value')} colSpan={5}>
              <InlineField
                fieldId={FIELD_IDS.specialty}
                value={getValue(formData, FIELD_IDS.specialty)}
              />
            </td>
          </tr>
          <tr>
            <td className={c('wish-basic-info-table__title-cell')} colSpan={7}>
              入 党 志 愿
            </td>
          </tr>
          <tr>
            <td className={c('wish-basic-info-table__essay-cell')} colSpan={7}>
              <BlockField
                className={c('wish-field-anchor--essay')}
                fieldId={FIELD_IDS.wishContent}
                value={getValue(formData, FIELD_IDS.wishContent)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </TemplatePage>
  )
}

function ResumeAndLeaguePage({ formData, zoom }) {
  const resumeRows = getListRows(formData, FIELD_IDS.resume)
  const visibleResumeRows =
    resumeRows.length > 0 ? resumeRows : [{ 开始年月: '', 结束年月: '', 地点单位职务: '', 证明人: '' }]

  return (
    <TemplatePage contentClassName={c('wish-form-page')} zoom={zoom}>
      <div className={c('wish-continued-essay-box')} />

      <table className={c('wish-resume-table')}>
        <thead>
          <tr>
            <th className={c('wish-resume-table__title')} colSpan={4}>
              本 人 经 历（包括学历）
            </th>
          </tr>
          <tr>
            <th>自何年何月</th>
            <th>至何年何月</th>
            <th>在 何 地、何 单 位、任 何 职</th>
            <th>证明人</th>
          </tr>
        </thead>
        <tbody>
          {visibleResumeRows.map((row, index) => (
            <tr key={`resume-row-${index}`}>
              <td className={c('wish-resume-table__cell')}>
                <ListRowField fieldId={FIELD_IDS.resume} value={row?.开始年月 ?? ''} />
              </td>
              <td className={c('wish-resume-table__cell')}>
                <ListRowField fieldId={FIELD_IDS.resume} value={row?.结束年月 ?? ''} />
              </td>
              <td className={c('wish-resume-table__cell')}>
                <ListRowField fieldId={FIELD_IDS.resume} value={row?.地点单位职务 ?? ''} />
              </td>
              <td className={c('wish-resume-table__cell')}>
                <ListRowField fieldId={FIELD_IDS.resume} value={row?.证明人 ?? ''} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className={c('wish-league-table')}>
        <tbody>
          <tr>
            <td className={c('wish-league-table__label')}>何时何地加入中国共产主义青年团</td>
            <td className={c('wish-league-table__value')}>
              <div className={c('wish-inline-sentence')}>
                <InlinePlainField
                  fieldId={FIELD_IDS.leagueJoinYearMonth}
                  value={getValue(formData, FIELD_IDS.leagueJoinYearMonth)}
                />
                <span>于</span>
                <InlinePlainField
                  fieldId={FIELD_IDS.leagueSchool}
                  value={getValue(formData, FIELD_IDS.leagueSchool)}
                />
                <span>加入中国共产主义青年团</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </TemplatePage>
  )
}

function AwardsPoliticsSpousePage({ formData, zoom }) {
  const spouseVisible = hasSpouse(formData)

  return (
    <TemplatePage contentClassName={c('wish-form-page')} zoom={zoom}>
      <table className={c('wish-history-table')}>
        <tbody>
          <tr>
            <td className={c('wish-history-table__label')}>
              何时何地参加过何种民主党派或工商联，任何职务
            </td>
            <td className={c('wish-history-table__value')}>无</td>
          </tr>
          <tr>
            <td className={c('wish-history-table__label')}>
              何时何地参加过何种反动组织或封建迷信组织，任何职务，有何活动，以及有何其他政治历史问题，结论如何
            </td>
            <td className={c('wish-history-table__value')}>无</td>
          </tr>
          <tr>
            <td className={c('wish-history-table__label')}>
              何时何地何原因受过何种奖励
            </td>
            <td className={c('wish-history-table__value')}>
              <BlockField
                className={c('wish-field-anchor--cell-block')}
                fieldId={FIELD_IDS.rewardInfo}
                value={getValue(formData, FIELD_IDS.rewardInfo)}
              />
            </td>
          </tr>
          <tr>
            <td className={c('wish-history-table__label')}>
              何时何地何原因受过何种处分
            </td>
            <td className={c('wish-history-table__value')}>无</td>
          </tr>
        </tbody>
      </table>

      <table className={c('wish-spouse-table')}>
        <colgroup>
          <col className={c('wish-spouse-table__title-col')} />
          <col className={c('wish-spouse-table__role-col')} />
          <col className={c('wish-spouse-table__label-col')} />
          <col className={c('wish-spouse-table__value-col')} />
          <col className={c('wish-spouse-table__label-col')} />
          <col className={c('wish-spouse-table__value-col')} />
          <col className={c('wish-spouse-table__label-col')} />
          <col className={c('wish-spouse-table__value-col')} />
        </colgroup>
        <tbody>
          <tr>
            <td className={c('wish-spouse-table__vertical')} rowSpan={2}>
              <VerticalText text="家庭主要成员情况" />
            </td>
            <td className={c('wish-spouse-table__vertical')} rowSpan={2}>
              <VerticalText text="配偶" />
            </td>
            <td className={c('wish-spouse-table__label')}>姓名</td>
            <td className={c('wish-spouse-table__value')}>
              <InlineField
                fieldId={FIELD_IDS.spouseName}
                value={spouseVisible ? getValue(formData, FIELD_IDS.spouseName) : ''}
              />
            </td>
            <td className={c('wish-spouse-table__label')}>民族</td>
            <td className={c('wish-spouse-table__value')}>
              <InlineField
                fieldId={FIELD_IDS.spouseEthnicity}
                value={spouseVisible ? getValue(formData, FIELD_IDS.spouseEthnicity) : ''}
              />
            </td>
            <td className={c('wish-spouse-table__label')}>出生年月</td>
            <td className={c('wish-spouse-table__value')}>
              <InlineField
                fieldId={FIELD_IDS.spouseBirthYearMonth}
                value={
                  spouseVisible ? getValue(formData, FIELD_IDS.spouseBirthYearMonth) : ''
                }
              />
            </td>
          </tr>
          <tr>
            <td className={c('wish-spouse-table__label')}>籍贯</td>
            <td className={c('wish-spouse-table__value')} colSpan={3}>
              <InlineField
                fieldId={FIELD_IDS.spouseNativePlace}
                value={spouseVisible ? getValue(formData, FIELD_IDS.spouseNativePlace) : ''}
              />
            </td>
            <td className={c('wish-spouse-table__label')}>学历</td>
            <td className={c('wish-spouse-table__value')} colSpan={2}>
              <InlineField
                fieldId={FIELD_IDS.spouseEducation}
                value={spouseVisible ? getValue(formData, FIELD_IDS.spouseEducation) : ''}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </TemplatePage>
  )
}

function FamilyAndIssuePage({ formData, zoom }) {
  const spouseVisible = hasSpouse(formData)
  const familyRows = getListRows(formData, FIELD_IDS.familyMembers)
  const visibleFamilyRows =
    familyRows.length > 0
      ? familyRows
      : [{ 关系: '', 姓名: '', 出生年月: '', 政治面貌: '', 单位职务或职业: '' }]
  const familyVerticalRowSpan = visibleFamilyRows.length + 1

  return (
    <TemplatePage contentClassName={c('wish-form-page')} zoom={zoom}>
      <table className={c('wish-spouse-table', 'wish-spouse-table--continued')}>
        <colgroup>
          <col className={c('wish-spouse-table__title-col')} />
          <col className={c('wish-spouse-table__role-col')} />
          <col className={c('wish-spouse-table__label-col')} />
          <col className={c('wish-spouse-table__value-col')} />
          <col className={c('wish-spouse-table__label-col')} />
          <col className={c('wish-spouse-table__value-col')} />
          <col className={c('wish-spouse-table__label-col')} />
          <col className={c('wish-spouse-table__value-col')} />
        </colgroup>
        <tbody>
          <tr>
            <td className={c('wish-spouse-table__vertical')} rowSpan={2}>
              <VerticalText text="家庭主要成员情况" />
            </td>
            <td className={c('wish-spouse-table__vertical')} rowSpan={2}>
              <VerticalText text="配偶" />
            </td>
            <td className={c('wish-spouse-table__label')}>参加工作时间</td>
            <td className={c('wish-spouse-table__value')} colSpan={2}>
              <InlineField
                fieldId={FIELD_IDS.spouseWorkStart}
                value={spouseVisible ? getValue(formData, FIELD_IDS.spouseWorkStart) : ''}
              />
            </td>
            <td className={c('wish-spouse-table__label')}>政治面貌</td>
            <td className={c('wish-spouse-table__value')} colSpan={2}>
              <InlineField
                fieldId={FIELD_IDS.spousePoliticalStatus}
                value={
                  spouseVisible ? getValue(formData, FIELD_IDS.spousePoliticalStatus) : ''
                }
              />
            </td>
          </tr>
          <tr>
            <td className={c('wish-spouse-table__label')}>单位、职务或职业</td>
            <td className={c('wish-spouse-table__value')} colSpan={5}>
              <InlineField
                fieldId={FIELD_IDS.spouseUnitPosition}
                value={spouseVisible ? getValue(formData, FIELD_IDS.spouseUnitPosition) : ''}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <table className={c('wish-family-table')}>
        <colgroup>
          <col className={c('wish-family-table__title-col')} />
          <col className={c('wish-family-table__label-col')} />
          <col className={c('wish-family-table__value-col')} />
          <col className={c('wish-family-table__value-col')} />
          <col className={c('wish-family-table__value-col')} />
          <col className={c('wish-family-table__value-col-wide')} />
        </colgroup>
        <tbody>
          <tr>
            <td className={c('wish-family-table__vertical')} rowSpan={familyVerticalRowSpan}>
              <VerticalText text="其他成员" />
            </td>
            <td className={c('wish-family-table__header')}>关系</td>
            <td className={c('wish-family-table__header')}>姓名</td>
            <td className={c('wish-family-table__header')}>出生年月</td>
            <td className={c('wish-family-table__header')}>政治面貌</td>
            <td className={c('wish-family-table__header')}>单位、职务或职业</td>
          </tr>
          {visibleFamilyRows.map((row, index) => (
            <tr key={`family-row-${index}`}>
              <td className={c('wish-family-table__value')}>
                <ListRowField fieldId={FIELD_IDS.familyMembers} value={row?.关系 ?? ''} />
              </td>
              <td className={c('wish-family-table__value')}>
                <ListRowField fieldId={FIELD_IDS.familyMembers} value={row?.姓名 ?? ''} />
              </td>
              <td className={c('wish-family-table__value')}>
                <ListRowField fieldId={FIELD_IDS.familyMembers} value={row?.出生年月 ?? ''} />
              </td>
              <td className={c('wish-family-table__value')}>
                <ListRowField fieldId={FIELD_IDS.familyMembers} value={row?.政治面貌 ?? ''} />
              </td>
              <td className={c('wish-family-table__value')}>
                <ListRowField
                  fieldId={FIELD_IDS.familyMembers}
                  value={row?.单位职务或职业 ?? ''}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td className={c('wish-family-table__vertical')} rowSpan={5}>
              <VerticalText text="主要社会关系情况" />
            </td>
            <td className={c('wish-family-table__blank')} />
            <td className={c('wish-family-table__blank')} />
            <td className={c('wish-family-table__blank')} />
            <td className={c('wish-family-table__blank')} />
            <td className={c('wish-family-table__blank')} />
          </tr>
          <tr>
            <td className={c('wish-family-table__blank')} />
            <td className={c('wish-family-table__blank')} />
            <td className={c('wish-family-table__blank')} />
            <td className={c('wish-family-table__blank')} />
            <td className={c('wish-family-table__blank')} />
          </tr>
          <tr>
            <td className={c('wish-family-table__blank')} />
            <td className={c('wish-family-table__blank')} />
            <td className={c('wish-family-table__blank')} />
            <td className={c('wish-family-table__blank')} />
            <td className={c('wish-family-table__blank')} />
          </tr>
          <tr>
            <td className={c('wish-family-table__blank')} />
            <td className={c('wish-family-table__blank')} />
            <td className={c('wish-family-table__blank')} />
            <td className={c('wish-family-table__blank')} />
            <td className={c('wish-family-table__blank')} />
          </tr>
          <tr>
            <td className={c('wish-family-table__blank')} />
            <td className={c('wish-family-table__blank')} />
            <td className={c('wish-family-table__blank')} />
            <td className={c('wish-family-table__blank')} />
            <td className={c('wish-family-table__blank')} />
          </tr>
          <tr>
            <td className={c('wish-family-table__vertical')} rowSpan={1}>
              <VerticalText text="需要向党组织说明的问题" />
            </td>
            <td className={c('wish-family-table__issue-cell')} colSpan={5}>
              无
            </td>
          </tr>
        </tbody>
      </table>
    </TemplatePage>
  )
}

function IssueContinuationPage({ zoom }) {
  return (
    <TemplatePage contentClassName={c('wish-form-page')} zoom={zoom}>
      <table className={c('wish-issue-table')}>
        <tbody>
          <tr>
            <td className={c('wish-issue-table__vertical')}>
              <VerticalText text="党组织说明的问题" />
            </td>
            <td className={c('wish-issue-table__body')} />
          </tr>
          <tr>
            <td className={c('wish-issue-table__footer')} colSpan={2}>
              <div className={c('wish-issue-table__footer-inner')}>
                <div className={c('wish-issue-table__signature')}>
                  <span>本人签名或盖章</span>
                  <BlankLine className={c('wish-sign-line')} />
                </div>
                <div className={c('wish-issue-table__date')}>
                  <span>年</span>
                  <span>月</span>
                  <span>日</span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </TemplatePage>
  )
}

function IntroducerOpinionsPage({ formData, zoom }) {
  return (
    <TemplatePage contentClassName={c('wish-form-page')} zoom={zoom}>
      <table className={c('wish-introducer-table')}>
        <tbody>
          <tr>
            <td className={c('wish-introducer-table__vertical')} rowSpan={2}>
              <VerticalText text="入党介绍人意见" />
            </td>
            <td className={c('wish-introducer-table__section-cell')}>
              <div className={c('wish-introducer-section')}>
                <BlockField
                  className={c('wish-field-anchor--essay', 'wish-field-anchor--short-essay')}
                  fieldId={FIELD_IDS.introducerOpinion1}
                  value={getValue(formData, FIELD_IDS.introducerOpinion1)}
                />
                <div className={c('wish-introducer-section__footer')}>
                  <div className={c('wish-introducer-section__row')}>
                    <span>介绍人单位、职务或职业</span>
                    <BlankLine className={c('wish-name-line', 'wish-name-line--long')} />
                  </div>
                  <div className={c('wish-introducer-section__row', 'wish-introducer-section__row--spread')}>
                    <div className={c('wish-box-signoff__item')}>
                      <span>签名或盖章</span>
                      <BlankLine className={c('wish-sign-line', 'wish-sign-line--medium')} />
                    </div>
                    <DateRow
                      dateFieldId={FIELD_IDS.introducerDate}
                      dateValue={getValue(formData, FIELD_IDS.introducerDate)}
                    />
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className={c('wish-introducer-table__section-cell')}>
              <div className={c('wish-introducer-section')}>
                <BlockField
                  className={c('wish-field-anchor--essay', 'wish-field-anchor--short-essay')}
                  fieldId={FIELD_IDS.introducerOpinion2}
                  value={getValue(formData, FIELD_IDS.introducerOpinion2)}
                />
                <div className={c('wish-introducer-section__footer')}>
                  <div className={c('wish-introducer-section__row')}>
                    <span>介绍人单位、职务或职业</span>
                    <BlankLine className={c('wish-name-line', 'wish-name-line--long')} />
                  </div>
                  <div className={c('wish-introducer-section__row', 'wish-introducer-section__row--spread')}>
                    <div className={c('wish-box-signoff__item')}>
                      <span>签名或盖章</span>
                      <BlankLine className={c('wish-sign-line', 'wish-sign-line--medium')} />
                    </div>
                    <DateRow
                      dateFieldId={FIELD_IDS.introducerDate}
                      dateValue={getValue(formData, FIELD_IDS.introducerDate)}
                    />
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </TemplatePage>
  )
}

const APPROVAL_FOOTERS = {
  branch: BranchFooter,
  committee: CommitteeFooter,
  conversation: ConversationFooter,
  generalBranch: GeneralBranchFooter,
}

function ApprovalPage({ className, formData, sections, zoom }) {
  return (
    <TemplatePage
      contentClassName={clsx(c('wish-approval-page'), className)}
      zoom={zoom}
    >
      {sections.map((section) => {
        const Footer = APPROVAL_FOOTERS[section.footer]
        const footer = Footer ? (
          <Footer
            dateFieldId={section.dateFieldId}
            dateValue={getValue(formData, section.dateFieldId)}
          />
        ) : null

        return (
          <SectionBox
            bodyClassName={c(`wish-section-box__body--${section.bodyVariant}`)}
            footer={footer}
            key={section.title}
            title={section.title}
          >
            {section.fieldId ? (
              <BlockField
                className={c('wish-field-anchor--essay', 'wish-field-anchor--approval-body')}
                fieldId={section.fieldId}
                value={getValue(formData, section.fieldId)}
              />
            ) : (
              <div className={c('wish-empty-body')} />
            )}
          </SectionBox>
        )
      })}
    </TemplatePage>
  )
}

function BranchResolutionAndUpperOrgPage({ formData, zoom }) {
  return (
    <ApprovalPage
      formData={formData}
      sections={[
        { bodyVariant: 'medium', dateFieldId: FIELD_IDS.branchResolutionDate, fieldId: FIELD_IDS.branchResolution, footer: 'branch', title: '支部大会通过接收申请人为预备党员的决议' },
        { bodyVariant: 'medium', footer: 'conversation', title: '上级党组织指派专人进行谈话情况和对申请入党的意见' },
      ]}
      zoom={zoom}
    />
  )
}

function GeneralBranchAndCommitteeApprovalPage({ formData, zoom }) {
  return (
    <ApprovalPage
      formData={formData}
      sections={[
        { bodyVariant: 'medium', footer: 'generalBranch', title: '总支部审查（审批）意见' },
        { bodyVariant: 'medium', dateFieldId: FIELD_IDS.committeeApprovalDate, footer: 'committee', title: '基层党委审批意见' },
      ]}
      zoom={zoom}
    />
  )
}

function FormalConversionDecisionPage({ formData, zoom }) {
  return (
    <ApprovalPage
      className={c('wish-approval-page--triple')}
      formData={formData}
      sections={[
        { bodyVariant: 'compact', dateFieldId: FIELD_IDS.formalResolutionDate, fieldId: FIELD_IDS.formalResolution, footer: 'branch', title: '支部大会通过预备党员能否转为正式党员的决议' },
        { bodyVariant: 'compact', footer: 'generalBranch', title: '总支部审查（审批）意见' },
        { bodyVariant: 'compact', dateFieldId: FIELD_IDS.formalCommitteeDate, footer: 'committee', title: '基层党委审批意见' },
      ]}
      zoom={zoom}
    />
  )
}

function ExtendedConversionDecisionPage({ zoom }) {
  return (
    <ApprovalPage
      className={c('wish-approval-page--remark')}
      formData={{}}
      sections={[
        { bodyVariant: 'compact', footer: 'branch', title: '支部大会通过延长预备期的党员能否转为正式党员的决议' },
        { bodyVariant: 'compact', footer: 'generalBranch', title: '总支部审查（审批）意见' },
        { bodyVariant: 'compact', footer: 'committee', title: '基层党委审批意见' },
        { bodyVariant: 'remark', title: '备注' },
      ]}
      zoom={zoom}
    />
  )
}

function BackCoverPage({ zoom }) {
  return (
    <TemplatePage contentClassName={c('wish-back-cover')} zoom={zoom}>
      <div className={c('wish-back-cover__content')}>
        <div className={c('wish-back-cover__line')}>中 共 中 央 组 织 部</div>
        <div className={c('wish-back-cover__line')}>2 0 0 4 年 制</div>
        <div className={c('wish-back-cover__line')}>中共上海市委组织部翻印</div>
        <div className={c('wish-back-cover__line')}>沪 20XXXXXXXX</div>
      </div>
    </TemplatePage>
  )
}

function WishTable({ formData, zoom }) {
  return (
    <>
      <CoverPage formData={formData} zoom={zoom} />
      <InstructionsPage zoom={zoom} />
      <OathPage zoom={zoom} />
      <BasicInfoAndWishPage formData={formData} zoom={zoom} />
      <ResumeAndLeaguePage formData={formData} zoom={zoom} />
      <AwardsPoliticsSpousePage formData={formData} zoom={zoom} />
      <FamilyAndIssuePage formData={formData} zoom={zoom} />
      <IssueContinuationPage zoom={zoom} />
      <IntroducerOpinionsPage formData={formData} zoom={zoom} />
      <BranchResolutionAndUpperOrgPage formData={formData} zoom={zoom} />
      <GeneralBranchAndCommitteeApprovalPage formData={formData} zoom={zoom} />
      <FormalConversionDecisionPage formData={formData} zoom={zoom} />
      <ExtendedConversionDecisionPage zoom={zoom} />
      <BackCoverPage zoom={zoom} />
    </>
  )
}

export default WishTable

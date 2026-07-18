import clsx from "clsx";
import A4Page from "../components/shared/A4Page";
import {
  TrainingCoverPage,
  TrainingField,
  TrainingInstructionsPage,
  TrainingLineField,
  TrainingOpinionPage,
  TrainingQuarterPage,
  TrainingVerticalFramePage,
} from "./shared/TrainingTemplatePrimitives";
import TemplateDocument from "./shared/TemplateDocument";
import { definePages, readField } from "./config/defineTemplate";
import { PROBATIONARY_FIELDS } from "./config/templateFields";
import styles from "./ProbationaryTable.module.css";
import sharedStyles from "./templates.module.css";

const c = (...names) =>
  clsx(names.map((name) => styles[name] ?? sharedStyles[name]).filter(Boolean));

const INSTRUCTION_SECTIONS = [
  {
    marker: "一、",
    lines: ["发展对象经上级党委审批同意为预备党员后，开始填", "写此记录册。"],
  },
  {
    marker: "二、",
    lines: [
      "填写须用黑色或蓝黑色墨水的钢笔或水笔。字迹清晰",
      "，内容真实。表内栏目没有内容填写的，应注明“无",
      "”。个别栏目填写不下时，可另加附页。表内所有需",
      "要填写的“日期”均需精确到日。",
    ],
  },
  {
    marker: "三、",
    lines: [
      "本登记表一般由入党介绍人保管。教育考察程序结束",
      "、履行完转正手续后，此册须交党组织归入本人档案",
      "。若预备党员调动单位时，本登记表应归入本人人事",
      "档案或转给新单位党组织。",
    ],
  },
];

function InlineField({ fieldId, value, className }) {
  return (
    <TrainingField
      c={c}
      className={className}
      fieldId={fieldId}
      value={value}
    />
  );
}

function LineField({ fieldId, value, className }) {
  return (
    <TrainingLineField
      c={c}
      className={className}
      fieldId={fieldId}
      value={value}
    />
  );
}

function TableCellField({ fieldId, value, className }) {
  return (
    <InlineField
      className={c("training-field-anchor--probationary-cell", className)}
      fieldId={fieldId}
      value={value}
    />
  );
}

function Page1Cover({ formData, zoom }) {
  return (
    <TrainingCoverPage
      c={c}
      fields={[
        {
          label: "姓 名",
          fieldId: PROBATIONARY_FIELDS.personName,
          value: readField(formData, PROBATIONARY_FIELDS.personName),
        },
        {
          label: "所 在 单 位",
          fieldId: PROBATIONARY_FIELDS.organizationOrClass,
          value: readField(formData, PROBATIONARY_FIELDS.organizationOrClass),
        },
        { label: "党委(党工委)", compact: true, fixedText: "计算机学院党委" },
        {
          label: "所 在 党 支 部",
          fieldId: PROBATIONARY_FIELDS.probationaryPartyBranch,
          value: readField(
            formData,
            PROBATIONARY_FIELDS.probationaryPartyBranch,
          ),
        },
      ]}
      imprint="中共上海交通大学委员会组织部制"
      title="预备党员培养考察记录册"
      variant="probationary"
      zoom={zoom}
    />
  );
}

function InsideCoverBlankPage({ zoom }) {
  return (
    <A4Page
      className={c("training-template-page")}
      contentClassName={c("training-blank-page")}
      padded={false}
      zoom={zoom}
    />
  );
}

function Page2Instructions({ zoom }) {
  return (
    <TrainingInstructionsPage
      c={c}
      footer="☆注： 是否审核《入党培养考察记录册》或同类材料 ☑是□否"
      sections={INSTRUCTION_SECTIONS}
      variant="probationary"
      zoom={zoom}
    />
  );
}

function Page3BasicInfo({ formData, zoom }) {
  return (
    <A4Page
      className={c("training-template-page")}
      contentClassName={c(
        "training-basic-page",
        "training-basic-page--probationary",
      )}
      zoom={zoom}
    >
      <h2
        className={c(
          "training-page-title",
          "training-page-title--probationary-basic",
        )}
      >
        预备党员基本情况
      </h2>

      <table
        className={c(
          "training-basic-table",
          "training-basic-table--probationary",
        )}
      >
        <colgroup>
          <col className={c("training-basic-table__col--probationary-1")} />
          <col className={c("training-basic-table__col--probationary-2")} />
          <col className={c("training-basic-table__col--probationary-3")} />
          <col className={c("training-basic-table__col--probationary-4")} />
          <col className={c("training-basic-table__col--probationary-5")} />
          <col className={c("training-basic-table__col--probationary-6")} />
        </colgroup>
        <tbody>
          <tr className={c("training-basic-table__row--probationary-short")}>
            <td className={c("training-basic-table__label")}>姓名</td>
            <td
              className={c(
                "training-basic-table__value",
                "training-basic-table__value--probationary-center",
              )}
            >
              <TableCellField
                fieldId={PROBATIONARY_FIELDS.personName}
                value={readField(formData, PROBATIONARY_FIELDS.personName)}
              />
            </td>
            <td className={c("training-basic-table__label")}>性别</td>
            <td
              className={c(
                "training-basic-table__value",
                "training-basic-table__value--probationary-center",
              )}
            >
              <TableCellField
                fieldId={PROBATIONARY_FIELDS.gender}
                value={readField(formData, PROBATIONARY_FIELDS.gender)}
              />
            </td>
            <td className={c("training-basic-table__label")}>出生年月</td>
            <td
              className={c(
                "training-basic-table__value",
                "training-basic-table__value--probationary-center",
              )}
            >
              <TableCellField
                fieldId={PROBATIONARY_FIELDS.birthYearMonth}
                value={readField(formData, PROBATIONARY_FIELDS.birthYearMonth)}
              />
            </td>
          </tr>
          <tr className={c("training-basic-table__row--probationary-short")}>
            <td className={c("training-basic-table__label")}>籍贯</td>
            <td
              className={c(
                "training-basic-table__value",
                "training-basic-table__value--probationary-center",
              )}
            >
              <TableCellField
                fieldId={PROBATIONARY_FIELDS.nativePlace}
                value={readField(formData, PROBATIONARY_FIELDS.nativePlace)}
              />
            </td>
            <td className={c("training-basic-table__label")}>文化程度</td>
            <td
              className={c(
                "training-basic-table__value",
                "training-basic-table__value--probationary-center",
              )}
            >
              <TableCellField
                fieldId={PROBATIONARY_FIELDS.educationLevel}
                value={readField(formData, PROBATIONARY_FIELDS.educationLevel)}
              />
            </td>
            <td className={c("training-basic-table__label")}>职务</td>
            <td
              className={c(
                "training-basic-table__value",
                "training-basic-table__value--probationary-center",
              )}
            >
              <TableCellField
                fieldId={PROBATIONARY_FIELDS.currentPosition}
                value={readField(formData, PROBATIONARY_FIELDS.currentPosition)}
              />
            </td>
          </tr>
          <tr className={c("training-basic-table__row--probationary-medium")}>
            <td className={c("training-basic-table__label")}>申请入党日期</td>
            <td
              className={c(
                "training-basic-table__value",
                "training-basic-table__value--probationary-center",
              )}
              colSpan={2}
            >
              <TableCellField
                fieldId={PROBATIONARY_FIELDS.partyApplicationDate}
                value={readField(
                  formData,
                  PROBATIONARY_FIELDS.partyApplicationDate,
                )}
              />
            </td>
            <td className={c("training-basic-table__label")}>
              确定为入党积极分子日期
            </td>
            <td
              className={c(
                "training-basic-table__value",
                "training-basic-table__value--probationary-center",
              )}
              colSpan={2}
            >
              <TableCellField
                fieldId={PROBATIONARY_FIELDS.activistDate}
                value={readField(formData, PROBATIONARY_FIELDS.activistDate)}
              />
            </td>
          </tr>
          <tr className={c("training-basic-table__row--probationary-medium")}>
            <td className={c("training-basic-table__label")}>
              确定为发展对象日期
            </td>
            <td
              className={c(
                "training-basic-table__value",
                "training-basic-table__value--probationary-center",
              )}
              colSpan={2}
            >
              <TableCellField
                fieldId={PROBATIONARY_FIELDS.developmentTargetDate}
                value={readField(
                  formData,
                  PROBATIONARY_FIELDS.developmentTargetDate,
                )}
              />
            </td>
            <td className={c("training-basic-table__label")}>
              召开支部大会日期
            </td>
            <td
              className={c(
                "training-basic-table__value",
                "training-basic-table__value--probationary-center",
              )}
              colSpan={2}
            >
              <TableCellField
                fieldId={
                  PROBATIONARY_FIELDS.branchMeetingApproveProbationaryDate
                }
                value={readField(
                  formData,
                  PROBATIONARY_FIELDS.branchMeetingApproveProbationaryDate,
                )}
              />
            </td>
          </tr>
          <tr className={c("training-basic-table__row--probationary-period")}>
            <td className={c("training-basic-table__label")}>预备期起止日期</td>
            <td
              className={c(
                "training-basic-table__value",
                "training-basic-table__value--probationary-period",
              )}
              colSpan={2}
            >
              <div className={c("training-basic-table__period-stack")}>
                <div className={c("training-basic-table__period-line")}>
                  <InlineField
                    className={c("training-field-anchor--probationary-inline")}
                    fieldId={
                      PROBATIONARY_FIELDS.branchMeetingApproveProbationaryDate
                    }
                    value={readField(
                      formData,
                      PROBATIONARY_FIELDS.branchMeetingApproveProbationaryDate,
                    )}
                  />
                  <span>起</span>
                </div>
                <div className={c("training-basic-table__period-line")}>
                  <InlineField
                    className={c("training-field-anchor--probationary-inline")}
                    fieldId={PROBATIONARY_FIELDS.probationaryInspectionEndDate}
                    value={readField(
                      formData,
                      PROBATIONARY_FIELDS.probationaryInspectionEndDate,
                    )}
                  />
                  <span>止</span>
                </div>
              </div>
            </td>
            <td className={c("training-basic-table__label")}>
              延长预备期起止日期
            </td>
            <td
              className={c(
                "training-basic-table__value",
                "training-basic-table__value--probationary-period",
              )}
              colSpan={2}
            >
              <div
                className={c(
                  "training-basic-table__period-stack",
                  "training-basic-table__period-stack--empty",
                )}
              >
                <div
                  className={c(
                    "training-basic-table__period-line",
                    "training-basic-table__period-line--empty",
                  )}
                >
                  <span>起</span>
                </div>
                <div
                  className={c(
                    "training-basic-table__period-line",
                    "training-basic-table__period-line--empty",
                  )}
                >
                  <span>止</span>
                </div>
              </div>
            </td>
          </tr>
          <tr
            className={c(
              "training-basic-table__row--probationary-contacts-title",
            )}
          >
            <td
              className={c(
                "training-basic-table__subheader",
                "training-basic-table__subheader--probationary-section",
              )}
              colSpan={6}
            >
              考察人
            </td>
          </tr>
          <tr
            className={c("training-basic-table__row--probationary-subheader")}
          >
            <td className={c("training-basic-table__subheader")} colSpan={2}>
              姓名
            </td>
            <td className={c("training-basic-table__subheader")} colSpan={2}>
              所在支部
            </td>
            <td className={c("training-basic-table__subheader")}>职务</td>
            <td className={c("training-basic-table__subheader")}>
              是否正式党员
            </td>
          </tr>
          <tr className={c("training-basic-table__row--probationary-contact")}>
            <td
              className={c(
                "training-basic-table__value",
                "training-basic-table__value--probationary-center",
              )}
              colSpan={2}
            >
              <TableCellField
                fieldId={PROBATIONARY_FIELDS.inspector1Name}
                value={readField(formData, PROBATIONARY_FIELDS.inspector1Name)}
              />
            </td>
            <td
              className={c(
                "training-basic-table__value",
                "training-basic-table__value--probationary-center",
              )}
              colSpan={2}
            >
              <TableCellField
                fieldId={PROBATIONARY_FIELDS.probationaryPartyBranch}
                value={readField(
                  formData,
                  PROBATIONARY_FIELDS.probationaryPartyBranch,
                )}
              />
            </td>
            <td
              className={c(
                "training-basic-table__value",
                "training-basic-table__value--probationary-center",
              )}
            >
              <TableCellField
                fieldId={PROBATIONARY_FIELDS.inspector1Position}
                value={readField(
                  formData,
                  PROBATIONARY_FIELDS.inspector1Position,
                )}
              />
            </td>
            <td
              className={c(
                "training-basic-table__value",
                "training-basic-table__value--probationary-center",
              )}
            >
              <TableCellField
                fieldId={PROBATIONARY_FIELDS.inspector1FormalMember}
                value={readField(
                  formData,
                  PROBATIONARY_FIELDS.inspector1FormalMember,
                )}
              />
            </td>
          </tr>
          <tr className={c("training-basic-table__row--probationary-contact")}>
            <td
              className={c(
                "training-basic-table__value",
                "training-basic-table__value--probationary-center",
              )}
              colSpan={2}
            >
              <TableCellField
                fieldId={PROBATIONARY_FIELDS.inspector2Name}
                value={readField(formData, PROBATIONARY_FIELDS.inspector2Name)}
              />
            </td>
            <td
              className={c(
                "training-basic-table__value",
                "training-basic-table__value--probationary-center",
              )}
              colSpan={2}
            >
              <TableCellField
                fieldId={PROBATIONARY_FIELDS.probationaryPartyBranch}
                value={readField(
                  formData,
                  PROBATIONARY_FIELDS.probationaryPartyBranch,
                )}
              />
            </td>
            <td
              className={c(
                "training-basic-table__value",
                "training-basic-table__value--probationary-center",
              )}
            >
              <TableCellField
                fieldId={PROBATIONARY_FIELDS.inspector2Position}
                value={readField(
                  formData,
                  PROBATIONARY_FIELDS.inspector2Position,
                )}
              />
            </td>
            <td
              className={c(
                "training-basic-table__value",
                "training-basic-table__value--probationary-center",
              )}
            >
              <TableCellField
                fieldId={PROBATIONARY_FIELDS.inspector2FormalMember}
                value={readField(
                  formData,
                  PROBATIONARY_FIELDS.inspector2FormalMember,
                )}
              />
            </td>
          </tr>
          <tr className={c("training-basic-table__row--probationary-record")}>
            <td
              className={c(
                "training-basic-table__section-label",
                "training-basic-table__section-label--probationary",
              )}
            >
              编入党
              <br />
              支部或
              <br />
              党小组
            </td>
            <td
              className={c(
                "training-basic-table__value",
                "training-basic-table__value--probationary-paragraph",
              )}
              colSpan={2}
            >
              于
              <InlineField
                fieldId={PROBATIONARY_FIELDS.committeeApprovalDate}
                value={readField(
                  formData,
                  PROBATIONARY_FIELDS.committeeApprovalDate,
                )}
              />
              编入
              <InlineField
                fieldId={PROBATIONARY_FIELDS.probationaryPartyBranch}
                value={readField(
                  formData,
                  PROBATIONARY_FIELDS.probationaryPartyBranch,
                )}
              />
              。
            </td>
            <td
              className={c(
                "training-basic-table__section-label",
                "training-basic-table__section-label--probationary",
              )}
            >
              宣誓
              <br />
              记录
            </td>
            <td
              className={c(
                "training-basic-table__value",
                "training-basic-table__value--probationary-paragraph",
              )}
              colSpan={2}
            >
              于
              <InlineField
                fieldId={PROBATIONARY_FIELDS.oathDate}
                value={readField(formData, PROBATIONARY_FIELDS.oathDate)}
              />
              在
              <InlineField
                fieldId={PROBATIONARY_FIELDS.oathLocation}
                value={readField(formData, PROBATIONARY_FIELDS.oathLocation)}
              />
              宣誓。
            </td>
          </tr>
          <tr
            className={c("training-basic-table__row--probationary-strengths")}
          >
            <td
              className={c(
                "training-basic-table__section-label",
                "training-basic-table__section-label--probationary",
              )}
            >
              入党时
              <br />
              主要
              <br />
              优缺点
            </td>
            <td
              className={c(
                "training-basic-table__value",
                "training-basic-table__value--tall",
                "training-basic-table__value--probationary-textarea",
              )}
              colSpan={5}
            >
              <InlineField
                className={c(
                  "training-field-anchor--block",
                  "training-field-anchor--opinion",
                  "training-field-anchor--probationary-textarea",
                )}
                fieldId={PROBATIONARY_FIELDS.admissionStrengthsWeaknesses}
                value={readField(
                  formData,
                  PROBATIONARY_FIELDS.admissionStrengthsWeaknesses,
                )}
              />
            </td>
          </tr>
          <tr className={c("training-basic-table__row--probationary-note")}>
            <td className={c("training-basic-table__label")}>备注</td>
            <td
              className={c(
                "training-basic-table__value",
                "training-basic-table__value--probationary-note",
              )}
              colSpan={5}
            >
              <InlineField
                className={c(
                  "training-field-anchor--block",
                  "training-field-anchor--note",
                  "training-field-anchor--probationary-note",
                )}
                fieldId={PROBATIONARY_FIELDS.basicInfoRemark}
                value={readField(formData, PROBATIONARY_FIELDS.basicInfoRemark)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </A4Page>
  );
}

function Page8PublicNotice({ formData, zoom }) {
  return (
    <TrainingVerticalFramePage c={c} title="预备党员转正前公示情况" zoom={zoom}>
      <div
        className={c(
          "training-opinion-layout",
          "training-opinion-layout--notice",
          "training-opinion-layout--probationary-notice",
        )}
      >
        <p
          className={c(
            "training-fixed-paragraph",
            "training-fixed-paragraph--plain",
            "training-public-notice-paragraph",
            "training-public-notice-paragraph--probationary",
          )}
        >
          <InlineField
            className={c("training-field-anchor--inline-plain")}
            fieldId={PROBATIONARY_FIELDS.personName}
            value={readField(formData, PROBATIONARY_FIELDS.personName)}
          />
          同志的转正公示时间为
          <InlineField
            className={c("training-field-anchor--inline-plain")}
            fieldId={PROBATIONARY_FIELDS.publicNoticeStartDate}
            value={readField(
              formData,
              PROBATIONARY_FIELDS.publicNoticeStartDate,
            )}
          />
          至
          <InlineField
            className={c("training-field-anchor--inline-plain")}
            fieldId={PROBATIONARY_FIELDS.publicNoticeEndDate}
            value={readField(formData, PROBATIONARY_FIELDS.publicNoticeEndDate)}
          />
          ，拟转正时间为
          <InlineField
            className={c("training-field-anchor--inline-plain")}
            fieldId={PROBATIONARY_FIELDS.conversionResolutionDate}
            value={readField(
              formData,
              PROBATIONARY_FIELDS.conversionResolutionDate,
            )}
          />
          ，公示范围及方式为电信群楼张贴，无来访（电、函）无邮件反馈情况。
        </p>
        <div
          className={c(
            "training-public-notice-spacer",
            "training-public-notice-spacer--probationary",
          )}
        />
      </div>
    </TrainingVerticalFramePage>
  );
}

const QUARTER_LABELS = ["第一季度", "第二季度", "第三季度", "第四季度"];
const QUARTER_REPORT_LABELS = [
  "电子版（一）",
  "电子版（二）",
  "电子版（三）",
  "电子版（四）",
];
const PROBATIONARY_QUARTERS = PROBATIONARY_FIELDS.quarters.map(
  (quarter, index) => ({
    id: `quarter-${index + 1}`,
    label: QUARTER_LABELS[index],
    reportLabel: QUARTER_REPORT_LABELS[index],
    startMonthFieldId: quarter.startMonth,
    endMonthFieldId: quarter.endMonth,
    opinionFieldId: quarter.opinion,
    dateFieldId: quarter.opinionDate,
  }),
);

const PROBATIONARY_PAGE_COMPONENTS = {
  basicInfo: Page3BasicInfo,
  blank: InsideCoverBlankPage,
  cover: Page1Cover,
  instructions: Page2Instructions,
  opinion: TrainingOpinionPage,
  publicNotice: Page8PublicNotice,
  quarterRecord: TrainingQuarterPage,
};

const PROBATIONARY_PAGES = definePages("party-training-inspection-book-v2", [
  { id: "cover", component: "cover" },
  { id: "inside-cover-blank", component: "blank" },
  { id: "instructions", component: "instructions" },
  { id: "basic-info", component: "basicInfo" },
  {
    id: "education-record-quarter-1-2",
    component: "quarterRecord",
    props: {
      c,
      pageTitle: "教育考察记录",
      quarters: PROBATIONARY_QUARTERS.slice(0, 2),
      variant: "probationary",
      verticalTitle: "预备党员考察情况",
    },
  },
  {
    id: "branch-half-year-opinion",
    component: "opinion",
    props: {
      c,
      dateFieldId: PROBATIONARY_FIELDS.branchOpinionHalfYearDate,
      opinionFieldId: PROBATIONARY_FIELDS.branchOpinionHalfYear,
      signatureLabel: "党支部书记：",
      stackSignature: true,
      title: "党支部考察意见（半年）",
    },
  },
  {
    id: "education-record-quarter-3-4",
    component: "quarterRecord",
    props: {
      c,
      quarters: PROBATIONARY_QUARTERS.slice(2),
      variant: "probationary",
      verticalTitle: "预备党员考察情况",
    },
  },
  {
    id: "public-consultation",
    component: "opinion",
    props: {
      blank: true,
      c,
      dateFieldId: PROBATIONARY_FIELDS.publicConsultationDate,
      signatureLabel: "党支部书记签名：",
      stackSignature: true,
      title: "预备党员转正前征求党员和群众意见",
    },
  },
  { id: "public-notice", component: "publicNotice" },
  {
    id: "pre-conversion-branch-review",
    component: "opinion",
    props: {
      c,
      dateFieldId: PROBATIONARY_FIELDS.preConversionBranchReviewOpinionDate,
      opinionFieldId: PROBATIONARY_FIELDS.preConversionBranchReviewOpinion,
      signatureLabel: "党支部书记签名：",
      stackSignature: true,
      title: "预备党员转正前党支部审查意见（一年）",
    },
  },
]);

function ProbationaryTable({ formData, zoom }) {
  return (
    <TemplateDocument
      components={PROBATIONARY_PAGE_COMPONENTS}
      formData={formData}
      pages={PROBATIONARY_PAGES}
      zoom={zoom}
    />
  );
}

export default ProbationaryTable;

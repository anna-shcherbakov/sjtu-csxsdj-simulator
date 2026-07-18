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
import { VerticalText } from "./shared/TemplatePrimitives";
import { definePages } from "./config/defineTemplate";
import { ACTIVIST_FIELDS } from "./config/templateFields";
import styles from "./ActivistTable.module.css";
import sharedStyles from "./templates.module.css";

const c = (...names) =>
  clsx(names.map((name) => styles[name] ?? sharedStyles[name]).filter(Boolean));

const NARROW_VERTICAL_COL_WIDTH = "84px";

const ACTIVIST_INSTRUCTION_SECTIONS = [
  {
    marker: "一、",
    lines: [
      "入党申请人经支部委员会或支部大会确定为入党积极",
      "分子后，即填写此记录册。",
    ],
  },
  {
    marker: "二、",
    lines: [
      "填写须用黑色或蓝黑色墨水的钢笔或水笔。字迹清晰，",
      "内容真实。表内栏目没有内容填写的，应注明“无”。",
      "个别栏目填写不下时，可另加附页。表内所有需要填写",
      "的“日期”均需精确到日。",
    ],
  },
  {
    marker: "三、",
    lines: [
      "本登记表一般由培养联系人保管。培养教育考察程序结",
      "束被吸收为预备党员后，此册须交党组织归入本人档案。",
      "若培养考察对象调动单位时，本登记表应归入本人人事",
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

function Page1Cover({ formData, zoom }) {
  return (
    <TrainingCoverPage
      c={c}
      fields={[
        {
          label: "姓 名",
          fieldId: ACTIVIST_FIELDS.person.name,
          value: formData[ACTIVIST_FIELDS.person.name],
        },
        {
          label: "所 在 单 位",
          fieldId: ACTIVIST_FIELDS.person.organizationOrClass,
          value: formData[ACTIVIST_FIELDS.person.organizationOrClass],
        },
        { label: "党委(党工委)", compact: true, fixedText: "计算机学院党委" },
        {
          label: "所 在 党 支 部",
          fieldId: ACTIVIST_FIELDS.person.partyBranch,
          value: formData[ACTIVIST_FIELDS.person.partyBranch],
        },
      ]}
      imprint="中共上海交通大学委员会组织部制"
      title="入党培养考察记录册"
      variant="activist"
      zoom={zoom}
    />
  );
}

function Page2Instructions({ zoom }) {
  return (
    <TrainingInstructionsPage
      c={c}
      footer="☆注：是否审核《入党申请人登记暨谈话表》或同类材料 □是□否"
      sections={ACTIVIST_INSTRUCTION_SECTIONS}
      titleStyle={{ fontSize: 32 }}
      variant="activist"
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
        "training-basic-page--activist",
      )}
      zoom={zoom}
    >
      <h2
        style={{ marginTop: 24 }}
        className={c(
          "training-page-title",
          "training-page-title--activist-basic",
        )}
      >
        入党培养考察对象基本情况
      </h2>

      <table
        className={c("training-basic-table", "training-basic-table--activist")}
      >
        <colgroup>
          <col
            className={c(
              "training-basic-table__col",
              "training-basic-table__col--label",
            )}
          />
          <col
            className={c(
              "training-basic-table__col",
              "training-basic-table__col--value",
            )}
          />
          <col
            className={c(
              "training-basic-table__col",
              "training-basic-table__col--label",
            )}
          />
          <col
            className={c(
              "training-basic-table__col",
              "training-basic-table__col--value",
            )}
          />
          <col
            className={c(
              "training-basic-table__col",
              "training-basic-table__col--label",
            )}
          />
          <col
            className={c(
              "training-basic-table__col",
              "training-basic-table__col--value",
            )}
          />
        </colgroup>
        <tbody>
          <tr>
            <td className={c("training-basic-table__label")}>姓名</td>
            <td className={c("training-basic-table__value")}>
              <InlineField
                className={c("training-field-anchor--cell-fill")}
                fieldId={ACTIVIST_FIELDS.person.name}
                value={formData[ACTIVIST_FIELDS.person.name]}
              />
            </td>
            <td className={c("training-basic-table__label")}>性别</td>
            <td className={c("training-basic-table__value")}>
              <InlineField
                className={c("training-field-anchor--cell-fill")}
                fieldId={ACTIVIST_FIELDS.person.gender}
                value={formData[ACTIVIST_FIELDS.person.gender]}
              />
            </td>
            <td className={c("training-basic-table__label")}>出生年月</td>
            <td className={c("training-basic-table__value")}>
              <InlineField
                className={c("training-field-anchor--cell-fill")}
                fieldId={ACTIVIST_FIELDS.person.birthYearMonth}
                value={formData[ACTIVIST_FIELDS.person.birthYearMonth]}
              />
            </td>
          </tr>
          <tr>
            <td
              className={c(
                "training-basic-table__label",
                "training-basic-table__label--wide",
              )}
            >
              身份证号码
            </td>
            <td className={c("training-basic-table__value")} colSpan={2}>
              <InlineField
                className={c("training-field-anchor--cell-fill")}
                fieldId={ACTIVIST_FIELDS.person.idNumber}
                value={formData[ACTIVIST_FIELDS.person.idNumber]}
              />
            </td>
            <td className={c("training-basic-table__label")}>手机号</td>
            <td className={c("training-basic-table__value")} colSpan={2}>
              <InlineField
                className={c("training-field-anchor--cell-fill")}
                fieldId={ACTIVIST_FIELDS.person.phone}
                value={formData[ACTIVIST_FIELDS.person.phone]}
              />
            </td>
          </tr>
          <tr>
            <td className={c("training-basic-table__label")}>所在学院</td>
            <td
              className={c(
                "training-basic-table__value",
                "training-basic-table__value--center",
              )}
            >
              计算机学院
            </td>
            <td className={c("training-basic-table__label")}>学号</td>
            <td className={c("training-basic-table__value")}>
              <InlineField
                className={c("training-field-anchor--cell-fill")}
                fieldId={ACTIVIST_FIELDS.person.studentId}
                value={formData[ACTIVIST_FIELDS.person.studentId]}
              />
            </td>
            <td className={c("training-basic-table__label")}>现任职务</td>
            <td className={c("training-basic-table__value")}>
              <InlineField
                className={c("training-field-anchor--cell-fill")}
                fieldId={ACTIVIST_FIELDS.person.currentPosition}
                value={formData[ACTIVIST_FIELDS.person.currentPosition]}
              />
            </td>
          </tr>
          <tr>
            <td
              className={c(
                "training-basic-table__label",
                "training-basic-table__label--wide",
              )}
            >
              申请入党时间
            </td>
            <td className={c("training-basic-table__value")} colSpan={2}>
              <InlineField
                className={c("training-field-anchor--cell-fill")}
                fieldId={ACTIVIST_FIELDS.person.applicationDate}
                value={formData[ACTIVIST_FIELDS.person.applicationDate]}
              />
            </td>
            <td className={c("training-basic-table__label")}>入团时间</td>
            <td className={c("training-basic-table__value")} colSpan={2}>
              <InlineField
                className={c("training-field-anchor--cell-fill")}
                fieldId={ACTIVIST_FIELDS.person.leagueJoinYearMonth}
                value={formData[ACTIVIST_FIELDS.person.leagueJoinYearMonth]}
              />
            </td>
          </tr>
          <tr>
            <td className={c("training-basic-table__section-label")}>
              推荐为入党积极分子方式
            </td>
            <td
              className={c(
                "training-basic-table__value",
                "training-basic-table__value--center",
              )}
              colSpan={5}
            >
              团组织“推优”(√) 党员群众推荐( )
            </td>
          </tr>
          <tr>
            <td
              className={c(
                "training-basic-table__section-label",
                "training-basic-table__section-label--tall",
              )}
            >
              支委会（党员大会）对确定入党积极分子的意见
            </td>
            <td
              className={c(
                "training-basic-table__value",
                "training-basic-table__value--tall",
              )}
              style={{ paddingBottom: 8, height: 240 }}
              colSpan={5}
            >
              <div
                style={{ height: "100%" }}
                className={c(
                  "training-basic-table__record",
                  "training-basic-table__record--activist",
                )}
              >
                <InlineField
                  className={c(
                    "training-field-anchor--block",
                    "training-field-anchor--opinion",
                  )}
                  fieldId={ACTIVIST_FIELDS.person.initialBranchOpinion}
                  value={formData[ACTIVIST_FIELDS.person.initialBranchOpinion]}
                />
                <div
                  className={c(
                    "training-stamp-row",
                    "training-stamp-row--activist-basic",
                  )}
                >
                  <span>党支部名称：</span>
                  <LineField
                    className={c(
                      "training-signature-line",
                      "training-signature-line--medium",
                    )}
                    fieldId={ACTIVIST_FIELDS.person.partyBranch}
                    value={formData[ACTIVIST_FIELDS.person.partyBranch]}
                  />
                  <span>书记签名：</span>
                  <span
                    className={c(
                      "training-signature-placeholder",
                      "training-signature-placeholder--wide",
                    )}
                  />
                  <span>日期：</span>
                  <LineField
                    className={c(
                      "training-signature-line",
                      "training-signature-line--date",
                    )}
                    fieldId={ACTIVIST_FIELDS.person.activistDate}
                    value={formData[ACTIVIST_FIELDS.person.activistDate]}
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td
              className={c(
                "training-basic-table__section-label",
                "training-basic-table__section-label--contacts",
              )}
              rowSpan={3}
            >
              培养联系人信息
            </td>
            <td className={c("training-basic-table__subheader")}>姓名</td>
            <td className={c("training-basic-table__subheader")} colSpan={2}>
              入党时间/转正时间
            </td>
            <td className={c("training-basic-table__subheader")} colSpan={2}>
              党内职务
            </td>
          </tr>
          <tr>
            <td
              className={c(
                "training-basic-table__value",
                "training-basic-table__value--center",
              )}
            >
              <InlineField
                className={c("training-field-anchor--cell-fill")}
                fieldId={ACTIVIST_FIELDS.person.contact1}
                value={formData[ACTIVIST_FIELDS.person.contact1]}
              />
            </td>
            <td className={c("training-basic-table__value")} colSpan={2}>
              <div className={c("training-basic-table__contact-dates")}>
                <InlineField
                  fieldId={ACTIVIST_FIELDS.person.contact1ProbationaryDate}
                  value={
                    formData[ACTIVIST_FIELDS.person.contact1ProbationaryDate]
                  }
                />
                <span>/</span>
                <InlineField
                  fieldId={ACTIVIST_FIELDS.person.contact1FormalDate}
                  value={formData[ACTIVIST_FIELDS.person.contact1FormalDate]}
                />
              </div>
            </td>
            <td className={c("training-basic-table__value")} colSpan={2}>
              <InlineField
                className={c("training-field-anchor--cell-fill")}
                fieldId={ACTIVIST_FIELDS.person.contact1Position}
                value={formData[ACTIVIST_FIELDS.person.contact1Position]}
              />
            </td>
          </tr>
          <tr>
            <td
              className={c(
                "training-basic-table__value",
                "training-basic-table__value--center",
              )}
            >
              <InlineField
                className={c("training-field-anchor--cell-fill")}
                fieldId={ACTIVIST_FIELDS.person.contact2}
                value={formData[ACTIVIST_FIELDS.person.contact2]}
              />
            </td>
            <td className={c("training-basic-table__value")} colSpan={2}>
              <div className={c("training-basic-table__contact-dates")}>
                <InlineField
                  fieldId={ACTIVIST_FIELDS.person.contact2ProbationaryDate}
                  value={
                    formData[ACTIVIST_FIELDS.person.contact2ProbationaryDate]
                  }
                />
                <span>/</span>
                <InlineField
                  fieldId={ACTIVIST_FIELDS.person.contact2FormalDate}
                  value={formData[ACTIVIST_FIELDS.person.contact2FormalDate]}
                />
              </div>
            </td>
            <td className={c("training-basic-table__value")} colSpan={2}>
              <InlineField
                className={c("training-field-anchor--cell-fill")}
                fieldId={ACTIVIST_FIELDS.person.contact2Position}
                value={formData[ACTIVIST_FIELDS.person.contact2Position]}
              />
            </td>
          </tr>
          <tr>
            <td className={c("training-basic-table__section-label")}>
              党委备案意见
            </td>
            <td className={c("training-basic-table__value")} colSpan={5}>
              <div
                className={c(
                  "training-basic-table__record",
                  "training-basic-table__record--activist",
                  "training-basic-table__record--committee",
                )}
              >
                <p
                  style={{ textAlign: "left" }}
                  className={c(
                    "training-fixed-paragraph",
                    "training-fixed-paragraph--plain",
                  )}
                >
                  同意党支部将该同志确定为入党积极分子。
                </p>
                <div className={c("training-basic-table__committee-spacer")} />
                <div
                  className={c(
                    "training-stamp-block",
                    "training-stamp-block--activist-basic",
                  )}
                >
                  <div
                    className={c(
                      "training-stamp-row",
                      "training-stamp-row--activist-basic",
                    )}
                  >
                    <span>党委（盖章）</span>
                    <span
                      className={c(
                        "training-signature-placeholder",
                        "training-signature-placeholder--stamp",
                      )}
                    />
                    <span>书记签名：</span>
                    <span
                      className={c(
                        "training-signature-placeholder",
                        "training-signature-placeholder--wide",
                      )}
                    />
                  </div>
                  <div
                    style={{ paddingLeft: 340 }}
                    className={c(
                      "training-stamp-row",
                      "training-stamp-row--activist-basic-date",
                    )}
                  >
                    <span>日期：</span>
                    <LineField
                      className={c(
                        "training-signature-line",
                        "training-signature-line--date",
                      )}
                      fieldId={ACTIVIST_FIELDS.person.committeeRecordDate}
                      value={
                        formData[ACTIVIST_FIELDS.person.committeeRecordDate]
                      }
                    />
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td
              style={{ height: 64 }}
              className={c("training-basic-table__label")}
            >
              备注
            </td>
            <td className={c("training-basic-table__value")} colSpan={5}>
              <InlineField
                className={c(
                  "training-field-anchor--block",
                  "training-field-anchor--note",
                )}
                fieldId={ACTIVIST_FIELDS.person.remark}
                value={formData[ACTIVIST_FIELDS.person.remark]}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </A4Page>
  );
}

const ACTIVIST_QUARTER_LABELS = [
  "第一季度",
  "第二季度",
  "第三季度",
  "第四季度",
];
const ACTIVIST_QUARTER_REPORT_LABELS = [
  "电子版（一）",
  "电子版（二）",
  "电子版（三）",
  "电子版（四）",
];
const ACTIVIST_QUARTERS = ACTIVIST_FIELDS.quarters.map((quarter, index) => ({
  id: `quarter-${index + 1}`,
  label: ACTIVIST_QUARTER_LABELS[index],
  reportLabel: ACTIVIST_QUARTER_REPORT_LABELS[index],
  startMonthFieldId: quarter.startMonth,
  endMonthFieldId: quarter.endMonth,
  opinionFieldId: quarter.opinion,
  dateFieldId: quarter.opinionDate,
}));

function Page9MassOpinion({ formData, zoom }) {
  return (
    <A4Page
      className={c("training-template-page")}
      contentClassName={c("training-opinion-page")}
      zoom={zoom}
    >
      <table className={c("training-large-opinion-table")}>
        <colgroup>
          <col style={{ width: NARROW_VERTICAL_COL_WIDTH }} />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <td className={c("training-vertical-cell")}>
              <VerticalText
                className={c(
                  "training-vertical-text",
                  "training-vertical-text--long",
                )}
                text="党员和群众意见"
              />
            </td>
            <td className={c("training-opinion-cell")}>
              <div
                className={c(
                  "training-opinion-layout",
                  "training-opinion-layout--mass",
                )}
              >
                <div className={c("training-empty-body")} />

                <div className={c("training-mass-signoff")}>
                  <div
                    className={c(
                      "training-inline-signature",
                      "training-inline-signature--right",
                      "training-inline-signature--mass",
                    )}
                  >
                    <span>党支部书记签字：</span>
                    <span
                      className={c(
                        "training-signature-placeholder",
                        "training-signature-placeholder--wide",
                      )}
                    />
                  </div>
                  <div
                    className={c(
                      "training-inline-signature",
                      "training-inline-signature--right",
                      "training-inline-signature--mass",
                    )}
                  >
                    <span>日期：</span>
                    <LineField
                      className={c(
                        "training-signature-line",
                        "training-signature-line--date",
                      )}
                      fieldId={ACTIVIST_FIELDS.candidate.massOpinionDate}
                      value={
                        formData[ACTIVIST_FIELDS.candidate.massOpinionDate]
                      }
                    />
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </A4Page>
  );
}

function Page11DeputySecretaryAndCommitteeRecord({ formData, zoom }) {
  return (
    <A4Page
      className={c("training-template-page")}
      contentClassName={c("training-split-page")}
      zoom={zoom}
    >
      <table className={c("training-split-table")}>
        <colgroup>
          <col style={{ width: NARROW_VERTICAL_COL_WIDTH }} />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <td className={c("training-vertical-cell")}>
              <VerticalText
                className={c(
                  "training-vertical-text",
                  "training-vertical-text--long",
                )}
                text="学工副书记（负责人）意见"
              />
            </td>
            <td className={c("training-split-cell")}>
              <div
                className={c(
                  "training-split-section",
                  "training-split-section--deputy",
                )}
              >
                <p
                  className={c(
                    "training-fixed-paragraph",
                    "training-fixed-paragraph--plain",
                  )}
                >
                  该同志在思想上要求上进，积极向党组织靠拢；学习认真负责，刻苦钻研；生活中团结同学，乐于助人。同意其为发展对象，并报学院党委备案。
                </p>

                <div
                  className={c(
                    "training-split-signoff",
                    "training-split-signoff--deputy",
                  )}
                >
                  <div
                    className={c(
                      "training-inline-signature",
                      "training-inline-signature--right",
                      "training-inline-signature--split",
                    )}
                  >
                    <span>签名:</span>
                    <span
                      className={c(
                        "training-signature-placeholder",
                        "training-signature-placeholder--wide",
                      )}
                    />
                  </div>
                  <div
                    className={c(
                      "training-inline-signature",
                      "training-inline-signature--right",
                      "training-inline-signature--split",
                    )}
                  >
                    <span>日期:</span>
                    <LineField
                      className={c(
                        "training-signature-line",
                        "training-signature-line--date",
                      )}
                      fieldId={ACTIVIST_FIELDS.candidate.deputySecretaryDate}
                      value={
                        formData[ACTIVIST_FIELDS.candidate.deputySecretaryDate]
                      }
                    />
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className={c("training-vertical-cell")}>
              <VerticalText
                className={c(
                  "training-vertical-text",
                  "training-vertical-text--long",
                )}
                text="党委备案意见"
              />
            </td>
            <td className={c("training-split-cell")}>
              <div
                className={c(
                  "training-split-section",
                  "training-split-section--record",
                )}
              >
                <p
                  className={c(
                    "training-fixed-paragraph",
                    "training-fixed-paragraph--plain",
                  )}
                >
                  同意备案为发展对象。
                </p>

                <div className={c("training-split-record-signoff")}>
                  <div className={c("training-split-record-signoff__top")}>
                    <div
                      className={c(
                        "training-inline-signature",
                        "training-inline-signature--split",
                      )}
                    >
                      <span>党委盖章:</span>
                      <span className={c("training-stamp-placeholder")} />
                    </div>
                    <div
                      className={c(
                        "training-inline-signature",
                        "training-inline-signature--split",
                      )}
                    >
                      <span>书记签名:</span>
                      <span
                        className={c(
                          "training-signature-placeholder",
                          "training-signature-placeholder--wide",
                        )}
                      />
                    </div>
                  </div>
                  <div
                    className={c(
                      "training-inline-signature",
                      "training-inline-signature--split",
                      "training-inline-signature--record-date",
                    )}
                  >
                    <span>日期:</span>
                    <LineField
                      className={c(
                        "training-signature-line",
                        "training-signature-line--date",
                      )}
                      fieldId={ACTIVIST_FIELDS.candidate.committeeRecordDate}
                      value={
                        formData[ACTIVIST_FIELDS.candidate.committeeRecordDate]
                      }
                    />
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </A4Page>
  );
}

function Page12TrainingAndPoliticalReview({ formData, zoom }) {
  return (
    <A4Page
      className={c("training-template-page")}
      contentClassName={c(
        "training-section-page",
        "training-section-page--activist-review",
      )}
      zoom={zoom}
    >
      <table
        style={{ marginTop: 96 }}
        className={c(
          "training-section-table",
          "training-activist-review-table",
        )}
      >
        <colgroup>
          <col style={{ width: "118px" }} />
          <col style={{ width: "62px" }} />
          <col style={{ width: "72px" }} />
          <col style={{ width: "72px" }} />
          <col style={{ width: "72px" }} />
          <col style={{ width: "72px" }} />
          <col style={{ width: "72px" }} />
          <col style={{ width: "72px" }} />
        </colgroup>
        <tbody>
          <tr>
            <td
              className={c("training-activist-review-table__title")}
              rowSpan={3}
            >
              教育培训情况
            </td>
            <td
              className={c("training-activist-review-table__head")}
              colSpan={2}
            >
              培训班名称
            </td>
            <td
              className={c("training-activist-review-table__head")}
              colSpan={2}
            >
              结业时间
            </td>
            <td
              className={c("training-activist-review-table__head")}
              colSpan={3}
            >
              培训情况
            </td>
          </tr>
          <tr>
            <td
              className={c("training-activist-review-table__value")}
              colSpan={2}
            >
              <InlineField
                className={c(
                  "training-field-anchor--block",
                  "training-field-anchor--review-cell",
                )}
                fieldId={ACTIVIST_FIELDS.candidate.trainingClassName}
                value={formData[ACTIVIST_FIELDS.candidate.trainingClassName]}
              />
            </td>
            <td
              className={c("training-activist-review-table__value")}
              colSpan={2}
            >
              <InlineField
                className={c(
                  "training-field-anchor--block",
                  "training-field-anchor--review-cell",
                )}
                fieldId={ACTIVIST_FIELDS.candidate.trainingCompletionDate}
                value={
                  formData[ACTIVIST_FIELDS.candidate.trainingCompletionDate]
                }
              />
            </td>
            <td
              className={c("training-activist-review-table__value")}
              colSpan={3}
            >
              <InlineField
                className={c(
                  "training-field-anchor--block",
                  "training-field-anchor--review-cell",
                )}
                fieldId={ACTIVIST_FIELDS.candidate.trainingSummary}
                value={formData[ACTIVIST_FIELDS.candidate.trainingSummary]}
              />
            </td>
          </tr>
          <tr>
            <td
              className={c("training-activist-review-table__value")}
              colSpan={2}
            >
              <div style={{ minHeight: 24 }}></div>
            </td>
            <td
              className={c("training-activist-review-table__value")}
              colSpan={2}
            ></td>
            <td
              className={c("training-activist-review-table__value")}
              colSpan={3}
            ></td>
          </tr>
          <tr>
            <td
              className={c(
                "training-vertical-cell",
                "training-vertical-cell--activist-report",
              )}
              rowSpan={4}
            >
              <VerticalText
                className={c(
                  "training-vertical-text",
                  "training-vertical-text--long",
                )}
                text="政治审查报告"
              />
            </td>
            <td
              className={c(
                "training-vertical-cell",
                "training-vertical-cell--method",
              )}
              rowSpan={3}
            >
              <VerticalText
                className={c(
                  "training-vertical-text",
                  "training-vertical-text--method",
                )}
                text="政治审查方式"
              />
            </td>
            <td
              className={c(
                "training-activist-review-table__head",
                "training-activist-review-table__head--light",
              )}
              colSpan={3}
            >
              对本人的政审形式
            </td>
            <td
              className={c(
                "training-activist-review-table__head",
                "training-activist-review-table__head--light",
              )}
              colSpan={3}
            >
              对直系亲属和主要社会关系的政审形式
            </td>
          </tr>
          <tr>
            <td className={c("training-activist-review-table__method-label")}>
              同本人谈话
            </td>
            <td className={c("training-activist-review-table__method-label")}>
              查阅个人档案
            </td>
            <td className={c("training-activist-review-table__method-label")}>
              其他方式
            </td>
            <td className={c("training-activist-review-table__method-label")}>
              查阅个人档案
            </td>
            <td className={c("training-activist-review-table__method-label")}>
              函调或外调
            </td>
            <td className={c("training-activist-review-table__method-label")}>
              其他方式
            </td>
          </tr>
          <tr>
            <td className={c("training-activist-review-table__check")}>√</td>
            <td className={c("training-activist-review-table__check")}>√</td>
            <td className={c("training-activist-review-table__check")} />
            <td className={c("training-activist-review-table__check")} />
            <td className={c("training-activist-review-table__check")}>√</td>
            <td className={c("training-activist-review-table__check")} />
          </tr>
          <tr>
            <td
              className={c("training-activist-review-table__body")}
              colSpan={7}
            >
              <div className={c("training-political-body")}>
                <div className={c("training-political-copy")}>
                  <p
                    className={c(
                      "training-fixed-paragraph",
                      "training-fixed-paragraph--plain",
                      "training-fixed-paragraph--political",
                    )}
                  >
                    通过同本人谈话、查询个人档案对政审对象进行政治审查。经审查，该同志在校学习期间，认真学习党的基本知识，思想积极，要求进步。该同志政治历史清楚，在重大政治斗争中，未发现问题。
                  </p>
                  <p
                    className={c(
                      "training-fixed-paragraph",
                      "training-fixed-paragraph--plain",
                      "training-fixed-paragraph--political",
                    )}
                  >
                    经与 □班主任 □导师
                    □思政教师沟通，同意该生入党。通过函调或外调，对政审对象直系亲属和主要社会关系进行政治审查。经审查，该同志直系亲属历史问题情况如下：
                  </p>
                  <p className={c("training-political-copy__line")}>
                    □无政历问题
                  </p>
                  <p className={c("training-political-copy__line")}>
                    □有需要向组织汇报的政历问题：（如有，请陈述）
                  </p>
                  <p className={c("training-political-copy__line")}>
                    综上，该同志综合政审情况： □合格 □其他（如有，请陈述）
                  </p>
                </div>

                <div className={c("training-political-body__spacer")} />

                <div className={c("training-political-signoff")}>
                  <div
                    className={c(
                      "training-inline-signature",
                      "training-inline-signature--right",
                      "training-inline-signature--political",
                    )}
                  >
                    <span>政审人签名：</span>
                    <span
                      className={c(
                        "training-signature-placeholder",
                        "training-signature-placeholder--wide",
                      )}
                    />
                  </div>
                  <div
                    className={c(
                      "training-inline-signature",
                      "training-inline-signature--right",
                      "training-inline-signature--political",
                    )}
                  >
                    <span>日期：</span>
                    <LineField
                      className={c(
                        "training-signature-line",
                        "training-signature-line--date",
                      )}
                      fieldId={ACTIVIST_FIELDS.candidate.politicalReviewDate}
                      value={
                        formData[ACTIVIST_FIELDS.candidate.politicalReviewDate]
                      }
                    />
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </A4Page>
  );
}

function Page13PublicityAndBranchReview({ formData, zoom }) {
  return (
    <A4Page
      className={c("training-template-page")}
      contentClassName={c(
        "training-section-page",
        "training-section-page--activist-notice",
      )}
      zoom={zoom}
    >
      <table
        style={{ marginTop: 96 }}
        className={c(
          "training-section-table",
          "training-section-table--activist-notice",
        )}
      >
        <colgroup>
          <col style={{ width: NARROW_VERTICAL_COL_WIDTH }} />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <td className={c("training-vertical-cell")}>
              <VerticalText
                className={c("training-vertical-text")}
                text="公示情况"
              />
            </td>
            <td
              className={c(
                "training-section-body-cell",
                "training-section-body-cell--notice",
              )}
            >
              <div
                className={c(
                  "training-opinion-layout",
                  "training-opinion-layout--notice",
                )}
              >
                <p
                  className={c(
                    "training-fixed-paragraph",
                    "training-fixed-paragraph--plain",
                    "training-public-notice-paragraph",
                  )}
                >
                  <InlineField
                    className={c("training-field-anchor--inline-plain")}
                    fieldId={ACTIVIST_FIELDS.person.name}
                    value={formData[ACTIVIST_FIELDS.person.name]}
                  />
                  同志的发展公示时间为
                  <InlineField
                    className={c("training-field-anchor--inline-plain")}
                    fieldId={ACTIVIST_FIELDS.candidate.publicityStartDate}
                    value={
                      formData[ACTIVIST_FIELDS.candidate.publicityStartDate]
                    }
                  />
                  至
                  <InlineField
                    className={c("training-field-anchor--inline-plain")}
                    fieldId={ACTIVIST_FIELDS.candidate.publicityEndDate}
                    value={formData[ACTIVIST_FIELDS.candidate.publicityEndDate]}
                  />
                  ，公示范围及方式为电信群楼张贴，来访（电/函）及邮件反馈情况如下：
                </p>
                <p className={c("training-public-notice-option")}>□无反馈</p>
                <p className={c("training-public-notice-option")}>
                  □有反馈（根据实际情况记录）：
                </p>
                <div style={{ height: 96 }}></div>
              </div>
            </td>
          </tr>
          <tr>
            <td className={c("training-vertical-cell")}>
              <VerticalText
                className={c("training-vertical-text")}
                text="党支部审查意见"
              />
            </td>
            <td className={c("training-section-body-cell")}>
              <div
                className={c(
                  "training-section-with-footer",
                  "training-section-with-footer--branch-review",
                )}
              >
                <InlineField
                  className={c(
                    "training-field-anchor--block",
                    "training-field-anchor--opinion",
                  )}
                  fieldId={ACTIVIST_FIELDS.candidate.branchReviewOpinion}
                  value={
                    formData[ACTIVIST_FIELDS.candidate.branchReviewOpinion]
                  }
                />

                <div
                  className={c(
                    "training-section-signoff",
                    "training-section-signoff--branch-review",
                  )}
                >
                  <div className={c("training-section-signoff__row")}>
                    <span>党支部：</span>
                    <LineField
                      className={c(
                        "training-signature-line",
                        "training-signature-line--medium",
                      )}
                      fieldId={ACTIVIST_FIELDS.candidate.partyBranch}
                      value={formData[ACTIVIST_FIELDS.candidate.partyBranch]}
                    />
                    <span>书记签名：</span>
                    <span
                      className={c(
                        "training-signature-placeholder",
                        "training-signature-placeholder--wide",
                      )}
                    />
                  </div>
                  <div
                    className={c(
                      "training-section-signoff__row",
                      "training-section-signoff__row--date",
                    )}
                  >
                    <span>日期：</span>
                    <LineField
                      className={c(
                        "training-signature-line",
                        "training-signature-line--date",
                      )}
                      fieldId={ACTIVIST_FIELDS.candidate.branchReviewDate}
                      value={
                        formData[ACTIVIST_FIELDS.candidate.branchReviewDate]
                      }
                    />
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className={c("training-vertical-cell")}>
              <VerticalText
                className={c("training-vertical-text")}
                text="党委预审意见"
              />
            </td>
            <td className={c("training-section-body-cell")}>
              <div
                className={c(
                  "training-section-with-footer",
                  "training-section-with-footer--pre-review",
                )}
              >
                <p
                  className={c(
                    "training-fixed-paragraph",
                    "training-fixed-paragraph--plain",
                  )}
                >
                  该生思想积极向上，学习认真努力，群众基础好，政审合格。同意发展并下发《入党志愿书》由党支部指导填写。
                </p>

                <div
                  className={c(
                    "training-section-signoff",
                    "training-section-signoff--pre-review",
                  )}
                >
                  <div className={c("training-section-signoff__row")}>
                    <span>党委（盖章）：</span>
                    <span
                      className={c(
                        "training-signature-placeholder",
                        "training-signature-placeholder--stamp",
                      )}
                    />
                    <span>书记签名：</span>
                    <span
                      className={c(
                        "training-signature-placeholder",
                        "training-signature-placeholder--wide",
                      )}
                    />
                  </div>
                  <div
                    className={c(
                      "training-section-signoff__row",
                      "training-section-signoff__row--date",
                    )}
                  >
                    <span>日期：</span>
                    <LineField
                      className={c(
                        "training-signature-line",
                        "training-signature-line--date",
                      )}
                      fieldId={ACTIVIST_FIELDS.candidate.committeePreReviewDate}
                      value={
                        formData[
                          ACTIVIST_FIELDS.candidate.committeePreReviewDate
                        ]
                      }
                    />
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td
              className={c(
                "training-section-title-cell",
                "training-section-title-cell--small",
              )}
            >
              备注
            </td>
            <td
              className={c(
                "training-section-body-cell",
                "training-section-body-cell--compact",
              )}
            >
              <div className={c("training-section-inline-fill")}>
                <span>《入党志愿书》编号：</span>
                <InlineField
                  className={c(
                    "training-field-anchor--cell-fill",
                    "training-field-anchor--section-inline-fill",
                  )}
                  fieldId={ACTIVIST_FIELDS.wishBookNumber}
                  value={formData[ACTIVIST_FIELDS.wishBookNumber]}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </A4Page>
  );
}

const ACTIVIST_PAGE_COMPONENTS = {
  basicInfo: Page3BasicInfo,
  cover: Page1Cover,
  deputySecretaryAndCommitteeRecord: Page11DeputySecretaryAndCommitteeRecord,
  instructions: Page2Instructions,
  massOpinion: Page9MassOpinion,
  opinion: TrainingOpinionPage,
  publicityAndBranchReview: Page13PublicityAndBranchReview,
  quarterRecord: TrainingQuarterPage,
  trainingAndPoliticalReview: Page12TrainingAndPoliticalReview,
};

const activistOpinionPage = (id, title, opinionFieldId, dateFieldId) => ({
  id,
  component: "opinion",
  props: {
    c,
    columnWidth: NARROW_VERTICAL_COL_WIDTH,
    dateFieldId,
    layoutVariant: "activist",
    opinionFieldId,
    signatureLabel: "党支部书记签字：",
    stackDateBelow: true,
    title,
  },
});

const activistQuarterPage = (id, quarters) => ({
  id,
  component: "quarterRecord",
  props: {
    c,
    quarters,
    variant: "activist",
    verticalTitle: "培养考察情况",
  },
});

const ACTIVIST_PAGES = definePages("party-training-inspection-book", [
  { id: "cover", component: "cover" },
  { id: "instructions", component: "instructions" },
  { id: "basic-info", component: "basicInfo" },
  activistQuarterPage("quarter-1-2", ACTIVIST_QUARTERS.slice(0, 2)),
  activistOpinionPage(
    "branch-half-year-opinion",
    "党支部考察意见（半年）",
    ACTIVIST_FIELDS.branchHalfYear.opinion,
    ACTIVIST_FIELDS.branchHalfYear.date,
  ),
  activistQuarterPage("quarter-3-4", ACTIVIST_QUARTERS.slice(2)),
  activistOpinionPage(
    "branch-annual-opinion",
    "党支部考察意见（一年）",
    ACTIVIST_FIELDS.branchAnnual.opinion,
    ACTIVIST_FIELDS.branchAnnual.date,
  ),
  { id: "mass-opinion", component: "massOpinion" },
  activistOpinionPage(
    "branch-committee-opinion",
    "支委会（党员大会）意见",
    ACTIVIST_FIELDS.candidate.branchCommitteeOpinion,
    ACTIVIST_FIELDS.candidate.branchCommitteeDate,
  ),
  {
    id: "deputy-secretary-and-committee-record",
    component: "deputySecretaryAndCommitteeRecord",
  },
  {
    id: "training-and-political-review",
    component: "trainingAndPoliticalReview",
  },
  { id: "publicity-and-branch-review", component: "publicityAndBranchReview" },
]);

function ActivistTable({ formData, zoom }) {
  return (
    <TemplateDocument
      components={ACTIVIST_PAGE_COMPONENTS}
      formData={formData}
      pages={ACTIVIST_PAGES}
      zoom={zoom}
    />
  );
}

export default ActivistTable;

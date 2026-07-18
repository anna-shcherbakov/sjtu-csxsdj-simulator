import { TEMPLATE_FIELD_IDS } from "../templates/config/templateFields.js";

export const TEMPLATE_OPTIONS = [
  {
    id: "party-applicant-document",
    label: "模板 1 · 入党申请人登记暨谈话表",
    displayLabel: "入党申请人登记暨谈话表",
    shortLabel: "模板 1",
    description: "4 页固定 A4 文档，包括封面、登记表、谈话记录和空白页。",
    pageCount: 4,
    fieldIds: TEMPLATE_FIELD_IDS["party-applicant-document"],
  },
  {
    id: "party-training-inspection-book",
    label: "模板 2 · 入党培养考察记录册",
    displayLabel: "入党培养考察记录册",
    shortLabel: "模板 2",
    description:
      "12 页固定 A4 文档，包括封面、填写说明、基本情况、季度考察和发展对象审查页面。",
    pageCount: 12,
    fieldIds: TEMPLATE_FIELD_IDS["party-training-inspection-book"],
  },
  {
    id: "party-training-inspection-book-v2",
    label: "模板 3 · 预备党员培养考察记录册",
    displayLabel: "预备党员培养考察记录册",
    shortLabel: "模板 3",
    description:
      "10 页固定 A4 文档，包括封面内页、填写说明、基本情况、教育考察记录、转正前征求意见、公示和支部审查意见。",
    pageCount: 10,
    fieldIds: TEMPLATE_FIELD_IDS["party-training-inspection-book-v2"],
  },
  {
    id: "party-application-wish-book",
    label: "模板 4 · 入党志愿书",
    displayLabel: "入党志愿书",
    shortLabel: "模板 4",
    description:
      "14 页固定 A4 文档，包括封面、说明、誓词、基本信息、本人经历、政审、家庭成员、介绍人意见和审批页。",
    pageCount: 14,
    fieldIds: TEMPLATE_FIELD_IDS["party-application-wish-book"],
  },
];

const TEMPLATE_FIELD_INDEX = Object.fromEntries(
  TEMPLATE_OPTIONS.map((template) => [template.id, new Set(template.fieldIds)]),
);

export const getTemplateIdsByFieldId = (fieldId) =>
  TEMPLATE_OPTIONS.filter((template) =>
    TEMPLATE_FIELD_INDEX[template.id]?.has(fieldId),
  ).map((template) => template.id);

export const templateHasField = (templateId, fieldId) =>
  TEMPLATE_FIELD_INDEX[templateId]?.has(fieldId) ?? false;

export const getTemplateReferenceStatuses = (fieldId) =>
  TEMPLATE_OPTIONS.map((template) => ({
    id: template.id,
    displayLabel: template.displayLabel,
    shortLabel: template.shortLabel,
    referenced: templateHasField(template.id, fieldId),
  }));

export const getTemplateById = (templateId) =>
  TEMPLATE_OPTIONS.find((template) => template.id === templateId) ?? null;

export const getTemplateFieldIds = (templateId) =>
  getTemplateById(templateId)?.fieldIds ?? [];

export const DEFAULT_TEMPLATE_ID = TEMPLATE_OPTIONS[0].id;
export const DEFAULT_ZOOM = 100;

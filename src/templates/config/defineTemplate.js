import { TEMPLATE_PAGE_CONTRACTS } from "./templateContracts.js";

const collectFieldIds = (value, fieldIds) => {
  if (typeof value === "string") {
    fieldIds.push(value);
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectFieldIds(item, fieldIds));
    return;
  }

  if (value && typeof value === "object") {
    Object.values(value).forEach((item) => collectFieldIds(item, fieldIds));
  }
};

export const defineFieldIds = (fields) => {
  const fieldIds = [];
  collectFieldIds(fields, fieldIds);

  Object.defineProperty(fields, "fieldIds", {
    configurable: false,
    enumerable: false,
    value: Object.freeze([...new Set(fieldIds)]),
    writable: false,
  });

  return Object.freeze(fields);
};

export const definePages = (templateId, pages) => {
  const normalizedPages = pages.map((page, index) =>
    Object.freeze({
      id: page.id ?? `page-${index + 1}`,
      ...page,
    }),
  );
  const expectedPageIds = TEMPLATE_PAGE_CONTRACTS[templateId];
  const actualPageIds = normalizedPages.map((page) => page.id);

  if (!expectedPageIds) {
    throw new Error(`Missing page contract for template: ${templateId}`);
  }

  if (JSON.stringify(actualPageIds) !== JSON.stringify(expectedPageIds)) {
    throw new Error(
      `Page contract mismatch for ${templateId}: expected ${expectedPageIds.join(", ")}, received ${actualPageIds.join(", ")}`,
    );
  }

  return Object.freeze(normalizedPages);
};

export const readField = (formData, fieldId) => formData[fieldId];

export const readListField = (formData, fieldId) =>
  Array.isArray(formData[fieldId]) ? formData[fieldId] : [];

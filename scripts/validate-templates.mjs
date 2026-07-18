import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { flattenFormFields, formSchema } from "../src/data/formSchema.js";
import { TEMPLATE_OPTIONS } from "../src/data/templates.js";
import { TEMPLATE_PAGE_CONTRACTS } from "../src/templates/config/templateContracts.js";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const errors = [];
const schemaFieldIds = new Set(
  flattenFormFields(formSchema).map((field) => field.id),
);
const expectedTemplateIds = Object.keys(TEMPLATE_PAGE_CONTRACTS);
const actualTemplateIds = TEMPLATE_OPTIONS.map((template) => template.id);

if (JSON.stringify(actualTemplateIds) !== JSON.stringify(expectedTemplateIds)) {
  errors.push("模板清单与页面契约的模板顺序不一致。");
}

for (const template of TEMPLATE_OPTIONS) {
  const pageIds = TEMPLATE_PAGE_CONTRACTS[template.id];
  const uniquePageIds = new Set(pageIds);
  const uniqueFieldIds = new Set(template.fieldIds);

  if (pageIds.length !== template.pageCount) {
    errors.push(
      `${template.id}: 页面契约为 ${pageIds.length} 页，元数据声明为 ${template.pageCount} 页。`,
    );
  }

  if (uniquePageIds.size !== pageIds.length) {
    errors.push(`${template.id}: 页面 ID 存在重复。`);
  }

  if (uniqueFieldIds.size !== template.fieldIds.length) {
    errors.push(`${template.id}: 字段 ID 清单存在重复。`);
  }

  for (const fieldId of template.fieldIds) {
    if (!schemaFieldIds.has(fieldId)) {
      errors.push(`${template.id}: 字段 ${fieldId} 不存在于 formSchema。`);
    }
  }
}

const templateSources = [
  "TalkTable.jsx",
  "ActivistTable.jsx",
  "ProbationaryTable.jsx",
  "WishTable.jsx",
];

for (const fileName of templateSources) {
  const source = fs.readFileSync(
    path.join(projectRoot, "src", "templates", fileName),
    "utf8",
  );
  const rawFieldReferences = source.match(
    /(?:fieldId\s*=|fieldId\s*:|formData\s*\[)\s*["'][a-z][^"']+\.[^"']+["']/g,
  );

  if (rawFieldReferences?.length) {
    errors.push(
      `${fileName}: 发现未通过 templateFields 定义的字段 ID：${rawFieldReferences.join(", ")}`,
    );
  }
}

const totalPages = TEMPLATE_OPTIONS.reduce(
  (sum, template) => sum + template.pageCount,
  0,
);

if (totalPages !== 40) {
  errors.push(`模板总页数应为 40，当前为 ${totalPages}。`);
}

if (errors.length) {
  console.error(`模板静态检查失败（${errors.length} 项）：`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  const totalFields = TEMPLATE_OPTIONS.reduce(
    (sum, template) => sum + template.fieldIds.length,
    0,
  );
  console.log(
    `模板静态检查通过：${TEMPLATE_OPTIONS.length} 套模板，${totalPages} 页，${totalFields} 个字段引用。`,
  );
}

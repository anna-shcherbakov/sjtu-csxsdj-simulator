import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { expect, test } from "@playwright/test";
import { TEMPLATE_OPTIONS } from "../src/data/templates.js";

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const baselinePath = path.join(
  testDirectory,
  "baselines",
  "template-layout.json",
);
const updateBaselines = process.env.UPDATE_TEMPLATE_BASELINES === "1";
const baseline = fs.existsSync(baselinePath)
  ? JSON.parse(fs.readFileSync(baselinePath, "utf8"))
  : {};
const nextBaseline = {};

const hashSignature = (signature) =>
  createHash("sha256").update(JSON.stringify(signature)).digest("hex");

const selectTemplate = async (page, templateIndex) => {
  if (!templateIndex) {
    return;
  }

  const selector = page.getByRole("combobox").first();
  await selector.click();

  for (let index = 0; index < templateIndex; index += 1) {
    await selector.press("ArrowDown");
  }

  await selector.press("Enter");
};

const collectLayout = (page) =>
  page.evaluate(() => {
    const pages = Array.from(
      document.querySelectorAll('div[style*="transform: scale"]'),
    );
    const round = (value) => Math.round(value * 1000) / 1000;

    return pages.map((paper) => {
      const paperRect = paper.getBoundingClientRect();

      return Array.from(paper.querySelectorAll("*")).map((node) => {
        const rect = node.getBoundingClientRect();
        const style = getComputedStyle(node);

        return {
          tag: node.tagName,
          rect: [
            round(rect.left - paperRect.left),
            round(rect.top - paperRect.top),
            round(rect.width),
            round(rect.height),
          ],
          display: style.display,
          position: style.position,
          font: [
            style.fontFamily,
            style.fontSize,
            style.fontWeight,
            style.lineHeight,
            style.letterSpacing,
          ],
          color: style.color,
          background: style.backgroundColor,
          border: [
            style.borderTop,
            style.borderRight,
            style.borderBottom,
            style.borderLeft,
          ],
          padding: [
            style.paddingTop,
            style.paddingRight,
            style.paddingBottom,
            style.paddingLeft,
          ],
          margin: [
            style.marginTop,
            style.marginRight,
            style.marginBottom,
            style.marginLeft,
          ],
          align: [
            style.textAlign,
            style.verticalAlign,
            style.alignItems,
            style.justifyContent,
          ],
          whiteSpace: style.whiteSpace,
          fieldId: node.dataset.fieldId ?? "",
          text: node.children.length === 0 ? node.textContent : "",
        };
      });
    });
  });

test.describe.serial("模板布局契约", () => {
  for (const [templateIndex, template] of TEMPLATE_OPTIONS.entries()) {
    test(`${template.displayLabel}保持页面和字段布局`, async ({ page }) => {
      await page.goto("./");
      await selectTemplate(page, templateIndex);
      await expect(page.locator('div[style*="transform: scale"]')).toHaveCount(
        template.pageCount,
      );

      const layout = await collectLayout(page);
      const fieldIds = layout
        .flat()
        .map((node) => node.fieldId)
        .filter(Boolean);
      const unexpectedFieldIds = fieldIds.filter(
        (fieldId) => !template.fieldIds.includes(fieldId),
      );
      const result = {
        fieldCount: fieldIds.length,
        pageHashes: layout.map(hashSignature),
      };

      expect(unexpectedFieldIds).toEqual([]);
      nextBaseline[template.id] = result;

      if (!updateBaselines) {
        expect(result).toEqual(baseline[template.id]);
      }
    });
  }

  test("字段定位与缩放交互保持有效", async ({ page }) => {
    await page.goto("./");

    const previewField = page
      .locator('div[style*="transform: scale"] [data-field-id]')
      .first();
    const fieldId = await previewField.getAttribute("data-field-id");
    const formField = page.locator(
      `[class*="form-field-card"][data-field-id="${fieldId}"]`,
    );

    await previewField.click();
    await expect(formField).toHaveClass(/is-selected/);
    await formField.click();
    await expect(previewField).toHaveClass(/selected/);

    const zoom = page.getByRole("slider").first();
    await expect(zoom).toHaveAttribute("aria-valuenow", "100");
    await zoom.press("ArrowLeft");
    await expect(zoom).toHaveAttribute("aria-valuenow", "99");
    await zoom.press("ArrowRight");
    await expect(zoom).toHaveAttribute("aria-valuenow", "100");
  });

  test.afterAll(() => {
    if (!updateBaselines) {
      return;
    }

    fs.mkdirSync(path.dirname(baselinePath), { recursive: true });
    fs.writeFileSync(
      baselinePath,
      `${JSON.stringify(nextBaseline, null, 2)}\n`,
    );
  });
});

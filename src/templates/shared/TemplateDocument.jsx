import { Fragment } from "react";

function TemplateDocument({ components, formData, pages, zoom }) {
  return pages.map(({ component, id, props = {} }) => {
    const Page =
      typeof component === "string" ? components[component] : component;

    if (!Page) {
      throw new Error(`Unknown template page component: ${component}`);
    }

    return (
      <Fragment key={id}>
        <Page {...props} formData={formData} zoom={zoom} />
      </Fragment>
    );
  });
}

export default TemplateDocument;

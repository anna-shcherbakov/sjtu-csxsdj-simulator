import { memo } from 'react'
import { Empty, Typography } from 'antd'
import ActivistTable from '../../templates/ActivistTable'
import ProbationaryTable from '../../templates/ProbationaryTable'
import TalkTable from '../../templates/TalkTable'
import WishTable from '../../templates/WishTable'
import { TEMPLATE_OPTIONS } from '../../data/templates'
import useFormStore from '../../store/useFormStore'

const TEMPLATE_COMPONENTS = {
  'party-applicant-document': TalkTable,
  'party-application-wish-book': WishTable,
  'party-training-inspection-book': ActivistTable,
  'party-training-inspection-book-v2': ProbationaryTable,
}

function TemplatePreview() {
  const activeTemplateId = useFormStore((state) => state.activeTemplateId)
  const formData = useFormStore((state) => state.formData)
  const zoom = useFormStore((state) => state.zoom)

  const activeTemplate = TEMPLATE_OPTIONS.find(
    (template) => template.id === activeTemplateId,
  )
  const ActiveTemplateComponent = TEMPLATE_COMPONENTS[activeTemplateId]

  return (
    <>
      <div className="preview-panel__header">
        <Typography.Title className="preview-panel__title" level={4}>
          {activeTemplate?.displayLabel}
        </Typography.Title>
      </div>

      <div className="preview-panel__canvas">
        <div className="preview-panel__stack">
          {ActiveTemplateComponent ? (
            <ActiveTemplateComponent formData={formData} zoom={zoom} />
          ) : (
            <Empty description="模板不存在" />
          )}
        </div>
      </div>
    </>
  )
}

export default memo(TemplatePreview)

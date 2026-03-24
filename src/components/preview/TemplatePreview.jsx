import { Empty, Tag, Typography } from 'antd'
import PartyApplicantDocumentTemplate from '../../templates/PartyApplicantDocumentTemplate'
import PartyApplicationWishTemplate from '../../templates/PartyApplicationWishTemplate'
import PartyTrainingInspectionBookTemplate from '../../templates/PartyTrainingInspectionBookTemplate'
import PartyTrainingInspectionBookTemplate3 from '../../templates/PartyTrainingInspectionBookTemplate3'
import { TEMPLATE_OPTIONS } from '../../data/templates'
import useFormStore from '../../store/useFormStore'

function TemplatePreview() {
  const activeTemplateId = useFormStore((state) => state.activeTemplateId)
  const formData = useFormStore((state) => state.formData)
  const zoom = useFormStore((state) => state.zoom)
  const activeTemplate = TEMPLATE_OPTIONS.find(
    (template) => template.id === activeTemplateId,
  )

  let pages = null

  if (activeTemplateId === 'party-applicant-document') {
    pages = <PartyApplicantDocumentTemplate formData={formData} zoom={zoom} />
  } else if (activeTemplateId === 'party-application-wish-book') {
    pages = <PartyApplicationWishTemplate formData={formData} zoom={zoom} />
  } else if (activeTemplateId === 'party-training-inspection-book') {
    pages = (
      <PartyTrainingInspectionBookTemplate formData={formData} zoom={zoom} />
    )
  } else if (activeTemplateId === 'party-training-inspection-book-v2') {
    pages = (
      <PartyTrainingInspectionBookTemplate3 formData={formData} zoom={zoom} />
    )
  }

  return (
    <>
      <div className="preview-panel__header">
        <div>
          <Typography.Title className="preview-panel__title" level={4}>
            {activeTemplate?.label}
          </Typography.Title>
          <Typography.Paragraph className="preview-panel__description">
            {activeTemplate?.description}
          </Typography.Paragraph>
        </div>
        <div className="preview-panel__legend">
          <Tag color="processing">{zoom}% 缩放</Tag>
          <Tag>{activeTemplate?.pageCount ?? 0} 页固定 A4 结构</Tag>
          <Tag>点击绑定值可定位左侧字段</Tag>
        </div>
      </div>

      <div className="preview-panel__canvas">
        <div className="preview-panel__stack">
          {pages ?? <Empty description="模板不存在" />}
        </div>
      </div>
    </>
  )
}

export default TemplatePreview

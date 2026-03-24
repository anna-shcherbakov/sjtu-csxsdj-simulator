import { CheckCircleOutlined, ReloadOutlined } from '@ant-design/icons'
import { Button, Segmented, Select, Tag, Typography } from 'antd'
import { findFormFieldById } from '../../data/formSchema'
import { TEMPLATE_OPTIONS, ZOOM_OPTIONS } from '../../data/templates'
import useFormStore from '../../store/useFormStore'

function TemplateToolbar({ onValidate, onReset }) {
  const activeTemplateId = useFormStore((state) => state.activeTemplateId)
  const zoom = useFormStore((state) => state.zoom)
  const formSchema = useFormStore((state) => state.formSchema)
  const selectedFieldId = useFormStore((state) => state.selectedFieldId)
  const setActiveTemplateId = useFormStore((state) => state.setActiveTemplateId)
  const setZoom = useFormStore((state) => state.setZoom)
  const selectedField = selectedFieldId
    ? findFormFieldById(formSchema, selectedFieldId)
    : null

  const selectedFieldText = selectedField
    ? `高亮：${selectedField.label}`
    : selectedFieldId
      ? '高亮：未映射字段'
      : '未选中字段'

  return (
    <div className="template-toolbar">
      <div className="template-toolbar__info">
        <Typography.Text className="template-toolbar__label" type="secondary">
          模板切换
        </Typography.Text>
        <Segmented
          onChange={setActiveTemplateId}
          options={TEMPLATE_OPTIONS.map((template) => ({
            label: template.shortLabel,
            value: template.id,
          }))}
          size="large"
          value={activeTemplateId}
        />
      </div>

      <div className="template-toolbar__controls">
        <Select
          className="template-toolbar__zoom"
          onChange={setZoom}
          options={ZOOM_OPTIONS}
          value={zoom}
        />

        <Tag className="template-toolbar__tag">{selectedFieldText}</Tag>

        <Button
          icon={<CheckCircleOutlined />}
          onClick={onValidate}
          type="primary"
        >
          校验
        </Button>
        <Button icon={<ReloadOutlined />} onClick={onReset}>
          重置
        </Button>
      </div>
    </div>
  )
}

export default TemplateToolbar

import {
  CheckCircleOutlined,
  QuestionCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons'
import { Button, Popover, Segmented, Slider, Typography } from 'antd'
import { TEMPLATE_OPTIONS } from '../../data/templates'
import useFormStore from '../../store/useFormStore'

const helpContent = (
  <div className="template-help-popover__content">
    <div className="template-help-popover__title">辅助说明</div>
    <ul className="template-help-popover__list">
      <li>拖动中间分隔条可以调整左右区域宽度。</li>
      <li>左侧可搜索字段、展开分组并直接填写内容。</li>
      <li>右侧点击字段会联动定位到左侧对应表单项。</li>
      <li>顶部缩放滑条支持 50% 到 150% 预览缩放。</li>
      <li>切换模板不会清空左侧已填写内容。</li>
    </ul>
  </div>
)

function TemplateToolbar({ onValidate, onReset }) {
  const activeTemplateId = useFormStore((state) => state.activeTemplateId)
  const zoom = useFormStore((state) => state.zoom)
  const setActiveTemplateId = useFormStore((state) => state.setActiveTemplateId)
  const setZoom = useFormStore((state) => state.setZoom)

  return (
    <div className="template-toolbar">
      <div className="template-toolbar__info">
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
        <div className="template-toolbar__zoom-group">
          <Slider
            className="template-toolbar__zoom-slider"
            max={150}
            min={50}
            onChange={setZoom}
            step={1}
            tooltip={{ formatter: (value) => `${value}%` }}
            value={zoom}
          />
          <Typography.Text
            className="template-toolbar__zoom-value"
            type="secondary"
          >
            {zoom}%
          </Typography.Text>
        </div>

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
        <Popover
          content={helpContent}
          mouseEnterDelay={0.08}
          mouseLeaveDelay={0.06}
          overlayClassName="template-help-popover"
          placement="bottomRight"
          trigger="hover"
        >
          <Button
            className="template-toolbar__help"
            icon={<QuestionCircleOutlined />}
          >
            辅助说明
          </Button>
        </Popover>
      </div>
    </div>
  )
}

export default TemplateToolbar

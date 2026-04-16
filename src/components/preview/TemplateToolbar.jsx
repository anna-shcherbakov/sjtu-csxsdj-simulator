import {
  CheckCircleOutlined,
  ImportOutlined,
  QuestionCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons'
import clsx from 'clsx'
import { Button, Popover, Select, Slider, Typography } from 'antd'
import { TEMPLATE_OPTIONS } from '../../data/templates'
import useFormStore from '../../store/useFormStore'
import styles from './TemplateToolbar.module.css'

const helpContent = (
  <div className={styles['template-help-popover__content']}>
    <div className={styles['template-help-popover__title']}>辅助说明</div>
    <ul className={styles['template-help-popover__list']}>
      <li>拖动中间分隔条可以调整左右区域宽度。</li>
      <li>左侧可搜索字段、展开分组并直接填写内容。</li>
      <li>右侧点击字段会联动定位到左侧对应表单项。</li>
      <li>顶部缩放滑条支持 50% 到 150% 预览缩放。</li>
      <li>切换模板不会清空左侧已填写内容。</li>
    </ul>
  </div>
)

function TemplateToolbar({
  onOpenImportDrawer,
  onValidate,
  onValidateCurrentTemplate,
  onReset,
}) {
  const activeTemplateId = useFormStore((state) => state.activeTemplateId)
  const zoom = useFormStore((state) => state.zoom)
  const setActiveTemplateId = useFormStore((state) => state.setActiveTemplateId)
  const setZoom = useFormStore((state) => state.setZoom)

  return (
    <div className={styles['template-toolbar']}>
      <div className={styles['template-toolbar__info']}>
        <div className={styles['template-toolbar__field']}>
          <Typography.Text className={styles['template-toolbar__field-label']}>
            模板切换
          </Typography.Text>
          <Select
            className={styles['template-toolbar__select']}
            onChange={setActiveTemplateId}
            options={TEMPLATE_OPTIONS.map((template) => ({
              label: template.displayLabel,
              value: template.id,
            }))}
            popupClassName={styles['template-toolbar__select-popup']}
            size="large"
            value={activeTemplateId}
            variant="filled"
          />
        </div>
      </div>

      <div className={styles['template-toolbar__controls']}>
        <div
          className={clsx(
            styles['template-toolbar__field'],
            styles['template-toolbar__field--zoom'],
          )}
        >
          <Typography.Text className={styles['template-toolbar__field-label']}>
            缩放
          </Typography.Text>
          <div className={styles['template-toolbar__zoom-group']}>
            <Slider
              className={styles['template-toolbar__zoom-slider']}
              max={150}
              min={50}
              onChange={setZoom}
              step={1}
              tooltip={{ formatter: (value) => `${value}%` }}
              value={zoom}
            />
            <Typography.Text
              className={styles['template-toolbar__zoom-value']}
              type="secondary"
            >
              {zoom}%
            </Typography.Text>
          </div>
        </div>

        <Button
          className={styles['template-toolbar__action--secondary']}
          icon={<ImportOutlined />}
          onClick={onOpenImportDrawer}
        >
          导入数据
        </Button>
        <Button
          className={styles['template-toolbar__action--secondary']}
          icon={<CheckCircleOutlined />}
          onClick={onValidateCurrentTemplate}
        >
          校验当前模板
        </Button>
        <Button
          className={styles['template-toolbar__action--primary']}
          icon={<CheckCircleOutlined />}
          onClick={onValidate}
          type="primary"
        >
          校验
        </Button>
        <Button
          className={styles['template-toolbar__action--secondary']}
          icon={<ReloadOutlined />}
          onClick={onReset}
        >
          重置
        </Button>
        <Popover
          content={helpContent}
          mouseEnterDelay={0.08}
          mouseLeaveDelay={0.06}
          overlayClassName={styles['template-help-popover']}
          placement="bottomRight"
          trigger="hover"
        >
          <Button
            className={clsx(
              styles['template-toolbar__help'],
              styles['template-toolbar__action--secondary'],
            )}
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

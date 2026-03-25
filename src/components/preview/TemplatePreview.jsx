import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { Button, Empty, Typography } from 'antd'
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
  const selectedFieldId = useFormStore((state) => state.selectedFieldId)
  const selectedFieldSource = useFormStore((state) => state.selectedFieldSource)
  const selectedFieldToken = useFormStore((state) => state.selectedFieldToken)
  const zoom = useFormStore((state) => state.zoom)
  const canvasRef = useRef(null)
  const navigationFrameRef = useRef(0)
  const navigationTargetsRef = useRef({ up: null, down: null })
  const [fieldNavigator, setFieldNavigator] = useState({
    showUp: false,
    showDown: false,
  })

  const activeTemplate = TEMPLATE_OPTIONS.find(
    (template) => template.id === activeTemplateId,
  )
  const ActiveTemplateComponent = TEMPLATE_COMPONENTS[activeTemplateId]

  const evaluateFieldNavigator = useCallback(() => {
    const canvasElement = canvasRef.current

    if (!canvasElement || selectedFieldSource !== 'form' || !selectedFieldId) {
      navigationTargetsRef.current = { up: null, down: null }
      setFieldNavigator({ showUp: false, showDown: false })
      return
    }

    const fieldNodes = Array.from(
      canvasElement.querySelectorAll('[data-field-id]'),
    ).filter((node) => node.dataset.fieldId === selectedFieldId)

    if (!fieldNodes.length) {
      navigationTargetsRef.current = { up: null, down: null }
      setFieldNavigator({ showUp: false, showDown: false })
      return
    }

    const canvasRect = canvasElement.getBoundingClientRect()
    const viewportTop = canvasRect.top + 24
    const viewportBottom = canvasRect.bottom - 24
    const measuredNodes = fieldNodes.map((node) => ({
      node,
      rect: node.getBoundingClientRect(),
    }))
    const hasVisibleNode = measuredNodes.some(
      ({ rect }) => rect.bottom > viewportTop && rect.top < viewportBottom,
    )

    if (hasVisibleNode) {
      navigationTargetsRef.current = { up: null, down: null }
      setFieldNavigator({ showUp: false, showDown: false })
      return
    }

    const aboveNodes = measuredNodes
      .filter(({ rect }) => rect.bottom <= viewportTop)
      .sort((left, right) => right.rect.bottom - left.rect.bottom)
    const belowNodes = measuredNodes
      .filter(({ rect }) => rect.top >= viewportBottom)
      .sort((left, right) => left.rect.top - right.rect.top)

    navigationTargetsRef.current = {
      up: aboveNodes[0]?.node ?? null,
      down: belowNodes[0]?.node ?? null,
    }

    setFieldNavigator({
      showUp: aboveNodes.length > 0,
      showDown: belowNodes.length > 0,
    })
  }, [selectedFieldId, selectedFieldSource])

  const scheduleFieldNavigatorEvaluation = useCallback(() => {
    if (navigationFrameRef.current) {
      return
    }

    navigationFrameRef.current = window.requestAnimationFrame(() => {
      navigationFrameRef.current = 0
      evaluateFieldNavigator()
    })
  }, [evaluateFieldNavigator])

  useEffect(() => {
    scheduleFieldNavigatorEvaluation()

    return () => {
      if (navigationFrameRef.current) {
        window.cancelAnimationFrame(navigationFrameRef.current)
        navigationFrameRef.current = 0
      }
    }
  }, [
    activeTemplateId,
    scheduleFieldNavigatorEvaluation,
    selectedFieldId,
    selectedFieldSource,
    selectedFieldToken,
    zoom,
  ])

  useEffect(() => {
    const canvasElement = canvasRef.current

    if (!canvasElement) {
      return undefined
    }

    const handleViewportChange = () => {
      scheduleFieldNavigatorEvaluation()
    }

    canvasElement.addEventListener('scroll', handleViewportChange, {
      passive: true,
    })
    window.addEventListener('resize', handleViewportChange)

    return () => {
      canvasElement.removeEventListener('scroll', handleViewportChange)
      window.removeEventListener('resize', handleViewportChange)
    }
  }, [scheduleFieldNavigatorEvaluation])

  const handleFieldNavigate = (direction) => {
    const targetNode = navigationTargetsRef.current[direction]

    if (!targetNode) {
      return
    }

    targetNode.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    })
  }

  return (
    <>
      <div className="preview-panel__header">
        <Typography.Title className="preview-panel__title" level={4}>
          {activeTemplate?.displayLabel}
        </Typography.Title>
      </div>

      <div className="preview-panel__canvas-wrap">
        <div className="preview-panel__canvas" ref={canvasRef}>
          <div className="preview-panel__stack">
            {ActiveTemplateComponent ? (
              <ActiveTemplateComponent formData={formData} zoom={zoom} />
            ) : (
              <Empty description="模板不存在" />
            )}
          </div>
        </div>

        {selectedFieldSource === 'form' &&
        (fieldNavigator.showUp || fieldNavigator.showDown) ? (
          <div className="preview-panel__field-nav">
            {fieldNavigator.showUp ? (
              <Button
                aria-label="跳转到上一个字段位置"
                className="preview-panel__field-nav-button"
                icon={<ArrowUpOutlined />}
                onClick={() => handleFieldNavigate('up')}
                shape="circle"
              />
            ) : (
              <span className="preview-panel__field-nav-spacer" aria-hidden="true" />
            )}
            {fieldNavigator.showDown ? (
              <Button
                aria-label="跳转到下一个字段位置"
                className="preview-panel__field-nav-button"
                icon={<ArrowDownOutlined />}
                onClick={() => handleFieldNavigate('down')}
                shape="circle"
              />
            ) : (
              <span className="preview-panel__field-nav-spacer" aria-hidden="true" />
            )}
          </div>
        ) : null}
      </div>
    </>
  )
}

export default memo(TemplatePreview)

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { ConfigProvider, Modal, message } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import SchemaForm from './components/form/SchemaForm'
import TemplatePreview from './components/preview/TemplatePreview'
import TemplateToolbar from './components/preview/TemplateToolbar'
import { flattenFormFields } from './data/formSchema'
import { getTemplateById, getTemplateFieldIds } from './data/templates'
import useFormStore from './store/useFormStore'
import styles from './App.module.css'

const SIDEBAR_WIDTH_STORAGE_KEY = 'dangjian:sidebar-width'
const DEFAULT_SIDEBAR_WIDTH = 420
const MIN_SIDEBAR_WIDTH = 320
const MAX_SIDEBAR_WIDTH = 720
const MIN_PREVIEW_WIDTH = 520
const DESKTOP_LAYOUT_BREAKPOINT = 1280

const readStoredSidebarWidth = () => {
  if (typeof window === 'undefined') {
    return DEFAULT_SIDEBAR_WIDTH
  }

  const storedValue = Number.parseFloat(
    window.localStorage.getItem(SIDEBAR_WIDTH_STORAGE_KEY) ?? '',
  )

  return Number.isFinite(storedValue) ? storedValue : DEFAULT_SIDEBAR_WIDTH
}

const clampSidebarWidth = (width, containerWidth) => {
  if (!Number.isFinite(containerWidth) || containerWidth <= 0) {
    return DEFAULT_SIDEBAR_WIDTH
  }

  const maxAllowedWidth = Math.max(
    MIN_SIDEBAR_WIDTH,
    Math.min(MAX_SIDEBAR_WIDTH, containerWidth - MIN_PREVIEW_WIDTH),
  )

  return Math.min(Math.max(width, MIN_SIDEBAR_WIDTH), maxAllowedWidth)
}

const applySidebarWidth = (node, width) => {
  if (!node) {
    return
  }

  node.style.setProperty('--sidebar-width', `${Math.round(width)}px`)
}

function App() {
  const [messageApi, contextHolder] = message.useMessage()
  const [modalApi, modalContextHolder] = Modal.useModal()
  const contentRef = useRef(null)
  const dragStateRef = useRef(null)
  const dragFrameRef = useRef(0)
  const liveSidebarWidthRef = useRef(DEFAULT_SIDEBAR_WIDTH)
  const [sidebarWidth, setSidebarWidth] = useState(readStoredSidebarWidth)
  const [contentWidth, setContentWidth] = useState(0)
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window === 'undefined' ? 0 : window.innerWidth,
  )
  const [isDragging, setIsDragging] = useState(false)

  const formSchema = useFormStore((state) => state.formSchema)
  const activeTemplateId = useFormStore((state) => state.activeTemplateId)
  const validateForm = useFormStore((state) => state.validateForm)
  const validateCurrentTemplate = useFormStore((state) => state.validateCurrentTemplate)
  const resetForm = useFormStore((state) => state.resetForm)
  const setSelectedFieldId = useFormStore((state) => state.setSelectedFieldId)
  const isSplitEnabled = viewportWidth > DESKTOP_LAYOUT_BREAKPOINT
  const maxSidebarWidth = contentWidth
    ? Math.max(
        MIN_SIDEBAR_WIDTH,
        Math.min(MAX_SIDEBAR_WIDTH, contentWidth - MIN_PREVIEW_WIDTH),
      )
    : MAX_SIDEBAR_WIDTH
  const resolvedSidebarWidth =
    isSplitEnabled && contentWidth
      ? clampSidebarWidth(sidebarWidth, contentWidth)
      : DEFAULT_SIDEBAR_WIDTH

  useEffect(() => {
    liveSidebarWidthRef.current = resolvedSidebarWidth
  }, [resolvedSidebarWidth])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const handleWindowResize = () => {
      setViewportWidth(window.innerWidth)
    }

    handleWindowResize()
    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  useEffect(() => {
    const node = contentRef.current

    if (!node) {
      return undefined
    }

    const measureContentWidth = () => {
      const nextWidth = node.getBoundingClientRect().width
      const nextSidebarWidth = clampSidebarWidth(
        liveSidebarWidthRef.current,
        nextWidth,
      )

      setContentWidth(nextWidth)
      liveSidebarWidthRef.current = nextSidebarWidth
      applySidebarWidth(node, nextSidebarWidth)

      setSidebarWidth((currentWidth) =>
        currentWidth === nextSidebarWidth ? currentWidth : nextSidebarWidth,
      )
    }

    measureContentWidth()

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measureContentWidth)

      return () => {
        window.removeEventListener('resize', measureContentWidth)
      }
    }

    const observer = new ResizeObserver(measureContentWidth)
    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const node = contentRef.current

    if (!node || !isSplitEnabled) {
      return
    }

    applySidebarWidth(node, resolvedSidebarWidth)
  }, [isSplitEnabled, resolvedSidebarWidth])

  useEffect(() => {
    if (!isDragging || !isSplitEnabled) {
      return undefined
    }

    const flushDraggedWidth = () => {
      const dragState = dragStateRef.current

      dragFrameRef.current = 0

      if (!dragState || !contentRef.current) {
        return
      }

      liveSidebarWidthRef.current = dragState.lastWidth
      applySidebarWidth(contentRef.current, dragState.lastWidth)
    }

    const handlePointerMove = (event) => {
      const dragState = dragStateRef.current

      if (!dragState) {
        return
      }

      dragState.lastWidth = clampSidebarWidth(
        event.clientX - dragState.containerLeft,
        dragState.containerWidth,
      )

      if (!dragFrameRef.current) {
        dragFrameRef.current = window.requestAnimationFrame(flushDraggedWidth)
      }
    }

    const stopDragging = () => {
      const finalWidth =
        dragStateRef.current?.lastWidth ?? liveSidebarWidthRef.current

      if (dragFrameRef.current) {
        window.cancelAnimationFrame(dragFrameRef.current)
        dragFrameRef.current = 0
      }

      dragStateRef.current = null
      liveSidebarWidthRef.current = finalWidth
      applySidebarWidth(contentRef.current, finalWidth)
      setSidebarWidth(finalWidth)
      setIsDragging(false)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', stopDragging)
    window.addEventListener('pointercancel', stopDragging)

    return () => {
      if (dragFrameRef.current) {
        window.cancelAnimationFrame(dragFrameRef.current)
        dragFrameRef.current = 0
      }

      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', stopDragging)
      window.removeEventListener('pointercancel', stopDragging)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [isDragging, isSplitEnabled])

  useEffect(() => {
    if (typeof window === 'undefined' || !isSplitEnabled) {
      return
    }

    window.localStorage.setItem(
      SIDEBAR_WIDTH_STORAGE_KEY,
      String(resolvedSidebarWidth),
    )
  }, [isSplitEnabled, resolvedSidebarWidth])

  const handleSplitterPointerDown = (event) => {
    if (!isSplitEnabled || !contentRef.current) {
      return
    }

    event.preventDefault()

    const containerRect = contentRef.current.getBoundingClientRect()
    const nextWidth = clampSidebarWidth(
      event.clientX - containerRect.left,
      containerRect.width,
    )

    dragStateRef.current = {
      containerLeft: containerRect.left,
      containerWidth: containerRect.width,
      lastWidth: nextWidth,
    }

    liveSidebarWidthRef.current = nextWidth
    applySidebarWidth(contentRef.current, nextWidth)
    setIsDragging(true)
  }

  const handleValidate = () => {
    const result = validateForm()

    if (result.failedStage === 'validation') {
      const firstErrorFieldId = flattenFormFields(formSchema).find(
        (field) => result.validationErrors[field.id],
      )?.id

      if (firstErrorFieldId) {
        setSelectedFieldId(firstErrorFieldId, 'validation')
      }

      messageApi.error(
        `请先修正 ${Object.keys(result.validationErrors).length} 个格式不正确的字段`,
      )
      return
    }

    if (result.failedStage === 'rules') {
      const firstRuleFieldId = result.ruleFailures[0]?.fieldId

      if (firstRuleFieldId) {
        setSelectedFieldId(firstRuleFieldId, 'system')
      }

      modalApi.error({
        title: `发现 ${result.ruleFailures.length} 条跨字段规则未通过`,
        okText: '知道了',
        width: 760,
        content: (
          <div style={{ maxHeight: 420, overflowY: 'auto', paddingRight: 8 }}>
            <ol style={{ margin: 0, paddingInlineStart: 20 }}>
              {result.ruleFailures.map((failure, index) => (
                <li key={`${failure.fieldId}-${index}`} style={{ marginBottom: 8 }}>
                  {failure.message}
                </li>
              ))}
            </ol>
          </div>
        ),
      })
      return
    }

    messageApi.success('校验通过')
  }

  const handleValidateCurrentTemplate = () => {
    const result = validateCurrentTemplate()
    const template = getTemplateById(activeTemplateId)
    const templateLabel = template?.displayLabel ?? '当前模板'

    if (result.failedStage === 'validation') {
      const firstErrorFieldId = getTemplateFieldIds(activeTemplateId).find(
        (fieldId) => result.validationErrors[fieldId],
      )

      if (firstErrorFieldId) {
        setSelectedFieldId(firstErrorFieldId, 'validation')
      }

      messageApi.error(
        `请先修正当前模板中 ${Object.keys(result.validationErrors).length} 个格式不正确的字段`,
      )
      return
    }

    if (result.failedStage === 'rules') {
      const firstRuleFieldId = result.ruleFailures[0]?.fieldId

      if (firstRuleFieldId) {
        setSelectedFieldId(firstRuleFieldId, 'system')
      }

      modalApi.error({
        title: `${templateLabel}发现 ${result.ruleFailures.length} 条校验未通过`,
        okText: '知道了',
        width: 760,
        content: (
          <div style={{ maxHeight: 420, overflowY: 'auto', paddingRight: 8 }}>
            <ol style={{ margin: 0, paddingInlineStart: 20 }}>
              {result.ruleFailures.map((failure, index) => (
                <li key={`${failure.fieldId}-${index}`} style={{ marginBottom: 8 }}>
                  {failure.message}
                </li>
              ))}
            </ol>
          </div>
        ),
      })
      return
    }

    messageApi.success(`${templateLabel}校验通过`)
  }

  const handleReset = () => {
    resetForm()
    messageApi.open({
      content: '已恢复为 schema 默认值',
      icon: <ExclamationCircleFilled style={{ color: '#D89614' }} />,
      duration: 3,
    })
  }

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#C42026',
          colorInfo: '#C42026',
          colorBgLayout: '#F2F4F7',
          colorBgContainer: '#FCFCFB',
          colorBorder: '#D5DAE0',
          colorBorderSecondary: '#E4E7EC',
          controlOutline: 'rgba(196, 32, 38, 0.16)',
          colorText: '#3B4046',
          colorTextHeading: '#1F2329',
          borderRadius: 8,
          motionDurationMid: '0.14s',
          motionDurationSlow: '0.18s',
          motionEaseInOut: 'cubic-bezier(0.2, 0, 0, 1)',
        },
      }}
    >
      {contextHolder}
      {modalContextHolder}
      <div className={styles['app-shell']}>
        <header className={styles['app-toolbar']}>
          <div className={styles['app-toolbar__brand']}>
            <img
              alt=""
              aria-hidden="true"
              className={styles['app-toolbar__logo']}
              src="/scs-logo.svg"
            />
            <h1 className={styles['app-toolbar__title']}>计算机学院党建材料教程</h1>
          </div>
          <TemplateToolbar
            onReset={handleReset}
            onValidate={handleValidate}
            onValidateCurrentTemplate={handleValidateCurrentTemplate}
          />
        </header>

        <main
          className={clsx(
            styles['app-content'],
            isDragging && styles['app-content--dragging'],
          )}
          ref={contentRef}
        >
          <aside className={styles['app-sidebar']}>
            <section
              className={clsx(styles['app-panel'], styles['sidebar-panel'])}
            >
              <SchemaForm />
            </section>
          </aside>

          {isSplitEnabled ? (
            <div
              aria-label="调整表单与预览区域宽度"
              aria-orientation="vertical"
              aria-valuemax={Math.round(maxSidebarWidth)}
              aria-valuemin={MIN_SIDEBAR_WIDTH}
              aria-valuenow={Math.round(resolvedSidebarWidth)}
              className={clsx(
                styles['app-splitter'],
                isDragging && styles['is-dragging'],
              )}
              onPointerDown={handleSplitterPointerDown}
              role="separator"
              tabIndex={-1}
            />
          ) : null}

          <section className={styles['app-preview']}>
            <section className={styles['app-panel']}>
              <TemplatePreview />
            </section>
          </section>
        </main>
      </div>
    </ConfigProvider>
  )
}

export default App

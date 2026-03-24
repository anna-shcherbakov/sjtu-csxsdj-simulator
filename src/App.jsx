import { ConfigProvider, message } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import SchemaForm from './components/SchemaForm'
import TemplatePreview from './components/TemplatePreview'
import TemplateToolbar from './components/TemplateToolbar'
import { flattenFormFields } from './data/formSchema'
import { TEMPLATE_OPTIONS } from './data/templates'
import useFormStore from './store/useFormStore'

function App() {
  const [messageApi, contextHolder] = message.useMessage()
  const activeTemplateId = useFormStore((state) => state.activeTemplateId)
  const formSchema = useFormStore((state) => state.formSchema)
  const validateForm = useFormStore((state) => state.validateForm)
  const resetForm = useFormStore((state) => state.resetForm)
  const setSelectedFieldId = useFormStore((state) => state.setSelectedFieldId)
  const activeTemplate = TEMPLATE_OPTIONS.find(
    (template) => template.id === activeTemplateId,
  )

  const handleValidate = () => {
    const result = validateForm()

    if (!result.isValid) {
      const firstErrorFieldId = flattenFormFields(formSchema).find(
        (field) => result.errors[field.id],
      )?.id

      if (firstErrorFieldId) {
        setSelectedFieldId(firstErrorFieldId)
      }

      messageApi.error(`发现 ${Object.keys(result.errors).length} 个未通过校验的字段`)
      return
    }

    messageApi.success('校验通过')
  }

  const handleReset = () => {
    resetForm()
    messageApi.info('已恢复为 schema 默认值')
  }

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#1768ac',
          colorInfo: '#1768ac',
          borderRadius: 12,
          colorBgLayout: '#edf2f7',
        },
      }}
    >
      {contextHolder}
      <div className="app-shell">
        <header className="app-toolbar">
          <div className="app-toolbar__branding">
            <p className="app-toolbar__eyebrow">React + Vite + Ant Design</p>
            <h1 className="app-toolbar__title">党建材料模板工作台</h1>
            <p className="app-toolbar__description">
              当前模板：{activeTemplate?.label}。左侧为单一全局表单，右侧为固定 A4
              模板预览，后续可以再逐步补齐字段映射。
            </p>
          </div>
          <TemplateToolbar
            onReset={handleReset}
            onValidate={handleValidate}
          />
        </header>

        <main className="app-content">
          <aside className="app-sidebar">
            <section className="app-panel sidebar-panel">
              <SchemaForm />
            </section>
          </aside>

          <section className="app-preview">
            <section className="app-panel preview-panel">
              <TemplatePreview />
            </section>
          </section>
        </main>
      </div>
    </ConfigProvider>
  )
}

export default App

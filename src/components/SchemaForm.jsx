import { useDeferredValue, useEffect, useState } from 'react'
import { Collapse, Empty, Form, Input, Tag, Typography } from 'antd'
import FormFieldRenderer from './FormFieldRenderer'
import { findFormFieldById, flattenFormFields } from '../data/formSchema'
import useFormStore from '../store/useFormStore'

const buildVisibleGroups = (schema, visibleFields) => {
  const visibleFieldIds = new Set(visibleFields.map((field) => field.id))

  return Object.entries(schema.fields).flatMap(([groupLabel, fields]) => {
    const nextFields = fields.filter((field) => visibleFieldIds.has(field.id))

    if (!nextFields.length) {
      return []
    }

    return [
      {
        key: groupLabel,
        label: groupLabel,
        fields: nextFields,
      },
    ]
  })
}

function SchemaForm() {
  const formSchema = useFormStore((state) => state.formSchema)
  const selectedFieldId = useFormStore((state) => state.selectedFieldId)
  const [searchText, setSearchText] = useState('')
  const deferredSearchText = useDeferredValue(searchText)
  const allFields = flattenFormFields(formSchema)
  const allGroupKeys = Object.keys(formSchema.fields)
  const normalizedSearchText = deferredSearchText.trim().toLowerCase()
  const selectedField = findFormFieldById(formSchema, selectedFieldId)
  const visibleFields = allFields.filter((field) => {
    if (field.id === selectedFieldId) {
      return true
    }

    if (!normalizedSearchText) {
      return true
    }

    return (
      field.label.toLowerCase().includes(normalizedSearchText) ||
      field.id.toLowerCase().includes(normalizedSearchText)
    )
  })
  const groupedFields = buildVisibleGroups(formSchema, visibleFields)
  const [openKeys, setOpenKeys] = useState(() => allGroupKeys)

  let activeKeys = openKeys.filter((key) =>
    groupedFields.some((group) => group.key === key),
  )

  if (selectedField && !activeKeys.includes(selectedField.groupLabel)) {
    activeKeys = [...activeKeys, selectedField.groupLabel]
  }

  useEffect(() => {
    if (!selectedField) {
      return undefined
    }

    const timer = window.setTimeout(() => {
      const fieldElement = document.getElementById(
        `schema-field-${selectedField.id}`,
      )

      fieldElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }, 120)

    return () => {
      window.clearTimeout(timer)
    }
  }, [selectedField])

  const handleSearchChange = (value) => {
    setSearchText(value)

    const normalizedValue = value.trim().toLowerCase()
    const nextOpenKeys = []

    allFields.forEach((field) => {
      const matchesSearch =
        field.id === selectedFieldId ||
        !normalizedValue ||
        field.label.toLowerCase().includes(normalizedValue) ||
        field.id.toLowerCase().includes(normalizedValue)

      if (matchesSearch && !nextOpenKeys.includes(field.groupLabel)) {
        nextOpenKeys.push(field.groupLabel)
      }
    })

    setOpenKeys(nextOpenKeys.length ? nextOpenKeys : allGroupKeys)
  }

  return (
    <div className="schema-form">
      <div className="schema-form__header">
        <div>
          <Typography.Title className="schema-form__title" level={4}>
            字段配置
          </Typography.Title>
          <Typography.Text className="schema-form__subtitle" type="secondary">
            左侧表单由全局 schema 驱动，当前模板切换不会影响表单字段。
          </Typography.Text>
        </div>
        <Tag>
          {visibleFields.length} / {allFields.length}
        </Tag>
      </div>

      <div className="schema-form__search">
        <Input.Search
          allowClear
          onChange={(event) => handleSearchChange(event.target.value)}
          placeholder="按字段名称或 id 搜索"
          value={searchText}
        />
      </div>

      <div className="schema-form__selection">
        {selectedField ? (
          <Typography.Text>
            当前高亮字段：<strong>{selectedField.label}</strong>
          </Typography.Text>
        ) : selectedFieldId ? (
          <Typography.Text type="secondary">
            当前高亮字段尚未映射到左侧表单：{selectedFieldId}
          </Typography.Text>
        ) : (
          <Typography.Text type="secondary">
            点击左侧表单项或右侧模板字段后，这里会自动滚动并高亮对应项。
          </Typography.Text>
        )}
      </div>

      <div className="schema-form__body">
        {visibleFields.length > 0 ? (
          <Form layout="vertical" requiredMark={false}>
            <Collapse
              activeKey={activeKeys}
              bordered={false}
              className="schema-form__collapse"
              items={groupedFields.map((group) => ({
                key: group.key,
                label: (
                  <div className="schema-form__group-header">
                    <span>{group.label}</span>
                    <Tag>{group.fields.length}</Tag>
                  </div>
                ),
                children: (
                  <div className="schema-form__group-body">
                    {group.fields.map((field) => (
                      <FormFieldRenderer
                        domId={`schema-field-${field.id}`}
                        field={field}
                        key={field.id}
                      />
                    ))}
                  </div>
                ),
              }))}
              onChange={(nextKeys) =>
                setOpenKeys(Array.isArray(nextKeys) ? nextKeys : [nextKeys])
              }
            />
          </Form>
        ) : (
          <Empty description="没有匹配的字段" />
        )}
      </div>
    </div>
  )
}

export default SchemaForm

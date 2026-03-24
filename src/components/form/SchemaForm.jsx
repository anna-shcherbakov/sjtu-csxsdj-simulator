import { memo, useDeferredValue, useEffect, useRef, useState } from 'react'
import { Collapse, Empty, Form, Input, Tag, Typography } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import FormFieldRenderer from './FormFieldRenderer'
import { findFormFieldById, flattenFormFields } from '../../data/formSchema'
import useFormStore from '../../store/useFormStore'

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
  const previousSelectedFieldIdRef = useRef(selectedFieldId)
  const pendingScrollFieldIdRef = useRef(null)

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

  const activeKeys = openKeys.filter((key) =>
    groupedFields.some((group) => group.key === key),
  )

  useEffect(() => {
    if (!selectedField || previousSelectedFieldIdRef.current === selectedFieldId) {
      previousSelectedFieldIdRef.current = selectedFieldId
      return
    }

    previousSelectedFieldIdRef.current = selectedFieldId
    pendingScrollFieldIdRef.current = selectedField.id

    const frameId = window.requestAnimationFrame(() => {
      setOpenKeys((currentKeys) =>
        currentKeys.includes(selectedField.groupLabel)
          ? currentKeys
          : [...currentKeys, selectedField.groupLabel],
      )
    })

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [selectedField, selectedFieldId])

  useEffect(() => {
    if (!selectedField || pendingScrollFieldIdRef.current !== selectedField.id) {
      return undefined
    }

    const frameId = window.requestAnimationFrame(() => {
      const fieldElement = document.getElementById(
        `schema-field-${selectedField.id}`,
      )

      fieldElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })

      pendingScrollFieldIdRef.current = null
    })

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [activeKeys, selectedField])

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
        <Typography.Title className="schema-form__title" level={4}>
          字段表单
        </Typography.Title>
        <Tag>
          {visibleFields.length} / {allFields.length}
        </Tag>
      </div>

      <div className="schema-form__search">
        <Input
          allowClear
          onChange={(event) => handleSearchChange(event.target.value)}
          placeholder="搜索字段"
          prefix={<SearchOutlined />}
          value={searchText}
        />
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

export default memo(SchemaForm)

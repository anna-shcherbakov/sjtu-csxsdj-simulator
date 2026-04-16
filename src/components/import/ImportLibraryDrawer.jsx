import { DeleteOutlined, ImportOutlined, UploadOutlined } from '@ant-design/icons'
import {
  Button,
  Drawer,
  Empty,
  Space,
  Table,
  Tag,
  Typography,
  Upload,
} from 'antd'
import styles from './ImportLibraryDrawer.module.css'

const buildSourceLabel = (record) => {
  const sheetName = record.meta?.sheetName || record.source?.sheetName || '未知工作表'
  const rowStart = record.meta?.rowStart ?? record.source?.rowStart
  const rowEnd = record.meta?.rowEnd ?? record.source?.rowEnd

  if (!rowStart || !rowEnd) {
    return sheetName
  }

  return `${sheetName} · 第 ${rowStart}-${rowEnd} 行`
}

function ImportLibraryDrawer({
  importedProfiles,
  onClear,
  onClose,
  onLoad,
  onRemove,
  onUpload,
  open,
}) {
  const columns = [
    {
      dataIndex: ['meta', 'name'],
      key: 'name',
      title: '姓名',
      width: 120,
      render: (value) => value || '未命名人员',
    },
    {
      dataIndex: ['meta', 'studentId'],
      key: 'studentId',
      title: '学号',
      width: 140,
      render: (value) => value || '—',
    },
    {
      dataIndex: ['meta', 'status'],
      key: 'status',
      title: '当前发展状态',
      width: 140,
      render: (value) => value || '—',
    },
    {
      dataIndex: ['meta', 'branchName'],
      key: 'branchName',
      title: '支部',
      ellipsis: true,
      render: (value) => value || '—',
    },
    {
      key: 'source',
      title: '来源',
      width: 180,
      render: (_, record) => buildSourceLabel(record),
    },
    {
      key: 'actions',
      title: '操作',
      width: 170,
      fixed: 'right',
      render: (_, record) => (
        <Space size={8}>
          <Button onClick={() => onLoad(record.id)} size="small" type="primary">
            载入表单
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => onRemove(record.id)}
            size="small"
          >
            删除
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <Drawer
      className={styles['import-library-drawer']}
      extra={
        <Button disabled={!importedProfiles.length} onClick={onClear}>
          清空
        </Button>
      }
      onClose={onClose}
      open={open}
      title="导入数据"
      width={860}
    >
      <div className={styles['import-library-drawer__content']}>
        <div className={styles['import-library-drawer__toolbar']}>
          <div className={styles['import-library-drawer__summary']}>
            <Typography.Title
              className={styles['import-library-drawer__title']}
              level={5}
            >
              已导入人员
            </Typography.Title>
            <Tag
              bordered={false}
              className={styles['import-library-drawer__count-tag']}
            >
              {importedProfiles.length} 人
            </Tag>
          </div>

          <Upload
            accept=".xlsx,.xls"
            beforeUpload={onUpload}
            maxCount={1}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />} type="primary">
              选择 Excel
            </Button>
          </Upload>
        </div>

        <div className={styles['import-library-drawer__hint']}>
          <ImportOutlined />
          <span>导入后会暂存在当前会话中，可随时删除或载入覆盖当前表单。</span>
        </div>

        <Table
          columns={columns}
          dataSource={importedProfiles}
          locale={{
            emptyText: (
              <Empty
                description="暂未导入任何人员数据"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            ),
          }}
          pagination={
            importedProfiles.length > 10
              ? {
                  pageSize: 10,
                  showSizeChanger: false,
                }
              : false
          }
          rowKey="id"
          scroll={{ x: 900 }}
          size="middle"
        />
      </div>
    </Drawer>
  )
}

export default ImportLibraryDrawer

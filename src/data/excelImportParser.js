import * as XLSX from 'xlsx'
import { buildInitialFormData, flattenFormFields, formSchema } from './formSchema.js'

export const EXCEL_HEADER_ROW_COUNT = 2

const DEFAULT_SHEET_INDEX = 0

const buildCoordinateKey = (rowIndex, columnIndex) => `${rowIndex}:${columnIndex}`

const getWorksheetRange = (worksheet) => {
  if (!worksheet?.['!ref']) {
    return null
  }

  return XLSX.utils.decode_range(worksheet['!ref'])
}

const getDenseCell = (worksheet, rowIndex, columnIndex) =>
  worksheet?.[rowIndex]?.[columnIndex] ?? null

const normalizeCellValue = (value) => {
  if (value === undefined || value === null) {
    return ''
  }

  return typeof value === 'string' ? value : String(value)
}

const getCellDisplayValue = (cell) => {
  if (!cell) {
    return ''
  }

  if (cell.w !== undefined && cell.w !== null) {
    return normalizeCellValue(cell.w)
  }

  return normalizeCellValue(cell.v)
}

const buildMergeLookup = (merges = []) => {
  const lookup = new Map()

  merges.forEach((merge) => {
    for (let rowIndex = merge.s.r; rowIndex <= merge.e.r; rowIndex += 1) {
      for (let columnIndex = merge.s.c; columnIndex <= merge.e.c; columnIndex += 1) {
        lookup.set(buildCoordinateKey(rowIndex, columnIndex), merge)
      }
    }
  })

  return lookup
}

const getResolvedCellValue = (worksheet, rowIndex, columnIndex, mergeLookup) => {
  const directCell = getDenseCell(worksheet, rowIndex, columnIndex)
  const directValue = getCellDisplayValue(directCell)

  if (directValue !== '') {
    return directValue
  }

  const merge = mergeLookup.get(buildCoordinateKey(rowIndex, columnIndex))

  if (!merge) {
    return ''
  }

  return getCellDisplayValue(getDenseCell(worksheet, merge.s.r, merge.s.c))
}

const rowHasAnyRawValue = (worksheet, rowIndex, columnCount) => {
  for (let columnIndex = 0; columnIndex < columnCount; columnIndex += 1) {
    if (getCellDisplayValue(getDenseCell(worksheet, rowIndex, columnIndex)) !== '') {
      return true
    }
  }

  return false
}

const groupBy = (items, getKey) =>
  items.reduce((groups, item) => {
    const key = getKey(item)
    const nextGroup = groups.get(key) ?? []
    nextGroup.push(item)
    groups.set(key, nextGroup)
    return groups
  }, new Map())

export const buildExpandedExcelColumnMap = (schema = formSchema) => {
  const flattenedFields = flattenFormFields(schema)
  let physicalColumnIndex = 0

  return flattenedFields.flatMap((field) => {
    if (field.fieldType !== 'list') {
      const column = {
        columnIndex: physicalColumnIndex,
        fieldId: field.id,
        fieldLabel: field.label,
        fieldType: field.fieldType ?? 'input',
        headerTop: field.label,
        headerSub: '',
        groupLabel: field.groupLabel,
      }

      physicalColumnIndex += 1
      return [column]
    }

    return field.columns.map((listColumn, listColumnIndex) => {
      const column = {
        columnIndex: physicalColumnIndex,
        fieldId: field.id,
        fieldLabel: field.label,
        fieldType: 'list',
        groupLabel: field.groupLabel,
        listColumnId: listColumn.id,
        listColumnLabel: listColumn.label,
        headerTop: listColumnIndex === 0 ? field.label : '',
        headerSub: listColumn.label,
      }

      physicalColumnIndex += 1
      return column
    })
  })
}

const buildColumnHeaderSignature = (headerTop, headerSub) =>
  `${headerTop}\u0000${headerSub}`

const getColumnDisplayLabel = (column) => {
  if (column.fieldType === 'list') {
    return `${column.fieldLabel} / ${column.listColumnLabel}`
  }

  return column.fieldLabel
}

const getHeaderRows = (worksheet, columnCount) => {
  const topHeaders = []
  const subHeaders = []

  for (let columnIndex = 0; columnIndex < columnCount; columnIndex += 1) {
    topHeaders.push(getCellDisplayValue(getDenseCell(worksheet, 0, columnIndex)))
    subHeaders.push(getCellDisplayValue(getDenseCell(worksheet, 1, columnIndex)))
  }

  return { topHeaders, subHeaders }
}

const buildActualHeaderColumns = (topHeaders, subHeaders) =>
  topHeaders.map((headerTop, columnIndex) => ({
    excelColumnIndex: columnIndex,
    headerTop,
    headerSub: subHeaders[columnIndex] ?? '',
    signature: buildColumnHeaderSignature(headerTop, subHeaders[columnIndex] ?? ''),
  }))

const buildLcsMatrix = (expectedColumns, actualColumns) => {
  const expectedCount = expectedColumns.length
  const actualCount = actualColumns.length
  const matrix = Array.from({ length: expectedCount + 1 }, () => new Uint16Array(actualCount + 1))

  for (let expectedIndex = 1; expectedIndex <= expectedCount; expectedIndex += 1) {
    for (let actualIndex = 1; actualIndex <= actualCount; actualIndex += 1) {
      const expectedColumn = expectedColumns[expectedIndex - 1]
      const actualColumn = actualColumns[actualIndex - 1]

      if (expectedColumn.signature === actualColumn.signature) {
        matrix[expectedIndex][actualIndex] =
          matrix[expectedIndex - 1][actualIndex - 1] + 1
      } else {
        matrix[expectedIndex][actualIndex] = Math.max(
          matrix[expectedIndex - 1][actualIndex],
          matrix[expectedIndex][actualIndex - 1],
        )
      }
    }
  }

  return matrix
}

const buildAlignedColumnMap = (expectedColumns, actualColumns) => {
  const diagnostics = []
  const lcsMatrix = buildLcsMatrix(expectedColumns, actualColumns)
  const matchedPairs = []
  let expectedIndex = expectedColumns.length
  let actualIndex = actualColumns.length

  while (expectedIndex > 0 && actualIndex > 0) {
    const expectedColumn = expectedColumns[expectedIndex - 1]
    const actualColumn = actualColumns[actualIndex - 1]

    if (expectedColumn.signature === actualColumn.signature) {
      matchedPairs.push({
        expectedIndex: expectedIndex - 1,
        actualIndex: actualIndex - 1,
      })
      expectedIndex -= 1
      actualIndex -= 1
      continue
    }

    if (lcsMatrix[expectedIndex - 1][actualIndex] >= lcsMatrix[expectedIndex][actualIndex - 1]) {
      expectedIndex -= 1
    } else {
      actualIndex -= 1
    }
  }

  matchedPairs.reverse()

  const actualIndexByExpectedIndex = new Map(
    matchedPairs.map((pair) => [pair.expectedIndex, pair.actualIndex]),
  )
  const matchedExpectedIndexes = new Set(matchedPairs.map((pair) => pair.expectedIndex))
  const matchedActualIndexes = new Set(matchedPairs.map((pair) => pair.actualIndex))
  const alignedColumnMap = expectedColumns.map((column, index) => {
    const matchedActualIndex = actualIndexByExpectedIndex.get(index)
    const excelColumnIndex =
      matchedActualIndex === undefined
        ? null
        : actualColumns[matchedActualIndex]?.excelColumnIndex ?? null

    return {
      ...column,
      excelColumnIndex,
    }
  })

  if (actualColumns.length !== expectedColumns.length) {
    diagnostics.push({
      type: 'columnCountMismatch',
      message: `Excel 与当前 schema 列数不完全一致：当前 Excel ${actualColumns.length} 列，schema ${expectedColumns.length} 列；会忽略无关列，并对缺失字段按空值处理`,
      expectedColumnCount: expectedColumns.length,
      actualColumnCount: actualColumns.length,
      matchedColumnCount: matchedPairs.length,
    })
  }

  expectedColumns.forEach((column, index) => {
    if (!matchedExpectedIndexes.has(index)) {
      diagnostics.push({
        type: 'missingSchemaColumn',
        message: `Excel 中缺少字段列“${getColumnDisplayLabel(column)}”，将按空值处理`,
        columnIndex: column.columnIndex,
        fieldId: column.fieldId,
        listColumnId: column.listColumnId ?? null,
        expectedTop: column.headerTop,
        expectedSub: column.headerSub,
      })
    }
  })

  actualColumns.forEach((column, index) => {
    if (!matchedActualIndexes.has(index)) {
      diagnostics.push({
        type: 'ignoredExcelColumn',
        message: `忽略 Excel 中的无关列“${column.headerTop || column.headerSub || `第 ${column.excelColumnIndex + 1} 列`}”`,
        columnIndex: column.excelColumnIndex,
        actualTop: column.headerTop,
        actualSub: column.headerSub,
      })
    }
  })

  return {
    columnMap: alignedColumnMap,
    diagnostics,
    matchedColumnCount: matchedPairs.length,
  }
}

const getScalarProbeColumnIndexes = (columnMap) =>
  [...new Set(
    columnMap
      .filter(
        (column) =>
          column.fieldType !== 'list' &&
          Number.isInteger(column.excelColumnIndex),
      )
      .map((column) => column.excelColumnIndex),
  )]

const buildBlockRangesFromMergeAndSignals = (
  worksheet,
  rowCount,
  columnCount,
  columnMap,
  merges = [],
) => {
  const scalarProbeColumnIndexes = getScalarProbeColumnIndexes(columnMap)
  const primaryProbeColumnIndex = scalarProbeColumnIndexes[0]
  const startRowIndexes = new Set()

  if (primaryProbeColumnIndex !== undefined) {
    merges
      .filter(
        (merge) =>
          merge.s.c === primaryProbeColumnIndex &&
          merge.e.c === primaryProbeColumnIndex &&
          merge.s.r >= EXCEL_HEADER_ROW_COUNT &&
          merge.e.r >= merge.s.r,
      )
      .forEach((merge) => {
        startRowIndexes.add(merge.s.r)
      })
  }

  for (let rowIndex = EXCEL_HEADER_ROW_COUNT; rowIndex < rowCount; rowIndex += 1) {
    const hasScalarSignal = scalarProbeColumnIndexes.some(
      (columnIndex) =>
        getCellDisplayValue(getDenseCell(worksheet, rowIndex, columnIndex)) !== '',
    )

    if (hasScalarSignal) {
      startRowIndexes.add(rowIndex)
    }
  }

  const sortedStarts = [...startRowIndexes].sort((left, right) => left - right)

  return sortedStarts
    .map((rowStart, index) => {
      const nextRowStart = sortedStarts[index + 1]
      let rowEnd = (nextRowStart ?? rowCount) - 1

      while (
        rowEnd >= rowStart &&
        !rowHasAnyRawValue(worksheet, rowEnd, columnCount)
      ) {
        rowEnd -= 1
      }

      if (rowEnd < rowStart) {
        return null
      }

      return { rowStart, rowEnd }
    })
    .filter(Boolean)
}

const assignScalarFieldValues = (
  worksheet,
  formData,
  rowStart,
  mergeLookup,
  scalarColumns,
) => {
  scalarColumns.forEach((column) => {
    if (!Number.isInteger(column.excelColumnIndex)) {
      return
    }

    formData[column.fieldId] = getResolvedCellValue(
      worksheet,
      rowStart,
      column.excelColumnIndex,
      mergeLookup,
    )
  })
}

const extractListFieldRows = (worksheet, rowRange, listColumns) => {
  const rows = []

  for (let rowIndex = rowRange.rowStart; rowIndex <= rowRange.rowEnd; rowIndex += 1) {
    const listRow = {}
    let hasValue = false

    listColumns.forEach((column) => {
      const value = Number.isInteger(column.excelColumnIndex)
        ? getCellDisplayValue(getDenseCell(worksheet, rowIndex, column.excelColumnIndex))
        : ''
      listRow[column.listColumnId] = value
      if (value !== '') {
        hasValue = true
      }
    })

    if (hasValue) {
      rows.push(listRow)
    }
  }

  return rows
}

const assignListFieldValues = (worksheet, formData, rowRange, listColumnsByFieldId) => {
  listColumnsByFieldId.forEach((listColumns, fieldId) => {
    formData[fieldId] = extractListFieldRows(worksheet, rowRange, listColumns)
  })
}

const parseWorksheet = (worksheet, sheetName, schema) => {
  const diagnostics = []
  const range = getWorksheetRange(worksheet)

  if (!range) {
    diagnostics.push({
      type: 'unsupportedWorkbookShape',
      message: 'Excel 工作表为空，无法解析',
      sheetName,
    })

    return {
      records: [],
      sheetMeta: {
        sheetName,
        headerRowCount: EXCEL_HEADER_ROW_COUNT,
        blockRanges: [],
      },
      diagnostics,
    }
  }

  const rowCount = range.e.r + 1
  const columnCount = range.e.c + 1
  const { topHeaders, subHeaders } = getHeaderRows(worksheet, columnCount)
  const expectedColumnMap = buildExpandedExcelColumnMap(schema).map((column) => ({
    ...column,
    signature: buildColumnHeaderSignature(column.headerTop, column.headerSub),
  }))
  const actualHeaderColumns = buildActualHeaderColumns(topHeaders, subHeaders)
  const { columnMap, diagnostics: headerDiagnostics, matchedColumnCount } =
    buildAlignedColumnMap(expectedColumnMap, actualHeaderColumns)
  diagnostics.push(...headerDiagnostics)

  const merges = worksheet['!merges'] ?? []
  const mergeLookup = buildMergeLookup(merges)
  const blockRanges = buildBlockRangesFromMergeAndSignals(
    worksheet,
    rowCount,
    columnCount,
    columnMap,
    merges,
  )

  if (!blockRanges.length) {
    diagnostics.push({
      type: 'unsupportedWorkbookShape',
      message: '未识别出任何记录块，请确认 Excel 为生产环境导出的标准格式',
      sheetName,
    })
  }

  const scalarColumns = columnMap.filter((column) => column.fieldType !== 'list')
  const listColumnsByFieldId = groupBy(
    columnMap.filter((column) => column.fieldType === 'list'),
    (column) => column.fieldId,
  )

  const records = blockRanges.map((rowRange, blockIndex) => {
    const formData = buildInitialFormData(schema)

    assignScalarFieldValues(
      worksheet,
      formData,
      rowRange.rowStart,
      mergeLookup,
      scalarColumns,
    )
    assignListFieldValues(worksheet, formData, rowRange, listColumnsByFieldId)

    return {
      formData,
      source: {
        sheetName,
        rowStart: rowRange.rowStart + 1,
        rowEnd: rowRange.rowEnd + 1,
        blockIndex: blockIndex + 1,
      },
    }
  })

  return {
    records,
    sheetMeta: {
      sheetName,
      headerRowCount: EXCEL_HEADER_ROW_COUNT,
      blockRanges: blockRanges.map((rowRange) => ({
        rowStart: rowRange.rowStart + 1,
        rowEnd: rowRange.rowEnd + 1,
      })),
      columnCount,
      expectedColumnCount: columnMap.length,
      matchedColumnCount,
    },
    diagnostics,
  }
}

const normalizeWorkbookBinary = (input) => {
  if (input instanceof Uint8Array) {
    return input
  }

  if (input instanceof ArrayBuffer) {
    return new Uint8Array(input)
  }

  throw new TypeError('parseExportWorkbook 只支持 ArrayBuffer 或 Uint8Array 输入')
}

export const parseExportWorkbook = (input, schema = formSchema) => {
  const workbookBinary = normalizeWorkbookBinary(input)
  const workbook = XLSX.read(workbookBinary, {
    type: 'array',
    dense: true,
    raw: false,
  })

  if (!workbook.SheetNames?.length) {
    return {
      records: [],
      sheetMeta: {
        sheetName: '',
        headerRowCount: EXCEL_HEADER_ROW_COUNT,
        blockRanges: [],
      },
      diagnostics: [
        {
          type: 'unsupportedWorkbookShape',
          message: 'Excel 文件中没有可解析的工作表',
        },
      ],
    }
  }

  const sheetName = workbook.SheetNames[DEFAULT_SHEET_INDEX]
  const worksheet = workbook.Sheets[sheetName]

  return parseWorksheet(worksheet, sheetName, schema)
}

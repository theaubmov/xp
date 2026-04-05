export interface Chart {
  id: string
  name: string
  createdTimeMs: number
  updatedTimeMs: number
  tenantID: string
  sourceType: string
  sourceIds: string[]
  chartType: string
  provider: string
  propertyList: any
  orderByMap: any
  groupByList: string[]
  metadata: any
}

export interface ChartResponse {
  totalRecords: number
  totalPages: number
  currentPage: number
  sizePerPage: number
  data: Chart[]
}

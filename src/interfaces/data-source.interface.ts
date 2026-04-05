export interface Dependencies {
  schemaIds: string[]
}

export interface Analytics {
  id: string
  owner: string
  name: string
  schemaId?: string
  description: string
  type: string
  accessible: boolean
  dependencies: Dependencies
}

export interface DataSourceGetResponse {
  tenantId: string
  totalPages: number
  totalRecords: number
  currentPage: number
  sizePerPage: number
  analytics: Analytics[]
  groups: Analytics[]
}

export enum DataSourceItemsKey {
  PLATEFORM = 'plateform',
  DATASOURCE = 'datasource'
}

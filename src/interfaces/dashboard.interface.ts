export interface dashboardProperties {
  columns: number
  title: string
  thumbnail: string
  dashboardDomStyles: string
}

export interface Dashboard {
  id: string
  name: string
  creationTime: number
  components: any
  additionalProperties: dashboardProperties
  tenantID: string
}

export interface DashboardsResponse {
  totalRecords: number
  totalPages: number
  currentPage: number
  sizePerPage: number
  data: Dashboard[]
  dashboards: Dashboard[]
}

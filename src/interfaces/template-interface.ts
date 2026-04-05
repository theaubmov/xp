export interface Template {
  templates: TemplateItem[]
  total_records: number
  total_pages: number
  totalRecords: number
  sizePerPage: number
  currentPage: number
}

export interface TemplateItem {
  id: string
  name: string
  tenantId: string
  subTenantId: string
  thumbnail: string
  template: any
  status: boolean
  createdAt: any
  updatedAt: any
  tags: []
}

export interface ContentFile {
  pre: string
  body: string
  post: string
}

export interface File {
  path: string
  url: string
  type: string
  content: ContentFile
}

export interface Config {
  canvasBackgroundColor: string
  elements: any
  animations: any
  resizePlayer?: any
  renderComponents: any
  iterationLabels: any[]
  dataSource: any
  validation: any
}

export interface BaAppConfig {
  thumbnail: string
  entryPageURL: string
  appName: string
  files: File[]
  config: Config
}

export interface BaContentPage {
  untaggedBaId: string
  baAppConfig: BaAppConfig
  baAppName: string
  published: boolean
  userId: string
  version: string
  createdAt: number
  tenantId: string
  tag: string
  id: string
  updatedAt: number
}

export interface TemplateContentPage {
  template: string
  createdAt: number
  subTenantId: string
  deleted: boolean
  sampleData: any
  name: string
  tenantId: string
  id: string
  status: boolean
  updatedAt: number
  tags: string[]
}

export interface Details {
  thumbnail?: string
  configuration?: any[]
  description: string
  channelType: string
  resolutions: any[]
  published: boolean
  lastPublishedTimeMs: number
  content: BaContentPage | TemplateContentPage
  devicesCompatibility: any
  updatedTimeMs: number
  createdTimeMs: number
  tenantId: string
  name: string
  orientationsCompatibility: any
  contentType: string
}

export interface Page {
  details: Details
  customEvents: any[]
  id: string
  owner: string
  name: string
  type: string
  accessible: boolean
  dependencies: any
  creationTimeMs: number
  updatedTimeMs: number
}

export interface Sort {
  unsorted: boolean
  sorted: boolean
  empty: boolean
}

export interface PageGetResponse {
  pages: Page[]
  totalPages: number
  totalRecords: number
  sizePerPage: number
  currentPage: number
  tenantId: string
}

export enum PageItemsKey {
  PAGE = 'page'
}

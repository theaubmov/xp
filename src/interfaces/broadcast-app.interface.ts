export interface Content {
  pre: string
  body: string
  post: string
}

export interface File {
  path: string
  url: string
  type: string
  content: Content
}

export interface DataSource {
  source: any[]
  context: any[]
  target: any[]
  custom: any[]
}

export interface MessageBoard {
  key: string
  value: any
}

export interface RenderComponents {
  [key: string]: MessageBoard[]
}

export interface Config {
  dataSource: DataSource
  elements: any
  animations: any
  renderComponents: RenderComponents
  validation: any
  resizePlayer: string
  canvasBackgroundColor: string
}

export interface BaAppConfig {
  entryPageURL: string
  bbandEntryPageUrl: string
  bcastEntryPackageUrl?: any
  bcastEntryPageUrl?: any
  files: File[]
  animations?: any
  updatedDatasources?: any
  tags?: any
  genres?: any
  category?: any
  thumbnail: string
  config: Config
  app_name: string
}

export interface OtherVersion {
  id?: any
  tenantId?: any
  userId?: any
  baAppId: string
  baAppConfig?: any
  version: string
  tag: string
  msg?: any
  untaggedBaId?: any
  createdAt: number
  published: boolean
}

export interface BroadCastApp {
  id: string
  tenantId: string
  userId: string
  createdAt: number
  updatedAt: number
  version: string
  published: boolean
  baAppConfig: BaAppConfig
  baAppName: string
  untaggedBaId: string
  tag: string
  otherVersions: OtherVersion[]
}

export interface BroadCastAppResponse {
  totalRecords: number
  totalPages: number
  currentPage: number
  sizePerPage: number
  data: BroadCastApp[]
}

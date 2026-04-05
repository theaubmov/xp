export enum TriggerItemsKey {
  ONE_TIME = 'ONETIME',
  CONTEXT = 'context',
  GROUP = 'group_definition',
  CRON = 'cron'
}
export interface Dependencies {
  schemaIds: string[]
}

export interface TriggerItem {
  id: string
  owner: string
  icon?: string
  name: string
  description: string
  type: string
  accessible: boolean
  dependencies: Dependencies
}

export interface TriggerGetResponse {
  tenantId: string
  totalPages: number
  totalRecords: number
  currentPage: number
  sizePerPage: number
  contexts: TriggerItem[]
  groups: TriggerItem[]
}

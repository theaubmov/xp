import type { PageConfiguration } from './experience.interface'

export interface TabItem {
  icon?: string
  key: string
  title: string
  component: any
}

export interface QueryItem {
  id: string
  title: string
  description: string
  lastUpdate: string
}

export interface GroupItem {
  id: string
  title: string
  description: string
  lastUpdate: string
}

export interface ContextItem {
  id: string
  title: string
  description: string
  lastUpdate: string
}

export interface PageItem {
  id: string
  title: string
  description: string
  lastUpdate: string
  thumbnail: string
  configuration: PageConfiguration[]
}

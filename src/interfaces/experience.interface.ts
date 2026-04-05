import type { ExperienceSimplified } from '@/helpers/experience-simplified'

export interface Media {
  title: string
  url: string
}

export interface Page {
  id: string
  name: string
}

export interface ConfigurationItem {
  id?: string
  icon?: string
  isActive?: boolean
  resolutions?: string[]
  orientation?: OrientationsCompatibility
  title?: string
  devicesCompatibility?: DevicesCompatibility
  status?: string
}

export interface ActionItem {
  icon: string
  url: string
}

export interface ItemsOrentation {
  icon: string
  isActive: boolean
}

export interface Configuration {
  [key: string]: ConfigurationItem[]
}

export interface Details {
  thumbnail: string
}

export interface DevicesCompatibility {
  phone: boolean
  tablet: boolean
  tv: boolean
}

export interface OrientationsCompatibility {
  landscape: boolean
  portrait: boolean
}

export interface PageExperience {
  id: string
  title?: string
  description?: string
  platform: string
  isPublished: string
  resolutions: any[]
  thumbnail: string
  devicesCompatibility: DevicesCompatibility
  orientationsCompatibility: OrientationsCompatibility
  createdAt: string
  updatedAt: string
  configuration: PageConfiguration[]
}

export interface Slides {
  id: string
  thumbnail: string
}

export interface PageConfiguration {
  title: string
}

export interface Experience {
  id: string
  name: string
  description: string
  category: string
  status: string
  tenant: string
  version: string
  createdAt: string
  updatedAt: string
  gitSource: string
  tags: string[]
  medias: Media[]
  details: Details
  thumbnail: string
  configuration: Configuration
  pages: PageExperience[]
  experienceElements: any[]
  performance: string[]
}

export interface ExperienceResponse {
  totalElements: number
  totalPages: number
  currentPage: number
  number?: number
  size: number
  experience: Experience[]
  content?: Experience[]
}

export interface SearchExperienceResponse {
  tenantId: string
  totalPages: number
  totalRecords: number
  currentPage: number
  sizePerpage: number
  experience: Experience[]
}

export interface ExperienceCreationResponse {
  id: string
  msg: string
  status: string
  tenantId: string
  experience: Experience
}

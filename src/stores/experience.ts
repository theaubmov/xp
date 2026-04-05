import { ExperienceSimplified } from '@/helpers/experience-simplified'
import type { ExperienceInformationDto } from '@/interfaces/dto/experience-information.dto'
import type { ExperienceDTO } from '@/interfaces/dto/experience.dto'
import type {
  Configuration,
  Experience,
  Media
} from '@/interfaces/experience.interface'
import type {
  QueryItem,
  GroupItem,
  ContextItem
} from '@/interfaces/tab-item.interface'
import { api, apiUrlGain } from '@/plugins/api'
import { find, forEach } from 'lodash'
import { defineStore } from 'pinia'
import { useUploaderStore } from './uploader'

export const useExperienceStore = defineStore({
  id: 'experience',
  state: () => ({
    onLoadingExperiences: false as boolean,
    experienceList: [] as Experience[],
    allExperienceList: [] as Experience[],
    currentPage: 1,
    currentExperiencesPage: 1,
    totalPages: 0 as number,
    currentExperience: {} as Experience,
    currentExperienceItems: [] as any,
    currentExperienceMedias: [] as Media[],
    queries: [] as QueryItem[],
    groups: [] as GroupItem[],
    contexts: [] as ContextItem[],
    showDrawer: false
  }),
  getters: {
    getExperiencesSimplified(): ExperienceSimplified[] {
      const experienceSimplified: ExperienceSimplified[] = []
      forEach(this.experienceList, (value) => {
        experienceSimplified.push(new ExperienceSimplified(value))
      })
      return experienceSimplified
    },
    getAllExperiencesSimplified(): ExperienceSimplified[] {
      const experienceSimplified: ExperienceSimplified[] = []
      forEach(this.allExperienceList, (value) => {
        experienceSimplified.push(new ExperienceSimplified(value))
      })
      return experienceSimplified
    },
    getCurrentExperience(): ExperienceSimplified {
      return new ExperienceSimplified(this.currentExperience)
    }
  },
  actions: {
    getPageOfCurrentExperienceById(id: string) {
      return find(this.getCurrentExperience.pagesItem, ['id', id])
    },
    async getExperiences(): Promise<void> {
      const response = await api.experience.getExperiences()
      this.experienceList = response.data
    },
    async getRealExperiences(current?: number, size?: number): Promise<void> {
      const response = await apiUrlGain.experiencev2.getExperiences(
        current,
        size
      )
      this.currentPage = response.data.currentPage + 1
      this.totalPages = response.data.totalPages
      this.experienceList = response.data.experience
    },
    async searchRealExperiences(
      query?: string,
      current?: number,
      size?: number,
      isLoadMore?: boolean
    ): Promise<void> {
      this.onLoadingExperiences = true
      const response = await apiUrlGain.experiencev2.searchExperiences(
        query,
        current,
        size
      )
      if (isLoadMore) {
        this.currentExperiencesPage = response.data.currentPage + 1
        this.totalPages = response.data.totalPages
        this.allExperienceList = [
          ...this.allExperienceList,
          ...response.data.experience
        ]
      } else {
        this.currentPage = response.data.currentPage + 1
        this.totalPages = response.data.totalPages
        this.experienceList = response.data.experience
        if (!query && current === 0) {
          this.currentExperiencesPage = 1
          this.allExperienceList = response.data.experience
        }
      }
      this.onLoadingExperiences = false
    },
    async getExperienceById(id: string): Promise<void> {
      const response = await api.experiencev2.getExperience(id)
      this.currentExperience = response.data
      this.currentExperienceItems = response.data['experienceElements']
        ? response.data['experienceElements']
        : []
      this.currentExperienceMedias = response.data['medias']
    },
    async getRealExperienceById(id: string): Promise<void> {
      const response = await apiUrlGain.experiencev2.getExperience(id)
      this.currentExperience = response.data
      this.currentExperienceItems = response.data['experienceElements']
        ? response.data['experienceElements']
        : []
      this.currentExperienceMedias = response.data['medias']
    },
    async createExperience(dto: ExperienceDTO): Promise<Experience> {
      const thumbnailsResponse = await useUploaderStore().uploadCollateral(
        dto.file
      )
      dto.thumbnail = thumbnailsResponse.downloadUrl
      const response = await apiUrlGain.experiencev2.createExperience(dto)
      this.experienceList.push(response.data.experience)
      return response.data.experience
    },
    async updateExperienceElemenet(experience: Experience, elements: any[]) {
      this.currentExperienceItems = elements
      const response = await apiUrlGain.experiencev2.updateExperienceElement(
        experience,
        this.currentExperienceItems
      )
    },
    async updateExperienceMedia(id: string, element: Media) {
      const response = await api.experience.updateExperienceMedia(id, element)
      this.currentExperienceMedias = response.data['medias']
    },
    async updateExperienceInformation(
      id: string,
      elements: ExperienceInformationDto
    ): Promise<Experience> {
      const response = await api.experience.updateExperienceInformation(
        id,
        elements
      )
      this.currentExperience = { ...response.data }
      return response.data
    },
    async updateExperienceDashboard(
      id: string,
      dashboards: string[]
    ): Promise<Experience> {
      const response = await api.experience.updateExperienceDashboard(
        id,
        dashboards
      )
      this.currentExperience = { ...response.data }
      return response.data
    },
    async getQueries(): Promise<void> {
      const response = await api.experience.getQueries()
      this.queries = response.data
    },
    async searchQueries(value: string): Promise<void> {
      const response = await api.experience.searchQueries(value)
      this.queries = response.data
    },
    async getGroups(): Promise<void> {
      const response = await api.experience.getGroups()
      this.groups = response.data
    },
    async searchGroups(value: string): Promise<void> {
      const response = await api.experience.searchGroups(value)
      this.groups = response.data
    },
    async getContext(): Promise<void> {
      const response = await api.experience.getContext()
      this.contexts = response.data
    },
    async searchContext(value: string): Promise<void> {
      const response = await api.experience.searchContext(value)
      this.contexts = response.data
    },
    async getPlatformDeviceSupport(id: string): Promise<Configuration> {
      const response = await api.experience.getPlatformDeviceSupport(id)
      return response.data
    },
    async deleteExperience(id: string): Promise<number> {
      const response = await apiUrlGain.experiencev2.deleteExperienceByID(id)
      return response.status
    }
  }
})

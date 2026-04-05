import {
  buildMockBase64ImageSource,
  defaultMockThumbnail
} from '@/helpers/mock-asset'
import type { TemplateItem } from '@/interfaces/template-interface'
import { apiUrlGain } from '@/plugins/api'
import { map } from 'lodash'
import { defineStore } from 'pinia'

export const useTemplateStore = defineStore({
  id: 'template-store',
  state: () => ({
    templates: [] as TemplateItem[],
    onLoadingTemplate: true as boolean,
    currentPage: 1 as number,
    totalPages: 0 as number
  }),
  actions: {
    async getTemplates(current: number): Promise<TemplateItem[]> {
      this.onLoadingTemplate = true
      const response = await apiUrlGain.templates.getTemplates(current)
      map(response.data.templates, async (entry, index) => {
        await apiUrlGain.contentService
          .getImageByThumbnailID(entry.thumbnail)
          .then((imgData) => {
            this.templates[index].thumbnail = buildMockBase64ImageSource(
              imgData.data.base64,
              imgData.data.mimeType
            )
          })
          .catch(() => {
            this.templates[index].thumbnail = defaultMockThumbnail
          })
      })
      this.templates = response.data.templates
      this.totalPages = response.data.total_pages
      this.onLoadingTemplate = false
      return response.data.templates
    },
    async searchTemplates(
      query: string,
      current: number
    ): Promise<TemplateItem[]> {
      this.onLoadingTemplate = true
      const response = await apiUrlGain.templates.searchTemplates(
        query,
        current
      )
      map(response.data.templates, async (entry, index) => {
        await apiUrlGain.contentService
          .getImageByThumbnailID(entry.thumbnail)
          .then((imgData) => {
            this.templates[index].thumbnail = buildMockBase64ImageSource(
              imgData.data.base64,
              imgData.data.mimeType
            )
          })
          .catch(() => {
            this.templates[index].thumbnail = defaultMockThumbnail
          })
      })
      const { data } = response
      this.templates = data.templates
      this.totalPages = Math.ceil(data.totalRecords / data.sizePerPage)
      this.onLoadingTemplate = false
      return response.data.templates
    },
    async deleteTemplate(id: string): Promise<number> {
      const response = await apiUrlGain.templates.deleteTemplate(id)
      return response.status
    }
  }
})

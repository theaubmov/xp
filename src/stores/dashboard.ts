import {
  buildMockBase64ImageSource,
  defaultMockThumbnail
} from '@/helpers/mock-asset'
import type { Dashboard } from '@/interfaces/dashboard.interface'
import { apiUrlGain } from '@/plugins/api'
import { map } from 'lodash'
import { defineStore } from 'pinia'

const DEMO_MODE_MUTATION_STATUS = 403

export const useDashboardStore = defineStore({
  id: 'dashboard',
  state: () => ({
    dashboards: [] as Dashboard[],
    onLoadingDashboards: true as boolean,
    currentPage: 1 as number,
    totalPages: 0 as number
  }),
  actions: {
    async getDashboards(current: number): Promise<Dashboard[]> {
      this.onLoadingDashboards = true
      const response = await apiUrlGain.dashboard.getDashboards(current)

      map(response.data.data, async (entry, index) => {
        await apiUrlGain.contentService
          .getImageByThumbnailID(entry.additionalProperties.thumbnail)
          .then((imgData) => {
            this.dashboards[index].additionalProperties.thumbnail =
              buildMockBase64ImageSource(
                imgData.data.base64,
                imgData.data.mimeType
              )
          })
          .catch(() => {
            this.dashboards[index].additionalProperties.thumbnail =
              defaultMockThumbnail
          })
      })

      this.dashboards = response.data.data
      this.currentPage = response.data.currentPage + 1
      this.totalPages = response.data.totalPages
      this.onLoadingDashboards = false
      return response.data.data
    },
    async searchDashboards(
      query: string,
      current: number
    ): Promise<Dashboard[]> {
      this.onLoadingDashboards = true
      const response = await apiUrlGain.dashboard.searchDashboards(
        query,
        current
      )

      const { data } = response
      this.dashboards = data?.dashboards || []
      map(this.dashboards, async (entry, index) => {
        await apiUrlGain.contentService
          .getImageByThumbnailID(entry.additionalProperties.thumbnail)
          .then((imgData) => {
            this.dashboards[index].additionalProperties.thumbnail =
              buildMockBase64ImageSource(
                imgData.data.base64,
                imgData.data.mimeType
              )
          })
          .catch(() => {
            this.dashboards[index].additionalProperties.thumbnail =
              defaultMockThumbnail
          })
      })
      this.currentPage = response.data.currentPage + 1
      this.totalPages = data.totalPages
      this.onLoadingDashboards = false
      return response.data?.dashboards || []
    },
    async deleteDashboard(id: string): Promise<number> {
      return DEMO_MODE_MUTATION_STATUS
    }
  }
})

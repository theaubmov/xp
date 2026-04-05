import {
  buildMockBase64ImageSource,
  defaultMockThumbnail
} from '@/helpers/mock-asset'
import type { BroadCastApp } from '@/interfaces/broadcast-app.interface'
import { apiUrlGain } from '@/plugins/api'
import { map } from 'lodash'
import { defineStore } from 'pinia'

const DEMO_MODE_MUTATION_STATUS = 403

export const useBroadcastAppStore = defineStore({
  id: 'broadcast-app',
  state: () => ({
    apps: [] as BroadCastApp[],
    onLoadingApps: true as boolean,
    currentPage: 1 as number,
    totalPages: 0 as number
  }),
  actions: {
    async getBroadCastApp(current: number): Promise<BroadCastApp[]> {
      this.onLoadingApps = true
      const response = await apiUrlGain.broadcastApp.getBroadCastApp(current)
      map(response.data.data, async (entry, index) => {
        await apiUrlGain.contentService
          .getImageByThumbnailID(entry.baAppConfig.thumbnail)
          .then((imgData) => {
            this.apps[index].baAppConfig.thumbnail = buildMockBase64ImageSource(
              imgData.data.base64,
              imgData.data.mimeType
            )
          })
          .catch(() => {
            this.apps[index].baAppConfig.thumbnail = defaultMockThumbnail
          })
      })
      this.apps = response.data.data
      this.currentPage = response.data.currentPage + 1
      this.totalPages = response.data.totalPages
      this.onLoadingApps = false
      return response.data.data
    },
    async searchBroadCastApp(
      query: string,
      current: number
    ): Promise<BroadCastApp[]> {
      this.onLoadingApps = true
      const response = await apiUrlGain.broadcastApp.searchBroadCastApp(
        query,
        current
      )

      map(response.data.data, async (entry, index) => {
        if (entry.baAppConfig && entry.baAppConfig?.thumbnail) {
          await apiUrlGain.contentService
            .getImageByThumbnailID(entry?.baAppConfig?.thumbnail)
            .then((imgData) => {
              this.apps[index].baAppConfig.thumbnail =
                buildMockBase64ImageSource(
                  imgData.data.base64,
                  imgData.data.mimeType
                )
            })
            .catch(() => {
              this.apps[index].baAppConfig.thumbnail = defaultMockThumbnail
            })
        }
      })

      const { data } = response
      this.apps = data.data
      this.totalPages = data.totalPages
      this.currentPage = response.data.currentPage + 1
      this.onLoadingApps = false
      return response.data.data
    },
    async deleteBroadCastApp(id: string): Promise<number> {
      return DEMO_MODE_MUTATION_STATUS
    }
  }
})

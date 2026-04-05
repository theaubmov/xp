import { getThumbnail, setThumbnailPage } from '@/helpers/content-extractor'
import {
  buildMockBase64ImageSource,
  defaultMockThumbnail
} from '@/helpers/mock-asset'
import type { Page } from '@/interfaces/page.interface'
import { apiUrlGain } from '@/plugins/api'
import { concat, map } from 'lodash'
import { defineStore } from 'pinia'

export const usePagesStore = defineStore({
  id: 'pages',
  state: () => ({
    pages: [] as Page[]
  }),
  actions: {
    async getPages(page: number): Promise<void> {
      const response = await apiUrlGain.pages.getPages(page)
      if (page >= response.data.totalPages) return
      const data = await this.fetchPageImage(response.data.pages)
      if (page === 0) {
        this.pages = data
      } else {
        this.pages = concat(this.pages, data)
      }
    },
    async searchPages(keyword: string): Promise<void> {
      const response = await apiUrlGain.pages.searchPages(keyword)
      const data = await this.fetchPageImage(response.data.pages)
      this.pages = data
    },
    // https://cdn-icons-png.flaticon.com/512/1666/1666686.png
    async fetchPageImage(pages: Page[]): Promise<Page[]> {
      const newPages = await Promise.all(
        map(pages, async (page) => {
          const currentThumbnail = getThumbnail(page.details)
          if (!currentThumbnail) {
            page = setThumbnailPage(page, defaultMockThumbnail)
          } else if (!currentThumbnail.startsWith('data:image')) {
            await apiUrlGain.contentService
              .getImageByThumbnailID(currentThumbnail)
              .then((imgData) => {
                page = setThumbnailPage(
                  page,
                  buildMockBase64ImageSource(
                    imgData.data.base64,
                    imgData.data.mimeType
                  )
                )
              })
              .catch(() => {
                page = setThumbnailPage(page, defaultMockThumbnail)
              })
          }
          return page
        })
      )
      return newPages
    }
  }
})

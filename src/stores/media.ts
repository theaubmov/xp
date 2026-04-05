import type { Media } from '@/interfaces/media-interface'
import type { MediaListFiles } from '@/interfaces/media-interface'
import { apiUrlGain } from '@/plugins/api'
import { concat } from 'lodash'
import { defineStore } from 'pinia'

export const useMediaStore = defineStore({
  id: 'media-store',
  state: () => ({
    videos: [] as Media[],
    images: [] as Media[],
    audios: [] as Media[],
    currentPreviewMedia: {} as any,
    onLoadingVideos: true as boolean,
    onLoadingImages: true as boolean,
    onLoadingAudios: true as boolean,
    currentVideosPage: 1 as number,
    currentImagesPage: 1 as number,
    currentAudiosPage: 1 as number,
    totalVideosPages: 0 as number,
    totalImagesPages: 0 as number,
    totalAudiosPages: 0 as number
  }),
  actions: {
    async getMediaImages(current: number): Promise<MediaListFiles> {
      this.onLoadingImages = true
      const response = await apiUrlGain.media.getMediaImages(current)
      this.images = concat(
        response.data.files.content.PRIVATE,
        response.data.files.content.PUBLIC
      )
      this.totalImagesPages = response.data.files.totalPages
      this.onLoadingImages = false
      return response.data.files
    },
    async getMediaVideos(current: number): Promise<MediaListFiles> {
      this.onLoadingVideos = true
      const response = await apiUrlGain.media.getMediaVideos(current)
      this.videos = concat(
        response.data.files.content.PRIVATE,
        response.data.files.content.PUBLIC
      )
      this.totalVideosPages = response.data.files.totalPages
      this.onLoadingVideos = false
      return response.data.files
    },
    async getMediaAudios(current: number): Promise<MediaListFiles> {
      this.onLoadingAudios = true
      const response = await apiUrlGain.media.getMediaAudios(current)
      this.audios = concat(
        response.data.files.content.PRIVATE,
        response.data.files.content.PUBLIC
      )
      this.totalAudiosPages = response.data.files.totalPages
      this.onLoadingAudios = false
      return response.data.files
    },
    async deleteMedia(id: string): Promise<number> {
      const response = await apiUrlGain.media.deleteMedia(id)
      return response.status
    }
  }
})

import { apiUrlGain } from '@/plugins/api'
import { defineStore } from 'pinia'

export const useUploaderStore = defineStore({
  id: 'uploader',
  actions: {
    async uploadCollateral(media: any): Promise<any> {
      const response = await apiUrlGain.uploader.uploadCollateral(media)
      return response.data
    }
  }
})

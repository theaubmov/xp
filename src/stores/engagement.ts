import { apiUrlGain } from '@/plugins/api'
import { defineStore } from 'pinia'
import { useTokenStore } from './token'

export const useEngagementStore = defineStore({
  id: 'engagement',
  actions: {
    async createEngagement(media: any): Promise<any> {
      const response = await apiUrlGain.engagement.createEngagement(media)
      return response.data
    }
  }
})

import { apiUrlGain } from '@/plugins/api'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore({
  id: 'token',
  actions: {
    async getBearerToken(): Promise<string> {
      const response = await apiUrlGain.token.getBearerToken()
      return response.data.access_token
    }
  }
})

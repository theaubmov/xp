import type { Animation } from '@/interfaces/animation.interface'
import { apiUrlGain } from '@/plugins/api'
import { defineStore } from 'pinia'

export const useAnimationStore = defineStore({
  id: 'animation',
  state: () => ({
    animations: [] as Animation[],
    onLoadingAnimations: true as boolean,
    currentPage: 1 as number,
    totalPages: 0 as number
  }),
  actions: {
    async getAnimations(current: number): Promise<Animation[]> {
      this.onLoadingAnimations = true
      const response = await apiUrlGain.animation.getAnimations(current)

      this.animations = response.data.content
      this.totalPages = response.data.totalPages - 1
      this.onLoadingAnimations = false
      return response.data.content
    }
  }
})

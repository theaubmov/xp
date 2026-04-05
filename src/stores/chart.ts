import type { Chart } from '@/interfaces/chart.interface'
import { apiUrlGain } from '@/plugins/api'
import { defineStore } from 'pinia'

export const useChartStore = defineStore({
  id: 'charts',
  state: () => ({
    charts: [] as Chart[],
    onLoadingCharts: true as boolean,
    currentPage: 1 as number,
    totalPages: 0 as number
  }),
  actions: {
    async getCharts(current: number): Promise<Chart[]> {
      this.onLoadingCharts = true
      const response = await apiUrlGain.chart.getCharts(current)

      this.charts = response.data.data
      this.currentPage = response.data.currentPage + 1
      this.totalPages = response.data.totalPages
      this.onLoadingCharts = false
      return response.data.data
    },
    async deleteChart(id: string): Promise<number> {
      const response = await apiUrlGain.chart.deleteChart(id)
      return response.status
    }
  }
})

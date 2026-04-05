import {
  fromGroupIterationToSimplified,
  fromQueryIterationToSimplified
} from '@/helpers/iteration-simplified'
import type { Analytics } from '@/interfaces/data-source.interface'
import { apiUrlGain } from '@/plugins/api'
import { concat } from 'lodash'
import { defineStore } from 'pinia'

export const useDataSourceStore = defineStore({
  id: 'data-sources',
  state: () => ({
    dataSources: [] as Analytics[]
  }),
  actions: {
    async getDataSource(current: number): Promise<void> {
      const response = await apiUrlGain.dataSources.getDataSources(current)
      if (current >= response.data.totalPages) return

      const groups = response.data.groups || []
      const analytics = response.data.analytics || []
      const ListDataSource = concat(analytics, groups)

      if (current === 0) {
        this.dataSources = ListDataSource
      } else {
        this.dataSources = concat(this.dataSources, ListDataSource)
      }
    },
    async searchDataSource(keyword: string): Promise<void> {
      const response = await apiUrlGain.dataSources.searchDataSource(keyword)

      const groups = response.data.groups || []
      const analytics = response.data.analytics || []

      this.dataSources = concat(analytics, groups)
    },
    async getValue(item: any): Promise<string[]> {
      let response = undefined
      if (item.type === 'QUERY') {
        response = await apiUrlGain.dataSources.getQueryIterationValue(item.id)
        return fromQueryIterationToSimplified(
          response.data.model.metadata.columns
        )
      } else {
        response = await apiUrlGain.dataSources.getGroupIterationValue(
          item.schemaId,
          item.owner
        )
        return await fromGroupIterationToSimplified(response.data.attributes)
      }
    }
  }
})

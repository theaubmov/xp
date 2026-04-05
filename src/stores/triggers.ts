import type {
  TriggerGetResponse,
  TriggerItem
} from '@/interfaces/trigger.interface'
import { apiUrlGain } from '@/plugins/api'
import { forEach, merge } from 'lodash'
import { defineStore } from 'pinia'

export const useTriggerStore = defineStore({
  id: 'trigger',
  state: () => ({
    triggers: [] as TriggerItem[]
  }),
  actions: {
    async getTriggers(page: number): Promise<void> {
      const response = await apiUrlGain.trigger.getTriggers(page)
      if (page >= response.data.totalPages) return
      if (page === 0) {
        this.triggers = mergeContextGroupResponse(response.data)
      } else {
        this.triggers.push(...mergeContextGroupResponse(response.data))
      }
    },
    async searchTriggers(value: string): Promise<void> {
      const response = await apiUrlGain.trigger.searchTriggers(value)
      this.triggers = mergeContextGroupResponse(response.data)
    }
  }
})

function mergeContextGroupResponse(data: TriggerGetResponse) {
  forEach(data.groups, (item, key) => {
    data.groups[key].icon = 'fa-solid fa-people-group'
  })
  forEach(data.contexts, (item, key) => {
    data.contexts[key].icon = 'fa-brands fa-connectdevelop'
  })
  return merge(data.contexts, data.groups)
}

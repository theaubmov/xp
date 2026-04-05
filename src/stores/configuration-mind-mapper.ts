import {
  configurationMindMapperTemplate,
  type ConfigurationMindMapper
} from '@/interfaces/configuration-mind-mapper'
import { DataSourceItemsKey } from '@/interfaces/data-source.interface'
import { PageItemsKey } from '@/interfaces/page.interface'
import { TriggerItemsKey } from '@/interfaces/trigger.interface'
import { has } from 'lodash'
import { defineStore } from 'pinia'

export const useConfigurationMindMapper = defineStore({
  id: 'configuration-mind-mapper',
  state: () => ({
    currentConfiguration: {} as ConfigurationMindMapper
  }),
  actions: {
    async setCurrentConfiguration(key: string, item: any, id?: string) {
      if (has(configurationMindMapperTemplate, key))
        switch (key) {
          case TriggerItemsKey.CONTEXT:
            this.currentConfiguration = {
              id: TriggerItemsKey.CONTEXT,
              edgeId: id,
              title: 'Configuration Context',
              component: 'context',
              item: item
            }
            break
          case TriggerItemsKey.CRON:
            this.currentConfiguration = {
              id: TriggerItemsKey.CRON,
              edgeId: id,
              title: 'Configuration CRON',
              component: 'cron',
              item: item
            }
            break
          case TriggerItemsKey.GROUP:
            this.currentConfiguration = {
              id: TriggerItemsKey.GROUP,
              edgeId: id,
              title: 'Configuration GROUP',
              component: 'group_definition',
              item: item
            }
            break
          case DataSourceItemsKey.PLATEFORM:
            this.currentConfiguration = {
              id: DataSourceItemsKey.PLATEFORM,
              nodeId: id,
              title: 'Configuration Plateform',
              component: 'plateform',
              item: item
            }
            break
          case DataSourceItemsKey.DATASOURCE:
            this.currentConfiguration = {
              id: DataSourceItemsKey.DATASOURCE,
              title: 'Configuration Data Source',
              component: 'datasource',
              item: item
            }
            break
          case PageItemsKey.PAGE:
            this.currentConfiguration = {
              id: PageItemsKey.PAGE,
              nodeId: id,
              title: 'Configuration Page',
              component: 'page',
              item: item
            }
            break
          default:
            break
        }
    },
    reset() {
      this.currentConfiguration = {} as ConfigurationMindMapper
    }
  }
})

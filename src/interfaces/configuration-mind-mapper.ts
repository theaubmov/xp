import ContextConfiguration from '@/components/experience-builder/journey-view/journey-mind-maper/configuration-template/ContextConfiguration.vue'
import CRONConfiguration from '@/components/experience-builder/journey-view/journey-mind-maper/configuration-template/CRONConfiguration.vue'
import PlateformConfiguration from '@/components/experience-builder/journey-view/journey-mind-maper/configuration-template/plateform-configuration/PlateformConfiguration.vue'
import GroupConfiguration from '@/components/experience-builder/journey-view/journey-mind-maper/configuration-template/GroupConfiguration.vue'
import DataSourceConfiguration from '@/components/experience-builder/journey-view/journey-mind-maper/configuration-template/DataSourceConfiguration.vue'
import PageConfigurationVue from '@/components/experience-builder/journey-view/journey-mind-maper/configuration-template/page-configuration/PageConfiguration.vue'

export const configurationMindMapperTemplate: any = {
  cron: CRONConfiguration,
  context: ContextConfiguration,
  group_definition: GroupConfiguration,
  plateform: PlateformConfiguration,
  datasource: DataSourceConfiguration,
  page: PageConfigurationVue
}

export interface ConfigurationMindMapper {
  id: string
  edgeId?: string
  nodeId?: string
  title: string
  component: any
  item: any
}

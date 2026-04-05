import { createRouter, createWebHashHistory } from 'vue-router'
import { useExperienceStore } from '@/stores/experience'
import HomeView from '@/views/HomeView.vue'
import ExperienceBuilderView from '@/views/ExperienceBuilderView.vue'
import JourneyView from '@/components/experience-builder/journey-view/JourneyView.vue'
import NoExperience from '@/components/experience-builder/no-experience/NoExperience.vue'
import NewExperience from '@/views/NewExperience.vue'

import { get } from 'lodash'
import PreviewerView from '@/components/experience-builder/previewer-view/PreviewerView.vue'
import PublisherView from '@/components/experience-builder/publisher-view/PublisherView.vue'
import PerformanceView from '@/components/experience-builder/performance-view/PerformanceView.vue'
import ContentManagementSystemView from '@/views/ContentManagementSystemView.vue'
import DesignerView from '@/views/DesignerView.vue'
import ExperiencesView from '@/views/ExperiencesView.vue'
import MockSurfaceView from '@/views/MockSurfaceView.vue'
import SettingsView from '@/views/SettingsView.vue'
import { useDataSourceStore } from '@/stores/data-sources'
import { usePagesStore } from '@/stores/pages'
import { useTriggerStore } from '@/stores/triggers'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ExperiencesView
    },
    {
      path: '/experiences',
      name: 'experiences',
      component: ExperiencesView
    },
    {
      path: '/experience-builder',
      name: 'experience-builder',
      redirect: 'experience-builder/journey',
      component: ExperienceBuilderView,
      beforeEnter: async (to, from, next) => {
        const experienceStore = useExperienceStore()
        const pageStore = usePagesStore()
        const dataSourceStore = useDataSourceStore()
        const triggerStore = useTriggerStore()

        if (!experienceStore.getCurrentExperience?.id && !to.query.id) {
          await experienceStore.searchRealExperiences()
          await experienceStore.getRealExperienceById(
            experienceStore.experienceList[0].id
          )
        }

        if (to.query.id) {
          try {
            await experienceStore.getRealExperienceById(get(to, 'query.id', ''))
          } catch (error) {
            console.error('experience not found', error)
            next({ name: 'no-experience' })
          }
          try {
            await pageStore.getPages(0)
            await dataSourceStore.getDataSource(0)
            await triggerStore.getTriggers(0)
          } catch (error) {
            console.error('Error', error)
          }
        }
        if (experienceStore.getCurrentExperience?.id) {
          next()
        } else {
          next({ name: 'no-experience' })
        }
      },
      children: [
        {
          path: 'journey',
          name: 'journey',
          component: JourneyView
        },
        {
          path: 'previewer',
          name: 'previewer',
          component: PreviewerView
        },
        {
          path: 'publisher',
          name: 'publisher',
          component: PublisherView
        },
        {
          path: 'performance',
          name: 'performance',
          component: PerformanceView
        }
      ]
    },
    {
      path: '/new-experience',
      name: 'new-experience',
      component: NewExperience
    },
    {
      path: '/designer',
      name: 'designer',
      component: DesignerView
    },
    {
      path: '/mock-surface',
      name: 'mock-surface',
      component: MockSurfaceView,
      meta: {
        embedded: true
      }
    },
    {
      path: '/cms',
      name: 'cms',
      component: ContentManagementSystemView
    },
    {
      path: '/no-experience',
      name: 'no-experience',
      component: NoExperience
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    }
  ]
})

export default router

<script setup lang="ts">
import AppTabPanel from '@/components/content-management-system/tab-panels/AppTabPanel.vue'
import TemplatesTabPanelVue from '@/components/content-management-system/tab-panels/TemplatesTabPanel.vue'
import MediaTabPanel from '@/components/content-management-system/tab-panels/MediaTabPanel/MediaTabPanel.vue'
import DashboardTabPanel from '@/components/content-management-system/tab-panels/DashboardTabPanel.vue'
import ChartTabPanel from '@/components/content-management-system/tab-panels/ChartTabPanel.vue'
import NewAppModal from '@/components/content-management-system/modal/NewAppModal.vue'
import UploadModal from '../components/content-management-system/modal/UploadModal.vue'
import type { TabItem } from '@/interfaces/tab-item.interface'

import { find } from 'lodash'
import { computed, ref } from 'vue'

const items: TabItem[] = [
  {
    key: 'apps',
    title: 'Apps',
    component: AppTabPanel
  },
  {
    key: 'templates',
    title: 'Templates',
    component: TemplatesTabPanelVue
  },
  {
    key: 'dashboards',
    title: 'Dashboards',
    component: DashboardTabPanel
  },
  {
    key: 'media',
    title: 'Media',
    component: MediaTabPanel
  },
  {
    key: 'charts',
    title: 'Charts',
    component: ChartTabPanel
  }
  // {
  //   key: 'animations',
  //   title: 'Animations',
  //   component: AnimationTabPanel
  // }
]

const tab = ref(items[0].key)
const showAppModal = ref(false)
const showExperienceModal = ref(false)
const showMediaModal = ref(false)
const showSavedTemplateModal = ref(false)

const addContentLabel = computed(() => {
  const findItem = find(items, ['key', tab.value])
  if (findItem) {
    return 'Create New ' + findItem['title']
  }
  return 'Add New Element'
})

function showModal(key: string) {
  switch (key) {
    case 'apps':
      showAppModal.value = !showAppModal.value
      break
    case 'experience':
      showExperienceModal.value = !showExperienceModal.value
      break
    case 'media':
      showMediaModal.value = !showMediaModal.value
      break
    default:
      showSavedTemplateModal.value = !showSavedTemplateModal.value
      break
  }
}
</script>
<template>
  <q-card style="height: calc(100vh - 145px)" flat bordered>
    <div class="row q-pa-md items-center justify-between bg-grey-1">
      <div class="col-auto">
        <q-tabs
          v-model="tab"
          narrow-indicator
          align="left"
          active-color="primary"
          class="bg-grey-1"
        >
          <q-tab
            class="text-subtitle1"
            v-for="item in items"
            :key="item.key"
            :name="item.key"
            :label="item.title"
          />
        </q-tabs>
      </div>
      <div class="col-auto q-pl-xl">
        <q-btn
          v-if="tab == 'media'"
          color="accent"
          disable
          @click="showModal(tab)"
        >
          <q-icon left size="xs" name="fa-solid fa-upload" />
        </q-btn>
        <q-btn v-else color="accent" disable @click="showModal(tab)">
          <q-icon left size="xs" name="fa-solid fa-plus" />
        </q-btn>
      </div>
    </div>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel v-for="item in items" :key="item.key" :name="item.key">
        <template v-if="item.component">
          <component :is="item.component" />
        </template>
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
  <new-app-modal v-model="showAppModal"></new-app-modal>
  <upload-modal v-model="showMediaModal"></upload-modal>
</template>
<style scoped>
i.on-left {
  margin: 0;
}
.items-center {
  padding-block: 0;
  padding-inline-start: 0;
}
</style>

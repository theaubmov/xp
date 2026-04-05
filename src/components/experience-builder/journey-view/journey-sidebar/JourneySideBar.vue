<script setup lang="ts">
import DataSourceTabPanel from '@/components/experience-builder/journey-view/journey-sidebar/data-source-tab-panel/DataSourceTabPanel.vue'
import PagesTabPanel from '@/components/experience-builder/journey-view/journey-sidebar/pages-tab-panel/PagesTabPanel.vue'
import TriggerTabPanel from '@/components/experience-builder/journey-view/journey-sidebar/trigger-tab-panel/TriggerTabPanel.vue'
import type { TabItem } from '@/interfaces/tab-item.interface'
import { ref } from 'vue'

const tab = ref('pages')

const items: TabItem[] = [
  {
    icon: 'fa-regular fa-file',
    key: 'pages',
    title: 'Content',
    component: PagesTabPanel
  },
  {
    icon: 'fa-solid fa-database',
    key: 'data-sources',
    title: 'Data Sources',
    component: DataSourceTabPanel
  },
  {
    icon: 'fa-solid fa-circle-nodes',
    key: 'triggers',
    title: 'Triggers',
    component: TriggerTabPanel
  }
]
</script>
<template>
  <div class="row shadow-1 q-mr-md" style="height: 100%">
    <div class="col-12">
      <q-tabs
        v-model="tab"
        narrow-indicator
        dense
        align="left"
        active-color="primary"
      >
        <q-tab
          class="custom-tab"
          v-for="item in items"
          :key="item.key"
          :name="item.key"
          :icon="item.icon"
          :label="item.title"
        />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel v-for="item in items" :key="item.key" :name="item.key">
          <suspense>
            <template v-if="item.component">
              <component :is="item.component" />
            </template>
          </suspense>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>
<style lang="scss">
.custom-tab {
  .q-tab__label {
    font-size: 12px;
  }
  i {
    font-size: 20px !important;
    margin: 5px auto !important;
  }
}
</style>

<script setup lang="ts">
import { useExperienceStore } from '@/stores/experience'
import {
  isTabItemDisabled,
  getTabItemIcon,
  getRowWithKey
} from './helpers/get-tab-item'
import { ref } from 'vue'
import { forEach } from 'lodash'
const experienceStore = useExperienceStore()
const currentExperienceId = experienceStore.getCurrentExperience.id
// const platformDeviceSupportList =
//   await experienceStore.getPlatformDeviceSupport(currentExperienceId)

// console.log(platformDeviceSupportList)

// const tabKeys = ref(Object.keys(platformDeviceSupportList))
// const tab = ref()
// forEach(platformDeviceSupportList, (item, key) => {
//   if (item.length > 0) {
//     tab.value = key
//     return false
//   }
// })
const columns = [
  {
    name: 'from-resolution',
    field: (row: any) =>
      row.resolutions && row.resolutions[0] ? row.resolutions[0] : 'NaN',
    label: 'From Resolution',
    align: 'left'
  },
  {
    name: 'to-resolution',
    field: (row: any) =>
      row.resolutions && row.resolutions[1] ? row.resolutions[1] : 'NaN',
    label: 'To Resolution',
    align: 'left'
  },
  { name: 'page', field: 'title', label: 'Page', align: 'left' },
  {
    name: 'orientation',
    field: 'orientation',
    label: 'Orientation',
    align: 'left'
  },
  {
    name: 'status',
    field: (row: any) => (row.status ? row.status : 'Inactive'),
    label: 'Status',
    align: 'left'
  }
]
</script>

<template>
  <!-- <q-card class="q-mb-md">
    <q-card-section>
      <div class="row justify-between items-center">
        <div class="col q-my-md q-px-sm justifiy-start">
          <h6 class="q-my-none">Platform And Device Support</h6>
        </div>
      </div>
      <q-tabs v-model="tab" no-caps class="bg-white" active-color="primary">
        <q-tab
          v-for="tab in tabKeys"
          :key="tab + '-tab'"
          :name="tab"
          :icon="getTabItemIcon(tab)"
          :disable="isTabItemDisabled(tab, platformDeviceSupportList)"
        />
      </q-tabs>
      <q-separator />
      <div class="scroll" style="height: 20vh">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel
            v-for="tab in tabKeys"
            :key="tab + '-panels'"
            :name="tab"
          >
            <q-table
              :columns="columns"
              :rows="getRowWithKey(tab, platformDeviceSupportList)"
              row-key="name"
              hide-bottom
              flat
            />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </q-card-section>
  </q-card> -->

  <q-card class="q-mb-md" hidden>
    <q-card-section>
      <div class="row justify-between items-center">
        <div class="col q-my-md q-px-sm justifiy-start">
          <h6 class="q-my-none">Platform And Device Support</h6>
        </div>
      </div>
      <q-tabs v-model="tab" no-caps class="bg-white" active-color="primary">
        <q-tab
          v-for="tab in tabKeys"
          :key="tab + '-tab'"
          :name="tab"
          :icon="getTabItemIcon(tab)"
        />
      </q-tabs>
      <q-separator />
      <div class="scroll" style="height: 20vh">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel
            v-for="tab in tabKeys"
            :key="tab + '-panels'"
            :name="tab"
          >
            <q-table :columns="columns" row-key="name" hide-bottom flat />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </q-card-section>
  </q-card>
</template>

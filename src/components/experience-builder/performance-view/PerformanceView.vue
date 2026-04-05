<script setup lang="ts">
import PerformanceSideBar from './performance-sidebar/PerformanceSideBar.vue'
import SelectDashboards from './select-dashboards/SelectDashboards.vue'
import MockSurface from '@/components/mock/MockSurface.vue'
import { useExperienceStore } from '@/stores/experience'
import { ref } from 'vue'
import { get } from 'lodash'

const isPreview = ref<string>('')
const experienceStore = useExperienceStore()

const onSubmit = (idArray: string[]) => {
  experienceStore.updateExperienceDashboard(
    get(experienceStore, 'getCurrentExperience.id', ''),
    idArray
  )
  isPreview.value = idArray[0]
}
</script>
<template>
  <div
    class="row no-wrap q-mt-md justify-between"
    style="height: calc(100vh - 200px)"
  >
    <div style="min-width: calc(100% - 65px); max-width: calc(100% - 65px)">
      <div v-if="isPreview" class="shadow-1 fit relative-position">
        <mock-surface
          mode="dashboard"
          :identifier="isPreview"
          :title="`Dashboard Preview ${isPreview}`"
          subtitle="Local dashboard preview replacing the deployed analytics surface."
        ></mock-surface>
      </div>
      <select-dashboards v-else @onSubmit="onSubmit"></select-dashboards>
    </div>
    <div style="min-width: 65px; max-width: 65px">
      <performance-side-bar
        @update:preview="(value) => (isPreview = value)"
        :dashboards="
          get(experienceStore, 'getCurrentExperience.performance', [])
        "
        :active="isPreview"
      ></performance-side-bar>
    </div>
  </div>
</template>
<style lang="scss"></style>

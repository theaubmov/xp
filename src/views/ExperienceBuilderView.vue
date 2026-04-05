<script setup lang="ts">
import ExperienceBuilderHeader from '@/components/experience-builder/experience-builder-header/ExperienceBuilderHeader.vue'
import ExperienceDrawer from '@/components/experience/experience-drawer/ExperienceDrawer.vue'
import { useJourneyStore } from '@/stores/journey'
import { useExperienceStore } from '@/stores/experience'
import { usePagesStore } from '@/stores/pages'
import { useDataSourceStore } from '@/stores/data-sources'
import { useTriggerStore } from '@/stores/triggers'
import { useRouter } from 'vue-router'
import { onMounted, onUpdated, ref } from 'vue'

const router = useRouter()
const journeyStore = useJourneyStore()
const experienceStore = useExperienceStore()
const pageStore = usePagesStore()
const dataSourceStore = useDataSourceStore()
const triggerStore = useTriggerStore()

const selectedExperienceId = ref('')

const openExperience = async (id: string) => {
  await experienceStore.getRealExperienceById(id)
  router.push({ path: '/experience-builder/journey', query: { id: id } })
  await pageStore.getPages(0)
  await dataSourceStore.getDataSource(0)
  await triggerStore.getTriggers(0)
}

onMounted(() => {
  if (experienceStore.getCurrentExperience?.id) {
    selectedExperienceId.value = experienceStore.getCurrentExperience?.id
  }
})

onUpdated(() => {
  if (selectedExperienceId.value !== experienceStore.getCurrentExperience?.id) {
    selectedExperienceId.value = experienceStore.getCurrentExperience?.id
  }
})
</script>
<template>
  <div class="row">
    <div v-if="journeyStore.showDrawer" class="col-2 q-mb-md q-mr-md">
      <experience-drawer
        :id="selectedExperienceId"
        drawerContentHeight="calc(100vh - 270px)"
        @on-close="journeyStore.showDrawer = !journeyStore.showDrawer"
        @handle-click-experience="(id) => openExperience(id)"
      ></experience-drawer>
    </div>
    <div class="col">
      <experience-builder-header
        :show-icon="!journeyStore.showDrawer"
      ></experience-builder-header>
      <router-view></router-view>
    </div>
  </div>
</template>

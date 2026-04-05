<script setup lang="ts">
import ExperienceBuilderListActions from '@/components/experience-builder/experience-builder-header/experience-builder-list-actions/ExperienceBuilderListActions.vue'
import ExperienceBuilderMenu from './experience-builder-menu/ExperienceBuilderMenu.vue'
import { useExperienceStore } from '@/stores/experience'
import { useJourneyStore } from '@/stores/journey'

const experienceStore = useExperienceStore()
const journeyStore = useJourneyStore()

const props = defineProps(['show-icon'])
</script>
<template>
  <div class="row shadow-1 q-pa-0 items-center justify-evenly">
    <div class="col-auto q-pl-md" v-if="props.showIcon">
      <q-btn
        flat
        round
        @click="journeyStore.showDrawer = !journeyStore.showDrawer"
      >
        <q-icon
          size="sm"
          :name="
            journeyStore.showDrawer ? 'fa-solid fa-close' : 'fa-solid fa-bars'
          "
        >
        </q-icon>
      </q-btn>
    </div>
    <q-space v-if="props.showIcon"></q-space>
    <div
      v-if="experienceStore.getCurrentExperience.name"
      :class="`col-auto ${props.showIcon ? 'q-pl-xs' : 'q-pl-md'}`"
    >
      <h4 class="title text-uppercase q-my-none">
        {{ experienceStore.getCurrentExperience.name }}
      </h4>
    </div>
    <div class="col-6 q-pl-xs items-center">
      <experience-builder-menu></experience-builder-menu>
    </div>
    <q-space></q-space>
    <div class="col-auto q-px-xl">
      <experience-builder-list-actions></experience-builder-list-actions>
    </div>
  </div>
</template>
<style scoped lang="scss">
.title {
  font-size: 20px;
  font-weight: 600;
  color: $primary;
}
</style>

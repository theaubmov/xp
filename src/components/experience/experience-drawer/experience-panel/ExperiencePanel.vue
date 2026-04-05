<script setup lang="ts">
import Experience from '@/components/experience/experience-drawer/experience-item/ExperienceItem.vue'
import { computed } from 'vue'

import { useExperienceStore } from '@/stores/experience'

const props = defineProps(['id'])

const emit = defineEmits<{
  (e: 'on-click-experience', id: string): void
}>()

const experienceStore = useExperienceStore()

const experiencesSimplified = computed(
  () => experienceStore.getAllExperiencesSimplified
)

const onLoad = async (index: any, done: any) => {
  if (experienceStore.totalPages <= experienceStore.currentExperiencesPage) {
    return done(true)
  }
  await experienceStore.searchRealExperiences(
    '',
    experienceStore.currentExperiencesPage,
    20,
    true
  )
  done()
}
</script>
<template>
  <div class="q-px-md q-pb-md" id="scroll-experience-id">
    <q-infinite-scroll @load="onLoad" scroll-target="#scroll-experience-id">
      <template
        v-for="(item, index) in experiencesSimplified"
        :key="`experience-${index + 1}`"
      >
        <div class="row">
          <experience
            :item="item"
            :active="props.id === item.id"
            @click="() => emit('on-click-experience', item.id)"
          />
        </div>
      </template>
      <template v-slot:loading>
        <div class="text-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>

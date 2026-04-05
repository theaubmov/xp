<script setup lang="ts">
import { computed } from 'vue'
import ExperienceSearchInput from '@/components/input/ExperienceSearchInput.vue'
import { useExperienceStore } from '@/stores/experience'

const props = defineProps(['modelValue'])
const emit = defineEmits(['updateValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('updateValue', value)
  }
})

const experienceStore = useExperienceStore()
</script>
<template>
  <div
    class="row shadow-1 q-px-lg q-py-md items-center justify-evenly sticky z-top bg-white q-mb-md"
  >
    <div class="col-auto q-pl-md">
      <q-btn
        flat
        round
        @click="experienceStore.showDrawer = !experienceStore.showDrawer"
        :disable="experienceStore.onLoadingExperiences"
      >
        <q-icon
          size="sm"
          :name="
            experienceStore.showDrawer
              ? 'fa-solid fa-close'
              : 'fa-solid fa-bars'
          "
        >
        </q-icon>
      </q-btn>
    </div>
    <div class="col-auto q-pl-xl">
      <h4 class="title text-uppercase q-my-none">My Experiences</h4>
    </div>
    <q-space></q-space>
    <div class="col-auto q-pl-xl items-center">
      <!-- <experience-search-input></experience-search-input> -->
      <q-input
        v-model="value"
        color="primary"
        bg-color="grey-2"
        dense
        outlined
        placeholder="Search Experiences"
      >
        <template v-slot:prepend>
          <q-icon
            size="15px"
            class="q-ml-xs"
            name="fa-solid fa-magnifying-glass"
          />
        </template>
      </q-input>
    </div>
    <!-- <div class="col-auto q-pl-sm">
      <experience-drop-down></experience-drop-down>
    </div> -->
    <q-space></q-space>
    <div class="col-auto q-pl-xl">
      <q-btn color="accent" :to="{ name: 'new-experience' }">
        <q-icon left size="xs" name="fa-solid fa-plus" />
      </q-btn>
    </div>
  </div>
</template>
<style scoped lang="scss">
.sticky {
  position: sticky;
  top: 0;
}
.title {
  font-size: 20px;
  font-weight: 600;
  color: #006ead;
}
i.on-left {
  margin: 0;
}
</style>

<script setup lang="ts">
import type { MenuItem } from '@/interfaces/menu-item.interface'
import { useExperienceStore } from '@/stores/experience'
import { onMounted, ref } from 'vue'

const experienceStore = useExperienceStore()
const disabled = ref(false)

const items: MenuItem[] = [
  {
    icon: 'fa-solid fa-bezier-curve',
    title: 'Journey Mapper',
    selected: true,
    to: '/experience-builder/journey'
  },
  {
    icon: 'fa-solid fa-eye',
    title: 'Previewer',
    selected: false,
    to: '/experience-builder/previewer'
  },
  {
    icon: 'fa-solid fa-upload',
    title: 'Publisher',
    selected: false,
    to: '/experience-builder/publisher'
  },
  {
    icon: 'fa-solid fa-gauge-high',
    title: 'Performance',
    selected: false,
    to: '/experience-builder/performance'
  }
]
onMounted(() => {
  disabled.value = !experienceStore.getCurrentExperience.id
})
</script>
<template>
  <div class="row justify-center">
    <router-link
      v-for="item in items"
      :key="item.icon"
      :to="item.to"
      style="text-decoration: none"
    >
      <div class="col-4">
        <div class="column q-px-md q-py-sm nav-link">
          <div class="col self-center">
            <q-avatar size="32px" :icon="item.icon" />
          </div>
          <div class="col self-center">
            <span class="text-center">{{ item.title }}</span>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>
<style lang="scss" scoped>
.nav-link {
  color: black;
  transition: 0.4s;
}
.nav-link:hover {
  background-color: $primary;
  color: white;
}
</style>

<script setup lang="ts">
import MockSurface from '@/components/mock/MockSurface.vue'
import type { MockSurfaceMode } from '@/helpers/mock-surface-url'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const mode = computed<MockSurfaceMode>(() => {
  const value = route.query.mode

  if (value === 'designer' || value === 'dashboard' || value === 'experience') {
    return value
  }

  return 'experience'
})

const identifier = computed(() => {
  return String(
    route.query.pageID ||
      route.query.appId ||
      route.query.dashboardId ||
      route.query.id ||
      'local-mock'
  )
})

const title = computed(() => {
  if (mode.value === 'designer') {
    return `Designer Surface ${identifier.value}`
  }

  if (mode.value === 'dashboard') {
    return `Dashboard Surface ${identifier.value}`
  }

  return `Experience Surface ${identifier.value}`
})
</script>

<template>
  <div class="mock-surface-view">
    <mock-surface
      :mode="mode"
      :identifier="identifier"
      :title="title"
    ></mock-surface>
  </div>
</template>

<style scoped>
.mock-surface-view {
  min-height: 100vh;
}
</style>

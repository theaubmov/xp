<script setup lang="ts">
import MockSurface from '@/components/mock/MockSurface.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const pageId = computed(() => String(route.query.pageID || route.query.id || 'local-page'))
</script>

<template>
  <div style="height: calc(100vh - 145px)">
    <mock-surface
      mode="designer"
      :identifier="pageId"
      :title="`Designer Surface ${pageId}`"
      subtitle="Local mock designer for building and iterating on new experiences."
    ></mock-surface>
  </div>
</template>

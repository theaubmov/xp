<script setup lang="ts">
import { emptyStateArtwork } from '@/helpers/mock-asset'
</script>

<template>
  <div class="row q-pa-md justify-center q-gutter-md">
    <div class="col my-card">
      <q-img :src="emptyStateArtwork" spinner-color="white" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 450px;
  min-height: 450px;
}
</style>

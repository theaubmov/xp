<script setup lang="ts">
const items: string[] = [
  'fa-solid fa-trash',
  'fa-solid fa-download',
  'fa-solid fa-plus',
  'fa-solid fa-info'
]
</script>
<template>
  <div class="row">
    <div class="col" v-for="item in items" :key="item">
      <q-btn flat round size="sm" :icon="item" />
    </div>
  </div>
</template>

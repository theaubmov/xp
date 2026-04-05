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
      <q-btn
        flat
        round
        size="sm"
        :icon="item"
        :disable="item === 'fa-solid fa-trash' || item === 'fa-solid fa-plus'"
      />
    </div>
  </div>
</template>

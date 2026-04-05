<script setup lang="ts">
import { onMounted, ref } from 'vue'

const items: string[] = ['Date', 'Publish', 'Draft']
const currentItem = ref('')

onMounted(() => {
  currentItem.value = items[0]
})
</script>
<template>
  <div class="q-px-sm">
    <q-select
      outlined
      standout
      v-model="currentItem"
      :options="items"
      dense
      hide-dropdown-icon
    >
      <template v-slot:append>
        <q-icon size="xs" name="fa-solid fa-angle-down" />
      </template>
    </q-select>
  </div>
</template>

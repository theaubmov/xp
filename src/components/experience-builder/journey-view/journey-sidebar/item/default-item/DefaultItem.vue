<script setup lang="ts">
import type { QueryItem } from '@/interfaces/tab-item.interface'

defineProps<{ item: QueryItem; type: string }>()
</script>
<template>
  <div class="row q-py-sm q-pr-md" :draggable="true">
    <q-card class="my-card" flat bordered>
      <q-card-section horizontal class="q-pt-xs items-center">
        <q-card-section class="q-pa-xs">
          <div class="row text-grey">
            <q-icon size="sm" name="fa-solid fa-ellipsis-vertical" />
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row justify-between items-center">
            <div class="text-subtitle1 q-mt-sm q-mb-xs">{{ item.title }}</div>
            <div class="text-caption text">{{ item.lastUpdate }}</div>
          </div>

          <div class="text-caption text-grey">
            {{ item.description }}
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>
<style lang="scss" scoped></style>

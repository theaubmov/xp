<script setup lang="ts">
import type { Analytics } from '@/interfaces/data-source.interface'
import { onDragDataSourceStart } from '../../drag-event'

defineProps<{ item: Analytics; type: string }>()
</script>
<template>
  <div
    class="row q-py-sm q-pr-md"
    :draggable="true"
    @dragstart="onDragDataSourceStart($event, item, type)"
  >
    <q-card class="my-card" flat bordered>
      <q-card-section horizontal class="q-pt-xs items-center">
        <q-card-section class="q-pa-xs">
          <div class="row text-grey">
            <q-icon size="sm" name="fa-solid fa-ellipsis-vertical" />
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row justify-between items-center">
            <div class="text-subtitle1 q-mt-sm q-mb-xs">
              {{ item.name }}
            </div>
            <div class="text-caption text">
              <span class="text-weight-medium">Data Source Type: </span>
              {{ item.type.replace('_', ' ') }}
            </div>
          </div>

          <div class="text-caption text-grey">
            {{ item.description ? item.description : 'No Description' }}
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>
<style lang="scss" scoped>
.my-card {
  width: 100%;
}
.my-card:hover,
.my-card:active {
  cursor: grab;
  border-left: 4px solid $accent;
  box-shadow: 0 1px 8px #0003, 0 3px 4px #00000024, 0 3px 3px -2px #0000001f !important;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently */
  .q-icon {
    color: $accent;
  }
}
</style>

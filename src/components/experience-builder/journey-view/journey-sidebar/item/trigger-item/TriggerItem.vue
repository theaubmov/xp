<script setup lang="ts">
import type { TriggerItem } from '@/interfaces/trigger.interface'
import { startCase, camelCase } from 'lodash'
import { computed } from 'vue'
import { onDragTriggerStart } from '../../drag-event'

const props = defineProps<{ item: TriggerItem; type: string }>()

function formatText(name: string) {
  return startCase(camelCase(name))
}
const title = computed(() => {
  return formatText(props.item.name)
})
const description = computed(() => {
  return formatText(props.item.description)
})
</script>
<template>
  <div class="col-6" style="display: flex; justify-content: center">
    <q-card
      class="my-card q-mb-md"
      flat
      bordered
      :draggable="true"
      @dragstart="onDragTriggerStart($event, item, type)"
    >
      <q-card-section horizontal class="q-pt-xs items-center">
        <div
          class="row justify-center items-center text-center"
          style="width: 100%"
        >
          <div class="col-12 q-py-md">
            <q-icon size="md" :name="item.icon" />
          </div>
          <div class="col-12">
            <div
              class="text-subtitle1 q-mt-sm q-mb-xs"
              style="word-wrap: break-word"
            >
              {{ title }}
            </div>
          </div>
          <div class="col-12">
            <div class="text-caption text-grey" style="word-wrap: break-word">
              {{ item.description ? description : 'No Description' }}
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<style lang="scss" scoped>
.my-card {
  width: 90%;
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

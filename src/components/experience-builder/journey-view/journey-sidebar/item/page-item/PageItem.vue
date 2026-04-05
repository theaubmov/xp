<script setup lang="ts">
import useFormatTime from '@/composition/format-time'
import { getThumbnail } from '@/helpers/content-extractor'
import type { Page } from '@/interfaces/page.interface'
import { computed, ref } from 'vue'
import { onDragPageStart } from '../../drag-event'

const props = defineProps<{ id: string; item: Page }>()
const { fromMillisToDAteTimeString } = useFormatTime()

const thumbnail = computed(() => {
  return getThumbnail(props.item.details)
})
</script>
<template>
  <div
    class="row q-py-sm q-pr-md"
    :draggable="true"
    @dragstart="onDragPageStart($event, 'page', id, item)"
  >
    <q-card class="my-card q-py-md" flat bordered>
      <q-card-section horizontal class="q-pt-xs items-center q-pa-xs">
        <div class="col-auto text-grey">
          <q-icon size="sm" name="fa-solid fa-ellipsis-vertical" />
        </div>
        <div class="col-4 q-px-xs">
          <!-- 'http://ingress-gateway.gaiansolutions.com/content-service/v1.0/content/' +
                  item.thumbnail -->
          <q-img
            :src="thumbnail"
            class="q-pa-xs"
            fit="cover"
            spinner-color="white"
            style="border-radius: 5px"
          />
        </div>
        <div class="col-7 q-pl-md">
          <div class="text-subtitle1 q-mt-sm q-mb-xs">
            {{ item.name }}
          </div>
          <div class="text-caption text">
            {{ fromMillisToDAteTimeString(item.updatedTimeMs) }}
          </div>
          <div class="text-caption text-grey">
            {{ 'No Description' }}
          </div>
        </div>
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
.my-card:active {
  cursor: grabbing;
}
.text-subtitle1 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

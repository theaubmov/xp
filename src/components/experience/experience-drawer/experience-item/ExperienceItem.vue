<script setup lang="ts">
import useFormatTime from '@/composition/format-time'

const props = defineProps(['item', 'active'])

const { fromMillisToDAteTimeString } = useFormatTime()
</script>
<template>
  <q-card
    :class="`my-card q-my-sm q-py-md ${props.active ? 'active' : ''}`"
    flat
    bordered
  >
    <q-card-section horizontal class="q-pt-xs items-center q-pa-xs">
      <div class="col-auto text-grey">
        <q-icon size="sm" name="fa-solid fa-ellipsis-vertical" />
      </div>
      <div class="col-4 q-pr-sm">
        <q-img
          :src="props.item.thumbnail"
          class="q-pa-xs"
          fit="cover"
          spinner-color="white"
          style="border-radius: 5px"
        />
      </div>
      <div class="col-7">
        <div class="text-subtitle1 text-ellipsis q-mt-sm q-mb-xs">
          {{ props.item.name }}
        </div>
        <div class="text-caption text">
          {{
            props.item.createdAt &&
            fromMillisToDAteTimeString(props.item.createdAt)
          }}
        </div>
        <div class="text-caption text-desc text-grey">
          {{ props.item.description }}
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<style lang="scss" scoped>
.my-card {
  width: 100%;
}
.my-card:hover,
.my-card.active {
  cursor: pointer;
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
  cursor: pointer;
}
.text-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.text-desc {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>

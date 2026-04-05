<script lang="ts" setup>
import {
  ConnectionMode,
  Position,
  useHandle,
  useVueFlow,
  type HandleProps,
  type HandleType
} from '@braks/vue-flow'
import { computed } from 'vue'
import { find } from 'lodash'

interface customProps extends HandleProps {
  id?: string
  nodeId: string
  title: string
  subTitle?: string
  type?: HandleType
  position?: Position
  connectable?: boolean
}

const props = withDefaults(defineProps<customProps>(), {
  type: 'source',
  position: 'top' as Position,
  connectable: true
})

const { connectionStartHandle, connectionMode, getEdges } = useVueFlow()
const { onMouseDown, onClick } = useHandle()

const handleId = computed(
  () =>
    props.id ??
    (connectionMode.value === ConnectionMode.Strict
      ? null
      : `${props.nodeId}__handle-${props.position}`)
)

const onMouseDownHandler = (event: MouseEvent) => {
  onMouseDown(event, handleId.value, props.nodeId, props.type === 'target')
}
const onClickHandler = (event: MouseEvent) => {
  onClick(event, handleId.value ?? null, props.nodeId, props.type)
}

const connected = computed(() => {
  return find(getEdges.value, {
    source: props.nodeId,
    sourceHandle: handleId.value
  })
    ? '#3880F6'
    : '#AAAAAA'
})

const getClasses = computed(() => {
  return [
    'connectable-cursor',
    `vue-flow__handle-${handleId.value}`,
    'nodrag',
    {
      source: props.type !== 'target',
      target: props.type === 'target',
      connectable: props.connectable,
      connecting:
        connectionStartHandle &&
        connectionStartHandle.value?.nodeId === props.nodeId &&
        connectionStartHandle.value?.handleId === handleId.value &&
        connectionStartHandle.value?.type === props.type
    }
  ]
})
</script>
<template>
  <q-banner class="custom-handle q-ma-xs">
    <div class="row q-pa-none items-center">
      <div class="col">
        <span style="display: flex"> {{ props.title }} </span>
        <span class="subtitle-ellipsis">
          {{ props.subTitle }}
        </span>
      </div>

      <q-space></q-space>
      <q-icon
        size="8px"
        :class="getClasses"
        :data-handleid="handleId"
        :data-nodeid="props.nodeId"
        :data-handlepos="props.position"
        @mousedown="onMouseDownHandler"
        @click="onClickHandler"
        name="fa-solid fa-link"
      >
      </q-icon>
    </div>
  </q-banner>
</template>
<style lang="scss">
.custom-handle {
  position: inherit;
  width: auto;
  height: auto;
  padding: inherit;
  margin: 8px;
  margin-top: 4px;
  .q-icon {
    margin-right: 5px;
    color: v-bind('connected');
  }
}
.page-node .q-banner {
  padding-left: 5px;
  text-align: end !important;
  border-right: 3px solid v-bind('connected');
  background-color: #f9f9fb;
  border-radius: 4px !important;
  min-height: 22px;
  span {
    font-size: 8px;
  }
}
.connectable-cursor {
  cursor: crosshair;
}
.vue-flow__edges {
  overflow: visible !important;
  pointer-events: none;
}
.subtitle-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-align: start;
}
</style>

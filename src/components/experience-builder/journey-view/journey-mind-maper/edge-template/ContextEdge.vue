<script lang="ts" setup>
import { useEngagementHandler } from '@/composition/enagegment-handler'
import { useConfigurationMindMapper } from '@/stores/configuration-mind-mapper'
import { useEngagementStore } from '@/stores/engagement'
import {
  getEdgeCenter,
  getBezierPath,
  Position,
  useVueFlow,
  type EdgeProps,
  type GraphNode
} from '@braks/vue-flow'
import { get } from 'lodash'
import { useQuasar } from 'quasar'
import { computed, ref } from 'vue'

const $q = useQuasar()

interface CustomEdgeProps<T = any> extends EdgeProps<T> {
  id: string
  sourceNode: GraphNode
  targetNode: GraphNode
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  sourcePosition: Position
  targetPosition: Position
  label: string
  data?: T
  markerEnd: string
}

const props = defineProps<CustomEdgeProps>()

const { applyEdgeChanges, addEdges, getEdge, getEdges } = useVueFlow()
const configurationMindMapper = useConfigurationMindMapper()
const engagement = useEngagementStore()
const engagementHandler = useEngagementHandler()

const isHover = ref(false)
const foreignObjectHeight = 90
const foreignObjectWidth = 110

const edgePath = computed(() =>
  getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition
  })
)
const center = computed(() =>
  getEdgeCenter({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    targetX: props.targetX,
    targetY: props.targetY
  })
)
const getClasses = computed(() => {
  return [
    'circle',
    isHover.value ? 'drag-over' : '',
    getEdge.value(props.id)?.data ? 'circle-full' : ''
  ]
})

const onClick = async () => {
  try {
    if (props.data.trigger.triggerType !== 'ONETIME') {
      configurationMindMapper.setCurrentConfiguration(
        props.data.trigger.triggerType,
        props.data,
        props.id
      )
    } else {
      const channel = {
        ...props.sourceNode.data.configuration.channel,
        contents: engagementHandler.getContentItems(props)
      }
      const name =
        get(props, 'targetNode.data.id', 'destination') +
        get(props, 'sourceNode.label', 'source') +
        get(channel, 'channelType', 'channel')

      const dto = {
        name: name,
        trigger: {
          triggerType: props.data.trigger.triggerType
        },
        channel: channel,
        source: props.sourceNode.data.configuration.source,
        destination: props.sourceNode.data.configuration.destination
      }
      const response = await engagement.createEngagement(dto)
      $q.notify({
        type: 'positive',
        message: 'Engagement Creation Status : ' + response.status
      })
    }
  } catch (error) {
    console.log(error)
    $q.notify({
      type: 'negative',
      message: 'Engagement Creation Failed'
    })
  }
}
const onDragEnter = () => {
  isHover.value = true
}
const onDragLeave = () => {
  isHover.value = false
}
const onDropItem = async (event: any, id: string) => {
  configurationMindMapper.reset()
  const type = event.dataTransfer?.getData('type')
  if (type !== 'trigger') return

  const trigger = JSON.parse(event.dataTransfer?.getData('item'))

  const edge = getEdge.value(id)

  if (trigger.type && trigger.name && edge) {
    applyEdgeChanges([{ type: 'remove', id }])
    edge.label = trigger.name
    if (trigger.type === 'cron') {
      edge.data = {
        trigger: {
          triggerType: trigger.type,
          triggerName: trigger.name,
          triggerIcon: trigger.icon,
          cronExpressionrequired: '',
          // OPTIONAL FIELDS
          startTime: '',
          endTime: '',
          timeZone: ''
        },
        origin: trigger
      }
    } else if (
      trigger.type === 'group_definition' ||
      trigger.type === 'context'
    )
      edge.data = {
        trigger: {
          triggerId: trigger.id,
          triggerType: trigger.type,
          triggerName: trigger.name,
          triggerIcon: trigger.icon,
          eventTypes: []
        },
        origin: trigger
      }
    else {
      edge.data = {
        trigger: {
          triggerId: 0,
          triggerType: trigger.type,
          triggerName: trigger.name,
          triggerIcon: trigger.icon
        },
        origin: trigger
      }
    }
    addEdges([edge])
  }

  isHover.value = false
}
</script>
<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
<template>
  <path
    :id="props.id"
    :style="props.style"
    class="vue-flow__edge-path"
    :d="edgePath"
    :marker-end="props.markerEnd"
  />
  <foreignObject
    :width="foreignObjectWidth"
    :height="foreignObjectHeight"
    :x="center[0] - foreignObjectHeight / 2"
    :y="center[1] - foreignObjectHeight / 2"
    @dragenter="onDragEnter()"
    @dragleave="onDragLeave()"
    @dragexit="onDragLeave()"
    @drop="onDropItem($event, props.id)"
    class="edgeContext-foreignobject"
    requiredExtensions="http://www.w3.org/1999/xhtml"
  >
    <div class="context" @click="onClick()">
      <div :class="getClasses">
        <q-icon
          v-if="props.data"
          size="xs"
          :name="props.data.trigger.triggerIcon"
        />
      </div>
      <p class="title">{{ props.label }}</p>
    </div>
  </foreignObject>
</template>
<style lang="scss" scoped>
.vue-flow__edge-context {
  &:hover,
  &.selected {
    .circle {
      border: 3px solid $primary !important;
    }
  }
}
.context {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  .circle {
    margin: auto;
    text-align: center;
    background-color: #e8e8e8;
    width: 3em;
    height: 3em;
    line-height: 3em;
    border-radius: 50%;
    border: 1px solid black;
    border-style: dashed;
    justify-content: center;
  }
  .title {
    margin: 0;
    text-align: center;
    font-size: 10px;
  }
}
.drag-over {
  background-color: #f5f5f5 !important;
  border: 3px solid $primary !important;
  width: 4em !important;
  height: 4em !important;
  line-height: 4em !important;
}
.circle-full {
  background-color: #ffff !important;
  border: 1px solid $primary !important;
  color: $primary !important;
}
.edgeContext-foreignobject {
  display: flex;
}

.q-icon:hover {
  cursor: pointer;
}
</style>

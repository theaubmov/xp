<script lang="ts" setup>
import { DataSourceItemsKey } from '@/interfaces/data-source.interface'
import { useConfigurationMindMapper } from '@/stores/configuration-mind-mapper'
import { useVueFlow, type NodeProps } from '@braks/vue-flow'
import { Handle, Position } from '@braks/vue-flow'
import { computed, ref } from 'vue'

export interface CustomNodeEvents {
  customEvent: (input: string) => void
}
interface CustomNodeProps extends NodeProps<any, CustomNodeEvents> {
  id: string
  label: string
  data: {
    plateform: string
    thumbnail: string
    source: {
      input: Position
      output: Position
    }
    configuration: {
      dataSource: any[]
      source: any
      destination: any
      channel: {
        channelType: string
        mefType: string
        packageName: string
        command: string
        rpcFilename: string
        destinationAttribute: string
        contents: any[]
        communication?: any
      }
    }
  }
  sourcePosition: Position
  events: CustomNodeEvents
}
const nodeProps = defineProps<CustomNodeProps>()
const { applyNodeChanges, addNodes, getNode } = useVueFlow()
const configurationMindMapper = useConfigurationMindMapper()
const isHover = ref(false)

const getClasses = computed(() => {
  return [isHover.value ? 'drag-over' : '']
})

const onDragEnter = () => {
  isHover.value = true
}
const onDragLeave = () => {
  isHover.value = false
}
const onDropItem = async (event: any, id: string) => {
  configurationMindMapper.reset()
  const type = event.dataTransfer?.getData('type')
  if (type !== 'data-source') return

  const datasource = JSON.parse(event.dataTransfer?.getData('item'))

  const node = getNode.value(id)
  if (datasource.type && datasource.name && node) {
    applyNodeChanges([{ type: 'remove', id }])
    const newConfiguration = [...node.data.configuration.dataSource, datasource]
    node.data.configuration.dataSource = newConfiguration
    addNodes([node])
  }
  isHover.value = false
}

const onClickConfig = () => {
  configurationMindMapper.setCurrentConfiguration(
    DataSourceItemsKey.DATASOURCE,
    nodeProps.data
  )
}
const onClickPlateform = () => {
  configurationMindMapper.setCurrentConfiguration(
    DataSourceItemsKey.PLATEFORM,
    nodeProps.data,
    nodeProps.id
  )
}
</script>

<template>
  <div
    @dragenter="onDragEnter()"
    @dragleave="onDragLeave()"
    @dragexit="onDragLeave()"
    @drop="onDropItem($event, nodeProps.id)"
  >
    <q-btn
      class="plateform-config shadow-0"
      @click="onClickConfig"
      round
      flat
      dense
    >
      <q-icon name="fa-solid fa-database" />
      <q-badge color="red" floating transparent>
        {{ nodeProps.data.configuration.dataSource.length }}
      </q-badge>
    </q-btn>
    <q-card
      class="plateform-node shadow-0"
      :class="getClasses"
      @click="onClickPlateform"
    >
      <q-img :src="nodeProps.data.thumbnail" fit="contain" height="40px" />
    </q-card>
    <Handle type="target" :position="nodeProps.data.source.input" />
    <Handle type="source" :position="nodeProps.data.source.output" />
  </div>
</template>
<style lang="scss" scoped>
.vue-flow__node-plateforme-node {
  &:hover,
  &.selected {
    .plateform-node {
      border: 3px solid $primary !important;
    }
  }
}
.plateform-node {
  border-radius: 3px;
  width: 150px;
  height: 40px;
  text-align: center;
  border-width: 1px;
  border-style: solid;
}
.plateform-config {
  position: absolute;
  z-index: 1;
  right: -16px;
  bottom: -20px;
  color: #555;
  background-color: #fff;
  border: 1px solid #555;
  min-height: 2em;
  min-width: 2em;
  // -webkit-transform: translateX(-50%);
  // transform: translateX(-50%);
  i {
    font-size: 12px;
  }
}
.drag-over {
  border: 3px solid $primary !important;
  border-radius: 3px;
  height: 50px;
  width: 160px;
}
</style>

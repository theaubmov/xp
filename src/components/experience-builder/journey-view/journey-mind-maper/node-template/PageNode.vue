<script lang="ts" setup>
import { getEvents, getThumbnail } from '@/helpers/content-extractor'
import type { PageConfiguration } from '@/interfaces/experience.interface'
import {
  PageItemsKey,
  type BaContentPage,
  type Details
} from '@/interfaces/page.interface'
import { useConfigurationMindMapper } from '@/stores/configuration-mind-mapper'
import { useVueFlow, type NodeProps } from '@braks/vue-flow'
import { Handle, Position } from '@braks/vue-flow'
import { find, get, kebabCase } from 'lodash'
import { computed, onMounted, ref } from 'vue'
import CustomHandle from '../handle-template/CustomHandle.vue'
export interface CustomNodeEvents {
  onDropOver: (event: any, id: string) => void
}
interface CustomNodeProps extends NodeProps<any, CustomNodeEvents> {
  id: string
  label: string
  data: {
    id?: string
    accessible: boolean
    owner?: string
    details?: Details
    configuration: PageConfiguration[]
    customEvent: any[]
    dependencies?: any
  }
  sourcePosition: Position
  events: CustomNodeEvents
}
const nodeProps = defineProps<CustomNodeProps>()
const { getNode, getEdges } = useVueFlow()
const configurationMindMapper = useConfigurationMindMapper()

const onDropItem = (event: any, id: string) => {
  const type = event.dataTransfer?.getData('application/vueflow')
  const node = getNode.value(id)
  if (!node) return
  if (type == 'data-sources') {
    node.data.isQuerySelected = true
  }
}
function getConfigId(value: string) {
  return kebabCase(value)
}
const connected = computed(() => {
  return find(getEdges.value, {
    target: nodeProps.id
  })
    ? '#3880F6'
    : '#AAAAAA'
})
const tab = ref('default')

const isBA = computed(() => {
  return get(nodeProps, 'data.details.contentType') === 'BA'
})

const thumbnail = computed(() => {
  return getThumbnail(nodeProps.data.details)
})

const events = computed(() => {
  return getEvents(nodeProps.data.details)
})
const CustomEvents = computed(() => {
  return nodeProps.data.customEvent
})
const onClickConfig = () => {
  configurationMindMapper.setCurrentConfiguration(
    PageItemsKey.PAGE,
    nodeProps.data,
    nodeProps.id
  )
}
</script>

<template>
  <div class="shadow-0" @drop="onDropItem($event, nodeProps.id)">
    <q-card class="page-node">
      <q-btn
        v-if="isBA"
        class="absolute configuration-button"
        @click="onClickConfig"
        icon="fa-solid fa-pen"
        size="xs"
        round
      >
      </q-btn>
      <div class="row q-px-sm q-pt-sm title">
        <span>{{ label }}</span>
      </div>
      <div class="row q-px-sm q-py-xs">
        <div class="col-auto sub-page-title" @click="tab = 'default'">
          <q-icon name="fa-solid fa-circle is-connected" size="5px" />
          <span class="is-connected">
            {{ connected !== '#AAAAAA' ? 'Connected' : 'Not Connected' }}
          </span>
        </div>
        <q-separator vertical class="q-mx-sm" />
        <div class="col-auto sub-page-title" @click="tab = 'data-sources'">
          <q-icon name="fa-solid fa-database" size="8px"></q-icon>
          <span>{{ 'Data Sources' }}</span>
        </div>
      </div>
      <div
        v-if="tab === 'default'"
        class="q-mx-sm q-mb-sm"
        style="border-radius: 4px; border: 1px solid"
      >
        <q-img :src="thumbnail" :ratio="16 / 9" fit="contain" />
      </div>

      <Handle type="target" :position="Position.Left"> </Handle>
      <template v-if="nodeProps.data.configuration.length > 0">
        <div class="row q-px-sm config-title">
          <span>Events</span>
        </div>
        <custom-handle
          v-for="(item, key) in nodeProps.data.configuration"
          :key="key"
          :position="Position.Bottom"
          :nodeId="nodeProps.id"
          :id="getConfigId(item.title)"
          :title="item.title"
          type="source"
        />
      </template>
      <template v-if="events.length">
        <div class="row q-px-sm q-py-sm config-title">
          <span>Events</span>
        </div>
        <template v-for="event in events" :key="event.id">
          <custom-handle
            :position="Position.Bottom"
            :nodeId="nodeProps.id"
            :id="getConfigId(event.id)"
            :title="'Type: ' + event.type"
            :subTitle="'Id: ' + event.id"
            type="source"
          />
        </template>
      </template>
      <template v-if="CustomEvents.length">
        <div class="row q-px-sm q-py-sm config-title">
          <span>Custom Events</span>
        </div>
        <template v-for="event in CustomEvents" :key="event.id">
          <custom-handle
            :position="Position.Bottom"
            :nodeId="nodeProps.id"
            :id="getConfigId(event.id)"
            :title="'Type: ' + event.type"
            :subTitle="'Id: ' + event.id"
            type="source"
          />
        </template>
      </template>
    </q-card>
  </div>
</template>
<style lang="scss">
.vue-flow__node-page-node {
  &:hover,
  &.selected {
    .page-node {
      border: 3px solid $primary !important;
    }
  }
}
.page-node {
  border-radius: 3px;
  width: 220px;
  max-height: 170px;
  text-align: center;
  border-width: 1px;
  border-style: solid;
  .vue-flow__edges {
    z-index: 1000 !important;
  }
  .vue-flow__handle {
    width: 10px;
    height: 10px;
    background: $accent;
    border: none;
    border-radius: 100% !important;
  }
  .vue-flow__handle-left {
    left: -5px !important;
  }
  .title span {
    text-align: left;
    font-size: 12px;
    font-weight: bold;
  }
  .config-title span {
    font-size: 10px;
    font-weight: 600;
  }
  .sub-page-title {
    font-size: 8px;
    color: #aaa;
    cursor: pointer;
    span {
      padding-left: 4px;
      font-size: 8px;
      font-weight: 200;
    }
    .is-connected {
      color: v-bind('connected');
    }
  }
  .configuration-button {
    top: -12px;
    right: -10px;
    color: #555;
    background-color: #fff;
    border: 1px solid #555;
    i {
      font-size: 12px;
    }
  }
}
.active {
  color: #0077d0;
}
.unactive {
  color: #aaa;
}
.shadow-0 .q-card {
  box-shadow: none;
}
</style>

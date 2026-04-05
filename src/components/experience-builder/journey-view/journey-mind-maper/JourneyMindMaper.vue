<script lang="ts" setup>
import {
  Background,
  Controls,
  VueFlow,
  Position,
  useVueFlow,
  type XYPosition,
  type Element
} from '@braks/vue-flow'
import StartNode from './node-template/StartNode.vue'
import { useExperienceStore } from '@/stores/experience'
import { usePagesStore } from '@/stores/pages'
import { useConfigurationMindMapper } from '@/stores/configuration-mind-mapper'
import PlateformeNode from './node-template/PlateformeNode.vue'
import type { plateformItem } from './supported-plateforme'
import CustomConnectionLine from './connection-template/CustomConnectionLine.vue'
import ContextEdge from '@/components/experience-builder/journey-view/journey-mind-maper/edge-template/ContextEdge.vue'
import PageNode from './node-template/PageNode.vue'
import type { Page } from '@/interfaces/page.interface'
import { countBy, debounce, find, forEach, get, method, some } from 'lodash'
import { computed, onMounted, reactive, ref, watchEffect } from 'vue'
import { configurationMindMapperTemplate } from '@/interfaces/configuration-mind-mapper'
import { useRoute } from 'vue-router'

const {
  onConnect,
  onPaneReady,
  getElements,
  addEdges,
  addNodes,
  project,
  applyNodeChanges,
  applyEdgeChanges,
  onNodesChange,
  onEdgesChange
} = useVueFlow()
const experienceStore = useExperienceStore()
const pageStore = usePagesStore()
const configurationMindMapper = useConfigurationMindMapper()
const route = useRoute()

let id = 1
let angle = 0
let r = 250

const getId = () => `node_${id++}`

const previousExperienceId = ref<any>('')
const isLoading = ref(false)
const instance = ref<any>(null)
const elements = ref<Element[]>([])

function fetchElementsExperience(): any[] {
  const listElement: any[] = []
  forEach(experienceStore.currentExperienceItems, (element) => {
    if (element.type == 'start-node') {
      listElement.push({
        ...element,
        events: {
          addPlateformEvent: (plateform: plateformItem) => {
            addPlateformeNode(plateform)
          }
        }
      })
    } else if (element.type == 'plateforme-node') {
      listElement.push({
        ...element,
        events: {
          customEvent: () => {
            console.log('ici')
          }
        }
      })
    } else if (element.type == 'page-node') {
      listElement.push({ ...element, events: {} })
    } else {
      listElement.push(element)
    }
  })
  return listElement
}

async function updateElementsExperience() {
  isLoading.value = true
  const id = experienceStore.currentExperience.id
  elements.value = getElements.value
  await experienceStore.updateExperienceElemenet(
    experienceStore.currentExperience,
    elements.value
  )
  isLoading.value = false
}

function addPlateformeNode(plateform: plateformItem) {
  const sourceHandle = calculateSourcePosition()
  const position = calculateCoordination()
  const current_id = getId()

  const newPlateformeNode = reactive({
    id: current_id,
    type: 'plateforme-node',
    position,
    label: plateform.title + current_id,
    data: {
      thumbnail: plateform.thumbnail,
      plateform: plateform.title,
      source: {
        input: sourceHandle.nodeChildInput as Position,
        output: sourceHandle.nodeChildOutput as Position
      },
      configuration: plateform.configuration
    },
    events: {
      customEvent: () => {
        console.log('ici')
      }
    }
  })

  const newEdgePlateformeNode = reactive({
    id: 'e-start-node-' + current_id,
    source: 'start-node',
    target: current_id,
    sourceHandle: sourceHandle.nodeParent,
    style: { stroke: plateform.color },
    labelBgStyle: { fill: plateform.color },
    animated: true
  })

  addNodes([newPlateformeNode])
  addEdges([newEdgePlateformeNode])

  // change the ongle after adding plateforme node
  angle += (40 * Math.PI) / 180
}

function addPageNode(position: XYPosition, page: Page) {
  const current_id = getId()

  const newPageNode = reactive({
    id: 'page_' + current_id,
    type: 'page-node',
    position,
    label: page.name,
    data: {
      id: page.id,
      owner: page.owner,
      details: page.details,
      configuration: [],
      customEvent: page.customEvents || [],
      accessible: page.accessible,
      dependencies: page.dependencies
    },
    events: {}
  })

  addNodes([newPageNode])
}

function calculateCoordination() {
  const Cx = r * Math.cos(angle)
  const Cy = r * Math.sin(angle)

  return {
    x: Cx,
    y: Cy
  }
}

function calculateSourcePosition() {
  if (angle / (Math.PI * 2) == 1) r += 180
  const rotation = angle / (Math.PI * 2)

  if (rotation >= 0 && rotation < 1 / 4)
    return {
      nodeParent: 'right',
      nodeChildInput: 'left',
      nodeChildOutput: 'right'
    }
  if (rotation >= 1 / 4 && rotation < 1 / 2)
    return {
      nodeParent: 'bottom',
      nodeChildInput: 'top',
      nodeChildOutput: 'bottom'
    }
  if (rotation >= 1 / 2 && rotation < 3 / 4)
    return {
      nodeParent: 'left',
      nodeChildInput: 'right',
      nodeChildOutput: 'left'
    }
  else
    return {
      nodeParent: 'top',
      nodeChildInput: 'bottom',
      nodeChildOutput: 'top'
    }
}

const onDragOver = (event: any) => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

const onDropPage = (event: any) => {
  const type = event.dataTransfer?.getData('application/vueflow')
  const id = event.dataTransfer?.getData('page-id')

  const position = project({ x: event.clientX - 80, y: event.clientY - 60 })
  const page = find(pageStore.pages, ['id', id])

  if (type === 'page' && page) addPageNode(position, page)
}

const onChange = debounce(() => {
  updateElementsExperience()
}, 200)

const configurationComponent: any = computed(() => {
  return configurationMindMapperTemplate[
    configurationMindMapper.currentConfiguration.component
  ]
})
const configurationComponentClass = computed(() => {
  const component = get(
    configurationMindMapper,
    'currentConfiguration.component',
    ''
  )
  return [
    'item-configuation',
    component === 'plateform' || component === 'page'
      ? 'item-configuation-width40'
      : 'item-configuation-width25',
    'shadow-2'
  ]
})

onConnect((params) => {
  const edge = reactive({
    id:
      'vueflow__edge-' +
      params.source +
      params.sourceHandle +
      '-' +
      params.target +
      params.targetHandle,
    source: params.source,
    type: some(params.target, method('match', /page/i)) ? 'default' : 'context',
    target: params.target,
    sourceHandle: params.sourceHandle,
    updtable: true,
    label: 'No Trigger'
  })
  addEdges([edge])
})

onPaneReady((vueFlowInstance) => {
  instance.value = vueFlowInstance
  vueFlowInstance.fitView()
})

onMounted(() => {
  if (experienceStore.currentExperienceItems.length === 0) {
    elements.value = [
      {
        id: 'start-node',
        type: 'start-node',
        label: experienceStore.currentExperience.name,
        sourcePosition: Position.Right,
        position: { x: 0, y: 0 },
        connectable: false,
        events: {
          addPlateformEvent: (plateform: plateformItem) => {
            addPlateformeNode(plateform)
          }
        }
      }
    ]
  } else {
    elements.value = fetchElementsExperience()
    const countObject = countBy(elements.value, ['type', 'plateforme-node'])
    if (countObject.true) {
      id += countObject.true
      angle += ((40 * Math.PI) / 180) * countObject.true
    }
  }
})

onNodesChange((changes) => {
  const nextChanges = changes.filter((change: any) => {
    if (change.id === 'start-node' && change.type === 'remove') {
      return false
    } else {
      return true
    }
  })
  applyNodeChanges(nextChanges)
})

onEdgesChange((changes) => {
  applyEdgeChanges(changes)
})

watchEffect(() => {
  const expId = route.query?.id
  if (expId && expId !== previousExperienceId.value) {
    previousExperienceId.value = expId
    elements.value = fetchElementsExperience()
    const countObject = countBy(elements.value, ['type', 'plateforme-node'])
    if (countObject.true) {
      id += countObject.true
      angle += ((40 * Math.PI) / 180) * countObject.true
    }
    if (get(instance, 'value.fitView', '')) {
      instance.value.fitView()
    }
  }
})
</script>

<template>
  <div class="shadow-1" style="height: 100%; width: 100%" @drop="onDropPage">
    <VueFlow
      v-model="elements"
      :default-zoom="0.3"
      :min-zoom="0.1"
      :max-zoom="4"
      :fit-view-on-init="true"
      :elevate-edges-on-select="true"
      :apply-default="false"
      @dragover="onDragOver"
      @nodes-change="onChange"
      @edges-change="onChange"
    >
      <template #edge-context="props">
        <ContextEdge v-bind="props" />
      </template>

      <template #connection-line="props">
        <CustomConnectionLine v-bind="props" />
      </template>

      <template #node-start-node="props">
        <start-node v-bind="props" />
      </template>

      <template #node-plateforme-node="props">
        <plateforme-node v-bind="props" />
      </template>

      <template #node-page-node="props">
        <page-node v-bind="props" />
      </template>

      <Background pattern-color="#aaa" :gap="8" />

      <Controls />

      <div class="saving-badge">
        <q-badge text-color="black">
          <q-icon name="fa-solid fa-cloud" size="14px" />
          <span class="q-pl-sm">{{ isLoading ? 'saving' : 'saved' }}</span>
        </q-badge>
      </div>

      <div
        v-if="configurationMindMapper.currentConfiguration.id"
        :class="configurationComponentClass"
      >
        <component :is="configurationComponent" />
      </div>
    </VueFlow>
  </div>
</template>
<style lang="scss">
.saving-badge {
  z-index: 4 !important;
  position: absolute;
  top: 5px;
  left: 10px;
  .q-badge {
    background-color: #e8e8e8;
    color: #515151 !important;
  }
}
.item-configuation {
  z-index: 4 !important;
  position: absolute;
  overflow-y: auto;
  overflow-x: hidden;
  top: 50%;
  right: 10px;
  height: auto;
  min-height: 40%;
  max-height: 90%;
  border-radius: 5px;
  border: 1px solid #eee;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.08);
  transform: translate(-5px, -50%);
  background-color: #fff;
}
.item-configuation-width25 {
  width: 25%;
}
.item-configuation-width40 {
  width: 40%;
}
</style>

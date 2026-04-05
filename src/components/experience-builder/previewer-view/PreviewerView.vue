<script setup lang="ts">
import {
  Background,
  useVueFlow,
  VueFlow,
  Controls,
  type Element
} from '@braks/vue-flow'
import nextzen from '@/assets/svg/nextzen_select.svg'
import StartNode from '@/components/experience-builder/journey-view/journey-mind-maper/node-template/StartNode.vue'
import PlateformeNode from '@/components/experience-builder/journey-view/journey-mind-maper/node-template/PlateformeNode.vue'
import PageNode from '@/components/experience-builder/journey-view/journey-mind-maper/node-template/PageNode.vue'
import MockSurface from '@/components/mock/MockSurface.vue'
import { useExperienceStore } from '@/stores/experience'
import { forEach } from 'lodash'
import { onMounted, ref } from 'vue'

const splitterModel = ref(35)
const elements = ref<Element[]>([])
const selectedPreviewId = ref('')
const selectedPreviewTitle = ref('Select a page to preview')

const previewAction = [
  {
    icon: 'fa-solid fa-backward'
  },
  {
    icon: 'fa-solid fa-play'
  },
  {
    icon: 'fa-solid fa-pause'
  },
  {
    icon: 'fa-solid fa-forward'
  },
  {
    icon: 'fa-solid fa-volume-down'
  },
  {
    icon: 'fa-solid fa-volume-off'
  },
  {
    icon: 'fa-solid fa-volume-up'
  },
  {
    icon: 'fa-solid fa-refresh'
  }
]

const experienceStore = useExperienceStore()

function fetchElementsExperience(): any[] {
  const listElement: any[] = []
  forEach([...experienceStore.currentExperienceItems], (element) => {
    listElement.push({ ...element })
  })
  return listElement
}

onMounted(() => {
  elements.value = fetchElementsExperience()
})

const { onEdgesChange, onNodesChange, onNodeClick } = useVueFlow()
onEdgesChange((changes) => {
  const removalChanges = changes.filter((change) => change.type === 'remove')
  if (removalChanges) return
})
onNodesChange((changes) => {
  const removalChanges = changes.filter((change) => change.type === 'remove')
  if (removalChanges) return
})
onNodeClick((event) => {
  if (event.node.type === 'page-node') {
    selectedPreviewId.value = event.node.data.id
    selectedPreviewTitle.value = String(
      event.node.label || 'Experience Preview'
    )
  }
})
</script>
<template>
  <q-card class="q-my-md" style="height: 73vh">
    <div class="row q-pa-md justify-end">
      <q-btn flat size="sm">
        <img :src="nextzen" width="50" />
      </q-btn>
      <div
        class="col-auto"
        v-for="item in experienceStore.getCurrentExperience
          .listConfigurationItem"
        :key="item.icon"
      >
        <q-btn
          flat
          round
          size="sm"
          :icon="item.icon"
          :disable="!item.isActive"
        />
      </div>
      <q-separator class="q-mx-sm" vertical />
      <div
        class="col-auto"
        v-for="item in experienceStore.getCurrentExperience.listActionItem"
        :key="item.icon"
      >
        <q-btn
          flat
          round
          size="sm"
          :icon="item.icon"
          :disable="!item.url"
          :href="item.url"
        />
      </div>
    </div>
    <q-splitter
      v-model="splitterModel"
      :limits="[0, Infinity]"
      vertical
      style="height: 90%"
    >
      <template v-slot:after>
        <div class="row q-px-xl full-height">
          <mock-surface
            mode="experience"
            :identifier="selectedPreviewId || experienceStore.getCurrentExperience.id"
            :title="selectedPreviewTitle"
            subtitle="Local preview surface replacing the remote runtime player."
          ></mock-surface>
        </div>
      </template>

      <template v-slot:separator>
        <q-avatar
          color="primary"
          text-color="white"
          size="30px"
          icon="fa-solid fa-grip-lines-vertical"
        />
      </template>

      <template v-slot:before>
        <VueFlow
          v-model="elements"
          :default-zoom="1.0"
          :min-zoom="0.1"
          :elevate-edges-on-select="true"
          :fit-view-on-init="true"
          :apply-default="false"
        >
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
          <Controls :show-zoom="false" :show-interactive="false" />
        </VueFlow>
      </template>
    </q-splitter>
    <div class="row q-pa-md justify-center">
      <div
        class="col-auto previewer-action"
        v-for="item in previewAction"
        :key="item.icon"
      >
        <q-btn flat round size="sm" :icon="item.icon" />
      </div>
    </div>
  </q-card>
</template>
<style lang="scss">
.previewer-action {
  background-color: #f8f9fa;
  padding: 2px;
  .q-btn:hover {
    color: $primary;
  }
}
</style>

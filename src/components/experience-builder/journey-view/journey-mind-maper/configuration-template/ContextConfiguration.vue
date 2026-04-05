<script lang="ts" setup>
import { useConfigurationMindMapper } from '@/stores/configuration-mind-mapper'
import { useVueFlow } from '@braks/vue-flow'
import { onMounted, ref } from 'vue'

const configurationMindMapper = useConfigurationMindMapper()
const { applyEdgeChanges, addEdges, getEdge } = useVueFlow()
const group = ref([])

const options = [
  {
    label: 'TRUE',
    value: 'TRUE'
  },
  {
    label: 'FALSE',
    value: 'FALSE'
  }
]
const save = () => {
  const edgeId = configurationMindMapper.currentConfiguration.edgeId
  if (!edgeId) return
  const edge = getEdge.value(edgeId)
  applyEdgeChanges([{ type: 'remove', id: edgeId }])

  if (!edge) return
  const trigger = { ...edge.data.trigger, eventTypes: group.value }
  const data = { origin: edge.data.origin, trigger }
  edge.data = data
  addEdges([edge])
  configurationMindMapper.reset()
}
onMounted(() => {
  group.value =
    configurationMindMapper.currentConfiguration.item.trigger.eventTypes
})
</script>
<template>
  <div
    class="row justify-between items-center q-py-md q-px-md"
    style="width: 100%"
  >
    <div class="col-8 text-start text-weight-bold">
      {{ configurationMindMapper.currentConfiguration.title }}
    </div>
    <q-space></q-space>
    <div class="col-auto">
      <q-btn
        @click="configurationMindMapper.reset()"
        class="q-px-none"
        flat
        round
      >
        <q-icon class="cursor-pointer" name="fa-solid fa-close" size="xs" />
      </q-btn>
    </div>
  </div>
  <div class="q-px-md">
    <q-option-group
      v-model="group"
      type="checkbox"
      :options="options"
      color="primary"
    />
  </div>
  <div class="row q-pa-md justify-end">
    <q-btn color="accent" label="save" @click="save" />
  </div>
</template>

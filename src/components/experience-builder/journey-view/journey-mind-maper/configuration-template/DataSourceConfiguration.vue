<script lang="ts" setup>
import { useConfigurationMindMapper } from '@/stores/configuration-mind-mapper'
import { useVueFlow } from '@braks/vue-flow'
import { computed } from 'vue'

const configurationMindMapper = useConfigurationMindMapper()
const { applyEdgeChanges, addEdges, getNode } = useVueFlow()

const save = () => {
  // const edgeId = configurationMindMapper.currentConfiguration.edgeId
  // if (!edgeId) return
  // const edge = getEdge.value(edgeId)
  // applyEdgeChanges([{ type: 'remove', id: edgeId }])
  // if (!edge) return
  // const trigger = { ...edge.data.trigger, eventTypes: [group.value] }
  // const data = { origin: edge.data.origin, trigger }
  // edge.data = data
  // addEdges([edge])
  // configurationMindMapper.reset()
}
const dataSource = computed(() => {
  return configurationMindMapper.currentConfiguration.item.configuration
    .dataSource
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
  <div class="row q-pa-md justify-start" v-if="dataSource.length">
    <div
      v-for="item in dataSource"
      :key="item.id"
      class="data-source-text q-pa-sm"
    >
      {{ item.name }}
    </div>
  </div>
  <div class="row q-pa-md justify-start" v-else>
    <p>No Data Source</p>
  </div>
</template>
<style lang="scss" scoped>
.data-source-text {
  padding: 8px 8px;
  background-color: #f8f8f8;
  width: 100%;
  margin: 5px 0;
  border-radius: 5px;
}
</style>

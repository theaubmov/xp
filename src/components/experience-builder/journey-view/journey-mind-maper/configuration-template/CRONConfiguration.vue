<script lang="ts" setup>
import useRules from '@/composition/rules'
import { useConfigurationMindMapper } from '@/stores/configuration-mind-mapper'
import { useVueFlow } from '@braks/vue-flow'
import { computed, onMounted, ref } from 'vue'

const configurationMindMapper = useConfigurationMindMapper()
const { applyEdgeChanges, addEdges, getEdge } = useVueFlow()
const { requiredField } = useRules()

const cronExpression = ref('')
const startTime = ref('')
const endTime = ref('')
const timeZone = ref('')

const save = () => {
  const edgeId = configurationMindMapper.currentConfiguration.edgeId
  if (!edgeId) return
  const edge = getEdge.value(edgeId)
  applyEdgeChanges([{ type: 'remove', id: edgeId }])

  if (!edge) return
  const trigger = {
    ...edge.data.trigger,
    cronExpression: cronExpression.value,
    startTime: startTime.value,
    endTime: endTime.value,
    timeZone: timeZone.value
  }
  const data = { origin: edge.data.origin, trigger }
  edge.data = data
  addEdges([edge])
  configurationMindMapper.reset()
}
onMounted(() => {
  cronExpression.value =
    configurationMindMapper.currentConfiguration.item.trigger.cronExpression
  startTime.value =
    configurationMindMapper.currentConfiguration.item.trigger.startTime
  endTime.value =
    configurationMindMapper.currentConfiguration.item.trigger.endTime
  timeZone.value =
    configurationMindMapper.currentConfiguration.item.trigger.timeZone
})

const isDisabled = computed(() => {
  return !cronExpression.value
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
    <q-input
      v-model="cronExpression"
      label="* CRON Expression"
      :class="!isDisabled ? 'without-hint q-py-sm' : ''"
      :rules="[requiredField()]"
      outlined
      dense
    />
    <q-input
      v-model="startTime"
      label="Start Time"
      class="q-py-sm"
      outlined
      dense
    />
    <q-input
      v-model="endTime"
      label="End Time"
      class="q-py-sm"
      outlined
      dense
    />
    <q-input
      v-model="timeZone"
      label="Time Zone"
      class="q-py-sm"
      outlined
      dense
    />
  </div>
  <div class="row q-pa-md justify-end">
    <q-btn color="accent" label="save" @click="save" :disable="isDisabled" />
  </div>
</template>
<style lang="scss" scoped>
.without-hint {
  .q-field__bottom {
    display: none;
  }
  .q-field {
    padding-bottom: 0px;
  }
}
</style>

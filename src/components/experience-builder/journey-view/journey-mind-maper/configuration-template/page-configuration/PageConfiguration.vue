<script lang="ts" setup>
import { useConfigurationMindMapper } from '@/stores/configuration-mind-mapper'
import { useVueFlow } from '@braks/vue-flow'
import { findIndex, get, pullAt } from 'lodash'
import { computed, onMounted, ref } from 'vue'
import AddCustomEvent from './AddCustomEvent.vue'

const configurationMindMapper = useConfigurationMindMapper()
const { applyNodeChanges, addNodes, getNode } = useVueFlow()
const selectedAddItem = ref<'datasource-item' | 'event-item' | ''>('')
const selectedUpdateCustomEvent = ref(null as any)
const tab = ref('custom-event')

const customEvents = computed(() => {
  return get(
    configurationMindMapper,
    'currentConfiguration.item.customEvent',
    []
  )
})

const editCustomEvent = (event: any) => {
  selectedUpdateCustomEvent.value = event
  selectedAddItem.value = 'event-item'
}

const saveCustomEvent = (event: any) => {
  const nodeId = configurationMindMapper.currentConfiguration.nodeId
  if (!nodeId) return

  const node = getNode.value(nodeId)
  if (!node) return

  applyNodeChanges([{ type: 'remove', id: nodeId }])
  node.data.customEvent.push(event)
  addNodes([node])
  goBack()
}

const deleteCustomEvent = (id: number) => {
  const nodeId = configurationMindMapper.currentConfiguration.nodeId
  if (!nodeId) return
  const node = getNode.value(nodeId)

  if (!node) return
  applyNodeChanges([{ type: 'remove', id: nodeId }])
  pullAt(node.data.customEvent, id)
  addNodes([node])
}

const updateCustomEvent = (event: any) => {
  const nodeId = configurationMindMapper.currentConfiguration.nodeId
  if (!nodeId) return
  const node = getNode.value(nodeId)

  if (!node) return
  applyNodeChanges([{ type: 'remove', id: nodeId }])
  const eventIndex = findIndex(node.data.customEvent, {
    id: event.id
  })
  node.data.customEvent.splice(eventIndex, 1, { ...event })
  addNodes([node])
  goBack()
}

const goBack = () => {
  selectedAddItem.value = ''
  selectedUpdateCustomEvent.value = null
}

onMounted(() => {
  console.log('mounted')
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
    <div class="q-px-md" v-if="!selectedAddItem">
      <q-tabs class="configuration-tabs" v-model="tab">
        <q-tab name="datasource" disable>
          <template v-slot:default> Data Source </template>
        </q-tab>
        <q-tab name="custom-event">
          <template v-slot:default> Custom Event </template>
        </q-tab>
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="datasource">ppp</q-tab-panel>
        <q-tab-panel name="custom-event">
          <q-banner
            v-for="(customEvent, index) in customEvents"
            :key="index"
            class="text-black q-my-sm"
            style="background-color: #f8f8f8"
            inline-actions
            rounded
            dense
          >
            <span style="display: flex"> Type : {{ customEvent.type }}</span>
            <span style="display: flex"> Name : {{ customEvent.name }}</span>

            <template v-slot:action>
              <q-btn flat rounded @click="editCustomEvent(customEvent)">
                <q-icon
                  class="cursor-pointer"
                  name="fa-solid fa-pen-to-square"
                  size="xs"
                />
              </q-btn>
              <q-btn flat rounded @click="deleteCustomEvent(index)">
                <q-icon
                  class="cursor-pointer"
                  name="fa-solid fa-trash"
                  size="xs"
                />
              </q-btn>
            </template>
          </q-banner>
          <div class="row q-pa-none justify-end">
            <q-btn
              color="accent"
              label="Create New Event"
              @click="selectedAddItem = 'event-item'"
            />
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <div class="q-px-md" v-if="selectedAddItem !== ''">
      <q-btn @click="goBack" class="q-px-none go-back" flat>
        <q-icon
          class="cursor-pointer"
          name="fa-solid fa-arrow-left"
          size="xs"
        />
        <span class="q-pl-sm">Go Back</span>
      </q-btn>
      <add-custom-event
        v-if="selectedAddItem === 'event-item'"
        :event="selectedUpdateCustomEvent"
        @save-custom-event="saveCustomEvent"
        @update-custom-event="updateCustomEvent"
      />
    </div>
  </div>
  <!-- <div class="row q-pa-md justify-end">
    <q-btn color="accent" label="save" @click="save" />
  </div> -->
</template>

<script setup lang="ts">
import TriggerItem from '@/components/experience-builder/journey-view/journey-sidebar/item/trigger-item/TriggerItem.vue'
import { TriggerItemsKey } from '@/interfaces/trigger.interface'
import { useTriggerStore } from '@/stores/triggers'
import { ref } from 'vue'
const manualTriggerList: any[] = [
  {
    type: TriggerItemsKey.ONE_TIME,
    icon: 'fa-solid fa-play',
    name: 'One Time (Manually)',
    description: ''
  },
  {
    type: TriggerItemsKey.CRON,
    icon: 'fa-regular fa-clock',
    name: 'CRON',
    description: ''
  }
]
const search = ref('')
const isLoading = ref(false)
const currentPage = ref(1)
const triggerStore = useTriggerStore()

async function searchTriggers() {
  if (search.value) {
    isLoading.value = true
    triggerStore.searchTriggers(search.value).then(() => {
      isLoading.value = false
    })
  }
}

const onLoad = (index: any, done: any) => {
  currentPage.value = index - 1
  triggerStore.getTriggers(currentPage.value).then(() => {
    done()
  })
}
</script>
<template>
  <div class="row q-py-sm justify-between">
    <template v-for="item in manualTriggerList" :key="item">
      <trigger-item :item="item" type="trigger"></trigger-item>
    </template>
  </div>
  <q-separator class="q-mb-md" />

  <q-input
    v-model="search"
    class="q-pb-md"
    color="primary"
    bg-color="grey-2"
    dense
    outlined
    placeholder="Search"
    @update:model-value="searchTriggers"
  >
    <template v-slot:prepend>
      <q-icon size="15px" class="q-ml-xs" name="fa-solid fa-magnifying-glass" />
    </template>
  </q-input>
  <div
    id="scroll-target-id"
    class="q-pa-md"
    style="max-height: 33vh; overflow: auto"
  >
    <q-infinite-scroll @load="onLoad" scroll-target="#scroll-target-id">
      <div class="row q-py-sm justify-between">
        <template v-for="item in triggerStore.triggers" :key="item.id">
          <trigger-item :item="item" type="trigger"></trigger-item>
        </template>
      </div>
      <template v-slot:loading>
        <div class="text-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>

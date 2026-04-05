<script setup lang="ts">
import DataSourceItem from '@/components/experience-builder/journey-view/journey-sidebar/item/data-source-item/DataSourceItem.vue'
import { useDataSourceStore } from '@/stores/data-sources'
import { ref } from 'vue'

const dataSourceStore = useDataSourceStore()
const search = ref('')
const currentPage = ref(1)

async function searchDataSource() {
  await dataSourceStore.searchDataSource(search.value)
}

const onLoad = (index: any, done: any) => {
  currentPage.value = index - 1
  dataSourceStore.getDataSource(currentPage.value).then(() => {
    done()
  })
}
</script>
<template>
  <div class="col-12">
    <q-input
      v-model="search"
      color="primary"
      bg-color="grey-2"
      dense
      outlined
      placeholder="Search"
      @update:model-value="searchDataSource"
    >
      <template v-slot:prepend>
        <q-icon
          size="15px"
          class="q-ml-xs"
          name="fa-solid fa-magnifying-glass"
        />
      </template>
    </q-input>
  </div>
  <div
    id="scroll-datasource-id"
    class="q-pa-md"
    style="max-height: 60vh; overflow: auto"
  >
    <q-infinite-scroll @load="onLoad" scroll-target="#scroll-datasource-id">
      <template v-for="item in dataSourceStore.dataSources" :key="item">
        <data-source-item :item="item" type="data-source"></data-source-item>
      </template>
      <template v-slot:loading>
        <div class="text-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>

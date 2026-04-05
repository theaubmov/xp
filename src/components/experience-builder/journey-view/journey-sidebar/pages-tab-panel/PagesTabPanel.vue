<script setup lang="ts">
import PageItem from '@/components/experience-builder/journey-view/journey-sidebar/item/page-item/PageItem.vue'
import { useExperienceStore } from '@/stores/experience'
import { usePagesStore } from '@/stores/pages'
import { ref } from 'vue'

const pageStore = usePagesStore()
const experienceStore = useExperienceStore()

const search = ref('')
const currentPage = ref(1)

async function searchPages() {
  await pageStore.searchPages(search.value)
}
const onLoad = (index: any, done: any) => {
  currentPage.value = index - 1
  pageStore.getPages(currentPage.value).then(() => {
    done()
  })
}
</script>
<template>
  <q-input
    v-model="search"
    color="primary"
    bg-color="grey-2"
    dense
    outlined
    placeholder="Search"
    @update:model-value="searchPages"
  >
    <template v-slot:prepend>
      <q-icon size="15px" class="q-ml-xs" name="fa-solid fa-magnifying-glass" />
    </template>
  </q-input>
  <div
    id="scroll-pages-id"
    class="q-pa-md"
    style="max-height: 60vh; overflow: auto"
  >
    <q-infinite-scroll @load="onLoad" scroll-target="#scroll-pages-id">
      <template v-for="item in pageStore.pages" :key="item.id">
        <page-item :id="experienceStore.getCurrentExperience.id" :item="item" />
      </template>
      <template v-slot:loading>
        <div class="text-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>

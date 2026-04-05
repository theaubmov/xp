<script setup lang="ts">
import ExperienceHeader from '@/components/experience/experience-header/ExperienceHeader.vue'
import ExperienceCard from '@/components/experience/experience-card/ExperienceCard.vue'
import ExperienceCardSkeleton from '@/components/experience/experience-card-skeleton/ExperienceCardSkeleton.vue'
import ExperienceDrawer from '@/components/experience/experience-drawer/ExperienceDrawer.vue'
import { debounce } from 'lodash'

import nextzen from '@/assets/svg/nextzen_select.svg'

import { useExperienceStore } from '@/stores/experience'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { findIndex } from 'lodash'

const experienceStore = useExperienceStore()
const loading = ref(true)
const selectedExperience = ref({})
const router = useRouter()
const model = ref()
const search = ref('')

onMounted(() => {
  getAllExperiences(0)
})

const updateSearch = (value: string) => {
  search.value = value
  onChange(value)
}

const onChange = debounce((value) => {
  onSearch(value)
}, 500)

function onSearch(modelSearch: string) {
  if (!modelSearch) {
    getAllExperiences(0)
  } else {
    searchExperiences(modelSearch, 0)
  }
}

function OnPaginate(val: number) {
  const { value } = search
  if (!value) {
    getAllExperiences(val - 1)
  } else {
    searchExperiences(value, val - 1)
  }
}

async function getAllExperiences(page: number) {
  loading.value = true
  await experienceStore.searchRealExperiences('', page, 20)
  if (experienceStore.getExperiencesSimplified.length > 0) {
    const experience = experienceStore.getExperiencesSimplified[0]
    selectedExperience.value = experience
    model.value = experience.status
  }
  loading.value = false
}

async function searchExperiences(modelSearch: string, page: number) {
  loading.value = true
  await experienceStore.searchRealExperiences(modelSearch, page, 20)
  if (experienceStore.getExperiencesSimplified.length > 0) {
    const experience = experienceStore.getExperiencesSimplified[0]
    selectedExperience.value = experience
    model.value = experience.status
  }
  loading.value = false
}

function publish(id: string, status: string) {
  const index = findIndex(experienceStore.experienceList, { id: id })
  experienceStore.experienceList[index].status = status
}

function previewExperience(id: string) {
  const index = findIndex(experienceStore.getAllExperiencesSimplified, {
    id: id
  })
  const experience = experienceStore.getAllExperiencesSimplified[index]
  selectedExperience.value = experience
  model.value = experience.status
}

async function editExprience(id: string) {
  router.push({ path: '/experience-builder/journey', query: { id: id } })
}
</script>

<template>
  <div class="row fit">
    <div v-if="experienceStore.showDrawer" class="col-2">
      <experience-drawer
        :id="selectedExperience.id"
        drawerContentHeight="calc(100vh - 275px)"
        @on-close="experienceStore.showDrawer = !experienceStore.showDrawer"
        @handle-click-experience="previewExperience"
      ></experience-drawer>
    </div>
    <div
      class="col position-relative"
      style="height: calc(100vh - 145px); overflow: auto"
    >
      <experience-header
        v-if="!experienceStore.showDrawer"
        v-model="search"
        @updateValue="updateSearch"
      ></experience-header>
      <div class="row fit q-pb-md q-pr-md q-pl-lg">
        <div class="col" v-if="!experienceStore.showDrawer">
          <div v-if="!loading" class="row items-stretch q-pb-lg">
            <div
              class="col-4 flex q-px-md q-pb-md"
              v-for="experienceSimplified in experienceStore.getExperiencesSimplified"
              :key="experienceSimplified.id"
            >
              <experience-card
                :experienceSimplified="experienceSimplified"
                @publish="publish"
              ></experience-card>
            </div>
          </div>
          <div v-else class="row items-center q-py-md">
            <div class="col-4 q-px-md">
              <experience-card-skeleton></experience-card-skeleton>
            </div>
          </div>
        </div>
        <div
          class="col"
          v-if="
            Object.keys(selectedExperience).length > 0 &&
            experienceStore.showDrawer
          "
        >
          <div>
            <q-img
              :src="selectedExperience.thumbnail"
              fit="cover"
              style="max-height: 450px"
            />
            <q-btn
              class="absolute"
              size="md"
              color="white"
              text-color="black"
              icon="fa-solid fa-pen-to-square"
              @click="editExprience(selectedExperience.id)"
              style="top: 2rem; right: 2rem"
            />
          </div>

          <div class="row wrap q-my-md">
            <div class="col q-pr-sm">
              <div class="text-h5 text-weight-medium">
                {{ selectedExperience.name }}
              </div>
              <div class="text-h6 text-weight-regular">
                {{ selectedExperience.tenant }}
              </div>
            </div>
            <div class="col-auto">
              <q-btn-toggle
                v-model="model"
                @click="publish(selectedExperience.id, model.value)"
                spread
                no-caps
                size="lg"
                toggle-color="primary"
                color="white"
                text-color="black"
                :options="[
                  { label: 'Draft', value: 'draft' },
                  { label: 'Publish', value: 'publish' }
                ]"
              />
            </div>
          </div>

          <div class="row wrap q-my-md">
            <div class="col-7 text-h6 text-weight-light">
              {{ selectedExperience.description }}
            </div>
            <div class="col-5">
              <div class="row justify-end">
                <div
                  class="col-auto"
                  v-for="item in selectedExperience.listActionItem"
                  :key="item.icon"
                >
                  <q-btn
                    flat
                    round
                    size="md"
                    :icon="item.icon"
                    :disable="!item.url"
                    :href="item.url"
                  />
                </div>
              </div>
              <div class="row justify-end">
                <div
                  class="col-auto"
                  v-for="item in selectedExperience.listOrentationItem"
                  :key="item.icon"
                >
                  <q-btn
                    flat
                    round
                    size="md"
                    :icon="item.icon"
                    :disable="!item.isActive"
                  />
                </div>
              </div>
            </div>
          </div>

          <q-separator />

          <div class="row justify-between q-mt-md">
            <div class="col-auto">
              <q-btn flat size="sm">
                <img :src="nextzen" width="150" />
              </q-btn>
            </div>
            <div class="col">
              <div class="row justify-end">
                <div
                  class="col-auto"
                  v-for="item in selectedExperience.listConfigurationItem"
                  :key="item.icon"
                >
                  <q-btn
                    flat
                    round
                    size="md"
                    :icon="item.icon"
                    :disable="!item.isActive"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="q-pa-lg flex flex-center text-h4 absolute fixed-bottom z-top bg-white"
        style="width: 100%"
        v-if="!experienceStore.showDrawer && experienceStore.totalPages > 1"
      >
        <q-pagination
          v-model="experienceStore.currentPage"
          :max="experienceStore.totalPages"
          :max-pages="10"
          boundary-numbers
          @update:model-value="OnPaginate"
        />
      </div>
    </div>
  </div>
</template>

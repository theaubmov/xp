<script setup lang="ts">
import { defaultMockThumbnail } from '@/helpers/mock-asset'
import { useDashboardStore } from '@/stores/dashboard'
import { useExperienceStore } from '@/stores/experience'
import { get } from 'lodash'
import { useRouter } from 'vue-router'
import { onMounted, computed, ref } from 'vue'
import useFormatTime from '@/composition/format-time'

const emit = defineEmits(['onSubmit'])

const { fromMillisToDAteTimeString } = useFormatTime()
const search = ref('')
const dashboardsSelected = ref<string[]>([])
const router = useRouter()
const dashboardStore = useDashboardStore()
const experienceStore = useExperienceStore()

const hgrThumbnail = defaultMockThumbnail

async function searchDashboards() {
  const { value } = search
  if (!value) {
    dashboardStore.getDashboards(0)
  } else {
    dashboardStore.searchDashboards(value, 0)
  }
}

function getDashboardsByPage(val: number) {
  const { value } = search
  if (!value) {
    dashboardStore.getDashboards(val - 1)
  } else {
    dashboardStore.searchDashboards(value, val - 1)
  }
}

function handleSubmit() {
  emit('onSubmit', dashboardsSelected.value)
}

const addNewDashboard = () => {
  router.push({ path: '/designer' })
}

onMounted(() => {
  dashboardStore.getDashboards(0)
  dashboardsSelected.value = get(
    experienceStore,
    'getCurrentExperience.performance',
    []
  )
})

const isDisabled = computed(() => {
  return dashboardsSelected.value.length === 0
})
</script>

<template>
  <div
    class="shadow-1 q-px-lg q-pt-md q-pb-lg"
    style="height: 100%; width: 100%"
  >
    <div class="row justify-between items-center">
      <div class="col-2">
        <q-input
          v-model="search"
          color="primary"
          bg-color="grey-2"
          dense
          outlined
          placeholder="Search"
          debounce="500"
          @update:model-value="searchDashboards"
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
      <div class="col-auto">
        <q-btn
          @click="addNewDashboard"
          label="Create Dashboard"
          class="text-weight-bold text-body1"
          color="primary"
          flat
          disable
        />
      </div>
    </div>

    <div
      class="row justify-between items-center q-mt-sm q-pb-lg q-col-gutter-lg"
      style="max-height: calc(100vh - 380px); overflow: auto"
    >
      <div
        class="col-3"
        v-for="dashboard in dashboardStore.dashboards"
        :key="dashboard.id"
      >
        <q-card flat bordered>
          <q-img
            :src="dashboard?.additionalProperties?.thumbnail || hgrThumbnail"
            :ratio="16 / 9"
          />
          <q-card-section class="row justify-between align-center">
            <div class="col-auto">
              <div class="text-h6 limit">
                {{ dashboard.name }}
              </div>
              <div class="text-subtitle2 limit" v-if="dashboard?.creationTime">
                Last Updated
                {{ fromMillisToDAteTimeString(dashboard?.creationTime) }}
              </div>
            </div>
            <div class="col-auto">
              <q-checkbox
                v-model="dashboardsSelected"
                :val="dashboard.id"
                color="primary"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row q-mt-lg justify-end items-center">
      <div class="col-4" />
      <div class="col-4 flex flex-center text-h4">
        <q-pagination
          v-model="dashboardStore.currentPage"
          :max="dashboardStore.totalPages"
          :max-pages="10"
          boundary-numbers
          @update:model-value="(val) => getDashboardsByPage(val)"
          :disable="dashboardStore.onLoadingDashboards"
        />
      </div>
      <div class="col-4 row justify-end">
        <q-btn
          color="accent"
          label="Submit"
          @click="handleSubmit"
          :disable="isDisabled"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.limit {
  max-width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

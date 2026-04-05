<script async setup lang="ts">
import DeleteModal from '../modal/DeleteModal.vue'
import { defaultMockThumbnail } from '@/helpers/mock-asset'
import { useDashboardStore } from '@/stores/dashboard'
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import useFormatTime from '@/composition/format-time'

const { fromMillisToDAteTimeString } = useFormatTime()
const dashboardStore = useDashboardStore()
const dashboardList = ref([]) as any
const search = ref('')
const isLoading = ref(false)
const deleteDialog = ref(false)
const currentDeleteId = ref('')
const $q = useQuasar()

const hgrThumbnail = defaultMockThumbnail

async function searchQueries() {
  const { value } = search
  if (!value) {
    dashboardStore.getDashboards(0)
  } else {
    dashboardStore.searchDashboards(value, 0)
  }
}

function OnChangePage(val: number) {
  const { value } = search
  if (!value) {
    dashboardStore.getDashboards(val - 1)
  } else {
    dashboardStore.searchDashboards(value, val - 1)
  }
}

async function openDeleteDialogue(id: string) {
  currentDeleteId.value = id
  deleteDialog.value = true
}

async function deleteDashboard() {
  dashboardStore.deleteDashboard(currentDeleteId.value).then((response) => {
    if (response == 200 || response === 202) {
      $q.notify({
        type: 'positive',
        message: 'Dashboard Deleted Successfully'
      })
      dashboardStore.getDashboards(dashboardStore.currentPage - 1)
    } else {
      $q.notify({
        type: 'negative',
        message: 'Oops, Try again'
      })
    }
  })
  deleteDialog.value = false
}

isLoading.value = true
dashboardStore.getDashboards(0).then((data) => {
  dashboardList.value = data
  isLoading.value = false
})
</script>

<template>
  <div class="row q-py-md items-center justify-between">
    <div class="col-auto">
      <q-btn flat>
        <q-icon left size="xs" name="fa-solid fa-filter" />
        <div class="col-auto" style="line-height: 0">Add Filters</div>
      </q-btn>
    </div>
    <div class="col-3">
      <q-input
        v-model="search"
        color="primary"
        bg-color="grey-2"
        dense
        outlined
        placeholder="Search"
        debounce="500"
        @update:model-value="searchQueries"
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
  </div>

  <div
    class="q-pa-md row text-subtitle1"
    style="height: 60vh"
    v-if="
      !dashboardStore.onLoadingDashboards &&
      dashboardStore.dashboards.length === 0
    "
  >
    No Record Found...
  </div>

  <div
    class="q-pa-md row text-subtitle1"
    style="height: 60vh"
    v-if="dashboardStore.onLoadingDashboards"
  >
    Loading...
  </div>

  <div
    class="q-pa-md row items-start scroll"
    style="height: 65vh"
    v-if="!dashboardStore.onLoadingDashboards"
  >
    <div class="q-pa-md row q-col-gutter-lg items-center">
      <template
        v-for="dashboard in dashboardStore.dashboards"
        :key="dashboard.id"
      >
        <div class="col-3 q-mb-md">
          <q-card class="q-mb-md">
            <q-img
              :src="
                dashboard?.additionalProperties?.thumbnail || hgrThumbnail
              "
              :ratio="16 / 9"
            />
            <q-card-section>
              <div class="text-h6 limit">
                {{ dashboard.name }}
              </div>
              <div class="text-subtitle2" v-if="dashboard?.creationTime">
                Last Updated
                {{ fromMillisToDAteTimeString(dashboard?.creationTime) }}
              </div>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
              <q-btn
                flat
                round
                size="10px"
                color="grey-8"
                icon="fa-solid fa-eye"
              />
              <q-btn
                flat
                round
                size="10px"
                color="grey-8"
                icon="fa-solid fa-pen-to-square"
              />
              <q-btn
                flat
                round
                disable
                size="10px"
                color="grey-8"
                icon="fa-solid fa-trash"
                @click="openDeleteDialogue(dashboard.id)"
              />
            </q-card-actions>
          </q-card>
        </div>
      </template>
    </div>
  </div>
  <div class="q-px-lg q-pt-lg flex flex-center text-h4" style="width: 100%">
    <q-pagination
      v-model="dashboardStore.currentPage"
      :max="dashboardStore.totalPages"
      :max-pages="10"
      boundary-numbers
      @update:model-value="(val:number) => OnChangePage(val)"
      :disable="dashboardStore.onLoadingDashboards"
    />
  </div>
  <delete-modal
    title="Are you sure you want to delete this dashboard?"
    :modelValue="deleteDialog"
    @update:modelValue="deleteDialog"
    @on-close="
      () => {
        deleteDialog = false
      }
    "
    @on-delete="deleteDashboard"
  ></delete-modal>
</template>
<style lang="scss" scoped>
.limit {
  width: 200px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

<script async setup lang="ts">
import DeleteModal from '../modal/DeleteModal.vue'
import { buildMockSurfaceUrl } from '@/helpers/mock-surface-url'
import { useBroadcastAppStore } from '@/stores/broadcast-app'
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import useFormatTime from '@/composition/format-time'

const { fromMillisToDAteTimeString } = useFormatTime()
const broadcastAppStore = useBroadcastAppStore()
const search = ref('')
const broadcastAppList = ref([]) as any
const isLoading = ref(false)
const deleteDialog = ref(false)
const currentDeleteId = ref('')
const $q = useQuasar()

async function searchQueries() {
  const { value } = search
  if (!value) {
    broadcastAppStore.getBroadCastApp(0)
  } else {
    broadcastAppStore.searchBroadCastApp(value, 0)
  }
}

function OnChangePage(val: number) {
  const { value } = search
  if (!value) {
    broadcastAppStore.getBroadCastApp(val - 1)
  } else {
    broadcastAppStore.searchBroadCastApp(value, val - 1)
  }
}

async function openDeleteDialogue(id: string) {
  currentDeleteId.value = id
  deleteDialog.value = true
}

async function deleteApp() {
  broadcastAppStore
    .deleteBroadCastApp(currentDeleteId.value)
    .then((response) => {
      if (response == 200 || response === 202) {
        $q.notify({
          type: 'positive',
          message: 'BApp Deleted Successfully'
        })
        broadcastAppStore.getBroadCastApp(broadcastAppStore.currentPage - 1)
      } else {
        $q.notify({
          type: 'negative',
          message: 'Oops, Try again'
        })
      }
    })
  deleteDialog.value = false
}

const columns = [
  {
    name: 'name',
    field: 'baAppName',
    label: 'Name',
    align: 'left',
    sortable: true
  },
  {
    name: 'id',
    label: 'App ID',
    field: 'id',
    align: 'left',
    sortable: true
  },
  {
    name: 'tags',
    label: 'Tags',
    field: 'tag',
    align: 'left',
    sortable: true
  },
  {
    name: 'version',
    label: 'Version',
    field: 'version',
    align: 'left',
    sortable: true
  }
  // {
  //   name: 'resolution',
  //   field: (row: any) => row.resolutions[0] + '-' + row.resolutions[1],
  //   label: 'Resolution',
  //   align: 'left'
  // }
]

isLoading.value = true
broadcastAppStore.getBroadCastApp(0).then((data) => {
  broadcastAppList.value = data
  isLoading.value = false
})

function getPreviewUrl(id: string) {
  return buildMockSurfaceUrl('experience', { appId: id })
}
</script>

<template>
  <div class="row q-py-md items-center justify-between">
    <div class="col-auto">
      <q-btn flat disable>
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

  <Suspense>
    <q-table
      :loading="isLoading"
      :rows="broadcastAppList"
      :columns="columns"
      row-key="apps"
      class="shadow-0 hidden"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
          <q-th class="text-center sortable"> Devices </q-th>
          <q-th class="text-center sortable"> Actions </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
          <q-td class="text-center">
            NaN
            <!-- <q-btn
            :disable="!props.row.devicesCompatibility.phone"
            size="xs"
            icon="fa-solid fa-mobile-screen"
            flat
            round
          />
          <q-btn
            :disable="!props.row.devicesCompatibility.tablet"
            size="xs"
            icon="fa-solid fa-tablet-screen-button"
            flat
            round
          />
          <q-btn
            :disable="!props.row.devicesCompatibility.tv"
            size="xs"
            icon="fa-solid fa-tv"
            flat
            round
          /> -->
          </q-td>
          <q-td class="text-center">
            <q-btn
              size="xs"
              icon="fa-solid fa-eye"
              target="_blank"
              :href="getPreviewUrl(props.cols[1].value)"
              flat
              round
              color="grey-8"
            />
            <router-link
              :to="'/designer?pageID=' + props.cols[1].value"
              style="text-decoration: none"
            >
              <q-btn size="xs" icon="fa-solid fa-edit" flat round />
            </router-link>

            <!-- <q-btn size="xs" icon="fa-solid fa-wrench" flat round /> -->
            <q-btn flat round disable size="xs" icon="fa-solid fa-trash" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </Suspense>

  <div
    class="q-pa-md row text-subtitle1"
    style="height: 60vh"
    v-if="broadcastAppStore.onLoadingApps"
  >
    Loading...
  </div>

  <div
    class="q-pa-md row text-subtitle1"
    style="height: 60vh"
    v-if="
      !broadcastAppStore.onLoadingApps && broadcastAppStore.apps.length === 0
    "
  >
    No Record Found...
  </div>

  <div
    class="q-pa-md row items-start scroll"
    style="height: 65vh"
    v-if="!broadcastAppStore.onLoadingApps && broadcastAppStore.apps.length > 0"
  >
    <div class="q-pa-md row items-center fit">
      <template v-for="app in broadcastAppStore.apps" :key="app.id">
        <div class="col-3 q-mb-md">
          <q-card class="my-card q-mb-md">
            <q-img :src="app.baAppConfig?.thumbnail" :ratio="16 / 9" />
            <q-card-section>
              <div class="text-h6 limit">
                {{ app.baAppConfig?.app_name || app.baAppName }}
                <q-badge transparent align="right" color="primary">
                  {{ app.version }}
                </q-badge>
              </div>
              <div class="text-subtitle2">
                Last Updated {{ fromMillisToDAteTimeString(app.updatedAt) }}
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-badge
                v-if="app.published"
                class="text-subtitle1"
                outline
                color="blue"
                label="PUBLISHED"
              />
              <q-badge
                v-if="!app.published"
                class="text-subtitle1"
                outline
                color="orange"
                label="DRAFT"
              />
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
              <q-btn
                flat
                round
                size="10px"
                color="grey-8"
                icon="fa-solid fa-eye"
                target="_blank"
                :href="getPreviewUrl(app.id)"
              />
              <q-btn
                flat
                round
                size="10px"
                color="grey-8"
                icon="fa-solid fa-pen-to-square"
                :to="'/designer?pageID=' + app.id"
              />
              <q-btn
                flat
                round
                disable
                size="10px"
                color="grey-8"
                icon="fa-solid fa-trash"
                @click="openDeleteDialogue(app.id)"
              />
            </q-card-actions>
          </q-card>
        </div>
      </template>
    </div>
  </div>
  <div class="q-px-lg q-pt-lg flex flex-center text-h4" style="width: 100%">
    <q-pagination
      v-model="broadcastAppStore.currentPage"
      :max="broadcastAppStore.totalPages"
      :max-pages="10"
      boundary-numbers
      @update:model-value="(val:number) => OnChangePage(val)"
      :disable="broadcastAppStore.onLoadingApps"
    />
  </div>
  <delete-modal
    title="Are you sure you want to delete the current app?"
    :modelValue="deleteDialog"
    @update:modelValue="deleteDialog"
    @on-close="
      () => {
        deleteDialog = false
      }
    "
    @on-delete="deleteApp"
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
.my-card {
  width: 90%;
  justify-content: center;
}

.hidden {
  display: none;
}

.q-btn.disabled {
  opacity: 0.4 !important;
}

.q-table__control button span i {
  font-size: 1.15em !important;
}
</style>

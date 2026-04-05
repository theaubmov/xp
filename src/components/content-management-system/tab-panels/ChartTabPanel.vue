<script async setup lang="ts">
import DeleteModal from '../modal/DeleteModal.vue'
import { useChartStore } from '@/stores/chart'
import { useQuasar } from 'quasar'
import { ref, onMounted } from 'vue'
import useFormatTime from '@/composition/format-time'

import pieIcon from '@/assets/img/charts/pie-chart.png'
import scatterIcon from '@/assets/img/charts/scatter.png'
import gaugeIcon from '@/assets/img/charts/gauge.png'
import barIcon from '@/assets/img/charts/bar.png'
import multibarIcon from '@/assets/img/charts/multibar.png'
import lineIcon from '@/assets/img/charts/line-graph.png'
import keplerpolygonIcon from '@/assets/img/charts/keplerpolygon.png'
import areaIcon from '@/assets/img/charts/area-chart.png'

const { fromMillisToDAteTimeString } = useFormatTime()
const chartStore = useChartStore()
const chartList = ref([]) as any
const isLoading = ref(false)
const deleteDialog = ref(false)
const currentDeleteId = ref('')
const $q = useQuasar()

function OnChangePage(val: number) {
  chartStore.getCharts(val - 1).then((data) => {
    chartList.value = data
    isLoading.value = false
  })
}

async function openDeleteDialogue(id: string) {
  currentDeleteId.value = id
  deleteDialog.value = true
}

async function deleteChart() {
  chartStore.deleteChart(currentDeleteId.value).then((response) => {
    if (response == 200 || response === 202) {
      $q.notify({
        type: 'positive',
        message: 'Chart Deleted Successfully'
      })
      chartStore.getCharts(chartStore.currentPage - 1)
    } else {
      $q.notify({
        type: 'negative',
        message: 'Oops, Try again'
      })
    }
  })
  deleteDialog.value = false
}

onMounted(() => {
  isLoading.value = true
  chartStore.getCharts(0).then((data) => {
    chartList.value = data
    isLoading.value = false
  })
})
</script>

<template>
  <div
    class="q-pa-md row text-subtitle1"
    style="height: 70.5vh"
    v-if="chartStore.onLoadingCharts"
  >
    Loading...
  </div>
  <div
    class="q-pa-md row items-start scroll"
    style="height: 70.5vh"
    v-if="!chartStore.onLoadingCharts"
  >
    <div class="chart-grid q-pa-md row q-col-gutter-lg">
      <template v-for="chart in chartStore.charts" :key="chart.id">
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 q-mb-md">
          <q-card flat bordered class="chart-card">
            <q-card-section class="chart-card__header" horizontal>
              <q-card-section class="chart-card__icon flex flex-center">
                <q-icon
                  v-if="
                    !chart.chartType ||
                    (chart.chartType != 'pie' &&
                      chart.chartType != 'scatter' &&
                      chart.chartType != 'gauge' &&
                      chart.chartType != 'bar' &&
                      chart.chartType != 'line' &&
                      chart.chartType != 'keplerpolygon' &&
                      chart.chartType != 'area' &&
                      chart.chartType != 'multibar')
                  "
                  size="xl"
                  name="fa-solid fa-circle-question"
                />
                <img v-if="chart.chartType == 'pie'" :src="pieIcon" alt="pie" />
                <img
                  v-if="chart.chartType == 'scatter'"
                  :src="scatterIcon"
                  alt="scatter"
                />
                <img
                  v-if="chart.chartType == 'gauge'"
                  :src="gaugeIcon"
                  alt="gauge"
                />
                <img v-if="chart.chartType == 'bar'" :src="barIcon" alt="bar" />
                <img
                  v-if="chart.chartType == 'multibar'"
                  :src="multibarIcon"
                  alt="multibar"
                />
                <img
                  v-if="chart.chartType == 'line'"
                  :src="lineIcon"
                  alt="line"
                />
                <img
                  v-if="chart.chartType == 'keplerpolygon'"
                  :src="keplerpolygonIcon"
                  alt="keplerpolygon"
                />
                <img
                  v-if="chart.chartType == 'area'"
                  :src="areaIcon"
                  alt="area"
                />
              </q-card-section>
              <q-card-section class="chart-card__content q-pt-xs">
                <div class="q-mt-sm q-mb-xs">
                  <q-item-label class="text-h6 limit">
                    {{ chart.name }}
                  </q-item-label>
                </div>
                <q-item-label class="chart-card__updated" caption>
                  Last updated
                  {{
                    fromMillisToDAteTimeString(chart.updatedTimeMs)
                  }}
                </q-item-label>
                <div class="text-body1 text-weight-medium q-mt-md chart-card__provider">
                  <q-badge
                    class="text-uppercase"
                    outline
                    color="teal"
                    :label="chart.provider"
                  />
                </div>
              </q-card-section>
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
                @click="openDeleteDialogue(chart.id)"
              />
            </q-card-actions>
          </q-card>
        </div>
      </template>
    </div>
  </div>
  <div class="q-px-lg q-pt-lg flex flex-center text-h4" style="width: 100%">
    <q-pagination
      v-model="chartStore.currentPage"
      :max="chartStore.totalPages"
      :max-pages="10"
      boundary-numbers
      @update:model-value="(val:number) => OnChangePage(val)"
      :disable="chartStore.onLoadingCharts"
    />
  </div>
  <delete-modal
    title="Are you sure you want to delete this chart?"
    :modelValue="deleteDialog"
    @update:modelValue="deleteDialog"
    @on-close="
      () => {
        deleteDialog = false
      }
    "
    @on-delete="deleteChart"
  ></delete-modal>
</template>
<style lang="scss" scoped>
.chart-grid {
  width: 100%;
  align-content: flex-start;
}

.chart-card {
  height: 100%;
}

.chart-card :deep(.q-card__section--horiz) {
  align-items: stretch;
}

.chart-card__header {
  min-height: 172px;
}

.chart-card__icon {
  flex: 0 0 128px;
  min-width: 128px;
  padding-right: 0;
}

.chart-card__icon img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

.chart-card__content {
  min-width: 0;
  flex: 1 1 auto;
}

.chart-card__updated {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.chart-card__provider {
  min-width: 0;
}

.limit {
  display: block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 1023px) {
  .chart-card__icon {
    flex-basis: 112px;
    min-width: 112px;
  }
}

@media (max-width: 599px) {
  .chart-card__header {
    min-height: auto;
    flex-direction: column;
  }

  .chart-card__icon {
    flex-basis: auto;
    min-width: 100%;
    padding-bottom: 0;
  }

  .chart-card__icon img {
    max-height: 96px;
  }

  .limit {
    white-space: normal;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
}

.limit,
.chart-card__updated {
  overflow: hidden;
}
</style>

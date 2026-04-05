<script async setup lang="ts">
import { useAnimationStore } from '@/stores/animation'
import { ref, onMounted } from 'vue'
import useFormatTime from '@/composition/format-time'

const { fromMillisToDAteTimeString } = useFormatTime()
const AnimationStore = useAnimationStore()
const animationList = ref([]) as any
const isLoading = ref(false)

function OnChangePage(val: number) {
  AnimationStore.getAnimations(val - 1).then((data) => {
    animationList.value = data
    isLoading.value = false
  })
}

onMounted(() => {
  isLoading.value = true
  AnimationStore.getAnimations(0).then((data) => {
    animationList.value = data
    isLoading.value = false
  })
})
</script>

<template>
  <div
    class="q-pa-md row text-subtitle1"
    style="height: 70.5vh"
    v-if="AnimationStore.onLoadingAnimations"
  >
    Loading...
  </div>
  <div
    class="q-pa-md row items-start scroll"
    style="height: 70.5vh"
    v-if="!AnimationStore.onLoadingAnimations"
  >
    <div class="q-pa-md row q-col-gutter-lg items-center">
      <template
        v-for="animation in AnimationStore.animations"
        :key="animation.id"
      >
        <div class="col-3 q-mb-md">
          <q-card flat bordered>
            <q-card-section class="justify-between" horizontal>
              <q-card-section class="col-5 flex flex-center" align="right">
                <q-icon size="xl" name="fa-solid fa-chart-area" />
              </q-card-section>
              <q-card-section class="q-pt-xs">
                <div class="text-h5 q-mt-sm q-mb-xs">
                  <q-item-label class="text-h6 limit">{{
                    animation.name
                  }}</q-item-label>
                </div>
                <q-item-label caption>
                  Last updated
                  {{
                    fromMillisToDAteTimeString(animation.creationTimeMs)
                  }}</q-item-label
                >
                <div class="text-body1 text-weight-medium q-mt-md">
                  <q-badge
                    class="text-uppercase"
                    outline
                    color="teal"
                    :label="animation.modelType"
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
                size="10px"
                color="grey-8"
                icon="fa-solid fa-trash"
              />
            </q-card-actions>
          </q-card>
        </div>
      </template>
    </div>
  </div>
  <div class="q-px-lg q-pt-lg flex flex-center text-h4" style="width: 100%">
    <q-pagination
      v-model="AnimationStore.currentPage"
      :max="AnimationStore.totalPages"
      :max-pages="10"
      boundary-numbers
      @update:model-value="(val:number) => OnChangePage(val)"
      :disable="AnimationStore.onLoadingAnimations"
    />
  </div>
</template>
<style lang="scss" scoped>
.limit {
  width: 170px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

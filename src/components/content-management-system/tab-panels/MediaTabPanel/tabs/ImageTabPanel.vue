<script async setup lang="ts">
import DeleteModal from '../../../modal/DeleteModal.vue'
import PreviewModal from '../../../modal/PreviewModal.vue'
import useFormatTime from '@/composition/format-time'
import { emptyStateArtwork } from '@/helpers/mock-asset'
import { useQuasar } from 'quasar'
import { useMediaStore } from '@/stores/media'
import { onMounted, ref } from 'vue'

const mediaStore = useMediaStore()
const isLoading = ref(false)
const deleteDialog = ref(false)
const previewDialog = ref(false)
const currentDeleteId = ref('')
const $q = useQuasar()
const { fromMillisToDAteTimeString } = useFormatTime()

function OnChangePage(val: number) {
  mediaStore.getMediaImages(val - 1)
}

async function openDeleteDialogue(id: string) {
  currentDeleteId.value = id
  deleteDialog.value = true
}

async function openPreviewDialogue(url: string) {
  mediaStore.currentPreviewMedia = {
    type: 'image',
    source: url
  }
  previewDialog.value = true
}

async function deleteImage() {
  mediaStore.deleteMedia(currentDeleteId.value).then((response) => {
    if (response == 200 || response === 202) {
      $q.notify({
        type: 'positive',
        message: 'Image Deleted Successfully'
      })
      mediaStore.getMediaImages(mediaStore.currentImagesPage - 1)
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
  mediaStore.currentImagesPage = 1
  mediaStore.getMediaImages(0).then(() => {
    isLoading.value = false
  })
})
</script>
<template>
  <div
    class="q-pa-md row items-center scroll"
    style="height: calc(100vh - 360px)"
    v-if="mediaStore.images && mediaStore.images.length > 0"
  >
    <template v-for="img in mediaStore.images" :key="img.name">
      <div class="col-3">
        <q-card class="my-card q-mb-xl q-mr-xl">
          <q-item>
            <q-item-section avatar>
              <q-avatar square size="60px">
                <img :src="img.downloadURL" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-h6 limit">{{ img.name }}</q-item-label>
              <q-item-label caption
                >Create at
                {{ fromMillisToDAteTimeString(img.created_date) }}</q-item-label
              >
            </q-item-section>
          </q-item>

          <div
            class="text-grey text-body1 text-weight-medium q-pa-md"
            v-if="img.description"
          >
            {{ img.description }}
          </div>

          <div
            class="text-grey text-body1 text-weight-medium q-pa-md"
            v-if="!img.description"
          >
            No Description
          </div>

          <q-separator />

          <q-card-actions align="right">
            <q-btn
              flat
              round
              size="10px"
              color="grey-8"
              icon="fa-solid fa-eye"
              @click="openPreviewDialogue(img.viewURL)"
            />
            <!-- <q-btn
              flat
              round
              size="10px"
              color="grey-8"
              icon="fa-regular fa-heart"
            /> -->
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
              @click="openDeleteDialogue(img.id)"
            />
          </q-card-actions>
        </q-card>
      </div>
    </template>
  </div>
  <div
    class="row q-pa-md justify-center q-gutter-md"
    style="height: calc(100vh - 360px)"
    v-if="mediaStore.images.length == 0"
  >
    <div class="col my-card-no">
      <q-img
        :src="emptyStateArtwork"
        spinner-color="white"
      />
      <div class="text-h3" style="text-align: center">No Results Found</div>
    </div>
  </div>
  <div class="q-px-lg q-pt-lg flex flex-center text-h4" style="width: 100%">
    <q-pagination
      v-model="mediaStore.currentImagesPage"
      :max="mediaStore.totalImagesPages"
      :max-pages="10"
      boundary-numbers
      @update:model-value="(val) => OnChangePage(val)"
      :disable="mediaStore.onLoadingImages"
    />
  </div>
  <delete-modal
    title="Are you sure you want to delete this image?"
    :modelValue="deleteDialog"
    @update:modelValue="deleteDialog"
    @on-close="
      () => {
        deleteDialog = false
      }
    "
    @on-delete="deleteImage"
  ></delete-modal>
  <preview-modal v-model="previewDialog"></preview-modal>
</template>
<style scoped>
.my-card {
  width: 90%;
  justify-content: center;
}
.limit {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.my-card-no {
  width: 100%;
  max-width: 450px;
  min-height: 450px;
}
</style>

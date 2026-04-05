<script setup lang="ts">
import { useUploaderStore } from '@/stores/uploader'
import { useQuasar } from 'quasar'
import { computed, ref } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const label = ref<any>()
const dropzoneFile = ref('')
const active = ref(false)
const uploadFile = ref('')
const uploadDisplay = ref()
const isLoading = ref(false)

const uploaderStore = useUploaderStore()
const $q = useQuasar()

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const toggleActive = () => {
  active.value = !active.value
}

const drop = (e: any) => {
  dropzoneFile.value = e.dataTransfer.files[0].name
  uploadFile.value = URL.createObjectURL(e.dataTransfer.files[0])
  uploadDisplay.value = e.dataTransfer.files[0]
}

const selectedFile = () => {
  dropzoneFile.value = label.value?.files[0].name
  uploadFile.value = URL.createObjectURL(label.value?.files[0])
  uploadDisplay.value = label.value?.files[0]
}
const removeFile = () => {
  uploadFile.value = ''
  uploadDisplay.value = null
  dropzoneFile.value = ''
}

const onUpload = async () => {
  try {
    isLoading.value = true
    await uploaderStore.uploadCollateral(uploadDisplay.value)
    removeFile()
    emit('update:modelValue', false)
  } catch (e: any) {
    $q.notify({
      type: 'negative',
      message: `${e.response.data.cause.message} error code : (${e.response.data.errorCode})`
    })
  } finally {
    isLoading.value = false
  }
}

const getExtension = (filename: string) => {
  const parts = filename.split('.')
  return parts[parts.length - 1]
}

const isImage = (filename: string) => {
  const ext = getExtension(filename)
  switch (ext.toLowerCase()) {
    case 'jpg':
    case 'svg':
    case 'gif':
    case 'bmp':
    case 'png':
      return true
  }
  return false
}

function isVideo(filename: string) {
  const ext = getExtension(filename)
  switch (ext.toLowerCase()) {
    case 'm4v':
    case 'avi':
    case 'mpg':
    case 'mp4':
    case 'wmv':
      return true
  }
  return false
}

function isAudio(filename: string) {
  const ext = getExtension(filename)
  switch (ext.toLowerCase()) {
    case 'mp3':
      return true
  }
  return false
}
</script>

<template>
  <q-dialog v-model="value">
    <q-card>
      <q-card-section>
        <div class="text-h6">Upload File</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div v-if="!uploadFile" @drop.prevent="drop" @change="selectedFile">
          <div
            @dragenter.prevent="toggleActive"
            @dragleave.prevent="toggleActive"
            @dragover.prevent
            @drop.prevent="toggleActive"
            :class="{ 'active-dropzone': active }"
            class="dropzone"
          >
            <span>Drag or Drop File</span>
            <span>OR</span>
            <label for="dropzoneFile">Select File</label>
            <input
              type="file"
              id="dropzoneFile"
              ref="label"
              class="dropzoneFile"
            />
          </div>
        </div>
        <div v-else class="dropzone">
          <q-badge
            class="non-selectable q-pa-none cursor-pointer close"
            @click="removeFile"
          >
            <q-icon name="fa-solid fa-close" size="14px" class="q-ml-xs" />
          </q-badge>
          <q-img
            v-if="isImage(uploadDisplay.name)"
            :src="uploadFile"
            fit="contain"
            width="100%"
          />
          <video v-if="isVideo(uploadDisplay.name)" width="400" controls>
            <source :src="uploadFile" id="video_here" />
            Your browser does not support HTML5 video.
          </video>
          <audio v-if="isAudio(uploadDisplay.name)" id="sound" controls></audio>
        </div>
        <div class="row q-py-sm justify-between items-center">
          <div class="col-auto">
            <q-input v-model="dropzoneFile" outlined dense label="File Name" />
          </div>
          <div class="col-auto">
            <q-btn
              @click="onUpload"
              color="accent"
              label="upload"
              :loading="isLoading"
              :disable="!uploadFile"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style lang="scss">
.dropzone {
  min-width: 500px;
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 16px;
  border: 2px dashed $primary;
  background-color: #fff;
  transition: 0.3s ease all;
  position: relative;
  .close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 16px;
    color: #fff;
    background: rgba(0, 0, 0, 0.47);
    z-index: 1;
  }
  label {
    border-radius: 5px;
    padding: 8px 12px;
    color: #fff;
    background-color: $primary;
    transition: 0.3s ease all;
  }
  input {
    display: none;
  }
}
.active-dropzone {
  color: #fff;
  border-color: #fff;
  background-color: $primary;
  border-radius: 5px;
  label {
    background-color: #fff;
    color: $primary;
  }
}
</style>

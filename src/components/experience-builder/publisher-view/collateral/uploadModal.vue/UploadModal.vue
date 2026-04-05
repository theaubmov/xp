<script setup lang="ts">
import { useExperienceStore } from '@/stores/experience'
import { useUploaderStore } from '@/stores/uploader'
import { useQuasar } from 'quasar'
import { computed, ref } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const label = ref<any>()
const dropzoneFile = ref('')
const active = ref(false)
const imgUploadFile = ref('')
const imgUploadDisplay = ref()
const isLoading = ref(false)

const uploaderStore = useUploaderStore()
const experienceStore = useExperienceStore()
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
  imgUploadFile.value = URL.createObjectURL(e.dataTransfer.files[0])
  imgUploadDisplay.value = e.dataTransfer.files[0]
}

const selectedFile = () => {
  dropzoneFile.value = label.value?.files[0].name
  imgUploadFile.value = URL.createObjectURL(label.value?.files[0])
  imgUploadDisplay.value = label.value?.files[0]
}
const removeImg = () => {
  imgUploadFile.value = ''
  imgUploadDisplay.value = null
  dropzoneFile.value = ''
}

const onUpload = async () => {
  try {
    const id = experienceStore.currentExperience.id
    isLoading.value = true
    const response = await uploaderStore.uploadCollateral(
      imgUploadDisplay.value
    )
    await experienceStore.updateExperienceMedia(id, {
      title: dropzoneFile.value,
      url: response.url
    })
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
</script>

<template>
  <q-dialog v-model="value">
    <q-card>
      <q-card-section>
        <div class="text-h6">Upload File</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div v-if="!imgUploadFile" @drop.prevent="drop" @change="selectedFile">
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
          <q-img :src="imgUploadFile" fit="contain" width="100%">
            <q-badge
              align="top"
              class="non-selectable q-pa-none cursor-pointer"
              style="right: 0"
              @click="removeImg"
            >
              <q-icon name="fa-solid fa-close" size="14px" class="q-ml-xs" />
            </q-badge>
          </q-img>
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
              :disable="!imgUploadFile || true"
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

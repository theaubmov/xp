<script setup lang="ts">
import { useExperienceStore } from '@/stores/experience'
import { ref } from 'vue'
import UploadModal from './uploadModal.vue/UploadModal.vue'

const experienceStore = useExperienceStore()
const show = ref(false)

function showDefault() {
  show.value = !show.value
}
</script>

<template>
  <q-card class="q-mt-md">
    <q-card-section>
      <div class="row justify-between items-center">
        <div class="col q-my-md q-px-sm justifiy-start">
          <h6 class="q-my-none">Collateral</h6>
        </div>
        <q-btn label="Upload File" color="primary" @click="showDefault" />
      </div>
      <div class="scroll" style="height: 26vh">
        <div class="row items-center">
          <div
            v-for="media in experienceStore.currentExperienceMedias"
            :key="media.title"
            class="col-4 q-pa-md"
          >
            <q-img :src="media.url" fit="fill" :ratio="16 / 9">
              <div v-if="media.title" class="absolute-bottom text-center">
                {{ media.title }}
              </div>
            </q-img>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
  <upload-modal v-model="show"></upload-modal>
</template>

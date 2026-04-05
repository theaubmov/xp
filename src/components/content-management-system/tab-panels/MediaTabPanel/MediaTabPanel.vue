<script setup lang="ts">
import { ref } from 'vue'
import ImageTabPanelVue from '@/components/content-management-system/tab-panels/MediaTabPanel/tabs/ImageTabPanel.vue'
import VideoTabPanel from './tabs/VideoTabPanel.vue'
import AudioTabPanel from './tabs/AudioTabPanel.vue'
const tab = ref('images')
</script>
<template>
  <q-tabs
    narrow-indicator
    align="left"
    active-color="primary"
    class="padding-0"
    v-model="tab"
  >
    <q-tab :ripple="false" name="images" icon="fa-regular fa-image" />
    <q-tab :ripple="false" name="videos" icon="fa-solid fa-video" />
    <q-tab :ripple="false" name="audios" icon="fa-solid fa-file-audio" />
  </q-tabs>
  <q-separator />
  <q-tab-panels v-model="tab" animated>
    <q-tab-panel name="images">
      <image-tab-panel-vue></image-tab-panel-vue>
    </q-tab-panel>

    <q-tab-panel name="videos">
      <video-tab-panel></video-tab-panel>
    </q-tab-panel>

    <q-tab-panel name="audios">
      <audio-tab-panel></audio-tab-panel>
    </q-tab-panel>
  </q-tab-panels>
</template>
<style scoped>
.padding-0 {
  padding: 0;
}
</style>

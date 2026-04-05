<script setup lang="ts">
import { computed, ref } from 'vue'
import { useMediaStore } from '@/stores/media'

let timer: number

const mediaStore = useMediaStore()

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const audioRef = ref<any>(null)
const audioProgress = ref<number>(0)
const isAudioPlaying = ref<boolean>(false)
const isMockPreview = computed(() => !!mediaStore.currentPreviewMedia.mock)
const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    if (audioRef.value) {
      audioRef.value.pause()
      audioRef.value = null
      isAudioPlaying.value = false
      audioProgress.value = 0
      clearInterval(timer)
    }
    emit('update:modelValue', value)
  }
})

const onPlay = () => {
  if (audioRef.value) {
    audioRef.value.play()
    isAudioPlaying.value = true
    onProgress()
  }
}

const onPause = () => {
  clearInterval(timer)
  if (audioRef.value) {
    audioRef.value.pause()
    isAudioPlaying.value = false
  }
}

const onProgress = () => {
  clearInterval(timer)
  timer = setInterval(() => {
    const totalTime = Math.round(audioRef.value.duration)
    const timePlayed = Math.round(audioRef.value.currentTime)
    const progress = timePlayed / totalTime
    audioProgress.value = progress
    if (progress === 1) {
      isAudioPlaying.value = false
      audioProgress.value = 0
      clearInterval(timer)
    }
  }, 1000)
}
</script>

<template>
  <q-dialog
    v-model="value"
    :full-width="mediaStore.currentPreviewMedia.type !== 'audio' ? true : false"
    :position="
      mediaStore.currentPreviewMedia.type === 'audio' ? 'bottom' : 'standard'
    "
  >
    <q-card style="min-width: 350px">
      <q-card-actions
        align="right"
        v-if="mediaStore.currentPreviewMedia.type !== 'audio'"
      >
        <q-btn
          flat
          round
          color="grey-8"
          icon="fa-solid fa-close"
          v-close-popup
        />
      </q-card-actions>
      <q-img
        v-if="mediaStore.currentPreviewMedia.type === 'image'"
        :src="mediaStore.currentPreviewMedia.source"
      />
      <video
        class="fit"
        v-if="
          mediaStore.currentPreviewMedia.type === 'video' && !isMockPreview
        "
        controls
      >
        <source
          :src="
            mediaStore.currentPreviewMedia.media ||
            mediaStore.currentPreviewMedia.source
          "
        />
        Your browser does not support HTML5 video.
      </video>
      <q-img
        v-if="mediaStore.currentPreviewMedia.type === 'video' && isMockPreview"
        :src="mediaStore.currentPreviewMedia.source"
      >
        <div
          class="absolute-bottom text-subtitle1 text-weight-bold"
          style="background: rgba(0, 0, 0, 0.5)"
        >
          Mock video preview
        </div>
      </q-img>
      <q-linear-progress
        :value="audioProgress"
        color="primary"
        v-if="mediaStore.currentPreviewMedia.type === 'audio' && !isMockPreview"
      />
      <q-card-section
        class="row items-center no-wrap"
        v-if="mediaStore.currentPreviewMedia.type === 'audio' && !isMockPreview"
      >
        <div>
          <div class="text-weight-bold">
            {{ mediaStore.currentPreviewMedia.name }}
          </div>
        </div>

        <q-space />

        <q-btn
          flat
          round
          icon="fa-solid fa-play"
          @click="onPlay"
          v-if="!isAudioPlaying"
        />
        <q-btn flat round icon="fa-solid fa-pause" @click="onPause" v-else />
        <audio class="hidden" controls ref="audioRef">
          <source :src="mediaStore.currentPreviewMedia.source" />
          Your browser does not support the audio element.
        </audio>
      </q-card-section>
      <q-card-section
        class="column q-gutter-sm"
        v-if="mediaStore.currentPreviewMedia.type === 'audio' && isMockPreview"
      >
        <div class="text-overline">Mock audio preview</div>
        <div class="text-h6">
          {{ mediaStore.currentPreviewMedia.name }}
        </div>
        <div class="text-body2 text-grey-7">
          The local mock layer uses a visual placeholder for audio assets so the
          media library remains navigable without external files.
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

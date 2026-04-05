<script setup lang="ts">
import ExperiencePanel from '@/components/experience/experience-drawer/experience-panel/ExperiencePanel.vue'

const props = defineProps(['id', 'drawerContentHeight'])

const emit = defineEmits<{
  (e: 'on-close'): void
  (e: 'handle-click-experience', id: string): void
}>()

function handleCloseDrawer() {
  emit('on-close')
}

function handleClickExperience(id: string) {
  emit('handle-click-experience', id)
}
</script>
<template>
  <q-card class="fit">
    <div class="row shadow-1 q-pa-sm items-center justify-between no-wrap">
      <div class="col-auto">
        <h3 class="title q-my-none">My Experiences</h3>
      </div>
      <div class="col-auto">
        <q-btn flat round @click="handleCloseDrawer" size="10px">
          <q-icon size="xs" name="fa-solid fa-close" />
        </q-btn>
      </div>
    </div>
    <div class="row">
      <div class="col-12 items-center q-px-sm q-py-md">
        <q-input
          color="primary"
          bg-color="grey-2"
          dense
          outlined
          placeholder="Search Experience"
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
      class="col-auto"
      :style="`max-height: ${drawerContentHeight}; overflow: auto;`"
    >
      <experience-panel
        :id="props.id"
        @on-click-experience="handleClickExperience"
        :style="`height: ${drawerContentHeight}; overflow: auto;`"
      ></experience-panel>
    </div>
  </q-card>
</template>
<style scoped lang="scss">
.title {
  font-size: 18px;
  font-weight: 600;
  color: #006ead;
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import { get, isEmpty } from 'lodash'

const emit = defineEmits(['update:preview'])
const props = defineProps(['dashboards', 'active'])

const active = computed({
  get() {
    return props.active
  },
  set(value) {
    emit('update:preview', value)
  }
})
</script>
<template>
  <div
    class="shadow-1 column"
    style="height: 100%; width: 100%; overflow: auto"
  >
    <div v-if="!isEmpty(dashboards)">
      <div
        class="q-pa-sm"
        v-for="(dashboard, index) in get(props, 'dashboards', [])"
        :key="index"
      >
        <q-btn
          :style="`background: ${active === dashboard ? '#ccc' : '#fff'}`"
          @click="active = dashboard"
          class="q-pa-sm full-width"
          size="sm"
        >
          <q-icon name="fa-solid fa-square-poll-vertical" size="sm" />
        </q-btn>
      </div>
    </div>
    <q-separator class="q-my-sm" v-if="!isEmpty(dashboards)" />
    <div class="q-pa-sm">
      <q-btn
        @click="active = ''"
        color="accent"
        class="q-pa-sm full-width"
        size="sm"
      >
        <q-icon name="fa-solid fa-plus" />
      </q-btn>
    </div>
  </div>
</template>

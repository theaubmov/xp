<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps(['modelValue', 'title'])
const emit = defineEmits(['update:modelValue', 'on-delete', 'on-close'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <q-dialog v-model="value" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="fa-solid fa-trash" color="red" text-color="white" />
        <span class="q-ml-sm text-subtitle1">{{ props.title }} </span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          class="text-subtitle2"
          flat
          label="Cancel"
          @click="emit('on-close')"
        />
        <q-btn
          class="text-subtitle2 text-weight-bold"
          flat
          label="Delete"
          color="red"
          @click="emit('on-delete')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

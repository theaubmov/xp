<script setup lang="ts">
import { plateformTitle } from '@/components/experience-builder/journey-view/journey-mind-maper/supported-plateforme'
import useRules from '@/composition/rules'
import { computed, ref } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const { requiredField } = useRules()
const channelList = plateformTitle

const form = ref({
  name: '',
  channel: ''
})

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const isDisabled = computed(() => {
  return !form.value.name || !form.value.channel
})
</script>

<template>
  <q-dialog v-model="value" persistent>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Create New App</div>
        <q-space />
        <q-btn icon="fa-solid fa-close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <div class="row q-py-sm justify-end items-center">
          <div class="col-12 q-py-sm">
            <q-input
              v-model="form.name"
              :rules="[requiredField()]"
              label="App Name"
              outlined
            />
          </div>
          <div class="col-12 q-py-sm">
            <q-select
              v-model="form.channel"
              :options="channelList"
              :rules="[requiredField()]"
              label="Channel"
              outlined
              hide-dropdown-icon
            >
              <template v-slot:append>
                <q-icon size="xs" name="fa-solid fa-angle-down" />
              </template>
            </q-select>
          </div>

          <div class="col-auto q-pa-sm">
            <q-btn color="primary" flat label="save" :disable="isDisabled" />
          </div>
          <div class="col-auto q-pa-sm">
            <q-btn color="accent" label="save & edit" :disable="isDisabled" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

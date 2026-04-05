<script setup lang="ts">
import { useExperienceStore } from '@/stores/experience'
import { computed, reactive, ref } from 'vue'
import { useQuasar, type QForm } from 'quasar'
import useRules from '@/composition/rules'

const experienceStore = useExperienceStore()
const { requiredField } = useRules()
const $q = useQuasar()
const demoModeMutationMessage =
  'Demo mode is active. Add, create, and delete actions are disabled.'

const loading = ref(false)
const experienceForm = ref<QForm>()
const initialState = {
  name: '',
  description: '',
  thumbnail: '',
  tags: [],
  file: ref(null)
}
const experience = reactive({ ...initialState })

const isDisabled = computed(() => {
  return !(
    !!experience.name &&
    !!experience.description &&
    !!experience.file &&
    experience.tags.length > 0
  )
})

async function onSubmit() {
  try {
    loading.value = true
    await experienceStore.createExperience(experience)
    onReset()
  } catch (err: any) {
    showNotifs(false, err.message)
  } finally {
    loading.value = false
  }
}

async function onReset() {
  Object.assign(experience, initialState)
  experienceForm.value?.resetValidation()
  experienceForm.value?.reset()
}
function showNotifs(isAdded: boolean, message: string) {
  if (isAdded) {
    $q.notify({
      type: 'positive',
      message: message ? message : 'Experience Created Successfully'
    })
  } else {
    $q.notify({
      type: 'negative',
      message: message ? message : 'Oops, Try Later!'
    })
  }
}
</script>

<template>
  <div>
    <q-btn class="items-center" flat :to="{ name: 'home' }">
      <q-icon left size="xs" name="fa-solid fa-angle-left" />
      <div style="line-height: 0">Back</div>
    </q-btn>
    <q-card style="height: 80vh">
      <q-card-section>
        <div class="col-12 q-pl-md">
          <h6 class="q-my-md">Create New Experience</h6>
        </div>
        <q-separator />

        <q-banner
          v-if="true"
          class="bg-blue-1 text-primary q-mt-md q-mx-md"
          rounded
        >
          {{ demoModeMutationMessage }}
        </q-banner>

        <q-form ref="experienceForm" class="q-gutter-md">
          <div class="row q-px-md q-pt-md">
            <div class="col-8 q-py-sm">
              <q-input
                v-model="experience.name"
                outlined
                label="Experience Name"
                :rules="[requiredField()]"
              />
            </div>
            <div class="col-8 q-py-sm">
              <q-input
                v-model="experience.description"
                outlined
                type="textarea"
                label="Description"
                :rules="[requiredField()]"
              />
            </div>
            <div class="col-8 q-py-sm">
              <q-file
                outlined
                v-model="experience.file"
                :rules="[requiredField()]"
                accept=".jpg, .jpeg, .png, image/*"
                label="Thumbnail Upload"
              />
              <!-- <q-input
                v-model="experience.thumbnail"
                outlined
                label="Thumbnail"
                :rules="[requiredField()]"
              /> -->
            </div>
            <div class="col-8 q-py-sm">
              <q-select
                v-model="experience.tags"
                label="Experience Tags"
                input-debounce="0"
                new-value-mode="add-unique"
                outlined
                use-input
                use-chips
                multiple
                hide-dropdown-icon
                :rules="[requiredField()]"
              />
            </div>
            <div class="col-12 q-py-xl">
              <q-btn
                color="accent"
                label="New Experience"
                :disable="isDisabled || true"
                :loading="loading"
                @click="onSubmit"
              />
              <q-btn color="primary" label="Reset" flat @click="onReset" />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

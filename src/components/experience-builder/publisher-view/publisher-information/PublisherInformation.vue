<script setup lang="ts">
import useRules from '@/composition/rules'
import { useExperienceStore } from '@/stores/experience'
import { ref } from 'vue'

const experienceStore = useExperienceStore()
const { requiredField } = useRules()
const experience = ref({ ...experienceStore.currentExperience })

const onSave = async () => {
  experience.value = await experienceStore.updateExperienceInformation(
    experience.value.id,
    {
      name: experience.value.name,
      tenant: experience.value.tenant,
      category: experience.value.category,
      tags: experience.value.tags,
      gitSource: experience.value.gitSource,
      description: experience.value.description
    }
  )
}
</script>

<template>
  <q-card style="height: inherit">
    <q-card-section>
      <div class="row justify-between items-center">
        <div class="col q-my-md q-px-sm justifiy-start">
          <h6 class="q-my-none">Experience General Information</h6>
          <q-badge>version {{ experience.version }}</q-badge>
        </div>
        <div class="col-auto">
          <div class="row justify-between items-center">
            <div class="col-auto">
              <div class="text-caption text-weight-bold">Created Date:</div>
            </div>
            <div class="col-auto q-pl-sm">
              <div class="text-caption">
                {{ experience.createdAt }}
              </div>
            </div>
          </div>
          <div class="row justify-between items-center">
            <div class="col-auto">
              <div class="text-caption text-weight-bold">Published Date:</div>
            </div>
            <div class="col-auto q-pl-sm">
              <div class="text-caption">
                {{ experience.updatedAt }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <q-separator />

      <q-form ref="experienceForm">
        <div class="row q-mx-md q-pt-md justify-between">
          <div class="col-12 q-py-xs q-ma-none">
            <q-input
              v-model="experience.name"
              outlined
              label="Experience Name"
              :rules="[requiredField()]"
            />
          </div>
          <div class="col-6 q-py-xs q-pr-xs q-ma-none">
            <q-input
              v-model="experience.tenant"
              outlined
              label="Author"
              :rules="[requiredField()]"
            />
          </div>
          <div class="col-6 q-py-xs q-pl-xs q-ma-none">
            <q-select
              v-model="experience.category"
              :options="['Option 1', 'Option 2']"
              outlined
              hide-dropdown-icon
              label="Category"
            >
              <template v-slot:append>
                <q-icon size="xs" name="fa-solid fa-angle-down" />
              </template>
            </q-select>
          </div>
          <div class="col-12 q-py-xs q-ma-none">
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
          <div class="col-12 q-py-xs q-ma-none">
            <q-input
              v-model="experience.gitSource"
              outlined
              label="Git Repository Link"
              :rules="[requiredField()]"
            />
          </div>
          <div class="col-12 q-py-xs q-ma-none">
            <q-input
              v-model="experience.description"
              outlined
              type="textarea"
              label="Description"
              :rules="[requiredField()]"
            />
          </div>
          <div class="col-12">
            <q-btn @click="onSave" color="accent" label="save" />
          </div>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import router from '@/router'
import { useExperienceStore } from '@/stores/experience'
import { useQuasar } from 'quasar'
import { ref } from 'vue'

const $q = useQuasar()

const items: any[] = [
  { action: 'delete', icon: 'fa-solid fa-trash' }
  // { action: 'info', icon: 'fa-solid fa-info' }
]

const experienceStore = useExperienceStore()

const deleteDialog = ref(false)

async function executeAction(item: any) {
  switch (item.action) {
    case 'delete':
      deleteDialog.value = true
      break
    case 'info':
      break
    default:
      break
  }
}

async function confirmDelete() {
  experienceStore
    .deleteExperience(experienceStore.currentExperience.id)
    .then((resp) => {
      if (resp == 200) {
        router.push('/')
        $q.notify({
          type: 'positive',
          message: 'Experience Deleted Successfully'
        })
      } else {
        $q.notify({
          type: 'negative',
          message: 'Oops, Try again'
        })
      }
    })
}
</script>
<template>
  <div class="row">
    <div class="col" v-for="item in items" :key="item">
      <q-btn
        flat
        round
        size="sm"
        :icon="item.icon"
        @click="executeAction(item)"
      />
    </div>
  </div>
  <q-dialog v-model="deleteDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="fa-solid fa-trash" color="red" text-color="white" />
        <span class="q-ml-sm text-subtitle1"
          >Are you sure you want to delete the current experience?</span
        >
      </q-card-section>

      <q-card-actions align="right">
        <q-btn class="text-subtitle2" flat label="Cancel" v-close-popup />
        <q-btn
          class="text-subtitle2 text-weight-bold"
          flat
          label="Delete"
          color="red"
          @click="confirmDelete()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

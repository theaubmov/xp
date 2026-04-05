<script setup lang="ts">
import { useExperienceStore } from '@/stores/experience'
import { useQuasar } from 'quasar'
import { ref } from 'vue'

const $q = useQuasar()
const demoModeMutationMessage =
  'Demo mode is active. Add, create, and delete actions are disabled.'

const items: any[] = [
  { action: 'delete', icon: 'fa-solid fa-trash' }
  // { action: 'info', icon: 'fa-solid fa-info' }
]

const experienceStore = useExperienceStore()

const deleteDialog = ref(false)

async function executeAction(item: any) {
  if (item.action === 'delete') {
    $q.notify({
      type: 'warning',
      message: demoModeMutationMessage
    })
    return
  }

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
  $q.notify({
    type: 'warning',
    message: demoModeMutationMessage
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
        disable
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
          disable
          @click="confirmDelete()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

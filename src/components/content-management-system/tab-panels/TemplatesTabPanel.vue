<script async setup lang="ts">
import { useQuasar } from 'quasar'
import DeleteModal from '../modal/DeleteModal.vue'
import useFormatTime from '@/composition/format-time'
import { useTemplateStore } from '@/stores/template'
import { onMounted, ref } from 'vue'

const templateStore = useTemplateStore()
const search = ref('')
const deleteDialog = ref(false)
const currentDeleteId = ref('')
const $q = useQuasar()
const { fromMillisToDAteTimeString } = useFormatTime()

async function searchQueries() {
  const { value } = search
  if (!value) {
    templateStore.getTemplates(0)
  } else {
    templateStore.searchTemplates(value, 0)
  }
}

function OnChangePage(val: number) {
  const { value } = search
  if (!value) {
    templateStore.getTemplates(val - 1)
  } else {
    templateStore.searchTemplates(value, val - 1)
  }
}

onMounted(() => {
  templateStore.getTemplates(0)
})

async function openDeleteDialogue(id: string) {
  currentDeleteId.value = id
  deleteDialog.value = true
}
async function deleteTemplate() {
  templateStore.deleteTemplate(currentDeleteId.value).then((response) => {
    if (response == 200 || response === 202) {
      $q.notify({
        type: 'positive',
        message: 'Template Deleted Successfully'
      })
      templateStore.getTemplates(templateStore.currentPage - 1)
    } else {
      $q.notify({
        type: 'negative',
        message: 'Oops, Try again'
      })
    }
  })
  deleteDialog.value = false
}
</script>
<template>
  <div class="row q-py-md items-center justify-between">
    <div class="col-auto">
      <q-btn flat disable>
        <q-icon left size="xs" name="fa-solid fa-filter" />
        <div class="col-auto" style="line-height: 0">Add Filters</div>
      </q-btn>
    </div>
    <div class="col-3">
      <q-input
        v-model="search"
        color="primary"
        bg-color="grey-2"
        dense
        outlined
        placeholder="Search"
        debounce="500"
        @update:model-value="searchQueries"
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
    class="q-pa-md row text-subtitle1"
    style="height: calc(100vh - 350px)"
    v-if="templateStore.onLoadingTemplate"
  >
    Loading...
  </div>
  <div
    class="q-pa-md row text-subtitle1"
    style="height: calc(100vh - 350px)"
    v-if="
      !templateStore.onLoadingTemplate && templateStore.templates.length === 0
    "
  >
    No Record Found...
  </div>
  <div
    class="q-pa-md row items-center scroll"
    style="height: 65vh"
    v-if="
      !templateStore.onLoadingTemplate && templateStore.templates.length > 0
    "
  >
    <template v-for="tmp in templateStore.templates" :key="tmp.name">
      <div class="col-3 q-mb-md">
        <q-card class="my-card q-mb-md">
          <q-img :src="tmp.thumbnail" :ratio="16 / 9" />
          <q-card-section>
            <div class="row items-center">
              <div class="col-9">
                <q-item-label class="text-h6 limit"
                  >{{ tmp.name }}
                </q-item-label>
              </div>
              <div class="row col-3 justify-end">
                <q-badge
                  outline
                  color="red"
                  label="Not Active"
                  v-if="!tmp.status"
                />
                <q-badge
                  outline
                  color="teal"
                  label="Active"
                  v-if="tmp.status"
                />
              </div>
            </div>
            <q-item-label caption>
              Last Updated {{ fromMillisToDAteTimeString(tmp.updatedAt) }}
            </q-item-label>
          </q-card-section>
          <q-separator />

          <q-card-actions align="right">
            <q-btn
              flat
              round
              size="10px"
              color="grey-8"
              icon="fa-solid fa-eye"
            />
            <q-btn
              flat
              round
              size="10px"
              color="grey-8"
              icon="fa-solid fa-pen-to-square"
            />
            <q-btn
              flat
              round
              disable
              size="10px"
              color="grey-8"
              icon="fa-solid fa-trash"
              @click="openDeleteDialogue(tmp.id)"
            />
          </q-card-actions>
        </q-card>
      </div>
    </template>
  </div>
  <div class="q-px-lg q-pt-lg flex flex-center text-h4" style="width: 100%">
    <q-pagination
      v-model="templateStore.currentPage"
      :max="templateStore.totalPages"
      :max-pages="10"
      boundary-numbers
      @update:model-value="(val) => OnChangePage(val)"
      :disable="templateStore.onLoadingTemplate"
    />
  </div>
  <delete-modal
    title="Are you sure you want to delete this template?"
    :modelValue="deleteDialog"
    @update:modelValue="deleteDialog"
    @on-close="
      () => {
        deleteDialog = false
      }
    "
    @on-delete="deleteTemplate"
  ></delete-modal>
</template>
<style scoped>
.limit {
  width: 180px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.my-card {
  width: 90%;
  justify-content: center;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import nextzen from '@/assets/svg/nextzen_select.svg'
import { ExperienceSimplified } from '@/helpers/experience-simplified'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  experienceSimplified: {
    type: ExperienceSimplified,
    required: true
  }
})
const model = ref(props.experienceSimplified.status)
const listSlide = ref(props.experienceSimplified.listSlideItem)
const slide = ref(
  listSlide.value.length ? props.experienceSimplified.listSlideItem[0].id : null
)
const emit = defineEmits<{
  (e: 'publish', id: string, value: string): void
}>()
function emitPublishExperience() {
  emit('publish', props.experienceSimplified.id, model.value)
}
async function editExprience(id: string) {
  router.push({ path: '/experience-builder/journey', query: { id: id } })
}
</script>

<template>
  <q-card class="my-card fit">
    <div>
      <q-carousel
        v-if="experienceSimplified.listSlideItem.length > 0"
        animated
        v-model="slide"
        :arrows="experienceSimplified.listSlideItem.length > 1"
        height="260px"
        :navigation="experienceSimplified.listSlideItem.length > 1"
        infinite
      >
        <template
          v-for="item in experienceSimplified.listSlideItem"
          :key="item.id"
        >
          <q-carousel-slide :name="item.id" :img-src="item.thumbnail" />
        </template>
      </q-carousel>
      <q-img
        v-else
        :src="experienceSimplified.thumbnail"
        height="260px"
        width="100%"
      >
      </q-img>
      <q-btn
        class="absolute"
        size="sm"
        color="white"
        text-color="black"
        icon="fa-solid fa-pen-to-square"
        @click="editExprience(experienceSimplified.id)"
        style="top: 5px; right: 5px"
      />
    </div>
    <div class="column">
      <div class="col-auto">
        <q-card-section>
          <div class="row wrap">
            <div class="col q-pr-sm">
              <div class="text-h6 experience-title">
                {{ experienceSimplified.name }}
              </div>
              <div class="text-subtitle2">
                {{ experienceSimplified.tenant }}
              </div>
            </div>
            <div class="col-auto">
              <q-btn-toggle
                v-model="model"
                @click="emitPublishExperience"
                spread
                no-caps
                toggle-color="primary"
                color="white"
                text-color="black"
                :options="[
                  { label: 'Draft', value: 'draft' },
                  { label: 'Publish', value: 'publish' }
                ]"
              />
            </div>
          </div>
        </q-card-section>
      </div>
      <div class="col">
        <q-card-section
          class="q-pt-none"
          style="min-height: 145px; max-height: 145px"
        >
          <div class="row wrap">
            <div class="col-7 experience-description text-justify">
              {{ experienceSimplified.description }}
            </div>
            <div class="col-5">
              <div class="row justify-end">
                <div
                  class="col-auto"
                  v-for="item in experienceSimplified.listActionItem"
                  :key="item.icon"
                >
                  <q-btn
                    flat
                    round
                    size="sm"
                    :icon="item.icon"
                    :disable="!item.url"
                    :href="item.url"
                  />
                </div>
              </div>
              <div class="row justify-end">
                <div
                  class="col-auto"
                  v-for="item in experienceSimplified.listOrentationItem"
                  :key="item.icon"
                >
                  <q-btn
                    flat
                    round
                    size="sm"
                    :icon="item.icon"
                    :disable="!item.isActive"
                  />
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </div>
      <div class="col-auto">
        <q-separator />
        <q-card-actions class="row justify-between">
          <div class="col-auto">
            <q-btn flat size="sm">
              <img :src="nextzen" width="100" />
            </q-btn>
          </div>
          <div class="col">
            <div class="row justify-end">
              <div
                class="col-auto"
                v-for="item in experienceSimplified.listConfigurationItem"
                :key="item.icon"
              >
                <q-btn
                  flat
                  round
                  size="sm"
                  :icon="item.icon"
                  :disable="!item.isActive"
                />
              </div>
            </div>
          </div>
        </q-card-actions>
      </div>
    </div>
  </q-card>
</template>
<style lang="scss" scoped>
.carousel-control {
  background: white;
  padding: 4px 6px;
}
.experience-description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
}
.experience-title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>

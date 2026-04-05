<script setup lang="ts">
import { ref } from 'vue'
const model = ref(null)
</script>
<template>
  <div class="row q-gutter-md items-center justify-center">
    <div class="col-auto">
      <q-select
        outlined
        v-model="model"
        dense
        use-input
        use-chips
        multiple
        hide-dropdown-icon
        new-value-mode="add"
        style="width: 20vw"
      >
        <template v-slot:prepend>
          <q-icon
            name="fa-solid fa-magnifying-glass"
            size="xs"
            @click.stop.prevent
          />
        </template>
        <template v-slot:append>
          <q-icon
            name="fa-solid fa-xmark"
            size="xs"
            @click.stop.prevent="model = null"
            class="cursor-pointer"
          />
        </template>
      </q-select>
    </div>

    <div class="col-auto">
      <q-btn color="primary" class="q-px-md" label="Search" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BaseHeader from '@/components/global/base-header/BaseHeader.vue'
import SideBar from '@/components/global/sidebar/SideBar.vue'

const route = useRoute()
const isEmbeddedRoute = computed(() => !!route.meta.embedded)
</script>

<template>
  <div v-if="isEmbeddedRoute">
    <RouterView />
  </div>
  <div v-else>
    <q-layout view="hHh Lpr lff" container class="app-shell">
      <base-header></base-header>
      <side-bar></side-bar>
      <q-page-container>
        <q-page class="app-page q-pa-sm">
          <RouterView />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<style lang="scss">
@import '@/assets/base.scss';

.app-shell {
  height: 100vh;
  background: #fafafa;
}

.app-page {
  background: #fafafa;
}
</style>

<script setup lang="ts">
import underConstruction from '@/assets/img/underConstruction.png'
</script>

<template>
  <div class="row q-pa-md justify-center q-gutter-md fit">
    <div class="col my-card">
      <q-img :src="underConstruction" spinner-color="white" />
      <div class="q-mt-lg">
        <p class="under-construction">Coming Soon</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 450px;
  min-height: 450px;
}
.under-construction {
  font-family: 'Roboto', sans-serif !important;
  font-weight: 500;
  font-size: 38px;
  color: #0077d0;
  text-align: center;
  letter-spacing: 0.1em;
}
</style>

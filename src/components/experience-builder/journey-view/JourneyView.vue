<script setup lang="ts">
import JourneySideBar from './journey-sidebar/JourneySideBar.vue'
import JourneyMindMaper from './journey-mind-maper/JourneyMindMaper.vue'
</script>
<template>
  <div class="row q-my-md" style="height: 78vh">
    <div class="col-9">
      <journey-mind-maper></journey-mind-maper>
    </div>
    <div class="col-3">
      <journey-side-bar></journey-side-bar>
    </div>
  </div>
</template>
<style>
.vue-flow__edges {
  overflow: visible !important;
  pointer-events: none;
}
</style>

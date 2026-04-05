<script setup lang="ts">
import PublisherInformation from './publisher-information/PublisherInformation.vue'
import PlatformDiviceSupported from './platform-device-supported/PlatformDiviceSupported.vue'
import CollateralMedia from './collateral/CollateralMedia.vue'
</script>
<template>
  <Suspense>
    <div class="row q-my-md" style="height: 70vh">
      <div class="col-6 q-pr-sm">
        <publisher-information></publisher-information>
      </div>
      <div class="col-6 q-pl-sm">
        <platform-divice-supported></platform-divice-supported>
        <collateral-media></collateral-media>
      </div>
    </div>
  </Suspense>
</template>

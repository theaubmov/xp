<script setup lang="ts"></script>

<template>
  <q-card class="my-card">
    <q-skeleton height="150px" />
    <div class="q-pa-sm">
      <div class="row justify-between">
        <div class="col-6">
          <q-skeleton type="text" width="80%" />
          <q-skeleton type="text" width="80%" />
        </div>
        <div class="col-4">
          <q-skeleton type="QBtn" width="100%" />
        </div>
      </div>
    </div>
    <div class="q-pa-sm">
      <div class="row justify-between">
        <div class="col-7">
          <q-skeleton type="text" width="100%" />
          <q-skeleton type="text" width="100%" />
        </div>
        <div class="col-4">
          <div class="row justify-end">
            <q-skeleton
              v-for="i in 6"
              :key="i"
              type="circle"
              size="17px"
              class="q-mx-xs"
            />
          </div>
          <div class="row q-pt-xs justify-end">
            <q-skeleton
              v-for="i in 2"
              :key="i"
              type="circle"
              size="17px"
              class="q-mx-xs"
            />
          </div>
        </div>
      </div>
    </div>
    <q-separator />
    <q-card-actions class="justify-between">
      <div class="col-6">
        <q-skeleton type="QBtn" width="80%" />
      </div>
      <div class="col">
        <div class="row justify-end">
          <q-skeleton
            v-for="i in 6"
            :key="i"
            type="circle"
            size="17px"
            class="q-mx-xs"
          />
        </div>
      </div>
    </q-card-actions>
  </q-card>
</template>
<style lang="scss" scoped>
.carousel-control {
  background: white;
  padding: 4px 6px;
}
</style>

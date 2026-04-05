<script setup lang="ts">
import gaianLogo from '@/assets/img/mobius.png'
</script>
<template>
  <q-header class="border-bottom bg-header">
    <!-- <q-header class="border-bottom bg-white"> -->
    <div class="q-pa-md">
      <div class="row justify-between">
        <div class="mobius-logo navbar-brand d-flex">
          <a href="/">
            <img
              :src="gaianLogo"
              width="100"
              height="40"
              alt="Gaian Solutions Logo"
              class="filter"
            />
            <div class="row inline-block q-pl-md">
              <h3 class="orchestrator">EXPERIENCE BUILDER</h3>
              <div class="tagline">DESIGN. DELIGHT. DISCOVER</div>
            </div>
          </a>
        </div>
        <!-- <div class="col-auto">
          <div class="row">
            <div class="col-2">
              <q-img :src="gaianLogo" spinner-color="white" width="50" />
            </div>
            <div class="col">
              <div class="row">
                <span class="q-pl-md brand-name"> EXPERIENCE BUILDER </span>
                <span class="sub-title">DESIGN. DELIGHT. DISCOVER.</span>
              </div>
            </div>
          </div>
        </div> -->
        <div class="col-auto q-pr-md padding-0">
          <div class="row">
            <div class="col-auto">
              <q-btn round>
                <q-avatar>
                  <q-img class="white" :src="gaianLogo" fit="fill" />
                </q-avatar>
              </q-btn>
            </div>
            <div class="col-auto q-pl-md role-disply-text">
              <div class="row">
                <span class="span-title">Julie Sochay</span>
              </div>
              <div class="row">
                <span>Gaian Solutions Pvt Ltd</span>
              </div>
              <div class="row">
                <span>UX Designer</span>
              </div>
            </div>
            <div class="col-auto q-pl-md role-disply-text">
              <div class="row">
                <q-btn flat round color="white" icon="fa-solid fa-bars" />
                <q-menu auto-close>
                  <q-list style="min-width: 100px">
                    <q-item clickable v-close-popup>
                      <q-item-section>Sign in</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>Sign up</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>Sign out</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-header>
</template>
<style scoped lang="scss">
.bg-header {
  background-image: linear-gradient(to right, #00a0fe, #1de9de) !important;
}
.border-bottom {
  // border-bottom: 1px solid #dee2e6 !important;
}
.header-margin {
  margin-inline: 1.5rem;
}
.brand-name {
  font-weight: 500;
  font-size: 24px;
  line-height: 124.52%;
  color: $primary !important;
  align-self: center;
  letter-spacing: 0.1em;
}
.sub-title {
  font-weight: 300;
  font-size: 14px;
  line-height: 100%;
  color: $grey-text !important;
  align-items: center;
  letter-spacing: 0.48em;
  padding-left: 20px;
}
.role-disply-text .row span {
  max-width: 300px;
  font-size: 13px;
  line-height: 1.23;
  letter-spacing: -0.3px;
  margin: 0px;
  // color: $grey-text !important;
  color: white !important;
}
.span-title {
  font-size: 14px;
  font-weight: bold;
}
.orchestrator {
  font-family: 'Roboto', sans-serif !important;
  padding: 0;
  margin: 0;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 124.52%;
  // color: #0077d0;
  color: white !important;
  align-self: center;
  letter-spacing: 0.1em;
  padding-inline: 1rem !important;
  margin-top: 0.5rem !important;
}
.tagline {
  // color: #555252e6;
  color: white !important;
  font-weight: 300;
  font-size: 14px;
  line-height: 50%;
  align-items: center;
  letter-spacing: 0.3em;
  margin-block: 0.5rem !important;
}
.padding-0 {
  padding: 0;
  align-self: center;
}
h3.orchestrator {
  padding-inline: 0 !important;
}
img.filter {
  filter: brightness(0) invert(1);
}
.q-avatar {
  background: white;
}
.q-btn--actionable.q-btn--standard::before {
  box-shadow: unset !important;
}
</style>

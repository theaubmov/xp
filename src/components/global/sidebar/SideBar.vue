<script setup lang="ts">
import icondegree from '@/assets/img/360-degrees.png'
import icondegreeSmall from '@/assets/img/360-degrees-small.png'
import icondegree360 from '@/assets/img/2277339.png'
import type { MenuItem } from '@/interfaces/menu-item.interface'
const items: MenuItem[] = [
  // {
  //   icon: 'fa-solid fa-house-chimney',
  //   title: 'Home',
  //   selected: true,
  //   to: '/'
  // },
  // {
  //   icon: 'fa-solid fa-house-laptop',
  //   title: 'Experiences',
  //   selected: true,
  //   to: '/experiences'
  // },
  {
    icon: 'fa-solid fa-house-chimney',
    title: 'Home',
    selected: true,
    to: '/'
  },
  // {
  //   icon: 'fa-solid fa-shopping-cart',
  //   title: 'Collabrations',
  //   selected: false,
  //   to: '/collab'
  // },
  {
    icon: 'fa-solid fa-bookmark',
    title: 'CMS',
    selected: false,
    to: '/cms'
  },
  {
    icon: 'fa-solid fa-table-columns',
    title: '360° CX',
    selected: false,
    to: '/experience-builder/journey'
  },
  {
    icon: 'fa-solid fa-edit',
    title: 'Designer',
    selected: false,
    to: '/designer'
  },
  {
    icon: 'fa-solid fa-gear',
    title: 'Settings',
    selected: false,
    to: '/settings'
  }
  // {
  //   icon: 'fa-solid fa-layer-group',
  //   title: 'Collaborations',
  //   selected: false,
  //   to: '/collaborations'
  // },
  // {
  //   icon: 'fa-solid fa-gear',
  //   title: 'Settings',
  //   selected: false,
  //   to: '/setting'
  // }
]
</script>
<template>
  <!-- <q-drawer show-if-above :width="120" bordered class="white"> -->
  <q-drawer show-if-above :width="120" bordered class="bg-sidebar">
    <q-scroll-area class="fit">
      <q-list>
        <router-link
          v-for="item in items"
          :key="item.icon"
          :to="item.to"
          style="text-decoration: none"
        >
          <div class="column q-py-md nav-link degree">
            <div class="col self-center" v-if="item.title != '360° CX'">
              <q-avatar size="40px" :icon="item.icon" />
            </div>
            <div class="col self-center degree" v-else>
              <q-img :src="icondegree360" style="height: 30px; width: 30px" />
            </div>
            <div class="col self-center">
              <span class="text-center">{{ item.title }}</span>
            </div>
          </div>
        </router-link>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<style lang="scss">
.nav-link {
  color: black;
  transition: 0.4s;
}
.nav-link:hover {
  background-color: $primary;
  color: white;
}
.router-link-active .nav-link {
  background-color: $primary;
  i,
  span {
    color: white;
  }
}
.bg-sidebar {
  background-image: linear-gradient(#00a0fe, #1de9de);
}
.degree:hover {
  img {
    filter: brightness(0) invert(1) !important;
  }
}
.router-link-active .nav-link .degree {
  filter: brightness(0) invert(1) !important;
}
</style>

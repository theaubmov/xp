<script setup lang="ts">
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
  <q-drawer show-if-above :width="94" bordered class="app-sidebar">
    <q-scroll-area class="fit">
      <q-list class="shell-nav">
        <router-link
          v-for="item in items"
          :key="item.icon"
          :to="item.to"
          class="shell-nav-item"
        >
          <div class="shell-link" :class="{ degree: item.title === '360° CX' }">
            <div class="shell-link-inner">
              <div v-if="item.title != '360° CX'" class="shell-icon-wrap">
                <q-icon :name="item.icon" class="shell-icon" />
              </div>
              <div v-else class="shell-icon-wrap">
                <q-img :src="icondegree360" class="degree-icon" fit="contain" />
              </div>
              <span class="shell-label">{{ item.title }}</span>
            </div>
          </div>
        </router-link>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<style lang="scss">
.app-sidebar {
  background: #eef1f4;
  border-right: 1px solid rgba(15, 23, 42, 0.08);
}

.shell-nav {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.5rem 0.45rem;
}

.shell-nav-item {
  text-decoration: none;
  color: inherit;
}

.shell-link {
  display: block;
  width: 100%;
  border-radius: 10px;
  color: rgba(17, 24, 39, 0.72);
  transition: background-color 160ms ease, color 160ms ease, box-shadow 160ms ease;
}

.shell-link-inner {
  display: grid;
  justify-items: center;
  align-items: center;
  gap: 0.22rem;
  min-height: 72px;
  padding: 0.45rem 0.25rem;
}

.shell-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 24px;
}

.shell-icon {
  font-size: 1.15rem;
}

.degree-icon {
  width: 24px;
  height: 24px;
}

.shell-label {
  font-size: 0.6rem;
  font-weight: 600;
  line-height: 1.05;
  text-align: center;
  color: currentColor;
}

.shell-link:hover {
  background: rgba(255, 255, 255, 0.68);
  color: #111827;
}

.router-link-active .shell-link {
  background: #ffffff;
  color: #111827;
  border-radius: 14px;
  box-shadow: 0 3px 8px rgba(15, 23, 42, 0.07);
}

.router-link-active .degree-icon,
.shell-link.degree:hover .degree-icon {
  filter: brightness(0.2);
}
</style>

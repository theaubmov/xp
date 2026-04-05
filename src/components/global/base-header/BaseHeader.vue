<script setup lang="ts">
import hgrLogo from '@/assets/img/hgr-logo.png'
import faviconLogo from '@/assets/img/favicon.png'
</script>
<template>
  <q-header class="app-header">
    <div class="header-shell">
      <div class="header-nav">
        <div class="brand-lockup">
          <a href="/">
            <img :src="hgrLogo" alt="HGR Logo" class="brand-logo" />
          </a>
          <div class="brand-copy">
            <h3 class="brand-title">EXPERIENCE BUILDER</h3>
            <div class="tagline">DESIGN. DELIGHT. DISCOVER</div>
          </div>
        </div>
        <div class="profile-block">
          <q-btn round flat class="avatar-button">
            <q-avatar class="shell-avatar">
              <q-img :src="faviconLogo" fit="contain" />
            </q-avatar>
          </q-btn>
          <div class="profile-copy">
            <span class="profile-name">Jane Doe</span>
            <span class="profile-company">HGR Solutions</span>
            <span class="profile-role">UX Designer</span>
          </div>
          <div class="menu-wrap">
            <q-btn flat round class="header-menu" icon="fa-solid fa-bars">
              <q-menu auto-close class="header-dropdown">
                <q-list style="min-width: 140px">
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
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </q-header>
</template>
<style scoped lang="scss">
.app-header {
  background: #eef1f4;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  color: #111827;
}

.header-shell {
  padding: 0.85rem 1.5rem;
}

.header-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  min-height: 72px;
}

.brand-lockup {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  min-width: 0;
}

.brand-lockup a {
  display: inline-flex;
  align-items: center;
}

.brand-logo {
  display: block;
  width: auto;
  height: 34px;
}

.brand-copy {
  display: grid;
  gap: 0.2rem;
}

.brand-title {
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
  font-weight: 300;
  font-size: 1.45rem;
  line-height: 1.05;
  letter-spacing: 0.08em;
  color: #111827;
}

.tagline {
  font-size: 0.58rem;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.42em;
  color: rgba(17, 24, 39, 0.58);
}

.profile-block {
  display: flex;
  align-items: center;
  gap: 0.9rem;
}

.avatar-button {
  padding: 0;
}

.shell-avatar {
  width: 44px;
  height: 44px;
  background: #ffffff;
}

.profile-copy {
  display: grid;
  gap: 0.15rem;
}

.profile-name {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.1;
  color: #111827;
}

.profile-company,
.profile-role {
  font-size: 0.8rem;
  line-height: 1.2;
  color: rgba(17, 24, 39, 0.62);
}

.menu-wrap {
  display: flex;
  align-items: center;
}

.header-menu {
  width: 2.6rem;
  height: 2.6rem;
  color: #111827;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: transparent;
}

.header-menu:hover {
  background: rgba(15, 23, 42, 0.04);
}

.header-dropdown {
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.12);
}

:deep(.q-btn:before) {
  box-shadow: none;
}

@media (max-width: 960px) {
  .header-shell {
    padding: 0.75rem 1rem;
  }

  .brand-title {
    font-size: 1.1rem;
  }

  .tagline,
  .profile-role {
    display: none;
  }
}

@media (max-width: 720px) {
  .profile-company {
    display: none;
  }

  .header-nav {
    gap: 0.75rem;
  }
}
</style>

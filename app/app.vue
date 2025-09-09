<template>
  <div id="app" :class="themeClass">
    <NuxtRouteAnnouncer />
    <TheHeader @toggleMobileMenu="showMobileMenu = !showMobileMenu" />
    <MobileSidebar 
      :show="showMobileMenu" 
      @close="showMobileMenu = false"
    />
    <main class="main-container">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

// 移动端侧边菜单状态
const showMobileMenu = ref(false)

const themeClass = computed(() => ({
  'theme-dark': colorMode.value === 'dark',
  'theme-light': colorMode.value === 'light',
  'theme-blue': colorMode.value === 'blue'
}))
</script>

<style>
/* @import './assets/css/main.css'; */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: var(--bg-primary-85);
  min-height: 100vh;
  color: var(--text-primary-100);
  /* transition: all 0.3s ease; */
}

.theme-light body {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
}

.theme-blue body {
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%);
}

#app {
  min-height: 100vh;
}

.main-container {
  padding: 0;
}

</style>

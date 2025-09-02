<template>
  <div id="app" :class="themeClass">
    <NuxtRouteAnnouncer />
    <TheHeader 
      v-model:activeType="activeType" 
      v-model:activeCategory="activeCategory" 
      @toggleMobileMenu="showMobileMenu = !showMobileMenu"
    />
    <MobileSidebar 
      :show="showMobileMenu" 
      :activeType="activeType"
      :activeCategory="activeCategory"
      @close="showMobileMenu = false"
      @update:activeType="activeType = $event"
      @update:activeCategory="activeCategory = $event"
    />
    <main class="main-container">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
import type { PromptType, PromptCategory } from '~/types'

const colorMode = useColorMode()

// 全局状态管理activeType和activeCategory
const activeType = ref<PromptType>('text')
const activeCategory = ref<PromptCategory | 'all'>('all')

// 移动端侧边菜单状态
const showMobileMenu = ref(false)

// 提供给子组件使用
provide('activeType', activeType)
provide('activeCategory', activeCategory)

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

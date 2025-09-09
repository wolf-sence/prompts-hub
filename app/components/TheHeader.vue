<template>
  <!-- 桌面端头部 -->
  <header class="header desktop-header">
    <div class="header-container">
      <div class="header-left">
        <h1 class="logo">
          <AppIcon name="heroicons:sparkles" variant="brand" size="xl" />
          Smart Prompts
        </h1>
      </div>

      <div class="header-right">
        <button class="theme-toggle" @click="cycleTheme">
          <AppIcon :name="themeIcon" size="lg" />
        </button>
      </div>
    </div>
  </header>

  <!-- 移动端菜单按钮 -->
  <div class="mobile-menu-trigger">
    <button class="menu-btn" @click="$emit('toggleMobileMenu')">
      <AppIcon name="heroicons:bars-3" size="lg" />
    </button>
  </div>
</template>

<script setup lang="ts">
interface Emits {
  (e: 'toggleMobileMenu'): void
}

defineEmits<Emits>()

const { $colorMode } = useNuxtApp()
const { startCircleTransition } = useViewTransition()

const themes = [
  { name: 'dark', icon: 'heroicons:moon' },
  { name: 'light', icon: 'heroicons:sun' },
]

const currentThemeIndex = computed(() => {
  return themes.findIndex(theme => theme.name === $colorMode.value)
})

const themeIcon = computed(() => {
  return themes[currentThemeIndex.value]?.icon || 'heroicons:moon'
})

const cycleTheme = (event: MouseEvent) => {
  const nextIndex = (currentThemeIndex.value + 1) % themes.length
  const nextTheme = themes[nextIndex]?.name

  if (!nextTheme) return

  // 使用圆形扩散动画进行主题切换
  const toDark = nextTheme === 'dark'
  startCircleTransition(() => {
    $colorMode.preference = nextTheme
  }, event, toDark)
}
</script>

<style scoped>
.header {
  background: var(--bg-primary-85);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-primary-10);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 1rem;
}

.header-left {
  flex-shrink: 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary-100);
  text-decoration: none;
}

.header-right {
  flex-shrink: 0;
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: none;
  background: var(--bg-primary-40);
  border: 1px solid var(--border-primary-10);
  border-radius: 12px;
  color: var(--text-primary-70);
  cursor: pointer;
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  background: var(--hover);
  color: var(--text-primary-100);
  border-color: var(--border-blue);
}

/* 移动端菜单按钮 */
.mobile-menu-trigger {
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 999;
}

.menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: none;
  background: var(--bg-primary-40);
  border: 1px solid var(--border-primary-10);
  border-radius: 12px;
  color: var(--text-primary-70);
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.menu-btn:hover {
  background: var(--hover);
  color: var(--text-primary-100);
  border-color: var(--border-blue);
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
}

@media (max-width: 768px) {
  .desktop-header {
    display: none;
  }

  .mobile-menu-trigger {
    display: block;
  }
}

</style>

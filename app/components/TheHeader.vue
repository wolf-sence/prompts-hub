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

      <nav class="nav-tabs">
        <button
          v-for="type in promptTypes"
          :key="type.value"
          :class="['nav-tab', { active: activeType === type.value }]"
          @click="setActiveType(type.value)"
        >
          <AppIcon :name="type.icon" size="lg" />
          {{ type.label }}
        </button>
      </nav>

      <!-- <div class="category-filters" v-if="categories.length > 0">
        <button
          v-for="category in categories"
          :key="category.value"
          :class="['category-btn', { active: activeCategory === category.value }]"
          @click="setActiveCategory(category.value)"
        >
          {{ category.label }}
        </button>
      </div> -->

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
import type { PromptType, PromptCategory } from '~/types'

interface Props {
  activeType: PromptType
  activeCategory: PromptCategory | 'all'
}

interface Emits {
  (e: 'update:activeType', value: PromptType): void
  (e: 'update:activeCategory', value: PromptCategory | 'all'): void
  (e: 'toggleMobileMenu'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { $colorMode } = useNuxtApp()
const { startCircleTransition } = useViewTransition()

const promptTypes = [
  { value: 'text' as PromptType, label: '文本生成', icon: 'heroicons:document-text' },
  { value: 'image' as PromptType, label: '图片生成', icon: 'heroicons:photo' },
  { value: 'video' as PromptType, label: '视频生成', icon: 'heroicons:film' }
]

const categories = computed(() => {
  if (props.activeType === 'text') {
    return [
      { value: 'all' as const, label: '全部' },
      { value: 'funny' as const, label: '趣味' },
      { value: 'efficiency' as const, label: '效率' }
    ]
  } else if (props.activeType === 'image') {
    return [
      { value: 'all' as const, label: '全部' },
      { value: 'image' as const, label: '图片' }
    ]
  }
  return []
})

const themes = [
  { name: 'dark', icon: 'heroicons:moon' },
  { name: 'light', icon: 'heroicons:sun' },
  // { name: 'blue', icon: 'heroicons:swatch' }
]

const currentThemeIndex = computed(() => {
  return themes.findIndex(theme => theme.name === $colorMode.value)
})

const themeIcon = computed(() => {
  return themes[currentThemeIndex.value]?.icon || 'heroicons:moon'
})

const setActiveType = (type: PromptType) => {
  emit('update:activeType', type)
  // 切换类型时重置分类为全部
  emit('update:activeCategory', 'all')
}

const setActiveCategory = (category: PromptCategory | 'all') => {
  emit('update:activeCategory', category)
}

const cycleTheme = (event: MouseEvent) => {
  const nextIndex = (currentThemeIndex.value + 1) % themes.length
  const nextTheme = themes[nextIndex]?.name

  if (!nextTheme) return

  // 使用圆形扩散动画进行主题切换
  startCircleTransition(() => {
    $colorMode.preference = nextTheme
  }, event, nextTheme === 'dark')
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
  padding: 0.5rem 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.category-filters {
  display: flex;
  gap: 0.5rem;
  background: var(--bg-primary-40);
  padding: 0.25rem;
  border-radius: 8px;
  border: 1px solid var(--border-primary-10);
}

.category-btn {
  padding: 0.25rem 0.5rem;
  border: none;
  background: transparent;
  color: var(--text-primary-70);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  font-weight: 500;
}

.category-btn:hover {
  background: var(--hover-primary-5);
  color: var(--text-primary-100);
}

.category-btn.active {
  background: var(--border-blue-primary);
  color: white;
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

.nav-tabs {
  display: flex;
  gap: 0.5rem;
  background: var(--bg-primary-40);
  padding: 4px;
  border-radius: 12px;
  border: 1px solid var(--border-primary-10);
}

.nav-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  background: transparent;
  color: var(--text-primary-70);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-tab:hover {
  background: var(--hover-primary-5);
  color: var(--text-primary-100);
}

.nav-tab.active {
  background: var(--border-blue-primary);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
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
  background: var(--hover-primary-5);
  color: var(--text-primary-100);
  border-color: var(--border-blue-primary);
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
  background: var(--hover-primary-5);
  color: var(--text-primary-100);
  border-color: var(--border-blue-primary);
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

@media (max-width: 480px) {
  .nav-tab {
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.5rem;
    font-size: 0.875rem;
  }

  .tab-icon {
    font-size: 1rem;
  }
}
</style>

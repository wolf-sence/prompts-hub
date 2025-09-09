<template>
  <Teleport to="body">
    <!-- 背景遮罩 -->
    <Transition name="backdrop">
      <div
        v-if="show"
        class="mobile-menu-backdrop"
        @click="$emit('close')"
      />
    </Transition>

    <!-- 侧边菜单 -->
    <Transition name="sidebar">
      <div v-if="show" class="mobile-menu-sidebar">
        <div class="sidebar-header">
          <div class="logo">
            <AppIcon name="heroicons:sparkles" variant="brand" size="lg" />
            Smart Prompts
          </div>
          <button class="close-btn" @click="$emit('close')">
            <AppIcon name="heroicons:x-mark" size="lg" />
          </button>
        </div>

        <div class="sidebar-content">

          <div class="menu-section" v-if="categories.length > 0">
            <h3 class="section-title">分类筛选</h3>
            <div class="category-filters">
              <button
                v-for="category in categories"
                :key="category.value"
                :class="['category-btn', { active: activeCategory === category.value }]"
                @click="setActiveCategory(category.value)"
              >
                {{ category.label }}
              </button>
            </div>
          </div>

          <div class="menu-section">
            <h3 class="section-title">主题设置</h3>
            <div class="theme-options">
              <button
                v-for="theme in themes"
                :key="theme.name"
                :class="['theme-btn', { active: $colorMode.value === theme.name }]"
                @click="setTheme(theme.name, $event)"
              >
                <AppIcon :name="theme.icon" size="md" />
                {{ theme.label }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { PromptType, PromptCategory } from '~/types'

interface Props {
  show: boolean
  activeCategory: PromptCategory | 'all'
}

interface Emits {
  (e: 'close'): void
  (e: 'update:activeCategory', value: PromptCategory | 'all'): void
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

const themes = [
  { name: 'dark', label: '深色主题', icon: 'heroicons:moon' },
  { name: 'light', label: '浅色主题', icon: 'heroicons:sun' },
]

const categories = computed(() => {
  return [
    { value: 'all' as const, label: '全部' },
    { value: 'funny' as const, label: '趣味' },
    { value: 'efficiency' as const, label: '效率' }
  ]
})
const setActiveCategory = (category: PromptCategory | 'all') => {
  emit('update:activeCategory', category)
  // 选择后关闭菜单
  emit('close')
}

const setTheme = (themeName: string, event: MouseEvent) => {
  // 使用圆形扩散动画进行主题切换
  startCircleTransition(() => {
    $colorMode.preference = themeName
  }, event, themeName === 'dark')

  // 切换主题后关闭菜单
  setTimeout(() => {
    emit('close')
  }, 300)
}

// 防止滚动穿透
watch(() => props.show, (show) => {
  if (show) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.mobile-menu-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
}

.mobile-menu-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 320px;
  max-width: 80vw;
  background: var(--bg-primary-85);
  backdrop-filter: blur(20px);
  border-right: 1px solid var(--border-primary-10);
  z-index: 1001;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid var(--border-primary-10);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary-100);
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: var(--bg-primary-40);
  border: 1px solid var(--border-primary-10);
  border-radius: 8px;
  color: var(--text-primary-70);
  cursor: pointer;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: var(--hover-primary-5);
  color: var(--text-primary-100);
  border-color: var(--border-blue-primary);
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

.menu-section {
  margin-bottom: 2rem;
}

.menu-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary-70);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.nav-tabs {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-tab {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border: none;
  background: var(--bg-primary-40);
  color: var(--text-primary-70);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  border: 1px solid var(--border-primary-10);
  text-align: left;
  width: 100%;
}

.nav-tab:hover {
  background: var(--hover-primary-5);
  color: var(--text-primary-100);
  border-color: var(--border-blue-primary);
}

.nav-tab.active {
  background: var(--border-blue-primary);
  color: white;
  border-color: var(--border-blue-primary);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.category-filters {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.category-btn {
  padding: 0.75rem 1rem;
  border: none;
  background: var(--bg-primary-40);
  color: var(--text-primary-70);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9375rem;
  font-weight: 500;
  border: 1px solid var(--border-primary-10);
  text-align: left;
  width: 100%;
}

.category-btn:hover {
  background: var(--hover-primary-5);
  color: var(--text-primary-100);
  border-color: var(--border-blue-primary);
}

.category-btn.active {
  background: var(--border-blue-primary);
  color: white;
  border-color: var(--border-blue-primary);
}

.theme-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.theme-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: none;
  background: var(--bg-primary-40);
  color: var(--text-primary-70);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9375rem;
  font-weight: 500;
  border: 1px solid var(--border-primary-10);
  text-align: left;
  width: 100%;
}

.theme-btn:hover {
  background: var(--hover-primary-5);
  color: var(--text-primary-100);
  border-color: var(--border-blue-primary);
}

.theme-btn.active {
  background: var(--border-blue-primary);
  color: white;
  border-color: var(--border-blue-primary);
}

/* 动画效果 */
.backdrop-enter-active,
.backdrop-leave-active {
  transition: all 0.3s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

.sidebar-enter-active,
.sidebar-leave-active {
  transition: transform 0.3s ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(-100%);
}

@media (max-width: 480px) {
  .mobile-menu-sidebar {
    width: 280px;
    max-width: 85vw;
  }

  .sidebar-header {
    padding: 1rem;
  }

  .sidebar-content {
    padding: 1rem;
  }

  .logo {
    font-size: 1.125rem;
  }
}
</style>

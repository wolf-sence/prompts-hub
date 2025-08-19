<template>
  <header class="header">
    <div class="header-container">
      <div class="header-left">
        <h1 class="logo">
          <Icon name="heroicons:sparkles" class="logo-icon" />
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
          <Icon :name="type.icon" class="tab-icon" />
          {{ type.label }}
        </button>
      </nav>

      <div class="header-right">
        <button class="theme-toggle" @click="cycleTheme">
          <Icon :name="themeIcon" class="theme-icon" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { PromptType } from '~/types'

interface Props {
  activeType: PromptType
}

interface Emits {
  (e: 'update:activeType', value: PromptType): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { $colorMode } = useNuxtApp()
const { startTransition } = useViewTransition()

const promptTypes = [
  { value: 'text' as PromptType, label: '文本生成', icon: 'heroicons:document-text' },
  { value: 'image' as PromptType, label: '图片生成', icon: 'heroicons:photo' },
  { value: 'video' as PromptType, label: '视频生成', icon: 'heroicons:film' }
]

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
}

const cycleTheme = () => {
  const nextIndex = (currentThemeIndex.value + 1) % themes.length
  const nextTheme = themes[nextIndex].name

  // 使用简单的方式进行主题切换，浏览器会自动应用 CSS 动画
  $colorMode.preference = nextTheme
}
</script>

<style scoped>
.header {
  background: var(--primary-bg);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
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
  color: var(--text-primary);
  text-decoration: none;
}

.logo-icon {
  font-size: 1.75rem;
  color: var(--accent);
}

.nav-tabs {
  display: flex;
  gap: 0.5rem;
  background: var(--card-bg);
  padding: 0.5rem;
  border-radius: 12px;
  border: 1px solid var(--border);
}

.nav-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-tab:hover {
  background: var(--hover);
  color: var(--text-primary);
}

.nav-tab.active {
  background: var(--accent);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.tab-icon {
  font-size: 1.25rem;
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
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  background: var(--hover);
  color: var(--text-primary);
  border-color: var(--accent);
}

.theme-icon {
  font-size: 1.25rem;
}

@media (max-width: 768px) {
  .header-container {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-tabs {
    order: -1;
    width: 100%;
    justify-content: center;
  }
  
  .nav-tab {
    flex: 1;
    justify-content: center;
    padding: 0.75rem 0.5rem;
  }
  
  .logo {
    font-size: 1.25rem;
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
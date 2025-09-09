<template>
  <div class="home-page">
    <div class="page-content">
      <div class="page-header">
      </div>

      <PromptsGrid
        :prompts="filteredPrompts"
        @prompt-click="openModal"
      />
    </div>

    <PromptModal
      v-if="selectedPrompt"
      :show="showModal"
      :prompt="selectedPrompt"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import type { TPrompt, PromptType } from '~/types'

const { filteredPrompts, loadPrompts } = usePrompts()

const showModal = ref(false)
const selectedPrompt = ref<TPrompt | null>(null)

const openModal = (prompt: TPrompt) => {
  selectedPrompt.value = prompt
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  setTimeout(() => {
    selectedPrompt.value = null
  }, 300)
}

// 页面加载时获取数据
onMounted(() => {
  loadPrompts()
})

// SEO
useSeoMeta({
  title: 'Smart Prompts - AI 提示词分享平台',
  description: '分享和发现优质的 AI 提示词，包括文本生成、图片生成和视频生成的专业 Prompts',
  ogTitle: 'Smart Prompts - AI 提示词分享平台',
  ogDescription: '分享和发现优质的 AI 提示词，包括文本生成、图片生成和视频生成的专业 Prompts',
  twitterCard: 'summary_large_image'
})
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}

.page-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--border-blue-primary) 0%, #60a5fa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.page-subtitle {
  font-size: 1.125rem;
  color: var(--text-primary-70);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .page-content {
    padding: 1rem;
    padding-top: 5rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .page-subtitle {
    font-size: 1rem;
  }

  .page-header {
    margin-bottom: 2rem;
  }
}
</style>

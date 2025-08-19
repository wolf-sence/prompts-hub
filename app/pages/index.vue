<template>
  <div class="home-page">
    <div class="page-content">
      <div class="page-header">
        <h1 class="page-title">
          {{ pageTitle }}
        </h1>
        <p class="page-subtitle">
          {{ pageSubtitle }}
        </p>
      </div>
      
      <PromptsGrid 
        :prompts="filteredPrompts" 
        :loading="loading"
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
import { Prompt, PromptType } from '~/types'

const { filteredPrompts, activeType, loading, setActiveType, loadPrompts } = usePrompts()

const showModal = ref(false)
const selectedPrompt = ref<Prompt | null>(null)

const pageTitles = {
  text: '文本生成 Prompts',
  image: '图片生成 Prompts', 
  video: '视频生成 Prompts'
}

const pageSubtitles = {
  text: '优质的文本生成提示词，帮助您创建更好的内容',
  image: '精心设计的图片生成提示词，激发您的创意灵感',
  video: '专业的视频生成提示词，打造引人入胜的视觉内容'
}

const pageTitle = computed(() => pageTitles[activeType.value])
const pageSubtitle = computed(() => pageSubtitles[activeType.value])

const openModal = (prompt: Prompt) => {
  selectedPrompt.value = prompt
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  setTimeout(() => {
    selectedPrompt.value = null
  }, 300)
}

// 监听类型变化
watch(activeType, (newType) => {
  setActiveType(newType)
})

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
  background: linear-gradient(135deg, var(--accent) 0%, #60a5fa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.page-subtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .page-content {
    padding: 1rem;
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
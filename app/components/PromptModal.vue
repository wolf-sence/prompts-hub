<template>
  <Teleport to="body">
    <Transition name="modal" appear>
      <div v-if="show" class="modal-backdrop" @click="handleBackdropClick">
        <div class="modal-container" @click.stop>
          <button class="modal-close" @click="$emit('close')">
            <Icon name="heroicons:x-mark" />
          </button>
          
          <div class="modal-content">
            <div class="modal-header">
              <div class="prompt-type">
                <Icon :name="typeIcon" class="type-icon" />
                {{ typeLabel }}
              </div>
              <h2 class="modal-title">{{ prompt.title }}</h2>
            </div>
            
            <div class="modal-body">
              <div v-if="prompt.image" class="modal-image">
                <img :src="prompt.image" :alt="prompt.title" />
              </div>
              
              <div class="prompt-details">
                <div class="detail-section">
                  <h3 class="section-title">描述</h3>
                  <p class="description">{{ prompt.description }}</p>
                </div>
                
                <div class="detail-section">
                  <h3 class="section-title">Prompt 内容</h3>
                  <div class="prompt-content">
                    <pre>{{ prompt.content }}</pre>
                    <button class="copy-btn" @click="copyToClipboard" :class="{ copied: isCopied }">
                      <Icon :name="isCopied ? 'heroicons:check' : 'heroicons:clipboard'" />
                      {{ isCopied ? '已复制' : '复制' }}
                    </button>
                  </div>
                </div>
                
                <div class="detail-section">
                  <h3 class="section-title">标签</h3>
                  <div class="tags-list">
                    <span v-for="tag in prompt.tags" :key="tag" class="tag">
                      {{ tag }}
                    </span>
                  </div>
                </div>
                
                <div class="detail-section">
                  <div class="prompt-meta">
                    <div class="meta-item">
                      <Icon name="heroicons:heart" class="meta-icon" />
                      <span>{{ prompt.likes }} 次赞</span>
                    </div>
                    <div class="meta-item">
                      <Icon name="heroicons:calendar-days" class="meta-icon" />
                      <span>{{ formatDate(prompt.createdAt) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { Prompt } from '~/types'

interface Props {
  show: boolean
  prompt: Prompt
}

interface Emits {
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isCopied = ref(false)

const typeIcons = {
  text: 'heroicons:document-text',
  image: 'heroicons:photo',
  video: 'heroicons:film'
}

const typeLabels = {
  text: '文本生成',
  image: '图片生成',
  video: '视频生成'
}

const typeIcon = computed(() => typeIcons[props.prompt.type])
const typeLabel = computed(() => typeLabels[props.prompt.type])

const handleBackdropClick = () => {
  emit('close')
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.prompt.content)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  })
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
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-container {
  background: var(--primary-bg);
  border: 1px solid var(--border);
  border-radius: 20px;
  max-width: 900px;
  max-height: 90vh;
  width: 100%;
  overflow: hidden;
  position: relative;
  backdrop-filter: blur(20px);
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border: none;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 50%;
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  transition: all 0.3s ease;
  z-index: 10;
}

.modal-close:hover {
  background: var(--hover);
  color: var(--text-primary);
  border-color: var(--accent);
}

.modal-content {
  overflow-y: auto;
  max-height: 90vh;
}

.modal-header {
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid var(--border);
}

.prompt-type {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--accent);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1rem;
}

.type-icon {
  font-size: 1rem;
}

.modal-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.3;
  margin: 0;
}

.modal-body {
  padding: 0;
}

.modal-image {
  width: 100%;
  max-height: 400px;
  overflow: hidden;
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.prompt-details {
  padding: 2rem;
}

.detail-section {
  margin-bottom: 2rem;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.description {
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 1rem;
}

.prompt-content {
  position: relative;
  background: var(--secondary-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
}

.prompt-content pre {
  padding: 1.5rem;
  margin: 0;
  color: var(--text-primary);
  font-family: 'Fira Code', Monaco, 'Cascadia Code', monospace;
  font-size: 0.9375rem;
  line-height: 1.6;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.copy-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.copy-btn:hover {
  background: var(--hover);
  color: var(--text-primary);
  border-color: var(--accent);
}

.copy-btn.copied {
  background: var(--accent);
  color: white;
  border-color: var(--accent);
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tag {
  background: var(--card-bg);
  border: 1px solid var(--border);
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-radius: 16px;
  font-size: 0.875rem;
  font-weight: 500;
}

.prompt-meta {
  display: flex;
  gap: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.9375rem;
}

.meta-icon {
  font-size: 1.125rem;
}

.meta-item:first-child .meta-icon {
  color: #ef4444;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.9) translateY(20px);
}

@media (max-width: 768px) {
  .modal-backdrop {
    padding: 1rem;
  }
  
  .modal-header {
    padding: 1.5rem 1.5rem 1rem;
  }
  
  .modal-title {
    font-size: 1.5rem;
  }
  
  .prompt-details {
    padding: 1.5rem;
  }
  
  .prompt-meta {
    flex-direction: column;
    gap: 1rem;
  }
  
  .copy-btn {
    position: static;
    margin-top: 1rem;
    align-self: flex-start;
  }
  
  .prompt-content {
    position: relative;
  }
}
</style>
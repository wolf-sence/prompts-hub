<template>
  <Teleport to="body">
    <Transition name="modal" appear>
      <div v-if="show" class="modal-backdrop" @click="handleBackdropClick" @touchstart.stop @click.stop>
        <div class="modal-container" @click.stop>
          <button class="modal-close" @click="$emit('close')">
            <AppIcon name="heroicons:x-mark" size="lg" />
          </button>

          <div class="modal-content">
            <div class="modal-header">
              <h6 class="modal-title">{{ prompt.prompt.title || '未命名提示词' }}</h6>
            </div>

            <div class="modal-body">
              <div class="modal-layout">
                <div class="modal-image-section">
                  <PromptImage
                    :image-src="prompt.prompt.image"
                    :alt="prompt.prompt.title"
                    :prompt-text="prompt.prompt.content"
                    wrapper-class="modal-image-content"
                  />
                </div>

                <div class="modal-content-section">
                  <div class="prompt-details">
                    <div class="detail-section" v-if="prompt.prompt.desc">
                      <h3 class="section-title">描述</h3>
                      <p class="description">{{ prompt.prompt.desc }}</p>
                    </div>

                    <div class="detail-section">
                      <h3 class="section-title">Prompt 内容</h3>
                      <div class="prompt-content">
                        <pre>{{ prompt.prompt.content }}</pre>
                        <button class="copy-btn" @click="copyToClipboard" :class="{ copied: isCopied }">
                          <AppIcon :name="isCopied ? 'heroicons:check' : 'heroicons:clipboard'" size="sm" />
                          {{ isCopied ? '已复制' : '复制' }}
                        </button>
                      </div>
                    </div>

                    <div class="detail-section" v-if="prompt.tags && prompt.tags.length">
                      <h3 class="section-title">标签</h3>
                      <div class="tags-list">
                        <span v-for="tag in prompt.tags" :key="tag" class="tag">
                          {{ tag }}
                        </span>
                      </div>
                    </div>

                    <div class="detail-section" v-if="prompt.models && prompt.models.length">
                      <h3 class="section-title">支持模型</h3>
                      <div class="models-list">
                        <span v-for="model in prompt.models" :key="model" class="model-tag">
                          {{ model }}
                        </span>
                      </div>
                    </div>

                    <div class="detail-section" v-if="prompt.refer">
                      <div class="prompt-meta">
                        <div class="meta-item">
                          <AppIcon :name="getReferIcon(prompt.refer.icon)" size="md" variant="social" />
                          <span>来源: {{ prompt.refer.name }}</span>
                        </div>
                        <div class="meta-item" v-if="prompt.refer.link">
                          <a :href="prompt.refer.link" target="_blank" class="source-link">
                            查看原文
                            <AppIcon name="heroicons:arrow-top-right-on-square" size="sm" />
                          </a>
                        </div>
                      </div>
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
import type { TPrompt } from '~/types'

interface Props {
  show: boolean
  prompt: TPrompt
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
    await navigator.clipboard.writeText(props.prompt.prompt.content)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}

const getReferIcon = (iconName: string) => {
  const iconMap: Record<string, string> = {
    'xiaohongshu': 'simple-icons:xiaohongshu',
    'reddit': 'simple-icons:reddit',
    'twitter': 'simple-icons:twitter',
    'X': 'simple-icons:x'
  }
  return iconMap[iconName] || 'heroicons:link'
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
  transition: 3s;
}

.modal-container {
  background: var(--bg-primary-85);
  border: 1px solid var(--border-primary-10);
  border-radius: 20px;
  max-width: 1200px;
  max-height: 85vh;
  width: 100%;
  overflow: hidden;
  position: relative;
  backdrop-filter: blur(20px);
  transition: 3s;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border: none;
  background: var(--bg-primary-40);
  border: 1px solid var(--border-primary-10);
  border-radius: 50%;
  color: var(--text-primary-70);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  transition: all 0.3s ease;
  z-index: 10;
}

.modal-close:hover {
  background: var(--hover-primary-5);
  color: var(--text-primary-100);
  border-color: var(--border-blue-primary);
}

.modal-content {
  overflow-y: auto;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
}

.modal-body {
  flex: 1;
  overflow: hidden;
}

.modal-layout {
  display: flex;
  min-height: calc(85vh - 120px);
}

.modal-image-section {
  flex: 0 0 45%;
  max-width: 45%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary-60);
}

.modal-image-section :deep(.modal-image-content) {
  width: 100%;
  height: 100%;
}

.modal-image-section :deep(.real-image img) {
  width: 100%;
  height: 100%;
  max-height: calc(85vh - 120px);
  object-fit: contain;
  object-position: center;
}

.modal-content-section {
  flex: 1;
  overflow-y: auto;
  max-height: calc(85vh - 120px);
}

.modal-header {
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid var(--border-primary-10);
}

.prompt-type {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--border-blue-primary);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1rem;
}

.modal-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary-100);
  line-height: 1.3;
  margin: 0;
}

.modal-body {
  padding: 0;
}

.prompt-details {
  padding: 2rem;
  height: 100%;
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
  color: var(--text-primary-100);
  margin-bottom: 1rem;
}

.description {
  color: var(--text-primary-70);
  line-height: 1.7;
  font-size: 1rem;
}

.prompt-content {
  position: relative;
  background: var(--bg-primary-60);
  border: 1px solid var(--border-primary-10);
  border-radius: 12px;
  overflow: hidden;
}

.prompt-content pre {
  padding: 1.5rem;
  margin: 0;
  color: var(--text-primary-100);
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
  background: var(--bg-primary-40);
  border: 1px solid var(--border-primary-10);
  border-radius: 8px;
  color: var(--text-primary-70);
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.copy-btn:hover {
  background: var(--hover-primary-5);
  color: var(--text-primary-100);
  border-color: var(--border-blue-primary);
}

.copy-btn.copied {
  background: var(--border-blue-primary);
  color: white;
  border-color: var(--border-blue-primary);
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tag {
  background: var(--bg-primary-40);
  border: 1px solid var(--border-primary-10);
  color: var(--text-primary-100);
  padding: 0.5rem 1rem;
  border-radius: 16px;
  font-size: 0.875rem;
  font-weight: 500;
}

.prompt-meta {
  display: flex;
  gap: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-primary-10);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-primary-70);
  font-size: 0.9375rem;
}

.models-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.model-tag {
  background: var(--border-blue-primary);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8125rem;
  font-weight: 500;
}

.source-link {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--border-blue-primary);
  text-decoration: none;
  font-size: 0.9375rem;
  transition: color 0.2s ease;
}

.source-link:hover {
  color: #60a5fa;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
  opacity: 1;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .modal-backdrop {
    padding: 1rem;
  }

  .modal-container {
    max-height: 90vh;
  }

  .modal-layout {
    flex-direction: column;
    min-height: auto;
  }

  .modal-image-section {
    flex: 0 0 auto;
    max-width: 100%;
    max-height: 40vh;
  }

  .modal-image-section :deep(.real-image img) {
    max-height: 40vh;
  }

  .modal-content-section {
    max-height: none;
  }

  .modal-header {
    padding: 1.5rem 1.5rem 1rem;
  }

  .modal-title {
    font-size: 1.5rem;
  }

  .prompt-details {
    padding: 1.5rem;
    height: auto;
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

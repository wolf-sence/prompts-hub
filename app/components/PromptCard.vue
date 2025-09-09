<template>
  <div class="prompt-card" @click="$emit('click', prompt)">
    <div class="card-image">
      <div class="image-container">
        <PromptImage
          :image-src="prompt.prompt.image"
          :alt="prompt.prompt.title"
          :prompt-text="prompt.prompt.content"
          wrapper-class="prompt-image-wrapper"
        />
      </div>
      <div class="card-overlay">
        <div class="card-type">
          <AppIcon :name="typeIcon" size="sm" />
          {{ typeLabel }}
        </div>
      </div>
    </div>

    <div class="card-content">
      <h3 class="card-title">{{ prompt.prompt.title || '未命名提示词' }}</h3>
      <p class="card-description">{{ prompt.prompt.desc || prompt.prompt.content.substring(0, 100) + (prompt.prompt.content.length > 100 ? '...' : '') }}</p>

      <div v-if="prompt.tags && prompt.tags.length" class="card-tags">
        <span v-for="tag in prompt.tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>

      <div class="card-footer">
        <div class="card-stats">
          <span v-for="model in prompt.models" :key="model" class="model-badge">
            {{ model }}
          </span>
        </div>
        <div v-if="prompt.refer" class="card-date">
          <AppIcon :name="getReferIcon(prompt.refer.icon)" size="sm" variant="social" />
          <span>{{ prompt.refer.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TPrompt } from '~/types'

interface Props {
  prompt: TPrompt
}

interface Emits {
  (e: 'click', prompt: TPrompt): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

const typeIcons = {
  text: 'heroicons:document-text',
  image: 'heroicons:photo',
  video: 'heroicons:film'
}

const typeLabels = {
  text: '文本',
  image: '图片',
  video: '视频'
}

const typeIcon = computed(() => typeIcons[props.prompt.type])
const typeLabel = computed(() => typeLabels[props.prompt.type])

const getReferIcon = (iconName: string) => {
  const iconMap: Record<string, string> = {
    'xiaohongshu': 'simple-icons:xiaohongshu',
    'reddit': 'simple-icons:reddit',
    'twitter': 'simple-icons:twitter',
    'X': 'simple-icons:x'
  }
  return iconMap[iconName] || 'heroicons:link'
}
</script>

<style scoped>
.prompt-card {
  background: var(--bg-primary-40);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  break-inside: avoid;
  margin-bottom: 1rem;
}

.prompt-card:hover {
  /* transform: translateY(-2px); */
  border-color: var(--accent);
  /* box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.15),
    0 0 0 1px var(--accent); */
}

.card-image {
  position: relative;
  width: 100%;
  background: var(--bg-primary-60);
}

.image-container {
  width: 100%;
  height: 200px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.card-image :deep(.prompt-image-wrapper) {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-image :deep(.real-image img) {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
}

.card-overlay {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
}

.card-type {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: var(--bg-secondart-100);
  color: var(--text-primary-70);
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
}

.type-icon {
  font-size: 1rem;
}

.card-content {
  padding: 1rem;
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary-100);
  margin-bottom: 0.375rem;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-description {
  color: var(--text-primary-70);
  line-height: 1.5;
  margin-bottom: 0.75rem;
  font-size: 0.8125rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-bottom: 0.75rem;
}

.tag {
  background: var(--bg-secondary-80);
  color: var(--text-primary-100);
  padding: 0.125rem 0.5rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid var(--border);
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border);
}

.card-stats {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-primary-70);
  font-size: 0.875rem;
}

.model-badge {
  background: var(--border-blue);
  color: white;
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-size: 0.6875rem;
  font-weight: 500;
}

.stat-icon {
  font-size: 1rem;
  color: #ef4444;
}

.card-date {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--text-primary-70);
  font-size: 0.75rem;
}

@media (max-width: 768px) {
  .card-content {
    padding: 0.875rem;
  }

  .card-title {
    font-size: 0.9375rem;
  }

  .image-container {
    height: 160px;
  }
}
</style>

<template>
  <div class="prompt-card" @click="$emit('click', prompt)">
    <div v-if="prompt.image" class="card-image">
      <img :src="prompt.image" :alt="prompt.title" loading="lazy" />
      <div class="card-overlay">
        <div class="card-type">
          <Icon :name="typeIcon" class="type-icon" />
          {{ typeLabel }}
        </div>
      </div>
    </div>
    
    <div class="card-content">
      <h3 class="card-title">{{ prompt.title }}</h3>
      <p class="card-description">{{ prompt.description }}</p>
      
      <div class="card-tags">
        <span v-for="tag in prompt.tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>
      
      <div class="card-footer">
        <div class="card-stats">
          <Icon name="heroicons:heart" class="stat-icon" />
          <span>{{ prompt.likes }}</span>
        </div>
        <div class="card-date">
          {{ formatDate(prompt.createdAt) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Prompt } from '~/types'

interface Props {
  prompt: Prompt
}

interface Emits {
  (e: 'click', prompt: Prompt): void
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

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('zh-CN')
}
</script>

<style scoped>
.prompt-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  break-inside: avoid;
  margin-bottom: 1.5rem;
}

.prompt-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.2),
    0 0 0 1px var(--accent);
}

.card-image {
  position: relative;
  width: 100%;
  height: auto;
}

.card-image img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

.card-overlay {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.card-type {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
}

.type-icon {
  font-size: 1rem;
}

.card-content {
  padding: 1.5rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.card-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.9375rem;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  background: var(--secondary-bg);
  color: var(--text-primary);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8125rem;
  font-weight: 500;
  border: 1px solid var(--border);
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

.card-stats {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.stat-icon {
  font-size: 1rem;
  color: #ef4444;
}

.card-date {
  color: var(--text-secondary);
  font-size: 0.8125rem;
}

@media (max-width: 768px) {
  .card-content {
    padding: 1rem;
  }
  
  .card-title {
    font-size: 1.125rem;
  }
}
</style>
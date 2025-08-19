<template>
  <div class="prompts-grid">
    <TransitionGroup name="fade" tag="div" class="grid-container">
      <PromptCard
        v-for="prompt in prompts"
        :key="prompt.id"
        :prompt="prompt"
        @click="$emit('promptClick', prompt)"
      />
    </TransitionGroup>
    
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner">
        <Icon name="heroicons:arrow-path" class="spinner" />
      </div>
      <p class="loading-text">加载中...</p>
    </div>
    
    <div v-if="!loading && prompts.length === 0" class="empty-state">
      <Icon name="heroicons:face-frown" class="empty-icon" />
      <p class="empty-text">暂无相关内容</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Prompt } from '~/types'

interface Props {
  prompts: Prompt[]
  loading?: boolean
}

interface Emits {
  (e: 'promptClick', prompt: Prompt): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
.prompts-grid {
  width: 100%;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  align-items: start;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: var(--text-secondary);
}

.loading-spinner {
  margin-bottom: 1rem;
}

.spinner {
  font-size: 2rem;
  animation: spin 1s linear infinite;
}

.loading-text {
  font-size: 1.125rem;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: var(--text-secondary);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-text {
  font-size: 1.125rem;
  opacity: 0.7;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (min-width: 1200px) {
  .grid-container {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }
}
</style>
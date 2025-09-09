<template>
  <div class="prompts-grid">
    <TransitionGroup name="fade" tag="div" class="grid-container">
      <PromptCard
        v-for="(prompt, index) in prompts"
        :key="`prompt-${prompt.id || index}`"
        :prompt="prompt"
        @click="$emit('promptClick', prompt)"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import type { TPrompt } from '~/types'

interface Props {
  prompts: TPrompt[]
}

interface Emits {
  (e: 'promptClick', prompt: TPrompt): void
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
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  align-items: start;
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
}

@media (min-width: 1200px) {
  .grid-container {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (min-width: 1600px) {
  .grid-container {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
}
</style>

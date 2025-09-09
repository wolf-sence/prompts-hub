<template>
  <div class="prompt-image-wrapper" :class="wrapperClass">
    <div v-if="imageSrc" class="real-image">
      <NuxtImg :src="imageSrc" :alt="alt" loading="lazy" />
    </div>
    <div v-else class="prompt-preview">
      <p class="prompt-text">{{ displayPrompt }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  imageSrc?: string
  alt?: string
  promptText?: string
  wrapperClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  alt: 'Prompt预览',
  promptText: '请帮我写一个创意文案',
  wrapperClass: ''
})

const displayPrompt = computed(() => {
  if (!props.promptText) return '请帮我写一个创意文案'
  return props.promptText
})
</script>

<style scoped>
.prompt-image-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  pointer-events: none;
}

.real-image {
  width: 100%;
  height: 100%;
}

.real-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.prompt-preview {
  width: 100%;
  height: 100%;
  background: var(--bg-primary-60);
  color: var(--text-primary-70);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;
}

.prompt-text {
  font-size: 0.75rem;
  line-height: 1.4;
  text-align: center;
  margin: 0;
  word-wrap: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  /* text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2); */
}

@media (max-width: 480px) {
  .prompt-text {
    font-size: 0.6875rem;
    -webkit-line-clamp: 6;
  }
}
</style>

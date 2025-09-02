<template>
  <div class="prompt-image-wrapper" :class="wrapperClass">
    <div v-if="imageSrc" class="real-image">
      <NuxtImg :src="imageSrc" :alt="alt" loading="lazy" />
    </div>
    <div v-else class="mock-chat-interface">
      <div class="phone-frame">
        <div class="phone-header">
          <div class="status-bar">
            <span class="time">9:41</span>
            <div class="indicators">
              <span class="signal"></span>
              <span class="wifi"></span>
              <span class="battery"></span>
            </div>
          </div>
          <div class="chat-header">
            <div class="avatar">
              <AppIcon name="simple-icons:openai" size="lg" variant="social" />
            </div>
            <div class="chat-info">
              <h3>ChatGPT</h3>
              <span class="status">在线</span>
            </div>
          </div>
        </div>
        <div class="chat-messages">
          <div class="message ai-message">
            <div class="message-bubble">
              <p>{{ aiGreeting }}</p>
            </div>
          </div>
          <div class="message user-message">
            <div class="message-bubble">
              <p>{{ userPrompt }}</p>
            </div>
          </div>
          <div class="message ai-message typing">
            <div class="message-bubble">
              <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
        <div class="chat-input">
          <div class="input-bar">
            <AppIcon name="heroicons:plus-circle" size="lg" />
            <span class="input-placeholder">输入消息...</span>
            <AppIcon name="heroicons:microphone" size="lg" />
          </div>
        </div>
      </div>
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

const aiGreeting = '你好！我是ChatGPT，很高兴为你提供帮助。有什么我可以协助你的吗？'

const userPrompt = computed(() => {
  if (!props.promptText) return '请帮我写一个创意文案'

  // 如果prompt太长，截取前100个字符
  const maxLength = 100
  if (props.promptText.length > maxLength) {
    return props.promptText.substring(0, maxLength) + '...'
  }

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

.mock-chat-interface {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
}

.phone-frame {
  width: 280px;
  max-width: 100%;
  height: auto;
  min-height: 400px;
  background: #000;
  border-radius: 25px;
  padding: 4px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  position: relative;
}

.phone-frame::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: #333;
  border-radius: 2px;
}

.phone-header {
  background: #f8f9fa;
  border-radius: 21px 21px 0 0;
  padding: 8px 0 0;
}

.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 8px;
  font-size: 12px;
  font-weight: 600;
  color: #000;
}

.time {
  font-weight: 600;
}

.indicators {
  display: flex;
  gap: 4px;
  align-items: center;
}

.signal, .wifi, .battery {
  width: 12px;
  height: 8px;
  background: #000;
  border-radius: 1px;
}

.battery {
  width: 20px;
  border: 1px solid #000;
  background: transparent;
  position: relative;
}

.battery::after {
  content: '';
  position: absolute;
  right: -3px;
  top: 2px;
  width: 2px;
  height: 4px;
  background: #000;
  border-radius: 0 1px 1px 0;
}

.chat-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  border-bottom: 1px solid #e9ecef;
  background: #fff;
}

.avatar {
  width: 35px;
  height: 35px;
  background: #10a37f;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
}

.chat-info h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #000;
}

.chat-info .status {
  font-size: 11px;
  color: #10a37f;
}

.chat-messages {
  background: #fff;
  padding: 16px 20px;
  min-height: 200px;
  max-height: 200px;
  overflow-y: auto;
}

.message {
  margin-bottom: 12px;
  display: flex;
}

.ai-message {
  justify-content: flex-start;
}

.user-message {
  justify-content: flex-end;
}

.message-bubble {
  max-width: 75%;
  padding: 8px 12px;
  border-radius: 18px;
  font-size: 13px;
  line-height: 1.4;
}

.ai-message .message-bubble {
  background: #f1f3f4;
  color: #202124;
  border-bottom-left-radius: 6px;
}

.user-message .message-bubble {
  background: #007aff;
  color: white;
  border-bottom-right-radius: 6px;
}

.message-bubble p {
  margin: 0;
  word-wrap: break-word;
}

.typing-indicator {
  display: flex;
  gap: 3px;
  padding: 4px 0;
}

.typing-indicator span {
  width: 6px;
  height: 6px;
  background: #9aa0a6;
  border-radius: 50%;
  animation: typing 1.4s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  30% {
    opacity: 1;
    transform: scale(1);
  }
}

.chat-input {
  background: #fff;
  border-radius: 0 0 21px 21px;
  padding: 12px 20px 16px;
  border-top: 1px solid #e9ecef;
}

.input-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f1f3f4;
  border-radius: 20px;
  padding: 8px 16px;
}

.input-placeholder {
  flex: 1;
  font-size: 14px;
  color: #9aa0a6;
}

/* 响应式调整 */
@media (max-width: 480px) {
  .phone-frame {
    width: 240px;
    min-height: 350px;
  }

  .chat-messages {
    min-height: 150px;
    max-height: 150px;
  }

  .message-bubble {
    font-size: 12px;
    padding: 6px 10px;
  }
}
</style>

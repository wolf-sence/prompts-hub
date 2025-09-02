<template>
  <Icon 
    :name="name" 
    :class="[iconClasses, customClass]"
    :style="iconStyle"
  />
</template>

<script setup lang="ts">
interface Props {
  name: string
  variant?: 'default' | 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'social'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  customClass?: string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  customClass: ''
})

// Icon颜色变量映射
const iconColors = {
  // 品牌色 - 用于Logo、主要品牌元素
  brand: 'var(--border-blue-primary)',
  
  // 功能色
  success: '#10b981', // 绿色 - 成功、完成状态
  warning: '#f59e0b', // 橙色 - 警告、注意
  danger: '#ef4444',  // 红色 - 错误、删除
  info: '#3b82f6',    // 蓝色 - 信息、链接
  
  // 社交平台色
  social: {
    'simple-icons:openai': '#10a37f',
    'simple-icons:xiaohongshu': '#ff2442',
    'simple-icons:reddit': '#ff4500',
    'simple-icons:twitter': '#1da1f2',
    'simple-icons:x': '#000000',
    'simple-icons:github': '#181717'
  },
  
  // 内容类型色
  contentType: {
    'heroicons:document-text': '#6366f1', // 文本 - 靛蓝色
    'heroicons:photo': '#ec4899',         // 图片 - 粉色
    'heroicons:film': '#f59e0b'           // 视频 - 橙色
  },
  
  // 主题色
  theme: {
    'heroicons:moon': '#6366f1',      // 深色主题 - 靛蓝色
    'heroicons:sun': '#f59e0b',       // 浅色主题 - 橙色
    'heroicons:swatch': '#8b5cf6'     // 蓝色主题 - 紫色
  },
  
  // UI图标默认色
  default: 'currentColor'
}

// 根据icon名称自动判断颜色
const getIconColor = () => {
  if (props.color) {
    return props.color
  }
  
  // 社交平台图标
  if (iconColors.social[props.name as keyof typeof iconColors.social]) {
    return iconColors.social[props.name as keyof typeof iconColors.social]
  }
  
  // 内容类型图标
  if (iconColors.contentType[props.name as keyof typeof iconColors.contentType]) {
    return iconColors.contentType[props.name as keyof typeof iconColors.contentType]
  }
  
  // 主题图标
  if (iconColors.theme[props.name as keyof typeof iconColors.theme]) {
    return iconColors.theme[props.name as keyof typeof iconColors.theme]
  }
  
  // 品牌图标
  if (props.name === 'heroicons:sparkles') {
    return iconColors.brand
  }
  
  // 根据variant返回颜色
  switch (props.variant) {
    case 'brand':
      return iconColors.brand
    case 'success':
      return iconColors.success
    case 'warning':
      return iconColors.warning
    case 'danger':
      return iconColors.danger
    case 'info':
      return iconColors.info
    default:
      return iconColors.default
  }
}

// 尺寸类
const sizeClasses = {
  xs: 'icon-xs',
  sm: 'icon-sm', 
  md: 'icon-md',
  lg: 'icon-lg',
  xl: 'icon-xl',
  '2xl': 'icon-2xl'
}

const iconClasses = computed(() => [
  'app-icon',
  sizeClasses[props.size],
  `icon-variant-${props.variant}`
])

const iconStyle = computed(() => ({
  color: getIconColor()
}))
</script>

<style scoped>
.app-icon {
  display: inline-flex;
  flex-shrink: 0;
  transition: color 0.2s ease;
}

/* 尺寸定义 */
.icon-xs {
  font-size: 0.75rem;   /* 12px */
  width: 0.75rem;
  height: 0.75rem;
}

.icon-sm {
  font-size: 0.875rem;  /* 14px */
  width: 0.875rem;
  height: 0.875rem;
}

.icon-md {
  font-size: 1rem;      /* 16px */
  width: 1rem;
  height: 1rem;
}

.icon-lg {
  font-size: 1.25rem;   /* 20px */
  width: 1.25rem;
  height: 1.25rem;
}

.icon-xl {
  font-size: 1.5rem;    /* 24px */
  width: 1.5rem;
  height: 1.5rem;
}

.icon-2xl {
  font-size: 2rem;      /* 32px */
  width: 2rem;
  height: 2rem;
}

/* 变体样式 */
.icon-variant-brand {
  /* 品牌图标可能需要特殊效果 */
}

.icon-variant-social {
  /* 社交图标圆角背景等 */
}

/* 悬停效果 */
.app-icon:hover {
  opacity: 0.8;
  transform: scale(1.05);
}

/* 特殊图标的自定义样式 */
:deep([data-icon="heroicons:sparkles"]) {
  /* Logo图标特殊效果 */
  filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.3));
}

:deep([data-icon^="simple-icons:"]) {
  /* 社交图标统一样式 */
  border-radius: 20%;
}

/* 主题相关的动态颜色调整 */
.theme-dark .icon-variant-default {
  opacity: 0.9;
}

.theme-light .icon-variant-default {
  opacity: 0.8;
}

/* 动画效果 */
@keyframes iconPulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.app-icon.animate-pulse {
  animation: iconPulse 2s infinite;
}
</style>
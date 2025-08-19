import type { Prompt, PromptType } from '~/types'

export const usePrompts = () => {
  const prompts = ref<Prompt[]>([])
  const activeType = ref<PromptType>('text')
  const loading = ref(false)

  const filteredPrompts = computed(() => 
    prompts.value.filter(prompt => prompt.type === activeType.value)
  )

  const setActiveType = (type: PromptType) => {
    activeType.value = type
  }

  const loadPrompts = async () => {
    loading.value = true
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 500))
    prompts.value = getMockPrompts()
    loading.value = false
  }

  return {
    prompts,
    filteredPrompts,
    activeType,
    loading,
    setActiveType,
    loadPrompts
  }
}

function getMockPrompts(): Prompt[] {
  return [
    {
      id: '1',
      title: '专业摄影风格人像',
      description: '生成高质量专业摄影风格的人像照片，适用于商业用途',
      type: 'image',
      content: 'professional portrait photography, high quality, studio lighting, 8k resolution, detailed facial features, commercial grade',
      image: 'https://picsum.photos/400/500?random=1',
      tags: ['人像', '摄影', '专业'],
      createdAt: '2024-01-15',
      likes: 156
    },
    {
      id: '2', 
      title: 'ChatGPT写作助手',
      description: '帮助用户提升写作质量的通用prompt模板',
      type: 'text',
      content: '你是一位专业的写作助手。请帮我优化以下文本的表达方式，使其更加清晰、生动和有说服力。保持原意的同时，提升语言的流畅度和专业性。',
      tags: ['写作', '助手', '优化'],
      createdAt: '2024-01-14',
      likes: 234
    },
    {
      id: '3',
      title: '科幻短片预告',
      description: '制作引人入胜的科幻题材短片预告片',
      type: 'video', 
      content: 'sci-fi movie trailer, futuristic cityscape, dramatic lighting, epic music, fast-paced editing, 4k resolution',
      image: 'https://picsum.photos/400/300?random=3',
      tags: ['科幻', '预告片', '电影'],
      createdAt: '2024-01-13',
      likes: 89
    },
    {
      id: '4',
      title: '水彩风景插画',
      description: '创建柔美的水彩风景插画作品',
      type: 'image',
      content: 'watercolor landscape illustration, soft brush strokes, natural scenery, peaceful atmosphere, artistic style',
      image: 'https://picsum.photos/400/600?random=4', 
      tags: ['水彩', '风景', '插画'],
      createdAt: '2024-01-12',
      likes: 178
    },
    {
      id: '5',
      title: '代码审查专家',
      description: '专业的代码质量审查和优化建议',
      type: 'text',
      content: '作为一名资深的代码审查专家，请仔细分析以下代码，从性能、可读性、安全性和最佳实践等方面给出详细的审查意见和改进建议。',
      tags: ['代码', '审查', '优化'],
      createdAt: '2024-01-11', 
      likes: 267
    },
    {
      id: '6',
      title: '产品演示动画',
      description: '制作吸引人的产品功能演示动画',
      type: 'video',
      content: 'product demo animation, clean interface, smooth transitions, professional presentation, engaging visuals',
      image: 'https://picsum.photos/400/400?random=6',
      tags: ['产品', '演示', '动画'],
      createdAt: '2024-01-10',
      likes: 134
    }
  ]
}
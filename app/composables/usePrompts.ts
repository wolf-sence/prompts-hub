import type { TPrompt, PromptType, PromptCategory } from '~/types'
import { FunnyPrompts } from './funny_prompts'
import { EfficiencyPrompts } from './effice_prompts'
import { ImagePrompts } from './image_prompts'

export const usePrompts = () => {
  const prompts = ref<TPrompt[]>([])
  const activeType = ref<PromptType>('text')
  const activeCategory = ref<PromptCategory | 'all'>('all')

  const filteredPrompts = computed(() => {
    let filtered = prompts.value.filter(prompt => prompt.type === activeType.value)

    if (activeCategory.value !== 'all') {
      filtered = filtered.filter(prompt => prompt.category === activeCategory.value)
    }

    return filtered
  })

  const setActiveType = (type: PromptType) => {
    activeType.value = type
  }

  const setActiveCategory = (category: PromptCategory | 'all') => {
    activeCategory.value = category
  }

  const loadPrompts = async () => {
    // await new Promise(resolve => setTimeout(resolve, 300))

    // 组合所有 prompts 数据并添加 category
    const allPrompts: TPrompt[] = [
      ...FunnyPrompts.map(p => ({ ...p, category: 'funny' as const })),
      ...EfficiencyPrompts.map(p => ({ ...p, category: 'efficiency' as const })),
      ...ImagePrompts.map(p => ({ ...p, category: 'image' as const }))
    ]

    prompts.value = allPrompts
  }

  return {
    prompts,
    filteredPrompts,
    activeType,
    activeCategory,
    setActiveType,
    setActiveCategory,
    loadPrompts
  }
}


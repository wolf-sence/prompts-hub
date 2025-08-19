export type PromptType = 'text' | 'image' | 'video'

export interface Prompt {
  id: string
  type: PromptType
  title: string
  description: string
  content: string
  tags: string[]
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  rating: number
  usageCount: number
  createdAt: string
  updatedAt: string
}

export interface FilterOptions {
  category?: string
  difficulty?: string
  tags?: string[]
  search?: string
}

// View Transition API 类型已在内置库中定义

export interface Theme {
  name: string
  value: string
  colors: {
    primary: string
    accent: string
  }
}
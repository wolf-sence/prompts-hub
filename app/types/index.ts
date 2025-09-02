export type PromptType = 'text' | 'image' | 'video'
export type PromptCategory = 'funny' | 'efficiency' | 'image'

export interface TPrompt {
  id?: string
  /** prompt 类型 */
  type: PromptType
  /** prompt 分类 */
  category?: PromptCategory
  /** 来源信息 */
  refer?: {
    name: string
    icon: string
    link?: string
  }
  /** prompt 内容 */
  prompt: {
    title: string
    content: string
    desc?: string
    image?: string
  }
  /** 支持的模型 */
  models?: string[]
  /** 标签 */
  tags?: string[]
  /** 评分 */
  rating?: number
}

export interface FilterOptions {
  category?: string
  difficulty?: string
  tags?: string[]
  search?: string
}

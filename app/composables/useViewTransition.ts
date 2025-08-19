export const useViewTransition = () => {
  const startTransition = async (callback: () => void) => {
    // 检查是否支持 View Transition API
    if (!process.client || !('startViewTransition' in document)) {
      callback()
      return
    }

    try {
      // 使用 View Transition API
      const transition = (document as any).startViewTransition(callback)
      await transition.finished
    } catch (error) {
      console.warn('View transition failed:', error)
      // 如果失败，直接执行回调
      callback()
    }
  }

  return {
    startTransition
  }
} 
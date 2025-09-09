export const useViewTransition = () => {
  const startCircleTransition = (callback: () => void, event: MouseEvent, isDark: boolean) => {
    // 检查是否支持 View Transition API
    if (!process.client || !('startViewTransition' in document)) {
      callback()
      return
    }

    try {
      // 使用 View Transition API
      const transition = document.startViewTransition(callback)

      // document.startViewTransition 的 ready 返回一个 Promise
      transition.ready.then(() => {
        // 获取鼠标的坐标
        const { clientX, clientY } = event;

        // 计算最大半径
        const radius = Math.hypot(
          Math.max(clientX, innerWidth - clientX),
          Math.max(clientY, innerHeight - clientY)
        );

        const clipPath = [
          `circle(0% at ${clientX}px ${clientY}px)`,
          `circle(${radius}px at ${clientX}px ${clientY}px)`
        ]

        // 自定义动画
        document.documentElement.animate(
          {
            // 如果要切换到暗色主题，我们在过渡的时候从半径 100% 的圆开始，到 0% 的圆结束
            clipPath: isDark ? clipPath.reverse() : clipPath
          },
          {
            duration: 500,
            // 如果要切换到暗色主题，我们应该裁剪 view-transition-old(root) 的内容
            pseudoElement: isDark
              ? '::view-transition-old(root)'
              : '::view-transition-new(root)'
          }
        )

      });
    } catch (error) {
      // 如果失败，直接执行回调
      callback()
    }
  }

  return {
    startCircleTransition
  }
}

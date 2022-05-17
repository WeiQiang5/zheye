import { getCurrentInstance, ComponentInternalInstance } from 'vue'

// 用于获取全局挂载实例
const useCurrentInstance = () => {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance
  const globalProperties = appContext.config.globalProperties

  return {
    globalProperties
  }
}

export default useCurrentInstance

import { ref, onMounted, onUnmounted, Ref } from 'vue'

const useClickOutside = (elementRef:Ref<null | HTMLElement>) => {
  const isClickOutSide = ref(false)
  const handler = (e:MouseEvent) => {
    if (elementRef.value) {
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutSide.value = false
      } else {
        isClickOutSide.value = true
      }
    }
  }

  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })

  return isClickOutSide
}

export default useClickOutside

<!--  -->
<template>
  <div
    ref="dropdownRef"
    class="dropdown"
  >
    <a
      href="#"
      class="btn btn-outline-light my-2 dropdown-toggle"
      @click.prevent="toggleOpen"
    >{{ title }}</a>
    <ul
      v-if="isOpen"
      class="dropdown-menu"
      :style="{display:'block'}"
    >
      <slot />
    </ul>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, watch } from 'vue'
import useClickOutside from '../hooks/useClickOutside'
export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    const isOpen = ref(false)
    const dropdownRef = ref<null | HTMLElement>(null)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }

    const isClickOutSide = useClickOutside(dropdownRef)

    watch(() => isClickOutSide.value, () => {
      if (isOpen.value && isClickOutSide.value) {
        isOpen.value = false
      }
    })

    return {
      isOpen,
      dropdownRef,
      toggleOpen
    }
  }
})
</script>
<style lang='scss' scoped>
</style>

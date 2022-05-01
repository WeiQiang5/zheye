<!--  -->
<template>
  <li
    class="dropdown-option"
    :class="{'is-disabled':disabled}"
  >
    <slot />
  </li>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    }
})
</script>
<style lang='scss' scoped>
:slotted(.dropdown-option.is-disabled *){
        color:#6c757d;
        pointer-events: none;
        background-color: transparent;
    }
</style>

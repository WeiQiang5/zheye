<!--  -->
<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div
      class="submit-area"
      @click.prevent="submitForm"
    >
      <slot
        name="submit"
      >
        <button
          type="submit"
          class="btn btn-primary"
        >
          提交
        </button>
      </slot>
    </div>
  </form>
</template>

<script lang='ts'>

import { defineComponent, onMounted, onUnmounted } from 'vue'
import useCurrentInstance from '../hooks/useCurrentInstance'
type ValidateFunc = () => boolean
type ClearInputFunc = () => void

export default defineComponent({
  emits: ['form-submit'],
  setup (props, context) {
    // 获取全局的mitt
    const { globalProperties } = useCurrentInstance()
    const { $mitt } = globalProperties

    let funcArr:ValidateFunc[] = []
    let clearFuncArr:ClearInputFunc[] = []
    // 默认按钮点击事件
    const submitForm = () => {
      console.log('funcArr',funcArr)
      const result = funcArr.map(func => func()).every(result => result)
      clearFuncArr.forEach(func => func())

      
      //   发送点击事件
      context.emit('form-submit', result)
    }

    const callback = (func:ValidateFunc) => {
      console.log('参数', func)
      funcArr.push(func)
    }
    const clearCallBack = (func:ClearInputFunc) => {
      clearFuncArr.push(func)
    }
      // 监听事件
    $mitt.on('form-item-created', (func:ValidateFunc) => {
      console.log('触发')
    })
    $mitt.on('form-item-clear', clearCallBack)
    console.log($mitt)
    onUnmounted(() => {
      $mitt.off('form-item-created', callback)
      funcArr = []
      $mitt.off('form-item-clear', clearCallBack)
      clearFuncArr = []
    })

    return {
      submitForm
    }
  }
})
</script>
<style lang='scss' scoped>
</style>

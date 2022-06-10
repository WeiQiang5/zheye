<!--  -->
<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div
      class="submit-area"
      @click.prevent="submitForm"
    >
      <slot name="submit">
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

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'
type ValidateFunc = () => boolean;
type ClearInputFunc = () => void;

export type Events = {
  'form-item-created':ValidateFunc
}
export type Events1 = {
  'form-item-clear':ClearInputFunc
}

export const emitter = mitt<Events>()
export const emitter1 = mitt<Events1>()

export default defineComponent({
  emits: ['form-submit'],
  setup (props, context) {
    let funcArr: ValidateFunc[] = []
    let clearFuncArr: ClearInputFunc[] = []
    // 默认按钮点击事件
    const submitForm = () => {
      // 这里不直接用every是因为一旦一开始就是false，则不会再验证后面的了
      const result = funcArr.map((func) => func()).every((result) => result)
      if (result) {
        const clearItems = clearFuncArr.map((func) => func())
        //   发送点击事件
        context.emit('form-submit', clearItems)
      }
    }

    const callback = (func: ValidateFunc) => {
      console.log('收集')
      funcArr.push(func)
    }
    const clearCallBack = (func: ClearInputFunc) => {
      console.log('亲', func)
      clearFuncArr.push(func)
    }
    // 监听事件
    emitter.on('form-item-created', callback)
    emitter1.on('form-item.clear', clearCallBack)
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      funcArr = []
      emitter1.off('form-item-clear', clearCallBack)
      clearFuncArr = []
    })

    return {
      submitForm
    }
  }
})
</script>
<style lang="scss" scoped></style>

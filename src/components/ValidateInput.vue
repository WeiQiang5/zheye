<!--  -->
<template>
  <div class="validate-input-container pb-3">
    <input
      :value="inputRef.val"
      class="form-conftrol"
      :class="{'is-invalid':inputRef.error}"
      v-bind="$attrs"
      @blur="validateInput"
      @input="updateValue"
    >
    <span
      v-if="inputRef.error"
      class="invalid-feedback"
    >{{ inputRef.message }}</span>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, PropType } from 'vue'
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
interface RuleProp {
    type:'required' | 'email' | 'range';
    message:string;
}
export type RulesProp = Array<RuleProp>
export default defineComponent({
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String
  },
  // 不希望根元素继承属性
  inheritAttrs: false,
  emits: ['update:modelValue'],
  setup (props, context) {
    console.log(context)
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })
    // blur点击事件
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every(rule => {
          let passed = true
          inputRef.message = rule.message
          // 验证格式
          switch (rule.type) {
          case 'required':
            passed = (inputRef.val.trim() !== '')
            break
          case 'email':
            passed = emailReg.test(inputRef.val)
            break
          case 'range':
            // passed = inputRef.val.length >
            break
          default:
            break
          }
          return passed
        })
      }
    }
    // 手动处理更新和发送事件
    const updateValue = (e:KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      context.emit('update:modelValue', targetValue)
    }
    return {
      inputRef,
      validateInput,
      updateValue
    }
  }
})
</script>
<style lang='scss' scoped>
</style>

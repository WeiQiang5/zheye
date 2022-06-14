<!--  -->
<template>
  <div class="validate-input-container pb-3">
    <input
      v-if="tag !== 'textarea'"
      :value="inputRef.val"
      class="form-conftrol"
      :class="{'is-invalid':inputRef.error}"
      v-bind="$attrs"
      @blur="validateInput"
      @input="updateValue"
    >
    <textarea
      v-else
      :value="inputRef.val"
      class="form-conftrol"
      :class="{'is-invalid':inputRef.error}"
      v-bind="$attrs"
      @blur="validateInput"
      @input="updateValue"
    >
    </textarea>
    <span
      v-if="inputRef.error"
      class="invalid-feedback"
    >{{ inputRef.message }}</span>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, PropType, onMounted } from 'vue'
import { emitter } from './ValidateForm.vue'
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
// 校验接口
interface RuleProp {
    type:'required' | 'email' | 'range';
    message?:string;
    min?:{
      message:string;
      length:number;
    };
    max?:{
      message:string;
      length:number;
    };
}
export type RulesProp = Array<RuleProp>
export type TagType = 'input' | 'textarea'
export default defineComponent({
  props: {
    // eslint-disable-next-line vue/require-default-prop
    rules: {
      type: Array as PropType<RulesProp>
    },
    modelValue: {
      type: String,
      default: ''
    },
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  // 不希望根元素继承属性
  // eslint-disable-next-line vue/order-in-components
  inheritAttrs: false,
  emits: ['update:modelValue'],
  setup (props, context) {
    // 定义输入框的值以及报错信息
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })
    // blur点击事件
    const validateInput = ():boolean => {
      if (props.rules) {
        console.log('进来校正')
        const allPassed = props.rules.every(rule => {
          let passed = true
          inputRef.message = rule.message || ''
          // const { val } = inputRef
          // 验证格式
          switch (rule.type) {
          case 'required':
            passed = (inputRef.val.trim() !== '')
            break
          case 'email':
            passed = emailReg.test(inputRef.val)
            break
          case 'range':{ // 添加花括号是因为此地会报错，新版eslint就算switch 逻辑没有走到 case 1 的代码块，由于作用域提升，会导致case 1 影响到case 2
            const { min, max } = rule
            if (min && inputRef.val.trim().length < min) {
              passed = false
              inputRef.message = rule.message
            }
            if (max && inputRef.val.trim().length < max) {
              passed = false
              inputRef.message = rule.message
            }
            break
          }
          default:
            break
          }
          return passed
        })
        inputRef.error = !allPassed
        console.log('判断结果', allPassed)
        return allPassed
      }
      return true
    }
    const clearInput = () => {
      console.log('清除值')
      inputRef.val = ''
    }
    emitter.emit('form-item-created', validateInput)
    emitter.emit('form-item-clear', clearInput)
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
.form-conftrol{
  width: 100%;
}
</style>

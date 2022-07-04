<template>
  <div class="login-page">
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          ref="inputRef"
          v-model="emailVal"
          :rules="emailRules"
          placeholder="请输入邮箱地址"
          type="text"
        />
      </div>

      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          v-model="passwordVal"
          type="password"
          placeholder="请输入密码"
          :rules="passwordRules"
        />
      </div>
    </validate-form>
  </div>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import createMessage from '@/components/createMessage'
export default defineComponent({

  name: 'Login',

  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const router = useRouter()
    const store = useStore()
    console.log(router)
    //  账号验证
    const emailVal = ref('')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }

    ]
    // 密码验证
    const passwordVal = ref('')
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' },
      { type: 'range', min: 5, message: '请输入不少于5个字数的密码' }
    ]
    // 按钮点击
    const onFormSubmit = (result: boolean) => {
      console.log('result', result)
      // 验证通过
      if (result) {
        console.log('验证通过')
        const payload = {
          email: emailVal.value,
          password: passwordVal.value
        }
        store.dispatch('loginAndFetch', payload).then(res => {
          createMessage('登录成功，2秒后跳转首页', 'success')
          setTimeout(() => {
            router.push('/')
          }, 2000)
        }).catch(e => {
          console.log(e)
        })
      }
    }

    return {
      emailRules,
      emailVal,
      passwordVal,
      passwordRules,
      onFormSubmit
    }
  }
})
</script>

<template>
  <div class="container">
    <global-header :user="currentUser" />
    <column-list
      :list="list"
    />

    <form>
      <div class="mb-3">
        <label
          for="exapleInputEmail1"
          class="form-label"
        >邮箱地址</label>
        <validate-input
          v-model="emailVal"
          :rules="emailRules"
          placeholder="请输入邮箱地址"
          type="text"
        />
        {{ emailVal }}
        <div
          v-if="emailRef.error"
          class="form-text"
        >
          {{ emailRef.message }}
        </div>
      </div>
      <div class="mb-3">
        <label
          for="exapleInputPassword1"
          class="form-label"
        >密码</label>
        <validate-input
          v-model="passwordVal"
          :rules="passwordRules"
          placeholder="请输入密码"
          type="password"
        />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
// 报错原因：typescript 只能理解 .ts 文件，无法理解 .vue文件
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import ValidateInput, { RulesProp } from './components/ValidateInput.vue'

const currentUser:UserProps = {
  isLogin: true,
  name: '小蔡'
}

const testData:ColumnProps[] = [
  {
    id: 1,
    title: 'test1的字母',
    description: 'sadsad',
    avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F4k%2Fs%2F02%2F2109242306111155-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653323892&t=240ac1f1d75bd7735a6e15e82718c154'
  },
  {
    id: 2,
    title: '2awewa',
    description: 'sadsad',
    avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F4k%2Fs%2F02%2F2109242306111155-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653323892&t=240ac1f1d75bd7735a6e15e82718c154'
  }
]

export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GlobalHeader,
    ValidateInput
  },
  setup () {
    const emailVal = ref('')
    const passwordVal = ref('')
    const emailRules:RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱' }
    ]
    const passwordRules = [
      { type: 'required', message: '密码不能为空' },
      { type: 'range', min: { message: '你的密码至少包含6位,不能含有空格', length: 6 } }
    ]
    const emailRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const validateEmail = () => {
      if (emailRef.val.trim() === '') {
        emailRef.error = true
        emailRef.message = 'can not be empty!'
      } else if (!emailReg.test(emailRef.val)) {
        emailRef.error = true
        emailRef.message = 'should be valid message!'
      }
    }

    return {
      emailVal,
      list: testData,
      currentUser,
      emailRef,
      emailRules,
      validateEmail
    }
  }
})
</script>

<style>
.container{
    width: 80%;
    margin: 0 auto;
}
</style>

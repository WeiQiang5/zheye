<template>
  <div class="container">
    <global-header :user="currentUser" />
    <uploader
      action="/upload"
      :before-upload="beforeUpload"
      @file-uploaded="onFileUploaded"
    ></uploader>
    <loading v-if="isLoading"></loading>
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">2020 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item"></li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
// 报错原因：typescript 只能理解 .ts 文件，无法理解 .vue文件
import GlobalHeader from './components/GlobalHeader.vue'
import Uploader from '@/components/Uploader.vue'
import loading from './components/Loader.vue'
import { GlobalDataProps, ResponseType, ImageProps } from './store/store'
import createMessage from '@/components/createMessage'
import axios from 'axios'
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    loading,
    Uploader
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    const token = computed(() => store.state.token)
    const error = computed(() => store.state.error)

    const beforeUpload = (file:File) => {
      console.log('文件信息', file)
      console.log('触发生命周期')
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        createMessage('上传图片只能是JPG格式', 'error', 1500)
      }
      return isJPG
    }
    const onFileUploaded = (rawData:ResponseType<ImageProps>) => {
      createMessage(`上传图片ID ${rawData._id}`, 'success', 1500)
    }

    // 监听错误
    watch(() => error.value.status, () => {
      const { status, message } = error.value
      if (status && message) {
        createMessage(message, 'error')
      }
    })

    onMounted(() => {
      const message = createMessage('check here', 'success')
      setTimeout(() => {
        message.destory()
      }, 2000)
      if (!currentUser.value.isLogin && token.value) {
        axios.defaults.headers.common.Authorization = `Bearer ${token.value}`
        store.dispatch('fetchCurrentUser')
      }
    })
    return {
      currentUser,
      isLoading,
      error,
      beforeUpload,
      onFileUploaded
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

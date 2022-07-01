<template>
  <div class="container">
    <global-header :user="currentUser" />
    <h1>{{error}}</h1>
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
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
// 报错原因：typescript 只能理解 .ts 文件，无法理解 .vue文件
import GlobalHeader from './components/GlobalHeader.vue'
import loading from './components/Loader.vue'
import { GlobalDataProps } from './store/store'
import axios from 'axios'
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    loading
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    console.log(currentUser)
    const token = computed(() => store.state.token)
    const error = computed(() => store.state.error)
    onMounted(() => {
      if (!currentUser.value.isLogin && token.value) {
        axios.defaults.headers.common.Authorization = `Bearer ${token.value}`
        store.dispatch('fetchCurrentUser')
      }
    })
    return {
      currentUser,
      isLoading,
      error

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

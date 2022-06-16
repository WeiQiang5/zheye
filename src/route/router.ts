import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home.vue')
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('@/views/createPost.vue'),
    meta: {
      requiredLogin: true
    }
  },
  {
    path: '/column/:id',
    name: 'column',
    component: () => import('@/views/columnDetail.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: { redirectAlreadyLogin: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由前置守卫
router.beforeEach((to, form, next) => {
  console.log('to', to.meta)
  console.log(store.state.user.isLogin)
  if (to.meta.requiredLogin && !store.state.user.isLogin) {
    console.log('没有登录')
    next({ path: '/login' })
  } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
    next('/')
  } else {
    next()
  }
})

export default router

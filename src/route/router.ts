import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home.vue')
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('@/views/createPost.vue')
  },
  {
    path: '/column/:id',
    name: 'column',
    component: () => import('@/views/columnDetail.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

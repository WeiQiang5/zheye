<!--  -->
<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 p-3">
    <a
      href="/"
      class="navbar-brand"
    >者也专栏</a>
    <ul
      v-if="!user.isLogin"
      class="list-inline mb-0"
    >
      <li class="list-inline-item">
        <router-link
          to="/login"
          class="btn btn-outline-light my-2"
        >
          登录
        </router-link>
      </li>
      <li class="list-inline-item">
        <router-link
          to="/login"
          class="btn btn-outline-light my-2"
        >
          注册
        </router-link>
      </li>
    </ul>
    <ul
      v-else
      class="list-inline mb-0"
    >
      <li class="list-inline-item">
        <dropdown :title="`你好 ${user.name}`">
          <dropdown-item>
            <router-link
              to="#"
              class="dropdown-item"
            >
              新建文章
            </router-link>
          </dropdown-item>
          <dropdown-item disabled>
            <router-link
              to="#"
              class="dropdown-item"
            >
              编辑资料
            </router-link>
          </dropdown-item>
          <dropdown-item>
            <router-link
              to="#"
              class="dropdown-item"
            >
              退出登录
            </router-link>
          </dropdown-item>
        </dropdown>
      </li>
    </ul>
  </nav>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
export interface UserProps {
    isLogin:boolean;
    name?:string;
    id?:number;
}
export default defineComponent({
  name: 'GlobalHeader',
  components: {
    Dropdown,
    DropdownItem
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  }
})
</script>
<style lang='scss' scoped>
</style>

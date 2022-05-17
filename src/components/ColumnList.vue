<template>
  <div class="row">
    <div
      v-for="column in columnList"
      :key="column._id"
      class="col-4 mb-4"
    >
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            :src="column.avatar && column.avatar.fitUrl"
            :alt="column.title"
            class="rounded-circle border border-light my-3"
          >
          <h5 class="card-title">
            {{ column.title }}
          </h5>
          <p class="card-text text-left">
            {{ column.description }}
          </p>
          <router-link
            :to="`/column/${column.id}`"
            class="btn btn-outline-primary"
          >
            进入专栏
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import columnImg from '@/assets/logo.jpg'
export interface ColumnProps {
    id:number;
    title:string;
    avatar?:string;
    description:string;
}
export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    console.log('数据', props)
    const columnList = computed(() => {
      return props.list.map((column) => {
        if (!column.avatar) {
          column.avatar = columnImg
        }
        return column
      })
    })
    console.log('columnList', columnList)
    return {
      columnList
    }
  }
})
</script>
<style scoped>
.card-body img {
  width: 50px;
  height: 50px;
}
</style>

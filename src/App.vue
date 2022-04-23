<template>
  <div id="container">
    <column-list
      :list="list"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// 报错原因：typescript 只能理解 .ts 文件，无法理解 .vue文件
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
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
        ColumnList
    },
    setup () {
        return {
            list: testData
        }
    }
})
</script>

<style>
        #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
        }
</style>

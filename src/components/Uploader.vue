<template>
  <div class="file-upload">
    <button
      class="btn btn-primary"
      @click.prevent="triggerUpload"
    >
      <span v-if="fileStatus === 'loading'">正在上传</span>
      <span v-else-if="fileStatus==='success'">上传成功</span>
      <span v-else>点击上传</span>
    </button>
    <input
      ref="fileInput"
      type="file"
      class="file-input d-none"
      @change="handleFileChange"
    >
  </div>
</template>

<script lang='ts'>
import { ref, reactive, onMounted, defineComponent } from 'vue'
import axios from 'axios'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckFunction = (file:File) => boolean
export default defineComponent({
  props: {
    action: { // 上传地址
      type: String,
      required: true
    },
    beforeUpload: {
      type: Function as PropType<CheckFunction>
    }
  },
  emits: ['file-uploaded', 'file-uploaded-error'],
  setup (props, context) {
    // 获取dom节点
    const fileInput = ref<null | HTMLInputElement>(null)
    const fileStatus = ref<UploadStatus>('ready')

    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    const handleFileChange = (e:Event) => {
      const currentTarget = e.target as HTMLInputElement
      if (currentTarget.files) {
        const files = Array.from(currentTarget.files)
        // 设置beforeUpload声明周期
        if (props.beforeUpload) {
          const result = props.beforeUpload(files[0])
          if (!result) {
            return
          }
        }
        fileStatus.value = 'loading'
        const formData = new FormData()
        formData.append('file', files[0])
        axios.post(props.action, formData, {
          headers: {
            'Content-type': 'multipart/form-data'
          }
        }).then((res:any) => {
          console.log(res.data)
          fileStatus.value = 'success'
          context.emit('file-uploaded', res.data)
        }).catch((error:any) => {
          console.log('错误信息', error)
          fileStatus.value = 'error'
          context.emit('file-uploaded-error', { error })
        }).finally(() => {
          if (fileInput.value) {
            fileInput.value.value = ''
          }
        })
      }
    }

    return {
      fileInput,
      triggerUpload,
      fileStatus,
      handleFileChange
    }
  }
})
</script>
<style lang='scss' scoped>
</style>

import Message from './Message.vue'
import { createApp } from 'vue'
export type MessageType = 'success' | 'error' | 'default'
const createMessage = (message:string, type:MessageType, timeout = 2000) => {
  const messageInstance = createApp(Message, {
    message,
    type
  })
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  //   挂载
  messageInstance.mount(mountNode)
  setTimeout(() => {
    // 卸载
    messageInstance.unmount(mountNode)
    document.body.removeChild(mountNode)
  }, timeout)
}

export default createMessage

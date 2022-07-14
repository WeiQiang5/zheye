import Message from './Message.vue'
import { h, render } from 'vue'
export type MessageType = 'success' | 'error' | 'default'
const createMessage = (message:string, type:MessageType, timeout?:number) => {
  // createApp太重了切换为h函数
  // const messageInstance = createApp(Message, {
  //   message,
  //   type
  // })
  const messageVnode = h(Message, {
    message,
    type
  })
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  //   挂载
  // messageInstance.mount(mountNode)
  render(messageVnode, mountNode)
  const destory = () => {
    render(null, mountNode)
    document.body.removeChild(mountNode)
  }
  if (timeout) {
    setTimeout(() => {
      // 卸载
      // 不需要传入参数
      // messageInstance.unmount()
      destory()
    }, timeout)
  }
  return {
    destory
  }
}

export default createMessage

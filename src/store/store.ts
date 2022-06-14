import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps, PostProps } from '../testData'

interface UserProps {
    isLogin:boolean;
    name?:string;
    id?:number;
    columnId?:number;
}
export interface GlobalDataProps{
    columns:ColumnProps[];
    posts:PostProps[];
    user:UserProps;
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: { isLogin: false,name:'小强',columnId:1 }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, name: '小强' }
    },
    createPost(state,newPost){
      state.posts.push(newPost)
    }
  },
  getters: {
    biggerColumnsLen (state) {
      return state.columns.filter(c => c.id > 2).length
    },
    getColumnById: (state) => (id:number) => {
      return state.columns.find(c => c.id === id)
    },
    getPostsBycid: (state) => (cid:number) => {
      return state.posts.filter(post => post.columnId === cid)
    }
  }
})

export default store

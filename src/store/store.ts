import { createStore, Commit } from 'vuex'
import axios from 'axios'

interface UserProps {
    isLogin:boolean;
    name?:string;
    id?:number;
    columnId?:number;
}
interface ImageProps{
  _id?:string;
  url?:string;
  createdAt?:string;
}
interface ColumnProps{
  _id?:string;
  title?:string;
  avatar?:ImageProps;
  description?:string;
}
export interface PostProps {
  _id:string;
  title:string;
  excerpt?:string;
  content?:string;
  image?:ImageProps;
  createdAt:string;
  column:string;
}
export interface GlobalDataProps{
    columns:ColumnProps[];
    posts:PostProps[];
    user:UserProps;
    loading:boolean;
    token:string;
}

const getAndCommit = async (url:string, mutationName:string, commit:Commit) => {
  const res = await axios.get(url)
  commit(mutationName, res)
}

const postAndCommit = async (url:string, mutationName:string, commit:Commit, payLoad:any) => {
  const res = await axios.post(url, payLoad)
  commit(mutationName, res)
  return res
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: [],
    posts: [],
    user: { isLogin: false, name: '小强', columnId: 1 },
    loading: false,
    token: ''
  },
  mutations: {
    // login (state) {
    //   state.user = { ...state.user, isLogin: true, name: '小强' }
    // },
    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns (state, rawData) {
      state.columns = rawData.data.list
    },
    fetchColumn (state, rawData) {
      state.columns = [rawData.data]
    },
    fetchPosts (state, rawData) {
      state.posts = rawData.data.list
    },
    setLoading (state, status) {
      state.loading = status
    },
    login (state, rawData) {
      console.log('登录', rawData)
      state.token = rawData.data.token
    }
  },
  actions: {
    async fetchColumns ({ commit }) {
      getAndCommit('columns', 'fetchColumns', commit)
    },
    async fetchColumn ({ commit }, cid) {
      getAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
    },
    async fetchPosts ({ commit }, cid) {
      getAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit)
    },
    async login ({ commit }, payLoad) {
      return postAndCommit('/user/login', 'login', commit, payLoad)
    }
  },
  getters: {
    getColumnById: (state) => (id:string) => {
      return state.columns.find(c => c._id === id)
    },
    getPostsBycid: (state) => (cid:string) => {
      console.log(state.posts, cid)
      return state.posts.filter(post => post.column === cid)
    }
  }
})

export default store

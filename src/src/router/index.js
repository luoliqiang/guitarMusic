import Vue from 'vue'
import Router from 'vue-router'
import Add from '@/views/Add'
import MusicList from '@/views/MusicList'
import MusicDetail from '@/views/MusicDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MusicList',
      component: MusicList
    },
    {
      path: '/add',
      name: 'Add',
      component: Add
    },
    {
      path: '/detail',
      name: 'MusicDetail',
      component: MusicDetail
    }
  ]
})

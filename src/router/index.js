import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Category from '@/components/Category'
import TimeLine from '@/components/TimeLine'
import Editor from '@/components/Editor'
import BlogDetail from '@/components/BlogDetail'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect:'index'
      
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
    },
    {
      path: '/category',
      name: 'category',
      component: Category
    },
    {
      path: '/timeline',
      name: 'timeline',
      component: TimeLine
    },
    {
      path: '/editor',
      name: 'editor',
      component: Editor
    },
    {
      path: '/detail',
      name: 'detail',
      component: BlogDetail
    },
    {
      path:'*',
      redirect:'/'
    },
  ]
})

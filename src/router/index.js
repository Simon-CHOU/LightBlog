import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Category from '@/components/Category'
import TimeLine from '@/components/TimeLine'
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
      path:'*',
      redirect:'/'
    },
  ]
})

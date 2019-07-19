import Vue from 'vue'
import Router from 'vue-router'

const callist = () => import('@/views/callist')
const calculator = () => import('@/views/calculator')
const todo = () => import('@/views/todo')


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'callist',
      component: callist
    },
    {
      path: '/todo',
      name: 'todo',
      component: todo,
      meta: { requireAuth: true }
    },
    {
      path: '/calculator',
      name: 'calculator',
      component: calculator,
      meta: { requireAuth: true }
    }
  ]
})

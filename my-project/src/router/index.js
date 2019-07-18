import Vue from 'vue'
import Router from 'vue-router'

const memberCallist = () => import('@/views/callist')
const memberCalculator = () => import('@/views/calculator')
const memberTodo = () => import('@/views/todo')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'callist',
      component: memberCallist
    },
    {
      path: '/todo',
      name: 'todo',
      component: memberTodo,
      meta: { requireAuth: true }
    },
    {
      path: '/calculator',
      name: 'calculator',
      component: memberCalculator,
      meta: { requireAuth: true }
    }
  ]
})

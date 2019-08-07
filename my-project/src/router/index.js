import Vue from 'vue'
import Router from 'vue-router'

const callist = () => import('@/views/callist')
const calculator = () => import('@/views/calculator')
const todo = () => import('@/views/todo')
const whokills = () => import('@/views/whokills')
const login = () => import('@/views/login')
const game = () => import('@/views/game')

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
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: { requireAuth: true }
    },
    {
      path: '/whokills/:id',
      name: 'whokills',
      component: whokills,
      meta: { requireAuth: true }
    },
    {
      path: '/game/:id',
      name: 'game',
      component: game,
      meta: { requireAuth: true }
    }
  ]
})

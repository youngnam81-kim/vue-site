import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/userList',
      name: 'userList',
      component: () => import('../views/UserListView.vue')
    },
    {
      path: '/boardList',
      name: 'boardList',
      component: () => import('../views/BoardListView.vue')
    },
    {
      path: '/userReg',
      name: 'userReg',
      component: () => import('../views/UserRegView.vue')
    },
    


    {
      path: '/studentLink',
      name: 'studentLink',
      component: () => import('../views/StudentLink.vue')
    },
    {
      path: '/s0825',
      name: 's0825',
      component: () => import('../views/study/s01/S0825.vue')
    },
    {
      path: '/hook01',
      name: 'hook01',
      component: () => import('../views/study/s01/Hook01.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/study/s01/Test.vue')
    },
    {
      path: '/test02',
      name: 'test02',
      component: () => import('../views/study/s01/Test02.vue')
    },
    {
      path: '/test03',
      name: 'test03',
      component: () => import('../views/study/s01/Test03.vue')
    },
    {
      path: '/s0826',
      name: 's0826',
      component: () => import('../views/study/s01/S0826.vue')
    },
    {
      path: '/s0827',
      name: 's0827',
      component: () => import('../views/study/s01/S0827.vue')
    },
  ]
})

export default router

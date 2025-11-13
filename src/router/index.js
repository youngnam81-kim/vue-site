import { createRouter, createWebHistory } from "vue-router";
// import HomeView from '../views/HomeView.vue'

// routes 배열 정의
const routes = [
    {
        path: '/user',
        name: 'user',
        component: () => import('../views/UserView.vue')
    },
    {
        path: '/footer',
        name: 'footer',
        component: () => import('../views/FooterView.vue')
    },
    {
        path: '/',
        name: 'MainContentTestView',
        component: () => import('../views/MainContentTestView.vue')
    },
    {
        path: '/MainContentsView',
        name: 'MainContentsView',
        component: () => import('../views/MainContentsView.vue')
    },

    // 다른 라우트 정의...
]

// 라우터 생성
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
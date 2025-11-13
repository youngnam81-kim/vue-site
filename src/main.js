import './assets/style.css'
import axios from 'axios'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { useAuthStore } from '@/stores/auth'
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/'
});
export default api;

const app = createApp(App)

// pinia 등록
const pinia = createPinia()
// Pinia에서 상태를 새로고침 후에도 유지하려면 pinia-plugin-persistedstate 플러그인을 활용
// 플러그인은 Pinia 상태를 localStorage나 sessionStorage에 자동으로 저장하고 복원해 줘서, 
// 페이지를 새로고침해도 로그인 상태나 기타 상태가 유지되도록 도와줍니다.
pinia.use(piniaPluginPersistedstate)
app.use(pinia)



// router 등록
app.use(router)
// Font Awesome 컴포넌트 등록
app.component('font-awesome-icon', FontAwesomeIcon);

const authStore = useAuthStore();
//authStore.initializeAuth(); // 앱 시작 시 localStorage에서 로그인 상태 로드
app.config.globalProperties.$axios = axios; // axios를 전역 속성으로 추가

app.mount('#app')

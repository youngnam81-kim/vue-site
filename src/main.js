import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/'
});
export default api;

// 앱과 Pinia 초기화
const app = createApp(App)
const pinia = createPinia()

// Pinia 플러그인 설정
pinia.use(piniaPluginPersistedstate)

// Pinia를 앱에 연결
// Pinia에서 상태를 새로고침 후에도 유지하려면 pinia-plugin-persistedstate 플러그인을 활용
// 플러그인은 Pinia 상태를 localStorage나 sessionStorage에 자동으로 저장하고 복원해 줘서, 
// 페이지를 새로고침해도 로그인 상태나 기타 상태가 유지되도록 도와줍니다.
app.use(pinia)
app.use(router)
app.config.globalProperties.$axios = axios; // axios를 전역 속성으로 추가

// Pinia가 활성화되었으므로 스토어를 사용할 수 있음
import { useAuthStore } from './store/authStore_backup'
const authStore = useAuthStore()
authStore.initializeAuth(); // 앱 시작 시 localStorage에서 로그인 상태 로드

app.mount('#app')
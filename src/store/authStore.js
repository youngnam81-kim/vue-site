import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { authService } from '../api/authService';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('authStore', () => {
    const router = useRouter();
    const errorMessage = '';

    // 상태 (state) ref 사용
    const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true');
    const user = ref(JSON.parse(localStorage.getItem('user')) || null);

    // 게터 (getters)
    const isAuthenticated = computed(() => isLoggedIn.value);
    const currentUser = computed(() => user.value);

    // 액션 (actions)
    async function login(userId, password) {
        try {
            const response = await authService.login(userId, password);
            const { token, user: userData } = response.data;

            // 상태 업데이트
            isLoggedIn.value = true;
            user.value = userData;

            // 로컬 스토리지 저장
            localStorage.setItem('authToken', token);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('user', JSON.stringify(userData));
            router.push('/'); // 로그인 성공 시 메인 페이지로 이동
            return true;
        } catch (error) {
            console.error('로그인 실패 (스토어):', error);
            // 서버에서 받은 에러 메시지를 파싱하거나 기본 메시지 설정
            const errorMessage = error.response?.data?.message || error.message || '로그인 실패: 알 수 없는 오류';
            throw new Error(errorMessage);
        }
    }

    async function register(userData) {
        try {
            const response = await authService.register(userData);
            return response.data;
        } catch (error) {
            if (error.response) {
                throw error;
            } else {
                throw new Error('네트워크 오류 또는 서버에 연결할 수 없습니다.');
            }
        }

    }

    function logout() {
        // 로컬 스토리지에서 인증 정보 제거
        localStorage.removeItem('authToken');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');

        // 상태 초기화
        isLoggedIn.value = false;
        user.value = null;

        // 서버 로그아웃 API 호출 (필요시)
        // authService.logout().catch(error => {
        //     console.error('로그아웃 API 오류:', error);
        // });
    }

    // 필요한 상태와 함수들 반환
    return {
        isLoggedIn,
        user,
        isAuthenticated,
        currentUser,
        login,
        register,
        logout
    };
});
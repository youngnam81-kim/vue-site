import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from "axios";

export const useAuthStore = defineStore("auth", () => {
  // 1. State (ref를 사용하여 반응형 변수 선언)
  const isLoggedIn = ref(false);  // 로그인 여부
  const user = ref(null);         // 사용자 정보 (예: { id: 'kimyoungnam', name: '김영남' })

  // 2. Getters (computed를 사용하여 파생된 상태 선언)
  const isAuthenticated = computed(() => isLoggedIn.value);
  const currentUser = computed(() => user.value);

  function loginSuccess(userData) { // 매개변수 타입 제거
    isLoggedIn.value = true;
    user.value = userData;

    // localStorage에 저장하여 브라우저 닫기, 새로고침 시에도 로그인 상태 유지 로컬 옵션
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(userData));

    // sessionStorage에 저장 (브라우저 닫으면 사라지는 세션 옵션)
    sessionStorage.setItem("isAuthenticated", "true");
    sessionStorage.setItem("currentUser", JSON.stringify(userData));

    console.log("로그인 성공 : ", userData.userName);
  }

  function logout() {
    isLoggedIn.value = false;
    user.value = null;

    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('jwt-token');

    // sessionStorage에 저장 (브라우저 닫으면 사라지는 세션 옵션) 
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('currentUser');
    axios.defaults.headers.common['Authorization'] = ''; // JWT 토큰 헤더 제거

    // 필요하다면 백엔드 로그아웃 API 호출
    // await axios.post('/api/auth/logout');
    console.log('로그아웃 완료');
  }

  function initializeAuth() {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUser = localStorage.getItem('user');

    if (storedIsLoggedIn === 'true' && storedUser) {
      isLoggedIn.value = true;
      user.value = JSON.parse(storedUser);
    }
  }

  // Pinia 스토어에서 반환할 값들
  return {
    isLoggedIn,
    user,
    isAuthenticated,
    currentUser,
    loginSuccess,
    logout,
    initializeAuth,
  };
}, {
  // Pinia persist 설정
  persist: true
});
<template>
    <div class="border-no">
        <!-- 로그인 상태에 따라 다른 버튼을 보여줍니다. -->
        <div class="border-no" v-if="authStore.isLoggedIn">
            <!-- 로그인된 상태: 사용자 이름 표시 및 로그아웃 버튼 -->
            <!-- <span>안녕하세요, </span>-->
            <router-link to="/footer" class="profile-link">
                <span>{{ authStore.user?.userName || '사용자' }}</span>
            </router-link>
            <button @click="handleLogout">로그아웃</button>
        </div>
        <div class="border-no" v-else>
            <!-- 로그인되지 않은 상태: 로그인 버튼 -->
            <!-- slot을 사용하여 외부에서 버튼 디자인을 주입할 수 있습니다. -->
            <slot name="loginButton" :openModal="openLoginModal">
                <!-- 기본 로그인 버튼 (slot이 제공되지 않을 경우) -->
                <button @click="openLoginModal">로그인</button>
            </slot>
        </div>

        <!-- 로그인 모달 컴포넌트 -->
        <LoginModal :isVisible="isLoginModalVisible" @close="closeLoginModal" @loginSuccess="handleLoginSuccess"
            @openRegisterModal="handleOpenRegisterModal" />
        <!-- 회원가입 모달 컴포넌트 -->
        <RegisterModal :isVisible="isRegisterModalVisible" @close="closeRegisterModal"
            @registerSuccess="handleRegisterSuccess" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import LoginModal from './LoginModal.vue';
import RegisterModal from './RegisterModal.vue';
import { useAuthStore } from '@/store/authStore'; // Pinia 스토어 임포트
import { useRouter } from 'vue-router'; // 라우터 사용 예시

const authStore = useAuthStore();
const router = useRouter(); // 라우터 인스턴스 가져오기

const formClear = () => {
    /*
    credentials.userId = ''; // 폼 초기화
    credentials.password = '';

    registerCredentials.userId = '';
    registerCredentials.userName = '';
    registerCredentials.password = '';
    registerCredentials.confirmPassword = '';
    */
};

// 로그인 모달 상태 관리
const isLoginModalVisible = ref(false);
const openLoginModal = () => {
    isLoginModalVisible.value = true;
};
const closeLoginModal = () => {
    formClear();
    isLoginModalVisible.value = false;
};

// 가입 모달 상태 관리
const isRegisterModalVisible = ref(false);
const openRegisterModal = () => {
    formClear();
    isRegisterModalVisible.value = true;
};
const closeRegisterModal = () => {
    formClear();
    isRegisterModalVisible.value = false;
};

const handleLoginSuccess = () => {
    closeLoginModal(); // 로그인 성공 시 모달 닫기
    // 로그인 후 필요한 라우팅 또는 기타 작업
    // router.push('/dashboard'); // 예: 대시보드 페이지로 이동
    // router.push('/'); // 메인화면 보여줌.
};

const handleLogout = async () => {
    await authStore.logout();
    // 로그아웃 후 필요한 라우팅 또는 기타 작업
    // router.push('/'); // 예: 홈 페이지로 이동
};

const handleOpenRegisterModal = () => {
    formClear();
    isLoginModalVisible.value = false; // 로그인 모달 닫기
    isRegisterModalVisible.value = true; // 회원가입 모달 열기
};

const handleRegisterSuccess = () => {
    formClear();
    isRegisterModalVisible.value = false; // 회원가입 모달 닫기
    alert('회원가입이 완료되었습니다. 로그인해주세요.');
    isLoginModalVisible.value = true; // 회원가입 완료 후 로그인 모달 다시 열기 (선택 사항)
    // 회원가입 성공 후 필요한 로직 처리
};

</script>

<style lang="scss" scoped>
.default-login-button,
.logout-button {
    padding: 8px 15px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 10px;
}

.logout-button {
    background-color: #dc3545;
}

span {
    margin-right: 10px;
    font-weight: bold;
}

.profile-link {
    margin-right: 10px;
    font-weight: bold;
    color: #000000;
    /* 링크 색상 (예: 파란색) */
    text-decoration: underline;
    /* 밑줄 */
    cursor: pointer;
    /* 마우스 오버 시 포인터 변경 */
    transition: color 0.2s ease;
    /* 색상 변경 시 부드러운 전환 효과 */
}

.profile-link:hover {
    color: #646464;
    /* 호버 시 색상 변경 */
}
</style>
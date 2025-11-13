<template>
    <div class="header-container">
        <div class="logo" @click="goHome" style="cursor: pointer">
            <h1> &nbsp; Vue &nbsp; </h1>
        </div>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div v-if="authStore.isLoggedIn">
            권한 있음
        </div>
        <div v-else>
            권한 없음
        </div>
        <div class="auth-section">
            <LoginButtonAndModal>
                <!-- 여기 슬롯에 사용자 정의 버튼을 넣을 수 있습니다. -->
                <!-- <template #loginButton="{ openModal }">
                    <button @click="openModal" class="custom-login-button">로그인</button>
                </template>
-->
            </LoginButtonAndModal>
        </div>
        <!--
        <div class="user-info" v-if="authStore.isAuthenticated">
            <p @click="userDetailId"
                style="margin: 0px; padding: 7px; padding-right: 10px; font-size: 13px; text-decoration: underline; display: inline-block;">
                {{ authStore.currentUser.userName }}
            </p>
            <p @click="handleLoginout"
                style="margin: 0px; padding: 7px; font-size: 13px; cursor: pointer; display: inline-block;">
                [로그아웃]
            </p>
        </div>
        <div class="user-info" v-else>
            <p @click="handleLoginout"
                style="margin: 0px; padding: 7px; font-size: 13px; text-decoration: none; cursor: pointer;">
                [로그인]
            </p>
        </div>
        -->
    </div>
</template>

<script setup>
defineOptions({
    inheritAttrs: false
});

import { useAuthStore } from '../store/authStore'; // useAuthStore 임포트
const authStore = useAuthStore();   //authStore 생성

import { useRouter } from 'vue-router';
const router = useRouter();

import LoginButtonAndModal from '../components/login/LoginButtonAndModal.vue';

const handleLoginout = () => {
    try {
        if (authStore.isAuthenticated) {
            authStore.logout(); // 로그아웃 액션 호출
            router.push('/login'); // 로그아웃 후 로그인 페이지로 리다이렉트
        } else {
            router.push('/login'); // 로그인 페이지로 이동
        }
    } catch (error) {
        console.error('로그인 중 오류 발생:', error);
    }

}

const goHome = () => {

    router.push('/');
    window.scrollTo({
        top: 0,
        behavior: 'instant'
    });

}

const userDetailId = () => {
    /*
    router.push({
        name: 'userDetailId',
        params: { id: this.authStore.currentUser.id }
    });
    */
}

</script>

<style lang="scss" scoped>
.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
}

.user-info {
    display: flex;
    align-items: center;
}

.main-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background-color: #f8f9fa;
    border-bottom: 1px solid #e7e7e7;
}

.auth-section {
    display: flex;
    align-items: center;
}

.custom-login-button {
    /*
    background-color: #6c757d;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    */
    border-radius: 5px;
    // border: none;
    cursor: pointer;
}

.logo:hover {
    background-color: #dadada;
    /* 마우스 오버 시 연한 회색 */
    border-color: #aaa;
    /* 테두리색도 살짝 진하게 */
    border-radius: 5px;
    transition: background-color 0.3s ease;
    // cursor: pointer;
}
</style>
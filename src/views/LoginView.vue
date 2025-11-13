<template>
    <!-- 메소드 이름을 handleLogin으로 변경 -->
    <!-- <form @submit.prevent="handleLogin"> -->
    <form @submit.prevent="apiLogin">
        <div class="container">
            <h2>로 그 인</h2>
            <div v-if="errorMessages" class="error-message">{{ errorMessages }}</div>
            <div v-else-if="errorMessages != ''" class="error-message">{{ userName }}</div>

            <div>
                <div class="border-no">
                    아&nbsp;&nbsp;이&nbsp;&nbsp;디 : <input type="text" id="name" v-model="userId" required
                        placeholder="d아이디를 입력하세요.">
                </div><br>
                <div class="border-no">
                    패스워드 : <input type="text" id="password" v-model="password" required>
                </div>
            </div>
            <br>
            <div class="border-no">
                <button type="submit">로그인</button> &nbsp;
                <button @click="userCreate" class="float-right">회원가입</button>
                <!-- <button @click.prevent="modalPopup" class="float-right">회원가입</button> -->
            </div>
            <br>
            <p style="color: rgb(80, 80, 80);">※ 많은 메뉴를 사용 하시려면 로그인이 필요합니다.</p>
        </div>
    </form>
</template>

<script>
import { errorMessages } from 'vue/compiler-sfc';
import { useAuthStore } from '../stores/auth';
import UserService from '../services/UserService';
import UserRegView from './UserRegView.vue';

export default {
    data() {
        return {
            userName: 'admin',
            userId: 'admin',
            id: '',
            password: 'admin',
            errorMessages: '',
        }
    },
    setup() {
        const authStore = useAuthStore(); // 스토어 인스턴스 생성
        return { authStore };
    },
    methods: {
        async apiLogin() {

            //return false;
            try {
                //post 방식
                /*
                const response = await this.$axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/login`, {
                    userId: this.userId,
                    password: this.password
                });
                */

                // UserService.js 에서 서비스 목록 등록으로 사용 가능.
                const response = await UserService.login(this.userId, this.password);

                // 응답에서 사용자 정보와 토큰 추출
                const { user, token } = response.data;

                if (user) {
                    // 로그인 성공 시 스토어에 사용자 정보 저장
                    this.authStore.loginSuccess(user);

                    // 토큰이 있다면 저장 (JWT 인증 방식 사용)
                    if (token) {
                        localStorage.setItem('jwt-token', token);
                        // axios 기본 헤더에 인증 토큰 설정 (이후 요청에 자동 포함)
                        this.$axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    }
                    this.errorMessage = '';
                    this.$router.push('/'); // 로그인 성공 시 메인 페이지로 이동
                }
            } catch (error) {
                console.error('로그인 중 오류 발생:', error);
                // 서버에서 전달된 오류 메시지가 있으면 표시
                if (error.response && error.response.data && error.response.data.message) {
                    this.errorMessages = error.response.data.message;
                } else {
                    this.errorMessages = '아이디 또는 비밀번호가 맞지 않습니다.1';
                }
            }
        },
        userCreate() {
            this.$router.push({
                name: 'userReg'
            });
        },
        modalPopup() {
            this.modal.open({
                // this.$root.$emit('openModal', {
                id: '',
                title: '회원가입',
                message: '여기에 회원가입 vue 를 넣을수있을까?'
            })
        },
        /*
                showModal(componentName, props = {}) {
                    this.isModalVisible = true;
        
                    // 컴포넌트 이름에 따라 다른 Vue 컴포넌트를 로드
                    if (componentName === 'UserRegView') {
                        this.selectedComponent = UserRegView;
                    } else if (componentName === 'ProductForm') {
                        this.selectedComponent = ProductForm;
                    }
                    this.componentProps = props;
                },
                closeModal() {
                    this.isModalVisible = false;
                }
        */
    },
    inject: ['modal'], // modal 주입
    created() {
        // 페이지 로드 시 로그인 상태 확인
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const user = JSON.parse(localStorage.getItem('user') || 'null');

        if (isLoggedIn && user) {
            this.isLoggedIn = true;
            this.currentUser = user;
            this.$router.push('/');
        }
    }

}
</script>

<style lang="scss" scoped>
.container {
    // position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    align-items: center;
}

.border-no {
    border: 0px;
    padding: 0px;
}

.error-message {
    border: 0px;
    padding: 0px;
    color: red;
}
</style>
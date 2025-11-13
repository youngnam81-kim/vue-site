<template>
    <div v-if="isVisible" class="modal-overlay" @click.self="handleClose">
        <div class="modal-content">
            <button class="close-button" @click="handleClose">X</button>
            <div class="border-no center">
                <h2>로 그 인</h2>
            </div>
            <form @submit.prevent="handleLogin">
                <div class="form-group">
                    <br>
                    <div class="border-no center">
                        아&nbsp;&nbsp;이&nbsp;&nbsp;디 : <input type="text" id="userId" v-model="credentials.userId"
                            required placeholder="아이디를 입력하세요." autocomplete="userId">
                    </div><br>
                    <div class="border-no center">
                        패스워드 : <input type="password" id="password" v-model="credentials.password" required
                            autocomplete="current-password">
                    </div>
                    <br>
                </div>
                <br>
                <div class="border-no center">
                    <button type="submit" :disabled="isLoading">
                        {{ isLoading ? '로그인 중...' : '로그인' }}
                    </button> &nbsp;
                    <button type="button" @click="openRegisterModal" class="center">회원가입</button>
                </div>
                <br>
                <p class="center" style="color: rgb(80, 80, 80);">※ 많은 메뉴를 사용 하시려면 로그인이 필요합니다.</p>
                <div class="error-message border-no">{{ errorMessages }}</div>
            </form>
        </div>
    </div>

</template>

<script setup>
import { ref, reactive } from 'vue';
import { useAuthStore } from '@/store/authStore';

const props = defineProps({
    isVisible: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['close', 'loginSuccess', 'openRegisterModal']);

const authStore = useAuthStore();
const credentials = reactive({
    userId: '',
    password: '',
});
const isLoading = ref(false);
const errorMessages = ref(' ');

const handleLogin = async () => {
    isLoading.value = true;
    errorMessages.value = ' ';
    try {
        // Pinia 스토어의 로그인 액션 호출
        await authStore.login(credentials.userId, credentials.password);
        emit('loginSuccess'); // 로그인 성공 시 이벤트 발생
        credentials.userId = ''; // 폼 초기화
        credentials.password = '';
        errorMessages.value = ' '
    } catch (err) {
        // authStore.login에서 던진 에러를 여기서 잡음
        console.error('LoginModal: 로그인 실패:', err);
        console.log(err);
        errorMessages.value = err.message || '로그인 실패: 알 수 없는 오류가 발생했습니다.';
    } finally {
        isLoading.value = false;
    }
};

const openRegisterModal = () => {
    credentials.userId = ''; // 폼 초기화
    credentials.password = '';
    errorMessages.value = ' ';

    emit('close'); // 현재 로그인 모달 닫기
    emit('openRegisterModal'); // 상위 컴포넌트에 회원가입 모달을 열어달라고 요청
};

const handleClose = () => {
    credentials.userId = ''; // 폼 초기화
    credentials.password = '';
    errorMessages.value = ' ';
    emit('close');
};  
</script>

<style lang="scss" scoped>
/* 모달 오버레이 및 내용 스타일링 */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}


.modal-content {
    background: white;
    padding: 30px;
    border-radius: 5px;
    width: 400px;
    height: 400px;
    max-width: 90%;
    position: relative;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.2em;
    cursor: pointer;
}

.error-message {
    color: red;
    // margin-top: 10px;
    text-align: center;
}

.center {
    text-align: center;
}

/*



.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.form-group input {
    width: calc(100% - 20px);
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.login-submit-button {
    width: 100%;
    padding: 10px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1.1em;
    cursor: pointer;
    margin-top: 10px;
}

.login-submit-button:disabled {
    background: #a8d4ff;
    cursor: not-allowed;
}


    */
</style>
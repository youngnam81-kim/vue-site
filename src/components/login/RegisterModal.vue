<template>
    <div v-if="isVisible" class="modal-overlay" @click.self="handleClose">
        <div class="modal-content">
            <button class="close-button" @click="handleClose">X</button>
            <div class="border-no center">
                <h2>회 원 가 입</h2>
            </div>
            <form @submit.prevent="handleRegister">
                <div class="form-group">
                    <br>
                    <div class="border-no center">
                        ID : <input type="text" id="userId" v-model="registerCredentials.userId" required
                            placeholder="아이디를 입력하세요." autocomplete="userId">
                    </div><br>
                    <div class="border-no center">
                        이름 : <input type="text" id="userName" v-model="registerCredentials.userName" required
                            placeholder="이름을 입력하세요." autocomplete="userName">
                    </div><br>
                    <div class="border-no center">
                        비밀번호 : <input type="password" id="password" v-model="registerCredentials.password" required
                            autocomplete="new-password">
                    </div><br>
                    <div class="border-no center">
                        비밀번호 확인 : <input type="password" id="confirmPassword"
                            v-model="registerCredentials.confirmPassword" required autocomplete="new-password">
                    </div>
                    <br>
                </div>
                <br>
                <div class="border-no center">
                    <button type="submit" :disabled="isLoading">
                        {{ isLoading ? '등록 중...' : '확 인' }}
                    </button>
                </div>
                <br>
                <div class="error-message border-no" style="color: red;">{{ errorMessages }}</div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useAuthStore } from '@/store/authStore';
const authStore = useAuthStore();

const props = defineProps({
    isVisible: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['close', 'registerSuccess']);

const registerCredentials = reactive({
    userId: '',
    userName: '',
    password: '',
    confirmPassword: ''
});

const isLoading = ref(false);
const errorMessages = ref(' ');

const handleRegister = async () => {
    isLoading.value = true;
    errorMessages.value = ' ';

    if (registerCredentials.password !== registerCredentials.confirmPassword) {
        errorMessages.value = '패스워드가 일치하지 않습니다.';
        isLoading.value = false;
        return;
    }

    try {
        // 회원가입 API 호출 로직 추가
        await authStore.register(registerCredentials);
        emit('registerSuccess');

        // 폼 초기화
        registerCredentials.userId = '';
        registerCredentials.userName = '';
        registerCredentials.password = '';
        registerCredentials.confirmPassword = '';
        errorMessages.value = ' ';

    } catch (error) {
        // authStore.login에서 던진 에러를 여기서 잡음
        errorMessages.value = error.response.data;
    } finally {
        isLoading.value = false;
    }
};

const handleClose = () => {
    registerCredentials.userId = '';
    registerCredentials.userName = '';
    registerCredentials.password = '';
    registerCredentials.confirmPassword = '';
    errorMessages.value = ' '
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
    height: 430px;
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
</style>
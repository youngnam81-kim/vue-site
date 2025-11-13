<template>
    <div>
        <h2>신규 등록</h2>
        <form @submit.prevent="apiUserReg">
            <div>
                <label for="userId">
                    <span class="label-text">ID:</span>
                    <input type="text" id="userId" name="userId" v-model="userId" />
                </label>
                <br /><br />

                <label for="password">
                    <span class="label-text">Password:</span>
                    <input type="password" id="password" name="password" v-model="password" />
                </label>
                <br /><br />

                <label for="userName">
                    <span class="label-text">이름:</span>
                    <input type="text" id="userName" name="userName" v-model="userName" />
                </label>
                <br /><br />

                <label for="age">
                    <span class="label-text">나이:</span>
                    <input type="text" id="age" name="age" v-model="age" />
                </label>
                <br /><br />

                <label for="email">
                    <span class="label-text">e-mail:</span>
                    <input type="email" id="email" name="email" v-model="email" />
                </label>
                <br /><br />

                <label for="job">
                    <span class="label-text">직업:</span>
                    <input type="text" id="job" name="job" v-model="job" />
                </label>
                <br /><br />

                <label for="address">
                    <span class="label-text">주소:</span>
                    <input type="text" id="address" name="address" v-model="address" />
                </label>
                <br /><br />

                <label for="phone">
                    <span class="label-text">전화번호:</span>
                    <input type="tel" id="phone" name="phone" v-model="phone" />
                </label>
                <br /><br />

                <label for="interests">
                    <span class="label-text">Interests:</span>
                    <input type="text" id="interests" name="interests" v-model="interests" />
                </label>
                <br /><br />

                <label for="agree" style="display: flex; align-items: center;">
                    <input type="checkbox" id="agree" v-model="agree" style="margin-right: 8px;" />
                    약관에 동의합니다.
                </label>
            </div>

            <div class="no-border" style="margin-top: 20px;">
                <button type="submit">등록</button>&nbsp;&nbsp;
                <button type="button" @click="$router.go(-1)">취소</button>
            </div>
        </form>
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth'; // 스토어 임포트

export default {
    data() {
        return {
            userId: '',
            userName: '',
            age: '',
            email: '',
            address: '',
            job: '',
            phone: '',
            interests: '',
            password: '',
            agree: ''

        }
    },
    setup() {
        const authStore = useAuthStore(); // 스토어 인스턴스 생성
        return { authStore }; // 템플릿에서 authStore를 사용할 수 있도록 반환
    },
    methods: {
        apiUserReg() {
            confirm('등록 하시겠습니까?'); //추후 modal로 해야겠다.
        }
    },
}
</script>

<style lang="scss" scoped>
.no-border {
    border: none;
    text-align: center;
}

.label-text {
    display: inline-block;
    width: 70px;
    /* 원하는 고정 너비 설정 */
}
</style>
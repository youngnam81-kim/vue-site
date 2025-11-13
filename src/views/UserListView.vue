<template>
    <div>
        <div class="border-no padding-no margin-no">
            <h2>사용자 리스트
                <button @click="userCreate" class="float-right">신규 등록</button>&nbsp;&nbsp;&nbsp;
            </h2>
        </div>

        <table class="board-table">
            <thead>
                <tr>
                    <!-- <td>NO</td> -->
                    <td>이름</td>
                    <!-- <td>나이</td> -->
                    <td>이메일</td>
                    <!-- <td>직업</td> -->
                    <td>전화번호</td>
                    <td>수정</td>
                </tr>
            </thead>
            <tbody>
                <tr v-if="users" v-for="user in users" :key="user.id">
                    <!-- <td>{{ user.id }}</td> -->
                    <td>{{ user.name }}</td>
                    <!-- <td>{{ user.age }}</td> -->
                    <td>{{ user.email }}</td>
                    <!-- <td>{{ user.job }}</td> -->
                    <td>{{ user.contact }}</td>
                    <td><button class="updateButton" @click="userDetail(user.id)">수정</button></td>
                </tr>
                <tr v-else>
                    <td colspan="7" class="no-posts">등록된 사용자가 없습니다.</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
import router from '../router';

export default {
    data() {
        return {
            users: null,
        }
    },
    methods: {
        userDetail(id) {
            router.push({
                name: 'userDetailId',
                params: { id: id }
            });
        },
        userCreate() {
            router.push({
                name: 'userCreate'
            });
        },
    },
    async mounted() {
        try {
            const response = await axios.get("/users.json");
            this.users = response.data;
            // console.log(this.users);
        } catch (error) {
            console.error('오류 발생:', error);
            this.errorMessages = '사용자 정보 처리 중 오류가 발생했습니다.';
        }

    },

}
</script>

<style lang="scss" scoped>
table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 2rem;
}

th,
td {
    border: 1px solid #ddd;
    padding: 7px 12px;
    text-align: center;
}

th {
    background-color: #f2f2f2;
    font-weight: bold;
}

tr:nth-child(even) {
    background-color: #f9f9f9;
}

tr:hover {
    background-color: #eeeeee;
}

a {
    color: #0066cc;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

h1 {
    margin-bottom: 1.5rem;
}

.updateButton {
    margin: 0px;
    padding-top: 1px;
    padding-bottom: 0px;
}
</style>
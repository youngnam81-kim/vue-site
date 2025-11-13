<template>
    <div>
        <div class="border-no padding-no margin-no">
            <h2>게시판 리스트
                <button @click="contentCreate" class=" float-right">신규 등록</button>&nbsp;&nbsp;&nbsp;
            </h2>
        </div>
        <table class="board-table">
            <thead>
                <tr>
                    <!-- <td>NO</td> -->
                    <td>제목</td>
                    <!-- <td>카테고리</td> -->
                    <td>작성자</td>
                    <!-- <td>내용</td> -->
                    <td>날짜</td>
                    <td>views</td>
                </tr>
            </thead>
            <tbody>
                <tr v-if="list" v-for="l in list" :key="list.postId">
                    <!-- <td @click="contentDetail">{{ list.id }}</td> -->
                    <td @click="contentDetail">{{ l.title }}</td>
                    <!-- <td @click="contentDetail">{{ list.category }}</td> -->
                    <td @click="contentDetail">{{ l.author }}</td>
                    <!-- <td @click="contentDetail">{{ list.content }}</td> -->
                    <td @click="contentDetail">{{ l.postDate }}</td>
                    <td @click="contentDetail">{{ l.views }}</td>
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
            list: null,
        }
    },
    methods: {
        contentDetail(id) {
            alert('글내용 확인용 화면 예정');
            // router.push({
            //     name: 'contentDetailById',
            //     params: { id: id }
            // });
        },
        contentCreate() {
            // alert('글 작성 페이지 예정');
            // return;
            this.$router.push({ name: 'boardCreate' });
            // router.push({
            //     name: 'boradCreate'
            // });
        }
    },
    async mounted() {
        try {
            const response = await axios.get("/board_posts.json");
            this.list = response.data;
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
    padding: 8px 12px;
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
    cursor: pointer;
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
</style>
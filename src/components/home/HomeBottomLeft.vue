<template>
    <div>
        <p>게시글</p> <button @click="moreContents" class="inline-block">더보기</button>
        <hr>
        <table class="board-table">

            <tbody>
                <tr v-if="list && list.length > 0" v-for="item in list" :key="item.id">
                    <td @click="modalPopup(item.id, item.title, item.content )">{{ item.title }}</td>
                    <td @click="modalPopup(item.id)">{{ item.postDate }}</td>
                </tr>
                <tr v-else>
                    <td colspan="2" class="no-posts" style="text-align: center;">등록된 글이 없습니다.</td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script>
import axios from 'axios';
import router from '../../router';
// import { provide } from 'vue';

// provide('modal', {
//   open: openModal,
//   close: closeModal
// })

export default {
    
    data() {
        return {
            list: [],
        }
    },
    inject: ['modal'], // modal 주입
    methods: {
        moreContents() {
            router.push({
                name: 'boardListView'
            });
        },
        modalPopup(id,title,content) {
            this.modal.open({
            // this.$root.$emit('openModal', {
                id: (id+''),
                title: title,
                message: content
            })
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
p {
    display: inline-block;
    margin: 0;
}

div {
    border-bottom: 1px solid rgb(206, 206, 206);
}

table {
    width: 100%;
}

button {
    text-align: right;
    margin-left: auto;
}

td {
    width: 80%;
    cursor: pointer;
}
</style>
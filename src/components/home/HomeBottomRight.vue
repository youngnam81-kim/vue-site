<template>
    <div>
        <p>갤러리</p> <button @click="moreContents">더보기</button>
        <hr>
    </div>
</template>

<script>
export default {
    methods: {
        moreContents() {
            alert('이미지 게시판 링크 할것');
        }
    }
}
</script>

<style lang="scss" scoped>
p{
    display: inline-block;
    margin: 0;
}
div{
    border-bottom: 1px solid rgb(206, 206, 206);
}
table{
    width: 100%;
}
button{
    text-align: right;
    margin-left: 0, auto;
}
</style>
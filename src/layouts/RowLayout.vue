<template>
    <div class="main">
        <RowTopView class="header-view"></RowTopView>
        <router-view class="router-view" />
        <FooterView class="footer-view"></FooterView>
    </div>
</template>

<script setup>
import '../css/App.css'
import RowTopView from '../views/RowTopView.vue';
import { RouterLink, RouterView } from 'vue-router'
import FooterView from '../views/FooterView.vue';

</script>

<style lang="scss" scoped>
.main {
    width: 90%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 0 auto;
    padding: 0px;
    border: 0px solid;
}

.router-view {
    min-height: 500px;
}

.footer-view {
    font-size: smaller;
    text-align: center;
    border: 1px solid #aaa;
    height: 80px;
}

.header-view {
    height: 80px;
}
</style>

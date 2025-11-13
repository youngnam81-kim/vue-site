<script setup>
import FooterView from '../views/FooterView.vue';
import ColLeftView from '../views/ColLeftView.vue';
import ColTopView from '../views/ColTopView.vue';
import ColRightView from '../views/ColRightView.vue';
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="main">
        <ColLeftView class="left-view"></ColLeftView>
        <div>
            <ColTopView class="top-view"></ColTopView>
            <router-view class="router-view" />
            <FooterView class="footer-view"></FooterView>
        </div>
        <ColRightView class="right-view"></ColRightView>
    </div>
</template>

<style lang="scss" scoped>
.main {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0px;
    padding: 0px;
}

.left-view {
    min-width: 100px;
    // width: 200px;
    height: 675px;
}

.right-view {
    min-width: 100px;
    // width: 200px;
    height: 675px;
}

.top-view {
    width: 100%;
    height: 100px;
}

.router-view {
    width: 100%;
    min-height: 500px;
}

.footer-view {
    font-size: smaller;
    text-align: center;
    height: 100px;
    padding: 0px;
    margin: 5px;
    border: 0px;
    border: 1px solid rgb(136, 23, 23);
}
</style>

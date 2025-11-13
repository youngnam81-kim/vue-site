<template>
    <div>
        <div>
            <h4>Hook 진행 합니다.</h4>
            <h4>count : {{ cnt }}</h4>
            <button @click="counter">count+1</button>
            <button @click="cnt--">count-1</button>
        </div>
        <!-- <GlobalChild v-if="cnt % 2 == 0"></GlobalChild> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            cnt: 1,
        }
    },
    setup() {
        console.log("setup");
    },
    beforeCreate() {
        console.log("beforeCreate");
    },
    created() {
        console.log("created");
    },
    beforeMount() {
        console.log("beforeMount");
    },
    mounted() {
        console.log("mounted");
    },
    beforeUpdate() {
        console.log("beforeUpdate");
    },
    updated() {
        console.log("updated");
    },
    beforeUnmount() {
        console.log("beforeUnmount");
    },
    unmounted() {
        console.log("unmounted");
    },
    methods: {
        counter() {
            this.cnt++;
        }
    }
}
</script>

<style lang="scss" scoped></style>
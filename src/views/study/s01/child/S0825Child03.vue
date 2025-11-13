<template>
    <div>
        <p>S0825Child03.vue</p>
        <p>name: {{ name }}</p>
        <p>age : {{ age }}</p>
        자식 버튼 <button @click="$emit('propsUpdater')">age--</button>
    </div>
</template>

<script>
export default {
    props: ["name", "age"],
    emits: ['update:modelValue'],
    created() {
        //console.log(this.name)
    },
    methods: {
        propsUpdater() {
            this.age--;
        },
    }
}
</script>

<style lang="scss" scoped></style>
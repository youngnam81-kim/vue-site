<template>
    <div>
        (s0825Child01.vue import)
        <input type="text" v-bind:value="modelValue" v-on:input="$emit('update:modelValue', $event.target.value)"
            placeholder="검색어 입력하세요">
    </div>
</template>

<script>
export default {
    props: ['modelValue'],
    emits: ['update:modelValue'],
}
</script>

<style lang="scss" scoped></style>

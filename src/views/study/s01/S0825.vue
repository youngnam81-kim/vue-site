<template>
    <div>
        <hr>
        <div>
            v-model 사용시
            <input type="text" v-model="message">
            <p>입력한 메시지: {{ message }}</p>
        </div>
        <hr>
        <h4>v-model로 컴포넌트 import 해서 text 값 연동</h4>
        <p>v-model은 "데이터와 뷰의 연동"</p>
        <div>
            <S0825Child01 v-model="searchText"></S0825Child01>
            <p>(S0825.vue 부모)검색어 : {{ searchText }}</p>
        </div>
        <hr>
        <div>
            <h4>ref $refs로 접근 </h4>
            <p>$refs는 "특정 DOM 요소나 컴포넌트 인스턴스에 대한 직접적인 접근</p>
            <input type="text" ref="inputField">
            <button @click="focusInput">입력란에 포커스</button>
        </div>
        <hr>
        <div>
            ref로 자식 메소드 호출
            <S0825Child02 ref="child"></S0825Child02>
            <button @click="callChildMethod">자식 메쏘드 호출</button>
        </div>
        <hr>
        <div>
            <S0825Child03 :name="name" :age="age"></S0825Child03>
            부모 버튼 <button @click="age++"> age++ </button>
        </div>
    </div>
</template>

<script>
import S0825Child01 from './child/S0825Child01.vue';
import S0825Child02 from './child/S0825Child02.vue';
import S0825Child03 from './child/S0825Child03.vue';
export default {
    components: {
        S0825Child01,
        S0825Child02,
        S0825Child03,
    },
    data() {
        return {
            message: '',
            searchText: '',
            name: '존',
            age: 30,
        }
    },
    methods: {
        focusInput() {
            this.$refs.inputField.focus();
        },
        callChildMethod() {
            this.$refs.child.callChildMethod();
        },
    }
}
</script>

<style lang="scss" scoped></style>
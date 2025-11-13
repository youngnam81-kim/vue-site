<script>
import { handleError } from 'vue';

export default {
    data() {
        return {
            count: 0,
            y: '짝수',
            changeCount: '',
        }
    },
    methods: {
        increment() {
            this.count++;
        }
    },
    watch: {
        // count(newVal, oldVal){
        //     this.changeCount = ` count change ${oldVal} => ${newVal} `;
        //     if(newVal % 2 ===0 ){
        //         this.y='짝수';
        //     }else{
        //         this.y='홀수';
        //     }
        // }
        count: {
            handler(newVal, oldVal) {
                this.changeCount = ` count change ${oldVal} => ${newVal} `;
                if (newVal % 2 === 0) {
                    this.y = '짝수';
                } else {
                    this.y = '홀수';
                }
            },
            once: false, //true,false
        },

    },

}
</script>

<template>
    <div>
        <hr>
        watch (감시자) - 반응형 속성이 변경 될때마다 함수를 호출(트리거)할수있음.
        <p>Count: {{ count }} <input type="text" v-model="changeCount"></input></p>
        <button @click="increment">increment</button>
        <p>RESULT:{{ y }}</p>
        <pre>watch:{
        count(newVal, oldVal){
            this.changeCount = ` count change ${oldVal} => ${newVal} `;
            if(newVal % 2 ===0 ){
                this.y='짝수';
            }else{
                this.y='홀수';
            }
        }

         count: {
            handler(newVal, oldVal) {
                this.changeCount = ` count change ${oldVal} => ${newVal} `;
                if (newVal % 2 === 0) {
                    this.y = '짝수';
                } else {
                    this.y = '홀수';
                }
            },
            once: true, // 이렇게 하면 한번만 변화 추적함. true/false 사용가능
    }</pre>
        <hr>
    </div>
</template>

<style lang="scss" scoped>
pre {
    text-align: left;
}
</style>
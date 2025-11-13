<script>
export default {
    data() {
        return {
            isActive: true,
            hasError: true,
            classObject: {
                'border': true,
                'bg': true,
                'text-danger': false
            },
            bgClass: 'bg',
            erClass: 'text-danger',
            isActive: true,
            myWidth: 200,
            chk: false,
            firstName: '',
            lastName: '',
            firstName1: '',
            lastName1: '',
            // fullName: '',
            // fullName1: '',
            // fullName0: '',
        }
    },
    methods: {
        increWidth() {
            this.myWidth += 10;
        },
        decreWidth() {
            this.myWidth -= 10;
        },
        mOver() {
            this.myWidth = 200;
        },

    },
    computed: {
        yesNo() {
            if (this.chk) {
                return '참 말';
            } else {
                return '거 짓';
            }
        },
        fullName0() {
            return this.firstName + ' ' + this.lastName;
        },
        fullName1: {
            get() {
                return this.firstName1 + ' ' + this.lastName1;
            },
            set(p_fullName1) {
                const names1 = p_fullName1.split(' ');
                this.firstName1 = names1[0];
                this.lastName1 = names1[names1.length - 1];
            }

        },
        test: {
            get() {
                return this.firstName + ' ' + this.lastName;
            },
        }
    }
}
</script>

<template>
    <div>
    <hr>css class 변경 방법 등...3항연산추가</hr>
    <div class="border" :class="{ 'bg': isActive, 'text-danger': hasError }">Warning</div>
    <div :class="classObject">Warning</div>
    <div class="border" :class="[bgClass, erClass]">Warning</div>
    <!-- <div :class="[border, isActive ? bgClass : '', erClass]">Warning (border가 안먹는다.) 일반 클래스는 앞에 따로 선언 해줘야함.</div> -->

    <hr>
    style bind 기술할때 v-bind:style or :style / style는 같은 속성일경우 마지막에 기술된것이 적용된다.
    <div class="demo" style="width: 200px; height: 150px;" v-bind:style="{ width: '250px' }"></div>
    <div class="demo2" :style="{ width: myWidth + 'px', color: 'white' }" @mouseover="mOver"> 마우스 over 면 초기화 됩니다.</div>
    <button @click="increWidth"> 누르면 width 증가</button>
    <button @click="decreWidth"> 누르면 width 감소</button>

    <hr>
    computed (종속 데이터 변경 시 자동 재계산, 또는 최초 렌더링 시) <br>
    <input type="checkbox" v-model="chk">{{ yesNo }} {{ yesNo }} {{ yesNo }}

    <br>fullName0 (Getter만) 이름 : {{ fullName0 }} / {{ test }}
    <br>
    성 : <input type="text" v-model="firstName" placeholder="성을 입력하세요"></input>
    이름 : <input type="text" v-model="lastName" placeholder="이름을 입력하세요"></input>
    <pre>
computed: {
        fullName0() {
            return this.firstName + ' ' + this.lastName;
        },

        test:{
            get() {
                return this.firstName + ' ' + this.lastName;
            },
        }
    }
둘다 사용가능.    
</pre>

    <hr> fullName1 (Getter + Setter)
    이름을 입력하세요. (성과 이름은 띄어쓰기) : <input type="text" v-model="fullName1" placeholder="이름을 입력하세요"></input>
    <br>성 : {{ firstName1 }} / 이름 : {{ lastName1 }}
    <br>풀네임 : {{ fullName1 }}
    <pre>
computed: {
    fullName1: {
        get() {
            return this.firstName1 + ' ' + this.lastName1;
        },
        set(newValue) { // fullName1 에 입력된 값을 param 으로 받아옴.(여기선 input text 에 v-model 선언되어 있음)
            const names1 = newValue.split(' ');
            this.firstName1 = names1[0];
            this.lastName1 = names1[names1.length - 1];
            //그러나 글자쓸때 무조건 반응 하므로  .split(' '); 에서 버그처럼 반응함.
        }
    },
}        
    </pre>

    </div>
</template>


<style lang="scss" scoped>
.border {
    border: 2px solid red;
}

.bg {
    background-color: gray;
}

.text-danger {
    color: red;
}

.demo {
    width: 100px;
    height: 100px;
    background-color: blueviolet;
}

.demo2 {
    width: 100px;
    height: 100px;
    background-color: blue;
}

pre {
    text-align: left;
}
</style>
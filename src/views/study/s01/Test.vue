<script>
export default {
    // data : function (){
    data() {
        return {
            channel: "<b>홈페이지만들기</b>",
            subscribe: 2677,
            isTrue1: true,
            isTrue2: false,
            score: 8,
            sports: [
                'baseball',
                'football',
                'swimming',
            ],
            count: 0,
            name: '',
            popup1: true,
            //마우스
            x: 0,
            y: 0,
            msg: '',
            agree: false,
            itemName: '',
            itemCount: 0,
            itemSelectList: [],
            siteName: '네이버',
            siteUrl: 'http://naver.com',
            imgLink: "https://naverpa-phinf.pstatic.net/MjAyNTA3MzFfMTkg/MDAxNzUzOTMzMDM1MDAx.ZtIjHRa_e4ok6F-4DpSrAabBYOaWeA29VU1Q1RC5yFUg.wSVTK89Tvdbnq5NziaSosp-EdwnYk7nyg4IIHzMJZK4g.JPEG/%EB%B9%88%EC%82%B0_17539330349872609341314996875259.jpg?type=u342_228",
        }
    },
    methods: {
        bClick() {
            if (this.name != '') {
                alert(this.name + '님 안녕하세요.')
                // this.popup1 = false //한번만 실행
                //.once 로 하면 실행 한번만 함.
            }
        },
        hello(name) {
            return ' 하이 ' + name;
        },
        getKey(e) {
            console.log(e);
            console.log(e.key);
            if (e.key === '1') {
                alert(e.key);
            }
        },
        getMouseMove(e) {
            this.x = e.offsetX;
            this.y = e.offsetY;
        },
        getMouseClick(e) {
            //e.preventDefault(); //우클릭을 막는다.
            this.msg = this.x + ' / ' + this.y
        },
        addItemList() {
            let item = {
                name: this.itemName,
                count: this.itemCount,
            }
            this.itemSelectList.push(item);
            this.itemName = '';
            this.itemCount = 0;
        }
    }

}
</script>

<template>
<div>
    <div>
        <hr>
        </hr>
        변수값 사용법
        <h3 v-pre> 채널(v-pre사용시) : {{ channel }}</h3>
        <h3> 채널 : {{ channel }}</h3>
        <h3>구독 : {{ subscribe }}</h3>
        <hr>
        </hr>
        template 안에서도 {{ }} 안에 js 를 사용할수있음.
        <h2>{{ `현재 시간 : ` + Date() }}</h2>
        <hr>
        </hr>
        v-text : innerText 과 비슷
        <p v-text="channel"></p>
        <p v-text="subscribe"></p>
        <hr>
        </hr>
        v-html : innerhtml 과 비슷
        <p v-html="channel"></p>
        <hr>
        </hr>
        v-if else-if else
        <h2 v-if="score > 10">3보다크다</h2>
        <h2 v-else-if="score < 7">7보다 작다</h2>
        <h2 v-else>스코어 : {{ score }}</h2>
        <hr>
        </hr>
        v-show
        <h2 v-show="score != 8">이 글은 v-show 입니다.</h2>
        <h2 v-show="score != 7">이 글은 v-show 입니다.</h2>
        <hr>
        </hr>
        v-for
        <ul>
            <li v-for="(sport, index) in sports">{{ index + 1 }} / {{ sport }}</li>
        </ul>
        <hr>
        </hr>
        버튼으로 숫자값 변경.
        <p>count : {{ count }}</p>
        <button v-on:click="count--">감소</button>
        <button v-on:click="count++">증가</button>
        <button v-on:mouseover="count = 0"> 마우스 오버시 0 으로 초기화</button>
        <hr>
        </hr>
        <p>이름 받아서 메소드에 값넘기기 v-model 사용</p>
        <input type="text" v-model="name"></input>
        <button v-if="this.name != ''" v-on:click="this.name = ''">x</button>
        <button v-if="this.name != ''" v-on:click.once="bClick">메소드 호출</button>
        <hr>
        </hr>
        <h2>화면에서 method 바로 실행 이름 반환 {{ hello('TOM') }}</h2>
        <hr>
        </hr>
        <input type="text" v-on:keydown="getKey"></input>
        키 이벤트 : (1번 누르면 alert 실행 )
        <hr>
        </hr>
        마우스 좌표 출력 (좌클릭클릭시 출력됨)
        <div id="display" v-on:mousemove="getMouseMove" v-on:click="getMouseClick"
            v-on:click.right.prevent="getMouseClick">
            {{ msg }}
            <hr>
            </hr>
            x:{{ x }} / y:{{ y }}
        </div>
        <hr>
        </hr>
        <h3>이 약관에 동의 하십니까?</h3>
        <input type="checkbox" v-model="agree"> 동의합니다. ({{ agree }})
        <br></br><button v-show="agree"> 가입 </button>
    </div>
    <!-- <form v-on:submit="addItemList" action=""> -->
    <!--   <form v-on:submit="addItemList"> -->
    <hr>
    </hr>
    배열에 품목 추가
    <form>
        <p>품목 : <input type="text" v-model="itemName" required></p>
        <p>수량 : <select v-model="itemCount">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select></p>
    </form>
    <button v-on:click="addItemList">상품추가</button>
    <button @click.middle="addItemList">상품추가 v-on: 아닌 @ </button>
    <li v-for="list in itemSelectList"> {{ list.name }} / {{ list.count }}</li>
    <hr>
    </hr>
    링크 사용법 : <a href="http://naver.com">네이버</a>
    링크 사용법 : <a v-bind:href="siteUrl" target="_blank">{{ siteName }}</a>
    <hr>
    </hr>
    이미지 링크 가져올때. v-bind: 사용함. 하지만 v-bind 생략가능.<br></br>
    v-bind:href => :href <br>
    v-bind:src => :src <br>
    <img
        src="https://naverpa-phinf.pstatic.net/MjAyNTA3MzFfMTkg/MDAxNzUzOTMzMDM1MDAx.ZtIjHRa_e4ok6F-4DpSrAabBYOaWeA29VU1Q1RC5yFUg.wSVTK89Tvdbnq5NziaSosp-EdwnYk7nyg4IIHzMJZK4g.JPEG/%EB%B9%88%EC%82%B0_17539330349872609341314996875259.jpg?type=u342_228"></img>
    <br></br>
    <img :src="imgLink">
</div>
</template>

<style lang="scss" scoped>
li {
    list-style: none;
}

#display {
    width: 300px;
    height: 350px;
    background-color: aqua;
}

div {
    text-align: center;
}
</style>
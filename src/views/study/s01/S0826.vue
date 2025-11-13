<template>
    <div>
        <p>{{ study }}</p>
        <hr>
        v-if test 입니다 &nbsp;
        <button v-on:click="cnt--">감소</button> &nbsp;
        <button v-on:click="cnt++">증가</button>
        <p v-if="cnt === 0">{{ cnt }} : 재고 없음</p>
        <p v-else-if="cnt > 5">{{ cnt }} : 재고 많이 있음</p>
        <p v-else-if="cnt >= 1"> {{ cnt }} : 재고 있음</p>
        <p v-else> {{ cnt }} : 적자</p>
        <p v-show="cnt === 0">v-show 0일때만 보입니다.</p>
        <p v-show="cnt === 1">v-show 1일때만 보입니다.</p>
        <hr>
        v-for 스포츠
        <ul>
            <li v-for="(sport, index) in sports">
                {{ index + 1 }} / {{ sport }}
            </li>
        </ul>
        <ul>
            <li v-for="sport in sports">
                {{ sport.sport }}
            </li>
        </ul>
        <hr><br>

        <button @click="currentComponent = 'Test03'">Test03 로드</button>
        <button @click="currentComponent = 'Test02'">Test02 로드</button>
        <button @click="currentComponent = null">초기화</button>

        <div class="component-container">
            <component v-bind:is="currentComponent" v-if="currentComponent"></component>
            <p v-else>컴포넌트를 선택해주세요.</p>

        </div>
        <div id="appl"> 음식들
            <div>
                <figure v-for="food in manyFoods" :key="food.name">
                    <img v-bind:src="food.url" :alt="food.name">
                    <figcaption>{{ food.name }}</figcaption>
                    <!-- <p>{{ food.name }}</p> -->
                </figure>
            </div>
        </div>
        <div id="appl2">
            <div class="appl2-img" v-for="food in publicFoods" :key="food.name">
                <img :src="food.url" height="100px">
                <li>{{ food.name }}</li>
            </div>
        </div>
        <hr>
        <div id="lightDiv">
            <button v-on:click=" lightOn = !lightOn">Switch light</button>
            <div v-show="lightOn"></div>
            <img src="../../../assets/img/img_lightBulb.svg">
        </div>
        <hr>
        <div class="chgColor" @mousemove=" colorVal = Math.floor(Math.random() * 360)"
            :style="{ backgroundColor: 'hsl(' + colorVal + ',60%,60%)' }">backgroundColor: hsl( {{ colorVal }} 60%, 80%
            )
        </div>
        <hr>
        <div id="fImg">
            <img :src="imgUrl">
            <ol>
                <li v-for="food in manyFoods" @click="imgUrl = food.url">
                    {{ food.name }}
                </li>
            </ol>
        </div>
        <p class="clear"></p>




    </div>
</template>

<script>
import Test03 from './Test03.vue'
import Test02 from './Test02.vue'

import img_burrito from '../../../assets/img/img_burrito.svg'
import img_rice from '../../../assets/img/img_rice.svg'
import img_pizza from '../../../assets/img/img_pizza.svg'
import img_fish from '../../../assets/img/img_fish.svg'
import img_soup from '../../../assets/img/img_soup.svg'
import img_cake from '../../../assets/img/img_cake.svg'
import img_salad from '../../../assets/img/img_salad.svg'
import img_lightBulb from '../../../assets/img/img_lightBulb.svg'


export default {
    data() {
        return {
            imgUrl: img_burrito,
            colorVal: 50,
            lightOn: false,
            study: '0826',
            cnt: 0,
            currentComponent: '', // 초기에는 아무 컴포넌트도 표시하지 않음
            sports: [
                { sport: 'baseball' },
                { sport: 'football' },
                { sport: 'swimming' },
            ],
            manyFoods: [
                { name: 'Burrito', url: img_burrito },
                { name: 'Salad', url: img_salad },
                { name: 'Cake', url: img_cake },
                { name: 'Soup', url: img_soup },
                { name: 'Fish', url: img_fish },
                { name: 'Pizza', url: img_pizza },
                { name: 'Rice', url: img_rice }
            ],
        }
    },
    method: {
        toggleComponent1(componentName) {
            alert('1');
            if (this.currentComponent === componentName) {
                // 현재 선택된 컴포넌트가 이미 로드되어 있다면, null로 설정하여 숨김
                this.currentComponent = null;
            } else {
                // 다른 컴포넌트이거나 현재 아무 컴포넌트도 로드되어 있지 않다면, 해당 컴포넌트를 로드
                this.currentComponent = componentName;
            }
        },
    },

    components: {
        Test03,
        Test02
    },
    watch: {
        currentComponent(newVal, oldVal) {

        }
    }
}
</script>

<style lang="scss" scoped>
#fImg {
    border: dashed black 1px;
    width: 220px;
    padding: 20px;
}

#fImg>ol {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

#fImg li {
    padding-left: 6px;
    border-radius: 5px;
    width: 70px;
}

#fImg li:hover{
    cursor: pointer;
    background-color: aquamarine;
}

#fImg>img {
    float: right;
    width: 70%;
}

.enter {
    // clear: both;
}


.chgColor {
    height: 80px;
}

.component-container {
    padding: 20px;
    margin-top: 20px;
}

#appl>div {
    border: solid black 1px;
    width: 70%;
    // padding: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

figure {
    width: 80px;
    padding: 10px;
    margin: 10px;
    background-color: lightskyblue;
    border-radius: 5px;
}

figcaption {
    text-align: center;
}

img {
    width: 100%;
}


#appl2 {
    // border: solid black 1px;
    width: 90%;
    // padding: 10px;
    flex-wrap: wrap;
    display: flex;
    justify-content: left;
}

#appl2 li {
    text-align: center;
    list-style: none;
}

#lightDiv {
    position: relative;
    width: 150px;
    height: 150px;
}

#lightDiv>img {
    position: relative;
    width: 100%;
    height: 100%;
}

#lightDiv>div {
    position: absolute;
    top: 30%;
    left: 20%;
    width: 40%;
    height: 40%;
    border-radius: 50%;
    background-color: yellow;
}
</style>
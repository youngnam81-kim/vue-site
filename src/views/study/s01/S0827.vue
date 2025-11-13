<template>
    <div>
        <div>
            <input v-model="rangeVal" type="range" min="0" max="100" step="1">
            <p>rangeVal : {{ rangeVal }}</p>
        </div>
        <hr>

        <p>{{ study }}</p>
        <hr>
        <!-- <button @click="currentComponent = 'Test03'">Test03 로드</button>
        <button @click="currentComponent = 'Test02'">Test02 로드</button>
        <button @click="currentComponent = null">초기화</button> -->
        <hr>
        영역 클릭시 Txt가 변경됨. (changeText 호출) <br></br>
        <div @click="changeText" class="bg">{{ txt }}</div>

        <pre>
const txt = ref('텍스트 변경 전.');
function changeText() {
    txt.value = '안녕?';
}
</pre>
        <hr>
        마우스 좌표. event (mousePos 호출) <br></br>
        <div @mousemove="mousePos" class="bg">
            <span>{{ xPos }} : {{ yPos }}</span>
        </div>
        <pre>
const mousePos = (e) => {
    xPos.value = e.offsetX;
    yPos.value = e.offsetY;
}
</pre>
        <hr>
        매개변수 추가. (addMouse 호출) <br></br>
        <div>
            <p>{{ "Mouse count : " + count }}</p>
            <button @click="addMouse(1)">1 증가</button>
            <button @click="addMouse(5)">5 증가</button>
            <button @click="addMouse(-1)">-1 감소</button>
            <button @click="addMouse(0)">0 초기화</button>
        </div>
        <pre>
const addMouse = (no) => {
    if (no === 0) {
        count.value = no;
    } else {
        count.value += no;
    }
}                
 </pre>
        <hr>
        event, 매개변수 추가. (myMethod 호출) <br></br>
        <img src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA1MTVfMjI5%2FMDAxNzQ3Mjk4NDYwNzIz.g-NumaAesj3599bAc3B96EuRPz4NvjOGupBoMB7FEH8g.beJAH2B1AnKEC7QdXenOyq2l8_agzXgR46SwdiBVhW8g.PNG%2F%25C8%25A3%25B6%25FB%25C0%25CC%25B6%25EC_%25BC%25BA%25B0%25DD_%25B9%25FC%25B6%25EC_%25C5%25E4%25B3%25A2%25B6%25EC_%25BC%25BA%25B0%25DD_%25C6%25AF%25C2%25A12.png&type=a340"
            id="tiger" v-on:click="myMethod($event, 'Hello')" width="300" height="200"></img>
        <p>{{ msgAndId }}</p>
        <pre>
const myMethod = (e, msg) => {
    msgAndId.value = msg + ', ' + e.target.id;
}
</pre>
        <hr>
        양방향 바인딩 v-model 사용.
        <div>
            <input type="text" v-model="inpText">
            <p>input value : {{ inpText }}</p>
        </div>

        <label> Important item?
            <input type="checkbox" v-model="important"> {{ important }}
        </label>
        <hr>
        <div>
            <p>
                What do you need? <br>
                <input type="text" required placeholder="item name.." v-model="itemName">
            </p>
            <p>
                How many? <br>
                <input type="number" placeholder="number of items.." v-model="itemNumber">
            </p>
            <p>
                Important?
                <label>
                    <input type="checkbox" v-model="itemImportant">
                    {{ itemImportant }}
                </label>
            </p>
            <button @click="addItem">Add item</button>
            <div>
                <p><strong>Shopping list:</strong></p>
                <ul>
                    <li v-for="item in shoppingList" v-bind:class="{ impClass: item.important }">
                        {{ item.name }}, {{ item.number }}, 중요도 : {{ item.important }}</li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const important = ref(false);
const study = ref('0827');
const xPos = ref(0);
const yPos = ref(0);
const count = ref(0);
const msgAndId = ref('');
const txt = ref('텍스트 변경 전.');
const inpText = ref('');
const itemName = ref(null);
const itemNumber = ref(null);
const itemImportant = ref(false);
const shoppingList = ref([{ name: 'Tomatoes', number: 5, important: false }]);
const rangeVal = ref(70);

watch(rangeVal, (val) => {
    if (val > 20 && val < 60) {
        if (val < 40) {
            rangeVal.value = 20;
        } else {
            rangeVal.value = 60;
        }
    }
})

function addItem() {
    let item = {
        name: itemName.value,
        number: itemNumber.value,
        important: itemImportant.value
    }
    // console.log(item);
    shoppingList.value.push(item);
    itemName.value = null;
    itemNumber.value = null;
    itemImportant.value = false;
}

function changeText() {
    txt.value = '안녕?';
}

const mousePos = (e) => {
    xPos.value = e.offsetX;
    yPos.value = e.offsetY;
}

const addMouse = (no) => {
    if (no === 0) {
        count.value = no;
    } else {
        count.value += no;
    }
}

const myMethod = (e, msg) => {
    // console.log(e);
    msgAndId.value = msg + ', ' + e.target.id;
}
</script>

<style lang="scss" scoped>
.bg {
    // width: 200px;
    width: 50%;
    height: 100px;
    background-color: yellow;
    display: inline-block;
}
</style>
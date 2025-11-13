<template>
    <div class="dropdown-container border-no">
        <!-- 탑 메뉴 아이템 -->
        <div class="menu-item " @click="toggleDropdown">
            {{ menuTitle }}
            <span :class="{ 'arrow-down': !isOpen, 'arrow-up': isOpen }"></span>
        </div>

        <!-- 트랜지션이 제대로 작동하도록 수정 -->
        <transition name="slide">
            <ul class="dropdown-menu" v-show="isOpen">
                <li v-for="(item, index) in menuItems" :key="index" @click="selectItem(item)">
                    {{ item.label }}
                </li>
            </ul>
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        menuTitle: {
            type: String,
            default: '메뉴'
        },
        menuItems: {
            type: Array,
            default: () => []
        }
    },
    mounted() {
        // 전역 클릭 이벤트 리스너 추가
        document.addEventListener('click', this.closeDropdownOnClickOutside);
    },
    beforeUnmount() {
        // 컴포넌트가 제거될 때 이벤트 리스너도 제거
        document.removeEventListener('click', this.closeDropdownOnClickOutside);
    },
    data() {
        return {
            isOpen: false,
        }
    },
    methods: {
        toggleDropdown() {
            this.isOpen = !this.isOpen;
        },
        selectItem(item) {
            this.$emit('item-selected', item);
            this.isOpen = false;
        },
        closeDropdownOnClickOutside(event) {
            // 드롭다운 컨테이너 외부 클릭 확인
            if (!this.$el.contains(event.target)) {
                this.isOpen = false;
            }
        },

    }
}
</script>

<style scoped>
.dropdown-container {
    position: relative;
    display: inline-block;
    border: none;
    padding: none;
    margin: none;
}

.menu-item {
    /* padding: 10px 15px; */
    border: none;
    padding: 10px 15px;
    /* 내부 패딩 */
    margin: 0px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.dropdown-menu {
    text-align: center;
    position: absolute;
    top: 100%;
    left: -43px;
    /* right: 500px; */
    width: 150px;
    margin: 0px;
    padding: 0px;
    /* width: 100%; */
    /* width: 150px; 더 넓게 수정 */
    /* background-color: rgba(255, 255, 255, 0.8); */
    background-color: white;
    /* 투명도 제거 */
    border: 1px solid rgb(206, 206, 206);
    /* border-radius: 0 0 4px 4px; */
    border-radius: 10px;

    /* padding-right: 10px;
    padding-left: 10px;  */
    list-style: none;
    z-index: 100;
    transform-origin: top;
}

.dropdown-menu li {
    padding: 10px 15px;
    cursor: pointer;
}

.dropdown-menu li:hover {
    background-color: rgba(240, 240, 240, 0.8);
}

/* 화살표 스타일 */
.arrow-down,
.arrow-up {
    border: none;
    padding: none;
    margin: none;
}

/* 수정된 트랜지션 애니메이션 */
.slide-enter-active {
    animation: slide-in 0.1s ease-out forwards;
}

.slide-leave-active {
    animation: slide-out 0.1s ease-out forwards;
}

@keyframes slide-in {
    0% {
        transform: scaleY(0);
        opacity: 0;
    }

    100% {
        transform: scaleY(1);
        opacity: 1;
    }
}

@keyframes slide-out {
    0% {
        transform: scaleY(1);
        opacity: 1;
    }

    100% {
        transform: scaleY(0);
        opacity: 0;
    }
}
</style>
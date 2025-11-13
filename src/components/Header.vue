<template>
    <div class="container">
        <div class="logo" @click="goHome" style="cursor: pointer">
            <h1>Vue </h1>
        </div>
        <nav class="navbar">
            <div class="home-icon" @click="goHome">
                <!-- <font-awesome-icon :icon="houseIcon" /> -->
                <i class="material-icons">home</i>
            </div>
            <div class="menu-icon" @click="toggleMenu">
                <span></span>
            </div>

            <div class="menu-icon" @click="toggleMenu">
                <span> ▤</span>
            </div>

            <div class="user-info" v-if="authStore.isAuthenticated"> <!---->
                <p @click="userDetailId"
                    style="margin: 0px; padding: 7px; padding-left: 20px ; padding-bottom: 10px; font-size: 13px; text-decoration: underline;">
                    {{ authStore.currentUser.userName }}
                </p>
                <p @click="handleLogout"
                    style="margin: 0px; padding: 7px; padding-bottom: 10px; font-size: 13px; cursor: pointer;">
                    [로그아웃]
                </p>
            </div>
            <div class="user-info" v-else>
                <p @click="handleLogout"
                    style="margin: 0px; padding-top: 7px; font-size: 13px ; text-decoration: none; cursor: pointer;">
                    &nbsp;[로그인]
                </p>
            </div>

            <div class="border-no">
                <div class="nav-links" :class="{ active: menuActive }">
                    <!-- 드롭다운 메뉴 추가 -->
                    <DropdownMenu class="dropdownMenu" menuTitle="스터디" :menuItems="studyMenuItems"
                        @item-selected="handleDropdownSelection" />
                    <DropdownMenu class="dropdownMenu" menuTitle="테스트" :menuItems="testMenuItems"
                        @item-selected="handleDropdownSelection" />
                    <!-- 기존 라우터 링크들 중 드롭다운에 포함되지 않는 것들 -->
                    <!-- <router-link @click="toggleMenu" to="/about">소개</router-link> -->
                    <router-link @click="toggleMenu" to="/studentLink"
                        v-if="authStore.isAuthenticated">교육생링크</router-link>
                    <router-link @click="toggleMenu" to="/boardList" v-if="authStore.isAuthenticated">게시판</router-link>
                    <router-link @click="toggleMenu" to="/userList" v-if="authStore.isAuthenticated">사용자관리</router-link>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth'; // 스토어 임포트
import DropdownMenu from './DropdownMenu.vue'; // 드롭다운 컴포넌트 import
import { faHouse } from '@fortawesome/free-solid-svg-icons'

export default {
    data() {
        return {
            houseIcon: faHouse,
            SiteName: 'Vue Project',
            menuActive: false,
            // 드롭다운 메뉴 아이템 정의
            studyMenuItems: [
                { label: '0827', route: '/s0827' },
                { label: '0826', route: '/s0826' },
                { label: '0825', route: '/s0825' },
                { label: 'Hook01', route: '/hook01' },
            ],
            testMenuItems: [
                { label: 'Test03', route: '/test03' },
                { label: 'Test02', route: '/test02' },
                { label: 'Test01', route: '/test' },
            ],
        }
    },
    setup() {
        const authStore = useAuthStore(); // 스토어 인스턴스 생성
        return { authStore }; // 템플릿에서 authStore를 사용할 수 있도록 반환
    },
    components: {
        DropdownMenu // 드롭다운 컴포넌트 등록
    },
    methods: {
        toggleMenu(isClose) {
            if (window.innerWidth > 900) {
                this.menuActive = false;
            } else {
                this.menuActive = !this.menuActive;
            }
            if (isClose == false) {
                this.menuActive = false;
            }
        },
        handleLogout() {
            this.authStore.logout(); // ⬆️❌➡️⬆️⬅️ 스토어 액션 호출하여 로그아웃
            this.$router.push('/login'); // 로그아웃 후 로그인 페이지로 리다이렉트
            this.toggleMenu(false); // 메뉴 닫기
        },
        handleDropdownSelection(item) { // 드롭다운 메뉴 아이템 클릭 시
            this.$router.push(item.route); // 해당 라우트로 이동
            this.toggleMenu(false); // 메뉴 닫기
        },
        goHome() {
            this.$router.push('/'); // 로그아웃 후 로그인 페이지로 리다이렉트
            window.scrollTo({
                top: 0,
                behavior: 'instant'
            });
        },
        userDetailId() {
            this.$router.push({
                name: 'userDetailId',
                params: { id: this.authStore.currentUser.id }
            });
        },
    },

}
</script>

<style lang="scss" scoped>
.border-no {
    border: 0px;
    padding: 0px;
    margin: 0px;
    text-align: right;
}

.logo {
    width: 200px;
    padding: 0px;
    padding-left: 10px;
    padding-right: 10px;
    margin: 0px;
    position: fixed;
    margin-bottom: 0px;
    border-radius: 5px;
    border: 1px solid rgb(206, 206, 206);
    border-radius: 5px;
    text-align: center;
}

nav {
    border: 1px solid rgb(206, 206, 206);
    border-radius: 5px;
    margin-bottom: 1px;
    margin-top: 1px;
    font-size: small;
    text-align: center;
    width: 10%;
    /* 너비를 100%로 설정 */
}

a {
    text-decoration: none;
    color: rgb(65, 65, 65);
}

a:hover {
    color: rgb(0, 0, 0);
    text-decoration: underline;
}

/* h2 태그(프로젝트 제목)에 대한 스타일 추가 */
h2 {
    margin-right: auto;
    /* 오른쪽 여백을 자동으로 설정하여 왼쪽 정렬 */
    text-align: left;
    width: 300px
}

.container {
    border: none;
    position: relative;
    padding: 0px;
    width: auto;
    //padding-right: 200px;
    //margin-right: 0px;
    // padding-left: 0px;

    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: space-between;
    align-items: center;

}

.user-info {
    border: 0px;
    display: flex;
    cursor: pointer;
    padding: 8px 15px;
    justify-content: right;
    display: none;
}

.navbar {
    margin-left: 210px;
    // margin-bottom: 0px;
    padding: 1px;

    border: 1px solid rgb(206, 206, 206);
    text-align: center;
    display: flex;
    flex-direction: row-reverse;
    //justify-content: flex-end;
    width: 100%;
    /* 너비를 100%로 설정 */
}

.nav-links {
    display: flex;
    flex-direction: row;
    gap: 15px;
    border: none;
    justify-content: flex-end;
    align-items: center;
    margin: 0px;
    padding: 16px;
}

.menu-icon {
    display: none;
    cursor: pointer;
    padding: 8px 15px;
    background-color: #f0f0f0;
    border-radius: 4px;
    font-weight: bold;
    margin-left: auto;
    /* 오른쪽 정렬을 위해 추가 */
}

.home-icon {
    display: none;
    cursor: pointer;

}

/* 미디어 쿼리 부분은 동일하게 유지 */
@media screen and (max-width: 800px) {
    h2 {
        font-size: 20px;
    }

    .menu-icon {
        display: block;
        position: fixed;
        top: 11px;
        right: 29px;
        padding: 5px 20px;
        margin-bottom: 0px;
    }

    .home-icon {
        display: block;
        position: fixed;
        top: 11px;
        left: 29px;
        padding: 1px 15px 0px 15px;
        margin-bottom: 0px;
        background-color: #f0f0f0;
        // color: rgb(130, 130, 130);
        // color: black;
        color: rgb(121, 121, 121);
        cursor: pointer;
        border: 1px solid rgb(206, 206, 206);
    }

    .user-info {
        border: 0px;
        display: flex;
        cursor: pointer;
        padding: 0px;
        padding-left: 80px;
        // background-color: #f0f0f0;
        justify-content: center;
        margin-right: 5px;
    }

    .nav-links {
        display: none;
        flex-direction: column;
        position: absolute;
        top: 43px;
        // left: 0;
        right: 29px;
        /* 왼쪽 정렬 */
        width: 100%;
        /* 전체 너비 사용 */
        width: 200px;
        background-color: white;
        // padding: 10px 0;
        /* 상하 패딩만 주고 좌우는 0으로 */
        z-index: 50;
        text-align: center;
        /* 텍스트 중앙 정렬 */
        border: 1px solid rgb(206, 206, 206);
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        /* 그림자 효과 (필요하시면 주석 해제) */
        padding: none;
        margin: none;
        text-align: center;
    }

    .navbar {
        margin-left: 0px;
        // margin-bottom: 0px;
        padding: 1px;

        border: 1px solid rgb(206, 206, 206);
        text-align: center;
        display: flex;
        flex-direction: row;
        //justify-content: flex-end;
        height: 35px;
        width: 100%;
        /* 너비를 100%로 설정 */
    }

    p {
        padding: 10px 15px;
        margin: 10px;
    }

    .logo {
        display: none;
    }

    .nav-links.active {
        display: flex;
        position: fixed;
    }
}

.nav-links>.router-link-exact-active,
.nav-links>a {
    /* router-link에 직접 적용되는 스타일 */
    padding: 10px 15px;
    /* 내부 패딩 */
    margin: 0;
    /* 마진 초기화 */
    height: 100%;
    /* 부모의 높이에 맞추기 (align-items: center; 와 시너지) */
    display: flex;
    /* 내부 텍스트도 중앙 정렬이 필요하면 flex 사용 */
    align-items: center;
    justify-content: center;
    /* border: none; /* 라우터 링크 자체에 원치 않는 테두리가 있다면 제거 */
}

.dropdownMenu:hover {
    color: rgb(0, 0, 0);
    text-decoration: underline;
}
</style>

<template>
    <nav class="navbar">
        <div v-if="authStore.isAuthenticated" class="login-button" @click="toggleMenu">
            <p @click="userDetailId" style="margin: 0px; padding: 0px; font-size: 13px; text-decoration: underline;">
                {{ authStore.currentUser.userName }}
            </p>
            <p @click="handleLogInOut" style="margin: 0px; padding: 0px; font-size: 13px; cursor: pointer;">
                [로그아웃]
            </p>
        </div>
        <div v-else class="login-button">
                <p @click="handleLogInOut" style="text-align: right; margin: 0px; padding: 0px; font-size: 13px; text-decoration: underline;  cursor: pointer;">
                    [로그인]
                </p>
        </div>

        <!-- 트리 메뉴 추가 -->
        <div class="nav-links" :class="{ active: menuActive }">
            <tree-node v-for="(menuItem, index) in menuItems" :key="index" :node="menuItem"
                :checked-node-ids="checkedNodeIds" @update-checked-status="handleNodeCheckChange"
                @navigate="handleNavigation"></tree-node>
        </div>

        <div class="menu-site" @click="toggleMenu">
            <p style="margin: 0px; padding: 0px; font-size: 13px;">▤ &nbsp; 참고 사이트</p>
        </div>

        <!-- ✨ 여기에 선택된 ID를 표시하는 영역 추가 ✨ -->
        <div class="selected-ids-display">
            <p>현재 선택된 메뉴 ID ({{ checkedNodeIds.length }}개)</p>
            <div v-if="checkedNodeIds.length > 0" class="id-list">
                <!-- 각 ID를 줄바꿈 또는 쉼표로 구분하여 표시 -->
                <span v-for="(id, index) in checkedNodeIds" :key="id">
                    {{ id }}{{ index < checkedNodeIds.length - 1 ? ', ' : '' }} </span>
            </div>
            <p v-else class="no-selection border-no">선택된 항목이 없습니다.</p>
        </div>
    </nav>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import TreeNode from './TreeNode.vue';

export default {
    components: {
        TreeNode
    },
    data() {
        return {
            SiteName: 'Vue Project',
            menuActive: false,
            checkedNodeIds: [], // 현재 체크된 모든 노드의 ID 목록
            // 트리 구조 메뉴 데이터
            menuItems: [
                {
                    id: 'study', label: '스터디', path: '#', requiresAuth: true,
                    children: [
                        { id: 'study-0827', label: '0827', path: '/s0827', requiresAuth: true },
                        { id: 'study-0826', label: '0826', path: '/s0826', requiresAuth: true },
                        { id: 'study-0825', label: '0825', path: '/s0825', requiresAuth: true },
                        { id: 'study-hook01', label: 'Hook01', path: '/hook01', requiresAuth: true }
                    ]
                },
                {
                    id: 'test', label: '테스트', path: '#', requiresAuth: true,
                    children: [
                        { id: 'test-03', label: 'Test03', path: '/test03', requiresAuth: true },
                        { id: 'test-02', label: 'Test02', path: '/test02', requiresAuth: true },
                        { id: 'test-01', label: 'Test01', path: '/test', requiresAuth: true }
                    ]
                },
                { id: 'students', label: '교육생링크', path: '/studentLink', requiresAuth: true }, //메뉴 가져올때 관리자도 가져오게 하면 될듯 고정값은 안되네
                { id: 'board-list', label: '게시판', path: '/boardList', requiresAuth: true }, //메뉴 가져올때 관리자도 가져오게 하면 될듯 고정값은 안되네
                { id: 'user-mgmt', label: '사용자 관리', path: '/userList', requiresAuth: true }, //메뉴 가져올때 관리자도 가져오게 하면 될듯 고정값은 안되네

            ]
        }
    },
    setup() {
        const authStore = useAuthStore();
        const isAuth = authStore.isAuthenticated;
        return { authStore };
    },
    methods: {
        toggleMenu() {
            if (window.innerWidth > 900) {
                this.menuActive = false;
            } else {
                this.menuActive = !this.menuActive;
            }
        },
        handleLogInOut() {
            this.authStore.logout(); // ⬆️❌➡️⬆️⬅️ 스토어 액션 호출하여 로그아웃
            this.$router.push('/login');
            this.toggleMenu(false); // 메뉴 닫기
        },
        userDetailId() {
            this.$router.push({
                name: 'userDetailId',
                params: { id: this.authStore.currentUser.id }
            });
        },
        handleNavigation(item) {
            // if (item.requiresAuth && !this.authStore.isAuthenticated) { //로그인 안되어있으면 로그인 하도록 유도. 하지만 db 에서 가져올때는 변경 될것임.
            if (item.requiresAuth) {
                //this.$router.push('/login');
            } else if (item.path && item.path !== '#') {
                this.$router.push(item.path);
                if (window.innerWidth <= 900) {
                    this.toggleMenu();
                    alert('2');
                }
            }
        },
        handleNodeCheckChange({ nodeId, isChecked, affectedChildIds = [] }) {
            // 영향을 받는 모든 ID들을 리스트로 만듬 (현재 노드 ID + 자식 ID들)
            const allAffectedIds = [nodeId, ...affectedChildIds];

            if (isChecked) {
                // 선택: 중복 없이 checkedNodeIds에 추가
                allAffectedIds.forEach(id => {
                    if (!this.checkedNodeIds.includes(id)) {
                        this.checkedNodeIds.push(id);
                    }
                });
            } else {
                // 해제: checkedNodeIds에서 제거
                this.checkedNodeIds = this.checkedNodeIds.filter(id => !allAffectedIds.includes(id));
            }
        },
        handleNodeSelection(data) {
            // 체크박스 상태 변경 처리
            if (data.id) {
                // 단일 노드 체크/해제
                if (data.checked) {
                    if (!this.checkedNodes.includes(data.id)) {
                        this.checkedNodes.push(data.id);
                    }
                } else {
                    this.checkedNodes = this.checkedNodes.filter(id => id !== data.id);
                }
            }

            if (data.childIds) {
                // 자식 노드들 체크/해제
                if (data.checked) {
                    // 체크 추가
                    data.childIds.forEach(id => {
                        if (!this.checkedNodes.includes(id)) {
                            this.checkedNodes.push(id);
                        }
                    });
                } else {
                    // 체크 제거
                    this.checkedNodes = this.checkedNodes.filter(id =>
                        !data.childIds.includes(id)
                    );
                }
            }// 부모-자식 관계 업데이트
            this.updateParentChildRelationships();
        },

        updateParentChildRelationships() {
            // 모든 메뉴 항목을 순회하면서 부모-자식 체크 상태 확인
            this.menuItems.forEach(item => {
                this.checkNodeAndChildren(item);
            });
        },
        checkNodeAndChildren(node) {
            if (node.children && node.children.length > 0) {
                // 모든 자식이 체크되었는지 확인
                const allChildrenChecked = node.children.every(child =>
                    this.checkedNodes.includes(child.id)
                );

                // 일부 자식이라도 체크되었는지 확인
                const someChildrenChecked = node.children.some(child =>
                    this.checkedNodes.includes(child.id)
                );

                // 현재 노드의 체크 상태
                const isNodeChecked = this.checkedNodes.includes(node.id);

                // 모든 자식이 체크되었는데 부모가 체크되지 않았으면 부모도 체크
                if (allChildrenChecked && !isNodeChecked) {
                    this.checkedNodes.push(node.id);
                }

                // 자식 중 하나도 체크되지 않았는데 부모가 체크되어 있으면 부모 체크 해제
                else if (!someChildrenChecked && isNodeChecked) {
                    this.checkedNodes = this.checkedNodes.filter(id => id !== node.id);
                }

                // 자식 노드들도 재귀적으로 체크
                node.children.forEach(child => {
                    if (child.children && child.children.length > 0) {
                        this.checkNodeAndChildren(child);
                    }
                });
            }
        },

        updateAllNodesCheckState() {
            // 재귀적으로 모든 노드의 체크 상태 확인 및 업데이트
            this.menuItems.forEach(item => {
                this.updateNodeAndChildrenCheckState(item);
            });
        },

        updateNodeAndChildrenCheckState(node) {
            if (node.children && node.children.length > 0) {
                // 모든 자식이 체크되었는지 확인
                const allChildrenChecked = node.children.every(child =>
                    this.checkedNodes.includes(child.id)
                );

                // 일부 자식이 체크되었는지 확인
                const someChildrenChecked = node.children.some(child =>
                    this.checkedNodes.includes(child.id)
                );

                // 부모 노드의 현재 체크 상태
                const isNodeChecked = this.checkedNodes.includes(node.id);

                // 모든 자식이 체크되었는데 부모가 체크되지 않았으면 부모도 체크
                if (allChildrenChecked && !isNodeChecked) {
                    this.checkedNodes.push(node.id);
                }
                // 자식 중 하나도 체크되지 않았는데 부모가 체크되어 있으면 부모 체크 해제
                else if (!someChildrenChecked && isNodeChecked) {
                    this.checkedNodes = this.checkedNodes.filter(id => id !== node.id);
                }

                // 자식 노드들도 재귀적으로 체크
                node.children.forEach(child => {
                    if (child.children && child.children.length > 0) {
                        this.updateNodeAndChildrenCheckState(child);
                    }
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.navbar {
    text-align: left;
    flex-direction: row;
    display: flex;
    flex-direction: column;
    width: 200px;
    position: fixed;
}

.nav-links {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 8px 15px;
}

.menu-site {
    display: block;
    cursor: pointer;
    padding: 8px 15px;
    background-color: #f0f0f0;
}

.login-button {
    display: flex;
    cursor: pointer;
    padding: 8px 15px;
    background-color: #f0f0f0;
    justify-content: space-between;
}

.menu-icon {
    display: block;
    cursor: pointer;
    padding: 8px 15px;
    background-color: #f0f0f0;
}

a {
    text-decoration: none;
    color: rgb(65, 65, 65);
}

a:hover {
    color: rgb(0, 0, 0);
    text-decoration: underline;
}

template {
    padding-top: 0px;
    margin: 0px;
}

.login-info-section {
    margin: 0px;
    padding: 0px;
    border: none;
    width: 0px;
}

.selected-ids-display {
    // margin-top: 20px;
    // padding: 10px 15px;
    padding: 0px;
    border-top: 1px solid #e0e0e0;
    background-color: #f9f9f9;
    font-size: 12px;
    color: #555;
    word-break: break-all;
    /* 긴 ID의 경우 줄바꿈 처리 */
}

.selected-ids-display p {
    margin: 10px;
    margin-left: 10px;
    font-size: 13px;
    color: #333;
}

.selected-ids-display .id-list {
    // line-height: 1.6;
    margin: 0px;
    padding: 10px
}

.selected-ids-display .no-selection {
    font-style: italic;
    color: #888;
}
</style>
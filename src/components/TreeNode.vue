<template>
  <div class="tree-node border-no" :style="{ paddingLeft: depth * 15 + 'px' }">
    <div class="tree-content border-no">
      <input type="checkbox" :checked="isFullyChecked" :indeterminate.prop="isPartiallyChecked"
        @change="handleCheckboxChange" @click.stop class="tree-checkbox border-no" ref="checkboxRef" />
      <span class="tree-icon" @click="toggleExpanded" v-if="hasChildren">
        {{ isExpanded ? '▼' : '▶' }}
      </span>
      <span v-else class="tree-spacer"></span>
      <span class="tree-label" @click="navigateTo">{{ node.label }} </span>
    </div>

    <div v-if="hasChildren && isExpanded" class="tree-children border-no"> <!-- node.requiresAuth 권한채크임. 디비에서 가져오면 메뉴 안보임.-->
      <tree-node v-for="(child, index) in node.children" :key="index" :node="child" :depth="depth + 1"
        :checked-node-ids="checkedNodeIds" @update-checked-status="handleChildCheckChange"
        @navigate="$emit('navigate', $event)"></tree-node>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth'; // 스토어 임포트
export default {
  name: 'TreeNode',
  props: {
    node: {
      type: Object,
      required: true
    },
    depth: {
      type: Number,
      default: 0
    },
    checkedNodeIds: { // 최상위 컴포넌트로부터 받는 전체 체크된 ID 목록
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isExpanded: false
    };
  },
  computed: {
    hasChildren() {
      return this.node.children && this.node.children.length > 0;
    },
    // ✨ 현재 노드가 완전히 체크되었는지 여부
    isFullyChecked() {
      return this.checkedNodeIds.includes(this.node.id);
    },
    // ✨ 현재 노드가 부분적으로 체크되었는지 여부 (새로운 핵심 로직)
    isPartiallyChecked() {
      if (!this.hasChildren) return false;

      const allChildIds = this.getAllDescendantIds(this.node); // 현재 노드의 모든 자식 및 하위 자식 ID

      const numCheckedChildren = allChildIds.filter(id => this.checkedNodeIds.includes(id)).length;

      return numCheckedChildren > 0 && numCheckedChildren < allChildIds.length;
    }
  },
  methods: {
    toggleExpanded() {
      if (this.hasChildren) {
        this.isExpanded = !this.isExpanded;
      }
    },
    navigateTo() {
      if (this.node.path && this.node.path !== '#') {
        this.$router.push(this.node.path);
        this.$emit('navigate', this.node);
      } else if (this.hasChildren) { // path가 없으면 토글만 하도록 변경
        this.toggleExpanded();
      }
    },
    // ✨ 핵심: 체크박스 변경 핸들러
    handleCheckboxChange(e) {
      const isChecked = e.target.checked;
      const affectedChildIds = this.getAllDescendantIds(this.node); // 영향을 받는 모든 자식 ID

      // 최상위 컴포넌트로 변경 상태를 알림
      this.$emit('update-checked-status', {
        nodeId: this.node.id,
        isChecked: isChecked,
        affectedChildIds: affectedChildIds // 현재 노드의 모든 하위 노드 ID 포함
      });
    },
    // ✨ 자식 컴포넌트로부터 체크 상태 변경 이벤트를 받아서 다시 상위로 전달
    handleChildCheckChange(data) {
      this.$emit('update-checked-status', data); // 받은 이벤트를 그대로 다시 emit
    },
    // ✨ 재귀적으로 모든 자식 및 하위 자식 노드의 ID를 가져옴
    getAllDescendantIds(node, ids = []) {
      if (node.children) {
        node.children.forEach(child => {
          ids.push(child.id);
          this.getAllDescendantIds(child, ids); // 재귀 호출
        });
      }
      return ids;
    },
    // ✨ indeterminate 속성 직접 설정
    setIndeterminate() {
      if (this.$refs.checkboxRef) {
        this.$refs.checkboxRef.indeterminate = this.isPartiallyChecked;
      }
    }
  },
  mounted() {
    this.setIndeterminate();
  },
  updated() {
    this.setIndeterminate();
  },
  watch: {
    isPartiallyChecked: 'setIndeterminate',
    checkedNodeIds: {
      handler(newVal) {
        this.setIndeterminate();

        // 자식 노드들의 체크 상태에 따른 부모 노드 업데이트
        if (this.hasChildren) {
          const childIds = this.getAllDescendantIds(this.node);

          // 자식들 중 체크된 항목의 ID 목록
          const checkedChildIds = childIds.filter(id => newVal.includes(id));

          // 모든 자식이 체크되었는지 확인
          const allChildrenChecked = checkedChildIds.length === childIds.length;
          // 체크된 자식이 하나도 없는지 확인
          const noChildChecked = checkedChildIds.length === 0;

          // 모든 자식이 체크되었는데 부모는 체크되지 않은 경우
          if (allChildrenChecked && !newVal.includes(this.node.id)) {
            this.$emit('update-checked-status', {
              nodeId: this.node.id,
              isChecked: true,
              affectedChildIds: checkedChildIds // 실제 체크된 자식 ID 목록 전달
            });
          } else if (noChildChecked && newVal.includes(this.node.id)) { // 모든 자식이 체크 해제되었는데 부모는 체크된 경우
            this.$emit('update-checked-status', {
              nodeId: this.node.id,
              isChecked: false,
              affectedChildIds: childIds // 모든 자식 ID 목록 전달
            });
          }
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.tree-node {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 0px;
  margin: 0px;
}

.tree-content {
  display: flex;
  align-items: center;
  padding: 3px 5px;
  margin: 0px;
  cursor: pointer;
  border-radius: 4px;
}

.tree-content:hover {
  background-color: #f0f0f0;
}

.tree-checkbox {
  margin-right: 8px;
  cursor: pointer;
}

.tree-icon {
  width: 15px;
  font-size: 10px;
  text-align: center;
  margin-right: 5px;
}

.tree-spacer {
  width: 15px;
  margin-right: 5px;
}

.tree-label {
  flex-grow: 1;
}

.tree-children {
  /* padding-left: 20px; */
  padding: 0px;
}
</style>
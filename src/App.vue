<script setup>
import './css/App.css'
import RowLayout from './layouts/RowLayout.vue';
import ColLayout from './layouts/ColLayout.vue';
import MultipleLayout from './layouts/MultipleLayout.vue';

</script>

<template>
  <div class="content-wrapper border-no"> <!-- 새로운 div로 감싸고 클래스 추가 -->
    <RowLayout></RowLayout>
    <hr>
    <!-- <ColLayout></ColLayout> -->
    <hr>
    <!-- <MultipleLayout></MultipleLayout> -->
  </div>
</template>

<style lang="scss" scoped>
.content-wrapper {
  display: flex;
  /* Flexbox 활성화 */
  flex-direction: column;
  /* 자식 요소들을 세로로 정렬 (RowLayout, hr, ColLayout) */
  align-items: center;
  /* 세로 정렬 시, 자식 요소들을 수평 중앙으로 정렬 */

  /* 이 컴포넌트 자체가 부모 컨테이너 내에서 가운데 정렬되기를 원한다면 */
  /* width나 max-width를 지정하고 margin: 0 auto;를 추가하세요. */
  /* 예: */
  /* width: 100%; */
  /* max-width: 1300px; */
  /* margin: 0 auto; */
}

hr {
  width: 100%;
  /* 부모(.content-wrapper) 너비에 맞춰 확장 */
  border: none;
  /* 기본 테두리 제거 */
  border-top: 1px solid #eee;
  /* 얇은 가로줄 추가 */
  margin: 20px 0;
  /* 위아래 여백 조정 */
}
</style>

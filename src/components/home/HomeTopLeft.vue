<template>
    <div>
        HomeTopLeft
        <label class="toggle-switch">
            <input type="checkbox" id="check">
            <span class="slider"></span>
        </label>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
/* 토글버튼 사이즈 */
.toggle-switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 20px;
}

/* 실제 체크박스는 숨기기 */
.toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

/* 토글 배경 스타일 */
.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 25px;
}

/* 토글 버튼(동그란 부분) 스타일 */
.slider:before {
    position: absolute;
    content: "";
    height: 12px;
    width: 12px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .2s;
    border-radius: 50%;
}

/* 체크됐을 때 배경 색상 변경 */
input:checked+.slider {
    background-color: #2196F3;
}

/* 체크됐을 때 동그란 버튼 위치 이동 */
input:checked+.slider:before {
    transform: translateX(30px);
}
</style>
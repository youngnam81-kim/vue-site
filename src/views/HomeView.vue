<!-- src/views/Home.vue -->
<template>
  <div class="home">
    <div class="top-component border-no">
      <HomeTopLeft class="homeTopLeft" />
      <HomeTopRight class="homeTopRight" />
    </div>
    <div class="middle-component">
      <!-- <HomeMiddleLeft />
      <HomeMiddleRight /> -->
    </div>
    <div class="bottom-component border-no">
      <HomeBottomLeft class="homeBottomLeft" />
      <HomeBottomRight class="homeBottomRight" />
    </div>
  </div>
</template>
<script>

import HomeTopLeft from '../components/home/HomeTopLeft.vue';
import HomeTopRight from '../components/home/HomeTopRight.vue';
import HomeMiddleLeft from '../components/home/HomeMiddleLeft.vue';
import HomeMiddleRight from '../components/home/HomeMiddleRight.vue';
import HomeBottomLeft from '../components/home/HomeBottomLeft.vue';
import HomeBottomRight from '../components/home/HomeBottomRight.vue';

export default {
  components: {
    HomeTopLeft,
    HomeTopRight,
    HomeBottomLeft,
    HomeBottomRight,
    HomeMiddleLeft,
    HomeMiddleRight,
  }
}

</script>

<style lang="scss" scoped>
.top-component {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 0px;
  justify-content: space-between;
}

.middle-component {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 0px;
  justify-content: space-between;
}

.bottom-component {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 0px;
  min-height: 190px;
  justify-content: space-between;
}

.homeTopLeft {
  width: 74%;
  margin-right: 10px;
}

.homeTopRight {
  width: 24%;
}

.homeBottomLeft {
  // width: 450px;
  width: 100%;
  height: 200px;
  margin-right: 0px;
}

.homeBottomRight {
  // width: 450px;
  width: 100%;
  height: 200px;
}

@media screen and (max-width: 800px) {
  .homeBottomLeft {
    // width: 450px;
    width: 100%;
    margin-right: 0px;
  }

  .homeBottomRight {
    // width: 450px;
    width: 100%;
  }

  .homeTopLeft {
    width: 100%;
    margin-right: 0px;
  }

  .homeTopRight {
    width: 100%;
  }

}
</style>
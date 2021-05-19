<template>
  <div class="layouts-wrap">
    <headtop></headtop>
    <div class="content-wrap">
      <div class="nav-bar-wrap">
        <navBar></navBar>
      </div>
      <div class="effect-position">
        <effects1></effects1>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import headtop from './headtop'
import navBar from './navBar'
import effects1 from '../Effects1'
export default {
  props: {},
  data() {
    return {}
  },
  components: {
    headtop,
    navBar,
    effects1
  }
}
</script>

<style lang="scss" scoped>
.layouts-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  .content-wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: 110px;
    bottom: 0;
    z-index: 99;
  }
  .nav-bar-wrap {
    position: absolute;
    left: 50px;
    top: 50px;
    z-index: 99;
  }
  .effect-position {
    position: absolute;
    left: 146px;
    bottom: 596px;
    z-index: 99;
  }
}
</style>

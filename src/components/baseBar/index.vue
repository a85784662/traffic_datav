<template>
  <div class="basebar">
    <div class="line" :style="{ width: bgWidth }">
      <div class="line-bg"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'basebar',
  props: {
    bgWidth: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.basebar {
  width: 100%;
  height: 14px;
  position: relative;
  border-radius: 40px;
  background-color: #2e244f;
  .line {
    width: 50%;
    height: 14px;
    border-radius: 40px;
    background: linear-gradient(to right, #3900c5, #9d2fa8);
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    .line-bg {
      width: 324px;
      height: 14px;
      position: absolute;
      left: 0;
      top: 0;
      background: url('./images/line_bg1.png') no-repeat right center;
      animation: run2 3s steps(40) 0s infinite both;
    }
  }
  @keyframes run2 {
    from {
      transform: translate3d(-100%, 0, 0);
    }
    to {
      transform: translate3d(970px, 0, 0);
    }
  }
}
</style>

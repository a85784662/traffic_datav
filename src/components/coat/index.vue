<template>
  <div class="coat">
    <slot></slot>
    <div class="coat-arrow left-top"></div>
    <div class="coat-arrow left-bottom"></div>
    <div class="coat-arrow right-top"></div>
    <div class="coat-arrow right-bottom"></div>
  </div>
</template>

<script>
export default {
  name: 'coat',
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.coat {
  color: #fff;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 2px solid #716559;
  position: relative;
  .coat-arrow {
    position: absolute;
    display: inline-block;
    border-color: currentcolor currentcolor #0579ff #0579ff;
    border-right: 2px solid #ff8814;
    border-top: 2px solid #ff8814;
    width: 25px;
    height: 25px;
    &.left-top {
      left: -1px;
      top: -1px;
      transform: rotate(270deg);
    }
    &.left-bottom {
      left: -1px;
      bottom: -1px;
      transform: rotate(180deg);
    }
    &.right-top {
      right: -1px;
      top: -1px;
    }
    &.right-bottom {
      right: -1px;
      bottom: -1px;
      transform: rotate(90deg);
    }
  }
}
</style>

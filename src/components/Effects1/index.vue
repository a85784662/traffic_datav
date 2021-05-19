<template>
  <div class="effects1">
    <div class="people"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.effects1 {
  .people {
    width: 56px;
    height: 930px;
    background: url('images/bo.png');
    -webkit-animation: run 3s steps(40) 0s infinite both;
    animation: run 3s steps(40) 0s infinite both;
  }
  @-webkit-keyframes run {
    to {
      background-position: -4000% 0;
    }
  }
}
</style>

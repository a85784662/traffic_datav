<template>
  <div class="home">
    <Container :options="{ width: 7680, height: 3240 }">
      <layouts></layouts>
    </Container>
    <div class="city-model-wrap">
      <div id = "three"></div>
      <div id="heatmap"></div>
      <canvas id="gridmap" width = "8192" height = "4096" ></canvas>
    </div>
  </div>
</template>

<script>
import Container from '@/components/Container'
import layouts from '@/components/layouts'
export default {
  name: 'Home',
  components: {
    Container,
    layouts
  },
  mounted() {
  // 加载模型使用的init.js
  let initjs = document.createElement('script')
    initjs.src='../../static/js/init.js'
    document.getElementsByTagName('body')[0].appendChild(initjs)
  }
}
</script>
<style lang="scss" scoped>
.city-model-wrap{
  position: absolute;
  left:0;
  top:0;
  bottom:0;
  right:0;
  z-index: 1;
  overflow: hidden;
  background-color: #060e29;
}
#three{
  width: 100%;
  height: 100%;
}
#heatmap{
  width: 8192px;
  height: 4096px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  display: none;
}
</style>



<template>
  <div class="carousel">
    <el-carousel indicator-position="inside" height="365px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 style="width:100%;">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'carousel',
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss">
.el-carousel__item h3 {
  color: red;
  font-size: 100px;
  opacity: 0.75;
  line-height: 365px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
<style lang="scss" scoped>
.carousel {
  width: 100%;
}
</style>

<template>
  <div class="header-wrap">
    <img class="chongqing" width="120" height="120" src="./images/chongqing.gif" alt="重庆" />
    <div class="tips">
      <img width="73" height="54" src="./images/logo.png" />
      综合执法监管平台
    </div>
    <div class="bg1">
      <img src="./images/icon1.png" width="54" height="42" />
      <span class="wendu">{{temperature}} ℃</span>
      <img src="./images/icon2.png" width="46" height="42" />
      {{reporttime}}
      <img
        class="img-dot"
        src="./images/icon3.png"
        width="42"
        height="10"
        alt="dot"
      />
    </div>
  </div>
</template>


<script>
import  { ajaxWeatherTime } from '../request'
export default {
  props: {},
  data() {
    return {
      temperature:'',
      reporttime:''
    }
  },
  created() {
    ajaxWeatherTime()
    .then(res => {
      console.log('bbbb',res);
      this.temperature = res.lives[0].temperature
      this.reporttime = res.lives[0].reporttime.split(" ")[0]
    })
  },
  mounted() {
    
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.header-wrap {
  height: 110px;
  background-color: #080919;
  position: relative;
  .chongqing {
    position: absolute;
    left: 70px;
    top: 20px;
  }
  .tips {
    width: 670px;
    height: 110px;
    line-height: 110px;
    float: right;
    font-size: 44px;
    color: #fff;
    text-align: right;
    padding-right: 40px;
    img {
      vertical-align: -12px;
    }
  }
  .bg1 {
    width: 642px;
    height: 57px;
    line-height: 57px;
    background: url('images/bg1.png') no-repeat;
    position: absolute;
    left: 218px;
    bottom: 0;
    color: #fff;
    font-size: 42px;
    box-sizing: border-box;
    padding-left: 60px;
    img {
      vertical-align: -8px;
    }
    .wendu {
      padding-right: 80px;
    }
    .img-dot {
      position: absolute;
      right: 70px;
      top: -6px;
    }
  }
}
</style>

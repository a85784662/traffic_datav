<template>
  <div class="rotateAnimation">
    <div class="rota-a-wrap">
      <div class="bg-wrap bg1 rote-bg1"></div>
      <div class="bg-wrap bg2 text">{{rotateData}} <span>人</span></div>
      <div class="bg-wrap bg3 rote-bg2"></div>
    </div>
    <p class="date-tips">{{date}}</p>
  </div>
</template>

<script>
export default {
  name: 'rotateAnimation',
  props: ['rotateData','date'],
  data(){
    return {

    }
  },

  created() {
    
  },
  mounted() {

  },
  methods: {
  
  }
}
</script>

<style lang="scss" scoped>
.rotateAnimation{
  width: 338px;
  height: 430px;
  overflow: hidden;
  position: relative;
  .rota-a-wrap{
    width: 338px;
    height: 349px;
    overflow: hidden;
    position: relative;
  }
  .date-tips{
    height: 51px;
    font-size: 48px;
    color:#ff8814;
    text-align: center;
  }
  .bg-wrap{
    width: 338px;
    height: 349px;
    line-height: 349px;
    position: absolute;
    left: 0;
    top: 0;
    &.text{
      text-align: center;
      font-size: 35px;
      color: #ea7c15;
      span{
        font-size: 15px;
      }
    }
    &.bg1{
      background: url('./bg1.png') no-repeat center center;
    }
    &.bg2{
      background: url('./bg2.png') no-repeat center center;
    }
    &.bg3{
      background: url('./bg3.png') no-repeat center center;
    }
  }
}
.rote-bg1{
  animation: round_animate 5s linear infinite; 
}
.rote-bg2{
  animation: round_animate 2s linear infinite; 
}
@keyframes round_animate {
    to {
      transform: rotate(-360deg);
    }
  }
</style>

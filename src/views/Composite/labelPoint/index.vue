<template>
  <div class="label-point-wrap" :style="{ left: (pointData.left*(7680/screenWidth)) + 'px', top: (pointData.top*(3240/screenHeight)) + 'px' }">
      {{pointData.label}}
  </div>
</template>

<script>
export default {
  name: 'labelPoint',
  props: {
    pointData:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return {
      screenWidth:7680,
      screenHeight:3240
    }
  },
  components:{
    
  },
  created() {
    this.screenWidth = window.screen.width
    this.screenHeight = window.screen.height
  },

  beforeDestroy() {

  },
  methods: {
 
  }
}
</script>

<style lang="scss" scoped>
.label-point-wrap{
  width: 305px;
  height: 114px;
  padding: 20px;
  box-sizing: border-box;
  background: url('./labelpoint.png') no-repeat;
  font-size: 30px;
  color: #fff;
  position: fixed;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

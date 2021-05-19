<template>
  <div class="text-scrolling">
    <slot name="title title-fontsize"></slot>
    <div ref='main2' class="main2 cnt-fontsize" :class="{big:size=='big',superbig:size=='superbig',morebig:size=='morebig'}">
      <div id='dom0' >
        <div>
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'textScrolling',
  props: {
    size:{
      default: ''
    },
    startAnimationTS:{
      default: ''
    },
  },
  data(){
    return {

    }
  },
  watch: {
    startAnimationTS(){
      this.$nextTick(()=>{
        this.rollAnimate()
      })
       
    }
  },
  methods: {
    rollAnimate() {
      var main2 = this.$refs.main2
      var dom0 = document.getElementById('dom0')
      //创建用于复制dom0的新节点
      var newnode = document.createElement('div')
      newnode.innerHTML = dom0.innerHTML //复制dom0节点
      console.log(dom0)
      main2.appendChild(newnode)
      // 滚动函数
      function moveTop() {
        
        // 当main2向上滚动超出部分>=滚动节点高度时, 设置为scrollTop为0
        if (dom0.offsetHeight - main2.scrollTop <= 0) {
          main2.scrollTop = 0
          // 或者main2.scrollTop -= dom0.offsetHeight;
        } else {
          main2.scrollTop++
        }
        requestAnimationFrame(moveTop)
      }
      requestAnimationFrame(moveTop)
    }
  }
}
</script>

<style lang="scss" scoped>
.text-scrolling {
  padding: 60px 60px 0;
  .title {
    height: 110px;
    overflow: hidden;
    color: #ff8814;
  }
  .main2 {
    height: 900px;
    line-height: 85px;
    overflow: hidden;
    text-align: justify;
    &.big{
      height: 781px;
    }
    &.superbig{
      height: 2840px;
    }
    &.morebig{
      height: 3060px;
    }
  }
  .dom-item {
    width: 100%;
    overflow: hidden;
    margin-bottom: 40px;
    .title-t {
      font-size: 40px;
      color: #fff;
    }
    img {
        width: 470px;
        height: 310px;
        float:left;
        margin-right:10px;
        object-fit: cover;
      }

  }
}
</style>

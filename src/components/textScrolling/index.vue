<template>
  <div class="text-scrolling">
    <slot name="title"></slot>
    <div ref='main' class="main cnt-fontsize" :class="{big:size=='big',superbig:size=='superbig',morebig:size=='morebig'}">
      <div id='dom1' >
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
      type: String,
    },
    startAnimation:{
      default: ''
    }
  },
  data(){
    return {

    }
  },
  watch: {
    startAnimation(){
      this.$nextTick(()=>{
        this.rollAnimate()
      })
       
    }
  },
  methods: {
    rollAnimate() {
      let main = this.$refs.main
      let dom1 = document.getElementById('dom1')
      //创建用于复制dom1的新节点
      let newnode = document.createElement('div')
      newnode.innerHTML = dom1.innerHTML //复制dom1节点
      main.appendChild(newnode)      
      // 滚动函数
      function moveTop() {
        
        // 当main向上滚动超出部分>=滚动节点高度时, 设置为scrollTop为0
        if (dom1.offsetHeight - main.scrollTop <= 0) {
          main.scrollTop = 0
          // 或者main.scrollTop -= dom1.offsetHeight;
        } else {
          main.scrollTop++
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
  .main {
    height: 2038px;
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
    // .img-wrap {
    //   width: 470px;
    //   height: 310px;
    //   overflow: hidden;
    //   margin-bottom: 40px;
    //   float: left;
    //   img {
    //     width: 470px;
    //     height: 310px;
    //     float:left;
    //     margin-right:10px;
    //   }
    // }
    // .cnt-wrap {
    //   width: 610px;
    //   font-size: 48px;
    //   color: #fff;
    //   float: right;
    //   text-align: right;
    // }
  }
}
</style>

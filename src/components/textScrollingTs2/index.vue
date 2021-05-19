<template>
  <div class="text-scrolling">
    <div ref='main' class="main cnt-fontsize">
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
        console.log(444444);
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
  .main {
    height: 600px;
    overflow: hidden;
    text-align: justify;
  }
  .dom-item {
    width: 100%;
    overflow: hidden;
    margin-bottom: 40px;
  }
}
</style>

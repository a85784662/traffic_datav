<template>
  <div class="nav-bar">
    <div
      @click="mouseClick($event,'a')"
      ref='a'
      class="nav-item p1"
      :class="{active:activeIndex =='a'}"
    >
      <div class="n-item-t">
        <span class="nav_bg bg1"></span> 综合模块
        <p class="tit-eng">Comprehensive</p>
      </div>
      <div v-show="activeIndex =='a'" class="active-bg"></div>
    </div>
    <div
      @click="mouseClick($event,'b')"
      ref='b'
      class="nav-item p2"
      :class="{active:activeIndex =='b'}"
    >
      <div class="n-item-t">
        <span class="nav_bg bg2"></span>交管模块
        <p class="tit-eng">Transportation</p>
      </div>
      <div v-show="activeIndex =='b'" class="active-bg"></div>
    </div>
    <div
      @click="mouseClick($event,'c')"
      ref='c'
      class="nav-item p3"
      :class="{active:activeIndex =='c'}"
    >
      <div class="n-item-t">
        <span class="nav_bg bg3"></span>运政模块
        <p class="tit-eng">Transport Administration</p>
      </div>
      <div v-show="activeIndex =='c'" class="active-bg"></div>
    </div>
    <div
      @click="mouseClick($event,'d')"
      ref='d'
      class="nav-item p4"
      :class="{active:activeIndex =='d'}"
    >
      <div class="n-item-t">
        <span class="nav_bg bg4"></span>港航模块
        <p class="tit-eng">Port And Shipping</p>
      </div>
      <div v-show="activeIndex =='d'" class="active-bg"></div>
    </div>
    <div
      @click="mouseClick($event,'e')"
      ref='e'
      class="nav-item p5"
      :class="{active:activeIndex =='e'}"
    >
      <div class="n-item-t">
        <span class="nav_bg bg5"></span>水利模块
        <p class="tit-eng">Water Conservancy</p>
      </div>
      <div v-show="activeIndex =='e'" class="active-bg"></div>
    </div>
    <div
      @click="mouseClick($event,'f')"
      ref='f'
      class="nav-item p6"
      :class="{active:activeIndex =='f'}"
    >
      <div class="n-item-t">
        <span class="nav_bg bg6"></span>行发模块
        <p class="tit-eng">Industry Development</p>
      </div>
      <div v-show="activeIndex =='f'" class="active-bg"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      bgUrl: require('./images/img_bg.png'),
      bgUrlHover: require('./images/img_bg_hover.gif'),
      activeIndex: 'a'
    }
  },
  created() {
    if(sessionStorage.getItem("NavTag")){
      this.activeIndex = sessionStorage.getItem("NavTag")
    }
  },
  mounted() {
    this.$refs[this.activeIndex].style.background = `url(${this.imgSur(
        this.bgUrlHover
      )}) no-repeat`
  },
  methods: {
    imgSur(url) {
      return url + '?t=' + new Date().getTime()
    },
    mouseClick(e, type) {
      this.activeIndex = type
      let allNavItem = document.querySelectorAll('.nav-item')
      for (let i = 0; i < allNavItem.length; i++) {
        allNavItem[i].style.background = `url(${this.bgUrl}) no-repeat`
      }
      e.currentTarget.style.background = `url(${this.imgSur(
        this.bgUrlHover
      )}) no-repeat`
      // 路由跳转
      switch(type){
        case 'a':
          // 综合
          sessionStorage.setItem("NavTag", "a")
          this.$router.push({'path':'/composite'})
        break
        case 'b':
          // 交管
          sessionStorage.setItem("NavTag", "b")
          this.$router.push({'path':'/trafficcontrol'})
        break
        case 'c':
          // 运政
          sessionStorage.setItem("NavTag", "c")
          this.$router.push({'path':'/transport'})
        break
        case 'd':
          // 港航
          sessionStorage.setItem("NavTag", "d")
          this.$router.push({'path':'/gangHang'})
        break
        case 'e':
          // 水利
          sessionStorage.setItem("NavTag", "e")
          this.$router.push({'path':'/WaterConservancy'})
        break
        case 'f':
          // 行发
          sessionStorage.setItem("NavTag", "f")
          this.$router.push({'path':'/Hangfa'})
        break
      }
      
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.nav-bar {
  width: 1130px;
  height: 1544px;
  position: relative;
  background: url('./images/side_animate.gif') no-repeat left top;
  @keyframes bounceInLeft {
    from,
    60%,
    75%,
    90%,
    to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      transform: translate3d(-2000px, 0, 0);
    }
    60% {
      opacity: 1;
      transform: translate3d(25px, 0, 0);
    }
    75% {
      transform: translate3d(-10px, 0, 0);
    }
    90% {
      transform: translate3d(5px, 0, 0);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }
  .nav-item {
    width: 904px;
    height: 196px;
    background: url('./images/img_bg.png') no-repeat;
    position: absolute;
    cursor: pointer;
    left: 5%;
    opacity: 0;
    &.active .n-item-t {
      color: #ff8814;
    }
    &:hover .n-item-t {
      color: #ff8814;
    }
    &.p1 {
      top: 74px;
      animation: bounceInLeft 0.5s 0.25s linear forwards;
    }
    &.p2 {
      top: 300px;
      animation: bounceInLeft 0.7s 0.25s linear forwards;
    }
    &.p3 {
      top: 526px;
      animation: bounceInLeft 0.9s 0.25s linear forwards;
    }
    &.p4 {
      top: 750px;
      animation: bounceInLeft 1.1s 0.25s linear forwards;
    }
    &.p5 {
      top: 980px;
      animation: bounceInLeft 1.3s 0.25s linear forwards;
    }
    &.p6 {
      top: 1210px;
      animation: bounceInLeft 1.5s 0.25s linear forwards;
    }
    .active-bg {
      width: 160px;
      height: 160px;
      background: url('./images/active_bg.gif') no-repeat;
      position: absolute;
      right: -180px;
      top: 20px;
    }
    .n-item-t {
      font-size: 56px;
      color: #fff;
      padding-left: 50px;
      padding-top: 36px;
      .tit-eng{
        font-size: 40px;
        color:#7a736d;
        padding-left: 97px;
      }
      .nav_bg {
        display: inline-block;
        width: 62px;
        height: 62px;
        margin-right: 30px;
        vertical-align: -10px;
        &.bg1 {
          background: url('./images/nav_bg1.png') no-repeat center center;
        }
        &.bg2 {
          background: url('./images/nav_bg2.png') no-repeat center center;
        }
        &.bg3 {
          background: url('./images/nav_bg3.png') no-repeat center center;
        }
        &.bg4 {
          background: url('./images/nav_bg4.png') no-repeat center center;
        }
        &.bg5 {
          background: url('./images/nav_bg5.png') no-repeat center center;
        }
        &.bg6 {
          background: url('./images/nav_bg6.png') no-repeat center center;
        }
      }
    }
  }
}
</style>

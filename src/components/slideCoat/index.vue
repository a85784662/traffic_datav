<template>
  <div class="slideCoat">
    <div id="main">
        <div class="prev float-l" @click="prevfun">
          <div class="prevbtn"></div>
        </div>
        <div class="content float-l">
          <template v-if="allVideo.length>0">
            <div class="item-wrap"  v-for="(item,index) in allVideo" :key="index">
            <div class="item">
              <!-- <video-player
                  class="video-player-box"
                  ref="videoPlayer"
                  :options="playerOptions[index]"
                  :playsinline="true"
                  customEventName="customstatechangedeventname"
                >
              </video-player> -->
            </div>
            <p class="text cnt-fontsize">菜园坝监控</p>
          </div>
          <div class="empty-h"></div>
          <div class="empty-h"></div>
          <div class="empty-h"></div>
          <div class="empty-h"></div>
          <div class="empty-h"></div>
          <div class="empty-h"></div>
          <div class="empty-h"></div>
        </template>
          
        </div>
        <div class="next float-l" @click="nextfun">
          <div class="nextbtn"></div>
        </div>
    </div>
  </div>
</template>

<script>
import { ajaxMonitorInfo } from './request'
export default {
  name: 'slideCoat',
  props: {
    currentType:{
      type:String,
      default:""
    }
  },
  data(){
    return {
      playerOptions: [],
      allVideo:[],
      currentPage:1,
      totalPages:0
    }
  },
  watch: {
    currentType(newVal){
      this.allVideo = []
      this.currentPage = 1
      this.surveillanceVideo(newVal)
    }
  },
  created() {
    
  },
  mounted() {

    this.surveillanceVideo(this.currentType)
  },
  methods: {
    surveillanceVideo(val,pageNo,pageSize){
      console.log('val',val);
      this.playerOptions = []
      let type = val || ''
      // 获取视频监控列表
    ajaxMonitorInfo(type,pageNo,pageSize)
      .then((res) => {
        this.totalPages = res.pages
        this.allVideo = res.records
      //   res.records.forEach(item => {
      //   let options = {
      //   autoplay: true, //如果true,浏览器准备好时开始回放。
      //   muted: true, // 默认情况下将会消除任何音频。
      //   loop: false, // 导致视频一结束就重新开始。
      //   preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
      //   language: 'zh-CN',
      //   aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
      //   fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
      //   sources: [
      //     {
      //       type: 'application/x-mpegURL',
      //       src: item.url //你的m3u8地址（必填）
      //     }
      //   ],
      //   // poster: "poster.jpg", //你的封面地址
      //   width: document.documentElement.clientWidth,
      //   notSupportedMessage: '此视频暂无法播放，请稍后再试' //允许覆盖Video.js无法播放媒体源时显示的默认信息。
      // }

      //   this.playerOptions.push(options)

      //   })
      })
      .catch((err) => {
        this.$message.error(err)
      })
    },
    prevfun(){
      // 上一页
      if(this.currentPage<=1){
        return
      }
      this.allVideo = []
      this.currentPage-=1
      this.surveillanceVideo(this.currentType,this.currentPage)
    },
    nextfun(){
      // 下一页
      if(this.currentPage>=this.totalPages){
        return
      }
      this.allVideo = []
      this.currentPage+=1
      this.surveillanceVideo(this.currentType,this.currentPage)
    }
  }
}
</script>

<style lang="scss" scoped>
.slideCoat{
  width: 100%;
  height: 363px;
  overflow: hidden;
  margin-top: 64px;
  #main{
    width:100%;
    overflow: hidden;
  }
  .float-l{
    float: left;
  }
  .prev{
    height: 245px;
    width: 108px;
    margin-top: 58px;
    .prevbtn{
      width: 77px;
      height: 181px;
      background-color: #061127;
      background: url('./prev.png') no-repeat center center;
      cursor: pointer;
    }
  }
  .content{
    width: 4680px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    overflow: hidden;
    .item-wrap{
      width: 414px;
      height: 363px;
      .item{
        width: 397px;
        height: 270px;
        background-color: #6f7681;
      }
      .text{
        width: 266px;
        height: 47px;
        color:#fff;
      }
    }
    .empty-h{
      width: 414px;
      height: 0;
      padding: 0;
      visibility: hidden;
    }
  }
  .next{
    height: 245px;
    width: 108px;
    margin-top: 58px;
    .nextbtn{
      width: 77px;
      height: 181px;
      background-color: #061127;
      background: url('./next.png') no-repeat center center;
      cursor: pointer;
    }
  }
}
</style>

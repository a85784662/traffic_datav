<template>
  <div class="modelNav">
    <div class="video-big-wrap" :class="{ts:BusLinePopUp}"  v-if="playerOption||textOption||carOption||modifyOption||BusLinePopUp">
      <coat v-if="!BusLinePopUp">
        <div class="vireo-coat ts" v-if="playerOption">
          <div class="video-cnt" >
            <video-player
                  class="video-player-box"
                  ref="videoPlayer"
                  :options="playerOption"
                  :playsinline="true"
                  customEventName="customstatechangedeventname"
                >
              </video-player>
          </div>
        </div>

        <div class="vireo-coat" v-if="textOption" >
          <div class="title title-fontsize">{{textOption.title}}</div>
          <div class="text-cnt cnt-fontsize" >
            {{textOption.description}}
          </div>
        </div>

        <div class="vireo-coat" v-if="carOption" >
          <div class="text-cnt cnt-fontsize" >
            <p>驾校名称：{{carOption.corpName}}</p>
            <p>驾校地址：{{carOption.address}}</p>
            <p>教练车数：{{carOption.coachCarCount}}</p>
            <p>教练数量：{{carOption.coachNum}}</p>
            <p>学员数量：{{carOption.curStudentNum}}</p>
          </div>
        </div>

        <div class="vireo-coat" v-if="modifyOption" >
          <div class="text-cnt cnt-fontsize" >
            <p>企业名称：{{modifyOption.operatorName}}</p>
            <p>企业地址：{{modifyOption.address}}</p>
          </div>
        </div>
      </coat>

      <div class="busline-coat" v-if="BusLinePopUp" >
          <div class="busline-nav">
            <div @click="busNavClick('a')" class="nav-item cnt-fontsize" :class="{current:busNavCurrent=='a'}">全部<span v-show="busNavCurrent=='a'" class="current_bg"></span></div>
            <div @click="busNavClick('b')" class="nav-item cnt-fontsize" :class="{current:busNavCurrent=='b'}">西部<span v-show="busNavCurrent=='b'" class="current_bg"></span></div>
            <div @click="busNavClick('c')" class="nav-item cnt-fontsize" :class="{current:busNavCurrent=='c'}">北部<span v-show="busNavCurrent=='c'" class="current_bg"></span></div>
            <div @click="busNavClick('d')" class="nav-item cnt-fontsize" :class="{current:busNavCurrent=='d'}">南部<span v-show="busNavCurrent=='d'" class="current_bg"></span></div>
            <div @click="busNavClick('e')" class="nav-item cnt-fontsize" :class="{current:busNavCurrent=='e'}">两江<span v-show="busNavCurrent=='e'" class="current_bg"></span></div>
          </div> 
          <div class="busline-nav-cnt">
              <div class="cnt-l" @click="fyPrev"></div>
              <div class="cnt-c">
                <div class="cnt-table-tr cnt-fontsize" v-for="(item,index) in currentBusLineData" :key="index" @click="clickShowCurrentBusLine(item.id)">
                  <div class="c-td1">{{item.lineNum}}路</div>
                  <div class="c-td2"><span class="text-limit">{{item.startingPoint}}</span></div>
                  <div class="c-td3"></div>
                  <div class="c-td4"><span class="text-limit">{{item.destination}}</span></div>
                </div>
        
              </div>
              <div class="cnt-r" @click="fyNext"></div>
          </div>
      </div>
    </div>  
    <div class="nav-wrap">
          <div class="nav-item-m cnt-fontsize" >
            <div class="tit">
              <div class="text" :class="{active: isActive=='a'}" @click="navClick('a')">客运车辆实时位置</div>
              <div v-show="isActive=='a'" class="arrow"></div>
            </div>
            <div class="subn">Bus Real-time Location</div>
          </div>
          <div class="nav-item-m cnt-fontsize" >
            <div class="tit">
              <div class="text" :class="{active: isActive=='b'}"  @click="navClick('b')">危化品车实时位置</div>
              <div v-show="isActive=='b'" class="arrow"></div>
            </div>
            <div class="subn">H.Z. Vehicle Real-time Location</div>
          </div>
          <div class="nav-item-m cnt-fontsize"  >
            <div class="tit">
              <div class="text" :class="{active: isActive=='c'}" @click="navClick('c')">维修企业分布</div>
              <div v-show="isActive=='c'" class="arrow"></div>
            </div>
            <div class="subn">Automobile Repair Co. Distribution</div>
          </div>
          <div class="nav-item-m cnt-fontsize"  >
            <div class="tit">
              <div class="text" :class="{active: isActive=='d'}" @click="navClick('d')">驾培场地分布</div>
              <div v-show="isActive=='d'" class="arrow"></div>
            </div>
            <div class="subn">Training School Distribution</div>
          </div>
          <div class="nav-item-m cnt-fontsize" >
            <div class="tit">
              <div class="text" :class="{active: isActive=='e'}"  @click="navClick('e')">客运站视频监控</div>
              <div v-show="isActive=='e'" class="arrow"></div>
            </div>
            <div class="subn">Bus Station Monitor</div>
          </div>
          <div class="nav-item-m cnt-fontsize"  >
            <div class="tit">
              <div class="text" :class="{active: isActive=='f'}" @click="navClick('f')">公交线路</div>
              <div v-show="isActive=='f'" class="arrow"></div>
            </div>
            <div class="subn">Bus Line</div>
          </div>
        </div>
    
  </div>
</template>

<script>
import coat from '@/components/coat'
import { ajaxQueryInfosWithAddress, ajaxMonitorList, ajaxBusLine,ajaxBusGpsData,ajaxDangerGpsData,ajaxVehicle,ajaxQueryById, } from './request'
export default {
  name: 'modelNav',
  props: {

  },
  data(){
    return {
      isActive:'',
      playerOption:null,
      textOption:null,
      modifyOption:null,
      InfosWithAddress:null,
      MonitorList:null,
      BusLine:null,
      carOption:null,
      BusGpsData:null,
      DangerGpsData:null,
      VehicleData:null,
      TrafficStatus:null,
      BusLinePopUp:false,
      busNavCurrent:'a',
      currentBusLineData:[],
      currentPage:1,
      pages:1 
    }
  },
  components:{
    coat
  },
  created() {
    // 获取全部维修企业信息
    ajaxVehicle()
    .then(res => {
      this.VehicleData = res
    })
    .catch(err => {
      alert(`获取全部维修企业信息失败:${err}`)
    })
    // 获取驾校场地列表
    ajaxQueryInfosWithAddress()
    .then(res => {
      this.InfosWithAddress = res
    })
    .catch(err => {
      alert(`获取驾校场地列表失败:${err}`)
    })
    // 客运站视频监控
    ajaxMonitorList()
    .then(res => {
      this.MonitorList = res
    })
    .catch(err => {
      alert(`获取客运站视频监控失败:${err}`)
    })
  },
  mounted() {
    let _this = this
    window.addEventListener("setItemEvent", function(e) {
    if ((e.key == "modelClickVal")) {
      var sessionVal = sessionStorage.getItem("modelClickVal");
      if (sessionVal == e.newValue) {
        if (e.newValue) {
          let currentModelData = JSON.parse(sessionVal)
          // console.log('currentModelData',currentModelData);
          
          if(currentModelData.tag===1){
            // 视频展示
             _this.playerOption = _this.creatPlayerOption(currentModelData.url)
          }else if(currentModelData.tag==4){
            
            let obj = {
              address:currentModelData.address,
              coachCarCount:currentModelData.coachCarCount,
              coachNum:currentModelData.coachNum,
              corpName:currentModelData.corpName,
              curStudentNum:currentModelData.curStudentNum
            }

            _this.carOption = obj
          }else if(currentModelData.tag==6||currentModelData.tag==7){
            //圆形范围内公交车的GPS定位 或者 原型范围内两客一危车辆的GPS定位
            _this.textOption = {
              title:'车辆信息',
              description:`车牌号：${currentModelData.plateno}`
            }
          }else if(currentModelData.tag==8){
            _this.modifyOption = {
              operatorName:currentModelData.operatorName,
              address:currentModelData.address
            }
          }
          else{
            // 文字展示
             _this.textOption = currentModelData
          }
         // console.log(currentModelData)
        }
      }
    }
  })
  },
  beforeDestroy() {
    this.modelAllClear()
  },
  methods: {
    navClick(type){
      switch(type){
        case 'a':
          // 清除操作
          this.modelAllClear()
          window.onmousedown=null
          document.getElementById('app').onmousewheel = null
          document.getElementById('app').removeEventListener('DOMMouseScroll',function(){},false)
          if(this.isActive == 'a'){
            this.isActive = ''
            return
          }

          this.isActive = 'a'

          // 客运车辆实时位置
          this.watchMouseCallback()
          this.watchMouse()
        break
        case 'b':
          // 清除操作
          this.modelAllClear()
          window.onmousedown=null
          document.getElementById('app').onmousewheel = null
          document.getElementById('app').removeEventListener('DOMMouseScroll',function(){},false)
          if(this.isActive == 'b'){
            this.isActive = ''
            return
          }

          this.isActive = 'b'
          // 危化品车实时位置
          this.watchMouseCallback()
          this.watchMouse()
        break
        case 'c':
          // 清除操作
          this.modelAllClear()
          window.onmousedown=null
          document.getElementById('app').onmousewheel = null
          document.getElementById('app').removeEventListener('DOMMouseScroll',function(){},false)
          if(this.isActive == 'c'){
            this.isActive = ''
            return
          }

          this.isActive = 'c'

          // 维修企业分布
          window.yz_addsprite('car_maint',this.VehicleData)
        break
        case 'd':
          // 清除操作
          this.modelAllClear()
          window.onmousedown=null
          document.getElementById('app').onmousewheel = null
          document.getElementById('app').removeEventListener('DOMMouseScroll',function(){},false)
          if(this.isActive == 'd'){
            this.isActive = ''
            return
          }

          this.isActive = 'd'

          // 驾培场地分布
          window.yz_addsprite('driving_sch',this.InfosWithAddress)
        break
        case 'e':
          // 清除操作
          this.modelAllClear()
          window.onmousedown=null
          document.getElementById('app').onmousewheel = null
          document.getElementById('app').removeEventListener('DOMMouseScroll',function(){},false)
          if(this.isActive == 'e'){
            this.isActive = ''
            return
          }

          this.isActive = 'e'

          // 客运站视频监控
          window.yz_addsprite('camera',this.MonitorList)
        break
        case 'f':
          this.isActive = 'f'
          // 清除操作
          // 清除模型操作汇总
            window.yz_clearsprite()
            window.clearbus()
            window.yz_clearcubes()
            
            this.playerOption = null
            this.textOption = null
            this.carOption = null
            this.modifyOption = null

            window.onmousedown=null
            document.getElementById('app').onmousewheel = null
            document.getElementById('app').removeEventListener('DOMMouseScroll',function(){},false)
          //
          if(this.BusLinePopUp ){
            this.isActive = ''
            this.BusLinePopUp = !this.BusLinePopUp 
            //清除公交站牌标记
            this.$emit('closeLabelPoint')
            // 清除公交线路相关
            window.clearbus()
            return
          }
          //公交
          // 获取公交线路列表信息
          ajaxBusLine()
          .then(res => {
            this.currentBusLineData = res.records
            this.pages = res.pages
            this.BusLinePopUp = true   
          })
          .catch(err => {
            alert(`获取公交线路列表失败:${err}`)
          })
        break
      }
    },
    modelAllClear(){
      // 清除模型操作汇总
      window.yz_clearsprite()
      window.clearbus()
      window.yz_clearcubes()
      
      this.playerOption = null
      this.textOption = null
      this.carOption = null
      this.modifyOption = null
      //清除公交站牌标记
      this.$emit('closeLabelPoint')
      // 清除公交线路相关
      this.BusLinePopUp = false
    },
    modelAllClear2(){
      // 清除模型操作汇总
     // window.yz_clearsprite()
      window.clearbus()
      window.yz_clearcubes()
      
      this.playerOption = null
      this.textOption = null
      this.carOption = null
      this.modifyOption = null
      //清除公交站牌标记
      this.$emit('closeLabelPoint')
      // 清除公交线路相关
      this.BusLinePopUp = false
    },
    creatPlayerOption(PlayerUrl){
      return {
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: 'application/x-mpegURL',
            src: PlayerUrl //你的m3u8地址（必填）
          }
        ],
        // poster: "poster.jpg", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试' //允许覆盖Video.js无法播放媒体源时显示的默认信息。
      }
    },
    watchMouseCallback(){
      let center = window.getcenter()
      if(this.isActive=='a'){
        this.modelAllClear2()
        ajaxBusGpsData(center)
        .then(res => {
          this.BusGpsData = res
          // console.log('this.2222',this.BusGpsData);
          window.yz_addsprite('car',this.BusGpsData)
        })
        .catch(err => {
          alert(`获取圆形范围内公交车的GPS定位失败:${err}`)
        })
      }else if(this.isActive=='b'){
        this.modelAllClear2()
        // 获取原型范围内两客一危车辆的GPS定位
        ajaxDangerGpsData(center)
          .then(res => {
            this.DangerGpsData = res
            window.yz_addsprite('cdg',this.DangerGpsData)
          })
          .catch(err => {
            alert(`获取危车辆的GPS定位失败:${err}`)
          })
      }
      
    },
    watchMouse(){
      // 监控鼠标按下后移动触发事件
          let _this = this
          window.onmousedown = function(){
          let timer = null
          document.onmousemove = function(){
            clearTimeout(timer);
            timer = setTimeout(function(){
              // 静止后
              _this.watchMouseCallback()
                
            },400);

          }
  
          document.onmouseup = function(){
            document.onmousemove = null
          }

          return false;	
        }

        // // 给页面绑定滑轮滚动事件
        //   document.getElementById('app').onmousewheel  = function(){
        //       _this.watchMouseCallback()
        //   }
        //   // Firefox使用addEventListener添加滚轮事件
        //   document.getElementById('app').addEventListener('DOMMouseScroll', function(){
        //       _this.watchMouseCallback()
        //   }, false)
      
    },
    busNavClick(type){
      switch(type){
        case 'a':
          this.busNavCurrent = 'a'
          this.corporation = ''
        break
        case 'b':
          this.busNavCurrent = 'b'
          this.corporation = '3'
        break
        case 'c':
          this.busNavCurrent = 'c'
          this.corporation = '2'
        break
        case 'd':
          this.busNavCurrent = 'd'
          this.corporation = '1'
        break
        case 'e':
          this.busNavCurrent = 'e'
          this.corporation = '4'
        break          
      }

      this.currentPage = 1 // 初始化页码
      ajaxBusLine(5,this.corporation,this.currentPage)
      .then(res => {
        this.currentBusLineData = res.records
        this.BusLinePopUp = true
      })
      .catch(err => {
        alert(`获取公交线路列表失败:${err}`)
      })
    },
    clickShowCurrentBusLine(id){
      // 通过ID获取公交线路详情
      ajaxQueryById(id)
      .then(res => {
        this.BusLine = res
        // 触发模型展示
        window.addbus([this.BusLine]).then(() => {
          this.$emit('labelPointEvent')
        }).catch(err => {
          console.log('errerr',err)
        })
      })
      .catch(err => {
        alert(`获取趸船列表失败:${err}`)
      })
    },
    fyPrev(){
      // 公交线路上一页
      if(this.currentPage-1>0){
        this.currentPage -= 1
      }else{
        return false
      }
      ajaxBusLine(5,this.corporation,this.currentPage)
          .then(res => {
            this.currentBusLineData = res.records
            this.BusLinePopUp = true
          })
          .catch(err => {
            alert(`获取公交线路列表失败:${err}`)
          })

    },
    fyNext(){
      // 公交线路下一页
      if(this.currentPage+1<=this.pages){
        this.currentPage += 1
      }else{
        return false
      }
      
      ajaxBusLine(5,this.corporation,this.currentPage)
          .then(res => {
            this.currentBusLineData = res.records
            this.BusLinePopUp = true
          })
          .catch(err => {
            alert(`获取公交线路列表失败:${err}`)
          })

    }
  }
}
</script>

<style lang="scss" scoped>
.modelNav{
  .video-big-wrap{
    width: 100%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.8);
    margin-bottom: 40px;
    &.ts{
      background-color: rgba(0, 0, 0, 0.4);
    }
    .vireo-coat{
      padding: 60px 60px 0;
      &.ts{
        padding:60px;
      }
      .title {
        height: 110px;
        overflow: hidden;
        color: #ff8814;
      }
      .video-cnt{
        width: 100%;
        height: 100%;
        background-color: #c9c7c7;
      }
      .text-cnt{
        padding-bottom:40px;
        text-align: justify;
      }
    }
    
    
  }
  .busline-coat{
    width: 100%;
    overflow: hidden;
    .busline-nav{
      height: 145px;
      overflow: hidden;
      border:1px solid #d47113;
      display:flex;
      justify-content: space-around;
      .nav-item{
        width: 205px;
        height: 145px;
        color:#fff;
        text-align: center;
        box-sizing: border-box;
        padding-top:45px;
        position: relative;
        cursor: pointer;
        .current_bg{
          display: inline-block;
          width: 202px;
          height: 7px;
          background: url('./nav_bg.png') no-repeat;
          position: absolute;
          left: 2px;
          bottom:0px
        }
        &.current{
          color: #ff8814;
        }
      }
    }
  }
  .nav-wrap{
      width: 100%;
      overflow: hidden;
      text-align: right;
      .nav-item-m{
        height: 170px;
        color: #ff8814;
        .tit{
          width: 100%;
          overflow: hidden;
          .active{
            font-size: 60px;
          }
          .arrow{
            width: 25px;
            height: 48px;
            background: url('./arrow.png') no-repeat;
            float: right;
            margin-right: 25px;
            margin-top: 5px;
          }
          .text{
            float: right;
            cursor: pointer;
          }
        }
        .subn{
          font-size: 36px;
          color: #666;
        }
      }
    }
    .busline-nav-cnt{
      width: 100%;
      height: 614px;
      overflow: hidden;
      border:1px solid #716559;
      border-top:none;
      box-sizing: border-box;
      .cnt-l{
        width: 72px;
        height: 614px;
        float: left;
        background: url('./nav_l.png') no-repeat center center #051024;
        cursor: pointer;
      }
      .cnt-r{
        width: 72px;
        height: 614px;
        float: left;
        background: url('./nav_r.png') no-repeat center center #051024;
        cursor: pointer;
      }
      .cnt-c{
        width: 1078px;
        height: 614px;
        padding:24px 0;
        box-sizing: border-box;
        float: left;
        .cnt-table-tr{
          width: 100%;
          height: 120px;
          overflow: hidden;
          box-sizing: border-box;
          color:#fff;
          cursor: pointer;
          .text-limit{
              display: inline-block;
              width: 190px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              text-align: left;
            }
          .c-td1{
            width: 200px;
            height: 120px;
            float: left;
            text-align: center;
            border-right: 3px solid #070b15;
          }
          .c-td2{
            width: 272px;
            height: 120px;
            float: left;
            text-align: center;
          }
          .c-td3{
            width: 323px;
            height: 120px;
            float: left;
            background: url('./table_line.png') no-repeat center 30px;
          }
          .c-td4{
            width: 224px;
            height: 120px;
            float: left;
            text-align: center;
          }
        }
      }
    }
}

    
</style>

<template>
  <div class="composite">
    <template v-if="currentNav == 'composite'">
      <div class="coat-pos1">
        <coat>
          <div class="chart-c">
            <v-chart :options="waterChartData" />
          </div>
        </coat>
      </div>
      <div class="coat-pos2">
        <coat>
          <div class="bar-wrap">
            <div class="bar-wrap-a">
              <div class="title title-fontsize">
                企业信息
                <span class="get-time"></span>
              </div>
              <div class="bar-cnt">
                <div
                  class="bar-cnt-item"
                  v-for="(item, index) in recordsFirm"
                  :key="index"
                >
                  <div class="bar-cnt-des">
                    <div class="bar-cnt-text cnt-fontsize">{{ item.title }}</div>
                    <div class="bar-cnt-total cnt-fontsize">{{ item.count }}</div>
                  </div>
                  <div class="bar-cnt-bar">
                    <baseBar :bgWidth="item.percentage" />
                  </div>
                </div>
              </div>
            </div>
            <lineDash />
            <div class="bar-wrap-a">
              <div class="title title-fontsize">
                车辆信息
                <span class="get-time"></span>
              </div>
              <div class="bar-cnt">
                <div
                  class="bar-cnt-item"
                  v-for="(item, index) in recordsCar"
                  :key="index"
                >
                  <div class="bar-cnt-des">
                    <div class="bar-cnt-text cnt-fontsize">{{ item.title }}</div>
                    <div class="bar-cnt-total cnt-fontsize">{{ item.count }}</div>
                  </div>
                  <div class="bar-cnt-bar">
                    <baseBar :bgWidth="item.percentage" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </coat>
      </div>
      <div class="coat-pos3">
        <coat>
          <textScrolling :startAnimation='startAnimation'>
            <template v-slot:title>
              <div class="title title-fontsize">综合信息</div>
            </template>
            <template v-slot:content>
              <div class="dom-item" v-for="(item,index) in deptGeneralInfoData" :key='index'>
                <img style="width:100%;margin-bottom:20px" :src="baseUrl+item.cover" />
                <div class="cnt-wrap" >
                  {{item.content}}
                </div>
              </div>
            </template>
          </textScrolling>
        </coat>
      </div>
      <div class="coat-pos7">
        <div class="nav-wrap title-fontsize">
              <div
                class="nav-item-video"
                :class="{ active: currentVideoNav == 'a' }"
                @click="videoNavClick('a')"
              >
                全部信息

              </div>
              <div
                class="nav-item-video"
                :class="{ active: currentVideoNav == 'b' }"
                @click="videoNavClick('b')"
              >
                执法队

              </div>
              <div
                class="nav-item-video"
                :class="{ active: currentVideoNav == 'c' }"
                @click="videoNavClick('c')"
              >
                枢纽站

              </div>
              <div
                class="nav-item-video"
                :class="{ active: currentVideoNav == 'd' }"
                @click="videoNavClick('d')"
              >
                防汛
 
              </div>
              <div
                class="nav-item-video"
                :class="{ active: currentVideoNav == 'e' }"
                @click="videoNavClick('e')"
              >
                车站

              </div>
              <div
                class="nav-item-video"
                :class="{ active: currentVideoNav == 'f' }"
                @click="videoNavClick('f')"
              >
                雪亮工程

              </div>
              <div
                class="nav-item-video"
                :class="{ active: currentVideoNav == 'g' }"
                @click="videoNavClick('g')"
              >
                客运站

              </div>
        </div>
        <slideCoat :currentType="currentType" />
      </div>
      <div class="coat-pos8" >
        <modelNav @labelPointEvent="labelPointEvent" @closeLabelPoint='closeLabelPoint'/>
      </div>
    </template>
    <div v-if="labelPointShow" class="labelPoint-wrap">
      <labelPoint v-for="item in labelPoint" :key="item.label"  :pointData="item.info.data"   />
    </div>
  </div>
</template>

<script>
import coat from '@/components/coat'
import lineDash from '@/components/lineDash'
import baseBar from '@/components/baseBar'
import textScrolling from '@/components/textScrolling'
import carousel from '@/components/carousel'
import slideCoat from '@/components/slideCoat'
import modelNav from './modelNav'
import labelPoint from './labelPoint'
// import sonnav from './SonNav'
import { waterChartData } from './chart'
import {
  ajaxCorpInfo,
  ajaxVehicleInfo,
  ajaxWaterInfo,
  ajaxDeptGeneralInfo
} from './request'
export default {
  name: 'composite',
  data() {
    return {
      waterChartData: {},
      currentNav: 'composite',
      currentVideoNav: 'a',
      deptGeneralInfoData: [],
      recordsCar: [],
      recordsFirm: [],
      playerOptions: [],
      videoTotal:'',
      currentType:'',
      baseUrl:this.publicUrl,
      startAnimation:'',
      labelPointShow:false,
      labelPoint:[],
      waterInfoTimer:null
    }
  },
  components: {
    coat,
    baseBar,
    textScrolling,
    carousel,
    slideCoat,
    modelNav,
    lineDash,
    labelPoint
  },
  created() {
    // 企业信息 - 查询最新企业信息
    ajaxCorpInfo()
      .then((res) => {
        this.recordsFirm = res
      })
      .catch((err) => {
        alert(`查询最新企业信息失败：${err}`)
      })
    // 车辆信息 - 查询最新车辆信息
    ajaxVehicleInfo()
      .then((res) => {
        this.recordsCar = res
      })
      .catch((err) => {
        alert(`查询最新车辆信息失败：${err}`)
      })
    // 获取水文信息
    ajaxWaterInfo()
      .then((res) => {
        // console.log('waterChartData',res);
        this.waterChartData = waterChartData(this.$echarts, res)
      })
      .catch((err) => {
        alert(`获取水文信息失败2：${err}`)
      })

      // 每隔5分钟刷新一次水文数据
      let _this = this
      this.waterInfoTimer = setInterval(function(){
        ajaxWaterInfo()
          .then((res) => {
           // console.log('waterChartData121',res);
            _this.waterChartData = waterChartData(_this.$echarts, res)
          })
          .catch((err) => {
            alert(`获取水文信息失败2：${err}`)
          })
      },300000)

    // 获取部门信息
    ajaxDeptGeneralInfo()
      .then((res) => {
        this.deptGeneralInfoData = res
        this.startAnimation='start' 
      })
      .catch((err) => {
        alert(`获取部门信息失败：${err}`)
      })

  },
  beforeDestroy(){
    clearInterval(this.waterInfoTimer)
  },
  methods: {
    videoNavClick(currentVideoNav) {
      this.currentVideoNav = currentVideoNav
      let currentType = ''
      switch(currentVideoNav){
        case 'a':
          currentType=''
        break
        case 'b':
          currentType='1'
        break
        case 'c':
          currentType='2'
        break
        case 'd':
          currentType='3'
        break
        case 'e':
          currentType='4'
        break
        case 'f':
          currentType='5'
        break
        case 'g':
          currentType='6'
        break
      }
      this.currentType = currentType
    },
    labelPointEvent(){
      this.labelPoint = []
      this.labelPoint = window.getscreenlocationofbusstop()
     //  console.log('this.labelPoint',this.labelPoint )
      this.labelPointShow = true
      
      if(this.labelPointShow){
          // 监控鼠标按下后移动触发事件
          let _this = this
          window.onmousedown = function(){
            document.onmousemove = function(){
                _this.labelPointShow = false
                _this.labelPoint = []
                _this.labelPointShow = true
                _this.labelPoint = window.getscreenlocationofbusstop()
                // console.log('bbbbb',_this.labelPoint);
            }
    
            document.onmouseup = function(){
              document.onmousemove = null
            }

            return false;	
          } 

          // 给页面绑定滑轮滚动事件
          document.getElementById('app').onmousewheel  = function(){
                _this.labelPointShow = false
                _this.labelPoint = []
                _this.labelPointShow = true
                _this.labelPoint = window.getscreenlocationofbusstop()
          }
          // Firefox使用addEventListener添加滚轮事件
          document.getElementById('app').addEventListener('DOMMouseScroll', function(){
                _this.labelPointShow = false
                _this.labelPoint = []
                _this.labelPointShow = true
                _this.labelPoint = window.getscreenlocationofbusstop()
          }, false)

      }
    },
    closeLabelPoint(){
      this.labelPointShow = false
    }
  },
}
</script>

<style lang="scss" scoped>
.composite {
  width: 100%;
  height: 100%;
  .chart-c {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 40px;
  }
  .echarts {
    width: 100%;
    height: 100%;
  }
  .coat-pos1 {
    width: 1225px;
    height: 780px;
    position: absolute;
    right: 1270px;
    top: 30px;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 19;
  }
  .coat-pos2 {
    width: 1225px;
    height: 3069px;
    position: absolute;
    right: 10px;
    top: 30px;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 19;
  }
  .coat-pos3 {
    width: 1225px;
    height: 2257px;
    position: absolute;
    right: 1270px;
    top: 840px;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 19;
  }

  .coat-pos6 {
    width: 1225px;
    height: 1668px;
    position: absolute;
    right: 1300px;
    top: 1430px;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 19;
  }
  .coat-pos7 {
    width: 4913px;
    height: 970px;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    font-size: 56px;
    position: absolute;
    left: 239px;
    bottom: 29px;
    z-index: 19;
  }
  .coat-pos8 {
    width: 1225px;
    overflow: hidden;
    color: #fff;
    font-size: 56px;
    position: absolute;
    right: 2580px;
    top: 30px;
    z-index: 19;
  }
 
  .bar-wrap {
    padding: 55px 55px 0;
    overflow: hidden;
    .bar-wrap-a {
      width: 100%;
      overflow: hidden;
      .title {
        height: 110px;
        overflow: hidden;
        color: #ff8814;
      }
      .bar-cnt {
        width: 100%;
        overflow: hidden;
        .bar-cnt-item {
          width: 100%;
          height: 141px;
          overflow: hidden;
          
          .bar-cnt-bar {
            width: 1156px;
            height: 80px;
            padding-top: 28px;
            box-sizing: border-box;
          }
          
        }
        .bar-cnt-des{
          width: 1106px;
          overflow: hidden;
          .bar-cnt-total {
            width: 220px;
            height: 60px;
            text-align: right;
            overflow: hidden;
            color: #ff8814;
            float: right;
          }
          .bar-cnt-text {
            width: 120px;
            height: 67px;
            overflow: hidden;
            color: #fff;
            float: left;
          }
        }
      }
    }
  }
  .nav-wrap {
      width: 4912px;
      height: 120px;
      margin-left:100px;
      padding-top: 42px;
      color: #fff;
      cursor: pointer;
      .nav-item-video {
        width: 305px;
        height: 114px;
        line-height: 114px;
        text-align: center;
        float: left;
        position: relative;
        &:hover{
          color: #ff8814;
        }
        &.active {
          color: #ff8814;
          background: url('./nav_bg.png') no-repeat;
        }
        .nav-arrow {
          position: absolute;
          display: inline-block;
          border-color: currentcolor currentcolor #0579ff #0579ff;
          border-right: 2px solid #ff8814;
          border-top: 2px solid #ff8814;
          width: 25px;
          height: 25px;
          &.left-top {
            left: -19px;
            top: -19px;
            transform: rotate(270deg);
          }
          &.left-bottom {
            left: -19px;
            bottom: -19px;
            transform: rotate(180deg);
          }
          &.right-top {
            right: -19px;
            top: -19px;
          }
          &.right-bottom {
            right: -19px;
            bottom: -19px;
            transform: rotate(90deg);
          }
        }
      }
    }
  .get-time {
    color: #ff8814;
    font-size: 40px;
    float: right;
    padding: 12px 0 0 0;
  }
}
</style>

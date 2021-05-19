<template>
  <div class="TrafficControl">
      <div class="coat-pos1">
        <coat>
          <div class="title title-fontsize">
            企业信息
          </div>
          <template v-if="fanye=='a'">
            <div class="chart-a">
              <v-chart :options="ChartData5" />
            </div>
            <div class="chart-a">
              <v-chart :options="ChartData6" />
            </div>
            <div class="chart-a">
              <v-chart :options="ChartData7" />
            </div>
            <div class="chart-a">
              <v-chart :options="ChartData8" />
            </div>
          </template>
          <template v-if="fanye=='b'">
            <div class="chart-a">
              <v-chart :options="ChartData9" />
            </div>
            <div class="chart-a">
              <v-chart :options="ChartData10" />
            </div>
            <div class="chart-a">
              <v-chart :options="ChartData11" />
            </div>
          </template>
          
        </coat>
        <div class="operate-area">
          <span class="operate" :class="{bottom:isbottom}" @click="fanyeHandle"></span>
        </div>
      </div>
      <div class="coat-pos2">
        <coat>
          <div class="title title-fontsize">
            变化趋势
          </div>
          <div class="chart-a">
            <v-chart :options="ChartData1" />
          </div>
          <div class="chart-a">
            <v-chart :options="ChartData2" />
          </div>
          <div class="chart-a">
            <v-chart :options="ChartData3" />
          </div>
          <div class="chart-a">
            <v-chart :options="ChartData4" />
          </div>
        </coat>
      </div>
      <div class="coat-pos3">
        <modelNav @labelPointEvent="labelPointEvent" @closeLabelPoint='closeLabelPoint' />
      </div>
      <div class="coat-pos4 title-fontsize">
        <coat><p @click="bussend">客运站发车表</p></coat>
      </div>
      <div class="coat-pos5 title-fontsize">
        <coat> <p @click="classLine">长途班线信息</p></coat>
      </div>
      <div class="coat-pos7">
        <div class="nav-wrap title-fontsize">
          <div
                class="nav-item-video"
                :class="{ active: currentVideoNav == 'g' }"
                @click="videoNavClick('g')"
              >
                客运站
                <!-- <template v-if="currentVideoNav == 'g'">
                  <div class="nav-arrow left-top"></div>
                  <div class="nav-arrow left-bottom"></div>
                  <div class="nav-arrow right-top"></div>
                  <div class="nav-arrow right-bottom"></div>
                </template> -->
              </div>
        </div>
        <slideCoat :currentType="currentType" />
      </div>
      <template v-if="busSendPopupShow">
        <busSendPopup @busSendPopupClose="busSendPopupClose" />
      </template>
      <template v-if="classLinePopupShow">
        <classLinePopup @classLinePopupClose="classLinePopupClose" />
      </template>

    <div v-if="labelPointShow" class="labelPoint-wrap">
      <labelPoint v-for="item in labelPoint" :key="item.label"  :pointData="item.info.data"   />
    </div>
      
  </div>
</template>

<script>
import coat from '@/components/coat'
import slideCoat from '@/components/slideCoat'
import modelNav from './modelNav'
import busSendPopup from './busSendPopup'
import classLinePopup from './classLinePopup'
import { barStyleOneChartData,barStyleOneChartData2, waterChartData,pieStyleOneChartData } from './chart'
import { ajaxVariationtendency,ajaxCorpinfo } from './request'
import labelPoint from './labelPoint'

export default {
  name: 'TrafficControl',
  data() {
    return {
      barStyleOneChartData:{},
      pieStyleOneChartData:{},
      waterChartData:{},
      currentVideoNav:'g',
      currentType:'6',
      busSendPopupShow:false,
      classLinePopupShow:false,
      fanye:'a',
      ChartData1:{},
      ChartData2:{},
      ChartData3:{},
      ChartData4:{},
      ChartData5:{},
      ChartData6:{},
      ChartData7:{},
      ChartData8:{},
      ChartData9:{},
      ChartData10:{},
      ChartData11:{},
      isbottom:false,
      labelPointShow:false,
      labelPoint:[]
      
    }
  },
  components: {
    coat,
    slideCoat,
    modelNav,
    busSendPopup,
    classLinePopup,
    labelPoint
  },
  created() {
    // this.barStyleOneChartData = barStyleOneChartData()
    // this.pieStyleOneChartData = pieStyleOneChartData()
    // 普通车数据
    ajaxVariationtendency(3)
    .then(res => {
      // 普货车车台数变化趋势(折线)
      let aData = {
        title:'普货车车台数变化趋势',
        msg:res.counts,
        dates:res.dates
      }
      this.ChartData1 = waterChartData(this.$echarts,aData)
      // 普货车吨位数变化趋势(折线)
      let bData = {
        title:'普货车吨位数变化趋势',
        msg:res.tonnages,
        dates:res.dates
      }
      this.ChartData2 = waterChartData(this.$echarts,bData)
    })
    // 租赁车数据
    ajaxVariationtendency(9)
    .then(res => {
      // 租赁车车台数变化趋势(折线)
      let aData = {
        title:'租赁车车台数变化趋势',
        msg:res.counts,
        dates:res.dates
      }
      this.ChartData3 = waterChartData(this.$echarts,aData)
    })
    // 出租车数据
    ajaxVariationtendency(5)
    .then(res => {
      // 出租车车台数变化趋势(折线)
      let aData = {
        title:'出租车车台数变化趋势',
        msg:res.counts,
        dates:res.dates
      }
      this.ChartData4 = waterChartData(this.$echarts,aData)
    })
    // 企业信息
    ajaxCorpinfo(1)
    .then(res => {
      // 客运企业明细(柱状)
      let aData = {
        title:'客运企业明细',
        counts:res.counts,
        names:res.names,
        max:res.max
      }
      this.ChartData5 = barStyleOneChartData(aData)
    })
    ajaxCorpinfo(2)
    .then(res => {
      // 危化品企业明细(柱状)
      let aData = {
        title:'危化品企业明细',
        counts:res.counts,
        names:res.names,
        max:res.max
      }
      this.ChartData6 = barStyleOneChartData(aData)
    })
    ajaxCorpinfo(8)
    .then(res => {
      // 租赁企业明细(柱状)
      let aData = {
        title:'租赁企业明细',
        counts:res.counts,
        names:res.names,
        max:res.max
      }
      this.ChartData7 = barStyleOneChartData(aData)
    })
    ajaxCorpinfo(6)
    .then(res => {
      // 驾培企业明细(柱状)
      let aData = {
        title:'驾培企业明细',
        counts:res.counts,
        names:res.names,
        max:res.max
      }
      this.ChartData8 = barStyleOneChartData(aData)
    })
    ajaxCorpinfo(4)
    .then(res => {
      // 出租企业明细(柱状)
      let aData = {
        title:'出租企业明细',
        counts:res.counts,
        names:res.names,
        max:res.max
      }
      this.ChartData9 = barStyleOneChartData(aData)
    })
    ajaxCorpinfo(3)
    .then(res => {
      // 普货企业明细(柱状)
      let aData = {
        title:'普货企业明细',
        counts:res.counts,
        names:res.names,
        max:res.max
      }
      this.ChartData10 = barStyleOneChartData2(aData)
    })
    ajaxCorpinfo(5)
    .then(res => {
      // 维修企业明细（饼）
      let aData = {
        title:'维修企业明细',
        data:[]
      }
      res.data.forEach(item => {
        aData.data.push({
          value:item.count,
          name:item.name
        })
      })
      this.ChartData11 = pieStyleOneChartData(aData)
    })
  
  },
  methods: {
    videoNavClick(currentVideoNav) {
      this.currentVideoNav = currentVideoNav
      let currentType = ''
      switch(currentVideoNav){
        case 'g':
          currentType='6'
        break
      }
      this.currentType = currentType
    },
    bussend(){
      this.busSendPopupShow = true
      this.classLinePopupShow = false
    },
    busSendPopupClose(){
      this.busSendPopupShow = false
    },
    classLine(){
      this.classLinePopupShow = true
      this.busSendPopupShow = false
    },
    classLinePopupClose(){
      this.classLinePopupShow = false
    },
    fanyeHandle(){
      this.isbottom = !this.isbottom
      this.isbottom ? this.fanye = 'b' : this.fanye = 'a'
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
      if(this.labelPointShow){
        window.onmousedown = null
        document.getElementById('app').onmousewheel = null
        document.getElementById('app').removeEventListener('DOMMouseScroll',function(){},false)
      }
      this.labelPointShow = false
      
    }
  }
}
</script>

<style lang="scss" scoped>
.TrafficControl {
  width: 100%;
  height: 100%;
  .chart-a {
    width: 1160px;
    height: 680px;
    margin-left: 20px;
    margin-bottom: 26px;
    box-sizing: border-box;
  }
  .title {
        height: 110px;
        overflow: hidden;
        color: #ff8814;
        padding: 50px 50px 0;
      }
  .echarts {
    width: 100%;
    height: 100%;
  }
  
  .coat-pos1{
    width: 1270px;
    height: 3065px;
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    right: 40px;
    top: 30px;
    z-index: 19;
    .operate-area{
      width: 100%;
      height: 60px;
      overflow: hidden;
      position: absolute;
      bottom:0;
      left:0;
      text-align: center;
      .operate{
        display: inline-block;
        width: 60px;
        height: 60px;
        cursor: pointer;
        background: url('./ic_up.png') no-repeat;
        &.bottom{
          background: url('./ic_down.png') no-repeat;
        }
      }
    }
  }
  .coat-pos2{
    width: 1270px;
    height: 3065px;
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    right: 1340px;
    top: 30px;
    z-index: 19;
  }
  .coat-pos3 {
    width: 1225px;
    height: 1550px;
    color: #fff;
    font-size: 56px;
    position: absolute;
    right: 2639px;
    top: 30px;
    z-index: 19;
  }
  .coat-pos4 {
    width: 566px;
    height: 124px;
    background-color: rgba(0, 0, 0, 0.8);
    line-height: 124px;
    text-align: center;
    color: #fff;
    position: absolute;
    right: 2639px;
    bottom: 640px;
    cursor: pointer;
    z-index: 19;
  }
  .coat-pos5 {
    width: 566px;
    height: 124px;
    background-color: rgba(0, 0, 0, 0.8);
    line-height: 124px;
    text-align: center;
    color: #fff;
    position: absolute;
    right: 3240px;
    bottom: 640px;
    cursor: pointer;
    z-index: 19;
  }
  .coat-pos7 {
    width: 3510px;
    height: 594px;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    font-size: 56px;
    position: absolute;
    left: 1536px;
    bottom: 29px;
    z-index: 19;
  }
    .nav-wrap {
      width: 3290px;
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
}
</style>

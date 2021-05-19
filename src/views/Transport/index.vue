<template>
  <div class="transport">
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
              <v-chart :options="ChartData12" />
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
          <div class="bar-wrap">
            <div class="bar-wrap-a">
              <div class="title2 title-fontsize">
                驾校招生统计
              </div>
              <div class="bar-cnt">
                <div
                  class="bar-cnt-item"
                  v-for="(item, index) in recordsFirm"
                  :key="index"
                >
                  <div class="bar-cnt-des">
                    <div class="bar-cnt-text cnt-fontsize">{{ item.corpName }}</div>
                    <div class="bar-cnt-total cnt-fontsize">{{ item.curStudentNum }}</div>
                  </div>
                  <div class="bar-cnt-bar">
                    <baseBar :bgWidth="item.percentage" />
                  </div>
                </div>
              </div>
            </div>

            <div class="bar-wrap-a">
              <div class="title2 title-fontsize">
                网约车统计
              </div>
              <div class="sub-cnt">
                <div v-for="(item,index) in visitorData" :key="index">
                  <rotateAnimation :rotateData='item.count' :date='item.title' />
                </div>
              </div>
            </div>
          </div>
        </coat>
      </div>
      <div class="coat-pos3">
        <modelNav />
      </div>
  </div>
</template>

<script>
import coat from '@/components/coat'
import baseBar from '@/components/baseBar'
import rotateAnimation from '@/components/rotateAnimation'
import modelNav from './modelNav'
import { barStyleOneChartData,barStyleOneChartData2,pieStyleOneChartData } from './chart'
import { ajaxCorpinfo, ajaxDrivingSch, ajaxVehicle } from './request'


export default {
  name: 'transport',
  data() {
    return {
      ChartData5:{},
      ChartData6:{},
      ChartData7:{},
      ChartData8:{},
      ChartData9:{},
      ChartData10:{},
      ChartData11:{},
      ChartData12:{},
      isbottom:false,
      fanye:'a',
      recordsFirm: [],
      visitorData:[]
    }
  },
  components: {
    coat,
    baseBar,
    rotateAnimation,
    modelNav
  },
  created() {

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
    ajaxCorpinfo(7)
    .then(res => {
      // 客运站明细(柱状)
      let aData = {
        title:'客运站明细',
        counts:res.counts,
        names:res.names,
        max:res.max
      }
      this.ChartData12 = barStyleOneChartData(aData)
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
    }),
    // 驾校招生统计
    ajaxDrivingSch()
      .then((res) => {
        this.recordsFirm = res
      })
      .catch((err) => {
        alert(`查询驾校招生统计失败：${err}`)
      })
    // 网约车统计
    ajaxVehicle()
    .then((res) => {
        this.visitorData = res
      })
      .catch((err) => {
        alert(`查询网约车统计失败：${err}`)
      })
  },
  methods: {
    fanyeHandle(){
      this.isbottom = !this.isbottom
      this.isbottom ? this.fanye = 'b' : this.fanye = 'a'
    },
  }
}
</script>

<style lang="scss" scoped>
.transport {
  width: 100%;
  height: 100%;
  .chart-a {
    width: 100%;
    height: 680px;
    margin-left: 20px;
    margin-bottom: 26px;
    box-sizing: border-box;
  }
  .title {
        height: 110px;
        overflow: hidden;
        color: #ff8814;
        padding: 50px 30px 0;
      }
    .title2 {
        height: 110px;
        overflow: hidden;
        color: #ff8814;
        padding: 50px 0 0;
      }
  .echarts {
    width: 100%;
    height: 100%;
  }
  
  .coat-pos1{
    width: 1500px;
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
    width: 1500px;
    height: 3065px;
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    right: 1574px;
    top: 30px;
    z-index: 19;
  }
  .coat-pos3{
    width: 1225px;
    height: 1550px;
    color: #fff;
    font-size: 56px;
    position: absolute;
    right: 3100px;
    top: 30px;
  }
  .coat-pos4 {
    width: 566px;
    height: 124px;
    background-color: rgba(0, 0, 0, 0.8);
    line-height: 124px;
    text-align: center;
    color: #fff;
    font-size: 48px;
    position: absolute;
    right: 2639px;
    bottom: 640px;
    cursor: pointer;
    z-index: 19;
  }
  .bar-wrap {
    padding: 0 55px 0;
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
          height: 142px;
          overflow: hidden;
          
          .bar-cnt-bar {
            width: 100%;
            height: 80px;
            padding-top: 28px;
            box-sizing: border-box;
          }
          
        }
        .bar-cnt-des{
          width: 100%;
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
            height: 67px;
            overflow: hidden;
            color: #fff;
            float: left;
          }
        }
      }
      .sub-cnt{
        height: 410px;
        overflow: hidden;
        display: flex;
        justify-content: space-around;
      }
    }
  }
  

}
</style>

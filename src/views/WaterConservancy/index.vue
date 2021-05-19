<template>
  <div class="WaterConservancy">
    <div class="coat-pos1">
        <coat>
          <div class="title title-fontsize">
            河长巡河
          </div>
          <textScrollingTs type="text" size="morebig" :startAnimationTS='startAnimationTS'  >
              <template v-slot:content>
                  <div class="cnt-wrap" v-for="(leve1,index1) in TourRecordData" :key="index1">
                  <div class="cnt-head cnt-fontsize">
                    <div class="cnt-l">区级河长</div>
                    <div class="cnt-r">{{leve1.hzName}}</div>
                  </div>
                  <div class="sub-cnt-wrap" v-for="(leve2,index2) in leve1.children" :key="index2">
                    <ul>
                      <li class="sub-title cnt-fontsize">
                        <div class="li-l">{{leve2.zone}}</div>
                        <div class="li-r">{{leve2.hzName}}</div>
                      </li>
                      <li v-for="(leve3,index3) in leve2.children" :key="index3" class="cnt-fontsize" :class="{warntext:leve3.finish=='N'}">
                        <div class="li-l">{{leve3.zone}}</div>
                        <div class="li-r">{{leve3.hzName}}</div>
                      </li>
              
                    </ul>
                    <lineDash />
                </div>
                </div>
              </template>
            </textScrollingTs>
        </coat>
      </div>
      <div class="coat-pos2">
        <coat>
          <div class="chart-a">
            <v-chart :options="waterChartData" />
          </div>
          <div class="sub-wrap ts1">
            <div class="fxxt-head cnt-fontsize ts ">节水型社会建设</div>
            <textScrolling type="text" size="big" :startAnimation='startAnimation'  >
              <template v-slot:content>
                <div class="dom-item">
                  <div v-html="deptGeneralInfoData"></div>
                </div>
              </template>
            </textScrolling>
          </div>
          <div class="sub-wrap2">
            <div class="fxxt-head cnt-fontsize">水土保持项目</div>
            <ul class="cnt-fontsize">
              <li v-for="(item,index) in WaterSoilPlanIssue" :key='index'>
                <div class="li-l">{{item.projectName}}</div>
                <div class="li-r">{{item.issueDate}}--------{{item.expirationDate}}</div>
              </li>
            </ul>
          </div>
        </coat>
      </div>
    <div class="coat-pos3">
      <modelNav />
    </div>
    <div class="coat-pos4">
        <buildingProject :buildProData='buildProData' />
    </div>
  </div>
</template>

<script>
import coat from '@/components/coat'
import lineDash from '@/components/lineDash'
import textScrolling from '@/components/textScrolling'
import textScrollingTs from '@/components/textScrollingTs'
import modelNav from './modelNav'
import buildingProject from './buildingProject'

import { waterChartData } from './chart'
import { ajaxTourRecord,ajaxWaterSaving,ajaxWaterProject,ajaxWaterInfo,ajaxWaterSoilPlanIssue } from './request'

export default {
  name: 'WaterConservancy',
  data() {
    return {
      waterChartData:{},
      TourRecordData:[],
      deptGeneralInfoData:'',
      buildProData:[],
      startAnimation:"",
      startAnimationTS:'',
      WaterSoilPlanIssue:[],
      waterInfoTimer:null
    }
  },
  components: {
    coat,
    lineDash,
    modelNav,
    textScrolling,
    textScrollingTs,
    buildingProject
  },
  created() {
    ajaxTourRecord()
    .then(res => {
      this.TourRecordData = res
      this.startAnimationTS = Math.round(new Date().getTime()/1000)
    })
    ajaxWaterSaving()
    .then(res => {
      this.deptGeneralInfoData = res.content
      this.startAnimation = Math.round(new Date().getTime()/1000)
    })
    .catch(err => {
      alert(err)
    })
    ajaxWaterProject()
    .then(res => {
     this.buildProData = res.records
    })
    .catch(err => {
      alert(err)
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

    // 获取全量水土保持项目审批数据
    ajaxWaterSoilPlanIssue()
    .then((res) => {
        // console.log('bbbb',res)
        this.WaterSoilPlanIssue = res
      })
      .catch((err) => {
        alert(`获取全量水土保持项目审批数据失败：${err}`)
      })
  },
  beforeDestroy(){
    clearInterval(this.waterInfoTimer)
  },
  methods: {

  },
}
</script>

<style lang="scss" scoped>
.WaterConservancy {
  width: 100%;
  height: 100%;
  .chart-a {
    width: 1160px;
    height: 680px;
    margin-left: 20px;
    margin-top: 26px;
    box-sizing: border-box;
  }
  .title {
        height: 110px;
        overflow: hidden;
        font-size: 56px;
        color: #ff8814;
        padding: 50px 50px 0;
      }
  .echarts {
    width: 100%;
    height: 100%;
  }
  .cnt-wrap {
    background-color: #10132f;
    width: 1137px;
    margin: 0 auto;
    overflow: hidden;
    color:#fff;
    margin-bottom: 60px;
    .cnt-head{
      height: 132px;
      line-height: 132px;
      padding:0 45px;
      box-sizing: border-box;
      overflow: hidden;
      background-color: #1e2247;
      box-shadow: 0 10px 14px #060815;
      .cnt-l{
        float: left;
      }
      .cnt-r{
        float: right;
        text-align: right;
      }
    }
    .sub-cnt-wrap{
      margin-top: 60px;
      overflow: hidden;
      ul{
        li{
          height: 83px;
          padding:0 45px;
          box-sizing: border-box;
          overflow: hidden;
          &.warntext{
            color:#ff4e1e;
          }
          &.tips{
            color: #ff4e1e;
          }
          .li-l{
            float: left;
          }
          .li-r{
            float: right;
            text-align: right;
          }
        }
      }
    }
    

  }
  .get-time {
    color: #ff8814;
    font-size: 40px;
    float: right;
    padding: 12px 50px 0 0;
  }
  .sub-wrap{
    height: 510px;
    overflow: hidden;
    &.ts1{
      height: 859px;
      padding: 0 60px;
    }
    .fxxt-head{
      color: #ff8814;
      box-sizing: border-box;
      &.ts{
        padding-bottom: 40px;
      }
    }
  }
  .sub-wrap2{
    overflow: hidden;
    padding-top:60px;
    .fxxt-head{
      color: #ff8814;
      padding: 0 45px;
      box-sizing: border-box;
    }
    ul{
      color:#fff;
      padding-top:45px;
      li{
        height: 102px;
        padding: 0 45px;
        box-sizing: border-box;
        overflow: hidden;
        .li-l{
          float: left;
        }
        .li-r{
          float: right;
          text-align: right;
        }
      }
    }
  }
  .coat-pos1{
    width: 1275px;
    height: 3065px;
    position: absolute;
    right: 40px;
    top: 30px;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.8);
  }
  .coat-pos2{
    width: 1275px;
    height: 3065px;
    position: absolute;
    right: 1340px;
    top: 30px;
    background-color: rgba(0, 0, 0, 0.8);
  }
  .coat-pos3 {
    width: 1225px;
    height: 1550px;
    color: #fff;
    font-size: 56px;
    position: absolute;
    right: 2639px;
    top: 30px;
  }
  .coat-pos4{
    width: 4560px;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    font-size: 56px;
    position: absolute;
    left: 485px;
    bottom: 29px;
  }
  .text-scrolling{
    padding: 0;
  }
}
</style>

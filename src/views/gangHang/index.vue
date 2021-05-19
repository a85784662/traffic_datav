<template>
  <div class="gangHang">
    <div class="coat-pos1">
        <coat>
          <div class="bar-wrap">
            <div class="bar-wrap-a">
              <div class="title title-fontsize">
                港口企业信息
              </div>
              <div class="cont-ul" v-for="(item,index) in shippingCorp" :key="index" @click="zhankaiHand($event)" style="max-height:90px">
                <div class="head">
                  <div class="icon bg1 l-float"></div>
                  <div class="txt l-float ts title-fontsize">{{item.name}}</div>
                  <div class="arrow"></div>
                </div>
                <div class="ul-cent-wrap">
                    <div class="ul-li cnt-fontsize">
                      <div class="icon bg2 l-float"></div>
                      <div class="tit l-float">企业性质</div>
                      <div class="txt l-float">{{item.type==1?'民营':item.type==2?'市属国企':item.type==3?'公务':'央企'}}</div>
                    </div>
                    <div class="ul-li cnt-fontsize">
                      <div class="icon bg3 l-float"></div>
                      <div class="tit l-float">经营范围</div>
                      <div class="txt l-float">{{item.businessScope}}</div>
                    </div>
                    <div class="ul-li cnt-fontsize">
                      <div class="icon bg4 l-float"></div>
                      <div class="tit l-float">船舶数量</div>
                      <div class="txt l-float">{{item.shipCount}}</div>
                    </div>
                    <div class="ul-li cnt-fontsize">
                      <div class="icon bg5 l-float"></div>
                      <div class="tit l-float">公司地址</div>
                      <div class="txt l-float">{{item.address}}</div>
                    </div>
                </div>
                
              </div>

            </div>
            <lineDash />
            <div class="bar-wrap-a">
              <div class="title title-fontsize">
                航运企业信息
              </div>
              <div class="cont-ul" v-for="(item,index) in portCorpData" :key="index" @click="zhankaiHand($event)" style="max-height:90px">
                <div class="head">
                  <div class="icon bg-b1 l-float"></div>
                  <div class="txt l-float ts title-fontsize">{{item.owner}}</div>
                  <div class="arrow"></div>
                </div>
                <div class="ul-cent-wrap">
                  <div class="ul-li cnt-fontsize">
                    <div class="icon bg-b2 l-float"></div>
                    <div class="tit l-float">码头名称</div>
                    <div class="txt l-float">{{item.portName}}</div>
                  </div>
                  <div class="ul-li cnt-fontsize">
                    <div class="icon bg-b3 l-float"></div>
                    <div class="tit l-float">码头类型</div>
                    <div class="txt l-float">{{item.portType}}</div>
                  </div>
                  <div class="ul-li cnt-fontsize">
                    <div class="icon bg-b4 l-float"></div>
                    <div class="tit l-float">岸线长度</div>
                    <div class="txt l-float">{{item.bankline}}</div>
                  </div>
                  <div class="ul-li cnt-fontsize">
                    <div class="icon bg-b5 l-float"></div>
                    <div class="tit l-float">靠泊能力</div>
                    <div class="txt l-float">{{item.portCapacity}}</div>
                  </div>
                  <div class="ul-li cnt-fontsize">
                    <div class="icon bg-b6 l-float"></div>
                    <div class="tit l-float">经营地域</div>
                    <div class="txt l-float">{{item.operationScope}}</div>
                  </div>
                  <div class="ul-li cnt-fontsize">
                    <div class="icon bg-b7 l-float"></div>
                    <div class="tit l-float">泊位总数</div>
                    <div class="txt l-float">{{item.berthCount}}</div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </coat>
      </div>
      <div class="coat-pos2">
        <coat>
          <div class="bar-wrap">
            <div class="bar-wrap-a">
              <div class="title title-fontsize">
                水路运输量数据
              </div>
              <div class="rotate-wrap" v-for="(item,index) in visitorData" :key="index">
                <div class="sub-title cnt-fontsize">{{item.category}}</div>
                <div class="sub-cnt">
                  <rotateAnimation :rotateData='item.nineteen' :date='item.lastYear' />
                  <rotateAnimation :rotateData='item.twenty' :date='item.currentYear' />
                </div>
              </div>
            </div>
            <lineDash />
            <div class="bar-wrap-a">
                <div class="rotate-wrap" v-for="(item,index) in cargoData" :key="index">
                <div class="sub-title cnt-fontsize">{{item.category}}</div>
                <div class="sub-cnt">
                  <rotateAnimation :rotateData='item.nineteen' :date='item.lastYear' />
                  <rotateAnimation :rotateData='item.twenty' :date='item.currentYear' />
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
import lineDash from '@/components/lineDash'
import modelNav from './modelNav'
import rotateAnimation from '@/components/rotateAnimation'
import {ajaxPortCorp, ajaxShippingCorp, ajaxVisitorData,ajaxCargoData} from './request'
export default {
  name: 'gangHang',
  data() {
    return {
      shippingCorp:[],
      portCorpData:[],
      visitorData:[],
      cargoData:[]
    }
  },
  components: {
    coat,
    lineDash,
    modelNav,
    rotateAnimation
  },
  created() {
    // 港航-获取港口企业信息
    ajaxShippingCorp()
    .then(res => {
      this.shippingCorp = res
    })
    .catch((err) => {
      alert(`获取港口企业信息失败${err}`)
    })

    // 港航-获取航运企业信息
    ajaxPortCorp()
    .then(res => {
      this.portCorpData = res
    })
    .catch((err) => {
      alert(`获取航运企业信息失败：${err}`)
    })

    // 获取客运数据
    ajaxVisitorData()
    .then(res => {
      this.visitorData = res.records
    })
    .catch((err) => {
      alert(`获取客运数据失败：${err}`)
    })

    // 获取货运数据
    ajaxCargoData()
    .then(res => {
      this.cargoData = res.records
    })
    .catch((err) => {
      alert(`获取货运数据失败：${err}`)
    })
    
    
  },
  mounted() {

  },
  methods: {
    zhankaiHand(e){
      let currentH = e.currentTarget.style.maxHeight 
      switch(currentH){
        case '90px':
          e.currentTarget.style.maxHeight  = '750px'
        break
        case '750px':
          e.currentTarget.style.maxHeight  = '90px'
        break
      }
      
    }
  },
}
</script>

<style lang="scss" scoped>
.gangHang {
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
        color: #ff8814;
      }
  .echarts {
    width: 100%;
    height: 100%;
  }
  .bar-wrap {
    box-sizing: border-box;
    padding: 55px 55px 0;
    overflow: hidden;
    .bar-wrap-a {
      width: 100%;
      overflow: hidden;
      .rotate-wrap{
        .sub-title{
          height: 55px;
          overflow: hidden;
          color: #fff;
        }
        .sub-cnt{
          height: 410px;
          overflow: hidden;
          display: flex;
          justify-content: space-around;
        }
      }
      .cont-ul{
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
        margin-bottom: 15px;
        transition:max-height .6s;
        .l-float{
            float: left;
          }
        .tit{
            width: 235px;
            overflow: hidden;
            &.ts{
              font-size: 50px;
              color: #fff;
            }
          }
          .txt{
            width: 795px;
            overflow: hidden;
            &.ts{
              color: #fff;
            }
          }
        .ul-cent-wrap{
          width: 100%;
          box-sizing: border-box;
          padding-left: 40px;
          overflow: hidden;
          background-color: #16192e;
        }
        .head{
          position: relative;
          min-height: 90px;
          font-size: 48px;
          color:#fff;
          .arrow{
            width: 46px;
            height: 46px;
            background: url('./images/icon6.png') no-repeat center center;
            position: absolute;
            right:30px;
            top:15px;
            cursor: pointer;
          }
        }
        .ul-li cnt-fontsize{
          min-height: 90px;
          overflow: hidden;
          color:#fff;
          .icon{
            width: 46px;
            height: 46px;
            margin: 10px 26px 0 0;
            &.bg1{
              background: url('./images/icon1.png') no-repeat center center;
            }
            &.bg2{
              background: url('./images/icon2.png') no-repeat center center;
            }
            &.bg3{
              background: url('./images/icon3.png') no-repeat center center;
            }
            &.bg4{
              background: url('./images/icon4.png') no-repeat center center;
            }
            &.bg5{
              background: url('./images/icon5.png') no-repeat center center;
            }
            
            &.bg-b1{
              background: url('./images/icon_b1.png') no-repeat center center;
            }
            &.bg-b2{
              background: url('./images/icon_b2.png') no-repeat center center;
            }
            &.bg-b3{
              background: url('./images/icon_b3.png') no-repeat center center;
            }
            &.bg-b4{
              background: url('./images/icon_b4.png') no-repeat center center;
            }
            &.bg-b5{
              background: url('./images/icon_b5.png') no-repeat center center;
            }
            &.bg-b6{
              background: url('./images/icon_b6.png') no-repeat center center;
            }
            &.bg-b7{
              background: url('./images/icon_b7.png') no-repeat center center;
            }
            
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
  .coat-pos1{
    width: 1275px;
    height: 3065px;
    position: absolute;
    right: 40px;
    top: 30px;
    background-color: rgba(0, 0, 0, 0.8);
    overflow: hidden;
    overflow-y: auto;
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
}
</style>

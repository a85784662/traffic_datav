<template>
  <div class="Hangfa">
      <div class="coat-pos1">
        <coat>
          <div class="bar-wrap">
              <div class="title title-fontsize">
                企业概况
              </div>
              <div class="cnt-wrap">
                <p>简述</p>
                {{TransCorpSummary.bref}}
              </div>
            <lineDash />
            <div class="cnt-wrap">
                <p>重点（总部）企业</p>
                <ul>
                  <li v-for="(item,index) in TransCorpSummary.yzjtjKeyEntList" :key="index">{{item.title}}</li>
                </ul>
              </div>
            <div class="bar-wrap-a">
              
            </div>
          </div>

        </coat>
      </div>
      <div class="coat-pos2">
        <coat>
          <div class="bar-wrap">
              <div class="title title-fontsize">
                服务企业事项
              </div>
              <div class="cnt-wrap">
                <textScrolling size="superbig" :startAnimation='startAnimation' style="padding:0">
                    <template v-slot:content>
                      <div class="item-ele" v-for="(item2,index) in servCorpEvntInfoData" :key='index'>
         
                        <div class="head-t">{{item2.title}}</div>
    
                        <div class="date-wrap">{{item2.signDate}}</div>
                        <img :src="baseUrl+item2.picture" />
                        <div class="cnt-wrap" >
                          {{item2.bref}}
                        </div>
                        <lineDash />
                      </div>
                    </template>
                  </textScrolling>  
              
              </div>
          </div>
        </coat>
      </div>
  </div>
</template>

<script>
import coat from '@/components/coat'
import textScrolling from '@/components/textScrolling'
import lineDash from '@/components/lineDash'
import { ajaxTransCorpSummary,ajaxServCorpEvnt } from './request'
export default {
  name: 'Hangfa',
  data() {
    return {
      startAnimation:'',
      servCorpEvntInfoData:[],
      TransCorpSummary:{},
      baseUrl:this.publicUrl
    }
  },
  components: {
    coat,
    textScrolling,
    lineDash
  },
  created() {
    // 企业概况
    ajaxTransCorpSummary()
    .then(res => {
      this.TransCorpSummary = res
    })
    .catch((err) => {
      alert(`企业概况获取失败：${err}`)
    })
    // 服务企业事项
    ajaxServCorpEvnt()
    .then(res => {
      this.servCorpEvntInfoData = res
      this.startAnimation = 'start'
    })
    .catch((err) => {
      alert(`服务企业事项获取失败：${err}`)
    })
  }
}
</script>

<style lang="scss" scoped>
.Hangfa {
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
        height: 75px;
        overflow: hidden;
        color: #ff8814;
        padding: 50px 0;
      }
  .echarts {
    width: 100%;
    height: 100%;
  }
  
  .coat-pos1{
    width: 1270px;
    height: 3065px;
    position: absolute;
    right: 40px;
    top: 30px;
    background-color: rgba(0, 0, 0, 0.8);
  }
  .coat-pos2{
    width: 1270px;
    height: 3065px;
    position: absolute;
    right: 1340px;
    top: 30px;
    background-color: rgba(0, 0, 0, 0.8);
  }
  .bar-wrap {
    padding: 0 55px 0;
    overflow: hidden;
    .cnt-wrap{
      overflow: hidden;
      color:#fff;
      font-size: 56px;
      line-height: 80px;
      p{
        padding-bottom: 35px;
      }
      ul{
        font-size: 56px;
        li{
          height: 105px;
          overflow: hidden;
        }
      }
      .item-ele{
        .head-t{
            height: 66px;
            overflow: hidden;
            font-size: 56px;
            color:#fff;
          }
          .date-wrap{
            height: 86px;
            overflow: hidden;
            font-size: 48px;
            color:#fff;
          }
        img{
          width: 100%;
          margin-bottom: 55px;
        }
      }
    }
  }
}
</style>

<template>
  <div class="modelNav">
    <div class="video-big-wrap" v-if="boatOption">
      <coat>
        <div class="vireo-coat" v-if="boatOption" >
          <div class="title title-fontsize">{{boatOption.title}}</div>
          <div class="text-cnt cnt-fontsize" >
            <p>所在航道：{{boatOption.channel}}</p>
            <p>企业名称：{{boatOption.corpName}}</p>
            <p>企业性质：{{boatOption.corpType}}</p>
          </div>
        </div>
      </coat>
    </div>
    <div class="nav-wrap">
          <div class="nav-item-m cnt-fontsize"  >
            <div class="tit">
              <div class="text" :class="{active: isActive=='e'}" @click="navClick('e')">趸船码头点位</div>
              <div v-show="isActive=='e'" class="arrow"></div>
            </div>
            <div class="subn">Pontoon terminal location</div>
          </div>
        </div>
  </div>
</template>

<script>
import coat from '@/components/coat'
import {ajaxBoatList} from './request'
export default {
  name: 'modelNav',
  props: {

  },
  data(){
    return {
      isActive:'',
      boatOption:null,
      BoatList:null
    }
  },
  components:{
    coat
  },
  created() {
    // 获取趸船列表
    ajaxBoatList()
    .then(res => {
      this.BoatList = res
    })
    .catch(err => {
      alert(`获取趸船列表失败:${err}`)
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
           if(currentModelData.tag===2){
            let transformcorpType = ''
            switch(currentModelData.corpType){
              case '1':
               transformcorpType = '民营'
              break 
              case '2':
               transformcorpType = '市属国企'
              break 
              case '3':
               transformcorpType = '公务'
              break 
              case '4':
               transformcorpType = '央企'
              break 
            }
            let obj = {
              channel:currentModelData.channel=='1'?'嘉陵江':'长江',
              corpName:currentModelData.corpName,
              corpType:transformcorpType,
              title:currentModelData.boatName
            }
            _this.boatOption = obj
          }
        }
      }
    }
  })
  },
  beforeDestroy() {
    window.yz_clearsprite('shap')
    this.boatOption =null
  },
  methods: {
      navClick(type){
      switch(type){
        case 'e':
          // 清除操作
          this.boatOption = null
          window.yz_clearsprite()

          if(this.isActive == 'e'){
            this.isActive = ''
            return
          }
          this.isActive = 'e'
          
          //趸船码头点位
          window.yz_addsprite('shap',this.BoatList)
        break
      }
    },
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
    .vireo-coat{
      padding: 60px 60px 0;
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
}
</style>

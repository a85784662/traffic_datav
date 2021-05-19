<template>
  <div class="modelNav">
    <div class="video-big-wrap" v-if="waterOption">
      <coat>
        <div class="vireo-coat" v-if="waterOption" >
          <div class="title title-fontsize">取水点详情</div>
          <div class="text-cnt cnt-fontsize" >
            <div class="text-c-ele">
              <div class="text-l">单位：</div>
              <div class="text-r">{{waterOption.owner}}</div>
            </div>
            <div class="text-c-ele">
              <div class="text-l">用途：</div>
              <div class="text-r">{{waterOption.waterUsage}}</div>
            </div>
            
            
            <div class="text-c-ele">
              <div class="text-l">水源类型：</div>
              <div class="text-r">{{waterOption.sourceType }}</div>
            </div>
            <div class="text-c-ele">
              <div class="text-l">日最大取水量：</div>
              <div class="text-r">{{waterOption.collectAmount}}吨</div>
            </div>
            <div class="text-c-ele">
              <div class="text-l">取水号：</div>
              <div class="text-r">{{waterOption.licenceno}}</div>
            </div>
            <div class="text-c-ele">
              <div class="text-l">取水点：</div>
              <div class="text-r">{{waterOption.collectPlace}}</div>
            </div>
            <div class="text-c-ele">
              <div class="text-l">到期日期：</div>
              <div class="text-r">{{waterOption.enddate}}</div>
            </div>

          </div>
        </div>
      </coat>
    </div>
    <div class="nav-wrap">
          <div class="nav-item-m cnt-fontsize"  >
            <div class="tit">
              <div class="text" :class="{active: isActive=='e'}" @click="navClick('e')">取水点</div>
              <div v-show="isActive=='e'" class="arrow"></div>
            </div>
            <div class="subn">Water Collection Point</div>
          </div>
        </div>
  </div>
</template>

<script>
import { ajaxWaterCollectionPoint } from './request'
import coat from '@/components/coat'
export default {
  name: 'modelNav',
  props: {

  },
  data(){
    return {
      isActive:'',
      waterOption:null,
      WaterCollectionPoint:null
    }
  },
  created() {
    ajaxWaterCollectionPoint()
    .then(res => {
      this.WaterCollectionPoint = res
    })
    .catch(err => {
      alert(`获取取水点列表失败:${err}`)
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
          
          if(currentModelData.tag==5){
            let obj = {
              title:currentModelData.title,
              owner:currentModelData.owner,
              waterUsage:currentModelData.waterUsage,
              sourceType:currentModelData.sourceType,
              enddate:currentModelData.enddate,
              collectPlace:currentModelData.collectPlace,
              collectAmount:currentModelData.collectAmount,
              licenceno:currentModelData.licenceno,
            }
            _this.waterOption = obj
          }
         // console.log(currentModelData)
        }
      }
    }
  })
  },
  components:{
    coat
  },
  beforeDestroy() {
    this.waterOption = null
    window.yz_clearsprite()
  },
  methods: {
        navClick(type){
      switch(type){
        case 'e':
          // 清除操作
          this.waterOption = null
          window.yz_clearsprite()
          if(this.isActive == 'e'){
            this.isActive = ''
            return
          }
          this.isActive = 'e'
          
          //取水点点位
          //console.log('this.WaterCollectionPoint',this.WaterCollectionPoint);
          window.yz_addsprite('water',this.WaterCollectionPoint)
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
        .text-c-ele{
          overflow: hidden;
          .text-l{
            width: 340px;
            float: left;
            text-align: right;
          }
          .text-r{
            width:740px;
            float: left;
          }
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
}
</style>

<template>
  <div class="modelNav">
    <div class="video-big-wrap" v-if="junctionOption">
      <coat>
        <div class="vireo-coat" v-if="junctionOption" >
          <div class="title cnt-fontsize">枢纽站</div>
          <div class="text-cnt cnt-fontsize" >
            <p style="width:100%"><img width="100%" :src="'yzjtj/'+ junctionOption.picture" ></p>
            <p>站名：{{junctionOption.name}}</p>
            <p>地址：{{junctionOption.address}}</p>
          </div>
        </div>
      </coat>
    </div>
    <div class="nav-wrap">
          <div class="nav-item-m cnt-fontsize"  >
            <div class="tit">
              <div class="text" :class="{active: isActive=='e'}" @click="navClick('e')">枢纽站</div>
              <div v-show="isActive=='e'" class="arrow"></div>
            </div>
            <div class="subn">Junction</div>
          </div>
        </div>
  </div>
</template>

<script>
import coat from '@/components/coat'
import {ajaxJunction} from './request'
export default {
  name: 'modelNav',
  props: {

  },
  data(){
    return {
      isActive:'',
      junctionOption:null,
      junctionList:null
    }
  },
  components:{
    coat
  },
  created() {
    // 获取枢纽站列表
    ajaxJunction()
    .then(res => {
      this.junctionList = res
    })
    .catch(err => {
      alert(`获取枢纽站列表失败:${err}`)
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
           if(currentModelData.tag===9){
            
            let obj = {
              picture:currentModelData.picture,
              name:currentModelData.name,
              address:currentModelData.address
            }

            _this.junctionOption = obj
          }
        }
      }
    }
  })
  },
  beforeDestroy() {
    window.yz_clearsprite('shap')
    this.junctionOption =null
  },
  methods: {
      navClick(type){
      switch(type){
        case 'e':
          // 清除操作
          this.junctionOption = null
          window.yz_clearsprite()

          if(this.isActive == 'e'){
            this.isActive = ''
            return
          }
          this.isActive = 'e'
          
          //枢纽站点位
          window.yz_addsprite('sn',this.junctionList)
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

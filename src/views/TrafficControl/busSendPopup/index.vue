<template>
  <div class="busSendPopup">
    <div class="nav-wrap">
              <div
                class="nav-item-video"
                :class="{ active: currentVideoNav == 'a' }"
                @click="videoNavClick('a')"
              >
                长途站线

              </div>
              <div
                class="nav-item-video"
                :class="{ active: currentVideoNav == 'b' }"
                @click="videoNavClick('b')"
              >
                朝东路站线

              </div>
              <div
                class="nav-item-video"
                :class="{ active: currentVideoNav == 'c' }"
                @click="videoNavClick('c')"
              >
                重庆站线

              </div>
        </div>
      <div class="content">
        <table>
          <thead class="title-fontsize">
            <tr id="week">
              <td>序号</td>
              <td>起始站</td>
              <td>省</td>
              <td>市</td>
              <td>县（终点）</td>
              <td>车辆情况</td>

            </tr>
          </thead>
          <tbody id="tbody" class="cnt-fontsize">
            <tr v-for="(item,index) in tableData" :key="index">
              <td>{{index+1}}</td>
              <td>{{item.start}}</td>
              <td>{{item.destProvince}}</td>
              <td>{{item.destCity}}</td>
              <td>{{item.destCounty}}</td>
              <td style="width:1620px">{{item.busStatistics}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="close-wrap" @click="closePopup"></div>
  </div>
</template>

<script>
import {ajaxbusScheduleList} from './request'
export default {
  name: 'busSendPopup',
  data() {
    return {
      currentVideoNav: 'a',
      tableData:[],
      busStart:'长途站'
    }
  },
  components: {

  },
  created() {
    // 获取初始信息
    ajaxbusScheduleList(this.busStart)
    .then(res => {
      console.log('res',res);
      this.tableData = res.records
    })
    .catch(err => {
      alert(err)
    })
  },
  watch:{
     busStart(val){//普通的watch监听
         ajaxbusScheduleList(val)
        .then(res => {
          this.tableData = res.records
        })
        .catch(err => {
          alert(err)
        })
     }
 },
  methods: {
    videoNavClick(currentVideoNav) {
      this.currentVideoNav = currentVideoNav
      let currentType = ''
      switch(currentVideoNav){
        case 'a':
          currentType='长途站'
        break
        case 'b':
          currentType='朝东路'
        break
        case 'c':
          currentType='重庆站'
        break
      }
      this.busStart = currentType
    },
    closePopup(){
      this.$emit('busSendPopupClose')
    }
  }
}
</script>

<style lang="scss" scoped>
.busSendPopup{
  width: 3271px;
  height: 1453px;
  padding: 0 100px;
  box-sizing: border-box;
  position:absolute;
  top:50%;
  left:50%;
  background-color: rgba(0,0,0,0.7);
  transform:translate(-78%,-50%);
  z-index: 19;
  .nav-wrap {
      width: 100%;
      height: 120px;
      padding-top: 42px;
      font-size: 56px;
      color: #fff;
      .nav-item-video {
        width: 305px;
        height: 114px;
        line-height: 114px;
        text-align: center;
        cursor: pointer;
        float: left;
        position: relative;
        margin-right: 120px;
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
  .close-wrap{
      width: 60px;
      height: 60px;
      background: url('./close.png') no-repeat;
      position: absolute;
      right:40px;
      top:40px;
      cursor: pointer;
    }
  .content{
    width: 100%;
    height: 1110px;
    overflow: hidden;
    overflow-y:auto;
    margin-top: 90px;
    table{
      width: 100%;
      color:#fff;
      thead{
        color: #ff8814;
        td{
          height: 90px;
        }
      }
      tbody{
        td{
          height: 90px;
        }
      }
    }
  }
}

</style>

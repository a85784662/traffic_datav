<template>
  <div class="classLinePopup">

      <div class="content">
        <table>
          <thead class="title-fontsize">
            <tr id="week">
              <td>序号</td>
              <td>线路</td>
              <td>总台数</td>
              <td>在线运营数</td>
              <td>始发站</td>
              <td>到达站</td>
            </tr>
          </thead>
          <tbody id="tbody" class="cnt-fontsize">
            <tr v-for="(item,index) in tableData" :key="index">
              <td>{{index+1}}</td>
              <td>{{item.line}}</td>
              <td>{{item.total}}</td>
              <td>{{item.running}}</td>
              <td>{{item.start}}</td>
              <td>{{item.destination}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="close-wrap" @click="closePopup"></div>
  </div>
</template>

<script>
import {ajaxBusLineList} from './request'
export default {
  name: 'classLinePopup',
  data() {
    return {
      currentVideoNav: 'a',
      tableData:[]
    }
  },
  components: {

  },
  created() {
    // 获取列表信息
    ajaxBusLineList()
    .then(res => {
      console.log('res',res);
      this.tableData = res.records
    })
    .catch(err => {
      alert(err)
    })
  },
  methods: {
    closePopup(){
      this.$emit('classLinePopupClose')
    }
  }
}
</script>

<style lang="scss" scoped>
.classLinePopup{
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

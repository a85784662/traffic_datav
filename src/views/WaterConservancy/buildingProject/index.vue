<template>
  <div class="buildingProject">
    <div class="arrow" @click="unfold"></div>
    <div class="cnt-wrap" ref="cntwrap">
      <div class="title title-fontsize">涉河建设项目</div>
      <table class="m-table" ref="mtable"> 
        <thead>
          <tr>
            <td>项目名称</td>
            <td>建设单位</td>
            <td>行业类型</td>
            <td>批复机构</td>
            <td>批复文号</td>
            <td>批复时间</td>
            <td>项目地址</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for='(item,index) in buildProData' :key="index">
            <td >{{item.projectName}}</td>
            <td >{{item.constructionUnit}}</td>
            <td >{{item.industryType}}</td>
            <td >{{item.issuedOrgan}}</td>
            <td >{{item.issuedNo}}</td>
            <td>{{item.issuedDate}}</td>
            <td >{{item.address}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'buildingProject',
  props:{
    buildProData:{}
  },
  data() {
    return {
      isUnfold:false
    }
  },
  components: {

  },
  methods: {
    unfold(){
      if(this.isUnfold){
        this.$refs.cntwrap.style.height = `340px`
      }else{
        let eleH = this.$refs.mtable.offsetHeight+100;
        this.$refs.cntwrap.style.height = `${eleH}px`
      }
      this.isUnfold = !this.isUnfold
    }
  }
}
</script>

<style lang="scss" scoped>
.buildingProject {
  position: relative;
  .arrow{
    width: 31px;
    height: 23px;
    background: url('./images/arrow.png') no-repeat;
    position: absolute;
    left: 50%;
    top:-15px;
    margin-left: -15.5px;
    cursor: pointer;
  }
  .cnt-wrap{
    width: 100%;
    height: 340px;
    transition:height .6s;
    overflow: hidden;
    padding:60px 60px 0;
    box-sizing: border-box;
    .title{
      color:#ff8814;
    }
    .m-table{
      width: 100%;
      font-size: 42px;
      margin-top: 40px;
      thead{
        color: #ff8814;
      }
      td{
       padding-bottom: 26px;
       padding-right:10px
      }
    }
  }
}
</style>

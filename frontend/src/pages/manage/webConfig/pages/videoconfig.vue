<template>
    <div class='videoconfig'>
      <div class="title_box"><span class="title_tet">庭审视频</span></div>
        <div class='header-all'>
             <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="庭审直播" name="first">
                    <tabpane1 ref="tabpane1"></tabpane1>
                </el-tab-pane>
                <el-tab-pane label="庭审点播" name="second">
                    <tabpane2 ref="tabpane2"></tabpane2>
                </el-tab-pane>
             </el-tabs>
        </div>
    </div>
</template>

<script>
import tabpane1 from "../videoconfig/tabpane1" //庭审直播
import tabpane2 from "../videoconfig/tabpane2" //庭审点播
export default {
    //注册子组件
    components: {
        tabpane1,
        tabpane2
    },
    data() {
        return {
            activeName: 'first',
        }
    },
    computed: {

    },
    mounted() {

    },
    watch:{
        activeName(v){
            this.handleClick()
        }
    },
    methods: {
      // 直播点播切换
      handleClick(){
        if(this.activeName == 'first'){
          // 恢复平铺视图
          this.$refs.tabpane1.activeIndex = '1';
          this.$refs.tabpane1.pageIndex = 1;
          this.$refs.tabpane1.getTableData();
        }
        if(this.activeName == 'second'){
          // 点击庭审点播时，调用庭审点播中方法
          this.$refs.tabpane2.year = '全部';
          this.$refs.tabpane2.courtUnitPronoun = '全部';
          this.$refs.tabpane2.caseTypePronoun = '全部';
          this.$refs.tabpane2.caseNum = '';
          this.$refs.tabpane2.startCreateCaseDate = '';
          this.$refs.tabpane2.endCreateCaseDate = '';
          this.$refs.tabpane2.courtRoomName = '';
          this.$refs.tabpane2.departmentId = '';
          this.$refs.tabpane2.undertakerId = '';
          this.$refs.tabpane2.lastJudgeName = '';
          this.$refs.tabpane2.clerkId = '';
          this.$refs.tabpane2.pageIndex = 1;
          this.$refs.tabpane2.getAllcourtPronoun();
          this.$refs.tabpane2.getCaseTypePronoun();
          this.$refs.tabpane2.getBusinessByCourt();
          this.$refs.tabpane2.geUserByCourt();
          this.$refs.tabpane2.getTableData();
        }
      },

    }
}
</script>





<style lang = 'less'>

.videoconfig{
    width: 100%;
    height: 100vh;
    /*background: rgba(0,0,0,0.5);*/
    .title_tet{
      float: left;
      font-size: 0.8vw;
      color: #fff;
      line-height: 6vh;
      margin-left: 1vw;
    }
    .title_box{
      width: 100vw;
      height: 6vh;
      background-color: #333;
      background-image: url("../images/title.png");
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: center;
    }
    .content{
        width: 80%;
    }
  .el-menu.el-menu--horizontal{
      border:none;
  }
  .el-menu--horizontal>.el-menu-item{
    width: 5vw;
    height: 3.8vh;
    line-height: 3.8vh;
    font-size: 0.75vw;
    margin:0;
    padding: 0 0;
    text-align: center;
    border:1px solid #b9bec1;
  }
  .el-menu--horizontal>.el-menu-item:first-child{
    border-right: 1px solid #b9bec1;
  }
  /*被点击时的样式*/
  .el-menu--horizontal>.el-menu-item.is-active{
    border:1px solid rgb(46,141,237);
    color:#57a3f1;
  }
  .header-all{
    width: 100%;
    height: 4vh;
    background-color: #eff3fb;
    float: left;
    margin: 2vh 0;
    .el-tabs__header{
      margin: 0 0 2vh;
    }
    .el-tabs--card>.el-tabs__header{
      border:none;
      .el-tabs__nav{
        border:none;
      }
    }
    .el-tabs__item.is-active{
        background: #57a3f1;
        color:#fff;
    }
  }
  .el-tabs__item {
    padding: 0 1vw;
    height: 4vh;
    box-sizing: border-box;
    line-height: 4vh;
    display: inline-block;
    list-style: none;
    font-size: 0.75vw;
    font-weight: 500;
    position: relative;
  }
  .el-tabs__content {
    width: 100%;
    height: 80vh;
    overflow: hidden;
    position: relative;
    padding-left: 1vw;
    padding-right: 1vw;
  }
  .el-tab-pane{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .up{
    width: 100%;
    position: absolute;
    bottom: 0;
  }
  .up .page {
    margin: 0 auto;
    width: 620px;
    margin-top: 10vh;
    text-align: center;
  }
  .up .page .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
    min-width: 1.6vw;
  }
  .el-pagination button, .el-pagination span:not([class*=suffix]){
    font-size: 0.75vw !important;
    height: 2.9vh !important;
    line-height: 2.9vh !important;
  }
  .up .page .el-pagination .btn-next .el-icon, .el-pagination .btn-prev .el-icon{
    font-size: 0.75vw;
  }
  .up .page .up .page input, .up .page li.number, .up .page span{
    font-size: 0.75vw;
  }
  .up .page .el-pager li{
    height: 2.9vh;
    line-height: 2.9vh;
  }
  .el-pagination__editor{
    line-height: 2.9vh;
    height: 2.9vh;
  }
  .el-pagination__editor.el-input .el-input__inner {
    height: 2.9vh;
  }
  .up .page input{
    font-size: 0.75vw;
  }
  .el-pagination__editor.el-input {
    width: 2.5vw;
  }
  .el-table th, .el-table tr{
    height: 5vh;
    padding: 0 0;
  }
  .el-table td{
    padding: 0 0;
  }
  .el-table .cell{
    line-height: normal;
    font-size: 0.75vw;
  }
  .el-table--border td:first-child .cell, .el-table--border th:first-child .cell, .el-table .cell, .el-table th div{
    padding-left: 2px;
  }
  .el-table .cell, .el-table th div{
    padding-right: 2px;
  }
}
</style>

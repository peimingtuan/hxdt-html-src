<template>
  <div class="tabpane3">
    <div class="top">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane v-for="(tab,index) in tablist" :key="index" :label="tab.name"  :name="tab.id">
          <div v-if="index===0">
            <tds-module ref="tdsModule" />
          </div>
          <div v-else-if="index===1">
            <tds-module2 ref="tdsModule2" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabpane3",
  components: {
    tdsModule:()=>import("./tabpane3/tdsModule1"),
    tdsModule2:()=>import("./tabpane3/tdsModule2"),
  },
  data() {
    return {
      tablist:[
        {
          id:'first',
          name:'TDS客户端'
        },
        {
          id:'second',
          name:'TDS呼叫设置'
        }
      ],
      activeName:'',
    };
  },
  watch:{
    activeName(v){
      switch(v){
        case 'first':
          this.$refs.tdsModule[0].getTDSClients();
          break;
        case 'second':
          this.$refs.tdsModule2[0].getTDSSettings();
          break;
      }
    }
  },
  created() {

  },
  mounted() {},
  destroyed() {},
  methods: {

  }
};
</script>

<style lang="less">
  @import url('../css/common.less');
  .tabpane3{
    .top{
      .fl();
      .el-tabs__header{
        margin-bottom:0;
      }
      .el-tabs__item{
        text-align: center ;
        height:.4rem;
        line-height:.4rem;
        .f20();
        color: #606266;
      }
      .el-tabs--card>.el-tabs__header .is-active{
        border-left:1px solid #2f8ded;
      }
      /*激活标签*/
      .is-active{
        color:#fff;
        background:#2F8DED;
        border: 1px solid #2F8DED;
        border-bottom-color: #2F8DED!important;
        border-left-color: #2F8DED!important;
      }
      /*存放内容*/
      .el-tabs__content{
        top:.5rem!important;
      }
    }
  }
</style>
<style scoped>
  .tabpane3{
    min-height:8rem;
  }
</style>
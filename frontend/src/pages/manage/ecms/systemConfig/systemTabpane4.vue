<template>
 <div class="systemTabpane4">
  <el-tabs v-model="activeName" type="card">
   <el-tab-pane label="客户端界面配置" name="first">
    <client-config ref="clientConfig" />
   </el-tab-pane>
  </el-tabs>
 </div>
</template>

<script>
 export default {
  name: "systemTabpane4",
  data() {
   return {
    activeName:'first'
   }
  },
  computed: {},
  components: {
   clientConfig:()=>import("./systemTabpane4/clientConfig")
  },
  watch: {},
  mounted() {

  },
  methods: {

  }
 };
</script>

<style lang="less">
 @import url("../css/common.less");
 .systemTabpane4 {
  @import url("../css/element.less");
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
   top:.1rem!important;
  }
  // input框的样式
  .el-form-item__label {
   .f18()
  }
  .el-input {
   width: 240px;
   // margin-left: 10px;
  }
  .el-form-item__label {
   padding: 0;
  }
 }
</style>
<style lang="less" scoped>
 .systemTabpane4 {
  width: 100%;
  height: 100%;
 }
</style>
<template>
  <div class="othertabpane10">
      <el-button @click="saveDefaultSchemaLogic">获取默认笔录模板</el-button>
      <el-button @click="getRecordStyle">获取笔录格式</el-button>
  </div>
</template>

<script>
export default {
  name: "othertabpane10",
  data() {
    return {

    }
  },
  created() {},
  mounted() {

  },
  destroyed() {},
  methods: {
    //获取笔录格式
    getRecordStyle() {
      const _this = this;
      _this.$showToast('加载中...')
      _this.$http.post("/getRecordStyle",{}).then(data => {
        _this.$hideToast()
          if(data.code===200){
            _this.$msgs(data.message)
          }else{
            _this.$msgw(data.message)
          }
        }).catch(err => {
          _this.$hideToast()
          console.log(err, "/getRecordStyle");
        });
    },
    //获取默认笔录模板
      saveDefaultSchemaLogic() {
      const _this = this;
          _this.$showToast('加载中...')
      _this.$http.post("/saveDefaultSchemaLogic",{}).then(data => {
          _this.$hideToast()
        if(data.code===200){
          _this.$msgs(data.message)
        }else{
          _this.$msgw(data.message)
        }
      }).catch(err => {
       _this.$hideToast()
        console.log(err, "/saveDefaultSchemaLogic");
      });
    }
  }
};
</script>

<style lang="less">
@import url("../css/common.less");
.othertabpane10 {
  .el-button {
    margin:.5rem 0;
    background: #409eff;
    cursor:pointer;
    span {
      .f18();
      color: #fff;
    }
  }
}
</style>
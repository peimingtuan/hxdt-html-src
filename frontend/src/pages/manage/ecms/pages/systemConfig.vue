<template>
  <div class="systemConfig">
    <!--头部-->
    <div class="head">
      <leftTile :imgurl="imgurl" :text="text" :text2="text2" />
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基础功能配置" name="first">
          <systemTabpane1 ref="systemTabpane1" />
        </el-tab-pane>
        <el-tab-pane label="数据相关配置" name="second">
          <systemTabpane2 ref="systemTabpane2" />
        </el-tab-pane>
        <el-tab-pane label="第三方系统配置" name="three">
          <systemTabpane3 ref="systemTabpane3" />
        </el-tab-pane>
        <!--<el-tab-pane label="其他配置" name="four">-->
          <!--<systemTabpane4 ref="systemTabpane4" />-->
        <!--</el-tab-pane>-->
      </el-tabs>
    </div>
  </div>
</template>
 
<script>
import leftTile from "../component/leftTile"; //主页左侧头部
import systemTabpane1 from "../systemConfig/systemTabpane1";
import systemTabpane2 from "../systemConfig/systemTabpane2";
import systemTabpane3 from "../systemConfig/systemTabpane3";
//import systemTabpane4 from "../systemConfig/systemTabpane4";
export default {
  name: "systemConfig",
  data() {
    return {
      imgurl: require("../images/yingyongpeizhi/fatingwaiwei3.png"),
      text: "系统配置",
      text2: "XI TONG PEI ZHI",
      activeName: "first"
    };
  },
  computed: {},
  components: {
    leftTile,
    systemTabpane1,
    systemTabpane2,
    systemTabpane3,
    //systemTabpane4
  },
  watch: {},
  mounted() {},
  methods: {
    // 菜单栏的点击事件
    handleClick(tab, event) {
      if (tab.index == 0) {
        this.$refs.systemTabpane1.getSetting();
      }
      if (tab.index == 1) {
        this.$refs.systemTabpane2.getSetting();
      }
      if (tab.index == 2) {
        this.$refs.systemTabpane3.getSetting();
      }
      // if (tab.index == 3) {
      //   this.$refs.systemTabpane4.$refs.clientConfig.getInfoData();
      // }
    }
  }
};
</script>
 
<style lang="less">
@import url("../css/common.less");
.systemConfig {
  padding: 0 0.2rem;
  .el-tabs__content{
    height:calc(93vh - 70px);
    overflow: auto;
  }
  .head {
    position: relative;
    padding: 0.1rem 0;
    .fb();
    .el-tabs__item {
      padding: 0 0.2rem;
      height: 0.4rem;
      line-height: 0.4rem;
      .f18();
    }
    .el-tabs__active-bar {
      width: 100%;
    }
    & > div {
      /*内容填充区域*/
      & > div.el-tabs__content {
        width: 100%;
        position: absolute;
        left: 0;
        /*top:1rem;*/
      }
    }
  }
}
</style>
<style lang="less" scoped>
@import url("../css/common.less");
.systemConfig {
}
</style>

<template>
  <div class="remoteconfig">
    <!--头部-->
    <div class="head">
      <leftTile :imgurl="imgurl" :text="text" :text2="text2" />
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="庭审室类型配置" name="first">
          <remotetabpane1 ref="remotetabpane1" />
        </el-tab-pane>
        <el-tab-pane label="远程庭审单位配置" name="second">
          <remotetabpane2 ref="remotetabpane2" />
        </el-tab-pane>
        <el-tab-pane label="远程庭审室配置" name="three">
          <remotetabpane3 ref="remotetabpane3" />
        </el-tab-pane>
        <el-tab-pane label="远程庭审模板配置" name="four">
          <remotetabpane4 ref="remotetabpane4" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import leftTile from "../component/leftTile"; //主页左侧头部
import remotetabpane1 from "../remoteconfig/remotetabpane1"; //remotetabpane1
import remotetabpane2 from "../remoteconfig/remotetabpane2"; //remotetabpane2
import remotetabpane3 from "../remoteconfig/remotetabpane3"; //remotetabpane3
import remotetabpane4 from "../remoteconfig/remotetabpane4"; //remotetabpane4
export default {
  name: "remoteconfig",
  components: {
    leftTile,
    remotetabpane1,
    remotetabpane2,
    remotetabpane3,
    remotetabpane4
  },
  data() {
    return {
      imgurl: require("../images/yingyongpeizhi/remote3.png"),
      text: "远程庭审相关配置",
      text2: "YUAN CHENG TING SHEN XIANG GUAN PEI ZHI",
      activeName: "first"
    };
  },
  created() {

  },
  mounted() {

  },
  destroyed() {},
  methods: {
    handleClick(tab, event) {
      if (tab.index == 0) {
        this.$refs.remotetabpane1.getTrialRoomTypeInfos();
      }
      if (tab.index == 1) {
        this.$refs.remotetabpane2.getRemoteTrialUnits();
        this.$refs.remotetabpane2.trialUnitId = '';
        this.$refs.remotetabpane2.trialUnitName = '';
        this.$refs.remotetabpane2.parentTrialUnitId = '';
      }
      if (tab.index == 2) {
        this.$refs.remotetabpane3.getTreeData("");
      }
      if(tab.index == 3) {
        this.$refs.remotetabpane4.retabpaneFour1Data();
        this.$refs.remotetabpane4.templateGroupId = '';
        this.$refs.remotetabpane4.radio =  '1';
        this.$refs.remotetabpane4.grouplist = [{templateGroupId:'',templateGroupName:'所有'}];
      }
    }
  }
};
</script>

<style lang="less">
@import url("../css/common.less");
.remoteconfig {
  padding: 0 0.2rem;
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
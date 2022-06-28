<!--
 * @Author: your name
 * @Date: 2020-02-20 15:28:53
 * @LastEditTime: 2020-02-21 15:29:37
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \ECMS\src\pages\manage\ecms\pages\trialbusiness.vue
 -->
<template>
  <div class="trialbusiness">
    <!--头部-->
    <div class="head">
      <leftTile :imgurl="imgurl" :text="text" :text2="text2" />
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="审理模式匹配条件配置" name="first">
          <trialtabpane1 />
        </el-tab-pane>
        <el-tab-pane label="庭审默认流程配置" name="second">
          <trialtabpane2 />
        </el-tab-pane>
        <el-tab-pane label="默认笔录模板配置" name="three">
          <trialtabpane3 />
        </el-tab-pane>
        <el-tab-pane label="播报文件配置" name="four">
          <trialtabpane4 />
        </el-tab-pane>
        <el-tab-pane label="证人证言模板配置" name="five">
          <trialtabpane5 />
        </el-tab-pane>
        <el-tab-pane label="法庭纪律、权利义务" name="nine">
          <trialtabpane6 ref="trialtabpane6" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import leftTile from "../component/leftTile"; //主页左侧头部
import trialtabpane1 from "../trialbusiness/trialtabpane1"; //trialtabpane1
import trialtabpane2 from "../trialbusiness/trialtabpane2"; //trialtabpane2
import trialtabpane3 from "../trialbusiness/trialtabpane3"; //trialtabpane3
import trialtabpane4 from "../trialbusiness/trialtabpane4"; //trialtabpane4
import trialtabpane5 from "../trialbusiness/trialtabpane5"; //trialtabpane5
import trialtabpane6 from "../trialbusiness/trialtabpane6"; //trialtabpane6
export default {
  name: "assist",
  components: {
    leftTile,
    trialtabpane1,
    trialtabpane2,
    trialtabpane3,
    trialtabpane4,
    trialtabpane5,
    trialtabpane6
  },
  data() {
    return {
      imgurl: require("../images/yingyongpeizhi/shenliyewupeizhi.png"),
      text: "审理业务配置",
      text2: "SHEN LI YE WU PEI ZHI",
      activeName: "first"
    };
  },
  beforeCreate() {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {}
};
</script>

<style lang="less">
@import url("../css/common.less");
.trialbusiness {
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
    /*内容填充区域*/
    .el-tabs__content {
      width: 100%;
      position: absolute;
      left: 0;
      /*top:1rem;*/
    }
  }
}
</style>
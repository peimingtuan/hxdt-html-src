<template>
    <!--弹框-->
    <transition name="slide-fade">
      <div class="alert-window2 addremoteAlert3" v-show="ismain">
        <div class="main">
          <img class="imgloge" src="../images/yingyongpeizhi/avataradd.png" />
          <img class="alert-close" @click="ismain=false" src="../images/alert-close.png" />
          <AlertleftTile :text="text" :text2="text2" />
          <div class="content1">
            <el-tabs v-model="activeName" @tab-click="handleClick" :before-leave="beforeleave">
              <el-tab-pane label="基本信息" name="info1">
                <info1 @receiveSunData="receiveSunData" ref="info1" />
              </el-tab-pane>
              <el-tab-pane label="庭审主机配置" name="info2">
                <info2 ref="info2" />
              </el-tab-pane>
              <el-tab-pane label="提讯终端设备配置" name="info3">
                <info3 ref="info3" />
              </el-tab-pane>
              <el-tab-pane label="客户端配置" name="info4">
                <info4 ref="info4" />
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="bt">
            <div class="qure" @click="qure">
              <img src="../images/courtsupervision/sure.png" />确定
            </div>

            <div class="cancel" @click="ismain=false">
              <img src="../images/courtsupervision/cancel.png" />取消
            </div>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
import AlertleftTile from "../component/AlertleftTile";
import info1 from "./remtabinfo1"; //基本信息
import info2 from "./remtabinfo2"; //庭审主机配置
import info3 from "./remtabinfo3"; //提讯终端设备配置
import info4 from "./remtabinfo4"; //客户端配置
import {mapState,mapActions } from "vuex";
export default {
  name: "addremoteAlert3",
  components: {
    AlertleftTile,
    info1,
    info2,
    info3,
    info4
  },
  data() {
    return {
      ismain: false,
      activeName: "info1",
      text: "添加远程庭审室",
      text2: "请填写详细信息",
      newTouchName: "",
      newTrialRoomId: "",
      viewHidden: false
    };
  },
  created() {},
  mounted() {},
  destroyed() {},
  computed:{
    ...mapState('remote',[
      "courtRoomTypeNamelist",
      "manufacturerlist"
    ])
  },
  methods: {
    ...mapActions('remote',[
      "getTrialRoomTypeInfos",
      "getManufacturerInfo"
    ]),
    qure() {
      this.viewHidden = true;
      this.$refs.info1.saveData();
    },
    beforeleave(newName, oldName) {
      if (oldName == "info1") {
        // 保存
        let isJump = this.$refs.info1.saveData();
        this.newTouchName = newName;
        return isJump;
      } else {
        if (newName != "info1") {
          switch (newName) {
            case "info2":
              {
                this.$refs.info2.receiveTrialRoomId(this.newTrialRoomId);
              }
              break;
            case "info3":
              {
                //this.$refs.info3.receiveTrialRoomId(this.newTrialRoomId);
              }
              break;
            case "info4":
              {
                this.$refs.info4.receiveTrialRoomId(this.newTrialRoomId);
              }
              break;
            default:
              break;
          }
        }
        return true;
      }
    },
    // 接收子组件的回传
    receiveSunData(trialRoomId,isShow) {
      if (this.viewHidden) {
        if(isShow)return
        this.ismain=false;
        this.viewHidden = false;
        this.$emit("receiveRefish");
      }
      this.newTrialRoomId = trialRoomId;
      switch (this.newTouchName) {
        case "info2":
          {
            this.$refs.info2.receiveTrialRoomId(this.newTrialRoomId);
          }
          break;
        case "info3":
          {
            this.$refs.info3.receiveTrialRoomId(this.newTrialRoomId);
          }
          break;
        case "info4":
          {
            this.$refs.info4.receiveTrialRoomId(this.newTrialRoomId);
          }
          break;
        default:
          break;
      }
    },
    updataSomething(value) {
      this.newTrialRoomId = value.trialRoomId;
      this.activeName = "info1";
      this.$showToast('加载中...')
      Promise.all([this.getTrialRoomTypeInfos(this),this.getManufacturerInfo(this)]).then(()=>{
        this.$hideToast()
      }).catch(err=>{
        this.$hideToast()
      })
      this.$refs.info1.receiveTrialNews(value);
    },
    getUnitID(val) {
      this.newTrialRoomId = "";
      this.activeName = "info1";
      this.$showToast('加载中...')
      Promise.all([this.getTrialRoomTypeInfos(this),this.getManufacturerInfo(this)]).then(()=>{
        this.$hideToast()
      }).catch(err=>{
        this.$hideToast()
      })
      this.$refs.info1.receiveUnitID(val);
    }
  }
};
</script>

<style lang="less">
@import url("../css/common.less");
.addremoteAlert3 {
  /*弹框*/
  .main {
    width: 14rem;
    padding: 0 0.8rem;
    box-shadow: -5px 5px 5px 0 rgba(38, 78, 119, 0.2),
      5px -3px 3px 0 rgba(38, 78, 119, 0.2);
    background: #fff;
    position: absolute;
    left: 50%;
    top: 1.5rem;
    margin-left: -6rem;
    border-radius: 2px;
    @import url("../css/alertimg.less");
    .content1 {
      width: 100%;
      background: #eceff0;
      min-height: 4rem;
      max-height: 6rem;
      overflow: auto;
      margin-top: 0.05rem;
      padding: 0 0.2rem;
      .el-tabs__item {
        .f18();
      }
    }
    /*底部*/
    @import url("../css/alertbtn.less");
  }
}
</style>
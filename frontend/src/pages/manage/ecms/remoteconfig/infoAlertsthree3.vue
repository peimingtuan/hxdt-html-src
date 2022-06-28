<template>
  <div class="infoAlertsthree3">
    <!--弹框-->
    <transition name="slide-fade">
      <div class="second-alert" v-show="secondshow">
        <div class="second-main">
          <img class="imgloge" src="../images/yingyongpeizhi/addlaw.png" />
          <img
            class="alert-close"
            @click="secondshow = false"
            src="../images/alert-close.png"
          />
          <AlertleftTile :text="text" :text2="text2" />
          <div class="content-info2">
            <div class="content-info2-div1">
              <el-form :label-position="labelPosition" :model="formLabelAlign">
                <el-form-item label="输出设备名称" required>
                  <el-input
                    type="text"
                    v-model.trim="formLabelAlign.channelName"
                  ></el-input>
                </el-form-item>
                <el-form-item label="解码器IP" required>
                  <el-input
                    type="text"
                    v-model.trim="formLabelAlign.signalSourceIp"
                  ></el-input>
                </el-form-item>
                <el-form-item label="解码器通道号" required>
                  <el-input
                    type="number"
                    v-model.trim="formLabelAlign.channelNum"
                    oninput="value = value.replace(/[^\d]/g,'')"
                  ></el-input>
                </el-form-item>
                <el-form-item label="解码拉流方式" required>
                  <el-select v-model="formLabelAlign.pullFlowType">
                    <el-option
                      v-for="item in flowTypelist"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <alertBtn @cancel="secondshow = false" @qure="sureedit" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import AlertleftTile from "../component/AlertleftTile"; //二次弹框title
import alertBtn from "../component/alertBtn"; //二次弹框底部按钮
import Tool from "../js/tools";
import FoundationTools from "../../../../js/functionAjax";
export default {
  name: "infoAlertsthree3",
  components: {
    AlertleftTile,
    alertBtn
  },
  data() {
    return {
      text: "解码器通道配置",
      text2: "详细数据显示",
      secondshow: false, //二次弹框
      flowTypelist: [
        { id: 2, name: "UDP" },
        { id: 1, name: "TCP" }
      ], //流类型
      formLabelAlign: {
        //表单信息
        signalSourceType: 2, //编解类型
        signalSourceIp: "",
        channelName: "",
        channelNum: "",
        pullFlowType: "",
        courtRoomId: "" //庭审室id
      },
      isUpdata: false,
      newCourtRoomId: ""
    };
  },
  created() {},
  mounted() {},
  destroyed() {},
  computed: {
    // ...mapState("courtyardallocation", ["courtRoomId"])
  },
  methods: {
    //打开弹框,修改逻辑处理
    show(row) {
      this.secondshow = true;
      if (row) {
        this.isUpdata = true;
        //修改逻辑处理
        this.formLabelAlign = row;
        //   this.formLabelAlign.signalSourceType = row.signalSourceType;
        //   this.formLabelAlign.signalSourceIp = row.signalSourceIp;
        //   this.formLabelAlign.channelName = row.channelName;
        //   this.formLabelAlign.channelNum = row.channelNum;
        //   this.formLabelAlign.pullFlowType = row.pullFlowType;
        //   this.formLabelAlign.courtRoomId = row.courtRoomId;
        //   this.formLabelAlign.signalSourceId = row.signalSourceId;
      } else {
        this.isUpdata = false;
        this.formLabelAlign = {
          //表单信息
          signalSourceType: 2,
          signalSourceIp: "",
          channelName: "",
          channelNum: "",
          pullFlowType: "",
          courtRoomId: this.newCourtRoomId //庭审室id
        };
      }
    },
    receiveID(trialRoomId) {
      console.log(trialRoomId);
      this.newCourtRoomId = trialRoomId;
    },
    //确定保存编辑信息,新增或修改该流媒体存储路径
    sureedit() {
      let { formLabelAlign } = this;
      let _this = this;
      if (!formLabelAlign.channelName) {
        _this.$msgw("输出设备名称不能为空");
        return false;
      }
      if (!formLabelAlign.signalSourceIp) {
        _this.$msgw("请输入解码器IP");
        return false;
      }
      if (!formLabelAlign.channelNum) {
        _this.$msgw("请输入解码器通道号");
        return false;
      }
      if (!formLabelAlign.pullFlowType) {
        _this.$msgw("请选择解码拉流方式");
        return false;
      }
      if (
        formLabelAlign.signalSourceIp &&
        !Tool.isValidIP(formLabelAlign.signalSourceIp)
      ) {
        _this.$msgw("请输入有效IP");
        return false;
      }
      formLabelAlign.courtRoomName = FoundationTools.getCookie("guoTrialRoomN"); //法庭名称
      let url = "";
      if (this.isUpdata == true) {
        url = "/remoteTrial/updateDecodeChannelInfo";
      } else {
        url = "/remoteTrial/addDecodeChannelInfo";
      }
      _this.$showToast('正在保存...')
      _this.$http
        .post(url, formLabelAlign)
        .then(data => {
           _this.$hideToast()
          if (data.code === 200) {
            _this.secondshow = false;
            _this.$msgs("保存成功");
            _this.$parent.$parent.$parent.httpinfo3(); //更新列表
          } else {
            _this.$msgw(data.message);
          }
        })
        .catch(err => {
          _this.$hideToast()
          console.log(err, url);
          _this.$msge("服务器异常，请稍后重试");
        });
    }
  }
};
</script>

<style lang="less">
@import url("../css/common.less");
.infoAlertsthree3 {
  /*二次弹框*/
  .second-main {
    position: absolute;
    left: 50%;
    margin-left: -5rem;
    top: 1.5rem;
    width: 10rem;
    background: #fff;
    border-radius: 2px;
    padding: 0 0.8rem;
    box-shadow: -5px 5px 5px 0 rgba(38, 78, 119, 0.2),
      5px -3px 3px 0 rgba(38, 78, 119, 0.2);
    .secondHead {
      background: #cbe5f3;
    }
    .content-info2 {
      background: #eceff0;
      &-div1 {
        padding: 0.2rem;
        .el-form {
          padding: 0.2rem;
          background: #e3e7e8;
          .b(1px, #c6c6c6);
          .el-form-item {
            margin-bottom: 0.1rem;
          }

          /*label*/

          .el-form-item__label {
            .f18();
            width: 1.8rem !important;
          }

          .el-form-item__content {
            margin-left: 1.8rem !important;
          }

          /*input框*/

          .el-input {
            width: 4rem;

            .el-input__inner {
              height: 0.4rem;
              line-height: 0.4rem;
              padding: 0 0.15rem;
              .f18();
            }
          }
          /*文本域*/
          .el-textarea {
            width: 5rem;
          }

          /*button*/

          .el-button {
            position: relative;
            top: -0.02rem;
            width: 0.9rem;
            line-height: 0.36rem;
            padding: 0;
            background: #409eff;

            span {
              .f18();
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>

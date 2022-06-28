<template>
    <!--弹框-->
    <transition name="slide-fade">
      <div class="second-alert infoAlertfirst3" v-show="secondshow">
        <div class="second-main">
          <img class="imgloge" src="../images/yingyongpeizhi/addlaw.png" />
          <img class="alert-close" @click="secondshow=false" src="../images/alert-close.png" />
          <AlertleftTile :text="text" :text2="text2" />
          <div class="content-info2">
            <div class="content-info2-div1">
              <el-form :label-position="labelPosition" :model="formLabelAlign">
                <el-form-item label="设备IP">
                  <el-input type="text" v-model.trim="formLabelAlign.courtDeviceIp"></el-input>
                  <el-button @click="getdata">获取</el-button>
                </el-form-item>
                <el-form-item label="设备类型">
                  <el-select v-model="formLabelAlign.courtDeviceType">
                    <el-option
                      v-for="item in courtDeviceTypelist"
                      :key="item.courtDeviceType"
                      :label="item.name"
                      :value="item.courtDeviceType"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="设备型号">
                  <el-select v-model="formLabelAlign.courtDeviceModel">
                    <el-option
                      v-for="item in courtDeviceModellist"
                      @click.native="handleSelectclientTypeklist(item.courtDeviceModelName)"
                      :key="item.courtDeviceModel"
                      :label="item.courtDeviceModelName"
                      :value="item.courtDeviceModel"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="序列号">
                  <el-input type="text" v-model="formLabelAlign.courtDeviceSerialNumber"></el-input>
                </el-form-item>
                <el-form-item label="版本号">
                  <el-input type="text" v-model="formLabelAlign.courtDeviceVersion"></el-input>
                </el-form-item>
                <el-form-item label="厂商">
                  <el-select v-model="formLabelAlign.manufacturerCode">
                    <el-option
                      v-for="item in manufacturerlist"
                      :key="item.manufacturerCode"
                      @click.native="handleSelectmanufacturerName(item.manufacturerName)"
                      :label="item.manufacturerName"
                      :value="item.manufacturerCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <alertBtn @cancel="secondshow=false" @qure="sureedit" />
        </div>
      </div>
    </transition>
</template>

<script>
import AlertleftTile from "../component/AlertleftTile"; //二次弹框title
import alertBtn from "../component/alertBtn"; //二次弹框底部按钮
import { mapState } from "vuex";
import Tool from "../js/tools";
export default {
  name: "infoAlertfirst3",
  components: {
    AlertleftTile,
    alertBtn
  },
  data() {
    return {
      text: "法庭设备配置",
      text2: "详细数据显示",
      secondshow: false, //二次弹框
      courtDeviceTypelist: [
        { courtDeviceType: 1, name: "编码器" },
        { courtDeviceType: 2, name: "解码器" },
        { courtDeviceType: 3, name: "编解码器" }
      ], //客户端类型select
      courtDeviceModellist: [],
      formLabelAlign: {
        //表单信息
        courtRoomId: "", //法庭id
        courtDeviceId: "", //设备id
        courtDeviceIp: "", //设备ip
        courtDeviceType: "", //1编码器，2解码器,3编解码器
        courtDeviceModel: "", //设备型号代码
        courtDeviceModelName: "", //设备型号名称
        courtDeviceSerialNumber: "", //序列号
        courtDeviceVersion: "", //版本号
        manufacturerName: "", //厂商名称
        manufacturerCode: "" //厂商id
      },
      isUpdata: false,
      newCourtRoomId: ""
    };
  },
  created() {
    this.getCourtDeviceModelInfo();
  },
  mounted() {

  },
  destroyed() {},
  computed:{
    ...mapState('remote',[
      "manufacturerlist"
    ])
  },
  methods: {
    //获取btn
    getdata() {
      let { formLabelAlign } = this;
      let _this = this;
      if (formLabelAlign.courtDeviceIp == "") {
        _this.$msgw("请先输入设备ip");
        return;
      } else if (!Tool.isValidIP(formLabelAlign.courtDeviceIp)) {
        _this.$msgw("请输入有效IP");
        return;
      } else if (formLabelAlign.courtDeviceType == "") {
        _this.$msgw("请先选择设备类型");
        return;
      } else if (formLabelAlign.courtDeviceModel == "") {
        _this.$msgw("请先选择设备型号");
        return;
      }
      _this.$http
        .post("/courtRoomConfig/getDeviceInfo", {
          ip: formLabelAlign.courtDeviceIp,
          courtDeviceType: formLabelAlign.courtDeviceType,
          courtDeviceModel: formLabelAlign.courtDeviceModel,
          courtDeviceModelName: formLabelAlign.courtDeviceModelName
        })
        .then(data => {
          if (data.code === 200) {
            formLabelAlign.courtDeviceVersion = data.data.courtDeviceVersion;
            formLabelAlign.courtDeviceSerialNumber =
              data.data.courtDeviceSerialNumber;
          } else {
            _this.$msgw(data.message);
          }
        })
        .catch(err => {
          console.log(err, "/courtRoomConfig/getDeviceInfo");
          _this.$msge("服务器异常，请稍后重试");
        });
    },
    //获取设备型号
    getCourtDeviceModelInfo() {
      let _this = this;
      return _this.$http
        .post("/getCourtDeviceModelInfo", {})
        .then(data => {
          if (data.code === 200) {
            _this.courtDeviceModellist = data.data;
          } else {
            _this.$msgw(data.message);
          }
          return data;
        })
        .catch(err => {
          console.log(err, "/getCourtDeviceModelInfo");
          _this.$msge("服务器异常，请稍后重试");
          throw err;
        });
    },
    //选择
    handleSelectclientTypeklist(courtDeviceModelName) {
      this.formLabelAlign.courtDeviceModelName = courtDeviceModelName;
    },
    //厂商选择
    handleSelectmanufacturerName(manufacturerName) {
      this.formLabelAlign.manufacturerName = manufacturerName;
    },
    //打开弹框,修改逻辑处理
    show(row) {
      this.secondshow = true;
      if (row) {
        this.isUpdata = true;
        for (let i in row) {
          //修改逻辑处理
          if (this.formLabelAlign.hasOwnProperty(i))
            this.formLabelAlign[i] = row[i];
        }
      } else {
        this.isUpdata = false;
        this.formLabelAlign = {
          //表单信息
          courtRoomId: this.newCourtRoomId, //法庭id
          courtDeviceId: "", //设备id
          courtDeviceIp: "", //设备ip
          courtDeviceType:3, //1编码器，2解码器,3编解码器
          courtDeviceModel:this.courtDeviceModellist.length > 0 ?3: "", //设备型号代码
          courtDeviceModelName:this.courtDeviceModellist.length > 0 ? "DVC3010" : "", //设备型号名称
          courtDeviceSerialNumber: "", //序列号
          courtDeviceVersion: "", //版本号
          manufacturerName:
            this.manufacturerlist.length > 0 ? "北京华夏电通科技有限公司" : "", //厂商名称
          manufacturerCode: this.manufacturerlist.length > 0 ? 2 : "" //厂商代码,默认取华夏电通
        };
      }
    },
    receiveID(trialRoomId) {
      this.newCourtRoomId = trialRoomId;
    },
    //确定保存法庭设备配置信息
    sureedit() {
      let { formLabelAlign } = this;
      let _this = this;
      let url = "";
      if (this.isUpdata == true) {
        url = "/remoteTrial/updateTrialRoomDeviceInfo";
      } else {
        url = "/remoteTrial/addTrialRoomDeviceInfo";
      }
      _this.$showToast('正在保存...')
      _this.$http
        .post(url, formLabelAlign)
        .then(data => {
          _this.$hideToast()
          if (data.code === 200) {
            _this.secondshow = false;
            _this.$msgs("保存成功");
            _this.$parent.$parent.$parent.httpinfo1(); //更新列表
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
.infoAlertfirst3 {
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
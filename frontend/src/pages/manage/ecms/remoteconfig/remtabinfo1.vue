<template>
  <div class="remtabinfo1">
    <div>
      <div class="base-top">
        <div>
          <el-form
            :label-position="labelPosition"
            :model="formLabelAlign"
            :rules="rules"
            ref="formLabelAlign"
          >
            <el-form-item label="庭审室名称" prop="trialRoomName">
              <el-input v-model="formLabelAlign.trialRoomName"></el-input>
            </el-form-item>
            <el-form-item label="建设日期">
              <el-date-picker
                class="buildDate"
                v-model="formLabelAlign.buildDate"
                type="date"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="微服务IP">
              <el-input v-model.trim="formLabelAlign.remoteClientControlIp"></el-input>
            </el-form-item>
            <el-form-item label="电子签名方式">
              <el-select v-model="formLabelAlign.electronicSignature" placeholder="请选择">
                <el-option
                        v-for="item in electronicSignatureList"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="当事人身份核实">
              <el-select v-model="formLabelAlign.autoverify" placeholder="请选择">
                <el-option :value="true" label="开启"></el-option>
                <el-option :value="false" label="关闭"></el-option>
              </el-select>
            </el-form-item>
            <div class="print">
              <el-form-item label="打印机">
                <div class="ipInput">
                  <el-checkbox-group @change="checkboxChange" v-model="ipCheckedList">
                    <el-checkbox label="网络打印机"></el-checkbox>
                  </el-checkbox-group>
                  <div>
                    IP地址:
                    <el-input v-model="webIpValue" :disabled="webIpDisabled"></el-input>
                  </div>
                </div>

                <div class="ipInput">
                  <el-checkbox-group @change="checkboxChange" v-model="ipCheckedList">
                    <el-checkbox label="打印服务器"></el-checkbox>
                  </el-checkbox-group>
                  <div>
                    IP地址:
                    <el-input v-model="localIpValue" :disabled="localIpDisabled"></el-input>
                  </div>
                </div>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div>
          <el-form
            :label-position="labelPosition"
            :model="formLabelAlign"
            :rules="rules"
            ref="el-form"
          >
            <el-form-item label="排序号">
              <el-input
                v-model="formLabelAlign.sortOrder"
                oninput="value = value.replace(/[^\d]/g,'')"
              ></el-input>
            </el-form-item>
            <el-form-item label="庭审室类型">
              <el-select v-model="trialRoomTypeName" placeholder="请选择" prop="trialRoomTypeName">
                <el-option
                  v-for="item in courtRoomTypeNamelist"
                  @click.native="handleCourtRoomType(item)"
                  :key="item.trialRoomTypeId"
                  :label="item.trialRoomTypeName"
                  :value="item.trialRoomTypeId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="微服务http端口">
              <el-input v-model.trim="formLabelAlign.remoteClientControlPort"></el-input>
            </el-form-item>
            <el-form-item label="承建厂商">
              <el-select v-model="manufacturerCode" placeholder="请选择" prop="manufacturerName">
                <el-option
                  v-for="item in manufacturerlist"
                  :key="item.manufacturerCode"
                  :label="item.manufacturerName"
                  :value="item.manufacturerCode"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="使用设备选择">
              <el-checkbox-group @change="equipCheckboxChange" v-model="equipCheckedList">
                <el-checkbox label="1">庭审主机</el-checkbox>
                <el-checkbox label="2">H323终端</el-checkbox>
                <el-checkbox label="3">SIP终端</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div>
        <el-form :label-position="labelPosition" :model="formLabelAlign">
          <el-form-item label="描述">
            <el-input
              v-model="formLabelAlign.trialRoomDesc"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import FoundationTools from "../../../../js/functionAjax";
import { mapState} from "vuex";
import Tool from '../js/tools'
export default {
  name: "remtabinfo1",
  data() {
    return {
      touchUnitId: "",
      labelPosition: "left", //form表单左侧靠齐
      ipCheckedList: [], // ip地址默认选中集合
      webIpDisabled: true, // 网络IP输入框控制
      localIpDisabled: true, // 本地IP输入框控制
      webIpValue: "",
      localIpValue: "",
      equipCheckedList: ["1"], // 设备选择默认选中集合
      manufacturerCode:2, //厂商代码,默认取华夏电通
      trialRoomTypeName:'',
      electronicSignatureList:[],
      formLabelAlign: {
        remoteClientControlIp:'',
        remoteClientControlPort:'',
        sortOrder: "", //排序号
        trialRoomId: "", // 庭审室id
        trialRoomName: "", // 庭审室名称
        trialRoomDesc: "", // 描述
        buildDate: FoundationTools.getFormatDate2(new Date()), //建设日期
        trialRoomStatus: 1, // 庭审室状态
        defaultDevice: 1, // 默认使用设备1-庭审主机，2-H323，3-SIP
        trialRoomTypeId: "", // 庭审室类型Id
        trialRoomTypeName: "", // 庭审室类型名称
        firm: 2, // 默认承建厂商2-华夏电通
        printerType: 1, // 打印机类型1-网络2-本地
        networkPrinterIp: "", // 网络打印机ip
        trialUnitId: "", // 庭审单位id
        electronicSignature:1,//签名方式
        autoverify:false,//自动核实身份
      },
      rules: {
        trialRoomName: [
          { required: true, message: "请输入庭审室名称", trigger: "blur" }
        ],
        trialRoomTypeName: [
          { required: true, message: "请选择庭审室类型", trigger: "change" }
        ],
        manufacturerCode: [
          { required: true, message: "请选择承建厂商", trigger: "change" }
        ]
      }
    };
  },
  created() {},
  mounted() {

  },
  destroyed() {},
  computed: {
    ...mapState('remote',[
            "courtRoomTypeNamelist",
            "manufacturerlist"
    ])
  },
  methods: {
    //查询电子签名方式
    ElectronicSignatureWayOption(){
      let _this=this;
      _this.$showToast( '加载中...')
      return _this.$http.post('/client/electronicSignatureWayOption',{}).then(data =>{
        _this.$hideToast()
        if(data.code===200){
          _this.electronicSignatureList=data.data;
        }else{
          _this.$msgw(data.message);
        }
      }).catch(err => {
        _this.$hideToast()
        _this.$msge('服务器异常，请稍后重试');
      })
    },
    receiveTrialNews(val) {
      this.formLabelAlign = val;
      this.trialRoomTypeName = val.trialRoomTypeName;
      if(this.electronicSignatureList.length===0)this.ElectronicSignatureWayOption()
    },
    receiveUnitID(val) {
      this.touchUnitId = val;
      this.trialRoomTypeName = "";
      this.formLabelAlign = {
        remoteClientControlIp:'',
        remoteClientControlPort:'',
        sortOrder: "", //排序号
        trialRoomId: "", // 庭审室id
        trialRoomName: "", // 庭审室名称
        trialRoomDesc: "", // 描述
        buildDate: FoundationTools.getFormatDate2(new Date()), //建设日期
        trialRoomStatus: 1, // 庭审室状态
        defaultDevice: 1, // 默认使用设备1-庭审主机，2-H323，3-SIP
        trialRoomTypeId: "", // 庭审室类型Id
        trialRoomTypeName: "", // 庭审室类型名称tria
        firm: 2, // 默认承建厂商2-华夏电通
        printerType: 1, // 打印机类型1-网络2-本地
        networkPrinterIp: "", // 网络打印机ip
        trialUnitId: "", // 庭审单位id
        electronicSignature:1,//签名方式
        autoverify:false,//自动核实身份
      };
      if(this.electronicSignatureList.length===0)this.ElectronicSignatureWayOption()
    },
    // 打印机设置
    checkboxChange(value) {
      if (value.length == 0) {
        // 取消选中
        this.formLabelAlign.printerType = 0;
        this.webIpDisabled = true;
        this.localIpDisabled = true;
        this.webIpValue = "";
        this.localIpValue = "";
      } else if (value.length == 1) {
        if (value[0] == "网络打印机") {
          this.formLabelAlign.printerType = 1;
          this.webIpDisabled = false;
          this.localIpDisabled = true;
        } else {
          this.formLabelAlign.printerType = 2;
          this.webIpDisabled = true;
          this.localIpDisabled = false;
        }
      } else {
        if (value[1] == "网络打印机") {
          this.formLabelAlign.printerType = 1;
          this.webIpDisabled = false;
          this.localIpDisabled = true;
          this.localIpValue = "";
        } else {
          this.formLabelAlign.printerType = 2;
          this.webIpDisabled = true;
          this.localIpDisabled = false;
          this.webIpValue = "";
        }
        this.ipCheckedList = [value[1]];
      }
    },
    // 使用设备选择
    equipCheckboxChange(value) {
      if (value.length == 0) {
        // 取消选中
        this.defaultDevice = "";
      } else if (value.length == 1) {
        this.defaultDevice = value[0];
      } else {
        this.defaultDevice = value[1];
        this.equipCheckedList = [value[1]];
      }
    },
    //选择庭审室类型
    handleCourtRoomType(item) {
      this.formLabelAlign.trialRoomTypeId = item.trialRoomTypeId;
      this.formLabelAlign.trialRoomTypeName = item.trialRoomTypeName;
    },
    //保存信息
    saveData() {
      if (this.touchUnitId) {
        this.formLabelAlign.trialUnitId = this.touchUnitId;
      }
      if (this.formLabelAlign.printerType == 1) {
        this.formLabelAlign.networkPrinterIp = this.webIpValue;
      } else {
        this.formLabelAlign.networkPrinterIp = this.localIpValue;
      }
      if(this.formLabelAlign.remoteClientControlIp&&!Tool.isValidIP(this.formLabelAlign.remoteClientControlIp)){
        this.$msgw('请输入有效微服务IP');
        return false;
      }
      if(this.formLabelAlign.remoteClientControlPort&&!Tool.isPort(this.formLabelAlign.remoteClientControlPort)){
        this.$msgw('请输入有效微服务端口');
        return false;
      }
      let isValid = false;
      this.$refs["formLabelAlign"].validate(valid => {
        isValid = valid;
        if (valid) {
          this.$http
            .post("/remoteTrial/saveOrUpdateTrialRoomInfo", this.formLabelAlign)
            .then(data => {
              if (data.code === 200) {
                this.formLabelAlign.trialRoomId=data.data.trialRoomId;
                this.$msgs("数据保存成功");
                this.$emit("receiveSunData", data.data.trialRoomId);
                this.touchUnitId = "";
                FoundationTools.setCookie(
                  "guoTrialRoomN",
                  this.formLabelAlign.trialRoomName,
                  1
                );
              } else {
                if(data.code === 399){
                  this.formLabelAlign.trialRoomId=data.data.trialRoomId;
                  this.$emit("receiveSunData",data.data.trialRoomId,true);
                }
                this.$msgw(data.message);
              }
            })
            .catch(err => {
              console.log(err, "/saveOrUpdateTrialRoomInfo");
              this.$msge("服务器异常，请稍后重试");
            });
        } else {
          console.log("error submit!!");
        }
      });
      return isValid;
    }
  }
};
</script>

<style lang="less">
@import url("../css/common.less");
.remtabinfo1 {
  .base-top {
    .f-s-b();
  }
  /*label*/
  .el-form-item__label {
    .f18();
    width: 1.5rem !important;
  }
  .el-form-item__content {
    margin-left: 1.5rem !important;
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
  /*建设日期*/
  .buildDate {
    .el-input__inner {
      padding: 0 0.2rem 0 0.4rem !important;
    }
  }
  .print {
    .el-input {
      width: 2rem;
    }
  }
  .ipInput {
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content: space-between;
  }
}
</style>
 <template>
  <div class="systemTabpane3">
    <!-- 第三方系统配置的模块始 -->
    <div class="moduleItem" v-for="(item,index) in basicData" :key="index">
      <!-- 模块头部始 -->
      <p class="moduleTitle">{{item.label}}</p>
      <!-- 模块内容始 -->
      <div class="moduleContent">
        <el-form
          ref="form"
          :label-position="labelPosition"
          label-width="252px"
          :model="formLabelAlign"
        >
          <el-form-item v-for="(inner,index) in item.children" :key="index" :label="inner.label">
            <template v-if="inner.type == 'input'">
              <!-- :type="inner.pwd"
              :show-password="inner.showPwd"-->
              <el-input
                :type="inner.pwd"
                :rows="3"
                v-model="formLabelAlign[inner.variable]"
                :max="inner.max"
                :min="inner.min"
                :placeholder="inner.placeHolder"
              ></el-input>
              <span class="unit">{{inner.unit}}</span>
            </template>
            <template v-else>
              <el-select v-model="formLabelAlign[inner.variable]" :popper-append-to-body="false" placeholder="请选择">
                <el-option
                  v-for="innerItem in inner.selectData"
                  :key="innerItem.value"
                  :label="innerItem.label"
                  :value="innerItem.value"
                ></el-option>
              </el-select>
              <span class="unit">{{inner.unit}}</span>
            </template>
          </el-form-item>
        </el-form>
      </div>
      <div class="saveInfo">
        <el-button type="primary" @click="saveBtn(item.saveBtn)">保存设置</el-button>
      </div>
    </div>
  </div>
</template>
 
<script>
import { settingData } from "./data.js";
import Tool from "../js/tools"
export default {
  name: "systemTabpane1",
  data() {
    return {
      basicData: [], //展示的基础数据
      labelPosition: "left", //表单的对齐方式
      formLabelAlign: {
        cId:'',
        cSecret:'',
        vendorId:'',
        minLike:'',
        aliFaceRecognizeSimilarityThreshold:'',
        aliFaceRecognizeKey:'',
        foxitPdfLicenseSn:'',
        foxitPdfLicenseUnlockCode:'',
        cmsIp:'',
        cmsPort:'',
        enablePushcms:false,
      }
    };
  },
  computed: {},
  components: {},
  watch: {},
  mounted() {
    this.basicData = settingData.third;
  },
  methods: {
    // 获取第三方系统配置信息
    getSetting() {
      let _this = this;
      _this.$showLoading("rgba");
      _this.$http
        .post("/thirdPartySystemConfig/getAliFaceConfig", {})
        .then(data => {
          _this.$hideLoading("rgba");
          if (data.code === 200) {
            for(let i in data.data){
              _this.formLabelAlign[i] = data.data[i];
            }
          } else {
            _this.$msgw(data.message);
          }
        })
        .catch(err => {
          _this.$hideLoading("rgba");
          _this.$msge("服务器异常，请稍后重试");
        });
      _this.$http
              .post("/thirdPartySystemConfig/getFoxitPdfLicenseConfig", {})
              .then(data => {
                if (data.code === 200) {
                  for(let i in data.data){
                    _this.formLabelAlign[i] = data.data[i];
                  }
                } else {
                  _this.$msgw(data.message);
                }
              })
              .catch(err => {

              });
      _this.$http
              .post("/thirdPartySystemConfig/getReportCmsServiceConfig", {})
              .then(data => {
                if (data.code === 200) {
                  for(let i in data.data){
                    _this.formLabelAlign[i] = data.data[i];
                  }
                } else {
                  _this.$msgw(data.message);
                }
              })
              .catch(err => {

              });
    },
    // 保存配置按钮
    saveBtn(name) {
      let _this = this;
      let { formLabelAlign } = this;
      _this.$showToast("正在保存...")
      if(name==='saveBtn1'){
        _this.$http
                .post("/thirdPartySystemConfig/saveAliFaceConfig", formLabelAlign)
                .then(data => {
                  _this.$hideToast()
                  if (data.code === 200) {
                    _this.$msgs("保存成功");
                  } else {
                    _this.$msgw(data.message);
                  }
                })
                .catch(err => {
                  _this.$hideToast()
                  _this.$msge("服务器异常，请稍后重试");
                });
      }else if(name==='saveBtn2'){
        _this.$http
                .post("/thirdPartySystemConfig/saveFoxitPdfLicenseConfig", formLabelAlign)
                .then(data => {
                  _this.$hideToast()
                  if (data.code === 200) {
                    _this.$msgs("保存成功");
                  } else {
                    _this.$msgw(data.message);
                  }
                })
                .catch(err => {
                  _this.$hideToast()
                  _this.$msge("服务器异常，请稍后重试");
                });
      }else if(name==='saveBtn3'){
        if(formLabelAlign.cmsIp&&!Tool.isValidIP(formLabelAlign.cmsIp)){
          _this.$msgw("请输入正确的上报服务器IP")
          return
        }
        if(formLabelAlign.cmsPort&&!Tool.isPort(formLabelAlign.cmsPort)){
          _this.$msgw("请输入正确的上报服务器端口")
          return
        }
        _this.$http
                .post("/thirdPartySystemConfig/saveReportCmsServiceConfig", formLabelAlign)
                .then(data => {
                  _this.$hideToast()
                  if (data.code === 200) {
                    _this.$msgs("保存成功");
                  } else {
                    _this.$msgw(data.message);
                  }
                })
                .catch(err => {
                  _this.$hideToast()
                  _this.$msge("服务器异常，请稍后重试");
                });
      }
    }
  }
};
</script>
 
<style lang="less">
@import url("../css/common.less");
.systemTabpane3 {
  @import url("../css/element.less");
  // input框的样式
  .el-form-item__label {
    font-size: 0.18rem !important;
  }
  .el-input {
    width: 240px;
  }
  .el-textarea {
    width: 240px;
  }
  .el-form-item__label {
    padding: 0;
  }
  .el-button{
    padding:0 10px;
    height:40px;
  }
}
</style>
<style lang="less" scoped>
.systemTabpane3 {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content:flex-start;
  flex-wrap: wrap;
  margin-bottom: 70px;
  .moduleItem {
    margin: 0 10px 10px 0;
    width: calc(41.5vw - 10px);
    height: calc(50vh - 10px);
    border-radius: 5px;
    background-color: rgb(241, 245, 249);
    .moduleTitle {
      padding: 10px;
    }
    .moduleContent {
      overflow: auto;
      height: calc(50vh - 100px);
      padding: 0 20px;
    }
    .saveInfo{
      box-shadow: 1px -2px 2px #e8e8e8;
      text-align: center;
      padding:5px 0;
    }
  }
  .moduleItem:nth-child(2n) {
    margin-right: 0;
  }
  .unit {
    font-size: 0.18rem;
  }
}
</style>

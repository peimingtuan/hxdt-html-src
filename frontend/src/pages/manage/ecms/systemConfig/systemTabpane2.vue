<template>
  <div class="systemTabpane2">
    <!-- 数据相关配置的模块始 -->
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
              <el-input
                :type="inner.pwd"
                :show-password="inner.showPwd"
                v-model="formLabelAlign[inner.variable]"
                :max="inner.max"
                :min="inner.min"
                :placeholder="inner.placeHolder"
              ></el-input>
              <span class="unit">{{inner.unit}}</span>
            </template>
            <template v-else>
              <el-select v-model="formLabelAlign[inner.variable]" :popper-append-to-body="false" :multiple="inner.multiple?true:false" placeholder="请选择">
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
export default {
  name: "systemTabpane1",
  data() {
    return {
      basicData: [], //展示的基础数据
      labelPosition: "left", //表单的对齐方式
      formLabelAlign: {
        saveFileDay:'',
        dossierDownloadTaskTiming:'',
        isUseDownloadServer:false,
        wisdomSource:'',
        dossierAuthoriation:false,
        shareApply:false,
        slSourcename:'',
        pushCasePlanToLDT:false,
        recordSyncType:'',
        caseInfoBindingUser:false,
        trialProcess:[]
      }
    };
  },
  computed: {},
  components: {},
  watch: {},
  mounted() {
    this.basicData = settingData.second;
    this.getRecordData(this.basicData[1].children[0]);
    this.getSlSourceData(this.basicData[0].children[0]);
    this.getDocumentRealtedConfigOption(this.basicData[3].children[0]);
  },
  methods: {
    // 获取数据相关配置信息
    getSetting() {
      let _this = this;
      _this.$showLoading("rgba");
      _this.$http
        .post("/dataRelatedConfig/getDossierDataManage", {})
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
              .post("/dataRelatedConfig/getCaseTrialDataManage", {})
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
              .post("/dataRelatedConfig/getNoterDataConfig", {})
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
              .post("/dataRelatedConfig/getAuthorityControl", {})
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
              .post("/dataRelatedConfig/getDocumentRealtedConfig", {})
              .then(data => {
                if (data.code === 200) {
                  if(data.data.trialProcess)_this.formLabelAlign.trialProcess=data.data.trialProcess.split(',');
                } else {
                  _this.$msgw(data.message);
                }
              })
              .catch(err => {

              });
    },
    // 对返回的下拉框键值进行过滤
    convertKey(arr, key) {
      let newArr = [];
      arr.forEach((item, index) => {
        let newObj = {};
        for (let i = 0; i < key.length; i++) {
          newObj[key[i]] = item[Object.keys(item)[i]];
        }
        newArr.push(newObj);
      });
      return newArr;
    },
    // 获取笔录同步方式
    getRecordData(inner) {
      let _this = this;
      _this.$http
        .post("/functionConfig/getRecordSyncType", {})
        .then(data => {
          if (data.code === 200) {
            inner.selectData = this.convertKey(data.data, ["value", "label"]);
          } else {
            _this.$msgw(data.message);
          }
        })
        .catch(err => {
          _this.$msge("服务器异常，请稍后重试");
        });
    },
    // 获取审流方式
    getSlSourceData(inner) {
      let _this = this;
      _this.$http
        .post("/functionConfig/getSlSourceName", {})
        .then(data => {
          if (data.code === 200) {
            inner.selectData = this.convertKey(data.data, ["value", "label"]);
            for (let data of inner.selectData) {
              data.label = data.value;
            }
          } else {
            _this.$msgw(data.message);
          }
        })
        .catch(err => {
          _this.$msge("服务器异常，请稍后重试");
        });
    },
    //查询审判流程节点列表
    getDocumentRealtedConfigOption(inner) {
      let _this = this;
      _this.$http
              .post("/dataRelatedConfig/getDocumentRealtedConfigOption", {})
              .then(data => {
                if (data.code === 200) {
                  inner.selectData=[];
                  data.data.map(item=>{
                    inner.selectData.push({label:item.name,value:item.code})
                  })
                } else {
                  _this.$msgw(data.message);
                }
              })
              .catch(err => {
                _this.$msge("服务器异常，请稍后重试");
              });
    },
    // 保存配置按钮
    saveBtn(name) {
      let _this = this;
      let { formLabelAlign } = this;
      _this.$showToast("正在保存...")
      if(name==='saveBtn1'){
        _this.$http
                .post("/dataRelatedConfig/saveDossierDataManage", {dossierDataManage:formLabelAlign})
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
                .post("/dataRelatedConfig/saveCaseTrialDataManage", {caseTrialDataManage:formLabelAlign})
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
        _this.$http
                .post("/dataRelatedConfig/saveNoterDataConfig", formLabelAlign)
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
      }else if(name==='saveBtn4'){
        _this.$http
                .post("/dataRelatedConfig/saveAuthorityControl", formLabelAlign)
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
      }else if(name==='saveBtn5'){
        let trialProcess='';
        if(formLabelAlign.trialProcess.length>0){
          trialProcess=formLabelAlign.trialProcess.join(",")
        }
        _this.$http
                .post("/dataRelatedConfig/saveDocumentRealtedConfig",{trialProcess})
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
.systemTabpane2 {
  @import url("../css/element.less");
  // input框的样式
  .el-form-item__label {
    font-size: 0.18rem !important;
  }
  .el-input {
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
.systemTabpane2 {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content:flex-start;
  align-items: center;
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
  .btn {
    z-index: 100;
    position: fixed;
    width: 16.6rem;
    bottom: 0;
    left: 2.6rem;
    background: #f9f9f9;
    display: flex;
    justify-content: center;
    margin: 15px;
  }
  .unit {
    font-size: 0.18rem;
  }
}
</style>

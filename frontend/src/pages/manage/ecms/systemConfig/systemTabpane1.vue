 <template>
  <div class="systemTabpane1">
    <!-- 基础功能配置的模块始 -->
    <div class="moduleItem" v-for="(item,index) in basicData" :key="index">
      <!-- 模块头部始 -->
      <p class="moduleTitle">{{item.label}}</p>
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
                @keydown.native="handleKeyDown(inner,$event)"
                @keyup.native="handleKeyUp(inner,$event)"
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
              <el-select v-model="formLabelAlign[inner.variable]" placeholder="请选择">
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
        minspace:'',
        clientIsLive:'',
        cosExistTaskbar:false,
        defaultNoteKey:'',
        defaultVoiceKey:'',
        defaultIntervalTime:''
      }
    };
  },
  computed: {},
  components: {},
  watch: {},
  mounted() {
    this.basicData = settingData.first;
    this.getSetting();
  },
  methods: {
    // 获取基础功能配置信息
    getSetting() {
      let _this = this;
      _this.$showLoading("rgba");
      Promise.all([ _this.$http
              .post("/baseFunctionConfig/getBaseConfig", {})
              .then(data => {
                _this.$hideLoading("rgba");
                if (data.code === 200) {
                  for(let i in data.data){
                    _this.formLabelAlign[i]=data.data[i]
                  }
                  return data.data
                } else {
                  _this.$msgw(data.message);
                }
              }),
      _this.$http
              .post("/baseFunctionConfig/getNoteManageConfig", {})
              .then(data => {
                _this.$hideLoading("rgba");
                if (data.code === 200) {
                  for(let i in data.data){
                    _this.formLabelAlign[i]=data.data[i]
                  }
                  return data.data
                } else {
                  _this.$msgw(data.message);
                }
              })]).then(res=>{

      }).catch(err=>{
        _this.$hideLoading("rgba");
        _this.$msge("服务器异常，请稍后重试");
      })

    },
    // 是否输入快捷键
    handleKeyDown(inner, e) {
      if (inner.quickCode) {
        var e = e || window.event;
        e.preventDefault();
        inner.quickArr = [];
        if (e.ctrlKey) inner.quickArr.push("Ctrl");
        if (e.altKey) inner.quickArr.push("Alt");
        if (e.shiftKey) inner.quickArr.push("Shift");
        var keyCodeMap = {
          "48": "0",
          "49": "1",
          "50": "2",
          "51": "3",
          "52": "4",
          "53": "5",
          "54": "6",
          "55": "7",
          "56": "8",
          "57": "9",
          "65": "A",
          "66": "B",
          "67": "C",
          "68": "D",
          "69": "E",
          "70": "F",
          "71": "G",
          "72": "H",
          "73": "I",
          "74": "J",
          "75": "K",
          "76": "L",
          "77": "M",
          "78": "N",
          "79": "O",
          "80": "P",
          "81": "Q",
          "82": "R",
          "83": "S",
          "84": "T",
          "85": "U",
          "86": "V",
          "87": "W",
          "88": "X",
          "89": "Y",
          "90": "Z"
        };
        if (keyCodeMap[e.keyCode]) {
          inner.quickArr.push(keyCodeMap[e.keyCode]);
          e.target.value = inner.quickArr.join("+");
          this.formLabelAlign[inner.variable] = inner.quickArr.join("+");
        } else {
          // this.$msgw("无效快捷键");
        }
        if (inner.quickArr.length < 2) {
          // this.$msgw("无效快捷键");
        }
      }
      //  CURSOR_LOCATOR.setCursorPosition($event.target,"end");
      //  $event.preventDefault();
      //  //注销老的快捷键
      //  global.EVENT.emit("globalShortcutUnReg",lastHotkey);
      //  if($event.target.value!="无效快捷键"){
      //       //注册快捷键
      //       global.EVENT.emit("globalShortcutReg","screenCapture",true);
      //       lastHotkey=$event.target.value;
      //   }

      //   if (!inner.quickArr) {
      //     // 当数组为空时
      //     console.log(e.key)
      //     if (
      //       e.key == "Tab" ||
      //       e.key == "Shift" ||
      //       e.key == "Control" ||
      //       e.key == "Alt" ||
      //       e.key == "Enter"
      //     ) {
      //       if (e.key == "Control") {
      //         inner.quickArr.push("Ctrl");
      //       } else {
      //         inner.quickArr.push(e.key);
      //       }
      //       console.log(e.key)
      //       console.log(inner.quickArr)
      //     } else {
      //       return;
      //     }
      //   } else {
      //     // 数组不为空
      //     if (
      //       e.key == "Tab" ||
      //       e.key == "Shift" ||
      //       e.key == "Control" ||
      //       e.key == "Alt" ||
      //       e.key == "Enter" ||
      //       e.key == "BACKSPACE"
      //     ) {
      //       return;
      //     }
      //     {
      //       if (inner.quickArr.indexOf(e.key.toUpperCase() == -1)) {
      //         inner.quickArr.push(e.key.toUpperCase());
      //       } else {
      //         return;
      //       }
      //     }
      //   }
    },
    handleKeyUp(inner, e) {

    },
    // 保存配置按钮
    saveBtn(name) {
      let _this = this;
      let { formLabelAlign } = this;
      _this.$showToast("正在保存...")
      if(name==='saveBtn1'){
        _this.$http
                .post("/baseFunctionConfig/saveBaseConfig", formLabelAlign)
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
                .post("/baseFunctionConfig/saveNoteManageConfig", formLabelAlign)
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
.systemTabpane1 {
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
.systemTabpane1 {
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
      padding:10px;
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

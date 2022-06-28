<!--
 * @Author: your name
 * @Date: 2020-02-21 15:11:10
 * @LastEditTime: 2020-03-03 15:01:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ECMS\src\pages\manage\ecms\pages\versionUpgrade.vue
 -->
 <template>
  <div class="updateVersionUpgrade">
    <transition name="slide-fade">
      <div class="alert-window" v-show="alertshow">
        <div class="main">
          <img class="imgloge" src="../images/yingyongpeizhi/avataradd.png" />
          <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
          <AlertleftTile :text="text" :text2="text2" />
          <div class="content">
            <el-form :label-position="labelPosition" :model="formLabelAlign">
              <el-form-item class="red-label" label="软件名称">
                <el-input v-model.trim="formLabelAlign.softwareName"></el-input>
              </el-form-item>
              <el-form-item class="red-label" label="上传软件">
                <!-- <el-input v-model.trim="formLabelAlign.picFile"></el-input> -->
                <el-upload
                  ref="upload"
                  class="upload-demo"
                  :action="url"
                  :accept="accept"
                  :file-list="fileList"
                  :limit="1"
                  :on-remove="handleRemove"
                  :on-success="handleSuccess"
                  :before-upload="beforeAvatarUpload"
                  :on-exceed="handleExceed"
                  :http-request="uploadSectionFile"
                >
                  <!-- <el-button size="small" type="primary">上传</el-button> -->
                  <el-input></el-input>
                  <img src="../images/yingyongpeizhi/upload.png" />
                </el-upload>
              </el-form-item>
              <el-form-item class="red-label" label="版本号">
                <el-input v-model.trim="formLabelAlign.version"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="bt">
            <div class="qure" @click="qure">
              <img src="../images/courtsupervision/sure.png" />保存
            </div>

            <div class="cancel" @click="cancel">
              <img src="../images/courtsupervision/cancel.png" />取消
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
 
<script>
import $ from "jquery";
import AlertleftTile from "../component/AlertleftTile";
import getApiUrl from "../js/getApiUrl";
import FoundationTools from "../../../../js/functionAjax";
export default {
  name: "updateVersionUpgrade",
  props: {
    alertshow: Boolean,
    selectshow: Function
  },
  data() {
    return {
      text: "版本修改",
      text2: "请填写详细数据",
      labelPosition: "left",
      formLabelAlign: {
        softwareName: "", //软件名称
        picFile: "", //上传的软件
        version: "", //版本号
        versionId: "" //版本id
      },
      url: getApiUrl("/partyLoginConfig/savePartyLoginConfig"),
      fileList: [],
      accept: "exe",
      fileType: ["exe"]
    };
  },
  computed: {},
  components: {
    AlertleftTile
  },
  watch: {},
  mounted() {},
  methods: {
    // 自定义上传
    uploadSectionFile(param) {
      this.handleSuccess(param.file,this.$refs.upload.uploadFiles)
    },
    // 上传文件之前要求，文件类型，大小要求
    beforeAvatarUpload(file) {
      // this.$refs.upload.clearFiles();
      // this.fileList = [];
      // let isShow = true;
      // let isLtType = true;
      // let strs = file.name.split("."),
      //   i = 0,
      //   num = 0,
      //   last;
      // for (let j = 0; j < strs.length; j++) {
      //   last = strs[j];
      // }
      // for (; i < this.fileType.length; i++) {
      //   if (this.fileType[i] != last.toLowerCase()) {
      //     num = num + 1;
      //   }
      // }
      // if (num == this.fileType.length) {
      //   isLtType = false;
      // }
      // //文件类型进行判断
      // if (!isLtType) {
      //   this.$msgw("上传文件扩展名不正确，只能接受扩展名：.exe!");
      // }
      // return isLtType;
    },
    //上传成功
    handleSuccess(file, fileList) {
      this.$msgs("上传成功");
      // this.fileList = []
      // this.fileList.push(fileList);
      // console.log(this.fileList)
    },
    // 删除上传的文件
    handleRemove(file, fileList) {
      //移除事件前的钩子
      this.fileList = [];
    },
    //文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$msgw("目前只支持上传一个文件");
    },
    // 对表单数据进行回填
    show(row) {
      if (row) {
        for (let i in row) {
          //修改逻辑处理
          if (this.formLabelAlign.hasOwnProperty(i))
            this.formLabelAlign[i] = row[i];
        }
      } else {
        this.formLabelAlign = {
          softwareName: "", //软件名称
          version: "" //版本号
        };
      }
    },
    //注册弹框显示与否事件
    showAlert() {
      this.$emit("selectshow");
    },
    // 保存表单
    qure() {
      this.$emit("qure");
    },
    //保存修改的版本信息
    saveinfo1() {
      let { formLabelAlign } = this;
      if (!formLabelAlign.softwareName) {
        this.$msgw("请输入版本名称");
        return false;
      } else if (!formLabelAlign.version) {
        this.$msgw("请输入版本号");
        return false;
      } 
      // else if (!this.fileList.length) {
      //   this.$msgw("请上传相应的软件");
      //   return false;
      // }
      let _this = this;
      let fd = new FormData();
      fd.append(
        "userId",
        JSON.parse(FoundationTools.getCookie("cmsuserinfo")).userid
      );
      fd.append("courtCode", Number(sessionStorage.getItem('hx-lawcourtcode')));
      fd.append("softwareName", formLabelAlign.softwareName);
      fd.append("version", formLabelAlign.version);
      fd.append("versionId", formLabelAlign.versionId);
      fd.append("picFile", this.$refs.upload.uploadFiles.length ? this.$refs.upload.uploadFiles[0].raw : '');
      _this.$showToast("正在保存...")
      $.ajax({
        url: getApiUrl("/softwareVersionManage/updateSoftwareVersion"),
        type: "POST",
        data: fd,
        dataType: "JSON",
        cache: false,
        processData: false,
        contentType: false,
        success: function(data) {
          _this.$hideToast()
          if (data.code === 200) {
            _this.$msgs("保存成功");
            _this.$parent.ismain = false;
            _this.$refs.upload.clearFiles()
            _this.$parent.getTableData();
          } else {
            _this.$msgw(data.message);
          }
        },
        fail: function(error) {
          _this.$hideToast()
          _this.$msge("服务器异常，请稍后重试");
        }
      });
    },
    // 取消
    cancel() {
      this.$emit("cancel");
    }
  }
};
</script>
 
<style lang="less">
@import url("../css/common.less");
.updateVersionUpgrade {
  @import url("../css/element.less");
  /*label*/
  .el-form-item__label {
    .f18();
    width: 1.2rem !important;
  }
  .el-form-item__content {
    margin-left: 1.2rem !important;
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
  // 修改弹框
  .upload-demo {
    display: flex;
    position: relative;
    img {
      width: 18px;
      height: 18px;
    }
    ul {
      width: 4rem;
      margin-right: 0.5rem;
      margin-left: -4.3rem;
      .el-upload-list__item:first-child {
        margin-top: 7px;
        height: 26px;
      }
    }
  }
}
</style>
<style lang="less" scoped>
.updateVersionUpgrade {
  /*弹框*/
  .main {
    width: 8rem;
    padding: 0 0.8rem;
    box-shadow: -5px 5px 5px 0 rgba(38, 78, 119, 0.2),
      5px -3px 3px 0 rgba(38, 78, 119, 0.2);
    background: #fff;
    position: absolute;
    left: 50%;
    top: 0.5rem;
    margin-left: -4rem;
    border-radius: 2px;
    @import url("../css/alertimg.less");
    .content {
      width: 100%;
      background: #eceff0;
      min-height: 4rem;
      margin-top: 0.1rem;
      padding: 0.2rem;
    }
    /*底部*/
    @import url("../css/alertbtn.less");
  }
}
</style>

<template>
  <div class="templateAlert">
    <!--弹框-->
    <transition name="slide-fade">
      <div class="alert-window2" v-show="isMain2">
        <div class="main">
          <img class="imgloge" src="../../images/yingyongpeizhi/avataradd.png" />
          <img class="alert-close" @click="cancel" src="../../images/alert-close.png" />
          <AlertleftTile :text="text" :text2="text2" />
          <div class="table-style">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
            >
              <el-table-column type="index" label="序号" :index="indexMethod"></el-table-column>
              <el-table-column prop="templetName" label="模板名称" show-overflow-tooltip></el-table-column>
              <el-table-column label="操作" show-overflow-tooltip>
                <template slot-scope="scope">
                  <div class="isedit">
                    <el-upload
                      ref="upload"
                      class="upload-demo"
                      :file-list="fileList"
                      :show-file-list="false"
                      :on-exceed="handleExceed"
                      :http-request="(file)=>uploadSectionFile(file,scope.$index, scope.row)"
                    >
                      <el-button size="small" type="primary">上传</el-button>
                    </el-upload>
                    <el-button @click="download(scope.$index, scope.row)">下载</el-button>
                    <el-button @click="deploy(scope.$index, scope.row)">配置</el-button>
                    <!-- <el-button @click="delinfo(scope.$index, scope.row)">删除</el-button> -->
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="up">
            <!--分页-->
            <el-pagination
              class="page"
              background
              @current-change="handleCurrentChange"
              :current-page="1"
              :page-size="10"
              layout="total, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
          <div class="bt">
            <div class="qure" @click="qure">
              <img src="../../images/courtsupervision/sure.png" />确定
            </div>

            <div class="cancel" @click="cancel">
              <img src="../../images/courtsupervision/cancel.png" />取消
            </div>
          </div>
        </div>
      </div>
    </transition>
    <spring-box :alertShow.sync="alertShow" :mainText="mainText" @sure="updateSettingSubmit">
      <main-alert ref="mainAlert" :currentData="currentData" :templetId="templateId" @cancel="alertShow=false"/>
    </spring-box>
  </div>
</template>

<script>
import $ from "jquery";
import AlertleftTile from "../../component/AlertleftTile";
import Tool from "../../js/tools";
import getApiUrl from "../../js/getApiUrl";
export default {
  name: "templateAlert",
  props: {
    isMain2: Boolean,
    selectshow: Function
  },
  components: {
    AlertleftTile,
    springBox:()=>import("../../component/springBox/springBox"),
    mainAlert:()=>import("./mainAlert")
  },
  data() {
    return {
      text: "显示模板配置",
      text2: "请填写详细信息",
      mainText:'显示模板配置',
      alertShow:false,
      tableData: [],
      total: 0,
      pageIndex: 1, //当前页码
      pageSize: 10,
      isMain3: false,
      fileList: [],
      fileType: ["jpg", "png", "jpeg","bmp"],
      currentData: {},
      templateId: ""
    };
  },
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    //关于表格
    //获取表格数据
    getTableData() {
      let _this = this;
      let { pageIndex, pageSize } = this;
      _this.$showLoading("rgba");
      _this.$http
        .post("/tdsconfig/getTDSClientTemplets", {
          pageIndex,
          pageSize
        })
        .then(data => {
          _this.$hideLoading("rgba");
          if (data.code === 200) {
            console.log(data);
            _this.total = data.count;
            _this.tableData = data.data;
          } else {
            _this.$msgw(data.message);
          }
        })
        .catch(err => {
          _this.$hideLoading("rgba");
          _this.$msge("服务器异常，请稍后重试");
        });
    },
    //table表格索引值
    indexMethod(index) {
      return (this.pageIndex - 1) * 10 + index + 1; //当前条数
    },
    // 自定义上传
    uploadSectionFile(file,index,row) {
      let _this = this;
      let pictureSuffix=file.file.name.split(".")[
      file.file.name.split(".").length - 1];
      if(!_this.fileType.includes(pictureSuffix.toLowerCase())){
        _this.$msgw("上传文件扩展名只能接受：.jpg,.jpeg,.png,.bmp!")
        _this.$refs.upload.clearFiles();
        return
      }
      let fr = new FileReader();
      fr.readAsDataURL(file.file);
      fr.onload = function(e) {
        _this.$showToast("正在上传...")
        _this.$http
                .post("/tdsconfig/uploadPicture", {
                  templateId: row.templetId,
                  pictureSuffix,
                  fileStream: fr.result
                })
                .then(data => {
                  _this.$hideToast()
                  if (data.code === 200) {
                    _this.$refs.upload.clearFiles();
                    _this.$msgs("上传成功");
                  } else {
                    _this.$msgw(data.message);
                  }
                })
                .catch(err => {
                  _this.$hideToast()
                  _this.$msge("服务器异常，请稍后重试");
                });
      };
    },
    //文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      //this.$msgw("目前只支持上传一个文件");
    },
    // 下载
    download(index, row) {
      let _this = this;
          let templateId = row.templetId;
          let url = window.location.origin + getApiUrl(
            "/tdsconfig/downloadPicture?templateId=" + templateId
          );
          window.open(url,'_blank')
          // $.ajax({
          //   url: url,
          //   type: "get",
          //   data: null,
          //   // dataType: "JSON",
          //   contentType: "application/json",
          //   timeout: 30000,
          //   success: function(data) {
          //     Tool.saveAs(url);
          //   },
          //   error: function(error) {
          //     _this.$msge("服务器异常，请稍后重试");
          //   }
          // });
    },
    // 配置
    deploy(index, row) {
      this.templateId = row.templetId;
      this.currentData = row;
      this.alertShow=true;
    },
    // 配置弹框的确认按钮
    updateSettingSubmit() {
      this.$refs.mainAlert.submitForm();
    },
    // 删除
    delinfo(index, row) {
      let _this = this;
      this.$confirm("确认删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _this.$http
            .post("/tdsconfig/deleteTDSClient", {})
            .then(data => {
              if (data.code === 200) {
                _this.$msgs("删除成功!");
                //计算总页数
                if (
                  index == 0 &&
                  Math.ceil(Number(_this.total) / 10) ==
                    Number(_this.pageIndex) &&
                  _this.pageIndex != 1 &&
                  Number(_this.total) % 10 == 1
                ) {
                  _this.pageIndex = Number(_this.pageIndex) - 1;
                }
                _this.getTableData();
              } else {
                _this.$msgw(data.message);
              }
            })
            .catch(err => {
              _this.$msge("服务器异常，请稍后重试");
            });
        })
        .catch(() => {});
    },
    //注册弹框显示与否事件
    qure() {
      this.$emit("qure");
    },
    // 取消
    cancel() {
      this.$emit("cancel");
    },
    //分页信息
    //当前页数
    handleCurrentChange(page) {
      this.pageIndex = page;
    }
  }
};
</script>

<style lang="less">
@import url("../../css/common.less");
.templateAlert {
  /*弹框*/
  .main {
    width: 14rem;
    padding: 0 0.8rem;
    box-shadow: -5px 5px 5px 0 rgba(38, 78, 119, 0.2),
      5px -3px 3px 0 rgba(38, 78, 119, 0.2);
    /*min-height:6.85rem;*/
    background: #fff;
    position: absolute;
    left: 50%;
    top: 1.5rem;
    margin-left: -7rem;
    /*margin-top:-3.425rem;*/
    border-radius: 2px;
    @import url("../../css/alertimg.less");
    .table-style {
      max-height: 5rem;
      overflow: auto;
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
    // 上传框
    .isedit {
      display: flex;
      justify-content: center;
    }
    .upload-demo {
      width: 0.9rem;
      margin-right: 10px;
    }
    /*底部*/
    @import url("../../css/alertbtn.less");
  }
}
</style>
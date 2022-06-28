<template>
  <div class="downloadAlert">
    <!--弹框-->
    <transition name="slide-fade">
      <div class="alert-window2" v-show="alertshow">
        <div class="main">
          <img class="imgloge" src="../images/yinshipinguanli/kelu.png" />
          <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
          <AlertleftTile :text="text" :text2="text2" />
          <div class="title">{{titleContent}}：{{fileTotalSize}}M</div>
          <div class="table-style">
            <div class="hiddenDiv"></div>
            <el-table
                    ref="multipleTable"
                    border
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    height="350"
                    :span-method="arraySpanMethod"
                    @select="selectRowChange"
            >
              <el-table-column
                      type="selection"
                      indeterminate="true"
                      width="50px"
                      show-overflow-tooltip
              ></el-table-column>
              <el-table-column prop="caseNumber" label="案号" width="240px" show-overflow-tooltip></el-table-column>
              <el-table-column prop="courtTime" label="庭次" width="80px" show-overflow-tooltip></el-table-column>
              <el-table-column :label="content">
                <template slot-scope="scope">
                  <el-checkbox-group
                          v-if="viewSource.length>0"
                          v-model="viewSource[scope.$index]"
                          @change="val=>handleCheckedChange(val, scope.$index, scope.row)"
                          :disabled="tableData[scope.$index].disabled"
                  >
                    <el-checkbox
                            v-for="source in tableData[scope.$index].viewSource"
                            :label="source"
                            :key="source.name"
                    >{{source.name}}</el-checkbox>
                  </el-checkbox-group>
                </template>
              </el-table-column>
              <el-table-column
                      class="table-size"
                      prop="fileSize"
                      width="150px"
                      label="所选文件大小(M)"
                      show-overflow-tooltip
              ></el-table-column>
            </el-table>
          </div>
          <div class="bt">
            <div class="qure" @click="qure">
              <img src="../images/courtsupervision/sure.png" />
              {{showText}}
            </div>

            <div class="cancel" @click="cancel">
              <img src="../images/courtsupervision/cancel.png" />取消
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!--视频下载-->
    <object
            id="ftpdownload"
            classid="clsid:BFEBED5F-D439-4BE2-894E-01C65CC9F7E6"
            width="0"
            height="0"
    ></object>
  </div>
</template>

<script>
  import AlertleftTile from "../component/AlertleftTile";
  import Tool from "../js/tools";
  export default {
    name: "downloadAlert",
    props: {
      alertshow: Boolean
    },
    components: {
      AlertleftTile
    },
    data() {
      return {
        text: "",
        text2: "",
        labelPosition: "left", //form表单左侧靠齐
        formLabelAlign: {
          name: "",
          region: "",
          type: "",
          desc: ""
        },
        content: "",
        titleContent: "",
        fileTotalSize: 0,
        viewSource: [], // 刻录内容数据源
        totalViewSource: [],
        tableData: [],
        newData: [],
        postData: {},
        isEmpty: false, //poatData中数据是否为空
        showText: "", // 按钮显示的文字
        rowIndexReal:0,//当前checkbox勾选索引
      };
    },
    created() {},
    mounted() {},
    destroyed() {},
    watch: {
      alertshow: function(newVal) {
        if (newVal) {
          this.$nextTick(function() {
            this.$refs.multipleTable.toggleRowSelection(this.tableData[0]);
          });
        }
      }
    },
    methods: {
      //注册弹框显示与否事件
      showAlert() {
        this.resetData();
        this.$emit("selectshow");
      },
      // 提交
      qure() {
        if (Tool.isIE()) {
          let _this = this;
          let url = "/videoManager/getDownLoadXml";
          if (this.isEmpty == true) {
            _this.$msgw("请选择下载文件");
          } else {
            let param=JSON.parse(JSON.stringify(this.postData))
            param.trialBurnParam[0].trialBurnDtoList=[this.postData.trialBurnParam[0].trialBurnDtoList[this.rowIndexReal]]
            this.$emit("qure");
            _this.$showLoading("rgba");
            _this.$http.post(url,param)
                    .then(data => {
                      _this.$hideLoading("rgba");
                      if (data.code === 200) {
                        // 下载
                        if (document.getElementById("ftpdownload")){console.log(data,300)
                          if (typeof document.getElementById("ftpdownload").FTPDownloadAdd === undefined) {
                            alert("您没有安装ftp下载插件，请先安装插件");console.log(data,400)
                            return;
                          }
                        }else{
                          alert("您没有安装ftp下载插件，请先安装插件");
                          return;
                        }
                        document.getElementById("ftpdownload").FTPDownloadAdd(data.data.downloadXml, "", "", "UTF-8");
                        this.resetData();
                      } else {
                        _this.$msgw(data.message);
                      }
                    })
                    .catch(err => {
                      _this.$hideLoading("rgba");
                      console.log(err, url);
                      //_this.$msge("服务器异常，请稍后重试");
                    });
          }
        } else {
          this.$msgw("请使用IE浏览器");
        }
      },
      cancel() {
        this.$emit("cancel");
        this.resetData();
      },
      getTableData(label, el) {
        // val 表示刻录（1）还是下载（）2 ， label 表示是案件（1）还是排期（2），el 是传递过来的数据
        console.log(label);
        console.log(el);
        this.showText = "下载";
        this.content = "下载内容";
        this.text = "视频下载";
        this.text2 = "选择需要下载的案件";
        this.titleContent = "下载文件总大小";
        let url = "";
        let param = [];
        let data = {};
        if (label == 1) {
          url = "/videoManager/findDownloadInfosByCaseInfoId";
          for (let index = 0; index < el.length; index++) {
            const element = el[index];
            let dic = { caseInfoId: element.caseInfoId };
            param.push(dic);
          }
          data = { caseInfoIds: param };
        } else {
          url = "/videoManager/findDownloadInfosByTrialPlanId";
          for (let index = 0; index < el.length; index++) {
            const element = el[index];
            let dic = { trialPlanId: element.trialPlanId };
            param.push(dic);
          }
          data = { trialPlanIds: param };
        }
        let _this = this;
        _this.$showLoading("rgba");
        _this.$http
                .post(url, data)
                .then(data => {
                  _this.$hideLoading("rgba");
                  if (data.code === 200) {
                    console.log("总数据请求");
                    console.log(data);
                    this.newData = data.data;
                    var resetArr = [];
                    // 记录每次需要合并行的起始位置
                    let count;
                    var countArray = [];
                    for (let index = 0; index < this.newData.length; index++) {
                      if (index == 0) {
                        count = 0;
                      } else {
                        const element_out = this.newData[index - 1];
                        count = count + element_out.trialBurnDtoList.length;
                      }
                      countArray.push(count);
                    }

                    // 向新结构里放入关键当前行的数据
                    var curIndex = 0;
                    var realIndex = 0;
                    for (let index = 0; index < this.newData.length; index++) {
                      const element_out = this.newData[index];
                      let arrIndex = countArray[index];
                      for (
                              let index_mid = 0;
                              index_mid < element_out.trialBurnDtoList.length;
                              index_mid++
                      ) {
                        const element_in = element_out.trialBurnDtoList[index_mid];
                        let dic = {
                          caseInfoId: "",
                          caseNumber: "",
                          trialPlanId: "",
                          courtTime: 1,
                          viewSource: [],
                          bigRowIndex: -1, // 合并行的行号
                          count: 1, // 庭次数量
                          rowIndex: -1, // 当前细分行的行号，
                          rowIndexReal: 0, // 当前细分行的行号，
                          smallRowIndex: -1, // 细分行在合并行中的行号
                          fileSize: "", //文件大小
                          disabled: true
                        };
                        dic.caseInfoId = element_out.caseInfoId;
                        dic.caseNumber = element_out.caseNumber;
                        dic.trialPlanId = element_in.trialPlanId;
                        dic.courtTime = element_in.courtTime;
                        dic.viewSource = element_in.viewSource;
                        dic.bigRowIndex = index;
                        dic.count = element_out.trialBurnDtoList.length;
                        if (curIndex == arrIndex) {
                          dic.rowIndex = arrIndex;
                        }
                        dic.rowIndexReal = realIndex;
                        realIndex++;
                        if (curIndex == 0) {
                          this.viewSource.push(element_in.viewSource);
                          let tempSize = "";
                          for (let index = 0; index < dic.viewSource.length; index++) {
                            const tempFile = element_in.viewSource[index];
                            tempSize = Number(tempSize) + Number(tempFile.size);
                          }
                          dic.fileSize = tempSize;
                          dic.disabled = false;
                        } else {
                          this.viewSource.push([]);
                          dic.fileSize = 0;
                          dic.disabled = true;
                        }
                        for (let index = 0; index < dic.viewSource.length; index++) {
                          const tempFile = element_in.viewSource[index];
                          this.fileTotalSize =
                                  Number(this.fileTotalSize) + Number(tempFile.size);
                        }
                        curIndex++;
                        this.totalViewSource.push(element_in.viewSource);
                        dic.smallRowIndex = index_mid;
                        resetArr.push(dic);
                      }
                    }
                    this.tableData = resetArr;
                    this.$nextTick(function() {
                      this.$refs.multipleTable.toggleRowSelection(this.tableData[0]);
                    });
                    // 设置构造传输的数据
                    let allArr = [];
                    let totalIndex = 0;
                    for (let index = 0; index < this.newData.length; index++) {
                      const element = this.newData[index];
                      let firstDic = {
                        caseInfoId: "",
                        caseNumber: "",
                        trialBurnDtoList: []
                      };
                      firstDic.caseInfoId = element.caseInfoId;
                      firstDic.caseNumber = element.caseNumber;
                      // 中间层
                      for (
                              let index_mid = 0;
                              index_mid < element.trialBurnDtoList.length;
                              index_mid++
                      ) {
                        const element_mid = element.trialBurnDtoList[index_mid];
                        let midDic = {
                          trialPlanId: "",
                          courtTime: "",
                          viewSourceString: ""
                        };
                        midDic.trialPlanId = element_mid.trialPlanId;
                        midDic.courtTime = element_mid.courtTime;
                        if (totalIndex == 0) {
                          // 最内层拼接
                          let tempArr = [];
                          for (
                                  let index_in = 0;
                                  index_in < element_mid.viewSource.length;
                                  index_in++
                          ) {
                            const element_in = element_mid.viewSource[index_in];
                            tempArr.push(element_in.name);
                          }
                          midDic.viewSourceString = tempArr.join(",");
                        } else {
                          midDic.viewSourceString = "";
                        }
                        totalIndex++;
                        firstDic.trialBurnDtoList.push(midDic);
                      }
                      allArr.push(firstDic);
                    }
                    this.postData = { trialBurnParam: allArr };
                    console.log(JSON.stringify(this.postData));
                  } else {
                    _this.$msgw(data.message);
                  }
                })
                .catch(err => {
                  _this.$hideLoading("rgba");
                  console.log(err, url);
                  _this.$msge("服务器异常，请稍后重试");
                });
        console.log(this.newData);
      },
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        //当前行row、当前列column、当前行号rowIndex、当前列号columnIndex四个属性
        //该函数可以返回一个包含两个元素的数组，第一个元素代表rowspan，第二个元素代表colspan
        // console.log(row);
        // console.log(column);
        if (columnIndex === 1) {
          if (rowIndex === row.rowIndex) {
            return {
              rowspan: row.count,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      // table 行选择方法
      selectRowChange(selection, row) {
        this.rowIndexReal=row.rowIndexReal//当前勾选索引
        if (selection.length == 0) {
          this.isEmpty = true;
          this.viewSource[row.rowIndexReal] = [];
          this.tableData[row.rowIndexReal].fileSize = 0;
          this.tableData[row.rowIndexReal].disabled = true;
          this.postData.trialBurnParam[row.bigRowIndex].trialBurnDtoList[
                  row.smallRowIndex
                  ].viewSourceString = "";
          console.log(JSON.stringify(this.postData));
        } else if (selection.length == 1) {
          this.isEmpty = false;
          this.viewSource[row.rowIndexReal] = this.totalViewSource[
                  row.rowIndexReal
                  ];
          this.tableData[row.rowIndexReal].disabled = false;
          let tempSize = "";
          let tempArr = [];
          for (
                  let index = 0;
                  index < this.totalViewSource[row.rowIndexReal].length;
                  index++
          ) {
            const tempFile = this.totalViewSource[row.rowIndexReal][index];
            tempSize = Number(tempSize) + Number(tempFile.size);
            tempArr.push(tempFile.name);
          }
          this.postData.trialBurnParam[row.bigRowIndex].trialBurnDtoList[
                  row.smallRowIndex
                  ].viewSourceString = tempArr.join(",");
          console.log(JSON.stringify(this.postData));
          this.tableData[row.rowIndexReal].fileSize = tempSize;
        } else {
          this.isEmpty = false;
          this.$nextTick(function() {
            this.$refs.multipleTable.toggleRowSelection(selection[0], false);
          });
          console.log(row);
          this.viewSource[selection[0].rowIndexReal] = [];
          this.tableData[selection[0].rowIndexReal].disabled = true;

          this.tableData[selection[0].rowIndexReal].fileSize = 0;
          this.tableData[row.rowIndexReal].disabled = false;
          this.viewSource[row.rowIndexReal] = this.totalViewSource[
                  row.rowIndexReal
                  ];
          this.postData.trialBurnParam[selection[0].bigRowIndex].trialBurnDtoList[
                  selection[0].smallRowIndex
                  ].viewSourceString = "";
          console.log(JSON.stringify(this.postData));
          let tempSize = "";
          let tempArr = [];
          for (
                  let index = 0;
                  index < this.totalViewSource[row.rowIndexReal].length;
                  index++
          ) {
            const tempFile = this.totalViewSource[row.rowIndexReal][index];
            tempSize = Number(tempSize) + Number(tempFile.size);
            tempArr.push(tempFile.name);
          }
          this.postData.trialBurnParam[row.bigRowIndex].trialBurnDtoList[
                  row.smallRowIndex
                  ].viewSourceString = tempArr.join(",");
          console.log(JSON.stringify(this.postData));
          this.tableData[row.rowIndexReal].fileSize = tempSize;
        }
      },
      // 内容选择事件
      handleCheckedChange(val, index, row) {
        console.log(val);
        console.log(index);
        console.log(row);
        // 计算改变后的总文件大小
        let newSize = "";
        if (val.length > 0) {
          this.isEmpty = false;
          for (let index = 0; index < val.length; index++) {
            const element = val[index];
            newSize = Number(newSize) + Number(element.size);
          }
        } else {
          this.isEmpty = true;
          newSize = Number("0");
          this.$nextTick(function() {
            this.$refs.multipleTable.toggleRowSelection(row, false);
          });
          this.tableData[index].disabled = true;
        }
        this.tableData[index].fileSize = newSize;

        // 更新将要提交的数据
        let tempStr = "";
        let tempArr = [];
        if (val.length > 0) {
          for (let index = 0; index < val.length; index++) {
            const element = val[index];
            tempArr.push(element.name);
          }
          tempStr = tempArr.join(",");
        } else {
          tempStr = "";
        }
        this.postData.trialBurnParam[row.bigRowIndex].trialBurnDtoList[
                row.smallRowIndex
                ].viewSourceString = tempStr;
        console.log(JSON.stringify(this.postData));
      },
      // 界面隐藏时，全部重置数据
      resetData() {
        this.fileTotalSize = 0;
        this.viewSource = [];
        this.totalViewSource = [];
        this.isEmpty = false;
      }
    }
  };
</script>

<style lang="less">
  @import url("../css/common.less");
  .downloadAlert {
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
      @import url("../css/alertimg.less");
      .hiddenDiv {
        width: 0.5rem;
        height: 0.5rem;
        position: relative;
        top: 0.6rem;
        background: #cbe5f3;
        z-index: 100;
      }
      .title {
        position: absolute;
        left: 50%;
        top: 0;
        width: 5rem;
        margin-left: -2.5rem;
        line-height: 0.6rem;
        text-align: center;
      }
      @import url("../css/element.less");
      /*底部*/
      @import url("../css/alertbtn.less");
    }
  }
</style>
<style lange="less" scoped>
  .table-style{
    width:12.4rem;
  }
</style>
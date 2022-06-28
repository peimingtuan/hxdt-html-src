<template>
  <div class="imprintAlert">
    <!--弹框-->
    <transition name="slide-fade">
      <div class="alert-window2" v-show="alertshow">
        <div class="main">
          <img class="imgloge" src="../images/yinshipinguanli/kelu.png" />
          <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
          <AlertleftTile :text="text" :text2="text2" />
          <div class="title">{{titleContent}}：{{fileTotalSize}}M</div>
          <div class="table-style">
            <el-table
              ref="multipleTable"
              border
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              height="350"
              :span-method="arraySpanMethod"
              @select="checkedRowSelected"
              @select-all="checkedAllSelected"
            >
              <el-table-column type="selection" show-overflow-tooltip></el-table-column>
              <el-table-column prop="caseNumber" label="案号" width="240px" show-overflow-tooltip></el-table-column>
              <el-table-column prop="courtTime" label="庭次" width="80px" show-overflow-tooltip></el-table-column>
              <el-table-column :label="content">
                <template slot-scope="scope">
                  <el-checkbox-group
                          v-if="viewSource.length>0"
                    v-model="viewSource[scope.$index]"
                    @change="val=>handleCheckedChange(val, scope.$index, scope.row)"
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
                width="150px"
                prop="fileSize"
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
  </div>
</template>

<script>
import AlertleftTile from "../component/AlertleftTile";
export default {
  name: "imprintAlert",
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
      postData: {}, // 需要上传的数据结构
      showText: "", // 按钮显示的文字
      selectList:[],//当前勾选checkbox
    };
  },
  created() {},
  mounted() {},
  destroyed() {},
  watch: {
    alertshow: function(newVal) {
      if (newVal == true) {
        this.selectList=this.tableData
        this.tableData.forEach(item => {
          this.$nextTick(function() {
            this.$refs.multipleTable.toggleRowSelection(item, true);
          });
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
      let _this = this;
      let haveStr = false;
      this.postData.trialBurnParam.forEach(item => {
        item.trialBurnDtoList.forEach(val => {
          if (val.viewSourceString == "") {
          } else {
            haveStr = true;
          }
        });
      });

      if (haveStr == false) {
        _this.$msgw("请选择刻录文件");
      } else {
        try{
          document.getElementById("StartBurnControl").StartBurnControl("");
          _this.$showLoading("rgba");
          //Evan-Pei修改逻辑
          let param=JSON.parse(JSON.stringify(this.postData))
          this.postData.trialBurnParam.map((item,index)=>{
            param.trialBurnParam[index].trialBurnDtoList=[];
            this.selectList.map(its=>{
              for(let i=0;i<item.trialBurnDtoList.length;i++){
                if(its.trialPlanId===item.trialBurnDtoList[i].trialPlanId){
                  param.trialBurnParam[index].trialBurnDtoList.push(item.trialBurnDtoList[i])
                  break;
                }
              }
            })
          })
          _this.$http
                  .post("/videoManager/trialBurn",param)
                  .then(data => {
                    _this.$hideLoading("rgba");
                    if (data.code === 200) {
                      this.$emit("qure");
                      this.resetData();
                    } else {
                      _this.$msgw(data.message);
                    }
                  })
                  .catch(err => {
                    _this.$hideLoading("rgba");
                    _this.$msge("服务器异常，请稍后重试");
                  });
        }catch(e){
          _this.$msgw("启动burnControl失败");
        }
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
      this.showText = "刻录";
      this.content = "刻录内容";
      this.text = "视频刻录";
      this.text2 = "选择需要刻录的案件";
      this.titleContent = "刻录文件总大小";
      let url = "";
      let param = [];
      let data = {};
      if (label == 1) {
        url = "/videoManager/findTrialBurnInfosByCaseInfoId";
        for (let index = 0; index < el.length; index++) {
          const element = el[index];
          let dic = { caseInfoId: element.caseInfoId };
          param.push(dic);
        }
        data = { caseInfoIds: param };
      } else {
        url = "/videoManager/findTrialBurnInfosByTrialPlanId";
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
                  fileSize: "" //文件大小
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
                curIndex++;
                dic.smallRowIndex = index_mid;
                let tempSize = "";
                for (let index = 0; index < dic.viewSource.length; index++) {
                  const tempFile = element_in.viewSource[index];
                  tempSize = Number(tempSize) + Number(tempFile.size);
                  this.fileTotalSize =
                    Number(this.fileTotalSize) + Number(tempFile.size);
                }
                dic.fileSize = tempSize;
                resetArr.push(dic);
                this.viewSource.push(element_in.viewSource);
                this.totalViewSource.push(element_in.viewSource);
              }
            }
            this.tableData = resetArr;
            // console.log(resetArr);
            this.selectList=this.tableData
            this.tableData.forEach(item => {
              this.$nextTick(function() {
                this.$refs.multipleTable.toggleRowSelection(item, true);
              });
            });
            // 设置构造传输的数据
            let allArr = [];
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
    // 行内第一列选择按钮点击事件
    checkedRowSelected(selection, row) {
      this.selectList=selection;//当前勾选的checkbox
      if (selection.indexOf(row) > -1) {
        console.log("选中状态");
        this.viewSource[row.rowIndexReal] = this.totalViewSource[
          row.rowIndexReal
        ];
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
        console.log("取消状态");
        this.viewSource[row.rowIndexReal] = [];
        this.tableData[row.rowIndexReal].fileSize = 0;
        this.postData.trialBurnParam[row.bigRowIndex].trialBurnDtoList[
          row.smallRowIndex
        ].viewSourceString = "";
        console.log(JSON.stringify(this.postData));
      }
    },
    // 表头全选按钮点击事件
    checkedAllSelected(selection) {
      this.selectList=selection;//当前勾选的checkbox
      if (selection.length > 0) {
        selection.forEach(item => {
          this.viewSource[item.rowIndexReal] = this.totalViewSource[
            item.rowIndexReal
          ];
          let tempSize = "";
          let tempArr = [];
          for (
            let index = 0;
            index < this.totalViewSource[item.rowIndexReal].length;
            index++
          ) {
            const tempFile = this.totalViewSource[item.rowIndexReal][index];
            tempSize = Number(tempSize) + Number(tempFile.size);
            tempArr.push(tempFile.name);
          }
          this.postData.trialBurnParam[item.bigRowIndex].trialBurnDtoList[
            item.smallRowIndex
          ].viewSourceString = tempArr.join(",");
          this.tableData[item.rowIndexReal].fileSize = tempSize;
        });
        console.log(JSON.stringify(this.postData));
      } else {
        // 全部不选状态
        this.tableData.forEach(item => {
          this.viewSource[item.rowIndexReal] = [];
          this.tableData[item.rowIndexReal].fileSize = 0;
          this.postData.trialBurnParam[item.bigRowIndex].trialBurnDtoList[
            item.smallRowIndex
          ].viewSourceString = "";
        });
        console.log(JSON.stringify(this.postData));
      }
    },
    // 表内checkedBox-Group点击事件
    handleCheckedChange(val, index, row) {
      // 计算改变后的总文件大小
      let newSize = "";
      if (val.length > 0) {
        for (let index = 0; index < val.length; index++) {
          const element = val[index];
          newSize = Number(newSize) + Number(element.size);
        }
        this.$nextTick(function() {
          this.$refs.multipleTable.toggleRowSelection(row, true);
        });
      } else {
        newSize = Number("0");
        this.$nextTick(function() {
          this.$refs.multipleTable.toggleRowSelection(row, false);
        });
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
       this.viewSource=[];
       this.totalViewSource = [];
    }
  }
};
</script>

<style lang="less">
@import url("../css/common.less");
.imprintAlert {
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
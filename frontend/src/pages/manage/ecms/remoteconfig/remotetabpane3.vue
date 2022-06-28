<template>
  <div class="remotetabpane3">
    <div class="flex-div">
      <div class="flex-left">
        <el-tree
                :data="treeData"
                :props="defaultProps"
                ref="tree"
                node-key="id"
                highlight-current="true"
                default-expand-all
                expand-on-click-node="false"
                @node-click="handleNodeClick"
        ></el-tree>
      </div>
      <div class="flex-right">
        <div class="top">
          <div class="le">
            <div class="add" @click="add()">
              <img src="../images/yingyongpeizhi/add.png" />
            </div>
          </div>
          <!--<div class="ri">-->
          <!--<el-input v-model="input" placeholder="按条件搜索"></el-input>-->
          <!--<el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>-->
          <!--</div>-->
        </div>
        <div class="table-style">
          <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
            <el-table-column type="index" label="序号" width="100px" :index="indexMethod"></el-table-column>
            <el-table-column prop="trialRoomName" label="庭审室名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="trialRoomTypeName" label="庭审室类型" show-overflow-tooltip></el-table-column>
            <el-table-column prop="trialUnitName" label="所属单位" show-overflow-tooltip></el-table-column>
            <el-table-column prop="buildDate" label="建设日期" show-overflow-tooltip></el-table-column>
            <el-table-column
                    prop="trialRoomStatus"
                    label="庭审室状态"
                    :formatter="formatterTrialRoomStatus"
                    show-overflow-tooltip
            ></el-table-column>
            <el-table-column prop="trialRoomDesc" label="描述" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" show-overflow-tooltip>
              <template slot-scope="scope">
                <div class="isedit">
                  <span @click="edit(scope.$index, scope.row)">修改</span>
                  <span @click="delinfo(scope.$index, scope.row)">删除</span>
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
                  :current-page.sync="currentPage"
                  :page-size="10"
                  layout="total, prev, pager, next, jumper"
                  :total="tatalCount"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!--添加弹框-->
    <addremoteAlert3
      @receiveRefish="receiveRefish"
      ref="addremoteAlert3"
    />
  </div>
</template>

<script>
import addremoteAlert3 from "./addremoteAlert3"; //添加弹框
export default {
  name: "remotetabpane3",
  components: {
    addremoteAlert3
  },
  data() {
    return {
      input: "", //搜索
      pageIndex: 1,
      tatalCount: 100,
      currentPage: 1,
      touchTrialUnitId: "", // 点击的树节点对应的单位ID
      tableData: [],
      treeData: [],
      defaultProps: {
        children: "childrenNodes",
        label: "trialUnitName",
        trialUnitId: "",
        parentTrialUnitId: ""
      }
    };
  },
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    /** 树结构相关方法 */

    // 获取全部数据
    getTreeData(trialUnitId) {
      this.$showLoading("rgba");
      this.$http
        .post("/remoteTrial/getRemoteTrialUnits", {})
        .then(data => {
          this.$hideLoading("rgba");
          if (data.code === 200) {
            console.log(data);
            this.treeData = [data.data];
            this.touchTrialUnitId = trialUnitId;
            this.getTableData(trialUnitId, 1);
          } else {
            this.$msgw(data.message);
          }
        })
        .catch(err => {
          this.$hideLoading("rgba");
          console.log(err, "/remoteTrial/getRemoteTrialUnits");
          //this.$msge("服务器异常，请稍后重试");
        });
    },
    // 节点点击回调
    handleNodeClick(val) {
      this.touchTrialUnitId = val.trialUnitId;
      this.getTableData(val.trialUnitId, 1);
    },
    receiveRefish() {
      this.getTableData(this.touchTrialUnitId, 1);
    },
    getTableData(trialUnitId, pageIndex) {
      this.$showLoading("rgba");
      this.$http
        .post("/remoteTrial/getTrialRoomsByTrialUnitId", {
          pageIndex: pageIndex,
          pageSize: 10,
          trialUnitId: trialUnitId,
          trialRoomName: ""
        })
        .then(data => {
          this.$hideLoading("rgba");
          if (data.code === 200) {
            console.log(data);
            this.tatalCount = data.count;
            this.tableData = data.data;
          } else {
            this.$msgw(data.message);
          }
        })
        .catch(err => {
          this.$hideLoading("rgba");
          console.log(err, url);
          this.$msge("服务器异常，请稍后重试");
        });
    },
    formatterTrialRoomStatus(row, column, cellValue, index) {
      //1.未使用,2.正在调试,3.正在开庭,4.正在休庭
      if (cellValue == 1) {
        return "未使用";
      }
      if (cellValue == 2) {
        return "正在调试";
      }
      if (cellValue == 3) {
        return "正在开庭";
      }
      if (cellValue == 4) {
        return "正在休庭";
      }
    },
    //添加弹框
    add() {
      if (this.touchTrialUnitId == ""){
        this.$message.warning("请选择庭审单位");
      } else {
        this.$refs.addremoteAlert3.ismain = true;
        this.$refs.addremoteAlert3.getUnitID(this.touchTrialUnitId);
      }
    },
    //修改当前行信息
    edit(index, val) {
      this.$refs.addremoteAlert3.ismain = true;
      this.$refs.addremoteAlert3.updataSomething(val);
    },
    //删除当前行内容
    delinfo(index, val) {
      this.$confirm("确认删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$showLoading("rgba");
          this.$http
            .post("/remoteTrial/deleteTrialRoomInfo", {
              trialRoomId: val.trialRoomId
            })
            .then(data => {
              this.$hideLoading("rgba");
              if (data.code === 200) {
                this.getTableData(this.touchTrialUnitId, 1);
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              } else {
                this.$msgw(data.message);
              }
            })
            .catch(err => {
              this.$hideLoading("rgba");
              console.log(err, "/remoteTrial/deleteTrialRoomInfo");
              this.$msge("服务器异常，请稍后重试");
            });
        })
        .catch(() => {});
    },
    //table表格索引值
    indexMethod(index) {
      return (this.pageIndex - 1) * 10 + index + 1; //当前条数
    },
    handleCurrentChange(val) {
      console.log(val);
      this.getTableData(this.touchTrialUnitId, val);
    }
  }
};
</script>

<style lang="less">
@import url("../css/common.less");
.remotetabpane3 {
  min-height:7rem;
  .mr();
  .flex-div{
    .fl();
    .flex-left {
      width: 3.1rem;
      max-height:7rem;
      margin-right: 0.1rem;
      background: #eceff0;
      overflow: auto;
      .el-tree {
        overflow: auto;
        background: #eceff0;
        .el-tree-node__content {
          height: 0.5rem;
        }
        .el-tree-node__label {
          width: 2.7rem;
          overflow: auto;
          .f18();
        }
      }
    }
    .flex-right {
      width: 13rem;
      .top {
        margin-bottom: 0.2rem;
        .fb();
        .le {
          .fl();
          cursor: pointer;
          & > div.add {
            img {
              width: 0.8rem;
            }
          }
        }
        .ri {
          /*text*/
          .el-input {
            width: 2.36rem;
            margin-right: 0.1rem;

            .el-input__inner {
              height: 0.4rem;
              line-height: 0.4rem;
              padding: 0 0.15rem;
              .f18();
            }
          }
          /*button*/
          .el-button {
            position: relative;
            top: -0.02rem;
            width: 0.9rem;
            line-height: 0.36rem;
            padding: 0;

            .el-icon-search {
              .f18();
              color: #fff;
            }

            span {
              .f18();
              color: #fff;
            }
          }
        }
      }
      /*内容展示区域*/
      @import url("../css/element.less");
    }
  }
}
</style>
<style scoped>
.up {
  z-index: 100;
  position: fixed;
  width: 16.6rem;
  bottom: 0;
  left: 6rem;
  background: #f9f9f9;
  /*text-align: center;*/
}
</style>
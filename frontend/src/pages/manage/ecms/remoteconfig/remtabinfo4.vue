<template>
  <div class="remtabinfo4">
    <infoAlertFour4 ref="infoAlertFour4" />
    <div class="table-style">
      <div class="add">
        <img @click="add1()" src="../images/yingyongpeizhi/add.png" />
      </div>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="clientTypeName" label="客户端类型" show-overflow-tooltip></el-table-column>
        <el-table-column prop="clientName" label="客户端名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="netWorkIp" label="网卡IP" show-overflow-tooltip></el-table-column>
        <el-table-column prop="macAddress" label="网卡MAC地址" show-overflow-tooltip></el-table-column>
        <el-table-column
          prop="checkRecordNote"
          label="是否校验笔录"
          :formatter="checkRecordNote"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="description" label="描述" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="isedit">
              <span @click="edit1(scope.$index,scope.row)">修改</span>
              <span @click="delinfo1(scope.$index,scope.row)">删除</span>
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
  </div>
</template>

<script>
import infoAlertFour4 from "./infoAlertFour4";
import { mapState } from "vuex";

export default {
  name: "remtabinfo4",
  components: {
    infoAlertFour4
  },
  data() {
    return {
      total: "0",
      pageIndex: "1",
      pageSize: "10",
      trialRoomId: "",
      tableData: []
    };
  },
  created() {},
  mounted() {},
  destroyed() {},
  computed: {},
  methods: {
    receiveTrialRoomId(trialRoomId) {
      console.log(trialRoomId);
      this.trialRoomId = trialRoomId;
      this.tableData = [];
      this.total = 0;
      this.httpinfo();
    },
    checkRecordNote(index, row) {
      return row.checkNoteRecord ? "是" : "否";
    },
    httpinfo() {
      let _this = this;
      _this.$http
        .post("/courtRoomConfig/getCourtRoomClientInfo", {
          id: this.trialRoomId, //法庭id
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        })
        .then(data => {
          console.log("法庭客户端配置", data);
          if (data.code === 200) {
            _this.total = data.count;
            _this.tableData = data.data;
          } else {
            _this.$msgw(data.message);
          }
        })
        .catch(err => {
          console.log(err, "/courtRoomConfig/getCourtRoomClientInfo");
          _this.$msge("服务器异常，请稍后重试");
        });
    },
    add1() {
      //调用子组件方法
      console.log(this.trialRoomId);
      this.$refs.infoAlertFour4.receiveID(this.trialRoomId);
      this.$refs.infoAlertFour4.show();
    },
    edit1(index, row) {
      this.$refs.infoAlertFour4.show(row);
    },
    delinfo1(index, row) {
      let _this = this;
      _this
        .$confirm("确认删除", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          _this.$http
            .post("/remoteTrial/deleteTrialRoomClientInfo", {
              clientIds: row.clientId //要删除的客户端id
            })
            .then(data => {
              if (data.code === 200) {
                //_this.tableData.splice(index,1)//物理删除
                _this.$msgs("删除成功!");
                //计算总页数
                if (
                  index == 0 &&
                  Math.ceil(Number(_this.total) / 10) ==
                    Number(_this.pageIndex) &&
                  _this.pageIndex != 1 &&
                  Number(_this.total) % 10 == 1
                ) {
                  _this.pageIndex == Number(_this.pageIndex) - 1;
                }
                _this.httpinfo();
              } else {
                _this.$msgw(data.message);
              }
            })
            .catch(err => {
              console.log(err, "/remoteTrial/deleteTrialRoomClientInfo");
              _this.$msge("服务器异常，请稍后重试");
            });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="less">
@import url("../css/common.less");
.remtabinfo4 {
  .add {
    cursor: pointer;
    margin-bottom: 0.1rem;
    padding-left: 0.15rem;
    img {
      width: 0.8rem;
    }
  }
  /*面板行高*/
  .el-collapse-item__content {
    line-height: 1.5;
  }
  @import url("../css/element.less");
  .el-collapse-item__header {
    padding-left: 0.1rem;
    .f18();
    font-weight: bold;
  }
}
</style>
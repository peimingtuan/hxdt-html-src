<template>
  <div class="checkMembers">
    <!--弹框-->
    <transition name="slide-fade">
      <div class="alert-window2" v-show="ischeckMembers">
        <div class="main">
          <img class="imgloge" src="../images/CaseManagement/casemanage.png" />
          <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
          <AlertleftTile :text="text" :text2="text2" />
          <div class="contentid">
            <div class="casetable">
              <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column label="序号" width="80" type="index"></el-table-column>
                <el-table-column prop="userName" label="姓名" show-overflow-tooltip></el-table-column>
                <el-table-column prop="sex" label="性别" show-overflow-tooltip></el-table-column>
                <el-table-column prop="departmentName" label="部门" show-overflow-tooltip></el-table-column>
                <el-table-column prop="duty" label="职务" show-overflow-tooltip></el-table-column>
                <el-table-column prop="unit" label="单位" show-overflow-tooltip></el-table-column>
                <el-table-column prop="jobtype" label="用户类型" show-overflow-tooltip></el-table-column>
              </el-table>
            </div>
            <div class="up">
              <el-pagination
                class="page"
                background
                @current-change="handleSizeChange"
                :current-page="pageIndex"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="pagecount"
              ></el-pagination>
            </div>
          </div>
          <div class="bt">
            <div class="qure" @click="qure">
              <img src="../images/courtsupervision/sure.png" />确定
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
// const tableData=require('../testdata/OverdueScheduling')
export default {
  name: "checkMembers",
  props: {
    ischeckMembers: Boolean,
    departmentId: String
  },
  components: {
    AlertleftTile
  },
  data() {
    return {
      pagecount:null,
      departmentId: "",
      pageSize:10,//一页个数
      pageIndex:1,//页数
      labelPosition: "left", //form表单左侧靠齐
      text: "查看部门成员",
      text2: "成员信息",
      tableData: null,
      formLabelAlign: {
        name: ""
      }
    };
  },
  watch: {
    departmentId(val) {
      this.departmentId = val;
      this.getDepartmentPersonPageInfos()
    }
  },
  beforeCreate() {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    //注册弹框显示与否事件
    showAlert() {
      this.$emit("Relatedcaseshow");
    },
    qure() {
      this.$emit("sure");
    },
    cancel() {
      this.$emit("cancel");
    },
    handleSizeChange(pageIndex){
        this.pageIndex = pageIndex;
        this.getDepartmentPersonPageInfos()
    },
    //9.12查询部门下人员分页信息
    getDepartmentPersonPageInfos() {
      let _this = this;
      _this.$http
        .post("/departmentManager/getDepartmentPersonPageInfos", {
          id: _this.departmentId,
          pageSize:_this.pageSize,
          pageIndex:_this.pageIndex
        })
        .then(data => {
          console.log(data);
          if (data.code === 200) {
              console.log(data)
              this.tableData = data.data;
              this.pagecount = data.count;
          }
        })
        .catch(err => {
          console.log(
            err,
            "/departmentManager/getDepartmentPersonPageInfos"
          );
          _this.$msge("服务器异常，请稍后重试");
        });
    }
  }
};
</script>
    
    <style lang="less">
@import url("../css/common.less");
.checkMembers {
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
    top: 1rem;
    margin-left: -7rem;
    /*margin-top:-3.425rem;*/
    border-radius: 2px;
    /*左上方login*/
    img.imgloge {
      position: absolute;
      top: 0.2rem;
      left: 0.2rem;
      width: 0.4rem;
    }
    /*关闭弹框*/
    img.alert-close {
      width: 0.18rem;
      position: absolute;
      top: 0.25rem;
      right: 0.35rem;
      cursor: pointer;
      z-index: 102;
    }
    .contentid {
        display: flex;
        flex-direction: column;
        justify-content:space-around;
      width: 100%;
      background: #eceff0;
      min-height: 4rem;
      padding: 0 0.2rem;
    }
    .up {
        
      /*分页*/
      .page {
        margin: 0.2rem 0;
        span {
          font-size: 0.18rem;
        }
        input {
          font-size: 0.18rem;
        }
        text-align: center;
        li.number {
          font-size: 0.18rem;
        }
      }
    }
    .casetable {
      margin-top: 0.2rem;
      cursor: pointer;
      th,
      td {
        text-align: center;
      }
      th {
        background: #cbe5f3;
        div {
          .f20();
        }
      }
      td {
        div {
          .f18();
          span {
            .f18();
          }
        }
        div.isedit span {
          color: #409eff;
          margin-right: 0.1rem;
        }
      }
      /*暂无数据*/
      .el-table__empty-text {
        .f18();
      }
    }
    /*底部*/
    .bt {
      width: 100%;
      margin: 0.2rem 0;
      & > div {
        cursor: pointer;
        .f20();
        line-height: 0.3rem;
      }
      img {
        width: 0.2rem;
        margin-right: 0.05rem;
      }
      .fc();
      .qure {
        color: #45a1d1;
        margin-right: 0.5rem;
      }
    }
  }
}
</style>
<template>
  <div class="musicvideopane1">
    <!--搜索-->
    <div class="head-search">
      <div class="div1">
        <div class="choice">
          <el-select v-model="year" placeholder="选择年份">
            <el-option
              v-for="item in yearlist"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
          <el-select v-model="courtUnitPronoun" @focus="courtUnitPronounClick()" clearable filterable placeholder="选择法院代字">
            <el-option
              v-for="item in courtUnitPronounlist"
              v-if="item.courtPronoun"
              :key="item.courtCode"
              :label="item.courtPronoun"
              :value="item.courtPronoun"
            ></el-option>
          </el-select>
          <el-select v-model="caseTypePronoun" @focus="caseTypePronounClick()" clearable filterable placeholder="选择案件类型代字">
            <el-option
                    v-for="item in caseTypePronounlist"
                    v-if="item.caseTypePronoun"
                    :key="item.caseTypeId"
                    :label="item.caseTypePronoun"
                    :value="item.caseTypePronoun"
            ></el-option>
          </el-select>
          <el-input v-model="caseNum" placeholder></el-input>号
        </div>
        <div class="date-d">
          <el-date-picker
            v-model="startCreateCaseDate"
            type="date"
            :clearable="true"
            :picker-options="pickerOptions0"
          ></el-date-picker>至
          <el-date-picker
            v-model="endCreateCaseDate"
            type="date"
            :clearable="true"
            :picker-options="pickerOptions1"
          ></el-date-picker>
        </div>
      </div>
      <div class="div2">
        <el-input v-model="partyDes" class="d-s-r" placeholder="当事人"></el-input>
        <div class="case-yo">
          <!--<el-input v-model="causeStr" placeholder="立案人案由"></el-input>-->
          <el-select
                  v-model.trim="causeStr"
                  filterable
                  remote
                  clearable
                  reserve-keyword
                  placeholder="案由"
                  :remote-method="remoteMethod"
                  :loading="loading">
            <el-option
                    v-for="item in options"
                    :key="item.causeCode"
                    @click.native="selectChangecauseCode(item.causeCode)"
                    :label="item.causeName"
                    :value="item.causeName">
            </el-option>
          </el-select>
          <span class="span1" @click="choicecauseStr">...</span>
        </div>
        <el-select v-model="departmentId" @focus="departmentClick()" clearable filterable placeholder="承办部门">
          <el-option
                  v-for="item in departmentlist"
                  v-if="item.departmentName"
                  :key="item.departmentId"
                  :label="item.departmentName"
                  :value="item.departmentId"
          ></el-option>
        </el-select>
        <el-select v-model="undertakerId" @focus="userListClick()" clearable filterable placeholder="承办法官">
          <el-option
            v-for="item in personinfolist"
            v-if="item.userName"
            :key="item.userId"
            :label="item.userName"
            :value="item.userId"
          ></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>
    </div>
    <!--内容-->
    <div class="table-style">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index" label="序号" width="80px" :index="indexMethod"></el-table-column>
        <el-table-column prop="caseNumber" label="案号" width="280px"></el-table-column>
        <el-table-column prop="causeStr" label="案由" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createCaseDate" label="立案日期" show-overflow-tooltip></el-table-column>
        <!--暂时去掉-->
        <!--<el-table-column label="是否刻录" show-overflow-tooltip>-->
        <!--<template slot-scope="scope">-->
        <!--<span v-if="scope.row.isBurn==0">未刻录</span>-->
        <!--<span v-else-if="scope.row.isBurn==1">已刻录</span>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column prop="departmentName" label="承办部门" show-overflow-tooltip></el-table-column>
        <el-table-column prop="undertakerName" label="承办法官" show-overflow-tooltip></el-table-column>
        <el-table-column prop="presidingJudge" label="审判长/员" show-overflow-tooltip></el-table-column>
        <el-table-column prop="partyDes" label="当事人" show-overflow-tooltip></el-table-column>
        <!--<el-table-column prop="startTrialTime" label="开庭次数"></el-table-column>-->
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="isedit">
              <span @click="handleGoods(scope.row)">播放</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--底部-->
    <div class="up">
      <!--分页-->
      <el-pagination
        class="page"
        background
        @current-change="handleCurrentChange"
        :current-page=pageIndex
        :page-size=10
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!--案由选择弹框-->
    <eltreeAlert ref="eltreeAlert" />
    <!--播放列表弹框-->
    <videoplayerAlert ref="videoplayerAlert" @showcool="showcool" />
  </div>
</template>

<script>
import { musicvideoment } from "../js/datajson";
import FoundationTools from "../../../../js/functionAjax";
import videoplayerAlert from "./videoplayerAlert"; //播放列表弹框
import eltreeAlert from "../component/eltreeAlert"; //案由选择弹框
import { mapState,mapActions } from "vuex";
export default {
  name: "musicvideopane1",
  components: {
    videoplayerAlert,
    eltreeAlert
  },
  data() {
    return {
      yearlist: musicvideoment.year, //年份select,
      options:[],//案由树
      tableData: [], //按案件查询列表,
      year: "", //年份
      courtUnitPronoun: "", //法院代字
      caseTypePronoun: "", //案件类型代字
      caseNum: "", //案件编号
      startCreateCaseDate: "", //起始立案日期（搜索用）
      endCreateCaseDate: "", //结束立案日期（搜索用）
      partyDes: "", //当事人名称
      causeId: "", //立案案由Id
      causeStr: "", //立案案由名称（单选）
      departmentId: "", //承办部门id
      undertakerId: "", //承办法官id
      lastJudgeName: "", //审判长/员id
      total: 0, //总条数
      pageIndex: 1, //当前页码
      pageSize: 10, //每页大小
      //开始日期
      pickerOptions0: {
        disabledDate: time => {
          if (this.endCreateCaseDate) {
            return time.getTime() > this.endCreateCaseDate;
          }
        }
      },
      //结束日期
      pickerOptions1: {
        disabledDate: time => {
          if (this.startCreateCaseDate) {
            return time.getTime() < this.startCreateCaseDate;
          }
        }
      },
      multipleSelection: [] //表格存值
    };
  },
  watch: {},
  created() {},
  mounted() {

  },
  destroyed() {},
  computed: {
    ...mapState("musicvideoment", [
      "courtUnitPronounlist",
      "caseTypePronounlist",
      "departmentlist",
      "personinfolist"
    ])
  },
  methods: {
    ...mapActions("musicvideoment",[
            "getUnit",
            "getcaseType",
            "getDepartmentByCourt",
            "getUserByCourt",
    ]),
    courtUnitPronounClick(){
      if(this.courtUnitPronounlist.length===0){
        this.$showToast('加载中...')
        this.getUnit(this).then(()=>{
          this.$nextTick(()=>{
            this.$hideToast()
          })
        }).catch(err=>{
          this.$hideToast()
        })
      }
    },
    caseTypePronounClick(){
      if(this.caseTypePronounlist.length===0){
        this.$showToast('加载中...')
        this.getcaseType(this).then(()=>{
          this.$nextTick(()=>{
            this.$hideToast()
          })
        }).catch(err=>{
          this.$hideToast()
        })
      }
    },
    departmentClick(){
      if(this.departmentlist.length===0){
        this.$showToast('加载中...')
        this.getDepartmentByCourt(this).then(()=>{
          this.$nextTick(()=>{
            this.$hideToast()
          })
        }).catch(err=>{
          this.$hideToast()
        })
      }
    },
    userListClick(){
      if(this.personinfolist.length===0){
        this.$showToast('加载中...')
        this.getUserByCourt(this).then(()=>{
          this.$nextTick(()=>{
            this.$hideToast()
          })
        }).catch(err=>{
          this.$hideToast()
        })
      }
    },
    //案由模糊搜索
    remoteMethod(causeName){
      if(!causeName){
        this.causeStr=''
        this.causeId=''
        this.options=[]
        return
      }
      const that=this;
      that.$http.post("/baseInfo/getCauseStrByName",{causeName})
              .then(data => {
                if (data.code === 200) {
                    that.options=data.data;
                } else {
                  that.$msgw(data.message);
                }
              })
              .catch(err => {
                console.log(err, "/baseInfo/getCauseStrByName");
              });

    },
    selectChangecauseCode(causeCode){
      this.causeId=causeCode;
    },
    //案由选择
    choicecauseStr() {
      this.$refs.eltreeAlert.show();
    },
    //案由选择确定
    sure() {

    },
    //搜索
    search() {
      this.pageIndex = 1;
      this.getcaselist();
    },
    //获取案件信息列表
    getcaselist() {
      let {
        year,
        courtUnitPronoun,
        caseTypePronoun,
        caseNum,
        startCreateCaseDate,
        endCreateCaseDate,
        partyDes,
        causeId,
        causeStr,
        departmentId,
        undertakerId,
        lastJudgeName,
        pageIndex,
        pageSize
      } = this;
      let _this = this;
      _this.$showLoading("rgba");
      if (startCreateCaseDate)
        startCreateCaseDate = FoundationTools.getFormatDate2(
          startCreateCaseDate
        );
      if (endCreateCaseDate)
        endCreateCaseDate = FoundationTools.getFormatDate2(endCreateCaseDate);
      if (caseNum == "") causeId = "";
      if (year == "全部") year = "";
      if (courtUnitPronoun == "全部") courtUnitPronoun = "";
      if (caseTypePronoun == "全部") caseTypePronoun = "";
      if (departmentId == "1") departmentId = "";
      if (undertakerId == "01") undertakerId = "";
      if (lastJudgeName == "01") lastJudgeName = "";
      //根据查询条件获取案件(案件无是否刻录)
      _this.$http
        .post("/videoManager/searchVideoCaseInfo", {
          year, //年份
          courtUnitPronoun, //法院代字
          caseTypePronoun, //案件类型代字
          caseNum, //案件编号
          startCreateCaseDate, //起始立案日期（搜索用）
          endCreateCaseDate, //结束立案日期（搜索用）
          partyDes, //当事人名称
          causeId, //立案案由Id
          causeStr, //立案案由名称（单选）
          departmentId, //承办部门id
          undertakerId, //承办法官id
          lastJudgeName, //审判长/员id
          pageIndex, //当前页码
          pageSize //每页大小
        })
        .then(data => {
          _this.$hideLoading("rgba");
          if (data.code === 200) {
            _this.total = data.count;
            _this.tableData = data.data;
          } else {
            _this.$msgw(data.message);
          }
        })
        .catch(err => {
          _this.$hideLoading("rgba");
          console.log(err, "/caseManage/searchCaseInfo");
          _this.$msge("服务器异常，请稍后重试");
        });
    },
    //table
    //table表格索引值
    indexMethod(index) {
      return (this.pageIndex - 1) * 10 + index + 1; //当前条数
    },
    //播放单元格
    handleGoods(row) {
      //调用子组件弹框方法
      this.$refs.videoplayerAlert.show(row,1);
    },
    //checkbox,当选择项发生变化时会触发该事件
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
      this.$emit("passToPersent", this.multipleSelection);
    },
    //分页信息
    //当前页数
    handleCurrentChange(page) {
      this.pageIndex = page;
      this.getcaselist();
    }
  }
};
</script>

<style lang="less">
@import url("../css/common.less");
.musicvideopane1 {
  .mr();
  .head-search {
    .div1 {
      .fb();
      /*法院选择*/
      .choice {
        .f18();
        /*select*/
        .el-select {
          width: 2rem;
          margin-right: 0.1rem;
          .el-input--suffix .el-input__inner {
            height: 0.4rem;
            line-height: 0.4rem;
            padding: 0 0.3rem 0 0.15rem;
            .f18();
          }
          .el-input__icon {
            .wh(0.25rem, 100%);
            text-align: center;
            line-height: 0.4rem;
          }
        }
        /*text*/
        .el-input {
          width: 2rem;
          margin-right: 0.1rem;
          .el-input__inner {
            height: 0.4rem;
            line-height: 0.4rem;
            padding: 0 0.15rem;
            .f18();
          }
        }
      }
      /*裁判日期*/
      .date-d {
        .f18();
        .el-input {
          width: 3.4rem;
          .el-input__inner {
            .wh(3.4rem, 0.4rem);
            line-height: 0.4rem;
            .f20();
            padding: 0 0.2rem 0 0.4rem;
          }
        }
        /*矢量图标*/
        .el-input__icon {
          width: 0.25rem;
          line-height: 0.4rem;
          color: #e7e9ee;
        }
        .el-icon-date:before {
          font-size: 0.18rem;
        }
      }
    }
    .div2 {
      margin-top: 0.15rem;
      .fl-v();
      /*当事人*/
      .d-s-r {
        width: 1.45rem !important;
      }
      /*立案案由*/
      .case-yo {
        position: relative;
        overflow: hidden;
        .el-select{
          width: 3.15rem;
        }
        .el-input {
          width: 3.15rem !important;
          .el-input__inner {
            padding: 0 0.35rem 0 0.15rem !important;
          }
        }
        .el-input__suffix{
          right:.4rem;
        }
        .span1{
          position: absolute;
          right: 0.1rem;
          top: -0.1rem;
          cursor: pointer;
          .f18();
          width: 0.4rem;
          line-height: 0.5rem;
          text-align: center;
          display: inline-block;
        }
      }
      /*text*/
      .el-input {
        width: 2.38rem;
        margin-right: 0.1rem;
        .el-input__inner {
          height: 0.4rem;
          line-height: 0.4rem;
          padding: 0 0.15rem;
          .f18();
        }
      }
      /*select*/
      .el-select {
        width: 2.38rem;
        margin-right: 0.1rem;
        .el-input--suffix .el-input__inner {
          height: 0.4rem;
          line-height: 0.4rem;
          padding: 0 0.3rem 0 0.15rem;
          .f18();
        }
        .el-input__icon {
          .wh(0.25rem, 100%);
          text-align: center;
          line-height: 0.4rem;
        }
      }
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
  /*内容区域*/
  .table-style {
    margin-top: 0.2rem;
  }
  @import url("../css/element.less");
}
</style>
<style scoped>
@import url("../css/uppage.less");
</style>

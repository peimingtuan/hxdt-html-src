<template>
  <div class="musicvideopane2">
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
        <el-select v-model="courtRoomId" @focus="courtRoomClick()" clearable filterable placeholder="开庭地点">
          <el-option
            v-for="item in courtRoomaddress"
            v-if="item.courtRoomName"
            :key="item.courtRoomId"
            :label="item.courtRoomName"
            :value="item.courtRoomId"
          ></el-option>
        </el-select>
        <div class="case-yo">
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
        <el-select v-model="clerkId" @focus="userListClick()" clearable filterable placeholder="书记员">
          <el-option
                  v-for="item in personinfolist"
                  v-if="item.userName"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId"
          ></el-option>
        </el-select>
        <el-select v-model="isBurn" placeholder="是否刻录">
          <el-option v-for="item in burnlist" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
        <el-table-column type="selection" show-overflow-tooltip></el-table-column>
        <el-table-column type="index" label="序号" width="80px" :index="indexMethod"></el-table-column>
        <el-table-column prop="caseNumber" label="案号" width="280px"></el-table-column>
        <el-table-column prop="courtTime" label="庭次" show-overflow-tooltip></el-table-column>
        <el-table-column prop="causeStr" label="案由" width="150px" show-overflow-tooltip></el-table-column>
        <el-table-column label="是否刻录" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.burn==1">已刻录</span>
            <span v-else-if="scope.row.burn==2">未刻录</span>
            <span v-else-if="scope.row.burn==3">部分刻录</span>
          </template>
        </el-table-column>
        <el-table-column prop="departmentName" label="承办部门" width="150px" show-overflow-tooltip></el-table-column>
        <el-table-column prop="undertakerName" label="承办法官" show-overflow-tooltip></el-table-column>
        <!--<el-table-column prop="presidingJudge" label="审判长" show-overflow-tooltip></el-table-column>-->
        <el-table-column prop="partyDes" label="当事人" width="150px" show-overflow-tooltip></el-table-column>
        <el-table-column prop="clerkName" label="书记员" show-overflow-tooltip></el-table-column>
        <el-table-column label="开庭时间" width="200px" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.factStartDate}} {{scope.row.factStartTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="开庭状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.trialStatus | trialStatusselect}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="courtRoomName" label="开庭地点" show-overflow-tooltip></el-table-column>
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
    <videoplayerAlert ref="videoplayerAlert" />
  </div>
</template>

<script>
import { musicvideoment } from "../js/datajson";
import FoundationTools from "../../../../js/functionAjax";
import videoplayerAlert from "./videoplayerAlert"; //播放列表弹框
import eltreeAlert from "../component/eltreeAlert"; //案由选择弹框
import { mapState,mapActions } from "vuex";
export default {
  name: "musicvideopane2",
  components: {
    videoplayerAlert,
    eltreeAlert
  },
  data() {
    return {
      options: [],
      yearlist: musicvideoment.year, //年份select,
      burnlist: musicvideoment.isburn, //是否刻录select,
      tableData: [], //按排期查询列表,
      year: "", //年份
      courtUnitPronoun: "", //法院代字
      caseTypePronoun: "", //案件类型代字
      courtRoomId: "", //开庭地点
      caseNum: "", //案件编号
      startCreateCaseDate: "", //起始立案日期（搜索用）
      endCreateCaseDate: "", //结束立案日期（搜索用）
      partyDes: "", //当事人名称
      causeId: "", //立案案由Id
      causeStr: "", //立案案由名称（单选）
      departmentId: "", //承办部门id
      undertakerId: "", //承办法官id
      presidingJudgeId: "", //审判长/员id
      clerkId: "", //书记员id
      total: 0, //总条数
      pageIndex: 1, //当前页码
      pageSize: 10, //每页大小
      isBurn: "", //是否刻录
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
  created() {

  },
  mounted() {

  },
  destroyed() {},
  filters:{
    trialStatusselect(v){
      let s='';
      switch(Number(v)){
        case 1:
          s='等待开庭';
          break;
        case 2:
          s='正在开庭';
          break;
        case 3:
          s='庭审结束';
          break;
        case 4:
          s='休庭';
          break;
      }
      return s
    }
  },
  computed: {
    ...mapState("musicvideoment", [
      "courtUnitPronounlist",
      "caseTypePronounlist",
      "departmentlist",
      "personinfolist",
      "courtRoomaddress"
    ])
  },
  methods: {
    ...mapActions("musicvideoment",[
      "getUnit",
      "getcaseType",
      "getDepartmentByCourt",
      "getUserByCourt",
      "getCourtRooms"
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
        this.$showToast( '加载中...')
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
    courtRoomClick(){
      if(this.courtRoomaddress.length===0){
        this.$showToast('加载中...')
        this.getCourtRooms(this).then(()=>{
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
    //获取立案案由
    getcaseinfo(causeCode) {
      let _this = this;
      return _this.$http
        .post("/getCauseStr", {
          causeCode //案由代码，第一次为0
        })
        .then(data => {
          if (data.code === 200) {
            // if(causeCode===200){
            _this.options = data.data;
            _this.options.map(item => {
              if (item.leaf === false) item.parent = [];
              return item;
            });
            // }else{
            //     let node=data.data;
            //         node.map(item=>{
            //             if(item.leaf===false)item.parent=[]
            //             return item
            //         });
            //         return node;
            // }
          } else {
            _this.$msgw(data.message);
          }
        })
        .catch(err => {
          _this.$msge("服务器异常，请稍后重试");
        });
    },
    //案由多级选择器
    handleItemChange(val) {
      let that = this;
      //递归
      let parentNode = null,
        node = null;
      function getNode(json, nodeid) {
        for (let i = 0; i < json.length; i++) {
          if (node) break;
          let obj = json[i];
          //没有就下一个
          if (!obj || !obj.causeCode) {
            continue;
          }
          //有的话,一直递归下去
          if (obj.causeCode == nodeid) {
            node = obj; //找到了与nodeid匹配的节点，结束递归
            // that.getcaseinfo(nodeid).then(data=>{
            //     json[i].parent=data;
            // });
            // json[i].parent=[{
            //     causeCode:'3',
            //     leaf:false,
            //     causeName: '浙江2',
            // }]
            json[i].parent = getcaseinfo(nodeid);
            console.log(that.options);
            break;
          } else {
            //3.如果有子节点就开始找
            if (obj.leaf === false) {
              //4.递归前，记录当前节点，作为parent 父亲
              parentNode = obj;
              //递归往下找
              getNode(obj.parent, nodeid);
            } else {
              //跳出当前递归，返回上层递归
              continue;
            }
          }
        }
        //5.如果木有找到父节点，置为null，因为没有父亲
        if (!node) {
          parentNode = null;
        }
        //6.返回结果obj
        return {
          parentNode: parentNode,
          node: node
        };
      }
      // let name=getNode(this.options,2);
      // console.log(name)
      // setTimeout(() => {
      //     if (val.indexOf('江苏') > -1 && !this.options[0].parent.length) {
      //         this.options[0].parent = [{
      //             causeName: '南京',
      //             causeCode:'1-1'
      //         }];
      //     } else if (val.indexOf('浙江') > -1 && !this.options[1].parent.length) {
      //         this.options[1].parent = [{
      //             causeName: '杭州',
      //             causeCode:'2-1'
      //         }];
      //     }
      // }, 300);
    },
    changeclick(node, index) {
      //当前选中的项
      console.log(node, index);
      //this.selectlist=node;
    },
    //案由选择
    choicecauseStr() {
      this.$refs.eltreeAlert.show();
    },
    //案由选择确定
    sure() {},
    //搜索
    search() {
      this.pageIndex = 1;
      this.getcasesortlist();
    },
    //获取案件排期信息列表
    getcasesortlist() {
      let {
        year,
        courtUnitPronoun,
        caseTypePronoun,
        caseNum,
        startCreateCaseDate,
        endCreateCaseDate,
        courtRoomId,
        partyDes,
        causeId,
        causeStr,
        departmentId,
        undertakerId,
        presidingJudgeId,
        clerkId,
        isBurn,
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
      if (presidingJudgeId == "01") presidingJudgeId = "";
      if (clerkId == "01") clerkId = "";
      if (courtRoomId == "01") courtRoomId = "";
      if (isBurn == 0) isBurn = "";
      //根据查询条件获取案件(案件无是否刻录)
      _this.$http
        .post("/videoManager/searchVideoTrialPlan", {
          year, //年份
          courtUnitPronoun, //法院代字
          caseTypePronoun, //案件类型代字
          caseNum, //案件编号
          startCreateCaseDate, //起始立案日期（搜索用）
          endCreateCaseDate, //结束立案日期（搜索用）
          courtRoomId, //开庭地点
          partyDes, //当事人名称
          causeId, //立案案由Id
          causeStr, //立案案由名称（单选）
          departmentId, //承办部门id
          undertakerId, //承办法官id
          presidingJudgeId, //审判长/员id
          clerkId, //书记员id
          isBurn, //刻录
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
          console.log(err, "/caseManage/searchTrialPlan");
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
      this.$refs.videoplayerAlert.show(row,2);
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
      this.getcasesortlist();
    }
  }
};
</script>

<style lang="less">
@import url("../css/common.less");
.musicvideopane2 {
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
            height: 100%;
            width: 0.25rem;
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
            width: 3.4rem;
            height: 0.4rem;
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
      .fb();
      /*立案案由*/
      .case-yo {
        position: relative;
        overflow: hidden;
        .el-select{
          width:2rem;
        }
        .el-input {
          width: 2rem !important;
          .el-input__inner {
            padding: 0 0.35rem 0 0.15rem !important;
          }
        }
        .el-input__suffix{
          right:.4rem;
        }
        .span1 {
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
      /*立案案由*/
      /*.el-cascader{*/
      /*line-height:.4rem;*/
      /*.el-input__icon{*/
      /*width: .25rem;*/
      /*line-height: .4rem;*/
      /*color:#c0c4cc;*/
      /*}*/
      /*}*/
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
          height: 100%;
          width: 0.25rem;
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
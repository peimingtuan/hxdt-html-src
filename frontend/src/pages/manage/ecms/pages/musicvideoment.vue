<template>
  <div class="musicvideoment">
    <!--头部-->
    <div class="head-top">
      <div class="le">
        <img src="../images/yinshipinguanli/title.png" />
        庭审音视频管理
        <span>TING SHEN YIN SHI PIN GUAN LI</span>
      </div>
      <div class="ce">
        <el-radio v-model="radio" label="1" @change="radiochange">按案件查看</el-radio>
        <el-radio v-model="radio" label="2" @change="radiochange">按排期查看</el-radio>
      </div>
      <div class="ri">
        <el-button class="blu" @click="openimprint">刻录</el-button>
        <el-button class="blu" @click="downloadinit">下载</el-button>
        <el-button class="blu">导出列表</el-button>
      </div>
    </div>
    <div v-show="radio==1">
      <!--按案件查看-->
      <musicvideopane1 @passToPersent="change($event)" ref="musicvideopane1" />
    </div>
    <div v-show="radio==2">
      <!--按排期查看-->
      <musicvideopane2 @passToPersent="change($event)" ref="musicvideopane2" />
    </div>
    <!--视频刻录弹框-->
    <imprintAlert
      :alertshow="isimprint"
      @selectshow="imprintsure"
      @qure="imprintsure"
      @cancel="imprintsure"
      ref="imprintAlert"
    />
    <downloadAlert
      :alertshow="isDownload"
      @selectshow="downloadSure"
      @qure="downloadSure"
      @cancel="downloadSure"
      ref="downloadAlert"
    />
  </div>
</template>

<script>
import imprintAlert from "../musicvideoment/imprintAlert"; //视频刻录弹框
import downloadAlert from "../musicvideoment/downloadAlert"; //视频下载弹框
import musicvideopane1 from "../musicvideoment/musicvideopane1"; //按案件查看
import musicvideopane2 from "../musicvideoment/musicvideopane2"; //按排期查看
import {mapMutations} from "vuex";
export default {
  name: "musicvideoment",
  components: {
    imprintAlert,
    downloadAlert,
    musicvideopane1,
    musicvideopane2
  },
  data() {
    return {
      isimprint: false, //视频刻录弹框
      isDownload: false,
      radio: "1", //查看类型
      selectedLable: "1", // 选中的radio
      selectedData: "", // 选中的数据
      oldcourtCode:Number(sessionStorage.getItem('hx-lawcourtcode'))
    };
  },
  created() {
    this.$showLoading('rgba')
  },
  watch:{
    getn(v){
      if(v.name==='/indexmain/musicvideoment'){
        if(Number(sessionStorage.getItem('hx-lawcourtcode'))!==this.oldcourtCode){
          const _this=this;
          _this.$showLoading('rgba')
          _this.oldcourtCode=Number(sessionStorage.getItem('hx-lawcourtcode'));
          _this.setcourtUnitPronoun([]);
          _this.setcaseTypePronoun([]);
          _this.setdepartment([]);
          _this.setpersoninfo([]);
          _this.setcourtRoomaddress([]);
          _this.radio='1';
          _this.$refs.musicvideopane1.getcaselist()
        }
      }
    }
  },
  activated(){
    this.$showLoading('rgba')
    this.$refs.musicvideopane1.year='';
    this.$refs.musicvideopane1.courtUnitPronoun='';
    this.$refs.musicvideopane1.caseTypePronoun='';
    this.$refs.musicvideopane1.caseNum='';
    this.$refs.musicvideopane1.startCreateCaseDate='';
    this.$refs.musicvideopane1.endCreateCaseDate='';
    this.$refs.musicvideopane1.partyDes='';
    this.$refs.musicvideopane1.causeId='';
    this.$refs.musicvideopane1.causeStr='';
    this.$refs.musicvideopane1.departmentId='';
    this.$refs.musicvideopane1.undertakerId='';
    this.$refs.musicvideopane1.lastJudgeName='';
    this.$refs.musicvideopane1.pageIndex=1;
    const _this=this;
    _this.radio='1';
    if(Number(sessionStorage.getItem('hx-lawcourtcode'))!==this.oldcourtCode){
      _this.oldcourtCode=Number(sessionStorage.getItem('hx-lawcourtcode'));
      _this.setcourtUnitPronoun([]);
      _this.setcaseTypePronoun([]);
      _this.setdepartment([]);
      _this.setpersoninfo([]);
      _this.setcourtRoomaddress([]);
    }
    _this.$refs.musicvideopane1.getcaselist()
  },
  deactivated(){

  },
  mounted() {

  },
  destroyed() {},
  computed:{
    getn(){
      return this.$store.state.routeInfo
    }
  },
  methods: {
    ...mapMutations('indexmain',[
      "setcourtUnitPronoun",
      "setcaseTypePronoun",
      "setdepartment",
      "setpersoninfo",
      "setcourtRoomaddress"
    ]),
    //radio单选框
    radiochange(val) {
      this.selectedLable = val;
      if (val == 1) {
        this.$refs.musicvideopane1.year='';
        this.$refs.musicvideopane1.courtUnitPronoun='';
        this.$refs.musicvideopane1.caseTypePronoun='';
        this.$refs.musicvideopane1.caseNum='';
        this.$refs.musicvideopane1.startCreateCaseDate='';
        this.$refs.musicvideopane1.endCreateCaseDate='';
        this.$refs.musicvideopane1.partyDes='';
        this.$refs.musicvideopane1.causeId='';
        this.$refs.musicvideopane1.causeStr='';
        this.$refs.musicvideopane1.departmentId='';
        this.$refs.musicvideopane1.undertakerId='';
        this.$refs.musicvideopane1.lastJudgeName='';
        this.$refs.musicvideopane1.pageIndex=1;
        this.$refs.musicvideopane1.getcaselist();
      } //按案件查看
      else if (val == 2) {
        this.$refs.musicvideopane2.year='';
        this.$refs.musicvideopane2.courtUnitPronoun='';
        this.$refs.musicvideopane2.caseTypePronoun='';
        this.$refs.musicvideopane2.caseNum='';
        this.$refs.musicvideopane2.startCreateCaseDate='';
        this.$refs.musicvideopane2.endCreateCaseDate='';
        this.$refs.musicvideopane2.courtRoomId='';
        this.$refs.musicvideopane2.causeId='';
        this.$refs.musicvideopane2.causeStr='';
        this.$refs.musicvideopane2.departmentId='';
        this.$refs.musicvideopane2.undertakerId='';
        this.$refs.musicvideopane2.presidingJudgeId='';
        this.$refs.musicvideopane2.clerkId='';
        this.$refs.musicvideopane2.pageIndex=1;
        this.$refs.musicvideopane2.getcasesortlist();
      } //按排期查看
    },
    //打开视频刻录弹框
    openimprint() {
      if (this.selectedData.length > 0) {
        this.isimprint = true;
        this.$refs.imprintAlert.getTableData(
          this.selectedLable,
          this.selectedData
        );
      } else {
        this.$msgw("请选择至少一条需要刻录的案件");
      }
    },
    //确定关闭视频刻录弹框
    imprintsure() {
      this.isimprint = false;
      //this.$refs.imprintAlert.resetData("");
    },
    // 打开视频下载弹框
    downloadinit() {
      if (this.selectedData.length < 1) {
        this.$msgw("请选择一条需要下载的案件");
      } else if (this.selectedData.length > 1) {
        this.$msgw("只能选择一条需要下载的案件");
      } else {
        this.isDownload = true;
        this.$refs.downloadAlert.getTableData(
          this.selectedLable,
          this.selectedData
        );
      }
    },
    downloadSure() {
      this.isDownload = false;
      this.$refs.downloadAlert.resetData("");
    },
    change(data) {
      if (this.selectedLable == 1) {
        this.selectedData = this.$refs.musicvideopane1.multipleSelection;
      } //按案件查看
      else if (this.selectedLable == 2) {
        this.selectedData = this.$refs.musicvideopane2.multipleSelection;
      } //按排期查看
      console.log(this.selectedData);
    }
  }
};
</script>

<style lang="less">
@import url("../css/common.less");
.musicvideoment {
  padding: 0 0.2rem;
  height: 100%;
  /*头部*/
  .head-top {
    padding: 0.1rem 0;
    .fb();
    .le {
      .f20();
      img {
        width: 0.3rem;
      }

      span {
        margin-left: 0.05rem;
        .f14();
        color: #1296db;
      }
    }
    .ce {
      .el-radio {
        /*选框*/
        .el-radio__inner {
          width: 0.2rem;
          height: 0.2rem;
          &:after {
            width: 0.06rem;
            height: 0.06rem;
          }
        }
        /*文本*/
        .el-radio__label {
          .f18();
        }
      }
    }
    .ri {
      .el-button {
        width: 0.99rem;
        line-height: 0.37rem;
        padding: 0;
        span {
          .f16();
        }
      }
      .blu {
        background: #edf5ff;
        border: 1px solid #bedeff;
        span {
          color: #409eff;
        }
      }
    }
  }
}
</style>
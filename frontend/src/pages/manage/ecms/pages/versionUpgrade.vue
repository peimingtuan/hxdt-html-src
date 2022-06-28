<template>
  <div class="versionUpgrade">
    <!-- 头部始 -->
    <div class="head">
      <leftTile :imgurl="imgurl" :text="text" :text2="text2" />
    </div>
    <!-- 头部末 -->
    <!-- 表格始 -->
    <div class="table-style">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" show-overflow-tooltip></el-table-column>
        <el-table-column type="index" label="序号" width="100px" :index="indexMethod"></el-table-column>
        <el-table-column prop="softwareName" label="软件名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="version" label="版本号" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="isedit">
              <span @click="edit(scope.$index, scope.row)">修改</span>
              <span @click="downLoad(scope.$index, scope.row)">下载</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 表格末 -->
    <!-- 分页始 -->
    <div class="up">
      <!--分页-->
      <el-pagination
        @current-change="pageChange"
        class="page"
        :total="total"
        :current-page.sync="pageIndex"
        :page-size="pageSize"
        background
        layout="prev, pager, next,total"
      ></el-pagination>
    </div>
    <!-- 分页末 -->
    <!-- 修改弹框始 -->
    <updateVersionUpgrade
      ref="updateVersionUpgrade"
      :alertshow="ismain"
      @selectshow="ismain=false"
      @qure="updateFormSubmit"
      @cancel="ismain=false"
    ></updateVersionUpgrade>
    <!-- 修改弹框末 -->
  </div>
</template>
 
<script>
import leftTile from "../component/leftTile"; //主页左侧头部
import updateVersionUpgrade from "../versionUpgrade/updateVersionUpgrade";
import tool from "../js/tools.js";
export default {
  name: "versionUpgrade",
  data() {
    return {
      imgurl: require("../images/yingyongpeizhi/pingtaipeizhi3.png"),
      text: "版本升级管理",
      text2: "BAN BEN SHENG JI GUAN LI",
      ismain: false, //修改弹框
      tableData: [], //版本升级管理数据
      pageIndex: 1, //当前页数
      pageSize: 10, //每页限定获取20条记录
      total: 0, //记录的总条数
      multipleSelection: [] //表格选中的对象
    };
  },
  computed: {},
  components: {
    leftTile,
    updateVersionUpgrade
  },
  watch: {},
  mounted() {
    // 获取版本管理表格数据
    this.getTableData();
  },
  methods: {
    //获取表格数据
    getTableData() {
      let { pageIndex, pageSize } = this;
      let _this = this;
      _this.$showLoading("rgba");
      _this.$http
        .post("/softwareVersionManage/getSoftwareVersionList", {
          pageIndex, //当前页码
          pageSize //每页大小
        })
        .then(data => {
          _this.$hideLoading("rgba");
          if (data.code === 200) {
            console.log("-------");
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
    //table
    //table表格索引值
    indexMethod(index) {
      return (this.pageIndex - 1) * 10 + index + 1; //当前条数
    },
    //修改当前行信息  并且调用子组件的方法进行回填
    edit(index, row) {
      this.ismain = true;
      // //调用子组件方法
      this.$refs.updateVersionUpgrade.show(row);
      this.$refs.updateVersionUpgrade.$refs.upload.clearFiles();
    },
    // 保存修改信息
    updateFormSubmit() {
      //调用子组件方法
      let _this = this;
      _this.$refs.updateVersionUpgrade.saveinfo1();
    },
    //下载当前行内容
    downLoad(index, row) {
      // let _this = this;
      // _this
      //   .$confirm("确认下载该版本的软件", "提示", {
      //     confirmButtonText: "确定",
      //     cancelButtonText: "取消",
      //     type: "warning"
      //   })
      //   .then(() => {
      // let url = `${row.downloadUrl.split("/download")[0]}/download/${encodeURIComponent(row.downloadUrl.split("/")[5].split(".")[0])}.${row.downloadUrl.split(".")[4]}`
      // console.log(url)
      // tool.saveAs(url);
      if (row.downloadUrl.indexOf("download/") == -1) {
        this.$msge("目前没有相应的文件进行下载");
      } else {
        window.open(row.downloadUrl);
      }
      console.log(row.downloadUrl);

      // })
      // .catch(() => {});
    },
    //checkbox,当选择项发生变化时会触发该事件
    handleSelectionChange(val) {
      val.length > 0
        ? (this.multipleSelection = val)
        : (this.multipleSelection = []);
    },
    //分页信息
    //当前页数
    pageChange(val) {
      this.pageIndex = val;
      // 重新请求表格数据
      this.getTableData();
    }
  }
};
</script>
 
<style lang="less">
@import url("../css/common.less");
.versionUpgrade {
  .mr();
  padding: 0 0.2rem;
  .head {
    padding: 0.1rem 0;
    .fb();
    .add {
      cursor: pointer;
    }
  }
  @import url("../css/element.less");
}
</style>
<style lang="less" scoped>
.versionUpgrade {
  @import url("../css/uppage.less");
}
</style>

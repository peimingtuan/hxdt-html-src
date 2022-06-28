<template>
  <div class="remtabinfo3">
    先不做
    <!--<div class="add">-->
    <!--<img @click="add()" src="../images/yingyongpeizhi/add.png"/>-->
    <!--</div>-->
    <!--<div class="table-style">-->
    <!--<el-table ref="multipleTable" :data="tableData"-->
    <!--tooltip-effect="dark"-->
    <!--style="width: 100%"-->
    <!--@selection-change="handleSelectionChange">-->
    <!--<el-table-column type="selection"></el-table-column>-->
    <!--<el-table-column prop="clientTypeName" label="客户端类型">-->
    <!--</el-table-column>-->
    <!--<el-table-column prop="clientName" label="客户端名称" width="150px" show-overflow-tooltip>-->
    <!--</el-table-column>-->
    <!--<el-table-column prop="netWorkIp" label="网卡1IP">-->
    <!--</el-table-column>-->
    <!--<el-table-column prop="macAddress" label="网卡1MAC地址" show-overflow-tooltip>-->
    <!--</el-table-column>-->
    <!--<el-table-column label="是否校验笔录">-->
    <!--<template slot-scope="scope">-->
    <!--<span v-if="scope.row.checkRecordNote==0">是</span>-->
    <!--<span v-else>否</span>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--<el-table-column prop="description" label="描述" show-overflow-tooltip>-->
    <!--</el-table-column>-->
    <!--<el-table-column label="操作" show-overflow-tooltip>-->
    <!--<template slot-scope="scope">-->
    <!--<div class="isedit">-->
    <!--<span @click="edit(scope.$index,scope.row)">修改</span>-->
    <!--<span @click="delinfo(scope.$index,scope.row)">删除</span>-->
    <!--</div>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--</el-table>-->
    <!--</div>-->
    <!--<div class="up">-->
    <!--&lt;!&ndash;分页&ndash;&gt;-->
    <!--<el-pagination-->
    <!--class="page"-->
    <!--background-->
    <!--@current-change="handleCurrentChange"-->
    <!--:current-page=1-->
    <!--:page-size=10-->
    <!--layout="total, prev, pager, next, jumper"-->
    <!--:total=total>-->
    <!--</el-pagination>-->
    <!--</div>-->
    <!--二次添加弹框-->
    <infoAlert2 ref="infoAlert2" />
  </div>
</template>

<script>
//import infoAlert2 from "./infoAlert2" //二次添加弹框
import { mapState } from "vuex";
export default {
  name: "remtabinfo3",
  components: {
    //infoAlert2
  },
  data() {
    return {
      tableData: [], //客户端信息列表,
      total: 0, //总条数
      pageIndex: 1, //当前页码
      pageSize: 10, //每页大小
      multipleSelection: [] //表格存值
    };
  },
  created() {},
  mounted() {},
  destroyed() {},
  computed: {

  },
  methods: {

  }
};
</script>

<style lang="less">
.remtabinfo3 {
  .add {
    cursor: pointer;
    margin-bottom: 0.1rem;
    img {
      width: 0.8rem;
    }
  }
  .table-style {
    max-height: 5rem;
    overflow: auto;
  }
  @import url("../css/element.less");
}
</style>
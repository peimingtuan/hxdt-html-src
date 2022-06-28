<template>
    <div class="tabpaneOne2">
        <div class="table-style">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    @cell-click="cellClick"
                    @select="selectcheck"
                    @select-all="selecAlltcheck"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column type="index" width="100px" label="序号">
                    <!--<template slot-scope="scope">{{scope.row.$index}}</template>-->
                </el-table-column>
                <el-table-column prop="caseNumber" label="客户端名称" width="150px" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="caseAyStr" label="客户端IP">
                </el-table-column>
                <el-table-column prop="caseNumber" label="客户端端口号" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="caseNumber" label="显示法庭数" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="caseNumber" label="是否本地文件播放" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="caseNumber" label="说明" show-overflow-tooltip>
                </el-table-column>
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
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page=1
                    :page-size=10
                    layout="total, prev, pager, next, jumper"
                    :total=0>
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import $ from "jquery"
    //import {outerring} from "../outerring/datajson"
    export default {
        name: "tabpaneOne2",
        data() {
            return {
                ismain:false,
                input:"",//搜索
                //tableData:outerring.info,//庭室配置管理列表,
                tableData:[],
            }
        },
        beforeCreate() {

        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            //修改当前行信息
            edit(){
                this.ismain=true;
            },
            //删除当前行内容
            delinfo(){
                this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });
            }
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .tabpaneOne2{
        .mr();
        /*内容展示区域*/
        @import url('../css/element.less');
    }
</style>
<style scoped>
    @import url('../css/uppage.less');
</style>
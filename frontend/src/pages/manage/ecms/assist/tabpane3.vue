<template>
    <div class="tabpane3">
        <div class="top">
            <div class="le">
                <div class="add" @click="add()">
                    <img src="../images/yingyongpeizhi/add.png"/>
                </div>
            </div>
            <div class="ri">
                <el-input v-model="input" placeholder="按条件搜索"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
            </div>
        </div>
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
                <el-table-column type="selection" show-overflow-tooltip></el-table-column>
                <el-table-column type="index" label="序号" width="100px">
                    <!--<template slot-scope="scope">{{scope.row.$index}}</template>-->
                </el-table-column>
                <el-table-column prop="caseNumber" label="IP地址" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="caseAyStr" label="端口" width="150px" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="createdDate" label="类型" show-overflow-tooltip>
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
        <!--添加弹框-->
        <addAlert3 :alertshow="ismain" @selectshow="ismain=false" @qure="addlawsure" @cancel="ismain=false"/>
    </div>
</template>

<script>
    import addAlert3 from "./addAlert3" //添加弹框
    //import {assist} from "./datajson"
    export default {
        name: "tabpane3",
        components: {
            addAlert3
        },
        data() {
            return {
                ismain:false,
                input:"",//搜索
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
            //添加弹框
            add(){
                this.ismain=true;
            },
            //关闭添加弹框
            addlawsure(){
                this.ismain=false;
            },
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

                });
            }
        }
    }
</script>

<style lang="less">
    .tabpane3{
        .mr();
        .top{
            margin-bottom:.2rem;
            .fb();
            .le{
                .fl();
                cursor:pointer;
                &>div.add{
                    img{
                        width:.8rem;
                    }
                }
            }
            .ri{
                /*text*/
                .el-input {
                    width: 2.36rem;
                    margin-right: .1rem;

                    .el-input__inner {
                        height: .4rem;
                        line-height: .4rem;
                        padding: 0 .15rem;
                        .f18();
                    }
                }
                /*button*/
                .el-button {
                    position: relative;
                    top: -.02rem;
                    width: .9rem;
                    line-height: .36rem;
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
        @import url('../css/element.less');
    }
</style>
<style scoped>
    @import url('../css/uppage.less');
</style>
<template>
    <div class="tabplane1">
            <el-row class='onerow'>
                    <el-col :span='24'>
                            <div class="add">
                                    <img src="../images/CaseManagement/导出.png" alt=""  @click="handleEdit(scope.row)">
                            </div>
                    </el-col>
            </el-row>
            <el-row class='tworowu'>
                  <el-col :span=24 class="date-d">
                        <el-date-picker v-model="startCreateCaseDate" type="date" :clearable=true :picker-options="pickerOptions0">
                        </el-date-picker>
                        至
                        <el-date-picker v-model="endCreateCaseDate" type="date" :clearable=true :picker-options="pickerOptions1">
                        </el-date-picker>
                        <el-select v-model="modulesName" placeholder="模块名称">
                                <el-option
                                    v-for="item in modulesNameList"
                                    @change="cityChange"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.label">
                                </el-option>
                        </el-select>
                        <el-button type="primary" icon="el-icon-search" @click='querylog'>查询</el-button>
                  </el-col>
            </el-row>
            <el-row class='threerowu'>
                    <div class='casetable'>
                            <el-table ref="multipleTable":data="tableData" tooltip-effect="dark" style="width: 100%"
                            @selection-change="handleSelectionChange">
                            <el-table-column type="selection" width='100'></el-table-column>
                            <el-table-column prop="moduleName" label="模块名称" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="description"label="日志内容" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="operationDate"label="日期"show-overflow-tooltip></el-table-column>
                          </el-table>
                      </div>
            </el-row>
            <div class="up">
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
         import {LogManagement} from "../js/datajson"
        import $ from "jquery"
        export default {
            name: "tabpane1",
            components: {
           
            },
            data() {
                return {
                    startCreateCaseDate:"",
                    endCreateCaseDate:"",
                    modulesNameList:LogManagement.modulesNameList,//案件类型代字select,
                    modulesName:'',
                    tableData:[]
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
.tabplane1{
    .mr();
    padding:0 0.2rem;
            /* .isedit{
                    color: #409eff;
            } */
            /*操作颜色*/
            div.isedit span{
                    color: #409eff;
            }
               /*裁判日期*/
               .date-d{
                    .f18();
                    .el-input{
                        width:3rem;
                        .el-input__inner{
                            width:3rem;
                            height:.4rem;
                            line-height:.4rem;
                            .f20();
                            padding:0 .2rem 0 .4rem;
                        }
                    }
                    /*矢量图标*/
                    .el-input__icon {
                        width: .25rem;
                        line-height: .4rem;
                        color: #e7e9ee;
                    }
                    .el-icon-date:before{
                        font-size:.18rem;
                    }
                }
            .onerow{
                margin-bottom:0.1rem;
            }
            .tworowu{
                 .el-col-16{
                    padding-left:0.2rem;
                }
                span{
                  font-size: 0.2rem;
                }
                .el-select
                {
                    width:1.78rem;
                    padding-bottom: 0.12rem;
                    margin-right: 0.18rem;
                }
                 .el-input{ 
                    font-size: 0.18rem;
                    .el-input__icon{
                                width: .25rem;
                                line-height: .4rem;
                                color: #e7e9ee;
                            }
                }
                /*这是输入框的高*/
                .el-input__inner{
                    height:0.4rem;
                }
                .el-date-editor .el-range-input{
                    font-size: 0.18rem;
                }
    
            }
            .tworowu{
                .el-col-9{
                    text-align: right;
                }
                .el-input__inner{
                    width:100%;
                }
                   /*button*/
                   .el-button {
                                position: relative;
                                left:1.2rem!important;
                                top: -.02rem;
                                width: .9rem;
                                line-height: .36rem;
                                padding: 0;
    
                                .el-icon-search {
                                    font-size:0.18rem;
                                    color: #fff;
                                }
    
                                span {
                                    font-size:0.18rem;
                                    color: #fff;
                                }
                            }
            }
        }
</style>
<style scoped>
    @import url('../css/uppage.less');
</style>
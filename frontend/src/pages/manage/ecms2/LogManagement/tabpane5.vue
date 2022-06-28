<template>
    <div class="tabplane5">
            <el-row class='onerow'>
                    <el-col :span='24'>
                            <div class="add">
                                    <img src="../images/CaseManagement/导出.png" alt=""  @click="handleEdit(scope.row)">
                            </div>
                    </el-col>
            </el-row>
            <el-row class='tworowu'>
                    <div  class="date-d">
                            <el-date-picker v-model="startCreateCaseDate" type="date" :clearable=true :picker-options="pickerOptions0">
                            </el-date-picker>
                            至
                            <el-date-picker v-model="endCreateCaseDate" type="date" :clearable=true :picker-options="pickerOptions1">
                            </el-date-picker>
                            登录IP<el-input style='width:3rem' clearable></el-input>
                             <el-button type="primary" icon="el-icon-search" @click='querylog'>查询</el-button>
                    </div>
            </el-row>
            <el-row class='threerowu'>
                    <div  class='casetable'>
                            <el-table ref="multipleTable":data="tableData" tooltip-effect="dark" style="width: 100%"
                            @selection-change="handleSelectionChange">
                            <el-table-column type="selection"width='100'></el-table-column>
                            <el-table-column prop="recordTDate"label="记录日志时期"show-overflow-tooltip></el-table-column>
                            <el-table-column prop="recordTime"label="记录日志时间"show-overflow-tooltip></el-table-column>
                            <el-table-column prop="description"label="日志描述"show-overflow-tooltip></el-table-column>
                            <el-table-column prop="caseNumber"label="案号"show-overflow-tooltip></el-table-column>
                            <el-table-column prop="startTrialDate"label="开庭日期" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="startTrialTime"label="开庭日间" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="courtTime"label="庭次"show-overflow-tooltip></el-table-column>
                            <el-table-column prop="videoCount"label="视频数"show-overflow-tooltip></el-table-column>
                            <el-table-column prop="sj"label="操作用户" show-overflow-tooltip></el-table-column>
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
            name: "tabpane5",
            components: {
           
            },
            data() {
                return {
                    startCreateCaseDate:"",
                    endCreateCaseDate:"",
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
.tabplane5{
            .mr();
            padding:0 0.2rem;
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
                                left:0.2rem;
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
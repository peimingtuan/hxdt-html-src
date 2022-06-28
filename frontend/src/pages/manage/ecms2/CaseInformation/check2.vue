<template>
        <div class="check2">
            <!--二次弹框-->
            <checkAgentinfo ref='checkAgentinfo':ischeckAgentinfo="ischeckAgentinfo" @closenewcase='ischeckAgentinfo=false' @sure='ischeckAgentinfo=false' @cancel='ischeckAgentinfo=false'></checkAgentinfo>
            <div class="addd" @click="add()">
                    <el-col　:span=2>当事人信息</el-col>
            </div>
            <div class="table-style">
                <el-table ref="multipleTable" :data="tableData" @cell-click="cellClick" @select="selectcheck" @select-all="selecAlltcheck"
                          tooltip-effect="dark"   
                          style="width: 100%"  class='casetable' 
                          @selection-change="handleSelectionChange">
                    <el-table-column prop="caseStandingName" label="诉讼地位" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="involvedPersonName" label="姓名"  show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="identityNumber" label="证件号码" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="householdRegisterPlace" label="住所地" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column  label="类型" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-if="scope.row.partyTypeCode==1">自然人</span>
                                <span v-else-if="scope.row.partyTypeCode==2">法人</span>
                                <span v-else-if="scope.row.partyTypeCode==3">非法人组</span>
                            </template>
                    </el-table-column>
                    <el-table-column  label="代理人" show-overflow-tooltip>
                            <template slot-scope="scope">
                                    <span v-for='item in scope.row.agentInfoList'>
                                            {{item.personalInfoName}}
                                    </span>
                            </template>
                    </el-table-column>
                    <el-table-column label="操作" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <div class="isedit">
                                <span @click="checkparty(scope.row)">查看详情</span>
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
                        :page-size=4
                        layout="total, prev, pager, next, jumper"
                        :total="tableData.length">
                </el-pagination>
            </div>
        </div>
    </template>
    
    <script>
        import checkAgentinfo from './checkAgentinfo'//新建当事人详情
        // import {courtyardallocation} from "../js/datajson"
        // const tableData=require('../testdata/dangshiren')
        export default {
            name: "check2",
            components: {
                checkAgentinfo,
            },
            data() {
                return {
                    tableData:"",
                    ischeckAgentinfo:false,
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
                getAllInfoByCaseInfoId(e){
                    this.tableData = e.involvedPersonDtoList;//涉案人信息列表
                },
                //打开二次弹框
                add(){
                    this.isAddscheduling_nt=true;
                },
                checkparty(row){
                    this.ischeckAgentinfo=true;
                    this.$refs.checkAgentinfo.getAgentinfo(row);//传子组件
                }
            }
        }
    </script>
    
    <style lang="less">
        @import url('../css/common.less');
        .check2{
            /*二次弹框*/
            .second-main{
                position:absolute;
                left:50%;
                margin-left:-5rem;
                top:2rem;
                width:10rem;
                background: #fff;
                z-index:222;
                border-radius: 2px;
                box-shadow: -5px 5px 5px 0 rgba(38, 78, 119, .2),5px -3px 3px 0 rgba(38, 78, 119, .2);
                .secondHead {
                    background: #cbe5f3;
                }
    
                .el-form {
                    padding: .2rem;
                    height: 5rem;
                    overflow: auto;
    
                    .el-form-item {
                        margin-bottom: .1rem;
                    }
    
                    /*label*/
    
                    .el-form-item__label {
                        .f18();
                        width: 1.8rem !important;
                    }
    
                    .el-form-item__content {
                        margin-left: 1.8rem !important;
                    }
    
                    /*input框*/
    
                    .el-input {
                        width: 4rem;
    
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
                        background: #409eff;
    
                        span {
                            .f18();
                            color: #fff;
                        }
                    }
                }
            }
            /*操作颜色*/
            div.isedit{
                    cursor:pointer;
                    color: #409eff;
            }
            /*操作颜色*/
            div.isedit span{
                     cursor:pointer;
                    color: #409eff;
            }
            .addd{
                cursor:pointer;
                margin-bottom:.1rem;
                padding:0 0 0.3rem 0;
                /* img{
                    width:.8rem;
                } */
                div{
                    display: inline-block;
                }
            }
        }
    </style>
<template>
        <div class="check3">
            <div class="table-style">
                <el-table ref="multipleTable" :data="tableData" @cell-click="cellClick" @select="selectcheck" @select-all="selecAlltcheck"
                          tooltip-effect="dark"  class='casetable' 
                          style="width: 100%"
                          @selection-change="handleSelectionChange">
                    <el-table-column prop="courtTime" label="庭次" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="factStartDate" label="开庭时间"  show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column  label="审理形式" show-overflow-tooltip>
                            <template slot-scope="scope">
                                    <span v-if="scope.row.trialFormCode==1">普通审理模式</span>
                                    <span v-else-if="scope.row.trialFormCode==2">多案同时审理模式</span>
                                    <span v-else-if="scope.row.trialFormCode==3">多案连续审</span>
                            </template>
                    </el-table-column>
                    <el-table-column  label="审判组织成员" show-overflow-tooltip>
                            <template slot-scope="scope">
                                    <span v-for='item in scope.row.trialMemberList'>
                                        <span v-if="item.trialMemberTypeCode==1">审判长{{item.trialMemberName}}</span>
                                        <span v-if="item.trialMemberTypeCode==2">审判员{{item.trialMemberName}}</span>
                                        <span v-if="item.trialMemberTypeCode==3">人民陪审员{{item.trialMemberName}}</span>
                                        <!-- <span v-if="item.trialMemberTypeCode==6">书记员{{item.trialMemberName}}</span> -->
                                    </span>
                            </template>
                    </el-table-column>
                    <el-table-column prop="courtRoomName" label="法庭" show-overflow-tooltip>

                    </el-table-column>
                    <el-table-column label="庭审状态" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span>{{scope.row.trialStatus | trialStatus2}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="presidingJudge" label="书记员" show-overflow-tooltip>
                            <template slot-scope="scope">
                                    <span v-for='item in scope.row.trialMemberList'>
                                        <span v-if="item.trialMemberTypeCode==6">{{item.trialMemberName}}</span>
                                    </span>
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
        export default {
            name: "check3",
            components: {

            },
            data() {
                return {
                    isAddscheduling_nt:false,
                    tableData:"",
                }
            },
            filters:{
                trialStatus2(v){
                    if(v==1)return '等待开庭'
                    else if(v==2)return '正在开庭'
                    else if(v==3)return '休庭'
                    else if(v==4)return '继续庭审'
                    else if(v==5)return '庭审结束'
                    else if(v==255)return '其它'
                }
            },
            created() {
    
            },
            mounted() {
    
            },
            destroyed() {
    
            },
            methods: {
                getAllInfoByCaseInfoId(e){
                    this.tableData = e.trialPlanMemberDto;//涉案人信息列表
                }
            }
        }
    </script>
    
    <style lang="less">
        @import url('../css/common.less');
        .check3{
            .add{
                cursor:pointer;
                margin-bottom:.1rem;
                /* img{
                    width:.8rem;
                } */
            }
            .el-radio{
                        /*选框*/
                        .el-radio__inner{ 
                            width:.2rem;
                            height:.2rem;
                            &:after{
                                width:.06rem;
                                height:.06rem;
                            }
                        }
                        /*文本*/
                        .el-radio__label{
                            .f18();
                        }
                    }
        }
    </style>
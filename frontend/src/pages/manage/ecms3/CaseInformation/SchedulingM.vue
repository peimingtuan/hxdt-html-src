<template>
    <div class="SchedulingM">
        <Addscheduling_nt :isAddscheduling_nt="isAddscheduling_nt" @closenewcase='isAddscheduling_nt=false'
                          @cancel='isAddscheduling_nt=false' @sure='isAddscheduling_nt=false'></Addscheduling_nt>
        <!-- 关联案件弹框 -->
        <Relatedcase :isRelatedcase="isRelatedcase" @Relatedcaseshow='isRelatedcase=false' @cancel='isRelatedcase=false'
                     @sure='isRelatedcase=false'/>
        </Relatedcase>
        <!-- 添加关联案件弹框 -->
        <!-- <addRelatedcase ref='addRelatedcase':isaddRelatedcase="isaddRelatedcase" @Relatedcaseshow='isaddRelatedcase=false'  @cancel='isaddRelatedcase=false' @sure='isaddRelatedcase=false'></addRelatedcase> -->
        <transition name="slide-fade">
            <div class="alert-window2" v-if='isSchedulingM'>
                <div class="main">
                    <el-row class='onerow3'>
                        <img class="imgloge" src="../images/../images/CaseManagement/casemanage.png"/>
                        <img class="alert-close" @click="closenewcase" src="../images/alert-close.png"/>
                        <div class="head">排期管理
                            <el-row style='margin-left:5rem;position: relative;top:-0.3rem;width:5rem'>{{caseNumber}}
                            </el-row>
                        </div>
                    </el-row>
                    <el-row class='tworow3'>
                        <div class="add" @click="add()">
                            <img src="../images/add.png"/>
                        </div>
                        <div class="table-style">
                            <el-table ref="multipleTable" :data="tableData" @select="selectcheck"
                                      @select-all="selecAlltcheck" tooltip-effect="dark"
                                      style="width: 100%"
                                      @selection-change="handleSelectionChange">
                                <el-table-column type="selection" width='50px' show-overflow-tooltip></el-table-column>
                                <el-table-column prop='xh' label="序号" width='80px' type="index"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column label="审理方式" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span v-if='scope.row.trialFormCode==1'>普通审理模式</span>
                                        <span v-else-if='scope.row.trialFormCode==2'>多案同时审理模式</span>
                                        <span v-else-if='scope.row.trialFormCode==3'>多案连续审理模式</span>
                                        <span v-else-if='scope.row.trialFormCode==4'>合并审理模式</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="courtTime" label="庭次" show-overflow-tooltip
                                                 width='60px'></el-table-column>
                                <el-table-column prop="factStartDate" label="开庭日期"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column prop="courtRoomName" label="法庭"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column label="庭审状态" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span v-if='scope.row.trialStatus==1'>等待开庭</span>
                                        <span v-else-if='scope.row.trialStatus==2'>正在开庭</span>
                                        <span v-else-if='scope.row.trialStatus==3'>休庭开庭</span>
                                        <span v-else-if='scope.row.trialStatus==4'>继续</span>
                                        <span v-else-if='scope.row.trialStatus==5'>庭审结束</span>
                                        <span v-else-if='scope.row.trialStatus==255'>等待开庭</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" show-overflow-tooltip width='400'>
                                    <template slot-scope="scope">
                                        <div class="isedit">
                                            <span @click="Relatedcase">关联案件</span>
                                            <span @click="edit(scope.row)">修改</span>
                                            <span @click="deleteTrialPlan(scope.row)">删除</span>
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
                                    @current-change="handleCurrentChange"
                                    :current-page=1
                                    :page-size=10
                                    layout="total, prev, pager, next, jumper"
                                    :total=100>
                            </el-pagination>
                        </div>
                    </el-row>
                    <!--底部按钮-->
                    <div class="bt">
                        <div class="qure" @click='sure'>
                            <img src="../images/sure.png"/>确定
                        </div>

                        <div class="cancel" @click='cancel'>
                            <img src="../images/cancel.png"/>取消
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import {SchedulingM} from "../js/datajson"
    import $ from "jquery"
    import Relatedcase from "./Relatedcase" //关联弹框
    import Addscheduling_nt from "../component/Addscheduling_nt" //关联弹框
    // import addRelatedcase from "./addRelatedcase" //关联添加弹框
    export default {
        name: "SchedulingM",
        //注册子组件
        components: {
            Relatedcase,
            Addscheduling_nt,
            // addRelatedcase,
        },
        props: {
            isSchedulingM: Boolean,
            isAddscheduling_nt: Boolean,
            SchedulingMshow: Function,
        },
        data() {
            return {
                caseNumber: "",//案号
                isAddscheduling_nt: false,
                isRelatedcase: false,//关联案件
                isaddRelatedcase: false,
                //假数据
                tableData: SchedulingM.casetableData,
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
            //根据id获得当前排期信息
            getTrialPlan(row) {
                // console.log(row.caseNumber)//案号
                this.caseNumber = row.caseNumber
                // console.log(row.caseInfoId)
                let _this = this;
                _this.isload = true;
                const params = {
                    "caseInfoId": row.caseInfoId
                };
                _this.$http.post('/caseManage/getTrialPlanByCaseInfoId', params).then(data => {
                    _this.isload = false;
                    if (data.Code == 1) {
                        // this.tableData=data.data
                    } else {
                        _this.$msgw(data.Message);
                    }
                }).catch(err => {
                    _this.isload = false;
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //删除案件下的排期
            deleteTrialPlan(row) {
                console.log(row.trialPlanId)
                // console.log(this.tableData)
                let _this = this;
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$http.post('/deleteTrialPlans', {
                        // trialPlanId:row.trialPlanId,//案号id
                        "trialPlanIds": [
                            {"trialPlanId": row.trialPlanId},
                        ]
                        //trailid
                    }).then(data => {
                        if (data.code === 0) {
                            //_this.tableData.splice(index,1)//物理删除
                            //_this.getlawlist();
                            _this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        } else {
                            _this.$msgw(data.msg);
                        }
                    }).catch(err => {
                        _this.load = false;
                        _this.$msge('服务器异常，请稍后重试');
                    })
                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });
            },
            Relatedcase() {
                //一期不做
                this.$msgw('此功能一期不做');
                //this.isRelatedcase=false;
            },
            //添加排期
            add() {
                this.isAddscheduling_nt = true;
            },
            //修改排期
            edit(row) {
                 this.isAddscheduling_nt=true;
                //调用子组件方法
                // this.$refs.Addscheduling_nt.see(row)
            },
            //注册弹框显示与否事件
            closenewcase() {
                this.$emit('SchedulingMshow');
            },
            sure() {
                this.$emit('sure');
            },
            cancel() {
                this.$emit('cancel');
            }
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .SchedulingM {
        .alert-window2 {
            .main {
                width: 14rem;
                padding: 0 .8rem;
                box-shadow: -5px 5px 5px 0 rgba(38, 78, 119, 0.20);
                background: #fff;
                position: absolute;
                left: 50%;
                top: 1rem;
                margin-left: -7rem;
                border-radius: 2px;
            }
        }

        .add {
            cursor: pointer;
            margin-bottom: .1rem;
        }

        .onerow3 {
            img.imgloge {
                position: absolute;
                top: .2rem;
                left: -0.5rem;
                width: .4rem;
            }

            /*头部*/

            .head {
                width: 100%;
                padding: .25rem 0 .4rem 0rem;
                height: .2rem;
                font-size: 0.2rem;

                span {
                    font-size: 0.14rem;
                    color: rgba(0, 0, 0, 0.54);
                }
            }

            img.alert-close {
                width: .18rem;
                position: absolute;
                top: .25rem;
                right: -0.4rem;
                cursor: pointer;
                /* z-index: 1002; */
            }
        }

        .tworow3 {
            /*height: 7rem;*/
            margin: 0 auto;
            background: #eceff0;
            padding: 0.1rem 0.2rem;
        }
        @import url('../../ecms/css/element.less');
        @import url('../../ecms/css/alertbtn.less');
    }
</style>
<style scoped>
    .table-style{
        min-height:4rem;
        max-height:6rem;
        overflow: auto;
    }
</style>

<template>
    <div class="SchedulingM">
        <Addscheduling_nt
                ref="Addscheduling_nt"
                :isAddscheduling_nt="isAddscheduling_nt"
                @Schedulingshow='isAddscheduling_nt=false'
                @cancel='isAddscheduling_nt=false'
                @sure='surisAddscheduling_nt'>
        </Addscheduling_nt>
        <!-- 关联案件弹框 -->
        <Relatedcase
                :isRelatedcase="isRelatedcase"
                @Relatedcaseshow='isRelatedcase=false'
                @cancel='isRelatedcase=false'
                @sure='isRelatedcase=false'/>
        </Relatedcase>
        <!-- 添加关联案件弹框 -->
        <!-- <addRelatedcase ref='addRelatedcase':isaddRelatedcase="isaddRelatedcase" @Relatedcaseshow='isaddRelatedcase=false'  @cancel='isaddRelatedcase=false' @sure='isaddRelatedcase=false'></addRelatedcase> -->
        <transition name="slide-fade">
            <div class="alert-window2" v-if='isSchedulingM'>
                <div class="main-manage">
                    <el-row class='onerow3'>
                        <img class="imgloge" src="../images/../images/CaseManagement/casemanage.png"/>
                        <img class="alert-close" @click="isSchedulingM=false" src="../images/alert-close.png"/>
                        <div class="head">排期管理
                            <el-row style='margin-left:5rem;position: relative;top:-0.3rem;width:5rem'>{{caseNumber}}
                            </el-row>
                        </div>
                    </el-row>
                    <el-row class='tworow3'>
                        <div class="add">
                            <img @click="add()" src="../images/add.png"/>
                        </div>
                        <div class="table-style">
                            <el-table ref="multipleTable"
                                      :data="tableData"
                                      tooltip-effect="dark"
                                      style="width: 100%"
                                      max-height="350"
                                      @selection-change="handleSelectionChange">
                                <el-table-column type="selection" width='50px' show-overflow-tooltip></el-table-column>
                                <el-table-column prop='xh' label="序号" width='80px' type="index"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column label="审理方式" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span>{{scope.row.trialFormCode | trialFormCode}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="courtTime" label="庭次" show-overflow-tooltip
                                                 width='60px'></el-table-column>
                                <el-table-column prop="factStartDate" label="开庭日期"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column label="开庭时间" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span>{{scope.row.factStartTime}}-{{scope.row.factEndTime}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="courtRoomName" label="法庭"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column label="庭审状态" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span>{{scope.row.trialStatus | trialStatusselect}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" show-overflow-tooltip width='200px'>
                                    <template slot-scope="scope">
                                        <div class="isedit">
                                            <span @click="Relatedcase">关联案件</span>
                                            <span @click="edit(scope.row)">修改</span>
                                            <span @click="deleteTrialPlan(scope.$index,scope.row)">删除</span>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <!--<div class="up">-->
                        <!--&lt;!&ndash;分页&ndash;&gt;-->
                        <!--<el-pagination-->
                        <!--class="page"-->
                        <!--background-->
                        <!--@current-change="handleCurrentChange"-->
                        <!--:current-page=1-->
                        <!--:page-size=10-->
                        <!--layout="total, prev, pager, next, jumper"-->
                        <!--:total=100>-->
                        <!--</el-pagination>-->
                        <!--</div>-->
                    </el-row>
                    <!--底部按钮-->
                    <div class="bt">
                        <div class="qure" @click='isSchedulingM=false'>
                            <img src="../images/sure.png"/>确定
                        </div>

                        <div class="cancel" @click='isSchedulingM=false'>
                            <img src="../images/cancel.png"/>取消
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    //import {SchedulingM} from "../js/datajson"
    import $ from "jquery"
    import Relatedcase from "./Relatedcase" //关联弹框
    import Addscheduling_nt from "../component/Addscheduling_nt" //关联弹框
    export default {
        name: "SchedulingM",
        //注册子组件
        components: {
            Relatedcase,
            Addscheduling_nt,
            // addRelatedcase,
        },
        props: {
            SchedulingMshow: Function,
        },
        data() {
            return {
                caseNumber: "",//案号
                caseInfoId:'',//排期id
                isSchedulingM:false,
                isAddscheduling_nt: false,
                isRelatedcase: false,//关联案件
                tableData:[],
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        filters:{
            trialStatusselect(v){
                let s='';
                switch(Number(v)){
                    case 1:
                        s='等待开庭';
                        break;
                    case 2:
                        s='正在开庭';
                        break;
                    case 3:
                        s='庭审结束';
                        break;
                    case 4:
                        s='休庭';
                        break;
                }
                return s
            },
            trialFormCode(v){
                let s='';
                switch(Number(v)){
                    case 1:
                        s='普通审理形式';
                        break;
                    case 2:
                        s='合并审理(单笔录)';
                        break;
                    case 3:
                        s='合并审理(多笔录)';
                        break;
                }
                return s
            }
        },
        methods: {
            show(row){
                if(row){
                    this.isSchedulingM=true;
                    this.caseNumber =row.caseNumber;
                    this.caseInfoId=row.caseInfoId;
                    this.getTrialPlan()
                }
            },
            //根据id获得当前排期信息
            getTrialPlan() {
                const _this = this;
               return _this.$http.post('/caseManage/getTrialPlanByCaseInfoId', {
                   caseInfoId:_this.caseInfoId
               }).then(data => {
                    if (data.code ===200) {
                        _this.tableData=data.data
                    } else {
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    console.log(err,'/caseManage/getTrialPlanByCaseInfoId')
                   // _this.$msge('服务器异常，请稍后重试');
                })
            },
            //删除案件下的排期
            deleteTrialPlan(index,row) {
                let _this = this;
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$http.post('/baseInfo/deleteTrialPlanInfo', {
                        trialPlanId:row.trialPlanId,
                        caseInfoId:_this.caseInfoId,
                    }).then(data => {
                        if (data.code === 200) {
                            _this.tableData.splice(index,1)//物理删除
                            _this.$msgs('删除成功!');
                        } else {
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        _this.$msge('服务器异常，请稍后重试');
                    })
                }).catch(() => {

                });
            },
            Relatedcase() {
                //一期不做
                this.$msgw('此功能未开发');
                //this.isRelatedcase=false;
            },
            //添加排期
            add() {
                this.isAddscheduling_nt = true;
                this.$refs.Addscheduling_nt.show();
                this.$refs.Addscheduling_nt.see(this.tableData)
            },
            //修改排期
            edit(row) {
                 this.isAddscheduling_nt=true;
                 this.$refs.Addscheduling_nt.show();
                 //调用子组件方法
                 this.$refs.Addscheduling_nt.see(this.tableData,row)
            },
            //添加，修改排期保存
            //修改排期保存
            surisAddscheduling_nt(trialPlanInfos){
                const _this=this;
                _this.$showToast('正在保存...')
                trialPlanInfos[0].caseInfoId=_this.caseInfoId;
                _this.$http.post('/caseManage/saveTrialPlanInfo',{trialPlanInfos}).then(data =>{
                    _this.$hideToast()
                    if(data.code==200){
                        _this.$msgs('保存成功');
                        this.isAddscheduling_nt=false;
                        _this.getTrialPlan();
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideToast()
                    console.log(err,'/caseManage/saveTrialPlanInfo')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .SchedulingM {
        .alert-window2 {
            .main-manage{
                width: 14rem;
                padding: 0 .8rem;
                box-shadow: -5px 5px 5px 0 rgba(38, 78, 119, 0.20);
                background: #fff;
                position: absolute;
                left: 50%;
                top: 1rem;
                margin-left: -7rem;
                border-radius: 2px;
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
                    margin: 0 auto;
                    background: #eceff0;
                    padding: 0.1rem 0.2rem;
                    .add {
                        cursor: pointer;
                        margin-bottom: .1rem;
                    }
                    .el-table__empty-block{
                        width:100%!important;
                    }
                }
            }
        }
        @import url('../../ecms/css/element.less');
        @import url('../../ecms/css/alertbtn.less');
    }
</style>
<style scoped>
    .table-style{
        min-height:4rem;
        /*max-height:6rem;*/
        overflow: auto;
    }
</style>
